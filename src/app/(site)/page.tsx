import Hero from "@/components/Hero";
import ScrollCarousel from "@/components/ScrollCarousel";
import UpcomingShows from "@/components/UpcomingShows";
import { getCarouselImages as getFsCarouselImages } from "@/lib/carouselImages";
import { getCarouselImages, getShows, getText, pick } from "@/lib/content";

export const revalidate = 60;

export default async function Home() {
  const [shows, dbCarousel, fsCarousel, text] = await Promise.all([
    getShows(),
    getCarouselImages(),
    getFsCarouselImages(),
    getText(["home", "global"]),
  ]);

  // Prefer the photos Stephy flagged for the home strip; otherwise the bundled ones.
  const carouselImages = dbCarousel.length > 0 ? dbCarousel : fsCarousel;

  return (
    <>
      <Hero
        ctaPrimary={pick(text, "home", "hero_cta_primary", "Book Now")}
        ctaSecondary={pick(text, "home", "hero_cta_secondary", "Upcoming Shows")}
        bookingEmail={pick(text, "global", "booking_email", "bookings@stephylongueira.com")}
      />
      <ScrollCarousel images={carouselImages} />
      <UpcomingShows
        shows={shows}
        subtitle={pick(text, "home", "shows_subtitle", "Catch Stephy live at these upcoming events worldwide.")}
      />
    </>
  );
}
