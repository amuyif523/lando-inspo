import type { Metadata } from "next";
import { Geist, Geist_Mono, Orbitron } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Noise from "@/components/Noise";
import { MotionProvider } from "@/components/MotionProvider";
import { Analytics } from "@vercel/analytics/react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const orbitron = Orbitron({
  variable: "--font-display",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Amanuel Fikremariam | Neural Architect",
  description: "Portfolio for Amanuel Fikremariam — AI architect, machine learning engineer, and data systems builder.",
  metadataBase: new URL("https://amanuel.dev"),
  openGraph: {
    title: "Amanuel Fikremariam | Neural Architect",
    description: "AI architect crafting intelligent systems across ML, data, and product.",
    url: "https://amanuel.dev",
    siteName: "Amanuel Fikremariam",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Amanuel Fikremariam — Neural Architect",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Amanuel Fikremariam | Neural Architect",
    description: "AI architect crafting intelligent systems across ML, data, and product.",
    images: ["/og-image.png"],
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
        className={`${geistSans.variable} ${geistMono.variable} ${orbitron.variable} antialiased bg-black text-white`}
      >
        <MotionProvider>
          <Noise />
          <Navbar />
          {children}
          <Analytics />
          <Footer />
        </MotionProvider>
      </body>
    </html>
  );
}
