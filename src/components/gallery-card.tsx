"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/data";
import { useState } from "react";

interface GalleryCardProps {
  product: Product;
  index?: number;
  priority?: boolean;
}

export default function GalleryCard({
  product,
  index = 0,
  priority = false,
}: GalleryCardProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const sizeString = product.sizes[0] || "1x1";

  let gridClass = "col-span-2 row-span-4"; // Default to 10 items per row and a balanced height

  // Based on a 20-column grid to accommodate a 10-item row layout
  switch (sizeString) {
    case "6x6":
      gridClass = "col-span-3 row-span-12"; // Aspect ratio 1:1
      break;
    case "8x6":
      gridClass = "col-span-3 row-span-4"; // Aspect ratio 4:3
      break;
    case "8x12":
      gridClass = "col-span-3 row-span-12"; // Aspect ratio 2:3
      break;
    case "12x18":
      gridClass = "col-span-3 row-span-14"; // Aspect ratio 2:3
      break;
    case "2x2":
      gridClass = "col-span-3 row-span-14"; // Aspect ratio 1:1
      break;
    case "2x3":
      gridClass = "col-span-3 row-span-16"; // Aspect ratio 2:3
      break;
    case "6x3":
      gridClass = "col-span-3 row-span-12"; // Aspect ratio 2:1
      break;
    case "2x4":
      gridClass = "col-span-2 row-span-18"; // Aspect ratio 1:2
      break;
    case "8x4":
      gridClass = "col-span-2 row-span-12"; // Aspect ratio 2:1
      break;
    default:
      gridClass = "col-span-2 row-span-14";
  }

  return (
    <motion.div
      className={`group ${gridClass}`}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.6 }}
      layout
    >
      <div className="block relative bg-white rounded-lg overflow-hidden border border-zinc-200/80 transition-shadow duration-300 hover:shadow-lg h-full">
        <div className="relative w-full h-full overflow-hidden">
          {!isLoaded && product.image && (
            <div className="absolute inset-0 bg-zinc-200 animate-pulse"></div>
          )}
          {product.image ? (
            <Image
              src={product.image}
              alt={product.name}
              fill
              priority={priority}
              onLoad={() => setIsLoaded(true)}
              className={`object-cover transition-all duration-300 group-hover:scale-105 ${
                isLoaded ? "opacity-100" : "opacity-0"
              }`}
            />
          ) : (
            <div className="absolute inset-0 bg-gray-300"></div> // Placeholder
          )}
        </div>
        <div className="p-3 absolute bottom-0 bg-gradient-to-t from-black/80 to-transparent w-full">
          <h3
            className="text-white font-semibold text-xs truncate"
            title={product.name}
          >
            {product.name}
          </h3>
        </div>
      </div>
    </motion.div>
  );
}
