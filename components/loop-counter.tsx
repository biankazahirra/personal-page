/**
 * A mechanical loop counter. The digits are real content: when `count` is not
 * recorded, the wheels show a dash instead of an invented number.
 */
export function LoopCounter({ count }: { count?: number }) {
  const digits =
    typeof count === "number"
      ? String(count).padStart(3, "0").split("")
      : ["—", "—", "—"];

  return (
    <div className="loop-counter">
      <div className="flex items-baseline justify-between gap-4">
        <p className="eyebrow text-ink-muted">loop counter · music</p>
        <p className="eyebrow text-ink-muted">
          {typeof count === "number" ? "logged" : "no count logged"}
        </p>
      </div>

      <div className="mt-4 flex items-end gap-3">
        <span className="eyebrow pb-2 text-ink-muted">played on repeat ×</span>
        <span className="odometer" aria-hidden="true">
          {digits.map((digit, index) => (
            <span key={index} className="odometer-digit">
              {digit}
            </span>
          ))}
        </span>
        <span className="sr-only">
          {typeof count === "number" ? count : "not recorded"}
        </span>
      </div>

      <p className="mt-3 text-sm text-ink-muted">
        {typeof count === "number"
          ? "One song, one month, one number. The wheels only turn when the count is real."
          : "[ count pending — add loops to a journal entry in content/journal.ts ]"}
      </p>
    </div>
  );
}
