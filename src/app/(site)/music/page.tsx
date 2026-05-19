"use client";

import { motion } from "framer-motion";

// TODO: replace placeholder releases with Stephy's real releases (title, type,
// year, and a streaming link).
const releases = [
  {
    id: 1,
    title: "Release Title",
    type: "Single",
    year: "2025",
    href: "#",
  },
  {
    id: 2,
    title: "Release Title",
    type: "EP",
    year: "2024",
    href: "#",
  },
  {
    id: 3,
    title: "Release Title",
    type: "Remix",
    year: "2024",
    href: "#",
  },
];

export default function MusicPage() {
  return (
    <main className="min-h-screen pt-24 pb-16">
      {/* Header */}
      <section className="py-16">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-4 uppercase tracking-tight">
            <span className="gradient-text">MUSIC</span>
          </h1>
          <p className="text-muted-foreground max-w-xl mx-auto uppercase tracking-widest text-[10px]">
            Releases, remixes, and mixes from Stephy Longueira.
          </p>
        </div>
      </section>

      {/* Releases Grid */}
      <section className="pb-20">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {releases.map((release, index) => (
              <motion.a
                key={release.id}
                href={release.href}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -4 }}
                className="group bg-white/[0.03] border border-white/10 rounded-[2rem] p-8 flex flex-col gap-6 transition-all hover:bg-white/[0.06] hover:border-white/30"
              >
                <div className="aspect-square rounded-[1.5rem] bg-white/[0.04] border border-white/5 flex items-center justify-center">
                  <svg
                    className="w-12 h-12 text-white/20 group-hover:text-white/40 transition-colors"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d="M12 3v10.55A4 4 0 1 0 14 17V7h4V3h-6Z" />
                  </svg>
                </div>
                <div>
                  <div className="text-[10px] font-bold text-white/40 uppercase tracking-[0.2em] mb-2">
                    {release.type} · {release.year}
                  </div>
                  <h3 className="text-lg font-bold text-white uppercase tracking-tight">
                    {release.title}
                  </h3>
                  <span className="mt-4 inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-white/40 group-hover:text-white transition-colors">
                    Listen
                    <span className="w-6 h-px bg-white/20 group-hover:w-10 group-hover:bg-white/60 transition-all" />
                  </span>
                </div>
              </motion.a>
            ))}
          </div>

          <p className="text-center text-muted-foreground uppercase tracking-widest text-[10px] mt-16">
            More releases coming soon.
          </p>
        </div>
      </section>
    </main>
  );
}
