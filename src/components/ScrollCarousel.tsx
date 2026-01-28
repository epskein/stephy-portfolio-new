"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";

// Actual images from public/assets/gallery (use correct subfolder and exact casing)
const topRowImages = [
  "/assets/gallery/live/StephyLongueira15.jpg",
  "/assets/gallery/live/StephyLongueira21.jpg",
  "/assets/gallery/live/StephyLongueira22.jpg",
  "/assets/gallery/live/StephyLongueira29.jpg",
  "/assets/gallery/live/StephyLongueira31.jpg",
];

const bottomRowImages = [
  "/assets/gallery/portraits/StephyLongueira1.jpg",
  "/assets/gallery/live/StephyLongueira2.JPG",
  "/assets/gallery/live/StephyLongueira14.jpg",
  "/assets/gallery/portraits/StephyLongueira9.jpg",
  "/assets/gallery/live/StephyLongueira13.jpg",
];

export default function ScrollCarousel() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Top row moves left as you scroll down (faster on mobile)
  const topRowX = useTransform(scrollYProgress, [0, 1], ["0%", "-60%"]);
  // Bottom row moves right as you scroll down (faster on mobile)
  const bottomRowX = useTransform(scrollYProgress, [0, 1], ["-60%", "0%"]);

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
          className="text-xl xs:text-2xl sm:text-3xl md:text-4xl font-black text-center tracking-tight flex flex-col sm:flex-row justify-center items-center gap-1 sm:gap-0"
        >
          <span className="gradient-text">MOMENTS</span>
          <span className="text-white sm:ml-4">CAPTURED</span>
        </motion.h2>
      </div>

      <div className="flex flex-col gap-6 md:gap-8">
        {/* Top Row - scrolls left */}
        <motion.div style={{ x: topRowX }} className="flex gap-4 md:gap-6 whitespace-nowrap">
          {[...topRowImages, ...topRowImages].map((img, index) => (
            <div
              key={`top-${index}`}
              className="relative flex-shrink-0 w-[220px] h-[280px] sm:w-[300px] sm:h-[220px] md:w-[450px] md:h-[300px] rounded-[2rem] overflow-hidden group border border-white/5"
            >
              <Image
                src={img}
                alt={`Stephy Longueira Performance ${index}`}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                sizes="(max-width: 640px) 220px, (max-width: 768px) 300px, 450px"
                quality={75}
                loading="lazy"
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
              className="relative flex-shrink-0 w-[220px] h-[280px] sm:w-[300px] sm:h-[220px] md:w-[450px] md:h-[300px] rounded-[2rem] overflow-hidden group border border-white/5"
            >
              <Image
                src={img}
                alt={`Stephy Longueira Moment ${index}`}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                sizes="(max-width: 640px) 220px, (max-width: 768px) 300px, 450px"
                quality={75}
                loading="lazy"
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
