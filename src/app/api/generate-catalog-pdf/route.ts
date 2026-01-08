
import { type NextRequest } from 'next/server';
import { jsPDF } from "jspdf";

// Configuration for Vercel
export const maxDuration = 60; 
export const dynamic = 'force-dynamic';

interface PDFMetadata {
  title?: string;
  name?: string;
}

// Local interface to avoid importing from Context/Data files
interface CatalogItem {
  id: string | number;
  name: string;
  imageUrl: string;
  subcategory?: string;
  sizes?: string[];
}

function getBaseUrl() {
  if (process.env.NEXT_PUBLIC_SITE_URL) return process.env.NEXT_PUBLIC_SITE_URL;
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return `http://localhost:${process.env.PORT || 3000}`;
}

// Optimized getBase64Image in src/app/api/generate-catalog-pdf/route.ts
async function getBase64Image(url: string): Promise<{ data: string; format: string } | null> {
  try {
    // Force the use of absolute URLs via fetch so Vercel doesn't bundle the local folder
    const absoluteUrl = url.startsWith('/') ? `${getBaseUrl()}${url}` : url;
    
    const response = await fetch(absoluteUrl);
    if (!response.ok) return null;
    
    const arrayBuffer = await response.arrayBuffer();
    const contentType = response.headers.get('content-type') || 'image/jpeg';
    const base64 = Buffer.from(arrayBuffer).toString('base64');
    
    return {
      data: `data:${contentType};base64,${base64}`,
      format: contentType.includes('png') ? 'PNG' : 'JPEG'
    };
  } catch {
    return null; 
  }
}
/**
 * MASONRY GRID MAPPING
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

// Fixed: Replaced 'any' with specific types
async function generatePdfFromItems(items: CatalogItem[], metadata: PDFMetadata): Promise<Uint8Array> {
  const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4", compress: true });
  const margin = 15;
  let yPos = 25;

  doc.setFont("helvetica", "bold").setFontSize(22).setTextColor(184, 134, 11);
  doc.text(metadata.title || "Shri Marvels Catalog", margin, yPos);
  yPos += 15;

  for (const item of items) {
    if (yPos > 250) { doc.addPage(); yPos = 20; }
    const imgData = await getBase64Image(item.imageUrl);
    if (imgData) {
      doc.addImage(imgData.data, imgData.format, margin, yPos, 40, 40);
      doc.setFontSize(12).setTextColor(0).text(item.name, margin + 45, yPos + 10);
      yPos += 50;
    }
  }
  
  return new Uint8Array(doc.output("arraybuffer"));
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as { items: CatalogItem[]; metadata: PDFMetadata };
    const { items, metadata } = body;
    
    if (!items || items.length === 0) return new Response("No items", { status: 400 });

    const pdfData = await generatePdfFromItems(items, metadata);

    // Using Blob satisfies the Response type and passes Linting
    const blob = new Blob([new Uint8Array(pdfData)], { type: 'application/pdf' });

    return new Response(blob, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="${(metadata.title || 'catalog').replace(/\s+/g, '_')}.pdf"`,
      },
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Internal Server Error';
    return new Response(JSON.stringify({ error: message }), { status: 500 });
  }
}