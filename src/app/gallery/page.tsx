"use client";

import { useState, useMemo, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Filter, Loader } from "lucide-react";
import { GalleryCard } from "@/components/gallery-card";
import { allProducts, categories, Product, sizes as allSizes } from "@/data";
import { Button } from "@/components/ui/button";
import { useSearchParams } from "next/navigation";
import { FilterChips } from "@/components/filter-chips";
import { SizeFilter } from "@/components/size-filter";

const ITEMS_PER_PAGE = 12;

type SubCategoryInfo = {
  id: string;
  name: string;
};

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

  const [sortBy, setSortBy] = useState<"name" | "rating">("name");
  
  const [displayedProducts, setDisplayedProducts] = useState<Product[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

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

  useEffect(() => {
    setPage(1);
    const newProducts = filteredAndSortedProducts.slice(0, ITEMS_PER_PAGE);
    setDisplayedProducts(newProducts);
    setHasMore(filteredAndSortedProducts.length > ITEMS_PER_PAGE);
  }, [filteredAndSortedProducts]);

  const loadMoreProducts = useCallback(() => {
    if (isLoading || !hasMore) return;

    setIsLoading(true);
    setTimeout(() => {
      const nextPage = page + 1;
      const newProducts = filteredAndSortedProducts.slice(
        0,
        nextPage * ITEMS_PER_PAGE
      );

      setDisplayedProducts(newProducts);
      setPage(nextPage);
      setHasMore(newProducts.length < filteredAndSortedProducts.length);
      setIsLoading(false);
    }, 500);
  }, [page, hasMore, isLoading, filteredAndSortedProducts]);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 200
      ) {
        loadMoreProducts();
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loadMoreProducts]);

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
    <div className="min-h-screen bg-gradient-to-br from-[#EFE2C8] to-[#E7DFC9] pt-16">
      <motion.div
        className="p-6 flex items-center justify-between"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <Link href="/">
          <motion.button
            className="flex items-center space-x-2 text-[#5C4421] hover:text-[#84632e] transition-colors"
            whileHover={{ x: -5 }}
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Home</span>
          </motion.button>
        </Link>
        <div className="text-center">
          <h1 className="text-3xl font-bold text-[#5C4421]">Our Full Gallery</h1>
          <p className="text-[#84632e]">Explore all our products</p>
        </div>
        <div className="w-32"></div>
      </motion.div>

      <div className="max-w-screen-2xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Left Sidebar for Filters */}
          <aside className="lg:col-span-1">
            <div className="sticky top-24">
              <SizeFilter 
                sizes={availableSizes} 
                selectedSizes={selectedSizes}
                onSizeChange={handleSizeChange}
                onClear={() => setSelectedSizes([])}
              />
            </div>
          </aside>

          {/* Main Content */}
          <main className="lg:col-span-3">
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 space-y-4 md:space-y-0">
                <div className="flex items-center space-x-2">
                  <h2 className="text-xl font-semibold text-[#5C4421]">
                    Products
                  </h2>
                  <span className="text-[#84632e]">
                    ({filteredAndSortedProducts.length} items)
                  </span>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2 bg-white/60 rounded-lg p-1">
                    <Button onClick={() => handleMainCategorySelect("all")} variant="ghost" className={`px-3 py-1.5 rounded-md text-sm ${selectedMainCategory === "all" ? "bg-white shadow text-[#5C4421]" : "text-[#84632e] hover:bg-white/70"}`}>All</Button>
                    <Button onClick={() => handleMainCategorySelect("marvel")} variant="ghost" className={`px-3 py-1.5 rounded-md text-sm ${selectedMainCategory === "marvel" ? "bg-white shadow text-[#5C4421]" : "text-[#84632e] hover:bg-white/70"}`}>Marvel</Button>
                    <Button onClick={() => handleMainCategorySelect("tiles")} variant="ghost" className={`px-3 py-1.5 rounded-md text-sm ${selectedMainCategory === "tiles" ? "bg-white shadow text-[#5C4421]" : "text-[#84632e] hover:bg-white/70"}`}>Tiles</Button>
                  </div>
                  <select value={sortBy} onChange={(e) => setSortBy(e.target.value as "name" | "rating")} className="bg-white/60 border border-slate-300 text-[#5C4421] rounded-lg px-3 py-2 text-sm focus:ring-emerald-500">
                    <option value="name">Sort by Name</option>
                    <option value="rating">Highest Rated</option>
                  </select>
                </div>
              </div>
              <FilterChips
                categories={filterChipCategories}
                selectedCategory={selectedSubcategory}
                onCategorySelect={setSelectedSubcategory}
              />
            </motion.div>

            <motion.div
              className="mt-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              {displayedProducts.length > 0 ? (
                <>
                  <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
                    {displayedProducts.map((product, index) => (
                      <GalleryCard
                        key={`${product.id}-${index}`}
                        product={product}
                        index={index}
                      />
                    ))}
                  </div>
                  {isLoading && (
                    <div className="flex justify-center items-center py-8">
                      <Loader className="w-8 h-8 text-[#84632e] animate-spin" />
                    </div>
                  )}
                </>
              ) : (
                <div className="text-center py-20">
                  <div className="w-24 h-24 mx-auto mb-6 bg-white/60 rounded-full flex items-center justify-center">
                    <Filter className="w-12 h-12 text-[#84632e]/50" />
                  </div>
                  <h3 className="text-2xl font-semibold text-[#5C4421] mb-2">No items found</h3>
                  <p className="text-[#84632e] mb-6">Try adjusting your filters to see more results.</p>
                  <Button onClick={() => { setSelectedMainCategory("all"); setSelectedSubcategory(null); setSelectedSizes([]); }} className="bg-gradient-to-r from-[#B79962] to-[#F3C77B] text-white font-semibold py-2 px-6 rounded-lg">
                    Clear All Filters
                  </Button>
                </div>
              )}
            </motion.div>
          </main>
        </div>
      </div>
    </div>
  );
}