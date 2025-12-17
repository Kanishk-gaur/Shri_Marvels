// src/context/CatalogContext.tsx

"use client";

import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
// Assuming Product type is correctly exported from "@/data"
import type { Product } from "@/data"; 
// The problematic import has been removed to resolve the conflict.

// Type for the product data stored in the catalog
export interface CatalogItem {
  id: string; 
  name: string;
  imageUrl: string;
  sizes: string[]; // Stores the product's sizes
  category: string;
}

// Define the shape of the context state
interface CatalogContextType {
  catalogItems: CatalogItem[];
  addItemToCatalog: (item: CatalogItem) => void;
  removeItemFromCatalog: (itemId: string) => void;
  isItemInCatalog: (itemId: string) => boolean;
}

const CatalogContext = createContext<CatalogContextType | undefined>(undefined);

// Helper function to convert a Product type to a storable CatalogItem
// Maps data from the ProductCard structure
export const productToCatalogItem = (product: Product): CatalogItem => ({
  // FIX: Explicitly convert ID to string to match CatalogItem interface
  id: String(product.id), 
  name: product.name,
  // ProductCard uses `product.image`, which we map to `imageUrl`
  imageUrl: product.image || "/placeholder.svg", 
  sizes: product.sizes || [],
  category: product.category,
});

export const CatalogProvider = ({ children }: { children: ReactNode }) => {
  // Initialize state from localStorage or an empty array
  const [catalogItems, setCatalogItems] = useState<CatalogItem[]>(() => {
    if (typeof window !== "undefined") {
      try {
        const storedItems = localStorage.getItem("agrawal-ceramics-catalog");
        return storedItems ? JSON.parse(storedItems) : [];
      } catch (e) {
        console.error("Could not parse catalog from localStorage", e);
        return [];
      }
    }
    return [];
  });

  // Effect to save state to localStorage whenever it changes
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem(
        "agrawal-ceramics-catalog",
        JSON.stringify(catalogItems)
      );
    }
  }, [catalogItems]);

  const isItemInCatalog = (itemId: string) => {
    return catalogItems.some((item) => item.id === itemId);
  };

  const addItemToCatalog = (item: CatalogItem) => {
    if (!isItemInCatalog(item.id)) {
      setCatalogItems((prevItems) => [...prevItems, item]);
    }
  };

  const removeItemFromCatalog = (itemId: string) => {
    setCatalogItems((prevItems) =>
      prevItems.filter((item) => item.id !== itemId)
    );
  };

  return (
    <CatalogContext.Provider
      value={{
        catalogItems,
        addItemToCatalog,
        removeItemFromCatalog,
        isItemInCatalog,
      }}
    >
      {children}
    </CatalogContext.Provider>
  );
};

export const useCatalog = () => {
  const context = useContext(CatalogContext);
  if (context === undefined) {
    throw new Error("useCatalog must be used within a CatalogProvider");
  }
  return context;
};