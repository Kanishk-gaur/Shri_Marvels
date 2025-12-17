// src/app/api/generate-catalog-pdf/route.ts

// This file uses the standard Web API Response object, which is compatible
// with the Next.js App Router's edge and Node.js environments.

import { type NextRequest } from 'next/server';
// ⚠️ Reminder: You must still install and configure PDF generation (e.g., 'pdfkit')
// and email transport (e.g., 'nodemailer') for the functions below to work fully.

// This is a placeholder type definition for the CatalogItem that the client sends
interface CatalogItem {
    id: string;
    name: string;
    imageUrl: string;
    sizes: string[];
    category: string;
}

// This is a placeholder function representing your server-side PDF generation logic.
// It must return a Node.js Buffer containing the PDF binary data.
async function generatePdfFromItems(items: CatalogItem[]): Promise<Buffer> {
    // ---------------------------------------------------------------------
    // ⚠️ REPLACE THIS ENTIRE SECTION WITH YOUR ACTUAL PDF GENERATION CODE.
    // ---------------------------------------------------------------------
    
    // TEMPORARY MOCK IMPLEMENTATION:
    console.log(`Generating PDF for ${items.length} items...`);
    
    const mockPdfContent = `
        Agrawal Ceramics Custom Catalog
        ----------------------------------
        Total Items: ${items.length}
        
        Items in Catalog:
        ${items.map(item => `- ${item.name} (${item.sizes.join(' | ')})"`).join('\n')}
        
        This content is a placeholder. You must implement real PDF generation.
    `;
    
    // Returns a Buffer, which is the Node.js type for binary data
    return Buffer.from(mockPdfContent, 'utf-8');
}


// This is a placeholder function for sending the email.
async function sendEmailToOwner(pdfBuffer: Buffer) {
    // ---------------------------------------------------------------------
    // ⚠️ REPLACE THIS ENTIRE SECTION WITH YOUR ACTUAL EMAIL LOGIC.
    // ---------------------------------------------------------------------

    const ownerEmail = 'owner@agrawalceramics.com'; // ⬅️ REPLACE with your owner email
    console.log(`Email Placeholder: Sending PDF to owner at ${ownerEmail}`);
}

export async function POST(request: NextRequest) {
  try {
    const { items }: { items: CatalogItem[] } = await request.json();

    if (!items || items.length === 0) {
      // Use standard Response for error responses
      return new Response(JSON.stringify({ error: 'No items selected for catalog.' }), { 
          status: 400,
          headers: { 'Content-Type': 'application/json' }
      });
    }

    // 1. Generate the PDF file (returns a Node.js Buffer)
    const pdfBuffer = await generatePdfFromItems(items);
    
    // FIX: Convert the Node.js Buffer to a Uint8Array. 
    // This type is fully compatible with the Web Response API's BodyInit.
    const uint8Array = new Uint8Array(pdfBuffer);

    // 2. Asynchronously send the copy to the owner (client doesn't wait for this)
    sendEmailToOwner(pdfBuffer).catch(err => {
        // Log the failure to send email, but don't block the user's download
        console.error("Failed to send catalog email to owner:", err);
    });

    // 3. Send the PDF (as Uint8Array) to the client for immediate download
    const response = new Response(uint8Array, { // Pass the Uint8Array
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        // Content-Length is essential for file downloads
        'Content-Length': pdfBuffer.length.toString(), 
        'Content-Disposition': 'attachment; filename="agrawal_ceramics_catalog.pdf"',
      },
    });

    return response;

  } catch (error: any) {
    console.error('Error generating catalog:', error);
    return new Response(JSON.stringify({ 
        error: 'Failed to generate PDF. Check server logs for details.', 
        details: error.message 
    }), { 
        status: 500,
        headers: { 'Content-Type': 'application/json' }
    });
  }
}