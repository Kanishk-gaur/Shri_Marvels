// src/hooks/usePdfGenerator.ts (Optimized with Page-Break Protection)
import { jsPDF } from "jspdf";
import { getGridDimensions } from "@/components/catalog/GridDimensions";

export function usePdfGenerator() {
  const generate = async (groupedCatalog: any, metadata: any) => {
    const doc = new jsPDF({ 
      orientation: "portrait", 
      unit: "mm", 
      format: "a4", 
      compress: true 
    });

    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const margin = 15;
    const footerBuffer = 25; // Space reserved for text below the image
    const colUnit = (pageWidth - margin * 2) / 24;
    let yPos = 25;

    // ... Header Branding Logic ...

    for (const [title, items] of Object.entries(groupedCatalog)) {
      // Check if title fits, else new page
      if (yPos > pageHeight - 30) { 
        doc.addPage(); 
        yPos = 20; 
      }

      doc.setFont("helvetica", "bold").setFontSize(14).setTextColor(30, 30, 30);
      doc.text(title, margin, yPos);
      yPos += 10;

      let currentX = margin;
      let usedCols = 0;
      let maxRowHeight = 0;

      for (const item of items as any[]) {
        const { width, height, colSpan } = getGridDimensions(
          item.sizes[0] || "Standard", 
          item.subcategory
        );

        // FIX 1: Check if we need to wrap to a NEW ROW
        if (usedCols + colSpan > 24) {
          yPos += maxRowHeight + 15;
          currentX = margin;
          usedCols = 0;
          maxRowHeight = 0;
        }

        // FIX 2: PREVENT IMAGE CUTTING
        // If (Current Y + Image Height + Text Space) > Page Height, move to next page
        if (yPos + height + footerBuffer > pageHeight) {
          doc.addPage();
          yPos = 20; // Reset Y to top of new page
          currentX = margin;
          usedCols = 0;
          maxRowHeight = 0;
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
          
          // Draw Name and Selection details
          doc.setFontSize(8).text(item.name, currentX, yPos + height + 5, { maxWidth: width });
          
          if (item.selectedSizes?.length > 0) {
            const details = item.selectedSizes
              .map((s: string) => `${s} (${item.sizeConfigs?.[s] || 0})`)
              .join(", ");
            doc.setFontSize(7).text(`Qty: ${details}`, currentX, yPos + height + 9, { maxWidth: width });
          }
        } catch (e) {
          console.error("Image load error", e);
        }

        maxRowHeight = Math.max(maxRowHeight, height);
        currentX += colSpan * colUnit;
        usedCols += colSpan;
      }
      
      // Advance Y position after finishing a group
      yPos += maxRowHeight + 20;
    }

    doc.save(`${metadata.title || "shri_marvels"}_catalog.pdf`);
  };

  return { generate };
}