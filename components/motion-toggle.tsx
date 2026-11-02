"use client";

import { useEffect, useState } from "react";

import { currentMotion, setMotionMode } from "@/lib/motion";

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
    setMode(currentMotion());
  }, []);

  const toggle = () => {
    const next = currentMotion() === "full" ? "reduce" : "full";
    setMotionMode(next);
    setMode(next);
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
