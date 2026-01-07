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
      className="relative h-screen flex items-end justify-center overflow-hidden w-full pb-20 md:pb-24"
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
        {/* Subtle overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/60" />
      </motion.div>
      
      {/* Noise overlay */}
      <div className="absolute inset-0 noise z-10" />

      {/* Content - Single line, smaller text, rounded buttons */}
      <motion.div
        style={{ opacity }}
        className="relative z-20 text-center px-6 w-full max-w-5xl"
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="mb-10"
        >
          <h1 className="text-2xl md:text-4xl lg:text-5xl font-black tracking-[0.2em] leading-none text-white drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)]">
            STEPHY LONGUEIRA
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <motion.a
            href="/contact"
            whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,1)" }}
            whileTap={{ scale: 0.95 }}
            className="px-10 py-4 bg-white text-black font-bold uppercase tracking-[0.2em] text-[10px] rounded-full transition-all duration-300 min-w-[180px]"
          >
            Book Now
          </motion.a>
          <motion.a
            href="#upcoming-shows"
            whileHover={{ scale: 1.05, borderColor: "rgba(255,255,255,1)", backgroundColor: "rgba(255,255,255,0.05)" }}
            whileTap={{ scale: 0.95 }}
            className="px-10 py-4 border border-white/20 text-white font-bold uppercase tracking-[0.2em] text-[10px] rounded-full transition-all duration-300 backdrop-blur-md min-w-[180px]"
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
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-px h-12 bg-gradient-to-b from-white/50 to-transparent"
        />
      </motion.div>
    </section>
  );
}
