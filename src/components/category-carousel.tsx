"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

type Category = {
  id: string;
  name: string;
  count: number;
  exampleImage: string;
};

interface CategoryCarouselProps {
  title: string;
  subtitle: string;
  categories: Category[];
  categoryType: "marvel" | "tiles";
  imageAspectRatio?: string; // New prop for custom aspect ratio
}

const ITEMS_PER_PAGE = 3;

export function CategoryCarousel({ 
  title, 
  subtitle, 
  categories, 
  categoryType, 
  imageAspectRatio = "aspect-[16/10]" // Default aspect ratio
}: CategoryCarouselProps) {
  const [currentPage, setCurrentPage] = useState(0);
  const totalPages = Math.ceil(categories.length / ITEMS_PER_PAGE);
  const startIndex = currentPage * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentCategories = categories.slice(startIndex, endIndex);

  const carouselVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.3 } },
  };

  return (
    <div className="w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="flex flex-col md:flex-row justify-between md:items-end gap-6">
          <div className="max-w-xl">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight">{title}</h2>
            <p className="mt-3 text-lg text-slate-600">{subtitle}</p>
          </div>
          <div className="flex-shrink-0 flex items-center gap-3">
            <Button
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 0))}
              disabled={currentPage === 0}
              size="icon"
              variant="outline"
              className="rounded-full h-12 w-12 border-slate-300 text-slate-500 hover:bg-slate-100 disabled:opacity-40"
            >
              <ArrowLeft className="w-6 h-6" />
            </Button>
            <Button
              onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages - 1))}
              disabled={currentPage >= totalPages - 1}
              size="icon"
              variant="outline"
              className="rounded-full h-12 w-12 border-slate-300 text-slate-500 hover:bg-slate-100 disabled:opacity-40"
            >
              <ArrowRight className="w-6 h-6" />
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
            variants={carouselVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {currentCategories.map((category) => (
              <Link key={category.id} href={`/gallery?category=${categoryType}&subcategory=${category.id}`} className="group block">
                <motion.div 
                  className="bg-white rounded-2xl overflow-hidden shadow-sm transition-shadow duration-300 group-hover:shadow-xl h-full flex flex-col"
                  whileHover={{ y: -5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  {/* Image Container with custom aspect ratio */}
                  <div className={`relative ${imageAspectRatio} overflow-hidden`}>
                    <Image
                      src={category.exampleImage}
                      alt={category.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
                  </div>
                  
                  <div className="p-6 flex-grow flex flex-col">
                    <h3 className="text-xl font-semibold text-slate-800">{category.name}</h3>
                    <p className="text-sm text-slate-500 mt-1">{category.count} Products</p>
                    <div className="mt-auto pt-4">
                      <div className="inline-flex items-center font-semibold text-emerald-700 group-hover:text-emerald-600 transition-colors">
                        View Collection
                        <ArrowRight className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
                      </div>
                    </div>
                  </div>
                </motion.div>
              </Link>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}