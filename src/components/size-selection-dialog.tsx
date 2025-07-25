"use client"

import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"

interface SizeSelectionDialogProps {
  isOpen: boolean
  onClose: () => void
  mainCategory: "marvel" | "tiles"
  subcategory: string
  availableSizes: string[]
}

export function SizeSelectionDialog({
  isOpen,
  onClose,
  mainCategory,
  subcategory,
  availableSizes,
}: SizeSelectionDialogProps) {
  const router = useRouter()

  const handleSizeSelect = (size: string) => {
    router.push(`/gallery?category=${mainCategory}&subcategory=${subcategory}&size=${size}`)
    onClose()
  }

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
            className="bg-white/10 backdrop-blur-md rounded-2xl p-8 w-full max-w-md mx-4 relative"
            initial={{ scale: 0.9, y: 50 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 50 }}
            transition={{ type: "spring", damping: 20, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
          >
            <button onClick={onClose} className="absolute top-4 right-4 text-white/70 hover:text-white">
              <X className="w-6 h-6" />
            </button>
            <h2 className="text-2xl font-bold text-white mb-6 text-center">
              Select Size for{" "}
              {subcategory
                .replace(/-/g, " ")
                .split(" ")
                .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                .join(" ")}
            </h2>
            <div className="grid grid-cols-3 gap-4">
              {availableSizes.map((size) => (
                <Button
                  key={size}
                  onClick={() => handleSizeSelect(size)}
                  className="bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-300"
                >
                  {size}&quot;
                </Button>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
