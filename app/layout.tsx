import type { Metadata } from "next";
import { Archivo_Narrow, Courier_Prime, Stardos_Stencil } from "next/font/google";
import type { ReactNode } from "react";

import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { IndexTabs } from "@/components/index-tabs";
import { PageWipe } from "@/components/page-wipe";
import { HorizontalChapters } from "@/components/horizontal-chapters";
import { RevealFallback } from "@/components/reveal-fallback";
import { site } from "@/content/site";

import "./globals.css";

const stencil = Stardos_Stencil({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
  variable: "--font-stencil",
});

const narrow = Archivo_Narrow({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
  variable: "--font-narrow",
});

const courier = Courier_Prime({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
  variable: "--font-courier",
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://biankazahirra.vercel.app",
  ),
  title: {
    default: `${site.name} — service manual`,
    template: `%s — ${site.name}`,
  },
  description:
    "A personal service manual: notes on AI agents and small systems, a film journal, songs on repeat, and an ukulele still being learned.",
  openGraph: {
    title: `${site.name} — service manual`,
    description: site.tagline,
    type: "website",
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${stencil.variable} ${narrow.variable} ${courier.variable}`}
    >
      <body>
        <script
          // Runs before first paint: theme and motion choices never flash.
          dangerouslySetInnerHTML={{
            __html:
              'try{var s=localStorage.getItem("shift");document.documentElement.dataset.shift=(s==="day"||s==="night")?s:(matchMedia("(prefers-color-scheme: dark)").matches?"night":"day");var m=localStorage.getItem("motion");document.documentElement.dataset.motion=(m?m==="full":!matchMedia("(prefers-reduced-motion: reduce)").matches)?"full":"reduce"}catch(e){document.documentElement.dataset.shift="day";document.documentElement.dataset.motion="full"}',
          }}
        />
        <a
          href="#main"
          className="eyebrow sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70] focus:bg-ink focus:px-4 focus:py-3 focus:text-paper"
        >
          skip to content
        </a>
        <SiteHeader />
        <PageWipe />
        <HorizontalChapters />
        <RevealFallback />
        <main id="main">{children}</main>
        <SiteFooter />
        <IndexTabs />
      </body>
    </html>
  );
}
