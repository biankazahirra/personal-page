import type { Metadata } from "next";
import { Instrument_Serif, Inter_Tight, JetBrains_Mono } from "next/font/google";
import type { ReactNode } from "react";

import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { PageWipe } from "@/components/page-wipe";
import { HorizontalChapters } from "@/components/horizontal-chapters";
import { RevealFallback } from "@/components/reveal-fallback";
import { site } from "@/content/site";

import "./globals.css";

const display = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-instrument-serif",
});

const sans = Inter_Tight({
  subsets: ["latin"],
  display: "swap",
  preload: false,
  variable: "--font-inter-tight",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
  preload: false,
  variable: "--font-jetbrains-mono",
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://personal-page.vercel.app",
  ),
  title: {
    default: `${site.name} — a small world`,
    template: `%s — ${site.name}`,
  },
  description:
    "A personal page: notes on AI agents and small systems, a film journal, songs on repeat, and an ukulele still being learned.",
  openGraph: {
    title: `${site.name} — a small world`,
    description: site.tagline,
    type: "website",
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${sans.variable} ${mono.variable}`}
    >
      <body>
        <script
          // Runs before first paint so the reduced-motion styling never flashes.
          dangerouslySetInnerHTML={{
            __html:
              'try{var s=localStorage.getItem("motion");document.documentElement.dataset.motion=(s?s==="full":!matchMedia("(prefers-reduced-motion: reduce)").matches)?"full":"reduce"}catch(e){document.documentElement.dataset.motion="full"}',
          }}
        />
        <a
          href="#main"
          className="eyebrow sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:bg-ink focus:px-4 focus:py-3 focus:text-paper"
        >
          skip to content
        </a>
        <SiteHeader />
        <PageWipe />
        <HorizontalChapters />
        <RevealFallback />
        <main id="main">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
