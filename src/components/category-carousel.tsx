"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Sparkles, Zap, TrendingUp, Star } from "lucide-react";

type Category = {
  id: string;
  name: string;
  count: number;
  exampleImage: string;
  description?: string;
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
      return "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8";
    }
    return "flex flex-wrap justify-center gap-8";
  };

  const getCardWidthClass = () => {
    if (displayMode === "tile-grid") {
      return "w-full";
    }
    return "w-full md:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.333rem)]";
  };

  const getAspectRatioClass = () => {
    if (categoryType === "tiles" && displayMode === "tile-grid") {
      return "aspect-[16/11]";
    }
    return imageAspectRatio;
  };

  const getCardBorderRadius = () => {
    if (categoryType === "tiles" && displayMode === "tile-grid") {
      return "rounded-xl";
    }
    return "rounded-2xl";
  };

  const getImageBorderRadius = () => {
    if (categoryType === "tiles" && displayMode === "tile-grid") {
      return "rounded-xl";
    }
    return "rounded-t-2xl";
  };

  const getCategoryDescription = (categoryId: string): string => {
    const descriptions: Record<string, string> = {
      "border-tiles": "Kitchen is the area where staining is the common problem, we recommend to use stain free & scratch free floor tiles and easy to clean wall or dado tiles. Generally, people extend their living room floor tiles to get a seamless look.",
      "high-gloss-3d-emboss-poster-tiles": "High gloss 3D emboss tiles add depth and dimension to your walls with reflective surfaces that enhance light and create visual interest.",
      "gvt-wall-&-floor-border-tiles": "GVT border tiles offer durable and stylish solutions for both walls and floors with high-resolution digital printing and protective layers.",
      "golden-silver-highlighter": "Golden and silver highlighters add luxury accents to your space with metallic finishes that catch and reflect light beautifully.",
      "gvt-rangoli": "Rangoli patterned tiles bring traditional Indian art to modern interiors with vibrant colors and intricate geometric designs.",
      "kitchen-colorfull-poster": "Colorful kitchen poster tiles transform your cooking space with artistic designs that are both functional and visually striking."
    };
    
    return descriptions[categoryId] || "Discover our premium collection of tiles that combine functionality with aesthetic appeal.";
  };

  // Check if this is a tile category that should have special styling
  const isTileSection = categoryType === "tiles";

  return (
    <div className="w-full">
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
              <div 
                key={category.id} 
                className={`${getCardWidthClass()} flex flex-col group relative`}
              >
                {/* Floating Sparkles Effect (Only for Tiles) */}
                {isTileSection && (
                  <>
                    <motion.div
                      className="absolute -top-2 -right-2 z-20"
                      initial={{ scale: 0, rotate: 0 }}
                      whileHover={{ scale: 1, rotate: 360 }}
                      transition={{ type: "spring", stiffness: 200 }}
                    >
                      <div className="bg-gradient-to-r from-amber-400 to-amber-600 p-1.5 rounded-full shadow-lg">
                        <Star className="w-4 h-4 text-white" />
                      </div>
                    </motion.div>
                    
                    <motion.div
                      className="absolute -bottom-2 -left-2 z-20"
                      initial={{ scale: 0, rotate: 0 }}
                      whileHover={{ scale: 1, rotate: -360 }}
                      transition={{ type: "spring", stiffness: 200, delay: 0.1 }}
                    >
                      <div className="bg-gradient-to-r from-emerald-400 to-emerald-600 p-1.5 rounded-full shadow-lg">
                        <TrendingUp className="w-4 h-4 text-white" />
                      </div>
                    </motion.div>
                  </>
                )}

                {/* Card Container */}
                <Link 
                  href={`/gallery?category=${categoryType}&subcategory=${category.id}`} 
                  className="block flex-grow relative"
                >
                  {/* Glow Effect on Hover (Only for Tiles) */}
                  {isTileSection && (
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-amber-500/20 via-emerald-500/20 to-blue-500/20 rounded-xl blur-xl opacity-0 group-hover:opacity-70 transition-all duration-700 -z-10"
                      whileHover={{ scale: 1.05 }}
                    />
                  )}

                  <motion.div 
                    className={`relative bg-white overflow-hidden shadow-lg transition-all duration-500 hover:shadow-2xl h-full flex flex-col border border-slate-100 hover:border-emerald-300 ${getCardBorderRadius()} ${
                      isTileSection ? 'hover:border-amber-300' : ''
                    }`}
                    initial={{ opacity: 0, y: 30, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ 
                      duration: 0.6, 
                      delay: index * 0.1,
                      type: "spring",
                      stiffness: 100,
                      damping: 12
                    }}
                    whileHover={{ 
                      y: -8,
                      scale: isTileSection ? 1.03 : 1.02,
                      transition: { type: "spring", stiffness: 300, damping: 15 }
                    }}
                  >
                    {/* Floating Badge with Animation (Only for Tiles) */}
                    {isTileSection && (
                      <motion.div
                        className="absolute top-3 right-3 z-10"
                        initial={{ y: -20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: index * 0.1 + 0.3 }}
                        whileHover={{ scale: 1.2, rotate: 5 }}
                      >
                        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-lg">
                          <Sparkles className="w-3 h-3" />
                          {category.count} Items
                        </span>
                      </motion.div>
                    )}

                    {/* Image Container with Hover Overlay */}
                    <div className={`relative ${getAspectRatioClass()} overflow-hidden ${getImageBorderRadius()}`}>
                      {/* Image with enhanced hover effect */}
                      <motion.div 
                        className="relative w-full h-full"
                        whileHover={{ scale: isTileSection ? 1.15 : 1.1 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                      >
                        <Image
                          src={category.exampleImage}
                          alt={category.name}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                        
                        {/* Animated Gradient Overlay */}
                        {isTileSection && (
                          <motion.div
                            className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"
                            initial={{ opacity: 0.3 }}
                            whileHover={{ opacity: 0.1 }}
                            transition={{ duration: 0.4 }}
                          />
                        )}
                      </motion.div>
                      
                      {/* Hover Overlay - Appears IMMEDIATELY on image hover (Only for Tiles) */}
                      {isTileSection && (
                        <motion.div 
                          className="absolute inset-0 bg-white/95 flex flex-col p-6 cursor-pointer"
                          initial={{ opacity: 0 }}
                          whileHover={{ opacity: 1 }}
                          transition={{ duration: 0.3 }}
                        >
                          <div className="h-full flex flex-col">
                            {/* Name and Description Container - Appears Together */}
                            <motion.div
                              className="flex-grow flex flex-col"
                              initial={{ y: 0, opacity: 0 }}
                              whileHover={{ y: 0, opacity: 1 }}
                              transition={{ duration: 0.3, delay: 0 }}
                            >
                              {/* Category Title */}
                              <div className="mb-4">
                                <h3 className="text-xl font-bold pb-3 border-b border-slate-200 text-red-600 flex items-center gap-2">
                                  <Zap className="w-5 h-5 text-amber-500" />
                                  {category.name}
                                </h3>
                              </div>
                              
                              {/* Description - Appears right below title */}
                              <div className="flex-grow overflow-y-auto pr-1">
                                <p className="text-base leading-relaxed whitespace-pre-line text-slate-700">
                                  {getCategoryDescription(category.id)}
                                </p>
                              </div>
                            </motion.div>
                            
                            {/* Button at bottom */}
                            <motion.div
                              className="mt-4"
                              initial={{ y: 10, opacity: 0 }}
                              whileHover={{ y: 0, opacity: 1 }}
                              transition={{ duration: 0.3, delay: 0.1 }}
                            >
                              <span className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-red-500 to-red-600 text-white font-semibold text-sm rounded-lg hover:from-red-600 hover:to-red-700 transition-all duration-300 shadow-lg hover:shadow-xl">
                                Explore Now
                                <ArrowRight className="w-4 h-4 ml-1" />
                              </span>
                            </motion.div>
                          </div>
                        </motion.div>
                      )}
                    </div>
                    
                    {/* Card Footer - ONLY FOR MARVEL SECTION */}
                    {!isTileSection && (
                      <div className={`flex-grow flex flex-col p-5`}>
                        <div className="flex items-center justify-between">
                          <h3 className="text-lg font-medium text-slate-800 transition-colors duration-300">
                            {category.name}
                          </h3>
                          
                          <ArrowRight className="w-3 h-3 text-slate-400 group-hover:text-emerald-500 transition-all duration-300 group-hover:translate-x-1" />
                        </div>
                        
                        <p className="text-xs text-slate-500 mt-1 transition-colors duration-300">
                          {category.count} Products
                        </p>
                        
                        <div className="mt-auto pt-3">
                          <div className="inline-flex items-center text-sm font-medium text-emerald-600 group-hover:text-emerald-700 transition-colors duration-300">
                            View Collection
                            <ArrowRight className="w-3 h-3 ml-1 transition-transform duration-300 group-hover:translate-x-1" />
                          </div>
                        </div>
                      </div>
                    )}
                  </motion.div>
                </Link>
                
                {/* Static Category Name BELOW the Card - ONLY FOR TILES SECTION */}
                {isTileSection && (
                  <div 
                    className="mt-4 text-center"
                  >
                    <h3 className="text-lg font-semibold text-slate-800">
                      {category.name}
                    </h3>
                    
                    {/* Static underline */}
                    <div className="h-0.5 bg-gradient-to-r from-amber-400 via-red-500 to-emerald-500 mt-2 rounded-full w-16 mx-auto" />
                  </div>
                )}
              </div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}