"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

import { clampScroll, readScroll, shouldRestoreScroll, writeScroll } from "@/lib/route-memory";

/** Safari private mode throws on storage; memory is optional, the page is not. */
function readStored(pathname: string): number | null {
  try {
    return readScroll(window.sessionStorage, pathname);
  } catch {
    return null;
  }
}

function writeStored(pathname: string, offset: number): void {
  try {
    writeScroll(window.sessionStorage, pathname, offset);
  } catch {
    // Storage unavailable: skip the memory.
  }
}

/**
 * Remembers the scroll offset per path and restores it on client navigation.
 * The first pathname is never restored: a cold load starts at the top.
 */
export function ScrollMemory() {
  const pathname = usePathname();
  const firstPath = useRef<string | null>(null);
  const writePath = useRef<string>("");
  const restoring = useRef(false);
  const restoreFrame = useRef(0);

  // Must stay a passive effect: Next.js resets the document scroll after layout effects run, which would discard the restore.
  useEffect(() => {
    if (firstPath.current === null) {
      firstPath.current = pathname;
      writePath.current = pathname;
      return;
    }

    // React StrictMode re-runs mount effects. A duplicate setup has no new path.
    if (writePath.current === pathname) return;

    // Capture the outgoing offset in case the throttled scroll frame never ran.
    // The homepage never reads scroll:/ back; skip the write entirely.
    if (writePath.current !== "/") {
      // A top-of-page offset clears the stored entry instead of leaving a stale one.
      if (window.scrollY >= 8) {
        writeStored(writePath.current, Math.round(window.scrollY));
      } else {
        writeStored(writePath.current, 0);
      }
    }

    if (shouldRestoreScroll(pathname)) {
      const stored = readStored(pathname);
      if (stored !== null && stored > 0) {
        const max = document.documentElement.scrollHeight - window.innerHeight;
        const offset = clampScroll(stored, max);
        restoring.current = true;
        document.documentElement.dataset.restoring = "1";
        window.scrollTo(0, offset);
        restoreFrame.current = window.requestAnimationFrame(() => {
          restoreFrame.current = 0;
          restoring.current = false;
          delete document.documentElement.dataset.restoring;
        });
      }
    }

    writePath.current = pathname;

    return () => {
      if (restoreFrame.current) {
        window.cancelAnimationFrame(restoreFrame.current);
        restoreFrame.current = 0;
      }
      restoring.current = false;
      delete document.documentElement.dataset.restoring;
    };
  }, [pathname]);

  useEffect(() => {
    let frame = 0;

    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        frame = 0;
        if (restoring.current || !writePath.current) return;
        // The homepage never reads scroll:/ back; skip the write entirely.
        if (writePath.current === "/") return;
        const offset = Math.round(window.scrollY);
        // A top-of-page offset clears the stored entry instead of leaving a stale one.
        if (offset >= 8) {
          writeStored(writePath.current, offset);
        } else {
          writeStored(writePath.current, 0);
        }
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return null;
}
