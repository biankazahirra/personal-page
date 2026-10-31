import type { Metadata } from "next";

import { PageHeader } from "@/components/page-header";
import { PartsList } from "@/components/parts-list";
import { projects } from "@/content/projects";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Small systems, academic projects, and things built to make a repetitive day shorter.",
};

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
        <div className="mb-8 flex flex-wrap items-baseline justify-between gap-x-8 gap-y-3">
          <p className="eyebrow text-ink-muted">
            Section 6 · illustrated parts list · {projects.length} parts
          </p>
          <p className="eyebrow text-ink-muted">
            open a row to inspect it
          </p>
        </div>

        <PartsList projects={projects} />

        <p className="mt-10 max-w-[62ch] border-t border-ink/15 pt-6 text-sm text-ink-muted">
          Material is what it was built from, not a claim that any of it is
          mastered. A part marked in progress is still on the bench.
        </p>

        <p className="maintenance-only mt-4 font-mono text-[11px] text-ink-muted">
          hidden part no. BZ-06-00 · the manual itself · filed in the margin
        </p>
        <p className="maintenance-only mt-2 border-l-2 border-accent pl-2 font-mono text-[11px] text-ink-muted">
          margin note: part numbers are stamped by hand; expect one crooked.
        </p>
      </section>
    </>
  );
}
