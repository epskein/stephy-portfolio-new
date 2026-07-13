import ContactContent from "@/components/ContactContent";
import { getSocialLinks, getText, pick } from "@/lib/content";

export const revalidate = 60;

export default async function ContactPage() {
  const [socialLinks, text] = await Promise.all([
    getSocialLinks(),
    getText(["contact", "global"]),
  ]);
  return (
    <ContactContent
      socialLinks={socialLinks}
      subtitle={pick(text, "contact", "subtitle", "For bookings, collaborations, or inquiries.")}
      bookingAgent={pick(text, "contact", "booking_agent", "Agent: John Marlow")}
      bookingEmail={pick(text, "global", "booking_email", "bookings@stephylongueira.com")}
    />
  );
}
