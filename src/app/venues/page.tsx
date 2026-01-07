"use client";

import { motion } from "framer-motion";
import Image from "next/image";

// Replace these filenames with your actual venue logo filenames in /public/assets/venues/
const venueLogos = [
  "venue-1.png",
  "venue-2.png",
  "venue-3.png",
  "venue-4.png",
  "venue-5.png",
  "venue-6.png",
  "venue-7.png",
  "venue-8.png",
  "venue-9.png",
  "venue-10.png",
  "venue-11.png",
  "venue-12.png",
  "venue-13.png",
  "venue-14.png",
  "venue-15.png",
  "venue-16.png",
  "venue-17.png",
  "venue-18.png",
  "venue-19.png",
  "venue-20.png",
];

export default function VenuesPage() {
  return (
    <main className="min-h-screen pt-24 pb-16 bg-black">
      {/* Header */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
              <span className="gradient-text">FEATURED</span>
              <br />
              <span className="text-white">VENUES</span>
            </h1>
            <p className="text-muted-foreground max-w-xl mx-auto uppercase tracking-widest text-[10px]">
              The world&apos;s most iconic dance floors.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Venue Logos Grid */}
      <section className="pb-20">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-10 gap-8 items-center justify-items-center">
            {venueLogos.map((logo, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.1 }}
                className="relative w-full aspect-square grayscale hover:grayscale-0 transition-all duration-500"
              >
                {/* 
                  Using a placeholder if the image doesn't exist yet. 
                  When you add the actual files to /public/assets/venues/, 
                  Next.js will serve them.
                */}
                <Image
                  src={`/assets/venues/${logo}`}
                  alt={`Venue Logo ${index + 1}`}
                  fill
                  className="object-contain"
                  onError={(e) => {
                    // This is just a fallback for when the images haven't been added yet
                    (e.target as any).style.display = 'none';
                  }}
                />
                
                {/* Temporary placeholder circle for visualization until images are added */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
                   <div className="w-12 h-12 rounded-full border border-white/20" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-white/[0.02]">
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              <span className="gradient-text">BRING THE ENERGY</span>
              <br />
              <span className="text-white">TO YOUR VENUE</span>
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto mb-10 text-xs uppercase tracking-widest leading-loose">
              Available for bookings worldwide.
            </p>
            <motion.a
              href="/contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-block px-12 py-5 bg-white text-black font-bold uppercase tracking-[0.2em] text-[10px] rounded-full transition-all"
            >
              Get in Touch
            </motion.a>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
