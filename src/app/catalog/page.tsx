"use client";

import { Button } from "@/components/ui/button";
import { useCatalog } from "@/context/CatalogContext";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import Link from "next/link";
import { Trash2, FileText, Loader2, ArrowLeft, Bookmark, Edit2 } from "lucide-react"; 
import { useState } from "react";
import { SizeSelectionDialog } from "@/components/size-selection-dialog";

export default function CatalogPage() {
  const { catalogItems, removeItemFromCatalog, updateItemSizes } = useCatalog();
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // State to track which item is being edited
  const [editingItem, setEditingItem] = useState<any | null>(null);

  const handleCreateCatalog = async () => {
    if (catalogItems.length === 0) return;
    setIsGenerating(true);
    setError(null);
    try {
      const response = await fetch("/api/generate-catalog-pdf", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
            items: catalogItems.map(item => ({
                id: item.id,
                name: item.name,
                imageUrl: item.imageUrl,
                selectedSizes: item.selectedSizes,
                category: item.category,
                sizeConfigs: item.sizeConfigs 
            })) 
        }),
      });
      if (!response.ok) throw new Error("Generation failed");
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "shri_marvels_catalog.pdf";
      a.click();
    } catch (err) {
      const message = err instanceof Error ? err.message : "An error occurred";
      setError(message);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleEditConfirm = (selectedSizes: string[], sizeConfigs: Record<string, number>) => {
    if (editingItem) {
      updateItemSizes(editingItem.id, selectedSizes, sizeConfigs);
      setEditingItem(null);
    }
  };

  return (
    <div className="py-8 min-h-screen container mx-auto px-4 text-white">
      <h1 className="text-4xl font-extrabold text-center mb-10">My Catalog</h1>
      
      {error && <div className="bg-red-500/20 border border-red-500 text-red-200 p-4 rounded-lg mb-6">{error}</div>}
      
      <div className="flex justify-between items-center mb-10">
          <Link href="/gallery">
            <Button variant="outline" className="text-white bg-white/10 border-white/20">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Gallery
            </Button>
          </Link>
          <Button 
            onClick={handleCreateCatalog} 
            disabled={isGenerating || catalogItems.length === 0} 
            className="bg-green-600 hover:bg-green-700"
          >
            {isGenerating ? <Loader2 className="animate-spin mr-2" /> : <FileText className="mr-2" />}
            Generate PDF
          </Button>
      </div>

      {catalogItems.length === 0 ? (
        <div className="text-center py-20 bg-white/5 rounded-xl border border-white/10">
          <Bookmark className="mx-auto mb-4 text-white/20" size={64} />
          <p className="text-xl text-white/50">Your catalog is empty.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {catalogItems.map((item) => (
            <div key={item.id} className="flex flex-col border border-white/10 rounded-lg overflow-hidden bg-white/5 backdrop-blur-sm shadow-lg">
              <div className="relative aspect-video">
                <Image src={item.imageUrl} alt={item.name} fill className="object-cover" />
              </div>
              <div className="p-4 flex-grow">
                <div className="flex justify-between items-start mb-2">
                  <h2 className="text-lg font-semibold truncate text-white max-w-[70%]">{item.name}</h2>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="h-8 px-2 text-cyan-400 hover:text-cyan-300 hover:bg-white/5"
                    onClick={() => setEditingItem(item)}
                  >
                    <Edit2 className="w-3.5 h-3.5 mr-1" /> Edit
                  </Button>
                </div>
                <p className="text-sm text-cyan-400 mb-6">{item.category}</p>
                
                <p className="text-xs text-white/50 mb-3 font-bold uppercase tracking-wider">Sizes & Quantities:</p>
                
                <div className="space-y-2">
                  {item.selectedSizes.map((size) => (
                    <div key={size} className="flex items-center justify-between bg-white/5 p-2 rounded border border-white/5">
                      <span className="text-xs font-medium text-white/80">{size}</span>
                      <span className="text-xs font-bold text-cyan-400">{item.sizeConfigs?.[size] || 1} Pcs</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="p-4 pt-2">
                <Button variant="destructive" className="w-full bg-red-600/80 hover:bg-red-700 h-9 text-xs" onClick={() => removeItemFromCatalog(item.id)}>
                  <Trash2 className="w-3 h-3 mr-2" /> Remove Product
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Edit Dialog Integration */}
      {editingItem && (
        <SizeSelectionDialog
          isOpen={!!editingItem}
          onClose={() => setEditingItem(null)}
          subcategory={editingItem.name}
          availableSizes={editingItem.sizes} // Uses original sizes array from catalog item
          onConfirm={handleEditConfirm}
          initialConfigs={editingItem.sizeConfigs} // NEW: Pass current config to dialog
          mainCategory="tiles"
        />
      )}
    </div>
  );
}