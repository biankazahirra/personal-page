import Link from "next/link";

import { EggPart } from "@/components/egg-part";
import { ProjectSchematic } from "@/components/project-schematic";
import type { Project } from "@/content/types";

const statusLabel: Record<Project["status"], string> = {
  shipped: "shipped",
  "in-progress": "in progress",
  archived: "archived",
};

const statusTone: Record<Project["status"], string> = {
  shipped: "ink",
  "in-progress": "mustard",
  archived: "accent",
};

/** The body paragraphs are written in this order; longer entries get "note". */
const stepLabels = ["problem", "build", "what it taught me"];

/**
 * C06 as an illustrated parts list. Rows are native `<details>`, so the table
 * still opens without JavaScript and keeps normal keyboard behaviour. On a
 * phone the ruled row becomes a stacked card; the labels move into each cell.
 */
export function PartsList({ projects }: { projects: Project[] }) {
  return (
    <div className="parts-list">
      <div className="parts-head" aria-hidden="true">
        <span>part no.</span>
        <span>description</span>
        <span>note</span>
        <span>material</span>
        <span>status</span>
        <span>view</span>
      </div>

      <ul>
        {projects.map((project, index) => {
          return (
            <li key={project.slug}>
              <details className="parts-row">
                <summary className="parts-summary">
                  <span className="parts-cell parts-no" data-label="part no.">
                    {project.partNo ?? `BZ-06-${String(index + 1).padStart(2, "0")}`}
                  </span>

                  <span className="parts-cell parts-desc" data-label="description">
                    <span className="display text-[clamp(1.35rem,2.4vw,1.9rem)]">
                      {project.title}
                    </span>
                    <span className="mt-1 block max-w-[52ch] text-sm text-ink-muted">
                      {project.summary}
                    </span>
                  </span>

                  <span className="parts-cell parts-note" data-label="note">
                    {project.role ?? "role not recorded"}
                    {project.year ? <span className="block text-ink-muted">{project.year}</span> : null}
                  </span>

                  <span className="parts-cell parts-material" data-label="material">
                    {project.stack.join(" · ")}
                  </span>

                  <span className="parts-cell" data-label="status">
                    <span className="stamp" data-tone={statusTone[project.status]}>
                      {statusLabel[project.status]}
                    </span>
                  </span>

                  <span className="parts-cell parts-cue" data-label="view" aria-hidden="true">
                    <span className="parts-cue-open">open view</span>
                    <span className="parts-cue-close">close view</span>
                  </span>
                </summary>

                <div className="parts-panel">
                  <div className="parts-steps">
                    <div className="flex flex-wrap items-baseline justify-between gap-3">
                      <p className="eyebrow text-ink-muted">Service procedure</p>
                      <Link
                        href={`/projects/${project.slug}`}
                        className="eyebrow relative inline-flex items-center gap-2 border-b border-accent pb-1 after:absolute after:-inset-x-2 after:-inset-y-3 after:content-[''] hover:text-accent"
                      >
                        full record <span aria-hidden="true">→</span>
                      </Link>
                    </div>

                    {project.body?.map((text, step) => (
                      <div key={text} className="parts-step">
                        <span className="parts-step-no" aria-hidden="true">
                          {String(step + 1).padStart(2, "0")}
                        </span>
                        <div>
                          <p className="eyebrow text-accent">
                            {stepLabels[step] ?? "note"}
                          </p>
                          <p className="mt-1 max-w-[58ch] text-ink-muted">{text}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="parts-figure">
                    <p className="eyebrow text-ink-muted">
                      Fig. 6-{index + 1} · exploded view
                    </p>
                    {project.schematic && project.schematic.length > 0 ? (
                      <div className="mt-4">
                        <ProjectSchematic nodes={project.schematic} />
                      </div>
                    ) : (
                      <p className="mt-4 text-sm text-ink-muted">
                        [ diagram pending — insert Fig. 6-{index + 1} ]
                      </p>
                    )}
                  </div>
                </div>
              </details>
            </li>
          );
        })}
      </ul>

      <EggPart />
    </div>
  );
}
