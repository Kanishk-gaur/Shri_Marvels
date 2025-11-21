"use client";

import * as React from "react";
import { useState, useMemo } from "react";
import { ChevronDown, LayoutGrid, ChevronRight, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { categories } from "@/data";
import { motion, AnimatePresence } from "framer-motion";

type SubcategoryWithMainCategory = {
  id: string;
  name: string;
  sizes: string[];
  mainCategory: "marvel" | "tiles";
};

interface ProductFilterProps {
  onFilterSelect: (
    mainCategory: "marvel" | "tiles",
    subcategory: string,
    size: string
  ) => void;
  selectedFilter: {
    subcategory: string;
    size: string;
  } | null;
  mainCategory: "all" | "marvel" | "tiles";
  buttonText?: string;
}

const ITEM_HEIGHT = 40;
const MAX_ITEMS_VISIBLE = 8;
const HEADER_HEIGHT = 50;
const PADDING_HEIGHT = 10;

// Define the priority order for sorting
const priorityOrder: Record<string, number> ={
  "High Gloss Glitter Emboss Poster": 1,
  "Wooden Emboss Poster": 2,
  "High Gloss Diamond Poster": 3,
  "High Gloss Kitchen Poster": 4,
  "GVT Poster": 5,
  "Digital Posters": 6,
  "Vitrosa Picture": 7,
  "Plain Picture": 8,
  "Imported Border": 9,
  "Golden & Silver Border": 10,
  "Digital Border": 11,
  "GVT Border": 12,
  "Golden & Silver Highlighter": 13,
  "GVT Rangoli": 14,
  "Golden Rangoli": 15,
  
  // --- Remaining items from the original priority list (16+) ---
  "Digital Gate Punch Picture Tiles": 17,
  "Digital Plain God Picture Tiles": 18,
  "Digital Plain Poster Tiles": 19,
  "Golden Silver Highlighter Tiles": 21,
  "Rangoli": 26,
  "Steel Welcome Accents": 27,
  "Step & Riser Tiles": 28,
  "Welcome Door Sills": 29
};

export function ProductFilter({
  onFilterSelect,
  selectedFilter,
  mainCategory,
  buttonText = "Select a Product",
}: ProductFilterProps) {
  const [open, setOpen] = useState(false);
  const [activeSubcategory, setActiveSubcategory] =
    useState<SubcategoryWithMainCategory | null>(null);

  const allSubcategories = useMemo(() => {
    const combined = [
      ...categories.marvel.map((sub) => ({
        ...sub,
        mainCategory: "marvel" as const,
      })),
      ...categories.tiles.map((sub) => ({
        ...sub,
        mainCategory: "tiles" as const,
      })),
    ];

    const filtered =
      mainCategory === "all"
        ? combined
        : combined.filter((sub) => sub.mainCategory === mainCategory);

    // Apply the custom priority sort instead of alphabetical
    return filtered.sort((a, b) => {
      const priorityA = priorityOrder[a.name] || 999;
      const priorityB = priorityOrder[b.name] || 999;

      if (priorityA !== priorityB) {
        return priorityA - priorityB;
      }
      return a.name.localeCompare(b.name);
    });
  }, [mainCategory]);

  const handleSizeSelect = (size: string) => {
    if (activeSubcategory) {
      // 'size' here is the new display name (e.g., "300 x 450 mm (Wall)")
      onFilterSelect(
        activeSubcategory.mainCategory,
        activeSubcategory.id,
        size
      );
      setOpen(false);
    }
  };

  const getSelectedFilterName = () => {
    if (selectedFilter) {
      const allSubs = [...categories.marvel, ...categories.tiles];
      const sub = allSubs.find((s) => s.id === selectedFilter.subcategory);
      // FIX: Removed the extraneous quote (") appended to selectedFilter.size
      if (sub) return `${sub.name} (${selectedFilter.size})`;
    }
    return buttonText;
  };

  React.useEffect(() => {
    if (!open) {
      setTimeout(() => setActiveSubcategory(null), 300);
    }
  }, [open]);

  const listHeight =
    Math.min(allSubcategories.length, MAX_ITEMS_VISIBLE) * ITEM_HEIGHT +
    PADDING_HEIGHT;
  const sizeListHeight = activeSubcategory
    ? Math.min(activeSubcategory.sizes.length, MAX_ITEMS_VISIBLE) *
        ITEM_HEIGHT +
      HEADER_HEIGHT
    : listHeight;

  const containerHeight = activeSubcategory ? sizeListHeight : listHeight;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className="w-full sm:w-[250px] justify-between bg-white text-slate-700 border-slate-300 hover:bg-slate-50"
        >
          <LayoutGrid className="mr-2 h-4 w-4 flex-shrink-0 text-slate-500" />
          <span className="truncate font-medium">
            {getSelectedFilterName()}
          </span>
          <ChevronDown className="ml-auto h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="w-[var(--radix-popover-trigger-width)] p-0 bg-white border-slate-200 shadow-xl rounded-lg"
        align="start"
      >
        <motion.div
          className="relative overflow-hidden"
          animate={{ height: containerHeight }}
          transition={{ type: "spring", stiffness: 400, damping: 40 }}
        >
          <motion.div
            className="absolute top-0 left-0 w-full h-full"
            animate={{ x: activeSubcategory ? "-100%" : "0%" }}
            transition={{ type: "spring", stiffness: 350, damping: 35 }}
          >
            <div className="p-1 h-full overflow-y-auto">
              {allSubcategories.map((sub) => (
                <button
                  key={sub.id}
                  onClick={() => setActiveSubcategory(sub)}
                  className={`w-full flex items-center justify-between px-3 py-2 text-sm rounded-md text-slate-700 hover:bg-slate-100 focus:outline-none transition-colors text-left relative ${
                    activeSubcategory?.id === sub.id ? "bg-slate-100" : ""
                  }`}
                >
                  <span className="truncate">{sub.name}</span>
                  <ChevronRight className="h-4 w-4 text-slate-400 ml-4 flex-shrink-0" />
                </button>
              ))}
            </div>
          </motion.div>
          <AnimatePresence>
            {activeSubcategory && (
              <motion.div
                className="absolute top-0 left-0 w-full h-full bg-white"
                initial={{ x: "100%" }}
                animate={{ x: "0%" }}
                exit={{ x: "100%" }}
                transition={{ type: "spring", stiffness: 350, damping: 35 }}
              >
                <div className="p-2 h-full flex flex-col">
                  <div className="flex items-center border-b border-slate-200 pb-2 mb-2 flex-shrink-0">
                    <button
                      onClick={() => setActiveSubcategory(null)}
                      className="p-2 rounded-full text-slate-500 hover:bg-slate-100"
                    >
                      <ArrowLeft className="h-4 w-4" />
                    </button>
                    <h5 className="ml-2 text-sm font-semibold text-slate-800 truncate">
                      {activeSubcategory.name}
                    </h5>
                  </div>
                  <div className="flex-grow overflow-y-auto">
                    <div className="p-1">
                      {activeSubcategory.sizes.length > 0 ? (
                        activeSubcategory.sizes.map((size) => (
                          <button
                            key={size}
                            onClick={() => handleSizeSelect(size)}
                            className="w-full text-left px-3 py-2 text-sm rounded-md text-slate-700 hover:bg-slate-100 cursor-pointer"
                          >
                            {size} {/* FIX: Removed &quot; and &quot; */}
                          </button>
                        ))
                      ) : (
                        <p className="px-3 py-2 text-sm text-slate-500">
                          No sizes available.
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </PopoverContent>
    </Popover>
  );
}