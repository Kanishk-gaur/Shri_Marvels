// src/app/catalog/page.tsx

"use client";

import { Button } from "@/components/ui/button";
import { useCatalog } from "@/context/CatalogContext";
import Image from "next/image";
import Link from "next/link";
// FIX: Corrected import from BookMarked to Bookmark
import { Trash2, FileText, Loader2, ArrowLeft, Bookmark } from "lucide-react"; 
import { useState } from "react";
import { cn } from "@/lib/utils";

// ❌ Removed static metadata export to resolve "default export is not a React Component" error.
//    Metadata should be in src/app/catalog/metadata.ts


export default function CatalogPage() {
  const { catalogItems, removeItemFromCatalog } = useCatalog();
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCreateCatalog = async () => {
    if (catalogItems.length === 0) {
      setError("Please add items to your catalog first.");
      return;
    }

    setIsGenerating(true);
    setError(null);

    try {
      // ⬇️ API CALL TO GENERATE PDF (Ensure you create this Next.js API route below)
      const response = await fetch("/api/generate-catalog-pdf", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        // Send only the necessary data to the server
        body: JSON.stringify({ items: catalogItems.map(item => ({
            id: item.id,
            name: item.name,
            imageUrl: item.imageUrl,
            sizes: item.sizes,
            category: item.category
        })) }),
      });

      if (!response.ok) {
        // Attempt to read error message from body if available
        const errorText = await response.text();
        let errorMessage = errorText || `PDF generation failed with status: ${response.status}`;
        throw new Error(errorMessage);
      }

      // 1. Download the PDF for the user
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "agrawal_ceramics_catalog.pdf";
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);

      // The backend API should handle the email to the owner automatically.
      alert("Catalog PDF created and downloaded! A copy has been sent to the owner.");
    } catch (err: any) {
      console.error("Catalog generation error:", err.message);
      setError(`Error creating catalog. Please ensure the backend is running and configured correctly. Details: ${err.message}`);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="py-8 min-h-[calc(100vh-100px)]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-extrabold tracking-tight text-white text-center mb-4">
          My Custom Catalog
        </h1>
        <p className="text-xl text-white/70 text-center mb-10">
            Selected products for PDF generation ({catalogItems.length} items)
        </p>
        
        {/* Action Button and Error Message */}
        <div className="flex flex-col items-center sm:flex-row sm:justify-between sm:items-start mb-6 w-full">
            <Link href="/" className="order-2 sm:order-1 mt-4 sm:mt-0">
                <Button variant="outline" className="text-white bg-white/10 hover:bg-white/20 border-white/20">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Products
                </Button>
            </Link>

            <Button
              onClick={handleCreateCatalog}
              disabled={isGenerating || catalogItems.length === 0}
              className={cn("px-8 py-3 order-1 sm:order-2", {
                "opacity-50 cursor-not-allowed": catalogItems.length === 0,
                "bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600": !isGenerating
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
            <div className="bg-red-900/50 border border-red-700 text-red-300 px-4 py-3 rounded relative mb-6" role="alert">
                <p className="font-bold">Error:</p>
                <p className="text-sm">{error}</p>
            </div>
        )}

        {/* Catalog Items Grid */}
        {catalogItems.length === 0 ? (
          <div className="text-center py-20 border border-white/10 rounded-xl bg-white/5 mt-10">
            <Bookmark className="w-16 h-16 text-white/30 mx-auto mb-4" /> 
            <p className="text-xl text-white/70">
              Your catalog is empty. Add some products from the gallery or product pages.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-6">
            {catalogItems.map((item) => (
              <div
                key={item.id}
                className="flex flex-col border border-white/10 rounded-lg overflow-hidden shadow-xl bg-white/5 backdrop-blur-sm transition-all duration-300 hover:shadow-2xl"
              >
                <div className="relative w-full aspect-square flex-shrink-0">
                  <Image
                    src={item.imageUrl}
                    alt={item.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-black/20" />
                </div>
                <div className="p-4 flex flex-col justify-between flex-grow text-white">
                  <div>
                    <h2 className="text-lg font-semibold line-clamp-2 mb-1">
                      {item.name}
                    </h2>
                    <p className="text-sm text-[#F3C77B] mb-2">
                        Category: {item.category}
                    </p>
                    <p className="text-sm text-white/70">
                        Sizes: {item.sizes.join(' | ')}&quot;
                    </p>
                  </div>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => removeItemFromCatalog(item.id)}
                    className="mt-4 w-full bg-red-600/80 hover:bg-red-700"
                  >
                    <Trash2 className="w-4 h-4 mr-1" />
                    Remove from Catalog
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