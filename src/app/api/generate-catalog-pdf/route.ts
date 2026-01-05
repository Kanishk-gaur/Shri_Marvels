// src/app/api/generate-catalog-pdf/route.ts
import { type NextRequest } from 'next/server';
import { jsPDF } from "jspdf";

interface CatalogItem {
    id: string;
    name: string;
    imageUrl: string;
    sizes: string[];
    category: string;
}

interface PdfMetadata {
  name: string;
  title: string;
  description: string;
}

async function generatePdfFromItems(items: CatalogItem[], metadata: PdfMetadata): Promise<Buffer> {
    const doc = new jsPDF();
    let yPos = 20;

    // Header
    doc.setFontSize(22);
    doc.setTextColor(40, 40, 40);
    doc.text(metadata.title || "Shri Marvels Catalog", 20, yPos);
    
    yPos += 15;
    doc.setFontSize(12);
    doc.text(`Client: ${metadata.name || "Valued Customer"}`, 20, yPos);
    
    yPos += 10;
    doc.setFontSize(10);
    doc.setTextColor(100, 100, 100);
    const splitDescription = doc.splitTextToSize(metadata.description || "No additional notes.", 170);
    doc.text(splitDescription, 20, yPos);

    yPos += (splitDescription.length * 5) + 10;
    doc.setLineWidth(0.5);
    doc.line(20, yPos, 190, yPos);

    // Items List
    yPos += 15;
    doc.setFontSize(14);
    doc.setTextColor(40, 40, 40);
    doc.text(`Selected Items (${items.length})`, 20, yPos);

    yPos += 10;
    items.forEach((item, index) => {
        if (yPos > 270) { // Simple page break check
            doc.addPage();
            yPos = 20;
        }
        doc.setFontSize(11);
        doc.text(`${index + 1}. ${item.name}`, 25, yPos);
        doc.setFontSize(9);
        doc.text(`   Sizes: ${item.sizes.join(', ')}`, 25, yPos + 5);
        yPos += 15;
    });

    // Return as a Buffer
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
    console.error('PDF Error:', error);
    return new Response(JSON.stringify({ error: 'Failed to generate PDF' }), { status: 500 });
  }
}