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

  // Set mobile grid classes by default
  // Override desktop grid classes with 'md:' prefix to keep desktop unchanged
  let gridClass = "col-span-3 row-span-8 md:col-span-3 md:row-span-16"; // Clear and ample mobile sizes

  switch (sizeString) {
    case "12x18":
      gridClass = "col-span-3 row-span-8 md:col-span-3 md:row-span-16";
      break;
    case "8x6":
      gridClass = "col-span-4 row-span-11 md:col-span-3 md:row-span-18";
      break;
    case "20x600":
      gridClass = "col-span-6 row-span-4 md:col-span-8 md:row-span-4";
      break;
    case "10x600":
      gridClass = "col-span-6 row-span-4 md:col-span-8 md:row-span-3";
      break;
    case "900x300 mm":
      gridClass = "col-span-6 row-span-5 md:col-span-4 md:row-span-10";
      break;
    case "1200x300 mm":
      gridClass = "col-span-6 row-span-5 md:col-span-6 md:row-span-10";
      break;
    case "1000x300 mm":
      gridClass = "col-span-6 row-span-5 md:col-span-6 md:row-span-8";
      break;
    case "12x18":
      gridClass = "col-span-4 row-span-10 md:col-span-3 md:row-span-10";
      break;
    case "6x48":
      gridClass = "col-span-6 row-span-4 md:col-span-8 md:row-span-4";
      break;
    case "4x48":
      gridClass = "col-span-6 row-span-3 md:col-span-12 md:row-span-4";
      break;
    case "4x2":
      gridClass = "col-span-4 row-span-12 md:col-span-3 md:row-span-20";
      break;
    case "2x4":
      gridClass = "col-span-6 row-span-16  md:col-span-3 md:row-span-16";
      break;
    // Continue all cases similarly but always ensure mobile cols are larger (6 or so)
    case "4x6":
      gridClass = "col-span-6 row-span-9 md:col-span-4 md:row-span-12";
      break;
    case "4x4":
      gridClass = "col-span-6 row-span-12 md:col-span-4 md:row-span-16";
      break;
    case "12x24":
      gridClass = "col-span-6 row-span-8 md:col-span-4 md:row-span-8";
      break;
    case "24x4":
      gridClass = "col-span-6 row-span-3 md:col-span-6 md:row-span-4";
      break;
    case "24x2.5":
      gridClass = "col-span-6 row-span-4 md:col-span-6 md:row-span-4";
      break;
    case "24x2":
      gridClass = "col-span-6 row-span-4 md:col-span-6 md:row-span-4";
      break;
    case "12x2.5":
      gridClass = "col-span-6 row-span-5 md:col-span-6 md:row-span-6";
      break;
    case "24x1":
      gridClass = "col-span-6 row-span-3 md:col-span-6 md:row-span-3";
      break;
    case "6x6":
      gridClass = "col-span-6 row-span-12 md:col-span-3 md:row-span-12";
      break;
    case "8x12":
      gridClass = "col-span-4 row-span-10 md:col-span-3 md:row-span-18";
      break;
    case "12x8":
      gridClass = "col-span-6 row-span-8 md:col-span-6 md:row-span-16";
      break;
    case "18x12":
      gridClass = "col-span-6 row-span-9 md:col-span-4 md:row-span-12";
      break;
    case "2x2":
      gridClass = "col-span-6 row-span-12 md:col-span-3 md:row-span-14";
      break;
    case "2x3":
      gridClass = "col-span-4 row-span-12 md:col-span-3 md:row-span-16";
      break;
    case "6x3":
      gridClass = "col-span-6 row-span-12 md:col-span-3 md:row-span-12";
      break;
    case "8x4":
      gridClass = "col-span-6 row-span-12 md:col-span-2 md:row-span-12";
      break;
    case "3x2":
      gridClass = "col-span-6 row-span-8 md:col-span-6 md:row-span-16";
      break;
    case "6x8":
      gridClass = "col-span-6 row-span-12 md:col-span-3 md:row-span-16";
      break;
    case "24x3":
      gridClass = "col-span-6 row-span-4 md:col-span-6 md:row-span-4";
      break;
    default:
      gridClass = "col-span-4 row-span-11 md:col-span-3 md:row-span-16";
  }

  return (
    <motion.div
      className={`group ${gridClass}`}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.6 }}
      layout
    >
      <div className="block relative bg-white overflow-hidden border border-zinc-200/80 transition-shadow duration-300 hover:shadow-lg h-full">
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
            <div className="absolute inset-0 bg-gray-300"></div>
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
