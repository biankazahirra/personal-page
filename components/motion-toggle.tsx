"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "motion";

function current(): "full" | "reduce" {
  return document.documentElement.dataset.motion === "full" ? "full" : "reduce";
}

/**
 * The page animates by default only when the device does not ask for reduced
 * motion (see the inline script in app/layout.tsx). This lets a visitor turn
 * motion back on for this browser, or off again.
 */
export function MotionToggle({
  className = "text-paper-on-night/60 hover:text-accent-warm",
}: {
  className?: string;
}) {
  const [mode, setMode] = useState<"full" | "reduce" | null>(null);

  useEffect(() => {
    setMode(current());
  }, []);

  const toggle = () => {
    const next = current() === "full" ? "reduce" : "full";
    document.documentElement.dataset.motion = next;
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // Private mode: the choice lasts for this page only.
    }
    setMode(next);
    window.dispatchEvent(new Event("motionchange"));
  };

  return (
    <button
      type="button"
      onClick={toggle}
      className={`eyebrow underline-offset-4 hover:underline ${className}`}
    >
      {mode === null
        ? "motion"
        : mode === "full"
          ? "motion: on"
          : "motion: off"}
    </button>
  );
}
