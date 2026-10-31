"use client";

import { useEffect, useState } from "react";

import { ASSEMBLY_TOTAL, foundCount } from "@/lib/assembly";

/**
 * The permanent hidden extra. It stays out of the layout until the unit is
 * assembled, then prints itself at the bottom of the index.
 */
export function AssemblyExtra() {
  const [complete, setComplete] = useState(false);

  useEffect(() => {
    const update = () => setComplete(foundCount() >= ASSEMBLY_TOTAL);
    update();
    window.addEventListener("assemblychange", update);
    window.addEventListener("storage", update);
    return () => {
      window.removeEventListener("assemblychange", update);
      window.removeEventListener("storage", update);
    };
  }, []);

  if (!complete) return null;

  return (
    <section id="service-note" className="bg-paper">
      <div className="mx-auto max-w-[1440px] px-6 pb-20 md:px-12 md:pb-28">
        <div className="relative border-2 border-ink/70 bg-paper-2/50 p-5 md:p-8">
          <span
            aria-hidden="true"
            className="absolute -top-3 left-6 h-6 w-24 rotate-[-2deg] bg-mustard/70"
          />
          <div className="flex flex-wrap items-baseline justify-between gap-4 border-b border-ink/30 pb-3">
            <p className="label text-xs">Service note no. 10</p>
            <p className="eyebrow text-ink-muted">
              {ASSEMBLY_TOTAL}/{ASSEMBLY_TOTAL} · final inspection
            </p>
          </div>

          <div className="mt-5 grid gap-6 md:grid-cols-12">
            <div className="md:col-span-7">
              <h2 className="display text-[clamp(1.75rem,4vw,3rem)]">
                The machine is mostly paper.
              </h2>
              <p className="mt-4 max-w-[48ch] text-ink-muted">
                You found every part. There is nothing left to switch on. The
                rest of the manual is just reading: notes, films, songs, small
                systems, and a ukulele that is still uncalibrated.
              </p>
              <p className="eyebrow mt-5 text-ink-muted">
                Filed by the operator · keep for reference
              </p>
            </div>

            <div className="md:col-span-4 md:col-start-9">
              <div className="data-plate p-4">
                <p className="label text-[10px] opacity-70">Inspection result</p>
                <p className="stamp mt-3 inline-block text-sm" data-tone="mustard">
                  Approved
                </p>
                <p className="mt-4 font-mono text-xs opacity-80">
                  model BZ-2026
                  <br />
                  serial BZ-2026-0042
                  <br />
                  rev 2026
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
