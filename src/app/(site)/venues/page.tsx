import fs from "fs";
import path from "path";
import { motion } from "framer-motion";
import Image from "next/image";
import VenuesGrid from "@/components/VenuesGrid";

// Server-side logic to scan the venues folder
async function getVenueLogos() {
  const venuesDir = path.join(process.cwd(), "public/assets/venues");
  
  if (!fs.existsSync(venuesDir)) {
    return [];
  }

  const files = fs.readdirSync(venuesDir).filter((file) => {
    return [".jpg", ".jpeg", ".png", ".webp", ".svg"].includes(path.extname(file).toLowerCase());
  });

  return files;
}

export default async function VenuesPage() {
  const logos = await getVenueLogos();

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
            The world&apos;s most iconic dance floors.
          </p>
        </div>
      </section>

      {/* Venue Logos Grid (Client component for animations) */}
      <VenuesGrid logos={logos} />

      {/* CTA Section */}
      <section className="py-24 bg-white/[0.02]">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            <span className="gradient-text">BRING THE ENERGY</span>
            <br />
            <span className="text-white">TO YOUR VENUE</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto mb-10 text-xs uppercase tracking-widest leading-loose">
            Available for bookings worldwide.
          </p>
          <a
            href="/contact"
            className="inline-block px-12 py-5 bg-white text-black font-bold uppercase tracking-[0.2em] text-[10px] rounded-full transition-all hover:scale-105 active:scale-95"
          >
            Get in Touch
          </a>
        </div>
      </section>
    </main>
  );
}
