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

function getGridDimensions(sizeString: string, colUnit: number) {
  let colSpan = 12; 
  let rowSpan = 16;

  switch (sizeString) {
    case "(POLISHED)12x24": colSpan = 8; rowSpan = 11; break;
    case "18x12/8x12": colSpan = 8; rowSpan = 14; break;
    case "12x18/12x8": colSpan = 6; rowSpan = 20; break;
    case "400x600 mm (16x24 inch)": colSpan = 16; rowSpan = 18; break;
    case "300x63 mm (12x2.5 inch)": colSpan = 12; rowSpan = 8; break;
    case "600x1200 mm (24x48 inch)": colSpan = 8; rowSpan = 32; break;
    case "1200x1800 mm (48x72 inch)": colSpan = 24; rowSpan = 34; break;
    case "6x36": colSpan = 24; rowSpan = 14; break;
    case "20x600": colSpan = 16; rowSpan = 6; break;
    case "8x12": colSpan = 6; rowSpan = 20; break;
    case "12x8": colSpan = 8; rowSpan = 13; break;
    case "2x2": colSpan = 8; rowSpan = 18; break;
    default: colSpan = 12; rowSpan = 16;
  }

  return {
    width: (colSpan * colUnit) - 2,
    height: rowSpan * 2.5,
    colSpan
  };
}

export async function generatePdfFromItems(items: CatalogItem[], metadata: PdfMetadata): Promise<ArrayBuffer> {
  const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 15;
  const usableWidth = pageWidth - (margin * 2);
  const colUnit = usableWidth / 24;

  let yPos = 25;

  doc.setFont("helvetica", "bold").setFontSize(22).setTextColor(184, 134, 11);
  doc.text(metadata.title || "Shri Marvels Catalog", margin, yPos);
  yPos += 15;

  let currentX = margin;
  let usedCols = 0;
  let maxRowHeight = 0;

  for (const item of items) {
    const sizeStr = item.sizes?.[0] || "Standard";
    const { width, height, colSpan } = getGridDimensions(sizeStr, colUnit);

    if (usedCols + colSpan > 24) {
      yPos += maxRowHeight + 15;
      currentX = margin;
      usedCols = 0;
      maxRowHeight = 0;
    }

    if (yPos + height + 20 > pageHeight) {
      doc.addPage();
      yPos = 20;
      currentX = margin;
      usedCols = 0;
    }

    const imgData = await getBase64Image(item.imageUrl);
    if (imgData) {
      doc.addImage(imgData, "JPEG", currentX, yPos, width, height);
      doc.setFontSize(8).setTextColor(50).text(item.name, currentX, yPos + height + 5, { maxWidth: width });
    }

    maxRowHeight = Math.max(maxRowHeight, height);
    currentX += (colSpan * colUnit);
    usedCols += colSpan;
  }

  return doc.output("arraybuffer");
}