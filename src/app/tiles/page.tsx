"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { TilesCarousel } from "@/components/tiles-carousel"
import { SubcategoryCard } from "@/components/subcategory-card"
import { categories } from "@/data" // We no longer need the generic 'sizes' import for this part

// FIX: Updated the type definition to include the 'sizes' array
type SubCategoryInfo = {
  id: string
  name: string
  count: number
  exampleImage: string
  sizes: string[] // This property is now expected
}

export default function TilesPage() {
  // FIX: Map over the tiles subcategories to pass the specific sizes for each one
  const tilesSubcategories = categories.tiles.map((cat: SubCategoryInfo) => ({
    ...cat,
    // Use the specific sizes associated with each subcategory ('cat')
    availableSizes: cat.sizes,
  }))

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-900 via-indigo-900 to-slate-900">
      {/* Header */}
      <motion.div
        className="p-6 flex items-center justify-between"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <Link href="/">
          <motion.button
            className="flex items-center space-x-2 text-white hover:text-sky-400 transition-colors"
            whileHover={{ x: -5 }}
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Home</span>
          </motion.button>
        </Link>
        <div className="text-center">
          <h1 className="text-3xl font-bold text-white">Designer Tile Collection</h1>
          <p className="text-white/70">Contemporary ceramic and porcelain tiles</p>
        </div>
        <div className="w-24"></div>
      </motion.div>

      {/* 3D Carousel */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2, duration: 0.8 }}
      >
        <TilesCarousel />
      </motion.div>

      {/* Subcategory Selection */}
      <motion.div
        className="px-6 py-12 max-w-7xl mx-auto"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.8 }}
      >
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white mb-4">Explore Tile Types</h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Select a tile type to view available sizes and browse our curated gallery.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Now, each subcategory card gets the correct sizes */}
          {tilesSubcategories.map((subcategory) => (
            <SubcategoryCard
              key={subcategory.id}
              mainCategory="tiles"
              subcategory={subcategory}
              availableSizes={subcategory.availableSizes}
            />
          ))}
        </div>
      </motion.div>
    </div>
  )
}
