import type { Metadata } from "next";
import Link from "next/link";

import { DiagnosticsPlate } from "@/components/diagnostics-plate";
import { EggMeter } from "@/components/egg-meter";
import { LangEditions } from "@/components/lang-editions";
import { PageHeader } from "@/components/page-header";
import { manual, revisions } from "@/content/manual";
import { t } from "@/content/i18n";

export const metadata: Metadata = {
  title: "Colophon",
  description:
    "About this website: revision history, printed editions, hidden parts, diagnostics and credits.",
};

export default function ColophonPage() {
  return (
    <div className="bg-plate relative">

      <PageHeader
        code="9.0"
        name="end matter"
        plain="About this website"
        title="End matter."
        lede="How the manual is printed, revised, and where the parts that are not in the index ended up."
      />

      <section id="revisions" className="border-t border-ink/15">
        <div className="mx-auto max-w-[1440px] px-6 py-16 md:px-12 md:py-24">
          <div className="grid gap-8 md:grid-cols-12">
            <div className="md:col-span-3">
              <h2 className="display text-[clamp(1.75rem,3vw,2.5rem)]">
                Revision history
              </h2>
              <p className="eyebrow mt-3 text-ink-muted">{manual.printedRev}</p>
            </div>

            <div className="md:col-span-8 md:col-start-5">
              <div className="border border-ink/45 bg-paper-2/60">
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
                      <tr
                        key={revision.rev}
                        className={
                          "pending" in revision && revision.pending
                            ? "border-b border-dashed border-ink/30 text-ink-muted opacity-60 last:border-0"
                            : "border-b border-ink/20 last:border-0"
                        }
                      >
                        <td className="px-4 py-2.5 text-sm">{revision.rev}</td>
                        <td className="px-4 py-2.5 text-sm text-ink-muted">
                          {revision.date}
                        </td>
                        <td className="px-4 py-2.5 text-sm">
                          {revision.note}
                          {"current" in revision && revision.current ? (
                            <span className="stamp ml-3" data-tone="mustard">
                              current
                            </span>
                          ) : null}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <p className="eyebrow mt-4 -rotate-1 text-ink-muted">
                margin note: do not laminate the revision table.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="editions" className="border-t border-ink/15">
        <div className="mx-auto max-w-[1440px] px-6 py-16 md:px-12 md:py-24">
          <div className="grid gap-8 md:grid-cols-12">
            <div className="md:col-span-3">
              <h2 className="display text-[clamp(1.75rem,3vw,2.5rem)]">
                Print editions
              </h2>
              <p className="eyebrow mt-3 text-ink-muted">two editions, one written</p>
            </div>

            <div className="md:col-span-8 md:col-start-5">
              <p className="label text-[10px] text-ink-muted">{t("lang.title")}</p>
              <LangEditions />
            </div>
          </div>
        </div>
      </section>

      <section id="field-kit" className="border-t border-ink/15">
        <div className="mx-auto max-w-[1440px] px-6 py-16 md:px-12 md:py-24">
          <div className="grid gap-8 md:grid-cols-12">
            <div className="md:col-span-3">
              <h2 className="display text-[clamp(1.75rem,3vw,2.5rem)]">
                Field kit
              </h2>
              <p className="eyebrow mt-3 text-ink-muted">seven dashed slots</p>
            </div>

            <div className="md:col-span-8 md:col-start-5">
              <EggMeter />
            </div>
          </div>
        </div>
      </section>

      <section id="diagnostics" className="border-t border-ink/15">
        <div className="mx-auto max-w-[1440px] px-6 py-16 md:px-12 md:py-24">
          <div className="grid gap-8 md:grid-cols-12">
            <div className="md:col-span-3">
              <h2 className="display text-[clamp(1.75rem,3vw,2.5rem)]">
                Diagnostics
              </h2>
              <p className="eyebrow mt-3 text-ink-muted">read from the data</p>
            </div>

            <div className="md:col-span-8 md:col-start-5">
              <DiagnosticsPlate />
            </div>
          </div>
        </div>
      </section>

      <section id="credits" className="border-t border-ink/15">
        <div className="mx-auto max-w-[1440px] px-6 py-16 md:px-12 md:py-24">
          <div className="grid gap-8 md:grid-cols-12">
            <div className="md:col-span-3">
              <h2 className="display text-[clamp(1.75rem,3vw,2.5rem)]">Credits</h2>
              <p className="eyebrow mt-3 text-ink-muted">still being written</p>
            </div>

            <div className="md:col-span-8 md:col-start-5">
              <p className="border border-dashed border-ink/45 px-4 py-3 font-mono text-sm text-ink-muted">
                [ typefaces, tools — fill in ]
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-ink/15">
        <div className="mx-auto max-w-[1440px] px-6 py-16 md:px-12 md:py-24">
          <div className="flex flex-wrap items-start justify-between gap-8">
            <div>
              <p className="stamp inline-block text-sm" data-tone="mustard">
                Inspection copy
              </p>
              <p className="mt-4 font-mono text-[11px] text-ink-muted">
                hidden part no. BZ-99-00 · the manual itself · inspection copy
              </p>
              <p className="mt-2 max-w-[46ch] text-sm text-ink-muted">
                {manual.closing}
              </p>
              <Link
                href="/"
                className="eyebrow mt-5 inline-block border-b border-ink/40 pb-0.5 hover:text-accent"
              >
                ← back to the index
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
