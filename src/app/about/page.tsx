"use client";

import { motion } from "framer-motion";

export default function AboutPage() {
  return (
    <main className="min-h-screen pt-24 pb-16">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 animated-gradient opacity-50" />
        <div className="absolute inset-0 noise" />

        <div className="container mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Image */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="aspect-[3/4] rounded-2xl overflow-hidden bg-gradient-to-br from-accent/20 to-accent-secondary/20 border border-white/10 flex items-center justify-center">
                <span className="text-muted-foreground text-sm uppercase tracking-widest">
                  Artist Photo
                </span>
              </div>
              {/* Decorative elements */}
              <div className="absolute -bottom-4 -right-4 w-32 h-32 border border-accent/30 rounded-2xl -z-10" />
              <div className="absolute -top-4 -left-4 w-24 h-24 border border-accent-secondary/30 rounded-full -z-10" />
            </motion.div>

            {/* Content */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-6"
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold">
                <span className="gradient-text">ABOUT</span>
                <br />
                <span className="text-foreground">STEPHY</span>
              </h1>

              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  Stephy Longueira is a dynamic DJ and artist who has been
                  captivating audiences worldwide with her unique blend of
                  electronic music. With a passion for creating unforgettable
                  experiences on the dance floor, she has established herself as
                  a rising force in the electronic music scene.
                </p>
                <p>
                  Her sets are known for their energy, seamless transitions, and
                  ability to read the crowd, taking listeners on a journey
                  through various genres while maintaining a cohesive sonic
                  experience.
                </p>
                <p>
                  From intimate club settings to major festival stages, Stephy
                  brings the same level of dedication and artistry to every
                  performance, ensuring that each show is a unique and memorable
                  experience.
                </p>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-6 pt-6">
                <div className="text-center">
                  <div className="text-3xl md:text-4xl font-black text-accent">
                    100+
                  </div>
                  <div className="text-xs uppercase tracking-widest text-muted-foreground mt-1">
                    Shows
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-3xl md:text-4xl font-black text-accent-secondary">
                    50+
                  </div>
                  <div className="text-xs uppercase tracking-widest text-muted-foreground mt-1">
                    Venues
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-3xl md:text-4xl font-black gradient-text">
                    10+
                  </div>
                  <div className="text-xs uppercase tracking-widest text-muted-foreground mt-1">
                    Countries
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Journey Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-6">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-center mb-16"
          >
            <span className="gradient-text">THE</span>
            <span className="text-foreground ml-3">JOURNEY</span>
          </motion.h2>

          <div className="max-w-3xl mx-auto space-y-12">
            {[
              {
                year: "2018",
                title: "THE BEGINNING",
                description:
                  "Started DJing at local venues, developing a unique sound and style.",
              },
              {
                year: "2020",
                title: "BREAKTHROUGH",
                description:
                  "First major festival appearance and residency at a renowned club.",
              },
              {
                year: "2022",
                title: "INTERNATIONAL",
                description:
                  "Expanded to international venues, performing across Europe and beyond.",
              },
              {
                year: "2024",
                title: "PRESENT",
                description:
                  "Continuing to push boundaries and create unforgettable experiences worldwide.",
              },
            ].map((milestone, index) => (
              <motion.div
                key={milestone.year}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="flex gap-6 items-start"
              >
                <div className="flex-shrink-0 w-20 text-right">
                  <span className="text-2xl font-black text-accent">
                    {milestone.year}
                  </span>
                </div>
                <div className="w-px bg-border flex-shrink-0" />
                <div className="flex-grow pb-8">
                  <h3 className="text-lg font-bold text-foreground mb-2">
                    {milestone.title}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {milestone.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Music Style Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="glass rounded-2xl p-8 md:p-12 max-w-4xl mx-auto text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              <span className="gradient-text">MUSICAL</span>
              <span className="text-foreground ml-3">STYLE</span>
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-8">
              Drawing inspiration from a wide range of electronic music genres,
              Stephy&apos;s sound is characterized by driving beats, melodic
              elements, and an infectious energy that keeps dance floors moving.
              Her sets seamlessly blend house, techno, and progressive elements,
              creating a unique sonic signature that has become her trademark.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              {[
                "House",
                "Techno",
                "Progressive",
                "Melodic",
                "Deep House",
                "Tech House",
              ].map((genre) => (
                <span
                  key={genre}
                  className="px-4 py-2 rounded-full border border-accent/30 text-sm text-accent uppercase tracking-widest"
                >
                  {genre}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}

