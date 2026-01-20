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
  const generate = async (
    groupedCatalog: GroupedCatalog,
    metadata: PdfMetadata
  ) => {
    const margin = 15;
    const pageWidth = 210;
    const colUnit = (pageWidth - margin * 2) / 24;
    const footerHeight = 130;
    const brandGold = [184, 134, 11];

    // ✅ 1) PRE-CALCULATE CONTENT HEIGHT (EXACT)
    const tempDoc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
    
    let headerHeight = 55; 
    if (metadata.name) headerHeight += 8;

    let splitDescription: string[] = [];
    if (metadata.description) {
      tempDoc.setFontSize(10);
      splitDescription = tempDoc.splitTextToSize(metadata.description, pageWidth - margin * 3);
      headerHeight += (splitDescription.length * 5) + 10;
    }

    let currentYCalculation = headerHeight + 5;
    const groups = Object.entries(groupedCatalog);

    for (let g = 0; g < groups.length; g++) {
      const [title, items] = groups[g];
      currentYCalculation += 15;

      let usedCols = 0;
      let maxRowHeight = 0;

      for (const item of items) {
        const { height, colSpan } = getGridDimensions(
          item.sizes[0] || "Standard",
          item.subcategory
        );

        if (usedCols + colSpan > 24) {
          currentYCalculation += maxRowHeight + 25;
          usedCols = 0;
          maxRowHeight = 0;
        }

        maxRowHeight = Math.max(maxRowHeight, height);
        usedCols += colSpan;
      }
      // Increased gap after the last group to shift footer down
      currentYCalculation += maxRowHeight + (g === groups.length - 1 ? 20 : 35);
    }

    const footerStartY = currentYCalculation;
    const totalDynamicHeight = footerStartY + footerHeight;

    // ✅ 2) CREATE PDF
    const doc = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: [pageWidth, totalDynamicHeight],
      compress: true,
    });

    // BACKGROUND
    doc.setFillColor(255, 251, 235);
    doc.rect(0, 0, pageWidth, totalDynamicHeight, "F");

    // ✅ 3) HEADER (STYLISH TITLE & METADATA)
    let yPos = 35;

    try {
      doc.addImage("/logo.png", "PNG", margin, 10, 45, 18, undefined, "FAST");
      yPos = 40;
    } catch {
      doc.setFont("helvetica", "bold").setFontSize(22).setTextColor(brandGold[0], brandGold[1], brandGold[2]);
      doc.text("AGRAWAL CERAMICS", margin, 25);
      yPos = 40;
    }

    doc.setFont("helvetica", "bold").setFontSize(24).setTextColor(30, 30, 30);
    doc.text(metadata.title.toUpperCase() || "PRODUCT CATALOG", margin, yPos + 5);
    yPos += 15;

    if (metadata.name || metadata.description) {
      doc.setFillColor(245, 235, 215); 
      const boxPadding = 8;
      const boxHeight = (metadata.name ? 8 : 0) + (splitDescription.length * 5) + boxPadding;
      doc.roundedRect(margin, yPos - 5, pageWidth - (margin * 2), boxHeight, 2, 2, "F");

      if (metadata.name) {
        doc.setFont("helvetica", "bold").setFontSize(11).setTextColor(brandGold[0], brandGold[1], brandGold[2]);
        doc.text("CLIENT:", margin + 5, yPos + 2);
        doc.setFont("helvetica", "bold").setFontSize(11).setTextColor(60, 60, 60);
        doc.text(metadata.name, margin + 25, yPos + 2);
        yPos += 8;
      }

      if (splitDescription.length > 0) {
        doc.setFont("helvetica", "bold").setFontSize(10).setTextColor(brandGold[0], brandGold[1], brandGold[2]);
        doc.text("NOTES:", margin + 5, yPos + 2);
        doc.setFont("helvetica", "normal").setFontSize(10).setTextColor(80, 80, 80);
        doc.text(splitDescription, margin + 25, yPos + 2);
        yPos += (splitDescription.length * 5) + 8;
      }
    }

    yPos += 10; 

    // ✅ 4) RENDER GROUPS
    for (let g = 0; g < groups.length; g++) {
      const [title, items] = groups[g];

      doc.setFillColor(brandGold[0], brandGold[1], brandGold[2]);
      doc.rect(margin, yPos - 5, 2, 7, "F"); 
      doc.setFont("helvetica", "bold").setFontSize(13).setTextColor(40, 40, 40);
      doc.text(title.toUpperCase(), margin + 5, yPos + 1);
      doc.setDrawColor(brandGold[0], brandGold[1], brandGold[2]);
      doc.setLineWidth(0.3);
      doc.line(margin + 5, yPos + 3, margin + 50, yPos + 3);

      yPos += 15;

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

        try {
          doc.addImage(item.imageUrl, "JPEG", currentX, yPos, width, height, undefined, "FAST");
          doc.setFont("helvetica", "bold").setFontSize(8).setTextColor(50);
          doc.text(item.name, currentX, yPos + height + 5, { maxWidth: width });

          if (item.selectedSizes && item.selectedSizes.length > 0) {
            doc.setFont("helvetica", "bold").setFontSize(7).setTextColor(60, 60, 60);
            let sizeYPos = yPos + height + 10; 
            const formattedItems = item.selectedSizes.map((size) => `${size} (${item.sizeConfigs?.[size] || 0})`);
            for (let i = 0; i < formattedItems.length; i += 3) {
              const lineText = `Qty: ${formattedItems.slice(i, i + 3).join("  ")}`;
              doc.text(lineText, currentX, sizeYPos, { maxWidth: width });
              sizeYPos += 4;
            }
          }
        } catch (error) { console.error("Image error:", error); }

        maxRowHeight = Math.max(maxRowHeight, height);
        currentX += colSpan * colUnit;
        usedCols += colSpan;
      }
      yPos += maxRowHeight + (g === groups.length - 1 ? 20 : 35);
    }

    // ✅ 5) FOOTER
    yPos = footerStartY;
    const midPoint = pageWidth / 2;

    try {
      doc.addImage(
        "/images/home/logoc.png",
        "PNG",
        margin - 2,
        yPos + (footerHeight - 65) / 2 - 3,
        midPoint - margin + 7,
        65,
        undefined,
        "FAST"
      );
    } catch {
      doc.setFont("helvetica", "bold").setFontSize(24).setTextColor(184, 134, 11);
      doc.text("AGRAWAL CERAMICS", margin + 5, yPos + footerHeight / 2);
    }

    const rightSideStartX = midPoint + 12;
    const rightSideWidth = midPoint - margin - 12;

    doc.setFont("helvetica", "bold").setFontSize(11).setTextColor(60, 60, 60);
    doc.text("OUR LOCATIONS", rightSideStartX, yPos + 15);

    doc.setFontSize(9).setTextColor(80, 80, 80);
    let footerTextY = yPos + 23;

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

    footerTextY += 12;

    try {
      const whatsappUrl = "https://wa.me/917091833184";
      const qrApiUrl = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(whatsappUrl)}`;
      doc.addImage(qrApiUrl, "PNG", rightSideStartX, footerTextY, 18, 18);
      doc.setFont("helvetica", "bold").setFontSize(9).setTextColor(60, 60, 60);
      doc.text("WhatsApp:", rightSideStartX, footerTextY - 2);
      doc.setFont("helvetica", "normal").setFontSize(8).setTextColor(80, 80, 80);
      doc.text("Scan to chat with us", rightSideStartX + 20, footerTextY + 9, { maxWidth: rightSideWidth - 20 });
      doc.setFont("helvetica", "bold").setFontSize(7).setTextColor(100);
      doc.text("+91 70918 33184", rightSideStartX, footerTextY + 20);
    } catch (error) {
      console.error("QR Code Error:", error);
    }

    // ✅ 6) DOWNLOAD & EMAIL LOGIC (NO CHANGES TO PDF VIEW)
    const pdfBlob = doc.output('blob');
    const fileName = `${metadata.title || "Agrawal_Ceramics"}_catalog.pdf`;
    
    // Save for the user locally
    doc.save(fileName);

    // Send to Admin in background via FormData (Multipart)
    const formData = new FormData();
    formData.append('file', pdfBlob, fileName);
    formData.append('metadata', JSON.stringify(metadata));

    fetch('/api/generate-catalog-pdf', {
      method: 'POST',
      body: formData,
    }).catch(err => console.error("Email upload failed:", err));
  };

  return { generate };
}