import type { Metadata } from "next";
import Link from "next/link";

import { PageHeader } from "@/components/page-header";
import { Texture } from "@/components/texture";
import { journal, kindLabels } from "@/content/journal";
import { formatDate } from "@/lib/format";

export const metadata: Metadata = {
  title: "Life lately",
  description:
    "A visual journal: songs on repeat, ukulele progress, and things worth noticing.",
};

export default function LifePage() {
  const entries = [...journal].sort((a, b) => b.date.localeCompare(a.date));

  return (
    <>
      <PageHeader
        index="04 — life lately"
        title="A journal without a schedule."
        lede="Songs, small moments, practice notes. Not a feed, not a highlight reel — just what happened."
      />

      <section className="mx-auto max-w-[1440px] px-6 pb-24 md:px-12">
        <ul>
          {entries.map((entry, index) => {
            const content = (
              <div className="grid gap-8 md:grid-cols-12 md:items-end md:gap-8">
                <div className={index % 2 === 0 ? "md:col-span-6" : "md:col-span-6 md:order-2"}>
                  <Texture
                    variant={entry.kind === "music" ? "waves" : entry.kind === "ukulele" ? "field" : "grid"}
                    label="image pending"
                    className="aspect-[4/3] w-full"
                  />
                </div>

                <div className={index % 2 === 0 ? "md:col-span-6" : "md:col-span-6 md:order-1"}>
                  <p className="eyebrow text-ink-muted">
                    {kindLabels[entry.kind]} · {formatDate(entry.date)}
                    {entry.placeholder ? " · sample" : ""}
                  </p>
                  <h2 className="display mt-3 text-[clamp(2rem,4vw,3rem)] group-hover:text-accent">
                    {entry.title}
                  </h2>
                  {entry.excerpt ? (
                    <p className="mt-3 max-w-[44ch] text-ink-muted">{entry.excerpt}</p>
                  ) : null}
                  {entry.body ? (
                    <p className="eyebrow mt-6 text-ink-muted group-hover:text-accent">
                      read the entry
                    </p>
                  ) : null}
                </div>
              </div>
            );

            return (
              <li key={entry.slug} className="border-t border-ink/15 py-12 first:border-t-0 first:pt-0 md:py-16">
                {entry.body ? (
                  <Link href={`/life/${entry.slug}`} className="group block">
                    {content}
                  </Link>
                ) : (
                  <div className="group">{content}</div>
                )}
              </li>
            );
          })}
        </ul>
      </section>
    </>
  );
}
