"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { AssemblyMeter } from "@/components/assembly-meter";
import { ContentsOverlay } from "@/components/contents-overlay";
import { LangSwitch } from "@/components/lang-switch";
import { MotionToggle } from "@/components/motion-toggle";
import { SoundToggle } from "@/components/sound-toggle";
import { ThemeShift } from "@/components/theme-shift";
import { manual, sectionForPath } from "@/content/manual";

/**
 * The shared frame: a red manual band on every page. Section, page and model
 * come from the current route, so the band never shows the wrong chapter.
 */
export function SiteHeader() {
  const pathname = usePathname();
  const section = sectionForPath(pathname);

  return (
    <header className="manual-band sticky top-0 z-50">
      <div className="mx-auto max-w-[1440px] px-4 md:px-8">
        <div className="band-rule flex flex-wrap items-center justify-between gap-x-6 gap-y-2 border-b py-2">
          <div className="flex items-baseline gap-x-3 gap-y-1">
            <Link
              href="/"
              data-egg="logo"
              className="eyebrow border-b border-transparent hover:border-band-ink"
              aria-label="Service Manual — home"
            >
              Service Manual
            </Link>
            <span className="eyebrow text-band-ink/85">Model {manual.model}</span>
            <span className="eyebrow hidden text-band-ink/85 lg:inline">
              {manual.printedRev}
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <AssemblyMeter />
            <span className="eyebrow hidden text-band-ink/85 md:inline">
              {section.section} · {section.page}
            </span>
            <div className="eyebrow hidden text-band-ink/85 xl:block">
              <LangSwitch />
            </div>
            <SoundToggle />
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-2 py-2">
          <p className="flex min-w-0 items-baseline gap-2">
            <span className="label shrink-0 text-xs text-band-ink/85">
              {section.section}
            </span>
            <span className="label truncate text-sm tracking-[0.08em] md:text-base">
              {section.title}
            </span>
          </p>

          <div className="flex flex-wrap items-center gap-2">
            <ThemeShift />
            <MotionToggle className="band-control eyebrow" />
            <ContentsOverlay />
          </div>
        </div>
      </div>
    </header>
  );
}
