"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const EggLayer = dynamic(
  () => import("@/components/egg-layer").then((module) => module.EggLayer),
  { ssr: false },
);

const EVENTS = ["pointerdown", "keydown", "touchstart", "scroll"] as const;

/**
 * The field kit is a bonus, so its code is only fetched once the reader has
 * engaged with the manual (or has been reading for a while). Loading it during
 * the first idle window would put its parse straight into the blocking window.
 */
export function EggLayerMount() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let timer = 0;

    const start = () => {
      window.clearTimeout(timer);
      setReady(true);
    };

    EVENTS.forEach((event) =>
      window.addEventListener(event, start, { once: true, passive: true }),
    );
    timer = window.setTimeout(start, 6000);

    return () => {
      EVENTS.forEach((event) => window.removeEventListener(event, start));
      window.clearTimeout(timer);
    };
  }, []);

  return ready ? <EggLayer /> : null;
}
