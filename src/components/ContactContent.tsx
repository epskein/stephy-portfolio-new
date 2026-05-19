"use client";

import { motion } from "framer-motion";
import {
  socialLinks as fallbackSocialLinks,
  SocialIcon,
  type SocialLink,
} from "@/components/socials";

export default function ContactContent({
  socialLinks,
}: {
  socialLinks?: SocialLink[];
}) {
  const links =
    socialLinks && socialLinks.length > 0 ? socialLinks : fallbackSocialLinks;

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
              className="bg-white/[0.03] border border-white/10 rounded-[2.5rem] p-6 sm:p-10 md:p-12 flex flex-col items-center text-center overflow-hidden"
            >
              <h2 className="text-lg sm:text-2xl font-bold mb-12 tracking-[0.05em] sm:tracking-[0.1em] uppercase flex flex-col sm:flex-row justify-center items-center gap-1 sm:gap-0">
                <span className="gradient-text">DIRECT</span>
                <span className="text-white sm:ml-2">CONTACT</span>
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
                    href="mailto:bookings@stephylongueira.com"
                    className="text-xs sm:text-sm md:text-base font-bold text-white hover:text-white/60 transition-colors tracking-tight block break-all"
                  >
                    bookings@stephylongueira.com
                  </a>
                </div>

                <div className="flex flex-col items-center gap-2 group">
                  <h3 className="text-[10px] font-bold text-white/40 uppercase tracking-[0.2em] mb-1">
                    Press
                  </h3>
                  <a
                    href="mailto:press@stephylongueira.com"
                    className="text-xs sm:text-sm md:text-base font-bold text-white hover:text-white/60 transition-colors tracking-tight block break-all"
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
              className="bg-white/[0.03] border border-white/10 rounded-[2.5rem] p-6 sm:p-10 md:p-12 flex flex-col items-center text-center overflow-hidden"
            >
              <h2 className="text-lg sm:text-2xl font-bold mb-8 tracking-[0.05em] sm:tracking-[0.1em] uppercase flex flex-col sm:flex-row justify-center items-center gap-1 sm:gap-0">
                <span className="gradient-text">FOLLOW</span>
                <span className="text-white sm:ml-2">STEPHY</span>
              </h2>

              <div className="flex flex-col gap-3 w-full">
                {links.map((social, index) => (
                  <motion.a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                    className="flex items-center justify-between py-3 px-4 rounded-xl border border-white/5 bg-white/[0.02] hover:bg-white hover:text-black transition-all group gap-3"
                  >
                    <span className="flex items-center gap-3 min-w-0">
                      <SocialIcon
                        name={social.name}
                        className="w-5 h-5 flex-shrink-0"
                      />
                      <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider sm:tracking-widest opacity-60 group-hover:opacity-100">
                        {social.name}
                      </span>
                    </span>
                    <span className="text-[10px] sm:text-xs font-bold tracking-tight opacity-80 group-hover:opacity-100 truncate">
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
