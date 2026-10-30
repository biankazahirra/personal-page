"use client";

import { useEffect, useState } from "react";

import { ASSEMBLY_TOTAL, readFound } from "@/lib/assembly";

/**
 * Punched-hole progress in the header band. Phase 1 reads real stored parts but
 * nothing marks them yet; Phase 2 wires visits, scrolls and easter eggs.
 */
export function AssemblyMeter() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const update = () => setCount(Math.min(ASSEMBLY_TOTAL, readFound().length));
    update();
    window.addEventListener("assemblychange", update);
    window.addEventListener("storage", update);
    return () => {
      window.removeEventListener("assemblychange", update);
      window.removeEventListener("storage", update);
    };
  }, []);

  return (
    <span
      className="inline-flex items-center gap-2"
      aria-label={`assembly ${count} of ${ASSEMBLY_TOTAL}`}
    >
      <span aria-hidden="true" className="flex items-center gap-[3px]">
        {Array.from({ length: ASSEMBLY_TOTAL }, (_, index) => (
          <span
            key={index}
            className={`h-[7px] w-[7px] rounded-full ${
              index < count
                ? "bg-band-ink"
                : "border border-band-ink/55"
            }`}
          />
        ))}
      </span>
      <span className="eyebrow whitespace-nowrap">
        {count}/{ASSEMBLY_TOTAL}
      </span>
    </span>
  );
}
