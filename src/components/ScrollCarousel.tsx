"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

export interface CarouselImage {
  src: string;
  width: number;
  height: number;
}

export type CarouselAnimation = "hover" | "autoscroll";

interface ScrollCarouselProps {
  images: CarouselImage[];
  animation?: CarouselAnimation;
}

const CARD_HEIGHT = "h-[260px] sm:h-[320px] md:h-[380px]";

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
        sizes="(max-width: 768px) 60vw, 480px"
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
  );
}

/* ----------------------- Edge fade overlays --------------------------- */
function EdgeFades() {
  return (
    <>
      <div className="absolute top-0 left-0 w-12 md:w-24 h-full bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
      <div className="absolute top-0 right-0 w-12 md:w-24 h-full bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />
    </>
  );
}

/* --------------------------- Main carousel ---------------------------- */
export default function ScrollCarousel({
  images,
  animation = "hover",
}: ScrollCarouselProps) {
  const trackRef = useRef<HTMLDivElement>(null);

  const scrollByCard = (direction: 1 | -1) => {
    const track = trackRef.current;
    if (!track) return;
    const amount = Math.max(280, track.clientWidth * 0.7);
    const max = track.scrollWidth - track.clientWidth;
    const target = Math.max(
      0,
      Math.min(max, track.scrollLeft + direction * amount)
    );
    track.scrollLeft = target;
  };

  /* ----------------------- Auto-scroll variant ------------------------ */
  if (animation === "autoscroll") {
    // Duplicate the set so the marquee loops seamlessly at translateX(-50%).
    const loop = [...images, ...images];
    return (
      <section className="relative py-24 overflow-hidden bg-black">
        <SectionTitle />
        <div className="marquee-wrap relative overflow-hidden">
          <div className="marquee-track flex w-max px-6 py-6">
            {loop.map((image, index) => (
              <div
                key={`${image.src}-${index}`}
                className={`group relative ${CARD_HEIGHT} mr-6 flex-shrink-0 rounded-[2rem] overflow-hidden border border-white/10 transition-[transform,border-color,box-shadow] duration-300 ease-out hover:-translate-y-2.5 hover:border-white/30 hover:shadow-[0_20px_50px_rgba(0,0,0,0.5)]`}
              >
                <CardImage image={image} index={index % images.length} />
              </div>
            ))}
          </div>
          <EdgeFades />
        </div>

        <style jsx>{`
          @keyframes carousel-marquee {
            from {
              transform: translateX(0);
            }
            to {
              transform: translateX(-50%);
            }
          }
          .marquee-track {
            animation: carousel-marquee 55s linear infinite;
            will-change: transform;
          }
          .marquee-wrap:hover .marquee-track {
            animation-play-state: paused;
          }
          @media (prefers-reduced-motion: reduce) {
            .marquee-track {
              animation: none;
            }
          }
        `}</style>
      </section>
    );
  }

  /* ------------------- Hover zoom + lift variant ---------------------- */
  return (
    <section className="relative py-24 overflow-hidden bg-black">
      <SectionTitle />

      <div className="relative">
        <div
          ref={trackRef}
          className="flex gap-6 overflow-x-auto scrollbar-hide snap-x snap-proximity px-6 scroll-pl-6 items-center py-6"
        >
          {images.map((image, index) => (
            <motion.div
              key={`${image.src}-${index}`}
              whileHover={{ y: -10 }}
              transition={{ type: "spring", stiffness: 300, damping: 22 }}
              className={`group relative flex-shrink-0 snap-start ${CARD_HEIGHT} rounded-[2rem] overflow-hidden border border-white/10 hover:border-white/30 hover:shadow-[0_20px_50px_rgba(0,0,0,0.5)]`}
            >
              <CardImage image={image} index={index} />
            </motion.div>
          ))}
        </div>

        <EdgeFades />

        {/* Prev / Next controls */}
        <button
          type="button"
          onClick={() => scrollByCard(-1)}
          aria-label="Previous image"
          className="absolute left-3 md:left-6 top-1/2 -translate-y-1/2 z-20 w-11 h-11 md:w-12 md:h-12 rounded-full border border-white/20 bg-black/60 backdrop-blur-md flex items-center justify-center text-white hover:bg-white hover:text-black transition-all active:scale-95"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          type="button"
          onClick={() => scrollByCard(1)}
          aria-label="Next image"
          className="absolute right-3 md:right-6 top-1/2 -translate-y-1/2 z-20 w-11 h-11 md:w-12 md:h-12 rounded-full border border-white/20 bg-black/60 backdrop-blur-md flex items-center justify-center text-white hover:bg-white hover:text-black transition-all active:scale-95"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
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
