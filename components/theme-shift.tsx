"use client";

import { useEffect, useState } from "react";

export type Shift = "day" | "night";
const STORAGE_KEY = "shift";

function currentShift(): Shift {
  return document.documentElement.dataset.shift === "night" ? "night" : "day";
}

/**
 * DAY SHIFT / NIGHT SHIFT toggle. The inline script in app/layout.tsx applies
 * the stored choice before first paint; this only flips and persists it.
 */
export function ThemeShift({ className = "" }: { className?: string }) {
  const [shift, setShift] = useState<Shift | null>(null);

  useEffect(() => {
    setShift(currentShift());
  }, []);

  const toggle = () => {
    const next: Shift = currentShift() === "day" ? "night" : "day";
    document.documentElement.dataset.shift = next;
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // Private mode: the choice lasts for this page only.
    }
    setShift(next);
    window.dispatchEvent(new Event("shiftchange"));
  };

  const visible =
    shift === null ? "DAY / NIGHT SHIFT" : shift === "day" ? "DAY SHIFT" : "NIGHT SHIFT";

  return (
    <button
      type="button"
      onClick={toggle}
      className={`band-control eyebrow ${className}`}
      aria-label={
        shift === null
          ? "DAY / NIGHT SHIFT — switch theme"
          : `${visible} — switch to ${shift === "day" ? "night" : "day"} shift`
      }
    >
      {visible}
    </button>
  );
}
