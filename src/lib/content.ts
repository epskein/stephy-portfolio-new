import { supabasePublic, publicUrl } from "./supabase/public";

// Content read layer for the public site. Mirrors the shapes the page
// components already expect (previously served by Sanity) so swapping the
// source is a near drop-in. Every read is resilient: if Supabase is
// unreachable the site keeps rendering with an empty/fallback result.

async function safe<T>(fn: () => Promise<T>, fallback: T): Promise<T> {
  try {
    return (await fn()) ?? fallback;
  } catch {
    return fallback;
  }
}

/* ------------------------------- Shows -------------------------------- */
export interface Show {
  id: string;
  dateRange: { start: string; end?: string };
  venue: string;
  flag: string;
  location: string;
}

export async function getShows(): Promise<Show[]> {
  return safe(async () => {
    const { data } = await supabasePublic
      .from("stephy_shows")
      .select("id, venue, start_date, end_date, location, flag, sort_order")
      .order("start_date", { ascending: true });
    return (data || []).map((r) => ({
      id: r.id,
      venue: r.venue,
      flag: r.flag,
      location: r.location,
      dateRange: { start: r.start_date, end: r.end_date || undefined },
    }));
  }, []);
}

/* ------------------------------ Gallery ------------------------------- */
export interface GalleryImage {
  id: string;
  src: string;
  category: string;
  width: number;
  height: number;
}

export async function getGalleryImages(): Promise<GalleryImage[]> {
  return safe(async () => {
    const { data } = await supabasePublic
      .from("stephy_gallery")
      .select("id, storage_path, category, width, height, sort_order")
      .order("sort_order", { ascending: true });
    return (data || []).map((r) => ({
      id: r.id,
      src: publicUrl(r.storage_path),
      category: r.category,
      width: r.width || 4,
      height: r.height || 3,
    }));
  }, []);
}

export async function getCarouselImages(): Promise<
  { src: string; width: number; height: number }[]
> {
  return safe(async () => {
    const { data } = await supabasePublic
      .from("stephy_gallery")
      .select("storage_path, width, height, sort_order, featured_on_home")
      .eq("featured_on_home", true)
      .order("sort_order", { ascending: true });
    return (data || []).map((r) => ({
      src: publicUrl(r.storage_path),
      width: r.width || 4,
      height: r.height || 3,
    }));
  }, []);
}

/* --------------------------- Music releases --------------------------- */
export interface Release {
  id: string;
  title: string;
  releaseType: string;
  year?: string;
  link?: string;
  coverUrl?: string;
}

export async function getMusicReleases(): Promise<Release[]> {
  return safe(async () => {
    const { data } = await supabasePublic
      .from("stephy_music")
      .select("id, title, release_type, year, link, cover_path, sort_order")
      .order("sort_order", { ascending: true });
    return (data || []).map((r) => ({
      id: r.id,
      title: r.title,
      releaseType: r.release_type,
      year: r.year || undefined,
      link: r.link || undefined,
      coverUrl: r.cover_path ? publicUrl(r.cover_path) : undefined,
    }));
  }, []);
}

/* ---------------------------- Social links ---------------------------- */
export interface Social {
  name: string;
  href: string;
  handle: string;
}

export async function getSocialLinks(): Promise<Social[]> {
  return safe(async () => {
    const { data } = await supabasePublic
      .from("stephy_socials")
      .select("platform, url, handle, sort_order")
      .order("sort_order", { ascending: true });
    return (data || []).map((r) => ({
      name: r.platform,
      href: r.url,
      handle: r.handle || "",
    }));
  }, []);
}

/* ------------------------------ Venues -------------------------------- */
export interface Venue {
  id: string;
  name: string;
  src: string;
}

export async function getVenues(): Promise<Venue[]> {
  return safe(async () => {
    const { data } = await supabasePublic
      .from("stephy_venues")
      .select("id, name, logo_path, sort_order")
      .order("sort_order", { ascending: true });
    return (data || []).map((r) => ({
      id: r.id,
      name: r.name,
      src: publicUrl(r.logo_path),
    }));
  }, []);
}

/* ----------------------------- About page ----------------------------- */
export interface About {
  bio: string[];
  profileUrl?: string;
  stats: { value: string; label: string }[];
  journey: { year: string; title: string; description: string }[];
  styleDescription?: string;
  genres: string[];
}

export async function getAboutPage(): Promise<About | null> {
  return safe(async () => {
    const { data } = await supabasePublic
      .from("stephy_about")
      .select("profile_path, bio, stats, journey, style_description, genres")
      .eq("id", 1)
      .maybeSingle();
    if (!data) return null;
    return {
      bio: (data.bio as string[]) || [],
      profileUrl: data.profile_path ? publicUrl(data.profile_path) : undefined,
      stats: (data.stats as About["stats"]) || [],
      journey: (data.journey as About["journey"]) || [],
      styleDescription: data.style_description || undefined,
      genres: (data.genres as string[]) || [],
    };
  }, null);
}

/* ------------------------------- Text --------------------------------- */
// Editable headings / copy, grouped by page → slot → value.
export type TextMap = Record<string, Record<string, string>>;

export async function getText(pages: string[]): Promise<TextMap> {
  return safe(async () => {
    const { data } = await supabasePublic
      .from("stephy_text")
      .select("page, slot, value")
      .in("page", pages);
    const map: TextMap = {};
    for (const p of pages) map[p] = {};
    for (const r of data || []) {
      (map[r.page] ||= {})[r.slot] = r.value;
    }
    return map;
  }, Object.fromEntries(pages.map((p) => [p, {}])));
}

// Small helper for components: text.get(page, slot, fallback)
export function pick(map: TextMap, page: string, slot: string, fallback: string) {
  return map[page]?.[slot] || fallback;
}
