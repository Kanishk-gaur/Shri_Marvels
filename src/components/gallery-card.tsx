"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/data";

interface GalleryCardProps {
  product: Product;
  index?: number;
}

export function GalleryCard({ product, index = 0 }: GalleryCardProps) {
  return (
    <motion.div
      className="group"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.6 }}
    >
      <Link href={`/${product.category}/${product.id}`} className="block bg-white rounded-lg overflow-hidden border border-zinc-200/80 transition-shadow duration-300 hover:shadow-lg">
        <div className="relative w-full aspect-square overflow-hidden">
          <Image
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
        <div className="p-3">
          <h3 className="text-gray-800 font-semibold text-xs truncate" title={product.name}>
            {product.name}
          </h3>
          <p className="text-emerald-600 text-xs font-medium mt-2">
            Sizes: {product.sizes.map(s => `${s}"`).join(', ')}
          </p>
        </div>
      </Link>
    </motion.div>
  );
}