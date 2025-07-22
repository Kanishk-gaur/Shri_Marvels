"use client"

import { motion } from "framer-motion"
import { Shield, Eye, Lock, Users, Database, Globe } from "lucide-react"

const sections = [
  {
    icon: Database,
    title: "Information We Collect",
    content: [
      "Personal information you provide when creating an account or contacting us",
      "Usage data including how you interact with our 3D collections",
      "Device information such as browser type, IP address, and operating system",
      "Cookies and similar tracking technologies for improved user experience",
    ],
  },
  {
    icon: Eye,
    title: "How We Use Your Information",
    content: [
      "To provide and improve our 3D collection services",
      "To personalize your experience and recommend relevant content",
      "To communicate with you about updates, features, and support",
      "To analyze usage patterns and optimize our platform performance",
    ],
  },
  {
    icon: Users,
    title: "Information Sharing",
    content: [
      "We do not sell, trade, or rent your personal information to third parties",
      "We may share data with trusted service providers who assist in our operations",
      "Legal compliance: We may disclose information when required by law",
      "Business transfers: Information may be transferred in case of merger or acquisition",
    ],
  },
  {
    icon: Lock,
    title: "Data Security",
    content: [
      "Industry-standard encryption for data transmission and storage",
      "Regular security audits and vulnerability assessments",
      "Access controls and authentication measures for our systems",
      "Secure data centers with physical and digital protection measures",
    ],
  },
  {
    icon: Globe,
    title: "Your Rights",
    content: [
      "Access: Request a copy of your personal data we hold",
      "Correction: Update or correct inaccurate personal information",
      "Deletion: Request deletion of your personal data (subject to legal requirements)",
      "Portability: Request your data in a machine-readable format",
    ],
  },
]

export default function PrivacyPage() {
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
            <Shield className="w-10 h-10 text-white" />
          </motion.div>
          <motion.h1
            className="text-5xl md:text-7xl font-bold text-white mb-6"
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            Privacy{" "}
            <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">Policy</span>
          </motion.h1>
          <motion.p
            className="text-xl text-gray-300 max-w-3xl mx-auto"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            Your privacy is important to us. This policy explains how we collect, use, and protect your information when
            you use Discover.
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

      {/* Privacy Sections */}
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
          <h2 className="text-2xl font-bold text-white mb-4">Questions About Privacy?</h2>
          <p className="text-gray-300 mb-6">
          If you have any questions about this Privacy Policy or how we handle your data, please don&apos;t hesitate to contact us.

          </p>
          <motion.a
            href="/contact"
            className="inline-flex items-center space-x-2 bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-semibold py-3 px-6 rounded-lg hover:from-cyan-600 hover:to-purple-600 transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span>Contact Us</span>
          </motion.a>
        </div>
      </motion.div>
    </div>
  )
}
