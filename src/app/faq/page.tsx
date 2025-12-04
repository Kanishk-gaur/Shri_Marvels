"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { HelpCircle, ChevronDown, Search, MessageCircle } from "lucide-react"
import { Input } from "@/components/ui/input"

const faqs = [
  {
    category: "General",
    questions: [
      {
        question: "What is Discover?",
        answer:
          "Discover is a revolutionary platform that showcases digital collections through immersive 3D experiences. We specialize in presenting marble and tiles with stunning visual detail and interactive features.",
      },
      {
        question: "How do I navigate the 3D collections?",
        answer:
          "You can navigate our 3D collections using mouse controls or touch gestures. Click and drag to rotate items, scroll to zoom, and use the filter options to find specific categories or sizes.",
      },
      {
        question: "Is Discover free to use?",
        answer:
          "Yes, browsing our collections is completely free. We offer premium features for enhanced experiences and exclusive content access.",
      },
    ],
  },
  {
    category: "Technical",
    questions: [
      {
        question: "What browsers are supported?",
        answer:
          "Discover works best on modern browsers including Chrome, Firefox, Safari, and Edge. We recommend using the latest version for optimal 3D performance.",
      },
      {
        question: "Why are 3D models loading slowly?",
        answer:
          "3D model loading speed depends on your internet connection and device performance. We optimize all models for web delivery, but complex scenes may take a moment to load.",
      },
      {
        question: "Can I use Discover on mobile devices?",
        answer:
          "Discover is fully responsive and optimized for mobile devices. Touch controls make it easy to explore 3D collections on smartphones and tablets.",
      },
    ],
  },
  {
    category: "Collections",
    questions: [
      {
        question: "How often are new items added?",
        answer:
          "We add new items to our Marvel and Tiles collections weekly. Follow us on social media or subscribe to our newsletter for updates on new additions.",
      },
      {
        question: "Can I request specific items to be added?",
        answer:
          "Yes! We welcome suggestions from our community. Contact us through our support form with your requests, and we'll consider them for future additions.",
      },
      {
        question: "Are the 3D models accurate representations?",
        answer:
          "We strive for the highest accuracy in our 3D models. Each item is carefully crafted and reviewed to ensure it represents the real-world counterpart as closely as possible.",
      },
    ],
  },
  {
    category: "Account",
    questions: [
      {
        question: "Do I need an account to browse collections?",
        answer:
          "No account is required for basic browsing. However, creating an account allows you to save favorites, access premium content, and receive personalized recommendations.",
      },
      {
        question: "How do I reset my password?",
        answer:
          "Click the 'Forgot Password' link on the login page, enter your email address, and we'll send you instructions to reset your password.",
      },
      {
        question: "Can I delete my account?",
        answer:
          "Yes, you can delete your account at any time from your account settings. This action is permanent and cannot be undone.",
      },
    ],
  },
]

export default function FAQPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [openItems, setOpenItems] = useState<string[]>([])

  const toggleItem = (id: string) => {
    setOpenItems((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]))
  }

  const filteredFaqs = faqs
    .map((category) => ({
      ...category,
      questions: category.questions.filter(
        (q) =>
          q.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
          q.answer.toLowerCase().includes(searchTerm.toLowerCase()),
      ),
    }))
    .filter((category) => category.questions.length > 0)

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
            <HelpCircle className="w-10 h-10 text-white" />
          </motion.div>
          <motion.h1
            className="text-5xl md:text-7xl font-bold text-white mb-6"
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            Frequently Asked{" "}
            <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              Questions
            </span>
          </motion.h1>
          <motion.p
            className="text-xl text-gray-300 max-w-3xl mx-auto"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            Find answers to common questions about Discover and our 3D collections.
          </motion.p>
        </div>
      </motion.div>

      {/* Search */}
      <motion.div
        className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 mb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.6 }}
      >
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/50 w-5 h-5" />
          <Input
            type="text"
            placeholder="Search frequently asked questions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-12 bg-white/10 border-white/20 text-white placeholder:text-white/50 h-12 text-lg"
          />
        </div>
      </motion.div>

      {/* FAQ Categories */}
      <motion.div
        className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.6 }}
      >
        <div className="space-y-8">
          {filteredFaqs.map((category, categoryIndex) => (
            <motion.div
              key={category.category}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: categoryIndex * 0.1, duration: 0.6 }}
            >
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-bold">{category.category[0]}</span>
                </div>
                <span>{category.category}</span>
              </h2>

              <div className="space-y-4">
                {category.questions.map((faq, index) => {
                  const itemId = `${category.category}-${index}`
                  const isOpen = openItems.includes(itemId)

                  return (
                    <motion.div
                      key={index}
                      className="rounded-2xl bg-white/10 backdrop-blur-sm overflow-hidden"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: categoryIndex * 0.1 + index * 0.05, duration: 0.4 }}
                    >
                      <button
                        onClick={() => toggleItem(itemId)}
                        className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-white/5 transition-colors"
                      >
                        <span className="text-white font-medium text-lg">{faq.question}</span>
                        <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
                          <ChevronDown className="w-5 h-5 text-white/70" />
                        </motion.div>
                      </button>

                      <AnimatePresence>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                          >
                            <div className="px-6 pb-4 text-gray-300 leading-relaxed">{faq.answer}</div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  )
                })}
              </div>
            </motion.div>
          ))}
        </div>

        {filteredFaqs.length === 0 && searchTerm && (
          <motion.div
            className="text-center py-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <div className="w-16 h-16 mx-auto mb-4 bg-white/10 rounded-full flex items-center justify-center">
              <Search className="w-8 h-8 text-white/50" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">No results found</h3>
            <p className="text-gray-400">Try searching with different keywords or browse all categories above.</p>
          </motion.div>
        )}
      </motion.div>

      {/* Contact Section */}
      <motion.div
        className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="rounded-2xl bg-gradient-to-r from-cyan-500/20 to-purple-500/20 backdrop-blur-sm p-8 text-center">
          <MessageCircle className="w-12 h-12 mx-auto mb-4 text-cyan-400" />
          <h2 className="text-2xl font-bold text-white mb-4">Still Have Questions?</h2>
          <p className="text-gray-300 mb-6">
          Can&apos;t find what you&apos;re looking for? Our support team is here to help you with any questions or concerns.

          </p>
          <motion.a
            href="/contact"
            className="inline-flex items-center space-x-2 bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-semibold py-3 px-6 rounded-lg hover:from-cyan-600 hover:to-purple-600 transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <MessageCircle className="w-4 h-4" />
            <span>Contact Support</span>
          </motion.a>
        </div>
      </motion.div>
    </div>
  )
}
