"use server";

import { randomUUID } from "node:crypto";
import sharp from "sharp";
import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { publicUrl, MEDIA_BUCKET } from "@/lib/supabase/public";
import { isEditor } from "@/lib/editors";

// ---------------------------------------------------------------------------
// Every action re-checks the editor identity (defence in depth on top of RLS),
// runs the write as the signed-in user, then revalidates the whole site so the
// change is live immediately — no deploy. Reads back the affected collection
// and returns it so the editor UI updates from the source of truth.
// ---------------------------------------------------------------------------

type Result<T = unknown> = { ok: true; rows?: T } | { ok: false; error: string };

async function guard() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!isEditor(user?.email)) throw new Error("Not authorized");
  return supabase;
}

function live() {
  // Revalidate everything under the root layout — content appears on the live
  // site within ~1s. Cheap for a small site and impossible to get stale.
  revalidatePath("/", "layout");
}

// Batched writes (reorder / multi-row) resolve to per-row results; surface the
// first error so a partial failure never masquerades as success.
function throwIfAny(results: { error: { message: string } | null }[]) {
  const bad = results.find((r) => r.error);
  if (bad?.error) throw new Error(bad.error.message);
}

const CT: Record<string, string> = {
  jpg: "image/jpeg", jpeg: "image/jpeg", png: "image/png", webp: "image/webp", gif: "image/gif", svg: "image/svg+xml",
};
const extOf = (name = "") => (name.split(".").pop() || "jpg").toLowerCase();

async function uploadFile(
  supabase: Awaited<ReturnType<typeof createClient>>,
  folder: string,
  file: File
): Promise<{ path: string; width?: number; height?: number }> {
  const ext = extOf(file.name) || "jpg";
  const path = `${folder}/${randomUUID()}.${ext}`;
  const buffer = Buffer.from(await file.arrayBuffer());
  let width: number | undefined, height: number | undefined;
  if (ext !== "svg") {
    try {
      const meta = await sharp(buffer).metadata();
      width = meta.width;
      height = meta.height;
      if (meta.orientation && meta.orientation >= 5) [width, height] = [height, width];
    } catch { /* non-fatal — dims optional */ }
  }
  const { error } = await supabase.storage
    .from(MEDIA_BUCKET)
    .upload(path, buffer, { contentType: CT[ext] || "application/octet-stream", upsert: true });
  if (error) throw new Error(error.message);
  return { path, width, height };
}

async function removeObject(
  supabase: Awaited<ReturnType<typeof createClient>>,
  path?: string | null
) {
  if (path) await supabase.storage.from(MEDIA_BUCKET).remove([path]);
}

/* =============================== SHOWS ================================= */
async function reselShows(s: Awaited<ReturnType<typeof createClient>>) {
  const { data } = await s.from("stephy_shows").select("*").order("start_date", { ascending: true });
  return data || [];
}
export async function saveShow(input: {
  id?: string; venue: string; start_date: string; end_date: string | null;
  location: string; flag: string;
}): Promise<Result> {
  try {
    const s = await guard();
    const row = {
      venue: input.venue, start_date: input.start_date, end_date: input.end_date || null,
      location: input.location, flag: input.flag, updated_at: new Date().toISOString(),
    };
    const q = input.id
      ? await s.from("stephy_shows").update(row).eq("id", input.id)
      : await s.from("stephy_shows").insert(row);
    if (q.error) throw new Error(q.error.message);
    live();
    return { ok: true, rows: await reselShows(s) };
  } catch (e) { return { ok: false, error: (e as Error).message }; }
}
export async function deleteShow(id: string): Promise<Result> {
  try {
    const s = await guard();
    const { error } = await s.from("stephy_shows").delete().eq("id", id);
    if (error) throw new Error(error.message);
    live();
    return { ok: true, rows: await reselShows(s) };
  } catch (e) { return { ok: false, error: (e as Error).message }; }
}

/* ============================== GALLERY =============================== */
async function reselGallery(s: Awaited<ReturnType<typeof createClient>>) {
  const { data } = await s.from("stephy_gallery").select("*").order("sort_order", { ascending: true });
  return (data || []).map((g) => ({ ...g, url: publicUrl(g.storage_path) }));
}
export async function uploadGallery(formData: FormData): Promise<Result> {
  try {
    const s = await guard();
    const category = (formData.get("category") as string) || "live";
    const files = formData.getAll("files").filter((f): f is File => f instanceof File && f.size > 0);
    if (!files.length) throw new Error("No files selected");
    const { data: last } = await s.from("stephy_gallery").select("sort_order").order("sort_order", { ascending: false }).limit(1);
    let order = (last?.[0]?.sort_order ?? -1) + 1;
    for (const file of files) {
      const { path, width, height } = await uploadFile(s, "gallery", file);
      const { error } = await s.from("stephy_gallery").insert({
        storage_path: path, category, width, height, sort_order: order++, featured_on_home: false,
      });
      if (error) throw new Error(error.message);
    }
    live();
    return { ok: true, rows: await reselGallery(s) };
  } catch (e) { return { ok: false, error: (e as Error).message }; }
}
export async function updateGallery(id: string, patch: { category?: string; featured_on_home?: boolean }): Promise<Result> {
  try {
    const s = await guard();
    const { error } = await s.from("stephy_gallery").update({ ...patch, updated_at: new Date().toISOString() }).eq("id", id);
    if (error) throw new Error(error.message);
    live();
    return { ok: true, rows: await reselGallery(s) };
  } catch (e) { return { ok: false, error: (e as Error).message }; }
}
export async function deleteGallery(id: string, storagePath: string): Promise<Result> {
  try {
    const s = await guard();
    const { error } = await s.from("stephy_gallery").delete().eq("id", id);
    if (error) throw new Error(error.message);
    await removeObject(s, storagePath);
    live();
    return { ok: true, rows: await reselGallery(s) };
  } catch (e) { return { ok: false, error: (e as Error).message }; }
}
export async function reorderGallery(ids: string[]): Promise<Result> {
  try {
    const s = await guard();
    throwIfAny(await Promise.all(ids.map((id, i) => s.from("stephy_gallery").update({ sort_order: i }).eq("id", id))));
    live();
    return { ok: true, rows: await reselGallery(s) };
  } catch (e) { return { ok: false, error: (e as Error).message }; }
}

/* =============================== MUSIC ================================ */
async function reselMusic(s: Awaited<ReturnType<typeof createClient>>) {
  const { data } = await s.from("stephy_music").select("*").order("sort_order", { ascending: true });
  return (data || []).map((m) => ({ ...m, coverUrl: m.cover_path ? publicUrl(m.cover_path) : null }));
}
export async function saveRelease(formData: FormData): Promise<Result> {
  try {
    const s = await guard();
    const id = (formData.get("id") as string) || "";
    const cover = formData.get("cover");
    const row: Record<string, unknown> = {
      title: formData.get("title"), release_type: formData.get("release_type") || "Single",
      year: (formData.get("year") as string) || null, link: (formData.get("link") as string) || null,
      updated_at: new Date().toISOString(),
    };
    if (cover instanceof File && cover.size > 0) {
      const { path } = await uploadFile(s, "music", cover);
      row.cover_path = path;
    }
    if (id) {
      const { error } = await s.from("stephy_music").update(row).eq("id", id);
      if (error) throw new Error(error.message);
    } else {
      const { data: last } = await s.from("stephy_music").select("sort_order").order("sort_order", { ascending: false }).limit(1);
      row.sort_order = (last?.[0]?.sort_order ?? -1) + 1;
      const { error } = await s.from("stephy_music").insert(row);
      if (error) throw new Error(error.message);
    }
    live();
    return { ok: true, rows: await reselMusic(s) };
  } catch (e) { return { ok: false, error: (e as Error).message }; }
}
export async function deleteRelease(id: string, coverPath?: string | null): Promise<Result> {
  try {
    const s = await guard();
    const { error } = await s.from("stephy_music").delete().eq("id", id);
    if (error) throw new Error(error.message);
    await removeObject(s, coverPath);
    live();
    return { ok: true, rows: await reselMusic(s) };
  } catch (e) { return { ok: false, error: (e as Error).message }; }
}
export async function reorderMusic(ids: string[]): Promise<Result> {
  try {
    const s = await guard();
    throwIfAny(await Promise.all(ids.map((id, i) => s.from("stephy_music").update({ sort_order: i }).eq("id", id))));
    live();
    return { ok: true, rows: await reselMusic(s) };
  } catch (e) { return { ok: false, error: (e as Error).message }; }
}

/* ============================== SOCIALS ============================== */
async function reselSocials(s: Awaited<ReturnType<typeof createClient>>) {
  const { data } = await s.from("stephy_socials").select("*").order("sort_order", { ascending: true });
  return data || [];
}
export async function saveSocial(input: { id?: string; platform: string; url: string; handle: string | null }): Promise<Result> {
  try {
    const s = await guard();
    const row = { platform: input.platform, url: input.url, handle: input.handle || null, updated_at: new Date().toISOString() };
    if (input.id) {
      const { error } = await s.from("stephy_socials").update(row).eq("id", input.id);
      if (error) throw new Error(error.message);
    } else {
      const { data: last } = await s.from("stephy_socials").select("sort_order").order("sort_order", { ascending: false }).limit(1);
      const { error } = await s.from("stephy_socials").insert({ ...row, sort_order: (last?.[0]?.sort_order ?? -1) + 1 });
      if (error) throw new Error(error.message);
    }
    live();
    return { ok: true, rows: await reselSocials(s) };
  } catch (e) { return { ok: false, error: (e as Error).message }; }
}
export async function deleteSocial(id: string): Promise<Result> {
  try {
    const s = await guard();
    const { error } = await s.from("stephy_socials").delete().eq("id", id);
    if (error) throw new Error(error.message);
    live();
    return { ok: true, rows: await reselSocials(s) };
  } catch (e) { return { ok: false, error: (e as Error).message }; }
}
export async function reorderSocials(ids: string[]): Promise<Result> {
  try {
    const s = await guard();
    throwIfAny(await Promise.all(ids.map((id, i) => s.from("stephy_socials").update({ sort_order: i }).eq("id", id))));
    live();
    return { ok: true, rows: await reselSocials(s) };
  } catch (e) { return { ok: false, error: (e as Error).message }; }
}

/* ============================== VENUES =============================== */
async function reselVenues(s: Awaited<ReturnType<typeof createClient>>) {
  const { data } = await s.from("stephy_venues").select("*").order("sort_order", { ascending: true });
  return (data || []).map((v) => ({ ...v, url: publicUrl(v.logo_path) }));
}
export async function uploadVenues(formData: FormData): Promise<Result> {
  try {
    const s = await guard();
    const files = formData.getAll("files").filter((f): f is File => f instanceof File && f.size > 0);
    if (!files.length) throw new Error("No files selected");
    const { data: last } = await s.from("stephy_venues").select("sort_order").order("sort_order", { ascending: false }).limit(1);
    let order = (last?.[0]?.sort_order ?? -1) + 1;
    for (const file of files) {
      const { path } = await uploadFile(s, "venues", file);
      const name = file.name.replace(/\.[a-z0-9]+$/i, "").replace(/[-_]+/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
      const { error } = await s.from("stephy_venues").insert({ name, logo_path: path, sort_order: order++ });
      if (error) throw new Error(error.message);
    }
    live();
    return { ok: true, rows: await reselVenues(s) };
  } catch (e) { return { ok: false, error: (e as Error).message }; }
}
export async function updateVenue(id: string, name: string): Promise<Result> {
  try {
    const s = await guard();
    const { error } = await s.from("stephy_venues").update({ name, updated_at: new Date().toISOString() }).eq("id", id);
    if (error) throw new Error(error.message);
    live();
    return { ok: true, rows: await reselVenues(s) };
  } catch (e) { return { ok: false, error: (e as Error).message }; }
}
export async function deleteVenue(id: string, logoPath: string): Promise<Result> {
  try {
    const s = await guard();
    const { error } = await s.from("stephy_venues").delete().eq("id", id);
    if (error) throw new Error(error.message);
    await removeObject(s, logoPath);
    live();
    return { ok: true, rows: await reselVenues(s) };
  } catch (e) { return { ok: false, error: (e as Error).message }; }
}
export async function reorderVenues(ids: string[]): Promise<Result> {
  try {
    const s = await guard();
    throwIfAny(await Promise.all(ids.map((id, i) => s.from("stephy_venues").update({ sort_order: i }).eq("id", id))));
    live();
    return { ok: true, rows: await reselVenues(s) };
  } catch (e) { return { ok: false, error: (e as Error).message }; }
}

/* =============================== ABOUT =============================== */
export async function saveAbout(formData: FormData): Promise<Result> {
  try {
    const s = await guard();
    const profile = formData.get("profile");
    const row: Record<string, unknown> = {
      id: 1,
      bio: JSON.parse((formData.get("bio") as string) || "[]"),
      stats: JSON.parse((formData.get("stats") as string) || "[]"),
      journey: JSON.parse((formData.get("journey") as string) || "[]"),
      genres: JSON.parse((formData.get("genres") as string) || "[]"),
      style_description: (formData.get("style_description") as string) || null,
      updated_at: new Date().toISOString(),
    };
    if (profile instanceof File && profile.size > 0) {
      const { path } = await uploadFile(s, "about", profile);
      row.profile_path = path;
    }
    const { error } = await s.from("stephy_about").upsert(row, { onConflict: "id" });
    if (error) throw new Error(error.message);
    live();
    const { data } = await s.from("stephy_about").select("*").eq("id", 1).maybeSingle();
    return { ok: true, rows: data ? { ...data, profileUrl: data.profile_path ? publicUrl(data.profile_path) : null } : null };
  } catch (e) { return { ok: false, error: (e as Error).message }; }
}

/* =============================== TEXT =============================== */
export async function saveText(updates: { id: string; value: string }[]): Promise<Result> {
  try {
    const s = await guard();
    throwIfAny(await Promise.all(updates.map((u) => s.from("stephy_text").update({ value: u.value, updated_at: new Date().toISOString() }).eq("id", u.id))));
    live();
    const { data } = await s.from("stephy_text").select("*").order("page").order("sort_order");
    return { ok: true, rows: data || [] };
  } catch (e) { return { ok: false, error: (e as Error).message }; }
}
