"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { subCategoryDisplayNames } from "@/data/utils"

interface SizeSelectionDialogProps {
  isOpen: boolean
  onClose: () => void
  subcategory: string
  availableSizes: string[]
  onConfirm: (sizes: string[], sizeConfigs: Record<string, number>) => void
  mainCategory: "marvel" | "tiles"
  initialConfigs?: Record<string, number>
}

export function SizeSelectionDialog({
  isOpen,
  onClose,
  subcategory,
  availableSizes,
  onConfirm,
  initialConfigs,
}: SizeSelectionDialogProps) {
  const [sizeConfigs, setSizeConfigs] = useState<Record<string, number>>({});

  useEffect(() => {
    if (isOpen && initialConfigs) {
      setSizeConfigs(initialConfigs);
    } else if (isOpen) {
      setSizeConfigs({});
    }
  }, [isOpen, initialConfigs]);

  const toggleSize = (size: string) => {
    setSizeConfigs((prev) => {
      const next = { ...prev };
      if (next[size] !== undefined) {
        delete next[size];
      } else {
        next[size] = 1;
      }
      return next;
    });
  }

  const handleQuantityChange = (size: string, value: string) => {
    const qty = parseInt(value) || 0;
    setSizeConfigs(prev => ({ ...prev, [size]: qty }));
  }

  const handleConfirm = () => {
    const selectedSizes = Object.keys(sizeConfigs);
    if (selectedSizes.length > 0) {
      onConfirm(selectedSizes, sizeConfigs);
      onClose();
    }
  }

  const displayName = subCategoryDisplayNames[subcategory] || subcategory;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="bg-neutral-900 rounded-2xl p-8 w-full max-w-md mx-4 relative border border-white/10 shadow-2xl"
            initial={{ scale: 0.9, y: 50 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 50 }}
            onClick={(e) => e.stopPropagation()}
          >
            <button onClick={onClose} className="absolute top-4 right-4 text-white/70 hover:text-white">
              <X className="w-6 h-6" />
            </button>
            <h2 className="text-2xl font-bold text-white mb-2 text-center">
              {initialConfigs ? "Edit Selection" : "Select Sizes & Quantities"}
            </h2>
            <p className="text-white/60 text-sm text-center mb-6">{displayName}</p>
            
            <div className="space-y-4 mb-8 max-h-[50vh] overflow-y-auto pr-2 custom-scrollbar">
              {availableSizes.map((size) => {
                const isSelected = sizeConfigs[size] !== undefined;
                return (
                  <div key={size} className="space-y-2 p-3 rounded-xl border border-white/10 bg-white/5 transition-all">
                    <Button
                      onClick={() => toggleSize(size)}
                      className={`w-full flex justify-between items-center py-5 px-4 rounded-lg border transition-all duration-200 ${
                        isSelected 
                          ? 'bg-cyan-500 text-white border-cyan-400' 
                          : 'bg-white/5 text-white border-white/10 hover:bg-white/10'
                      }`}
                    >
                      <span className="font-medium">{size}</span>
                      {isSelected && <Check size={18} />}
                    </Button>

                    <AnimatePresence>
                      {isSelected && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="pt-2"
                        >
                          <div className="flex items-center gap-4 px-1">
                            <label className="text-xs text-white/50 whitespace-nowrap">BOXES:</label>
                            <Input
                              type="number"
                              min="1"
                              value={sizeConfigs[size]}
                              onChange={(e) => handleQuantityChange(size, e.target.value)}
                              className="bg-black/20 border-white/10 text-white h-9 focus:ring-cyan-500"
                            />
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>

            <Button 
              className="w-full bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-white font-bold py-3 rounded-lg"
              onClick={handleConfirm}
              disabled={Object.keys(sizeConfigs).length === 0}
            >
              Update Catalog
            </Button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}