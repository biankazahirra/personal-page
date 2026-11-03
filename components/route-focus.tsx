"use client";

import { usePathname } from "next/navigation";
import { useEffect, useLayoutEffect, useRef } from "react";

import { focusTarget, shouldMoveFocus } from "@/lib/route-memory";

/** Layout effects warn during server render; use them only on the client. */
const useIsomorphicLayoutEffect = typeof window === "undefined" ? useEffect : useLayoutEffect;

/**
 * Client-side navigation keeps keyboard focus where the link was. Move it to
 * the new page heading so the next Tab starts inside the new content.
 */
export function RouteFocus() {
  const pathname = usePathname();
  const previous = useRef<string | null>(null);

  useIsomorphicLayoutEffect(() => {
    const heading = focusTarget(document);
    if (heading && shouldMoveFocus(previous.current, pathname)) {
      heading.focus({ preventScroll: true });
    }
    previous.current = pathname;
  }, [pathname]);

  return null;
}
