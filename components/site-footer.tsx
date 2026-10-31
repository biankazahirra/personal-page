import Link from "next/link";

import { EggMeter } from "@/components/egg-meter";
import { manual, revisions } from "@/content/manual";
import { site } from "@/content/site";

/**
 * Closing page: service request details in plain text, then the printed
 * revision history. Contact is never hidden behind an interaction.
 */
export function SiteFooter() {
  const available = site.links.filter((link) => link.href);

  return (
    <footer id="contact" className="mt-24 border-t-2 border-ink/70 md:mt-32">
      <div className="hazard h-2.5" aria-hidden="true" />

      <div className="mx-auto max-w-[1440px] px-6 py-14 md:px-12 md:py-20">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-5">
            <p className="eyebrow text-ink-muted">7.0 · Service Request</p>
            <h2 className="display mt-4 text-[clamp(2.25rem,6vw,4.5rem)]">
              Say hi, <span className="normal-case italic">whenever.</span>
            </h2>
            <p className="mt-5 max-w-[38ch] text-ink-muted">
              No ticket queue, no form required. Plain text is enough.
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
                      className="border-b border-ink/30 pb-0.5 hover:border-accent hover:text-accent"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>

              <p className="mt-4 text-[11px] text-ink-muted">
                Printed in English · Indonesian edition in translation.
              </p>
            </div>
          </div>

          <div className="md:col-span-6 md:col-start-7">
            <div className="border border-ink/45 bg-paper-2/60">
              <div className="flex items-baseline justify-between gap-4 border-b border-ink/35 px-4 py-2.5">
                <p className="label text-xs">Revision history</p>
                <p className="eyebrow text-ink-muted">{manual.printedRev}</p>
              </div>
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-ink/30">
                    <th scope="col" className="label px-4 py-2 text-[10px] text-ink-muted">
                      Rev
                    </th>
                    <th scope="col" className="label px-4 py-2 text-[10px] text-ink-muted">
                      Date
                    </th>
                    <th scope="col" className="label px-4 py-2 text-[10px] text-ink-muted">
                      Note
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {revisions.map((revision) => (
                    <tr key={revision.rev} className="border-b border-ink/20 last:border-0">
                      <td className="px-4 py-2.5 text-sm">{revision.rev}</td>
                      <td className="px-4 py-2.5 text-sm text-ink-muted">{revision.date}</td>
                      <td className="px-4 py-2.5 text-sm">{revision.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <EggMeter />

            <div className="mt-6 flex flex-wrap items-baseline justify-between gap-3 border-t border-ink/25 pt-4">
              <p className="text-sm text-ink-muted">{manual.closing}</p>
              <Link href="/" className="eyebrow border-b border-ink/40 pb-0.5 hover:text-accent">
                back to the index
              </Link>
            </div>
            <p className="maintenance-only mt-3 font-mono text-[11px] text-ink-muted">
              hidden part no. BZ-99-00 · the manual itself · inspection copy
            </p>
            <p className="maintenance-only mt-2 border-l-2 border-accent pl-2 font-mono text-[11px] text-ink-muted">
              margin note: do not laminate the revision table.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
