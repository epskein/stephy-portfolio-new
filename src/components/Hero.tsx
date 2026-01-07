"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  return (
    <section
      ref={ref}
      className="relative h-screen flex items-center justify-center overflow-hidden w-full"
    >
      {/* Background Image - Full width */}
      <motion.div
        style={{ scale, y }}
        className="absolute inset-0 z-0"
      >
        <Image
          src="/assets/hero-image.jpg"
          alt="Stephy Longueira"
          fill
          className="object-cover object-center"
          priority
          quality={100}
        />
        {/* Overlay for better text readability and depth */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/80" />
      </motion.div>
      
      {/* Noise overlay */}
      <div className="absolute inset-0 noise z-10" />

      {/* Content */}
      <motion.div
        style={{ opacity }}
        className="relative z-20 text-center px-6 mt-32 md:mt-48"
      >
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <h1 className="text-5xl md:text-8xl lg:text-9xl font-black tracking-tighter mb-2 leading-none">
            <span className="text-white drop-shadow-2xl">STEPHY</span>
          </h1>
          <h1 className="text-5xl md:text-8xl lg:text-9xl font-black tracking-tighter mb-8 leading-none">
            <span className="text-white/90 drop-shadow-2xl">LONGUEIRA</span>
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="flex flex-col sm:flex-row gap-6 justify-center"
        >
          <motion.a
            href="/contact"
            whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,1)" }}
            whileTap={{ scale: 0.95 }}
            className="px-10 py-4 bg-white/90 text-black font-bold uppercase tracking-[0.2em] text-xs rounded-none transition-all duration-300"
          >
            Book Now
          </motion.a>
          <motion.a
            href="#upcoming-shows"
            whileHover={{ scale: 1.05, borderColor: "rgba(255,255,255,1)" }}
            whileTap={{ scale: 0.95 }}
            className="px-10 py-4 border border-white/30 text-white font-bold uppercase tracking-[0.2em] text-xs rounded-none transition-all duration-300 backdrop-blur-sm"
          >
            Upcoming Shows
          </motion.a>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20"
      >
        <motion.div
          animate={{ y: [0, 12, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-px h-16 bg-gradient-to-b from-white to-transparent"
        />
      </motion.div>
    </section>
  );
}
