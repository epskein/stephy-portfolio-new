"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Placeholder gallery data - will be replaced with actual images
const galleryImages = [
  { id: 1, category: "live", placeholder: "Live Performance 1" },
  { id: 2, category: "portrait", placeholder: "Portrait 1" },
  { id: 3, category: "live", placeholder: "Live Performance 2" },
  { id: 4, category: "behind", placeholder: "Behind the Scenes 1" },
  { id: 5, category: "portrait", placeholder: "Portrait 2" },
  { id: 6, category: "live", placeholder: "Live Performance 3" },
  { id: 7, category: "behind", placeholder: "Behind the Scenes 2" },
  { id: 8, category: "live", placeholder: "Live Performance 4" },
  { id: 9, category: "portrait", placeholder: "Portrait 3" },
  { id: 10, category: "behind", placeholder: "Behind the Scenes 3" },
  { id: 11, category: "live", placeholder: "Live Performance 5" },
  { id: 12, category: "portrait", placeholder: "Portrait 4" },
];

const categories = [
  { id: "all", label: "All" },
  { id: "live", label: "Live Shows" },
  { id: "portrait", label: "Portraits" },
  { id: "behind", label: "Behind the Scenes" },
];

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const filteredImages =
    activeCategory === "all"
      ? galleryImages
      : galleryImages.filter((img) => img.category === activeCategory);

  return (
    <main className="min-h-screen pt-24 pb-16">
      {/* Header */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
              <span className="gradient-text">GALLERY</span>
            </h1>
            <p className="text-muted-foreground max-w-xl mx-auto">
              A visual journey through performances, moments, and memories.
            </p>
          </motion.div>

          {/* Filter Tabs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-wrap justify-center gap-4 mb-12"
          >
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-6 py-3 rounded-full text-sm uppercase tracking-widest font-semibold transition-all ${
                  activeCategory === category.id
                    ? "bg-white text-black"
                    : "border border-border text-muted-foreground hover:border-white hover:text-white"
                }`}
              >
                {category.label}
              </button>
            ))}
          </motion.div>
        </div>
      </section>

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
                  onClick={() => setSelectedImage(image.id)}
                  className="relative aspect-square rounded-[2rem] overflow-hidden cursor-pointer group"
                >
                  {/* Placeholder - replace with actual Image */}
                  <div className="w-full h-full bg-gradient-to-br from-white/5 to-white/10 flex items-center justify-center border border-white/5">
                    <span className="text-muted-foreground text-xs uppercase tracking-widest text-center px-4">
                      {image.placeholder}
                    </span>
                  </div>

                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-8">
                    <span className="text-sm text-white font-medium uppercase tracking-widest">
                      {image.placeholder}
                    </span>
                  </div>

                  {/* Border glow on hover */}
                  <div className="absolute inset-0 rounded-[2rem] border-2 border-transparent group-hover:border-white/20 transition-colors duration-300" />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
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
              <svg
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </motion.button>

            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-5xl max-h-[85vh] w-full aspect-square rounded-[3rem] overflow-hidden"
            >
              {/* Placeholder - replace with actual Image */}
              <div className="w-full h-full bg-gradient-to-br from-white/5 to-white/10 flex items-center justify-center border border-white/10">
                <span className="text-muted-foreground text-lg uppercase tracking-widest">
                  {
                    galleryImages.find((img) => img.id === selectedImage)
                      ?.placeholder
                  }
                </span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
