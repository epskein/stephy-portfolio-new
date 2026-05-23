"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import Image from "next/image";

export interface CarouselImage {
  src: string;
  width: number;
  height: number;
}

// Kept exported for backwards-compat with existing callers; the component
// now has a single mode (page-scroll-driven parallax) regardless.
export type CarouselAnimation = "hover" | "autoscroll";

interface ScrollCarouselProps {
  images: CarouselImage[];
  animation?: CarouselAnimation;
}

const CARD_HEIGHT = "h-[200px] sm:h-[260px] md:h-[320px]";

/* --------------------------- Card image ------------------------------- */
function CardImage({ image, index }: { image: CarouselImage; index: number }) {
  return (
    <div
      className="relative h-full"
      style={{ aspectRatio: image.width / image.height }}
    >
      <Image
        src={image.src}
        alt={`Stephy Longueira Performance ${index + 1}`}
        fill
        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        sizes="(max-width: 768px) 320px, 480px"
        quality={75}
        loading="lazy"
      />
      <div className="absolute inset-0 bg-black/15" />
    </div>
  );
}

/* ----------------------- Section title -------------------------------- */
function SectionTitle() {
  return (
    <div className="container mx-auto px-6 mb-10 sm:mb-16">
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
  );
}

/* ----------------------- Edge fade overlays --------------------------- */
function EdgeFades() {
  return (
    <>
      <div className="absolute top-0 left-0 w-10 md:w-24 h-full bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
      <div className="absolute top-0 right-0 w-10 md:w-24 h-full bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />
    </>
  );
}

/* --------------------------- Parallax row ----------------------------- */
function ParallaxRow({
  images,
  x,
  keyPrefix,
}: {
  images: CarouselImage[];
  x: MotionValue<string>;
  keyPrefix: string;
}) {
  // Duplicate the set so cards remain visible across the full translate range.
  const cards = [...images, ...images];
  return (
    <motion.div
      style={{ x, willChange: "transform" }}
      className="flex gap-4 sm:gap-6"
    >
      {cards.map((image, index) => (
        <div
          key={`${keyPrefix}-${image.src}-${index}`}
          className={`group relative flex-shrink-0 ${CARD_HEIGHT} rounded-[2rem] overflow-hidden border border-white/10 transition-[border-color,box-shadow] duration-300 ease-out hover:border-white/30 hover:shadow-[0_20px_50px_rgba(0,0,0,0.5)]`}
        >
          <CardImage image={image} index={index} />
        </div>
      ))}
    </motion.div>
  );
}

/* --------------------------- Main carousel ---------------------------- */
export default function ScrollCarousel({ images }: ScrollCarouselProps) {
  const sectionRef = useRef<HTMLElement>(null);

  // The page's scroll position drives both rows. When the user stops
  // scrolling, scrollYProgress stops changing, and the rows stop moving.
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Two rows, opposite directions. The percentage is of each row's own
  // width, so the same value works at any viewport size.
  const topRowX = useTransform(scrollYProgress, [0, 1], ["0%", "-35%"]);
  const bottomRowX = useTransform(scrollYProgress, [0, 1], ["-35%", "0%"]);

  // Split images into two rows. If there are fewer images than expected,
  // fall back to using the whole list for both rows.
  const half = Math.ceil(images.length / 2);
  const topImages = images.slice(0, half).length > 0 ? images.slice(0, half) : images;
  const bottomImages =
    images.slice(half).length > 0 ? images.slice(half) : images;

  return (
    <section
      ref={sectionRef}
      className="relative py-20 sm:py-24 overflow-hidden bg-black"
    >
      <SectionTitle />
      <div className="relative space-y-4 sm:space-y-6">
        <ParallaxRow images={topImages} x={topRowX} keyPrefix="top" />
        <ParallaxRow images={bottomImages} x={bottomRowX} keyPrefix="bot" />
        <EdgeFades />
      </div>
    </section>
  );
}
