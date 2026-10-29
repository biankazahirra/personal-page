"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import { MotionToggle } from "@/components/motion-toggle";
import { components } from "@/content/components";
import { site } from "@/content/site";

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const closeButton = useRef<HTMLButtonElement>(null);
  const menuButton = useRef<HTMLButtonElement>(null);
  const dialog = useRef<HTMLDivElement>(null);
  const progressBar = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);

      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollable > 0 ? window.scrollY / scrollable : 0;
      progressBar.current?.style.setProperty("--progress", progress.toFixed(4));
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButton.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        menuButton.current?.focus();
        return;
      }

      if (event.key !== "Tab") return;

      const focusable = dialog.current?.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled])',
      );
      if (!focusable || focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const onDark = open || (pathname === "/" && !scrolled);
  const tone = onDark ? "text-paper-on-night" : "text-ink";
  const mutedTone = onDark ? "text-paper-on-night/60" : "text-ink-muted";
  // Solid once scrolled so the bar stays legible over both paper and night chapters.
  const shell =
    scrolled && !open ? "border-ink/10 bg-paper/95 backdrop-blur-md" : "border-transparent";

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300 ${shell} ${tone}`}
    >
      <div className="mx-auto flex max-w-[1440px] items-center justify-between px-6 py-5 md:px-12">
        <Link
          href="/"
          className="eyebrow hover:text-accent-warm"
          aria-label={`${site.name} — home`}
        >
          {site.name}
        </Link>

        <div className="flex items-baseline gap-4 md:gap-5">
          <span className={`eyebrow hidden sm:block ${mutedTone}`}>rev 2026</span>
          <button
            ref={menuButton}
            type="button"
            onClick={() => setOpen(true)}
            aria-expanded={open}
            aria-controls="components"
            className={`eyebrow border px-3 py-2 transition-colors duration-200 hover:border-accent-warm hover:text-accent-warm ${
              onDark ? "border-paper-on-night/30" : "border-ink/25"
            }`}
          >
            components
          </button>
        </div>
      </div>

      <div
        ref={progressBar}
        aria-hidden="true"
        className="h-px w-full origin-left bg-accent-warm"
        style={{ transform: "scaleX(var(--progress, 0))" }}
      />

      {open ? (
        <div
          id="components"
          ref={dialog}
          role="dialog"
          aria-modal="true"
          aria-label="Select a component"
          className="fixed inset-0 z-40 overflow-y-auto bg-night text-paper-on-night"
        >
          <div className="overlay-panel mx-auto flex min-h-full max-w-[1440px] flex-col px-6 py-5 md:px-12">
            <div className="flex items-center justify-between">
              <p className="eyebrow text-paper-on-night/60">select a component</p>
              <button
                ref={closeButton}
                type="button"
                onClick={() => {
                  setOpen(false);
                  menuButton.current?.focus();
                }}
                className="eyebrow border border-paper-on-night/30 px-3 py-2 hover:border-accent-warm hover:text-accent-warm"
              >
                close
              </button>
            </div>

            <nav aria-label="Components" className="flex flex-1 flex-col justify-center py-10">
              {components.map((item) => {
                const active =
                  item.href === "/"
                    ? pathname === "/"
                    : pathname.startsWith(item.href);

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className="group flex items-baseline gap-3 border-b border-paper-on-night/10 py-3 md:gap-6"
                  >
                    <span
                      className={`node-label shrink-0 ${
                        active ? "text-accent-warm" : "text-paper-on-night/60"
                      }`}
                    >
                      {item.code}
                    </span>
                    <span
                      className={`display text-[clamp(1.75rem,6vw,4.5rem)] transition-colors duration-200 group-hover:text-accent-warm ${
                        active ? "text-accent-warm" : ""
                      }`}
                    >
                      {item.label}
                    </span>
                    <span className="ml-auto flex shrink-0 items-baseline gap-3">
                      <span className="eyebrow hidden text-paper-on-night/60 sm:block">
                        {item.blurb}
                      </span>
                      <span
                        className={`eyebrow hidden text-paper-on-night/40 md:block ${
                          item.status === "unpopulated" ? "text-paper-on-night/30" : ""
                        }`}
                      >
                        {item.status}
                      </span>
                    </span>
                  </Link>
                );
              })}
            </nav>

            <div className="flex flex-wrap items-baseline justify-between gap-3 border-t border-paper-on-night/10 pt-4">
              <p className="eyebrow text-paper-on-night/60">{site.tagline}</p>
              <div className="flex items-baseline gap-5">
                <MotionToggle />
                <p className="eyebrow text-paper-on-night/60">rev 2026</p>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
}
