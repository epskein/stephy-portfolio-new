// One-shot migration: Sanity dataset  ->  Central Supabase (public.stephy_* + storage).
// Idempotent: clears the stephy_* content tables and re-imports from a fresh export,
// re-uploading every asset into the stephy-media bucket.
//
// Run:  node scripts/migrate-content.mjs <sanity-export.json> <venues-dir>
// Env:  SUPABASE_URL, SUPABASE_SERVICE_ROLE  (service role — bypasses RLS for the import)

import { createClient } from "@supabase/supabase-js";
import fs from "node:fs";
import path from "node:path";

const [, , EXPORT_PATH, VENUES_DIR] = process.argv;
const SUPABASE_URL = process.env.SUPABASE_URL;
const SERVICE_ROLE = process.env.SUPABASE_SERVICE_ROLE;
const BUCKET = "stephy-media";

if (!SUPABASE_URL || !SERVICE_ROLE) {
  console.error("Missing SUPABASE_URL / SUPABASE_SERVICE_ROLE");
  process.exit(1);
}

const db = createClient(SUPABASE_URL, SERVICE_ROLE, {
  auth: { persistSession: false },
});

const CT = { jpg: "image/jpeg", jpeg: "image/jpeg", png: "image/png", webp: "image/webp", gif: "image/gif" };
const extOf = (name = "") => name.split(".").pop()?.toLowerCase() || "jpg";
const slug = (s = "") =>
  s.toLowerCase().replace(/\.[a-z0-9]+$/i, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

async function uploadBuffer(destPath, buffer, contentType) {
  const { error } = await db.storage
    .from(BUCKET)
    .upload(destPath, buffer, { contentType, upsert: true });
  if (error) throw new Error(`upload ${destPath}: ${error.message}`);
  return destPath;
}

async function uploadFromUrl(url, destPath) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`fetch ${url} -> ${res.status}`);
  const buf = Buffer.from(await res.arrayBuffer());
  return uploadBuffer(destPath, buf, CT[extOf(destPath)] || "application/octet-stream");
}

async function clearTable(table) {
  // delete-all (id is never this sentinel)
  const { error } = await db.from(table).delete().neq("id", "00000000-0000-0000-0000-000000000000");
  if (error) throw new Error(`clear ${table}: ${error.message}`);
}

async function main() {
  const data = JSON.parse(fs.readFileSync(EXPORT_PATH, "utf8")).result;
  const summary = {};

  /* ---------------------------------------------------------------- shows */
  await clearTable("stephy_shows");
  const shows = (data.shows || []).map((s, i) => ({
    venue: s.venue,
    start_date: s.startDate,
    end_date: s.endDate || null,
    location: s.location || "",
    flag: s.flag || "🇿🇦",
    sort_order: i,
  }));
  if (shows.length) {
    const { error } = await db.from("stephy_shows").insert(shows);
    if (error) throw new Error(`insert shows: ${error.message}`);
  }
  summary.shows = shows.length;

  /* -------------------------------------------------------------- gallery */
  await clearTable("stephy_gallery");
  const galleryRows = [];
  for (let i = 0; i < (data.gallery || []).length; i++) {
    const g = data.gallery[i];
    if (!g.url) continue;
    const dest = `gallery/${String(i).padStart(2, "0")}-${slug(g.orig) || "photo"}.${extOf(g.orig || g.url)}`;
    await uploadFromUrl(g.url, dest);
    galleryRows.push({
      storage_path: dest,
      category: g.category || "live",
      featured_on_home: !!g.featuredOnHome,
      sort_order: typeof g.order === "number" ? g.order : i,
      width: g.w || null,
      height: g.h || null,
    });
    process.stdout.write(`\r  gallery ${i + 1}/${data.gallery.length}   `);
  }
  if (galleryRows.length) {
    const { error } = await db.from("stephy_gallery").insert(galleryRows);
    if (error) throw new Error(`insert gallery: ${error.message}`);
  }
  console.log("");
  summary.gallery = galleryRows.length;

  /* -------------------------------------------------------------- socials */
  await clearTable("stephy_socials");
  const socials = (data.socials || []).map((s, i) => ({
    platform: s.platform,
    url: s.url,
    handle: s.handle || null,
    sort_order: i,
  }));
  if (socials.length) {
    const { error } = await db.from("stephy_socials").insert(socials);
    if (error) throw new Error(`insert socials: ${error.message}`);
  }
  summary.socials = socials.length;

  /* ---------------------------------------------------------------- about */
  const about = data.about || {};
  let profilePath = null;
  if (about.profileUrl) {
    profilePath = `about/profile.${extOf(about.profileOrig || about.profileUrl)}`;
    await uploadFromUrl(about.profileUrl, profilePath);
  }
  const aboutRow = {
    id: 1,
    profile_path: profilePath,
    bio: about.bio || [],
    stats: (about.stats || []).map((s) => ({ value: s.value, label: s.label })),
    journey: (about.journey || []).map((j) => ({ year: j.year, title: j.title, description: j.description })),
    style_description: about.styleDescription || null,
    genres: about.genres || [],
  };
  {
    const { error } = await db.from("stephy_about").upsert(aboutRow, { onConflict: "id" });
    if (error) throw new Error(`upsert about: ${error.message}`);
  }
  summary.about = 1;

  /* --------------------------------------------------------------- venues */
  await clearTable("stephy_venues");
  const venueRows = [];
  if (VENUES_DIR && fs.existsSync(VENUES_DIR)) {
    const files = fs
      .readdirSync(VENUES_DIR)
      .filter((f) => [".png", ".jpg", ".jpeg", ".webp", ".svg"].includes(path.extname(f).toLowerCase()));
    for (let i = 0; i < files.length; i++) {
      const f = files[i];
      const dest = `venues/${f}`;
      const buf = fs.readFileSync(path.join(VENUES_DIR, f));
      const ct = path.extname(f).toLowerCase() === ".svg" ? "image/svg+xml" : CT[extOf(f)] || "image/png";
      await uploadBuffer(dest, buf, ct);
      const name = slug(f).replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
      venueRows.push({ name, logo_path: dest, sort_order: i });
    }
  }
  if (venueRows.length) {
    const { error } = await db.from("stephy_venues").insert(venueRows);
    if (error) throw new Error(`insert venues: ${error.message}`);
  }
  summary.venues = venueRows.length;

  /* ----------------------------------------------------------- page text */
  const TEXT = [
    ["global", "booking_email", "bookings@stephylongueira.com", "Booking email (used in Hero, Contact & Footer)", false],
    ["global", "footer_tagline", "Bringing electrifying performances to venues worldwide. Available for bookings and collaborations.", "Footer tagline", true],
    ["home", "hero_cta_primary", "Book Now", "Hero — primary button", false],
    ["home", "hero_cta_secondary", "Upcoming Shows", "Hero — secondary button", false],
    ["home", "shows_subtitle", "Catch Stephy live at these upcoming events worldwide.", "Upcoming Shows — subtitle", false],
    ["gallery", "title", "GALLERY", "Gallery — page title", false],
    ["gallery", "subtitle", "A visual journey through performances, moments, and memories.", "Gallery — subtitle", true],
    ["music", "title", "MUSIC", "Music — page title", false],
    ["music", "subtitle", "Releases, remixes, and mixes from Stephy Longueira.", "Music — subtitle", true],
    ["music", "footer_note", "More releases coming soon.", "Music — note under releases", false],
    ["venues", "subtitle", "The world's most iconic dance floors.", "Venues — subtitle", true],
    ["venues", "cta_line1", "BRING THE ENERGY", "Venues CTA — line 1 (metallic)", false],
    ["venues", "cta_line2", "TO YOUR VENUE", "Venues CTA — line 2 (white)", false],
    ["venues", "cta_sub", "Available for bookings worldwide.", "Venues CTA — sub-copy", true],
    ["venues", "cta_button", "Get in Touch", "Venues CTA — button", false],
    ["contact", "subtitle", "For bookings, collaborations, or inquiries.", "Contact — subtitle", true],
    ["contact", "booking_agent", "Agent: John Marlow", "Contact — booking agent line", false],
  ];
  const textRows = TEXT.map(([page, slot, value, label, multiline], i) => ({
    page, slot, value, label, multiline, sort_order: i,
  }));
  {
    const { error } = await db.from("stephy_text").upsert(textRows, { onConflict: "page,slot" });
    if (error) throw new Error(`upsert text: ${error.message}`);
  }
  summary.text = textRows.length;

  console.log("\nMigration complete:", JSON.stringify(summary, null, 2));
}

main().catch((e) => {
  console.error("\nMIGRATION FAILED:", e.message);
  process.exit(1);
});
