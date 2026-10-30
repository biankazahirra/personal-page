import Link from "next/link";

import { MotionToggle } from "@/components/motion-toggle";
import { site } from "@/content/site";

export function SiteFooter() {
  const available = site.links.filter((link) => link.href);

  return (
    <footer className="mt-24 border-t border-ink/15 md:mt-32">
      <div className="mx-auto max-w-[1440px] px-6 py-16 md:px-12 md:py-24">
        <p className="eyebrow text-ink-muted">elsewhere</p>

        <h2 className="display mt-6 text-[clamp(2.5rem,7vw,5rem)]">
          say hi, <em className="italic">whenever.</em>
        </h2>

        {site.email ? (
          <a
            href={`mailto:${site.email}`}
            className="mt-8 inline-block border-b border-accent pb-1 text-lg hover:text-accent"
          >
            {site.email}
          </a>
        ) : (
          <p className="mt-8 max-w-[42ch] text-ink-muted">
            No public email yet. The links below will appear here once they are
            worth sharing.
          </p>
        )}

        {available.length > 0 ? (
          <ul className="mt-10 flex flex-wrap gap-x-8 gap-y-3">
            {available.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  rel="noreferrer noopener"
                  target="_blank"
                  className="eyebrow border-b border-ink/30 pb-1 hover:border-accent hover:text-accent"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        ) : (
          <p className="eyebrow mt-10 text-ink-muted">
            github · letterboxd · spotify — pending
          </p>
        )}

        <div className="mt-16 flex flex-col gap-4 border-t border-ink/15 pt-6 md:flex-row md:items-center md:justify-between">
          <p className="eyebrow text-ink-muted">
            {site.name} — assembled slowly, revised occasionally
          </p>
          <div className="flex flex-wrap items-center gap-6">
            <MotionToggle className="text-ink-muted hover:text-accent" />
            <Link href="/" className="eyebrow text-ink-muted hover:text-accent">
              back to the index
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
