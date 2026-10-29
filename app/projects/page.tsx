import type { Metadata } from "next";
import Link from "next/link";

import { PageHeader } from "@/components/page-header";
import { Media } from "@/components/media";
import { projects } from "@/content/projects";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Small systems, academic projects, and things built to make a repetitive day shorter.",
};

const statusLabel = {
  shipped: "shipped",
  "in-progress": "in progress",
  archived: "archived",
} as const;

export default function ProjectsPage() {
  return (
    <>
      <PageHeader
        code="C06"
        name="projects"
        title="Things I made, and what they taught me."
        lede="Not a portfolio. Some are academic, some are for work, some are still half-open in an editor."
      />

      <section className="mx-auto max-w-[1440px] px-6 pb-24 md:px-12">
        <ul className="grid gap-x-10 gap-y-16 md:grid-cols-2">
          {projects.map((project, index) => (
            <li key={project.slug} className={index % 2 === 1 ? "md:mt-16" : ""}>
              <Link href={`/projects/${project.slug}`} className="group block">
                <Media
                  image={project.cover}
                  variant={
                    project.status === "in-progress"
                      ? "grid"
                      : project.status === "archived"
                        ? "arcs"
                        : "field"
                  }
                  label="screenshot pending"
                  className="clip-reveal aspect-[4/3] w-full transition-transform duration-700 ease-[cubic-bezier(.2,.6,.2,1)] group-hover:scale-[1.02]"
                  sizes="(min-width: 768px) 50vw, 100vw"
                />

                <div className="mt-5 flex flex-wrap items-baseline justify-between gap-3">
                  <p className="eyebrow text-ink-muted">
                    {statusLabel[project.status]}
                    {project.year ? ` · ${project.year}` : ""}
                  </p>
                  <p className="eyebrow text-ink-muted">
                    {project.stack.slice(0, 3).join(" · ")}
                  </p>
                </div>

                <h2 className="display mt-2 text-[clamp(1.75rem,3.5vw,2.75rem)] group-hover:text-accent">
                  {project.title}
                </h2>
                <p className="mt-2 max-w-[44ch] text-ink-muted">{project.summary}</p>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
