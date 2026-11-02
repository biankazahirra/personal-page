import { LangEditions } from "@/components/lang-editions";
import { t } from "@/content/i18n";

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
        <LangEditions />
      </div>
    </details>
  );
}
