// src/app/catalog/page.tsx
"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { FileText, Loader2, ArrowLeft, Bookmark } from "lucide-react"; 
import { Button } from "@/components/ui/button";
import { useCatalog, CatalogItem, transformProductSizes } from "@/context/CatalogContext";
import { SizeSelectionDialog } from "@/components/size-selection-dialog";
import { CatalogGroup } from "@/components/catalog/CatalogGroup";
import { getSizeDisplayName } from "@/components/catalog/utils";

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
            <CatalogGroup 
              key={groupTitle}
              title={groupTitle}
              items={items}
              onRemove={removeItemFromCatalog}
              onEdit={setEditingItem}
            />
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