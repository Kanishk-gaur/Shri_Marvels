// src/app/catalog/page.tsx
"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Trash2, FileText, Loader2, ArrowLeft, Bookmark, Edit2 } from "lucide-react"; 
import { Button } from "@/components/ui/button";
import { useCatalog } from "@/context/CatalogContext";
import { SizeSelectionDialog } from "@/components/size-selection-dialog";

// Size mapping synced with Gallery logic
const sizeDisplayNames: Record<string, string> = { 
  "600x900 mm (24x36 inch)": "2x3",
  "900x600 mm (36x24 inch)": "3x2",
  "200x300 mm (8x12 inch)": "8x12,12x18",
  "300x200 mm (12x8 inch)": "12x8,18x12",
  "600x1200 mm": "2x4",
  "600x600 mm": "2x2",
  "300x63 mm (12x2.5 inch)": "12x2.5",
};

const getSizeDisplayName = (rawSize: string): string => sizeDisplayNames[rawSize] || rawSize;

// Masonry Aspect Ratio Logic derived from gallery-card.tsx
const getGalleryStyleAspect = (sizeString: string) => {
  switch (sizeString) {
    case "(POLISHED)12x24":
    case "12x24": return "aspect-[4/3]"; // Sync with gallery col-span 4, row-span 11
    case "18x12/8x12": return "aspect-[4/5]"; // Sync with gallery row-span 14
    case "12x18/12x8":
    case "12x18": return "aspect-[3/4]"; // Sync with gallery row-span 20
    case "600x1200 mm (24x48 inch)":
    case "2x4": return "aspect-[1/2]"; // Sync with gallery row-span 32
    case "300x63 mm (12x2.5 inch)":
    case "12x2.5": return "aspect-[3/1]"; // Sync with gallery row-span 8
    case "24x24 inch":
    case "600x600 mm": return "aspect-square"; // Sync with gallery row-span 25
    default: return "aspect-[3/4]";
  }
};

export default function CatalogPage() {
  const { catalogItems, removeItemFromCatalog, updateItemSizes } = useCatalog();
  const [isGenerating, setIsGenerating] = useState(false);
  const [editingItem, setEditingItem] = useState<any | null>(null);

  // Grouping logic to match Gallery sectioning (Heading then Images)
  const groupedCatalog = useMemo(() => {
    const groups: { [key: string]: any[] } = {};
    catalogItems.forEach((item) => {
      const displaySize = getSizeDisplayName(item.sizes[0] || "Standard");
      const groupKey = `${item.subcategory} (${displaySize})`;
      if (!groups[groupKey]) groups[groupKey] = [];
      groups[groupKey].push(item);
    });
    return groups;
  }, [catalogItems]);

  const handleCreateCatalog = async () => {
    if (catalogItems.length === 0) return;
    setIsGenerating(true);
    // API calling logic remains unchanged...
    setIsGenerating(false);
  };

  return (
    <div className="min-h-screen bg-orange-50 pt-20"> {/* Synced background */}
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
          <Link href="/gallery"><Button variant="ghost"><ArrowLeft className="mr-2 h-5 w-5" /> Back</Button></Link>
          <h1 className="text-3xl font-bold text-zinc-800 text-center">My Custom Catalog</h1>
          <Button onClick={handleCreateCatalog} disabled={isGenerating} className="bg-zinc-800 text-white">
            {isGenerating ? <Loader2 className="animate-spin mr-2" /> : <FileText className="mr-2" />} Generate PDF
          </Button>
        </div>

        {catalogItems.length === 0 ? (
          <div className="text-center py-32 bg-white rounded-3xl border-2 border-dashed border-zinc-200">
            <Bookmark className="mx-auto mb-4 text-zinc-300" size={80} />
            <p className="text-xl text-zinc-400">Your catalog is currently empty.</p>
          </div>
        ) : (
          Object.entries(groupedCatalog).map(([groupTitle, items]) => (
            <div key={groupTitle} className="mb-16">
              {/* Gallery-style Heading */}
              <h2 className="text-xl sm:text-3xl font-bold text-zinc-800 mb-8 pb-3 border-b-2 border-zinc-300">
                {groupTitle}
              </h2>
              {/* Grid items-start prevents image stretching */}
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 items-start">
                {items.map((item) => (
                  <div key={item.id} className="group flex flex-col bg-white border border-zinc-200 transition-all hover:shadow-xl">
                    {/* Exact Aspect Ratio from Gallery */}
                    <div className={`relative w-full ${getGalleryStyleAspect(item.sizes[0])} overflow-hidden bg-zinc-100`}>
                      <Image src={item.imageUrl} alt={item.name} fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
                      <Button variant="destructive" size="sm" className="absolute top-2 right-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" onClick={() => removeItemFromCatalog(item.id)}>
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                    <div className="p-4">
                      <div className="flex justify-between items-start">
                        <h3 className="text-xs font-bold text-zinc-800 line-clamp-2">{item.name}</h3>
                        <Edit2 className="w-3.5 h-3.5 text-zinc-400 cursor-pointer" onClick={() => setEditingItem(item)} />
                      </div>
                      <div className="mt-4 space-y-1">
                        {item.selectedSizes.map((s: string) => (
                          <div key={s} className="flex justify-between text-[11px] bg-zinc-50 px-2 py-1 border border-zinc-100 rounded">
                            <span>{s}</span><span className="font-bold">{item.sizeConfigs?.[s] || 1} Pcs</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))
        )}
      </div>

      {editingItem && (
        <SizeSelectionDialog
          isOpen={!!editingItem} onClose={() => setEditingItem(null)}
          subcategory={editingItem.subcategory} availableSizes={editingItem.sizes}
          onConfirm={(sz, conf) => { updateItemSizes(editingItem.id, sz, conf); setEditingItem(null); }}
          initialConfigs={editingItem.sizeConfigs} mainCategory={editingItem.category}
        />
      )}
    </div>
  );
}