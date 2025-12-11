import type { Metadata } from "next";
import { Geist, Geist_Mono, Orbitron } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Noise from "@/components/Noise";
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
  description:
    "Cyberpunk AI portfolio showcasing Amanuel Fikremariam's neural particle hero, data systems, and intelligent products.",
  metadataBase: new URL("https://amanuel.ai"),
  openGraph: {
    title: "Amanuel Fikremariam | Neural Architect",
    description:
      "Explore the refreshed neural-particle hero experience and AI systems crafted by Amanuel Fikremariam.",
    url: "https://amanuel.ai",
    siteName: "Amanuel Fikremariam",
    images: [
      {
        url: "https://amanuel.ai/og-hero-particles.png",
        width: 1200,
        height: 630,
        alt: "Cyberpunk hero portrait with neural particle field for Amanuel Fikremariam",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Amanuel Fikremariam | Neural Architect",
    description:
      "Experience the updated neural-particle hero and AI systems portfolio from Amanuel Fikremariam.",
    images: ["https://amanuel.ai/og-hero-particles.png"],
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
        <Noise />
        <Navbar />
        {children}
        <Analytics />
        <Footer />
      </body>
    </html>
  );
}


