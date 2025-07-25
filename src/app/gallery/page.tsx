"use client"

import { useState, useMemo, useEffect } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowLeft, Filter, Grid, List } from "lucide-react"
import { FilterChips } from "@/components/filter-chips"
import { GalleryCard } from "@/components/gallery-card"
import { Pagination } from "@/components/pagination"
import { allProducts, categories, sizes } from "@/data/products"
import { Button } from "@/components/ui/button"
import { useSearchParams } from "next/navigation"

const ITEMS_PER_PAGE = 20

export default function GalleryPage() {
  const searchParams = useSearchParams()

  const initialMainCategory = (searchParams.get("category") as "all" | "marvel" | "tiles") || "all"
  const initialSubcategory = searchParams.get("subcategory") || null
  const initialSize = searchParams.get("size") || null

  const [selectedMainCategory, setSelectedMainCategory] = useState<"all" | "marvel" | "tiles">(initialMainCategory)
  const [selectedSubcategory, setSelectedSubcategory] = useState<string | null>(initialSubcategory)
  const [selectedSize, setSelectedSize] = useState<string | null>(initialSize)
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [sortBy, setSortBy] = useState<"name" | "rating">("name")
  const [currentPage, setCurrentPage] = useState(1)

  // Effect to update state when URL params change
  useEffect(() => {
    setSelectedMainCategory((searchParams.get("category") as "all" | "marvel" | "tiles") || "all")
    setSelectedSubcategory(searchParams.get("subcategory") || null)
    setSelectedSize(searchParams.get("size") || null)
    setCurrentPage(1)
  }, [searchParams])

  // Dynamically determine categories and sizes for FilterChips
  const filterChipCategories = useMemo(() => {
    let currentCategories: { id: string; name: string; sizes: string[] }[] = []
    let currentSizes: string[] = []

    if (selectedMainCategory === "marvel") {
      currentCategories = categories.marvel.map((cat) => ({ ...cat, sizes: sizes.marvel }))
      currentSizes = sizes.marvel
    } else if (selectedMainCategory === "tiles") {
      currentCategories = categories.tiles.map((cat) => ({ ...cat, sizes: sizes.tiles }))
      currentSizes = sizes.tiles
    } else {
      const combinedSubcategories = [
        ...categories.marvel.map((cat) => ({ ...cat, sizes: sizes.marvel })),
        ...categories.tiles.map((cat) => ({ ...cat, sizes: sizes.tiles })),
      ]
      const uniqueSubcategories = Array.from(new Set(combinedSubcategories.map((c) => c.id))).map(
        (id) => combinedSubcategories.find((c) => c.id === id)!,
      )
      currentCategories = uniqueSubcategories
      currentSizes = Array.from(new Set([...sizes.marvel, ...sizes.tiles]))
    }
    return { categories: currentCategories, sizes: currentSizes }
  }, [selectedMainCategory]) // CORRECTED: Removed 'categories' and 'sizes'

  const filteredProducts = useMemo(() => {
    let productsToFilter = allProducts

    if (selectedMainCategory === "marvel") {
      productsToFilter = allProducts.filter((p) => p.category === "marvel")
    } else if (selectedMainCategory === "tiles") {
      productsToFilter = allProducts.filter((p) => p.category === "tiles")
    }

    return productsToFilter
      .filter((product) => {
        if (!selectedSubcategory) return true
        return product.subcategory.toLowerCase().replace(" ", "-") === selectedSubcategory
      })
      .filter((product) => {
        if (!selectedSize) return true
        return product.size === selectedSize
      })
      .sort((a, b) => {
        switch (sortBy) {
          case "rating":
            return b.rating - a.rating
          default:
            return a.name.localeCompare(b.name)
        }
      })
  }, [selectedMainCategory, selectedSubcategory, selectedSize, sortBy]) // CORRECTED: Removed 'allProducts'

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const endIndex = startIndex + ITEMS_PER_PAGE
  const paginatedProducts = filteredProducts.slice(startIndex, endIndex)
  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE)

  const handleMainCategorySelect = (category: "all" | "marvel" | "tiles") => {
    setSelectedMainCategory(category)
    setSelectedSubcategory(null)
    setSelectedSize(null)
    setCurrentPage(1)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 pt-16">
      {/* Header */}
      <motion.div
        className="p-6 flex items-center justify-between"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <Link href="/">
          <motion.button
            className="flex items-center space-x-2 text-white hover:text-cyan-400 transition-colors"
            whileHover={{ x: -5 }}
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Home</span>
          </motion.button>
        </Link>
        <div className="text-center">
          <h1 className="text-3xl font-bold text-white">Our Full Gallery</h1>
          <p className="text-white/70">Explore all marvels and tiles</p>
        </div>
        <div className="w-24"></div>
      </motion.div>

      {/* Filter Section */}
      <motion.div
        className="px-6 py-8"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.8 }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between mb-6 space-y-4 lg:space-y-0">
            <div className="flex items-center space-x-2">
              <Filter className="w-5 h-5 text-white" />
              <h2 className="text-xl font-semibold text-white">Filter Gallery</h2>
              <span className="text-white/60">({filteredProducts.length} items)</span>
            </div>

            <div className="flex items-center space-x-4">
              {/* Main Category Filter */}
              <div className="flex items-center space-x-2 bg-white/10 rounded-lg p-1">
                <Button
                  onClick={() => handleMainCategorySelect("all")}
                  className={`px-4 py-2 rounded-md text-sm ${selectedMainCategory === "all" ? "bg-white/20 text-white" : "text-white/70 hover:bg-white/15"}`}
                >
                  All
                </Button>
                <Button
                  onClick={() => handleMainCategorySelect("marvel")}
                  className={`px-4 py-2 rounded-md text-sm ${selectedMainCategory === "marvel" ? "bg-white/20 text-white" : "text-white/70 hover:bg-white/15"}`}
                >
                  Marvel
                </Button>
                <Button
                  onClick={() => handleMainCategorySelect("tiles")}
                  className={`px-4 py-2 rounded-md text-sm ${selectedMainCategory === "tiles" ? "bg-white/20 text-white" : "text-white/70 hover:bg-white/15"}`}
                >
                  Tiles
                </Button>
              </div>

              {/* Sort Dropdown */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as "name" | "rating")} // CORRECTED: Replaced 'any'
                className="bg-white/10 border border-white/20 text-white rounded-lg px-3 py-2 text-sm"
              >
                <option value="name">Sort by Name</option>
                <option value="rating">Highest Rated</option>
              </select>

              {/* View Mode Toggle */}
              <div className="flex items-center space-x-2 bg-white/10 rounded-lg p-1">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 rounded ${viewMode === "grid" ? "bg-white/20" : ""}`}
                >
                  <Grid className="w-4 h-4 text-white" />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2 rounded ${viewMode === "list" ? "bg-white/20" : ""}`}
                >
                  <List className="w-4 h-4 text-white" />
                </button>
              </div>
            </div>
          </div>

          <FilterChips
            categories={filterChipCategories.categories}
            selectedCategory={selectedSubcategory}
            selectedSize={selectedSize}
            onCategorySelect={setSelectedSubcategory}
            onSizeSelect={setSelectedSize}
          />
        </div>
      </motion.div>

      {/* Products Grid */}
      <motion.div
        className="px-6 pb-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.8 }}
      >
        <div className="max-w-7xl mx-auto">
          {filteredProducts.length > 0 ? (
            <>
              <div className="mb-4 text-white/70">
                Displaying items {startIndex + 1} - {Math.min(endIndex, filteredProducts.length)} of{" "}
                {filteredProducts.length}
              </div>
              <div
                className={`grid gap-6 ${
                  viewMode === "grid"
                    ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                    : "grid-cols-1 lg:grid-cols-2"
                }`}
              >
                {paginatedProducts.map((product, index) => (
                  <GalleryCard key={product.id} product={product} index={index} />
                ))}
              </div>
              {totalPages > 1 && (
                <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
              )}
            </>
          ) : (
            <div className="text-center py-20">
              <div className="w-24 h-24 mx-auto mb-6 bg-white/10 rounded-full flex items-center justify-center">
                <Filter className="w-12 h-12 text-white/50" />
              </div>
              <h3 className="text-2xl font-semibold text-white mb-2">No items found</h3>
              <p className="text-white/70 mb-6">Try adjusting your filters to see more results</p>
              <button
                onClick={() => {
                  setSelectedMainCategory("all")
                  setSelectedSubcategory(null)
                  setSelectedSize(null)
                }}
                className="bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-semibold py-2 px-6 rounded-lg hover:from-cyan-600 hover:to-purple-600 transition-all duration-300"
              >
                Clear All Filters
              </button>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  )
}