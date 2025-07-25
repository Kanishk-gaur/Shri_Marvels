"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { MarvelCarousel } from "@/components/marvel-carousel"
import { SubcategoryCard } from "@/components/subcategory-card"
import { categories, sizes } from "@/data/products"

export default function MarvelPage() {
  const marvelSubcategories = categories.marvel.map((cat) => ({
    ...cat,
    availableSizes: sizes.marvel, // All marvel subcategories share the same sizes for now
  }))

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-900 via-purple-900 to-slate-900">
      {/* Header */}
      <motion.div
        className="p-6 flex items-center justify-between"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <Link href="/">
          <motion.button
            className="flex items-center space-x-2 text-white hover:text-red-400 transition-colors"
            whileHover={{ x: -5 }}
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Home</span>
          </motion.button>
        </Link>
        <div className="text-center">
          <h1 className="text-3xl font-bold text-white">Premium Marble Collection</h1>
          <p className="text-white/70">Natural stone from the world&apos;s finest quarries</p>
        </div>
        <div className="w-24"></div>
      </motion.div>

      {/* 3D Carousel */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2, duration: 0.8 }}
      >
        <MarvelCarousel />
      </motion.div>

      {/* Subcategory Selection */}
      <motion.div
        className="px-6 py-12 max-w-7xl mx-auto"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.8 }}
      >
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white mb-4">Explore Marble Types</h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Select a marble type to view available sizes and browse our curated gallery.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {marvelSubcategories.map((subcategory) => (
            <SubcategoryCard
              key={subcategory.id}
              mainCategory="marvel"
              subcategory={subcategory}
              availableSizes={subcategory.availableSizes}
            />
          ))}
        </div>
      </motion.div>
    </div>
  )
}
