"use client"

// FIX: Added useState to the React import
import { useState } from "react"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { X, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
// Import the mapping to translate internal names to display names
import { subCategoryDisplayNames } from "@/data/utils"

interface SizeSelectionDialogProps {
  isOpen: boolean
  onClose: () => void
  subcategory: string // This is the internal name like "Border Tiles"
  availableSizes: string[]
  onConfirm: (sizes: string[]) => void
}

export function SizeSelectionDialog({
  isOpen,
  onClose,
  subcategory,
  availableSizes,
  onConfirm,
}: SizeSelectionDialogProps) {
  // FIX: Explicitly defined the state as a string array
  const [selected, setSelected] = useState<string[]>([]);

  /**
   * Toggles a size in or out of the selection array
   */
  const toggleSize = (size: string) => {
    // FIX: Added explicit string[] type to the 'prev' parameter
    setSelected((prev: string[]) => 
      // FIX: Added explicit string type to 's'
      prev.includes(size) ? prev.filter((s: string) => s !== size) : [...prev, size]
    );
  }

  const handleConfirm = () => {
    if (selected.length > 0) {
      onConfirm(selected);
      setSelected([]); // Reset local state
      onClose();
    }
  }

  // Get the display-friendly name from the mapping, or fallback to the original
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
            
            <div className="grid grid-cols-2 gap-3 mb-8">
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