"use client";

import { useEffect, useState } from "react";

import { ASSEMBLY_TOTAL, assemblyParts, readFound } from "@/lib/assembly";

/**
 * Punched-hole progress in the header band. Each hole is a part found; the
 * lamp at the end turns on when the unit is fully assembled.
 */
export function AssemblyMeter() {
  const [count, setCount] = useState(0);
  const [found, setFound] = useState<string[]>([]);

  useEffect(() => {
    const update = () => {
      const ids = readFound();
      setFound(ids);
      setCount(Math.min(ASSEMBLY_TOTAL, ids.length));
    };
    update();
    window.addEventListener("assemblychange", update);
    window.addEventListener("storage", update);
    return () => {
      window.removeEventListener("assemblychange", update);
      window.removeEventListener("storage", update);
    };
  }, []);

  const complete = count >= ASSEMBLY_TOTAL;

  return (
    <span className="inline-flex items-center gap-2">
      <span aria-hidden="true" className="flex items-center gap-[3px]">
        {assemblyParts.map((part) => (
          <span
            key={part.id}
            className="punch-hole"
            data-filled={found.includes(part.id)}
            title={`${part.label} — ${found.includes(part.id) ? "found" : "missing"}`}
          />
        ))}
      </span>
      <span className="eyebrow whitespace-nowrap">
        {count}/{ASSEMBLY_TOTAL}
      </span>
      <span
        aria-hidden="true"
        className={`assembly-lamp ${complete ? "is-on" : ""}`}
      />
      <span className="sr-only" role="status" aria-live="polite">
        assembly {count} of {ASSEMBLY_TOTAL}
        {complete ? " — unit assembled" : ""}
      </span>
    </span>
  );
}
