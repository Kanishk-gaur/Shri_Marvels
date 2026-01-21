// src/app/api/generate-catalog-pdf/route.ts
import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const metadataStr = formData.get('metadata') as string;
    const metadata = JSON.parse(metadataStr);

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // Construct the email without attachments
    await transporter.sendMail({
      from: `"${metadata.name}" <${process.env.SMTP_USER}>`,
      to: process.env.ADMIN_EMAIL, // Your receiving email address
      subject: `New Catalog Request: ${metadata.name}`,
      text: `
        New Request Received:
        Client Name: ${metadata.name}
        Mobile Number: ${metadata.mobile}
        Notes: ${metadata.description}
      `,
      html: `
        <h3>New Catalog Request</h3>
        <p><strong>Client Name:</strong> ${metadata.name}</p>
        <p><strong>Mobile Number:</strong> ${metadata.mobile}</p>
        <p><strong>Notes:</strong> ${metadata.description}</p>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Email API Error:", error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}