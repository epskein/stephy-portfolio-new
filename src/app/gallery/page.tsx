import fs from "fs";
import path from "path";
import GalleryGrid from "@/components/GalleryGrid";

// Server-side logic to scan the gallery folder
async function getGalleryData() {
  const galleryDir = path.join(process.cwd(), "public/assets/gallery");
  
  if (!fs.existsSync(galleryDir)) {
    return { images: [], categories: [] };
  }

  const categories = fs.readdirSync(galleryDir).filter((file) => {
    return fs.statSync(path.join(galleryDir, file)).isDirectory();
  });

  const images: { id: string; src: string; category: string }[] = [];

  categories.forEach((category) => {
    const categoryDir = path.join(galleryDir, category);
    const files = fs.readdirSync(categoryDir).filter((file) => {
      return [".jpg", ".jpeg", ".png", ".webp"].includes(path.extname(file).toLowerCase());
    });

    files.forEach((file) => {
      images.push({
        id: `${category}-${file}`,
        src: `/assets/gallery/${category}/${file}`,
        category: category,
      });
    });
  });

  return { images, categories };
}

export default async function GalleryPage() {
  const { images, categories } = await getGalleryData();

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
