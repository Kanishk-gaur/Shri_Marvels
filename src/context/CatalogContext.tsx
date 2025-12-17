// src/context/CatalogContext.tsx
"use client";

import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import type { Product } from "@/data";

export interface CatalogItem {
  id: string;
  name: string;
  imageUrl: string;
  selectedSize: string; 
  category: string;
}

interface CatalogContextType {
  catalogItems: CatalogItem[];
  addItemToCatalog: (item: CatalogItem) => void;
  removeItemFromCatalog: (itemId: string, size: string) => void;
  isItemInCatalog: (itemId: string, size: string) => boolean;
}

const CatalogContext = createContext<CatalogContextType | undefined>(undefined);

// Properly exported helper to fix "productToCatalogItem is not a function"
export const productToCatalogItem = (product: Product, size: string): CatalogItem => ({
  id: String(product.id),
  name: product.name,
  imageUrl: product.image || "/placeholder.svg",
  selectedSize: size,
  category: product.category,
});

export const CatalogProvider = ({ children }: { children: ReactNode }) => {
  const [catalogItems, setCatalogItems] = useState<CatalogItem[]>([]);
  const [isMounted, setIsMounted] = useState(false);

  // Load from localStorage only AFTER mount to fix Hydration Error
  useEffect(() => {
    const stored = localStorage.getItem("shri-marvels-catalog");
    if (stored) {
      try {
        setCatalogItems(JSON.parse(stored));
      } catch (e) {
        console.error("Parse error", e);
      }
    }
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isMounted) {
      localStorage.setItem("shri-marvels-catalog", JSON.stringify(catalogItems));
    }
  }, [catalogItems, isMounted]);

  const isItemInCatalog = (itemId: string, size: string) => {
    return catalogItems.some((item) => item.id === itemId && item.selectedSize === size);
  };

  const addItemToCatalog = (item: CatalogItem) => {
    if (!isItemInCatalog(item.id, item.selectedSize)) {
      setCatalogItems((prev) => [...prev, item]);
    }
  };

  const removeItemFromCatalog = (itemId: string, size: string) => {
    setCatalogItems((prev) => 
      prev.filter((item) => !(item.id === itemId && item.selectedSize === size))
    );
  };

  return (
    <CatalogContext.Provider value={{ catalogItems, addItemToCatalog, removeItemFromCatalog, isItemInCatalog }}>
      {children}
    </CatalogContext.Provider>
  );
};

export const useCatalog = () => {
  const context = useContext(CatalogContext);
  if (!context) throw new Error("useCatalog must be used within CatalogProvider");
  return context;
};