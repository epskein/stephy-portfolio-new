"use client";

import { motion } from "framer-motion";

const upcomingShows = [
  {
    id: 1,
    dateRange: { start: "2026-02-06", end: "2026-02-08" },
    venue: "BUNDU",
    flag: "🇿🇦",
    location: "POD Karoo (WC, RSA)",
  },
  {
    id: 2,
    dateRange: { start: "2026-02-27", end: "2026-03-01" },
    venue: "PVT.",
    flag: "🇿🇦",
    location: "POD Karoo (WC, RSA)",
  },
  {
    id: 3,
    dateRange: { start: "2026-03-07" },
    venue: "TBC",
    flag: "🇿🇦",
    location: "(CPT, RSA)",
  },
  {
    id: 4,
    dateRange: { start: "2026-03-14" },
    venue: "The GreenHouse Bar",
    flag: "🇿🇦",
    location: "(JHB, RSA)",
  },
  {
    id: 5,
    dateRange: { start: "2026-03-28" },
    venue: "Private Event",
    flag: "🇦🇺",
    location: "(BNE, AUS)",
  },
  {
    id: 6,
    dateRange: { start: "2026-04-27", end: "2026-05-03" },
    venue: "AfrikaBurn",
    flag: "🇿🇦",
    location: "(TNK, RSA)",
  },
];

function emojiToCodepoint(emoji: string) {
  return Array.from(emoji)
    .map((char) => char.codePointAt(0)?.toString(16))
    .filter(Boolean)
    .join("-");
}

function formatDateRange(start: string, end?: string) {
  const startDate = new Date(start);
  const endDate = end ? new Date(end) : startDate;
  const startDay = startDate.getDate().toString().padStart(2, "0");
  const endDay = endDate.getDate().toString().padStart(2, "0");
  const startMonth = startDate.toLocaleString("en-US", { month: "short" }).toUpperCase();
  const endMonth = endDate.toLocaleString("en-US", { month: "short" }).toUpperCase();
  const sameMonth = startMonth === endMonth && startDate.getFullYear() === endDate.getFullYear();
  const day = startDay === endDay ? startDay : `${startDay}–${endDay}`;
  const month = sameMonth ? startMonth : `${startMonth}–${endMonth}`;
  return { day, month };
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
          <h2 className="text-xl xs:text-2xl sm:text-4xl md:text-5xl font-bold mb-4 flex flex-col sm:flex-row justify-center items-center gap-1 sm:gap-0">
            <span className="gradient-text">UPCOMING</span>
            <span className="text-foreground sm:ml-3">SHOWS</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto uppercase tracking-widest text-[10px]">
            Catch Stephy live at these upcoming events worldwide.
          </p>
        </motion.div>

        {/* Shows Grid */}
        <div className="max-w-4xl mx-auto space-y-3 md:space-y-6">
          {upcomingShows.map((show, index) => {
            const { day, month } = formatDateRange(show.dateRange.start, show.dateRange.end);
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
                <div className="relative bg-white/[0.04] border border-white/10 rounded-2xl p-3 md:p-6 flex flex-row items-center gap-3 md:gap-6 transition-all duration-500 group-hover:bg-white/[0.08] group-hover:border-white/30 group-hover:shadow-[0_8px_32px_rgba(255,255,255,0.05)]">
                  {/* Date - always left */}
                  <div className="flex-shrink-0 text-center min-w-[50px] md:min-w-[80px] border-r border-white/10 pr-3 md:pr-6">
                    <div className="text-xl md:text-4xl font-black text-white">{day}</div>
                    <div className="text-[8px] md:text-[10px] font-bold text-muted-foreground tracking-[0.15em] md:tracking-[0.2em]">
                      {month}
                    </div>
                  </div>

                  {/* Venue Info - always right */}
                  <div className="flex-grow min-w-0">
                    <h3 className="text-sm md:text-xl font-bold text-white mb-0.5 md:mb-1 tracking-tight truncate">
                      {show.venue}
                    </h3>
                    <p className="text-muted-foreground text-[10px] md:text-xs uppercase tracking-wider flex items-center gap-1.5 truncate">
                      <img
                        src={`https://cdnjs.cloudflare.com/ajax/libs/twemoji/14.0.2/svg/${emojiToCodepoint(
                          show.flag
                        )}.svg`}
                        alt={`${show.flag} flag`}
                        className="inline-block flex-shrink-0"
                        width={12}
                        height={12}
                        loading="lazy"
                        aria-hidden="true"
                      />
                      <span className="truncate">{show.location}</span>
                    </p>
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
