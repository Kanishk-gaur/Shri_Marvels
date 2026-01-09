"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { FileText, Loader2, ArrowLeft, Bookmark, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  useCatalog,
  CatalogItem,
  transformProductSizes,
} from "@/context/CatalogContext";
import { SizeSelectionDialog } from "@/components/size-selection-dialog";
import { CatalogGroup } from "@/components/catalog/CatalogGroup";
import { getSizeDisplayName, subCategoryDisplayNames } from "@/data/utils";
import { jsPDF } from "jspdf";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

/**
 * Maps sizeString to the exact 24-column grid span and row height.
 */
function getGridDimensions(sizeString: string, subcategory?: string) {
  const colUnit = 7.5;
  const rowUnit = 2.0;
  let colSpan = 8;
  let rowSpan = 16;

  if (subcategory === "Step & Riser") {
    colSpan = 24;
    rowSpan = 100;
    return { width: colSpan * colUnit - 2, height: rowSpan * rowUnit, colSpan };
  }
  if (subcategory === "Design Collection") {
    colSpan = 12;
    rowSpan = 18;
    return { width: colSpan * colUnit - 2, height: rowSpan * rowUnit, colSpan };
  }

  switch (sizeString) {
    case "(POLISHED)12x24":
      colSpan = 8;
      rowSpan = 11;
      break;
    case "18x12/8x12":
      colSpan = 8;
      rowSpan = 14;
      break;
    case "12x18/12x8":
      colSpan = 6;
      rowSpan = 20;
      break;
    case "400x600 mm (16x24 inch)":
      colSpan = 16;
      rowSpan = 26;
      break;
    case "(LUSTER)12x24":
    case "(SUGAR)12x24":
      colSpan = 8;
      rowSpan = 11;
      break;
    case "(Sugar)300x600 mm (11.8x23.6 inch)":
      colSpan = 12;
      rowSpan = 20;
      break;
    case "(GLUE)300x600 mm (11.8x23.6 inch)":
      colSpan = 12;
      rowSpan = 20;
      break;
    case "Polishing Series 300x600 mm (12x24 inch)":
      colSpan = 12;
      rowSpan = 20;
      break;
    case "300x600 mm (11.8x23.6 inch)":
      colSpan = 12;
      rowSpan = 20;
      break;
    case "300x63 mm (12x2.5 inch)":
      colSpan = 12;
      rowSpan = 8;
      break;
    case "600x1200 mm (24x48 inch)":
      colSpan = 6;
      rowSpan = 40;
      break;
    case "300x450 mm (11.8x17.7 inch)":
      colSpan = 12;
      rowSpan = 24;
      break;
    case "48x600 mm (1.89x23.6 inch)":
    case "45x600 mm (1.77x23.6 inch)":
    case "40x600 mm (1.57x23.6 inch)":
      colSpan = 16;
      rowSpan = 7;
      break;
    case "25x600 mm (0.98x23.6 inch)":
      colSpan = 16;
      rowSpan = 6;
      break;
    case "20x600 mm (0.79x23.6 inch)":
      colSpan = 16;
      rowSpan = 5;
      break;
    case "10x600 mm (0.39x23.6 inch)":
      colSpan = 16;
      rowSpan = 4;
      break;
    case "900x600 mm":
    case "900x600 mm (36x24 inch)":
    case "12x8, 18x12, 24x18, 2x2, 3x2, 4x2":
      colSpan = 12;
      rowSpan = 26;
      break;
    case "24x24 inch":
      colSpan = 8;
      rowSpan = 30;
      break;
    case "600x600 mm":
      colSpan = 8;
      rowSpan = 30;
      break;
    case "600x600 mm (23.6x23.6 inch)":
      colSpan = 8;
      rowSpan = 30;
      break;
    case "600x600 mm (24x24 inch)":
      colSpan = 8;
      rowSpan = 30;
      break;
    case "1200x1200 mm (48x48 inch)":
      colSpan = 12;
      rowSpan = 40;
      break;
    case "600x900 mm":
      colSpan = 8;
      rowSpan = 38;
      break;
    case "600x900 mm (24x36 inch)":
      colSpan = 8;
      rowSpan = 38;
      break;
    case "8x12, 12x18, 18x24, 2x2, 2x3, 2x4":
      colSpan = 8;
      rowSpan = 45;
      break;
    case "1200x600 mm":
      colSpan = 12;
      rowSpan = 26;
      break;
    case "1200x600 mm (48x24 inch)":
      colSpan = 12;
      rowSpan = 26;
      break;
    case "20x1200 mm (0.79x47.2 inch)":
      colSpan = 16;
      rowSpan = 7;
      break;
    case "12x600 mm (0.47x23.6 inch)":
      colSpan = 16;
      rowSpan = 4;
      break;
    case "12x1200 mm (0.47x47.2 inch)":
      colSpan = 16;
      rowSpan = 5;
      break;
    case "10x450 mm (0.39x17.7 inch)":
      colSpan = 16;
      rowSpan = 5;
      break;
    case "1200x1800 mm (48x72 inch)":
      colSpan = 24;
      rowSpan = 34;
      break;
    case "4x2 in":
      colSpan = 12;
      rowSpan = 15;
      break;
    case "2x4 in":
      colSpan = 12;
      rowSpan = 15;
      break;
    case "12x8 in":
      colSpan = 8;
      rowSpan = 16;
      break;
    case "(God)6x36":
      colSpan = 16;
      rowSpan = 12;
      break;
    case "6x36 in (c)":
      colSpan = 24;
      rowSpan = 10;
      break;
    case "6x36 ,9x36,12x36":
      colSpan = 24;
      rowSpan = 15;
      break;
    case "6x36(w)":
      colSpan = 24;
      rowSpan = 11;
      break;
    case "9x36":
      colSpan = 16;
      rowSpan = 10;
      break;
    case "6x36":
      colSpan = 24;
      rowSpan = 14;
      break;
    case "6x36 in":
      colSpan = 16;
      rowSpan = 7;
      break;
    case "6x36 inch":
      colSpan = 12;
      rowSpan = 6;
      break;
    case "18x12 inch":
      colSpan = 6;
      rowSpan = 12;
      break;
    case "12x18 mm":
      colSpan = 6;
      rowSpan = 20;
      break;
    case "12x18 inches":
      colSpan = 6;
      rowSpan = 24;
      break;
    case "12x18 in":
      colSpan = 6;
      rowSpan = 20;
      break;
    case "8x12 in":
      colSpan = 6;
      rowSpan = 19;
      break;
    case "12x18":
      colSpan = 8;
      rowSpan = 13;
      break;
    case "8x6":
      colSpan = 8;
      rowSpan = 30;
      break;
    case "20x600":
      colSpan = 16;
      rowSpan = 6;
      break;
    case "10x600":
      colSpan = 16;
      rowSpan = 5;
      break;
    case "900x300 mm":
      colSpan = 8;
      rowSpan = 12;
      break;
    case "1200x300 mm":
      colSpan = 12;
      rowSpan = 12;
      break;
    case "1000x300 mm":
      colSpan = 12;
      rowSpan = 17;
      break;
    case "6x48":
      colSpan = 24;
      rowSpan = 7;
      break;
    case "4x48":
      colSpan = 24;
      rowSpan = 6;
      break;
    case "4x2":
      colSpan = 8;
      rowSpan = 33;
      break;
    case "600x1200 mm":
      colSpan = 6;
      rowSpan = 40;
      break;
    case "2x4":
      colSpan = 6;
      rowSpan = 40;
      break;
    case "4x6":
      colSpan = 12;
      rowSpan = 24;
      break;
    case "4x4":
      colSpan = 12;
      rowSpan = 26;
      break;
    case "12x24":
      colSpan = 8;
      rowSpan = 11;
      break;
    case "24x4":
      colSpan = 12;
      rowSpan = 6;
      break;
    case "24x2.5":
      colSpan = 12;
      rowSpan = 5;
      break;
    case "24x2":
      colSpan = 12;
      rowSpan = 5;
      break;
    case "12x2.5":
      colSpan = 12;
      rowSpan = 8;
      break;
    case "24x1":
      colSpan = 12;
      rowSpan = 4;
      break;
    case "6x6":
      colSpan = 6;
      rowSpan = 12;
      break;
    case "8x12 inches":
      colSpan = 8;
      rowSpan = 30;
      break;
    case "8x12":
      colSpan = 6;
      rowSpan = 24;
      break;
    case "12x8":
      colSpan = 8;
      rowSpan = 13;
      break;
    case "18x12":
      colSpan = 8;
      rowSpan = 14;
      break;
    case "2x2":
      colSpan = 8;
      rowSpan = 30;
      break;
    case "200x300 mm (8x12 inch)":
      colSpan = 8;
      rowSpan = 38;
      break;
    case "2x3":
      colSpan = 8;
      rowSpan = 38;
      break;
    case "6x3":
      colSpan = 6;
      rowSpan = 12;
      break;
    case "8x4":
      colSpan = 4;
      rowSpan = 12;
      break;
    case "3x2/24x18/2x2":
      colSpan = 12;
      rowSpan = 27;
      break;
    case "300x200 mm (12x8 inch)":
      colSpan = 12;
      rowSpan = 24;
      break;
    case "3x2":
      colSpan = 12;
      rowSpan = 26;
      break;
    case "6x8":
      colSpan = 6;
      rowSpan = 16;
      break;
    case "24x3":
      colSpan = 12;
      rowSpan = 6;
      break;
  }

  return { width: colSpan * colUnit - 2, height: rowSpan * rowUnit, colSpan };
}

export default function CatalogPage() {
  const { catalogItems, removeItemFromCatalog, updateItemSizes, clearCatalog } =
    useCatalog();
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [editingItem, setEditingItem] = useState<CatalogItem | null>(null);
  const [showGenDialog, setShowGenDialog] = useState(false);
  const [pdfMetadata, setPdfMetadata] = useState({
    name: "",
    title: "",
    description: "",
  });

  const groupedCatalog = useMemo(() => {
    const groups: { [key: string]: CatalogItem[] } = {};
    catalogItems.forEach((item) => {
      const rawSize = item.sizes[0] || "Standard";
      const displaySize = getSizeDisplayName(rawSize);
      const subcatDisplayName =
        subCategoryDisplayNames[item.subcategory] || item.subcategory;
      let typeLabel = subcatDisplayName;

      if (item.category === "roof_tiles") {
        typeLabel = `Roof Tile - ${subcatDisplayName}`;
      } else if (
        item.subcategory === "Step & Riser" ||
        item.category === "step_riser"
      ) {
        typeLabel = `Step & Riser - ${item.name}`;
      }

      const groupKey = `${typeLabel} (${displaySize})`;
      if (!groups[groupKey]) groups[groupKey] = [];
      groups[groupKey].push(item);
    });
    return groups;
  }, [catalogItems]);

  const handleCreateCatalog = async () => {
    if (catalogItems.length === 0) return;
    setIsGenerating(true);
    setError(null);
    setShowGenDialog(false);

    try {
      const doc = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
        compress: true,
      });
      const pageWidth = doc.internal.pageSize.getWidth();
      const pageHeight = doc.internal.pageSize.getHeight();
      const margin = 15;
      const colUnit = (pageWidth - margin * 2) / 24;
      let yPos = 25;

      // Branding Header
      doc
        .setFont("helvetica", "bold")
        .setFontSize(22)
        .setTextColor(184, 134, 11);
      doc.text(pdfMetadata.title || "Shri Marvels Catalog", margin, yPos);

      yPos += 10;
      doc.setFontSize(11).setTextColor(60, 60, 60);
      doc.text(
        `Client: ${pdfMetadata.name || "Valued Customer"}`,
        margin,
        yPos
      );
      yPos += 15;

      for (const [title, items] of Object.entries(groupedCatalog)) {
        if (yPos > pageHeight - 40) {
          doc.addPage();
          yPos = 20;
        }

        doc
          .setFont("helvetica", "bold")
          .setFontSize(14)
          .setTextColor(30, 30, 30);
        doc.text(title, margin, yPos);
        yPos += 10;

        let currentX = margin;
        let usedCols = 0;
        let maxRowHeight = 0;

        for (const item of items) {
          const sizeStr = item.sizes[0] || "Standard";
          const { width, height, colSpan } = getGridDimensions(
            sizeStr,
            item.subcategory
          );

          if (usedCols + colSpan > 24) {
            yPos += maxRowHeight + 15;
            currentX = margin;
            usedCols = 0;
            maxRowHeight = 0;
          }

          if (yPos + height + 25 > pageHeight) {
            doc.addPage();
            yPos = 20;
            currentX = margin;
            usedCols = 0;
          }

          try {
            doc.addImage(
              item.imageUrl,
              "JPEG",
              currentX,
              yPos,
              width,
              height,
              undefined,
              "FAST"
            );
          } catch (_e) {
            // Fixed: Prefixed with underscore to ignore unused variable warning
            console.error("Skipping image due to load error:", item.imageUrl);
          }

          // 1. Draw Product Name (Existing)
          doc
            .setFontSize(8)
            .setTextColor(50, 50, 50)
            .setFont("helvetica", "bold");
          doc.text(item.name, currentX, yPos + height + 5, { maxWidth: width });

          // 2. NEW: Draw Selected Sizes and Quantities
          if (item.selectedSizes && item.selectedSizes.length > 0) {
            doc
              .setFontSize(7)
              .setTextColor(100, 100, 100)
              .setFont("helvetica", "normal");

            // Create a string like: "Selected: 2x2 (5), 2x4 (2)"
            const details = item.selectedSizes
              .map((size) => {
                const qty = item.sizeConfigs?.[size] || 0;
                return `${size} (${qty})`;
              })
              .join(", ");

            // Render the text below the product name
            doc.text(`Selected: ${details}`, currentX, yPos + height + 9, {
              maxWidth: width,
            });
          }

          maxRowHeight = Math.max(maxRowHeight, height);
          currentX += colSpan * colUnit;
          usedCols += colSpan;
        }
        yPos += maxRowHeight + 20;
      }

      doc.save(`${pdfMetadata.title || "shri_marvels"}_catalog.pdf`);
    } catch (err: unknown) {
      // Fixed: Replaced 'any' with 'unknown'
      const errorMessage =
        err instanceof Error ? err.message : "Failed to generate PDF";
      setError(
        "Failed to generate PDF. For very large catalogs, please try a smaller selection."
      );
      console.error(errorMessage);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-orange-50 pt-20 pb-20">
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
          <Link href="/gallery">
            <Button
              variant="ghost"
              className="text-zinc-600 hover:text-zinc-900 transition-colors"
            >
              <ArrowLeft className="mr-2 h-5 w-5" /> Back to Full Gallery
            </Button>
          </Link>
          <div className="text-center">
            <h1 className="text-3xl font-bold text-zinc-800">
              My Custom Catalog
            </h1>
            <p className="text-zinc-500 text-sm mt-1">
              {catalogItems.length} Products Selected
            </p>
          </div>

          <div className="flex items-center gap-3">
            {catalogItems.length > 0 && (
              <Button
                variant="outline"
                onClick={clearCatalog}
                className="border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700"
              >
                <Trash2 className="mr-2 h-4 w-4" /> Clear All
              </Button>
            )}

            <Button
              onClick={() => setShowGenDialog(true)}
              disabled={isGenerating || catalogItems.length === 0}
              className="bg-zinc-800 hover:bg-zinc-700 text-white min-w-[180px] shadow-lg"
            >
              {isGenerating ? (
                <Loader2 className="animate-spin mr-2" />
              ) : (
                <FileText className="mr-2" />
              )}
              {isGenerating ? "Processing..." : "Generate PDF"}
            </Button>
          </div>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 p-4 rounded-xl mb-8 text-center">
            {error}
          </div>
        )}

        {catalogItems.length === 0 ? (
          <div className="text-center py-32 bg-white/50 rounded-3xl border-2 border-dashed border-zinc-200">
            <Bookmark className="mx-auto mb-4 text-zinc-300" size={80} />
            <p className="text-xl text-zinc-400 font-medium">
              Your catalog is currently empty.
            </p>
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

      <Dialog open={showGenDialog} onOpenChange={setShowGenDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Catalog Details</DialogTitle>
            <DialogDescription>
              Enter the details you want to appear on the front page of your
              PDF.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <label
                htmlFor="name"
                className="text-sm font-medium text-zinc-700"
              >
                Client Name
              </label>
              <Input
                id="name"
                placeholder="e.g. John Doe"
                value={pdfMetadata.name}
                onChange={(e) =>
                  setPdfMetadata((prev) => ({ ...prev, name: e.target.value }))
                }
              />
            </div>
            <div className="grid gap-2">
              <label
                htmlFor="title"
                className="text-sm font-medium text-zinc-700"
              >
                Catalog Title
              </label>
              <Input
                id="title"
                placeholder="e.g. Living Room Renovation"
                value={pdfMetadata.title}
                onChange={(e) =>
                  setPdfMetadata((prev) => ({ ...prev, title: e.target.value }))
                }
              />
            </div>
            <div className="grid gap-2">
              <label
                htmlFor="description"
                className="text-sm font-medium text-zinc-700"
              >
                Notes / Description
              </label>
              <Textarea
                id="description"
                placeholder="Any specific requirements or notes..."
                rows={3}
                value={pdfMetadata.description}
                onChange={(e) =>
                  setPdfMetadata((prev) => ({
                    ...prev,
                    description: e.target.value,
                  }))
                }
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowGenDialog(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleCreateCatalog}
              className="bg-zinc-800 text-white hover:bg-zinc-700"
            >
              Confirm & Generate
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

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
