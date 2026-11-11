"use client";

import { useEffect } from "react";

const chapters = [
  { href: "#overview", label: "about" },
  { href: "#specifications", label: "specs" },
  { href: "#shifts", label: "shifts" },
  { href: "#history", label: "history" },
  { href: "#toolbox", label: "kit" },
];

/**
 * Phone-only chapter index. It sticks under the manual band, so it publishes
 * that band's measured height instead of guessing one that changes when the
 * band wraps at 320-360px. It also opens the spec accordion on phones, where
 * the sheet reads as a logbook with every note visible; desktop keeps it shut.
 */
export function AboutChips() {
  useEffect(() => {
    const header = document.querySelector("header.manual-band");
    const root = document.documentElement;

    const sync = () => {
      if (header) root.style.setProperty("--band-h", `${header.clientHeight}px`);
    };
    sync();

    const observer = header ? new ResizeObserver(sync) : null;
    if (header && observer) observer.observe(header);

    const phone = window.matchMedia("(max-width: 767px)");
    const openSpecs = () => {
      if (!phone.matches) return;
      document
        .querySelectorAll<HTMLDetailsElement>(".spec-row")
        .forEach((row) => {
          row.open = true;
        });
    };
    openSpecs();
    phone.addEventListener("change", openSpecs);

    return () => {
      observer?.disconnect();
      phone.removeEventListener("change", openSpecs);
      root.style.removeProperty("--band-h");
    };
  }, []);

  return (
    <nav aria-label="On this page" className="about-chips md:hidden">
      {chapters.map((chapter) => (
        <a key={chapter.href} href={chapter.href}>
          {chapter.label}
        </a>
      ))}
    </nav>
  );
}
