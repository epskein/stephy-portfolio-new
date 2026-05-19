/**
 * One-time content seed: imports the site's existing content into Sanity so
 * Stephy doesn't have to re-enter it by hand.
 *
 * Usage:
 *   1. In manage.sanity.io -> project -> API -> Tokens, create an "Editor" token.
 *   2. Add it to .env.local:   SANITY_API_WRITE_TOKEN=your_token_here
 *   3. Run:  npm run seed
 *
 * Safe to re-run — documents use fixed IDs (createOrReplace) and Sanity
 * de-duplicates uploaded images by content, so nothing is duplicated.
 */
import { createClient } from "@sanity/client";
import { readFileSync, readdirSync } from "fs";
import { join, extname, basename } from "path";

const token = process.env.SANITY_API_WRITE_TOKEN;
if (!token) {
  console.error(
    "\n  Missing SANITY_API_WRITE_TOKEN.\n" +
      "  Add it to .env.local, then run: npm run seed\n"
  );
  process.exit(1);
}

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "4uhc6klk",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2024-10-01",
  token,
  useCdn: false,
});

const publicDir = join(process.cwd(), "public");
const IMAGE_EXTS = [".jpg", ".jpeg", ".png", ".webp"];

async function uploadImage(relPath) {
  const buffer = readFileSync(join(publicDir, relPath));
  const asset = await client.assets.upload("image", buffer, {
    filename: basename(relPath),
  });
  return { _type: "image", asset: { _type: "reference", _ref: asset._id } };
}

/* -------------------------------- Shows -------------------------------- */
async function seedShows() {
  const shows = [
    { id: "show-mirage", venue: "Mirage", startDate: "2026-05-29", location: "(CPT, RSA)", flag: "🇿🇦" },
    { id: "show-luminary-gala", venue: "Luminary Gala", startDate: "2026-06-06", location: "(CPT, RSA)", flag: "🇿🇦" },
    { id: "show-lost-city", venue: "Lost City", startDate: "2026-09-24", endDate: "2026-09-28", location: "POD Karoo (WC, RSA)", flag: "🇿🇦" },
    { id: "show-lazerville", venue: "Lazerville", startDate: "2026-10-22", endDate: "2026-10-26", location: "POD Karoo (WC, RSA)", flag: "🇿🇦" },
  ];
  for (const s of shows) {
    await client.createOrReplace({
      _id: s.id,
      _type: "show",
      venue: s.venue,
      startDate: s.startDate,
      ...(s.endDate ? { endDate: s.endDate } : {}),
      location: s.location,
      flag: s.flag,
    });
  }
  console.log(`  Shows: ${shows.length} seeded`);
}

/* ----------------------------- Social links ---------------------------- */
async function seedSocials() {
  // Instagram & TikTok are real; the rest are placeholders to edit in Studio.
  const socials = [
    { id: "social-instagram", platform: "Instagram", url: "https://instagram.com/stephylongueira", handle: "@stephylongueira" },
    { id: "social-tiktok", platform: "TikTok", url: "https://tiktok.com/@stephylongueira", handle: "@stephylongueira" },
    { id: "social-spotify", platform: "Spotify", url: "https://open.spotify.com", handle: "Stephy Longueira" },
    { id: "social-soundcloud", platform: "SoundCloud", url: "https://soundcloud.com", handle: "stephylongueira" },
    { id: "social-applemusic", platform: "Apple Music", url: "https://music.apple.com", handle: "Stephy Longueira" },
    { id: "social-youtube", platform: "YouTube", url: "https://youtube.com", handle: "Stephy Longueira" },
  ];
  for (let i = 0; i < socials.length; i++) {
    const s = socials[i];
    await client.createOrReplace({
      _id: s.id,
      _type: "socialLink",
      platform: s.platform,
      url: s.url,
      handle: s.handle,
      order: i + 1,
    });
  }
  console.log(`  Social links: ${socials.length} seeded`);
}

/* ------------------------------- Gallery ------------------------------- */
async function seedGallery() {
  // Photos featured in the home "Moments Captured" carousel.
  const featured = new Set([
    "live/StephyLongueira15.jpg",
    "portraits/StephyLongueira1.jpg",
    "live/StephyLongueira21.jpg",
    "live/StephyLongueira2.JPG",
    "live/StephyLongueira22.jpg",
    "live/StephyLongueira14.jpg",
    "live/StephyLongueira29.jpg",
    "portraits/StephyLongueira9.jpg",
    "live/StephyLongueira31.jpg",
    "live/StephyLongueira13.jpg",
  ]);

  let count = 0;
  let order = 0;
  for (const category of ["live", "portraits"]) {
    const dir = join(publicDir, "assets", "gallery", category);
    let files;
    try {
      files = readdirSync(dir);
    } catch {
      continue;
    }
    for (const file of files) {
      if (!IMAGE_EXTS.includes(extname(file).toLowerCase())) continue;
      const relPath = `assets/gallery/${category}/${file}`;
      try {
        const image = await uploadImage(relPath);
        const slug = basename(file, extname(file));
        await client.createOrReplace({
          _id: `gallery-${category}-${slug}`,
          _type: "galleryImage",
          category,
          image,
          featuredOnHome: featured.has(`${category}/${file}`),
          order: order++,
        });
        count++;
      } catch (err) {
        console.warn(`  ! skipped ${relPath}: ${err.message}`);
      }
    }
  }
  console.log(`  Gallery: ${count} images seeded`);
}

/* ------------------------------- About --------------------------------- */
async function seedAbout() {
  const profileImage = await uploadImage("assets/StephyLongueira6.jpg");
  await client.createOrReplace({
    _id: "aboutPage",
    _type: "aboutPage",
    profileImage,
    bio: [
      "Stephy Longueira is a dynamic DJ and artist who has been captivating audiences worldwide with her unique blend of electronic music. With a passion for creating unforgettable experiences on the dance floor, she has established herself as a rising force in the electronic music scene.",
      "Her sets are known for their energy, seamless transitions, and ability to read the crowd, taking listeners on a journey through various genres while maintaining a cohesive sonic experience.",
      "From intimate club settings to major festival stages, Stephy brings the same level of dedication and artistry to every performance, ensuring that each show is a unique and memorable experience.",
    ],
    stats: [
      { _type: "stat", _key: "s0", value: "100+", label: "Shows" },
      { _type: "stat", _key: "s1", value: "50+", label: "Venues" },
      { _type: "stat", _key: "s2", value: "10+", label: "Countries" },
    ],
    journey: [
      { _type: "milestone", _key: "j0", year: "2018", title: "The Beginning", description: "Started DJing at local venues, developing a unique sound and style." },
      { _type: "milestone", _key: "j1", year: "2020", title: "Breakthrough", description: "First major festival appearance and residency at a renowned club." },
      { _type: "milestone", _key: "j2", year: "2022", title: "International", description: "Expanded to international venues, performing across Europe and beyond." },
      { _type: "milestone", _key: "j3", year: "2024", title: "Present", description: "Continuing to push boundaries and create unforgettable experiences worldwide." },
    ],
    styleDescription:
      "Drawing inspiration from a wide range of electronic music genres, Stephy's sound is characterized by driving beats, melodic elements, and an infectious energy that keeps dance floors moving. Her sets seamlessly blend house, techno, and progressive elements, creating a unique sonic signature that has become her trademark.",
    genres: ["House", "Techno", "Progressive", "Melodic", "Deep House", "Tech House"],
  });
  console.log("  About page: seeded");
}

async function main() {
  console.log("\nSeeding Sanity content...\n");
  await seedShows();
  await seedSocials();
  await seedGallery();
  await seedAbout();
  console.log(
    "\nDone. Open the Studio to review — content appears on the live site within ~1 minute.\n" +
      "Note: Music Releases were not seeded (no real releases yet) — add those in the Studio.\n"
  );
}

main().catch((err) => {
  console.error("\nSeed failed:", err.message);
  process.exit(1);
});
