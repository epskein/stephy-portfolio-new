"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

interface GalleryImage {
  id: string;
  src: string;
  category: string;
}

interface GalleryGridProps {
  images: GalleryImage[];
  categories: string[];
}

export default function GalleryGrid({ images, categories }: GalleryGridProps) {
  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const filteredImages =
    activeCategory === "all"
      ? images
      : images.filter((img) => img.category === activeCategory);

  return (
    <>
      {/* Filter Tabs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex flex-wrap justify-center gap-4 mb-12 container mx-auto px-6"
      >
        <button
          onClick={() => setActiveCategory("all")}
          className={`px-6 py-3 rounded-full text-sm uppercase tracking-widest font-semibold transition-all ${
            activeCategory === "all"
              ? "bg-white text-black"
              : "border border-border text-muted-foreground hover:border-white hover:text-white"
          }`}
        >
          All
        </button>
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`px-6 py-3 rounded-full text-sm uppercase tracking-widest font-semibold transition-all ${
              activeCategory === category
                ? "bg-white text-black"
                : "border border-border text-muted-foreground hover:border-white hover:text-white"
            }`}
          >
            {category.replace(/-/g, " ")}
          </button>
        ))}
      </motion.div>

      {/* Gallery Grid */}
      <section className="pb-20">
        <div className="container mx-auto px-6">
          <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            <AnimatePresence mode="popLayout">
              {filteredImages.map((image, index) => (
                <motion.div
                  key={image.id}
                  layout
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  onClick={() => setSelectedImage(image.src)}
                  className="relative aspect-square rounded-[2rem] overflow-hidden cursor-pointer group"
                >
                  <Image
                    src={image.src}
                    alt={`Gallery Image ${index}`}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  />

                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-8" />

                  {/* Border glow on hover */}
                  <div className="absolute inset-0 rounded-[2rem] border-2 border-transparent group-hover:border-white/20 transition-colors duration-300" />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
          
          {images.length === 0 && (
            <div className="text-center py-20">
              <p className="text-muted-foreground uppercase tracking-widest text-xs">
                Add images to public/assets/gallery/[category]/ to see them here.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex items-center justify-center p-6"
          >
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedImage(null)}
              className="absolute top-6 right-6 w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </motion.button>

            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-5xl max-h-[85vh] w-full aspect-square md:aspect-auto h-full rounded-[3rem] overflow-hidden"
            >
              <Image
                src={selectedImage}
                alt="Selected Gallery Image"
                fill
                className="object-contain"
                quality={100}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
