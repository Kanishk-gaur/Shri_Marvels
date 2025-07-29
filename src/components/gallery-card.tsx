"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Star, Eye, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Product } from "@/data";

interface GalleryCardProps {
  product: Product;
  index?: number;
}

export function GalleryCard({ product, index = 0 }: GalleryCardProps) {
  return (
    <motion.div
      className="group cursor-pointer"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.6 }}
      whileHover={{
        scale: 1.02,
        rotateY: 2,
        z: 50,
      }}
      style={{
        transformStyle: "preserve-3d",
        perspective: 1000,
      }}
    >
      <div className="relative overflow-hidden rounded-2xl bg-white/10 backdrop-blur-sm shadow-xl group-hover:shadow-2xl transition-all duration-300">
        {/* Product Image */}
        <div className="aspect-square relative overflow-hidden">
          <Image
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {/* Quick Actions */}
          <div className="absolute top-4 right-4 flex flex-col space-y-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <motion.button
              className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Heart className="w-4 h-4" />
            </motion.button>
            <Link href={`/${product.category}/${product.id}`}>
              <motion.button
                className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Eye className="w-4 h-4" />
              </motion.button>
            </Link>
          </div>
        </div>

        {/* Product Info */}
        <div className="p-6">
          <div className="flex items-start justify-between mb-2">
            <div>
              <h3 className="text-white font-semibold text-lg mb-1 line-clamp-2">
                {product.name}
              </h3>
              {/* FIX: Changed product.size to display the sizes array */}
              <p className="text-white/70 text-sm">
                {product.subcategory} • {product.sizes.join(" | ")}&quot;
              </p>
            </div>
          </div>

          {/* Rating */}
          <div className="flex items-center space-x-2 mb-3">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${
                    i < Math.floor(product.rating)
                      ? "text-yellow-400 fill-current"
                      : "text-gray-400"
                  }`}
                />
              ))}
            </div>
            <span className="text-white/70 text-sm">({product.reviews})</span>
          </div>

          {/* Material & Finish */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex space-x-2">
              <span className="bg-white/20 text-white text-xs px-2 py-1 rounded-full">
                {product.material}
              </span>
              <span className="bg-white/20 text-white text-xs px-2 py-1 rounded-full">
                {product.finish}
              </span>
            </div>
          </div>

          {/* Description */}
          <p className="text-white/80 text-sm mb-4 line-clamp-2">
            {product.description}
          </p>

          {/* View Details Button */}
          <Button asChild className="w-full bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-300">
            <Link href={`/${product.category}/${product.id}`}>
              <div className="flex items-center justify-center space-x-2">
                <Eye className="w-4 h-4" />
                <span>View Details</span>
              </div>
            </Link>
          </Button>
        </div>

        {/* 3D Hover Effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-2xl"
          style={{
            transform: "translateZ(10px)",
          }}
        />
      </div>
    </motion.div>
  );
}