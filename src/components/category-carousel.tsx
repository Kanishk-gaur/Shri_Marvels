"use client";

import { useState, useEffect } from "react"; // 💡 MODIFIED: Added useEffect
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
  isPaginated?: boolean; // New prop to control pagination
}

const DEFAULT_ITEMS_PER_PAGE = 3;
const SHOW_ALL_ITEMS_PER_PAGE = 999; // A large number to display all items

export function CategoryCarousel({ 
  title, 
  subtitle, 
  categories, 
  categoryType, 
  imageAspectRatio = "aspect-[16/10]",
  isPaginated = false 
}: CategoryCarouselProps) {
  const [currentPage, setCurrentPage] = useState(0);

  // Determine the number of items per page based on the prop
  const itemsPerPage = isPaginated ? DEFAULT_ITEMS_PER_PAGE : SHOW_ALL_ITEMS_PER_PAGE;
  
  const totalPages = Math.ceil(categories.length / itemsPerPage);
  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentCategories = categories.slice(startIndex, endIndex);

  // 🚀 NEW CODE: Auto-scrolling logic
  useEffect(() => {
    // Only enable auto-scrolling if pagination is on and there is more than one page
    if (isPaginated && totalPages > 1) {
      const scrollInterval = setInterval(() => {
        setCurrentPage((prevPage) => {
          // Increment the page, and use modulo (%) to loop back to the first page (0) 
          // when the current page is the last one.
          const nextPage = (prevPage + 1) % totalPages;
          return nextPage;
        });
      }, 3000); // Scroll every 2000 milliseconds (2 seconds)

      // Cleanup function: Clear the interval when the component unmounts or dependencies change
      return () => clearInterval(scrollInterval);
    }
    // Dependency array: totalPages is included because the modulo operation depends on it
  }, [isPaginated, totalPages]); 
  // 🔚 END NEW CODE
  
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
          
          {/* Only render navigation controls if pagination is enabled and there's more than one page */}
          {isPaginated && totalPages > 1 && (
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
          )}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            // MODIFIED: Use flex and justify-center to allow last row centering
            className="flex flex-wrap justify-center gap-8"
            variants={carouselVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {currentCategories.map((category) => {
              // Set the width for each card to mimic the original 3-column grid structure
              const cardWidthClass = "w-full md:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.333rem)]";

              return (
                // Use a standard div wrapper to control the width for Flexbox
                <div key={category.id} className={cardWidthClass}>
                  <Link 
                    href={`/gallery?category=${categoryType}&subcategory=${category.id}`} 
                    className="group block h-full"
                  >
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
                </div>
              );
            })}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}