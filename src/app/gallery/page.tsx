"use client";

import { useState, useMemo, useEffect, useCallback, useRef } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Filter, X } from "lucide-react";
import GalleryCard from "@/components/gallery-card";
import { allProducts, categories, Product } from "@/data";
import { Button } from "@/components/ui/button";
import { useSearchParams } from "next/navigation";
import { FilterChips } from "@/components/filter-chips";
import { ProductFilter } from "@/components/product-filter";

// --- START: Lookup Map based on processed data ---
// Create a map from the slug/id (which is based on the raw name) to the new display name.
const subcategoryNameMap = new Map<string, string>();
[...categories.tiles, ...categories.marvel].forEach(cat => {
    // The ID holds the slug of the original subcategory, and the name holds the new display name.
    subcategoryNameMap.set(cat.id, cat.name);
});

// Function to convert the raw subcategory name (found in allProducts) to the display name.
const getDisplayName = (rawSubcategory: string): string => {
    // Convert raw name to slug/id to perform the lookup
    const id = rawSubcategory.toLowerCase().replace(/ /g, "-");
    return subcategoryNameMap.get(id) || rawSubcategory; // Fallback to raw name if no mapping is found
};

// Use the structure of the already sorted categories to sort the product grouping keys.
const subcategorySortKeys = [...categories.tiles, ...categories.marvel].map(cat => cat.name);

// --- END: Lookup Map based on processed data ---


export default function GalleryPage() {
  const searchParams = useSearchParams();
  const observer = useRef<IntersectionObserver | null>(null);

  const [selectedMainCategory, setSelectedMainCategory] = useState<
    "all" | "marvel" | "tiles"
  >("all");
  const [selectedSubcategory, setSelectedSubcategory] = useState<string | null>(
    null
  );
  const [activeProductFilter, setActiveProductFilter] = useState<{
    category: "marvel" | "tiles";
    subcategory: string; // This holds the ID/slug
    size: string;
  } | null>(null);

  const [visibleGroups, setVisibleGroups] = useState<string[]>([]);

  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const category =
      (searchParams.get("category") as "all" | "marvel" | "tiles") || "all";
    const subcategory = searchParams.get("subcategory");
    const size = searchParams.get("size");

    setSelectedMainCategory(category);

    if (category !== "all" && subcategory && size) {
      setActiveProductFilter({ category, subcategory, size });
      setSelectedSubcategory(null);
    } else {
      setSelectedSubcategory(subcategory);
      setActiveProductFilter(null);
    }
  }, [searchParams]);

  const groupedProducts = useMemo(() => {
    let products = allProducts;

    // Filter logic remains the same (uses product.subcategory which holds the original raw name)
    if (activeProductFilter) {
      products = products.filter(
        (p) =>
          p.category === activeProductFilter.category &&
          p.subcategory.toLowerCase().replace(/ /g, "-") ===
            activeProductFilter.subcategory &&
          p.sizes.some(size => size.toLowerCase() === activeProductFilter.size.toLowerCase())
      );
    } else {
      if (selectedMainCategory !== "all") {
        products = products.filter((p) => p.category === selectedMainCategory);
      }
      if (selectedSubcategory) {
        products = products.filter(
          (p) =>
            p.subcategory.toLowerCase().replace(/ /g, "-") ===
            selectedSubcategory
        );
      }
    }

    const grouped: { [key: string]: Product[] } = {};
    products.forEach((product) => {
      product.sizes.forEach((size) => {
        // --- FIX IS HERE: USE THE DISPLAY NAME for the Group Key ---
        const displayName = getDisplayName(product.subcategory);
        const groupKey = `${displayName} (${size}")`; 
        
        if (!grouped[groupKey]) {
          grouped[groupKey] = [];
        }
        grouped[groupKey].push(product);
      });
    });

    for (const groupKey in grouped) {
      grouped[groupKey].sort((a, b) =>
        a.name.localeCompare(b.name, undefined, { numeric: true })
      );
    }

    return grouped;
  }, [selectedMainCategory, selectedSubcategory, activeProductFilter]);

  // Use the new simplified sorting logic
  const allSortedGroupKeys = useMemo(() => {
    const allKeys = Object.keys(groupedProducts);

    const sortSizes = (a: string, b: string) => {
        const numA = parseInt(a, 10);
        const numB = parseInt(b, 10);
        if (isNaN(numA)) return 1;
        if (isNaN(numB)) return -1;
        return numA - numB;
    };
    
    // Sort keys primarily by the sorted display name order, then by size
    return allKeys.sort((a, b) => {
      const matchA = a.match(/^(.*?) \((.*?)\"?\)$/);
      const matchB = b.match(/^(.*?) \((.*?)\"?\)$/);
      
      const subcatA = matchA ? matchA[1] : a;
      const sizeA = matchA ? matchA[2] : "";
      
      const subcatB = matchB ? matchB[1] : b;
      const sizeB = matchB ? matchB[2] : "";
      
      const indexA = subcategorySortKeys.indexOf(subcatA);
      const indexB = subcategorySortKeys.indexOf(subcatB);

      if (indexA !== indexB) {
        // Sort by subcategory display name order based on the pre-sorted array
        // We use || 999 to push non-matching/new categories to the end.
        return (indexA === -1 ? 999 : indexA) - (indexB === -1 ? 999 : indexB);
      }

      // If same subcategory, sort by size
      return sortSizes(sizeA, sizeB);
    });
  }, [groupedProducts]);

  const handleClearAllFilters = () => {
    setSelectedMainCategory("all");
    setSelectedSubcategory(null);
    setActiveProductFilter(null);
  };

  const handleMainCategorySelect = (category: "all" | "marvel" | "tiles") => {
    setSelectedMainCategory(category);
    setSelectedSubcategory(null);
    setActiveProductFilter(null);
  };

  const handleSubcategorySelect = (subcategory: string | null) => {
    setSelectedSubcategory(subcategory);
    setActiveProductFilter(null);
  };

  const handleProductFilterSelect = (
    category: "marvel" | "tiles",
    subcategory: string,
    size: string
  ) => {
    setActiveProductFilter({ category, subcategory, size });
    setSelectedMainCategory(category);
    setSelectedSubcategory(null);
  };

  const loadMoreProducts = useCallback(() => {
    if (loading) return;
    setLoading(true);

    // Use the pre-sorted list of keys
    const nextGroupKeys = allSortedGroupKeys.slice(
      visibleGroups.length,
      visibleGroups.length + 1
    );

    if (nextGroupKeys.length > 0) {
      setVisibleGroups((prev) => [...prev, ...nextGroupKeys]);
    } else {
      setHasMore(false);
    }

    setLoading(false);
  }, [loading, allSortedGroupKeys, visibleGroups]);

  const lastElementRef = useCallback(
    (node: HTMLDivElement) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          loadMoreProducts();
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore, loadMoreProducts]
  );

  useEffect(() => {
    // Reset visible groups whenever the filtered list changes
    setVisibleGroups(allSortedGroupKeys.slice(0, 1)); // Start with the first group
    setHasMore(allSortedGroupKeys.length > 1);
  }, [allSortedGroupKeys]);

  const filterChipCategories = useMemo(() => {
    if (selectedMainCategory === "marvel") return categories.marvel;
    if (selectedMainCategory === "tiles") return categories.tiles;
    
    // Combine and return the already correctly sorted categories from the initial data processing
    return [...categories.tiles, ...categories.marvel];
  }, [selectedMainCategory]);

  const isFilterActive =
    selectedMainCategory !== "all" ||
    selectedSubcategory !== null ||
    activeProductFilter !== null;

  const hasProducts = Object.keys(groupedProducts).length > 0;

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
        <div className="sticky top-16 z-40 bg-orange-50/80 backdrop-blur-md rounded-2xl shadow-lg p-4 border border-zinc-200/80 mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:gap-6">
            <div className="flex items-center flex-wrap gap-4 mb-4 lg:mb-0 lg:flex-nowrap">
              <div className="flex items-center space-x-2 bg-zinc-200/60 rounded-lg p-1">
                <Button
                  onClick={() => handleMainCategorySelect("all")}
                  variant="ghost"
                  className={`flex-1 px-3 sm:px-4 py-2 rounded-md text-sm ${
                    selectedMainCategory === "all"
                      ? "bg-white shadow text-zinc-800"
                      : "text-zinc-600 hover:bg-white/70"
                  }`}
                >
                  All
                </Button>
                <Button
                  onClick={() => handleMainCategorySelect("marvel")}
                  variant="ghost"
                  className={`flex-1 px-3 sm:px-4 py-2 rounded-md text-sm ${
                    selectedMainCategory === "marvel"
                      ? "bg-white shadow text-zinc-800"
                      : "text-zinc-600 hover:bg-white/70"
                  }`}
                >
                  Marvel
                </Button>
                <Button
                  onClick={() => handleMainCategorySelect("tiles")}
                  variant="ghost"
                  className={`flex-1 px-3 sm:px-4 py-2 rounded-md text-sm ${
                    selectedMainCategory === "tiles"
                      ? "bg-white shadow text-zinc-800"
                      : "text-zinc-600 hover:bg-white/70"
                  }`}
                >
                  Tiles
                </Button>
              </div>
              <div className="flex-shrink-0">
                <ProductFilter
                  onFilterSelect={handleProductFilterSelect}
                  selectedFilter={activeProductFilter}
                  mainCategory={selectedMainCategory}
                />
              </div>
              {isFilterActive && (
                <Button
                  onClick={handleClearAllFilters}
                  variant="ghost"
                  className="flex-shrink-0 flex items-center space-x-2 text-red-600 hover:bg-red-50 hover:text-red-700"
                >
                  <X className="w-4 h-4" />
                  <span>Clear</span>
                </Button>
              )}
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

        <main>
          <motion.div
            className="mt-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            {hasProducts ? (
              visibleGroups.map((groupKey, groupIndex) => (
                <div key={groupKey} className="mb-12">
                  <h2 className="text-xl sm:text-3xl font-bold text-zinc-800 mb-6 pb-2 border-b-2 border-zinc-300">
                    {groupKey}
                  </h2>
                  <div className="grid grid-cols-24 sm:grid-cols-24 gap-4 grid-flow-dense">
                    {Array.isArray(groupedProducts[groupKey]) &&
                      groupedProducts[groupKey].map((product, index) => (
                        <GalleryCard
                          key={`${product.id}-${index}`}
                          product={product}
                          index={index}
                          priority={groupIndex === 0 && index < 10}
                        />
                      ))}
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-20">
                <div className="w-24 h-24 mx-auto mb-6 bg-zinc-200 rounded-full flex items-center justify-center">
                  <Filter className="w-12 h-12 text-zinc-400" />
                </div>
                <h3 className="text-2xl font-semibold text-zinc-700 mb-2">
                  No items found
                </h3>
                <p className="text-zinc-500 mb-6">
                  Try adjusting your filters to see more results.
                </p>
                <Button
                  onClick={handleClearAllFilters}
                  className="bg-zinc-800 text-white font-semibold py-2 px-6 rounded-lg hover:bg-zinc-700"
                >
                  Clear All Filters
                </Button>
              </div>
            )}
          </motion.div>
          <div ref={lastElementRef}></div>
          {loading && (
            <div className="text-center py-10">
              <div className="w-8 h-8 border-4 border-zinc-200 border-t-zinc-500 rounded-full animate-spin mx-auto"></div>
              <p className="text-zinc-500 mt-2">Loading...</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}