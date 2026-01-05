import { type NextRequest } from 'next/server';
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

/**
 * Helper to determine the absolute base URL of the site.
 * This allows the server to fetch images from the 'public' folder.
 */
function getBaseUrl() {
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return `http://localhost:${process.env.PORT || 3000}`;
}

/**
 * Fetches an image and converts it to Base64.
 * Required because jsPDF cannot use raw URLs on the server-side.
 */
async function getBase64Image(url: string): Promise<string | null> {
  try {
    // If the path is relative (starts with /), prepend the base URL
    const absoluteUrl = url.startsWith('/') 
      ? `${getBaseUrl()}${url}` 
      : url;

    const response = await fetch(absoluteUrl);
    if (!response.ok) throw new Error(`Image fetch failed: ${response.statusText}`);
    
    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const contentType = response.headers.get("content-type") || "image/jpeg";
    
    return `data:${contentType};base64,${buffer.toString('base64')}`;
  } catch (error) {
    console.error("PDF Image Error:", error);
    return null;
  }
}

async function generatePdfFromItems(items: CatalogItem[], metadata: PdfMetadata): Promise<Buffer> {
  const doc = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4"
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 15;
  let yPos = 20;

  // --- Header Section ---
  doc.setFont("helvetica", "bold");
  doc.setFontSize(22);
  doc.setTextColor(184, 134, 11); // Bronze branding
  doc.text(metadata.title || "Shri Marvels Catalog", margin, yPos);
  
  yPos += 10;
  doc.setFontSize(11);
  doc.setTextColor(60, 60, 60);
  doc.text(`Client: ${metadata.name || "Valued Customer"}`, margin, yPos);
  
  yPos += 7;
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.setTextColor(100, 100, 100);
  const splitDescription = doc.splitTextToSize(metadata.description || "Selection from Agrawal Ceramics.", 180);
  doc.text(splitDescription, margin, yPos);

  yPos += (splitDescription.length * 5) + 5;
  doc.setDrawColor(220, 220, 220);
  doc.line(margin, yPos, pageWidth - margin, yPos);

  // --- Grid Configuration ---
  const spacing = 10;
  const cols = 2; // 2-column grid for clarity
  const colWidth = (pageWidth - (margin * 2) - spacing) / cols;
  const imgHeight = colWidth * 0.85; 
  
  yPos += 15;

  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    const colIndex = i % cols;
    const xPos = margin + (colIndex * (colWidth + spacing));

    // Page break logic
    if (yPos + imgHeight + 30 > pageHeight - margin) {
      doc.addPage();
      yPos = 20;
    }

    // Draw Product Image
    const imgBase64 = await getBase64Image(item.imageUrl);
    if (imgBase64) {
      doc.addImage(imgBase64, "JPEG", xPos, yPos, colWidth, imgHeight);
    } else {
      doc.setDrawColor(240, 240, 240);
      doc.rect(xPos, yPos, colWidth, imgHeight, "S");
      doc.setFontSize(8);
      doc.text("Image N/A", xPos + (colWidth / 3), yPos + (imgHeight / 2));
    }

    // Draw Subcategory Label
    const textY = yPos + imgHeight + 6;
    doc.setFont("helvetica", "bold");
    doc.setFontSize(7);
    doc.setTextColor(160, 160, 160);
    doc.text(item.subcategory.toUpperCase(), xPos, textY);

    // Draw Product Name
    doc.setFontSize(11);
    doc.setTextColor(30, 30, 30);
    doc.text(item.name, xPos, textY + 5);

    // Draw Sizes and Quantities
    if (item.selectedSizes?.length > 0) {
      doc.setFont("helvetica", "normal");
      doc.setFontSize(8);
      doc.setTextColor(80, 80, 80);
      const sizeInfo = item.selectedSizes
        .map(sz => `${sz} (${item.sizeConfigs?.[sz] || 1} Pcs)`)
        .join(", ");
      doc.text(`Sizes: ${sizeInfo}`, xPos, textY + 10, { maxWidth: colWidth });
    }

    // Move yPos after every 2 items
    if (colIndex === 1 || i === items.length - 1) {
      yPos += imgHeight + 35;
    }
  }

  // Final Buffer Output
  const pdfOutput = doc.output("arraybuffer");
  return Buffer.from(pdfOutput);
}

export async function POST(request: NextRequest) {
  try {
    const { items, metadata }: { items: CatalogItem[], metadata: PdfMetadata } = await request.json();

    if (!items || items.length === 0) {
      return new Response(JSON.stringify({ error: 'No items selected.' }), { status: 400 });
    }

    const pdfBuffer = await generatePdfFromItems(items, metadata);
    const body = new Uint8Array(pdfBuffer);

    const safeTitle = (metadata.title || 'shri_marvels').replace(/[^a-z0-9]/gi, '_').toLowerCase();

    return new Response(body, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="${safeTitle}_catalog.pdf"`,
        'Content-Length': body.byteLength.toString(),
      },
    });
  } catch (error: any) {
    console.error('PDF Generation Error:', error);
    return new Response(JSON.stringify({ error: 'Failed to generate PDF' }), { status: 500 });
  }
}