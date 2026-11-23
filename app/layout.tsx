import type { Metadata } from "next";
import { Inter, Geist_Mono, Fraunces } from "next/font/google";
import "./globals.css";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";
import { site } from "@/lib/projects";
import { MotionProvider } from "@/components/ds/Motion";
import Intro from "@/components/Intro";
import { AskMeProvider } from "@/components/AskMe";
import { UiSounds } from "@/components/ds/UiSounds";

// Variable font (all weights), so the hero keywords can animate their weight smoothly.
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

// Display serif for headlines only. Variable (weight + optical size), so the hero keywords
// can still thicken smoothly on hover and big sizes get the finer display cut.
const fraunces = Fraunces({
  subsets: ["latin"],
  axes: ["opsz", "SOFT"],
  variable: "--font-fraunces",
  display: "swap",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-geist-mono",
  display: "swap",
});

const description =
  "Senior Product Designer at Coursera, previously HubSpot and MassMutual. I design complex products that feel simple.";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} · ${site.role}`,
    template: `%s · ${site.name}`,
  },
  description,
  openGraph: {
    type: "website",
    siteName: site.name,
    title: `${site.name} · ${site.role}`,
    description,
    url: "/",
  },
  twitter: { card: "summary_large_image" },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${fraunces.variable} ${geistMono.variable}`}>
      <body className="antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-body-sm focus:font-medium focus:text-eggshell"
        >
          Skip to content
        </a>
        <Intro />
        <UiSounds />
        <MotionProvider>
          {/* Sutra lives here so one conversation follows the visitor across pages */}
          <AskMeProvider>{children}</AskMeProvider>
        </MotionProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
