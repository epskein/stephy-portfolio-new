"use client";

import { motion } from "framer-motion";
import Image from "next/image";

interface VenuesGridProps {
  logos: string[];
}

export default function VenuesGrid({ logos }: VenuesGridProps) {
  return (
    <section className="pb-20">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-10 gap-12 items-center justify-items-center">
          {logos.map((logo, index) => (
            <motion.div
              key={logo}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: (index % 10) * 0.05 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.1 }}
              className="relative w-full aspect-square grayscale hover:grayscale-0 transition-all duration-500 flex items-center justify-center p-2"
            >
              <Image
                src={`/assets/venues/${logo}`}
                alt={`Venue Logo ${index + 1}`}
                fill
                className="object-contain"
                sizes="(max-width: 640px) 50vw, (max-width: 768px) 25vw, (max-width: 1024px) 16vw, (max-width: 1280px) 12vw, 10vw"
              />
            </motion.div>
          ))}
        </div>
        
        {logos.length === 0 && (
          <div className="text-center py-20">
            <p className="text-muted-foreground uppercase tracking-widest text-xs">
              Add venue logos to public/assets/venues/ to see them here.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

