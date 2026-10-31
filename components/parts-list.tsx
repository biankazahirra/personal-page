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
          const procedure = project.procedure;

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
                    <p className="eyebrow text-ink-muted">Service procedure</p>

                    {[
                      { n: "01", label: "problem", text: procedure?.problem },
                      { n: "02", label: "build", text: procedure?.build },
                      { n: "03", label: "what it taught me", text: procedure?.lesson },
                    ].map((step) => (
                      <div key={step.n} className="parts-step">
                        <span className="parts-step-no" aria-hidden="true">
                          {step.n}
                        </span>
                        <div>
                          <p className="eyebrow text-accent">{step.label}</p>
                          {step.text ? (
                            <p className="mt-1 max-w-[58ch] text-ink-muted">{step.text}</p>
                          ) : (
                            <p className="mt-1 text-sm text-ink-muted">
                              [ not recorded yet — add it in content/projects.ts ]
                            </p>
                          )}
                        </div>
                      </div>
                    ))}

                    <p className="parts-change">
                      <span className="eyebrow text-ink-muted">what i&apos;d change</span>{" "}
                      {procedure?.change ? (
                        procedure.change
                      ) : (
                        <span className="text-sm">
                          [ change note pending — the manual leaves this line blank rather than
                          guessing ]
                        </span>
                      )}
                    </p>
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
                    <Link
                      href={`/projects/${project.slug}`}
                      className="eyebrow mt-6 inline-flex items-center gap-2 border-b border-accent pb-1 hover:text-accent"
                    >
                      full record <span aria-hidden="true">→</span>
                    </Link>
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
