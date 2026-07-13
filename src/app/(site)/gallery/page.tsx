import GalleryGrid from "@/components/GalleryGrid";
import { getGalleryImages, getText, pick } from "@/lib/content";

export const revalidate = 60;

export default async function GalleryPage() {
  const [dbImages, text] = await Promise.all([
    getGalleryImages(),
    getText(["gallery"]),
  ]);

  // Randomize so the "All" view feels fresh; category order is preserved by filter.
  const images = [...dbImages].sort(() => Math.random() - 0.5);
  const categories = [...new Set(images.map((img) => img.category))];

  const title = pick(text, "gallery", "title", "GALLERY");
  const subtitle = pick(
    text,
    "gallery",
    "subtitle",
    "A visual journey through performances, moments, and memories."
  );

  return (
    <main className="min-h-screen pt-24 pb-16">
      {/* Header */}
      <section className="py-16">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-4 uppercase tracking-tight">
            <span className="gradient-text">{title}</span>
          </h1>
          <p className="text-muted-foreground max-w-xl mx-auto uppercase tracking-widest text-[10px]">
            {subtitle}
          </p>
        </div>
      </section>

      {/* Grid Component (Client-side interactivity) */}
      <GalleryGrid images={images} categories={categories} />
    </main>
  );
}
