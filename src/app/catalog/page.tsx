// src/app/catalog/page.tsx
"use client";

import { useMemo, useState } from "react";
import { useCatalog, transformProductSizes } from "@/context/CatalogContext";
import { getSizeDisplayName, subCategoryDisplayNames } from "@/data/utils";
import { CatalogHeader } from "@/components/catalog/CatalogHeader";
import { CatalogGroup } from "@/components/catalog/CatalogGroup";
import { PdfMetadataDialog } from "@/components/catalog/PdfMetadataDialog";
import { SizeSelectionDialog } from "@/components/size-selection-dialog";
import { usePdfGenerator } from "@/hooks/usePdfGenerator";
import { Bookmark } from "lucide-react";

export default function CatalogPage() {
  const { catalogItems, removeItemFromCatalog, updateItemSizes, clearCatalog } = useCatalog();
  const { generate } = usePdfGenerator();
  const [isGenerating, setIsGenerating] = useState(false);
  const [showGenDialog, setShowGenDialog] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [pdfMetadata, setPdfMetadata] = useState({ name: "", title: "", description: "" });

  const groupedCatalog = useMemo(() => {
    const groups: { [key: string]: any[] } = {};
    catalogItems.forEach((item) => {
      const displaySize = getSizeDisplayName(item.sizes[0] || "Standard");
      const groupKey = `${subCategoryDisplayNames[item.subcategory] || item.subcategory} (${displaySize})`;
      if (!groups[groupKey]) groups[groupKey] = [];
      groups[groupKey].push(item);
    });
    return groups;
  }, [catalogItems]);

  const handleGenerate = async () => {
    setIsGenerating(true);
    await generate(groupedCatalog, pdfMetadata);
    setIsGenerating(false);
    setShowGenDialog(false);
  };

  return (
    <div className="min-h-screen bg-orange-50 pt-20 pb-20">
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6">
        <CatalogHeader 
          itemCount={catalogItems.length} 
          isGenerating={isGenerating} 
          onClear={clearCatalog} 
          onGenerateClick={() => setShowGenDialog(true)} 
        />

        {catalogItems.length === 0 ? (
          <div className="text-center py-32 bg-white/50 rounded-3xl border-2 border-dashed border-zinc-200">
            <Bookmark className="mx-auto mb-4 text-zinc-300" size={80} />
            <p className="text-xl text-zinc-400 font-medium">Your catalog is currently empty.</p>
          </div>
        ) : (
          Object.entries(groupedCatalog).map(([title, items]) => (
            <CatalogGroup key={title} title={title} items={items} onRemove={removeItemFromCatalog} onEdit={setEditingItem} />
          ))
        )}
      </div>

      <PdfMetadataDialog 
        isOpen={showGenDialog} 
        onOpenChange={setShowGenDialog} 
        metadata={pdfMetadata} 
        setMetadata={setPdfMetadata} 
        onConfirm={handleGenerate} 
      />

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