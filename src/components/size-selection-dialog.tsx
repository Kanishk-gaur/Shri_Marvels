// src/components/size-selection-dialog.tsx
"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SizeSelectionDialogProps {
  isOpen: boolean;
  onClose: () => void;
  subcategory: string;
  availableSizes: string[];
  onSelect: (size: string) => void; 
}

export function SizeSelectionDialog({
  isOpen,
  onClose,
  subcategory,
  availableSizes,
  onSelect,
}: SizeSelectionDialogProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[999] flex items-center justify-center bg-black/80 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="bg-zinc-900 border border-white/20 rounded-2xl p-6 w-full max-w-sm mx-4 relative shadow-2xl"
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            onClick={(e) => e.stopPropagation()}
          >
            <button onClick={onClose} className="absolute top-4 right-4 text-white/50 hover:text-white">
              <X className="w-5 h-5" />
            </button>
            <h2 className="text-xl font-bold text-white mb-6 pr-8">
              Select Size for {subcategory.replace(/-/g, " ")}
            </h2>
            <div className="grid grid-cols-2 gap-3">
              {availableSizes.map((size) => (
                <Button
                  key={size}
                  variant="outline"
                  className="bg-white/5 border-white/10 text-white hover:bg-cyan-500 hover:text-black transition-all"
                  onClick={() => {
                    onSelect(size);
                    onClose();
                  }}
                >
                  {size}
                </Button>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}