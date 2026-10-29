"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/**
 * Browsers without scroll-driven animations (Safari before 26, older Firefox)
 * ignore `.reveal` / `.clip-reveal`. There this adds a small fade-up driven by
 * IntersectionObserver, so the page still has an entrance instead of none.
 */
export function RevealFallback() {
  const pathname = usePathname();

  useEffect(() => {
    if (
      typeof CSS !== "undefined" &&
      CSS.supports?.("animation-timeline: view()")
    ) {
      return;
    }
    if (!("IntersectionObserver" in window)) return;

    const nodes = Array.from(
      document.querySelectorAll<HTMLElement>(".reveal, .clip-reveal"),
    );
    if (nodes.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add("is-in");
          observer.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px -8% 0px" },
    );

    for (const node of nodes) {
      node.classList.add("fallback-reveal");
      observer.observe(node);
    }

    return () => observer.disconnect();
  }, [pathname]);

  return null;
}
