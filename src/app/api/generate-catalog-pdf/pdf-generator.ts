import { jsPDF } from "jspdf";

interface CatalogItem {
  id: string;
  name: string;
  imageUrl: string;
  sizes: string[];
  category: string;
  subcategory: string;
  selectedSizes: string[];
  sizeConfigs?: { [key: string]: number };
}

interface PdfMetadata {
  name: string;
  title: string;
  description: string;
}

const getBaseUrl = () => {
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return `http://localhost:${process.env.PORT || 3000}`;
};

async function getBase64Image(url: string): Promise<string | null> {
  try {
    const absoluteUrl = url.startsWith('/') ? `${getBaseUrl()}${url}` : url;
    const response = await fetch(absoluteUrl);
    if (!response.ok) return null;
    const arrayBuffer = await response.arrayBuffer();
    return `data:image/jpeg;base64,${Buffer.from(arrayBuffer).toString('base64')}`;
  } catch {
    return null;
  }
}

/**
 * REPLICATED FROM GalleryCard.tsx
 * Maps sizeString to the exact 24-column grid span and row height.
 */
function getGridDimensions(sizeString: string, colUnit: number) {
  let colSpan = 12; 
  let rowSpan = 9;

  switch (sizeString) {
    case "(POLISHED)12x24": colSpan = 12; rowSpan = 9; break;
    case "18x12/8x12": colSpan = 8; rowSpan = 8; break;
    case "12x18/12x8": colSpan = 6; rowSpan = 11; break;
    case "300x63 mm (12x2.5 inch)": colSpan = 24; rowSpan = 26; break;
    case "600x1200 mm (24x48 inch)": colSpan = 12; rowSpan = 25; break;
    case "900x600 mm": colSpan = 24; rowSpan = 18; break;
    case "24x24 inch": colSpan = 12; rowSpan = 14; break;
    case "600x600 mm": colSpan = 12; rowSpan = 14; break;
    case "600x900 mm": colSpan = 12; rowSpan = 20; break;
    case "1200x1800 mm (48x72 inch)": colSpan = 12; rowSpan = 11; break;
    case "6x36": colSpan = 12; rowSpan = 8; break;
    case "8x12": colSpan = 6; rowSpan = 11; break;
    case "12x18": colSpan = 12; rowSpan = 10; break;
    case "2x2": colSpan = 8; rowSpan = 11; break;
    case "20x600": colSpan = 24; rowSpan = 5; break;
    default: colSpan = 12; rowSpan = 9;
  }

  return {
    width: (colSpan * colUnit) - 2, // 2mm gutter
    height: rowSpan * 5, // Scaling factor to match masonry feel
    colSpan
  };
}

export async function generatePdfFromItems(items: CatalogItem[], metadata: PdfMetadata): Promise<Buffer> {
  const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 15;
  const usableWidth = pageWidth - (margin * 2);
  const colUnit = usableWidth / 24; // Align with grid-cols-24

  let yPos = 20;

  // --- Branding Header ---
  doc.setFont("helvetica", "bold").setFontSize(22).setTextColor(184, 134, 11);
  doc.text(metadata.title || "Shri Marvels Catalog", margin, yPos);
  
  yPos += 10;
  doc.setFontSize(11).setTextColor(60, 60, 60);
  doc.text(`Client: ${metadata.name || "Valued Customer"}`, margin, yPos);
  yPos += 15;

  // --- Grouping ---
  const groups: { [key: string]: CatalogItem[] } = {};
  items.forEach(item => {
    const groupKey = `${item.subcategory} (${item.sizes[0] || "Standard"})`;
    if (!groups[groupKey]) groups[groupKey] = [];
    groups[groupKey].push(item);
  });

  for (const [title, groupItems] of Object.entries(groups)) {
    if (yPos > pageHeight - 40) { doc.addPage(); yPos = 20; }

    doc.setFont("helvetica", "bold").setFontSize(14).setTextColor(30, 30, 30);
    doc.text(title, margin, yPos);
    yPos += 2;
    doc.setDrawColor(220, 220, 220).line(margin, yPos, pageWidth - margin, yPos);
    yPos += 10;

    let currentX = margin;
    let usedCols = 0;
    let maxRowHeight = 0;

    for (const item of groupItems) {
      const sizeStr = item.sizes[0] || "1x1";
      const { width, height, colSpan } = getGridDimensions(sizeStr, colUnit);

      // Row wrapping logic
      if (usedCols + colSpan > 24) {
        yPos += maxRowHeight + 15;
        currentX = margin;
        usedCols = 0;
        maxRowHeight = 0;
      }

      // Page overflow check
      if (yPos + height + 20 > pageHeight) {
        doc.addPage();
        yPos = 20;
        currentX = margin;
        usedCols = 0;
      }

      const imgData = await getBase64Image(item.imageUrl);
      if (imgData) doc.addImage(imgData, "JPEG", currentX, yPos, width, height);

      // Labeling
      doc.setFont("helvetica", "bold").setFontSize(8).text(item.name, currentX, yPos + height + 5);
      
      const configText = item.selectedSizes.map(s => `${s} (${item.sizeConfigs?.[s] || 1} Pcs)`).join(", ");
      doc.setFont("helvetica", "normal").setFontSize(6).setTextColor(100, 100, 100);
      doc.text(configText, currentX, yPos + height + 9, { maxWidth: width });

      maxRowHeight = Math.max(maxRowHeight, height);
      currentX += (colSpan * colUnit);
      usedCols += colSpan;
    }
    yPos += maxRowHeight + 20;
  }

  return Buffer.from(doc.output("arraybuffer"));
}