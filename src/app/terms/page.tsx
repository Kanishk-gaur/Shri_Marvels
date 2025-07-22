"use client"

import { motion } from "framer-motion"
import { FileText, Scale, AlertTriangle, Users, Shield, Gavel } from "lucide-react"

const sections = [
  {
    icon: Users,
    title: "Acceptance of Terms",
    content: [
      "By accessing and using Discover, you accept and agree to be bound by these Terms of Service",
      "If you do not agree to these terms, please do not use our service",
      "We may update these terms from time to time, and continued use constitutes acceptance",
      "You must be at least 13 years old to use our service",
    ],
  },
  {
    icon: Shield,
    title: "Use of Service",
    content: [
      "You may use our service for personal, non-commercial purposes",
      "You agree not to misuse our service or help anyone else do so",
      "You are responsible for maintaining the security of your account",
      "You must not attempt to gain unauthorized access to our systems",
    ],
  },
  {
    icon: FileText,
    title: "Content and Intellectual Property",
    content: [
      "All content on Discover, including 3D models and designs, is protected by copyright",
      "You may not reproduce, distribute, or create derivative works without permission",
      "User-generated content remains your property, but you grant us license to use it",
      "We respect intellectual property rights and expect users to do the same",
    ],
  },
  {
    icon: AlertTriangle,
    title: "Prohibited Activities",
    content: [
      "Violating any applicable laws or regulations",
      "Infringing on intellectual property rights of others",
      "Uploading malicious code or attempting to hack our systems",
      "Harassing, threatening, or impersonating other users",
    ],
  },
  {
    icon: Scale,
    title: "Limitation of Liability",
    content: [
      "Our service is provided 'as is' without warranties of any kind",
      "We are not liable for any indirect, incidental, or consequential damages",
      "Our total liability is limited to the amount you paid for our service",
      "Some jurisdictions do not allow these limitations, so they may not apply to you",
    ],
  },
  {
    icon: Gavel,
    title: "Termination and Governing Law",
    content: [
      "We may terminate or suspend your account at any time for violations",
      "You may terminate your account at any time by contacting us",
      "These terms are governed by the laws of [Your Jurisdiction]",
      "Any disputes will be resolved through binding arbitration",
    ],
  },
]

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 pt-16">
      {/* Hero Section */}
      <motion.div
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="text-center">
          <motion.div
            className="w-20 h-20 mx-auto mb-6 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full flex items-center justify-center"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <FileText className="w-10 h-10 text-white" />
          </motion.div>
          <motion.h1
            className="text-5xl md:text-7xl font-bold text-white mb-6"
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            Terms of{" "}
            <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">Service</span>
          </motion.h1>
          <motion.p
            className="text-xl text-gray-300 max-w-3xl mx-auto"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            These terms govern your use of Discover and our 3D collection services. Please read them carefully.
          </motion.p>
          <motion.p
            className="text-sm text-gray-400 mt-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.6 }}
          >
            Last updated: January 2024
          </motion.p>
        </div>
      </motion.div>

      {/* Terms Sections */}
      <motion.div
        className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="space-y-12">
          {sections.map((section, index) => {
            const Icon = section.icon
            return (
              <motion.div
                key={section.title}
                className="rounded-2xl bg-white/10 backdrop-blur-sm p-8"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
              >
                <div className="flex items-center space-x-4 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full flex items-center justify-center">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-white">{section.title}</h2>
                </div>
                <ul className="space-y-3">
                  {section.content.map((item, itemIndex) => (
                    <motion.li
                      key={itemIndex}
                      className="flex items-start space-x-3 text-gray-300"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 + itemIndex * 0.05, duration: 0.4 }}
                    >
                      <div className="w-2 h-2 bg-cyan-400 rounded-full mt-2 flex-shrink-0" />
                      <span>{item}</span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            )
          })}
        </div>
      </motion.div>

      {/* Contact Section */}
      <motion.div
        className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="rounded-2xl bg-gradient-to-r from-cyan-500/20 to-purple-500/20 backdrop-blur-sm p-8 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Questions About These Terms?</h2>
          <p className="text-gray-300 mb-6">
            If you have any questions about these Terms of Service, please contact our legal team.
          </p>
          <motion.a
            href="/contact"
            className="inline-flex items-center space-x-2 bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-semibold py-3 px-6 rounded-lg hover:from-cyan-600 hover:to-purple-600 transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span>Contact Legal Team</span>
          </motion.a>
        </div>
      </motion.div>
    </div>
  )
}
