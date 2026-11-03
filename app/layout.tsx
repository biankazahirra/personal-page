import type { Metadata } from "next";
import { Archivo_Narrow, Courier_Prime, Stardos_Stencil } from "next/font/google";
import type { ReactNode } from "react";

import { AssemblyComplete } from "@/components/assembly-complete";
import { AssemblyTracker } from "@/components/assembly-tracker";
import { EggLayerMount } from "@/components/egg-layer-mount";
import { RouteAnnouncer } from "@/components/route-announcer";
import { RouteFocus } from "@/components/route-focus";
import { ScrollMemory } from "@/components/scroll-memory";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { PageWipe } from "@/components/page-wipe";
import { HorizontalChapters } from "@/components/horizontal-chapters";
import { RevealFallback } from "@/components/reveal-fallback";
import { defaultLocale } from "@/content/i18n";
import { site } from "@/content/site";

import "./globals.css";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://biankazahirra.vercel.app";

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.fullName,
  alternateName: site.name,
  url: baseUrl,
  ...(site.portrait ? { image: `${baseUrl}${site.portrait.src}` } : {}),
  email: site.email,
  description: site.tagline,
  sameAs: site.links.map((link) => link.href),
  knowsAbout: site.currentlyInto.map((item) => item.label),
};

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

const plainDescription =
  "Bianka Zahirra: notes on AI agents and small systems, films, songs on repeat, projects, and a ukulele still being learned.";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: `${site.name} - notes, films, projects, life`,
    template: `%s - ${site.name}`,
  },
  description: plainDescription,
  alternates: { canonical: "/" },
  openGraph: {
    title: `${site.name} - notes, films, projects, life`,
    description: plainDescription,
    type: "website",
    url: "/",
    siteName: site.name,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} - notes, films, projects, life`,
    description: plainDescription,
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang={defaultLocale}
      dir="ltr"
      suppressHydrationWarning
      className={`${stencil.variable} ${narrow.variable} ${courier.variable}`}
    >
      <body>
        <script
          // Runs before first paint: theme and motion choices never flash.
          dangerouslySetInnerHTML={{
            __html:
              'try{document.documentElement.dataset.vt = typeof document.startViewTransition === "function" ? "native" : "fallback";var s=localStorage.getItem("shift");document.documentElement.dataset.shift=(s==="day"||s==="night")?s:(matchMedia("(prefers-color-scheme: dark)").matches?"night":"day");var m=localStorage.getItem("motion");document.documentElement.dataset.motion=(m?m==="full":!matchMedia("(prefers-reduced-motion: reduce)").matches)?"full":"reduce"}catch(e){document.documentElement.dataset.vt="fallback";document.documentElement.dataset.shift="day";document.documentElement.dataset.motion="full"}',
          }}
        />
        <a
          href="#main"
          className="eyebrow sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70] focus:bg-ink focus:px-4 focus:py-3 focus:text-paper"
        >
          skip to content
        </a>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
        <SiteHeader />
        <AssemblyTracker />
        <PageWipe />
        <RouteAnnouncer />
        {/* RouteFocus must precede ScrollMemory: focus must land before the scroll restore runs. */}
        <RouteFocus />
        <ScrollMemory />
        <HorizontalChapters />
        <RevealFallback />
        <main id="main" className="page-sheet">{children}</main>
        <SiteFooter />
        <EggLayerMount />
        <AssemblyComplete />
      </body>
    </html>
  );
}

