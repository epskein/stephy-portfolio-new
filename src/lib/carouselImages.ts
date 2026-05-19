import path from "path";
import sharp from "sharp";
import type { CarouselImage } from "@/components/ScrollCarousel";

// Images shown in the home "Moments Captured" carousel.
const carouselImagePaths = [
  "/assets/gallery/live/StephyLongueira15.jpg",
  "/assets/gallery/portraits/StephyLongueira1.jpg",
  "/assets/gallery/live/StephyLongueira21.jpg",
  "/assets/gallery/live/StephyLongueira2.JPG",
  "/assets/gallery/live/StephyLongueira22.jpg",
  "/assets/gallery/live/StephyLongueira14.jpg",
  "/assets/gallery/live/StephyLongueira29.jpg",
  "/assets/gallery/portraits/StephyLongueira9.jpg",
  "/assets/gallery/live/StephyLongueira31.jpg",
  "/assets/gallery/live/StephyLongueira13.jpg",
];

// Read each image's real (orientation-corrected) dimensions so the carousel
// can render adaptive-width cards instead of cropping portrait photos.
export async function getCarouselImages(): Promise<CarouselImage[]> {
  return Promise.all(
    carouselImagePaths.map(async (src) => {
      try {
        const filePath = path.join(process.cwd(), "public", src);
        const meta = await sharp(filePath).metadata();
        let width = meta.width ?? 4;
        let height = meta.height ?? 3;
        // EXIF orientations 5-8 mean the image is stored rotated 90°.
        if (meta.orientation && meta.orientation >= 5) {
          [width, height] = [height, width];
        }
        return { src, width, height };
      } catch {
        return { src, width: 4, height: 3 };
      }
    })
  );
}
