import "server-only";
import { createClient } from "@/lib/supabase/server";
import { publicUrl } from "@/lib/supabase/public";

// Full-fidelity content for the editor (all fields + resolved media URLs).
export async function loadAdminData() {
  const supabase = await createClient();
  const [shows, gallery, music, socials, venues, about, text] = await Promise.all([
    supabase.from("stephy_shows").select("*").order("start_date", { ascending: true }),
    supabase.from("stephy_gallery").select("*").order("sort_order", { ascending: true }),
    supabase.from("stephy_music").select("*").order("sort_order", { ascending: true }),
    supabase.from("stephy_socials").select("*").order("sort_order", { ascending: true }),
    supabase.from("stephy_venues").select("*").order("sort_order", { ascending: true }),
    supabase.from("stephy_about").select("*").eq("id", 1).maybeSingle(),
    supabase.from("stephy_text").select("*").order("page", { ascending: true }).order("sort_order", { ascending: true }),
  ]);

  return {
    shows: shows.data || [],
    gallery: (gallery.data || []).map((g) => ({ ...g, url: publicUrl(g.storage_path) })),
    music: (music.data || []).map((m) => ({ ...m, coverUrl: m.cover_path ? publicUrl(m.cover_path) : null })),
    socials: socials.data || [],
    venues: (venues.data || []).map((v) => ({ ...v, url: publicUrl(v.logo_path) })),
    about: about.data
      ? { ...about.data, profileUrl: about.data.profile_path ? publicUrl(about.data.profile_path) : null }
      : { id: 1, profile_path: null, profileUrl: null, bio: [], stats: [], journey: [], style_description: "", genres: [] },
    text: text.data || [],
  };
}

export type AdminData = Awaited<ReturnType<typeof loadAdminData>>;
