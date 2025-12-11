import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: NextRequest) {
  try {
    const { email, pdfData, studentName } = await request.json();

    if (!email || !pdfData) {
      return NextResponse.json({ error: 'Email and PDF data are required' }, { status: 400 });
    }

    // Create transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS, // App password for Gmail
      },
    });

    // Convert base64 to buffer
    const pdfBuffer = Buffer.from(pdfData.split(',')[1], 'base64');

    // Send email
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Your Internship Certificate',
      text: `Dear ${studentName},\n\nPlease find attached your internship certificate.\n\nBest regards,\nIIIT Naya Raipur`,
      attachments: [
        {
          filename: `${studentName.replace(/\s+/g, '_')}_CERTIFICATE.pdf`,
          content: pdfBuffer,
          contentType: 'application/pdf',
        },
      ],
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error('Email sending error:', error);
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
  }
}