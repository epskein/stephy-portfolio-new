import ContactContent from "@/components/ContactContent";
import { getSocialLinks } from "@/sanity/queries";

export const revalidate = 60;

export default async function ContactPage() {
  const socialLinks = await getSocialLinks();
  return <ContactContent socialLinks={socialLinks} />;
}
