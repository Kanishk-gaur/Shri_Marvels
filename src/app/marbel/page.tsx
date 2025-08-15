"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { MarvelCarousel } from "@/components/marvel-carousel"
import { SubcategoryCard } from "@/components/subcategory-card"
import { categories } from "@/data" // We don't need 'sizes' here anymore for this logic

// FIX: Update the type to include the 'sizes' array
type SubCategoryInfo = {
  id: string
  name: string
  count: number
  exampleImage: string
  sizes: string[] // This is the crucial addition
}

export default function MarvelPage() {
  // The 'categories.marvel' data now contains the specific sizes for each entry
  const marvelSubcategories = categories.marvel.map((cat: SubCategoryInfo) => ({
    ...cat,
    // The 'availableSizes' prop will now receive the correct, specific sizes
    availableSizes: cat.sizes,
  }))

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#EFE2C8] to-[#E7DFC9] antialiased">
      {/* Header */}
      <motion.div
        className="p-6 flex items-center justify-between"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <Link href="/">
          <motion.button
            className="flex items-center space-x-2 text-[#5C4421] hover:text-[#84632e] transition-colors"
            whileHover={{ x: -5 }}
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Home</span>
          </motion.button>
        </Link>
        <div className="text-center">
          <h1 className="text-3xl font-bold text-[#5C4421]">Premium Marble Collection</h1>
          <p className="text-[#84632e]">Natural stone from the world&apos;s finest quarries</p>
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
          <h2 className="text-4xl font-bold text-[#5C4421] mb-4">Explore Marble Types</h2>
          <p className="text-[#84632e] max-w-2xl mx-auto">
            Select a marble type to view available sizes and browse our curated gallery.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {marvelSubcategories.map((subcategory) => (
            <SubcategoryCard
              key={subcategory.id}
              mainCategory="marvel"
              subcategory={subcategory}
              availableSizes={subcategory.availableSizes} // This now correctly passes the specific sizes
            />
          ))}
        </div>
      </motion.div>
    </div>
  )
}