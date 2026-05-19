"use client";

import { useState, useEffect } from "react";

export default function PageLoader() {
  const [isLoading, setIsLoading] = useState(true);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const finish = () => {
      if (!cancelled) setIsLoading(false);
    };

    const waitForAssets = async () => {
      try {
        // Wait for fonts to be ready
        if (document.fonts?.ready) {
          await document.fonts.ready;
        }

        // Wait for priority/eager images to load (skip lazy-loaded images)
        const images = Array.from(document.querySelectorAll("img")).filter(
          (img) => img.loading !== "lazy"
        );
        await Promise.all(
          images.map((img) => {
            if (img.complete) return Promise.resolve();
            return new Promise<void>((resolve) => {
              img.onload = () => resolve();
              img.onerror = () => resolve(); // Don't block on failed images
            });
          })
        );

        // Small additional buffer for rendering
        await new Promise((resolve) => setTimeout(resolve, 100));
      } finally {
        finish();
      }
    };

    // Maximum timeout fallback (5 seconds) in case something hangs
    const timeout = setTimeout(finish, 5000);

    waitForAssets();

    return () => {
      cancelled = true;
      clearTimeout(timeout);
    };
  }, []);

  // Unmount the overlay once the fade-out transition has finished
  useEffect(() => {
    if (isLoading) return;
    const t = setTimeout(() => setHidden(true), 800);
    return () => clearTimeout(t);
  }, [isLoading]);

  if (hidden) return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] bg-black pointer-events-none flex items-center justify-center transition-opacity duration-700 ease-out ${
        isLoading ? "opacity-100" : "opacity-0"
      }`}
    >
      {/* Loading spinner */}
      <div className="w-10 h-10 border-2 border-white/30 border-t-white rounded-full animate-spin" />
    </div>
  );
}
