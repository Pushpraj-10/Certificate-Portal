import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import IIITNRLogo from "../assets/IIITNR_Logo.png";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Certificate Portal - IIIT Naya Raipur",
  description: "A Certificate Generation Portal for IIIT Naya Raipur",
  icons: {
    icon: IIITNRLogo.src,
    shortcut: IIITNRLogo.src,
    apple: IIITNRLogo.src,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
