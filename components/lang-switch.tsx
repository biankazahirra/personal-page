import { locales, t } from "@/content/i18n";

/**
 * The language badge, printed as a fold-out card. It opens with native
 * `<details>`, so it still works without JavaScript and never pretends the
 * Indonesian edition exists before its copy does.
 */
export function LangSwitch() {
  return (
    <details className="lang-switch relative">
      <summary className="eyebrow cursor-pointer list-none border-b border-transparent hover:border-band-ink/60">
        {t("lang.label")}
      </summary>

      <div className="lang-panel absolute right-0 top-[calc(100%+0.55rem)] z-[60] w-[17rem] border-2 border-ink bg-paper p-3 text-ink shadow-[5px_5px_0_rgba(43,38,32,0.28)]">
        <p className="label text-[10px] text-ink-muted">{t("lang.title")}</p>
        <ul className="mt-2 space-y-2">
          {locales.map((locale) => (
            <li
              key={locale.code}
              className="flex items-baseline justify-between gap-3 border-t border-ink/20 pt-2 first:border-t-0 first:pt-0"
            >
              <span>
                <span className="block text-sm">{locale.label}</span>
                <span className="block font-mono text-[11px] text-ink-muted">
                  {locale.code} · {locale.edition}
                </span>
              </span>
              <span
                className="stamp shrink-0 text-[9px]"
                data-tone={locale.ready ? "mustard" : "ink"}
              >
                {locale.ready ? t("lang.ready") : t("lang.pending")}
              </span>
            </li>
          ))}
        </ul>
        <p className="mt-3 border-t border-ink/20 pt-2 text-[12px] leading-snug text-ink-muted">
          {t("lang.note")}
        </p>
      </div>
    </details>
  );
}
