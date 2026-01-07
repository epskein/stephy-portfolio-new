"use client";

import { motion } from "framer-motion";

// Placeholder show data - will be replaced with actual data
const upcomingShows = [
  {
    id: 1,
    date: "2026-01-15",
    venue: "Club Pacha",
    location: "Ibiza, Spain",
    time: "23:00",
  },
  {
    id: 2,
    date: "2026-01-22",
    venue: "Fabric",
    location: "London, UK",
    time: "22:00",
  },
  {
    id: 3,
    date: "2026-02-05",
    venue: "Berghain",
    location: "Berlin, Germany",
    time: "00:00",
  },
  {
    id: 4,
    date: "2026-02-14",
    venue: "Output",
    location: "New York, USA",
    time: "22:00",
  },
];

function formatDate(dateString: string) {
  const date = new Date(dateString);
  const day = date.getDate().toString().padStart(2, "0");
  const month = date.toLocaleString("en-US", { month: "short" }).toUpperCase();
  const year = date.getFullYear();
  return { day, month, year };
}

export default function UpcomingShows() {
  return (
    <section id="upcoming-shows" className="relative py-24 bg-background">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">UPCOMING</span>
            <span className="text-foreground ml-3">SHOWS</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto uppercase tracking-widest text-[10px]">
            Catch Stephy live at these upcoming events worldwide.
          </p>
        </motion.div>

        {/* Shows Grid */}
        <div className="max-w-4xl mx-auto space-y-6">
          {upcomingShows.map((show, index) => {
            const { day, month } = formatDate(show.date);
            return (
              <motion.div
                key={show.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -4 }}
                className="group relative"
              >
                <div className="relative bg-white/[0.04] border border-white/10 rounded-2xl p-8 md:p-10 flex flex-col md:flex-row items-start md:items-center gap-8 transition-all duration-500 group-hover:bg-white/[0.08] group-hover:border-white/30 group-hover:shadow-[0_8px_32px_rgba(255,255,255,0.05)]">
                  {/* Date */}
                  <div className="flex-shrink-0 text-center min-w-[100px] border-r border-white/10 md:pr-8">
                    <div className="text-5xl font-black text-white mb-1">{day}</div>
                    <div className="text-xs font-bold text-muted-foreground tracking-[0.3em]">
                      {month}
                    </div>
                  </div>

                  {/* Venue Info */}
                  <div className="flex-grow md:pl-4">
                    <h3 className="text-2xl font-bold text-white mb-2 tracking-tight">
                      {show.venue}
                    </h3>
                    <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-6">
                      <p className="text-muted-foreground text-xs uppercase tracking-widest flex items-center gap-2">
                        <span className="w-1 h-1 bg-white/40 rounded-full" />
                        {show.location}
                      </p>
                      <p className="text-white/60 text-xs uppercase tracking-widest flex items-center gap-2">
                        <span className="w-1 h-1 bg-white/40 rounded-full" />
                        {show.time}
                      </p>
                    </div>
                  </div>

                  {/* Visual Accent */}
                  <div className="hidden md:block opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="w-8 h-[1px] bg-white/40" />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* View All Link */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <a
            href="/contact"
            className="text-white/40 hover:text-white text-[10px] uppercase tracking-[0.3em] transition-all inline-flex items-center gap-4 group"
          >
            <span className="w-8 h-[1px] bg-white/10 group-hover:w-12 group-hover:bg-white/40 transition-all" />
            Full Tour Schedule
            <span className="w-8 h-[1px] bg-white/10 group-hover:w-12 group-hover:bg-white/40 transition-all" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
