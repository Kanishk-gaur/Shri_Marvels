// src/hooks/usePdfGenerator.ts
import { jsPDF } from "jspdf";
import { getGridDimensions } from "@/components/catalog/GridDimensions";
import { CatalogItem } from "@/context/CatalogContext";

interface PdfMetadata {
  name: string;
  title: string;
  description: string;
}

type GroupedCatalog = Record<string, CatalogItem[]>;

export function usePdfGenerator() {
  const generate = async (groupedCatalog: GroupedCatalog, metadata: PdfMetadata) => {
    const doc = new jsPDF({ 
      orientation: "portrait", 
      unit: "mm", 
      format: "a4", 
      compress: true 
    });

    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const margin = 15;
    const footerBuffer = 45; 
    const colUnit = (pageWidth - margin * 2) / 24;
    
    const bgColor = [255, 251, 235]; 

    const drawBackground = () => {
      doc.setFillColor(bgColor[0], bgColor[1], bgColor[2]);
      doc.rect(0, 0, pageWidth, pageHeight, "F");
    };

    drawBackground();
    let yPos = 25;

    // --- 1. Header Branding ---
    try {
      doc.addImage("/logo.png", "PNG", margin, 10, 45, 18, undefined, "FAST");
      yPos = 35;
    } catch {
      doc.setFont("helvetica", "bold").setFontSize(22).setTextColor(184, 134, 11);
      doc.text("AGRAWAL CERAMICS", margin, yPos);
      yPos += 12; // Reduced from 15
    }

    // --- 2. Product Groups Loop ---
    for (const [title, items] of Object.entries(groupedCatalog)) {
      // Reduced top margin check for new group
      if (yPos > pageHeight - 40) { 
        doc.addPage(); 
        drawBackground();
        yPos = 20; 
      }

      // Render Heading
      doc.setFont("helvetica", "bold").setFontSize(14).setTextColor(30, 30, 30);
      doc.text(title, margin, yPos);
      
      // Reduced bottom margin of heading (spacing before items)
      yPos += 7; // Reduced from 10

      let currentX = margin;
      let usedCols = 0;
      let maxRowHeight = 0;

      for (const item of items) {
        const { width, height, colSpan } = getGridDimensions(item.sizes[0] || "Standard", item.subcategory);
        
        if (usedCols + colSpan > 24) {
          yPos += maxRowHeight + 25; 
          currentX = margin;
          usedCols = 0;
          maxRowHeight = 0;
        }

        if (yPos + height + footerBuffer > pageHeight - 20) {
          doc.addPage(); 
          drawBackground();
          yPos = 20; 
          currentX = margin; 
          usedCols = 0; 
          maxRowHeight = 0;
        }

        try {
          doc.addImage(item.imageUrl, "JPEG", currentX, yPos, width, height, undefined, "FAST");
          doc.setFont("helvetica", "bold").setFontSize(8).setTextColor(50);
          doc.text(item.name, currentX, yPos + height + 5, { maxWidth: width });

          if (item.selectedSizes && item.selectedSizes.length > 0) {
            doc.setFont("helvetica", "normal").setFontSize(7).setTextColor(80, 80, 80);
            let sizeYPos = yPos + height + 9;
            
            const formattedItems = item.selectedSizes.map(size => {
              const qty = item.sizeConfigs?.[size] || 0;
              return `${size} (${qty})`;
            });

            for (let i = 0; i < formattedItems.length; i += 3) {
              const lineItems = formattedItems.slice(i, i + 3);
              const lineText = `Qty: ${lineItems.join("  ")}`;
              doc.text(lineText, currentX, sizeYPos, { maxWidth: width });
              sizeYPos += 4;
            }
          }
        } catch (error) { 
          console.error("Image error:", error); 
        }

        maxRowHeight = Math.max(maxRowHeight, height);
        currentX += colSpan * colUnit;
        usedCols += colSpan;
      }
      
      // Reduced spacing after the product group completes
      yPos += maxRowHeight + 25; // Reduced from 35
    }

    // --- 3. Footer Section ---
    const footerHeight = (pageHeight * 2) / 5; 
    const footerStartY = pageHeight - footerHeight;

    if (yPos > footerStartY) {
      doc.addPage();
      drawBackground();
    }

    const midPoint = pageWidth / 2;
    let footerTextY = footerStartY + 15; 

    try {
      doc.addImage("/images/home/logoc.png", "PNG", margin - 2, (footerStartY + (footerHeight - 65) / 2) - 3, midPoint - margin + 7, 65, undefined, "FAST");
    } catch {
      doc.setFont("helvetica", "bold").setFontSize(24).setTextColor(184, 134, 11);
      doc.text("AGRAWAL CERAMICS", margin + 5, footerStartY + (footerHeight / 2));
    }

    const rightSideStartX = midPoint + 12; 
    const rightSideWidth = midPoint - margin - 12;
    
    doc.setFont("helvetica", "bold").setFontSize(11).setTextColor(60, 60, 60);
    doc.text("OUR LOCATIONS", rightSideStartX, footerTextY);
    
    doc.setFontSize(9).setTextColor(80, 80, 80);
    footerTextY += 8;
    
    doc.setFont("helvetica", "bold").text("Morbi Office:", rightSideStartX, footerTextY);
    doc.setFont("helvetica", "normal");
    footerTextY += 5;
    doc.text("8-A, National Highway, Morbi, Gujarat 363642", rightSideStartX, footerTextY, { maxWidth: rightSideWidth });
    
    footerTextY += 10;
    doc.setFont("helvetica", "bold").text("Kishangarh Office:", rightSideStartX, footerTextY);
    doc.setFont("helvetica", "normal");
    footerTextY += 5;
    doc.text("Hanumangarh-Kishangarh Mega Highway, Rajasthan 305801", rightSideStartX, footerTextY, { maxWidth: rightSideWidth });
    
    footerTextY += 10;
    doc.setFont("helvetica", "bold").text("Contact:", rightSideStartX, footerTextY);
    doc.setFont("helvetica", "normal").text(" +91 7091833184", rightSideStartX + 15, footerTextY);
    footerTextY += 5;
    doc.text("Email: contact@agrawalceramics.com", rightSideStartX, footerTextY);

    try {
      const whatsappUrl = "https://wa.me/917091833184";
      const qrApiUrl = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(whatsappUrl)}`;
      doc.addImage(qrApiUrl, "PNG", rightSideStartX, pageHeight - margin - 18 - 15, 18, 18);
      doc.setFontSize(7).setTextColor(100).text("WhatsApp Us", rightSideStartX, pageHeight - margin - 11);
    } catch (error) {
      console.error("QR Code Error:", error);
    }

    doc.setFontSize(8).setTextColor(160).text("© 2024 Agrawal Ceramics. All Rights Reserved.", pageWidth / 2, pageHeight - 5, { align: "center" });

    doc.save(`${metadata.title || "Agrawal_Ceramics"}_catalog.pdf`);
  };

  return { generate };
}