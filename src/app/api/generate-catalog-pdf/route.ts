import { type NextRequest } from 'next/server';
import { jsPDF } from "jspdf";

/**
 * FIXED: Resolves the domain for server-side fetching of local images
 */
function getBaseUrl() {
  if (process.env.NEXT_PUBLIC_SITE_URL) return process.env.NEXT_PUBLIC_SITE_URL;
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return `http://localhost:${process.env.PORT || 3000}`;
}

/**
 * FIXED: Detects if the image is PNG or JPEG to prevent rendering failure
 */
async function getBase64Image(url: string): Promise<{ data: string; format: string } | null> {
  try {
    const baseUrl = getBaseUrl();
    const absoluteUrl = url.startsWith('/') ? `${baseUrl}${url}` : url;
    
    const response = await fetch(absoluteUrl);
    if (!response.ok) return null;

    const arrayBuffer = await response.arrayBuffer();
    const contentType = response.headers.get('content-type') || 'image/jpeg';
    const base64 = Buffer.from(arrayBuffer).toString('base64');
    
    // Determine the format for jsPDF
    const format = contentType.includes('png') ? 'PNG' : 'JPEG';
    

    return {
      data: `data:${contentType};base64,${base64}`,
      format: format
    };
  } catch (error) {
    console.error("PDF Image Fetch Error:", error);
    return null;
  }
}
/**
 * MASONRY GRID MAPPING
 * Mirrors dimensions from src/components/gallery-card.tsx
 */
function getGridDimensions(sizeString: string) {
  const colUnit = 7.5; 
  const rowUnit = 2.0; 
  
  let colSpan = 6; 
  let rowSpan = 16;

  switch (sizeString) {
    case "(POLISHED)12x24": colSpan = 8; rowSpan = 11; break;
    case "18x12/8x12": colSpan = 8; rowSpan = 14; break;
    case "12x18/12x8": colSpan = 6; rowSpan = 20; break;
    case "400x600 mm (16x24 inch)": colSpan = 16; rowSpan = 18; break;
    case "(LUSTER)12x24":
    case "(SUGAR)12x24": colSpan = 8; rowSpan = 11; break;
    case "(Sugar)300x600 mm (11.8x23.6 inch)":
    case "(GLUE)300x600 mm (11.8x23.6 inch)":
    case "Polishing Series 300x600 mm (12x24 inch)":
    case "300x600 mm (11.8x23.6 inch)": colSpan = 12; rowSpan = 14; break;
    case "300x63 mm (12x2.5 inch)": colSpan = 12; rowSpan = 8; break;
    case "600x1200 mm (24x48 inch)": colSpan = 8; rowSpan = 32; break;
    case "300x450 mm (11.8x17.7 inch)": colSpan = 12; rowSpan = 16; break;
    case "48x600 mm (1.89x23.6 inch)":
    case "45x600 mm (1.77x23.6 inch)":
    case "40x600 mm (1.57x23.6 inch)": colSpan = 16; rowSpan = 7; break;
    case "25x600 mm (0.98x23.6 inch)": colSpan = 16; rowSpan = 6; break;
    case "20x600 mm (0.79x23.6 inch)": colSpan = 16; rowSpan = 5; break;
    case "10x600 mm (0.39x23.6 inch)": colSpan = 16; rowSpan = 4; break;
    case "900x600 mm":
    case "900x600 mm (36x24 inch)":
    case "12x8, 18x12, 24x18, 2x2, 3x2, 4x2": colSpan = 16; rowSpan = 23; break;
    case "24x24 inch":
    case "600x600 mm":
    case "600x600 mm (23.6x23.6 inch)":
    case "600x600 mm (24x24 inch)":
    case "1200x1200 mm (48x48 inch)": colSpan = 12; rowSpan = 25; break;
    case "600x900 mm": colSpan = 8; rowSpan = 25; break;
    case "600x900 mm (24x36 inch)": colSpan = 12; rowSpan = 36; break;
    case "8x12, 12x18, 18x24, 2x2, 2x3, 2x4": colSpan = 12; rowSpan = 37; break;
    case "1200x600 mm":
    case "1200x600 mm (48x24 inch)": colSpan = 16; rowSpan = 18; break;
    case "20x1200 mm (0.79x47.2 inch)": colSpan = 16; rowSpan = 7; break;
    case "12x600 mm (0.47x23.6 inch)": colSpan = 16; rowSpan = 4; break;
    case "12x1200 mm (0.47x47.2 inch)": colSpan = 16; rowSpan = 5; break;
    case "10x450 mm (0.39x17.7 inch)": colSpan = 16; rowSpan = 5; break;
    case "1200x1800 mm (48x72 inch)": colSpan = 24; rowSpan = 34; break;
    case "4x2 in": colSpan = 12; rowSpan = 15; break;
    case "2x4 in": colSpan = 12; rowSpan = 15; break;
    case "12x8 in": colSpan = 8; rowSpan = 12; break;
    case "(God)6x36": colSpan = 16; rowSpan = 12; break;
    case "6x36 in (c)": colSpan = 24; rowSpan = 10; break;
    case "6x36 ,9x36,12x36": colSpan = 24; rowSpan = 15; break;
    case "6x36(w)": colSpan = 24; rowSpan = 11; break;
    case "9x36": colSpan = 16; rowSpan = 10; break;
    case "6x36": colSpan = 24; rowSpan = 14; break;
    case "6x36 in": colSpan = 16; rowSpan = 7; break;
    case "6x36 inch": colSpan = 12; rowSpan = 6; break;
    case "18x12 inch": colSpan = 8; rowSpan = 12; break;
    case "12x18 mm": colSpan = 6; rowSpan = 20; break;
    case "12x18 inches": colSpan = 6; rowSpan = 20; break;
    case "12x18 in": colSpan = 6; rowSpan = 20; break;
    case "8x12 in": colSpan = 6; rowSpan = 19; break;
    case "12x18": colSpan = 8; rowSpan = 13; break;
    case "8x6": colSpan = 8; rowSpan = 25; break;
    case "20x600": colSpan = 16; rowSpan = 6; break;
    case "10x600": colSpan = 16; rowSpan = 5; break;
    case "900x300 mm": colSpan = 8; rowSpan = 12; break;
    case "1200x300 mm": colSpan = 12; rowSpan = 12; break;
    case "1000x300 mm": colSpan = 12; rowSpan = 17; break;
    case "6x48": colSpan = 24; rowSpan = 7; break;
    case "4x48": colSpan = 24; rowSpan = 6; break;
    case "4x2": colSpan = 8; rowSpan = 33; break;
    case "600x1200 mm": colSpan = 8; rowSpan = 33; break;
    case "2x4": colSpan = 8; rowSpan = 33; break;
    case "4x6": colSpan = 12; rowSpan = 17; break;
    case "4x4": colSpan = 12; rowSpan = 26; break;
    case "12x24": colSpan = 8; rowSpan = 11; break;
    case "24x4": colSpan = 12; rowSpan = 6; break;
    case "24x2.5": colSpan = 12; rowSpan = 5; break;
    case "24x2": colSpan = 12; rowSpan = 5; break;
    case "12x2.5": colSpan = 12; rowSpan = 8; break;
    case "24x1": colSpan = 12; rowSpan = 4; break;
    case "6x6": colSpan = 6; rowSpan = 12; break;
    case "8x12 inches": colSpan = 12; rowSpan = 24; break;
    case "8x12": colSpan = 6; rowSpan = 20; break;
    case "12x8": colSpan = 8; rowSpan = 13; break;
    case "18x12": colSpan = 8; rowSpan = 14; break;
    case "2x2": colSpan = 8; rowSpan = 18; break;
    case "200x300 mm (8x12 inch)": colSpan = 8; rowSpan = 25; break;
    case "2x3": colSpan = 8; rowSpan = 25; break;
    case "6x3": colSpan = 6; rowSpan = 12; break;
    case "8x4": colSpan = 4; rowSpan = 12; break;
    case "3x2/24x18/2x2": colSpan = 12; rowSpan = 18; break;
    case "300x200 mm (12x8 inch)": colSpan = 12; rowSpan = 17; break;
    case "3x2": colSpan = 12; rowSpan = 17; break;
    case "6x8": colSpan = 6; rowSpan = 16; break;
    case "24x3": colSpan = 12; rowSpan = 6; break;
  }

  return { width: (colSpan * colUnit) - 2, height: rowSpan * rowUnit, colSpan };
}

async function generatePdfFromItems(items: any[], metadata: any): Promise<ArrayBuffer> {
  const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 15;
  const colUnit = (pageWidth - (margin * 2)) / 24;
  let yPos = 25;

  // Branding Header
  doc.setFont("helvetica", "bold").setFontSize(22).setTextColor(184, 134, 11);
  doc.text(metadata.title || "Agrawal Ceramics Catalog", margin, yPos);
  yPos += 15;

  const groups: Record<string, any[]> = {};
  items.forEach(item => {
    const key = item.subcategory || "General";
    if (!groups[key]) groups[key] = [];
    groups[key].push(item);
  });

  for (const [title, groupItems] of Object.entries(groups)) {
    if (yPos > pageHeight - 40) { doc.addPage(); yPos = 20; }
    
    doc.setFontSize(14).setTextColor(30, 30, 30).text(title, margin, yPos);
    yPos += 10;

    let xOffset = margin, maxRowHeight = 0, usedCols = 0;

    for (const item of groupItems) {
      // Get sizeString from item data
      const sizeString = item.sizes?.[0] || "1x1";
      const { width, height, colSpan } = getGridDimensions(sizeString);
      
      if (usedCols + colSpan > 24) { 
        yPos += maxRowHeight + 15; 
        xOffset = margin; usedCols = 0; maxRowHeight = 0; 
      }
      
      if (yPos + height + 25 > pageHeight) { 
        doc.addPage(); yPos = 20; xOffset = margin; usedCols = 0; 
      }

      // Fetch and Add Image
      const img = await getBase64Image(item.imageUrl);
      if (img) {
        doc.addImage(img.data, img.format, xOffset, yPos, width, height);
      }

      doc.setFontSize(8).text(item.name, xOffset, yPos + height + 5, { maxWidth: width });

      maxRowHeight = Math.max(maxRowHeight, height);
      xOffset += (colSpan * colUnit);
      usedCols += colSpan;
    }
    yPos += maxRowHeight + 25;
  }
  
  return doc.output("arraybuffer");
}

export async function POST(request: NextRequest) {
  try {
    const { items, metadata } = await request.json();
    const pdf = await generatePdfFromItems(items, metadata);

    return new Response(pdf, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename="catalog.pdf"',
      },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 });
  }
}