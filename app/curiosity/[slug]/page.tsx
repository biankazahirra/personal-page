import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Media } from "@/components/media";
import { notes } from "@/content/notes";
import { formatDate } from "@/lib/format";

type Params = { params: Promise<{ slug: string }> };

function findBySlug(slug: string) {
  return notes.find((note) => note.slug === slug && note.body);
}

export function generateStaticParams() {
  return notes
    .filter((note) => note.body)
    .map((note) => ({ slug: note.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const note = findBySlug(slug);
  if (!note) return {};
  return { title: note.title, description: note.excerpt };
}

export default async function NotePage({ params }: Params) {
  const { slug } = await params;
  const note = findBySlug(slug);

  if (!note) notFound();

  return (
    <article className="mx-auto max-w-[1440px] px-6 pb-24 pt-32 md:px-12 md:pt-44">
      <Link
        href="/curiosity"
        className="eyebrow inline-flex items-center gap-3 text-ink-muted hover:text-accent"
      >
        <span className="node-label text-accent">C03</span>
        all notes
      </Link>

      <header className="mt-10 max-w-[24ch]">
        <p className="eyebrow text-ink-muted">
          {note.category}
          {note.date ? ` · ${formatDate(note.date)}` : ""}
          {note.placeholder ? " · sample" : ""}
        </p>
        <h1 className="display mt-4 text-[clamp(2.5rem,7vw,5rem)]">{note.title}</h1>
      </header>

      <div className="mt-14 grid gap-10 md:grid-cols-12 md:gap-8">
        <div className="md:col-span-4">
          <Media
            image={note.cover}
            variant="waves"
            label="image pending"
            className="aspect-[4/5] w-full"
            sizes="(min-width: 768px) 33vw, 100vw"
          />
        </div>

        <div className="reading md:col-span-7 md:col-start-6">
          <p className="text-[clamp(1.125rem,1.8vw,1.375rem)] leading-relaxed text-ink">
            {note.excerpt}
          </p>
          {note.body?.map((paragraph) => (
            <p key={paragraph} className="text-ink-muted">
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </article>
  );
}
