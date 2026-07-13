"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  socialLinks as fallbackSocialLinks,
  SocialIcon,
  type SocialLink,
} from "@/components/socials";

const quickLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/music", label: "Music" },
  { href: "/gallery", label: "Gallery" },
  { href: "/venues", label: "Featured Venues" },
  { href: "/contact", label: "Contact" },
];

export default function Footer({
  socialLinks,
  bookingEmail = "bookings@stephylongueira.com",
  tagline = "Bringing electrifying performances to venues worldwide. Available for bookings and collaborations.",
}: {
  socialLinks?: SocialLink[];
  bookingEmail?: string;
  tagline?: string;
}) {
  const links =
    socialLinks && socialLinks.length > 0 ? socialLinks : fallbackSocialLinks;

  return (
    <footer className="relative bg-muted border-t border-border">
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand */}
          <div className="space-y-6">
            <Link href="/" className="block relative w-48 h-12">
              <Image
                src="/assets/logo-white.png"
                alt="Stephy Longueira"
                fill
                className="object-contain object-left"
              />
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-xs">
              {tagline}
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-xs font-semibold tracking-[0.2em] text-white uppercase">
              QUICK LINKS
            </h4>
            <nav className="flex flex-col gap-2">
              {quickLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-muted-foreground hover:text-white text-sm transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Social & Contact */}
          <div className="space-y-4">
            <h4 className="text-xs font-semibold tracking-[0.2em] text-white uppercase">
              CONNECT
            </h4>
            <div className="flex flex-wrap gap-3">
              {links.map((social) => (
                <motion.a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.name}
                  whileHover={{ scale: 1.1, y: -2, borderColor: "white", color: "white" }}
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 rounded-none border border-border flex items-center justify-center text-muted-foreground transition-all"
                >
                  <SocialIcon name={social.name} />
                </motion.a>
              ))}
            </div>
            <p className="text-muted-foreground text-sm pt-2">
              For bookings:{" "}
              <a
                href={`mailto:${bookingEmail}`}
                className="text-white hover:underline transition-colors"
              >
                {bookingEmail}
              </a>
            </p>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-muted-foreground text-[10px] uppercase tracking-widest">
            © {new Date().getFullYear()} Stephy Longueira. All rights reserved.
          </p>
          <p className="text-muted-foreground text-[10px] uppercase tracking-widest">
            Metallic Edition
          </p>
        </div>
      </div>
    </footer>
  );
}
