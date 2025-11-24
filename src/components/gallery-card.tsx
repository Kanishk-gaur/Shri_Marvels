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

  // Grid classes structure: mobile (default) -> tablet (md:) -> desktop (lg:)
  // Default is now col-span-12 (half of 24) instead of col-span-6 (half of 12)
  let gridClass =
    "col-span-12 row-span-8 md:col-span-4 md:row-span-12 lg:col-span-3 lg:row-span-18";

  switch (sizeString) {
    case "(POLISHED)12x24":
      // Was 4 -> 8
      gridClass =
        "col-span-8 row-span-8 md:col-span-6 md:row-span-12 lg:col-span-4 lg:row-span-11";
      break;
    case "18x12/8x12":
      // Was 4 -> 8
      gridClass =
        "col-span-8 row-span-8 md:col-span-6 md:row-span-12 lg:col-span-4 lg:row-span-14";
      break;
    case "12x18/12x8":
      // Was 6 -> 12
      gridClass =
        "col-span-6 row-span-11 md:col-span-4 md:row-span-13 lg:col-span-3 lg:row-span-20";
      break;
    case "400x600 mm (16x24 inch)":
      gridClass =
        "col-span-12 row-span-9 md:col-span-3 md:row-span-6 lg:col-span-8 lg:row-span-19";
      break;
    case "(LUSTER)12x24":
      gridClass =
        "col-span-12 row-span-9 md:col-span-3 md:row-span-6 lg:col-span-4 lg:row-span-11";
      break;
    case "(SUGAR)12x24":
      gridClass =
        "col-span-12 row-span-9 md:col-span-3 md:row-span-6 lg:col-span-4 lg:row-span-11";
      break;
    case "(Sugar)300x600 mm (11.8x23.6 inch)":
      gridClass =
        "col-span-12 row-span-9 md:col-span-8 md:row-span-12 lg:col-span-6 lg:row-span-15";
      break;
    case "(GLUE)300x600 mm (11.8x23.6 inch)":
      gridClass =
        "col-span-12 row-span-9 md:col-span-8 md:row-span-12 lg:col-span-6 lg:row-span-15";
      break;
    case "300x63 mm (12x2.5 inch)":
      gridClass =
        "col-span-12 row-span-26 md:col-span-8 md:row-span-12 lg:col-span-6 lg:row-span-8";
      break;
    case "Polishing Series 300x600 mm (12x24 inch)":
      gridClass =
        "col-span-12 row-span-26 md:col-span-8 md:row-span-12 lg:col-span-6 lg:row-span-15";
      break;
    case "600x1200 mm (24x48 inch)":
      gridClass =
        "col-span-12 row-span-26 md:col-span-8 md:row-span-12 lg:col-span-4 lg:row-span-33";
      break;
    case "300x600 mm (11.8x23.6 inch)":
      gridClass =
        "col-span-12 row-span-9 md:col-span-8 md:row-span-12 lg:col-span-6 lg:row-span-15";
      break;
    case "300x450 mm (11.8x17.7 inch)":
      gridClass =
        "col-span-12 row-span-11 md:col-span-8 md:row-span-12 lg:col-span-6 lg:row-span-17";
      break;
    case "48x600 mm (1.89x23.6 inch)":
      gridClass =
        "col-span-24 row-span-5 md:col-span-8 md:row-span-12 lg:col-span-8 lg:row-span-7";
      break;
    case "45x600 mm (1.77x23.6 inch)":
      gridClass =
        "col-span-24 row-span-5 md:col-span-8 md:row-span-12 lg:col-span-8 lg:row-span-7";
      break;
    case "40x600 mm (1.57x23.6 inch)":
      gridClass =
        "col-span-24 row-span-5 md:col-span-8 md:row-span-12 lg:col-span-8 lg:row-span-7";
      break;
    case "25x600 mm (0.98x23.6 inch)":
      gridClass =
        "col-span-24 row-span-5 md:col-span-8 md:row-span-12 lg:col-span-8 lg:row-span-6";
      break;
    case "20x600 mm (0.79x23.6 inch)":
      gridClass =
        "col-span-24 row-span-5 md:col-span-8 md:row-span-12 lg:col-span-8 lg:row-span-5";
      break;
    case "10x600 mm (0.39x23.6 inch)":
      gridClass =
        "col-span-24 row-span-5 md:col-span-8 md:row-span-12 lg:col-span-6 lg:row-span-6";
      break;
    case "900x600 mm":
      gridClass =
        "col-span-24 row-span-20 md:col-span-8 md:row-span-12 lg:col-span-8 lg:row-span-24";
      break;
    case "12x8, 18x12, 24x18, 2x2, 3x2, 4x2":
      gridClass =
        "col-span-24 row-span-20 md:col-span-8 md:row-span-12 lg:col-span-8 lg:row-span-24";
      break;
    case "900x600 mm (36x24 inch)":
      gridClass =
        "col-span-24 row-span-20 md:col-span-8 md:row-span-12 lg:col-span-8 lg:row-span-24";
      break;
    case "24x24 inch":
      gridClass =
        "col-span-12 row-span-15 md:col-span-8 md:row-span-12 lg:col-span-6 lg:row-span-26";
      break;
    case "600x600 mm":
      gridClass =
        "col-span-12 row-span-15 md:col-span-8 md:row-span-12 lg:col-span-6 lg:row-span-26";
      break;
    case "600x600 mm (23.6x23.6 inch)":
      gridClass =
        "col-span-12 row-span-15 md:col-span-8 md:row-span-12 lg:col-span-6 lg:row-span-26";
      break;
    case "600x900 mm":
      gridClass =
        "col-span-12 row-span-20 md:col-span-8 md:row-span-12 lg:col-span-4 lg:row-span-26";
      break;
    case "8x12, 12x18, 18x24, 2x2, 2x3, 2x4":
      gridClass =
        "col-span-12 row-span-20 md:col-span-8 md:row-span-12 lg:col-span-6 lg:row-span-37";
      break;
    case "600x900 mm (24x36 inch)":
      gridClass =
        "col-span-12 row-span-20 md:col-span-8 md:row-span-12 lg:col-span-6 lg:row-span-37";
      break;
    case "1200x600 mm":
      gridClass =
        "col-span-12 row-span-9 md:col-span-8 md:row-span-12 lg:col-span-8 lg:row-span-19";
      break;
    case "1200x600 mm (48x24 inch)":
      gridClass =
        "col-span-12 row-span-9 md:col-span-8 md:row-span-12 lg:col-span-8 lg:row-span-19";
      break;
    case "20x1200 mm (0.79x47.2 inch)":
      gridClass =
        "col-span-24 row-span-5 md:col-span-8 md:row-span-12 lg:col-span-8 lg:row-span-7";
      break;
    case "12x600 mm (0.47x23.6 inch)":
      gridClass =
        "col-span-24 row-span-5 md:col-span-8 md:row-span-12 lg:col-span-8 lg:row-span-5";
      break;
    case "12x1200 mm (0.47x47.2 inch)":
      gridClass =
        "col-span-24 row-span-5 md:col-span-8 md:row-span-12 lg:col-span-8 lg:row-span-5";
      break;
    case "10x450 mm (0.39x17.7 inch)":
      // Was col-span-24 in source. Kept as 24 (Full width)
      gridClass =
        "col-span-24 row-span-5 md:col-span-2 md:row-span-12 lg:col-span-8 lg:row-span-5";
      break;
    case "1200x1800 mm (48x72 inch)":
      gridClass =
        "col-span-12 row-span-11 md:col-span-8 md:row-span-12 lg:col-span-12 lg:row-span-34";
      break;
    case "600x600 mm (24x24 inch)":
      gridClass =
        "col-span-12 row-span-14 md:col-span-8 md:row-span-12 lg:col-span-6 lg:row-span-26";
      break;
    case "1200x1200 mm (48x48 inch)":
      gridClass =
        "col-span-12 row-span-14 md:col-span-8 md:row-span-12 lg:col-span-6 lg:row-span-26";
      break;
    case "4x2 in":
      gridClass =
        "col-span-24 row-span-14 md:col-span-8 md:row-span-12 lg:col-span-6 lg:row-span-15";
      break;
    case "2x4 in":
      // Was 6 -> 12
      gridClass =
        "col-span-12 row-span-8 md:col-span-13 md:row-span-10 lg:col-span-6 lg:row-span-15";
      break;
    case "12x8 in":
      // Was 4 -> 8
      gridClass =
        "col-span-8 row-span-8 md:col-span-6 md:row-span-12 lg:col-span-4 lg:row-span-13";
      break;
      case "(God)6x36":
      // Was 6 -> 12
      gridClass =
        "col-span-12 row-span-8 md:col-span-4 md:row-span-10 lg:col-span-8 lg:row-span-12";
      break;
      case "6x36 in (c)":
      // Was 6 -> 12
      gridClass =
        "col-span-12 row-span-8 md:col-span-4 md:row-span-10 lg:col-span-12 lg:row-span-10";
      break;
    case "6x36(w)":
      // Was 6 -> 12
      gridClass =
        "col-span-12 row-span-8 md:col-span-4 md:row-span-10 lg:col-span-8 lg:row-span-9";
      break;
    case "9x36":
      // Was 6 -> 12
      gridClass =
        "col-span-12 row-span-8 md:col-span-4 md:row-span-10 lg:col-span-8 lg:row-span-10";
      break;
    case "6x36":
      // Was 6 -> 12
      gridClass =
        "col-span-12 row-span-8 md:col-span-4 md:row-span-10 lg:col-span-6 lg:row-span-8";
      break;
       case "6x36 in":
      // Was 6 -> 12
      gridClass =
        "col-span-12 row-span-6 md:col-span-8 md:row-span-6 lg:col-span-8 lg:row-span-7";
      break;
    case "6x36 inch":
      // Was 6 -> 12
      gridClass =
        "col-span-12 row-span-6 md:col-span-8 md:row-span-6 lg:col-span-6 lg:row-span-6";
      break;
    case "18x12 inch":
      // Was 6 -> 12
      gridClass =
        "col-span-12 row-span-11 md:col-span-6 md:row-span-12 lg:col-span-4 lg:row-span-13";
      break;
    case "12x18 mm":
      // Was 6 -> 12
      gridClass =
        "col-span-6 row-span-11 md:col-span-4 md:row-span-16 lg:col-span-3 lg:row-span-20";
      break;
    case "12x18 inches":
      // Was 4 -> 8
      gridClass =
        "col-span-8 row-span-14 md:col-span-4 md:row-span-15 lg:col-span-3 lg:row-span-20";
      break;
    case "12x18 in":
      // Was 6 -> 12
      gridClass =
        "col-span-6 row-span-11 md:col-span-4 md:row-span-13 lg:col-span-3 lg:row-span-20";
      break;
    case "8x12 in":
      // Was 3 -> 6
      gridClass =
        "col-span-6 row-span-11 md:col-span-4 md:row-span-16 lg:col-span-3 lg:row-span-20";
      break;
    case "12x18":
      // Was 6 -> 12
      gridClass =
        "col-span-12 row-span-10 md:col-span-4 md:row-span-9 lg:col-span-4 lg:row-span-13";
      break;
    case "8x6":
      // Was 2 -> 4
      gridClass =
        "col-span-4 row-span-8 md:col-span-4 md:row-span-16 lg:col-span-4 lg:row-span-26";
      break;
    case "20x600":
      gridClass =
        "col-span-24 row-span-5 md:col-span-6 md:row-span-5 lg:col-span-8 lg:row-span-6";
      break;
    case "10x600":
      gridClass =
        "col-span-24 row-span-5 md:col-span-6 md:row-span-5 lg:col-span-8 lg:row-span-5";
      break;
    case "900x300 mm":
      gridClass =
        "col-span-12 row-span-9 md:col-span-6 md:row-span-9 lg:col-span-4 lg:row-span-12";
      break;
    case "1200x300 mm":
      // Was 6 -> 12
      gridClass =
        "col-span-12 row-span-10 md:col-span-6 md:row-span-9 lg:col-span-6 lg:row-span-12";
      break;
    case "1000x300 mm":
      // Was 6 -> 12
      gridClass =
        "col-span-12 row-span-9 md:col-span-6 md:row-span-8 lg:col-span-6 lg:row-span-17";
      break;
    case "6x48":
      // Was 6 -> 12
      gridClass =
        "col-span-12 row-span-5 md:col-span-6 md:row-span-6 lg:col-span-12 lg:row-span-8";
      break;
    case "4x48":
      // Was 6 -> 12
      gridClass =
        "col-span-12 row-span-5 md:col-span-8 md:row-span-5 lg:col-span-12 lg:row-span-7";
      break;

    case "4x2":
      // Was 3 -> 6
      gridClass =
        "col-span-6 row-span-13 md:col-span-4 md:row-span-20 lg:col-span-4 lg:row-span-33";
      break;
    case "600x1200 mm":
      // Was 6 -> 12
      gridClass =
        "col-span-12 row-span-25 md:col-span-6 md:row-span-28 lg:col-span-4 lg:row-span-33";
      break;
    case "2x4":
      // Was 6 -> 12
      gridClass =
        "col-span-12 row-span-25 md:col-span-6 md:row-span-28 lg:col-span-4 lg:row-span-33";
      break;
    case "4x6":
      // Was 16 -> 32 (Note: this might be too wide, check if 32 is intended or if you need full width 'col-span-24')
      gridClass =
        "col-span-12 row-span-10 md:col-span-6 md:row-span-12 lg:col-span-6 lg:row-span-18";
      break;
    case "4x4":
      // Was 6 -> 12
      gridClass =
        "col-span-12 row-span-15 md:col-span-6 md:row-span-16 lg:col-span-6 lg:row-span-26";
      break;
    case "12x24":
      // Was 6 -> 12
      gridClass =
        "col-span-12 row-span-9 md:col-span-3 md:row-span-6 lg:col-span-4 lg:row-span-11";
      break;
    case "24x4":
      gridClass =
        "col-span-24 row-span-7 md:col-span-6 md:row-span-6 lg:col-span-6 lg:row-span-7";
      break;
    case "24x2.5":
      gridClass =
        "col-span-24 row-span-6 md:col-span-6 md:row-span-6 lg:col-span-6 lg:row-span-6";
      break;
    case "24x2":
      gridClass =
        "col-span-24 row-span-5 md:col-span-6 md:row-span-5 lg:col-span-6 lg:row-span-6";
      break;
    case "12x2.5":
      // Was 6 -> 12
      gridClass =
        "col-span-12 row-span-6 md:col-span-6 md:row-span-6 lg:col-span-6 lg:row-span-8";
      break;
    case "24x1":
      // Was 6 -> 12
      gridClass =
        "col-span-12 row-span-5 md:col-span-6 md:row-span-5 lg:col-span-6 lg:row-span-5";
      break;
    case "6x6":
      // Was 6 -> 12
      gridClass =
        "col-span-12 row-span-10 md:col-span-4 md:row-span-10 lg:col-span-3 lg:row-span-12";
      break;
    case "8x12 inches":
      // Was 6 -> 12
      gridClass =
        "col-span-12 row-span-14 md:col-span-4 md:row-span-11 lg:col-span-6 lg:row-span-24";
      break;
    case "8x12":
      // Was 3 -> 6
      gridClass =
        "col-span-6 row-span-11 md:col-span-4 md:row-span-16 lg:col-span-3 lg:row-span-20";
      break;
    case "12x8":
      // Was 6 -> 12
      gridClass =
        "col-span-12 row-span-11 md:col-span-6 md:row-span-12 lg:col-span-4 lg:row-span-13";
      break;
    case "18x12":
      // Was 4 -> 8
      gridClass =
        "col-span-8 row-span-8 md:col-span-6 md:row-span-12 lg:col-span-4 lg:row-span-14";
      break;
    case "2x2":
      // Was 4 -> 8
      gridClass =
        "col-span-8 row-span-11 md:col-span-4 md:row-span-12 lg:col-span-4 lg:row-span-18";
      break;
    case "200x300 mm (8x12 inch)":
      // Was 6 -> 12
      gridClass =
        "col-span-6 row-span-11 md:col-span-4 md:row-span-16 lg:col-span-4 lg:row-span-26";
      break;
    case "2x3":
      // Was 6 -> 12
      gridClass =
        "col-span-6 row-span-11 md:col-span-4 md:row-span-16 lg:col-span-4 lg:row-span-26";
      break;
    case "6x3":
      // Was 6 -> 12
      gridClass =
        "col-span-12 row-span-10 md:col-span-4 md:row-span-10 lg:col-span-3 lg:row-span-12";
      break;
    case "8x4":
      // Was 6 -> 12
      gridClass =
        "col-span-12 row-span-10 md:col-span-3 md:row-span-10 lg:col-span-2 lg:row-span-12";
      break;
    case "3x2/24x18/2x2":
      // Was 4 -> 8
      gridClass =
        "col-span-8 row-span-8 md:col-span-6 md:row-span-12 lg:col-span-6 lg:row-span-18";
      break;
    case "300x200 mm (12x8 inch)":
      // Was 4 -> 8
      gridClass =
        "col-span-8 row-span-8 md:col-span-6 md:row-span-12 lg:col-span-6 lg:row-span-18";
      break;
    case "3x2":
      // Was 4 -> 8
      gridClass =
        "col-span-8 row-span-8 md:col-span-6 md:row-span-12 lg:col-span-6 lg:row-span-18";
      break;
    case "6x8":
      // Was 6 -> 12
      gridClass =
        "col-span-12 row-span-10 md:col-span-4 md:row-span-12 lg:col-span-3 lg:row-span-16";
      break;
    case "24x3":
      // Was 6 -> 12
      gridClass =
        "col-span-12 row-span-5 md:col-span-6 md:row-span-4 lg:col-span-6 lg:row-span-6";
      break;
    default:
      // Was 6 -> 12
      gridClass =
        "col-span-12 row-span-9 md:col-span-4 md:row-span-11 lg:col-span-3 lg:row-span-16";
  }

  return (
    <motion.div
      className={`group ${gridClass}`}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.6 }}
      layout
    >
      <div className="flex flex-col h-full bg-white overflow-hidden border border-zinc-200/80 transition-shadow duration-300 hover:shadow-lg">
        <div className="relative w-full flex-grow overflow-hidden">
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
        <div className="p-3">
          <h3
            className="text-zinc-800 font-semibold text-xs truncate"
            title={product.name}
          >
            {product.name}
          </h3>
        </div>
      </div>
    </motion.div>
  );
}
