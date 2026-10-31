"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { components } from "@/content/components";

/**
 * Index tabs along the bottom edge, one per socket. The current tab sits
 * raised and mustard-marked; on phones the strip scrolls sideways with snap.
 */
export function IndexTabs() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Sockets"
      className="fixed inset-x-0 bottom-0 z-40 border-t-2 border-ink/70 bg-paper"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <ol className="mx-auto flex max-w-[1440px] snap-x snap-mandatory overflow-x-auto">
        {components.map((item) => {
          const active =
            item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);

          return (
            <li key={item.code} className="min-w-[5.5rem] flex-1 snap-start">
              <Link
                href={item.href}
                prefetch={false}
                aria-current={active ? "page" : undefined}
                className={`flex h-14 flex-col items-start justify-center border-r border-ink/20 px-3 transition-colors md:px-4 ${
                  active
                    ? "-mt-1 h-[3.75rem] border-t-4 border-t-mustard bg-paper text-ink"
                    : "bg-paper-2 text-ink-muted hover:bg-paper hover:text-ink"
                }`}
              >
                <span className="label text-[10px] leading-none tracking-[0.14em]">
                  {item.code}
                </span>
                <span className="mt-1 truncate text-[11px] uppercase leading-none tracking-[0.12em] md:text-xs">
                  {item.label}
                </span>
              </Link>
            </li>
          );
        })}

        <li className="hidden min-w-[7rem] flex-1 snap-start md:block">
          <Link
            href="/contact"
            prefetch={false}
            className={`flex h-14 flex-col items-start justify-center border-l border-ink/20 px-4 transition-colors ${
              pathname.startsWith("/contact")
                ? "-mt-1 h-[3.75rem] border-t-4 border-t-mustard bg-paper text-ink"
                : "bg-paper-2 text-ink-muted hover:bg-paper hover:text-ink"
            }`}
          >
            <span className="label text-[10px] leading-none tracking-[0.14em]">C07</span>
            <span className="mt-1 text-xs uppercase leading-none tracking-[0.12em]">
              contact
            </span>
          </Link>
        </li>
      </ol>
    </nav>
  );
}
