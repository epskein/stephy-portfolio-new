import AboutContent from "@/components/AboutContent";
import { getAboutPage } from "@/lib/content";

export const revalidate = 60;

export default async function AboutPage() {
  const about = await getAboutPage();
  return <AboutContent about={about} />;
}
