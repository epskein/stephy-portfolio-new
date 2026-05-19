import { client } from "./client";
import { urlFor } from "./image";

// All Sanity reads revalidate every 60s — content updates appear within a
// minute, with no rebuild or redeploy.
const fetchOpts = { next: { revalidate: 60 } } as const;

// Resilient fetch: if the dataset is unreachable / private / empty, return the
// fallback so the site keeps rendering its bundled content.
async function safeFetch<T>(query: string, fallback: T): Promise<T> {
  try {
    const result = await client.fetch<T>(query, {}, fetchOpts);
    return (result ?? fallback) as T;
  } catch {
    return fallback;
  }
}

/* ------------------------------- Shows -------------------------------- */
export interface SanityShow {
  id: string;
  dateRange: { start: string; end?: string };
  venue: string;
  flag: string;
  location: string;
}

export async function getShows(): Promise<SanityShow[]> {
  const rows = await safeFetch<
    {
      id: string;
      venue: string;
      start: string;
      end?: string;
      flag: string;
      location: string;
    }[]
  >(
    `*[_type=="show" && defined(startDate)]|order(startDate asc){
      "id":_id, venue, "start":startDate, "end":endDate, flag, location
    }`,
    []
  );
  return rows.map((r) => ({
    id: r.id,
    venue: r.venue,
    flag: r.flag,
    location: r.location,
    dateRange: { start: r.start, end: r.end || undefined },
  }));
}

/* ------------------------------ Gallery ------------------------------- */
export interface SanityGalleryImage {
  id: string;
  src: string;
  category: string;
  width: number;
  height: number;
}

const galleryProjection = `{
  "id":_id, category, image,
  "w":image.asset->metadata.dimensions.width,
  "h":image.asset->metadata.dimensions.height
}`;

type RawGalleryImage = {
  id: string;
  category: string;
  image: unknown;
  w?: number;
  h?: number;
};

function mapGallery(rows: RawGalleryImage[]): SanityGalleryImage[] {
  return rows
    .filter((r) => r.image)
    .map((r) => ({
      id: r.id,
      category: r.category,
      width: r.w || 4,
      height: r.h || 3,
      src: urlFor(r.image as Parameters<typeof urlFor>[0])
        .width(1400)
        .quality(75)
        .url(),
    }));
}

export async function getGalleryImages(): Promise<SanityGalleryImage[]> {
  const rows = await safeFetch<RawGalleryImage[]>(
    `*[_type=="galleryImage"]|order(order asc, _createdAt asc)${galleryProjection}`,
    []
  );
  return mapGallery(rows);
}

export async function getCarouselImages(): Promise<
  { src: string; width: number; height: number }[]
> {
  const rows = await safeFetch<RawGalleryImage[]>(
    `*[_type=="galleryImage" && featuredOnHome==true]|order(order asc, _createdAt asc)${galleryProjection}`,
    []
  );
  return mapGallery(rows).map(({ src, width, height }) => ({
    src,
    width,
    height,
  }));
}

/* --------------------------- Music releases --------------------------- */
export interface SanityRelease {
  id: string;
  title: string;
  releaseType: string;
  year?: string;
  link?: string;
  coverUrl?: string;
}

export async function getMusicReleases(): Promise<SanityRelease[]> {
  const rows = await safeFetch<
    {
      id: string;
      title: string;
      releaseType: string;
      year?: string;
      link?: string;
      coverArt?: unknown;
    }[]
  >(
    `*[_type=="musicRelease"]|order(order asc, _createdAt asc){
      "id":_id, title, releaseType, year, link, coverArt
    }`,
    []
  );
  return rows.map((r) => ({
    id: r.id,
    title: r.title,
    releaseType: r.releaseType,
    year: r.year,
    link: r.link,
    coverUrl: r.coverArt
      ? urlFor(r.coverArt as Parameters<typeof urlFor>[0])
          .width(800)
          .quality(75)
          .url()
      : undefined,
  }));
}

/* ---------------------------- Social links ---------------------------- */
export interface SanitySocial {
  name: string;
  href: string;
  handle: string;
}

export async function getSocialLinks(): Promise<SanitySocial[]> {
  const rows = await safeFetch<
    { platform: string; url: string; handle?: string }[]
  >(
    `*[_type=="socialLink" && defined(url)]|order(order asc, _createdAt asc){
      platform, url, handle
    }`,
    []
  );
  return rows.map((r) => ({
    name: r.platform,
    href: r.url,
    handle: r.handle || "",
  }));
}

/* ----------------------------- About page ----------------------------- */
export interface SanityAbout {
  bio: string[];
  profileUrl?: string;
  stats: { value: string; label: string }[];
  journey: { year: string; title: string; description: string }[];
  styleDescription?: string;
  genres: string[];
}

export async function getAboutPage(): Promise<SanityAbout | null> {
  const row = await safeFetch<{
    bio?: string[];
    profileImage?: unknown;
    stats?: { value: string; label: string }[];
    journey?: { year: string; title: string; description: string }[];
    styleDescription?: string;
    genres?: string[];
  } | null>(
    `*[_type=="aboutPage"][0]{
      bio, profileImage, stats, journey, styleDescription, genres
    }`,
    null
  );
  if (!row) return null;
  return {
    bio: row.bio || [],
    profileUrl: row.profileImage
      ? urlFor(row.profileImage as Parameters<typeof urlFor>[0])
          .width(1000)
          .quality(80)
          .url()
      : undefined,
    stats: row.stats || [],
    journey: row.journey || [],
    styleDescription: row.styleDescription,
    genres: row.genres || [],
  };
}
