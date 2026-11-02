# Copy review — Stage 1A

Scope: copy only, following `REVISION BRIEF` §2–3. No layout redesign. Stage 1B
still owns homepage hierarchy, the Lately strip, and the no-repeat rule; Stage 1D
still owns `/colophon` and the footer relocations.

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

## Flagged for later stages

- Indonesian edition: no ID copy written. The removed footer line was English-only;
  the translation note still lives in the header print-editions popover.
- `/colophon` relocation of the revision table, field kit, diagnostics and language
  note is Stage 1D.
- Duplicate portrait and the remaining section merge are Stage 1B.
- Word-count target is expected to land after those relocations; Stage 1A does not
  delete features to hit a percentage.
