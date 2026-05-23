"use client";

import { useEffect, useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import Image from "next/image";

export interface CarouselImage {
  src: string;
  width: number;
  height: number;
}

// Kept exported for backwards-compat with existing callers; the component
// chooses its mode based on viewport size now.
export type CarouselAnimation = "hover" | "autoscroll";

interface ScrollCarouselProps {
  images: CarouselImage[];
  animation?: CarouselAnimation;
}

const CARD_HEIGHT = "h-[200px] sm:h-[260px] md:h-[320px]";
const CARD_CLASS = `group relative flex-shrink-0 ${CARD_HEIGHT} rounded-[2rem] overflow-hidden border border-white/10 transition-[border-color,box-shadow] duration-300 ease-out hover:border-white/30 hover:shadow-[0_20px_50px_rgba(0,0,0,0.5)]`;

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

/* ----------------- Desktop: scroll-linked parallax row ---------------- */
function ParallaxRow({
  images,
  x,
  keyPrefix,
}: {
  images: CarouselImage[];
  x: MotionValue<string>;
  keyPrefix: string;
}) {
  const cards = [...images, ...images];
  return (
    <motion.div
      style={{ x, willChange: "transform" }}
      className="flex gap-4 sm:gap-6"
    >
      {cards.map((image, index) => (
        <div
          key={`${keyPrefix}-${image.src}-${index}`}
          className={CARD_CLASS}
        >
          <CardImage image={image} index={index} />
        </div>
      ))}
    </motion.div>
  );
}

/* --------- Mobile: continuous auto-scroll, pause on touch ------------- */
function AutoScrollRow({
  images,
  direction,
  keyPrefix,
}: {
  images: CarouselImage[];
  direction: "left" | "right";
  keyPrefix: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const pausedRef = useRef(false);
  const resumeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Two identical sets in a row — when scrollLeft crosses one set's width,
  // we jump back by exactly that width and the visual is unchanged.
  const cards = [...images, ...images];

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let rafId = 0;
    let lastTime = performance.now();
    let initialized = false;
    const speed = 35; // px / second

    const tick = (now: number) => {
      const dt = Math.min((now - lastTime) / 1000, 0.05);
      lastTime = now;

      const setWidth = el.scrollWidth / 2;
      if (!initialized && setWidth > 0) {
        // Start the rightward row at one set-width so it has room to count down.
        el.scrollLeft = direction === "right" ? setWidth : 0;
        initialized = true;
      }

      if (
        initialized &&
        !pausedRef.current &&
        el.scrollWidth > el.clientWidth
      ) {
        const delta = (direction === "right" ? -1 : 1) * speed * dt;
        let next = el.scrollLeft + delta;
        if (next >= setWidth) next -= setWidth;
        else if (next < 0) next += setWidth;
        el.scrollLeft = next;
      }

      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafId);
      if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current);
    };
  }, [direction]);

  const handleTouchStart = () => {
    pausedRef.current = true;
    if (resumeTimeoutRef.current) {
      clearTimeout(resumeTimeoutRef.current);
      resumeTimeoutRef.current = null;
    }
  };
  const handleTouchEnd = () => {
    // Small delay so iOS momentum scrolling finishes naturally before the
    // auto-scroll picks back up.
    resumeTimeoutRef.current = setTimeout(() => {
      pausedRef.current = false;
      resumeTimeoutRef.current = null;
    }, 800);
  };

  return (
    <div
      ref={ref}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onTouchCancel={handleTouchEnd}
      className="flex gap-4 overflow-x-auto scrollbar-hide"
    >
      {cards.map((image, index) => (
        <div
          key={`${keyPrefix}-${image.src}-${index}`}
          className={CARD_CLASS}
        >
          <CardImage image={image} index={index} />
        </div>
      ))}
    </div>
  );
}

/* --------------------------- Main carousel ---------------------------- */
export default function ScrollCarousel({ images }: ScrollCarouselProps) {
  const sectionRef = useRef<HTMLElement>(null);

  // Desktop parallax: rows move opposite directions, tied to page scroll.
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const topRowX = useTransform(scrollYProgress, [0, 1], ["0%", "-35%"]);
  const bottomRowX = useTransform(scrollYProgress, [0, 1], ["-35%", "0%"]);

  const half = Math.ceil(images.length / 2);
  const topImages =
    images.slice(0, half).length > 0 ? images.slice(0, half) : images;
  const bottomImages =
    images.slice(half).length > 0 ? images.slice(half) : images;

  return (
    <section
      ref={sectionRef}
      className="relative py-20 sm:py-24 overflow-hidden bg-black"
    >
      <SectionTitle />

      <div className="relative">
        {/* Desktop / tablet: scroll-linked parallax */}
        <div className="hidden md:block">
          <ParallaxRow images={topImages} x={topRowX} keyPrefix="top-d" />
          <div className="mt-6">
            <ParallaxRow
              images={bottomImages}
              x={bottomRowX}
              keyPrefix="bot-d"
            />
          </div>
        </div>

        {/* Mobile: continuous auto-scroll opposite directions, touch-pausable */}
        <div className="md:hidden">
          <AutoScrollRow
            images={topImages}
            direction="left"
            keyPrefix="top-m"
          />
          <div className="mt-4">
            <AutoScrollRow
              images={bottomImages}
              direction="right"
              keyPrefix="bot-m"
            />
          </div>
        </div>

        <EdgeFades />
      </div>

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
}
