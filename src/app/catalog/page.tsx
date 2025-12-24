"use client";

import { Button } from "@/components/ui/button";
import { useCatalog } from "@/context/CatalogContext";
import { Input } from "@/components/ui/input"; // Import Input component
import Image from "next/image";
import Link from "next/link";
import { Trash2, FileText, Loader2, ArrowLeft, Bookmark, Plus, Minus } from "lucide-react"; 
import { useState } from "react";

export default function CatalogPage() {
  const { catalogItems, removeItemFromCatalog, updateItemSizes } = useCatalog(); //
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

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
                quantity: item.quantity || 1
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

  // Helper to update quantity via buttons or manual input
  const handleUpdateQuantity = (itemId: string, currentSizes: string[], value: number) => {
    const newQty = Math.max(1, value); 
    updateItemSizes(itemId, currentSizes, newQty);
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {catalogItems.map((item) => (
            <div key={item.id} className="flex flex-col border border-white/10 rounded-lg overflow-hidden bg-white/5 backdrop-blur-sm shadow-lg">
              <div className="relative aspect-square">
                <Image src={item.imageUrl} alt={item.name} fill className="object-cover" />
              </div>
              <div className="p-4 flex-grow">
                <h2 className="text-lg font-semibold truncate text-white">{item.name}</h2>
                <p className="text-sm text-cyan-400 mb-4">{item.category}</p>
                
                {/* Quantity Controls with Manual Input */}
                <div className="flex items-center justify-between bg-white/10 p-2 rounded-md mb-4 border border-white/5">
                  <span className="text-xs text-white/70 uppercase font-bold tracking-tighter">Quantity</span>
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={() => handleUpdateQuantity(item.id, item.selectedSizes, (item.quantity || 1) - 1)}
                      className="p-1 hover:bg-white/20 rounded-full transition-colors"
                    >
                      <Minus size={14} />
                    </button>
                    
                    <Input
                      type="number"
                      value={item.quantity || 1}
                      onChange={(e) => handleUpdateQuantity(item.id, item.selectedSizes, parseInt(e.target.value) || 1)}
                      className="w-14 h-8 bg-transparent border-white/20 text-center font-bold text-white [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    />

                    <button 
                      onClick={() => handleUpdateQuantity(item.id, item.selectedSizes, (item.quantity || 1) + 1)}
                      className="p-1 hover:bg-white/20 rounded-full transition-colors"
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                </div>

                <div className="mt-4">
                  <p className="text-xs text-white/50 mb-2 font-bold uppercase tracking-wider">Selected Sizes:</p>
                  <div className="flex flex-wrap gap-1">
                    {item.selectedSizes.map((size) => (
                      <span key={size} className="px-2 py-0.5 bg-cyan-500/20 text-cyan-400 text-[10px] rounded border border-cyan-500/30 font-medium">
                        {size}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="p-4 pt-0">
                <Button variant="destructive" className="w-full bg-red-600/80 hover:bg-red-700" onClick={() => removeItemFromCatalog(item.id)}>
                  <Trash2 className="w-4 h-4 mr-2" /> Remove
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}