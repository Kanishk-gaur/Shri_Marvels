"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Trash2, FileText, Loader2, ArrowLeft, Bookmark, Edit2, ListMinus } from "lucide-react"; 
import { Button } from "@/components/ui/button";
import { useCatalog } from "@/context/CatalogContext";
import { SizeSelectionDialog } from "@/components/size-selection-dialog";

// --- START: Size Mapping (Synced with gallery/page.tsx) ---
const sizeDisplayNames: Record<string, string> = { 
  "600x900 mm (24x36 inch)": "2x3",
  "900x600 mm (36x24 inch)": "3x2",
  "200x300 mm (8x12 inch)": "8x12,12x18",
  "300x200 mm (12x8 inch)": "12x8,18x12",
  "600x1200 mm": "2x4",
  "600x600 mm": "2x2",
  "600x1200 mm (24x48 inch)": "2x4",
  "1200x600 mm (48x24 inch)": "4x2",
  "1200x1200 mm (48x48 inch)": "4x4",
  "24x24 inch": "2x2",
  "8x12": "8x12, 6x6, 12x18",
  "300x63 mm (12x2.5 inch)": "12x2.5",
};

const getSizeDisplayName = (rawSize: string): string => sizeDisplayNames[rawSize] || rawSize;

/**
 * MASONRY ASPECT RATIO LOGIC (Synced with gallery-card.tsx)
 * Converts the gallery's row-span logic into CSS aspect ratios for the catalog grid.
 */
const getGalleryStyleAspect = (sizeString: string) => {
  switch (sizeString) {
    case "(POLISHED)12x24": return "aspect-[4/3]";
    case "18x12/8x12": return "aspect-[4/5]";
    case "12x18/12x8": return "aspect-[3/4]";
    case "600x1200 mm (24x48 inch)": return "aspect-[1/2]";
    case "300x63 mm (12x2.5 inch)": return "aspect-[3/1]";
    case "24x24 inch":
    case "600x600 mm":
    case "600x600 mm (23.6x23.6 inch)": return "aspect-square";
    case "1200x1800 mm (48x72 inch)": return "aspect-[2/3]";
    case "4x48":
    case "6x48": return "aspect-[12/1]";
    case "10x600":
    case "10x600 mm (0.39x23.6 inch)": return "aspect-[6/1]";
    case "12x8":
    case "12x8 in": return "aspect-[3/2]";
    default: return "aspect-[3/4]"; 
  }
};

export default function CatalogPage() {
  const { catalogItems, removeItemFromCatalog, updateItemSizes } = useCatalog();
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [editingItem, setEditingItem] = useState<any | null>(null);

  /**
   * GROUPING LOGIC (Exactly like gallery/page.tsx)
   * Groups items by their Subcategory and Display Size Heading.
   */
  const groupedCatalog = useMemo(() => {
    const groups: { [key: string]: any[] } = {};
    
    catalogItems.forEach((item) => {
      const rawSize = item.sizes[0] || "Standard";
      const displaySize = getSizeDisplayName(rawSize);
      // Construct the exact heading format used in the gallery
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
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-orange-50 pt-20">
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6">
        
        {/* Navigation & Header */}
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
              {/* SECTION HEADING: Exact match to Gallery Page */}
              <h2 className="text-xl sm:text-3xl font-bold text-zinc-800 mb-8 pb-3 border-b-2 border-zinc-300">
                {groupTitle}
              </h2>

              {/* GRID: items-start prevents stretching, maintaining proper tile shapes */}
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 items-start">
                {items.map((item) => {
                  const aspectClass = getGalleryStyleAspect(item.sizes[0]);

                  return (
                    <div key={item.id} className="group flex flex-col bg-white border border-zinc-200 shadow-sm transition-all hover:shadow-xl hover:-translate-y-1">
                      
                      {/* IMAGE CONTAINER: Aspect ratio synced with Gallery masonry logic */}
                      <div className={`relative w-full ${aspectClass} overflow-hidden bg-zinc-100`}>
                        <Image 
                          src={item.imageUrl} 
                          alt={item.name} 
                          fill 
                          className="object-cover transition-transform duration-700 group-hover:scale-110" 
                        />
                        {/* Remove Action - similar placement to Gallery buttons */}
                        <div className="absolute top-2 right-2 z-10">
                          <Button 
                            variant="destructive" 
                            size="sm"
                            className="h-8 w-8 p-0 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
                            onClick={() => removeItemFromCatalog(item.id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>

                      {/* Product Details Section */}
                      <div className="p-4 flex flex-col flex-grow">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="text-xs md:text-sm font-bold text-zinc-800 line-clamp-2 leading-tight">
                            {item.name}
                          </h3>
                          <button 
                            className="p-1 text-zinc-400 hover:text-zinc-800 transition-colors"
                            onClick={() => setEditingItem(item)}
                            title="Edit Quantity/Size"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <div className="mt-auto space-y-2">
                          <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-tighter">Your Order Selection:</p>
                          {item.selectedSizes.map((s: string) => (
                            <div key={s} className="flex justify-between items-center text-[11px] bg-zinc-50 px-2 py-1.5 border border-zinc-100 rounded">
                              <span className="text-zinc-600 font-medium">{s}</span>
                              <span className="text-zinc-900 font-black">{item.sizeConfigs?.[s] || 1} Pcs</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Edit Sizes Modal */}
      {editingItem && (
        <SizeSelectionDialog
          isOpen={!!editingItem}
          onClose={() => setEditingItem(null)}
          subcategory={editingItem.subcategory}
          availableSizes={editingItem.sizes}
          onConfirm={(sz, conf) => {
            updateItemSizes(editingItem.id, sz, conf);
            setEditingItem(null);
          }}
          initialConfigs={editingItem.sizeConfigs}
          mainCategory={editingItem.category}
        />
      )}
    </div>
  );
}