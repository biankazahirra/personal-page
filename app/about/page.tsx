import type { Metadata } from "next";
import Link from "next/link";

import { PageHeader } from "@/components/page-header";
import { Media } from "@/components/media";
import { site } from "@/content/site";
import { timeline } from "@/content/timeline";

export const metadata: Metadata = {
  title: "About",
  description:
    "Bianka: computer science, unfinished; a day job in systems and documents; a habit of building small tools.",
};

const specs = [
  {
    label: "designation",
    value: site.fullName ?? site.name,
    note: "The name on the plate. Bianka Zahirra Putri.",
  },
  {
    label: "model",
    value: "BZ-2026",
    note: "One unit, still being assembled. No spare parts.",
  },
  {
    label: "revision",
    value: "2026",
    note: "The year this manual was written, not the year the unit was made.",
  },
  {
    label: "assignment",
    value: "Administration Support, IT & Management System Division",
    note: "PT Krakatau Sarana Properti · May 2025 to now. Purchase requisitions, LHSTP records, vendor invoices, improvement records, monthly KPI reporting.",
  },
  {
    label: "education",
    value: "Computer Science, Universitas Lampung",
    note: "93 credits completed. Last GPA 3.51 out of 4.00. The degree is not finished, and this plate does not pretend otherwise.",
  },
  {
    label: "location",
    value: "[ not supplied ]",
    note: "Add site.location in content/site.ts when it should be public.",
  },
  {
    label: "operating hours",
    value: "day shift / night shift",
    note: "Two modes, one unit. See the shift notes below.",
  },
];

const toolbox = [
  {
    label: "at work",
    items: ["Microsoft Access", "document workflows", "monthly reporting"],
  },
  {
    label: "built with",
    items: ["HTML", "JavaScript", "Tailwind CSS", "PHP", "MySQL", "Java", "Figma"],
  },
  {
    label: "learning now",
    items: ["TypeScript", "Next.js", "AI coding agents"],
  },
];

const interests = [
  {
    label: "Film",
    note: "Psychological thrillers mostly. The kind that keep working on you after the credits.",
  },
  {
    label: "Music",
    note: "No genre loyalty, just songs that end up on repeat for a month.",
  },
  {
    label: "Ukulele",
    note: "Still learning. Four chords, slowly, with a lot of buzzing strings.",
  },
  {
    label: "AI agents",
    note: "Testing what they can actually build, and where they quietly fail.",
  },
];

/*
 * Revision letters follow the order the work started, not the order the
 * entries happened to be written in. The table is then shown newest first.
 */
const revisionOrder = [
  "2022 — 2024",
  "2023 — 2024",
  "Aug — Dec 2023",
  "2024",
  "May 2025 — now",
];

const revisions = timeline
  .map((item) => {
    const index = revisionOrder.indexOf(item.period);
    return {
      ...item,
      rev: String.fromCharCode(65 + (index === -1 ? 0 : index)),
    };
  })
  .sort((a, b) => b.rev.localeCompare(a.rev));

export default function AboutPage() {
  return (
    <>
      <PageHeader
        code="C02"
        name="about"
        title="The person behind the tabs."
        lede="Still learning, in public. Not a finished product, and not trying to look like one."
      />

      <section className="mx-auto max-w-[1440px] px-6 pb-16 md:px-12 md:pb-24">
        <div className="grid gap-10 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-4">
            <Media
              image={site.portrait}
              variant="field"
              label="portrait pending"
              className="aspect-[4/5] w-full"
              sizes="(min-width: 768px) 33vw, 100vw"
            />
          </div>

          <div className="md:col-span-7 md:col-start-6">
            <p className="text-[clamp(1.25rem,2vw,1.625rem)] leading-[1.5]">
              I&apos;m {site.fullName ?? site.name}. I spent two years in computer
              science at Universitas Lampung, collected 93 credits, and stopped
              before the degree was finished. The last GPA was 3.51 out of 4.00.
            </p>
            <p className="mt-6 max-w-[58ch] text-ink-muted">
              Since then most of the learning has been less formal: building forms
              in Microsoft Access, testing AI agents, breaking things, fixing them.
              I&apos;m in the IT and management system division at PT Krakatau
              Sarana Properti, where the work is documents, records and monthly
              numbers. Nobody would call it glamorous. It is satisfying in the way
              small tools are satisfying.
            </p>
            <p className="mt-6 max-w-[58ch] text-ink-muted">
              Outside of that: films, music, a ukulele I&apos;m still slow at, and a
              folder of projects that are almost finished.
            </p>
          </div>
        </div>
      </section>

      <section id="specifications" className="scroll-mt-24 border-t border-ink/15">
        <div className="mx-auto max-w-[1440px] px-6 py-16 md:px-12 md:py-24">
          <div className="grid gap-8 md:grid-cols-12 md:gap-8">
            <div className="md:col-span-3">
              <h2 className="display text-[clamp(1.75rem,3vw,2.5rem)]">
                Specifications
              </h2>
              <p className="eyebrow mt-3 text-ink-muted">sheet 2-1 · unit BZ-2026</p>
            </div>

            <div className="md:col-span-8 md:col-start-5">
              <div className="spec-sheet">
                {specs.map((spec, index) => (
                  <details key={spec.label} className="spec-row" open={index === 0}>
                    <summary>
                      <span className="spec-label">{spec.label}</span>
                      <span className="spec-value">{spec.value}</span>
                      <span className="spec-toggle" aria-hidden="true" />
                    </summary>
                    <p className="spec-note">{spec.note}</p>
                  </details>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="shifts" className="scroll-mt-24 bg-night text-paper-on-night">
        <div className="mx-auto max-w-[1440px] px-6 py-16 md:px-12 md:py-24">
          <div className="grid gap-10 md:grid-cols-12 md:gap-8">
            <div className="md:col-span-3">
              <h2 className="display text-[clamp(1.75rem,3vw,2.5rem)]">Shift notes</h2>
              <p className="eyebrow mt-3 text-paper-on-night/60">
                day shift · night shift
              </p>
            </div>

            <div className="grid gap-8 md:col-span-8 md:col-start-5 md:grid-cols-2">
              <div className="shift-card" data-shift-note="day">
                <p className="eyebrow text-accent-warm">day shift</p>
                <p className="mt-3 text-paper-on-night">
                  Forms, records and monthly numbers at PT Krakatau Sarana
                  Properti. Purchase requisitions in Microsoft Access, LHSTP
                  paperwork, vendor invoices. The work is keeping small systems
                  from quietly falling apart, and making the repetitive parts
                  shorter.
                </p>
              </div>

              <div className="shift-card" data-shift-note="night">
                <p className="eyebrow text-accent-warm">night shift</p>
                <p className="mt-3 text-paper-on-night">
                  Notes on AI agents, films that stay in the room, songs on repeat,
                  and a ukulele with four unreliable chords. This site lives here:
                  unfinished on purpose, written before the story gets tidy.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="history" className="scroll-mt-24">
        <div className="mx-auto max-w-[1440px] px-6 py-16 md:px-12 md:py-24">
          <div className="grid gap-8 md:grid-cols-12">
            <div className="md:col-span-3">
              <h2 className="display text-[clamp(1.75rem,3vw,2.5rem)]">
                Revision history
              </h2>
              <p className="eyebrow mt-3 text-ink-muted">
                Rev A → E · work · study · organisations
              </p>
            </div>

            <div className="md:col-span-8 md:col-start-5">
              <ol className="revision-table">
                {revisions.map((item) => (
                  <li key={`${item.period}-${item.title}`} className="revision-row">
                    <span className="revision-rev" data-label="rev">
                      Rev {item.rev}
                    </span>
                    <span className="revision-period" data-label="period">
                      {item.period}
                    </span>
                    <span className="revision-change" data-label="change">
                      <span className="display text-xl">{item.title}</span>
                      {item.org ? (
                        <span className="mt-1 block text-sm text-ink-muted">
                          {item.org}
                        </span>
                      ) : null}
                    </span>
                    <span className="revision-detail" data-label="detail">
                      {item.summary}
                      {item.current ? (
                        <span className="stamp ml-3" data-tone="mustard">
                          current
                        </span>
                      ) : null}
                    </span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </section>

      <section id="toolbox" className="scroll-mt-24 border-t border-ink/15">
        <div className="mx-auto max-w-[1440px] px-6 py-16 md:px-12 md:py-24">
          <div className="grid gap-10 md:grid-cols-12 md:gap-8">
            <div className="md:col-span-3">
              <h2 className="display text-[clamp(1.75rem,3vw,2.5rem)]">Toolbox</h2>
              <p className="eyebrow mt-3 text-ink-muted">used, not mastered</p>
            </div>

            <div className="md:col-span-8 md:col-start-5">
              <div className="tool-rack">
                {toolbox.map((group) => (
                  <div key={group.label} className="tool-group">
                    <p className="eyebrow text-ink-muted">{group.label}</p>
                    <ul>
                      {group.items.map((item) => (
                        <li key={item} className="tool-tag">
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
              <p className="eyebrow mt-4 text-ink-muted">
                a tool on the rack is one that has actually been used
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1440px] px-6 py-16 md:px-12 md:py-24">
        <div className="grid gap-10 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-3">
            <h2 className="display text-[clamp(1.75rem,3vw,2.5rem)]">
              Off the clock
            </h2>
          </div>

          <ul className="md:col-span-8 md:col-start-5">
            {interests.map((interest) => (
              <li
                key={interest.label}
                className="grid gap-2 border-t border-ink/15 py-5 md:grid-cols-12 md:items-baseline md:gap-6"
              >
                <h3 className="display text-2xl md:col-span-4">{interest.label}</h3>
                <p className="max-w-[44ch] text-ink-muted md:col-span-8">
                  {interest.note}
                </p>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-16 flex flex-wrap items-center gap-x-8 gap-y-4 border-t border-ink/15 pt-8">
          <Link href="/curiosity" className="eyebrow border-b border-accent pb-1 hover:text-accent">
            the notes
          </Link>
          <Link href="/life" className="eyebrow border-b border-accent pb-1 hover:text-accent">
            life lately
          </Link>
          <Link href="/projects" className="eyebrow border-b border-accent pb-1 hover:text-accent">
            things made
          </Link>
        </div>
      </section>
    </>
  );
}
