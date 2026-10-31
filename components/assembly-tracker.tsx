"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

import { markFound } from "@/lib/assembly";

const routeParts: Record<string, string> = {
  "/about": "visit-c02",
  "/curiosity": "visit-c03",
  "/life": "visit-c04",
  "/films": "visit-c05",
  "/projects": "visit-c06",
  "/contact": "contact",
};

/**
 * Marks a socket when its page is opened, and marks the index when it has
 * been read to the end. Everything is stored through lib/assembly, so the
 * meter, data plate and completion overlay stay in sync.
 */
export function AssemblyTracker() {
  const pathname = usePathname();

  useEffect(() => {
    const match = Object.keys(routeParts).find(
      (route) => pathname === route || pathname.startsWith(`${route}/`),
    );
    if (match) markFound(routeParts[match]);
  }, [pathname]);

  useEffect(() => {
    if (pathname !== "/") return;

    let marked = false;
    const onScroll = () => {
      if (marked) return;
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollable <= 0) return;
      if (window.scrollY / scrollable > 0.72) {
        marked = true;
        markFound("scroll-home");
      }
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [pathname]);

  return null;
}
