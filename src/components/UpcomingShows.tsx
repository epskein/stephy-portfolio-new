"use client";

import { useState } from "react";
import { motion } from "framer-motion";

const upcomingShows = [
  {
    id: 1,
    dateRange: { start: "2026-05-29" },
    venue: "Mirage",
    flag: "🇿🇦",
    location: "(CPT, RSA)",
  },
  {
    id: 2,
    dateRange: { start: "2026-06-06" },
    venue: "Luminary Gala",
    flag: "🇿🇦",
    location: "(CPT, RSA)",
  },
  {
    id: 3,
    dateRange: { start: "2026-09-24", end: "2026-09-28" },
    venue: "Lost City",
    flag: "🇿🇦",
    location: "POD Karoo (WC, RSA)",
  },
  {
    id: 4,
    dateRange: { start: "2026-10-22", end: "2026-10-26" },
    venue: "Lazerville",
    flag: "🇿🇦",
    location: "POD Karoo (WC, RSA)",
  },
];

function emojiToCodepoint(emoji: string) {
  return Array.from(emoji)
    .map((char) => char.codePointAt(0)?.toString(16))
    .filter(Boolean)
    .join("-");
}

function parseDate(value: string) {
  return new Date(`${value}T00:00:00`);
}

function startOfToday() {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  return d;
}

function formatDateRange(start: string, end?: string) {
  const startDate = parseDate(start);
  const endDate = end ? parseDate(end) : startDate;
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
  const [today] = useState(startOfToday);

  const sorted = [...upcomingShows].sort(
    (a, b) =>
      parseDate(a.dateRange.start).getTime() -
      parseDate(b.dateRange.start).getTime()
  );

  // Timeline overview maths: position events from TODAY to the last event.
  const todayMs = today.getTime();
  const lastMs = parseDate(
    sorted[sorted.length - 1].dateRange.start
  ).getTime();
  const rangeMs = Math.max(1, lastMs - todayMs);
  const pct = (ms: number) =>
    Math.min(100, Math.max(0, ((ms - todayMs) / rangeMs) * 100));

  const markers = sorted.map((show) => ({
    show,
    pos: pct(parseDate(show.dateRange.start).getTime()),
    ...formatDateRange(show.dateRange.start, show.dateRange.end),
  }));

  // Month boundaries that fall within the timeline range (context ticks).
  const monthTicks: { pos: number; label: string }[] = [];
  let cursor = new Date(today.getFullYear(), today.getMonth() + 1, 1);
  while (cursor.getTime() <= lastMs) {
    monthTicks.push({
      pos: pct(cursor.getTime()),
      label: cursor.toLocaleString("en-US", { month: "short" }).toUpperCase(),
    });
    cursor = new Date(cursor.getFullYear(), cursor.getMonth() + 1, 1);
  }

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

        {/* Horizontal timeline overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto mb-14 sm:mb-16"
        >
          <div className="relative h-40">
            {/* Inset track so end markers/labels stay in bounds */}
            <div className="absolute left-6 right-6 top-20">
              {/* Line */}
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-white/30 via-white/15 to-white/25" />

              {/* TODAY marker */}
              <div className="absolute top-0" style={{ left: "0%" }}>
                <span className="absolute left-0 top-0 -translate-x-1/2 -translate-y-1/2 flex h-4 w-4 items-center justify-center">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-white/25 animate-ping" />
                  <span className="relative h-2.5 w-2.5 rounded-full bg-white" />
                </span>
                <span className="absolute left-0 top-0 -translate-x-1/2 w-px h-8 bg-white/20" />
                <div className="absolute top-9 left-0">
                  <div className="text-[9px] font-bold uppercase tracking-[0.2em] text-white whitespace-nowrap">
                    Today
                  </div>
                </div>
              </div>

              {/* Month context ticks */}
              {monthTicks.map((tick) => (
                <div
                  key={tick.label + tick.pos}
                  className="absolute top-0"
                  style={{ left: `${tick.pos}%` }}
                >
                  <span className="absolute left-0 top-0 -translate-x-1/2 w-px h-1.5 bg-white/15" />
                  <span
                    className="absolute top-2.5 text-[8px] font-bold tracking-[0.15em] text-white/25 whitespace-nowrap"
                    style={{ transform: `translateX(-${tick.pos}%)` }}
                  >
                    {tick.label}
                  </span>
                </div>
              ))}

              {/* Event markers */}
              {markers.map((marker, index) => {
                const above = index % 2 === 0;
                return (
                  <div
                    key={marker.show.id}
                    className="absolute top-0 group"
                    style={{ left: `${marker.pos}%` }}
                  >
                    {/* Dot */}
                    <span
                      className={`absolute left-0 top-0 -translate-x-1/2 -translate-y-1/2 h-3.5 w-3.5 rounded-full border-2 transition-colors ${
                        index === 0
                          ? "border-white bg-white"
                          : "border-white/60 bg-background group-hover:border-white"
                      }`}
                    />
                    {/* Connector stick */}
                    <span
                      className={`absolute left-0 -translate-x-1/2 w-px bg-white/20 ${
                        above ? "bottom-0 h-8" : "top-0 h-8"
                      }`}
                    />
                    {/* Label */}
                    <div
                      className={`absolute ${above ? "bottom-9" : "top-9"}`}
                      style={{ transform: `translateX(-${marker.pos}%)` }}
                    >
                      <div className="text-[10px] font-bold uppercase tracking-tight text-white leading-tight whitespace-nowrap">
                        {marker.show.venue}
                      </div>
                      <div className="text-[8px] font-bold tracking-[0.15em] text-white/40 whitespace-nowrap">
                        {marker.day} {marker.month}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </motion.div>

        {/* Event cards */}
        <div className="max-w-4xl mx-auto space-y-3 md:space-y-6">
          {upcomingShows.map((show, index) => {
            const { day, month } = formatDateRange(
              show.dateRange.start,
              show.dateRange.end
            );
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
