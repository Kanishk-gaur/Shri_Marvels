"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import type { Product } from "@/data";
import { useState, useMemo } from "react";
import { subCategoryDisplayNames } from "@/data/utils";
import { Button } from "@/components/ui/button";
import { ListPlus, ListMinus } from "lucide-react";
import {
  useCatalog,
  productToCatalogItem,
  transformProductSizes,
} from "@/context/CatalogContext";
import { SizeSelectionDialog } from "./size-selection-dialog";

interface GalleryCardProps {
  product: Product;
  index?: number;
  priority?: boolean;
}
// Aspect ratio mapping for ALL sizes
const ASPECT_RATIO_MAP: Record<string, string> = {
  // 12x24 variations (2:1 ratio)
  "(POLISHED)12x24": "aspect-[2/1]",
  "12x24": "aspect-[2/1]",
  "(LUSTER)12x24": "aspect-[2/1]",
  "(SUGAR)12x24": "aspect-[2/1]",

  // 18x12 variations (3:2 ratio)
  "18x12/8x12": "aspect-[3/2]",
  "18x12 inch": "aspect-[3/2]",
  "300x200 mm (12x8 inch)": "aspect-[3/2]",

  // 12x18 variations (2:3 ratio)
  "12x18/12x8": "aspect-[2/3]",
  "12x18": "aspect-[2/3]",
  "12x18 mm": "aspect-[2/3]",
  "12x18 inches": "aspect-[2/3]",
  "12x18 in": "aspect-[2/3]",
  "200x300 mm (8x12 inch)": "aspect-[2/3]",

  // 400x600 (2:3 ratio)
  "400x600 mm (16x24 inch)": "aspect-[3/1.6]",

  // 300x600 variations (1:2 ratio)
  "(Sugar)300x600 mm (11.8x23.6 inch)": "aspect-[5/2.5]",
  "(GLUE)300x600 mm (11.8x23.6 inch)": "aspect-[5/2.5]",

  "300x600 mm (11.8x23.6 inch)": "aspect-[5/2.5]",
  "Polishing Series 300x600 mm (12x24 inch)": "aspect-[5/2.5]",

  // Very narrow strips (1:10 to 1:24 ratio)
  "300x63 mm (12x2.5 inch)": "aspect-[4/1]",
  "12x2.5": "aspect-[6/1]",
  "48x600 mm (1.89x23.6 inch)": "aspect-[9/1]",
  "45x600 mm (1.77x23.6 inch)": "aspect-[9/1]",
  "40x600 mm (1.57x23.6 inch)": "aspect-[12/1]",
  "25x600 mm (0.98x23.6 inch)": "aspect-[12/1]",
  "20x600 mm (0.79x23.6 inch)": "aspect-[15/1]",
  "20x600": "aspect-[15/1]",
  "10x600 mm (0.39x23.6 inch)": "aspect-[20/1]",
  "10x600": "aspect-[15/1]",
  "20x1200 mm (0.79x47.2 inch)": "aspect-[12/1]",
  "12x600 mm (0.47x23.6 inch)": "aspect-[15/1]",
  "12x1200 mm (0.47x47.2 inch)": "aspect-[15/1]",
  "10x450 mm (0.39x17.7 inch)": "aspect-[15/1]",
  "24x4": "aspect-[5/1]",
  "24x2.5": "aspect-[8/1]",
  "24x2": "aspect-[10/1]",
  "24x1": "aspect-[15/1]",
  "24x3": "aspect-[8/1]",
  "2 Soot": "aspect-[15/1]",

  // 900x600 (3:2 ratio)
  "900x600 mm": "aspect-[3/2]",
  "900x600 mm (36x24 inch)": "aspect-[3/2]",

  // Mixed sizes
  "12x8, 18x12, 24x18, 2x2, 3x2, 4x2": "aspect-[4.5/3]",
  "8x12, 12x18, 18x24, 2x2, 2x3, 2x4": "aspect-[2/3]",

  // 24x24 and 600x600 (1:1 square)
  "24x24 inch": "aspect-square",
  "600x600 mm": "aspect-square",
  "600x600 mm (23.6x23.6 inch)": "aspect-square",
  "600x600 mm (24x24 inch)": "aspect-square",
  "2x2": "aspect-square",
  "6x6": "aspect-square",
  "4x4": "aspect-square",
  "8x12 inches": "aspect-square",

  // 600x900 (2:3 ratio)
  "600x900 mm": "aspect-[2/3]",
  "600x900 mm (24x36 inch)": "aspect-[2/3]",

  // 1200x600 (2:1 ratio)
  "1200x600 mm": "aspect-[2/1]",
  "1200x600 mm (48x24 inch)": "aspect-[2/1]",

  // 1200x1800 (2:3 ratio)
  "1200x1800 mm (48x72 inch)": "aspect-[2/3]",

  // 1200x1200 (1:1 square)
  "1200x1200 mm (48x48 inch)": "aspect-square",

  // 4x2 (2:1 ratio)
  "4x2 in": "aspect-[2/1]",
  "4x2": "aspect-[2/1]",

  // 2x4 (1:2 ratio)
  "2x4 in": "aspect-[1/2]",
  "2x4": "aspect-[1/2]",

  // 12x8 (3:2 ratio)
  "12x8 in": "aspect-[3/2]",
  "12x8": "aspect-[3/2]",
  "8x12 in": "aspect-[2/3]",
  "8x12": "aspect-[2/3]",

  // 6x36 variations (1:6 ratio)
  "(God)6x36": "aspect-[6/1]",
  "6x36 in (c)": "aspect-[6/1]",
  "6x36 ,9x36,12x36": "aspect-[3.8/1]",
  "6x36(w)": "aspect-[5/1]",
  "6x36": "aspect-[4.1/1]",
  "6x36 in": "aspect-[6/1]",
  "6x36 inch": "aspect-[6/1]",

  // 9x36 (1:4 ratio)
  "9x36": "aspect-[1/4]",

  // 8x6 (4:3 ratio)
  "8x6": "aspect-[4/6]",

  // 900x300 (3:1 ratio)
  "900x300 mm": "aspect-[3/1]",

  // 1200x300 (4:1 ratio)
  "1200x300 mm": "aspect-[4/1]",

  // 1000x300 (10:3 ratio)
  "1000x300 mm": "aspect-[10/3]",

  // 6x48 (1:8 ratio)
  "6x48": "aspect-[8/1]",

  // 4x48 (1:12 ratio)
  "4x48": "aspect-[11/1]",

  // 600x1200 (1:2 ratio)
  "600x1200 mm": "aspect-[1/2]",
  "600x1200 mm (24x48 inch)": "aspect-[1/2]",

  // 4x6 (2:3 ratio)
  "4x6": "aspect-[3/2]",

  // 3x2/24x18/2x2 (mixed, default 4:3)
  "3x2/24x18/2x2": "aspect-[4/3]",

  // 3x2 (3:2 ratio)
  "3x2": "aspect-[3/2]",

  // 6x8 (3:4 ratio)
  "6x8": "aspect-[3/4]",

  // 8x4 (2:1 ratio)
  "8x4": "aspect-[2/1]",

  // 6x3 (2:1 ratio)
  "6x3": "aspect-[2/1]",

  // 2x3 (2:3 ratio)
  "2x3": "aspect-[2/3]",

  // Default fallback
  default: "aspect-[4/3]",
};

// Helper function to get aspect ratio class
function getAspectRatioClass(sizeString: string): string {
  return ASPECT_RATIO_MAP[sizeString] || ASPECT_RATIO_MAP.default;
} // Column span mapping based on tile size/type

const COLUMN_SPAN_MAP: Record<string, string> = {
  // Large format tiles - 2 per row on laptop
  "600x1200 mm (24x48 inch)": "col-span-12 md:col-span-8 lg:col-span-4",
  "1200x1800 mm (48x72 inch)": "col-span-12 md:col-span-12 lg:col-span-12",
  "900x600 mm (36x24 inch)": "col-span-24 md:col-span-12 lg:col-span-8",
  "900x600 mm": "col-span-24 md:col-span-12 lg:col-span-8",
  "1200x600 mm (48x24 inch)": "col-span-24 md:col-span-12 lg:col-span-8",
  "1200x600 mm": "col-span-24 md:col-span-12 lg:col-span-8",
  "600x900 mm (24x36 inch)": "col-span-12 md:col-span-6 lg:col-span-6",

  // Very narrow strips - Full width or 2 per row
  "300x63 mm (12x2.5 inch)": "col-span-24 md:col-span-12 lg:col-span-6",
  "48x600 mm (1.89x23.6 inch)": "col-span-24 md:col-span-12 lg:col-span-8",
  "45x600 mm (1.77x23.6 inch)": "col-span-24 md:col-span-12 lg:col-span-8",
  "40x600 mm (1.57x23.6 inch)": "col-span-24 md:col-span-12 lg:col-span-8",
  "25x600 mm (0.98x23.6 inch)": "col-span-24 md:col-span-12 lg:col-span-8",
  "20x600 mm (0.79x23.6 inch)": "col-span-24 md:col-span-12 lg:col-span-8",
  "10x600 mm (0.39x23.6 inch)": "col-span-24 md:col-span-12 lg:col-span-8",
  "20x1200 mm (0.79x47.2 inch)": "col-span-24 md:col-span-12 lg:col-span-8",
  "12x600 mm (0.47x23.6 inch)": "col-span-24 md:col-span-12 lg:col-span-8",
  "12x1200 mm (0.47x47.2 inch)": "col-span-24 md:col-span-12 lg:col-span-8",
  "10x450 mm (0.39x17.7 inch)": "col-span-24 md:col-span-12 lg:col-span-8",

  // Medium tiles - 3 per row on laptop (4:3, 3:2, 2:3 ratios)
  // 12x18 group
  "8x12, 12x18, 18x24, 2x2, 2x3, 2x4":
    "col-span-12 md:col-span-8 lg:col-span-6",
  "12x18/12x8": "col-span-6 md:col-span-6 lg:col-span-3",
  "12x18": "col-span-12 md:col-span-8 lg:col-span-4",
  "12x18 mm": "col-span-6 md:col-span-6 lg:col-span-3",
  "12x18 inches": "col-span-8 md:col-span-6 lg:col-span-3",
  "12x18 in": "col-span-6 md:col-span-6 lg:col-span-3",
  "200x300 mm (8x12 inch)": "col-span-8 md:col-span-6 lg:col-span-4",
  "400x600 mm (16x24 inch)": "col-span-12 md:col-span-12 lg:col-span-8",
  "600x900 mm": "col-span-12 md:col-span-6 lg:col-span-4",

  // 12x24 group
  "12x8, 18x12, 24x18, 2x2, 3x2, 4x2":
    "col-span-24 md:col-span-12 lg:col-span-8",
  "(POLISHED)12x24": "col-span-8 md:col-span-8 lg:col-span-4",
  "12x24": "col-span-12 md:col-span-8 lg:col-span-4",
  "(LUSTER)12x24": "col-span-12 md:col-span-8 lg:col-span-4",
  "(SUGAR)12x24": "col-span-12 md:col-span-8 lg:col-span-4",
  "300x600 mm (11.8x23.6 inch)": "col-span-12 md:col-span-8 lg:col-span-6",
  "Polishing Series 300x600 mm (12x24 inch)":
    "col-span-12 md:col-span-12 lg:col-span-6",
  "(Sugar)300x600 mm (11.8x23.6 inch)":
    "col-span-12 md:col-span-8 lg:col-span-6",
  "(GLUE)300x600 mm (11.8x23.6 inch)":
    "col-span-12 md:col-span-8 lg:col-span-6",

  // 18x12 group
  "18x12/8x12": "col-span-8 md:col-span-8 lg:col-span-4",
  "18x12": "col-span-8 md:col-span-8 lg:col-span-4",
  "18x12 inch": "col-span-12 md:col-span-8 lg:col-span-4",
  "300x200 mm (12x8 inch)": "col-span-12 md:col-span-8 lg:col-span-6",

  // Square tiles group - 4 per row on laptop
  "24x24 inch": "col-span-12 md:col-span-8 lg:col-span-6",
  "600x600 mm": "col-span-12 md:col-span-8 lg:col-span-6",
  "600x600 mm (23.6x23.6 inch)": "col-span-12 md:col-span-8 lg:col-span-6",
  "600x600 mm (24x24 inch)": "col-span-12 md:col-span-8 lg:col-span-6",
  "2x2": "col-span-8 md:col-span-8 lg:col-span-4",
  "6x6": "col-span-12 md:col-span-8 lg:col-span-3",
  "4x4": "col-span-12 md:col-span-8 lg:col-span-6",
  "1200x1200 mm (48x48 inch)": "col-span-12 md:col-span-12 lg:col-span-6",

  // 6x36 narrow tiles - 2 per row on laptop
  "(God)6x36": "col-span-12 md:col-span-8 lg:col-span-8",
  "6x36 in (c)": "col-span-24 md:col-span-12 lg:col-span-12",
  "6x36 ,9x36,12x36": "col-span-24 md:col-span-12 lg:col-span-12",
  "6x36(w)": "col-span-24 md:col-span-12 lg:col-span-12",
  "6x36": "col-span-24 md:col-span-12 lg:col-span-12",
  "6x36 in": "col-span-24 md:col-span-12 lg:col-span-8",
  "6x36 inch": "col-span-12 md:col-span-12 lg:col-span-6",

  // Other specific groupings
  "8x12 in": "col-span-6 md:col-span-6 lg:col-span-3",
  "8x12": "col-span-6 md:col-span-6 lg:col-span-3",
  "8x12 inches": "col-span-12 md:col-span-8 lg:col-span-6",
  "12x8 in": "col-span-8 md:col-span-8 lg:col-span-4",
  "12x8": "col-span-12 md:col-span-8 lg:col-span-4",

  // Additional sizes from GRID_CLASSES
  "300x450 mm (11.8x17.7 inch)": "col-span-12 md:col-span-8 lg:col-span-6",
  "900x300 mm": "col-span-12 md:col-span-8 lg:col-span-4",
  "1200x300 mm": "col-span-12 md:col-span-8 lg:col-span-6",
  "1000x300 mm": "col-span-12 md:col-span-8 lg:col-span-6",
  "6x48": "col-span-24 md:col-span-12 lg:col-span-12",
  "4x48": "col-span-24 md:col-span-12 lg:col-span-12",
  "4x2": "col-span-6 md:col-span-6 lg:col-span-4",
  "600x1200 mm": "col-span-12 md:col-span-8 lg:col-span-4",
  "2x4": "col-span-12 md:col-span-8 lg:col-span-4",
  "4x6": "col-span-12 md:col-span-8 lg:col-span-6",
  "24x4": "col-span-24 md:col-span-12 lg:col-span-6",
  "24x2.5": "col-span-24 md:col-span-12 lg:col-span-6",
  "24x2": "col-span-24 md:col-span-12 lg:col-span-6",
  "12x2.5": "col-span-12 md:col-span-8 lg:col-span-6",
  "24x1": "col-span-24 md:col-span-12 lg:col-span-6",
  "2x3": "col-span-12 md:col-span-6 lg:col-span-4",
  "6x3": "col-span-12 md:col-span-8 lg:col-span-3",
  "8x4": "col-span-12 md:col-span-8 lg:col-span-2",
  "3x2/24x18/2x2": "col-span-8 md:col-span-8 lg:col-span-6",
  "3x2": "col-span-12 md:col-span-8 lg:col-span-6",
  "6x8": "col-span-12 md:col-span-6 lg:col-span-3",
  "24x3": "col-span-24 md:col-span-12 lg:col-span-6",
  "2 Soot": "col-span-24 md:col-span-12 lg:col-span-6",
  "8x6": "col-span-8 md:col-span-8 lg:col-span-4",
  "20x600": "col-span-24 md:col-span-12 lg:col-span-8",
  "10x600": "col-span-24 md:col-span-12 lg:col-span-8",
  "9x36": "col-span-12 md:col-span-8 lg:col-span-8",

  // Default for everything else
  default: "col-span-12 md:col-span-4 lg:col-span-3",
};

// Helper function to get column span class
function getColumnSpanClass(sizeString: string): string {
  return COLUMN_SPAN_MAP[sizeString] || COLUMN_SPAN_MAP.default;
}

export default function GalleryCard({
  product,
  index = 0,
  priority = false,
}: GalleryCardProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const { isItemInCatalog, addItemToCatalog, removeItemFromCatalog } =
    useCatalog();

  const isInCatalog = isItemInCatalog(String(product.id));
  const displaySizes = transformProductSizes(product.sizes || []);
  const sizeString = product.sizes[0] || "1x1";

  // Get aspect ratio class
  const aspectRatioClass = getAspectRatioClass(sizeString);
  // Get column span class
  const columnSpanClass = getColumnSpanClass(sizeString);

  const handleConfirmSizes = (
    selectedSizes: string[],
    sizeConfigs: Record<string, number>
  ) => {
    const item = productToCatalogItem(product);
    item.selectedSizes = selectedSizes;
    item.sizeConfigs = sizeConfigs;
    item.quantity = Object.values(sizeConfigs).reduce(
      (sum, qty) => sum + qty,
      0
    );

    addItemToCatalog(item);
    setIsDialogOpen(false);
  };

  const handleCatalogToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    if (isInCatalog) {
      removeItemFromCatalog(String(product.id));
    } else {
      setIsDialogOpen(true);
    }
  };

  const altText = `${product.name} ${
    subCategoryDisplayNames[product.subcategory] || product.subcategory
  } Tile in size ${sizeString} made of ${product.material}`;

  return (
    <>
      <motion.div
        className={`group ${columnSpanClass}`}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.05, duration: 0.6 }}
        layout
      >
        <div className="flex flex-col h-full bg-white overflow-hidden border border-zinc-200/80 transition-shadow duration-300 hover:shadow-lg">
          {/* Image Container with fixed aspect ratio */}
          <div
            className={`relative w-full ${aspectRatioClass} overflow-hidden`}
          >
            {!isLoaded && product.image && (
              <div className="absolute inset-0 bg-zinc-200 animate-pulse" />
            )}

            {product.image ? (
              <div className="relative w-full h-full">
                <Image
                  src={product.image}
                  alt={altText}
                  fill
                  priority={priority}
                  onLoad={() => setIsLoaded(true)}
                  className={`object-contain transition-all duration-300 group-hover:scale-105 ${
                    isLoaded ? "opacity-100" : "opacity-0"
                  }`}
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                />
              </div>
            ) : (
              <div className="absolute inset-0 bg-gray-300" />
            )}
          </div>

          {/* Product Name Bar - Fixed height, below image */}
          <div className="flex items-center justify-between p-2 bg-transparent gap-2 min-h-[2.5rem] flex-shrink-0">
            <h3
              className="text-zinc-900 font-semibold text-[10px] md:text-[12px] truncate flex-grow"
              title={product.name}
            >
              {product.name}
            </h3>

            {/* Add to Catalog Button */}
            <Button
              variant="default"
              size="icon"
              onClick={handleCatalogToggle}
              className={`w-[18px] h-[18px] md:w-6 md:h-6 rounded-full text-white border-none transition-colors flex-shrink-0 ${
                isInCatalog
                  ? "bg-red-500 hover:bg-red-600"
                  : "bg-zinc-800/70 hover:bg-zinc-900"
              }`}
            >
              {isInCatalog ? (
                <ListMinus className="w-3 h-3 md:w-3.5 md:h-3.5" />
              ) : (
                <ListPlus className="w-3 h-3 md:w-3.5 md:h-3.5" />
              )}
            </Button>
          </div>
        </div>
      </motion.div>

      <SizeSelectionDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        subcategory={product.subcategory}
        availableSizes={displaySizes}
        onConfirm={handleConfirmSizes}
        mainCategory={product.category as "marvel" | "tiles"}
      />
    </>
  );
}
