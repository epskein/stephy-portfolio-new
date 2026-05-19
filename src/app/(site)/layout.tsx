import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import PageLoader from "@/components/PageLoader";
import { getSocialLinks } from "@/sanity/queries";

export const revalidate = 60;

export default async function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const socialLinks = await getSocialLinks();

  return (
    <>
      <PageLoader />
      <Navigation />
      <main>{children}</main>
      <Footer socialLinks={socialLinks} />
    </>
  );
}
