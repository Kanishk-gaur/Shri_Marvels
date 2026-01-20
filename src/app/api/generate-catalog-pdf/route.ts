import { type NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export const maxDuration = 60;

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const pdfFile = formData.get('file') as File;
    const metadataStr = formData.get('metadata') as string;
    
    if (!pdfFile || !metadataStr) {
      return NextResponse.json({ error: "Missing file or metadata" }, { status: 400 });
    }

    const metadata = JSON.parse(metadataStr);
    const buffer = Buffer.from(await pdfFile.arrayBuffer());

    // Configure Transporter using your .env variables
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: false, // true for 465, false for 587
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // Send Email to Admin
    await transporter.sendMail({
      from: `"Shri Marvels System" <${process.env.SMTP_USER}>`,
      to: process.env.ADMIN_EMAIL,
      subject: `New Catalog Generated: ${metadata.title || 'Untitled'}`,
      text: `A new catalog has been generated.\n\nClient: ${metadata.name || 'N/A'}\nDescription: ${metadata.description || 'N/A'}`,
      attachments: [
        {
          filename: `${metadata.title || 'catalog'}.pdf`,
          content: buffer,
          contentType: 'application/pdf'
        }
      ]
    });

    return NextResponse.json({ success: true, message: "Email sent successfully" });
  } catch (error: unknown) {
    console.error("PDF/Email API Error:", error);
    
    let errorMessage = "Internal Server Error";
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}