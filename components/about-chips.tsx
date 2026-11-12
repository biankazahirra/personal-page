"use client";

import { useEffect, useRef, useState } from "react";

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
 * band wraps at 320-360px. Every spec row starts shut; a reader opens the one
 * they want instead of scrolling a sheet with every note already visible.
 */
export function AboutChips() {
  const nav = useRef<HTMLElement>(null);
  const [active, setActive] = useState(chapters[0].href);

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

    const sections = chapters
      .map((chapter) => document.querySelector<HTMLElement>(chapter.href))
      .filter((section): section is HTMLElement => section !== null);

    // The active chip is the last section whose top has passed the sticky
    // stack. Scroll only queues one frame, so the check stays cheap.
    let frame = 0;
    const update = () => {
      frame = 0;
      if (!phone.matches) return;
      const line =
        (header?.clientHeight ?? 0) + (nav.current?.offsetHeight ?? 0) + 8;
      let current = chapters[0].href;
      for (const section of sections) {
        if (section.getBoundingClientRect().top <= line) {
          current = `#${section.id}`;
        }
      }
      setActive(current);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      observer?.disconnect();
      window.removeEventListener("scroll", onScroll);
      if (frame) cancelAnimationFrame(frame);
      root.style.removeProperty("--band-h");
    };
  }, []);

  return (
    <nav ref={nav} aria-label="On this page" className="about-chips md:hidden">
      {chapters.map((chapter) => (
        <a
          key={chapter.href}
          href={chapter.href}
          aria-current={active === chapter.href ? "true" : undefined}
        >
          {chapter.label}
        </a>
      ))}
    </nav>
  );
}
