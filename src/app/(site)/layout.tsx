import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import PageLoader from "@/components/PageLoader";
import { getSocialLinks, getText, pick } from "@/lib/content";

export const revalidate = 60;

export default async function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [socialLinks, text] = await Promise.all([
    getSocialLinks(),
    getText(["global"]),
  ]);

  return (
    <>
      <PageLoader />
      <Navigation />
      <main>{children}</main>
      <Footer
        socialLinks={socialLinks}
        bookingEmail={pick(text, "global", "booking_email", "bookings@stephylongueira.com")}
        tagline={pick(text, "global", "footer_tagline", "Bringing electrifying performances to venues worldwide. Available for bookings and collaborations.")}
      />
    </>
  );
}
