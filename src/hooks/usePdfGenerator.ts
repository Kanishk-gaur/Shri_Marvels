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

    // ✅ GET GROUPS
    const groups = Object.entries(groupedCatalog);

    // ✅ 1) PRE-CALCULATE CONTENT HEIGHT (EXACT)
    let currentYCalculation = 45;

    for (let g = 0; g < groups.length; g++) {
      const [title, items] = groups[g];

      currentYCalculation += 15; // group title space

      let usedCols = 0;
      let maxRowHeight = 0;

      for (const item of items) {
        const { height, colSpan } = getGridDimensions(
          item.sizes[0] || "Standard",
          item.subcategory
        );

        if (usedCols + colSpan > 24) {
          currentYCalculation += maxRowHeight + 25; // row gap
          usedCols = 0;
          maxRowHeight = 0;
        }

        maxRowHeight = Math.max(maxRowHeight, height);
        usedCols += colSpan;
      }

      // ✅ IMPORTANT: for LAST group add less gap
      currentYCalculation += maxRowHeight + (g === groups.length - 1 ? 0 : 35);
    }

    // ✅ This is EXACT position where footer should start (touching last image)
    const footerStartY = currentYCalculation;

    // ✅ Total height ends exactly after footer
    const totalDynamicHeight = footerStartY + footerHeight;

    // ✅ 2) CREATE PDF
    const doc = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: [pageWidth, totalDynamicHeight],
      compress: true,
    });

    // ✅ BACKGROUND
    doc.setFillColor(255, 251, 235);
    doc.rect(0, 0, pageWidth, totalDynamicHeight, "F");

    let yPos = 35;

    // ✅ 3) HEADER
    try {
      doc.addImage("/logo.png", "PNG", margin, 10, 45, 18, undefined, "FAST");
      yPos = 40;
    } catch {
      doc.setFont("helvetica", "bold").setFontSize(22).setTextColor(184, 134, 11);
      doc.text("AGRAWAL CERAMICS", margin, 25);
      yPos = 40;
    }

    // ✅ 4) RENDER GROUPS (MATCHING EXACT SAME LOGIC)
    for (let g = 0; g < groups.length; g++) {
      const [title, items] = groups[g];

      doc.setFont("helvetica", "bold").setFontSize(14).setTextColor(30, 30, 30);
      doc.text(title, margin, yPos);
      yPos += 10;

      let currentX = margin;
      let usedCols = 0;
      let maxRowHeight = 0;

      for (const item of items) {
        const { width, height, colSpan } = getGridDimensions(
          item.sizes[0] || "Standard",
          item.subcategory
        );

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

            let sizeYPos = yPos + height + 9;

            const formattedItems = item.selectedSizes.map((size) => {
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

      // ✅ IMPORTANT: LAST group should add 0 space after last row
      yPos += maxRowHeight + (g === groups.length - 1 ? 0 : 35);
    }

    // ✅ NOW FORCE FOOTER TO START EXACTLY WHERE LAST IMAGE ENDED
    // (no empty gap)
    yPos = footerStartY;

    // ✅ 5) FOOTER
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
    doc.text("8-A, National Highway, Morbi, Gujarat 363642", rightSideStartX, footerTextY, {
      maxWidth: rightSideWidth,
    });

    footerTextY += 10;
    doc.setFont("helvetica", "bold").text("Kishangarh Office:", rightSideStartX, footerTextY);
    doc.setFont("helvetica", "normal");
    footerTextY += 5;
    doc.text("Hanumangarh-Kishangarh Mega Highway, Rajasthan 305801", rightSideStartX, footerTextY, {
      maxWidth: rightSideWidth,
    });

    footerTextY += 10;
    doc.setFont("helvetica", "bold").text("Contact:", rightSideStartX, footerTextY);
    doc.setFont("helvetica", "normal").text(" +91 7091833184", rightSideStartX + 15, footerTextY);
    footerTextY += 5;
    doc.text("Email: contact@agrawalceramics.com", rightSideStartX, footerTextY);

    // ✅ WhatsApp QR
    footerTextY += 12;

    try {
      const whatsappUrl = "https://wa.me/917091833184";
      const qrApiUrl = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(
        whatsappUrl
      )}`;

      doc.addImage(qrApiUrl, "PNG", rightSideStartX, footerTextY, 18, 18);

      doc.setFont("helvetica", "bold").setFontSize(9).setTextColor(60, 60, 60);
      doc.text("WhatsApp:", rightSideStartX, footerTextY - 2);

      doc.setFont("helvetica", "normal").setFontSize(8).setTextColor(80, 80, 80);
      doc.text("Scan to chat with us", rightSideStartX + 20, footerTextY + 9, {
        maxWidth: rightSideWidth - 20,
      });

      doc.setFont("helvetica", "bold").setFontSize(7).setTextColor(100);
      doc.text("+91 70918 33184", rightSideStartX, footerTextY + 20);
    } catch (error) {
      console.error("QR Code Error:", error);

      doc.setFont("helvetica", "bold").setFontSize(9).setTextColor(60, 60, 60);
      doc.text("WhatsApp:", rightSideStartX, footerTextY);
      doc.setFont("helvetica", "normal").setFontSize(8).setTextColor(80, 80, 80);
      doc.text("+91 70918 33184", rightSideStartX + 18, footerTextY);
    }

    doc.save(`${metadata.title || "Agrawal_Ceramics"}_catalog.pdf`);
  };

  return { generate };
}
