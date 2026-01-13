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
    const footerBuffer = 25; 
    const colUnit = (pageWidth - margin * 2) / 24;
    
    // Lightest Golden Background Color (Theme: Amber/Gold 50)
    const bgColor = [255, 251, 235]; 

    // Helper to draw background on any page
    const drawBackground = () => {
      doc.setFillColor(bgColor[0], bgColor[1], bgColor[2]);
      doc.rect(0, 0, pageWidth, pageHeight, "F");
    };

    // Apply background to the first page
    drawBackground();
    let yPos = 25;

    // --- 1. Header Branding ---
    try {
      doc.addImage("/logo.png", "PNG", margin, 10, 45, 18, undefined, "FAST");
      yPos = 35;
    } catch {
      doc.setFont("helvetica", "bold").setFontSize(22).setTextColor(184, 134, 11);
      doc.text("AGRAWAL CERAMICS", margin, yPos);
      yPos += 15;
    }

    // --- 2. Product Groups Loop ---
    for (const [title, items] of Object.entries(groupedCatalog)) {
      if (yPos > pageHeight - 40) { 
        doc.addPage(); 
        drawBackground(); // Apply gold background to new page
        yPos = 20; 
      }

      doc.setFont("helvetica", "bold").setFontSize(14).setTextColor(30, 30, 30);
      doc.text(title, margin, yPos);
      yPos += 10;

      let currentX = margin;
      let usedCols = 0;
      let maxRowHeight = 0;

      for (const item of items) {
        const { width, height, colSpan } = getGridDimensions(item.sizes[0] || "Standard", item.subcategory);
        
        if (usedCols + colSpan > 24) {
          yPos += maxRowHeight + 15;
          currentX = margin;
          usedCols = 0;
          maxRowHeight = 0;
        }

        if (yPos + height + footerBuffer > pageHeight - 20) {
          doc.addPage(); 
          drawBackground(); // Apply gold background to new page
          yPos = 20; 
          currentX = margin; 
          usedCols = 0; 
          maxRowHeight = 0;
        }

        try {
          doc.addImage(item.imageUrl, "JPEG", currentX, yPos, width, height, undefined, "FAST");
          doc.setFontSize(8).setTextColor(50).text(item.name, currentX, yPos + height + 5, { maxWidth: width });
        } catch (error) { 
          console.error("Image error:", error); 
        }

        maxRowHeight = Math.max(maxRowHeight, height);
        currentX += colSpan * colUnit;
        usedCols += colSpan;
      }
      yPos += maxRowHeight + 20;
    }

    // --- 3. Split Last Page Footer (Bottom 2/5ths) ---
    const footerHeight = (pageHeight * 2) / 5; 
    const footerStartY = pageHeight - footerHeight;

    if (yPos > footerStartY) {
      doc.addPage();
      drawBackground(); // Apply gold background to new page
    }

    const midPoint = pageWidth / 2;
    let footerTextY = footerStartY + 15; 

    // --- LEFT PORTION: COMPANY LOGO ---
    const logoWidth = midPoint - margin + 7; 
    const logoHeight = 65; 
    // Shifted slightly up as per previous request
    const logoShiftedUpY = (footerStartY + (footerHeight - logoHeight) / 2) - 3;

    try {
      doc.addImage("/images/home/logoc.png", "PNG", margin - 2, logoShiftedUpY, logoWidth, logoHeight, undefined, "FAST");
    } catch {
      doc.setFont("helvetica", "bold").setFontSize(24).setTextColor(184, 134, 11);
      doc.text("AGRAWAL CERAMICS", margin + 5, footerStartY + (footerHeight / 2));
    }

    // --- RIGHT PORTION: ADDRESSES & QR CODE ---
    const rightSideStartX = midPoint + 12; 
    const rightSideWidth = midPoint - margin - 12;
    
    doc.setFont("helvetica", "bold").setFontSize(11).setTextColor(60, 60, 60);
    doc.text("OUR LOCATIONS", rightSideStartX, footerTextY);
    
    doc.setFontSize(9).setTextColor(80, 80, 80);
    footerTextY += 8;
    
    // Address 1: Morbi
    doc.setFont("helvetica", "bold").text("Morbi Office:", rightSideStartX, footerTextY);
    doc.setFont("helvetica", "normal");
    footerTextY += 5;
    doc.text("8-A, National Highway, Morbi, Gujarat 363642", rightSideStartX, footerTextY, { maxWidth: rightSideWidth });
    
    // Address 2: Kishangarh
    footerTextY += 10;
    doc.setFont("helvetica", "bold").text("Kishangarh Office:", rightSideStartX, footerTextY);
    doc.setFont("helvetica", "normal");
    footerTextY += 5;
    doc.text("Hanumangarh-Kishangarh Mega Highway, Rajasthan 305801", rightSideStartX, footerTextY, { maxWidth: rightSideWidth });
    
    // Contact Info
    footerTextY += 10;
    doc.setFont("helvetica", "bold").text("Contact:", rightSideStartX, footerTextY);
    doc.setFont("helvetica", "normal").text(" +91 7091833184", rightSideStartX + 15, footerTextY);
    footerTextY += 5;
    doc.text("Email: contact@agrawalceramics.com", rightSideStartX, footerTextY);

    // --- QR CODE POSITIONING ---
    const qrSize = 18; 
    const qrX = rightSideStartX; 
    const qrY = pageHeight - margin - qrSize - 15; 
    
    try {
      const whatsappUrl = "https://wa.me/917091833184";
      const qrApiUrl = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(whatsappUrl)}`;
      
      doc.addImage(qrApiUrl, "PNG", qrX, qrY, qrSize, qrSize);
      doc.setFontSize(7).setTextColor(100).text("WhatsApp Us", qrX, qrY + qrSize + 4);
    } catch (error) {
      console.error("QR Code Error:", error);
    }

    // --- Final Copyright Branding ---
    doc.setFontSize(8).setTextColor(160).text("© 2024 Agrawal Ceramics. All Rights Reserved.", pageWidth / 2, pageHeight - 5, { align: "center" });

    doc.save(`${metadata.title || "Agrawal_Ceramics"}_catalog.pdf`);
  };

  return { generate };
}