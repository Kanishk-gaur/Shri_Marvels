"use client";

import { useState, useMemo, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Filter } from "lucide-react";
import GalleryCard from "@/components/gallery-card";
import { allProducts, categories, Product, sizes as allSizes } from "@/data";
import { Button } from "@/components/ui/button";
import { useSearchParams } from "next/navigation";
import { FilterChips } from "@/components/filter-chips"; 
import { SizeFilter } from "@/components/size-filter";

type SubCategoryInfo = {
  id: string;
  name: string;
};

// Helper function to group products by subcategory
const groupProductsBySubcategory = (products: Product[]) => {
  const grouped: { [subcategory: string]: Product[] } = {};
  products.forEach((product) => {
    if (!grouped[product.subcategory]) {
      grouped[product.subcategory] = [];
    }
    grouped[product.subcategory].push(product);
  });
  return grouped;
};

const ITEMS_PER_PAGE = 50;

export default function GalleryPage() {
  const searchParams = useSearchParams();

  const initialMainCategory =
    (searchParams.get("category") as "all" | "marvel" | "tiles") || "all";
  const initialSubcategory = searchParams.get("subcategory") || null;

  const [selectedMainCategory, setSelectedMainCategory] = useState<
    "all" | "marvel" | "tiles"
  >(initialMainCategory);
  const [selectedSubcategory, setSelectedSubcategory] = useState<string | null>(
    initialSubcategory
  );
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [visibleProducts, setVisibleProducts] = useState<Product[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const [sortBy] = useState<"name" | "rating">("name");

  const availableSizes = useMemo(() => {
    if (selectedMainCategory === "marvel") return allSizes.marvel;
    if (selectedMainCategory === "tiles") return allSizes.tiles;
    const combined = [...allSizes.marvel, ...allSizes.tiles];
    return [...new Set(combined)].sort((a, b) => parseInt(a) - parseInt(b));
  }, [selectedMainCategory]);
  
  const filteredAndSortedProducts = useMemo(() => {
    let productsToFilter = allProducts;

    if (selectedMainCategory === "marvel") {
      productsToFilter = allProducts.filter((p) => p.category === "marvel");
    } else if (selectedMainCategory === "tiles") {
      productsToFilter = allProducts.filter((p) => p.category === "tiles");
    }

    const filtered = productsToFilter
      .filter((product: Product) => {
        if (!selectedSubcategory) return true;
        return (
          product.subcategory.toLowerCase().replace(/ /g, "-") ===
          selectedSubcategory
        );
      })
      .filter((product: Product) => {
        if (selectedSizes.length === 0) return true;
        return product.sizes.some(size => selectedSizes.includes(size));
      });

    return filtered.sort((a, b) => {
      switch (sortBy) {
        case "rating":
          return b.rating - a.rating;
        default:
          return a.name.localeCompare(b.name);
      }
    });
  }, [selectedMainCategory, selectedSubcategory, sortBy, selectedSizes]);

  const loadMoreProducts = useCallback(() => {
    const startIndex = (page - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const newProducts = filteredAndSortedProducts.slice(startIndex, endIndex);
    
    if (newProducts.length > 0) {
      setVisibleProducts(prev => [...prev, ...newProducts]);
      setPage(prev => prev + 1);
    }
    
    if (endIndex >= filteredAndSortedProducts.length) {
      setHasMore(false);
    }
  }, [page, filteredAndSortedProducts]);

  useEffect(() => {
    setVisibleProducts([]);
    setPage(1);
    setHasMore(true);
  }, [selectedMainCategory, selectedSubcategory, selectedSizes]);

  useEffect(() => {
    if (page === 1 && hasMore) {
      loadMoreProducts();
    }
  }, [page, hasMore, loadMoreProducts]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + document.documentElement.scrollTop < document.documentElement.offsetHeight - 500 || !hasMore) {
        return;
      }
      loadMoreProducts();
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loadMoreProducts, hasMore]);

  const groupedBySubcategory = useMemo(() => {
    const grouped: { [subcategory: string]: Product[] } = {};
    visibleProducts.forEach((product) => {
      if (!grouped[product.subcategory]) {
        grouped[product.subcategory] = [];
      }
      grouped[product.subcategory].push(product);
    });
    return grouped;
  }, [visibleProducts]);

  const handleMainCategorySelect = (category: "all" | "marvel" | "tiles") => {
    setSelectedMainCategory(category);
    setSelectedSubcategory(null);
  };

  const handleSizeChange = (size: string) => {
    setSelectedSizes(prev => 
      prev.includes(size) 
        ? prev.filter(s => s !== size) 
        : [...prev, size]
    );
  };

  const handleSubcategorySelect = (category: string | null) => {
    setSelectedSubcategory(category);
  }
  
  const filterChipCategories = useMemo(() => {
    let currentCategories: SubCategoryInfo[] = [];

    if (selectedMainCategory === "marvel") {
      currentCategories = categories.marvel;
    } else if (selectedMainCategory === "tiles") {
      currentCategories = categories.tiles;
    } else {
      const combinedSubcategories = [
        ...categories.marvel,
        ...categories.tiles,
      ];
      const uniqueSubcategories = Array.from(
        new Set(combinedSubcategories.map((c) => c.id))
      ).map((id) => combinedSubcategories.find((c) => c.id === id)!);
      currentCategories = uniqueSubcategories;
    }
    return currentCategories;
  }, [selectedMainCategory]);

  return (
    <div className="min-h-screen bg-orange-50 pt-16">
      <motion.div
        className="relative flex items-center justify-center p-4 sm:p-6"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <div className="absolute left-4 sm:left-6">
          <Link href="/">
            <motion.button
              className="flex items-center space-x-2 text-zinc-600 hover:text-zinc-900 transition-colors"
              whileHover={{ x: -5 }}
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="hidden sm:inline">Back to Home</span>
            </motion.button>
          </Link>
        </div>
        <div className="text-center">
          <h1 className="text-2xl font-bold text-zinc-800 sm:text-3xl">
            Our Full Gallery
          </h1>
          <p className="text-sm text-zinc-500 sm:text-base">
            Explore all our products
          </p>
        </div>
      </motion.div>

      <div className="max-w-screen-2xl mx-auto px-6 py-8">
        {/* Filter Bar */}
        <div className="sticky top-16 z-40 bg-orange-50/80 backdrop-blur-md rounded-2xl shadow-lg p-4 border border-zinc-200/80 mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:gap-6">
            <div className="flex items-center flex-wrap gap-4 mb-4 lg:mb-0 lg:flex-nowrap">
              <div className="flex items-center space-x-2 bg-zinc-200/60 rounded-lg p-1">
                <Button onClick={() => handleMainCategorySelect("all")} variant="ghost" className={`flex-1 px-3 sm:px-4 py-2 rounded-md text-sm ${selectedMainCategory === "all" ? "bg-white shadow text-zinc-800" : "text-zinc-600 hover:bg-white/70"}`}>All</Button>
                <Button onClick={() => handleMainCategorySelect("marvel")} variant="ghost" className={`flex-1 px-3 sm:px-4 py-2 rounded-md text-sm ${selectedMainCategory === "marvel" ? "bg-white shadow text-zinc-800" : "text-zinc-600 hover:bg-white/70"}`}>Marvel</Button>
                <Button onClick={() => handleMainCategorySelect("tiles")} variant="ghost" className={`flex-1 px-3 sm:px-4 py-2 rounded-md text-sm ${selectedMainCategory === "tiles" ? "bg-white shadow text-zinc-800" : "text-zinc-600 hover:bg-white/70"}`}>Tiles</Button>
              </div>
              <div className="flex-shrink-0">
                <SizeFilter
                  sizes={availableSizes}
                  selectedSizes={selectedSizes}
                  onSizeChange={handleSizeChange}
                  onClear={() => setSelectedSizes([])}
                />
              </div>
            </div>
            <div className="flex-grow overflow-x-auto">
              <FilterChips
                categories={filterChipCategories}
                selectedCategory={selectedSubcategory}
                onCategorySelect={handleSubcategorySelect}
              />
            </div>
          </div>
        </div>

        {/* Main Content */}
        <main>
          <motion.div
            className="mt-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            {Object.keys(groupedBySubcategory).length > 0 ? (
              Object.keys(groupedBySubcategory)
                .sort()
                .map((subcategory) => {
                  const productsInSubcategory = groupedBySubcategory[subcategory];
                  const subcategorySizes = Array.from(new Set(productsInSubcategory.flatMap(p => p.sizes))).sort((a,b) => parseInt(a) - parseInt(b));

                  return (
                  <div key={subcategory} className="mb-12">
                    <h2 className="text-3xl font-bold text-zinc-800 mb-6 pb-2 border-b-2 border-zinc-300">
                      {subcategory} <span className="text-lg font-medium text-emerald-600">({subcategorySizes.map(s => `${s}"`).join(', ')})</span>
                    </h2>
                    <div className="grid grid-cols-24 gap-4 grid-flow-dense">
                      {productsInSubcategory.map((product, index) => (
                          <GalleryCard
                            key={`${product.id}-${index}`}
                            product={product}
                            index={index}
                          />
                      ))}
                    </div>
                  </div>
                )})
            ) : (
              <div className="text-center py-20">
                <div className="w-24 h-24 mx-auto mb-6 bg-zinc-200 rounded-full flex items-center justify-center">
                  <Filter className="w-12 h-12 text-zinc-400" />
                </div>
                <h3 className="text-2xl font-semibold text-zinc-700 mb-2">No items found</h3>
                <p className="text-zinc-500 mb-6">Try adjusting your filters to see more results.</p>
                <Button onClick={() => { setSelectedMainCategory("all"); setSelectedSubcategory(null); setSelectedSizes([]); }} className="bg-zinc-800 text-white font-semibold py-2 px-6 rounded-lg hover:bg-zinc-700">
                  Clear All Filters
                </Button>
              </div>
            )}
          </motion.div>
          {hasMore && (
            <div className="text-center py-10">
              <p className="text-zinc-500">Loading more products...</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}