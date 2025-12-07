"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Sparkles, Zap, TrendingUp, Star, Palette, Layout, Gem } from "lucide-react";

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
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

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
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        duration: 0.5,
        staggerChildren: 0.1
      } 
    },
    exit: { opacity: 0, y: -20, transition: { duration: 0.3 } },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { 
        duration: 0.6,
        type: "spring" as const,
        stiffness: 100,
        damping: 12
      }
    }
  };

  const getGridColumns = () => {
    if (displayMode === "tile-grid") {
      return "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8";
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
      return "aspect-[4/3]";
    }
    return imageAspectRatio;
  };

  const getCardBorderRadius = () => {
    if (categoryType === "tiles" && displayMode === "tile-grid") {
      return "rounded-2xl";
    }
    return "rounded-2xl";
  };

  const getImageBorderRadius = () => {
    if (categoryType === "tiles" && displayMode === "tile-grid") {
      return "rounded-t-2xl";
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

  const getCategoryIcon = (categoryId: string) => {
    const icons: Record<string, React.ReactNode> = {
      "border-tiles": <Layout className="w-4 h-4" />,
      "high-gloss-3d-emboss-poster-tiles": <Sparkles className="w-4 h-4" />,
      "gvt-wall-&-floor-border-tiles": <Gem className="w-4 h-4" />,
      "golden-silver-highlighter": <Star className="w-4 h-4" />,
      "gvt-rangoli": <Palette className="w-4 h-4" />,
      "kitchen-colorfull-poster": <Zap className="w-4 h-4" />
    };
    return icons[categoryId] || <Star className="w-4 h-4" />;
  };

  const isTileSection = categoryType === "tiles";

  // Your specified bronze color palette
  const bronzeColors = {
    primary: "#F3C77B", // Main bronze
    light: "#F8DAA3",   // Lighter bronze
    dark: "#D8B168",    // Darker bronze - Used for Explore Collection button
    darker: "#B89655",  // Even darker for depth
    darkest: "#8C7542", // Deep bronze
    glow: "rgba(243, 199, 123, 0.3)",
    lightGlow: "rgba(243, 199, 123, 0.1)",
    background: "rgba(243, 199, 123, 0.05)"
  };

  return (
    <div className="w-full py-8">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header for Tiles - Updated with your bronze colors */}
        {isTileSection && (
          <div className="text-center mb-10 md:mb-12">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              
            </motion.div>
          </div>
        )}

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
                className={`${getCardWidthClass()} group relative`}
                variants={cardVariants}
                onMouseEnter={() => setHoveredCard(category.id)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                {/* Animated Background Gradient - Updated with your bronze colors */}
                {isTileSection && (
                  <motion.div
                    className="absolute inset-0 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 -z-10"
                    style={{
                      background: `radial-gradient(circle at 30% 20%, ${bronzeColors.glow}, transparent 70%)`
                    }}
                    initial={false}
                    animate={{
                      scale: hoveredCard === category.id ? 1.05 : 1,
                      opacity: hoveredCard === category.id ? 1 : 0
                    }}
                    transition={{ duration: 0.5 }}
                  />
                )}

                {/* Card Container */}
                <Link 
                  href={`/gallery?category=${categoryType}&subcategory=${category.id}`} 
                  className="block relative"
                >
                  <motion.div 
                    className={`relative bg-white overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 h-full flex flex-col border-2 ${
                      isTileSection 
                        ? 'border-white rounded-2xl bg-gradient-to-b from-white to-bronze-50/30' 
                        : 'border-slate-100 hover:border-emerald-300 rounded-2xl'
                    }`}
                    style={isTileSection ? {
                      borderColor: hoveredCard === category.id ? `${bronzeColors.light}40` : 'white'
                    } : {}}
                    whileHover={{ 
                      y: isTileSection ? -6 : -4,
                      transition: { 
                        type: "spring", 
                        stiffness: 300, 
                        damping: 15 
                      }
                    }}
                  >
                    {/* Image Container with Floating Effects */}
                    <div className={`relative ${getAspectRatioClass()} overflow-hidden ${getImageBorderRadius()}`}>
                      {/* Background Pattern for Tiles - Updated with your bronze colors */}
                      {isTileSection && (
                        <motion.div 
                          className="absolute inset-0 opacity-10"
                          animate={{
                            backgroundPosition: hoveredCard === category.id ? "100% 100%" : "0% 0%"
                          }}
                          transition={{ duration: 10 }}
                          style={{
                            backgroundImage: `radial-gradient(circle at 25% 25%, ${bronzeColors.primary} 2px, transparent 2px)`,
                            backgroundSize: '40px 40px'
                          }}
                        />
                      )}
                      
                      {/* Main Image */}
                      <motion.div 
                        className="relative w-full h-full"
                        animate={{
                          scale: hoveredCard === category.id ? (isTileSection ? 1.1 : 1.05) : 1
                        }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                      >
                        <Image
                          src={category.exampleImage}
                          alt={category.name}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                        
                        {/* Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
                        
                        {/* Bronze Accent Overlay */}
                        {isTileSection && (
                          <motion.div 
                            className="absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity duration-500"
                            style={{
                              background: `linear-gradient(45deg, transparent 30%, ${bronzeColors.glow} 70%, transparent 100%)`
                            }}
                            animate={{
                              backgroundPosition: hoveredCard === category.id ? '200% 200%' : '0% 0%'
                            }}
                            transition={{ duration: 2 }}
                          />
                        )}
                      </motion.div>
                      
                      {/* Quick View Overlay for Tiles */}
                      {isTileSection && (
                        <motion.div 
                          className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent flex items-center justify-center cursor-pointer"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: hoveredCard === category.id ? 1 : 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <motion.div
                            className="text-white text-center p-6"
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ 
                              y: hoveredCard === category.id ? 0 : 20, 
                              opacity: hoveredCard === category.id ? 1 : 0 
                            }}
                            transition={{ duration: 0.3 }}
                          >
                            <div className="mb-4">
                              <motion.div
                                animate={{ rotate: hoveredCard === category.id ? 360 : 0 }}
                                transition={{ duration: 0.8 }}
                              >
                                <Sparkles 
                                  className="w-8 h-8 mx-auto mb-2" 
                                  style={{ color: bronzeColors.primary }} 
                                />
                              </motion.div>
                              <h3 className="text-xl font-bold mb-2">Quick Preview</h3>
                              <p className="text-sm text-gray-200">
                                Click to explore full collection
                              </p>
                            </div>
                          </motion.div>
                        </motion.div>
                      )}
                    </div>
                    
                    {/* Content Section - Enhanced for Tiles */}
                    <div className={`flex-grow flex flex-col ${isTileSection ? 'p-5' : 'p-5'}`}>
                      {/* Category Header */}
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            {isTileSection && (
                              <motion.div
                                className="p-2 rounded-lg"
                                style={{
                                  background: `linear-gradient(135deg, ${bronzeColors.background}, white)`,
                                  border: `1px solid ${bronzeColors.primary}20`
                                }}
                                animate={{
                                  rotate: hoveredCard === category.id ? 360 : 0,
                                  scale: hoveredCard === category.id ? 1.1 : 1
                                }}
                                transition={{ duration: 0.5 }}
                              >
                                {getCategoryIcon(category.id)}
                              </motion.div>
                            )}
                            <h3 
                              className={`font-bold ${
                                isTileSection 
                                  ? 'text-lg md:text-xl' 
                                  : 'text-lg text-slate-800'
                              }`}
                              style={isTileSection ? { color: bronzeColors.darker } : {}}
                            >
                              {category.name}
                            </h3>
                          </div>
                          
                          {/* Description Preview for Tiles */}
                          {isTileSection && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ 
                                height: hoveredCard === category.id ? 'auto' : 0,
                                opacity: hoveredCard === category.id ? 1 : 0
                              }}
                              transition={{ duration: 0.3 }}
                              className="overflow-hidden"
                            >
                              <p className="text-sm text-gray-600 line-clamp-2 mt-2">
                                {getCategoryDescription(category.id)}
                              </p>
                            </motion.div>
                          )}
                        </div>
                        
                        {/* Arrow Icon - Updated with your bronze colors */}
                        <motion.div
                          animate={{
                            x: hoveredCard === category.id ? 5 : 0,
                            scale: hoveredCard === category.id ? 1.2 : 1
                          }}
                          transition={{ duration: 0.3 }}
                        >
                          <ArrowRight 
                            className={`w-4 h-4 ${
                              isTileSection 
                                ? '' 
                                : 'text-slate-400 group-hover:text-emerald-500'
                            }`} 
                            style={isTileSection ? { color: bronzeColors.darker } : {}}
                          />
                        </motion.div>
                      </div>
                      
                      {/* Action Button - UPDATED: Using dark bronze (#D8B168) for Explore Collection button */}
                      <motion.div
                        className="mt-auto"
                        animate={{
                          y: hoveredCard === category.id ? 0 : 10,
                          opacity: hoveredCard === category.id ? 1 : isTileSection ? 0.8 : 1
                        }}
                      >
                        <div 
                          className={`inline-flex items-center justify-center w-full py-3 rounded-lg font-medium transition-all duration-300 relative overflow-hidden ${
                            isTileSection
                              ? 'text-white hover:shadow-lg'
                              : 'text-emerald-600 hover:text-emerald-700 border border-emerald-200 hover:border-emerald-300'
                          }`}
                        >
                          {isTileSection && (
                            <>
                              <motion.div 
                                className="absolute inset-0"
                                style={{
                                  // Using dark bronze (#D8B168) as the main color
                                  backgroundColor: bronzeColors.dark
                                }}
                                animate={{
                                  backgroundColor: hoveredCard === category.id 
                                    ? bronzeColors.darker // Slightly darker on hover
                                    : bronzeColors.dark
                                }}
                                transition={{ duration: 0.3 }}
                              />
                              <motion.div
                                className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-300"
                                style={{
                                  background: `linear-gradient(135deg, ${bronzeColors.darker}, ${bronzeColors.darkest})`
                                }}
                              />
                            </>
                          )}
                          <span className="relative z-10 flex items-center justify-center gap-2">
                            Explore Collection
                            {!isTileSection && (
                              <ArrowRight className="w-3 h-3 ml-2" />
                            )}
                            {isTileSection && hoveredCard === category.id && (
                              <motion.div
                                initial={{ x: -5, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ duration: 0.3 }}
                              >
                                <ArrowRight className="w-4 h-4" />
                              </motion.div>
                            )}
                          </span>
                        </div>
                      </motion.div>
                    </div>
                    
                    {/* Bronze Decorative Border */}
                    {isTileSection && (
                      <motion.div 
                        className="absolute inset-0 rounded-2xl pointer-events-none"
                        style={{
                          boxShadow: hoveredCard === category.id 
                            ? `0 0 0 1px ${bronzeColors.primary}40 inset`
                            : 'none'
                        }}
                        transition={{ duration: 0.3 }}
                      />
                    )}
                  </motion.div>
                </Link>
                
                {/* Bronze Corner Accents - Updated with your colors */}
                {isTileSection && (
                  <>
                    {/* Top Left Corner */}
                    <motion.div
                      className="absolute top-0 left-0 w-12 h-12 -mt-3 -ml-3"
                      animate={{
                        rotate: hoveredCard === category.id ? 180 : 0
                      }}
                      transition={{ duration: 0.5 }}
                    >
                      <div 
                        className="w-full h-full border-t-2 border-l-2 rounded-tl-lg"
                        style={{ borderColor: bronzeColors.light }}
                      />
                    </motion.div>
                    
                    {/* Bottom Right Corner */}
                    <motion.div
                      className="absolute bottom-0 right-0 w-12 h-12 -mb-3 -mr-3"
                      animate={{
                        rotate: hoveredCard === category.id ? 180 : 0
                      }}
                      transition={{ duration: 0.5 }}
                    >
                      <div 
                        className="w-full h-full border-b-2 border-r-2 rounded-br-lg"
                        style={{ borderColor: bronzeColors.darker }}
                      />
                    </motion.div>
                    
                    {/* Bronze Badge */}
                    <motion.div
                      className="absolute -top-2 -right-2 z-20"
                      animate={{
                        scale: hoveredCard === category.id ? 1.1 : 1,
                        rotate: hoveredCard === category.id ? [0, 15, -15, 0] : 0
                      }}
                      transition={{ duration: 0.5 }}
                    >
                      <div className="relative">
                        <div 
                          className="w-8 h-8 rounded-full flex items-center justify-center"
                          style={{
                            background: `linear-gradient(135deg, ${bronzeColors.primary}, ${bronzeColors.darker})`
                          }}
                        >
                          <Star className="w-4 h-4 text-white" />
                        </div>
                        <div 
                          className="absolute inset-0 rounded-full animate-ping opacity-20"
                          style={{ backgroundColor: bronzeColors.primary }}
                        />
                      </div>
                    </motion.div>
                  </>
                )}
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Pagination Dots for Tiles - Updated with your bronze colors */}
        {isTileSection && totalPages > 1 && (
          <div className="flex justify-center items-center gap-3 mt-10">
            <button
              onClick={() => setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages)}
              className="p-2 rounded-full hover:bg-bronze-50 transition-colors duration-300"
              style={{ '--tw-bg-opacity': 0.1 } as React.CSSProperties}
              aria-label="Previous page"
            >
              <ArrowLeft 
                className="w-5 h-5" 
                style={{ color: bronzeColors.darker }} 
              />
            </button>
            
            <div className="flex items-center gap-2">
              {Array.from({ length: totalPages }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentPage(index)}
                  className="flex items-center justify-center"
                  aria-label={`Go to page ${index + 1}`}
                >
                  <motion.div
                    className="rounded-full transition-all duration-300"
                    style={{
                      width: currentPage === index ? '32px' : '8px',
                      height: '8px',
                      backgroundColor: currentPage === index ? bronzeColors.dark : `${bronzeColors.dark}30` // Using dark bronze here too
                    }}
                    whileHover={{
                      backgroundColor: currentPage === index ? bronzeColors.darker : `${bronzeColors.dark}60`,
                      scale: 1.2
                    }}
                  />
                </button>
              ))}
            </div>
            
            <button
              onClick={() => setCurrentPage((prev) => (prev + 1) % totalPages)}
              className="p-2 rounded-full hover:bg-bronze-50 transition-colors duration-300"
              style={{ '--tw-bg-opacity': 0.1 } as React.CSSProperties}
              aria-label="Next page"
            >
              <ArrowRight 
                className="w-5 h-5" 
                style={{ color: bronzeColors.darker }} 
              />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}