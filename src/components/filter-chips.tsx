"use client"

import { motion } from "framer-motion"
import { X } from "lucide-react";

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
    <div className="flex items-center space-x-3 overflow-x-auto pb-2">
      {/* Category Chips */}
      {categories.map((category) => (
        <motion.button
          key={category.id}
          className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 border ${
            selectedCategory === category.id
              ? "bg-zinc-800 text-white border-zinc-800 shadow-md"
              : "bg-white text-zinc-700 border-zinc-200/90 hover:bg-zinc-100 hover:border-zinc-300"
          }`}
          onClick={() => handleCategoryClick(category.id)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          layout
        >
          {category.name}
        </motion.button>
      ))}

      {/* Clear Filter Button */}
      {selectedCategory && (
        <motion.button
          className="flex-shrink-0 flex items-center space-x-2 px-4 py-2 bg-red-500 text-white rounded-full text-sm hover:bg-red-600 transition-colors shadow-md"
          onClick={() => onCategorySelect(null)}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <X className="w-4 h-4" />
          <span>Clear Filter</span>
        </motion.button>
      )}
    </div>
  )
}