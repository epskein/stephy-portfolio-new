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
              <span className="text-foreground">VENUES</span>
            </h1>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Some of the incredible venues where Stephy has brought her unique
              energy and sound to the dance floor.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Featured Venues */}
      <section className="pb-20">
        <div className="container mx-auto px-6">
          {/* Main Featured */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
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
                  <div className="relative aspect-[16/10] rounded-2xl overflow-hidden">
                    {/* Placeholder - replace with actual Image */}
                    <div className="w-full h-full bg-gradient-to-br from-accent/20 to-accent-secondary/20 flex items-center justify-center border border-white/10">
                      <span className="text-muted-foreground text-sm uppercase tracking-widest">
                        {venue.name} Image
                      </span>
                    </div>

                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />

                    {/* Content */}
                    <div className="absolute inset-0 p-8 flex flex-col justify-end">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="px-3 py-1 bg-accent text-background text-xs font-bold uppercase tracking-widest rounded-full">
                          Featured
                        </span>
                        <span className="text-accent-secondary text-sm">
                          {venue.performances} performances
                        </span>
                      </div>
                      <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-1">
                        {venue.name}
                      </h3>
                      <p className="text-accent text-sm mb-3">
                        {venue.location}
                      </p>
                      <p className="text-muted-foreground text-sm max-w-md">
                        {venue.description}
                      </p>
                    </div>
                  </div>

                  {/* Glow effect */}
                  <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 blur-2xl bg-accent/10" />
                </motion.div>
              ))}
          </div>

          {/* Third Featured */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            {featuredVenues
              .filter((v) => v.featured)
              .slice(2, 3)
              .map((venue) => (
                <div key={venue.id} className="group relative">
                  <div className="relative aspect-[21/9] rounded-2xl overflow-hidden">
                    {/* Placeholder - replace with actual Image */}
                    <div className="w-full h-full bg-gradient-to-br from-accent-secondary/20 to-accent/20 flex items-center justify-center border border-white/10">
                      <span className="text-muted-foreground text-sm uppercase tracking-widest">
                        {venue.name} Image
                      </span>
                    </div>

                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-r from-background via-background/50 to-transparent" />

                    {/* Content */}
                    <div className="absolute inset-0 p-8 md:p-12 flex flex-col justify-center max-w-xl">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="px-3 py-1 bg-accent text-background text-xs font-bold uppercase tracking-widest rounded-full">
                          Featured
                        </span>
                        <span className="text-accent-secondary text-sm">
                          {venue.performances} performances
                        </span>
                      </div>
                      <h3 className="text-2xl md:text-4xl font-bold text-foreground mb-1">
                        {venue.name}
                      </h3>
                      <p className="text-accent text-sm mb-3">
                        {venue.location}
                      </p>
                      <p className="text-muted-foreground text-sm">
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
            className="text-2xl md:text-3xl font-bold mb-8"
          >
            <span className="gradient-text">MORE</span>
            <span className="text-foreground ml-3">VENUES</span>
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                  <div className="glass rounded-xl overflow-hidden hover:border-accent/50 transition-colors">
                    {/* Image */}
                    <div className="aspect-video relative">
                      <div className="w-full h-full bg-gradient-to-br from-accent/10 to-accent-secondary/10 flex items-center justify-center">
                        <span className="text-muted-foreground text-xs uppercase tracking-widest">
                          {venue.name} Image
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-lg font-bold text-foreground group-hover:text-accent transition-colors">
                          {venue.name}
                        </h3>
                        <span className="text-accent-secondary text-xs">
                          {venue.performances} shows
                        </span>
                      </div>
                      <p className="text-accent text-sm mb-2">
                        {venue.location}
                      </p>
                      <p className="text-muted-foreground text-sm line-clamp-2">
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
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="gradient-text">WANT STEPHY</span>
              <span className="text-foreground ml-3">AT YOUR VENUE?</span>
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto mb-8">
              Book Stephy for your next event and bring an unforgettable
              experience to your dance floor.
            </p>
            <motion.a
              href="/contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-block px-8 py-4 bg-accent text-background font-semibold uppercase tracking-widest text-sm rounded-full glow-accent hover:bg-accent/90 transition-colors"
            >
              Get in Touch
            </motion.a>
          </motion.div>
        </div>
      </section>
    </main>
  );
}

