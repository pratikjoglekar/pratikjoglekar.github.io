import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Cursor from "@/components/Cursor";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";
import { Toaster } from "sonner";

export const satoshi = localFont({
  src: [
    { path: "../public/fonts/Satoshi-Light.woff2", weight: "300", style: "normal" },
    { path: "../public/fonts/Satoshi-LightItalic.woff2", weight: "300", style: "italic" },

    { path: "../public/fonts/Satoshi-Regular.woff2", weight: "400", style: "normal" },
    { path: "../public/fonts/Satoshi-Italic.woff2", weight: "400", style: "italic" },

    { path: "../public/fonts/Satoshi-Medium.woff2", weight: "500", style: "normal" },
    { path: "../public/fonts/Satoshi-MediumItalic.woff2", weight: "500", style: "italic" },

    { path: "../public/fonts/Satoshi-Bold.woff2", weight: "700", style: "normal" },
    { path: "../public/fonts/Satoshi-BoldItalic.woff2", weight: "700", style: "italic" },

    { path: "../public/fonts/Satoshi-Black.woff2", weight: "900", style: "normal" },
    { path: "../public/fonts/Satoshi-BlackItalic.woff2", weight: "900", style: "italic" },
  ],
  variable: "--font-satoshi",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Pratik Joglekar — Product Designer",
  description: "Neuro-inclusive, strategic, human-first, product designer",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`antialiased font-sans ${satoshi.variable}`}>
        {/* Cursor */}
        <Cursor />

        {/* App content */}
        {children}

        <Analytics />
        <SpeedInsights />
        {/* Sonner Toaster — REQUIRED */}
        <Toaster position="bottom-right" richColors />
      </body>
    </html>
  );
}
