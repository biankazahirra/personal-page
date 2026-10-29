type PartLabelProps = {
  code: string;
  name: string;
  tone?: "ink" | "night";
};

/**
 * The section marker: part number, name, and a short copper trace.
 * Same shape as a socket on the assembly board, so a section reads as
 * another part of the same machine.
 */
export function PartLabel({ code, name, tone = "ink" }: PartLabelProps) {
  const muted = tone === "night" ? "text-paper-on-night/60" : "text-ink-muted";

  return (
    <p className={`eyebrow flex items-center gap-3 ${muted}`}>
      <span className={`node-label ${tone === "night" ? "text-accent-warm" : "text-accent"}`}>
        {code}
      </span>
      <span className="shrink-0">{name}</span>
      <span className="trace h-px w-10 shrink-0 opacity-50 md:w-16" aria-hidden="true" />
    </p>
  );
}
