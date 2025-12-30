"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { useState } from "react"
import { SizeSelectionDialog } from "./size-selection-dialog"
import { ArrowRight, ListPlus } from "lucide-react" 
import { useCatalog } from "@/context/CatalogContext"

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
  const { addItemToCatalog } = useCatalog()

  const handleConfirm = (selectedSizes: string[], sizeConfigs: Record<string, number>) => {
    // Calculate total quantity from configurations to maintain state consistency
    const totalQuantity = Object.values(sizeConfigs).reduce((sum, qty) => sum + qty, 0);

    addItemToCatalog({
      id: subcategory.id,
      name: subcategory.name,
      category: mainCategory,
      // Add the missing required subcategory property
      subcategory: subcategory.id, 
      imageUrl: subcategory.exampleImage || "/placeholder.svg",
      sizes: availableSizes,
      selectedSizes: selectedSizes,
      sizeConfigs: sizeConfigs, // Map of size to quantity
      quantity: totalQuantity   // Total number of items
    });
  };

  return (
    <>
      <motion.div
        className="group cursor-pointer relative overflow-hidden rounded-2xl shadow-md transition-shadow duration-300 hover:shadow-xl h-full"
        whileHover={{ y: -5 }}
        transition={{ type: "spring", stiffness: 300 }}
        onClick={() => setIsDialogOpen(true)}
      >
        {/* FIX: Added a persistent z-50 button indicator */}
        <div className="absolute top-4 right-4 z-50">
          <div className="w-10 h-10 rounded-full bg-black/60 backdrop-blur-md border border-white/40 flex items-center justify-center text-white shadow-2xl transition-colors hover:bg-black/80">
            <ListPlus className="w-5 h-5" />
          </div>
        </div>

        <div className="relative aspect-square w-full h-full">
          <Image
            src={subcategory.exampleImage || "/placeholder.svg"}
            alt={subcategory.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          {/* Ensure the gradient is below the button (z-10) */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-10" />
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-5 text-white z-20">
          <h3 className="text-lg font-semibold truncate" title={subcategory.name}>
            {subcategory.name}
          </h3>
          <p className="text-sm text-white/80 mt-1">{subcategory.count} items available</p>
          <div className="mt-4">
            <div className="inline-flex items-center font-semibold text-white group-hover:text-emerald-300 transition-colors text-sm">
              Select Size
              <ArrowRight className="w-4 h-4 ml-1.5 transition-transform duration-300 group-hover:translate-x-1" />
            </div>
          </div>
        </div>
      </motion.div>

      <SizeSelectionDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        mainCategory={mainCategory}
        subcategory={subcategory.id}
        availableSizes={availableSizes}
        onConfirm={handleConfirm}
      />
    </>
  )
}