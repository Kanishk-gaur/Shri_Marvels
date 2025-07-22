"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown } from "lucide-react"

interface Category {
  id: string
  name: string
  sizes: string[]
}

interface FilterChipsProps {
  categories: Category[]
  selectedCategory: string | null
  selectedSize: string | null
  onCategorySelect: (category: string | null) => void
  onSizeSelect: (size: string | null) => void
}

export function FilterChips({
  categories,
  selectedCategory,
  selectedSize,
  onCategorySelect,
  onSizeSelect,
}: FilterChipsProps) {
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null)

  const handleCategoryClick = (categoryId: string) => {
    if (selectedCategory === categoryId) {
      onCategorySelect(null)
      onSizeSelect(null)
      setExpandedCategory(null)
    } else {
      onCategorySelect(categoryId)
      onSizeSelect(null)
      setExpandedCategory(categoryId)
    }
  }

  const handleSizeClick = (size: string) => {
    if (selectedSize === size) {
      onSizeSelect(null)
    } else {
      onSizeSelect(size)
    }
  }

  return (
    <div className="space-y-4">
      {/* Clear All Button */}
      {(selectedCategory || selectedSize) && (
        <motion.button
          className="px-4 py-2 bg-red-500 text-white rounded-full text-sm hover:bg-red-600 transition-colors"
          onClick={() => {
            onCategorySelect(null)
            onSizeSelect(null)
            setExpandedCategory(null)
          }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
        >
          Clear All
        </motion.button>
      )}

      {/* Category Chips */}
      <div className="flex flex-wrap gap-3">
        {categories.map((category) => (
          <div key={category.id} className="relative">
            <motion.button
              className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 flex items-center space-x-2 ${
                selectedCategory === category.id
                  ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg"
                  : "bg-white/10 text-white hover:bg-white/20 backdrop-blur-sm"
              }`}
              onClick={() => handleCategoryClick(category.id)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              layout
            >
              <span>{category.name}</span>
              {selectedCategory === category.id && (
                <motion.div
                  initial={{ rotate: 0 }}
                  animate={{ rotate: expandedCategory === category.id ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ChevronDown className="w-4 h-4" />
                </motion.div>
              )}
            </motion.button>

            {/* Size Options */}
            <AnimatePresence>
              {selectedCategory === category.id && expandedCategory === category.id && (
                <motion.div
                  className="absolute top-full left-0 mt-2 bg-white/10 backdrop-blur-sm rounded-lg p-3 min-w-max z-10"
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="flex flex-wrap gap-2">
                    {category.sizes.map((size) => (
                      <motion.button
                        key={size}
                        className={`px-3 py-1 rounded-md text-xs font-medium transition-colors ${
                          selectedSize === size
                            ? "bg-gradient-to-r from-cyan-400 to-blue-500 text-white"
                            : "bg-white/20 text-white hover:bg-white/30"
                        }`}
                        onClick={() => handleSizeClick(size)}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        {size}
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </div>
  )
}
