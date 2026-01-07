"use client";

import { useState } from "react";
import { motion } from "framer-motion";

const socialLinks = [
  { name: "Instagram", href: "#", handle: "@stephylongueira" },
  { name: "SoundCloud", href: "#", handle: "stephylongueira" },
  { name: "Spotify", href: "#", handle: "Stephy Longueira" },
  { name: "YouTube", href: "#", handle: "Stephy Longueira" },
];

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setIsSubmitted(true);
    setFormData({ name: "", email: "", subject: "", message: "" });

    // Reset success message after 5 seconds
    setTimeout(() => setIsSubmitted(false), 5000);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

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
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="bg-white/[0.03] border border-white/10 rounded-[2.5rem] p-10 md:p-12">
                <h2 className="text-2xl font-bold mb-8 tracking-[0.1em] uppercase">
                  <span className="gradient-text">SEND A</span>
                  <span className="text-white ml-2">MESSAGE</span>
                </h2>

                {isSubmitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-12"
                  >
                    <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center mx-auto mb-6">
                      <svg
                        className="w-8 h-8 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3 uppercase tracking-widest">
                      MESSAGE SENT
                    </h3>
                    <p className="text-muted-foreground text-xs uppercase tracking-widest">
                      I&apos;ll get back to you within 48 hours.
                    </p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div>
                        <label
                          htmlFor="name"
                          className="block text-[10px] font-bold text-white mb-3 uppercase tracking-[0.2em]"
                        >
                          Name
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          className="w-full px-6 py-4 bg-white/[0.04] border border-white/10 rounded-2xl text-white placeholder-white/20 focus:outline-none focus:border-white/40 transition-all text-xs"
                          placeholder="Your name"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="email"
                          className="block text-[10px] font-bold text-white mb-3 uppercase tracking-[0.2em]"
                        >
                          Email
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="w-full px-6 py-4 bg-white/[0.04] border border-white/10 rounded-2xl text-white placeholder-white/20 focus:outline-none focus:border-white/40 transition-all text-xs"
                          placeholder="your@email.com"
                        />
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="subject"
                        className="block text-[10px] font-bold text-white mb-3 uppercase tracking-[0.2em]"
                      >
                        Subject
                      </label>
                      <select
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        className="w-full px-6 py-4 bg-white/[0.04] border border-white/10 rounded-2xl text-white focus:outline-none focus:border-white/40 transition-all text-xs appearance-none cursor-pointer"
                      >
                        <option value="" className="bg-black">Select a subject</option>
                        <option value="booking" className="bg-black">Booking Inquiry</option>
                        <option value="collaboration" className="bg-black">Collaboration</option>
                        <option value="press" className="bg-black">Press / Media</option>
                        <option value="other" className="bg-black">Other</option>
                      </select>
                    </div>

                    <div>
                      <label
                        htmlFor="message"
                        className="block text-[10px] font-bold text-white mb-3 uppercase tracking-[0.2em]"
                      >
                        Message
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={5}
                        className="w-full px-6 py-4 bg-white/[0.04] border border-white/10 rounded-2xl text-white placeholder-white/20 focus:outline-none focus:border-white/40 transition-all text-xs resize-none"
                        placeholder="Tell me about your project..."
                      />
                    </div>

                    <motion.button
                      type="submit"
                      disabled={isSubmitting}
                      whileHover={{ scale: 1.02, backgroundColor: "#fff", color: "#000" }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full px-10 py-5 border border-white/20 bg-transparent text-white font-bold uppercase tracking-[0.3em] text-[10px] rounded-full transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? "Sending..." : "Send Message"}
                    </motion.button>
                  </form>
                )}
              </div>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="space-y-8"
            >
              {/* Direct Contact */}
              <div className="bg-white/[0.03] border border-white/10 rounded-[2.5rem] p-10 md:p-12">
                <h2 className="text-2xl font-bold mb-8 tracking-[0.1em] uppercase">
                  <span className="gradient-text">DIRECT</span>
                  <span className="text-white ml-2">CONTACT</span>
                </h2>

                <div className="space-y-8">
                  <div className="flex items-start gap-6 group">
                    <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center flex-shrink-0 group-hover:bg-white group-hover:text-black transition-all">
                      <svg
                        className="w-6 h-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-[10px] font-bold text-white/40 uppercase tracking-[0.2em] mb-1">
                        Booking
                      </h3>
                      <a
                        href="mailto:booking@stephylongueira.com"
                        className="text-lg font-bold text-white hover:text-white/60 transition-colors tracking-tight"
                      >
                        booking@stephylongueira.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-6 group">
                    <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center flex-shrink-0 group-hover:bg-white group-hover:text-black transition-all">
                      <svg
                        className="w-6 h-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
                        />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-[10px] font-bold text-white/40 uppercase tracking-[0.2em] mb-1">
                        Press
                      </h3>
                      <a
                        href="mailto:press@stephylongueira.com"
                        className="text-lg font-bold text-white hover:text-white/60 transition-colors tracking-tight"
                      >
                        press@stephylongueira.com
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div className="bg-white/[0.03] border border-white/10 rounded-[2.5rem] p-10 md:p-12">
                <h2 className="text-2xl font-bold mb-8 tracking-[0.1em] uppercase">
                  <span className="gradient-text">FOLLOW</span>
                  <span className="text-white ml-2">STEPHY</span>
                </h2>

                <div className="grid grid-cols-2 gap-4">
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
                      <span className="text-xs font-bold tracking-tight">
                        {social.handle}
                      </span>
                    </motion.a>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
}
