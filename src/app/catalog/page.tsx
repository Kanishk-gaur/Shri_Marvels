"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Trash2, FileText, Loader2, ArrowLeft, Bookmark, Edit2 } from "lucide-react"; 
import { Button } from "@/components/ui/button";
import { useCatalog, CatalogItem, transformProductSizes } from "@/context/CatalogContext";
import { SizeSelectionDialog } from "@/components/size-selection-dialog";

// --- START: Synchronized Size Mapping from Gallery ---
const sizeDisplayNames: Record<string, string> = { 
  "600x900 mm (24x36 inch)": "2x3",
  "900x600 mm (36x24 inch)": "3x2",
  "200x300 mm (8x12 inch)": "8x12,12x18",
  "300x200 mm (12x8 inch)": "12x8,18x12",
  "600x1200 mm": "2x4",
  "200x300 mm": "8x12,12x18",
  "300x200 mm": "12x8,18x12",
  "600x600 mm (23.6x23.6 inch)": "2x2",
  "600x600 mm": "2x2",
  "600x900 mm": "2x3",
  "900x600 mm": "3x2",
  "1200x600 mm": "4x2",
  "600x1200 mm (24x48 inch)": "2x4",
  "1200x600 mm (48x24 inch)": "4x2",
  "1200x1200 mm (48x48 inch)": "4x4",
  "18x12 inch": "18x12, 3x2, 4x2",
  "24x24 inch": "2x2",
  "8x6": "6x8",
  "8x12 in": "8x12",
  "12x18 inches": "12x18",
  "12x8 in": "12x8",
  "8x12": "8x12, 6x6, 12x18",
  "8x12 inches": "2x2",
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
  "4x48": "48x4",
  "6x48": "48x6",
  "300x600 mm (11.8x23.6 inch)": "24x12",
  "300x450 mm (11.8x17.7 inch)": "18x12",
  "(Sugar)300x600 mm (11.8x23.6 inch)": "(Sugar)24x12",
  "(GLUE)300x600 mm (11.8x23.6 inch)": "(GLUE)24x12",
  "Polishing Series 300x600 mm (12x24 inch)": "Polishing Series 24x12",
  "4x6": "6x4",
  "400x600 mm (16x24 inch)": "6x4",
  "600x600 mm (24x24 inch)": "2x2",
  "6x36(w)": "6x36 ,9x36,12x36",
  "(God)6x36": "(God)6x36 ,9x36 ,12x36",
  "6x36 in (c)": "6x36",
  "6x36 in": "2 Soot",
  "6x36": "6x36 ,9x36,12x36",
};

const getSizeDisplayName = (rawSize: string): string => sizeDisplayNames[rawSize] || rawSize;

// --- REPLICATED MASONRY GRID LOGIC FROM GALLERY-CARD ---
const getGridSpanClass = (sizeString: string) => {
  switch (sizeString) {
    case "8x12, 12x18, 18x24, 2x2, 2x3, 2x4" : return  "col-span-12 row-span-20 md:col-span-8 md:row-span-12 lg:col-span-6 lg:row-span-37"; 
    case "(POLISHED)12x24": return "col-span-8 row-span-8 md:col-span-6 md:row-span-12 lg:col-span-4 lg:row-span-11";
    case "18x12/8x12": return "col-span-8 row-span-8 md:col-span-6 md:row-span-12 lg:col-span-4 lg:row-span-14";
    case "12x18/12x8": return "col-span-6 row-span-11 md:col-span-4 md:row-span-13 lg:col-span-3 lg:row-span-20";
    case "400x600 mm (16x24 inch)": return "col-span-12 row-span-8 md:col-span-3 md:row-span-6 lg:col-span-8 lg:row-span-18";
    case "(LUSTER)12x24": return "col-span-12 row-span-9 md:col-span-3 md:row-span-6 lg:col-span-4 lg:row-span-11";
    case "(SUGAR)12x24": return "col-span-12 row-span-9 md:col-span-3 md:row-span-6 lg:col-span-4 lg:row-span-11";
    case "(Sugar)300x600 mm (11.8x23.6 inch)": return "col-span-12 row-span-8 md:col-span-8 md:row-span-12 lg:col-span-6 lg:row-span-14";
    case "(GLUE)300x600 mm (11.8x23.6 inch)": return "col-span-12 row-span-8 md:col-span-8 md:row-span-12 lg:col-span-6 lg:row-span-14";
    case "300x63 mm (12x2.5 inch)": return "col-span-24 row-span-26 md:col-span-8 md:row-span-12 lg:col-span-6 lg:row-span-8";
    case "Polishing Series 300x600 mm (12x24 inch)": return "col-span-12 row-span-8 md:col-span-8 md:row-span-12 lg:col-span-6 lg:row-span-14";
    case "600x1200 mm (24x48 inch)": return "col-span-12 row-span-25 md:col-span-8 md:row-span-12 lg:col-span-4 lg:row-span-32";
    case "300x600 mm (11.8x23.6 inch)": return "col-span-12 row-span-8 md:col-span-8 md:row-span-12 lg:col-span-6 lg:row-span-14";
    case "300x450 mm (11.8x17.7 inch)": return "col-span-12 row-span-10 md:col-span-8 md:row-span-12 lg:col-span-6 lg:row-span-16";
    case "48x600 mm (1.89x23.6 inch)": return "col-span-24 row-span-5 md:col-span-8 md:row-span-12 lg:col-span-8 lg:row-span-7";
    case "45x600 mm (1.77x23.6 inch)": return "col-span-24 row-span-5 md:col-span-8 md:row-span-12 lg:col-span-8 lg:row-span-7";
    case "40x600 mm (1.57x23.6 inch)": return "col-span-24 row-span-5 md:col-span-8 md:row-span-12 lg:col-span-8 lg:row-span-7";
    case "25x600 mm (0.98x23.6 inch)": return "col-span-24 row-span-5 md:col-span-8 md:row-span-12 lg:col-span-8 lg:row-span-6";
    case "20x600 mm (0.79x23.6 inch)": return "col-span-24 row-span-5 md:col-span-8 md:row-span-12 lg:col-span-8 lg:row-span-5";
    case "10x600 mm (0.39x23.6 inch)": return "col-span-24 row-span-4 md:col-span-2 md:row-span-12 lg:col-span-8 lg:row-span-4";
    case "900x600 mm": return "col-span-24 row-span-18 md:col-span-8 md:row-span-12 lg:col-span-8 lg:row-span-23";
    case "900x600 mm (36x24 inch)": return "col-span-24 row-span-18 md:col-span-8 md:row-span-12 lg:col-span-8 lg:row-span-23";
    case "24x24 inch": return "col-span-12 row-span-14 md:col-span-8 md:row-span-12 lg:col-span-6 lg:row-span-25";
    case "600x600 mm": return "col-span-12 row-span-14 md:col-span-8 md:row-span-12 lg:col-span-6 lg:row-span-25";
    case "600x600 mm (23.6x23.6 inch)": return "col-span-12 row-span-14 md:col-span-8 md:row-span-12 lg:col-span-6 lg:row-span-25";
    case "600x900 mm": return "col-span-12 row-span-20 md:col-span-8 md:row-span-12 lg:col-span-4 lg:row-span-25";
    case "600x900 mm (24x36 inch)": return "col-span-12 row-span-19 md:col-span-8 md:row-span-12 lg:col-span-6 lg:row-span-36";
    case "1200x600 mm": return "col-span-12 row-span-8 md:col-span-8 md:row-span-12 lg:col-span-8 lg:row-span-18";
    case "1200x600 mm (48x24 inch)": return "col-span-12 row-span-8 md:col-span-8 md:row-span-12 lg:col-span-8 lg:row-span-18";
    case "20x1200 mm (0.79x47.2 inch)": return "col-span-24 row-span-5 md:col-span-8 md:row-span-12 lg:col-span-8 lg:row-span-7";
    case "12x600 mm (0.47x23.6 inch)": return "col-span-24 row-span-4 md:col-span-8 md:row-span-12 lg:col-span-8 lg:row-span-4";
    case "12x1200 mm (0.47x47.2 inch)": return "col-span-24 row-span-5 md:col-span-8 md:row-span-12 lg:col-span-8 lg:row-span-5";
    case "10x450 mm (0.39x17.7 inch)": return "col-span-24 row-span-5 md:col-span-2 md:row-span-12 lg:col-span-8 lg:row-span-5";
    case "1200x1800 mm (48x72 inch)": return "col-span-12 row-span-11 md:col-span-8 md:row-span-12 lg:col-span-12 lg:row-span-34";
    case "600x600 mm (24x24 inch)": return "col-span-12 row-span-13 md:col-span-8 md:row-span-12 lg:col-span-6 lg:row-span-25";
    case "1200x1200 mm (48x48 inch)": return "col-span-12 row-span-13 md:col-span-8 md:row-span-12 lg:col-span-6 lg:row-span-25";
    case "4x2 in": return "col-span-24 row-span-14 md:col-span-8 md:row-span-12 lg:col-span-6 lg:row-span-15";
    case "2x4 in": return "col-span-12 row-span-8 md:col-span-13 md:row-span-10 lg:col-span-6 lg:row-span-15";
    case "12x8 in": return "col-span-8 row-span-7 md:col-span-6 md:row-span-12 lg:col-span-4 lg:row-span-12";
    case "(God)6x36": return "col-span-12 row-span-8 md:col-span-4 md:row-span-10 lg:col-span-8 lg:row-span-12";
    case "6x36 in (c)": return "col-span-12 row-span-8 md:col-span-4 md:row-span-10 lg:col-span-12 lg:row-span-10";
    case "6x36 ,9x36,12x36": return "col-span-12 row-span-8 md:col-span-4 md:row-span-10 lg:col-span-12 lg:row-span-15";
    case "6x36(w)": return "col-span-12 row-span-8 md:col-span-4 md:row-span-10 lg:col-span-12 lg:row-span-11";
    case "9x36": return "col-span-12 row-span-8 md:col-span-4 md:row-span-10 lg:col-span-8 lg:row-span-10";
    case "6x36": return "col-span-12 row-span-8 md:col-span-4 md:row-span-10 lg:col-span-12 lg:row-span-14";
    case "6x36 in": return "col-span-12 row-span-6 md:col-span-8 md:row-span-6 lg:col-span-8 lg:row-span-7";
    case "18x12 inch": return "col-span-12 row-span-10 md:col-span-6 md:row-span-12 lg:col-span-4 lg:row-span-12";
    case "12x18 mm": return "col-span-6 row-span-11 md:col-span-4 md:row-span-16 lg:col-span-3 lg:row-span-20";
    case "12x18 inches": return "col-span-8 row-span-14 md:col-span-4 md:row-span-15 lg:col-span-3 lg:row-span-20";
    case "12x18 in": return "col-span-6 row-span-11 md:col-span-4 md:row-span-13 lg:col-span-3 lg:row-span-20";
    case "8x12 in": return "col-span-6 row-span-10 md:col-span-4 md:row-span-16 lg:col-span-3 lg:row-span-19";
    case "12x18": return "col-span-12 row-span-10 md:col-span-4 md:row-span-9 lg:col-span-4 lg:row-span-13";
    case "8x6": return "col-span-4 row-span-7 md:col-span-4 md:row-span-16 lg:col-span-4 lg:row-span-25";
    case "20x600": return "col-span-24 row-span-5 md:col-span-6 md:row-span-5 lg:col-span-8 lg:row-span-6";
    case "10x600": return "col-span-24 row-span-5 md:col-span-6 md:row-span-5 lg:col-span-8 lg:row-span-5";
    case "900x300 mm": return "col-span-12 row-span-9 md:col-span-6 md:row-span-9 lg:col-span-4 lg:row-span-12";
    case "1200x300 mm": return "col-span-12 row-span-10 md:col-span-6 md:row-span-9 lg:col-span-6 lg:row-span-12";
    case "1000x300 mm": return "col-span-12 row-span-9 md:col-span-6 md:row-span-8 lg:col-span-6 lg:row-span-17";
    case "6x48": return "col-span-12 row-span-4 md:col-span-6 md:row-span-6 lg:col-span-12 lg:row-span-7";
    case "4x48": return "col-span-12 row-span-4 md:col-span-8 md:row-span-5 lg:col-span-12 lg:row-span-6";
    case "4x2": return "col-span-6 row-span-13 md:col-span-4 md:row-span-20 lg:col-span-4 lg:row-span-33";
    case "600x1200 mm": return "col-span-12 row-span-25 md:col-span-6 md:row-span-28 lg:col-span-4 lg:row-span-33";
    case "2x4": return "col-span-12 row-span-25 md:col-span-6 md:row-span-28 lg:col-span-4 lg:row-span-33";
    case "4x6": return "col-span-12 row-span-10 md:col-span-6 md:row-span-12 lg:col-span-6 lg:row-span-17";
    case "4x4": return "col-span-12 row-span-15 md:col-span-6 md:row-span-16 lg:col-span-6 lg:row-span-26";
    case "12x24": return "col-span-12 row-span-9 md:col-span-3 md:row-span-6 lg:col-span-4 lg:row-span-11";
    case "24x4": return "col-span-24 row-span-5 md:col-span-6 md:row-span-6 lg:col-span-6 lg:row-span-6";
    case "24x2.5": return "col-span-24 row-span-5 md:col-span-6 md:row-span-6 lg:col-span-6 lg:row-span-5";
    case "24x2": return "col-span-24 row-span-5 md:col-span-6 md:row-span-5 lg:col-span-6 lg:row-span-5";
    case "12x2.5": return "col-span-12 row-span-6 md:col-span-6 md:row-span-6 lg:col-span-6 lg:row-span-8";
    case "24x1": return "col-span-24 row-span-4 md:col-span-6 md:row-span-5 lg:col-span-6 lg:row-span-4";
    case "6x6": return "col-span-12 row-span-10 md:col-span-4 md:row-span-10 lg:col-span-3 lg:row-span-12";
    case "8x12 inches": return "col-span-12 row-span-14 md:col-span-4 md:row-span-11 lg:col-span-6 lg:row-span-24";
    case "8x12": return "col-span-6 row-span-11 md:col-span-4 md:row-span-16 lg:col-span-3 lg:row-span-20";
    case "12x8": return "col-span-12 row-span-11 md:col-span-6 md:row-span-12 lg:col-span-4 lg:row-span-13";
    case "18x12": return "col-span-8 row-span-8 md:col-span-6 md:row-span-12 lg:col-span-4 lg:row-span-14";
    case "2x2": return "col-span-8 row-span-11 md:col-span-4 md:row-span-12 lg:col-span-4 lg:row-span-18";
    case "200x300 mm (8x12 inch)": return "col-span-6 row-span-10 md:col-span-4 md:row-span-16 lg:col-span-4 lg:row-span-25";
    case "2x3": return "col-span-6 row-span-10 md:col-span-4 md:row-span-16 lg:col-span-4 lg:row-span-25";
    case "6x3": return "col-span-12 row-span-10 md:col-span-4 md:row-span-10 lg:col-span-3 lg:row-span-12";
    case "8x4": return "col-span-12 row-span-10 md:col-span-3 md:row-span-10 lg:col-span-2 lg:row-span-12";
    case "300x200 mm (12x8 inch)": return "col-span-8 row-span-7 md:col-span-6 md:row-span-12 lg:col-span-6 lg:row-span-17";
    case "3x2": return "col-span-8 row-span-7 md:col-span-6 md:row-span-12 lg:col-span-6 lg:row-span-17";
    case "6x8": return "col-span-12 row-span-10 md:col-span-4 md:row-span-12 lg:col-span-3 lg:row-span-16";
    case "24x3": return "col-span-12 row-span-4 md:col-span-6 md:row-span-4 lg:col-span-6 lg:row-span-6";
    default: return "col-span-12 row-span-9 md:col-span-4 md:row-span-11 lg:col-span-3 lg:row-span-16";
  }
};

export default function CatalogPage() {
  const { catalogItems, removeItemFromCatalog, updateItemSizes } = useCatalog();
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [editingItem, setEditingItem] = useState<CatalogItem | null>(null);

  const groupedCatalog = useMemo(() => {
    const groups: { [key: string]: CatalogItem[] } = {};
    catalogItems.forEach((item) => {
      const rawSize = item.sizes[0] || "Standard";
      const displaySize = getSizeDisplayName(rawSize);
      const groupKey = `${item.subcategory} (${displaySize})`;
      if (!groups[groupKey]) groups[groupKey] = [];
      groups[groupKey].push(item);
    });
    return groups;
  }, [catalogItems]);

  const handleCreateCatalog = async () => {
    if (catalogItems.length === 0) return;
    setIsGenerating(true);
    setError(null);
    try {
      const response = await fetch("/api/generate-catalog-pdf", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items: catalogItems }),
      });
      if (!response.ok) throw new Error("Generation failed");
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "shri_marvels_catalog.pdf";
      a.click();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "An unknown error occurred");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-orange-50 pt-20 pb-20">
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6">
        
        <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
          <Link href="/gallery">
            <Button variant="ghost" className="text-zinc-600 hover:text-zinc-900 transition-colors">
              <ArrowLeft className="mr-2 h-5 w-5" /> Back to Full Gallery
            </Button>
          </Link>
          <div className="text-center">
            <h1 className="text-3xl font-bold text-zinc-800">My Custom Catalog</h1>
            <p className="text-zinc-500 text-sm mt-1">{catalogItems.length} Products Selected</p>
          </div>
          <Button 
            onClick={handleCreateCatalog} 
            disabled={isGenerating || catalogItems.length === 0} 
            className="bg-zinc-800 hover:bg-zinc-700 text-white min-w-[180px] shadow-lg"
          >
            {isGenerating ? <Loader2 className="animate-spin mr-2" /> : <FileText className="mr-2" />}
            Generate PDF
          </Button>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 p-4 rounded-xl mb-8 text-center">
            {error}
          </div>
        )}

        {catalogItems.length === 0 ? (
          <div className="text-center py-32 bg-white/50 rounded-3xl border-2 border-dashed border-zinc-200">
            <Bookmark className="mx-auto mb-4 text-zinc-300" size={80} />
            <p className="text-xl text-zinc-400 font-medium">Your catalog is currently empty.</p>
            <Link href="/gallery" className="mt-4 inline-block text-zinc-800 underline font-bold">
              Go add some products
            </Link>
          </div>
        ) : (
          Object.entries(groupedCatalog).map(([groupTitle, items]) => (
            <div key={groupTitle} className="mb-16">
              <h2 className="text-xl sm:text-3xl font-bold text-zinc-800 mb-8 pb-3 border-b-2 border-zinc-300">
                {groupTitle}
              </h2>

              {/* REPLICATED 24-COLUMN GRID FROM GALLERY-PAGE */}
              <div className="grid grid-cols-24 sm:grid-cols-24 gap-4 grid-flow-dense -mx-2 sm:mx-0">
                {items.map((item) => {
                  const gridSpanClass = getGridSpanClass(item.sizes[0]);

                  return (
                    <div 
                      key={item.id} 
                      className={`group relative flex flex-col bg-white border border-zinc-200/80 shadow-sm transition-all hover:shadow-xl ${gridSpanClass}`}
                    >
                      {/* Full Image Container - uses fill to match gallery behavior */}
                      <div className="relative w-full flex-grow overflow-hidden bg-zinc-100">
                        <Image 
                          src={item.imageUrl} 
                          alt={item.name} 
                          fill 
                          className="object-cover transition-transform duration-700 group-hover:scale-110" 
                        />
                        
                        {/* Remove Button Overlay */}
                        <div className="absolute top-2 right-2 z-30">
                          <Button 
                            variant="destructive" 
                            size="sm"
                            className="h-8 w-8 p-0 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
                            onClick={() => removeItemFromCatalog(item.id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>

                        {/* Order Selection Overlay */}
                        <div className="absolute inset-x-0 bottom-0 p-4 bg-black/50 backdrop-blur translate-y-full group-hover:translate-y-0 transition-transform duration-300 z-20">
                           <p className="text-[10px] font-bold text-white/60 uppercase tracking-tighter mb-2">Selected Sizes:</p>
                           <div className="space-y-1 max-h-[150px] overflow-y-auto custom-scrollbar">
                            {item.selectedSizes.map((s: string) => (
                              <div key={s} className="flex justify-between items-center text-[11px] bg-white/10 px-2 py-1.5 border border-white/10 rounded text-white">
                                <span className="font-medium">{s}</span>
                                <span className="font-black">{item.sizeConfigs?.[s] || 1} Pcs</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Title & Edit Section (always visible below image) */}
                      <div className="p-1 h-6 flex items-center justify-between bg-white border-t border-zinc-100">
                        <h3 className="text-[9px] md:text-[12px] font-semibold text-zinc-800 truncate pr-2">
                          {item.name}
                        </h3>
                        <button 
                          className="p-1 text-zinc-400 hover:text-zinc-800 transition-colors"
                          onClick={() => setEditingItem(item)}
                          title="Edit Selection"
                        >
                          <Edit2 className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))
        )}
      </div>

      {editingItem && (
        <SizeSelectionDialog
          isOpen={!!editingItem}
          onClose={() => setEditingItem(null)}
          subcategory={editingItem.subcategory}
          availableSizes={transformProductSizes(editingItem.sizes)} 
          onConfirm={(sz, conf) => {
            updateItemSizes(editingItem.id, sz, conf);
            setEditingItem(null);
          }}
          initialConfigs={editingItem.sizeConfigs}
          mainCategory={editingItem.category as "marvel" | "tiles"}
        />
      )}
    </div>
  );
}