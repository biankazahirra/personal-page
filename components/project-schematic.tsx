import type { Project } from "@/content/types";

type SchematicNode = NonNullable<Project["schematic"]>[number];

export function ProjectSchematic({ nodes }: { nodes: SchematicNode[] }) {
  return (
    <ol>
      {nodes.map((node, index) => (
        <li key={node.label} className="relative flex gap-5 pb-7 last:pb-0">
          {index < nodes.length - 1 ? (
            <span
              aria-hidden
              className="trace trace-v absolute bottom-0 left-3.5 top-8"
            />
          ) : null}

          <span className="relative z-10 flex h-7 w-7 shrink-0 items-center justify-center">
            <span className="node-label text-accent">
              {String(index + 1).padStart(2, "0")}
            </span>
          </span>

          <details className="group min-w-0 flex-1">
            <summary className="flex cursor-pointer list-none items-baseline justify-between gap-4 border-b border-ink/15 pb-3 [&::-webkit-details-marker]:hidden">
              <span className="display text-lg">{node.label}</span>
              <span aria-hidden className="eyebrow text-ink-muted group-open:hidden">
                +
              </span>
              <span aria-hidden className="eyebrow hidden text-ink-muted group-open:inline">
                &minus;
              </span>
            </summary>
            <p className="mt-3 max-w-[52ch] text-sm text-ink-muted">{node.role}</p>
          </details>
        </li>
      ))}
    </ol>
  );
}
