// src/api/generate-catalog-pdf/route.ts

import { type NextRequest } from 'next/server';

interface CatalogItem {
    id: string;
    name: string;
    imageUrl: string;
    sizes: string[];
    category: string;
}

async function generatePdfFromItems(items: CatalogItem[]): Promise<Buffer> {
    console.log(`Generating PDF for ${items.length} items...`);
    const mockPdfContent = `
        Agrawal Ceramics Custom Catalog
        ----------------------------------
        Total Items: ${items.length}
        Items in Catalog:
        ${items.map(item => `- ${item.name} (${item.sizes.join(' | ')})"`).join('\n')}
    `;
    return Buffer.from(mockPdfContent, 'utf-8');
}

async function sendEmailToOwner(pdfBuffer: Buffer) {
    const ownerEmail = 'owner@agrawalceramics.com';
    console.log(`Email Placeholder: Sending PDF of size ${pdfBuffer.length} to owner at ${ownerEmail}`);
}

export async function POST(request: NextRequest) {
  try {
    const { items }: { items: CatalogItem[] } = await request.json();

    if (!items || items.length === 0) {
      return new Response(JSON.stringify({ error: 'No items selected for catalog.' }), { 
          status: 400,
          headers: { 'Content-Type': 'application/json' }
      });
    }

    const pdfBuffer = await generatePdfFromItems(items);
    const uint8Array = new Uint8Array(pdfBuffer);

    sendEmailToOwner(pdfBuffer).catch(err => {
        console.error("Failed to send catalog email to owner:", err);
    });

    return new Response(uint8Array, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Length': pdfBuffer.length.toString(), 
        'Content-Disposition': 'attachment; filename="agrawal_ceramics_catalog.pdf"',
      },
    });

  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('Error generating catalog:', errorMessage);
    return new Response(JSON.stringify({ 
        error: 'Failed to generate PDF. Check server logs for details.', 
        details: errorMessage 
    }), { 
        status: 500,
        headers: { 'Content-Type': 'application/json' }
    });
  }
}