# REVISION BRIEF — biankazahirra.vercel.app

**Keep the personality. Reduce the complexity.**

> Brief for an AI coding agent (Claude Code, Cursor, etc.). Put it in the repo root, ask the agent to read it first, then work **phase by phase** and stop after each phase for review.
> Sources: *Website Revision Plan* (PDF), the independent reviews by Mark (including the responsive-experience notes), the Rishit portfolio as a UX reference (§12), and extra ideas marked **[ADDED]**.
> **This file is the single source of truth.** If any other document disagrees with it, this file wins.

---

## 0. Mission

Refine the existing personal website so it is **easier to understand, less text-heavy, and more intuitive to navigate**, while keeping its identity: the **vintage industrial service manual / assembly** concept.

This is a **refinement task, not a redesign.**

The core problem: the concept currently takes up more words than Bianka does. Most on-screen text explains the machine (how to use it, status, labels, warnings) while very little says who she is. Fix the balance:

> **The concept lives in the visuals and interactions. The words are for Bianka.**

### Product context (what Bianka wants)

Bianka wants a website that is **not boring** and **not hard to run or understand**. Both halves matter.

- **Not boring:** keep the signature moments (exploded-view hero, Assemble, stamps, index tabs, page-turn transitions, console, hidden parts). Simplifying means removing *noise*, never *delight*. If a change would make a page feel flatter, say so and propose an alternative.
- **Easy to understand:** a visitor gets the homepage in **5–10 seconds**, finds **Projects and Contact** without the Console, and never needs to understand the machine metaphor to navigate.
- **Easy to run (for the visitor):** the machine must be easy to *operate*. Press something and see what happens; no confusion about what a control does; no dead ends. New machine-related interactions, services or build tools are welcome as long as a visitor is never confused (see §8).

**Three non-negotiable outcomes:**

1. Bianka stands out more than the machine metaphor.
2. The homepage is understood in 5–10 seconds, and Projects and Contact are easy to find.
3. Animation and interactive features enrich the experience; they never block access.

> **A website that is clear in 5 seconds, and still interesting after 5 minutes.**

### Do NOT change (identity lock)

- Visual identity: paper/ink/oxide-red/mustard palette, Day/Night shift themes, Stardos Stencil / Archivo Narrow / Courier Prime, stamps, index tabs, data plate, exploded-view hero.
- The tagline **"just a person figuring things out."**
- Existing routes/URLs, portrait photo, project facts, the six sockets C01–C06, hidden parts, the DAY/NIGHT toggle, the motion toggle, the console feature, the revision history.
- Plain-text email contact (never hide it behind interaction).
- The statement that nothing is machine-translated. **Do not write Indonesian copy.** Leave the ID edition as-is, and flag anything that would need an ID string.

### Owner decisions (FINAL, override anything below)

1. **Developer-voice lines are intentional humor** (e.g. "optional · lazy-loaded · sound off by default", "keyboard: tab through the rack", "Hover or focus a tab to trace it...", "or scroll — the parts meet on the way down", "Nothing here is required to read the manual."). Leave them untouched. Only Bianka decides when one goes.
2. **The desktop header stays exactly as it is.**
3. **Placeholders stay visible** ("sample", "image pending", "screenshot pending", counters). They only mean the assets are not added yet; Bianka adds them after the site is finished.

### Approved proposals (Bianka said yes; visual examples are on the design canvas)

- Mobile-only settings popover (§4.1)
- One navigation system, i.e. a compact footer row instead of the 7-link list (§4.2)
- Colophon page and relocations (§4.3)

Follow the approved examples closely. Do not extend them beyond what §4.1–4.3 describe.

---

## 1. Hard rules

- [ ] Inspect the project and identify relevant files **before** editing.
- [ ] Propose a concise change list, then implement in small, logical steps (one commit per step).
- [ ] Preserve existing functionality, assets, responsive behavior and architecture where possible.
- [ ] **Do not fabricate** personal information, project details, films, quotes, dates, or content. Humor must be built only from facts already on the site (forms, spreadsheets, small systems, AI-agent notes, films, songs on repeat, ukulele being learned slowly, open tabs, snacks).
- [ ] **Do not delete features.** If something should leave the homepage, **relocate** it (e.g., to `/colophon`) or put it behind a flag. Nothing disappears from the site.
- [ ] Do not modify unrelated files. Avoid refactors that are not needed for this brief.
- [ ] **Stop after each stage in §9**, report changed files and validation results, and wait for Bianka's review before continuing.
- [ ] Run lint, type-check, tests and build; verify desktop and mobile (360px) layouts, in both Day and Night shift.
- [ ] Report: changed files, completed tasks, remaining issues.

---

## 2. Copy & voice

### 2.1 Cut the text (target: **−25–35% visible text on the homepage**, per the revision plan)

Measure the homepage's visible word count **before** and **after**, and report both numbers. The reduction should come from repetition and descriptive text; developer-voice jokes are exempt. **Clarity beats the percentage:** never cut important information just to hit the number.

**Word budgets:**

| Element | Max |
|---|---|
| Hero (intro) | 2–3 short sentences |
| Section intro | **1 sentence**, ≤ 18 words |
| Card / list-item description | ≤ 20 words |
| Helper / instruction text | avoid; if unavoidable, ≤ 6 words |

Move long explanations to each section's own detail page.

### 2.2 Kill the repetition

Currently repeated and must each appear **once** (define once in the content layer, e.g. `content/site.ts`, and reuse):

- "I keep forms, spreadsheets and small systems in order for a living..." (appears in the hero, About, and "the day job"). Keep the full version only in About; the hero gets a shorter line.
- The same portrait appears twice on the homepage. Use it once (larger, in the hero is preferred).
- "Model BZ-2026", serial and revision appear in header, hero eyebrow and spec list. Show them once as a small line or data plate.
- "Indonesian edition in translation" appears three times. Show it once (settings popover or colophon).
- The "day job" section is merged into the About preview (one short paragraph).

### 2.3 Developer-voice lines are intentional **[OWNER DECISION]**

Lines that sound like developer notes are part of the humor and the identity. **Do not remove, rewrite or "clean up" them.** Bianka decides if and when any is retired.

### 2.4 Playful voice (required)

Write in a **playful, warm, dry-funny** voice, still in service-manual dialect. It should sound like Bianka talking, not like a CV and not like a brand.

**Rules:**

1. **Plain meaning first, joke second.** A visitor must understand the label even if they miss the joke.
2. **Max one joke per screen.** A joke repeated in nine places becomes decoration.
3. **Lowercase-leaning, short sentences, no buzzwords.** Never "passionate", "leverage", "synergy", "dynamic".
4. **Joke about the manual, the machine, or Bianka's own unfinished things.** Never about the visitor, never at anyone's expense.
5. **No invented facts.** The joke can exaggerate a *tone*, not a *fact*.
6. Keep existing good lines (see "Keep" below) as they are.

**Voice examples (adapt, don't copy blindly; every changed line goes in `COPY_REVIEW.md`, see §8):**

| Where | Before | After (direction) |
|---|---|---|
| Contact heading | "7.0 · Service Request / Say hi, whenever. No ticket queue, no form required." | "Say hi." + email. One short line: "plain text is enough." |
| Footer closing | long colophon text | "Printed Rev 2026. Assembled slowly, revised occasionally." (keep) |
| 404 | generic | "ERROR 404: page missing from manual. probably lost in a footnote." |
| Console unknown command | generic error | "unknown command. the manual does not cover this. yet." |
| Toast on found part | — | "part found: BZ-99-04. go you." |

**Keep (already great, do not rewrite):**
"just a person figuring things out." · "A person, not a profile." · "Plain text is enough." · "I led the team that built it." · "May cause excessive curiosity. Do not remove the lid without snacks." (**use it in one place only**) · "do not laminate the revision table." (move to colophon) · "assembled slowly, revised occasionally."

---

## 3. Terminology: keep the creative names, add a plain meaning

Visitors must be able to navigate **without understanding the machine metaphor.** Every creative label gets a short, always-visible plain subtitle. Use it in section headers, the Contents overlay, the Assembly Board previews and tab `aria-label`s. Also use plain names for `<title>`, meta description and OG text (SEO).

| Creative name | Plain subtitle |
|---|---|
| Assembly Board | Explore all sections |
| Maintenance Logbook | Notes & experiments |
| Indicator Panel | Films I've watched |
| Illustrated Parts List | My projects |
| Inspection Photos | Personal moments |
| Revision History | Website updates |
| Specifications | About me **[ADDED]** |
| Service Request | Say hi / contact **[ADDED]** |

- [ ] Do **not** add new technical terms without a real need.
- [ ] Sockets C01–C06 keep their code, but the plain word leads (e.g., "C06 · projects").

---

## 4. Homepage hierarchy

The homepage is a **doorway**, not a place to show everything. Target order:

1. **Header (desktop unchanged; mobile only, see 4.1)**
2. **Hero:** name, tagline, 1–2 short sentences, portrait, `Assemble unit` button + a secondary link "see my projects" (makes Projects easy to find).
3. **Lately strip [ADDED]:** 3 small items pulled from data: latest film, latest song/life update, latest note. (Today's "recently" entries such as "Clayface, on a Tuesday" and "I'm With You, on repeat" are the most personal content and are buried at the bottom.) **Maximum 3 items; each shows only category, title and link** (no paragraphs, never a full section). Hide any slot that has no data, and never invent an update Bianka did not provide. Render it as **compact single rows** (category · title · link), not cards. It sits right after the hero, but its position must be one config/order value so it can move below the Assembly Board if the first-time visitor test (§11) says so.
4. **Assembly Board:** main navigation to the six sections. Keep its current copy and behavior; only add the plain subtitle.
5. **About preview:** short, includes the day job in one paragraph; link "read more".
6. **Projects preview:** the 3 existing projects (title, one line, stack).
7. **Curiosity preview:** a few latest notes.
8. **Films & Life preview:** compact.
9. **Footer:** email, the four social links, and the compact row `← back to the index · email · colophon` (see 4.2).

Give it a clear hierarchy, proportional visual weight, and generous whitespace. Where whitespace conflicts with the manual's "dense paper" feel, **whitespace wins on the homepage**; dense layouts belong on detail pages.

### 4.1 Mobile-only settings popover **[APPROVED]**

**The desktop header stays exactly as it is.** Only on mobile widths (≤ 767px), group **motion, sound and print editions** into one **Settings** icon button that opens a small popover. Use a recognizable settings/sliders icon with the accessible label **"Settings"** (the design mockup shows `⋯`; use the sliders icon instead).

- Stay visible in the mobile header: **BZ-2026, assembly meter, DAY/NIGHT SHIFT, CONTENTS**, plus the Settings button.
- Popover contents, with the existing wording unchanged: **MOTION** (on/off switch), **SOUND** (on/off switch), **PRINT EDITIONS** (English · en — printed; Bahasa Indonesia · id — not printed yet; "The Indonesian edition is still in translation.").
- Style: cream card, 2px ink border, hard offset shadow, the page behind it dimmed.
- Accessibility: keyboard operable, `Esc` closes, focus returns to the Settings button, tap targets ≥ 44px, `aria-expanded` on the button, focus is trapped while open.
- Motion toggle state and sound state keep working exactly as today.

### 4.2 One navigation system **[APPROVED]**

Only **one thing changes**: the footer's list of seven section links (C01–C07) is removed because it duplicates Contents and the Assembly Board.

- Replace it with a **single compact footer row**: `← back to the index · email · colophon`.
- The email and the four social links (GitHub, Letterboxd, Spotify, Instagram) stay in the footer and stay plain text.
- **Unchanged:** the header, the **Contents** overlay (global menu), the **Assembly Board** (homepage hub), and contextual links inside sections ("read the whole section", "all 4 notes", "all projects").
- Make sure no section loses its only entry point. Contact (C07) must remain reachable from Contents and from the footer email.

### 4.3 Colophon page **[APPROVED]**

Create `/colophon` ("About this website") as end matter, reached through the small `colophon` link in the footer. It is **not** added to the Contents list of seven sections. **Relocate** (do not delete) these items there, with their existing wording:

- **Revision history** table: Rev A (2025-05, first assembly), Rev B (2026-10, contents expanded), Rev C (2026-10, manual reprint, marked CURRENT). Add a faded, dashed **Rev D** row: date "next print", note "fewer words". Bianka replaces it with the real date when this ships. The margin note "do not laminate the revision table." sits beside the table.
- **Print editions** (languages), including "Nothing is machine-translated here; the copy goes in when Bianka writes it."
- **Field kit · hidden parts 0/7** (seven dashed slots) with "Seven parts are not in the index. Nothing here is required to read the manual." The hidden-parts counter keeps working and counting.
- **Diagnostics** on a riveted data plate: model, sockets, entries, last revision (live from the data, not hard-coded).
- **Credits** slot, left as the placeholder `[ typefaces, tools — fill in ]` for Bianka.
- Page footer: "← back to the index", "hidden part no. BZ-99-00 · the manual itself · inspection copy" and an INSPECTION COPY stamp, plus "Printed Rev 2026 — assembled slowly, revised occasionally."

Page chrome follows the other pages (red header band, DAY/NIGHT, CONTENTS, "End matter · Page 9-1"). It must work in Day and Night shift, on a 360px phone, and with JS disabled.

The homepage must no longer show the revision table, the field kit, the diagnostics panel or the repeated language notes. (The Assembly Board keeps its own copy and preview as decided.)

### 4.4 Keep Lately, Curiosity and Films & Life distinct **[ADDED]**

These three previews must not repeat each other:

- **Lately:** at most 3 latest updates, each showing only category, title and link.
- **Curiosity:** notes and experiments only. Never repeat anything already shown in Lately.
- **Films & Life:** additional content, never the same film or update already shown in Lately or Curiosity.

Enforce it **in code**, not by intention: an item shown in Lately is automatically excluded (by id) from the previews below it. If a preview ends up thin, keep it thin. Do not pad it with repeats or invented content. Placeholders stay visible as decided in §6.

### 4.5 Hero hook proposals **[PROPOSAL: needs Bianka's approval before building]**

Goal: make the first 10 seconds more intriguing without adding noise. Present each as a short description or mockup in the stage report (Stage 1A for the copy, Stage 1B for the rest) and **wait for approval**. Each must pass the feature-creep test in §8.

1. **Contrast line in the hero.** One sentence that shows both sides of Bianka, built only from facts already on the site: day job (forms, spreadsheets, small systems) vs. the rest (films, songs on repeat, a ukulele still being learned slowly). It **replaces** text; the hero stays 2–3 short sentences. Offer 2–3 draft options in `COPY_REVIEW.md` for Bianka to choose from.
2. **A small reward for pressing Assemble.** **APPROVED**: it is part of the signature feature, specified in §12.4 (INSPECTED stamp, meter +1, Lately slides in).
3. **A hidden-parts teaser.** One tiny hint such as "7 hidden parts, location unknown", placed **in the hero near the Assemble button, not in the header** (the desktop header stays unchanged). Details stay on the colophon page.

---

## 5. Interaction & navigation

- [ ] **Assembly Board** stays the main navigation.
- [ ] **Assemble unit** must have one clear purpose: it plays the assembly animation on the exploded view, raises the assembly meter, then gently scrolls to the Assembly Board. Keep the existing helper line; if the purpose is still unclear after that, propose a label first.
- [ ] **Console** stays as an optional extra exactly as it is (section C01.1 and its copy included). Just make sure it is never the only way to reach anything. Shrinking it to an icon happens only if Bianka asks. Keep all commands (`help`, `whoami`, `projects`, `films`, `fault-log`, `sudo hire-me`).
- [ ] Every control keyboard-operable with a **visible focus state** (thick ink-red outline).
- [ ] Visitors never lose context when changing pages: persistent header, the current socket tab stays highlighted/raised, a clear way back, scroll restoration.
- [ ] **Projects and Contact easy to find without the Console:** visible hero link to Projects, Assembly Board, Contents, and the plain-text email in the footer. The Console is never a required path.
- [ ] Respect `prefers-reduced-motion` **and** the existing motion toggle (see §7).
- [ ] Mobile: re-check tab strip (scroll-snap), 44px targets, tap/press-and-hold in place of hover, nothing trapping vertical scroll.

---

## 6. Unfinished content: leave it as is **[OWNER DECISION]**

Placeholders ("sample", "image pending", "screenshot pending", counters) are there only because the assets are not added yet. **Do not hide, remove or restyle them.** Bianka adds the assets after the site is finished.

- [ ] Keep the content structure ready so assets and real notes can be dropped in easily (images by path, notes as MDX/JSON).
- [ ] Do **not** invent replacement content.
- [ ] At the end, produce a **content checklist** listing every slot still waiting for an asset (photos, screenshots, notes, film comments, links).

---

## 7. Motion: page-turn feel, never a wait **[REQUESTED, MIDDLE-GROUND POLICY]**

Bianka wants section changes to feel like **turning a page of a manual** (a 1.0–1.5s visual effect). Mark's review warns that visitors must never wait to reach content. The policy below satisfies both:

> **The page-turn is decoration; the content is ready fast.**
> The visual effect runs 1.0–1.5s (default 1.2s). The new page's heading and main content are readable and focusable within **500ms**, while the rest of the effect finishes behind or around them.

### 7.1 Tokens (single source of truth)

```css
:root {
  --t-hover: 180ms;           /* hover / focus: 150–200ms */
  --t-toggle: 200ms;          /* switches, buttons: 150–250ms */
  --t-tab: 380ms;             /* index-tab raise/slide: 300–450ms */
  --t-hero: 600ms;            /* hero entrance on first load: 500–700ms */
  --t-content-ready: 500ms;   /* new page's primary content readable and focusable */
  --t-page-turn: 1200ms;      /* decorative page-turn effect: 1000–1500ms */
  --ease-page: cubic-bezier(0.65, 0, 0.35, 1);
}
```

Changing one value must retime every matching animation.

### 7.2 Choreography for a section/page change

| Time | What happens |
|---|---|
| 0–150ms | Old content starts to fade; the destination index tab starts to rise (tab motion uses `--t-tab`). |
| 150–500ms | The new page is already mounted. Its heading, intro and main content fade in and are **readable and focusable by 500ms**. Focus moves to the new `<h1>`. |
| 500–1200ms | The decorative part finishes: the paper edge sweeps across, secondary elements (cards, captions, textures) reveal in a 60–80ms stagger, and the page's stamp "thuds" in (~120ms) near ~1000ms. |

Homepage scroll reveals use the same idea: a fade + 16px rise that finishes within the 1.0–1.5s range for decoration, with text readable earlier.

### 7.3 Guardrails

- **Never block access:** primary text, navigation and controls are in the DOM, in the tab order, and clickable from the moment the new page mounts, even mid-animation (no `pointer-events: none`, no hidden-until-done content).
- **Interruptible:** if the visitor clicks again mid-transition, cancel and go straight to the new destination. Never queue transitions.
- **Announce page changes** to screen readers (`aria-live="polite"`).
- **First load is not a transition:** do not delay initial render. The hero entrance uses `--t-hero`. LCP and CLS must not regress.
- **Reduced motion / motion toggle off:** all of the above collapse to an instant state or a ≤150ms opacity crossfade with the same final layout.
- Implement with the lightest option that fits the existing Next.js router (View Transitions API, Framer Motion `AnimatePresence`, or GSAP). Report which one was chosen and why. A new animation library is fine if it serves the effect; keep it off the critical path (lazy-loaded).
- **Measure it:** from click to the new heading visible and focusable must be ≤ 500ms (record a performance trace on a mid-range mobile profile).

---

## 8. Technical quality & maintainability

### Easy to operate: the visitor's view of "running" the machine **[ADDED]**

"Easy to run" means a visitor is never confused while *operating* the machine (Assemble, probing sockets, the console, settings, hidden parts).

- [ ] **Obvious first action:** within 10 seconds a visitor knows what to press (Assemble unit or a socket).
- [ ] **Clear affordances:** every interactive element looks pressable and carries a label or hint. The existing playful hints and developer-voice lines count as hints; do not remove them.
- [ ] **Feedback within ~200ms:** every press visibly does something (state change, stamp, toast, tab raise).
- [ ] **No dead ends:** every interaction has a way out: Skip on the start-up sequence, `Esc` closes the console and popover, a visible back link on every page.
- [ ] **Same gesture, same meaning:** hover has a tap equivalent on mobile; the same control behaves the same everywhere.
- [ ] **Reading never depends on discovering the machine:** a plain click or tap always works.
- [ ] **New features, services or build tools are allowed only if they** (a) solve a clear usability problem or (b) genuinely enrich the experience. "It fits the machine metaphor" alone is **not** enough. **Propose first**: describe it in the stage report and wait for Bianka's approval before building. Prefer lightweight options and keep them off the critical path. This is the guard against feature creep.
- [ ] Keep a **short README** for developers (how to run, where the content lives, how to add a note/film/project, how to deploy). It is a convenience, not a gate.
- [ ] Prefer small, readable components and clear names. Comment only what is not obvious.

### Maintainability

- [ ] Keep one consistent content source. If config grows too large, split per section, for example:
  `content/` → `site.ts`, `about.ts`, `notes.ts`, `films.ts`, `projects.ts`, `life.ts`, `music.ts`
- [ ] Repeated facts (bio line, model/serial/rev, translation note) are defined **once** and imported.
- [ ] Lazy loading must not delay primary content. Console, exploded view and tuner may lazy-load; hero text and navigation must not.
- [ ] Keep the no-JavaScript fallback: all essential text present in server-rendered HTML.
- [ ] **Performance targets, real experience first:** main content appears quickly; LCP ≤ 2.5s, CLS < 0.1, INP < 200ms; no excess JavaScript; tested on a mid-range phone profile. Lighthouse mobile ≥ 90 is a guide, **not the only goal**: never sacrifice interaction or visual character to chase it, and **do not alter CSS just to chase a score.** Audit after the content and animation changes.
- [ ] No console errors, no broken links.

### Deliverable: `COPY_REVIEW.md` **[ADDED]**

Because the agent rewrites copy in Bianka's voice, produce a file listing **every** changed or removed string as a table:

| Location | Before | After | Reason |
|---|---|---|---|

Bianka approves or edits it. Anything she rejects goes back to the original text.

---

## 9. Work stages with review gates

The agent must **stop after every stage**, report changed files and validation results (lint, type-check, tests, build), and **wait for Bianka's review** before continuing.

| Stage | Work | Review gate |
|---|---|---|
| **1A** | Copywriting, removal of repetition, plain subtitles, playful voice, word-count before/after, `COPY_REVIEW.md`, hero contrast-line options (§4.5). | Bianka approves the copy. |
| **1B** | Homepage hierarchy (§4), the Lately strip, the no-repeat rule (§4.4), hero hook proposals (§4.5). Then run the **first-time visitor test** (§11) and use it to decide where Lately sits. | Bianka approves the homepage. |
| **1C** | Mobile Settings popover (§4.1) and compact footer row (§4.2). | Bianka approves navigation. |
| **1D** | `/colophon` page and relocation of content (§4.3). | Bianka approves the page. |
| **R1** | Responsive audit of the homepage and every section, **desktop and mobile separately** (§12.3, §12.5), plus a short implementation plan for the signature feature, Assemble (§12.4). | Bianka approves the audit and plan. |
| **R2** | Mobile compositions and the Assemble signature feature, built in the stages of §12.4. | Test on real devices. |
| **2** | UX pass: keyboard and focus, mobile tab strip and scroll-snap (vertical scroll never trapped), context retention, animation per §7. | Test on desktop and mobile. |
| **3** | Content completion: Bianka supplies photos, screenshots, notes, films, links; the agent only places them and produces the content checklist. | Bianka supplies assets. |
| **4** | Core Web Vitals and Lighthouse (as a guide), accessibility, responsive (360px / tablet / desktop, Day + Night), broken links, console errors, JS-off check, production build, deployment preview, and the **final first-time visitor test** (§11). | Final verification. |

At the end of each stage: summarize what changed, list files touched, list anything blocked or missing.

---

## 10. Acceptance criteria

- [ ] The site is still unmistakably **the same vintage service-manual identity.** No visual redesign.
- [ ] Homepage visible text reduced by **25–35%** (mostly repetition and descriptive text), with before/after numbers. Developer-voice jokes do not count against it.
- [ ] No sentence about Bianka appears more than once on the homepage; no duplicated portrait.
- [ ] Every creative label has a visible plain-language subtitle.
- [ ] Desktop header unchanged. The mobile popover matches the approved example.
- [ ] The footer shows one compact row instead of the 7-link list; `/colophon` exists and holds the relocated items.
- [ ] Placeholders and developer-voice lines left as they are.
- [ ] Page-turn effect runs **1.0–1.5s** as decoration, while the new page's primary content is readable and focusable within **500ms**. Transitions are interruptible, never delay first load, and collapse under reduced motion / motion toggle.
- [ ] Voice is playful, has no more than one joke per screen, and contains no invented facts. All copy changes are in `COPY_REVIEW.md`.
- [ ] Console is optional; every page and the email address are reachable in ≤ 2 interactions without it.
- [ ] Works with JS disabled (content visible), on a 360px phone, in Day and Night shift.
- [ ] No console errors. Core Web Vitals healthy (LCP ≤ 2.5s, CLS < 0.1, INP < 200ms) on a mid-range phone profile; Lighthouse mobile ≈ 90 or better as a guide.
- [ ] Lately, Curiosity and Films & Life never repeat the same item (§4.4).
- [ ] The first-time visitor test (§11) passes, or its failures are reported with proposed fixes.
- [ ] **One identity, two experiences:** desktop and mobile have deliberately different compositions (§12.3); mobile is not scaled-down desktop.
- [ ] The **signature feature is Assemble (candidate A)** and matches the approved mockups: easy to find, works on mobile, never blocks content (§12.4).
- [ ] Vertical swipes always scroll the page on touch devices, including over interactive diagrams.
- [ ] **Not boring:** the signature moments (exploded-view hero, Assemble, stamps, index tabs, page-turn, console, hidden parts) are all still present and working.
- [ ] **Easy to understand:** a first-time visitor gets the homepage in 5–10 seconds and can find Projects and Contact without the Console.
- [ ] **Easy to run:** a first-time visitor can operate the machine (Assemble, probe a socket, open and close the console, open settings) with only the on-page hints, and always has a way out (Skip, Esc, back).

---

**Keep the personality. Reduce the complexity.**

---

## 11. First-time visitor test **[ADDED]**

Before declaring any revision finished, ask someone who does **not** know the website to try the homepage **without any explanation**. Run it **twice**: after Stage 1B (it informs the Lately position and the hero hooks) and again in Stage 4. Test on a real phone and on desktop.

| # | Check | Pass when |
|---|---|---|
| 1 | In 5 seconds, do they understand whose website this is? | They say Bianka (or "a person called Bianka") unprompted. |
| 2 | In 10 seconds, do they understand what they can find here? | They name at least two of: notes, films, projects, music/life. |
| 3 | Can they find **Projects** in at most 2 interactions? | Yes, without the Console. |
| 4 | Can they find **Contact** in at most 2 interactions? | Yes, without the Console. |
| 5 | Is the **Motion** setting easy to find and understand? | They find it and know what it does. On mobile it lives in the Settings popover, so check that the icon and the label "Settings" are recognized. |

Agent's job: prepare the test script and a one-page result form, and report the results honestly (what the tester said, what they hesitated on). **Bianka** finds the tester and runs it.

If check 5 fails on mobile, **propose** (do not build) a Motion toggle directly in the mobile header, and wait for approval.

---

## 12. Responsive Experience & Signature Feature **[ADDED]**

### 12.1 Principle

**One identity, two deliberately designed experiences.**

- **Desktop** can be more exploratory and rich in interaction.
- **Mobile** is more focused, roomy, easy to touch and comfortable to scroll.

The Rishit portfolio (https://portfolio.rishit.site/) is a **UX and responsive-design reference only, not a visual one.** Do **not** copy its OS look, palette, 3D, physics or voice robot. Bianka's vintage industrial service-manual identity remains the foundation, and the identity lock in §0 still applies. This chapter is a starting direction, not a final design: pixel-level decisions need real desktop and phone checks and Bianka's approval.

### 12.2 What Rishit's site actually does, and how it applies here

| Lesson | What Rishit does | How to apply it here |
|---|---|---|
| Each section has character, inside one system | Every "world" has its own palette, fonts and signature motion, inside one shared frame and navigation. | Each socket (C02–C06) may have its own **signature interaction**, but all stay in the manual's visual language (paper, ink, oxide red, mustard, stamps, tabs). Do **not** give sections new palettes. |
| Phones get their own design | Swipe rows, a tap-through story with stills instead of a scrubbed video, press-and-hold, and 3D canvases that let vertical swipes pass through to the page. | See §12.3. |
| Native scrolling on phones | No smooth-scroll library on phones. | Use native scrolling on mobile. No scroll-jacking. No smooth-scroll library on mobile. |
| Heavy things wait | Sections load as lazy chunks about a screen early, with measured placeholder heights; heavy parts mount after first paint or first interaction; canvases render only while visible; one shared animation clock. | Lazy-load the console, tuner and exploded-view extras; **reserve space** for them; pause off-screen animation; drive animation from one place. |
| Content is the foundation | Plain HTML underneath; the experience mounts on top. | Keep the JS-off fallback (§8). |
| Measure early | A layout-shift score of 0.335 was cut to 0.065 by reserving space for lazy sections and self-hosting fonts. | Check CLS and LCP from Stage 1B onward, not only at the end. |
| Interaction supports content | Animations enrich, but reading never depends on them. | Same rule as §7 and §8. |

**Not to adopt:** the OS metaphor, 3D, physics, voice assistant, or Rishit's rule that no placeholder may stay. Bianka's decision in §6 (placeholders stay until she adds assets) wins.

### 12.3 Desktop and mobile compositions

| Element | Desktop (explore) | Mobile (focus) |
|---|---|---|
| Hero / exploded view | Scroll-scrubbed assembly plus the Assemble button; hover/focus legend. | Stacked: name, tagline, one sentence, portrait/diagram, Assemble. Assembly happens in a few **tap steps or press-and-hold**, not tied to scroll position. |
| Assembly Board | Rack with probe-on-hover previews. | Swipeable tab strip with **native scroll-snap**; tap to open; preview by tap/long-press or skipped. |
| Lately | Compact rows after the hero. | Compact full-width rows. |
| Projects (C06) | Parts-list table; Disassemble expands in place. | Stacked cards; Disassemble is a **tap-through of 3 steps** (problem → build → what I'd change), one visible at a time. |
| Life (C04) | Film strip with drag or scroll. | Native horizontal scroll-snap row. |
| Films (C05) | Lamp panel, hover and click. | Lamp grid, tap to light. |
| Console | Drawer, keyboard-first. | Bottom sheet; still optional. |
| Easter eggs | Hover, keys (e.g. Konami). | Every egg needs a touch route (tap / long-press), or is marked desktop-only in the report. |

**Rules:**

- [ ] **Recompose, don't just scale.** Reorder and resize elements for small screens; do not only shrink fonts and margins.
- [ ] **Visual hierarchy:** separate primary info, navigation, controls and extra detail so they do not compete.
- [ ] **Vertical spacing:** add room *between* content groups, not a uniformly larger gap everywhere.
- [ ] **Touch-first:** targets ≥ 44px; index tabs easy to swipe and tap without disturbing vertical scroll.
- [ ] **Never trap scrolling:** interactive SVG/canvas areas use `touch-action: pan-y` (or equivalent) so vertical swipes always scroll the page; horizontal strips use native scroll-snap.
- [ ] **Progressive disclosure:** main information first; details, easter eggs and extras are found when the visitor chooses to explore.
- [ ] **Evaluate density separately** for desktop and for mobile.
- [ ] Check at **360, 390, 768, 1024 and 1440px**, in Day and Night shift.

### 12.4 Signature feature: **Assemble / exploded view (candidate A), DECIDED**

Bianka chose candidate A. It evolves what already exists (the exploded-view hero and the Assemble button) instead of adding a new feature. Visual examples (schematic) are on the design canvas, boards 9 and 10: https://claude.ai/artifact/QQNhT7y7ZVg5vnyQvbCCV6. The boxes in the mockups stand in for the site's real ink line-art parts with red numbered balloons; **use the existing artwork, not the boxes.**

The other candidates are **not** built as signature features: the assembly meter (B), page-turn + stamp transition (C, already specified in §7) and the console (E) remain ordinary features, and the ukulele tuner (D) is **not approved**. It would need to be proposed again under the feature-creep gate in §8.

#### Why it is the signature

Easy to find (it is the hero button), immediately tryable, satisfying feedback, already part of the identity, light (SVG, no 3D), and works on touch. It must never block content.

#### Desktop: three stages

| Stage | Look | Timing |
|---|---|---|
| 1 · Idle | Parts (NOTES, FILMS, MUSIC, PROJECTS, UKULELE) spread around the portrait frame with leader lines and numbered balloons. Button "ASSEMBLE ▸" and the existing helper line "or scroll — the parts meet on the way down". | at rest |
| 2 · Moving | Parts glide inward; leader lines shorten. Scrolling scrubs the same stages. | ≈ 0.1–0.7s |
| 3 · Snap + stamp | Parts snap together with a tiny overshoot (optional click sound, off by default); an **INSPECTED** stamp thuds in; the button reads "ASSEMBLED ✓"; the assembly meter gains +1; the **Lately** strip slides in below. | ≈ 0.7–1.0s |

#### Mobile: hold to assemble

- Full-width button **"HOLD TO ASSEMBLE"** (≥ 44px high) with a progress fill. Hint: "tap = instant · hold = slowly".
- **Hold:** the parts follow the progress. **Lifting the thumb** lets the parts drift back; nothing is lost.
- **Tap:** goes straight to stage 3 (no holding required). This is the accessible path.
- Stage 3 is identical to desktop (stamp, meter +1, Lately).
- The diagram never captures vertical swipes (`touch-action: pan-y`); no scroll-jacking.

#### Rules for both

- [ ] **Assemble gives meter +1 once only** (first completion, persisted). Repeating it replays the animation without adding to the meter.
- [ ] A second click/tap mid-animation **jumps to stage 3** (interruptible, §7.3).
- [ ] Reduced motion or the motion toggle off: show **stage 3 immediately**, with no scrubbing.
- [ ] Keyboard: the button is focusable with a visible focus state; Enter/Space completes the assembly. The legend and parts have text alternatives.
- [ ] Parts, the stamp and the animation are SVG/CSS only, lazy-loaded where heavy, with reserved space so layout never shifts.
- [ ] The Lately strip in stage 3 follows §4 and §4.4 (max 3 rows, category · title · link, hide empty slots, never invent updates).
- [ ] Timings follow the tokens in §7; content stays readable and focusable within 500ms.
- [ ] Day and Night shift both supported; stamp contrast passes AA.

### 12.5 Process

1. **R1, audit and plan:** audit the homepage and each section on desktop and mobile **separately** (screenshots at the §12.3 breakpoints with a headless browser if available; list problems, rate density per device). Add a short implementation plan for Assemble (§12.4). Bianka verifies the audit on a real phone and approves the plan.
2. **R2, implement step by step:** mobile compositions first, then Assemble (desktop stages, then mobile hold-to-assemble), each tested on real devices before the next.
3. Pixel-level judgments are Bianka's to confirm; the agent reports what it can verify and what needs her eyes.
