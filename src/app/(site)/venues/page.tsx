import VenuesGrid from "@/components/VenuesGrid";
import { getVenues, getText, pick } from "@/lib/content";

export const revalidate = 60;

export default async function VenuesPage() {
  const [venues, text] = await Promise.all([getVenues(), getText(["venues"])]);

  const subtitle = pick(text, "venues", "subtitle", "The world's most iconic dance floors.");
  const ctaLine1 = pick(text, "venues", "cta_line1", "BRING THE ENERGY");
  const ctaLine2 = pick(text, "venues", "cta_line2", "TO YOUR VENUE");
  const ctaSub = pick(text, "venues", "cta_sub", "Available for bookings worldwide.");
  const ctaButton = pick(text, "venues", "cta_button", "Get in Touch");

  return (
    <main className="min-h-screen pt-24 pb-16 bg-black">
      {/* Header */}
      <section className="py-16">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-4 uppercase tracking-tight">
            <span className="gradient-text">FEATURED</span>
            <br />
            <span className="text-white">VENUES</span>
          </h1>
          <p className="text-muted-foreground max-w-xl mx-auto uppercase tracking-widest text-[10px]">
            {subtitle}
          </p>
        </div>
      </section>

      {/* Venue Logos Grid (Client component for animations) */}
      <VenuesGrid venues={venues} />

      {/* CTA Section */}
      <section className="py-24 bg-white/[0.02]">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            <span className="gradient-text">{ctaLine1}</span>
            <br />
            <span className="text-white">{ctaLine2}</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto mb-10 text-xs uppercase tracking-widest leading-loose">
            {ctaSub}
          </p>
          <a
            href="/contact"
            className="inline-block px-12 py-5 bg-white text-black font-bold uppercase tracking-[0.2em] text-[10px] rounded-full transition-all hover:scale-105 active:scale-95"
          >
            {ctaButton}
          </a>
        </div>
      </section>
    </main>
  );
}
