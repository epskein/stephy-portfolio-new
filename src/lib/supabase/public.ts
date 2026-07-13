import { createClient } from "@supabase/supabase-js";

// Anon client with NO cookie/session wiring — used for PUBLIC content reads
// only. Because it never touches request cookies, pages that read through it
// stay statically cacheable (ISR); RLS allows anonymous SELECT on stephy_*.
export const supabasePublic = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  { auth: { persistSession: false, autoRefreshToken: false } }
);

export const MEDIA_BUCKET = "stephy-media";

// Turn a stored object path (e.g. "gallery/00-photo.jpg") into a public URL.
// Pass-through for values that are already absolute URLs.
export function publicUrl(path?: string | null): string {
  if (!path) return "";
  if (/^https?:\/\//.test(path)) return path;
  return `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${MEDIA_BUCKET}/${path}`;
}
