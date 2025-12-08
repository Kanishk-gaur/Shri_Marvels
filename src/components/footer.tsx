"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Mail, Phone, MapPin, Github, Twitter, Linkedin } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-black/40 backdrop-blur-md border-t border-white/10 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Significantly increased gap from gap-8 to gap-16 (4rem = 64px) */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-38">
          {/* Company Info */}
          <motion.div
            className="space-y-5 flex flex-col"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-white">AGRAWAL CERAMICS</h3>
              <p className="text-white/70 text-sm leading-relaxed">
                Explore extraordinary collections of marbles and tiles with
                stunning 3D previews and interactive experiences.
              </p>
            </div>
            <div className="flex space-x-4 mt-2">
              <motion.a
                href="#"
                className="text-white/70 hover:text-white transition-colors"
                whileHover={{ scale: 1.2 }}
              >
                <Github className="w-5 h-5" />
              </motion.a>
              <motion.a
                href="#"
                className="text-white/70 hover:text-white transition-colors"
                whileHover={{ scale: 1.2 }}
              >
                <Twitter className="w-5 h-5" />
              </motion.a>
              <motion.a
                href="#"
                className="text-white/70 hover:text-white transition-colors"
                whileHover={{ scale: 1.2 }}
              >
                <Linkedin className="w-5 h-5" />
              </motion.a>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            className="space-y-5 flex flex-col"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h4 className="text-lg font-semibold text-white mb-1">Quick Links</h4>
            <div className="space-y-3 flex-grow">
              {[
                { href: "/", label: "Home" },
                {
                  href: "/gallery?category=marvel",
                  label: "Marbles Collection",
                },
                { href: "/gallery?category=tiles", label: "Tiles Collection" },
                { href: "/about", label: "About Us" },
                { href: "/contact", label: "Contact" },
              ].map((link) => (
                <Link key={link.href} href={link.href}>
                  <motion.div
                    className="text-white/70 hover:text-white transition-colors text-sm py-1"
                    whileHover={{ x: 5 }}
                  >
                    {link.label}
                  </motion.div>
                </Link>
              ))}
            </div>
          </motion.div>

          {/* Support */}
          <motion.div
            className="space-y-5 flex flex-col"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h4 className="text-lg font-semibold text-white mb-1">Support</h4>
            <div className="space-y-3 flex-grow">
              {[
                { href: "/contact", label: "Contact Us" },
                { href: "/faq", label: "FAQ" },
                { href: "/terms", label: "Terms of Service" },
                { href: "/privacy", label: "Privacy Policy" },
                { href: "/shipping", label: "Shipping Policy" },
              ].map((link) => (
                <Link key={link.href} href={link.href}>
                  <motion.div
                    className="text-white/70 hover:text-white transition-colors text-sm py-1"
                    whileHover={{ x: 5 }}
                  >
                    {link.label}
                  </motion.div>
                </Link>
              ))}
            </div>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            className="space-y-5 flex flex-col"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h4 className="text-lg font-semibold text-white mb-1">Contact Info</h4>
            <div className="space-y-4 flex-grow">
              <div className="flex items-start space-x-3 text-white/70 text-sm">
                <Mail className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span className="leading-relaxed">contact@agrawalceramics.com</span>
              </div>
              <div className="flex items-center space-x-3 text-white/70 text-sm">
                <Phone className="w-4 h-4 flex-shrink-0" />
                <span>+91 7091833184</span>
              </div>
              <div className="flex items-start space-x-3 text-white/70 text-sm">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span className="leading-relaxed">Morbi Office,8-A, National Highway, Gujarat 363642</span>
              </div>
             
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          className="border-t border-white/10 mt-8 pt-8 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <p className="text-white/50 text-sm">
            © 2024 Agrawal Ceramics. All rights reserved. Built with Next.js and
            Tailwind CSS.
          </p>
        </motion.div>
      </div>
    </footer>
  );
}