"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function PageLoader() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const waitForAssets = async () => {
      // Wait for fonts to be ready
      if (document.fonts?.ready) {
        await document.fonts.ready;
      }

      // Wait for all images to load
      const images = Array.from(document.querySelectorAll("img"));
      const imagePromises = images.map((img) => {
        if (img.complete) return Promise.resolve();
        return new Promise<void>((resolve) => {
          img.onload = () => resolve();
          img.onerror = () => resolve(); // Don't block on failed images
        });
      });

      await Promise.all(imagePromises);

      // Small additional buffer for rendering
      await new Promise((resolve) => setTimeout(resolve, 100));

      setIsLoading(false);
    };

    waitForAssets();
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="fixed inset-0 z-[9999] bg-black pointer-events-none"
        />
      )}
    </AnimatePresence>
  );
}
