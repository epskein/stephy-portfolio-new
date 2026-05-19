import fs from "fs";
import path from "path";
import sharp from "sharp";
import GalleryGrid from "@/components/GalleryGrid";
import { getGalleryImages } from "@/sanity/queries";

export const revalidate = 60;

// Fallback: scan the bundled gallery folder (used until photos are added in
// the Sanity Studio).
async function getFallbackGalleryData() {
  const galleryDir = path.join(process.cwd(), "public/assets/gallery");

  if (!fs.existsSync(galleryDir)) {
    return { images: [], categories: [] };
  }

  const categories = fs.readdirSync(galleryDir).filter((file) => {
    return fs.statSync(path.join(galleryDir, file)).isDirectory();
  });

  const entries: {
    id: string;
    src: string;
    category: string;
    abs: string;
  }[] = [];

  categories.forEach((category) => {
    const categoryDir = path.join(galleryDir, category);
    const files = fs.readdirSync(categoryDir).filter((file) => {
      const ext = path.extname(file).toLowerCase();
      return [".jpg", ".jpeg", ".png", ".webp"].includes(ext);
    });

    files.forEach((file) => {
      entries.push({
        id: `${category}-${file}`,
        src: `/assets/gallery/${category}/${file}`,
        category,
        abs: path.join(categoryDir, file),
      });
    });
  });

  const images = await Promise.all(
    entries.map(async (entry) => {
      let width = 4;
      let height = 3;
      try {
        const meta = await sharp(entry.abs).metadata();
        width = meta.width ?? 4;
        height = meta.height ?? 3;
        // EXIF orientations 5-8 mean the image is stored rotated 90°.
        if (meta.orientation && meta.orientation >= 5) {
          [width, height] = [height, width];
        }
      } catch {
        /* fall back to 4:3 */
      }
      return {
        id: entry.id,
        src: entry.src,
        category: entry.category,
        width,
        height,
      };
    })
  );

  // Shuffle the entire images array so "ALL" section is randomized
  const shuffledImages = [...images].sort(() => Math.random() - 0.5);

  return { images: shuffledImages, categories };
}

export default async function GalleryPage() {
  const sanityImages = await getGalleryImages();

  let images: { id: string; src: string; category: string; width: number; height: number }[];
  if (sanityImages.length > 0) {
    images = [...sanityImages].sort(() => Math.random() - 0.5);
  } else {
    images = (await getFallbackGalleryData()).images;
  }
  const categories = [...new Set(images.map((img) => img.category))];

  return (
    <main className="min-h-screen pt-24 pb-16">
      {/* Header */}
      <section className="py-16">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-4 uppercase tracking-tight">
            <span className="gradient-text">GALLERY</span>
          </h1>
          <p className="text-muted-foreground max-w-xl mx-auto uppercase tracking-widest text-[10px]">
            A visual journey through performances, moments, and memories.
          </p>
        </div>
      </section>

      {/* Grid Component (Client-side interactivity) */}
      <GalleryGrid images={images} categories={categories} />
    </main>
  );
}
