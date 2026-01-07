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
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Image */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="aspect-[3/4] rounded-[3rem] overflow-hidden bg-white/5 border border-white/10 flex items-center justify-center">
                <span className="text-muted-foreground text-[10px] uppercase tracking-[0.3em]">
                  Artist Portfolio
                </span>
              </div>
              {/* Decorative elements - rounded */}
              <div className="absolute -bottom-6 -right-6 w-32 h-32 border border-white/10 rounded-[2.5rem] -z-10" />
              <div className="absolute -top-6 -left-6 w-24 h-24 border border-white/10 rounded-full -z-10" />
            </motion.div>

            {/* Content */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-8"
            >
              <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tight leading-none">
                <span className="gradient-text">ABOUT</span>
                <br />
                <span className="text-white">STEPHY</span>
              </h1>

              <div className="space-y-6 text-muted-foreground text-sm leading-relaxed uppercase tracking-[0.05em]">
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

              {/* Stats - rounded boxes */}
              <div className="grid grid-cols-3 gap-4 pt-8">
                {[
                  { label: "Shows", value: "100+", color: "white" },
                  { label: "Venues", value: "50+", color: "white/60" },
                  { label: "Countries", value: "10+", color: "gradient" },
                ].map((stat, i) => (
                  <div key={stat.label} className="bg-white/[0.03] border border-white/5 p-6 rounded-[2rem] text-center">
                    <div className={`text-2xl md:text-3xl font-black ${stat.color === 'gradient' ? 'gradient-text' : 'text-white'}`}>
                      {stat.value}
                    </div>
                    <div className="text-[10px] uppercase tracking-widest text-muted-foreground mt-2 font-bold">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Journey Section */}
      <section className="py-24 bg-white/[0.01]">
        <div className="container mx-auto px-6">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-center mb-20 tracking-[0.2em]"
          >
            <span className="gradient-text">THE</span>
            <span className="text-white ml-4">JOURNEY</span>
          </motion.h2>

          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
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
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white/[0.03] border border-white/10 p-10 rounded-[2.5rem] relative group hover:bg-white/[0.06] transition-all"
              >
                <div className="text-4xl font-black text-white/10 absolute top-8 right-10 group-hover:text-white/20 transition-colors">
                  {milestone.year}
                </div>
                <h3 className="text-lg font-bold text-white mb-4 uppercase tracking-widest">
                  {milestone.title}
                </h3>
                <p className="text-muted-foreground text-xs leading-relaxed uppercase tracking-wider">
                  {milestone.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Music Style Section */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-white/[0.03] border border-white/5 rounded-[3rem] p-10 md:p-16 max-w-5xl mx-auto text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-8 uppercase tracking-[0.1em]">
              <span className="gradient-text">MUSICAL</span>
              <span className="text-white ml-4">STYLE</span>
            </h2>
            <p className="text-muted-foreground text-sm leading-relaxed mb-12 uppercase tracking-widest max-w-3xl mx-auto">
              Drawing inspiration from a wide range of electronic music genres,
              Stephy&apos;s sound is characterized by driving beats, melodic
              elements, and an infectious energy that keeps dance floors moving.
              Her sets seamlessly blend house, techno, and progressive elements,
              creating a unique sonic signature that has become her trademark.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
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
                  className="px-6 py-2 rounded-full border border-white/20 text-[10px] text-white uppercase tracking-[0.2em] font-bold bg-white/5 hover:bg-white hover:text-black transition-all cursor-default"
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
