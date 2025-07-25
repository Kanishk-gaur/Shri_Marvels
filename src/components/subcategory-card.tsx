"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { useState } from "react"
import { SizeSelectionDialog } from "./size-selection-dialog"

interface SubcategoryCardProps {
  mainCategory: "marvel" | "tiles"
  subcategory: {
    id: string
    name: string
    count: number
    exampleImage: string
  }
  availableSizes: string[]
}

export function SubcategoryCard({ mainCategory, subcategory, availableSizes }: SubcategoryCardProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  return (
    <>
      <motion.div
        className="group cursor-pointer relative overflow-hidden rounded-2xl bg-white/10 backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all duration-300"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsDialogOpen(true)}
      >
        <div className="aspect-square relative overflow-hidden">
          <Image
            src={subcategory.exampleImage || "/placeholder.svg"}
            alt={subcategory.name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
            <h3 className="text-white font-semibold text-xl relative z-10">{subcategory.name}</h3>
          </div>
        </div>
        <div className="p-4 text-white/70 text-sm">{subcategory.count} items available</div>
      </motion.div>

      <SizeSelectionDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        mainCategory={mainCategory}
        subcategory={subcategory.id}
        availableSizes={availableSizes}
      />
    </>
  )
}
