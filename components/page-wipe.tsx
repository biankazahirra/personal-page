"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

/**
 * Dark panel that empties upwards on client-side navigation. Skipped on first
 * paint so a direct page load (and its LCP) is never covered.
 */
export function PageWipe() {
  const pathname = usePathname();
  const [wipeKey, setWipeKey] = useState<string | null>(null);
  const firstRender = useRef(true);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    setWipeKey(pathname);
  }, [pathname]);

  if (!wipeKey) return null;

  return <div key={wipeKey} aria-hidden="true" className="page-wipe" />;
}
