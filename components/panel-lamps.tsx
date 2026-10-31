import { formatDate } from "@/lib/format";
import type { FilmEntry } from "@/content/types";

/**
 * C05 as an indicator panel. Each film is a brass-bezel lamp; opening a lamp
 * lights the lens with CSS only, so it works without JavaScript. The note is
 * behind the lamp, not invented on top of it.
 */
export function PanelLamps({ films }: { films: FilmEntry[] }) {
  return (
    <ul className="lamp-grid">
      {films.map((film, index) => (
        <li key={`${film.title}-${film.watchedOn ?? ""}`}>
          <details className="lamp-panel">
            <summary className="lamp-summary">
              <span className="lamp-bezel" aria-hidden="true">
                <span className="lamp-lens" />
              </span>

              <span className="lamp-label">
                <span className="eyebrow text-ink-muted">
                  C05-{String(index + 1).padStart(2, "0")}
                  <span className="lamp-state">
                    <span className="lamp-state-off"> · dark</span>
                    <span className="lamp-state-on"> · lit</span>
                  </span>
                </span>
                <span className="display mt-1 block text-[clamp(1.35rem,2.6vw,1.9rem)]">
                  {film.title}
                  {film.year ? (
                    <span className="text-ink-muted"> ({film.year})</span>
                  ) : null}
                </span>
                {film.director ? (
                  <span className="eyebrow mt-1 block text-ink-muted">
                    {film.director}
                  </span>
                ) : null}
              </span>

              <span className="lamp-cue eyebrow" aria-hidden="true">
                <span className="lamp-cue-on">press</span>
                <span className="lamp-cue-off">close</span>
              </span>
            </summary>

            <div className="lamp-note">
              <p className="eyebrow text-accent">what stayed after the credits</p>

              <p className="mt-3 max-w-[58ch]">
                {film.note ?? film.stayed ?? (
                  <span className="text-ink-muted">
                    [ note pending — add a line only when it is real ]
                  </span>
                )}
              </p>

              <dl className="lamp-meta">
                <div>
                  <dt className="eyebrow text-ink-muted">watched</dt>
                  <dd>{film.watchedOn ? formatDate(film.watchedOn) : "—"}</dd>
                </div>
                <div>
                  <dt className="eyebrow text-ink-muted">rating</dt>
                  <dd>{film.rating ? `${film.rating}/5` : "—"}</dd>
                </div>
                <div>
                  <dt className="eyebrow text-ink-muted">entry</dt>
                  <dd>{film.placeholder ? "sample" : "logged"}</dd>
                </div>
              </dl>

              {film.letterboxdUrl ? (
                <a
                  href={film.letterboxdUrl}
                  rel="noreferrer noopener"
                  target="_blank"
                  className="eyebrow mt-5 inline-flex items-center gap-2 border-b border-accent pb-1 hover:text-accent"
                >
                  open on Letterboxd <span aria-hidden="true">↗</span>
                </a>
              ) : null}
            </div>
          </details>
        </li>
      ))}
    </ul>
  );
}
