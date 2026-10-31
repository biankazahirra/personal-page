"use client";

import { useEffect, useState } from "react";

import { manual } from "@/content/manual";
import { ASSEMBLY_TOTAL, foundCount } from "@/lib/assembly";

type DataPlateProps = {
  className?: string;
  /** `compact` drops the serial row for tight placements. */
  compact?: boolean;
};

/**
 * Riveted plate on the unit. The status is live: it reads the same stored
 * parts as the header meter, so the two can never disagree.
 */
export function DataPlate({ className = "", compact = false }: DataPlateProps) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const update = () => setCount(foundCount());
    update();
    window.addEventListener("assemblychange", update);
    window.addEventListener("storage", update);
    return () => {
      window.removeEventListener("assemblychange", update);
      window.removeEventListener("storage", update);
    };
  }, []);

  const complete = count >= ASSEMBLY_TOTAL;
  const status = complete ? "assembled · approved" : "partly assembled";

  return (
    <div className={`data-plate ${className}`}>
      <dl className="grid grid-cols-2 gap-x-5 gap-y-2 p-3 sm:grid-cols-4 sm:p-4">
        <div>
          <dt className="label text-[9px] opacity-70">Model</dt>
          <dd className="label mt-0.5 text-xs">{manual.model}</dd>
        </div>
        {compact ? null : (
          <div>
            <dt className="label text-[9px] opacity-70">Serial</dt>
            <dd className="mt-0.5 font-mono text-xs">{manual.serial}</dd>
          </div>
        )}
        <div>
          <dt className="label text-[9px] opacity-70">Revision</dt>
          <dd className="mt-0.5 font-mono text-xs">{manual.revision}</dd>
        </div>
        <div>
          <dt className="label text-[9px] opacity-70">Status</dt>
          <dd
            className="label mt-0.5 flex items-center gap-1.5 text-[10px] leading-tight"
            aria-live="polite"
          >
            <span
              aria-hidden="true"
              className={`assembly-lamp ${complete ? "is-on" : ""}`}
            />
            {status}
          </dd>
        </div>
      </dl>
    </div>
  );
}
