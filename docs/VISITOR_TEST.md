# First-time visitor test

From `REVISION BRIEF` §11. Run it twice: once after Stage 1B (it decides where the
Lately strip sits and whether the hero hooks work), once in Stage 4.

Bianka finds the tester. The agent only prepares the script and records the result.

## Who

Someone who has never seen the site. No designer, no developer, no friend who has
already heard about the revision. One person per run, on a real phone and then on
desktop (or two people, one device each).

## Script

Say this and nothing more:

1. "This is someone's personal website. Have a look for a minute."
2. Start a timer. Say nothing while they read.
3. After 5 seconds: "Whose website is this?"
4. After 10 seconds: "What can you find here?"
5. "Can you find their projects?" — wait, do not point.
6. "Can you find a way to contact them?" — wait, do not point.
7. "Is there a setting for motion or animation? Can you tell what it does?"

Do not explain the manual metaphor, the console, or the tabs. Do not say
"socket", "assembly", "C01" or "colophon". If they ask what something is, answer
"whatever you think it is" and write down the question.

## Checks

| # | Check | Passes when |
|---|---|---|
| 1 | Whose site is it, in 5 seconds | They say Bianka (or "a person called Bianka") unprompted |
| 2 | What is here, in 10 seconds | They name at least two of: notes, films, projects, music/life |
| 3 | Projects in ≤ 2 interactions | Yes, without the console |
| 4 | Contact in ≤ 2 interactions | Yes, without the console |
| 5 | Motion setting is findable and understood | They find it and say what it does. On a phone it lives in the Settings popover, so check the icon and the "Settings" label are recognised |

Also write down, for each check: what they said, what they hesitated on, and any
misreading worth keeping in the final report.

## Result form

Copy this block per run.

```
Run:            (1) after Stage 1B   /   (2) Stage 4
Device:         phone 360–430px  /  desktop
Shift:          Day  /  Night
Tester:         (first name or code only)

1. Whose site, 5s:      pass / fail   said:
2. What is here, 10s:   pass / fail   named:
3. Projects:            pass / fail   interactions / path taken:
4. Contact:             pass / fail   interactions / path taken:
5. Motion setting:      pass / fail   found at:            understood as:

Hesitations:
Misreadings:
Unprompted questions:
Where they looked first (top of page / tabs / console / footer):
```

## What the result changes

- Checks 1–2 fail: the hero or the hierarchy is wrong. Revisit the hero text and
  the section order before touching anything else.
- Checks 3–4 fail: navigation is too hidden. Fix the entry point before adding
  anything new.
- Check 5 fails on a phone: **propose** a Motion toggle directly in the mobile
  header. Do not build it without approval (§11).
- Lately: if testers never notice it after the hero but do notice it further
  down, change `latelyPosition` in `content/lately.ts` to `"after-board"`. That
  value is the only place the position lives.
