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

      <section id="journey" className="scroll-mt-24 border-t border-ink/15">
        <div className="mx-auto max-w-[1440px] px-6 py-16 md:px-12 md:py-24">
          <div className="grid gap-8 md:grid-cols-12">
            <div className="md:col-span-3">
              <h2 className="display text-[clamp(1.75rem,3vw,2.5rem)]">Journey</h2>
              <p className="eyebrow mt-3 text-ink-muted">
                work · study · organisations
              </p>
            </div>

            <ol className="md:col-span-8 md:col-start-5">
              {timeline.map((item) => (
                <li key={`${item.period}-${item.title}`} className="border-t border-ink/15 py-6 first:border-t-0 first:pt-0">
                  <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                    <p className="eyebrow text-ink-muted">{item.period}</p>
                    <p className="eyebrow text-ink-muted">{item.kind}</p>
                    {item.current ? (
                      <span className="eyebrow rounded-none bg-ink px-2 py-0.5 text-paper">
                        now
                      </span>
                    ) : null}
                  </div>
                  <h3 className="display mt-2 text-2xl">
                    {item.title}
                    {item.org ? (
                      <span className="text-ink-muted"> — {item.org}</span>
                    ) : null}
                  </h3>
                  <p className="mt-2 max-w-[52ch] text-ink-muted">{item.summary}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section id="toolbox" className="scroll-mt-24 bg-night text-paper-on-night">
        <div className="mx-auto max-w-[1440px] px-6 py-16 md:px-12 md:py-24">
          <div className="grid gap-10 md:grid-cols-12 md:gap-8">
            <div className="md:col-span-3">
              <h2 className="display text-[clamp(1.75rem,3vw,2.5rem)]">Toolbox</h2>
              <p className="eyebrow mt-3 text-paper-on-night/60">
                used, not mastered
              </p>
            </div>

            <div className="md:col-span-8 md:col-start-5">
              {toolbox.map((group) => (
                <div
                  key={group.label}
                  className="grid gap-3 border-t border-paper-on-night/20 py-6 md:grid-cols-12"
                >
                  <p className="eyebrow text-paper-on-night/60 md:col-span-3">
                    {group.label}
                  </p>
                  <ul className="flex flex-wrap gap-x-5 gap-y-2 md:col-span-9">
                    {group.items.map((item) => (
                      <li key={item} className="text-lg">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
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
