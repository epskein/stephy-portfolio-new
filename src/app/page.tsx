import Hero from "@/components/Hero";
import ScrollCarousel from "@/components/ScrollCarousel";
import UpcomingShows from "@/components/UpcomingShows";
import { getCarouselImages } from "@/lib/carouselImages";

export default async function Home() {
  const carouselImages = await getCarouselImages();

  return (
    <>
      <Hero />
      <ScrollCarousel images={carouselImages} animation="hover" />
      <UpcomingShows />
    </>
  );
}
