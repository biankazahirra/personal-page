import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Media } from "@/components/media";
import { projects } from "@/content/projects";

type Params = { params: Promise<{ slug: string }> };

const statusLabel = {
  shipped: "shipped",
  "in-progress": "in progress",
  archived: "archived",
} as const;

function findBySlug(slug: string) {
  return projects.find((project) => project.slug === slug);
}

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const project = findBySlug(slug);
  if (!project) return {};
  return { title: project.title, description: project.summary };
}

export default async function ProjectPage({ params }: Params) {
  const { slug } = await params;
  const project = findBySlug(slug);

  if (!project) notFound();

  return (
    <article className="mx-auto max-w-[1440px] px-6 pb-24 pt-32 md:px-12 md:pt-44">
      <Link href="/projects" className="eyebrow text-ink-muted hover:text-accent">
        ← all projects
      </Link>

      <header className="mt-10 max-w-[22ch]">
        <p className="eyebrow text-ink-muted">
          {statusLabel[project.status]}
          {project.year ? ` · ${project.year}` : ""}
        </p>
        <h1 className="display mt-4 text-[clamp(2.5rem,7vw,5.5rem)]">{project.title}</h1>
        <p className="mt-6 max-w-[46ch] text-lg text-ink-muted">{project.summary}</p>
      </header>

      <div className="mt-14">
        <Media
          image={project.cover}
          variant="field"
          label="screenshot pending"
          className="aspect-[16/9] w-full"
          sizes="(min-width: 1440px) 1440px, 100vw"
        />
      </div>

      <div className="mt-14 grid gap-10 md:grid-cols-12 md:gap-8">
        <dl className="md:col-span-4">
          {project.role ? (
            <div className="border-t border-ink/15 py-4">
              <dt className="eyebrow text-ink-muted">role</dt>
              <dd className="mt-1">{project.role}</dd>
            </div>
          ) : null}

          <div className="border-t border-ink/15 py-4">
            <dt className="eyebrow text-ink-muted">stack</dt>
            <dd className="mt-1">{project.stack.join(", ")}</dd>
          </div>

          <div className="border-t border-ink/15 py-4">
            <dt className="eyebrow text-ink-muted">status</dt>
            <dd className="mt-1">{statusLabel[project.status]}</dd>
          </div>

          {project.links && project.links.length > 0 ? (
            <div className="border-t border-ink/15 py-4">
              <dt className="eyebrow text-ink-muted">links</dt>
              {project.links.map((link) => (
                <dd key={link.href} className="mt-1">
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="border-b border-accent pb-0.5 hover:text-accent"
                  >
                    {link.label}
                  </a>
                </dd>
              ))}
            </div>
          ) : null}
        </dl>

        <div className="reading md:col-span-7 md:col-start-6">
          {project.body?.map((paragraph) => (
            <p key={paragraph} className="text-ink-muted">
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </article>
  );
}
