// src/components/product-card.tsx

"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { ListPlus, Eye, Heart } from "lucide-react";
import { useCatalog } from "@/context/CatalogContext";
import { SizeSelectionDialog } from "./size-selection-dialog";
import type { Product } from "@/data";

export function ProductCard({ product, index = 0 }: { product: Product; index?: number }) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { addItemToCatalog, isItemInCatalog } = useCatalog();

  const handleAddToCatalog = (size: string) => {
    addItemToCatalog({
      id: String(product.id),
      name: product.name,
      imageUrl: product.image || "/placeholder.svg",
      selectedSize: size,
      category: product.category,
    });
  };

  return (
    <>
      <motion.div className="group relative bg-white/5 rounded-2xl overflow-hidden border border-white/10">
        <div className="aspect-square relative">
          <Image src={product.image} alt={product.name} fill className="object-cover" />
          
          {/* Action Overlay */}
          <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              onClick={(e) => {
                e.preventDefault();
                setIsDialogOpen(true);
              }}
              className="p-2 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-cyan-500 transition-colors"
            >
              <ListPlus className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="p-4">
          <h3 className="text-white font-bold">{product.name}</h3>
          <p className="text-white/60 text-sm">{product.subcategory}</p>
        </div>
      </motion.div>

      <SizeSelectionDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        subcategory={product.subcategory}
        availableSizes={product.sizes}
        onSelect={handleAddToCatalog}
      />
    </>
  );
}