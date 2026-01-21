// src/components/catalog/CatalogHeader.tsx
import Link from "next/link";
import { ArrowLeft, Trash2, FileText, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CatalogHeaderProps {
  itemCount: number;
  isGenerating: boolean;
  onClear: () => void;
  onGenerateClick: () => void;
}

export function CatalogHeader({ itemCount, isGenerating, onClear, onGenerateClick }: CatalogHeaderProps) {
  return (
    <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
      <Link href="/gallery">
        <Button variant="ghost" className="text-zinc-600 hover:text-zinc-900">
          <ArrowLeft className="mr-2 h-5 w-5" /> Back to Full Gallery
        </Button>
      </Link>
      <div className="text-center">
        <h1 className="text-3xl font-bold text-zinc-800">My Catalog</h1>
        <p className="text-zinc-500 text-sm mt-1">{itemCount} Products Selected</p>
      </div>
      <div className="flex items-center gap-3">
        {itemCount > 0 && (
          <Button variant="outline" onClick={onClear} className="border-red-200 text-red-600 hover:bg-red-50">
            <Trash2 className="mr-2 h-4 w-4" /> Clear All
          </Button>
        )}
        <Button 
          onClick={onGenerateClick} 
          disabled={isGenerating || itemCount === 0}
          className="bg-zinc-800 hover:bg-zinc-700 text-white min-w-[180px]"
        >
          {isGenerating ? <Loader2 className="animate-spin mr-2" /> : <FileText className="mr-2" />}
          {isGenerating ? "Processing..." : "Generate PDF"}
        </Button>
      </div>
    </div>
  );
}