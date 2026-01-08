import { type NextRequest } from 'next/server';
import { generatePdfFromItems } from './pdf-generator';

export const maxDuration = 60; 
export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { items, metadata } = body;
    console.log("Received PDF generation request with items:", items);
    
    if (!items || items.length === 0) {
      return new Response(JSON.stringify({ error: "No items provided" }), { status: 400 });
    }

    // This now receives an ArrayBuffer
    const pdfArrayBuffer = await generatePdfFromItems(items, metadata);

    // FIX: Use Buffer.from to create a Node-safe buffer from the ArrayBuffer
    const responseBuffer = Buffer.from(pdfArrayBuffer);

    return new Response(responseBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="catalog.pdf"`,
      },
    });
  } catch (error) {
    console.error("PDF API Error:", error);
    
    const errorMessage = error instanceof Error 
      ? error.message 
      : 'An unexpected error occurred';
    
    return new Response(JSON.stringify({ error: errorMessage }), { status: 500 });
  }
}