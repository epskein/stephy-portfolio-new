"use client";

import { motion } from "framer-motion";

const socialLinks = [
  { name: "Instagram", href: "#", handle: "@stephylongueira" },
  { name: "SoundCloud", href: "#", handle: "stephylongueira" },
  { name: "Spotify", href: "#", handle: "Stephy Longueira" },
  { name: "YouTube", href: "#", handle: "Stephy Longueira" },
];

export default function ContactPage() {
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
              <span className="gradient-text">GET IN</span>
              <br />
              <span className="text-white">TOUCH</span>
            </h1>
            <p className="text-muted-foreground max-w-xl mx-auto uppercase tracking-widest text-[10px]">
              For bookings, collaborations, or inquiries.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Content */}
      <section className="pb-20">
        <div className="container mx-auto px-6">
          <div className="max-w-2xl mx-auto space-y-12">
            {/* Direct Contact */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white/[0.03] border border-white/10 rounded-[2.5rem] p-10 md:p-12 flex flex-col items-center text-center"
            >
              <h2 className="text-2xl font-bold mb-12 tracking-[0.1em] uppercase">
                <span className="gradient-text">DIRECT</span>
                <span className="text-white ml-2">CONTACT</span>
              </h2>

              <div className="space-y-12 w-full">
                <div className="flex flex-col items-center gap-2 group">
                  <h3 className="text-[10px] font-bold text-white/40 uppercase tracking-[0.2em] mb-1">
                    Booking
                  </h3>
                  <p className="text-white/60 text-[10px] uppercase tracking-widest mb-2 font-bold">
                    Agent: John Marlow
                  </p>
                  <a
                    href="mailto:booking@stephylongueira.com"
                    className="text-sm md:text-base font-bold text-white hover:text-white/60 transition-colors tracking-tight block"
                  >
                    booking@stephylongueira.com
                  </a>
                </div>

                <div className="flex flex-col items-center gap-2 group">
                  <h3 className="text-[10px] font-bold text-white/40 uppercase tracking-[0.2em] mb-1">
                    Press
                  </h3>
                  <a
                    href="mailto:press@stephylongueira.com"
                    className="text-sm md:text-base font-bold text-white hover:text-white/60 transition-colors tracking-tight block"
                  >
                    press@stephylongueira.com
                  </a>
                </div>
              </div>
            </motion.div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-white/[0.03] border border-white/10 rounded-[2.5rem] p-10 md:p-12 flex flex-col items-center text-center"
            >
              <h2 className="text-2xl font-bold mb-8 tracking-[0.1em] uppercase">
                <span className="gradient-text">FOLLOW</span>
                <span className="text-white ml-2">STEPHY</span>
              </h2>

              <div className="grid grid-cols-2 gap-4 w-full">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                    className="flex flex-col p-6 rounded-[1.5rem] border border-white/5 bg-white/[0.02] hover:bg-white hover:text-black transition-all group"
                  >
                    <span className="text-[10px] font-bold uppercase tracking-widest mb-1 opacity-40 group-hover:opacity-100">
                      {social.name}
                    </span>
                    <span className="text-[8px] sm:text-xs font-bold tracking-tight">
                      {social.handle}
                    </span>
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
}
