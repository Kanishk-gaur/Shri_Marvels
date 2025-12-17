// src/app/catalog/page.tsx
"use client";

import { Button } from "@/components/ui/button";
import { useCatalog } from "@/context/CatalogContext";
import Image from "next/image";
import Link from "next/link";
import { Trash2, FileText, Loader2, ArrowLeft, Bookmark } from "lucide-react"; 
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

export default function CatalogPage() {
  const { catalogItems, removeItemFromCatalog } = useCatalog();
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  // Prevent hydration mismatch by only rendering after mount
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleCreateCatalog = async () => {
    if (catalogItems.length === 0) {
      setError("Please add items to your catalog first.");
      return;
    }

    setIsGenerating(true);
    setError(null);

    try {
      const response = await fetch("/api/generate-catalog-pdf", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ 
          items: catalogItems.map(item => ({
            id: item.id,
            name: item.name,
            imageUrl: item.imageUrl,
            selectedSize: item.selectedSize, // Updated to use single size
            category: item.category
          })) 
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || "PDF generation failed");
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "shri_marvels_catalog.pdf";
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);

      alert("Catalog PDF created and downloaded!");
    } catch (err: any) {
      setError(`Error: ${err.message}`);
    } finally {
      setIsGenerating(false);
    }
  };

  if (!isMounted) return null;

  return (
    <div className="py-8 min-h-[calc(100vh-100px)]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-extrabold tracking-tight text-white text-center mb-4">
          My Custom Catalog
        </h1>
        <p className="text-xl text-white/70 text-center mb-10">
            Selected products for PDF generation ({catalogItems.length} items)
        </p>
        
        <div className="flex flex-col items-center sm:flex-row sm:justify-between sm:items-start mb-6 w-full">
            <Link href="/gallery" className="order-2 sm:order-1 mt-4 sm:mt-0">
                <Button variant="outline" className="text-white bg-white/10 hover:bg-white/20 border-white/20">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Gallery
                </Button>
            </Link>

            <Button
              onClick={handleCreateCatalog}
              disabled={isGenerating || catalogItems.length === 0}
              className={cn("px-8 py-3 order-1 sm:order-2", {
                "opacity-50 cursor-not-allowed": catalogItems.length === 0,
                "bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600": !isGenerating
              })}
            >
              {isGenerating ? (
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              ) : (
                <FileText className="mr-2 h-5 w-5" />
              )}
              {isGenerating ? "Creating Catalog..." : "Create Catalog PDF"}
            </Button>
        </div>

        {error && (
            <div className="bg-red-900/50 border border-red-700 text-red-300 px-4 py-3 rounded relative mb-6">
                <p className="font-bold">Error:</p>
                <p className="text-sm">{error}</p>
            </div>
        )}

        {catalogItems.length === 0 ? (
          <div className="text-center py-20 border border-white/10 rounded-xl bg-white/5 mt-10">
            <Bookmark className="w-16 h-16 text-white/30 mx-auto mb-4" /> 
            <p className="text-xl text-white/70">Your catalog is empty.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-6">
            {catalogItems.map((item) => (
              <div key={`${item.id}-${item.selectedSize}`} className="flex flex-col border border-white/10 rounded-lg overflow-hidden bg-white/5 backdrop-blur-sm">
                <div className="relative w-full aspect-square">
                  <Image
                    src={item.imageUrl}
                    alt={item.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
                <div className="p-4 flex flex-col justify-between flex-grow text-white">
                  <div>
                    <h2 className="text-lg font-semibold line-clamp-2 mb-1">{item.name}</h2>
                    <p className="text-sm text-cyan-400 mb-2">Category: {item.category}</p>
                    {/* FIXED: No more .join(), using selectedSize directly */}
                    <p className="text-sm text-white/70">Selected Size: {item.selectedSize}</p>
                  </div>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => removeItemFromCatalog(item.id, item.selectedSize)}
                    className="mt-4 w-full"
                  >
                    <Trash2 className="w-4 h-4 mr-1" />
                    Remove
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}