"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.9]);

  return (
    <section
      ref={ref}
      className="relative h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background with animated gradient */}
      <div className="absolute inset-0 animated-gradient" />
      
      {/* Noise overlay */}
      <div className="absolute inset-0 noise" />

      {/* Geometric patterns */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          className="absolute -top-1/2 -right-1/2 w-full h-full"
        >
          <div className="w-full h-full border border-accent/10 rounded-full" />
        </motion.div>
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-1/2 -left-1/2 w-full h-full"
        >
          <div className="w-full h-full border border-accent-secondary/10 rounded-full" />
        </motion.div>
      </div>

      {/* Hero image placeholder - will be replaced with actual image */}
      <motion.div
        style={{ y, scale }}
        className="absolute inset-0 flex items-center justify-center"
      >
        <div className="relative w-full h-full max-w-4xl mx-auto flex items-center justify-center">
          {/* Placeholder for hero image */}
          <div className="w-80 h-80 md:w-[500px] md:h-[500px] rounded-full bg-gradient-to-br from-accent/20 to-accent-secondary/20 flex items-center justify-center border border-white/10">
            <span className="text-muted-foreground text-sm uppercase tracking-widest">
              Hero Image
            </span>
          </div>
        </div>
      </motion.div>

      {/* Content */}
      <motion.div
        style={{ opacity }}
        className="relative z-10 text-center px-6"
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight mb-4">
            <span className="gradient-text">STEPHY</span>
          </h1>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight mb-8">
            <span className="text-foreground">LONGUEIRA</span>
          </h1>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-lg md:text-xl text-muted-foreground max-w-xl mx-auto mb-10"
        >
          DJ & ARTIST
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <motion.a
            href="/contact"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 bg-accent text-background font-semibold uppercase tracking-widest text-sm rounded-full glow-accent hover:bg-accent/90 transition-colors"
          >
            Book Now
          </motion.a>
          <motion.a
            href="#upcoming-shows"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 border border-foreground/20 text-foreground font-semibold uppercase tracking-widest text-sm rounded-full hover:border-accent hover:text-accent transition-colors"
          >
            Upcoming Shows
          </motion.a>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-6 h-10 rounded-full border-2 border-foreground/30 flex items-start justify-center p-2"
        >
          <motion.div className="w-1 h-2 bg-accent rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
}

