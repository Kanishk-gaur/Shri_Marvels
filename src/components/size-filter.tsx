"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SizeFilterProps {
  sizes: string[];
  selectedSizes: string[];
  onSizeChange: (size: string) => void;
  onClear: () => void;
}

export function SizeFilter({ sizes, selectedSizes, onSizeChange, onClear }: SizeFilterProps) {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <div className="flex items-center justify-between pb-4 border-b border-slate-200 mb-4">
        <h3 className="text-lg font-semibold text-slate-800">Filter by Size</h3>
        {selectedSizes.length > 0 && (
          <Button 
            variant="ghost" 
            size="sm"
            onClick={onClear}
            className="text-emerald-700 hover:bg-emerald-50 h-auto p-1"
          >
            Clear
          </Button>
        )}
      </div>
      <div className="space-y-2">
        {sizes.map((size) => (
          <motion.div
            key={size}
            onClick={() => onSizeChange(size)}
            className="flex items-center justify-between cursor-pointer group p-2 rounded-lg transition-colors hover:bg-slate-50"
          >
           <span className={`text-slate-600 group-hover:text-slate-900 ${selectedSizes.includes(size) ? 'font-semibold text-slate-900' : ''}`}>
  {size}&quot;
</span>
            <div
              className={`w-5 h-5 rounded-md border-2 transition-all duration-200 flex items-center justify-center ${
                selectedSizes.includes(size)
                  ? "bg-emerald-600 border-emerald-600"
                  : "border-slate-300 group-hover:border-emerald-500 bg-slate-100"
              }`}
            >
              <AnimatePresence>
                {selectedSizes.includes(size) && (
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Check className="w-4 h-4 text-white" />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}