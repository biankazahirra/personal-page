import { components } from "@/content/components";
import { journal } from "@/content/journal";
import { manual } from "@/content/manual";
import { notes } from "@/content/notes";
import { projects } from "@/content/projects";
import { formatDate } from "@/lib/format";

const dates = [
  ...notes.map((note) => note.date),
  ...journal.map((entry) => entry.date),
]
  .filter((date): date is string => Boolean(date))
  .sort();

const lastRevision = dates.at(-1);

/** Live counts on a riveted plate. Nothing here is typed in by hand. */
export function DiagnosticsPlate() {
  const populated = components.filter((item) => item.status === "live").length;

  return (
    <div className="data-plate p-4 md:p-5">
      <p className="label text-[10px] opacity-70">Diagnostics</p>
      <dl className="mt-3 grid gap-x-6 gap-y-2 text-sm sm:grid-cols-2">
        <div>
          <dt className="label text-[9px] opacity-70">Model</dt>
          <dd className="mt-0.5 label text-xs">{manual.model}</dd>
        </div>
        <div>
          <dt className="label text-[9px] opacity-70">Sockets</dt>
          <dd className="mt-0.5">
            {components.length} · {populated} populated
          </dd>
        </div>
        <div>
          <dt className="label text-[9px] opacity-70">Entries</dt>
          <dd className="mt-0.5">
            {notes.length} notes · {journal.length} journal · {projects.length} projects
          </dd>
        </div>
        <div>
          <dt className="label text-[9px] opacity-70">Last revision</dt>
          <dd className="mt-0.5">
            {lastRevision ? formatDate(lastRevision) : "unknown"}
          </dd>
        </div>
      </dl>
    </div>
  );
}
