import ScrollCarousel, { type CarouselAnimation } from "@/components/ScrollCarousel";
import { getCarouselImages } from "@/lib/carouselImages";

const variants: {
  key: CarouselAnimation;
  title: string;
  description: string;
}[] = [
  {
    key: "hover",
    title: "Option A — Hover Zoom + Lift (static)",
    description:
      "The carousel stays still. Use the arrow buttons or swipe to move. Hovering a card lifts it, gently zooms the photo, and adds a soft glow.",
  },
  {
    key: "autoscroll",
    title: "Option B — Auto-Scroll + Hover Zoom & Lift",
    description:
      "The images scroll across on their own, continuously. Move your cursor over the strip and the auto-scroll pauses; the card you hover lifts and zooms just like Option A.",
  },
];

export default async function CarouselPreviewPage() {
  const carouselImages = await getCarouselImages();

  return (
    <main className="min-h-screen pt-24 pb-16 bg-black">
      <section className="py-12">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-3xl md:text-5xl font-black uppercase tracking-tight mb-4">
            <span className="gradient-text">CAROUSEL</span>{" "}
            <span className="text-white">ANIMATION PREVIEW</span>
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto uppercase tracking-widest text-[10px] leading-loose">
            Two takes on the home &ldquo;Moments Captured&rdquo; carousel. Hover
            the cards on each, then tell me which option you want applied.
          </p>
        </div>
      </section>

      {variants.map((variant) => (
        <div key={variant.key} className="border-t border-white/10">
          <div className="container mx-auto px-6 pt-16">
            <h2 className="text-xl md:text-2xl font-bold text-white uppercase tracking-tight">
              {variant.title}
            </h2>
            <p className="text-muted-foreground text-xs md:text-sm mt-2 max-w-2xl normal-case tracking-normal">
              {variant.description}
            </p>
          </div>
          <ScrollCarousel images={carouselImages} animation={variant.key} />
        </div>
      ))}
    </main>
  );
}
