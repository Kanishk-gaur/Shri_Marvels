"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input" // Import the Input component
import { subCategoryDisplayNames } from "@/data/utils"

interface SizeSelectionDialogProps {
  isOpen: boolean
  onClose: () => void
  subcategory: string
  availableSizes: string[]
  onConfirm: (sizes: string[], quantity: number) => void // Updated signature
  mainCategory: "marvel" | "tiles"
}

export function SizeSelectionDialog({
  isOpen,
  onClose,
  subcategory,
  availableSizes,
  onConfirm,
  mainCategory,
}: SizeSelectionDialogProps) {
  const [selected, setSelected] = useState<string[]>([]);
  const [quantity, setQuantity] = useState<string>("1"); // State for quantity input

  const toggleSize = (size: string) => {
    setSelected((prev: string[]) => 
      prev.includes(size) ? prev.filter((s: string) => s !== size) : [...prev, size]
    );
  }

  const handleConfirm = () => {
    if (selected.length > 0) {
      onConfirm(selected, parseInt(quantity) || 1); // Pass selected sizes and quantity
      setSelected([]); 
      setQuantity("1");
      onClose();
    }
  }

  const displayName = subCategoryDisplayNames[subcategory] || subcategory;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="bg-white/10 backdrop-blur-md rounded-2xl p-8 w-full max-w-md mx-4 relative border border-white/20"
            initial={{ scale: 0.9, y: 50 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 50 }}
            onClick={(e) => e.stopPropagation()}
          >
            <button onClick={onClose} className="absolute top-4 right-4 text-white/70 hover:text-white">
              <X className="w-6 h-6" />
            </button>
            <h2 className="text-2xl font-bold text-white mb-6 text-center">
              Select Sizes for {displayName}
            </h2>
            
            <div className="grid grid-cols-2 gap-3 mb-6">
              {availableSizes.map((size) => {
                const isSelected = selected.includes(size);
                return (
                  <Button
                    key={size}
                    onClick={() => toggleSize(size)}
                    className={`relative py-4 px-2 rounded-xl border transition-all duration-200 ${
                      isSelected 
                        ? 'bg-cyan-500 text-white border-cyan-400' 
                        : 'bg-white/5 text-white border-white/10 hover:bg-white/10'
                    }`}
                  >
                    {isSelected && <Check size={14} className="absolute top-1 right-1" />}
                    {size}
                  </Button>
                );
              })}
            </div>

            {/* Quantity Input Field */}
            <div className="mb-8">
              <label className="block text-white/80 text-sm mb-2 ml-1">Number of Pieces</label>
              <Input
                type="number"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                className="bg-white/5 border-white/10 text-white h-12 rounded-xl focus:ring-cyan-500"
                placeholder="Enter quantity..."
              />
            </div>

            <Button 
              className="w-full bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-white font-bold py-3 rounded-lg disabled:opacity-50"
              onClick={handleConfirm}
              disabled={selected.length === 0}
            >
              Add {selected.length > 0 ? `(${selected.length})` : ""} to Catalog
            </Button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}