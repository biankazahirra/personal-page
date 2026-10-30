/**
 * Manual-style placeholder for missing media or entries. Clearly marked so it
 * cannot be mistaken for real content: "[ image pending — insert Fig. 4-2 ]".
 */
export function EmptyState({
  figure,
  label = "image pending",
  note,
  className = "",
}: {
  figure: string;
  label?: string;
  note?: string;
  className?: string;
}) {
  return (
    <div
      className={`flex flex-col items-center justify-center gap-2 border border-dashed border-ink/45 bg-paper-2/40 px-4 py-8 text-center ${className}`}
    >
      <p className="label text-[11px] text-ink-muted">
        [ {label} — insert Fig. {figure} ]
      </p>
      {note ? <p className="max-w-[36ch] text-sm text-ink-muted">{note}</p> : null}
    </div>
  );
}
