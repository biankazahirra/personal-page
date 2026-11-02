import { locales, t } from "@/content/i18n";

/**
 * The printed-edition list, shared by the header fold-out and the mobile
 * settings popover, so the wording and the stamps never drift.
 */
export function LangEditions() {
  return (
    <>
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
    </>
  );
}
