import { type NextRequest } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: NextRequest) {
  try {
    const { pdfBase64, metadata } = await request.json();

    if (!pdfBase64) {
      return new Response(JSON.stringify({ error: "No PDF data provided" }), { status: 400 });
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: false, 
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    await transporter.sendMail({
      from: `"Shri Marvels" <${process.env.SMTP_USER}>`,
      to: process.env.ADMIN_EMAIL,
      subject: `Catalog: ${metadata.title}`,
      text: `Client: ${metadata.name}\nNotes: ${metadata.description}`,
      attachments: [
        {
          filename: `${metadata.title || 'Catalog'}.pdf`,
          content: pdfBase64.split("base64,")[1], // Extract base64 data
          encoding: 'base64'
        }
      ]
    });

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error: any) {
    console.error("Mail Error:", error);
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}