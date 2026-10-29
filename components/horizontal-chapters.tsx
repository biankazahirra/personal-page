"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/**
 * Drives every [data-horizontal] chapter: vertical scroll moves the track
 * inside it sideways. With motion off (`data-motion="reduce"`) the CSS in
 * globals.css unpins the section and the track scrolls natively instead.
 */
export function HorizontalChapters() {
  const pathname = usePathname();

  useEffect(() => {
    const sections = Array.from(
      document.querySelectorAll<HTMLElement>("[data-horizontal]"),
    );
    if (sections.length === 0) return;

    let frame = 0;

    const update = () => {
      frame = 0;
      const animate = document.documentElement.dataset.motion !== "reduce";
      const viewport = window.innerHeight;

      for (const section of sections) {
        const track = section.querySelector<HTMLElement>("[data-horizontal-track]");
        if (!track) continue;

        if (!animate) {
          track.style.transform = "";
          continue;
        }

        const rect = section.getBoundingClientRect();
        const scrollable = rect.height - viewport;
        if (scrollable <= 0) continue;

        const progress = Math.min(1, Math.max(0, -rect.top / scrollable));
        const distance = Math.max(0, track.scrollWidth - window.innerWidth);
        track.style.transform = `translate3d(${-(progress * distance).toFixed(1)}px, 0, 0)`;
      }
    };

    const onScroll = () => {
      if (frame === 0) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    window.addEventListener("motionchange", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      window.removeEventListener("motionchange", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [pathname]);

  return null;
}
