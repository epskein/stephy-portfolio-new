"use client";

import { motion } from "framer-motion";

// Placeholder venue data - will be replaced with actual data
const featuredVenues = [
  {
    id: 1,
    name: "Club Pacha",
    location: "Ibiza, Spain",
    description:
      "One of the most iconic nightclubs in the world, known for its legendary parties and world-class sound system.",
    performances: 12,
    featured: true,
  },
  {
    id: 2,
    name: "Fabric",
    location: "London, UK",
    description:
      "A legendary London institution that has been at the forefront of electronic music culture for over two decades.",
    performances: 8,
    featured: true,
  },
  {
    id: 3,
    name: "Berghain",
    location: "Berlin, Germany",
    description:
      "The world's most famous techno club, housed in a former power plant with an unparalleled sound system.",
    performances: 5,
    featured: true,
  },
  {
    id: 4,
    name: "Output",
    location: "New York, USA",
    description:
      "Brooklyn's premier electronic music venue, featuring a Funktion-One sound system and intimate atmosphere.",
    performances: 6,
    featured: false,
  },
  {
    id: 5,
    name: "Amnesia",
    location: "Ibiza, Spain",
    description:
      "Another Ibiza institution known for its massive main room and legendary foam parties.",
    performances: 10,
    featured: false,
  },
  {
    id: 6,
    name: "Watergate",
    location: "Berlin, Germany",
    description:
      "A stunning riverside club with panoramic views of the Spree and an intimate dance floor.",
    performances: 4,
    featured: false,
  },
];

export default function VenuesPage() {
  return (
    <main className="min-h-screen pt-24 pb-16">
      {/* Header */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
              <span className="gradient-text">FEATURED</span>
              <br />
              <span className="text-white">VENUES</span>
            </h1>
            <p className="text-muted-foreground max-w-xl mx-auto uppercase tracking-widest text-[10px]">
              The world&apos;s most iconic dance floors.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Featured Venues */}
      <section className="pb-20">
        <div className="container mx-auto px-6">
          {/* Main Featured */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
            {featuredVenues
              .filter((v) => v.featured)
              .slice(0, 2)
              .map((venue, index) => (
                <motion.div
                  key={venue.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="group relative"
                >
                  <div className="relative aspect-[16/10] rounded-[2.5rem] overflow-hidden border border-white/5">
                    {/* Placeholder - replace with actual Image */}
                    <div className="w-full h-full bg-gradient-to-br from-white/5 to-white/10 flex items-center justify-center">
                      <span className="text-muted-foreground text-sm uppercase tracking-widest">
                        {venue.name} Image
                      </span>
                    </div>

                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

                    {/* Content */}
                    <div className="absolute inset-0 p-10 flex flex-col justify-end">
                      <div className="flex items-center gap-4 mb-3">
                        <span className="px-4 py-1.5 bg-white text-black text-[10px] font-bold uppercase tracking-widest rounded-full">
                          Featured
                        </span>
                        <span className="text-white/60 text-[10px] uppercase tracking-widest font-bold">
                          {venue.performances} shows
                        </span>
                      </div>
                      <h3 className="text-3xl font-bold text-white mb-2 uppercase tracking-tight">
                        {venue.name}
                      </h3>
                      <p className="text-white/40 text-xs uppercase tracking-[0.2em] mb-4">
                        {venue.location}
                      </p>
                      <p className="text-muted-foreground text-sm leading-relaxed max-w-md">
                        {venue.description}
                      </p>
                    </div>
                  </div>

                  {/* Glow effect */}
                  <div className="absolute inset-0 rounded-[2.5rem] opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 blur-3xl bg-white/5" />
                </motion.div>
              ))}
          </div>

          {/* Third Featured */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-24"
          >
            {featuredVenues
              .filter((v) => v.featured)
              .slice(2, 3)
              .map((venue) => (
                <div key={venue.id} className="group relative">
                  <div className="relative aspect-[21/9] rounded-[3rem] overflow-hidden border border-white/5">
                    {/* Placeholder - replace with actual Image */}
                    <div className="w-full h-full bg-gradient-to-br from-white/5 to-white/10 flex items-center justify-center">
                      <span className="text-muted-foreground text-sm uppercase tracking-widest">
                        {venue.name} Image
                      </span>
                    </div>

                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-r from-black via-black/20 to-transparent" />

                    {/* Content */}
                    <div className="absolute inset-0 p-12 md:p-16 flex flex-col justify-center max-w-2xl">
                      <div className="flex items-center gap-4 mb-4">
                        <span className="px-4 py-1.5 bg-white text-black text-[10px] font-bold uppercase tracking-widest rounded-full">
                          Featured
                        </span>
                        <span className="text-white/60 text-[10px] uppercase tracking-widest font-bold">
                          {venue.performances} shows
                        </span>
                      </div>
                      <h3 className="text-4xl md:text-5xl font-bold text-white mb-2 uppercase tracking-tight">
                        {venue.name}
                      </h3>
                      <p className="text-white/40 text-xs uppercase tracking-[0.2em] mb-6">
                        {venue.location}
                      </p>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        {venue.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
          </motion.div>

          {/* Other Venues Grid */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-2xl font-bold mb-10 tracking-[0.1em]"
          >
            <span className="gradient-text">GLOBAL</span>
            <span className="text-white ml-3">VENUES</span>
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredVenues
              .filter((v) => !v.featured)
              .map((venue, index) => (
                <motion.div
                  key={venue.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="group"
                >
                  <div className="bg-white/[0.03] border border-white/10 rounded-[2rem] overflow-hidden hover:bg-white/[0.06] hover:border-white/20 transition-all duration-500">
                    {/* Image */}
                    <div className="aspect-video relative">
                      <div className="w-full h-full bg-gradient-to-br from-white/5 to-white/10 flex items-center justify-center">
                        <span className="text-muted-foreground text-[10px] uppercase tracking-widest">
                          {venue.name}
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-8">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="text-lg font-bold text-white group-hover:text-white transition-colors uppercase tracking-tight">
                          {venue.name}
                        </h3>
                        <span className="text-white/40 text-[10px] uppercase tracking-widest font-bold">
                          {venue.performances} shows
                        </span>
                      </div>
                      <p className="text-white/60 text-[10px] uppercase tracking-widest mb-4">
                        {venue.location}
                      </p>
                      <p className="text-muted-foreground text-xs leading-relaxed line-clamp-2">
                        {venue.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-white/[0.02]">
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              <span className="gradient-text">BRING THE ENERGY</span>
              <br />
              <span className="text-white">TO YOUR VENUE</span>
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto mb-10 text-xs uppercase tracking-widest leading-loose">
              Available for bookings worldwide.
            </p>
            <motion.a
              href="/contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-block px-12 py-5 bg-white text-black font-bold uppercase tracking-[0.2em] text-[10px] rounded-full transition-all"
            >
              Get in Touch
            </motion.a>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
