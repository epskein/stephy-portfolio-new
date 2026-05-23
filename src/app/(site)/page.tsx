import Hero from "@/components/Hero";
import ScrollCarousel from "@/components/ScrollCarousel";
import UpcomingShows from "@/components/UpcomingShows";
import { getCarouselImages as getFsCarouselImages } from "@/lib/carouselImages";
import {
  getCarouselImages as getSanityCarouselImages,
  getShows,
} from "@/sanity/queries";

export const revalidate = 60;

export default async function Home() {
  const [shows, sanityCarousel, fsCarousel] = await Promise.all([
    getShows(),
    getSanityCarouselImages(),
    getFsCarouselImages(),
  ]);

  // Use Sanity carousel images once added; otherwise the bundled photos.
  const carouselImages =
    sanityCarousel.length > 0 ? sanityCarousel : fsCarousel;

  return (
    <>
      <Hero />
      <ScrollCarousel images={carouselImages} />
      <UpcomingShows shows={shows} />
    </>
  );
}
