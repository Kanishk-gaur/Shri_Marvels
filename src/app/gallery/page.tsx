"use client";

import { useState, useMemo, useEffect, useCallback, useRef } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Filter, X } from "lucide-react";
import GalleryCard from "@/components/gallery-card";
import { allProducts, categories, Product } from "@/data";
import { Button } from "@/components/ui/button";
import { useSearchParams, useRouter } from "next/navigation";
import { FilterChips } from "@/components/filter-chips";
import { ProductFilter } from "@/components/product-filter";

// --- START: Lookup Map based on processed data (KEEP) ---
const subcategoryNameMap = new Map<string, string>();
[...categories.tiles, ...categories.marvel].forEach((cat) => {
  subcategoryNameMap.set(cat.id, cat.name);
});

const getDisplayName = (rawSubcategory: string): string => {
  const id = rawSubcategory.toLowerCase().replace(/ /g, "-");
  return subcategoryNameMap.get(id) || rawSubcategory;
};

const subcategorySortKeys = [...categories.tiles, ...categories.marvel].map(
  (cat) => cat.name
);

// --- END: Lookup Map based on processed data ---

// ---------------------------------------------------------------------
// --- START: Size Mapping (KEEP) ---
const sizeDisplayNames: Record<string, string> = {
  "600x900 mm (24x36 inch)": "2x3",
  "900x600 mm (36x24 inch)": "3x2",
  "200x300 mm (8x12 inch)": "8x12,12x18",
  "300x200 mm (12x8 inch)": "12x8,18x12",
  "600x1200 mm": "2x4",

  // New entries for high gloss diamond
  "200x300 mm": "8x12,12x18",
  "300x200 mm": "12x8,18x12",
  "600x600 mm (23.6x23.6 inch)": "2x2",
  "600x600 mm": "2x2",
  "600x900 mm": "2x3",
  "900x600 mm": "3x2",
  "1200x600 mm": "4x2",
  "600x1200 mm (24x48 inch)": "2x4",
  "1200x600 mm (48x24 inch)": "4x2",

  // New entry
  "18x12 inch": "18x12, 3x2, 4x2",

  // New entry for GVT posters
  "24x24 inch": "2x2",

  // New entries for inch sizes
  "8x6": "6x8",
  "8x12 in": "8x12",
  "12x18 inches": "12x18",
  "12x8 in": "12x8",

  // New entries for 8x12
  "8x12": "8x12, 6x6, 12x18",
  "8x12 inches": "2x2",

  // New entries for millimeter sizes
  "10x600 mm (0.39x23.6 inch)": "10x600",
  "10x450 mm (0.39x17.7 inch)": "10x450",
  "12x600 mm (0.47x23.6 inch)": "12x600",
  "12x1200 mm (0.47x47.2 inch)": "12x1200",
  "20x600 mm (0.79x23.6 inch)": "20x600",
  "20x1200 mm (0.79x47.2 inch)": "20x1200",
  "25x600 mm (0.98x23.6 inch)": "25x600",
  "40x600 mm (1.57x23.6 inch)": "40x600",
  "45x600 mm (1.77x23.6 inch)": "45x600",
  "48x600 mm (1.89x23.6 inch)": "48x600",
  "300x63 mm (12x2.5 inch)": "12x2.5",

  // New entries
  "4x48": "48x4",
  "6x48": "48x6",

  // New entries for specific products
  "300x600 mm (11.8x23.6 inch)": "24x12",
  "300x450 mm (11.8x17.7 inch)": "18x12",
  "(Sugar)300x600 mm (11.8x23.6 inch)": "(Sugar)24x12",
  "(GLUE)300x600 mm (11.8x23.6 inch)": "(GLUE)24x12",
  "Polishing Series 300x600 mm (12x24 inch)": "Polishing Series 24x12",

  // New entries
  "4x6": "6x4",
  "400x600 mm (16x24 inch)": "6x4",
  "600x600 mm (24x24 inch)": "2x2",
  "1200x1200 mm (48x48 inch)": "4x4",
  "6x36(w)": "6x36 ,9x36,12x36",
  "(God)6x36": "(God)6x36 ,9x36 ,12x36",
  "6x36 in (c)": "6x36",
  "6x36 in": "2 Soot",
  "6x36": "6x36 ,9x36,12x36",
};
// NEW REVERSE LOOKUP MAP: Maps the display name (lowercase and trimmed) back to the raw size name.
const rawSizeLookupMap = new Map<string, string>();
Object.entries(sizeDisplayNames).forEach(([rawSize, displayName]) => {
  // Added .trim() for robustness
  rawSizeLookupMap.set(displayName.toLowerCase().trim(), rawSize);
});

// Function to convert the raw size name (used in allProducts) to the display name.
const getSizeDisplayName = (rawSize: string): string => {
  return sizeDisplayNames[rawSize] || rawSize;
};

// Function to get the raw size for filtering (handles display name or raw name input)
const getRawSizeForFilter = (selectedSize: string): string => {
  // Added .trim() to the selected size before lookup
  const lookupKey = selectedSize.toLowerCase().trim();
  const rawSize = rawSizeLookupMap.get(lookupKey);
  return rawSize || selectedSize; // If lookup fails, returns the input string (which works for unmapped sizes)
};
// --- END: Size Mapping ---
// ---------------------------------------------------------------------

export default function GalleryPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const observer = useRef<IntersectionObserver | null>(null);

  // Derive filter state directly from URL query parameters
  const selectedMainCategory =
    (searchParams.get("category") as "all" | "marvel" | "tiles") || "all";
  const selectedSubcategory = searchParams.get("subcategory") || null;

  // Consolidate the specific product/size filter from the URL
  const activeProductFilter = useMemo(() => {
    const category =
      (searchParams.get("category") as "marvel" | "tiles") || null;
    const subcategory = searchParams.get("subcategory") || null;
    const size = searchParams.get("size") || null;

    if (category && subcategory && size) {
      return { category, subcategory, size };
    }
    return null;
  }, [searchParams]);

  const [visibleGroups, setVisibleGroups] = useState<string[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  // Function to update the URL for Main Category selection
  const handleMainCategorySelect = (category: "all" | "marvel" | "tiles") => {
    const params = new URLSearchParams();
    if (category !== "all") {
      params.set("category", category);
    }
    // Navigate to the clean URL, implicitly clearing subcategory and size filters
    router.push(`/gallery?${params.toString()}`);
  };

  // Function to update the URL for Subcategory selection
  const handleSubcategorySelect = (subcategory: string | null) => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("size"); // Always clear granular product filter when selecting a subcategory chip

    if (subcategory) {
      params.set("subcategory", subcategory);
    } else {
      params.delete("subcategory");
    }

    // Ensure the main category filter remains if it was set
    if (!params.get("category") && selectedMainCategory !== "all") {
      params.set("category", selectedMainCategory);
    }

    router.push(`/gallery?${params.toString()}`);
  };

  // Function to clear all filters by navigating to a clean URL
  const handleClearAllFilters = () => {
    router.push("/gallery");
  };

  const groupedProducts = useMemo(() => {
    let products = allProducts;

    // 1. Filter by specific Product/Size filter first (highest priority, driven by URL params)
    if (activeProductFilter) {
      const rawSizeToFilter = getRawSizeForFilter(activeProductFilter.size);

      products = products.filter(
        (p) =>
          p.category === activeProductFilter.category &&
          p.subcategory.toLowerCase().replace(/ /g, "-") ===
            activeProductFilter.subcategory &&
          p.sizes.some(
            (size) => size.toLowerCase() === rawSizeToFilter.toLowerCase()
          )
      );
    }
    // 2. Otherwise, filter by Main Category and then Subcategory (chips/URL params)
    else {
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
        // Group Key still uses Subcategory Display Name + Raw Size (for stable sorting)
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
        return (indexA === -1 ? 999 : indexA) - (indexB === -1 ? 999 : indexB);
      }

      // If same subcategory, sort by size
      return sortSizes(sizeA, sizeB);
    });
  }, [groupedProducts]);

  const loadMoreProducts = useCallback(() => {
    if (loading) return;
    setLoading(true);

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

  // Reset visible groups whenever the filtered list changes
  useEffect(() => {
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
              {/* Main Category Buttons - Now controlling the URL state */}
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

              {/* RE-ADDING ProductFilter in the gallery page filter bar */}
              <div className="flex-shrink-0">
                <ProductFilter buttonText="Filter By Name/Size" />
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
              {/* Filter Chips - Now controlling the URL state */}
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
                    {/* Display logic: uses the raw size to look up the display size for the heading */}
                    {(() => {
                      const match = groupKey.match(/^(.*?) \((.*?)\"?\)$/);
                      if (!match) return groupKey;

                      const subcategory = match[1];
                      const rawSize = match[2];

                      const displaySize = getSizeDisplayName(rawSize);

                      return `${subcategory} (${displaySize})`;
                    })()}
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
