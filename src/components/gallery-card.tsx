"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Star } from "lucide-react";
import type { Product } from "@/data";

interface GalleryCardProps {
  product: Product;
  index?: number;
}

export function GalleryCard({ product, index = 0 }: GalleryCardProps) {
  const { width, length } = product.dimensions;

  return (
    <motion.div
      className="group cursor-pointer bg-white rounded-2xl overflow-hidden shadow-md transition-shadow duration-300 hover:shadow-xl h-full flex flex-col"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.6 }}
      whileHover={{ y: -5 }}
    >
      <Link href={`/${product.category}/${product.id}`}>
        <div
          className="relative w-full overflow-hidden"
          style={{ aspectRatio: `${width} / ${length}` }}
        >
          <Image
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
      </Link>
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-slate-800 font-semibold text-base mb-1 line-clamp-2">
          {product.name}
        </h3>
        <p className="text-slate-500 text-sm mb-2">{product.subcategory}</p>
        <div className="flex items-center space-x-2 mb-3">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${
                  i < Math.floor(product.rating)
                    ? "text-amber-400 fill-current"
                    : "text-slate-300"
                }`}
              />
            ))}
          </div>
          <span className="text-slate-500 text-xs">({product.reviews})</span>
        </div>
        <div className="mt-auto pt-2">
          <span className="text-lg font-bold text-emerald-700">
            {product.sizes.join("&quot;, ")}&quot;
          </span>
        </div>
      </div>
    </motion.div>
  );
}
