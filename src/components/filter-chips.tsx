"use client"

import { motion } from "framer-motion"

interface Category {
  id: string
  name: string
}

interface FilterChipsProps {
  categories: Category[]
  selectedCategory: string | null
  onCategorySelect: (category: string | null) => void
}

export function FilterChips({
  categories,
  selectedCategory,
  onCategorySelect,
}: FilterChipsProps) {
  const handleCategoryClick = (categoryId: string) => {
    if (selectedCategory === categoryId) {
      onCategorySelect(null)
    } else {
      onCategorySelect(categoryId)
    }
  }

  return (
    <div className="flex flex-wrap items-center gap-3">
      {/* Clear Filter Button */}
      {selectedCategory && (
        <motion.button
          className="px-4 py-2 bg-red-500 text-white rounded-full text-sm hover:bg-red-600 transition-colors"
          onClick={() => onCategorySelect(null)}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          Clear Filter
        </motion.button>
      )}

      {/* Category Chips */}
      {categories.map((category) => (
        <motion.button
          key={category.id}
          className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
            selectedCategory === category.id
              ? "bg-gradient-to-r from-emerald-600 to-teal-700 text-white shadow-lg"
              : "bg-white/60 text-[#5C4421] hover:bg-white/80 backdrop-blur-sm"
          }`}
          onClick={() => handleCategoryClick(category.id)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          layout
        >
          {category.name}
        </motion.button>
      ))}
    </div>
  )
}