"use client";

import { useState, useEffect } from "react";
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
  imageAspectRatio?: string;
  isPaginated?: boolean;
  displayMode?: "default" | "tile-grid";
}

const DEFAULT_ITEMS_PER_PAGE = 3;
const TILE_GRID_ITEMS_PER_PAGE = 6;
const SHOW_ALL_ITEMS_PER_PAGE = 999;

export function CategoryCarousel({ 
  title, 
  subtitle, 
  categories, 
  categoryType, 
  imageAspectRatio = "aspect-[16/10]",
  isPaginated = false,
  displayMode = "default"
}: CategoryCarouselProps) {
  const [currentPage, setCurrentPage] = useState(0);

  const getItemsPerPage = () => {
    if (displayMode === "tile-grid") {
      return TILE_GRID_ITEMS_PER_PAGE;
    }
    return isPaginated ? DEFAULT_ITEMS_PER_PAGE : SHOW_ALL_ITEMS_PER_PAGE;
  };

  const itemsPerPage = getItemsPerPage();
  const totalPages = Math.ceil(categories.length / itemsPerPage);
  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentCategories = categories.slice(startIndex, endIndex);

  useEffect(() => {
    if (isPaginated && totalPages > 1) {
      const scrollInterval = setInterval(() => {
        setCurrentPage((prevPage) => (prevPage + 1) % totalPages);
      }, 7000);
      return () => clearInterval(scrollInterval);
    }
  }, [isPaginated, totalPages]);

  const carouselVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.3 } },
  };

  const getGridColumns = () => {
    if (displayMode === "tile-grid") {
      return "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6";
    }
    return "flex flex-wrap justify-center gap-8";
  };

  const getCardWidthClass = () => {
    if (displayMode === "tile-grid") {
      return "w-full";
    }
    return "w-full md:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.333rem)]";
  };

  const shouldShowExtraInfo = () => {
    return categoryType === "marvel";
  };

  // Function to get aspect ratio based on category type
  const getAspectRatioClass = () => {
    if (categoryType === "tiles" && displayMode === "tile-grid") {
      return "aspect-[16/11]";
    }
    return imageAspectRatio;
  };

  // Function to get border radius for the entire card
  const getCardBorderRadius = () => {
    if (categoryType === "tiles" && displayMode === "tile-grid") {
      return "rounded-none"; // Sharp corners for tile-grid cards
    }
    return "rounded-2xl"; // Rounded corners for marvel cards
  };

  // Function to get border radius for the image container
  const getImageBorderRadius = () => {
    if (categoryType === "tiles" && displayMode === "tile-grid") {
      return "rounded-none"; // Sharp corners for tile-grid images
    }
    return "rounded-t-2xl"; // Rounded top corners for marvel images
  };

  return (
    <div className="w-full">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
          <div className="max-w-2xl">
            {/* Title with sophisticated styling */}
            <div className="relative">
              {/* Subtle background accent */}
              <div className="absolute -left-4 -top-4 w-24 h-24 bg-emerald-50 rounded-full blur-2xl opacity-60"></div>
              
              {/* Main title */}
              <h2 className="relative text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 leading-[1.1] tracking-tight">
                <span className="relative z-10">
                  {title.split(' ').map((word, i, arr) => (
                    <span 
                      key={i} 
                      className={i === arr.length - 1 ? "text-emerald-600" : ""}
                    >
                      {word}{i < arr.length - 1 ? ' ' : ''}
                    </span>
                  ))}
                </span>
              </h2>
              
              {/* Decorative underline with gradient */}
              <div className="relative mt-6 mb-8">
                <div className="h-1 w-24 bg-gradient-to-r from-emerald-500 to-emerald-300 rounded-full"></div>
                <div className="h-1 w-16 bg-gradient-to-r from-emerald-300 to-emerald-100 rounded-full mt-1 ml-4"></div>
              </div>
            </div>
            
            {/* Subtitle with elegant styling */}
            <div className="relative">
              <p className="text-lg md:text-xl text-slate-600 leading-relaxed max-w-2xl pl-1">
                {subtitle}
              </p>
              
              {/* Subtle decorative elements */}
              <div className="flex items-center gap-4 mt-8">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
                  <div className="w-8 h-0.5 bg-emerald-200 rounded-full"></div>
                  <div className="w-3 h-3 bg-emerald-400 rounded-full"></div>
                  <div className="w-8 h-0.5 bg-emerald-200 rounded-full"></div>
                  <div className="w-3 h-3 bg-emerald-300 rounded-full"></div>
                </div>
                <span className="text-sm font-medium text-slate-500 tracking-wider">
                  Featured Collections
                </span>
              </div>
            </div>
          </div>
          
          {isPaginated && totalPages > 1 && (
            <div className="flex-shrink-0">
              <div className="flex items-center gap-2">
                <div className="text-sm text-slate-500 mr-4">
                  <span className="font-medium">{currentPage + 1}</span>
                  <span className="mx-1">/</span>
                  <span className="text-slate-400">{totalPages}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    onClick={() => setCurrentPage((p) => Math.max(p - 1, 0))}
                    disabled={currentPage === 0}
                    size="icon"
                    variant="outline"
                    className="rounded-full h-11 w-11 border-slate-200 bg-white/80 backdrop-blur-sm text-slate-600 hover:bg-white hover:border-slate-300 hover:shadow-md disabled:opacity-30 transition-all duration-200 hover:scale-105"
                  >
                    <ArrowLeft className="w-5 h-5" />
                  </Button>
                  <Button
                    onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages - 1))}
                    disabled={currentPage >= totalPages - 1}
                    size="icon"
                    variant="outline"
                    className="rounded-full h-11 w-11 border-slate-200 bg-white/80 backdrop-blur-sm text-slate-600 hover:bg-white hover:border-slate-300 hover:shadow-md disabled:opacity-30 transition-all duration-200 hover:scale-105"
                  >
                    <ArrowRight className="w-5 h-5" />
                  </Button>
                </div>
              </div>
              
              {/* Pagination dots */}
              <div className="flex justify-center gap-1.5 mt-4">
                {Array.from({ length: totalPages }).map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentPage(i)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      i === currentPage 
                        ? 'bg-emerald-500 w-6' 
                        : 'bg-slate-300 hover:bg-slate-400'
                    }`}
                    aria-label={`Go to page ${i + 1}`}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            className={getGridColumns()}
            variants={carouselVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {currentCategories.map((category, index) => (
              <motion.div 
                key={category.id} 
                className={getCardWidthClass()}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <Link 
                  href={`/gallery?category=${categoryType}&subcategory=${category.id}`} 
                  className="group block h-full"
                >
                  <motion.div 
                    className={`bg-white overflow-hidden shadow-sm transition-all duration-300 group-hover:shadow-xl h-full flex flex-col border border-slate-200 hover:border-slate-300 ${getCardBorderRadius()}`}
                    whileHover={{ y: -5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <div className={`relative ${getAspectRatioClass()} overflow-hidden ${getImageBorderRadius()}`}>
                      <Image
                        src={category.exampleImage}
                        alt={category.name}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
                      
                      {/* Category badge */}
                      <div className="absolute top-4 right-4">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-white/90 backdrop-blur-sm text-slate-700">
                          {category.count} items
                        </span>
                      </div>
                    </div>
                    
                    <div className={`flex-grow flex flex-col ${
                      categoryType === "tiles" && displayMode === "tile-grid" 
                        ? "p-5"
                        : "p-6"
                    }`}>
                      <div className="flex items-center justify-between mb-2">
                        <h3 className={`font-semibold ${
                          categoryType === "tiles" && displayMode === "tile-grid" 
                            ? "text-lg text-slate-900"
                            : "text-xl text-slate-800"
                        }`}>
                          {category.name}
                        </h3>
                        
                        {/* Arrow indicator */}
                        <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-emerald-500 transition-colors duration-300 group-hover:translate-x-1" />
                      </div>
                      
                      {shouldShowExtraInfo() && (
                        <p className="text-sm text-slate-500 mt-1">{category.count} Products</p>
                      )}
                      
                      {shouldShowExtraInfo() && (
                        <div className="mt-auto pt-4">
                          <div className="inline-flex items-center font-semibold text-emerald-700 group-hover:text-emerald-600 transition-colors">
                            View Collection
                            <ArrowRight className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
                          </div>
                        </div>
                      )}
                    </div>
                  </motion.div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}