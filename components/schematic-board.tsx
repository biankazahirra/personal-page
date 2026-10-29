import Link from "next/link";

import { components } from "@/content/components";

/**
 * The homepage board: six sockets, probed with the pointer or the keyboard.
 * Pure markup and CSS, so it works before hydration and without JavaScript.
 */
export function SchematicBoard() {
  return (
    <div className="schematic-board border border-paper-on-night/25 bg-night/50 backdrop-blur-[2px]">
      <div className="flex items-baseline justify-between gap-4 border-b border-paper-on-night/20 px-4 py-2.5">
        <p className="eyebrow text-paper-on-night/60">assembly board · rev 2026</p>
        <p className="eyebrow shrink-0 text-paper-on-night/55">6 sockets</p>
      </div>

      <ul>
        {components.map((item) => (
          <li key={item.href} className="border-b border-paper-on-night/10 last:border-b-0">
            <Link
              href={item.href}
              className="socket group flex items-center gap-3 px-4 py-2.5 outline-none focus-visible:outline-1 focus-visible:outline-offset-[-2px] focus-visible:outline-accent-warm sm:py-3"
            >
              <span className="trace h-px w-4 shrink-0 opacity-40 sm:w-6" aria-hidden="true" />
              <span className="node-label shrink-0 text-paper-on-night/70">{item.code}</span>
              <span className="truncate text-base text-paper-on-night/90 sm:text-lg">
                {item.label}
              </span>
              <span className="eyebrow ml-auto hidden truncate pl-4 text-paper-on-night/45 md:block">
                {item.spec}
              </span>
              <span
                className={`eyebrow shrink-0 text-right ${
                  item.status === "unpopulated"
                    ? "text-accent-warm/80"
                    : "text-paper-on-night/55"
                }`}
              >
                {item.status}
              </span>
            </Link>
          </li>
        ))}
      </ul>

      <p className="border-t border-paper-on-night/20 px-4 py-2.5 eyebrow text-paper-on-night/55">
        probe a socket to trace it — tap to open
      </p>
    </div>
  );
}
