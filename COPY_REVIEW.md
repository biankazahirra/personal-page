# Copy review — Stage 1A

Scope: copy only in 1A, following `REVISION BRIEF` §2–3. No layout redesign there.
Stage 1B adds the homepage hierarchy, the Lately strip and the no-repeat rule;
Stage 1D still owns `/colophon` and the footer relocations.

## Word count

Measured in the running site with a desktop viewport, JavaScript on, Day shift:

```js
document.querySelector("main").innerText
  .replace(/\s+/g, " ").trim().split(" ").length;
```

| Measure | Before | After | Change |
|---|---:|---:|---:|
| Homepage `<main>` | 669 | 581 | −88 (−13.2%) |
| Whole page `<body>` | 799 | 716 | −83 (−10.4%) |

The brief targets −25–35% on the homepage. Stage 1A reaches −13.2% because the
remaining cuts are **relocations owned by later stages**: the revision table,
field kit, diagnostics and repeated language note move to `/colophon` in Stage 1D,
and the duplicate portrait / section merge lands in Stage 1B. Copy was not cut
into the developer-voice jokes or the visible placeholders.

Both numbers were measured on the production build. The start-up self-test is
excluded from both counts (it is a transient overlay, not page copy).

About 40 words were *added* as always-visible plain subtitles, so the gross copy
removed is larger than the net figure above.

## Changed copy

| Location | Before | After | Reason |
|---|---|---|---|
| `content/site.ts` — hero line | "I keep forms, spreadsheets and small systems in order for a living. The rest of the time I make things, take them apart, and write down what happened." | "Forms and spreadsheets by day. Films, songs on repeat, a ukulele still learning me." | Hero budget: 2 short sentences. Full bio stays on `/about`. |
| `content/site.ts` — homepage about preview | Two paragraphs: "I keep forms… what happened." + "Most of what lives here is unfinished on purpose: notes on AI agents, films I keep turning over, songs on repeat, a ukulele I am still slow at." | "I keep forms and records in order for a living. The ukulele keeps me humble after hours." | Section intro: one sentence, ≤ 18 words. Merges the day-job paragraph; the joke is about her own unfinished ukulele, not the visitor. |
| `app/page.tsx` — console intro | "A small terminal for people who like typing. It answers a few commands and then gets out of the way." | "A small terminal for people who like typing. Optional, and never the only way in." | One sentence + safety line; states the console is optional. |
| `app/page.tsx` — hero eyebrow | "Model BZ-2026 · unit 0042" | Removed | Model/serial/rev already shown in the data plate and header. |
| `app/page.tsx` — day-job section | "By day I keep paperwork moving at a property company: requisition forms, records, monthly numbers. The interesting part is the same as here — making a slow process a little shorter." + timeline/org line + three links | Removed; day job folded into the About preview above | §2.2: merge the day job into the About preview. The full work history stays on `/about`. |
| `app/contact/page.tsx` — H1 | "Service Request" | "Say hi." | §2.4 contact direction. |
| `app/contact/page.tsx` — lede | "No ticket queue, no account, no automated reply. If something here needs a reply, plain text is enough." | "Plain text is enough. No ticket queue, no account, no automated reply." | Leads with the kept line; shorter. |
| `app/contact/page.tsx` — metadata title | "Service Request" | "Contact" | Plain SEO name. |
| `components/site-footer.tsx` — heading | "Say hi, *whenever.*" | "Say hi." | §2.4 contact direction. |
| `components/site-footer.tsx` — lede | "No ticket queue, no form required. Plain text is enough." | "Plain text is enough." | Kept line, less scaffolding. |
| `components/site-footer.tsx` — language note | "Printed in English · Indonesian edition in translation." | Removed | Duplicate of the header print-editions popover; statement still exists there. |
| `app/not-found.tsx` — eyebrow | "404 — socket not found" | "ERROR 404 - socket not found" | §2.4 404 direction. |
| `app/not-found.tsx` — H1 | "This page went quiet." | "Page missing from manual." | §2.4 404 direction. |
| `app/not-found.tsx` — body | "Either it moved, or it never existed. Both happen. The rest of the site is still where you left it." | "Probably lost in a footnote. The rest of the site is still where you left it." | Playful voice, one joke. |
| `components/logbook-console.tsx` — unknown command | `ERROR 404: page missing from manual — "${command}"` | "unknown command. the manual does not cover this. yet." | §2.4 console direction. |
| `components/egg-layer.tsx` — toast | "field kit {n}/{total} · {eggs.length} hidden parts" | "field kit {n}/{total} · go you." | §2.4 toast direction; count still visible. |
| `app/layout.tsx` — default title | "Bianka Zahirra — service manual" | "Bianka Zahirra - notes, films, projects, life" | Plain SEO title. |
| `app/layout.tsx` — description | "A personal service manual: notes on AI agents and small systems, a film journal, songs on repeat, and an ukulele still being learned." | "Bianka Zahirra: notes on AI agents and small systems, films, songs on repeat, projects, and a ukulele still being learned." | Plain SEO description. |
| `app/layout.tsx` — OG/Twitter | Title "… — service manual", description = tagline | Plain title and plain description | Plain SEO names. |
| `components/contents-overlay.tsx` — subtitle | Creative blurb ("the entrance", "the person", …) | Plain meaning ("Explore all sections", "About me", …) | §3: plain subtitle always visible. |

## Stage 1B — homepage hierarchy

Stage 1B is structural, so it changes few strings. Order now follows §4:
hero → Lately → Assembly Board → console (optional) → About → Projects →
Curiosity → Life → Films → footer.

| Location | Before | After | Reason |
|---|---|---|---|
| `components/lately-strip.tsx` — heading | — (buried "recently" list at the bottom) | "lately" | §4 / §4.5: the most personal updates move up, as three compact rows (category · title · link). |
| `components/exploded-hero.tsx` — secondary link | — | "see my projects" | §4.2: Projects reachable from the hero in one interaction, without the console. |
| `content/site.ts` — hero line (chosen contrast line 1) | "Forms and spreadsheets by day. Films, songs on repeat, a ukulele still learning me." | "Forms and spreadsheets by day; films, songs on repeat and a half-learned ukulele by night." | §4.5.1, option 1 chosen by Bianka. Same facts, both sides in one sentence. |
| `components/exploded-hero.tsx` — hidden-parts teaser | — | "{count} hidden parts, location unknown." (count read from `EGG_TOTAL`) | §4.5.3, approved by Bianka. Sits near Assemble, not in the header; details stay on `/colophon`. |
| `app/page.tsx` — bottom "recently" block | "recently" + two journal rows with dates | Removed; the same two entries now appear in Lately | Duplicate of the strip above; §4.4 forbids repeating an item. |

Word count after 1B, same method and production build:

| Measure | After 1A | After 1B | Change |
|---|---:|---:|---:|
| Homepage `<main>` | 581 | 580 | −1 |
| Whole page `<body>` | 716 | 715 | −1 |

1B trades a hidden 18-word block for a visible 20-word strip; the copy target is
still met by the Stage 1D relocations, not by deleting features.

## Stage 1C — navigation

| Location | Before | After | Reason |
|---|---|---|---|
| `components/site-header.tsx` — mobile band | MOTION and SOUND printed in the band at every width | One "Settings" button (sliders icon) on phones; the two controls stay in the band on desktop | §4.1: mobile-only settings popover. The desktop header is unchanged. |
| `components/mobile-settings.tsx` — popover heading | — | "settings" | Groups motion, sound and print editions. The trigger's accessible name stays "Settings". |
| `components/mobile-settings.tsx` — switches | "motion: on" / "sound off" | "on" / "off" beside the label | §4.1 asks for on/off switches; wording of the editions list is unchanged. |
| `components/site-footer.tsx` — closing row | "Printed Rev 2026 — …" + "back to the index" | "Printed Rev 2026 — …" + "← back to the index · email" | §4.2 compact row. "colophon" joins the row in Stage 1D, when the page exists, so no link is broken now. |
| `app/layout.tsx` — bottom strip | Fixed seven-link strip, C01–C07, on every page | Removed | §4.2: one navigation system. The links live in Contents; the Assembly Board keeps the index-tab look. |
| `components/lang-switch.tsx` | Edition list inline | Same list, now `components/lang-editions.tsx` | One source for the wording, shared with the settings popover. |

## Plain subtitles added

Single source: `content/components.ts`; `content/manual.ts` reuses it, so each
meaning is defined once. Rendered in the contents overlay, header band, assembly
board preview, section labels, detail-page headers, and tab `aria-label`s.

| Creative name | Plain subtitle |
|---|---|
| Identification / index | Explore all sections |
| Specifications / about | About me |
| Maintenance Logbook / curiosity | Notes & experiments |
| Inspection Photos / life | Personal moments |
| Indicator Panel / films | Films I've watched |
| Illustrated Parts List / projects | My projects |
| Service Request / contact | Say hi / contact |
| Logbook console (C01.1) | Optional terminal |

## Kept verbatim

- "just a person figuring things out."
- "A person, not a profile."
- "Plain text is enough."
- "I led the team that built it."
- "May cause excessive curiosity. Do not remove the lid without snacks." (once)
- "do not laminate the revision table." (left for the `/colophon` move)
- "assembled slowly, revised occasionally."
- Developer-voice lines: "or scroll — the parts meet on the way down", "keyboard: tab through the rack", "Hover or focus a tab to trace it…", "Nothing here is required to read the manual.", "optional · lazy-loaded · sound off by default".
- All placeholders ("sample", "image pending", "screenshot pending", counters).

## Hero contrast line — proposals only

Not implemented. Each is one sentence, built only from facts already on the site.
It would replace the current hero line; the hero would stay 2–3 short sentences.

1. "Forms and spreadsheets by day; films, songs on repeat and a half-learned ukulele by night."
2. "By day I keep forms in order; by night I keep a ukulele out of tune."
3. "The day job is forms and small systems. The rest is films, songs and four slow chords."

## Hero hook — decided (§4.5)

1. **Contrast line** — option 1 chosen and applied (row in the table above).
2. **Hidden-parts teaser** — approved and applied: "{count} hidden parts, location
   unknown." next to the Assemble button. Details stay on `/colophon` (Stage 1D).
3. **Assemble reward** — already approved (§12.4): INSPECTED stamp, meter +1, Lately
   slides in. Builds in R2 with the signature feature.

## Flagged for later stages

- Indonesian edition: no ID copy written. The removed footer line was English-only;
  the translation note still lives in the header print-editions popover.
- `/colophon` relocation of the revision table, field kit, diagnostics and language
  note is Stage 1D.
- "Films & Life preview: compact" (§4 item 8) is left as the existing Life chapter
  and Films panel. Recomposing them is the R1/R2 responsive work, not a copy change.
- Word-count target is expected to land after the Stage 1D relocations; no stage
  deletes features to hit a percentage.
