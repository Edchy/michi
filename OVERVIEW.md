# Michi — Project Overview

> **The single entry point.** Read this top to bottom and you'll understand what
> Michi is, why it's built the way it is, how it's structured, where it stands, and
> where to go for depth. Written for the founder *and* for AI agents picking up the
> project cold.
>
> Every section links out to the authoritative doc. This page summarizes; the linked
> docs decide. If this page and a linked doc ever disagree, the linked doc wins — and
> this page should be fixed.

**道 Michi** means "the path." A road you walk a little further every day. The name
is the promise: not a game you win, but a path you travel until the language is yours.

---

## 1. What Michi is — in a paragraph

Michi is a **Japanese learning app built on real learning science, optimized for
genuine language acquisition instead of engagement metrics.** It teaches you to
*understand and produce* Japanese — reading its scripts, hearing its sounds
correctly, writing its characters by hand, and building real sentences — rather than
training you to tap the right box in a streak-driven game. It began as a tool for one
14-year-old beginner and is, deliberately, the **opposite of an engagement machine**:
no streaks, no romaji, no dark patterns.

→ Full argument: **[docs/product/vision.md](./docs/product/vision.md)** (the flagship doc)

---

## 2. Why it exists (the Duolingo contrast)

Duolingo optimizes for *engagement*; engagement is not learning. It produces modest
vocabulary gains but weak grammar, comprehension, and speaking — and for Japanese it
leans on romaji, which actively slows learners. Michi inverts each choice:

| | Duolingo | Michi |
|---|---|---|
| Optimizes for | Engagement (streaks, XP) | Genuine acquisition |
| Romaji | Used as a crutch | **Never**, as a reading aid |
| Exercises | Recognition-heavy | Production-heavy |
| Writing | Afterthought | **Core mechanic** (correct stroke order) |
| Progress | Abstract points | Honest capability that can decay |
| Motivation | Extrinsic (guilt, FOMO) | Intrinsic (visible mastery) |

→ Deeper: [vision §7](./docs/product/vision.md#7-why-michi-is-good-for-learning--in-contrast-to-duolingo)
· the learning science behind it: **[docs/product/pedagogy.md](./docs/product/pedagogy.md)**

---

## 3. The three signature mechanics

If Michi is remembered for three things:

1. **Script-native, no-romaji teaching** — sounds are bound straight to hiragana; the
   Latin alphabet never mediates reading.
2. **Handwriting with correct stroke order** — drawing engages motor memory, a
   separate reinforcing channel. A core mechanic, not a bonus.
3. **Honest progress with decay** — a real, tested capability count that rises when
   you practice and *falls* when you don't, always framed as recoverable.

→ [vision §8](./docs/product/vision.md#8-the-three-signature-mechanics)

---

## 4. The principles that govern everything

Ten non-negotiables. Every feature and doc is judged against them; they're cited
throughout as `[P#]`. The short version:

| | Principle | | Principle |
|---|---|---|---|
| **P1** | Learning over engagement | **P6** | Respect the learner (no dark patterns) |
| **P2** | No romaji, ever (as a reading aid) | **P7** | Sessions always complete |
| **P3** | Production over recognition | **P8** | Everything lives in the SRS |
| **P4** | Correct by construction | **P9** | Offline-first, one codebase |
| **P5** | Tell the truth about memory | **P10** | Depth before breadth |

→ Full, with rationale and a test for each: **[docs/product/principles.md](./docs/product/principles.md)**

---

## 5. How the learner actually experiences it

- **A session** = 15–25 min, three parts: **Review** (SRS due items) → **New content**
  (one small concept) → **Practice** (drawing / listening / production). Always a clear
  "done."
- **Moving through it:** exercises **auto-advance** on completion; only *read-this*
  steps (a new character, a cultural note) wait for a tap. Feedback **teaches, never
  punishes** — no hearts, no lives. A progress bar is always visible.
- **The very first thing** the learner does: **hear a native voice say あ and mimic it
  aloud** — doing before reading. The "why Japanese / three scripts" story is earned
  *after* that hook, then dripped in as each script becomes relevant.
- **The home surface is a world map** — the course drawn as **one continuous, walkable
  path** of **stations** (each a lesson, *STATION N 宿*) grouped into **modules**, module
  1 flowing into module 2 into module 3. The learner walks the path, clicks a station to
  start it, and moves between modules two ways — glide arrows that pan along the path, or
  a zoom-out **module chain** to jump; completing a module unlocks the next. It's also
  where progress lives. Quiet and calm, never gamified.

→ Sequencing philosophy: [docs/curriculum/overview.md](./docs/curriculum/overview.md)
· the experience layer: **[docs/curriculum/session-flow.md](./docs/curriculum/session-flow.md)**
· the world map (modules & stations): [docs/curriculum/world-map.md](./docs/curriculum/world-map.md)
· how days collapse into stations + book stops/codex: [docs/curriculum/station-map.md](./docs/curriculum/station-map.md)
· the full station roster (every stop's contents): [docs/curriculum/stations.md](./docs/curriculum/stations.md)
· the concrete hiragana session sequence: [docs/curriculum/month-1.md](./docs/curriculum/month-1.md)

---

## 6. How it's built (architecture in brief)

- **Stack:** Next.js (React) + Tailwind, wrapped for mobile with **Capacitor** — one
  codebase for web + iOS + Android. HTML Canvas for drawing. Offline-first storage
  (IndexedDB on web / SQLite on mobile). Supabase sync is a *later* addition, never a
  dependency.
- **Layers (dependencies point downward only):** UI → Application (session
  orchestration) → { **SRS engine** (pure SM-2 logic) · **Content** (authored,
  static) } → Persistence (learner state).
- **Two kinds of data, joined only by item id:** *content* (authored curriculum,
  ships with the app) is strictly separate from *learner state* (SRS schedules,
  confidence, progress).
- **The SRS engine is the heart** — pure, framework-free, exhaustively testable, and
  the **first thing to build.** Everything else plugs into it.

→ System shape: **[docs/architecture/overview.md](./docs/architecture/overview.md)**
· stack rationale: [docs/architecture/tech-stack.md](./docs/architecture/tech-stack.md)
· the SRS: [docs/architecture/srs-engine.md](./docs/architecture/srs-engine.md)
· learner-state entities: [docs/architecture/data-model.md](./docs/architecture/data-model.md)
· content-as-data: [docs/curriculum/content-model.md](./docs/curriculum/content-model.md)

---

## 7. Key decisions already made (ADRs)

Significant, hard-to-reverse choices are recorded as immutable Architecture Decision
Records:

| # | Decision | In one line |
|---|---|---|
| [0001](./docs/decisions/0001-web-first-capacitor.md) | Web-first + Capacitor | One React codebase everywhere; canvas is natural in the browser |
| [0002](./docs/decisions/0002-no-romaji.md) | No romaji as a reading aid | Protect the native phonological map from day one |
| [0003](./docs/decisions/0003-sm2-srs-algorithm.md) | SM-2 for spaced repetition | Tiny, proven, pure; FSRS is a possible future upgrade |
| [0004](./docs/decisions/0004-stroke-data-source.md) | `strokesvg` (Klee One) for kana strokes | Stroke hints match the teaching typeface; OFL-clean; KanjiVG for kanji later |

→ How ADRs work + index: [docs/decisions/README.md](./docs/decisions/README.md)

---

## 8. Where the project stands

**Phase 0 — Foundations** (planning & structure) is essentially complete: the full
docs foundation exists, and the key decisions (stack, no-romaji, SRS algorithm,
stroke-data source) are settled. **No application code exists yet** — the next build
target is the pure SRS engine (Phase 1).

The roadmap runs: **0 Foundations → 1 SRS engine → 2 Content (the hiragana curriculum) →
3 Web app → 4 Mobile via Capacitor → 5 Audio production →** then katakana, kanji, and beyond.

**Open questions still tracked:** content on-disk format (JSON vs. TS modules), and
test/lint/TS tooling — both to be settled as their phases begin.

→ Phases, status, open questions: **[docs/roadmap.md](./docs/roadmap.md)**

---

## 9. The whole map

```
michi/
├── OVERVIEW.md          ← you are here (the entry point)
├── README.md            ← short public front door
└── docs/
    ├── README.md            index + reading paths + conventions
    ├── product/         WHAT & WHY
    │   ├── vision.md        ⭐ what Michi is / is not, goals, vs. Duolingo
    │   ├── pedagogy.md         the learning science
    │   ├── principles.md       the 10 non-negotiables (P1–P10)
    │   └── glossary.md         shared vocabulary (SRS, mora, i+1, gojūon…)
    ├── curriculum/      WHAT WE TEACH
    │   ├── overview.md         sequencing philosophy & session shape
    │   ├── session-flow.md     how a session plays out; the first experience; scripts explained
    │   ├── month-1.md          the full 28-day hiragana curriculum
    │   ├── content-model.md    content as structured data
    │   ├── world-map.md        modules & stations: the course as a walkable path
    │   ├── station-map.md      how days collapse into stations; book stops & the codex
    │   └── stations.md         the full station roster: every stop and what it contains
    ├── architecture/    HOW IT'S BUILT
    │   ├── overview.md         layers, modules, boundaries, data flow
    │   ├── tech-stack.md       platform & technology choices
    │   ├── srs-engine.md       the spaced-repetition engine (build first)
    │   └── data-model.md       persisted learner state
    ├── design/          CRAFT
    │   ├── DESIGN.md           the visual system (feel, color, motion)
    │   ├── typography.md       the typefaces (a pedagogical choice)
    │   └── audio.md            voiceover strategy & pitch-accent accuracy
    ├── decisions/       WHY — ADRs 0001–0004 (+ README, template)
    └── roadmap.md       WHEN — phases, status, open questions
```

### Fast paths by intent

- **Just understand Michi** → [vision](./docs/product/vision.md) →
  [pedagogy](./docs/product/pedagogy.md) → [principles](./docs/product/principles.md)
- **Build something** → [architecture/overview](./docs/architecture/overview.md) →
  [srs-engine](./docs/architecture/srs-engine.md) →
  [data-model](./docs/architecture/data-model.md) → [roadmap](./docs/roadmap.md)
- **Write curriculum** → [curriculum/overview](./docs/curriculum/overview.md) →
  [session-flow](./docs/curriculum/session-flow.md) →
  [content-model](./docs/curriculum/content-model.md) →
  [month-1](./docs/curriculum/month-1.md)
- **Know why a call was made** → [decisions](./docs/decisions/README.md)

---

## 10. Conventions (so the docs stay legible)

- Docs **cross-link liberally**; principles are cited as `[P#]`.
- Design docs ahead of implementation are marked **Status: Draft / proposed**.
- **Decisions live in ADRs** and are immutable once accepted — change one by writing a
  new ADR that supersedes it, never by editing the old one.
- **Keep this overview current.** When a doc is added or a decision changes, update the
  relevant section here — this is the one page everything else is reached from.
