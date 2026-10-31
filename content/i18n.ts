/**
 * Print editions. The manual is written in English first; the Indonesian
 * edition has no copy until Bianka supplies it, so the dictionary below is
 * deliberately empty instead of machine-translated.
 */
export const locales = [
  {
    code: "en",
    label: "English",
    edition: "first printing",
    ready: true,
  },
  {
    code: "id",
    label: "Bahasa Indonesia",
    edition: "in translation",
    ready: false,
  },
] as const;

export type Locale = (typeof locales)[number]["code"];

export const defaultLocale: Locale = "en";

export const ui = {
  en: {
    "lang.label": "lang en · id todo",
    "lang.title": "print editions",
    "lang.ready": "printed",
    "lang.pending": "not printed yet",
    "lang.note":
      "The Indonesian edition is still in translation. Nothing is machine-translated here; the copy goes in when Bianka writes it.",
    "lang.close": "close",
  },
  id: {},
} as const satisfies Record<Locale, Record<string, string>>;

export type UiKey = keyof (typeof ui)["en"];

export function t(key: UiKey): string {
  return ui.en[key];
}

export function localeByCode(code: string) {
  return locales.find((locale) => locale.code === code) ?? locales[0];
}
