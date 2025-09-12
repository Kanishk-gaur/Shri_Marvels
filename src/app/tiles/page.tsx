"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft } from "lucide-react"
import { TilesCarousel } from "@/components/tiles-carousel"
import { categories } from "@/data"

type SubCategoryInfo = {
  id: string
  name: string
  count?: number
  exampleImage: string
  sizes: string[]
  description?: string
}

export default function TilesPage() {
  const tilesSubcategories = categories.tiles.map((cat: SubCategoryInfo) => ({
    ...cat,
    availableSizes: cat.sizes,
  }))

  return (
    <div className="min-h-screen pt-20 bg-gradient-to-br from-[#fdf9f0] to-[#efe7dd] antialiased text-[#5C4421]">
      {/* Header */}
      <motion.div
        className="max-w-6xl mx-auto p-6 flex flex-col sm:flex-row items-center justify-between"
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Link href="/" passHref>
          <motion.a
            className="flex items-center space-x-2 text-[#5c4421] hover:text-[#7f6845] transition-colors font-semibold mb-3 sm:mb-0"
            whileHover={{ x: -6 }}
            aria-label="Back to Home"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Home</span>
          </motion.a>
        </Link>
        <div className="text-center sm:text-left">
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight drop-shadow-sm leading-tight">
            Designer Tile Collection
          </h1>
          <p className="text-[#84632e] text-lg mt-1 max-w-md">
            Contemporary ceramic and porcelain tiles crafted with care.
          </p>
        </div>
        <div className="w-24" />
      </motion.div>

      {/* 3D Carousel */}
      <motion.div
        className="max-w-6xl mx-auto px-6 mt-10"
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.25, duration: 0.7 }}
      >
        <TilesCarousel />
      </motion.div>

      {/* Subcategory Selection */}
      <motion.section
        className="max-w-6xl mx-auto px-6 py-16"
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.45, duration: 0.7 }}
      >
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl font-bold tracking-tight text-[#5c4421] mb-3">
            Explore Tile Types
          </h2>
          <p className="text-[#84632e] text-lg leading-relaxed">
            Discover our curated selection of high-quality tiles, each with its own unique character and style.
          </p>
        </div>

        <div className="space-y-20">
          {tilesSubcategories.map((subcategory, index) => (
            <motion.div
              key={subcategory.id}
              className="group grid grid-cols-1 md:grid-cols-2 gap-12 items-center bg-white rounded-3xl shadow-md hover:shadow-lg transition-shadow duration-300 p-8"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: index * 0.1 }}
            >
              <div
                className={`relative w-full md:h-[380px] rounded-2xl overflow-hidden shadow-lg ring-1 ring-[#f0e5c9] ${
                  index % 2 === 0 ? "md:order-last" : ""
                }`}
              >
                <Image
                  src={subcategory.exampleImage}
                  alt={subcategory.name}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-2xl transition-transform duration-500 ease-in-out group-hover:scale-105"
                  priority={index === 0}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/25 to-transparent rounded-2xl pointer-events-none"></div>
              </div>
              <div className="flex flex-col space-y-4 text-left">
                <h3 className="text-3xl font-semibold text-[#5c4421]">{subcategory.name}</h3>
                {subcategory.count !== undefined && (
                  <span className="inline-block rounded-full bg-[#f3edd9] px-4 py-1 text-[#7d6f3c] font-semibold text-sm select-none">
                    {subcategory.count} styles
                  </span>
                )}
                <p className="text-[#7c684d] leading-relaxed text-base">
                  {subcategory.description ||
                    `Explore our stunning collection of ${subcategory.name.toLowerCase()} tiles. Perfect for elegant and unique design.`}
                </p>
                <div className="flex flex-wrap gap-3">
                  {subcategory.availableSizes.map((size) => (
                    <span
                      key={size}
                      className="text-xs font-medium bg-[#ede7d8] text-[#5c4421] rounded-full px-3 py-1 select-none border border-[#ded5af]"
                    >
                      {size}
                    </span>
                  ))}
                </div>
                <Link
                  href={`/gallery?category=tiles&subcategory=${subcategory.id}`}
                  className="inline-block mt-4 px-8 py-3 rounded-full font-semibold bg-gradient-to-r from-[#5c4421] to-[#84632e] text-white hover:from-[#84632e] hover:to-[#5c4421] transition-all duration-300 shadow-lg focus:outline-none focus:ring-4 focus:ring-[#a69058]"
                  aria-label={`View collection of ${subcategory.name} tiles`}
                >
                  View Collection &rarr;
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>
    </div>
  )
}
