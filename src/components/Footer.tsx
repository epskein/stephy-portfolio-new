"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const socialLinks = [
  { name: "Instagram", href: "#", icon: "IG" },
  { name: "SoundCloud", href: "#", icon: "SC" },
  { name: "Spotify", href: "#", icon: "SP" },
  { name: "YouTube", href: "#", icon: "YT" },
];

const quickLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/gallery", label: "Gallery" },
  { href: "/venues", label: "Featured Venues" },
  { href: "/contact", label: "Contact" },
];

export default function Footer() {
  return (
    <footer className="relative bg-muted border-t border-border">
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold">
              <span className="gradient-text">STEPHY</span>
              <span className="text-foreground ml-2">LONGUEIRA</span>
            </h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              DJ & Artist bringing electrifying performances to venues worldwide.
              Available for bookings and collaborations.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold tracking-widest text-accent">
              QUICK LINKS
            </h4>
            <nav className="flex flex-col gap-2">
              {quickLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-muted-foreground hover:text-foreground text-sm transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Social & Contact */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold tracking-widest text-accent">
              CONNECT
            </h4>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-xs font-bold text-muted-foreground hover:text-accent hover:border-accent transition-colors"
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
            <p className="text-muted-foreground text-sm">
              For bookings:{" "}
              <a
                href="mailto:booking@stephylongueira.com"
                className="text-accent hover:underline"
              >
                booking@stephylongueira.com
              </a>
            </p>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-muted-foreground text-xs">
            © {new Date().getFullYear()} Stephy Longueira. All rights reserved.
          </p>
          <p className="text-muted-foreground text-xs">
            Designed with passion for music
          </p>
        </div>
      </div>
    </footer>
  );
}

