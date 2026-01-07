"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";

// Actual images from public/assets/
const images = [
  "StephyLongueira15.jpg", "StephyLongueira21.jpg", 
  "StephyLongueira22.jpg", "StephyLongueira29.jpg", "StephyLongueira31.jpg",
  "StephyLongueira15.jpg", "StephyLongueira21.jpg", 
  "StephyLongueira22.jpg", "StephyLongueira29.jpg", "StephyLongueira31.jpg",
];

// Split images into two rows
const topRowImages = images.slice(0, 5);
const bottomRowImages = images.slice(5);

export default function ScrollCarousel() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Top row moves left as you scroll down
  const topRowX = useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]);
  // Bottom row moves right as you scroll down
  const bottomRowX = useTransform(scrollYProgress, [0, 1], ["-30%", "0%"]);

  return (
    <section
      ref={containerRef}
      className="relative py-24 overflow-hidden bg-black"
    >
      {/* Section title */}
      <div className="container mx-auto px-6 mb-16">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-black text-center tracking-tight"
        >
          <span className="gradient-text">MOMENTS</span>
          <span className="text-white ml-4">CAPTURED</span>
        </motion.h2>
      </div>

      <div className="flex flex-col gap-6 md:gap-8">
        {/* Top Row - scrolls left */}
        <motion.div style={{ x: topRowX }} className="flex gap-4 md:gap-6 whitespace-nowrap">
          {[...topRowImages, ...topRowImages].map((img, index) => (
            <div
              key={`top-${index}`}
              className="relative flex-shrink-0 w-[300px] h-[200px] md:w-[450px] md:h-[300px] rounded-[2rem] overflow-hidden group border border-white/5"
            >
              <Image
                src={`/assets/${img}`}
                alt={`Stephy Longueira Performance ${index}`}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                sizes="(max-width: 768px) 300px, 450px"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
            </div>
          ))}
        </motion.div>

        {/* Bottom Row - scrolls right */}
        <motion.div style={{ x: bottomRowX }} className="flex gap-4 md:gap-6 whitespace-nowrap">
          {[...bottomRowImages, ...bottomRowImages].map((img, index) => (
            <div
              key={`bottom-${index}`}
              className="relative flex-shrink-0 w-[300px] h-[200px] md:w-[450px] md:h-[300px] rounded-[2rem] overflow-hidden group border border-white/5"
            >
              <Image
                src={`/assets/${img}`}
                alt={`Stephy Longueira Moment ${index}`}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                sizes="(max-width: 768px) 300px, 450px"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
            </div>
          ))}
        </motion.div>
      </div>

      {/* Gradient overlays for fade effect */}
      <div className="absolute top-0 left-0 w-32 md:w-64 h-full bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
      <div className="absolute top-0 right-0 w-32 md:w-64 h-full bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />
    </section>
  );
}
