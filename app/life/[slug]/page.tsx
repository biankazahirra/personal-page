import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Texture } from "@/components/texture";
import { journal, kindLabels } from "@/content/journal";
import { formatDate } from "@/lib/format";

type Params = { params: Promise<{ slug: string }> };

function findBySlug(slug: string) {
  return journal.find((entry) => entry.slug === slug && entry.body);
}

export function generateStaticParams() {
  return journal
    .filter((entry) => entry.body)
    .map((entry) => ({ slug: entry.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const entry = findBySlug(slug);
  if (!entry) return {};
  return { title: entry.title, description: entry.excerpt };
}

export default async function JournalEntryPage({ params }: Params) {
  const { slug } = await params;
  const entry = findBySlug(slug);

  if (!entry) notFound();

  return (
    <article className="mx-auto max-w-[1440px] px-6 pb-24 pt-32 md:px-12 md:pt-44">
      <Link href="/life" className="eyebrow text-ink-muted hover:text-accent">
        ← life lately
      </Link>

      <header className="mt-10 max-w-[26ch]">
        <p className="eyebrow text-ink-muted">
          {kindLabels[entry.kind]} · {formatDate(entry.date)}
          {entry.placeholder ? " · sample" : ""}
        </p>
        <h1 className="display mt-4 text-[clamp(2.5rem,7vw,5rem)]">{entry.title}</h1>
      </header>

      <div className="mt-14 grid gap-10 md:grid-cols-12 md:gap-8">
        <div className="reading md:col-span-7">
          {entry.excerpt ? (
            <p className="text-[clamp(1.125rem,1.8vw,1.375rem)] leading-relaxed">
              {entry.excerpt}
            </p>
          ) : null}
          {entry.body?.map((paragraph) => (
            <p key={paragraph} className="text-ink-muted">
              {paragraph}
            </p>
          ))}
        </div>

        <div className="md:col-span-4 md:col-start-9">
          {entry.images && entry.images.length > 0 ? (
            <ul className="grid gap-4">
              {entry.images.map((image) => (
                <li key={image.src}>
                  <Image
                    src={image.src}
                    alt={image.alt}
                    width={image.width}
                    height={image.height}
                    sizes="(min-width: 768px) 33vw, 100vw"
                    className="h-auto w-full"
                  />
                </li>
              ))}
            </ul>
          ) : (
            <>
              <Texture variant="waves" label="image pending" className="aspect-[4/5] w-full" />
              <p className="eyebrow mt-4 text-ink-muted">
                a photo belongs here
              </p>
            </>
          )}
        </div>
      </div>
    </article>
  );
}
