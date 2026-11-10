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
      // Phones keep the strip as a native horizontal scroller: a sideways
      // swipe is the gesture people try, so the pin only runs from md up.
      const pinned = window.matchMedia("(min-width: 768px)").matches;
      const viewport = window.innerHeight;

      for (const section of sections) {
        const track = section.querySelector<HTMLElement>("[data-horizontal-track]");
        if (!track) continue;

        if (!animate || !pinned) {
          track.style.transform = "";
          section.style.removeProperty("--h-progress");
          section.style.removeProperty("--h-distance");
          section.removeAttribute("data-h-distance");
          continue;
        }

        const rect = section.getBoundingClientRect();
        const scrollable = rect.height - viewport;
        if (scrollable <= 0) continue;

        const progress = Math.min(1, Math.max(0, -rect.top / scrollable));
        // The track is often narrower than the window, so measure its own box.
        const distance = Math.max(0, track.scrollWidth - track.clientWidth);

        // The section is only as tall as its own travel, so no scroll is spent
        // with the cards already parked. CSS reads the length from this value.
        const key = String(Math.round(distance));
        if (section.dataset.hDistance !== key) {
          section.dataset.hDistance = key;
          section.style.setProperty("--h-distance", `${distance}px`);
        }

        track.style.transform = `translate3d(${-(progress * distance).toFixed(1)}px, 0, 0)`;
        section.style.setProperty("--h-progress", progress.toFixed(4));
      }
    };

    const onScroll = () => {
      if (frame === 0) frame = requestAnimationFrame(update);
    };

    // Only chapters that opt in: tabbing to a card pulls the pin to it.
    const onFocusIn = (event: FocusEvent) => {
      const target = event.target as HTMLElement;
      const section = target.closest<HTMLElement>("[data-horizontal-focus]");
      if (!section) return;
      const track = section.querySelector<HTMLElement>("[data-horizontal-track]");
      const card = target.closest<HTMLElement>("[data-project-card]");
      if (!track || !card) return;

      const cards = Array.from(track.querySelectorAll<HTMLElement>("[data-project-card]"));
      const index = cards.indexOf(card);
      const rect = section.getBoundingClientRect();
      const pin = rect.height - window.innerHeight;
      if (index < 0 || cards.length < 2 || pin <= 0) return;

      const top = window.scrollY + rect.top + (index / (cards.length - 1)) * pin;
      if (Math.abs(window.scrollY - top) > 8) {
        window.scrollTo({ top, behavior: "auto" });
      }
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    window.addEventListener("motionchange", onScroll);
    document.addEventListener("focusin", onFocusIn);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      window.removeEventListener("motionchange", onScroll);
      document.removeEventListener("focusin", onFocusIn);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [pathname]);

  return null;
}
