"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

// Placeholder images - will be replaced with actual images
const topRowImages = [
  { id: 1, placeholder: "Image 1" },
  { id: 2, placeholder: "Image 2" },
  { id: 3, placeholder: "Image 3" },
  { id: 4, placeholder: "Image 4" },
  { id: 5, placeholder: "Image 5" },
  { id: 6, placeholder: "Image 6" },
  { id: 7, placeholder: "Image 7" },
  { id: 8, placeholder: "Image 8" },
];

const bottomRowImages = [
  { id: 9, placeholder: "Image 9" },
  { id: 10, placeholder: "Image 10" },
  { id: 11, placeholder: "Image 11" },
  { id: 12, placeholder: "Image 12" },
  { id: 13, placeholder: "Image 13" },
  { id: 14, placeholder: "Image 14" },
  { id: 15, placeholder: "Image 15" },
  { id: 16, placeholder: "Image 16" },
];

export default function ScrollCarousel() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Top row moves left as you scroll down
  const topRowX = useTransform(scrollYProgress, [0, 1], ["0%", "-50%"]);
  // Bottom row moves right as you scroll down
  const bottomRowX = useTransform(scrollYProgress, [0, 1], ["-50%", "0%"]);

  return (
    <section
      ref={containerRef}
      className="relative py-20 overflow-hidden bg-muted/30"
    >
      {/* Section title */}
      <div className="container mx-auto px-6 mb-12">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold text-center"
        >
          <span className="gradient-text">MOMENTS</span>
          <span className="text-foreground ml-3">CAPTURED</span>
        </motion.h2>
      </div>

      {/* Top Row - scrolls left */}
      <motion.div style={{ x: topRowX }} className="flex gap-4 mb-4">
        {[...topRowImages, ...topRowImages].map((image, index) => (
          <div
            key={`top-${index}`}
            className="relative flex-shrink-0 w-64 h-40 md:w-80 md:h-52 rounded-lg overflow-hidden group"
          >
            {/* Placeholder - replace with actual Image component */}
            <div className="w-full h-full bg-gradient-to-br from-accent/10 to-accent-secondary/10 flex items-center justify-center border border-white/5">
              <span className="text-muted-foreground text-xs uppercase tracking-widest">
                {image.placeholder}
              </span>
            </div>
            {/* Hover overlay */}
            <div className="absolute inset-0 bg-accent/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
        ))}
      </motion.div>

      {/* Bottom Row - scrolls right */}
      <motion.div style={{ x: bottomRowX }} className="flex gap-4">
        {[...bottomRowImages, ...bottomRowImages].map((image, index) => (
          <div
            key={`bottom-${index}`}
            className="relative flex-shrink-0 w-64 h-40 md:w-80 md:h-52 rounded-lg overflow-hidden group"
          >
            {/* Placeholder - replace with actual Image component */}
            <div className="w-full h-full bg-gradient-to-br from-accent-secondary/10 to-accent/10 flex items-center justify-center border border-white/5">
              <span className="text-muted-foreground text-xs uppercase tracking-widest">
                {image.placeholder}
              </span>
            </div>
            {/* Hover overlay */}
            <div className="absolute inset-0 bg-accent-secondary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
        ))}
      </motion.div>

      {/* Gradient overlays for fade effect */}
      <div className="absolute top-0 left-0 w-32 h-full bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
      <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
    </section>
  );
}

