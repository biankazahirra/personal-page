import { Media } from "@/components/media";
import type { JournalEntry } from "@/content/types";
import { formatDate } from "@/lib/format";
import { kindLabels } from "@/content/journal";

const variants: Record<JournalEntry["kind"], "grid" | "waves" | "field" | "arcs"> = {
  update: "grid",
  photo: "field",
  music: "waves",
  ukulele: "field",
  moment: "arcs",
};

/**
 * A horizontally swipeable film strip. It is a normal scroll container, so a
 * phone can swipe it and a keyboard can focus it. Vertical page swipes are
 * never swallowed.
 */
export function FilmStrip({ entries }: { entries: JournalEntry[] }) {
  return (
    <div>
      <div className="film-strip-wrap">
        <ul className="film-strip" tabIndex={0} aria-label="Film strip of journal frames">
          {entries.map((entry, index) => (
            <li key={entry.slug} className="film-frame">
              <div className="film-frame-media">
                <Media
                  image={entry.images?.[0]}
                  variant={variants[entry.kind]}
                  label="image pending"
                  className="h-full w-full"
                  sizes="(min-width: 768px) 20vw, 72vw"
                />
              </div>
              <p className="film-frame-caption">
                <span className="eyebrow text-ink-muted">
                  {String(index + 1).padStart(2, "0")} · {kindLabels[entry.kind]}
                </span>
                <span className="mt-1 block text-sm">{entry.title}</span>
                <span className="eyebrow mt-1 block text-ink-muted">
                  {formatDate(entry.date)}
                </span>
              </p>
            </li>
          ))}
          <li className="film-frame film-frame-empty" aria-hidden="true">
            <p className="eyebrow">
              [ more frames pending — insert Fig. 4-{entries.length + 1} ]
            </p>
          </li>
        </ul>
      </div>
      <p className="eyebrow mt-3 text-ink-muted">swipe or scroll the strip →</p>
    </div>
  );
}
