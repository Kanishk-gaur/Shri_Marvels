"use client";

import { useState } from "react";
import { Check, ChevronsUpDown, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface SizeFilterProps {
  sizes: string[];
  selectedSizes: string[];
  onSizeChange: (size: string) => void;
  onClear: () => void;
}

export function SizeFilter({
  sizes,
  selectedSizes,
  onSizeChange,
  onClear,
}: SizeFilterProps) {
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between bg-white"
        >
          {selectedSizes.length > 0
            ? `${selectedSizes.length} selected`
            : "Select size..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0 bg-white">
        <div className="p-2 max-h-80 overflow-y-auto">
          {sizes.map((size) => (
            <motion.div
              key={size}
              onClick={() => onSizeChange(size)}
              className="flex items-center justify-between cursor-pointer group p-2 rounded-lg transition-colors hover:bg-slate-100"
              whileTap={{ scale: 0.98 }}
            >
              <span
                className={`text-slate-600 group-hover:text-slate-900 ${
                  selectedSizes.includes(size)
                    ? "font-semibold text-emerald-700"
                    : ""
                }`}
              >
                {`${size}"`}
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
        {selectedSizes.length > 0 && (
          <div className="border-t border-slate-200 p-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={onClear}
              className="w-full flex items-center justify-center space-x-1 text-red-600 hover:bg-red-50 hover:text-red-700"
            >
              <X className="w-4 h-4" />
              <span>Clear Selection</span>
            </Button>
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
}
