"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import { sectionForPath } from "@/content/manual";

/**
 * Client-side navigation moves focus to the top of the new page, but screen
 * readers still need a short confirmation of which chapter opened.
 */
export function RouteAnnouncer() {
  const pathname = usePathname();
  const first = useRef(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    const section = sectionForPath(pathname);
    setMessage(`${section.section} ${section.title} — page loaded`);
  }, [pathname]);

  return (
    <p className="sr-only" aria-live="polite" aria-atomic="true">
      {message}
    </p>
  );
}
