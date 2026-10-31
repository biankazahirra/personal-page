"use client";

import { useEffect, useState } from "react";

import { EGG_TOTAL, eggs, readEggs, type EggId } from "@/lib/eggs";

/**
 * The field kit counter. It is deliberately separate from the ten-part
 * assembly meter: hidden parts are a bonus, not a requirement to use the site.
 */
export function EggMeter() {
  const [found, setFound] = useState<EggId[]>([]);

  useEffect(() => {
    const update = () => setFound(readEggs());
    update();
    window.addEventListener("eggchange", update);
    window.addEventListener("storage", update);
    return () => {
      window.removeEventListener("eggchange", update);
      window.removeEventListener("storage", update);
    };
  }, []);

  return (
    <div className="egg-meter">
      <p className="eyebrow text-ink-muted">
        Field kit · hidden parts {found.length}/{EGG_TOTAL}
      </p>
      <ul className="egg-meter-holes" aria-hidden="true">
        {eggs.map((egg) => (
          <li
            key={egg.id}
            data-found={found.includes(egg.id)}
            title={found.includes(egg.id) ? `${egg.partNo} · ${egg.label}` : "not found"}
          >
            <span>{egg.partNo.replace("BZ-EE-", "")}</span>
          </li>
        ))}
      </ul>
      <p className="mt-2 text-[11px] leading-snug text-ink-muted">
        Seven parts are not in the index. Nothing here is required to read the manual.
      </p>
    </div>
  );
}
