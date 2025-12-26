"use client";

import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import type { Product } from "@/data";

// 1. Full Size Mapping Object
const SIZE_MAP: Record<string, string> = {
  "600x900 mm (24x36 inch)": "2x3",
  "900x600 mm (36x24 inch)": "3x2",
  "200x300 mm (8x12 inch)": "8x12,12x18",
  "300x200 mm (12x8 inch)": "12x8,18x12",
  "600x1200 mm": "2x4",
  "200x300 mm": "8x12,12x18",
  "300x200 mm": "12x8,18x12",
  "600x600 mm (23.6x23.6 inch)": "2x2",
  "600x600 mm": "2x2",
  "600x900 mm": "2x3",
  "900x600 mm": "3x2",
  "1200x600 mm": "4x2",
  "600x1200 mm (24x48 inch)": "2x4",
  "1200x600 mm (48x24 inch)": "4x2",
  "18x12 inch": "18x12, 3x2, 4x2",
  "24x24 inch": "2x2",
  "8x6": "6x8",
  "8x12 in": "8x12",
  "12x18 inches": "12x18",
  "12x8 in": "12x8",
  "8x12": "8x12, 6x6, 12x18",
  "8x12 inches": "2x2",
  "10x600 mm (0.39x23.6 inch)": "10x600",
  "10x450 mm (0.39x17.7 inch)": "10x450",
  "12x600 mm (0.47x23.6 inch)": "12x600",
  "12x1200 mm (0.47x47.2 inch)": "12x1200",
  "20x600 mm (0.79x23.6 inch)": "20x600",
  "20x1200 mm (0.79x47.2 inch)": "20x1200",
  "25x600 mm (0.98x23.6 inch)": "25x600",
  "40x600 mm (1.57x23.6 inch)": "40x600",
  "45x600 mm (1.77x23.6 inch)": "45x600",
  "48x600 mm (1.89x23.6 inch)": "48x600",
  "300x63 mm (12x2.5 inch)": "12x2.5",
  "4x48": "48x4",
  "6x48": "48x6",
  "300x600 mm (11.8x23.6 inch)": "24x12",
  "300x450 mm (11.8x17.7 inch)": "18x12",
  "(Sugar)300x600 mm (11.8x23.6 inch)": "(Sugar)24x12",
  "(GLUE)300x600 mm (11.8x23.6 inch)": "(GLUE)24x12",
  "Polishing Series 300x600 mm (12x24 inch)": "Polishing Series 24x12",
  "4x6": "6x4",
  "400x600 mm (16x24 inch)": "6x4",
  "600x600 mm (24x24 inch)": "2x2",
  "1200x1200 mm (48x48 inch)": "4x4",
  "6x36(w)": "6x36,9x36,12x36",
  "(God)6x36": "(God)6x36,9x36,12x36",
  "6x36 in (c)": "6x36",
  "6x36 in": "2 Soot",
  "6x36": "6x36,9x36,12x36",
};

export const transformProductSizes = (rawSizes: string[]): string[] => {
  let mapped: string[] = [];
  rawSizes.forEach((size) => {
    const key = size.trim();
    if (SIZE_MAP[key]) {
      const values = SIZE_MAP[key].split(",").map((v) => v.trim());
      mapped = [...mapped, ...values];
    } else if (key.includes(",")) {
      const splitValues = key.split(",").map((v) => v.trim());
      mapped = [...mapped, ...splitValues];
    } else {
      mapped.push(key);
    }
  });
  return Array.from(new Set(mapped));
};

export interface CatalogItem {
  id: string;
  name: string;
  imageUrl: string;
  sizes: string[]; 
  category: string;
  selectedSizes: string[];
  quantity?: number; // Added to support total count
  sizeConfigs?: Record<string, number>; // Maps each size to its specific quantity
}

interface CatalogContextType {
  catalogItems: CatalogItem[];
  addItemToCatalog: (item: CatalogItem) => void;
  removeItemFromCatalog: (itemId: string) => void;
  isItemInCatalog: (itemId: string) => boolean;
  updateItemSizes: (itemId: string, sizes: string[], sizeConfigs?: Record<string, number>) => void;
}

const CatalogContext = createContext<CatalogContextType | undefined>(undefined);

export const productToCatalogItem = (product: Product): CatalogItem => ({
  id: String(product.id),
  name: product.name,
  imageUrl: product.image || "/placeholder.svg",
  category: product.category,
  sizes: transformProductSizes(product.sizes || []),
  selectedSizes: [],
  quantity: 0,
  sizeConfigs: {},
});

export const CatalogProvider = ({ children }: { children: ReactNode }) => {
  const [catalogItems, setCatalogItems] = useState<CatalogItem[]>([]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("shri-marvels-catalog-v3");
      if (saved) {
        try {
          setCatalogItems(JSON.parse(saved));
        } catch (e) {
          console.error("Storage parse error", e);
        }
      }
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("shri-marvels-catalog-v3", JSON.stringify(catalogItems));
    }
  }, [catalogItems]);

  const isItemInCatalog = (itemId: string) => catalogItems.some((i) => i.id === itemId);

  const addItemToCatalog = (item: CatalogItem) => {
    if (!isItemInCatalog(item.id)) {
      setCatalogItems((prev) => [...prev, item]);
    }
  };

  const removeItemFromCatalog = (itemId: string) => {
    setCatalogItems((prev) => prev.filter((i) => i.id !== itemId));
  };

  const updateItemSizes = (itemId: string, sizes: string[], sizeConfigs?: Record<string, number>) => {
    setCatalogItems((prev) =>
      prev.map((item) => {
        if (item.id === itemId) {
          const totalQty = sizeConfigs ? Object.values(sizeConfigs).reduce((a, b) => a + b, 0) : 0;
          return { ...item, selectedSizes: sizes, sizeConfigs, quantity: totalQty };
        }
        return item;
      })
    );
  };

  return (
    <CatalogContext.Provider value={{ catalogItems, addItemToCatalog, removeItemFromCatalog, isItemInCatalog, updateItemSizes }}>
      {children}
    </CatalogContext.Provider>
  );
};

export const useCatalog = () => {
  const context = useContext(CatalogContext);
  if (!context) throw new Error("useCatalog must be used within a CatalogProvider");
  return context;
};