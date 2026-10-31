# PROJECT BRIEF — BZ-2026 Vintage Industrial Service Manual

> Brief for AI coding agents (Claude Code, Cursor, etc.). Save in the repo root and ask the agent to read it first, then work **phase by phase**.

## Role

You are a senior creative front-end engineer and UI/UX designer. You are upgrading an existing personal website into an interactive, memorable **"vintage industrial service manual"** experience: a machine being assembled, documented the way a 1960s–70s factory manual, parts list and maintenance logbook would document it.

## Context

- **Site:** https://biankazahirra.vercel.app/ (Next.js, deployed on Vercel).
- **Owner:** Bianka Zahirra. Works at a property company keeping forms, spreadsheets and small systems in order. Writes notes on AI agents and small systems, keeps a film journal (Letterboxd), listens to music on repeat, is slowly learning ukulele. Tone: honest, small, unfinished-on-purpose, "just a person figuring things out."
- The site **already** uses machine vocabulary: "rev 2026", "assembly board", six "sockets" C01–C06 (index, about, curiosity, life, films, projects), "diagnostics", "probe a socket", "partly assembled", a "motion" toggle. **Keep** all existing routes, content, copy voice, and the motion toggle. Inspect the existing codebase first and extend it; do not rewrite from scratch unless a file is unsalvageable.
- **Problem to fix:** the metaphor currently lives only in *labels*. Make it live in *interaction* and in *material* (paper, ink, stamps, metal plates).

## Design references (principles to borrow, not to copy)

- **charlesleclerc.com:** chapter-based scroll storytelling, a full-screen "select your chapter" overlay, sections that feel like distinct scenes, a ritual moment ("from man to driver"), optional audio, big quotes, stat blocks, horizontally swipeable galleries.
- **Rishit's 10 portfolio tips** (https://portfolio.rishit.site/portfolio-design-tips):
  1. One metaphor never broken
  2. Each section its own world inside a shared frame
  3. Interactive first 10 seconds
  4. Real voice, no buzzwords
  5. Real content, no placeholders
  6. Easter eggs
  7. Design mobile separately
  8. Performance is design
  9. Readable without JavaScript
  10. Keep contact obvious
- **Real-world visual sources to evoke** (do NOT copy any specific brand's artwork or logos): mid-century industrial service manuals, illustrated parts lists, maintenance logbooks, carbon-copy request forms, riveted data plates, index-tab dividers, punched cards, rubber-stamp markings.

## Visual system — "Vintage Industrial Manual"

### Theme 1 (default): DAY SHIFT (aged paper)

| Token | Value | Use |
|---|---|---|
| Paper | `#EFE6D0` | main background, with faint ruled lines (28px, ~6% ink) |
| Paper (secondary) | `#DAD5C7` | tabs, panels |
| Ink | `#2B2620` | text, line art |
| Oxide red | `#B83A22` | header band, callout balloons, stamps |
| Mustard | `#D9A441` | active tab, highlights, hazard stripes |
| Metal grey | `#C9C3B4` | data plates |

Never use mustard as text on cream (low contrast); use it as a fill with dark text.

### Theme 2: NIGHT SHIFT (warm dark)

- Warm charcoal paper `#1E1B17`, cream ink `#EFE6D0`, same red/mustard accents lightened for contrast, ruled lines inverted.
- Toggle labelled **"DAY / NIGHT SHIFT"**. This also carries the "Operator ↔ Off-duty" idea: day shift = work side, night shift = films / music / ukulele side.
- Persist the choice; respect `prefers-color-scheme` on first visit. Both themes must pass WCAG AA.

### Typography (self-host via `next/font`, no layout shift)

- **Display / headings:** Stardos Stencil (uppercase, stencil feel).
- **Labels, tabs, table headers:** Archivo Narrow (bold, tracked, uppercase).
- **Body, forms, logbook text:** Courier Prime (typewriter feel).
- Optional rare "pencil note" handwriting in margins; keep it minimal.

### Material language (CSS / SVG only, no heavy images)

- Paper grain via tiny inline SVG noise or CSS gradients (<10KB).
- Riveted metal **data plate** (inset border, four rivets) for model / serial.
- **Rubber-stamp marks** (INSPECTED, REVISED, APPROVED, VOID), slightly rotated, with a fast "thud" scale-in animation.
- **Index-tab dividers** for navigation; the active tab is taller.
- **Hazard-stripe** WARNING / NOTE / CAUTION strips (mustard + ink diagonal).
- Punched-hole progress (see Assembly Meter), staple and corner marks, photo corners for pictures, perforated edges, subtle drop shadows.
- Illustrations: ink line art / halftone style exploded views with red numbered callout balloons and leader lines, captions "Fig. x-x".

### Microcopy

Service-manual voice: numbered steps, "WARNING / NOTE / CAUTION", "Form No. 2026-A", "Printed Rev 2026". Lowercase-leaning, direct, a little dry-funny. No LinkedIn buzzwords.

> Example: "WARNING: may cause excessive curiosity. Do not remove the lid without snacks."

## Global shell (shared frame on every page)

1. **Top band** in oxide red styled as a manual header: "SERVICE MANUAL · MODEL BZ-2026", section / page ("Section 6.0 · Page 6-1"), the **assembly meter**, DAY/NIGHT SHIFT toggle, motion toggle, sound toggle (**OFF by default**), CONTENTS button, language switch ID/EN styled as a "language pack" (build the i18n structure; EN first, ID strings stubbed with TODO).
2. **CONTENTS overlay** (Leclerc-style chapter selector) styled as a printed table of contents with dotted leaders. Keyboard accessible.
   - §1.0 Identification (index)
   - §2.0 Specifications (about)
   - §3.0 Maintenance Logbook (curiosity)
   - §4.0 Inspection Photos (life)
   - §5.0 Indicator Panel (films)
   - §6.0 Illustrated Parts List (projects)
   - §7.0 Service Request (contact)
3. **Bottom:** index-tab row for sockets C01–C06 (current one raised).
4. **Footer:** revision history table (Rev A / B / C… with dates and short notes), plain-text email and links (**contact must NEVER be hidden behind interaction**), "Printed Rev 2026 — assembled slowly, revised occasionally."
5. **Page transitions:** tab slide + page-turn feel, stamps thud in, line art redraws via `stroke-dashoffset`. All respect reduced motion.

## Assembly meter (core mechanic)

- A real global state, 0–10 **punched holes** (filled vs ring-outlined circles) plus numeric "6/10" in the header band.
- Increases when: each socket/page is visited (probed), each section is scrolled through, each Easter egg is found.
- Persist in `localStorage` (wrap in try/catch, work if empty).
- At 10/10: the unit "starts up". A lamp turns on, a big stamp reads **"ASSEMBLED — APPROVED"**, and a short line appears: "unit assembled — thanks for the thorough inspection." Unlock a small hidden extra (a note or photo).
- Replace the static "partly assembled" with this live value.

## Home / Index (first 10 seconds must be interactive)

1. **Start-up checklist** (skippable, ≤4s, once per session): a printed form where a typewriter "types" self-test lines, e.g.
   ```
   power .......... ok
   curiosity ...... excessive
   ukulele ........ uncalibrated
   status: partly assembled
   ```
   Then a "START UNIT" button. Optional typewriter bell on completion (sound only if enabled). Keyboard: Enter/Space. "Skip" always visible.
2. **Hero "exploded view":** Bianka's portrait (use existing image) or an ink line-art illustration shown as an exploded diagram. Components float apart with numbered red balloons and a legend (① portrait ② notes ③ films ④ music ⑤ projects ⑥ ukulele). On scroll (scrubbed) or on "ASSEMBLE" click, parts glide together and snap with a tiny overshoot, then an "INSPECTED" stamp thuds in.
3. **Typewriter terminal** ("logbook console", collapsible): accepts `help`, `whoami`, `projects`, `films`, `fault-log`, `sudo hire-me` (playful response + link to contact). Unknown commands return a manual-style error ("ERROR 404: page missing from manual"). Never required to navigate the site.
4. **Sockets as an assembly board of index tabs:** hover / focus / tap draws the connector line and shows a preview ("probe"); click / tap opens the page.
5. A riveted **data plate**: model BZ-2026, serial (decorative), revision 2026, status (live from assembly state).

## Page worlds (each its own scene, shared frame)

| Socket | World | What it is |
|---|---|---|
| **C02 About** | Specifications | Data plate, spec sheet as a ruled form with expandable rows; timeline rendered as a **revision history** table (Rev A→…); toolbox as a tool-rack illustration. Explain day shift vs night shift here. |
| **C03 Curiosity** | Maintenance logbook | Notes as logbook entries with fault codes (E-014 etc.), status stamps (RESOLVED / STILL OPEN / ABANDONED), severity, "root cause", "fix". Filter by tag. Honest about failures. |
| **C04 Life** | Inspection photos | Photos mounted with photo corners, stamped captions as inspection notes, horizontally swipeable film strip. Music as a **loop counter** (mechanical odometer digits: "played on repeat ×37"). A ukulele **tuner** widget: analog needle that never quite settles, status "calibration in progress"; tapping makes it wobble and plucks a note (if sound on). |
| **C05 Films** | Indicator panel | Each film is a brass-bezel panel lamp; click to light it and open its note ("what stayed after the credits"). Keep the existing Letterboxd link. |
| **C06 Projects** | Illustrated parts list | A ruled table (PART NO. / DESCRIPTION / NOTE / MATERIAL / STATUS) where MATERIAL = tech stack. Each row expands via OPEN VIEW / DISASSEMBLE into a 3-step panel: **problem → build → what I'd change**, plus an exploded diagram. Projects: Hallistic, PROPLAN, Digital purchase requisition forms (Microsoft Access). |
| **§7 Contact** | Service request | A triplicate carbon-copy form (white / yellow / pink sheets): name, email, subject, priority (low / normal / "machine is smoking"). Submit via a serverless route or form service; show a ticket number and an APPROVED stamp. **Also** show the email address and links as plain text above the form. |

## Easter eggs (stored, counted as "parts found n/7")

Implement at least 7, each adds to assembly:

1. A staple in a corner that can be dragged out.
2. A "WARRANTY VOID IF OPENED" sticker that opens *maintenance mode* (reveals ruled lines, margin notes, hidden part numbers).
3. Konami code.
4. Clicking the logo 5×.
5. Typing `ukulele` anywhere rings a typewriter bell + plays a chord / animation.
6. A hidden part in the Parts List.
7. An ink pad: click the pad icon, then click anywhere to stamp a random mark (VOID / APPROVED / REVISED) that fades on reload.

Show a quiet "part found" toast with a part number.

## Content rules (important)

- **DO NOT invent** facts, jobs, awards, metrics, quotes, or images about Bianka. Use only content already on the site or provided by me.
- Where real content is missing (photos, screenshots, notes), build the component with a clearly marked TODO slot and a graceful empty state styled as a manual placeholder: `[ image pending — insert Fig. x ]`. List every missing item in a final checklist for me to fill in.
- Replace "sample" notes with a clear data structure (MDX or JSON) so I can paste real notes easily.
- Keep the voice: lowercase-leaning, honest, dry humor, no buzzwords.

## Performance

- Target Lighthouse mobile ≥ 90, CLS < 0.1. Self-host and subset fonts, use `next/image`, reserve space for all media.
- Textures must be cheap: CSS/SVG only, no large texture images, no full-page blend modes that tank scrolling on phones (use `mix-blend-mode` sparingly; fall back to opacity).
- Prefer inline SVG + CSS / Framer Motion (or GSAP ScrollTrigger) over WebGL. No 3D unless justified and lazy-loaded.
- Lazy-load heavy components (console, exploded view, tuner, odometer).
- Audio: off by default, lazy-loaded, tiny files, user-gesture only (typewriter key, bell, stamp thud, ratchet click, ukulele pluck).

## Accessibility & mobile

- Full keyboard navigation, visible focus states styled as a thick ink-red outline, semantic HTML, aria-labels on interactive diagrams, text alternatives for every diagram. Stamps are decorative (`aria-hidden`) unless they carry state; then expose it as text.
- Respect `prefers-reduced-motion` AND the existing motion toggle: reduced mode = no scrubbing, instant states, still fully usable.
- **Design mobile as its own experience** (not a shrunk desktop):
  - hover becomes tap / press-and-hold
  - vertical swipe must never be trapped
  - index tabs become a horizontally scrollable tab strip with scroll-snap
  - the parts-list table becomes stacked cards
  - 44px touch targets
  - drop effects that don't survive small screens
- Contrast AA in both themes (check red-on-cream, cream-on-red, and night-shift accents).

## SEO / readable without JS

- All essential text must exist in server-rendered HTML.
- One page per project, proper metadata / Open Graph (use a vintage-manual-styled OG image), sitemap, robots, JSON-LD Person schema, optional `llms.txt`.

## Workflow / deliverables

Work in phases and **stop after each for review**.

1. **Phase 1 — Foundation:** design tokens (CSS variables for both themes), fonts, paper texture, header band + index-tab shell, theme switch, CONTENTS overlay, content data layer, empty states, plain-text contact in footer.
2. **Phase 2 — "Wow":** start-up checklist, exploded-view hero + stamp, assembly meter (punched holes), tab / socket board, typewriter terminal.
3. **Phase 3 — Page worlds:** Parts List (projects) and Maintenance Logbook (curiosity) first, then About, Life, Films, Service Request form.
4. **Phase 4 — Polish:** Easter eggs, sound, i18n structure, page transitions, OG images, perf / a11y audit.

At each phase: summarize what changed, list files touched, list any missing content I must provide, and run lint / type-check / build.

## Acceptance criteria

- [ ] The site feels like ONE vintage service manual; no section breaks the metaphor and no leftover "blueprint / tech-neon" styling.
- [ ] A first-time visitor gets something interactive within 10 seconds, and can still reach any page and the contact email in ≤2 interactions without using any effect.
- [ ] Works with JS disabled (content visible), with reduced motion, and on a 360px-wide phone, in both Day and Night shift.
- [ ] No fabricated content. All TODOs listed.
- [ ] Lighthouse mobile performance ≥ 90 and no console errors.

## Before you start

Read the repo, propose a short plan with the file structure and component list, and ask me **at most 3 questions**, only if truly blocking. Otherwise proceed and state your assumptions.
