import Link from "next/link";

import { manual } from "@/content/manual";
import { site } from "@/content/site";

/**
 * Closing page: service request details in plain text, then one compact row.
 * The revision table, print editions and hidden parts live on /colophon.
 */
export function SiteFooter() {
  const available = site.links.filter((link) => link.href);

  return (
    <footer
      id="contact"
      className="bg-plate plate-rivets mt-24 border-t-2 border-ink/70 md:mt-32"
    >
      <div className="hazard h-2.5" aria-hidden="true" />

      <div className="mx-auto max-w-[1440px] px-6 py-14 md:px-12 md:py-20">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-5">
            <p className="eyebrow text-ink-muted">7.0 · Service Request</p>
            <h2 className="display mt-4 text-[clamp(2.25rem,6vw,4.5rem)]">
              Say hi.
            </h2>
            <p className="mt-5 max-w-[38ch] text-ink-muted">
              Plain text is enough.
            </p>

            <div className="mt-8 border-t border-ink/25 pt-5">
              <p className="label text-[10px] text-ink-muted">Email</p>
              {site.email ? (
                <a
                  href={`mailto:${site.email}`}
                  className="mt-1 inline-block border-b border-accent pb-0.5 text-lg hover:text-accent"
                >
                  {site.email}
                </a>
              ) : (
                <p className="mt-1 max-w-[34ch] border border-dashed border-ink/45 px-3 py-2 text-sm text-ink-muted">
                  [ email pending — add it to{" "}
                  <span className="whitespace-nowrap">content/site.ts</span> ]
                </p>
              )}

              <p className="label mt-6 text-[10px] text-ink-muted">Elsewhere</p>
              <ul className="mt-1 space-y-1">
                {available.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      rel="noreferrer noopener"
                      target="_blank"
                      className="group inline-flex min-h-[44px] items-center hover:text-accent md:min-h-0"
                    >
                      <span className="border-b border-ink/30 pb-0.5 group-hover:border-accent">
                        {link.label}
                      </span>
                    </a>
                  </li>
                ))}
              </ul>

            </div>
          </div>

          <div className="flex flex-col justify-end md:col-span-6 md:col-start-7">
            <p className="text-sm text-ink-muted">{manual.closing}</p>

            <div className="mt-4 flex flex-wrap items-baseline gap-x-3 gap-y-1 border-t border-ink/25 pt-4 text-sm">
              <Link href="/" className="eyebrow border-b border-ink/40 pb-0.5 hover:text-accent">
                ← back to the index
              </Link>
              <span aria-hidden="true" className="text-ink-muted">
                ·
              </span>
              <a
                href={`mailto:${site.email}`}
                className="eyebrow border-b border-ink/40 pb-0.5 hover:text-accent"
              >
                email
              </a>
              <span aria-hidden="true" className="text-ink-muted">
                ·
              </span>
              <Link
                href="/colophon"
                className="eyebrow border-b border-ink/40 pb-0.5 hover:text-accent"
              >
                colophon
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
