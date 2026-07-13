"use client";

import { motion } from "framer-motion";
import Image from "next/image";

interface Venue {
  id: string;
  name: string;
  src: string;
}

interface VenuesGridProps {
  venues: Venue[];
}

export default function VenuesGrid({ venues }: VenuesGridProps) {
  return (
    <section className="pb-20">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-10 gap-6 sm:gap-10 lg:gap-12 items-center justify-items-center">
          {venues.map((venue, index) => (
            <motion.div
              key={venue.id}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: (index % 10) * 0.05 }}
              viewport={{ once: true }}
              className="relative w-full aspect-square grayscale flex items-center justify-center p-2"
            >
              <Image
                src={venue.src}
                alt={venue.name || `Venue Logo ${index + 1}`}
                fill
                className="object-contain"
                sizes="(max-width: 640px) 50vw, (max-width: 768px) 25vw, (max-width: 1024px) 16vw, (max-width: 1280px) 12vw, 10vw"
              />
            </motion.div>
          ))}
        </div>

        {venues.length === 0 && (
          <div className="text-center py-20">
            <p className="text-muted-foreground uppercase tracking-widest text-xs">
              Add venue logos in the manage portal to see them here.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
