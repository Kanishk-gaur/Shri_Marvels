"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Star, Eye, Heart, ListPlus, ListMinus } from "lucide-react"; 
import type { Product } from "@/data";
import {
  useCatalog,
  productToCatalogItem,
  transformProductSizes,
} from "@/context/CatalogContext";
import { Button } from "./ui/button";

interface ProductCardProps {
  product: Product;
  index?: number;
}

export function ProductCard({ product, index = 0 }: ProductCardProps) {
  const { isItemInCatalog, addItemToCatalog, removeItemFromCatalog } = useCatalog();
  const isInCatalog = isItemInCatalog(String(product.id)); 
  
  // Transform sizes for display on the gallery card
  const displaySizes = transformProductSizes(product.sizes || []);

  const handleCatalogToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    if (isInCatalog) {
      removeItemFromCatalog(String(product.id)); 
    } else {
      addItemToCatalog(productToCatalogItem(product));
    }
  };

  return (
    <motion.div
      className="group cursor-pointer"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
    >
      <div className="relative overflow-hidden rounded-2xl bg-white/10 backdrop-blur-sm shadow-xl group-hover:shadow-2xl transition-all duration-300">
        <div className="aspect-square relative overflow-hidden">
          <Image
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-110"
          />
          <div className="absolute top-4 right-4 flex flex-col space-y-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <motion.button
              className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                isInCatalog ? "bg-red-500 text-white" : "bg-white/20 text-white hover:bg-white/30"
              }`}
              onClick={handleCatalogToggle}
            >
              {isInCatalog ? <ListMinus className="w-4 h-4" /> : <ListPlus className="w-4 h-4" />}
            </motion.button>
          </div>
        </div>

        <div className="p-6 text-white">
          <h3 className="font-semibold text-lg line-clamp-2">{product.name}</h3>
          <p className="text-white/70 text-sm">
            {product.subcategory} • {displaySizes.join(" | ")}
          </p>
          <Link href={`/${product.category}/${product.id}`}>
            <Button className="w-full mt-4 bg-gradient-to-r from-cyan-500 to-purple-500">
              View Details
            </Button>
          </Link>
        </div>
      </div>
    </motion.div>
  );
}