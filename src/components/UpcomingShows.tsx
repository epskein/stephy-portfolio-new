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
    ticketLink: "#",
  },
  {
    id: 2,
    date: "2026-01-22",
    venue: "Fabric",
    location: "London, UK",
    time: "22:00",
    ticketLink: "#",
  },
  {
    id: 3,
    date: "2026-02-05",
    venue: "Berghain",
    location: "Berlin, Germany",
    time: "00:00",
    ticketLink: "#",
  },
  {
    id: 4,
    date: "2026-02-14",
    venue: "Output",
    location: "New York, USA",
    time: "22:00",
    ticketLink: "#",
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
      <div className="absolute inset-0 opacity-5">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)`,
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
          <p className="text-muted-foreground max-w-xl mx-auto">
            Catch Stephy live at these upcoming events. Get your tickets before they sell out.
          </p>
        </motion.div>

        {/* Shows Grid */}
        <div className="max-w-4xl mx-auto space-y-4">
          {upcomingShows.map((show, index) => {
            const { day, month } = formatDate(show.date);
            return (
              <motion.div
                key={show.id}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02 }}
                className="group relative"
              >
                <div className="glass rounded-xl p-6 flex flex-col md:flex-row items-start md:items-center gap-6 hover:border-accent/50 transition-colors">
                  {/* Date */}
                  <div className="flex-shrink-0 text-center min-w-[80px]">
                    <div className="text-4xl font-black text-accent">{day}</div>
                    <div className="text-sm font-semibold text-muted-foreground tracking-widest">
                      {month}
                    </div>
                  </div>

                  {/* Divider */}
                  <div className="hidden md:block w-px h-16 bg-border" />

                  {/* Venue Info */}
                  <div className="flex-grow">
                    <h3 className="text-xl font-bold text-foreground group-hover:text-accent transition-colors">
                      {show.venue}
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      {show.location}
                    </p>
                    <p className="text-accent-secondary text-xs mt-1">
                      {show.time}
                    </p>
                  </div>

                  {/* Ticket Button */}
                  <motion.a
                    href={show.ticketLink}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-6 py-3 bg-accent text-background text-sm font-semibold uppercase tracking-widest rounded-full hover:bg-accent/90 transition-colors"
                  >
                    Tickets
                  </motion.a>
                </div>

                {/* Glow effect on hover */}
                <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 blur-xl bg-accent/10" />
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
          className="text-center mt-12"
        >
          <a
            href="#"
            className="text-accent hover:text-accent-secondary text-sm uppercase tracking-widest transition-colors inline-flex items-center gap-2"
          >
            View All Shows
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
}

