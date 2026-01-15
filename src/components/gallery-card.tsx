"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import type { Product } from "@/data";
import { useState, useMemo } from "react";
import { subCategoryDisplayNames } from "@/data/utils";
import { Button } from "@/components/ui/button";
import { ListPlus, ListMinus } from "lucide-react";
import { useCatalog, productToCatalogItem, transformProductSizes } from "@/context/CatalogContext";
import { SizeSelectionDialog } from "./size-selection-dialog";

interface GalleryCardProps {
  product: Product;
  index?: number;
  priority?: boolean;
}

// Simplified grid class mapping
const GRID_CLASSES: Record<string, string> = {
  "(POLISHED)12x24": "col-span-8 row-span-8 md:col-span-8 md:row-span-12 lg:col-span-4 lg:row-span-11",
  "18x12/8x12": "col-span-8 row-span-8 md:col-span-8 md:row-span-12 lg:col-span-4 lg:row-span-14",
  "12x18/12x8": "col-span-6 row-span-11 md:col-span-6 md:row-span-13 lg:col-span-3 lg:row-span-20",
  "400x600 mm (16x24 inch)": "col-span-12 row-span-9 md:col-span-8 md:row-span-6 lg:col-span-8 lg:row-span-18",
  "(LUSTER)12x24": "col-span-12 row-span-9 md:col-span-8 md:row-span-6 lg:col-span-4 lg:row-span-11",
  "(SUGAR)12x24": "col-span-12 row-span-9 md:col-span-8 md:row-span-6 lg:col-span-4 lg:row-span-11",
  "(Sugar)300x600 mm (11.8x23.6 inch)": "col-span-12 row-span-8 md:col-span-12 md:row-span-12 lg:col-span-6 lg:row-span-14",
  "(GLUE)300x600 mm (11.8x23.6 inch)": "col-span-12 row-span-8 md:col-span-12 md:row-span-12 lg:col-span-6 lg:row-span-14",
  "300x63 mm (12x2.5 inch)": "col-span-24 row-span-8 md:col-span-12 md:row-span-12 lg:col-span-6 lg:row-span-8",
  "Polishing Series 300x600 mm (12x24 inch)": "col-span-12 row-span-8 md:col-span-12 md:row-span-12 lg:col-span-6 lg:row-span-14",
  "600x1200 mm (24x48 inch)": "col-span-12 row-span-25 md:col-span-12 md:row-span-12 lg:col-span-4 lg:row-span-32",
  "300x600 mm (11.8x23.6 inch)": "col-span-12 row-span-8 md:col-span-12 md:row-span-12 lg:col-span-6 lg:row-span-14",
  "300x450 mm (11.8x17.7 inch)": "col-span-12 row-span-10 md:col-span-12 md:row-span-12 lg:col-span-6 lg:row-span-16",
  "48x600 mm (1.89x23.6 inch)": "col-span-24 row-span-5 md:col-span-12 md:row-span-12 lg:col-span-8 lg:row-span-7",
  "45x600 mm (1.77x23.6 inch)": "col-span-24 row-span-5 md:col-span-12 md:row-span-12 lg:col-span-8 lg:row-span-7",
  "40x600 mm (1.57x23.6 inch)": "col-span-24 row-span-5 md:col-span-12 md:row-span-12 lg:col-span-8 lg:row-span-7",
  "25x600 mm (0.98x23.6 inch)": "col-span-24 row-span-5 md:col-span-12 md:row-span-12 lg:col-span-8 lg:row-span-7",
  "20x600 mm (0.79x23.6 inch)": "col-span-24 row-span-5 md:col-span-12 md:row-span-12 lg:col-span-8 lg:row-span-6",
  "10x600 mm (0.39x23.6 inch)": "col-span-24 row-span-4 md:col-span-12 md:row-span-12 lg:col-span-8 lg:row-span-5",
  "900x600 mm": "col-span-24 row-span-18 md:col-span-12 md:row-span-12 lg:col-span-8 lg:row-span-23",
  "12x8, 18x12, 24x18, 2x2, 3x2, 4x2": "col-span-24 row-span-18 md:col-span-12 md:row-span-12 lg:col-span-8 lg:row-span-23",
  "900x600 mm (36x24 inch)": "col-span-24 row-span-18 md:col-span-12 md:row-span-12 lg:col-span-8 lg:row-span-23",
  "24x24 inch": "col-span-12 row-span-14 md:col-span-12 md:row-span-12 lg:col-span-6 lg:row-span-25",
  "600x600 mm": "col-span-12 row-span-14 md:col-span-12 md:row-span-12 lg:col-span-6 lg:row-span-25",
  "600x600 mm (23.6x23.6 inch)": "col-span-12 row-span-14 md:col-span-12 md:row-span-12 lg:col-span-6 lg:row-span-25",
  "600x900 mm": "col-span-12 row-span-20 md:col-span-12 md:row-span-12 lg:col-span-4 lg:row-span-25",
  "8x12, 12x18, 18x24, 2x2, 2x3, 2x4": "col-span-12 row-span-20 md:col-span-12 md:row-span-12 lg:col-span-6 lg:row-span-37",
  "600x900 mm (24x36 inch)": "col-span-12 row-span-19 md:col-span-12 md:row-span-12 lg:col-span-6 lg:row-span-36",
  "1200x600 mm": "col-span-12 row-span-8 md:col-span-12 md:row-span-12 lg:col-span-8 lg:row-span-18",
  "1200x600 mm (48x24 inch)": "col-span-24 row-span-15 md:col-span-12 md:row-span-12 lg:col-span-8 lg:row-span-18",
  "20x1200 mm (0.79x47.2 inch)": "col-span-24 row-span-5 md:col-span-12 md:row-span-12 lg:col-span-8 lg:row-span-7",
  "12x600 mm (0.47x23.6 inch)": "col-span-24 row-span-4 md:col-span-12 md:row-span-12 lg:col-span-8 lg:row-span-5",
  "12x1200 mm (0.47x47.2 inch)": "col-span-24 row-span-5 md:col-span-12 md:row-span-12 lg:col-span-8 lg:row-span-5",
  "10x450 mm (0.39x17.7 inch)": "col-span-24 row-span-5 md:col-span-12 md:row-span-12 lg:col-span-8 lg:row-span-6",
  "1200x1800 mm (48x72 inch)": "col-span-12 row-span-11 md:col-span-12 md:row-span-12 lg:col-span-12 lg:row-span-34",
  "600x600 mm (24x24 inch)": "col-span-12 row-span-14 md:col-span-12 md:row-span-12 lg:col-span-6 lg:row-span-25",
  "1200x1200 mm (48x48 inch)": "col-span-12 row-span-14 md:col-span-12 md:row-span-12 lg:col-span-6 lg:row-span-25",
  "4x2 in": "col-span-24 row-span-14 md:col-span-12 md:row-span-12 lg:col-span-6 lg:row-span-15",
  "2x4 in": "col-span-12 row-span-8 md:col-span-12 md:row-span-10 lg:col-span-6 lg:row-span-15",
  "12x8 in": "col-span-8 row-span-8 md:col-span-8 md:row-span-12 lg:col-span-4 lg:row-span-12",
  "(God)6x36": "col-span-12 row-span-8 md:col-span-8 md:row-span-10 lg:col-span-8 lg:row-span-12",
  "6x36 in (c)": "col-span-24 row-span-8 md:col-span-8 md:row-span-10 lg:col-span-12 lg:row-span-10",
  "6x36 ,9x36,12x36": "col-span-24 row-span-8 md:col-span-8 md:row-span-10 lg:col-span-12 lg:row-span-15",
  "6x36(w)": "col-span-24 row-span-8 md:col-span-8 md:row-span-10 lg:col-span-12 lg:row-span-11",
  "9x36": "col-span-12 row-span-8 md:col-span-8 md:row-span-10 lg:col-span-8 lg:row-span-10",
  "6x36": "col-span-24 row-span-8 md:col-span-8 md:row-span-10 lg:col-span-12 lg:row-span-14",
  "6x36 in": "col-span-24 row-span-6 md:col-span-12 md:row-span-6 lg:col-span-8 lg:row-span-7",
  "6x36 inch": "col-span-12 row-span-6 md:col-span-12 md:row-span-6 lg:col-span-6 lg:row-span-6",
  "18x12 inch": "col-span-12 row-span-10 md:col-span-8 md:row-span-12 lg:col-span-4 lg:row-span-12",
  "12x18 mm": "col-span-6 row-span-11 md:col-span-6 md:row-span-16 lg:col-span-3 lg:row-span-20",
  "12x18 inches": "col-span-8 row-span-14 md:col-span-6 md:row-span-15 lg:col-span-3 lg:row-span-20",
  "12x18 in": "col-span-6 row-span-11 md:col-span-6 md:row-span-13 lg:col-span-3 lg:row-span-20",
  "8x12 in": "col-span-6 row-span-10 md:col-span-6 md:row-span-16 lg:col-span-3 lg:row-span-19",
  "12x18": "col-span-12 row-span-10 md:col-span-8 md:row-span-9 lg:col-span-4 lg:row-span-13",
  "8x6": "col-span-8 row-span-14 md:col-span-12 md:row-span-16 lg:col-span-4 lg:row-span-25",
  "20x600": "col-span-24 row-span-5 md:col-span-12 md:row-span-5 lg:col-span-8 lg:row-span-6",
  "10x600": "col-span-24 row-span-6 md:col-span-12 md:row-span-5 lg:col-span-8 lg:row-span-5",
  "900x300 mm": "col-span-12 row-span-9 md:col-span-8 md:row-span-9 lg:col-span-4 lg:row-span-12",
  "1200x300 mm": "col-span-12 row-span-10 md:col-span-8 md:row-span-9 lg:col-span-6 lg:row-span-12",
  "1000x300 mm": "col-span-12 row-span-9 md:col-span-8 md:row-span-8 lg:col-span-6 lg:row-span-17",
  "6x48": "col-span-24 row-span-6 md:col-span-12 md:row-span-6 lg:col-span-12 lg:row-span-8",
  "4x48": "col-span-24 row-span-6 md:col-span-12 md:row-span-5 lg:col-span-12 lg:row-span-7",
  "4x2": "col-span-6 row-span-13 md:col-span-6 md:row-span-20 lg:col-span-4 lg:row-span-33",
  "600x1200 mm": "col-span-12 row-span-25 md:col-span-8 md:row-span-28 lg:col-span-4 lg:row-span-33",
  "2x4": "col-span-12 row-span-25 md:col-span-8 md:row-span-28 lg:col-span-4 lg:row-span-33",
  "4x6": "col-span-12 row-span-10 md:col-span-8 md:row-span-12 lg:col-span-6 lg:row-span-17",
  "4x4": "col-span-12 row-span-15 md:col-span-8 md:row-span-16 lg:col-span-6 lg:row-span-26",
  "12x24": "col-span-12 row-span-9 md:col-span-8 md:row-span-6 lg:col-span-4 lg:row-span-11",
  "24x4": "col-span-24 row-span-7 md:col-span-12 md:row-span-6 lg:col-span-6 lg:row-span-7",
  "24x2.5": "col-span-24 row-span-6 md:col-span-12 md:row-span-6 lg:col-span-6 lg:row-span-6",
  "24x2": "col-span-24 row-span-6 md:col-span-12 md:row-span-5 lg:col-span-6 lg:row-span-6",
  "12x2.5": "col-span-12 row-span-6 md:col-span-8 md:row-span-6 lg:col-span-6 lg:row-span-8",
  "24x1": "col-span-24 row-span-4 md:col-span-12 md:row-span-5 lg:col-span-6 lg:row-span-5",
  "6x6": "col-span-12 row-span-10 md:col-span-8 md:row-span-10 lg:col-span-3 lg:row-span-12",
  "8x12 inches": "col-span-12 row-span-14 md:col-span-8 md:row-span-11 lg:col-span-6 lg:row-span-24",
  "8x12": "col-span-6 row-span-11 md:col-span-6 md:row-span-16 lg:col-span-3 lg:row-span-20",
  "12x8": "col-span-12 row-span-11 md:col-span-8 md:row-span-12 lg:col-span-4 lg:row-span-13",
  "18x12": "col-span-8 row-span-8 md:col-span-8 md:row-span-12 lg:col-span-4 lg:row-span-14",
  "2x2": "col-span-8 row-span-11 md:col-span-6 md:row-span-12 lg:col-span-4 lg:row-span-18",
  "200x300 mm (8x12 inch)": "col-span-8 row-span-14 md:col-span-6 md:row-span-16 lg:col-span-4 lg:row-span-25",
  "2x3": "col-span-12 row-span-20 md:col-span-6 md:row-span-16 lg:col-span-4 lg:row-span-25",
  "6x3": "col-span-12 row-span-10 md:col-span-8 md:row-span-10 lg:col-span-3 lg:row-span-12",
  "8x4": "col-span-12 row-span-10 md:col-span-8 md:row-span-10 lg:col-span-2 lg:row-span-12",
  "3x2/24x18/2x2": "col-span-8 row-span-8 md:col-span-8 md:row-span-12 lg:col-span-6 lg:row-span-18",
  "300x200 mm (12x8 inch)": "col-span-12 row-span-10 md:col-span-8 md:row-span-12 lg:col-span-6 lg:row-span-17",
  "3x2": "col-span-12 row-span-10 md:col-span-8 md:row-span-12 lg:col-span-6 lg:row-span-17",
  "6x8": "col-span-12 row-span-10 md:col-span-6 md:row-span-12 lg:col-span-3 lg:row-span-16",
  "24x3": "col-span-24 row-span-6 md:col-span-12 md:row-span-4 lg:col-span-6 lg:row-span-6",
};

function getOriginalGridClass(sizeString: string): string {
  return GRID_CLASSES[sizeString] || "col-span-12 row-span-9 md:col-span-4 md:row-span-11 lg:col-span-3 lg:row-span-16";
}

export default function GalleryCard({ product, index = 0, priority = false }: GalleryCardProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  const { isItemInCatalog, addItemToCatalog, removeItemFromCatalog } = useCatalog();
  
  const isInCatalog = isItemInCatalog(String(product.id));
  const displaySizes = transformProductSizes(product.sizes || []);
  const sizeString = product.sizes[0] || "1x1";
  
  // Get original grid class
  const gridClass = useMemo(() => getOriginalGridClass(sizeString), [sizeString]);

  const handleConfirmSizes = (selectedSizes: string[], sizeConfigs: Record<string, number>) => {
    const item = productToCatalogItem(product);
    item.selectedSizes = selectedSizes;
    item.sizeConfigs = sizeConfigs;
    item.quantity = Object.values(sizeConfigs).reduce((sum, qty) => sum + qty, 0);

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

  const isImportedBorder = product.subcategory === "Border Tiles" || 
                          product.subcategory === "Golden & Silver Border Tiles" || 
                          product.subcategory === "Digital Border Tiles" || 
                          product.subcategory === "GVT Wall & Floor Border Tiles";
  const altText = `${product.name} ${subCategoryDisplayNames[product.subcategory] || product.subcategory} Tile in size ${sizeString} made of ${product.material}`;

  return (
    <>
      <motion.div
        className={`group ${gridClass}`}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.05, duration: 0.6 }}
        layout
      >
        <div className="flex flex-col h-full bg-white overflow-hidden border border-zinc-200/80 transition-shadow duration-300 hover:shadow-lg">
          {/* Image Container */}
          <div className="relative w-full flex-grow overflow-hidden">
            
            {/* Top-right Symbol Button: Hidden for Imported Borders, visible for others */}
            {!isImportedBorder && (
              <div className="absolute top-0 right-0 z-10 p-0.5 sm:p-2">
                <Button
                  variant="default"
                  size="icon"
                  onClick={handleCatalogToggle}
                  className={`w-[18px] h-[18px] sm:w-8 sm:h-8 rounded-full text-white backdrop-blur-sm border-none transition-colors shadow-sm ${
                    isInCatalog 
                      ? "bg-red-500 hover:bg-red-600" 
                      : "bg-zinc-800/70 hover:bg-zinc-900"
                  }`}
                >
                  {isInCatalog ? (
                    <ListMinus className="w-3 h-3 sm:w-4 sm:h-4" /> 
                  ) : (
                    <ListPlus className="w-3 h-3 sm:w-4 sm:h-4" /> 
                  )}
                </Button>
              </div>
            )}

            {!isLoaded && product.image && (
              <div className="absolute inset-0 bg-zinc-200 animate-pulse" />
            )}
            
            {product.image ? (
              <div className="relative w-full h-full flex items-center justify-center p-2">
                <Image
                  src={product.image}
                  alt={altText}
                  fill
                  priority={priority}
                  onLoad={() => setIsLoaded(true)}
                  className={`object-contain transition-all duration-300 group-hover:scale-105 ${isLoaded ? "opacity-100" : "opacity-0"}`}
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                />
              </div>
            ) : (
              <div className="absolute inset-0 bg-gray-300" />
            )}
          </div>

          {/* Bottom Bar: Button aligns with name ONLY for Imported Borders */}
          <div className="p-2 flex items-center justify-between h-8 md:h-10 gap-2">
            <h3 className="text-zinc-800 font-semibold text-[10px] md:text-[12px] truncate flex-grow" title={product.name}>
              {product.name}
            </h3>

            {isImportedBorder && (
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
            )}
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