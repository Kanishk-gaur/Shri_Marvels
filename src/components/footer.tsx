"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Mail, Phone, MapPin, Github, Twitter, Linkedin } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-black/40 backdrop-blur-md border-t border-white/10 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <motion.div
            className="space-y-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-2xl font-bold bg-gradient-to-r from-emerald-800 to-emerald-400 bg-clip-text text-transparent">
              AGRAWAL CERAMICS
            </h3>
            <p className="text-white/70 text-sm">
              Explore extraordinary collections of marvels and tiles with stunning 3D previews and interactive
              experiences.
            </p>
            <div className="flex space-x-4">
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
            className="space-y-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h4 className="text-lg font-semibold text-white">Quick Links</h4>
            <div className="space-y-2">
              {[
                { href: "/", label: "Home" },
                { href: "/gallery?category=marvel", label: "Marbles Collection" },
                { href: "/gallery?category=tiles", label: "Tiles Collection" },
                { href: "/about", label: "About Us" },
              ].map((link) => (
                <Link key={link.href} href={link.href}>
                  <motion.div
                    className="text-white/70 hover:text-white transition-colors text-sm"
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
            className="space-y-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h4 className="text-lg font-semibold text-white">Support</h4>
            <div className="space-y-2">
              {[
                { href: "/contact", label: "Contact Us" },
                { href: "/faq", label: "FAQ" },
                { href: "/terms", label: "Terms of Service" },
                { href: "/privacy", label: "Privacy Policy" },
              ].map((link) => (
                <Link key={link.href} href={link.href}>
                  <motion.div
                    className="text-white/70 hover:text-white transition-colors text-sm"
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
            className="space-y-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h4 className="text-lg font-semibold text-white">Contact Info</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-white/70 text-sm">
                <Mail className="w-4 h-4" />
                <span>contact@agrawalceramics.com</span>
              </div>
              <div className="flex items-center space-x-3 text-white/70 text-sm">
                <Phone className="w-4 h-4" />
                <span>+91 7091833184</span>
              </div>
              <div className="flex items-center space-x-3 text-white/70 text-sm">
                <MapPin className="w-4 h-4" />
                <span>Morbi Office,8-A, National Highway, Gujarat 363642</span>
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
            © 2024 Discover. All rights reserved. Built with Next.js and Tailwind CSS.
          </p>
        </motion.div>
      </div>
    </footer>
  )
}
