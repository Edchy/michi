# Michi Legacy Documentation Reference

This file is a frozen archive of the documentation that existed immediately before
Michi's documentation reset on 2026-07-28.

It preserves earlier product thinking, curriculum plans, architecture proposals,
design guidance, and agent instructions. It is **reference material, not the current
source of truth**. Current direction lives in `README.md` and `PLAN.md`.

The archive was generated from commit `936f287` plus the clean working tree that
followed it. Each source is included verbatim between explicit start and end markers.
The manifest records the SHA-256 of the original file content.

## Manifest

- `CLAUDE.md` — `bebb7185f2a7913c94b4605ce08abd26bce32d897714fbd4b8103249ea36bac4`
- `OVERVIEW.md` — `0b0870a5857bf49509a042990210253ab5dc1946d5f55961f7d9a9b95de21d91`
- `PRODUCT.md` — `6bebaf87ad251d90bcdac244b7910f970fc2845f49a43f9a3b9791edfdc0131f`
- `README.md` — `1f28d4dca3b44f273239ee31c41683f430a904fb1d7a1277800691fc8a0ce149`
- `docs/README.md` — `73d75d6d50b2e5d3b1c9e11b23074a5281e977c0ab8ad549a415756a6d962b33`
- `docs/architecture/data-model.md` — `9814d9398cb50d7e15743bffc1100492ee0be60fa5664ac5f82fd18817906cd0`
- `docs/architecture/overview.md` — `6b0ee9f56b7164d25334475072cbab090066516080fe866b7a3d05f2371b2fd2`
- `docs/architecture/srs-engine.md` — `d2afba53d49764285b9dd7f5b27bb33188af92a24e58181b77aa575316be8634`
- `docs/architecture/tech-stack.md` — `42785de0e79e3c415e618fd19e2caf097e419bba683e776e6233436676bf12e9`
- `docs/curriculum/content-model.md` — `5a80b159ee0569cc79f447b570eda6cd6d9935af7fe24ec6cd4357ba92ca09da`
- `docs/curriculum/month-1.md` — `2137e5e7d1d71925b26bd9f3dea2d42c0a121e32d7b870167948f3a710dcfdce`
- `docs/curriculum/overview.md` — `bba0312ba9fe1bb065da6ca96861382c74906793afe1ca45686aea01a44b78b7`
- `docs/curriculum/session-flow.md` — `738cb63e6aa6cdeb132cf5bc5f4a6adabbdb663dc8546c3fb00dd9862a281c17`
- `docs/curriculum/station-map.md` — `9ec9da07e45c2aa48f51a45d9c59b91c31e07dd6fdc7cb01c9800d652200b2bc`
- `docs/curriculum/stations.md` — `0a87377fc62b0840d3816c554bf673c52234254177b447222b006a3ff187774d`
- `docs/curriculum/world-map.md` — `fcf95efc73256681772974178177479d15519088891cb40468deda719312e1ac`
- `docs/decisions/0001-web-first-capacitor.md` — `460016836890197f0944650bea5c5f622e3465b1843f8d84388ff9e8584c7007`
- `docs/decisions/0002-no-romaji.md` — `5675df0bbd8e5f755f59844a509fb60f61b361eb15cba06c26790e4bad2dd4da`
- `docs/decisions/0003-sm2-srs-algorithm.md` — `9821968f546e2a9b53e248edcce62b9be42c56ef620a0d652bc391b4a9a0b6ec`
- `docs/decisions/0004-stroke-data-source.md` — `99c19b876bce9364c28e315c525c066ac8abb0646501f183faba0d0adb48b9df`
- `docs/decisions/0005-roads-and-provinces.md` — `59eb498dd079be5a553f611a319ca3aff24d6c5257eadd06d58fa4063162b74a`
- `docs/decisions/0006-provinces-and-tracks.md` — `ff400364598922a7079de6413c50f0f5884a54c3b876987a837c7d2fbc372d81`
- `docs/decisions/0007-tokyo-subway-theming.md` — `bedb4d0e2d643114d9f4fa0b1ef4b28ba0792952a3ca6b345f4c5d79a7d588b1`
- `docs/decisions/README.md` — `b9996707d5e05a027e6e61e979cbdbf5f71367217775fa1334047e6dcfdd1c70`
- `docs/decisions/template.md` — `70be4d46e6a2f0f45885aaad3e4b25819f32b6d78db670d25e7f0284623573ab`
- `docs/design/DESIGN.md` — `39932e7f1734880728d974d8617cca41826cf0d6f7534c52abd2ded6bec5e3d6`
- `docs/design/audio.md` — `8f13b0b09e1377ec2e1d423a8f60e38b03060748940454186098ea70c7a6af5c`
- `docs/design/typography.md` — `ef2940cbd4266ee3c8c9f62b831dff8f8d7d19d44f20084ecd21acae2fde4ff4`
- `docs/product/glossary.md` — `59e000d0537904f9866c912a971992c5d7c943f671ebcf92e98af48f46f085df`
- `docs/product/pedagogy.md` — `7bb32f0a9c79664aa88967f369464a4e7b591848b5d22bd27a330c9b84fbccd6`
- `docs/product/principles.md` — `e84523ac24b8f917e96a43bd0b12d19c489ab497292db5f5222948fbdcb6d1b2`
- `docs/product/vision.md` — `404cf03b0e0845652e5f01853b331690947a7a7a0d82e178bbfa9718bb7368fb`
- `docs/project-control.md` — `a45a87194934f2b4473877c2bc71084386b0de9552e50f932f0e71b425ed023d`
- `docs/roadmap.md` — `d82cbb1c5448232626c31673538976dc4c9232c8a5d39d30bba030c8acf980dc`

## Archived sources

---

<!-- ARCHIVE-SOURCE-START: CLAUDE.md -->

# Michi — project rules for Claude

Start by reading **[OVERVIEW.md](./OVERVIEW.md)** — the single entry point that
summarizes the whole project and links to every doc.

The app is being built (Next.js under `src/`) against docs that were written first.
The docs remain the source of truth for intent: when code and docs disagree, treat
it as a question to settle, not a doc to quietly overwrite. Respect the existing
docs and their voice (direct, warm, opinionated, honest).

## Keep OVERVIEW.md in sync (important)

`OVERVIEW.md` is the project's single source-of-entry. It must not silently drift out
of date.

**When you add, remove, or rename a doc under `docs/`, add or change an ADR, or change
a fact that OVERVIEW.md summarizes, update OVERVIEW.md in the same change** — its
relevant section *and* the file map in §9. Also update the index in
[docs/README.md](./docs/README.md).

If a docs change is trivial (a typo or wording tweak that doesn't affect any summary),
no OVERVIEW.md update is needed — proceed normally.

> A `PostToolUse` hook will remind you if you edit `docs/` without touching
> OVERVIEW.md. Treat the reminder as a prompt to decide whether the change is
> significant, not as an order to always edit OVERVIEW.md.

## Working conventions

- **Decisions go in ADRs** (`docs/decisions/`) and are immutable once accepted —
  supersede with a new ADR rather than editing an accepted one.
- **Cross-link liberally**; cite principles as `[P#]` (see
  [principles.md](./docs/product/principles.md)).
- **Honor the principles.** A change that violates one (P1–P10) needs a fix or a
  documented ADR exception.
- **Verify doc links resolve** when you add or move files.

## Learner-facing copy

- **No em-dashes, ever.** In any text the learner sees (station slides, codex/book-stop
  entries, UI strings), rewrite with a period, comma, colon, semicolon, or parentheses.
- **No unexplained jargon or unglossed Japanese.** Every term and example word must be
  either already introduced, self-evident (sushi, Tokyo), or explained on the spot.
- **Prose wraps with `text-pretty`** (headings: `text-balance`) to avoid orphans.

<!-- ARCHIVE-SOURCE-END: CLAUDE.md -->

---

<!-- ARCHIVE-SOURCE-START: OVERVIEW.md -->

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
- **The first station is orientation:** a short read-through of the three scripts —
  hiragana, katakana, kanji, with romaji named and set aside — one idea per slide,
  one real word per script (わたし, カメラ, 山), plus the first hint that a word splits
  into even one-symbol sounds (すし, つなみ, からおけ), ending on *why* the course starts
  with hiragana and its five vowels. Nothing is drilled or seeded there; the depth
  (origins, the mora idea in full, a mixed three-script sentence) lives in the book
  stop that follows.
- **Then the learning proper begins:** **hear a native voice say あ and mimic it aloud**
  — doing before reading. Each later script's story is dripped in as it becomes relevant.
- **Stations carry their own new facts; book stops expand on them.** Because book stops
  are optional, nothing essential lives only in one — every station introduces its ideas
  on unskippable slides, and the book stop after it goes deeper rather than repeating.
- **The home surface is a world map, themed as the Tokyo subway** — the course drawn as a
  **walkable path** of **stations** (each a lesson, shown by a real Tokyo place name in
  kana: あさくさ / *Asakusa Station 駅*) grouped into **tracks** (each a real Metro
  line — *Ginza Line 銀座線* — drawn in that line's official color) grouped into
  **provinces** (*PROVINCE N 国* — one script or domain each: Hiragana, Katakana,
  First kanji, Words & sentences). The learner walks the path, clicks a station to start
  it, and moves by glide arrows within a province or a two-level **chain** (provinces →
  tracks) between them; completing a track unlocks the next. Only the current
  province's path is drawn, which is what keeps the map legible as the course grows past 50
  tracks. It's also where progress lives. Quiet and calm, never gamified.

→ Sequencing philosophy: [docs/curriculum/overview.md](./docs/curriculum/overview.md)
· the experience layer: **[docs/curriculum/session-flow.md](./docs/curriculum/session-flow.md)**
· the world map (provinces, tracks & stations): [docs/curriculum/world-map.md](./docs/curriculum/world-map.md)
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
| [0006](./docs/decisions/0006-provinces-and-tracks.md) | Provinces (国) above tracks (線) | Renames the 0005 tiers: province → track → station; one-tap switching |
| [0007](./docs/decisions/0007-tokyo-subway-theming.md) | Tokyo subway theming | Stations are real Tokyo stations (駅), tracks are real Metro lines in their official colors |

→ How ADRs work + index: [docs/decisions/README.md](./docs/decisions/README.md)

---

## 8. Where the project stands

**Phase 0 — Foundations** is complete: the docs foundation exists and the key
decisions (stack, no-romaji, SRS algorithm, stroke-data source) are settled.

**Application code now exists.** Built so far:

- **SRS engine** (Phase 1) — pure SM-2 in `src/srs/`, no framework, under test
- **Content layer** (Phase 2) — the vowels, the k-row and their first consolidation station in
  `src/content/`, as TS modules with validation tests; the full 46-kana curriculum
  is still to come
- **Web app** (Phase 3, in progress) — Next.js App Router in `src/app/`: the
  world map (provinces → tracks → stations), Station 1 (the three scripts),
  Station 2 (the five vowels), Station 3 (the K row), Station 4 (the first look
  back), and the codex
- **Kana audio** — all 46 gojūon as human recordings, one speaker (see the note below)

82 tests pass across 11 files (`npx vitest run`). Phase 3 is scoped to Track 1's four
stations (the three scripts, the five vowels, the K row, then consolidation) — generalizing
across the full curriculum is what remains. Stations 2–4 share one page component
(`src/components/track1-page.tsx`), which takes a station id and supplies the copy and
kana per station; the drill machinery underneath is kana-agnostic. Every control in the
app is one shared button (`src/components/button.tsx` over `.btn-*` in `globals.css`)
in three weights (primary / secondary / ghost); the world map's controls compose the
same classes, so station nav and map nav match. All four stations
close on the **gojūon grid** (`src/content/gojuon.ts`, `src/components/gojuon-grid.tsx`):
the whole 46-kana table, with the row just learned animating into place and the rest
left faint, so the learner sees the set they are filling in rather than a stream of
unrelated rows. Four codex entries are
authored: *Three scripts, one language* (after station 1), *Five sounds that hold still*
(after station 2), *Rows, and the table they sit in* (after station 3) and *Why the kana
are ordered as they are* (after station 8).

The roadmap runs: **0 Foundations → 1 SRS engine → 2 Content (the hiragana curriculum) →
3 Web app → 4 Mobile via Capacitor → 5 Audio production →** then katakana, kanji, and beyond.

*Audio note:* all 46 gojūon ship as human recordings by Kia Leng Koh
([Learn Japanese Adventure](https://www.learn-japanese-adventure.com/)), used by
permission on condition of credit and a link — the Credits footer on the codex page is
load-bearing, not decoration. One speaker throughout, trimmed to their onset and
loudness-matched, in [`public/audio/hiragana/`](./public/audio/hiragana/); terms and
recipe in that folder's `ATTRIBUTION.md`. Phase 5 remains open for production-quality
audio, and the grant is non-commercial: re-ask before any paid release. See
[docs/design/audio.md](./docs/design/audio.md).

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
    │   ├── world-map.md        provinces, tracks & stations: the course as a walkable path
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
    │   └── audio.md            voiceover strategy, pitch accent & what ships today
    ├── decisions/       WHY — ADRs 0001–0007 (+ README, template)
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

<!-- ARCHIVE-SOURCE-END: OVERVIEW.md -->

---

<!-- ARCHIVE-SOURCE-START: PRODUCT.md -->

# Product

## Register

product

## Users

Beginning Japanese learners, initially a 14-year-old starting from zero, who use
Michi for focused 15–25 minute study sessions. They are learning to hear, read,
write, and produce Japanese directly rather than optimize for points or streaks.

## Product Purpose

Michi teaches genuine Japanese acquisition through comprehensible input, spaced
repetition, active recall, motor memory, and output. Success means durable,
honestly measured capability: learners can recognize sounds, read native scripts,
write characters with correct stroke order, and build real sentences.

## Brand Personality

Quiet, focused, and respectful. The experience should feel calm and trustworthy,
with the Japanese character as the visual hero and the interface receding into
the learner's task.

## Anti-references

- Gamified language apps built around mascots, streaks, gems, lives, or anxiety.
- Spectacle-led marketing interfaces with auroras, beams, 3D effects, or decorative
  motion.
- Dense dashboards, stat tiles, card grids, and chrome that compete with the
  lesson.

## Design Principles

1. Optimize for learning, never engagement.
2. Make the learner produce, not merely recognize.
3. Keep each screen focused on one clear learning task.
4. Tell the truth about memory while making every lapse feel recoverable.
5. Respect the learner's time and attention; teach without punishing.

## Accessibility & Inclusion

Meet WCAG AA contrast for text and controls, provide touch targets of at least
44px, preserve visible keyboard focus, and honor reduced-motion preferences.
Never depend on color alone to communicate correctness or progress.

<!-- ARCHIVE-SOURCE-END: PRODUCT.md -->

---

<!-- ARCHIVE-SOURCE-START: README.md -->

<div align="center">

# 道 Michi

**A Japanese learning app built on real learning science — not engagement metrics.**

*Michi (道) — "the path." A road you walk a little further every day.*

</div>

---

Michi teaches you to genuinely **acquire** Japanese — reading its scripts, hearing
its sounds correctly, writing its characters by hand, and building real sentences —
instead of training you to tap the right box in a streak-driven game.

It began as a tool for one 14-year-old learner starting from zero, and it's built on
five pillars of learning science: **comprehensible input, spaced repetition, active
recall, motor memory, and output**. It is, deliberately, the opposite of an
engagement machine.

> 📁 **This repository is currently in the planning phase.** There is no application
> code yet — this is a fully documented project foundation.
>
> 👉 **New here (human or agent)? Read [OVERVIEW.md](./OVERVIEW.md)** — the single
> entry point that summarizes the whole project and links to everything. Or jump
> straight to the **[Product Vision](./docs/product/vision.md)**.

## Why Michi?

| | Duolingo | Michi |
|---|---|---|
| Optimizes for | Engagement (streaks, XP) | Genuine acquisition |
| Romaji | Used as a crutch | **Never**, as a reading aid |
| Exercises | Recognition-heavy | Production-heavy |
| Writing | Afterthought | **Core mechanic** (correct stroke order) |
| Progress | Abstract points | Honest capability that can decay |
| Motivation | Extrinsic (guilt, FOMO) | Intrinsic (visible mastery) |

The full argument is in [vision.md](./docs/product/vision.md#7-why-michi-is-good-for-learning--in-contrast-to-duolingo).

## The three signature mechanics

1. **Script-native, no-romaji teaching** — sounds are bound straight to hiragana.
2. **Handwriting with correct stroke order** — motor memory as a first-class channel.
3. **Honest progress with decay** — a real, tested capability count that rises when
   you practice and falls when you don't, always framed as recoverable.

## Documentation

Everything lives in **[`docs/`](./docs/README.md)**. Quick links:

- 🧭 **[Vision](./docs/product/vision.md)** — what Michi is, what it isn't, and why
- 🧠 **[Pedagogy](./docs/product/pedagogy.md)** — the learning science
- 📏 **[Principles](./docs/product/principles.md)** — the ten non-negotiables
- 📚 **[Curriculum](./docs/curriculum/overview.md)** — how content is sequenced
  ([Month 1 plan](./docs/curriculum/month-1.md))
- 🏗️ **[Architecture](./docs/architecture/overview.md)** — how it's built
- 🗺️ **[Roadmap](./docs/roadmap.md)** — phases, status, open questions
- 🧩 **[Decisions (ADRs)](./docs/decisions/README.md)** — why key choices were made

## Planned tech stack

Next.js (React) + Tailwind, wrapped for mobile with **Capacitor** (one codebase,
web + iOS + Android). HTML Canvas for the drawing mechanic, a pure-JS **SM-2** SRS
engine, offline-first storage (IndexedDB / SQLite). Full rationale in
[tech-stack.md](./docs/architecture/tech-stack.md) and
[ADR-0001](./docs/decisions/0001-web-first-capacitor.md).

## Project status & next steps

Following the [roadmap](./docs/roadmap.md): **Phase 0 (Foundations)** is nearly
complete. The first build target is the **SRS engine** — pure logic, fully testable,
everything else plugs into it. The stroke-data source for the drawing mechanic is now
settled ([ADR-0004](./docs/decisions/0004-stroke-data-source.md)).

## Working in this repo

Read the [principles](./docs/product/principles.md) first — a change that violates one
needs a fix or a documented [ADR](./docs/decisions/README.md).

<!-- ARCHIVE-SOURCE-END: README.md -->

---

<!-- ARCHIVE-SOURCE-START: docs/README.md -->

# Michi Documentation

> **Regaining control of the project?** Start with
> **[project-control.md](./project-control.md)**. It explains the current terms, the
> reusable station idea, and the one-phase-at-a-time implementation plan in plain
> language.

This is the documentation **index** for Michi — a map of what exists in `docs/`.

> 🧭 **Want the project explained, not just listed?** Read
> **[../OVERVIEW.md](../OVERVIEW.md)** — the single entry point you can read top to
> bottom to actually understand Michi, with links out for depth. This page is the
> reference index you return to once you know your way around.

If you're brand new, start with the **[Product Vision](./product/vision.md)** — it
defines what Michi is, what it isn't, and why it's built the way it is. Everything
else supports it.

## How the docs are organized

```
docs/
├── project-control.md  NOW — current terms, working plan, and checkpoints
├── product/       WHAT & WHY  — vision, pedagogy, principles, glossary
├── curriculum/    WHAT WE TEACH — sequencing, the hiragana curriculum, content model
├── architecture/  HOW IT'S BUILT — tech stack, system shape, data & SRS
├── design/        CRAFT — visual system, typography, audio
├── decisions/     WHY — Architecture Decision Records (ADRs)
└── roadmap.md     WHEN — phases and milestones
```

## Reading paths

**"I just want to understand Michi."**
[vision.md](./product/vision.md) → [pedagogy.md](./product/pedagogy.md) →
[principles.md](./product/principles.md)

**"I'm going to build something."**
[architecture/overview.md](./architecture/overview.md) →
[srs-engine.md](./architecture/srs-engine.md) →
[data-model.md](./architecture/data-model.md) →
[roadmap.md](./roadmap.md)

**"I'm going to write curriculum content."**
[curriculum/overview.md](./curriculum/overview.md) →
[session-flow.md](./curriculum/session-flow.md) →
[content-model.md](./curriculum/content-model.md) →
[month-1.md](./curriculum/month-1.md)

**"I want to know why a decision was made."**
[decisions/](./decisions/README.md)

## Full index

- **[project-control.md](./project-control.md)** — the active, step-by-step control
  document for the learning-system foundation work

### product/ — what & why
- **[vision.md](./product/vision.md)** — ⭐ flagship: what Michi is / is not, goals,
  why it beats Duolingo
- [pedagogy.md](./product/pedagogy.md) — the learning science in depth
- [principles.md](./product/principles.md) — the ten non-negotiable design rules
- [glossary.md](./product/glossary.md) — shared vocabulary (SRS, mora, i+1, gojūon…)

### curriculum/ — what we teach
- [overview.md](./curriculum/overview.md) — sequencing philosophy and session shape
- [session-flow.md](./curriculum/session-flow.md) — how a session plays out (auto-advance),
  the first experience, and where the three scripts get explained
- [month-1.md](./curriculum/month-1.md) — the hiragana curriculum (an ordered session sequence)
- [content-model.md](./curriculum/content-model.md) — how content is structured as data
- [world-map.md](./curriculum/world-map.md) — provinces, tracks & stations: the course as a walkable path
- [station-map.md](./curriculum/station-map.md) — how days collapse into stations; book stops & the codex
- [stations.md](./curriculum/stations.md) — the full station roster: every stop and what it contains

### architecture/ — how it's built
- [overview.md](./architecture/overview.md) — layers, modules, boundaries, data flow
- [tech-stack.md](./architecture/tech-stack.md) — platform & technology choices
- [srs-engine.md](./architecture/srs-engine.md) — the spaced-repetition engine
- [data-model.md](./architecture/data-model.md) — persisted learner state

### design/ — craft
- [DESIGN.md](./design/DESIGN.md) — the visual system: feel, color (朱 vermilion), typography, motion
- [typography.md](./design/typography.md) — the typefaces (a pedagogical choice)
- [audio.md](./design/audio.md) — voiceover strategy, pitch-accent accuracy, and
  what ships today (human recordings, one speaker, for all 46 gojūon)

### decisions/ — why
- [decisions/README.md](./decisions/README.md) — what ADRs are + index
- individual ADRs `0001…`

### roadmap
- [roadmap.md](./roadmap.md) — phased plan, current status, open questions

## Conventions

- Docs cross-link liberally; principles are cited as `[P#]`.
- Design docs still ahead of implementation are marked **Status: Draft / proposed**.
- Significant decisions live in ADRs and are immutable once accepted — change one by
  writing a new ADR that supersedes it.

<!-- ARCHIVE-SOURCE-END: docs/README.md -->

---

<!-- ARCHIVE-SOURCE-START: docs/architecture/data-model.md -->

# Data Model — Learner State

The persisted, per-learner entities: SRS schedules, confidence, and progress. This
is the **dynamic** half of Michi's data. The **static** half — authored curriculum
content — is specified in [content-model.md](../curriculum/content-model.md). The two
are joined only by **item id**.

> **Status:** Draft / proposed. Field names are illustrative and will be finalized
> when the schema is implemented. This document fixes the *entities and their
> relationships* so the SRS engine and storage layer can be built against a shared
> understanding.

---

## Design Rules

- **Content is not duplicated here.** Learner state references content by id (e.g.
  `itemId: "hira_ka"`); it never copies the glyph, meaning, or audio.
- **The SRS state is the source of truth for confidence.** Confidence and "known"
  counts are *derived* from SRS fields, never stored as independent editable numbers.
  See [P5](../product/principles.md#p5--tell-the-truth-about-memory).
- **Storage-agnostic.** These entities map to IndexedDB (web) or SQLite (mobile)
  behind the storage interface described in [overview.md](./overview.md). The shapes
  below are logical, not tied to one engine.

---

## Entities

### SrsItemState

The core record: one learner's scheduling state for one content item. There is
exactly one of these per (learner, content item) once the item has been introduced.

```
SrsItemState {
  itemId          // FK to a content item (Character | Word | GrammarPattern | ...)
  itemKind        // "hiragana" | "katakana" | "kanji" | "word" | "grammar"
  interval        // days until next review (SM-2 output)
  easeFactor      // SM-2 ease multiplier (starts ~2.5)
  repetitions     // count of consecutive successful reviews
  dueDate         // when this item is next due
  lastReviewed    // timestamp of last review
  createdAt       // when the item was introduced / seeded
}
```

`interval`, `easeFactor`, and `repetitions` are exactly the SM-2 state; see
[srs-engine.md](./srs-engine.md) for how they evolve.

### ReviewLog (optional but recommended)

An append-only history of individual reviews. Not required for the algorithm (SM-2
only needs current state) but valuable for the honest progress surface, debugging,
and future analysis of *learning* (not engagement).

```
ReviewLog {
  id
  itemId
  grade           // "forgot" | "hard" | "got_it" | "easy"
  reviewedAt      // timestamp
  intervalBefore  // interval prior to this review
  intervalAfter   // interval SM-2 produced
}
```

### LessonProgress

Tracks completion of authored lessons (curriculum days). Separate from SRS state:
lessons are *done once*, items are *never done*.

```
LessonProgress {
  lessonId        // FK to a content Lesson (e.g. "m1_d04_k_row")
  status          // "not_started" | "in_progress" | "completed"
  completedAt?    // timestamp
}
```

### LearnerProfile

Minimal per-learner metadata. Kept deliberately small — Michi collects little.

```
LearnerProfile {
  id
  displayName?
  startedAt
  settings        // e.g. audio speed, daily new-item cap
  // no engagement fields: no streaks, no XP, no gems (by design — P1, P6)
}
```

> Note the explicit absence of streaks, XP, and gems. Their omission is a design
> statement, not an oversight. See
> [P6](../product/principles.md#p6--respect-the-learner).

---

## Derived Values (computed, not stored)

These are calculated from the entities above on demand. Storing them would risk them
drifting out of sync with reality — which would violate the honesty principle.

### Confidence score

Derived from an item's `SrsItemState` — longer `interval` and not-overdue → higher
confidence; overdue → decaying confidence. The exact formula is specified alongside
the algorithm in [srs-engine.md](./srs-engine.md).

### Capability count ("you know N words")

`count of items where itemKind == "word" and confidence >= threshold`. Because it's
derived from live SRS state, it rises with practice and falls honestly when items go
overdue — powering the decay mechanic and knowledge snapshots. See
[vision §8](../product/vision.md#8-the-three-signature-mechanics).

### Due queue ("what's due today")

`items where dueDate <= now`, ordered for review. This is the entire input to a
session's review segment.

---

## Relationships

```
LearnerProfile 1 ──────── * SrsItemState ──── refs ──▶ (content) Character/Word/...
       │                        │
       │                        └──── 1..* ─▶ ReviewLog
       │
       └──────── * LessonProgress ──── refs ──▶ (content) Lesson
```

- One learner has many `SrsItemState` records (one per introduced item).
- Each `SrsItemState` may accumulate many `ReviewLog` entries.
- One learner has many `LessonProgress` records (one per lesson attempted).
- Every reference into content is by **id only**; content is never copied.

---

## Lifecycle of an Item

1. **Introduced.** A lesson seeds the item → a fresh `SrsItemState` is created with
   default SM-2 values and `dueDate` = today. (See
   [curriculum ⟷ SRS](../curriculum/overview.md#how-the-curriculum-meets-the-srs).)
2. **Reviewed.** Each review feeds a grade to the SRS engine, which updates
   `interval` / `easeFactor` / `repetitions` / `dueDate`; a `ReviewLog` is appended.
3. **Matures.** Successful reviews grow the interval; the item appears less often and
   its confidence rises above threshold — counting toward capability.
4. **Decays (if neglected).** If reviews stop, `dueDate` passes, confidence falls
   below threshold, and the item silently drops out of the capability count — shown
   honestly, framed as recoverable.
5. **Recovers.** A single successful review brings it back fast, because the memory
   was dormant, not gone.

---

## Sync (Later)

When cross-device sync arrives (Supabase, a later phase — see
[../roadmap.md](../roadmap.md)), these same entities are what gets synchronized.
Designing them cleanly now — small, id-referenced, derived-values-excluded — is what
makes that later sync straightforward rather than a rewrite. Sync is an addition
behind the storage interface, never a dependency of the core offline loop
([P9](../product/principles.md#p9--offline-first-one-codebase)).

<!-- ARCHIVE-SOURCE-END: docs/architecture/data-model.md -->

---

<!-- ARCHIVE-SOURCE-START: docs/architecture/overview.md -->

# Architecture Overview

The shape of the system: its major modules, how they fit together, and the
principles that govern the structure. The concrete technology choices live in
[tech-stack.md](./tech-stack.md); the SRS algorithm in
[srs-engine.md](./srs-engine.md); the persisted entities in
[data-model.md](./data-model.md).

> **Status:** Design-stage. No application code exists yet. This describes the
> intended architecture so that the first code is written into a clear structure.

---

## Guiding Constraints

The architecture is shaped by four principles from [principles.md](../product/principles.md):

- **[P9] Offline-first, one codebase** — core learning must work with no network,
  from a single React/Next.js codebase that runs on web and (via Capacitor) mobile.
- **[P8] Everything lives in the SRS** — the SRS engine is the beating heart;
  most features are clients of it.
- **[P4] Correct by construction** — content (fonts, stroke data, audio) is treated
  as first-class, validated data, not incidental assets.
- **[P1] Learning over engagement** — no analytics/engagement machinery in the core
  loop.

---

## Layered Structure

Michi is organized in layers, dependencies pointing downward only. Higher layers
depend on lower ones; lower layers know nothing of higher ones.

```
┌─────────────────────────────────────────────────────────┐
│  UI Layer (Next.js / React components, Tailwind)         │
│  screens: session, flashcard, drawing canvas, progress   │
└───────────────────────────┬─────────────────────────────┘
                            │  (calls, never reached into)
┌───────────────────────────▼─────────────────────────────┐
│  Application Layer (session orchestration)               │
│  builds a day's session: review → new → practice         │
└───────┬───────────────────────────────────┬─────────────┘
        │                                   │
┌───────▼───────────┐   ┌───────────────────▼─────────────┐
│  SRS Engine        │   │  Content Layer                  │
│  pure logic (SM-2) │   │  authored curriculum + stroke   │
│  scheduling, decay │   │  data + audio refs (static)     │
└───────┬───────────┘   └───────────────────┬─────────────┘
        │                                   │
┌───────▼───────────────────────────────────▼─────────────┐
│  Persistence Layer (learner state)                       │
│  IndexedDB (web) / SQLite via Capacitor (mobile)         │
│  optional sync (Supabase) — later                        │
└─────────────────────────────────────────────────────────┘
```

---

## The Modules

### SRS Engine (`srs`)

**Pure, framework-free JavaScript/TypeScript.** Implements SM-2: given an item's
current state and a review grade, returns the next interval, ease, and due date.
Also derives confidence scores and decay. No UI, no storage, no I/O — which makes it
trivially unit-testable and the **first thing to build**.

See [srs-engine.md](./srs-engine.md). Rationale for building it first:
[srs-engine.md §"Why It's the First Thing to Build"].

### Content Layer (`content`)

The authored curriculum as **static, versioned data**: characters, stroke data,
words, grammar patterns, example sentences, stories, and lessons. Validated against a
schema. Ships with the app so it's available offline. Structure defined in
[content-model.md](../curriculum/content-model.md). Knows nothing about a specific
learner.

### Persistence Layer (`storage`)

Stores **per-learner state** — SRS schedules, confidence, progress, lesson
completion. Offline-first:

- **Web:** IndexedDB.
- **Mobile:** SQLite via Capacitor.
- **Sync (later):** Supabase (Postgres + auth) for cross-device sync — explicitly a
  later phase, not required to ship.

Exposed behind a **storage interface** so the rest of the app doesn't care which
backend is active. Entities: [data-model.md](./data-model.md).

### Application Layer (`session`)

Orchestrates a session. Given the content + the learner's SRS state, it assembles the
day's three-part session (review due items → introduce new content → practice),
enforces the "sessions always complete" rule, and records results back through the
SRS engine and storage. This is where curriculum and scheduling meet at runtime.

### UI Layer (`ui`)

Next.js/React screens and components: the session flow, flashcards, the drawing
canvas, listening drills, the honest progress surface. Thin — it renders state and
forwards learner actions. It calls the application layer; it does not embed learning
logic. Styling via Tailwind. (UI *design* is deliberately out of scope for now.)

---

## Key Boundaries (and why they matter)

- **Content ⟂ Learner state.** Authored curriculum and per-user progress are
  strictly separate, joined only by item id. This lets curriculum ship as reviewable
  static data and lets learner state live in a swappable store. See
  [content-model.md](../curriculum/content-model.md).

- **SRS engine ⟂ everything.** The engine is pure and dependency-free so it can be
  tested exhaustively and reused (even across languages/platforms). Nothing about
  React, storage, or Japanese leaks into it.

- **Storage behind an interface.** IndexedDB vs. SQLite vs. Supabase is an
  implementation detail hidden from the application layer, so we can start with local
  storage and add sync later without rewrites.

- **UI depends inward only.** Screens never reach past the application layer into the
  SRS or storage directly. This keeps learning logic testable without a browser.

---

## Data Flow: One Review, End to End

A concrete trace to make the layering real:

1. **UI** shows a flashcard for a due item and captures the learner's grade
   (forgot / hard / got it / easy).
2. **Application layer** receives the grade and passes the item's current SRS state
   plus the grade to the **SRS engine**.
3. **SRS engine** (pure) computes the new interval, ease, due date, and confidence.
4. **Application layer** persists the updated state via the **storage** interface.
5. **UI** advances to the next due item; when none remain, the review segment is
   marked complete and the session moves on.

No layer skips a step; the engine never touches storage or the DOM.

---

## Offline & Sync Strategy

- **Default:** everything runs locally. Content ships with the app; learner state
  lives in IndexedDB/SQLite. No network needed for any core learning.
- **Later:** optional Supabase sync reconciles local state across devices. Designed
  as an *addition* behind the storage interface, never a dependency of the core loop.

This ordering (local first, sync later) is a deliberate sequencing choice recorded in
[../roadmap.md](../roadmap.md).

---

## What's Deliberately Absent

- **No engagement/analytics pipeline** in the core loop ([P1]).
- **No backend requirement to start** — the app is useful with zero servers.
- **No conversational-AI layer** in the MVP ([vision §4](../product/vision.md#4-what-michi-is-not)).

These absences are features. Adding any of them requires clearing the bar in
[principles.md](../product/principles.md) and, if significant, an
[ADR](../decisions/README.md).

<!-- ARCHIVE-SOURCE-END: docs/architecture/overview.md -->

---

<!-- ARCHIVE-SOURCE-START: docs/architecture/srs-engine.md -->

# SRS — Spaced Repetition System

## What It Is

SRS stands for Spaced Repetition System. It's the algorithm that decides *when* to show each flashcard again.

Instead of reviewing everything every day (wasteful) or only reviewing things once (useless), it tracks how well you know each item and schedules the next review right before you'd forget it.

## The Analogy

Imagine you're juggling balls, but each ball has a different weight. Light balls — things you know well — you can toss high and they stay in the air a long time before you need to catch them again. Heavy balls — things you struggle with — drop fast and need constant attention. The SRS is the system that watches all the balls and tells you which one to catch next.

## How It Works in Practice

The learner sees a hiragana character. They try to recall the sound. Then they rate themselves:

- **Easy** → show again in 2 weeks
- **Got it** → show again in 3 days
- **Hard** → show again tomorrow
- **Forgot** → show again in 5 minutes

Every time an item is reviewed and answered correctly, the interval grows. Every time it's forgotten, the interval resets shorter. Over months, well-known items might only appear once a month. Frequently forgotten items appear daily.

## The Algorithm

The most widely used algorithm is called **SM-2** (SuperMemo 2). It's open source and about 20-30 lines of code. It takes two inputs — the learner's rating and the item's current interval — and outputs the next interval.

Each item in the database stores two things:
- **Interval** — how many days until the next review
- **Next review date** — the actual date it's due

Every session, the app asks: "which items are due today?" and shows exactly those. Nothing more, nothing less.

## What Gets Tracked

Every piece of content in the app lives in the SRS deck:
- Individual hiragana characters
- Individual katakana characters
- Vocabulary words
- Kanji
- Grammar patterns

Each one has its own interval and review date, tracked independently.

## Connection to the Decay Mechanic

The SRS is also what powers the honest decay mechanic described in the pedagogy doc. A word's "confidence score" is derived directly from its SRS interval — a long interval means high confidence, a short or overdue interval means low confidence. The visible stat ("you know 200 words") only counts items above a confidence threshold.

If the learner stops practicing, items go overdue. Confidence scores drop. The weekly snapshot reflects this honestly. Coming back and reviewing brings the scores up fast, because the memory is still there — it just needs a trigger.

## Why It's the First Thing to Build

Everything else in the app depends on the SRS engine:
- Drawing exercises need to know which characters are due
- Vocabulary sessions pull from the SRS deck
- Progress cards read from confidence scores
- The weekly snapshot queries the deck state

Build the SRS engine first. Everything else plugs into it.

<!-- ARCHIVE-SOURCE-END: docs/architecture/srs-engine.md -->

---

<!-- ARCHIVE-SOURCE-START: docs/architecture/tech-stack.md -->

# Tech Stack & Platform Strategy

## The Core Question

The app needs to run on phone and desktop. The UI should be simple enough to work everywhere with minimal adjustments. And you already know React and JavaScript. Those three facts point clearly in one direction.

---

## Does Expo + React Native Make Sense?

Partially. Here's the honest picture.

Expo is excellent for iOS and Android. It handles the hard parts of mobile development — build pipelines, device APIs, audio playback, storage — and wraps them in a developer-friendly layer that a React developer can pick up quickly. If this were mobile-only, Expo would be an easy recommendation.

The problem is desktop. Expo has a web build option (React Native Web) but it's a mobile-first system trying to stretch to desktop, and it shows. Complex layouts feel awkward, the drawing canvas (critical for this app) is harder to implement, and you lose the full power of the browser. You'd spend meaningful time fighting the framework to make desktop feel right.

The bigger issue specific to this app: the character drawing mechanic is much more natural to build in a browser using HTML Canvas than in React Native's touch-based drawing system. Getting stroke recognition working well on React Native Web adds real complexity.

**Verdict on Expo + React Native**: good for mobile, friction on desktop. Not the ideal single choice for a both-platforms-from-day-one approach.

---

## The Better Approach: Web-First with Capacitor

Since you know React, the most pragmatic path is:

**Next.js** (web app) + **Capacitor** (wraps it as a native mobile app)

Here's the analogy: Next.js is your kitchen where you cook the food. Capacitor is a container that lets you take that food anywhere — iOS, Android, desktop browser — without having to cook it again.

### How it works
- You build the app as a normal React/Next.js web app
- On desktop, users open it in a browser or as an Electron-style desktop app
- On mobile, Capacitor wraps the web app in a native shell and gives it access to device APIs (camera, haptics, storage, audio)
- The code is identical. One codebase, all platforms.

### Why this works especially well for this app
- HTML Canvas for the drawing mechanic — straightforward, well-documented, works perfectly on both touch and mouse
- Audio playback via the Web Audio API — consistent everywhere
- The SRS engine is pure JavaScript — runs identically on all platforms
- Simple, clean UI in CSS/Tailwind — easier to make responsive than React Native layouts

---

## Mobile First or Both at Once?

Both at once, because the approach above makes it nearly free.

The key is designing for the phone screen first. A layout that works at 375px wide will almost always work on desktop too — it just has more breathing room. The reverse is not true: a desktop layout rarely translates cleanly to mobile.

Concrete rules for designing both at once:
- Everything in a single centered column, max-width ~600px on desktop
- Large tap targets (minimum 48px height) — looks fine on desktop too
- No hover-only interactions — if it needs hover to work, it won't work on mobile
- Font sizes that are readable without zooming on a phone

The drawing canvas is the one element that needs platform-aware handling. On mobile, it listens for touch events. On desktop, it listens for mouse events. This is maybe 10 lines of code difference, handled with a simple check.

---

## Recommended Stack

| Layer | Choice | Why |
|---|---|---|
| Framework | Next.js (React) | You already know React. Full web power. |
| Mobile wrapper | Capacitor | Wraps the web app as a native iOS/Android app with one command |
| Styling | Tailwind CSS | Utility-first, easy to make responsive, no context-switching |
| Drawing canvas | HTML Canvas API | Native to browsers, works on touch and mouse, well-documented |
| Audio | Web Audio API + Howler.js | Consistent playback everywhere, good library support |
| SRS engine | Custom JS module | ~30 lines, pure logic, no library needed |
| Data / storage | SQLite via Capacitor (mobile) + localStorage/IndexedDB (web) | Offline-first, no backend needed to start |
| Backend (later) | Supabase | When you want sync across devices — Postgres + auth, very beginner-friendly |

---

## What About Flutter?

Flutter is genuinely excellent for this use case — truly cross-platform, fast, and the drawing APIs are first-class. But it uses Dart, not JavaScript. Given you already know React, the learning curve adds months before you can ship anything. Not worth it here.

---

## What About a Separate Mobile App and Web App?

Some teams build two codebases — a React web app and a separate React Native mobile app — sharing only the business logic (like the SRS engine). This gives you the best of both worlds in terms of native feel, but it's double the UI work. Only makes sense if native mobile performance becomes a real problem, which it won't be for a learning app like this.

---

## The Simple UI Advantage

The ambition to keep the UI simple is actually a technical advantage. A complex app with lots of custom interactions, animations, and platform-specific patterns would strain the Capacitor approach. A clean, content-focused UI — flashcard, drawing canvas, audio player, progress card — is exactly what web-first-plus-wrapper handles best.

Keep screens to one task at a time. No sidebars, no complex navigation. This makes the app feel native even though it's a web app underneath, and means zero platform-specific layout work.

---

## Development Order

1. **Build the SRS engine** — pure JavaScript, no UI, testable immediately
2. **Build the web app** (Next.js) — desktop browser first, then test on mobile browser
3. **Wrap with Capacitor** — one command, test on a real phone
4. **Add Capacitor plugins** as needed — audio, haptic feedback, native storage

You can have something running on your phone within a week of starting. That early, tactile feedback of using your own app on a real device is invaluable for design decisions.

<!-- ARCHIVE-SOURCE-END: docs/architecture/tech-stack.md -->

---

<!-- ARCHIVE-SOURCE-START: docs/curriculum/content-model.md -->

# Content Model

How Michi's teaching content is represented as structured data. This is the bridge
between the [curriculum](./overview.md) (what we teach) and the
[data model](../architecture/data-model.md) (how the running app stores learner
state).

> **Status:** Draft / proposed. This is a design document, not yet code. Field
> names are illustrative and will be finalized when the schema is implemented. The
> goal here is to agree on the *shape* of content before writing it.

---

## Two Kinds of Data

It's essential to keep these separate:

1. **Content (authored, static, shared by all learners).** The curriculum itself:
   which characters exist, their stroke data, which words are taught, example
   sentences, lessons, audio references. This ships *with* the app and is
   version-controlled. It does not change per learner.

2. **Learner state (dynamic, per-user).** SRS schedules, confidence scores,
   progress, which lessons are complete. This is described in
   [data-model.md](../architecture/data-model.md).

This document specifies **(1)**. The link between them is the **item id**: authored
content defines items; learner state tracks each learner's relationship to those
items.

---

## Core Content Entities

### Character

An individual kana or kanji.

```
Character {
  id            // stable unique id, e.g. "hira_ka"
  kind          // "hiragana" | "katakana" | "kanji"
  glyph         // "か"
  reading       // phonetic reading in kana (NOT romaji), e.g. "か"
  romaji        // present ONLY for internal tooling/search, never shown to learner
  strokes       // ordered stroke path data (see "Stroke Data" below)
  audio         // reference(s) to pronunciation audio
  mnemonic?     // optional memory hook / etymology note
  notes?        // teaching notes (e.g. "shi not si")
}
```

> The `romaji` field exists for authoring, search, and testing convenience only.
> Per [P2](../product/principles.md#p2--no-romaji-ever-as-a-reading-aid) it must
> **never** be rendered to the learner as a reading aid. Its presence in the data is
> not permission to display it.

### Word (Vocabulary)

```
Word {
  id            // e.g. "word_kawa"
  kana          // "かわ"
  kanji?        // "川" (when applicable / later)
  meaning       // "river"
  partOfSpeech  // "noun" | "verb" | "adjective" | ...
  theme         // "nature" | "animals" | ...
  audio         // reference to pronunciation audio
  exampleRefs   // ids of ExampleSentences using this word
  composedOf?   // character ids, for "you can read this because you know X, Y"
}
```

### Grammar Pattern

```
GrammarPattern {
  id            // e.g. "grammar_sov"
  name          // "Subject–Object–Verb order"
  explanation   // clear, light English explanation
  examples      // ExampleSentence ids demonstrating it
}
```

### Example Sentence

```
ExampleSentence {
  id            // e.g. "sent_neko_sakana"
  kana          // "ねこ が さかな を たべる。"
  meaning       // "The cat eats fish."
  gloss?        // per-word breakdown for teaching
  audio         // reference to audio
  usesWords     // Word ids
  usesGrammar   // GrammarPattern ids
}
```

### Story

A short multi-sentence reading, built only from known content.

```
Story {
  id
  title
  sentences     // ordered ExampleSentence ids (or inline sentences)
  audio         // full-story narration reference
  questions?    // simple comprehension questions
}
```

---

## Lessons and Sequencing

### Lesson

An authored unit of a session's *new content*. Lessons are ordered into the
curriculum; they **seed items into the SRS** on completion but never schedule
reviews themselves (the [SRS owns scheduling](./overview.md#how-the-curriculum-meets-the-srs)).
On the world map, a lesson is presented as a **station** — what each station teaches
and how lessons map to stations is in [station-map.md](./station-map.md).

```
Lesson {
  id            // e.g. "m1_d04_k_row"
  day           // ordinal session number in the sequence (1..N)
  title         // "K-row: か き く け こ"
  kind          // "intro" | "new" | "reinforce" | "quiz" | "rest" | "assessment"
  introduces    // item ids first taught here (seed into SRS)
  reviews       // "all-due" | explicit item ids (usually "all-due")
  exercises     // ordered Exercise specs
  culturalNotes // optional "did you know" content, timed to this lesson
  endState      // description of the clear completion state
}
```

### Exercise

A single interactive task within a lesson. The exercise *types* map directly to the
[pedagogy](../product/pedagogy.md) — heavily weighted toward production.

```
Exercise {
  id
  type          // see types below
  targetItems   // Character / Word / etc. ids this exercise drills
  prompt        // what the learner is shown/asked
  ...typeSpecificFields
}
```

**Exercise types (initial set):**

| Type | Modality | Recall vs. recognition |
|---|---|---|
| `listen-identify` | audio → pick character | recognition (scaffold) |
| `recognize-sound` | character → produce sound | **active recall** |
| `draw-character` | draw the glyph, stroke-checked | **active recall + motor** |
| `draw-from-memory` | draw with no reference | **active recall + motor** |
| `read-word` | show kana word → learner reads/understands | **active recall** |
| `arrange-sentence` | order word blocks into SOV | **production** |
| `story-read` | read a short story, then answer | comprehension |
| `comprehension-q` | answer a question about a sentence/story | comprehension |

New types are added as the curriculum grows, always biased toward production per
[P3](../product/principles.md#p3--production-over-recognition).

---

## Stroke Data

The drawing mechanic ([vision §8](../product/vision.md#8-the-three-signature-mechanics))
needs machine-usable stroke information for every drawable character:

- An **ordered list of strokes**, each stroke a path (sequence of points or an SVG
  path).
- Used for: rendering the animated stroke-order hint, and checking the learner's
  drawn strokes against the correct path and order.

**Source (decided):** kana stroke data comes from **`strokesvg`** (derived from the
Klee One typeface, OFL-licensed), so the stroke hints match our Klee One teaching
face exactly; gaps in the core 92 kana are hand-authored. Kanji stroke data (a later
phase) will come from KanjiVG. The matcher consumes a normalized ordered list of
stroke paths and is independent of the source. Full rationale in
[ADR-0004](../decisions/0004-stroke-data-source.md).

---

## Audio References

Content entities reference audio rather than embedding it. A reference resolves to:

- a **pre-recorded** asset (native voice actor) for core, high-repetition content, or
- a **generated** asset (Google Neural2) for dynamic sentences.

The hybrid strategy and rationale live in [audio.md](../design/audio.md). The content
model only needs the reference; the audio pipeline resolves it.

---

## Where Content Lives

Authored content is **static, versioned data that ships with the app** — not user
data in a database. Likely form: structured files (JSON/TS modules) under a
`content/` directory, validated against a schema. This keeps content:

- reviewable in pull requests (curriculum changes are diffable),
- available offline by default ([P9](../product/principles.md#p9--offline-first-one-codebase)),
- decoupled from per-learner state.

The exact on-disk format is an implementation decision for when coding begins; this
document fixes the *entities and relationships*, which is what the curriculum authors
and the SRS both depend on.

<!-- ARCHIVE-SOURCE-END: docs/curriculum/content-model.md -->

---

<!-- ARCHIVE-SOURCE-START: docs/curriculum/month-1.md -->

# The Hiragana Curriculum — Sessions 1–28

> **On "days," "weeks," "Month 1":** Michi is **self-paced — there is no calendar.**
> The numbered "days" and "weeks" below are an authoring device: an **ordered sequence
> of sessions** (sittings), not deadlines. The learner advances when they've earned it,
> however long that takes. This whole curriculum is one leg of the journey — full
> hiragana — surfaced to the learner as [Provinces, Tracks and Stations](./stations.md), never as
> a month. ("Month 1" survives only as this file's legacy name.)

## Overview

This curriculum has one goal: **master hiragana and read your first real Japanese words**.

By its end the learner can read all 46 hiragana characters, write them from memory, and read simple Japanese words. This is a real, meaningful milestone. Not abstract points. Not levels. Actual literacy in a new script.

The pace is slow and deliberate. No character is left behind. Everything cycles back.

---

## How Sessions Work

Each daily session runs 15-25 minutes:

- **Review** (5-10 min): SRS review of all due items from previous sessions.
- **New content** (5-10 min): One small new concept, introduced with audio + cultural context where relevant.
- **Practice** (5 min): Drawing exercise on today's characters + listening drill.

Sessions always have a clear end state. The learner knows when they're done.

How the learner moves *through* a session (auto-advance, feedback, progress) and the
very first moments of the app are specified in
[session-flow.md](./session-flow.md).

---

## Hiragana Reference

Japanese hiragana is organized in rows (called "gojuuon"). Each row shares a consonant, each column shares a vowel.

| | a | i | u | e | o |
|---|---|---|---|---|---|
| (vowels) | あ | い | う | え | お |
| k- | か | き | く | け | こ |
| s- | さ | し | す | せ | そ |
| t- | た | ち | つ | て | と |
| n- | な | に | ぬ | ね | の |
| h- | は | ひ | ふ | へ | ほ |
| m- | ま | み | む | め | も |
| y- | や | — | ゆ | — | よ |
| r- | ら | り | る | れ | ろ |
| w- | わ | — | — | — | を |
| n | ん | | | | |

Teaching order follows the rows above. Five characters at a time, row by row.

---

## Week 1: The Foundation

**Goal**: Learn the vowels + ka-row. Understand how Japanese sounds work. Draw first characters.

### Day 1 — Introduction Session

**No characters yet. Doing first, then a little context.** Day 1's opening is the
app's first-ever moment; its exact shape is specified in
[session-flow.md §2](./session-flow.md#2-the-absolute-first-thing).

Order matters here — **hook before story:**

1. **First sound (the hook).** The learner immediately *hears* a native voice say
   あ and mimics it aloud ("say it back" → self-confirm). Doing, not reading.
2. **A short beat of context** — *only after* the hook, kept to a sentence or two:
   Japanese has three scripts; the sound system is regular (mora-timed, no silent
   letters, no irregular pronunciations); **the promise** — "learn 46 sounds and you
   can read anything written in hiragana." (The deeper three-scripts story is
   dripped in later, per [session-flow.md §3](./session-flow.md#3-explaining-the-three-scripts--where-when-why).)
3. **The rest of the vowels, by ear.** Hear and mimic い う え お — still no
   characters. Optionally anchor each to a familiar sound (a as in "father", i as in
   "bee", u as in "food", e as in "pet", o as in "boat").

Ends with: "Tomorrow we start your first 5 characters. You've already *said* them
today."

---

### Day 2 — Vowels: あ い う え お

**New characters**: あ (a), い (i), う (u), え (e), お (o)

Introduction:
- These are the 5 vowels. Every other hiragana character is built on one of these sounds.
- Native audio for each, said slowly and naturally.

Exercises:
- Listening: hear the sound, identify the character (5 rounds)
- Recognition: see the character, choose the correct sound
- Drawing: trace each character with stroke order guidance. Start with い (2 strokes) and う (2 strokes) — the simplest.
- Active recall: character shown, learner types/says the sound

SRS: All 5 characters enter the spaced repetition deck tonight.

---

### Day 3 — Vowels: Reinforce + Drawing

**No new characters today.**

Content:
- Full drawing session for all 5 vowels. Stroke order shown step by step.
- "Did you know: あ comes from the kanji 安 (peace). The hiragana was simplified from it over centuries."

Exercises:
- SRS review of yesterday's 5 characters
- Drawing each character from memory (hints available)
- Listen and identify: audio plays, learner points to the correct hiragana

---

### Day 4 — K-row: か き く け こ

**New characters**: か (ka), き (ki), く (ku), け (ke), こ (ko)

Introduction:
- These combine the k sound with each of the 5 vowels.
- Note: each character is unique — there's no simple formula. They must be memorized.
- Audio for each.

Exercises:
- Review: vowels SRS deck (quick)
- New: recognition + audio for ka-row
- Drawing: く is a single stroke — a great first drawing win. Practice it.
- Active recall: see character, produce sound

---

### Day 5 — K-row: Reinforce

**No new characters.**

Exercises:
- Full SRS review: all 10 characters so far
- Drawing drill: all 10 characters, first from memory, then with hints
- Mini production: shown an audio clip, learner chooses the matching character from a grid of 10
- First "reading" moment: see the word こい (koi, as in koi fish) and realize they can read it

---

### Day 6 — First Mini-Quiz + Review

A gentle checkpoint. Not graded, not punishing. Just revealing.

Quiz covers:
- Recognize all 10 characters (read: what sound is this?)
- Match audio to character
- Draw 3 characters from memory (randomly selected)

After quiz: learner sees their first mini progress card.

> "You can read 10 hiragana characters. That's 22% of the entire hiragana set."

---

### Day 7 — Rest Day / Catch-Up

Light session. SRS review only — whatever is due. No new content.

Optional: free drawing mode where learner can practice any character they want without being tested.

---

## Week 2: Building Hiragana

**Goal**: Learn s-row, t-row, n-row. Reach the halfway point.

### Day 8 — S-row: さ し す せ そ

**New characters**: さ (sa), し (shi), す (su), せ (se), そ (so)

Note to surface to learner: し is "shi" not "si" — Japanese has a few sounds that don't map neatly to English spelling conventions.

Exercises:
- SRS review of all previous characters
- New character introduction with audio
- Drawing: そ is a flowing 1-stroke character — satisfying to draw
- Active recall

---

### Day 9 — S-row: Reinforce

- Full SRS review
- Drawing drill: s-row characters
- First compound reading: し + ま = しま (shima = island). Two characters the learner knows, forming a real word.
- "Did you know: し is derived from the kanji 之."

---

### Day 10 — T-row: た ち つ て と

**New characters**: た (ta), ち (chi), つ (tsu), て (te), と (to)

Note to surface: ち is "chi" not "ti", つ is "tsu" not "tu" — another reminder that Japanese sounds don't follow English conventions. This is why romaji can be misleading.

Exercises:
- SRS review
- New character introduction
- Drawing: て is a classic elegant character, 2 strokes
- Active recall

---

### Day 11 — T-row: Reinforce

- SRS review
- Drawing drill
- New compound reading: とり (tori = bird), うた (uta = song)
- Learner is now reading real Japanese words.

---

### Day 12 — N-row: な に ぬ ね の

**New characters**: な (na), に (ni), ぬ (nu), ね (ne), の (no)

Note: の (no) is the most common particle in Japanese — it indicates possession, like "of" or "'s". It will appear everywhere.

"Did you know: の is so iconic it appears in the Studio Ghibli logo."

Exercises:
- SRS review
- New character introduction with audio
- Drawing: の is a single flowing stroke
- Compound reading: ねこ (neko = cat), にほん (nihon = Japan)

---

### Day 13 — N-row: Reinforce

- Full SRS review: 25 characters now in the deck
- Drawing drill
- First mini-story: a two-sentence story using only known hiragana. e.g., "ねこ が いる。ねこ は かわいい。" (There is a cat. The cat is cute.) Audio provided.

---

### Day 14 — Week 2 Knowledge Snapshot

First weekly review session.

> "Week 2 complete. You can now read 25 hiragana — more than half the set. You've read your first Japanese words and your first Japanese sentence."

Quiz:
- Full recognition pass on all 25 characters
- Drawing: 5 randomly selected characters from memory
- Reading: 5 real Japanese words using only known characters

Progress card updated. Decay mechanic explained for the first time:
> "Your confidence score on each character is tracked. Characters you haven't reviewed in a while will fade — that's normal. Your weekly snapshot shows your true, tested knowledge."

---

## Week 3: Completing Hiragana

**Goal**: Learn h-row, m-row, y-row, r-row. Full hiragana within reach.

### Day 15 — H-row: は ひ ふ へ ほ

**New characters**: は (ha), ひ (hi), ふ (fu), へ (he), ほ (ho)

Note: ふ is "fu" not "hu". は when used as a grammatical particle is pronounced "wa" — surface this as an interesting quirk, not a confusing exception.

"Did you know: はじめまして (hajimemashite = nice to meet you) starts with は. You already know the first character of one of the most common phrases in Japanese."

---

### Day 16 — H-row: Reinforce

- SRS review
- Drawing drill
- Compound words: ひと (hito = person), はな (hana = flower/nose), ほし (hoshi = star)

---

### Day 17 — M-row: ま み む め も

**New characters**: ま (ma), み (mi), む (mu), め (me), も (mo)

Exercises:
- SRS review
- New characters + audio
- Drawing: む has a fun looping stroke
- Compounds: みず (mizu = water), もり (mori = forest), うみ (umi = sea)

---

### Day 18 — M-row: Reinforce

- SRS review
- Drawing drill
- Mini-story 2: slightly longer than week 2's story. Introduces a character (e.g., a boy named こうた) who sees the sea and a cat.
- Audio for the full story, learner reads along.

---

### Day 19 — Y-row + W-row: や ゆ よ わ を

**New characters**: や (ya), ゆ (yu), よ (yo), わ (wa), を (wo)

Note: を is almost exclusively used as the object particle in grammar. It's pronounced like お in modern Japanese. Surface as fascinating: a character kept alive only for grammar.

"Did you know: やまと (Yamato) is one of the oldest names for Japan itself. You can now read it."

---

### Day 20 — R-row: ら り る れ ろ

**New characters**: ら (ra), り (ri), る (ru), れ (re), ろ (ro)

Note: Japanese "r" is not like English "r" or Spanish "r" — it's a flap, closer to a soft "d" or "l". Audio is essential here.

Compounds: さくら (sakura = cherry blossom), そら (sora = sky), りんご (ringo = apple)

---

### Day 21 — The Final Character: ん

**New character**: ん (n)

ん is unique — it's the only hiragana that isn't a full syllable. It's a standalone "n" sound. It never starts a word, only appears in the middle or end.

Exercises:
- SRS review of everything
- Introduce ん with audio
- Full hiragana grid shown: learner sees every character they know

> "You now know all 46 hiragana. You can read any Japanese written in hiragana."

Big moment. Marked clearly.

---

## Week 4: First Real Words + Grammar Introduction

**Goal**: Read real Japanese words. Understand the first grammar concept. Celebrate hiragana mastery.

### Day 22 — Hiragana Mastery Drill

No new content. Consolidation day.

Full review of all 46 characters:
- Recognition drill: all 46 in random order
- Drawing drill: 10 random characters from memory
- Speed round: how fast can you read them all?

Progress card:
> "46 hiragana. All of them. You can read any phonetically written Japanese. This took most people months in a classroom. You did it in 3 weeks."

---

### Day 23 — First Real Words (Nature)

Theme: nature words. Why? Because Japanese has beautiful vocabulary here and these words appear in songs, poetry, and anime constantly.

Words introduced:
- かわ (kawa) = river
- やま (yama) = mountain
- うみ (umi) = sea
- そら (sora) = sky
- はな (hana) = flower
- もり (mori) = forest
- つき (tsuki) = moon
- ほし (hoshi) = star
- かぜ (kaze) = wind
- ゆき (yuki) = snow

Each word: hiragana, audio, image, one example sentence.

All 10 enter the SRS deck.

---

### Day 24 — First Words: Animals

- いぬ (inu) = dog
- ねこ (neko) = cat
- とり (tori) = bird
- さかな (sakana) = fish
- うま (uma) = horse
- くま (kuma) = bear
- うさぎ (usagi) = rabbit
- きつね (kitsune) = fox
- たぬき (tanuki) = raccoon dog
- さる (saru) = monkey

Cultural note: foxes (きつね) and raccoon dogs (たぬき) have deep mythological significance in Japanese folklore.

---

### Day 25 — Grammar: Sentences Work Differently Here

**First grammar introduction.**

English: Subject → Verb → Object ("I eat sushi.")
Japanese: Subject → Object → Verb ("I sushi eat.")

The verb always goes at the end. Always.

This is introduced with:
- A clear visual comparison (English sentence vs. Japanese sentence, word by word)
- Audio of both
- No pressure to produce yet — just understand

Simple example sentence introduced:
> ねこ が さかな を たべる。
> (Neko ga sakana wo taberu.)
> The cat eats fish.

Each word explained, with known hiragana pointed out.

---

### Day 26 — Grammar Practice + First Sentences

Learner practices rearranging words into correct Japanese order. Not typing Japanese yet — just arranging word blocks.

3-4 simple sentences using vocabulary from days 23-24:
- The dog sees the moon.
- The cat is in the forest.
- The bird flies in the sky.

Each presented in Japanese, learner confirms they understand meaning.

---

### Day 27 — Review + Mini-Story 3

Full SRS review of all 46 hiragana + 20 vocabulary words.

Mini-story 3: a short story using known vocabulary and the new sentence structure. Audio + hiragana text. Learner reads along, then answers 3 simple comprehension questions.

---

### Day 28 — Month 1 Final Assessment

The big milestone.

Assessment covers:
- Read all 46 hiragana (recognition + drawing)
- Read and understand 15 vocabulary words
- Read 3 simple sentences and explain their meaning
- Draw 5 characters from memory (random selection)

After assessment, the monthly knowledge card appears:

> "Month 1 complete.
> You can read all 46 hiragana.
> You know 20 Japanese words.
> You can read sentences like: ねこ が うみ を みる。(The cat looks at the sea.)
> You've learned more Japanese in one month than most people pick up in a semester."

---

## What Comes Next (Month 2 Preview)

Month 2 introduces:
- Katakana (same sounds as hiragana, different characters — much faster to learn now)
- First 50 high-frequency vocabulary words (numbers, colors, common verbs)
- Verb conjugation basics (present tense positive and negative)
- First kanji: 一二三四五 (the numbers 1-5 — simple strokes, high utility)
- Listening comprehension with short native-speaker audio clips

The hiragana foundation makes all of this dramatically easier. Month 2 is where the language starts to feel real.

<!-- ARCHIVE-SOURCE-END: docs/curriculum/month-1.md -->

---

<!-- ARCHIVE-SOURCE-START: docs/curriculum/overview.md -->

# Curriculum Overview

This document explains *how* Michi sequences what it teaches and the principles
behind that sequencing. The concrete hiragana session sequence lives in
[month-1.md](./month-1.md); how content is represented as data lives in
[content-model.md](./content-model.md).

The curriculum is the product. The app is the delivery mechanism. Getting the
sequence right matters more than any individual feature.

---

## Sequencing Philosophy

Michi's curriculum follows a small number of rules, all downstream of the
[pedagogy](../product/pedagogy.md) and [principles](../product/principles.md):

1. **Scripts before everything, in order.** Hiragana fully, then katakana, then
   kanji gradually embedded in vocabulary. You cannot read real Japanese without the
   kana, so nothing else comes first.

2. **Small steps, no character left behind.** New material arrives in small,
   digestible units (typically five kana at a time, a row of the gojūon). Pace is
   deliberately slow; mastery beats coverage.

3. **Introduce, then reinforce.** New-content days alternate with
   reinforce-and-consolidate days. Nothing is introduced and abandoned.

4. **Everything cycles back.** The moment an item is introduced it enters the SRS
   and returns on its own schedule forever. See [srs-engine.md](../architecture/srs-engine.md).

5. **Read real words as early as possible.** As soon as the learner knows enough
   kana to spell a real word, they read one. The first "I can actually read this"
   moment is engineered to arrive fast (by the second station — こい, once the K row
   is known).

6. **Grammar arrives when it unlocks comprehension, lightly.** Explicit grammar is
   introduced only when it lets the learner understand more — clearly, briefly, in
   context — never as isolated drills.

7. **Cultural context is earned, not front-loaded.** History and culture are dripped
   in as "did you know" moments timed to relevance (e.g., katakana's monk origins
   when katakana is introduced), not lectured upfront.

8. **Every session completes.** Each day is a bounded 15–25 minute session with a
   clear end state. See [P7](../product/principles.md#p7--sessions-always-complete).

---

## The Session Shape

Every daily session follows the same three-part rhythm:

1. **Review (5–10 min)** — SRS review of all items due today. This always comes
   first: retention is the foundation.
2. **New content (5–10 min)** — at most one small new concept, introduced with audio
   and, where relevant, cultural context.
3. **Practice (5 min)** — drawing, listening, and/or production on the new material.

Consolidation days drop step 2 and expand steps 1 and 3.

How the learner moves *through* these steps (auto-advance, feedback, in-session
progress), what the very first moment of the app is, and where the three scripts get
explained are all specified in [session-flow.md](./session-flow.md).

---

## Progression Map

The long-range arc. Only the hiragana curriculum is fully specified today (depth before breadth,
[P10](../product/principles.md#p10--depth-before-breadth)).

| Phase | Focus | Status |
|---|---|---|
| **Month 1** | Full hiragana mastery + first ~20 words + first grammar (SOV) | ✅ Specified — [month-1.md](./month-1.md) |
| **Month 2** | Katakana, ~50 high-frequency words, present-tense verbs, first kanji (一–五), listening | 🔜 Outlined (preview in month-1.md) |
| **Month 3+** | Growing kanji, particles in depth, longer comprehension, production | 📋 Planned |

Later months are intentionally *not* over-specified yet. We author each phase in
depth only once the previous one is proven in real use.

---

## Content Themes

Vocabulary is grouped into themes chosen for **relevance and emotional pull**, not
textbook convention:

- **Nature** (かわ, やま, うみ, そら…) — appears constantly in songs, poetry, anime;
  beautiful and motivating as a first set.
- **Animals** (いぬ, ねこ, とり…) — concrete, imageable, folklore-rich (きつね, たぬき).
- Later themes follow the learner's interests (anime, games, music) wherever
  possible — real hooks, not filler. See
  [vision §2](../product/vision.md#2-the-origin).

---

## How the Curriculum Meets the SRS

The curriculum decides *what is introduced when*. The SRS decides *when each
introduced item returns*. They interlock:

- Authored lessons **seed** items into the SRS deck on their introduction day.
- From then on the SRS **owns scheduling** — the curriculum never re-schedules an
  item manually.
- A day's "Review" segment is simply *"all items currently due,"* regardless of
  which lesson introduced them.

This separation keeps authored content and scheduling logic independent, which is
also how they're modeled in code — see [content-model.md](./content-model.md) and
[data-model.md](../architecture/data-model.md).

---

## Authoring Principles

For anyone writing new curriculum content:

- **Audio-first for anything spoken.** No new sound is introduced without correct
  audio. Pitch accent matters. See [audio.md](../design/audio.md).
- **Show the correct form.** Character prompts use the teaching typeface with correct
  stroke order. See [typography.md](../design/typography.md).
- **Prefer real words and sentences.** If an example sentence feels like textbook
  filler, rewrite it until it feels real.
- **One new thing at a time.** Resist cramming. A session teaches at most one new
  concept well.
- **Write the "done" state.** Every lesson must have an unambiguous completion.

<!-- ARCHIVE-SOURCE-END: docs/curriculum/overview.md -->

---

<!-- ARCHIVE-SOURCE-START: docs/curriculum/session-flow.md -->

# Session Flow & The First Experience

How a learner actually moves through Michi, minute to minute: how one exercise
advances to the next, what the very first thing they do is, and where the "what are
the three Japanese scripts?" explanations live. This is the *lived experience* layer
that sits between the [curriculum sequencing](./overview.md) (what's taught when) and
the eventual UI.

> **Status:** Accepted design. Interaction decisions here are settled; exact visuals
> are deferred (UI design is out of scope for now).

---

## 1. The Session Interaction Model

### The shape of a session (recap)

Every session is the three-part rhythm from [overview.md](./overview.md#the-session-shape):
**Review → New content → Practice**, 15–25 minutes, always with a clear end state
([P7](../product/principles.md#p7--sessions-always-complete)). This document is about
how you move *within* that — task to task.

### Auto-advance is the default

A session is an **ordered queue of steps**. Most steps are exercises; a few are
*read-this* steps (a new character introduction, a cultural note). The learner does
**not** tap "Next" after every drill.

- **Exercise steps → auto-advance.** Complete a task → brief feedback → it flows
  automatically to the next step. No extra tap. This keeps momentum and respects the
  learner's attention.
- **Read-this steps → tap to continue.** When a step contains something to *read or
  absorb* — a new character's introduction, a "did you know" note, a grammar
  explanation — it waits for an explicit **Continue**. Reading should never be
  yanked away.

```
[====------] 4/10          ← session progress, always visible

   Hear the sound. Which kana?
     ▶ (audio)
   [ あ ]   [ い ]   [ う ]

   ✓  → (auto-advances after brief feedback)


  vs. a read-this step:

   New character:  か  (ka)
   ...introduction, stroke-order animation...

        [ Continue → ]     ← waits for the learner
```

Rationale: this is the fewest-taps model that still never rushes the moments that
deserve dwelling. It reads as modern and calm rather than either frantic or tedious.

### Feedback and correctness

- **Correct** → a brief, quiet affirmation, then auto-advance. No confetti storm; the
  reward is progress, not spectacle ([P6](../product/principles.md#p6--respect-the-learner)).
- **Incorrect** → **never punish, always teach.** Show the correct answer, let the
  learner see/hear it, and — for production/recall items — offer an immediate retry so
  the last thing they do is the *correct* action. A miss lowers that item's SRS grade
  (it'll come back sooner); it does not end anything or cost a "life." There are no
  hearts/lives in Michi ([P1](../product/principles.md#p1--learning-over-engagement),
  [data-model.md](../architecture/data-model.md) — no engagement fields).

### Progress within a session

A **progress indicator** (e.g. `4/10` or a bar) is always visible so the end is
always in sight — this is what makes a session feel *completable*
([P7](../product/principles.md#p7--sessions-always-complete)). At the end: an
unambiguous **"Today's session complete"** state, plus (where relevant) the honest
capability line ("You can read 10 hiragana").

### Pacing control

Auto-advance sets the default rhythm, but the learner is never trapped:
- Audio can be **replayed** on any step.
- A **back** affordance lets them revisit the previous step.
- Nothing is time-pressured. Mora-timing drills care about the *audio's* timing, never
  the learner's reaction speed.

### Why not the alternatives (for the record)

- *Tap "Next" on every step* — calm, but adds a tap per drill and drags on long review
  segments. We reserve the explicit tap for read-this steps only.
- *Swipe/keyboard card-stack (Anki-style)* — fast for power users, but swipe leans on a
  hover-adjacent gesture (awkward under the [no-hover rule](../architecture/tech-stack.md))
  and feels less like a structured lesson. Not the default; a keyboard shortcut for
  advancing on desktop is a fine *addition* later.

---

## 2. The Absolute First Thing

**The learner's first action is to _hear and mimic a real Japanese sound_ — not to
read anything.**

On first open, before any character, any menu, any lecture:

```
        ▶ (native voice: "あ")

   Say it back:  あ

   Once you know a Japanese sound,
   you know it forever — no silent
   letters, no irregular spellings.

        [ I said it ]
```

### Why this is first

- **Doing, not reading.** The product is *acquiring a language*; the first moment
  should feel like doing it, immediately. A hook beats an intro.
- **Audio-first is forced, correctly.** Japanese lives or dies on correct sound
  (pitch accent — see [audio.md](../design/audio.md)); starting with the ear, before
  the eye, is the right encoding order and is *required* by the
  [no-romaji rule](../product/principles.md#p2--no-romaji-ever-as-a-reading-aid) — there
  is no Latin lifeline, so the sound must come from audio.
- **It earns the story.** The "why Japanese / three scripts" narrative lands far
  better *after* the learner has personally made a Japanese sound than as a cold
  opening. This is [pedagogy.md](../product/pedagogy.md)'s "earn it, don't front-load"
  applied to the very first minute.
- **Output from second zero.** Saying it back is production on turn one
  ([Output Hypothesis](../product/pedagogy.md); [P3](../product/principles.md#p3--production-over-recognition)).

> Note: "say it back" is, at MVP, a prompt to speak aloud with a self-confirm
> ("I said it") — we are **not** building speech recognition now
> ([vision §4](../product/vision.md#4-what-michi-is-not)). The act of vocalizing is
> what matters; grading it is a possible later layer.

### What immediately follows

The first sound (あ) flows into the rest of the vowels as *hearing and mimicking*,
still no characters. Characters attach to these now-familiar sounds on the next day —
exactly the existing Day 1 → Day 2 arc in [month-1.md](./month-1.md), now with a
doing-first opening instead of a reading-first one.

---

## 3. Explaining the Three Scripts — Where, When, Why

Japanese has three writing systems (hiragana, katakana, kanji), and *that* fact plus
its history is genuinely fascinating and motivating. But it is **context, not a
prerequisite.** The policy:

> **Drip each script's explanation in at the moment it first becomes relevant — never
> as an upfront lecture.** Cultural/structural context is *earned*, timed to when the
> learner is about to touch the thing being explained.

This follows directly from [pedagogy.md](../product/pedagogy.md) ("Cultural Context:
Earn It, Don't Front-Load It") and keeps every session
[completable and focused](../product/principles.md#p7--sessions-always-complete).

### The placement plan

| What's explained | When / where it appears | Why there |
|---|---|---|
| **"Japanese has three scripts" — the big picture** | A short beat in the **first session**, *after* the first sound-mimic hook — not before it. Kept to a couple of sentences + the promise: "learn 46 sounds and you can read anything written in hiragana." | The learner has just *made* a Japanese sound; now a tiny bit of map-of-the-territory motivates the road ahead without front-loading. |
| **What hiragana is, deeply** | Woven across the **first track** as characters are learned — plus the origin drip ("invented in the Heian period; あ comes from 安") at the **vowels-reinforce beat**, when it adds meaning rather than noise. | You understand hiragana by *learning* it; the history lands best once a few characters feel real. |
| **What katakana is** | at the **start of the katakana province** — right as it's introduced. Includes its monk-origin "did you know" and the key idea: *same sounds as hiragana, different shapes, used for loanwords/emphasis.* | Explaining katakana before the learner needs it is pure front-loading. At introduction, it's instantly concrete ("you already know these sounds"). |
| **What kanji is** | When the **first kanji** appears (一二三四五), embedded in real vocabulary. | Kanji is only graspable in context. Introduced as "borrowed from China, then Japan built hiragana/katakana on top" *at the moment a kanji is on screen.* |
| **The full origin story** (kanji → kana invented on top; why three scripts coexist) | Assembled gradually across the drips above; optionally revisited as one satisfying recap once all three have been met (once kanji have begun). | By then it's a story about things the learner *knows*, not an abstract lecture — exploration, not homework. |

### These drips have a persistent home too: each is saved into the **codex**, and some
also surface as optional **book stops** beside the world-map path — a browsable place
to re-read the "how Japanese is built" lore without ever front-loading it. Timing here
still governs *when* a drip first appears; the codex only records what's already been
met. See [station-map.md §3](./station-map.md#3-book-stops--the-codex--the-lore-without-front-loading).

### The rule for any script/culture explanation

Before adding one, ask: *is the learner about to touch the thing this explains?* If
yes, it's a well-timed drip. If it's "useful background they might need someday," it's
front-loading — cut it or move it to where it becomes relevant. Cultural notes are
**read-this steps** (§1): they get a Continue, never a drill, and never block
progress.

---

## Related

- [overview.md](./overview.md) — session shape and sequencing philosophy
- [month-1.md](./month-1.md) — the concrete day-by-day plan this flow runs on
- [content-model.md](./content-model.md) — lessons as ordered exercise queues; the
  `culturalNotes` and read-this step types
- [pedagogy.md](../product/pedagogy.md) — earn-it-don't-front-load; audio-first
- [P2 no-romaji](../product/principles.md#p2--no-romaji-ever-as-a-reading-aid),
  [P6 respect](../product/principles.md#p6--respect-the-learner),
  [P7 sessions complete](../product/principles.md#p7--sessions-always-complete)

<!-- ARCHIVE-SOURCE-END: docs/curriculum/session-flow.md -->

---

<!-- ARCHIVE-SOURCE-START: docs/curriculum/station-map.md -->

# The Station Map — How the Path Is Shaped

The bridge between the **curriculum** ([month-1.md](./month-1.md), authored as an
ordered sequence of sessions) and the **world map** ([world-map.md](./world-map.md),
organized by *station*). It answers three things:

1. How that session sequence collapses into a walkable path of stations, tracks and provinces —
   a **self-paced course, no calendar**.
2. The pedagogical shape a station always has.
3. Where the gradual "how Japanese is built" lore lives — the **book stops** and the
   **codex** — without front-loading it.

Everything here is downstream of the [pedagogy](../product/pedagogy.md) and
[principles](../product/principles.md); this doc adds no new teaching philosophy, only
the *structure* that curriculum authors and the map both depend on.

> For the **flat, authored list of every station and its exact contents** (kana, words,
> drills, drips, seeds, end-states, book stops), see the companion roster
> **[stations.md](./stations.md)**. This doc explains the *shape*; that one is the *list*.

> **Status:** Draft / proposed. The station shape and groupings here are settled; the
> per-station content is finalized as it's authored ([roadmap](../roadmap.md) Phase 2).
> The book stops after stations 1, 2 and 3 and the Codex slice are implemented; later
> entries are authored as their stations become relevant. Note the cadence is **relevance,
> not one per station**: a station gets a book stop when it has real depth behind it, and
> station 4 (a consolidation checkpoint) deliberately has none.

---

## 1. Sessions → Stations → Tracks → Provinces

The course is **self-paced — Course → Provinces → Tracks → Stations, no calendar.** No months, no
weeks, no daily deadlines; a learner advances when they've earned a station, however
long it takes.

The source content ([month-1.md](./month-1.md)) is authored as an ordered sequence of
**sessions** (sittings). The map shows **stations**. These are **not** one-to-one: a
station is a *meaningful unit of new capability*, which usually spans an **introduce
session + its reinforce session(s)**. Reinforce/rest/quiz sittings are *inside* a
station, not separate stops — they're the sessions you do to clear it.

> **One station = one [Lesson](./content-model.md#lesson) = one clear new capability.**
> The number of *sessions* to clear a station varies (a new-row station is ~2 sittings:
> introduce + reinforce). Each circle is a real "I can now do X," never a calendar tick.

The **full station roster** — every station's exact kana/vocab/grammar, drills, drips,
seeds and end-state — is the companion doc **[stations.md](./stations.md)**. It is the
authoritative list; this section only explains the *principle* by which sessions group
into stations, stations into tracks, and tracks into provinces.

The current structure (matches `src/app/worldmap.ts` and [stations.md](./stations.md)):

| Track | Stations | Covers |
|---|---|---|
| 1 · First sounds | 1–3 | vowels → K row → first look back |
| 2 · Reading on | 4–7 | S / T / N rows → halfway snapshot |
| 3 · Completing the kana | 8–11 | H / M / Y-W / R rows + ん (all 46 kana) |
| 4 · First words & grammar | 12–16 | mastery → nature/animal words → first sentence → hiragana complete |

Beyond full hiragana, the same row→station pattern continues (katakana, first kanji,
…) — outlined at the end of [stations.md](./stations.md), placed in code as authored.

---

## 2. The shape of a station

Every station, whatever it teaches, follows the same pedagogical arc — this **is** the
"Michi way" applied at station scale ([pedagogy §Core Principles](../product/pedagogy.md)):

1. **Hear it first.** New sound(s) arrive by ear, native audio, before any symbol —
   audio-first is required by [P2 no-romaji](../product/principles.md#p2--no-romaji-ever-as-a-reading-aid)
   and is the right encoding order.
2. **Attach the symbol.** The character is introduced against the now-familiar sound,
   with correct **stroke order from the start** (motor channel, [pedagogy §Motor Memory]).
3. **Produce, don't just recognize.** Drilling biases to active recall and drawing,
   not multiple choice ([P3](../product/principles.md#p3--production-over-recognition)).
   Simple-stroke characters are introduced first as early drawing wins (く, し, つ).
4. **Use it for real, fast.** The moment enough kana exist to spell a real word, the
   learner reads one — the "I can actually read this" moment is engineered early
   (こい by Station 2). Compounds → words → a first sentence.
5. **It enters the SRS and never leaves.** Everything introduced seeds the deck and
   cycles back forever ([P8](../product/principles.md#p8--everything-lives-in-the-srs)).
6. **The station completes.** A clear "you can now read the K row" end state; the map
   circle flips to *done*. No open-ended stops ([P7](../product/principles.md#p7--sessions-always-complete)).

A station is *cleared* by completing its underlying session(s) — an introduce session
plus its reinforce session(s). The **within-session** flow (auto-advance, read-this
beats, feedback) is specified in [session-flow.md](./session-flow.md); this doc only
fixes what a station *is* and the order stations come in.

### Why stations are grouped by row, five at a time

Straight from [overview.md](./overview.md#sequencing-philosophy): scripts before
everything, **five kana at a time (a gojūon row)**, introduce-then-reinforce, nothing
abandoned, real words as early as possible. The station map is that philosophy made
visible — each row is a station, each cluster of rows a track, the whole gojūon a
journey you can see the end of.

---

## 3. Book stops & the codex — the lore, without front-loading

Japanese's structure and origin (three scripts; kana built on top of borrowed kanji;
mora-timing; how it differs from a Latin alphabet) is **genuinely motivating context —
but never a prerequisite.** [session-flow.md §3](./session-flow.md#3-explaining-the-three-scripts--where-when-why)
already fixes the *timing* of these explanations (drip each in when its topic becomes
relevant). What it did not have was a *home*. Book stops + the codex are that home.

### Book stops (on the map)

Small **book markers sit beside the path between stations** — visually distinct from
station circles (a book/scroll glyph, not a numbered disc). They are **pure
supplementary reading**:

- **Never required, never drilled, never gate a station.** You can walk straight past
  every one and still learn Japanese ([P1 learning over engagement](../product/principles.md#p1--learning-over-engagement),
  [P7](../product/principles.md#p7--sessions-always-complete)). They add no exercises,
  cost nothing to skip.
- **Therefore the station must carry the essentials itself.** Because a book stop is
  optional, nothing a learner genuinely needs may live *only* in one. Every station
  introduces its own new facts on unskippable slides — a short takeaway line per idea —
  and the book stop after it *expands* on those ideas for whoever wants the depth. The
  test: if a learner skipped every book stop in the course, they should still have been
  told everything required to read Japanese. A book stop that would fail that test is
  carrying material that belongs back in the station.
- **Never repeat the station in the book stop.** The station says what a thing is; the
  book stop says where it came from, why it is that way, or what it connects to. If the
  book stop restates the station, it has no reason to exist.
- **Unlock on relevance, per the drip timing.** A book stop appears only once its topic
  has become relevant — the same rule as the inline drips. Example placements, reusing
  session-flow's table:

  | Book stop | Appears after | Reads about |
  |---|---|---|
  | *Three scripts, one language* | Station 1 | **Why** the three scripts exist: Chinese characters adapted to a language they didn't fit; cursive whole-forms became hiragana, character fragments became katakana; why kanji was kept rather than dropped. Station 1 already told the learner *what* each script is — this book stop only goes deeper |
  | *Five sounds that hold still* | Station 2 | The **mora** idea (borrowed words split into even one-symbol sounds; why romaji misleads on grouping and stress), then **why** the vowels never shifting is remarkable: English spells five sounds with one letter a (cat/car/cake/about/many) because its spelling froze while pronunciation moved; what the stability buys you (pronounce an unseen word correctly); long vowels change length, not quality |
  | *Rows, and the table they sit in* | Station 3 | A consonant run across the five vowels **is** a row, so 46 characters are nine rows of five; the rows stack into the gojūon grid; why the vowel row was worth its own station; the four or five cells (し, ち, つ, ふ) that bend |
  | *Where the letters came from* | early Track 2 | Hiragana was invented in the Heian period, simplified from kanji (あ ← 安) — the shapes have ancestors |
  | *A different kind of alphabet* | when katakana / kanji arrive (the katakana and kanji provinces) | How Japanese writing differs from a Latin alphabet; what katakana and kanji each do |

- **Tone: exploration, not homework.** Opening one is "opening a book" — a calm reading
  surface, not a lesson. It matches the quiet, museum-like [DESIGN](../design/DESIGN.md)
  feel; it must never look like a quest objective.

### The codex (browsable anytime)

Every lore drip — whether met **inline** during a session (the read-this "did you
know" beats session-flow already defines) **or** in a **book stop** — is saved into a
**codex**: a browsable collection the learner can revisit from the map at any time.

- The codex makes the lore **collectible and re-readable** without changing the
  pedagogical *timing*: an entry only appears in the codex once its moment has passed,
  so the codex never front-loads. It's a record of what you've encountered, not a
  syllabus to read ahead.
- This is the one place all the "how the language is built / where it came from / how
  it's different" content lives as a coherent, growing reference — decoupled from the
  linear path, exactly the supplementary layer you'd want but never need.

### What book stops / codex are NOT

- Not required content, not SRS items, not graded — nothing here touches capability
  counts ([P5 honest progress](../product/principles.md#p5--tell-the-truth-about-memory)).
- Not a front-loaded culture lecture — timing is still "earn it," governed by
  [session-flow.md §3](./session-flow.md).
- Not a second progress system — no completion pressure. A learner who reads zero book
  stops is a fully successful learner.

---

## Open questions

- **Station derivation.** Stations are hand-listed here and in `worldmap.ts`; once
  lessons are authored data (Phase 2) they should be *generated* from lessons so this
  map and the code stay in lockstep. Tracked in [world-map.md](./world-map.md#open-edges).
- **Track boundaries beyond hiragana.** The row→station rule is clear; the exact
  track *groupings* past Track 4 (how many stations each) are finalized as that
  curriculum is authored. **Province** boundaries are settled — one script or domain per province
  (Hiragana, Katakana, First kanji, Words & sentences), which is what made the tier safe
  to declare before its content exists. See
  [ADR 0006](../decisions/0006-provinces-and-tracks.md).
- **Codex authoring format.** The lore entries are content; whether they live with
  curriculum content or separately is an implementation decision for Phase 2, alongside
  the [content on-disk format](../roadmap.md).

<!-- ARCHIVE-SOURCE-END: docs/curriculum/station-map.md -->

---

<!-- ARCHIVE-SOURCE-START: docs/curriculum/stations.md -->

# Stations — The Full Roster

The authoritative, station-by-station list of what every stop on the path contains.
Where [station-map.md](./station-map.md) explains *how* sessions collapse into stations
and *why*, this doc is the flat roster authors build from: each station's kana/
vocabulary/grammar, what the learner reads, the drills, the cultural drip, SRS seeds,
end-state, and any book stop after it.

The course is **self-paced: Course → Provinces → Tracks → Stations, no calendar** — no months, no
weeks, no daily deadlines. A learner advances a station when they've earned it, however
long that takes. The source content in [month-1.md](./month-1.md) is authored as an
ordered sequence of *sessions* (sittings); this roster reorganizes that sequence into
the station units the [world map](./world-map.md) shows. ("Sessions N–M" below points at
that ordered content, not a date.) Drill types are from
[content-model.md](./content-model.md#exercise); the per-station arc (hear → symbol →
produce → use → SRS → complete) is from [station-map.md §2](./station-map.md#2-the-shape-of-a-station).

> **Status:** Draft / proposed. **Stations 1–17 (through full hiragana) are specced in
> full below; later stations are a one-line outline** to be filled as those curricula
> are authored ([roadmap](../roadmap.md) Phase 2). Kana readings shown in parentheses
> are for authoring only — **never rendered to the learner**
> ([P2](../product/principles.md#p2--no-romaji-ever-as-a-reading-aid)).

> **Code status:** `src/app/worldmap.ts` matches this roster (4 tracks, 17 stations,
> station ids and titles as below). When stations become authored data they should be
> *derived* from lessons so code and content can't drift — see
> [world-map.md → Open edges](./world-map.md#open-edges).

---

## Legend

Each station entry uses these fields:

- **Track / n** — which track, and the global station number.
- **Teaches** — the new items introduced (seed the SRS here).
- **Reads** — real words/sentences the learner reads at this station (only from
  already-known kana — the "I can actually read this" moments).
- **Drills** — the exercise types run ([content-model.md](./content-model.md#exercise)),
  biased to production ([P3](../product/principles.md#p3--production-over-recognition)).
- **Drip** — the timed cultural/structural note, if any (a read-this beat, and it lands
  in the [codex](./station-map.md#the-codex-browsable-anytime)).
- **Sessions** — which ordered sessions in [month-1.md](./month-1.md) this station covers (a session = one sitting, not a date).
- **Seeds** — what enters the SRS deck on completion.
- **End-state** — the clear "you can now…" the station certifies.
- **📖 Book stop after** — optional lore beside the path after this station, if any
  ([station-map.md §3](./station-map.md#3-book-stops--the-codex--the-lore-without-front-loading)).

---

# Track 1 — First sounds

*Orientation, then sound before symbol: what the writing system is, the vowels, the
first consonant row, and the first real word.*

### Station 1 · The three scripts
- **Teaches:** no kana and no SRS items — an **orientation stop**. What hiragana,
  katakana and kanji are, what each is for, and why romaji is named but set aside
  ([P2](../product/principles.md#p2--no-romaji-ever-as-a-reading-aid)).
- **Reads:** **one** example word per script, broken into syllables and tappable for
  audio — **わたし** (I) for hiragana; **カメラ** (camera) for katakana; **山** (mountain)
  for kanji, with its kana reading beneath. The learner is not asked to retain any of
  them. One idea per slide; anything deeper waits for the book stop.
- **Romaji step:** names romaji, sets it aside, and makes *one* further point: a
  Japanese word splits into small even sounds, one symbol each. Shown with **すし**
  (su-shi), then **つなみ** and **からおけ**, tappable syllable by syllable. Written in
  hiragana rather than 津波/カラオケ because hiragana is the only script the learner is
  about to meet; the book stop shows カラオケ in its own script and carries the rest.
- **Drills:** none. Every step is a read-this beat
  ([session-flow.md §1](./session-flow.md)).
- **Drip:** each script's blurb carries its one essential fact, so the learner cannot
  miss it even if they skip the book stop — a kana always sounds the same; katakana
  signals a borrowed word; a kanji shows meaning, not pronunciation.
- **Sessions:** — (new; precedes session 1).
- **Seeds:** — (nothing enters the SRS).
- **Closing grid:** the station ends on the **gojūon table**, the whole 46-kana set laid
  out in rows of five as a ruled grid. **No row is filled in**: the learner has not
  learned a single kana yet, so nothing may be shown as earned. The vowel row is only
  *outlined* (tinted cells, ink border), marking where they start, and no count is
  shown: at this station the grid is the road ahead, not a score. The slide is **two
  columns** (table left, copy right) so all 46 fit on screen at once without scrolling.
  (Every kana station from here closes on the same grid, each one filling in another
  row — see stations 2 and 3.)
- **End-state:** knows what the three scripts are and why the course starts with
  hiragana, and specifically with its five vowels.
- **📖 Book stop after:** *"Three scripts, one language"* — **expands** on this station
  rather than repeating it: how Chinese characters were adapted to a language they did
  not fit, how cursive whole-forms became hiragana while character fragments became
  katakana (and why that makes one round and the other angular), why Japanese kept
  kanji instead of simplifying to kana alone — capped with one sentence
  (**私はコーヒーを飲みます**) showing all three scripts sharing the work. The **mora**
  material (loanwords splitting into even one-symbol sounds, why romaji misleads) moved
  to the station-2 book stop, where the learner has actual kana to hang it on.

### Station 2 · First sounds
- **Teaches:** the five vowel **sounds** by ear, then the five vowel **characters** —
  あ (a), い (i), う (u), え (e), お (o).
- **Reads:** — (no words yet).
- **Drills:** an **open-book pairing beat first** (whole set on screen, one sound at a
  time, tap the match; nothing scored, a miss only replays, the sound is named after two
  misses). Then `recognize-sound` (kana → pick sound), `listen-identify` (audio → pick
  kana), final mixed recognition, then hear-and-mimic rehearsal (self-confirm, no speech
  recognition). Drawing begins later with proper stroke guidance.
- **Why that order:** teaching gives one exposure per kana, so going straight into a
  graded pick is guessing, not retrieval. The pairing beat builds the sound-shape link
  while both are visible; and `recognize-sound` precedes `listen-identify` because the
  glyph stays on screen in the former and vanishes in the latter.
- **Drip:** **new information, not a repeat of station 1** — Japanese has exactly five
  vowels and they never shift (unlike English "a" in cat/car/cake), and あいうえお is the
  ordering Japanese itself uses for dictionaries and lists, the way A-B-C works in
  English. The remaining 41 kana are rows built on these five.
- **Sessions:** 1–3.
- **Closing grid:** the gojūon table again, and this time the **vowel row animates into
  it** cell by cell, then stays filled. Caption: "5 of 46 hiragana." The station-1 slide
  promised the shape of the set; this one puts the learner's first row in it.
- **Seeds:** あ い う え お (5 kana).
- **End-state:** hear, say, and recognize the five vowels; 5 of 46.
- **📖 Book stop after:** *"Five sounds that hold still"* — **expands** on this station's
  drip rather than repeating it. Opens with the **mora** idea (loanwords English already
  borrowed — tsunami, karaoke, origami, sudoku, emoji — splitting into even one-symbol
  sounds, which is *why* 46 characters suffice, and why romaji misleads on grouping and
  stress); this material lives here rather than at station 1 because the learner now has
  kana to hang it on, and karaoke's o and e *are* two of the vowels just learned. Then:
  the station *asserts* the vowels never shift, so this shows **why that is remarkable**
  (English "a" in cat/car/cake/about/many is one letter for five sounds, because its
  spelling froze while pronunciation moved), what the stability **buys** the learner (you
  can pronounce an unseen Japanese word correctly, which colonel/yacht/though will never
  let you do in English), and one honest caveat: long vowels change a word's length, not
  the vowel's quality.

### Station 3 · The K row
- **Teaches:** か (ka), き (ki), く (ku), け (ke), こ (ko) — the k-sound across the five
  vowels. Note for the learner: no formula, each is memorized.
- **Reads:** **こい** (koi) — the first real word; the "I can actually read this" moment.
  Shown as bare kana with no `say` labels: this is the one beat that asks the learner to
  decode unaided, so Latin letters underneath would be the crutch they read instead
  ([P2](../product/principles.md#p2--no-romaji-ever-as-a-reading-aid)). Tapping plays it
  kana by kana and reveals the meaning.
- **Drills:** a vowel review opens the station from what the learner already has. It is
  **announced first** ("But first, a quick refresher", showing あいうえお): a station
  billed as the k row that silently drills あいうえお reads as a bug, not as revision.
  Then the **open-book pairing beat** (see station 2 — it matters more here, since
  かきくけこ are five near-neighbour sounds sharing one consonant with no prior hook,
  where あいうえお at least map onto vowels an English speaker already owns), then
  `recognize-sound` → `listen-identify` → the mixed capstone, and hear-and-mimic
  rehearsal. `draw-character` featuring く (single stroke — a great first
  drawing win) is still the trace placeholder, pending stroke data
  ([ADR-0004](../decisions/0004-stroke-data-source.md)).
- **Drip:** one idea, and one the intro did not already state: **ten kana is enough for
  real words**. ("Five vowels with a k in front" is the intro's line, so a context slide
  repeating it wastes the slide.) It sits immediately before こい so the promise is proved
  at once. No forward references: the learner has met no other row and never seen the
  gojūon table, so naming さしすせそ or the grid *in the station* explains nothing. That is
  the book stop's job; the station's job is the drills.
- **Sessions:** 4–5.
- **Closing grid:** the gojūon table with the vowel row already filled and the **k row
  animating in beneath it**. Caption: "10 of 46 hiragana." Two filled rows is the first
  point at which the grid shows a *pattern* rather than a single line, so the copy names
  it: every row below works the same way, one consonant crossed with あいうえお. The row
  structure is stated here because the learner can now see it; the word *gojūon* and the
  bending cells stay in the book stop.
- **Seeds:** か き く け こ (5 kana) → 10 total.
- **End-state:** read the K row; read your first Japanese word.
- **📖 Book stop after:** *"Rows, and the table they sit in"* — **expands** on this
  station: that a consonant run across the five vowels *is* a row (so 46 characters are
  nine rows of five, not 46 unrelated shapes); that the rows stack into the gojūon grid,
  vowels as columns; why the vowel row was worth a whole station (it is the axis, so a
  sloppy vowel repeats 41 times); and a warning that four or five cells (し, ち, つ, ふ)
  bend, though the k row has none of them.

### Station 4 · A first look back
- **Teaches:** no new kana — the first gentle checkpoint + consolidation of all 10.
- **Reads:** re-reads こい; free reading of any 2-kana combo the learner can form.
- **Drills:** gentle mini-quiz (recognize all 10; match audio→kana; draw 3 from memory —
  not graded, not punishing); full SRS review of the 10.
- **Drip:** the first honest **progress card**: "You can read 10 hiragana — 22% of the
  set." (frames capability, not points — [P5](../product/principles.md#p5--tell-the-truth-about-memory)).
- **Sessions:** 6–7 (the reinforce/rest sitting folds in as SRS-only).
- **Seeds:** — (consolidation).
- **End-state:** confidently read/write the vowels + k-row; a real checkpoint met.
- **📖 Book stop after:** *"Where the letters came from"* — hiragana was simplified from
  kanji in the Heian period; the shapes have ancestors (あ ← 安).

> **Note:** Track 1 is **4 stations**: the orientation stop plus the
> vowels-through-K-row content. (The code matches this.)
> Real words, sentences, and listening are *capabilities threaded through later
> stations*, not separate early stops.

---

# Track 2 — Reading on

*The rest of the core gojūon rows; real words and the first sentence accumulate.*

### Station 5 · The S row
- **Teaches:** さ (sa), し (**shi**, not "si"), す (su), せ (se), そ (so).
- **Reads:** **しま** (shima = island) — first compound from two known kana.
- **Drills:** full SRS review; `listen-identify` + `recognize-sound` on the s-row;
  `draw-character` featuring そ (flowing 1-stroke); `recognize-sound` recall.
- **Drip:** し is "shi" — Japanese has sounds that don't map neatly to English spelling
  (this is *why romaji misleads*). Origin note: し derived from 之.
- **Sessions:** 8–9.
- **Seeds:** さ し す せ そ → 15 total.
- **End-state:** read the S row; read しま.
- **📖 Book stop after:** —

### Station 6 · The T row
- **Teaches:** た (ta), ち (**chi**), つ (**tsu**), て (te), と (to).
- **Reads:** **とり** (tori = bird), **うた** (uta = song) — real words.
- **Drills:** SRS review; new-row intro; `draw-character` featuring て (elegant, 2
  strokes); `recognize-sound` recall.
- **Drip:** ち = "chi", つ = "tsu" — another reminder Japanese sounds don't follow
  English conventions.
- **Sessions:** 10–11.
- **Seeds:** た ち つ て と → 20 total.
- **End-state:** read the T row; reading real Japanese words now.
- **📖 Book stop after:** —

### Station 7 · The N row
- **Teaches:** な (na), に (ni), ぬ (nu), ね (ne), の (no).
- **Reads:** **ねこ** (neko = cat), **にほん** (nihon = Japan); **first mini-story** —
  "ねこ が いる。ねこ は かわいい。" (There is a cat. The cat is cute.), with audio.
- **Drills:** full SRS review (25 kana in deck); new-row intro; `draw-character`
  featuring の (single flowing stroke); `story-read` on the two-sentence story.
- **Drip:** の is the most common particle (possession, like "of"/"'s") — it's
  everywhere. "Did you know: の is so iconic it's in the Studio Ghibli logo."
- **Sessions:** 12–13.
- **Seeds:** な に ぬ ね の → 25 total.
- **End-state:** read the N row; read your first Japanese sentence.
- **📖 Book stop after:** —

### Station 8 · Halfway snapshot
- **Teaches:** no new kana — first weekly **knowledge snapshot** + consolidation.
- **Reads:** 5 real words using known kana; re-read the mini-story.
- **Drills:** full recognition pass on all 25; `draw-from-memory` (5 random);
  `read-word` on 5 real words.
- **Drip:** "Halfway there — you can read 25 hiragana, more than half the set." First
  explanation of the **decay mechanic**: confidence is tracked; unreviewed kana fade;
  the snapshot shows true tested knowledge ([P5](../product/principles.md#p5--tell-the-truth-about-memory)).
- **Sessions:** 14.
- **Seeds:** — (consolidation).
- **End-state:** honest checkpoint — over half of hiragana, first sentence read.
- **📖 Book stop after:** *"Why the kana are ordered as they are"* — now that half the
  set is known, what the **gojūon** (五十音) grid is *for*: that it is the order
  dictionaries, indexes and forms sort by, the way A-B-C is in English; why it counts
  fifty but holds 46 (empty y/w cells, ん outside the table); and the cells that bend
  (し, ち, つ, ふ), which by now the learner has actually met. The grid itself is
  introduced at the station-3 book stop and the three-scripts history at station 1;
  neither is repeated here. *(Authored: `src/content/codex.ts`.)*

---

# Track 3 — Completing the kana

*The remaining rows and the final character; full hiragana literacy.*

### Station 9 · The H row
- **Teaches:** は (ha), ひ (hi), ふ (**fu**, not "hu"), へ (he), ほ (ho).
- **Reads:** **ひと** (hito = person), **はな** (hana = flower/nose), **ほし** (hoshi = star).
- **Drills:** SRS review; new-row intro; `draw-character`; `read-word` on the compounds.
- **Drip:** ふ = "fu"; は as a grammatical particle is said "wa" — surfaced as an
  interesting quirk, not a scary exception. "You already know the first character of
  はじめまして (nice to meet you)."
- **Sessions:** 15–16.
- **Seeds:** は ひ ふ へ ほ → 30 total.
- **End-state:** read the H row.
- **📖 Book stop after:** —

### Station 10 · The M row
- **Teaches:** ま (ma), み (mi), む (mu), め (me), も (mo).
- **Reads:** **みず** (mizu = water), **もり** (mori = forest), **うみ** (umi = sea);
  **mini-story 2** — slightly longer, introduces a boy (e.g. こうた) who sees the sea and
  a cat, full audio to read along.
- **Drills:** SRS review; new-row intro; `draw-character` featuring む (fun looping
  stroke); `story-read`.
- **Drip:** —
- **Sessions:** 17–18.
- **Seeds:** ま み む め も → 35 total.
- **End-state:** read the M row; read a longer story.
- **📖 Book stop after:** —

### Station 11 · The Y & W rows
- **Teaches:** や (ya), ゆ (yu), よ (yo), わ (wa), を (**wo**, said like お, grammar-only).
- **Reads:** **やまと** (Yamato — an old name for Japan itself).
- **Drills:** SRS review; new-characters intro; `draw-character`; `recognize-sound` recall.
- **Drip:** を is kept alive almost only as the object particle — "a character kept alive
  for grammar." "You can now read やまと."
- **Sessions:** 19.
- **Seeds:** や ゆ よ わ を → 40 total.
- **End-state:** read the Y and W rows.
- **📖 Book stop after:** —

### Station 12 · The R row & ん
- **Teaches:** ら (ra), り (ri), る (ru), れ (re), ろ (ro), then the final character **ん**
  (n) — the only non-syllable kana; never starts a word.
- **Reads:** **さくら** (sakura = cherry blossom), **そら** (sora = sky), **りんご**
  (ringo = apple).
- **Drills:** SRS review of everything; new-characters intro (r-row is audio-critical —
  the Japanese "r" is a flap, not English/Spanish r); introduce ん; full hiragana grid
  reveal — every character the learner knows.
- **Drip:** the big moment — **"You now know all 46 hiragana. You can read any Japanese
  written in hiragana."** Marked clearly.
- **Sessions:** 20–21.
- **Seeds:** ら り る れ ろ ん → **46 total (all hiragana)**.
- **End-state:** **full hiragana literacy.**
- **📖 Book stop after:** *"A different kind of alphabet"* (preview) — sets up how
  Japanese writing differs from a Latin alphabet, ahead of the katakana and kanji provinces.

---

# Track 4 — First real words & grammar

*Vocabulary themes, the first grammar concept, and the full-hiragana milestone.*

### Station 13 · Hiragana mastery
- **Teaches:** no new kana — full consolidation of all 46.
- **Reads:** all 46 in random order; a speed round.
- **Drills:** recognition drill (all 46 random); `draw-from-memory` (10 random); reading
  speed round.
- **Drip:** "46 hiragana. All of them. This took most people months in a classroom —
  you did it in about three weeks."
- **Sessions:** 22.
- **Seeds:** — (consolidation).
- **End-state:** fluent recognition of all 46.
- **📖 Book stop after:** —

### Station 14 · Words of nature
- **Teaches:** 10 nature words — かわ (river), やま (mountain), うみ (sea), そら (sky),
  はな (flower), もり (forest), つき (moon), ほし (star), かぜ (wind), ゆき (snow).
- **Reads:** each word with audio, image, one example sentence.
- **Drills:** `read-word` on each; `recognize-sound`; SRS review of kana.
- **Drip:** why nature words first — they appear constantly in songs, poetry, anime.
- **Sessions:** 23.
- **Seeds:** 10 nature words.
- **End-state:** read and know 10 nature words.
- **📖 Book stop after:** —

### Station 15 · Words of animals
- **Teaches:** 10 animal words — いぬ (dog), ねこ (cat), とり (bird), さかな (fish),
  うま (horse), くま (bear), うさぎ (rabbit), きつね (fox), たぬき (raccoon dog), さる (monkey).
- **Reads:** each with audio, image, example sentence.
- **Drills:** `read-word`; `recognize-sound`; SRS review.
- **Drip:** foxes (きつね) and raccoon dogs (たぬき) in Japanese folklore.
- **Sessions:** 24.
- **Seeds:** 10 animal words → 20 vocab total.
- **End-state:** read and know 10 animal words.
- **📖 Book stop after:** —

### Station 16 · A first sentence
- **Teaches:** the **first grammar** — Japanese is **Subject–Object–Verb** ("I sushi
  eat"); the verb always goes last.
- **Reads:** **ねこ が さかな を たべる。** (The cat eats fish.) — each word explained,
  known kana pointed out.
- **Drills:** visual English-vs-Japanese word-by-word comparison, audio of both, **no
  production pressure yet** (understand first); then `arrange-sentence` — order word
  blocks into SOV on 3–4 simple sentences (dog sees the moon; cat is in the forest;
  bird flies in the sky).
- **Drip:** SOV explained explicitly and early — Michi teaches grammar, lightly, when it
  unlocks comprehension.
- **Sessions:** 25–26.
- **Seeds:** first `GrammarPattern` (SOV).
- **End-state:** understand SOV; arrange simple Japanese sentences.
- **📖 Book stop after:** —

### Station 17 · Hiragana complete
- **Teaches:** no new content — the full-hiragana milestone review + assessment.
- **Reads:** mini-story 3 (known vocab + SOV), with audio + comprehension questions;
  3 simple sentences to read and explain.
- **Drills:** full SRS review (46 kana + 20 words); recognition + `draw-from-memory`
  (5 random) on all 46; `read-word` on 15 words; `comprehension-q` on the story;
  read-and-explain 3 sentences.
- **Drip:** the milestone **knowledge card** — "Hiragana complete. 46 kana, 20 words.
  You can read: ねこ が うみ を みる。 (The cat looks at the sea.)"
- **Sessions:** 27–28.
- **Seeds:** — (assessment).
- **End-state:** **all 46 hiragana** — full kana literacy, 20 words, simple sentences.
- **📖 Book stop after:** —

---

# Beyond hiragana — Outline (to be specced)

Everything above is **Province 1 国 — Hiragana**. The provinces below are *declared* in
`src/app/worldmap.ts` with empty track lists (so they show as "Not yet built" rather
than a fake "coming soon"), and filled in as each curriculum is authored. One line each;
these become full station entries above when their content exists.

Province boundaries are fixed — one script or domain each. The **track** groupings inside
them are deliberately open, decided as the curriculum is written.

**Province 2 国 — Katakana.** Same sounds as hiragana, new shapes — much faster now.
Stations by row (ア-row, カ-row, …), same introduce→reinforce arc, grouped into tracks
as authored. **Drip / book stop:** *"What katakana is"* — invented by Buddhist monks in
the 800s; used for loanwords, emphasis, onomatopoeia (the deep katakana explanation lands
here, at introduction).

**Province 3 国 — First kanji.** 一 二 三 四 五 (numbers 1–5) — simple strokes, high
utility, embedded in real vocabulary. **Drip / book stop:** *"What kanji is"* — borrowed
from China, then Japan built kana on top; the full three-scripts origin story assembled
as a satisfying recap once all three have been met.

**Province 4 国 — Words & sentences.** The language starts to feel real: high-frequency
vocab (numbers, colors, common verbs), present-tense verb conjugation
(positive/negative), listening comprehension with short native audio. Tracks and
stations TBD as this curriculum is authored.

---

## Related

- [station-map.md](./station-map.md) — how days collapse into stations; the station
  arc; book stops & codex design.
- [world-map.md](./world-map.md) — the map surface these stations appear on.
- [month-1.md](./month-1.md) — the ordered session content this roster reorganizes.
- [content-model.md](./content-model.md) — Lesson / Exercise data shapes; drill types.
- [session-flow.md](./session-flow.md) — how a session (a station's sessions) plays out.

<!-- ARCHIVE-SOURCE-END: docs/curriculum/stations.md -->

---

<!-- ARCHIVE-SOURCE-START: docs/curriculum/world-map.md -->

# The World Map — Provinces, Tracks & Stations

How the curriculum is **structured for navigation and progress**: the course
presented as a walkable path of *stations*, grouped into *tracks*, grouped into
*provinces*. This is the learner-facing shape of the sequencing defined in
[overview.md](./overview.md); it does not change *what* is taught, only how the journey
is grouped and moved through.

> **Status:** Implemented (first pass). The map surface exists in code
> (`src/app/page.tsx`, `src/components/WorldMap.tsx`, data in
> `src/app/worldmap.ts`). Station↔lesson wiring is still nominal — see
> [Open edges](#open-edges).

---

## The three terms

**Station** — one stop on the path: a single unit of the journey the learner walks
to and starts. A station corresponds to a
[**Lesson**](./content-model.md#lesson) (an authored unit of new content). "Station"
is the *map/navigation* name for it; "Lesson" is the *content* name. One station →
one lesson.

Each station is **a real Tokyo station**, shown by its place name in kana (あさくさ,
うえの, しんじゅく) above `Asakusa Station 駅`. The romaji is a **label on a place, never a
reading aid** for the lesson's kana ([P2](../product/principles.md#p2--no-romaji-ever-as-a-reading-aid)).
Stations are still numbered continuously (the disc shows the number until it's complete),
but the label carries no line code — the track's color and the nav label already say which
line you're on, and a third encoding of the same fact only competed for attention.

**Track** — an ordered group of stations (a few each): the run of **line** they sit on. A
track is roughly a curriculum *unit* (a cluster of gojūon rows), and is presented as a real
**Tokyo Metro line** — `GINZA LINE 銀座線` — whose official color is that track's hue. It
also carries what it teaches ("First sounds").

**Province** — an ordered group of tracks: one **leg of the journey**, a whole script or
domain (Hiragana, Katakana, First kanji, …). Provinces are numbered and named and carry
the label **PROVINCE N 国** — *kuni*, the old provinces a traveller crossed on a long
journey. The course is **self-paced — Course → Provinces → Tracks → Stations, no
calendar** (no months or weeks). The authoritative station roster is
[stations.md](./stations.md).

```
Course  (self-paced; no calendar)
└── Province 1 "Hiragana" 国
    ├── Track 1 "First sounds"          stations 1–3
    │   ├── Station 1  First sounds         → Lesson (first-sounds)
    │   ├── Station 2  The K row
    │   └── Station 3  A first look back
    ├── Track 2 "Reading on"            stations 4–7   (S/T/N rows → snapshot)
    ├── Track 3 "Completing the kana"   stations 8–11  (H/M/Y-W/R rows + ん)
    └── Track 4 "First words & grammar" stations 12–16 (mastery → words → sentence)
└── Province 2 "Katakana" 国                 declared, not yet authored
└── Province 3 "First kanji" 国              declared, not yet authored
└── Province 4 "Words & sentences" 国        declared, not yet authored
```

**Why these words.** The sizes nest the way the words do: a **province** is a region you
cross, a **track** is a run of line inside it, a **station** is where you stop. The
Tōkaidō really did run through ten named provinces (Musashi, Sagami, Izu, …), and modern
presentations of it already group its stations provincially — so the top tier is grounded
rather than invented.

Two honest caveats, recorded in
[ADR 0006](../decisions/0006-provinces-and-tracks.md):

- The historical highway system was **two-tiered** — route and station, with no attested
  administrative layer between. The track tier is a grouping *we* impose.
- The subway framing **resolved an earlier mixed metaphor**: stations were once labeled
  宿 *shukuba* (Edo walking-highway post-towns) beside 線 (modern rail). They are now 駅
  *eki* — the word on every real Tokyo station sign — so 駅 / 線 / line names are one
  coherent era. Only 国 *kuni* (province) remains from the older layer, as the tier that
  groups whole scripts.

### Why a separate set of words

What each station *teaches*, how sessions collapse into stations, and the
optional book-stop/codex lore layer are specified in
[station-map.md](./station-map.md). This doc owns the map's structure and behavior;
station-map.md owns the pedagogical content of the stops.

The map is a **navigation surface over the curriculum**, not a new content model.
It needed learner-facing names for "a stop" and "a group of stops" that read as a
journey rather than a syllabus. "Lesson"/"unit" stay the authoring words in
[content-model.md](./content-model.md); "Station"/"Track"/"Province" are what the learner
sees on the path. Keep the mapping one-to-one so the two vocabularies never drift:

| Map term | Curriculum/content term |
|---|---|
| Station | [Lesson](./content-model.md#lesson) |
| Track | a unit / cluster of lessons |
| Province | a curriculum leg — one script or domain |
| The path / course | the whole curriculum |

---

## How it behaves

Each **province** is one continuous walkable stretch of ink on a pannable, zoomable canvas —
its tracks flow one into the next. Between provinces the ink **breaks**, marked by a quiet
seam. On top of that, a two-level **chain** overview jumps between provinces and tracks.

> **Correction (supersedes the earlier claim here).** This section used to say the chain
> was "the answer to *this won't scale to 100 stations by scrolling*". It wasn't. A chain
> listing *every* track becomes the same endless scroll it was meant to replace, and
> one flat canvas holding every station grows past 30,000px. **Provinces bound both surfaces:**
> the canvas holds one province, and the overview is provinces-then-tracks — never more than
> ~8 items at either level, however long the course gets. See
> [ADR 0006](../decisions/0006-provinces-and-tracks.md).

**The path (primary surface):**

- **Stations** are circles joined by one smooth ink curve threading every track of a
  province in global order. Three states, shown by **shape + label, never color alone**
  ([DESIGN §2](../design/DESIGN.md)):
  - *done* — filled disc + check
  - *current* — thick ring + a soft halo, ink-dark bold number, a floating "you are here"
    pin. Deliberately **hue-free**, so it reads the same on every track color
  - *locked* — thin faint outline + muted number
  - The solid portion of each track's ink grows to reflect completion *of that track*.
- **Each track has its own hue**, so a stretch of path and its name are visibly the same
  thing. It appears on: the walked ink and station rings along it; the **whole nav card's
  track row**, filled with the hue behind light text; and the left edge of its card in the
  track list. The hues are matched in lightness and chroma (no track shouts louder than
  another) and held clear of 朱 vermilion's hue.
  - **Unwalked ink is tinted too** — the same hue mixed toward the background — so every
    track is identifiable *before* you reach it. Walked ink is the full-strength version.
  - **Hue carries grouping only** — never state. done/current/locked are shape and weight
    (see above); locked stations stay faint grey regardless of hue. Removing color entirely
    (grayscale) leaves all three fully distinguishable — worth re-checking with a grayscale
    filter after any change here.
  - The filled surfaces use a **deepened mix** of the hue, not the raw color: paper text
    fails AA on all four raw hues, and clears at **4.8–7.2:1** on the mix. See
    [DESIGN → Track hues](../design/DESIGN.md) for the full strength table.
  - Hues **restart at each province**, so every province opens on the same first color.
    Five are defined and they cycle; a province with more than five tracks repeats.
  - They live in `:root`, **not** Tailwind's `@theme` — `@theme` tokens are tree-shaken
    unless referenced literally in source, and these are composed at runtime.
- **Province boundaries** are drawn as a dashed hairline and a `PROVINCE N 国` label in the gap
  between one province's last station and the next province's first — legible when you pan past
  it, invisible otherwise. A declared-but-unauthored province draws nothing at all. Track
  boundaries *within* a province have no gap: consecutive hues meet at the shared station.
- On load the camera **snaps to the current track**; you can drag/scroll freely and
  wheel-zoom.

**Moving around — three affordances (bottom-left):**

- **Glide arrows** (‹ / ›) pan the camera smoothly *along the path* to the previous /
  next track (ease-out, ~520 ms, reduced-motion aware). They are **scoped to the
  current province** and disabled at its edges, so the click count stays bounded; to leave a
  province you use the nav label. The map stays one world; the camera moves.
- **The nav label is two tap targets, one card.** The top row (`PROVINCE N 国 · <name>`,
  neutral) opens the **province list**; the bottom row (the current track, **filled with
  that track's hue**) opens **this province's tracks**. One tap to either level —
  switching province is never buried behind a back button.
- **"‹ Provinces"** steps up to the **province list**. Each card shows state by shape + label:
  *done* (✓ Complete), *current* (vermilion outline, "N of M tracks"), *locked*
  (dimmed, inert), *unauthored* ("Not yet built", inert — honest rather than a fake
  "coming soon", [P5](../product/principles.md#p5--tell-the-truth-about-memory)). Tapping
  a province opens its tracks; tapping a track closes the chain and **glides the camera
  along the path** to it. "‹ The path" returns without jumping.

- **Completing a track unlocks the next.** Progress is a single furthest-unlocked
  station index; a track is *done* once that index passes its last station, and a province
  is *done* once it passes the province's last station.
- **Reinforcement / redo:** decayed items resurface in the **SRS review** at session
  start ([P8](../product/principles.md#p8--everything-lives-in-the-srs)); tracks are
  **never re-locked**, so advancing is never punished
  ([P1](../product/principles.md#p1--learning-over-engagement),
  [P7](../product/principles.md#p7--sessions-always-complete)). A quiet "needs review"
  flag on a past track card is a possible future addition, not built.
- **Starting a station**: clicking a `done`/`current` station that has an `href`
  navigates into its lesson. Locked stations are inert (not focusable, no pointer).
- **Progress** is surfaced as quiet text ("N of M complete"), never a stat tile —
  [DESIGN §1](../design/DESIGN.md) anti-reference.

The visual system (色 vermilion/indigo, quiet motion, no gamification) is governed
by [DESIGN.md](../design/DESIGN.md); this doc owns only the structure and behavior.

---

## Data shape (current)

Authoring data lives in `src/app/worldmap.ts`:

```
Province     { id, n, title, subtitle?, tracks: Track[] }
Track { id, n, title, stations: Station[] }
Station  { id, n, title, href?, x, y }
```

- `x` / `y` are **global canvas coords** — positions continue rightward across track
  and province boundaries. `TRACKS = PROVINCES.flatMap(...)` and
  `STATIONS = TRACKS.flatMap(...)` keep the flat, globally-ordered station list that
  progress indexes into, so **station numbering stays global 1..N** (as Tōkaidō post-towns
  were counted along the whole highway, not per track).
- An **empty `tracks` array** means the province is declared but not yet authored — it
  renders as "Not yet built" and draws nothing on the canvas.
- `href` is set once a lesson is playable (only `first-sounds` today).
- Helpers map the flat furthest-unlocked index ↔ track ↔ province: `trackOfStation`,
  `firstStationOfTrack`, `trackState`, `provinceOfTrack`, `firstTrackOfProvince`,
  `provinceState`, `stationRangeOfProvince`; `TOTAL_STATIONS` is the course total for the
  "N of M complete" line. `provinceState` returns `locked` for an unauthored province — without
  that guard an empty index range reads as *current*.

Adding a track = append to a province's `tracks` with positions continuing rightward;
the path, boundary markers, glide arrows, and both chain levels pick it up automatically.

---

## Open edges

- **Station ↔ Lesson wiring is nominal.** Stations currently hold their own title +
  `href`; they are not yet generated from the authored [lessons](./content-model.md#lesson).
  When content becomes real data (roadmap Phase 2, on-disk format TBD), stations
  should be *derived* from lessons so the two never diverge.
- **Completion percentages.** Only the coarse furthest-unlocked index drives state
  today (done/current/locked). Per-station confidence rings and honest
  per-track/province/course percentages are planned; they read from
  [learner state](../architecture/data-model.md) /
  [confidence](../product/glossary.md), not authored content, and must stay honest
  ([P5](../product/principles.md#p5--tell-the-truth-about-memory)) — no inflated
  counts. This is also where a "needs review" track flag would draw from.
- **Province-local station numbering.** Numbers are global, so later provinces will show large
  station numbers on the disc. Place names carry the orienting work now, so this matters
  less than it did; a display-only per-province reset stays deferred.
- **Track boundaries past Province 1** are open; the row→station rule is settled but the
  groupings are decided as each province's curriculum is authored. Province boundaries (one script
  or domain each) are fixed.
- **All course-level stats** (the "everything on this page" surface) will live on the
  map, kept quiet per [DESIGN §1](../design/DESIGN.md).

<!-- ARCHIVE-SOURCE-END: docs/curriculum/world-map.md -->

---

<!-- ARCHIVE-SOURCE-START: docs/decisions/0001-web-first-capacitor.md -->

# 0001 — Web-first with Next.js + Capacitor

- **Status:** Accepted
- **Date:** 2026-07-17
- **Deciders:** project founder

## Context

Michi must run on both phone and desktop from day one, with a deliberately simple,
content-focused UI. The builder already knows React and JavaScript. Two features are
architecturally load-bearing:

- a **character-drawing canvas** with stroke recognition, and
- **offline-first** operation (core learning without a network).

We need a single approach that serves web and mobile without doubling UI work, and
that makes the drawing canvas natural rather than a fight with the framework. Full
context in [tech-stack.md](../architecture/tech-stack.md).

## Decision

**We will build Michi as a web-first Next.js (React) app, styled with Tailwind, and
wrap it for native mobile with Capacitor — one codebase for web, iOS, and Android.**

The character-drawing mechanic uses the HTML Canvas API; audio uses the Web Audio API
(with Howler.js). Learner state persists offline via IndexedDB on web and SQLite (via
Capacitor) on mobile, behind a storage interface. Optional Supabase sync is a later
addition, not a launch dependency.

## Alternatives Considered

- **Expo + React Native (with React Native Web for desktop).** Excellent for mobile,
  but a mobile-first system stretched to desktop: awkward complex layouts, and the
  critical drawing canvas is harder to build well on RN's touch-drawing system than
  on HTML Canvas. Rejected for the desktop friction and canvas complexity.

- **Flutter.** Genuinely excellent cross-platform with first-class drawing APIs — but
  it uses Dart. Given existing React skills, the learning curve adds months before
  anything ships. Rejected on time-to-first-ship.

- **Two separate codebases (React web + React Native mobile), sharing only logic.**
  Best native feel, but double the UI work — only justified if native performance
  becomes a real problem, which it won't for a content-focused learning app.
  Rejected as premature.

## Consequences

- **Easier:** one UI codebase; HTML Canvas makes the drawing mechanic
  straightforward on both mouse and touch; the pure-JS SRS engine runs identically
  everywhere; responsive CSS/Tailwind is simpler than RN layouts; fast path to
  running on a real phone (Capacitor wrap is one command).
- **Requires:** a small amount of platform-aware code (touch vs. mouse events on the
  canvas — roughly a 10-line difference); bundling fonts and core audio for offline
  use in the Capacitor build.
- **Accepted downside:** a Capacitor-wrapped web app is not as "native" as a true
  native app in the most demanding scenarios. For Michi's simple, single-task-per-
  screen UI this is a non-issue, and the simplicity is itself an advantage for this
  approach.

## Related

- [tech-stack.md](../architecture/tech-stack.md) — full analysis
- [overview.md](../architecture/overview.md) — how the layers fit
- [P9 — Offline-first, one codebase](../product/principles.md#p9--offline-first-one-codebase)

<!-- ARCHIVE-SOURCE-END: docs/decisions/0001-web-first-capacitor.md -->

---

<!-- ARCHIVE-SOURCE-START: docs/decisions/0002-no-romaji.md -->

# 0002 — No romaji as a reading aid

- **Status:** Accepted
- **Date:** 2026-07-17
- **Deciders:** project founder

## Context

Japanese uses three scripts; hiragana is the phonetic foundation. Many apps —
Duolingo included — display **romaji** (Japanese written in Latin letters) to help
beginners "read" before they know kana. It feels helpful early on.

The evidence and pedagogy say otherwise: romaji lets learners lean on the Latin
alphabet instead of building a **native phonological map**, which slows hiragana
acquisition and entrenches an English-mediated model of Japanese sounds (e.g.,
reading し as "si" instead of "shi"). Because this is a defining choice for Michi's
identity and method, it warrants an explicit, durable decision. Background in
[pedagogy.md](../product/pedagogy.md).

## Decision

**Michi will never use romaji as a reading or pronunciation aid.** Sounds are taught
first (via audio), then immediately bound to hiragana. From the first character on,
the learner reads Japanese in Japanese script.

Two narrowly-scoped exceptions, neither of which is a reading aid:

1. Romaji may appear **once**, explicitly, to explain *why we don't use it*.
2. Romaji may exist in **internal data/tooling** (search, tests, authoring) via a
   field that is **never rendered to the learner** — see the `romaji` field note in
   [content-model.md](../curriculum/content-model.md).

## Alternatives Considered

- **Romaji as a temporary beginner scaffold, faded out later.** The industry-common
  approach. Rejected: the scaffold is exactly what prevents the phonological map from
  forming, and "faded later" tends to mean "leaned on indefinitely." The cost lands
  precisely when we most want correct habits forming.

- **Furigana-style romaji alongside kana.** Still gives the learner a Latin escape
  hatch that undermines kana reading. Rejected for the same reason.

## Consequences

- **Easier / better:** learners build correct pronunciation and a native reading
  reflex from day one; the app's method is clear and differentiated; audio-first
  teaching is forced (a good constraint given Japanese pitch accent — see
  [audio.md](../design/audio.md)).
- **Harder / accepted downside:** the very first sessions demand more of the learner
  (no Latin lifeline), so onboarding must carry more weight — strong audio, clear
  character introduction, and an early "you can actually read this" win (engineered
  for day 5 in [month-1.md](../curriculum/month-1.md)) to sustain motivation.
- **Enforcement:** this is elevated to a hard rule,
  [P2](../product/principles.md#p2--no-romaji-ever-as-a-reading-aid); any romaji in
  learner-facing output is a bug.

## Related

- [P2 — No romaji, ever](../product/principles.md#p2--no-romaji-ever-as-a-reading-aid)
- [pedagogy.md](../product/pedagogy.md) — No Romaji Policy
- [content-model.md](../curriculum/content-model.md) — the internal-only `romaji` field

<!-- ARCHIVE-SOURCE-END: docs/decisions/0002-no-romaji.md -->

---

<!-- ARCHIVE-SOURCE-START: docs/decisions/0003-sm2-srs-algorithm.md -->

# 0003 — Use SM-2 for spaced repetition

- **Status:** Accepted
- **Date:** 2026-07-17
- **Deciders:** project founder

## Context

Spaced repetition is the retention engine underneath everything in Michi
([P8](../product/principles.md#p8--everything-lives-in-the-srs)): every character,
word, and grammar pattern is scheduled for review right before it would be forgotten,
and confidence/decay are derived from that schedule. We need to choose the scheduling
algorithm before building the SRS engine — which is the *first* thing we build, since
everything else plugs into it. Background in
[srs-engine.md](../architecture/srs-engine.md).

## Decision

**Michi will use SM-2 (the SuperMemo-2 algorithm) for scheduling.** It is
well-understood, open, and implementable in ~20–30 lines of pure JavaScript/
TypeScript. Each item stores SM-2 state (`interval`, `easeFactor`, `repetitions`,
`dueDate`); a review grade updates that state and yields the next due date. Confidence
scores are derived from this state (see
[data-model.md](../architecture/data-model.md)).

We map Michi's four learner-facing grades to SM-2 quality values:

| Michi grade | Meaning | SM-2 handling |
|---|---|---|
| Forgot | couldn't recall | reset interval (short) |
| Hard | recalled with difficulty | small interval growth, lower ease |
| Got it | recalled correctly | normal interval growth |
| Easy | effortless | larger interval growth, raise ease |

## Alternatives Considered

- **FSRS (Free Spaced Repetition Scheduler).** More modern and empirically better at
  fitting real forgetting curves. Rejected *for now*: heavier to implement and tune,
  and its advantages matter most at large scale with lots of review data. SM-2 is the
  right first-build choice; FSRS is a plausible future ADR-superseding upgrade once
  the app has real usage data.

- **A custom hand-rolled interval scheme.** Tempting for simplicity, but we'd be
  reinventing (worse) what SM-2 already encodes, with no literature behind it.
  Rejected — no reason to discard a proven, tiny algorithm.

- **An off-the-shelf SRS library.** Overkill for ~30 lines of logic, and it would
  couple our core engine to a dependency we want kept pure and framework-free (see
  [overview.md](../architecture/overview.md)). Rejected.

## Consequences

- **Easier:** tiny, pure, exhaustively unit-testable engine we fully control; no
  dependency; identical behavior on web and mobile; confidence/decay derive cleanly
  from its state.
- **Accepted downside:** SM-2 is less accurate than FSRS at modeling forgetting, and
  its ease-factor handling has known quirks. Acceptable for Michi's scale and stage;
  revisitable via a future ADR without disturbing the rest of the architecture,
  precisely because the engine is isolated behind a clean boundary.

## Related

- [srs-engine.md](../architecture/srs-engine.md) — the engine spec and why it's built first
- [data-model.md](../architecture/data-model.md) — SM-2 state fields and derived confidence
- [P8 — Everything lives in the SRS](../product/principles.md#p8--everything-lives-in-the-srs)

<!-- ARCHIVE-SOURCE-END: docs/decisions/0003-sm2-srs-algorithm.md -->

---

<!-- ARCHIVE-SOURCE-START: docs/decisions/0004-stroke-data-source.md -->

# 0004 — Stroke-data source for the drawing mechanic

- **Status:** Accepted
- **Date:** 2026-07-17
- **Deciders:** project founder

## Context

Handwriting with correct stroke order is one of Michi's three signature mechanics
([vision §8](../product/vision.md#8-the-three-signature-mechanics)). Building it
requires **stroke data** for every drawable character: an ordered list of strokes,
each with a path/shape. The app uses this for two jobs — (1) rendering the animated
stroke-order **hint**, and (2) **checking** the learner's drawn strokes against the
correct strokes and order. See
[content-model.md §Stroke Data](../curriculum/content-model.md#stroke-data).

We must not silently teach the wrong character forms
([P4 — correct by construction](../product/principles.md#p4--correct-by-construction)),
the data must be bundleable for offline use
([P9](../product/principles.md#p9--offline-first-one-codebase)), and its license must
permit shipping it in the app. Michi's near-term need (Months 1–2) is **kana only**;
kanji come later ([P10 — depth before breadth](../product/principles.md#p10--depth-before-breadth)).

Two constraints shaped this decision heavily:

- **Typeface match.** [typography.md](../design/typography.md) already commits to
  **Klee One** for character instruction — the handwriting-style face the learner
  sees on flashcards and drawing prompts. If the stroke hint's letterforms don't
  match that face, the learner copies one shape while seeing another — a direct P4
  violation.
- **License.** The data is bundled and redistributed with the app, so its license
  terms apply to us directly.

### What the research found

| Source | Coverage | License | Letterforms | Notes |
|---|---|---|---|---|
| **strokesvg** | Hiragana + katakana | **SIL Open Font License** (derived from Klee One) | **Klee One** — matches our teaching face | Per-stroke animatable SVG paths; *not* derived from KanjiVG; kana only |
| **KanjiVG** | Kana **and** ~thousands of kanji (86 hiragana + 91 katakana SVGs incl. variants) | **CC-BY-SA 3.0** (attribution + **share-alike/copyleft**) | Its own reference style — correct, but *not* Klee One | Authoritative, hand-drawn from Japanese govt. references; rich stroke-type/radical metadata |
| **Hand-authored** | Whatever we draw | Ours | Whatever we design | Full control; manual effort; doesn't scale to kanji |

## Decision

**We will use `strokesvg` (Klee One, OFL) as the primary stroke-data source for
kana, hand-authoring any gaps needed for the 46 hiragana + 46 katakana core set.**

When Michi reaches kanji (a later phase), we will **adopt KanjiVG for kanji**, and
record that as its own decision (superseding or extending this ADR) — including how
we reconcile its letterform style and its CC-BY-SA terms at that time.

The **stroke-matcher is Michi's own code** and is deliberately independent of the
data source: it consumes an ordered list of stroke paths, whatever produced them.
This choice therefore does not lock in any recognition algorithm.

## Alternatives Considered

- **KanjiVG as the primary source (now).** Comprehensive and authoritative, and the
  obvious choice *for kanji later*. Rejected as the primary source now for two
  reasons: (1) its letterforms are not Klee One, so kana stroke hints would not match
  our teaching face — a P4 mismatch precisely where the learner is most impressionable;
  (2) **CC-BY-SA 3.0 is share-alike/copyleft**, which is heavier for a bundled
  commercial-capable app than OFL and risks obligations on redistributed derivatives.
  For a kana-only near-term need, it's the wrong tradeoff.

- **Hand-author everything from scratch.** Maximum control and a guaranteed match to
  our design. Rejected as the *primary* approach: it reinvents work `strokesvg`
  already did correctly against Klee One, and doesn't scale to katakana/kanji. We keep
  it only as the **fallback for gaps** in the core 92 kana.

- **animCJK.** Another open animated-stroke project (kana + CJK). Viable, but its
  letterforms are not Klee One either, giving it the same P4 mismatch as KanjiVG
  without KanjiVG's authority. Rejected.

## Consequences

- **Easier / better:** kana stroke hints match the Klee One flashcard faces exactly
  (strong P4 win); OFL is simple to comply with (attribution, doesn't infect the app);
  per-stroke SVG paths drop straight into the content model; covers exactly the
  near-term kana scope; bundles cleanly for offline.
- **Requires:** carrying the OFL notice and attributing Klee One / `strokesvg`; a
  small hand-authoring pass to fill any missing or low-quality kana strokes;
  normalizing `strokesvg`'s SVG into our own stroke-path representation so the matcher
  isn't coupled to its file format.
- **Accepted downside / deferred work:** this covers **kana only**. Kanji needs a
  separate source (likely KanjiVG), which will reintroduce the letterform-style and
  CC-BY-SA questions — deferred deliberately to when kanji actually arrive, not solved
  now. That is consistent with depth-before-breadth and is explicitly **not** a dead
  end, since KanjiVG remains available.

## Related

- [content-model.md §Stroke Data](../curriculum/content-model.md#stroke-data)
- [typography.md](../design/typography.md) — the Klee One commitment this hinges on
- [P4 — Correct by construction](../product/principles.md#p4--correct-by-construction)
- [P9 — Offline-first](../product/principles.md#p9--offline-first-one-codebase)
- [P10 — Depth before breadth](../product/principles.md#p10--depth-before-breadth)
- Sources: KanjiVG (kanjivg.tagaini.net, github.com/KanjiVG/kanjivg),
  strokesvg (github.com/zhengkyl/strokesvg)

<!-- ARCHIVE-SOURCE-END: docs/decisions/0004-stroke-data-source.md -->

---

<!-- ARCHIVE-SOURCE-START: docs/decisions/0005-roads-and-provinces.md -->

# 0005 — Roads (街道) and provinces (国) above stations

- **Status:** Accepted; naming superseded by [0006](./0006-provinces-and-tracks.md)
- **Date:** 2026-07-25
- **Deciders:** project founder

## Context

The curriculum had exactly three levels: **Course → Module → Station**
([world-map.md](../curriculum/world-map.md)). At 4 modules and 16 stations, all
hiragana, that worked. It breaks well before the curriculum is finished, in two
separate ways.

**Structural.** Stations carry global canvas coordinates, x stepping ~320px per station.
Station 16 already sits at x=5040, so a course of 100 stations would be a **single flat
canvas over 30,000px wide**. Navigation was worse: glide arrows stepped one module at a
time, and the module "chain" rendered a flat list of *every* module — at 50 modules,
either 50 arrow clicks or an endless scroll list. The old text in
`world-map.md` claimed the chain was "the answer to *this won't scale to 100 stations by
scrolling*." That claim was **wrong**: a flat list of every module reproduces exactly the
scroll problem it was introduced to solve. This ADR supersedes that claim.

**Naming.** Stations were already labeled *STATION N 宿* — *shukuba*, the post-towns of
Japan's old highways — and the brand mark is 道. "Module" was the only term in the
hierarchy with no place in that metaphor; "MODULE 2 / Reading on" reads as courseware in
the middle of a journey, which cuts against the calm, non-gamified surface
[DESIGN.md](../design/DESIGN.md) commits to.

A third, smaller force: "leg of the journey" was used at two different scales in the docs
— one module in `world-map.md`, all of hiragana in `month-1.md`. Any new tier had to
resolve that rather than entrench it.

### The historical record (and its limits)

The naming was checked against sources rather than assumed, and the finding is
**partly negative**:

- The **Tōkaidō** had 53 government-sanctioned post stations (宿場 *shukuba*) between Edo
  and Kyoto — though official records support **57** after the 1619 extension toward
  Osaka. The famous "53" owes much of its dominance to Hiroshige's print series.
- Edo Japan had five great highways, the **五街道 Gokaidō**; **街道 *kaidō*** is the correct
  general word for such a route.
- The Tōkaidō demonstrably ran through **ten provinces (国 *kuni*)**: Musashi, Sagami, Izu,
  Suruga, Tōtōmi, Mikawa, Owari, Ise, Ōmi, Yamashiro. Modern presentations of the road
  routinely group its stations provincially ("Stations 1–4 in Musashi Province").
- **But there was no attested administrative tier between route and station.** Provinces
  were a reference frame, not a subdivision of a highway. Barriers (関所 *sekisho*) were
  too few and irregular to partition a road; distance markers (一里塚 *ichirizuka*) measured
  rather than grouped. Sequential 1–53 station numbering also appears to be modern
  convention, not Edo administrative practice.

So the province tier is **a grouping we impose** — on real, named, well-documented
geography that others already group by, but ours. The docs must not claim the bakufu
chunked highways this way.

## Decision

We will adopt a four-level hierarchy: **Course → Road (街道) → Province (国) → Station (宿)**.

- **Road** — one leg of the journey: a whole script or domain. Today: Hiragana (authored),
  Katakana, First kanji, Words & sentences (declared, empty).
- **Province** — replaces **Module** everywhere, learner-facing and internal. Hiragana's
  four modules become Road 1's four provinces, unchanged in content.
- **Station numbering stays global 1..N.** Progress remains a single furthest-unlocked
  station index, as Tōkaidō post-towns were counted along the whole highway rather than
  per province.
- **Only the current road's path is drawn**, with a quiet dashed seam and a `ROAD N 街道`
  label marking each boundary. Navigation is **roads-then-provinces** — two bounded lists
  (~8 roads, ~5 provinces) instead of one unbounded one. Glide arrows are scoped to the
  current road.
- A road declared with **no provinces** renders as "Not yet built" and is inert — honest
  rather than a fake "coming soon"
  ([P5](../product/principles.md#p5--tell-the-truth-about-memory)).

Roads are the coarse commitment: **road boundaries are fixed** (one script or domain
each), while **province boundaries past Province 4 remain open**, decided as each
curriculum is authored. That asymmetry is what makes it safe to declare roads before
their content exists.

## Alternatives Considered

- **Keep three levels, rely on the chain** — the status quo, and the claim this ADR
  supersedes. A flat list of every province becomes the same endless scroll at 50+, and
  the single canvas keeps growing without bound. Rejected on the evidence.
- **Per-road separate canvases** — cutting the canvas at road boundaries would kill the
  "one continuous walkable road" feeling that is the core metaphor. Drawing per-road paths
  on *one* canvas gets the scale benefit while keeping one world; the seam becomes a
  legible place rather than a wall.
- **Serpentine / 2D folding of the path** — folding a long path into a 2D field to avoid
  the 30,000px line. Rejected: it solves a problem the road tier already deletes (no
  single road approaches that length), breaks the left→right reading direction, and
  requires generating 2D coordinates. Revisit only if one road ever exceeds ~25 stations.
- **Islands / Worlds** — break the route metaphor (you don't walk a continuous road onto
  an island) and "World 2" is platform-game vocabulary, colliding with
  [P1](../product/principles.md#p1--learning-over-engagement),
  [P6](../product/principles.md#p6--respect-the-learner) and the DESIGN anti-gamification
  stance.
- **Region** — structurally identical to Province, but a vague modern word where 国 is the
  specific historical one with real named referents.
- **Stage / Chapter / Leg** — *Stage* reads as a game level; *Chapter* collides with the
  book-stop/codex reading layer; *Leg* was already ambiguous at two scales, so promoting
  it to a tier would have made the ambiguity permanent.
- **Restarting station numbers per road** — friendlier numbers (`STATION 3` forever), but
  progress becomes a `(road, station)` pair threaded through every helper, plus a
  localStorage migration, for a cosmetic gain. Rejected; see Consequences for the
  deferred display-only fallback.

## Consequences

**Easier.** The map is bounded at every level: one road on the canvas, two short lists to
navigate, arrows that can't require 50 clicks. Later curricula can be *declared* (and
shown honestly as unbuilt) long before they're authored — appending a province to a road
requires no code change. The hierarchy is now one metaphor end to end, and "leg of the
journey" has exactly one meaning.

**Accepted downsides.**

- **Station numbers grow large.** Global numbering means later roads show `STATION 63 宿`.
  If that ever reads badly the fix is a display-only `ROAD 3 · STATION 12` form —
  deliberately deferred, not designed.
- **Road boundaries are now a commitment** even though province boundaries aren't. If
  katakana and kanji turn out to belong on one road, that's an ADR to write.
- **The overview is two taps deep** instead of one, for a road hop. Within a road — the
  common case — it's still one tap.
- **The province tier is historically imposed**, not attested. Named as such here so no
  future doc overstates it.
- **One learner-visible URL change**: lessons moved from `/modules/*` to `/provinces/*`,
  covered by a permanent redirect in `next.config.ts`.

## Related

- [world-map.md](../curriculum/world-map.md) — the structure and behavior this ADR sets;
  contains the explicit correction of the superseded scaling claim.
- [stations.md](../curriculum/stations.md) — the roster, now under road headings.
- [station-map.md](../curriculum/station-map.md) — province boundaries beyond hiragana
  stay open; road boundaries are fixed.
- [glossary.md](../product/glossary.md) — **Road** and **Province** entries; *Module*
  retired.
- [P1](../product/principles.md#p1--learning-over-engagement),
  [P5](../product/principles.md#p5--tell-the-truth-about-memory),
  [P6](../product/principles.md#p6--respect-the-learner),
  [P10](../product/principles.md#p10--depth-before-breadth).
- Sources: [53 Stations of the Tōkaidō](https://en.wikipedia.org/wiki/53_Stations_of_the_T%C5%8Dkaid%C5%8D),
  [Edo Five Routes](https://en.wikipedia.org/wiki/Edo_Five_Routes),
  [Shukuba](https://en.wikipedia.org/wiki/Shukuba),
  [Nippon.com on the Tōkaidō](https://www.nippon.com/en/japan-topics/g02415/),
  [Hiroshige's Tōkaidō (Kawaharada)](https://denniskawaharada.wordpress.com/hiroshiges-tokaido-0/).

<!-- ARCHIVE-SOURCE-END: docs/decisions/0005-roads-and-provinces.md -->

---

<!-- ARCHIVE-SOURCE-START: docs/decisions/0006-provinces-and-tracks.md -->

# 0006 — Provinces (国) and tracks (線): renaming the 0005 tiers

- **Status:** Accepted
- **Date:** 2026-07-25
- **Deciders:** project founder
- **Supersedes:** [0005](./0005-roads-and-provinces.md) — *partially*: the structure,
  scaling model and global station numbering stand; only the tier **names** and the
  province-switching interaction change.

## Context

[ADR 0005](./0005-roads-and-provinces.md) added a tier above the old "module" and named
the result **Course → Road (街道) → Province (国) → Station (宿)**. The structure was right
and is unchanged here. Two things about it were wrong in use.

**1. The geography was inverted.** A *road* was the large container and a *province* the
small one — but provinces are regions that roads run *through*, not the reverse. The
naming inverted the real size relationship, which is exactly the kind of detail that
quietly makes a metaphor feel off without the reader being able to say why.

**2. Switching the top tier was buried.** Reaching another road took two taps through a
back button (`nav label → ‹ Roads → pick`). Changing script — hiragana to katakana — is a
meaningful move, and it was harder to find than stepping one province sideways.

## Decision

We will rename the tiers to **Course → Province (国) → Track (線) → Station (宿)**:

| 0005 | 0006 | Label |
|---|---|---|
| Road | **Province** | `PROVINCE N 国` (*kuni*) |
| Province | **Track** | `TRACK N 線` (*sen*) |
| Station | Station (unchanged) | `STATION N 宿` (*shukuba*) |

Sizes now nest the way the words do: a province is a region you cross, a track is a run of
line inside it, a station is where you stop.

We will also **split the nav label into two tap targets in one card**: the top row
(province name) opens the province list; the bottom row (track name) opens this province's
tracks. One tap to either level; the `‹ Provinces` back step remains as a way up from the
track list but is no longer the only route.

We will also give **each track its own hue** on the map — the walked ink, its station
rings, the `TRACK N` nav label and its card edge — so a stretch of path and its name read
as one object. This adds a third color family to a system that
[DESIGN §2](../design/DESIGN.md) had held to two pigments, and is bounded accordingly:
hues are matched in lightness and chroma (categorical, never a ranking), held clear of
vermilion, **carry grouping only** (state stays shape + label, and *current* overrides hue
with vermilion), restart at each province, and are scoped to the map alone. The map must
remain fully readable under `grayscale(1)`; that is the acceptance test.

Everything else from 0005 is retained unchanged: global station numbering 1..N, the single
furthest-unlocked-index progress model, the dashed seam at province boundaries, "Not yet
built" for declared-but-unauthored provinces, and the bounded-lists-at-both-levels scaling
argument. (Path ink is now drawn per *track* rather than per province, so each track can
carry its hue; segments join at the shared station, so the visible seam is still only at
province boundaries.)

### The metaphor cost, stated plainly

**"Track" is railway vocabulary; 宿 *shukuba* are Edo-period post-towns on walking
highways.** The eras are mixed on purpose — "track" is the plain English word that pairs
with "station", and the middle tier needed to be concrete for a beginner. The cost is that
線 is *not* historical alongside 宿, and no doc should imply it is.

The walking-era alternatives were 道 (*michi* — already the brand mark, too load-bearing to
spend on a tier) and 筋 (*suji*, a route/line — accurate but obscure to a learner). "Line"
was also considered and is arguably the better railway word (the Yamanote Line), but
"track" was chosen for concreteness.

The 0005 caveats still hold and are restated here: the historical highway system was
**two-tiered** (route and station, no attested layer between), so the *track* tier is a
grouping we impose; the famous "53 stations" is a print-series number where official
records support 57; and sequential 1–53 numbering is modern convention, not Edo practice.

## Alternatives Considered

- **Keep Road → Province** (0005 as-is) — rejected: the inverted size relationship is the
  whole reason this ADR exists.
- **Province → Road → Station** — fixes the ordering while keeping the middle tier in the
  Edo walking-road era, so 街道 and 宿 stay consistent. Rejected in favour of the more
  concrete "track"; this remains the cheapest reversal if the railway mixing grates.
- **Province → Line → Station** — "Line" is the railway term that genuinely pairs with
  "Station" in English and Japanese (山手線). A close call; "track" won on concreteness.
- **Renaming Station too** (to keep one era) — rejected: *STATION N 宿* is the most
  established label in the product, appears on every stop, and is the one piece of this
  vocabulary that was never in question.
- **Leaving province-switching at two taps** — rejected: it is a rare action, but rare and
  *significant*. Two taps for "start katakana" undersold the moment.

## Consequences

**Easier.** The hierarchy reads at a glance and the sizes are no longer backwards.
Switching province is one tap from the map. "Module" is fully retired from the product.

**Accepted downsides.**

- **A second rename in one day**, touching ~200 references across code and docs. Mitigated
  by tests and a link check, but the churn is real and recorded here so the next renaming
  impulse is weighed against it.
- **Lesson URLs moved twice**: `/modules/*` → `/provinces/*` → `/tracks/*`. Both old forms
  keep working via permanent redirects in `next.config.ts`; note that `/provinces/*` now
  redirects *away* from a word still used in the product, which is briefly confusing when
  reading the config.
- **Mixed metaphor eras** (線 railway vs 宿 highway), as stated above.
- **A third color family** on a deliberately two-pigment system. Constrained as above, but
  it is a real widening of the palette and the map is now the one screen where color does
  categorical work. If it ever reads as decoration, the tonal fallback (one hue stepped
  through lightness) is the retreat.
- **The 0005 file remains on disk and is now partly inaccurate** in isolation. It is
  immutable per [decisions/README](./README.md); this ADR is the pointer that corrects it.

## Related

- [0005](./0005-roads-and-provinces.md) — the structure and scaling argument this ADR
  keeps; superseded only on naming and the switching interaction.
- [world-map.md](../curriculum/world-map.md) — terms, tree, behavior.
- [glossary.md](../product/glossary.md) — **Province** and **Track** entries.
- [stations.md](../curriculum/stations.md) · [station-map.md](../curriculum/station-map.md)
- [P1](../product/principles.md#p1--learning-over-engagement),
  [P5](../product/principles.md#p5--tell-the-truth-about-memory),
  [P6](../product/principles.md#p6--respect-the-learner).

<!-- ARCHIVE-SOURCE-END: docs/decisions/0006-provinces-and-tracks.md -->

---

<!-- ARCHIVE-SOURCE-START: docs/decisions/0007-tokyo-subway-theming.md -->

# 0007 — Theme the world map as the Tokyo subway

- **Status:** Accepted
- **Date:** 2026-07-25
- **Deciders:** project founder
- **Amends:** [0006](./0006-provinces-and-tracks.md) — resolves the mixed-metaphor caveat
  it recorded; the Province → Track → Station structure is unchanged.

## Context

[ADR 0006](./0006-provinces-and-tracks.md) named the tiers Province (国) → Track (線) →
Station (宿) and recorded an accepted downside: **線 is railway vocabulary while 宿
*shukuba* are Edo-period post-towns on walking highways.** Two eras, mixed, with the docs
instructed not to claim otherwise.

Separately, four hues had been chosen for the tracks. Checking them against the Tokyo Metro
palette produced a striking result — they are that palette, essentially exactly:

| Track hue | Line | Official | Delta (sum of RGB channels, /765) |
|---|---|---|---|
| `#FD9701` | Ginza 銀座線 | `#FF9500` | 5 |
| `#F62E34` | Marunouchi 丸ノ内線 | `#F62E36` | 2 |
| `#00BC87` | Chiyoda 千代田線 | `#00BB85` | 3 |
| `#8F76D7` | Hanzomon 半蔵門線 | `#8F76D6` | 1 |

Given that, the subway reading was already latent in the design. Committing to it turns the
0006 caveat from a compromise into the point: with 駅 *eki* instead of 宿, the whole
vocabulary — 駅, 線, line names, line colors — belongs to one real system.

## Decision

We will theme the world map as the **Tokyo subway**.

- **Stations become real Tokyo stations.** Each carries its place name in **kana** as the
  headline (あさくさ, うえの, しんじゅく), above `Asakusa Station 駅`, with the lesson title
  beneath. **No line code on the label** — `G-01` was tried and removed: the track's color
  and the nav label already state the line, and a code was a third encoding of the same fact
  competing with the two things the learner is actually there to read. `Track.code` survives
  for the track cards (`G · Ginza Line`).
- **Tracks become real Tokyo Metro lines**, presented as `GINZA LINE 銀座線` and drawn in
  that line's official color. `Track.line`, `lineKanji`, and `code` carry this.
- **宿 → 駅.** *Eki* is the word on every real station sign.
- **Track hues are pinned to real lines**, documented with their official values. Track 5
  moved from an invented `#2E9BF6` to Tozai's actual `#009BBF`.
- **Provinces keep 国** and stay named for what they teach (Hiragana, Katakana …). They are
  the one tier left from the older layer, and they group whole *scripts* — a scale no
  subway word covers.

### Romaji, and why this is not a P2 violation

Each station shows its romaji (*Asakusa*) beneath the kana.
[P2](../product/principles.md#p2--no-romaji-ever-as-a-reading-aid) forbids romaji **as a
reading aid** — a Latin gloss that lets the learner skip decoding kana they are being
taught. This is a different thing: a **place label**, in the same category as "Hiragana" or
"The K row", naming a station rather than glossing lesson content. No drill, no SRS item,
and no taught kana is ever accompanied by its romaji.

The line is worth stating precisely because it is thin: **if romaji ever appears next to
kana the learner is being tested on, that is a P2 violation regardless of this ADR.**

Station names were also chosen so the earliest ones are **readable as they are earned** —
あさくさ needs only あ/さ/く, うえの adds の. Later names use dakuten and youon freely
(しんじゅく, ろっぽんぎ); by then that is aspirational texture, not an obstacle.

## Alternatives Considered

- **Invented station names ("Toshi Station")** — the original suggestion. Rejected on
  fact: とし means "city" (都市) or "year" (年), not a place, so "Toshi Station" reads to a
  Japanese speaker roughly like "City Station". Real place names cost nothing extra and
  teach something true.
- **Kana-only invented names** (あい, こい …) chosen so every station is readable from the
  start. Genuinely tempting pedagogically — station 2 would become an "I can read this
  place name" moment. Rejected because the places would be fictional, and Michi's texture
  depends on Japanese being real. Partially recovered by ordering the real names so the
  first few are readable.
- **Keeping 宿** with a subway color palette — leaves 0006's mixed metaphor in place for no
  gain once the colors are admittedly Metro's.
- **Renaming provinces to subway vocabulary too** (a "Metro" per script) — rejected: no
  subway term describes "a whole writing system", and 国 already reads correctly at that
  scale.
- **Naming provinces after places as well** — rejected: it would collide with station place
  names ("Province 1: Shibuya" vs "Station 12: Shibuya").

## Consequences

**Easier.** The metaphor is now one coherent system rather than two eras borrowed from.
Track colors have an external source of truth, so "which hue for the next track" has a real
answer instead of a taste call. Real place names do orienting work that bare numbers did not —
"Asakusa" is memorable in a way "Station 1" is not, which softens the large-station-number
problem 0006 deferred.

**Accepted downsides.**

- **Romaji is now on screen**, in a narrow labelling role. Defensible, but it is a surface
  the docs must keep watching; see the boundary stated above.
- **Most real station names are not readable with the basic 46 kana** — ぎんざ, しんじゅく,
  ろっぽんぎ need dakuten, handakuten, sokuon, or youon. Only あさくさ, うえの, なかの and
  おおてまち are basic-46-clean. Accepted as aspirational texture.
- **A Tokyo-specific frame** on an app that teaches Japanese generally. If the curriculum
  ever moves to another language, this theming does not travel.
- **Official hex values are community-documented**, not first-party — Tokyo Metro publishes
  the color names but blocks automated fetching of a brand guideline. Values are within
  1–5/765 of the widely-used references.

## Related

- [0006](./0006-provinces-and-tracks.md) — the tier structure this themes; its
  mixed-metaphor caveat is now resolved.
- [world-map.md](../curriculum/world-map.md) · [glossary.md](../product/glossary.md) ·
  [DESIGN → Track hues](../design/DESIGN.md)
- [P2](../product/principles.md#p2--no-romaji-ever-as-a-reading-aid) ·
  [P6](../product/principles.md#p6--respect-the-learner)
- Sources: [Template:Ja-rail-color](https://en.wikipedia.org/wiki/Template:Ja-rail-color) ·
  [Tokyo Metro](https://en.wikipedia.org/wiki/Tokyo_Metro) · Japanese Wikipedia station
  articles for each kana reading.

<!-- ARCHIVE-SOURCE-END: docs/decisions/0007-tokyo-subway-theming.md -->

---

<!-- ARCHIVE-SOURCE-START: docs/decisions/README.md -->

# Architecture Decision Records (ADRs)

This directory records **significant decisions** — technical, pedagogical, or
product — along with the context that produced them and the consequences they carry.

## Why we keep ADRs

Docs like [vision.md](../product/vision.md) describe *where we are now*. ADRs capture
*how we got here*: the alternatives we weighed and why we chose as we did. Six months
from now, when someone (including future-you) asks "why don't we just use romaji for
beginners?" or "why SM-2 and not FSRS?", the answer is written down — so we don't
re-litigate settled decisions from memory, and so that *changing* a decision is a
deliberate act with a paper trail.

## What deserves an ADR

Write one when a decision:

- is expensive or painful to reverse (framework, storage, core algorithm), **or**
- shapes the product's identity (no romaji, honest decay), **or**
- represents a deliberate exception to a [principle](../product/principles.md).

Small, easily-reversed choices do not need an ADR. When in doubt, write a short one.

## Format

Each ADR is a numbered file: `NNNN-short-title.md`, using
[template.md](./template.md). Numbers are sequential and never reused. An ADR has a
**status**: `Proposed`, `Accepted`, `Superseded by NNNN`, or `Deprecated`.

**ADRs are immutable once accepted.** To change a decision, write a *new* ADR that
supersedes the old one, and update the old one's status to point at it. This
preserves the history of thinking.

## Index

| # | Title | Status |
|---|---|---|
| [0001](./0001-web-first-capacitor.md) | Web-first with Next.js + Capacitor | Accepted |
| [0002](./0002-no-romaji.md) | No romaji as a reading aid | Accepted |
| [0003](./0003-sm2-srs-algorithm.md) | Use SM-2 for spaced repetition | Accepted |
| [0004](./0004-stroke-data-source.md) | Stroke-data source for the drawing mechanic | Accepted |
| [0005](./0005-roads-and-provinces.md) | Roads (街道) and provinces (国) above stations | Superseded by 0006 (naming) |
| [0006](./0006-provinces-and-tracks.md) | Provinces (国) and tracks (線): renaming the 0005 tiers | Accepted |
| [0007](./0007-tokyo-subway-theming.md) | Theme the world map as the Tokyo subway | Accepted |

_Add new rows here as ADRs are written._

<!-- ARCHIVE-SOURCE-END: docs/decisions/README.md -->

---

<!-- ARCHIVE-SOURCE-START: docs/decisions/template.md -->

# NNNN — Short Decision Title

- **Status:** Proposed | Accepted | Superseded by NNNN | Deprecated
- **Date:** YYYY-MM-DD
- **Deciders:** who was involved

## Context

What is the situation and the forces at play? What problem are we solving? What
constraints (technical, pedagogical, product) apply? Link to relevant docs. This
section should let a future reader understand the decision *without already knowing
the answer*.

## Decision

The choice we made, stated plainly and in the active voice: "We will …".

## Alternatives Considered

The other real options, each with why it was not chosen. An ADR with no alternatives
is usually hiding the actual reasoning.

- **Option A** — …why not.
- **Option B** — …why not.

## Consequences

What becomes easier, harder, or newly required as a result. Include the downsides we
are accepting — every decision has them, and naming them now prevents surprise later.

## Related

- Links to principles, other ADRs, or docs affected by this decision.

<!-- ARCHIVE-SOURCE-END: docs/decisions/template.md -->

---

<!-- ARCHIVE-SOURCE-START: docs/design/DESIGN.md -->

# DESIGN.md — Michi visual system

The **how it looks** companion to the product docs. Strategy lives in
[vision.md](../product/vision.md) and [principles.md](../product/principles.md);
this file commits the visual decisions those principles imply. Typeface reasoning
is in [typography.md](./typography.md) — this file only references the tokens.

> **Register:** product. The design *serves* the learning; it never performs. The
> Japanese character is the only thing on screen allowed to be loud.

---

## 1. The feel

**Quiet & focused, light-first.** Ink on warm-neutral off-white, one accent used
sparingly. Calm and museum-like — the character is the hero, everything else
recedes. This is not a game and must never dress like one ([P1], [P6]).

One-sentence scene: *a 14-year-old at a desk in the evening, tracing characters
like a workbook.* That scene forces light-first, paper-like surfaces, and Klee One
as a textbook hand.

**Anti-references (what Michi must not look like):**

- Gamified language apps (Duolingo) — mascots, gems, streak-anxiety confetti. [P6]
- Marketing-page effect libraries (Aceternity-style aurora/beam/spotlight/3D-tilt).
  Spectacle is brand register; it fights [P4] the moment it distorts a glyph.
- Dashboard density — stat tiles, card grids, chrome competing for attention.

---

## 2. Color

**Strategy: restrained.** Tinted-neutral surfaces + two traditional pigments split
by *meaning*, plus one categorical set (track hues) scoped to the world map. All values
OKLCH.

The two colors are the classic Japanese pairing — **朱 (shu, vermilion)** and
**藍 (ai, indigo)** — and they never fight because they mean different things:

- **朱 Vermilion — rare emphasis.** Warm and distinctive, reserved for moments that
  genuinely need emphasis rather than routine answer feedback. Kept **under 10% of
  the surface**; nothing else is this saturated.
- **藍 Indigo — the ink & structure.** Cool; it holds still. It IS the near-black:
  primary text, the character, the primary button fill. Load-bearing, not decoration.

### 朱 Vermilion — rare emphasis

The red of torii gates and hanko seals — a mark made deliberately.

| Token | OKLCH | Role |
|---|---|---|
| `--accent`        | `oklch(0.545 0.190 32)` | focus rings, lesson & codex emphasis |
| `--accent-hover`  | `oklch(0.490 0.190 32)` | hover/pressed |
| `--accent-weak`   | `oklch(0.940 0.035 40)` | quiet tint when the accent needs a surface |

Vermilion does **not** mark "you are here" on the world map — that is form-only. See
*Track hues* below.

### 藍 Indigo — the ink (near-black) & primary action

The ink is indigo rather than a warm-tinted black — cool, deep, structural.

| Token | OKLCH | Role |
|---|---|---|
| `--ink`       | = `--color-navy` | primary text, the character, primary button fill |
| `--ink-muted` | `oklch(0.500 0.032 264)` | secondary text, prompts |
| `--ink-faint` | `oklch(0.620 0.026 264)` | hints, sound labels under glyphs |

### The two base pigments

Every neutral derives from these. **Never write `white`, `black`, or a raw hex** — use a
token, and add one here if none fits.

| Token | OKLCH | Role |
|---|---|---|
| `--color-paper` | `#F6EEE2` | **the off-white** — a warm cream. Michi's "white" everywhere: page, light text on dark fills, check marks. Never `#fff` — paper, not a screen |
| `--color-navy`  | `oklch(0.220 0.042 264)` | **the dark.** Deep blue-black, never `#000` — the ink the app is drawn in |

Measured on the cream: ink **15.1:1**, muted **5.2:1**, faint **3.2:1**, accent **4.7:1** — all clear.
The cream is darker than a cool white, so `--ink-faint` and `--accent` are tuned *for it*;
re-measure all four if the paper ever changes again.

### Neutrals (surface)

Tinted **warm** (hue ~78) to sit on the cream paper rather than reading grey-blue against
it. `--bg` and `--ink` are aliases of the two pigments above, so the pair stays in charge.

| Token | OKLCH | Role |
|---|---|---|
| `--bg`        | = `--color-paper` | app background |
| `--surface`   | `oklch(0.938 0.014 78)` | raised fills, option buttons |
| `--surface-2` | `oklch(0.906 0.018 78)` | hover on surfaces |
| `--line`      | `oklch(0.872 0.019 78)` | hairline borders, the trace guide |
| `--ink`       | = `--color-navy` | primary text, the glyph |
| `--shadow-card` | `0 1px 3px navy/7%` | elevation, tinted with the ink rather than neutral black |

### Track hues (world map only)

The one place a third color family is allowed. Each **track** on the
[world map](../curriculum/world-map.md) is a real **Tokyo Metro line**, drawn in that
line's official color — so the hue is not decoration, it *is* the line's identity.

| Token | Hex | Line | Official |
|---|---|---|---|
| `--color-track-1` | `#FD9701` | Ginza 銀座線 | `#FF9500` |
| `--color-track-2` | `#F62E34` | Marunouchi 丸ノ内線 | `#F62E36` |
| `--color-track-3` | `#00BC87` | Chiyoda 千代田線 | `#00BB85` |
| `--color-track-4` | `#8F76D7` | Hanzōmon 半蔵門線 | `#8F76D6` |
| `--color-track-5` | `#009BBF` | Tōzai 東西線 | `#009BBF` |

Each is within 1–5/765 of the official value (community-documented hex; Tokyo Metro
publishes the color *names* but blocks automated fetches of a brand guideline). Keep any
new track hue on a real line rather than inventing one.

These are bright and vary widely in lightness, so they are used at **derived strengths**,
all `color-mix`ed from the one token — change the hex and everything follows:

| Use | Strength |
|---|---|
| path ink, station rings, card left edge (nothing textual on them) | full |
| a surface with light text on it (the nav track row) | 55% with `--ink` |
| the hue as small text on paper (card labels) | 55% with `--ink` |
| unwalked path ink — a track is identifiable *before* it's reached | 55% with `--bg` |

The constraints that keep this from breaking §2's discipline:

- **Never light text on a raw hue.** Paper text fails AA on all four (2.1–3.8:1); on the
  55% fill it clears every one (**4.9–7.0:1**, measured). Don't fade it with `opacity`
  either — the 10px `TRACK N` label has no headroom.
- **Grouping only, never state.** done/current/locked are carried by **shape and weight**:
  done = filled + check, current = thick ring + halo + a map mark + pin, locked =
  thin faint ring. No state has a hue of its own, so "you are here" reads identically on
  every track color. The map must survive `grayscale(1)` with every state still
  distinguishable — check that after any change here.
- **Vermilion no longer marks current state.** It was ~6° from `#F62E34` in OKLCH and lost
  its meaning on the red track; it's now reserved for focus rings and lesson/codex
  emphasis.
- **Categorical, never a ranking** — a track's hue says *which*, never *how far*.
- **Scoped to the map.** These do not appear in lessons, drills, or the codex.
- Declared in both `:root` and `@theme` — see the note in `globals.css` for why (runtime
  composition vs. Tailwind utilities). Keep the two in sync.

### Semantic (feedback)

Feedback is brief and corrective — a slip is normal and recoverable ([P6]). After
any selection, the correct option snaps larger in indigo while every alternative
fades. A wrong press resolves with the same animation focused on the actual answer,
directing attention toward what should be learned rather than emphasizing the error.
Answer glyphs use Klee One at 600 weight and a larger size so the state reads
immediately.

A correct press is more rewarding than a correction: it pops to 140%, gains a soft
glyph-only indigo glow, and fully dissolves the alternatives. A revealed answer after
a miss stays at the quieter 125% treatment. Neither animation rebounds or scales down.

> **Contrast** (measured on the `#F6EEE2` paper): `--ink` **15.1:1**; `--ink-muted`
> **5.2:1** (body ✓); `--ink-faint` **3.2:1** — large glyphs/labels only, not body copy;
> `--accent` **4.7:1** (✓ text and large UI); `--color-paper` on `--ink` **15.1:1**
> (button ✓). Re-check any new pairing against WCAG AA.

---

## 3. Typography

Full reasoning in [typography.md](./typography.md). Tokens:

| Token | Family | Use |
|---|---|---|
| `font-kana` | **Klee One** | every Japanese glyph — must match the tracing hand [P4] |
| `font-sans` | **system stack** | all Latin UI (default `font-sans`) |
| `font-jp`   | *Noto Sans JP (later)* | Japanese body text; not loaded until there's any |

- **The glyph is the display type.** No separate display font — the character *is*
  the hero. Sizes range `text-5xl` (grids) → `text-[9rem]` (teach/trace).
- Latin copy: one family (system), weight for hierarchy. Prompts `text-lg`
  `--ink-muted`; body caps at ~65ch; `text-balance` on headings.
- Never romaji as a reading aid ([P2]). `say`/`hint` are English pronunciation
  cues, styled as faint labels, never a Latin transliteration of the kana.

---

## 4. Layout & space

- **One thing per screen.** A step is a single centered column, `max-w-[600px]`,
  vertically centered with breathing room. No sidebars, no persistent chrome — just
  the step and a quiet ← Back.
- **Generous, varied space** — the emptiness is the design; it's what lets the
  character be loud. Don't fill it.
- Flexbox for the column; Grid only for the option rows.
- **No cards by reflex.** Option buttons are the one justified surface (they're
  tap targets). Never nest surfaces.
- Touch targets ≥44px (mobile-first — this ships to phones via Capacitor, [P9]).
- The four practice modes share one drill shell: `text-sm` muted prompts, `gap-8`
  vertical rhythm, and a 9rem/600-weight primary glyph where the task has one focal
  character. Multi-choice glyphs stay smaller so the full set remains scannable.
- Speak and Write confirm through the shared floating Next control; choice modes
  advance from the answer itself.
- Speak and Write keep question-level history: Back returns to the previous glyph,
  and Next returns to the glyph the learner left. On the first item, Back exits to
  the previous mode.

### Desktop keyboard

- `Space` replays the current sound whenever replay is available.
- `←` goes back and `→` advances only when the corresponding navigation action is
  available.
- The intro slide directly after Welcome teaches the shortcuts once with styled
  keycaps. Later desktop replay hints use the same placement above the bottom nav:
  `tap glyph or press [Space] to replay` for glyph controls and `[Space] key to
  replay` for the Listen control. The hint disappears after Space is used.
- Keyboard-only hints are hidden below the desktop breakpoint. Mobile always retains
  a clear 52px replay control or a tappable glyph, with tap-specific copy only.
- Listen drills invert that treatment on desktop: the replay button disappears in
  favor of a quiet Space hint, leaving the larger answer glyphs as the visual focus.

### Buttons — one set, three weights

Every control in the app is the same button, differing only in weight. The styles
live in `globals.css` (`.btn`, `.btn-primary`, `.btn-secondary`, `.btn-ghost`,
plus the `.btn-icon` / `.btn-wide` modifiers); `src/components/button.tsx` wraps
them and renders an `<a>` when given `href`, so a link that acts like a control is
never styled by hand.

| Variant | Look | Use |
|---|---|---|
| `primary` | solid ink, paper text | the one action that ends a step ("Return to the path", Listen) |
| `secondary` | `--color-bg` with a `--color-line` border and card shadow | everything else: station nav, map arrows, codex footer |
| `ghost` | no chrome until hover | in-text and list controls |

The **secondary** look is the world map's (`.wm-arrow`, `.world-codex`,
`.wm-chain-close` all now compose `.btn-secondary`), so the nav inside a station
matches the nav on the map instead of being a second, softer style.

**A control at the edge of a range is disabled, never hidden.** A button that
vanishes reads as a bug, and a nav row whose buttons shift position under the
cursor is worse than an inert one. The station's back arrow on slide 1 and the
map's line arrows at a province boundary both stay put and grey out.

**The two navs are the same buttons, not the same shape.** The map's row is
`‹ [line card] ›`, because there you are choosing *which* line to look at, so the
card names the current one and opens the list. A station's row is `‹ ⌂ ›`: inside a
lesson there is no such choice, you can already see where you are, and a card
restating it would be one more thing to read without being one more thing to do.

Drill answer buttons are the deliberate exception: they carry no button chrome,
because they animate on answer (scale, fade, `answer-success`) and a frame would
fight that.

### Radius — small and quiet

No pills. Pills are the SaaS reflex; the primary button appears on nearly every
slide, so it must be *clearly noticeable but never in the way.*

| Token | Value | Use |
|---|---|---|
| `--radius`    | `6px`  | buttons — the default (`rounded-md`-ish) |
| `--radius-lg` | `12px` | option buttons, the trace canvas |

Small radius reads as "a tool," not "a product tour." One step above sharp so it
doesn't feel severe next to Klee's round handwriting.

---

## 5. Motion

Subtle, purposeful, **ease-out with no bounce** — this is a study tool, not a toy.

- Curve: `cubic-bezier(0.16, 1, 0.3, 1)` (ease-out-expo-ish). No elastic/spring.
- Steps slide in from the direction of travel (`step-enter`); reveal glyphs stagger
  in (`kana-rise`). Both already in `globals.css`.
- The answer state holds in place for ~1 second, then the drill advances.
- **Reduced motion is honored** (`prefers-reduced-motion` block exists) — animations
  collapse to near-instant, never removed entirely.
- Reach for a motion library (`motion`) only for the tracing drill's stroke
  animation; CSS covers everything else.

---

## 6. Components (current)

Small owned set on Tailwind v4 — **no component library** ([P10]: depth before
breadth; a UI kit is breadth). Aceternity-style effect kits are an explicit
anti-reference (§1).

| Component | Notes |
|---|---|
| `ContinueButton` / `ListenButton` | `--radius`, solid indigo `--ink` fill, white text; the primary action |
| Option button (`PickQuestion`) | Bare glyph or sound with a generous invisible hit area and no tile fill; Match options have no play icons and resolve with one sound only: the correct answer |
| Glyph button (teach / say-aloud) | the character IS the audio control; tap to replay |
| Trace canvas | placeholder; real version is the signature mechanic (ADR-0004) |
| Practice mode switcher | Listen · Match · Speak · Write; shared above the floating lesson nav |
| World map | The course as provinces (国) of tracks (線) of station circles (done / current / locked by shape, not color); each track in its own hue (see *Track hues* above). Move between tracks via bottom-left glide arrows, or tap the province / track name in the nav label for either list. Province boundaries show as a quiet dashed seam. Structure in [world-map.md](../curriculum/world-map.md) |

---

## 7. Tokens live where

**Wired.** The tokens live in a `@theme` block in `src/app/globals.css` as
`--color-*` / `--radius-*` keys, which generate the Tailwind utilities used across
`page.tsx` (`text-ink`, `bg-surface`, `rounded-[var(--radius-btn)]`,
…). No more stock `neutral`/`emerald`/`rose`. A dark theme, when added, overrides the
same `--color-*` vars under a `prefers-color-scheme` / `[data-theme]` block.

> **Tailwind v4 gotcha:** reference a radius var as `rounded-[var(--radius-btn)]`,
> not `rounded-[--radius-btn]` — the bare-property shorthand emits no rule and the
> corner silently renders sharp.

<!-- ARCHIVE-SOURCE-END: docs/design/DESIGN.md -->

---

<!-- ARCHIVE-SOURCE-START: docs/design/audio.md -->

# Voiceover Options for the Japanese Learning App

> **Status (2026-07-25):** shipping all 46 gojūon generated with **macOS `say`
> (Kyoko)** — free, offline, no account. See
> [What we actually shipped](#what-we-actually-shipped-2026-07-25) at the bottom
> for the evaluation behind that, including why neural TTS lost to a 2010-era
> concatenative voice for this specific job. The option comparison below is
> unchanged and still the reference for when there's a budget.

## The Core Problem

Japanese has pitch accent — words change meaning based on whether the pitch rises or falls on a syllable. 橋 (hashi = bridge) and 箸 (hashi = chopsticks) are written identically in hiragana but pronounced differently. A beginner learning from incorrect audio will internalize wrong patterns that are very hard to unlearn later. This makes audio quality more critical for Japanese than for most other languages.

Every option below is evaluated against that standard.

---

## Recommendation Summary

| Use case | Best option |
|---|---|
| MVP / getting started | ElevenLabs (narration) + Google Neural2 (drilling) |
| Production app | Native voice actor recording + Google Neural2 for generated sentences |
| Long-term / scalable | Hybrid: native recordings for core content, API for dynamic content |

---

## Option 1: ElevenLabs

**Best for**: Narrative moments, cultural intros, story narration, UI moments where expressiveness matters.

**Not ideal for**: Vocabulary drilling, character audio, phonetic precision work.

### Pricing (2026)

| Plan | Monthly cost | Characters/credits | Commercial rights |
|---|---|---|---|
| Free | $0 | 10,000 credits (~10 min) | No — must attribute ElevenLabs |
| Starter | $5 | 30,000 credits (~30 min) | Yes |
| Creator | $22 | 121,000 credits | Yes + voice cloning |
| Pro | $99 | 500,000 characters | Yes |
| Scale | $330 | 2,000,000 characters | Yes |

Annual billing saves ~17% across all paid plans.

### Pros
- Easiest API to integrate — excellent developer documentation
- Most expressive and human-sounding for narration
- Large selection of Japanese voices (male, female, various tones)
- Good for anime/dramatic content which fits the app's audience
- Fast to prototype with

### Cons
- Japanese pitch accent can be inconsistent
- Not designed specifically for language learning accuracy
- Free tier has no commercial rights — cannot ship a product on it
- Gets expensive at scale if used for all audio
- Credits system is slightly opaque (varies by model used)

---

## Option 2: Google Cloud TTS — Neural2

**Best for**: Vocabulary drilling, character audio, any audio where phonetic accuracy matters most.

### Pricing (2026)

| Tier | Cost per 1M characters | Free tier |
|---|---|---|
| Standard / WaveNet | $4 | 1M chars/month |
| Neural2 | $16 | 1M chars/month |
| Chirp 3 HD | $30 | — |
| Studio | $160 | — |

Neural2 is the sweet spot. The free tier (1M chars/month) is genuinely generous for a learning app at early scale.

### Scale estimate
1 million characters = roughly 500,000–700,000 short words or syllables. For a learner going through 20-30 new items per day, you're well within the free tier for a long time.

### Pros
- Most consistent Japanese pronunciation of all API options
- Handles pitch accent more reliably than competitors
- Generous free tier — likely free for a long time at early user scale
- Pay-as-you-go, no subscription required
- Widely used in production language apps
- SSML support (can control speed, pauses, emphasis — useful for learner audio)

### Cons
- Less expressive than ElevenLabs — sounds more "robotic" for narration
- Requires a Google Cloud account and some setup
- Not the best choice for story narration or cultural context moments
- Neural2 Japanese voice selection is smaller than ElevenLabs

---

## Option 3: OpenAI TTS

**Best for**: Realtime conversational features, if the app ever adds speaking practice.

### Pricing (2026)

| Model | Cost |
|---|---|
| TTS-1 (Standard) | $15 per 1M characters |
| TTS-1 HD | $30 per 1M characters |
| GPT-4o-mini-TTS | ~$0.015 per minute of audio |

No subscription — pure pay-as-you-go.

### Pros
- Currently ranked #1 for realtime TTS quality
- No credits or tiers — clean pricing
- Excellent if you later add conversational practice features
- Good Japanese quality, competitive with Google Neural2
- GPT-4o-mini-TTS supports natural-language steering (adjust speed, tone)

### Cons
- Slightly more expensive than Google Neural2 for the same quality level
- Less proven specifically for language learning apps
- Realtime features add latency complexity to the app
- Not as fine-grained SSML control as Google

---

## Option 4: Azure TTS (Neural)

**Best for**: Teams already in the Microsoft ecosystem, or apps needing very high volume at commitment pricing.

### Pricing (2026)

| Tier | Cost per 1M characters |
|---|---|
| Neural | $16 |
| Neural HD | $22 |
| Custom Neural | $24–$48 |
| Free tier | 500K characters/month |
| Commitment tier | As low as $7.50/1M |

### Pros
- Competitive pricing, especially at volume (commitment tiers)
- Good Japanese voice quality, 46+ Japanese voices available
- SSML support for fine-grained pronunciation control
- Free tier is decent (500K chars/month)

### Cons
- More complex setup than Google or OpenAI
- Smaller developer community for troubleshooting
- Not meaningfully better than Google Neural2 for this use case
- Best value only at high volume commitment tiers

---

## Option 5: Native Japanese Voice Actor (Recording Session)

**Best for**: Core hiragana set, core vocabulary, anything the learner will hear hundreds of times.

This is the gold standard and what serious language apps (Pimsleur, early Rosetta Stone) have always done. A human professional gets pitch accent right every time, brings natural rhythm and warmth, and produces audio the learner won't get fatigued by.

### Cost estimate

| Type | Rate |
|---|---|
| Freelance Japanese voice actor (remote) | ~$20–$65/hour |
| Professional studio session (Japan-based) | ~$300–$800/hour |
| Specialized dubbing/eLearning talent | ~$500–$1,500/hour |

For this app's core needs: the entire hiragana set (46 characters, each said 3-4 ways) + ~500 core vocabulary words is realistically a 3-5 hour session with a freelance voice actor. Budget roughly $200–$400 for that. A one-time cost.

Platforms to find talent: [Japan Voice Talent](https://www.japanvoicetalent.com), Voices.com, Voice123, or directly via Twitter/X where many Japanese voice actors advertise freelance work.

### Pros
- Unmatched quality — pitch accent is always correct
- Warm, human audio that doesn't cause listener fatigue
- No per-character cost ever again for recorded content
- One-time investment that pays off over the app's lifetime
- Allows the learner to form a connection to a consistent voice

### Cons
- Upfront cost and coordination effort
- Not scalable for dynamic/generated sentences
- Requires re-recording if you want to change something
- Can't cover every possible sentence the app might generate

---

## The Recommended Hybrid Approach

Don't pick just one. Use each option for what it's best at:

**Native voice actor** → all 46 hiragana characters, all katakana, core vocabulary (~500 words). These are heard hundreds of times each. Quality here matters most.

**Google Cloud TTS Neural2** → dynamically generated sentences, grammar examples, anything that can't be pre-recorded because it varies. Use SSML to set a slightly slower speed for beginner audio.

**ElevenLabs** → intro narration, "did you know" cultural moments, story narration once stories begin. Use a consistent character voice to give the app personality.

This hybrid approach gives you native-quality for everything critical, flexibility for dynamic content, and personality for narrative moments — at a cost that stays near zero until you have real users.

---

## Audio decision record (2026-07-25)

The shipped set is 46 human recordings by Kia Leng Koh, used by permission and
kept in `public/audio/hiragana/`. Earlier local-TTS evaluation still informs what
to revisit when Michi expands into vocabulary and connected speech.

### Earlier local-TTS finding

**For isolated morae, concatenative TTS beats neural TTS.** This is the opposite
of the usual ranking and worth recording, because it will look like a mistake to
anyone who only reads the comparison table above.

We evaluated [Kokoro](https://github.com/thewh1teagle/kokoro-onnx) (open-weight,
Apache-2.0, runs locally, 5 Japanese voices) as the ideal free option — no
account, no quota, unlimited regeneration, scales to vocabulary at zero cost. On
paper it dominates. In listening tests it lost to Kyoko, and the reason is
architectural:

- Kokoro is a **neural model trained on connected speech**. A single bare
  phoneme is far outside its training distribution, so isolated kana come out
  with odd onsets and unstable vowel quality.
- Kyoko is **concatenative/unit-selection**, built to pronounce arbitrary text
  including isolated characters. Older technology, but the right tool here.

A second, harder problem showed up in the Japanese G2P. `misaki` (Kokoro's
Japanese frontend) is **word-level** and applies real phonological rules — it
phonemized あいうえお as `a jɯː e o`, merging い+う into a `jɯː` glide. That is
correct for Japanese text and completely wrong for a syllabary chart, where each
kana must stay discrete. Working around it would mean fighting the G2P per-kana.

Both problems are specific to **isolated kana**. Kokoro remains a strong
candidate for **vocabulary and example sentences**, where context exists and the
G2P's word-level rules become an asset rather than a bug. Worth revisiting at
that stage — the setup is ~350 MB of model weights plus a venv, deleted after
this evaluation but reproducible from the notes in the section below.

### Also checked: Wikimedia Commons

Surveyed for a free, human, single-speaker set. **There isn't one.** The full
gojūon yielded **18 of 46 kana across three speakers**; the speaker behind our
original vowels covers only 10. Lingua Libre has 1043 Japanese recordings but
only 2 single kana — it is a word corpus, not a syllabary. Mixing speakers
mid-chart was rejected.

### The pitch-accent caveat, revisited

[The Core Problem](#the-core-problem) argues audio quality matters more for
Japanese than most languages, because of pitch accent. That still holds — but it
applies mainly to **words**. A single mora carries no contrastive pitch: there is
no 橋/箸 distinction to get wrong on あ. So TTS is a defensible choice for the
46-kana chart and a much riskier one for vocabulary, which is exactly where this
document's paid options earn their cost.

### Recreating the Kokoro evaluation

```sh
python3 -m venv ttsenv
./ttsenv/bin/pip install kokoro-onnx "misaki[ja]" soundfile
# model weights (~337 MB), from the kokoro-onnx releases:
curl -L -o kokoro-v1.0.onnx https://github.com/thewh1teagle/kokoro-onnx/releases/download/model-files-v1.0/kokoro-v1.0.onnx
curl -L -o voices-v1.0.bin  https://github.com/thewh1teagle/kokoro-onnx/releases/download/model-files-v1.0/voices-v1.0.bin
```

Japanese voices: `jf_alpha`, `jf_gongitsune`, `jf_nezumi`, `jf_tebukuro`,
`jm_kumo`. Note that `kokoro.create(...)` falls back to espeak-ng, whose bundled
data path is broken in this build — phonemize with `misaki.ja.JAG2P()` and pass
`is_phonemes=True` instead.

### Audio processing note

The shipped set is 46 human recordings, one speaker, in
[`public/audio/hiragana/`](../../public/audio/hiragana/). They run 0.8–1.6 s, so EBU
R128 (`loudnorm`) measures them properly and is what the trim/normalize pipeline uses.
Full recipe and measurements in
[`public/audio/hiragana/ATTRIBUTION.md`](../../public/audio/hiragana/ATTRIBUTION.md).

### When to revisit

- **Michi stops being free** → the Apple-voice assumption breaks; move to Google
  Cloud TTS or a voice actor.
- **Vocabulary work begins** → reassess Kokoro, where it should do well.
- **Budget appears** → a native voice actor (~$200–400, one-time) is still the
  right answer for content heard hundreds of times.

Every file is keyed to the `id` in `src/content/hiragana.ts`, so changing source
is file replacement, not code change — `src/lib/audio.ts` is agnostic by design.

---

## Sources

- [Google Cloud TTS Pricing](https://cloud.google.com/text-to-speech/pricing)
- [ElevenLabs Pricing 2026](https://costbench.com/software/ai-voice-tools/elevenlabs/)
- [OpenAI TTS Pricing](https://developers.openai.com/api/docs/pricing)
- [Azure TTS Pricing 2026](https://texttolab.com/blog/azure-text-to-speech-pricing)
- [Best TTS API for Language Learning 2026](https://inworld.ai/resources/best-voice-ai-for-language-learning-apps)
- [TTS APIs Compared for Language Apps](https://dev.to/pocket_linguist/text-to-speech-in-2026-comparing-5-tts-apis-for-language-apps-606)
- [Japan Voice Talent Pricing](https://www.japanvoicetalent.com/pricing)

<!-- ARCHIVE-SOURCE-END: docs/design/audio.md -->

---

<!-- ARCHIVE-SOURCE-START: docs/design/typography.md -->

# Typography

## Why Typeface Choice Matters More Than Usual

For most apps, typography is a visual preference. For a Japanese learning app, it's a pedagogical decision.

Many fonts write Japanese characters in stylized ways that differ from how they're actually taught in schools and written by hand. A learner who sees さ rendered one way on screen and then tries to write it differently in the drawing exercise gets confused. The font and the drawing mechanic must match. Pick the wrong typeface and you're actively undermining the teaching.

---

## The Three Typefaces

### 1. Klee One — Character Instruction
**Use for**: flashcard faces, drawing prompts, character introduction screens, hiragana/katakana reference grids.

Klee One is a Google Font designed to resemble natural, careful handwriting — exactly the style used in Japanese textbooks. When a learner sees a character in Klee One and then tries to draw it, they're copying the same form. No mismatch between what they see and what they're being taught to write.

This is the most important font choice in the app.

- Source: [Google Fonts — Klee One](https://fonts.google.com/specimen/Klee+One)
- Free, single import
- Covers hiragana, katakana, and kanji

---

### 2. Noto Sans JP — Japanese Body Text
**Use for**: vocabulary lists, example sentences, UI labels in Japanese, story text, grammar explanations containing Japanese characters.

Noto Sans JP is Google's universal Japanese typeface. The name "Noto" stands for "no tofu" — it was built so no character ever renders as an empty rectangle (called "tofu" by developers) because the font doesn't support it. At any size, on any device, every character renders correctly.

Clean, neutral, and highly legible. The safe workhorse for everything that isn't a direct teaching moment.

- Source: [Google Fonts — Noto Sans JP](https://fonts.google.com/noto/specimen/Noto+Sans+JP)
- Free, single import
- Covers hiragana, katakana, and 6,000+ kanji

---

### 3. System stack — English UI Text
**Use for**: menus, buttons, navigation, English instructions, headers, all Latin-script text.

The native system UI font (San Francisco on Apple, Segoe/Roboto elsewhere) — clean,
neutral, quiet next to the Japanese characters, and loaded already by every OS. Zero
font weight to ship. This is Tailwind's default `font-sans`; no import.

> **Decision (2026-07-20):** Inter was dropped in favor of the system stack. It bought
> nothing over the native fonts for a UI this text-light, and skipping it means one
> less font to load. Add Inter back (one line) if the Latin type ever looks off next
> to Klee One.

---

## When to Use Each

| Context | Typeface |
|---|---|
| Hiragana / katakana flashcard face | Klee One |
| Drawing exercise prompt character | Klee One |
| Character introduction screen | Klee One |
| Hiragana reference grid | Klee One |
| Vocabulary word (Japanese) | Noto Sans JP |
| Example sentences | Noto Sans JP |
| Story text | Noto Sans JP |
| Grammar notes (Japanese portions) | Noto Sans JP |
| All English UI (buttons, labels, menus) | Inter |
| Progress cards and stats | Inter |
| "Did you know" cultural notes | Inter |

---

## Loading All Three

All three are on Google Fonts and load with a single `<link>` tag or `@import`. No licensing, no cost, no self-hosting required (though self-hosting is recommended for performance and offline support via Capacitor).

```html
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Klee+One&family=Noto+Sans+JP:wght@400;500&display=swap" rel="stylesheet" />
```

For the Capacitor (offline) build, download the font files and bundle them with the app so they load without an internet connection.

<!-- ARCHIVE-SOURCE-END: docs/design/typography.md -->

---

<!-- ARCHIVE-SOURCE-START: docs/product/glossary.md -->

# Glossary

Shared vocabulary for Michi. Both the pedagogy and the architecture borrow terms
from linguistics, cognitive science, and Japanese itself. This is the single place
they're defined so the docs and code can use them precisely.

Terms are grouped by domain. Within each group they're roughly ordered by when
you'd first meet them.

---

## Learning Science

**Acquisition (vs. learning)**
In Krashen's framework, *acquisition* is the subconscious absorption of language
through meaningful input (how you got your first language); *learning* is conscious
study of rules. Michi prioritizes acquisition and uses explicit learning only as a
light assist. See [pedagogy.md](./pedagogy.md).

**Comprehensible Input**
Language input the learner can *mostly* understand from context. The engine of
acquisition. See also *i+1*.

**i+1**
Input pitched just one step above the learner's current level ("i") — hard enough
to stretch, easy enough to infer. The target difficulty for new content.

**Active Recall**
Retrieving information from memory without prompts (e.g., "write the kana for this
sound"). Produces strong memories.

**Passive Recognition**
Identifying the right answer among options (multiple choice). Feels productive,
produces weak memories. Used sparingly in Michi. See [P3](./principles.md#p3--production-over-recognition).

**Retrieval difficulty**
The effort of recalling something. The harder the (successful) retrieval, the
stronger the resulting memory — the principle behind favoring production.

**Motor memory**
Memory encoded through physical movement (handwriting strokes). A separate channel
that reinforces visual memory — the rationale for the drawing mechanic.

**Output Hypothesis**
Swain's claim that *producing* language (not just consuming it) is necessary for
acquisition; being forced to produce reveals gaps and accelerates learning.

**Forgetting curve**
The predictable decay of memory over time without reinforcement. SRS schedules
review against this curve.

---

## Spaced Repetition

**SRS (Spaced Repetition System)**
The algorithm that schedules *when* each item is reviewed — right before it would be
forgotten. See [srs-engine.md](../architecture/srs-engine.md).

**SM-2**
The SuperMemo-2 algorithm; the specific, open, ~20–30 line SRS algorithm Michi
uses. See [ADR-0003](../decisions/0003-sm2-srs-algorithm.md).

**Item**
Any single unit of knowledge tracked by the SRS: one hiragana, one word, one kanji,
one grammar pattern. Each has its own schedule.

**Interval**
The number of days until an item's next scheduled review. Grows on success, resets
shorter on failure.

**Ease factor**
A per-item multiplier (SM-2) that determines how fast its interval grows. Adjusted
by how easily the learner recalled it.

**Due / overdue**
An item is *due* when its next review date has arrived; *overdue* when that date has
passed unreviewed. Overdue items lose confidence.

**Confidence score**
A derived measure of how well the learner knows an item, computed from its SRS state
(long interval → high confidence; overdue → low). Powers the honest progress
surface and the decay mechanic. See [P5](./principles.md#p5--tell-the-truth-about-memory).

**Decay mechanic**
Michi's honest surfacing of forgetting: visible capability counts include only items
above the confidence threshold, so they fall if practice stops — framed as normal
and recoverable.

**Confidence threshold**
The cutoff a confidence score must exceed for an item to count toward visible stats
(e.g., "you know 200 words").

---

## Japanese Language

**Hiragana (ひらがな)**
The 46 core phonetic characters covering every Japanese sound; the foundation script,
taught first and in full.

**Katakana (カタカナ)**
A second set of 46 phonetic characters with the *same* sounds as hiragana, used for
loanwords, emphasis, and onomatopoeia. Taught second.

**Kanji (漢字)**
Chinese-derived logographic characters (~2,000 in everyday use). Introduced
gradually, embedded in real vocabulary.

**Gojūon (五十音)**
"Fifty sounds" — the traditional ordered grid of the kana, arranged by consonant row
and vowel column. Michi's teaching order follows it, one row per station. Named for its
10 × 5 shape, though only 46 cells are filled (the y- and w-rows have gaps, and ん sits
outside the grid). Explained to the learner in the codex entry *"Why the kana are
ordered as they are"*, unlocked after station 8.

**Mora**
The basic timing unit of Japanese sound. Japanese is *mora-timed*: each mora takes
roughly equal time. Most kana = one mora; small ゃゅょ and ん have special behavior.

**Pitch accent**
Meaning-bearing rises and falls in pitch across a word (e.g., 橋 *hashi* "bridge" vs.
箸 *hashi* "chopsticks"). Why audio accuracy is critical. See [audio.md](../design/audio.md).

**Romaji (ローマ字)**
Japanese written in Latin letters. A crutch Michi refuses as a reading aid. See
[P2](./principles.md#p2--no-romaji-ever-as-a-reading-aid) and
[ADR-0002](../decisions/0002-no-romaji.md).

**Particle**
A short grammatical marker (は, が, を, の, …) that indicates a word's role in a
sentence. Introduced in context as they appear.

**SOV (Subject–Object–Verb)**
Japanese word order — the verb goes last ("I sushi eat"), the opposite of English
SVO. Taught explicitly and early.

**Stroke order**
The correct, fixed sequence in which a character's strokes are drawn. Meaningful to
how characters look and deeply ingrained in native writing; taught correctly from
the start.

---

## Product & Content

**Session**
One 15–25 minute unit of study with a clear end state: review → new content →
practice. See [P7](./principles.md#p7--sessions-always-complete).

**Lesson**
An authored unit of new content (e.g., "the k-row") that introduces items and
exercises. Composed into the curriculum. See [content-model.md](../curriculum/content-model.md).
On the world map a lesson is presented as a **Station**.

**Station**
The map/navigation name for one stop on the path — corresponds one-to-one to a
**Lesson**. Presented as a real Tokyo station — its place name in kana (あさくさ) over
*Asakusa Station 駅* (*eki*, station). Numbered continuously across the course.
See [world-map.md](../curriculum/world-map.md).

**Track**
An ordered group of stations (currently ~3–5) — the run of line they sit on, roughly a
curriculum unit. Presented as a real **Tokyo Metro line** (*Ginza Line 銀座線*) whose
official color is the track's hue, alongside what it teaches ("First sounds"). Completing a
track unlocks the next. Replaces the earlier terms *Module* and, briefly,
*Province-as-middle-tier*.
See [world-map.md](../curriculum/world-map.md).

**Province**
An ordered group of tracks — one **leg of the journey**: a whole script or domain
(Hiragana, Katakana, First kanji, …). Labeled *PROVINCE N 国* (*kuni*, the old provinces a
traveller crossed). Provinces bound the map: only the current province's path is drawn,
and the learner moves via glide arrows within a province, or jumps by tapping the province
or track name in the nav label — one tap to either list. A province declared without
content reads "Not yet built". See
[world-map.md](../curriculum/world-map.md) and
[ADR 0006](../decisions/0006-provinces-and-tracks.md).

**World map ("the path")**
The learner-facing surface that presents the course as a walkable path of stations
grouped into tracks grouped into provinces — the navigation and progress home.
Structure in [world-map.md](../curriculum/world-map.md); look & feel in
[DESIGN.md](../design/DESIGN.md).

**Book stop**
An optional reading marker beside the path, between stations. Supplementary lore about
how Japanese is built and where it came from — never required, never drilled, never
gates a station; unlocks when its topic becomes relevant. See
[station-map.md §3](../curriculum/station-map.md#3-book-stops--the-codex--the-lore-without-front-loading).

**Codex**
A browsable collection of every lore drip the learner has encountered — from inline
"did you know" beats and from book stops — revisitable anytime from the map. Records
what's been met (never front-loads), decoupled from the required path. See
[station-map.md §3](../curriculum/station-map.md#3-book-stops--the-codex--the-lore-without-front-loading).

**Exercise**
A single interactive task: recognition, active recall, drawing, listening, sentence
arrangement, etc.

**Knowledge snapshot**
A periodic (e.g., weekly/monthly) honest summary of tested capability, including any
decay since last time.

**Capability count**
A user-facing, honest number of what the learner can actually do now ("read 46
hiragana," "know 200 words") — counting only items above the confidence threshold.

---

## Technical

**Capacitor**
The wrapper that packages the web app as a native iOS/Android app from one codebase.
See [tech-stack.md](../architecture/tech-stack.md).

**Offline-first**
An architecture where core functionality works without a network, syncing later if
at all. See [P9](./principles.md#p9--offline-first-one-codebase).

**ADR (Architecture Decision Record)**
A short document capturing one significant decision, its context, and its
consequences. See [decisions/README.md](../decisions/README.md).

**SSML**
Speech Synthesis Markup Language — used to control TTS speed, pauses, and emphasis
for beginner-friendly audio. See [audio.md](../design/audio.md).

<!-- ARCHIVE-SOURCE-END: docs/product/glossary.md -->

---

<!-- ARCHIVE-SOURCE-START: docs/product/pedagogy.md -->

# Japanese Learning App — Pedagogy & Design Philosophy

## What This App Is

A Japanese learning app built for a 14-year-old, from scratch, with real learning science at its core. Not a gamification machine optimized for daily active users. A tool that actually teaches.

Inspired by Duolingo in format, but different in philosophy: this app prioritizes genuine language acquisition over engagement metrics. If that means fewer notifications and no streak anxiety, good.

---

## What Duolingo Gets Wrong

Duolingo optimizes for *engagement* — streaks, XP, hearts, push notifications — not for *learning*. Research shows it produces modest vocabulary retention but is weak at grammar acquisition, real comprehension, and speaking ability.

The core problem: it teaches users to complete exercises, not to understand the language. For Japanese specifically, it leans on romaji (romanized Japanese characters) as a crutch, which actively slows learners down by preventing them from building a native phonological map of the language.

This app does not use romaji. Ever.

---

## Core Learning Science Principles

### 1. Comprehensible Input (Krashen's Input Hypothesis)
Language is acquired — not learned — by consuming input that is just slightly above the learner's current level, known as "i+1". Not isolated vocabulary lists. Not grammar drills. Actual language in context, where meaning is inferable.

Analogy: You didn't learn your first language from a textbook. You were surrounded by language that made sense in context, and your brain did the pattern recognition. This app tries to recreate that process, guided and structured.

### 2. Spaced Repetition (SRS)
Memory decays in a predictable curve. Spaced repetition systems exploit this by scheduling review of each item right before it would be forgotten. Items you struggle with appear more often. Items you know well appear less often.

Every word, character, and grammar pattern in this app lives inside an SRS. Nothing is ever "done." Everything cycles back.

### 3. Active Recall Over Passive Recognition
Multiple choice is too easy. Passive recognition ("does this mean river or mountain?") produces weak memories. Active recall ("write/say the Japanese word for river") produces strong ones.

The difficulty of retrieval is proportional to the strength of the resulting memory. This app biases heavily toward production exercises, not recognition exercises.

### 4. Motor Memory (Writing)
When learners write characters by hand (or by tracing on screen), they encode information in a separate memory channel — motor memory — that reinforces visual memory. This is why people who write vocabulary by hand remember it better than people who type it.

Every character in this app can be practiced through drawing exercises. Stroke order is taught correctly from the start, not as an afterthought.

### 5. Output Hypothesis
You cannot become fluent by consuming language alone. Being *forced* to produce language — even clumsily — accelerates acquisition significantly. This app includes production exercises throughout, not just at advanced stages.

---

## Japanese-Specific Considerations

### Three Writing Systems
Japanese uses three scripts simultaneously, sometimes in a single sentence:

- **Hiragana** — 46 phonetic characters, covers all Japanese sounds. The foundation of everything.
- **Katakana** — another 46 phonetic characters with the same sounds as hiragana. Used for foreign loanwords, emphasis, and onomatopoeia.
- **Kanji** — Chinese-derived logographic characters. Japanese uses roughly 2,000 in everyday life.

The order matters: hiragana first, fully, before anything else. Katakana second. Kanji gradually, embedded in real vocabulary.

### No Romaji Policy
Romaji (writing Japanese sounds in the Latin alphabet) is a crutch. It prevents learners from building a proper mental model of the language and slows hiragana acquisition. This app introduces the Japanese sound system and then immediately teaches it through hiragana. The Latin alphabet is never used as a reading aid.

### Grammar Structure
Japanese word order is Subject-Object-Verb, the opposite of English. Verbs go at the end. This is introduced explicitly and early, with clear explanation, not left to inference.

### Sound System
Japanese is mora-timed: every syllable takes roughly the same amount of time. There are no silent letters, no irregular pronunciations. Once the sounds are learned, anything can be read and pronounced correctly. This is framed as good news early in the learning journey.

---

## Cultural Context: Earn It, Don't Front-Load It

Japanese has a genuinely fascinating origin story. Kanji were borrowed from China and adapted. Then Japanese invented two phonetic alphabets — hiragana and katakana — on top of that system. The result is a writing system unlike anything in Europe.

This context matters for motivation and mental modeling, but it should not be dumped upfront as a lecture. Instead:

- A short, engaging intro (5 minutes maximum) when the app is first opened.
- "Did you know" moments dripped in throughout the learning journey, timed to when they're relevant. When katakana is introduced: "This script was invented by Buddhist monks in the 800s."
- Cultural context makes learning feel like exploration, not homework.

For a 14-year-old specifically: anchor to relevance. If he's into anime, gaming, or Japanese music, those are valid and powerful hooks. The sentences and examples in this app should feel real and interesting, not like textbook filler.

---

## The Drawing Mechanic

One of the most distinctive features of this app. Each character can be practiced by drawing it on screen.

Why this works:
- Motor memory is a separate and reinforcing encoding channel.
- Stroke order is meaningful — it affects how characters look when written quickly and is deeply ingrained in native speakers.
- The satisfaction of drawing a character and having it recognized is a strong feedback loop.

Implementation notes:
- Canvas-based drawing input, checking stroke accuracy via path-matching.
- Strokes are shown one at a time as hints when the learner is stuck.
- Simple characters are introduced first (く, し, つ — one or two strokes).
- Stroke order is always shown correctly, never skipped.

---

## Progress Visibility: Honest, Not Punishing

Instead of abstract XP and levels, this app shows the learner what they actually know:

> "You can read 46 hiragana. You know 200 words. You can understand sentences like: 川は青い (The river is blue)."

This is meaningful, concrete, and motivating. It reflects real capability, not points accumulated.

### The Decay Mechanic

Memory fades without reinforcement. The app reflects this honestly.

Each word, character, and grammar pattern has a confidence score. That score decays over time if not reviewed. The visible stats ("you know 200 words") only count items above a confidence threshold. If practice stops, the number goes down — not as punishment, but as an accurate reflection of reality.

A weekly knowledge snapshot is surfaced every Monday:

> "Last week: 187 words. This week: 194 words. Keep going."

Or, after a quiet week:

> "You've slipped from 194 to 181. A quick review session will bring most of it back fast."

Tone is crucial here. The message is always: *memory is normal, review is fast, you've got this.* Not: *you failed, your streak is broken.*

---

## Session Design

Each daily session should take 15-25 minutes maximum. Broken into:

1. **Spaced repetition review** (5-10 min) — review of due items from the SRS deck.
2. **New content** (5-10 min) — one small new concept, introduced clearly.
3. **Practice** (5 min) — drawing, listening, or production exercise on the new content.

Sessions should always feel completable. Never open-ended. A clear end state ("today's session complete") matters.

---

## What "Better Than Duolingo" Actually Means

| Duolingo | This App |
|---|---|
| Romaji crutch | No romaji, ever |
| Recognition-heavy exercises | Production-heavy exercises |
| Abstract gamification | Concrete capability tracking |
| Weird, decontextualized sentences | Culturally relevant, real sentences |
| No explicit grammar | Clear, light grammar explanations |
| Engagement-optimized | Learning-optimized |
| Decay hidden from learner | Decay shown honestly |
| Writing as afterthought | Writing as core mechanic |

---

## Extension to Other Languages

The pedagogical framework here is language-agnostic. When extending to other languages, the same principles apply:

- No romanization crutches for languages with other scripts (Arabic, Korean, Thai, etc.)
- Comprehensible input from the start
- SRS for all content
- Cultural context dripped in over time
- Honest progress tracking with decay

Japanese is the hardest major language for English speakers, so building the system for Japanese first means it will handle anything else with less effort.

<!-- ARCHIVE-SOURCE-END: docs/product/pedagogy.md -->

---

<!-- ARCHIVE-SOURCE-START: docs/product/principles.md -->

# Design Principles

These are Michi's non-negotiables. [vision.md](./vision.md) explains *what* we're
building and *why*; this document is the short, enforceable list of rules that any
feature, exercise, or line of code must respect. When a decision is unclear, come
back here.

Each principle is stated as a rule, with its rationale and a concrete test you can
apply during design and review.

---

## P1 — Learning over engagement

**Rule:** Every feature is justified by how it helps the learner acquire the
language. Engagement is a side effect of good learning, never the goal.

**Why:** You optimize what you measure. Optimizing engagement produces addictive
mediocrity; optimizing learning produces learning.

**Test:** *"Would this feature earn its place if it increased learning but had zero
effect on daily opens?"* If no, cut it.

---

## P2 — No romaji, ever (as a reading aid)

**Rule:** Japanese is never rendered in the Latin alphabet to help the learner
read or pronounce it. Sounds are taught, then immediately bound to hiragana.

**Why:** Romaji prevents the formation of a native phonological map and slows
hiragana acquisition. See [ADR-0002](../decisions/0002-no-romaji.md).

**Allowed exception:** Romaji may appear *once*, explicitly, to explain why we
don't use it — and in English UI chrome that has nothing to do with reading
Japanese. It is never a pronunciation guide.

**Test:** *"Could the learner lean on the Latin letters instead of the kana here?"*
If yes, remove them.

---

## P3 — Production over recognition

**Rule:** Bias every exercise toward active recall and output — write, recall,
produce, arrange — over passive multiple-choice recognition.

**Why:** Retrieval difficulty is proportional to resulting memory strength.
Recognition feels like progress but builds weak memories.

**Test:** *"Is the learner retrieving from memory, or just picking the least-wrong
option?"* Recognition is allowed only as a scaffold on brand-new material.

---

## P4 — Correct by construction

**Rule:** What the learner sees must match what they're taught to produce. Fonts
show textbook-correct character forms; stroke order is always correct; audio has
correct pronunciation and pitch accent.

**Why:** A mismatch silently teaches the wrong thing, and wrong patterns are
painful to unlearn. See [typography.md](../design/typography.md) and
[audio.md](../design/audio.md).

**Test:** *"If the learner perfectly imitated what we show/play, would they be
correct?"* If not, fix the source, not the learner.

---

## P5 — Tell the truth about memory

**Rule:** Progress reflects real, tested capability and is allowed to decay.
Confidence scores fall when items go unreviewed. Visible counts only include items
above threshold.

**Why:** Honest feedback lets the learner act. Hidden decay produces silent
forgetting and a false sense of mastery.

**Test:** *"Does this number reflect what the learner can actually do right now?"*
If it's inflated or frozen, it's lying.

---

## P6 — Respect the learner

**Rule:** No dark patterns. No manufactured streak anxiety, no guilt-tripping
notifications, no FOMO economies. Decay and slips are always framed as normal and
quickly recoverable.

**Why:** Manipulation is not a teaching method, and it corrodes trust and intrinsic
motivation.

**Test:** *"Would I feel respected, or manipulated, receiving this?"*

---

## P7 — Sessions always complete

**Rule:** A session is 15–25 minutes with a clear beginning, middle, and defined
end state. No infinite scroll, no open-ended loops.

**Why:** A completable session is motivating and sustainable; an endless one
produces fatigue and guilt.

**Test:** *"Does the learner reach an unambiguous 'done for today'?"*

---

## P8 — Everything lives in the SRS

**Rule:** Every unit of knowledge — character, word, kanji, grammar pattern — is an
SRS item with its own interval and review date. Nothing is ever permanently "done."

**Why:** Durable retention requires scheduled review; a single exposure is useless.
See [srs-engine.md](../architecture/srs-engine.md).

**Test:** *"Can this piece of knowledge go stale? Then it must be an SRS item."*

---

## P9 — Offline-first, one codebase

**Rule:** Core learning works without a network connection, from a single codebase
that runs on phone and desktop.

**Why:** Learning shouldn't depend on connectivity, and two codebases double the
work while halving the polish. See [tech-stack.md](../architecture/tech-stack.md).

**Test:** *"Does this feature break in airplane mode?"* Core learning must not.

---

## P10 — Depth before breadth

**Rule:** Make the hiragana curriculum genuinely excellent before expanding scope. Resist feature
creep and premature breadth (JLPT-to-fluency, AI tutor, etc.).

**Why:** A deep, correct slice teaches more and validates the method better than a
broad, shallow one.

**Test:** *"Is this making the current phase better, or just bigger?"*

---

## Using these principles

- **In design:** state which principles a feature serves, and which it risks
  violating.
- **In review:** a change that violates a principle needs either a fix or a
  documented, deliberate exception recorded as an [ADR](../decisions/README.md).
- **In disputes:** principles outrank preferences. If two conflict, escalate to
  [vision.md](./vision.md) — learning wins.

<!-- ARCHIVE-SOURCE-END: docs/product/principles.md -->

---

<!-- ARCHIVE-SOURCE-START: docs/product/vision.md -->

# Michi — Product Vision

> **Michi (道)** — Japanese for "path" or "the way." A road you walk a little
> further every day. The name is the promise: not a game you win, but a path you
> travel until the language is yours.

This is the flagship document. If you read only one file in this repository, read
this one. It defines what Michi **is**, what it is **not**, who it is **for**, why
it is built the way it is, and how we will know it is working. Everything else in
`docs/` exists to serve the vision described here.

---

## 1. One-Sentence Definition

**Michi is a Japanese learning app built on real learning science, optimized for
genuine language acquisition instead of engagement metrics.**

It teaches you to *understand and produce* Japanese — reading its scripts, hearing
its sounds correctly, writing its characters by hand, and building real
sentences — rather than training you to tap the right box in a streak-driven game.

---

## 2. The Origin

Michi began as a tool for one specific learner: a 14-year-old beginning Japanese
from zero. That origin matters and shapes every decision:

- **Real, not abstract.** A teenager can smell filler and busywork instantly. The
  content has to feel like it's teaching *actual Japanese you'd encounter in anime,
  games, music, and real life* — not textbook mannequins buying train tickets.
- **Honest, not manipulative.** No dark patterns, no manufactured streak anxiety,
  no guilt notifications. Respect the learner's attention and intelligence.
- **Motivating through mastery.** The reward is visibly getting better at a hard,
  beautiful thing — not points, gems, or a cartoon owl's disappointment.

Though it started for one learner, the pedagogy is language-agnostic (see
[§10](#10-beyond-japanese)). Japanese is the hardest major language for English
speakers, so a system built to teach it well will teach almost anything.

---

## 3. What Michi Is

Michi is:

1. **A learning tool, first and always.** Every feature is judged by a single
   question: *does this help the learner actually acquire the language?* If a
   feature would boost daily-active-users but not learning, it does not ship.

2. **Comprehensible-input driven.** Learners acquire language by consuming input
   just slightly above their current level ("i+1") in context where meaning is
   inferable — not by memorizing decontextualized lists. See
   [pedagogy.md](./pedagogy.md).

3. **Production-heavy.** Michi biases toward *active recall and output* — write the
   character, produce the word, build the sentence — because retrieval difficulty
   is proportional to memory strength. Recognition (multiple choice) is used
   sparingly, as a scaffold, never as the main event.

4. **Built around handwriting.** Drawing each character by hand, with correct
   stroke order from day one, engages motor memory — a separate, reinforcing memory
   channel. This is a core mechanic, not a bonus feature.

5. **Powered by spaced repetition.** Every character, word, and grammar pattern
   lives inside an SRS. Nothing is ever "done." Everything cycles back right before
   it would be forgotten. See [srs-engine.md](../architecture/srs-engine.md).

6. **Honest about memory.** Knowledge decays; Michi shows this truthfully instead
   of hiding it. Progress reflects *real, tested capability* ("you can read 46
   hiragana, you know 200 words"), and that number can go **down** if you stop —
   framed as normal and quickly recoverable, never as failure.

7. **Offline-first and cross-platform.** One codebase runs in the browser and, via
   Capacitor, as a native mobile app. It works without a connection. See
   [tech-stack.md](../architecture/tech-stack.md).

8. **Script-native.** Japanese is taught in Japanese scripts from the start.
   **Romaji is never used as a reading aid — ever.** (See
   [principles.md](./principles.md) and
   [ADR-0002](../decisions/0002-no-romaji.md).)

---

## 4. What Michi Is *Not*

Being explicit about non-goals is how a project keeps its soul. Michi is **not**:

- **Not an engagement machine.** No streak-loss anxiety, no aggressive push
  notifications, no XP/gem economy designed to trigger daily opens. A learner who
  comes back three times a week and truly learns beats one who taps a streak daily
  and retains nothing.

- **Not a romaji crutch.** We never render Japanese in the Latin alphabet as a
  reading aid. Romaji slows the formation of a native phonological map. (Romaji may
  appear *once*, in passing, only to explain *why we don't use it*.)

- **Not recognition theater.** We do not pad the app with easy multiple-choice
  taps that create the feeling of progress without the substance.

- **Not a gamified dopamine loop wearing an education costume.** Delight is
  welcome; manipulation is not. The distinction is whether the mechanic serves the
  learner or serves our metrics.

- **Not a grammar-drill textbook either.** We explain grammar clearly and lightly
  when it unlocks comprehension — but grammar drills in isolation are not the
  method. Input and production in context are.

- **Not a chat-with-an-AI-tutor product (for now).** The MVP is a structured,
  authored curriculum with deterministic exercises. Conversational AI practice is a
  possible *later* layer, not the foundation. (Scope guard against feature drift.)

- **Not trying to cover everything on day one.** Michi ships a great hiragana curriculum
  (hiragana mastery + first words) before it tries to be a complete JLPT-to-fluency
  platform. Depth first, then breadth.

---

## 5. Who It's For

**Primary persona — "the motivated beginner."** A teenager or adult starting
Japanese from zero, curious and willing to do real work, but allergic to busywork
and put off by textbooks. Likely hooked by anime, games, or music. Wants to
*actually be able to read and understand things*, not collect badges.

**Secondary persona — "the returning restarter."** Someone who tried Duolingo (or a
class) and bounced off, retaining little. They need a method that respects their
time and produces visible, real capability.

**Explicitly not the target (yet):** advanced learners seeking JLPT N2/N1 exam
cramming, or learners who want a pure conversation partner. Michi may serve them
later; it is not designed around them now.

---

## 6. Goals

### 6.1 Learning Goals (the ones that actually matter)

- **G1 — Literacy in the scripts.** The learner can *read and write* hiragana, then
  katakana, then a growing set of kanji embedded in real vocabulary.
- **G2 — A correct phonological map.** The learner hears and reproduces Japanese
  sounds — including pitch accent and the flap "r" — from accurate audio, never
  filtered through romaji.
- **G3 — Real comprehension.** The learner understands authentic-feeling sentences
  in context, not just isolated words.
- **G4 — Production ability.** The learner can produce language — write it, say it,
  arrange it — however clumsily at first. Output accelerates acquisition.
- **G5 — Durable retention.** Knowledge is maintained over months through spaced
  repetition, with honest visibility into what has and hasn't stuck.

### 6.2 Product Goals

- **P1 — One codebase, phone + desktop, offline-capable.**
- **P2 — Sessions that always complete.** 15–25 minutes, with a clear end state.
  Never open-ended, never infinite scroll.
- **P3 — Honest progress surface.** Stats reflect tested capability and can decay.
- **P4 — Correct-by-construction teaching.** What the learner sees (fonts, stroke
  order, audio) matches what they're taught to produce. No mismatches that
  silently teach the wrong thing. See [typography.md](../design/typography.md) and
  [audio.md](../design/audio.md).

### 6.3 Non-Goals (restated as goals we deliberately reject)

- We will **not** optimize for DAU, session count, or streak length as success
  metrics.
- We will **not** ship features whose primary effect is engagement without learning.
- We will **not** broaden scope before the hiragana curriculum is genuinely excellent.

---

## 7. Why Michi Is Good for Learning — In Contrast to Duolingo

Duolingo is the reference point because it's what most people mean by "language
app." It is a brilliant piece of engagement engineering. That is precisely the
problem: it is optimized for *engagement*, and engagement is not learning.

Research on Duolingo consistently finds **modest vocabulary gains but weak outcomes
in grammar, real comprehension, and speaking.** It teaches users to *complete
exercises*, not to *understand a language*. For Japanese specifically it leans on
romaji, which actively slows learners by preventing a native phonological map from
forming.

Michi inverts each of these choices deliberately:

| Dimension | Duolingo | Michi | Why Michi's choice teaches better |
|---|---|---|---|
| **Core objective** | Maximize engagement (DAU, streaks) | Maximize acquisition | You optimize what you measure. Measuring learning produces learning. |
| **Romaji** | Used as a crutch for Japanese | Never, as a reading aid | Romaji blocks the native phonological map; script-native reading builds it. |
| **Exercise type** | Recognition-heavy (multiple choice) | Production-heavy (recall, write, build) | Retrieval difficulty ∝ memory strength. Recognition makes weak memories. |
| **Grammar** | Largely implicit, inferred | Clear, light, *timed* explanations | A few honest sentences of explanation unlock comprehension faster than guessing. |
| **Writing** | Afterthought / optional | Core mechanic, correct stroke order | Handwriting engages motor memory — a second encoding channel that reinforces recall. |
| **Sentences** | Often weird, decontextualized | Culturally real, relevant, in context | Comprehensible input requires meaning to be inferable and worth caring about. |
| **Progress** | Abstract XP, gems, levels | Concrete capability ("read 46 hiragana") | Real capability is intrinsically motivating and honestly informative. |
| **Memory decay** | Hidden from the learner | Shown honestly, framed as normal | Truthful feedback lets the learner act; hidden decay produces silent forgetting. |
| **Motivation model** | Extrinsic (streaks, guilt, FOMO) | Intrinsic (visible mastery of a hard thing) | Extrinsic loops collapse when you stop; intrinsic motivation compounds. |
| **Notifications** | Frequent, guilt-tinged | Minimal, respectful | Manufactured anxiety is not a learning aid. |
| **Audio** | Variable, TTS, pitch often ignored | Accuracy-first, pitch-accent-aware | Bad audio internalizes wrong patterns that are painful to unlearn. |

The through-line: **Duolingo makes the app the thing you're good at. Michi makes
Japanese the thing you're good at.**

### The five learning-science pillars underneath the table

Each contrast above rests on established principles, detailed in
[pedagogy.md](./pedagogy.md):

1. **Comprehensible Input** (Krashen) — acquire from meaningful i+1 input.
2. **Spaced Repetition** — review each item right before it would be forgotten.
3. **Active Recall over Recognition** — production forms strong memories.
4. **Motor Memory** — handwriting adds a reinforcing encoding channel.
5. **Output Hypothesis** — being made to produce language accelerates acquisition.

---

## 8. The Three Signature Mechanics

If Michi is remembered for three things, they are these — and each is a direct
expression of the pedagogy:

1. **Script-native, no-romaji teaching.** Sounds are taught, then immediately bound
   to hiragana. The Latin alphabet never mediates reading.

2. **Handwriting with correct stroke order.** Canvas-based drawing, stroke accuracy
   checked, hints revealed one stroke at a time. Motor memory as a first-class
   citizen.

3. **Honest progress with decay.** A visible, tested capability count that rises
   when you practice and falls when you don't — always framed as recoverable, never
   as punishment. Powered directly by SRS confidence scores.

---

## 9. How We'll Know It's Working

We deliberately avoid engagement vanity metrics. Success is measured in
**capability and retention**:

- **Literacy velocity** — time to read all 46 hiragana with high accuracy
  (target: within the hiragana curriculum).
- **Retention curve** — percentage of items still above the confidence threshold
  after 30 / 60 / 90 days.
- **Production accuracy** — stroke-order and recall correctness on *from-memory*
  exercises, not recognition.
- **Honest capability count** — the learner's true tested vocabulary/character
  count over time.
- **Qualitative** — can the learner read a real sentence they've never seen,
  composed of known characters, and understand it? That moment is the product.

Explicitly *not* success metrics: streak length, daily opens, session count,
notification click-through.

---

## 10. Beyond Japanese

The pedagogical framework is language-agnostic. Extending Michi to another language
means applying the same principles, not rebuilding:

- No romanization crutch for languages with their own script (Arabic, Korean,
  Thai, …).
- Comprehensible input from the start.
- SRS for all content.
- Handwriting where the script rewards it.
- Cultural context dripped in over time.
- Honest, decaying progress.

Building for Japanese first — the hardest major language for English speakers —
means the system will handle easier languages with less effort, not more.

---

## 11. Guiding Principles (the short version)

The full, enforceable list lives in [principles.md](./principles.md). In spirit:

> **Teach the language, not the app. Respect the learner. Tell the truth about
> memory. When in doubt, choose the option that produces real acquisition — even if
> it's less "sticky."**

---

## Related Documents

- [pedagogy.md](./pedagogy.md) — the learning science in depth
- [principles.md](./principles.md) — the non-negotiable design rules
- [glossary.md](./glossary.md) — shared vocabulary (SRS, mora, i+1, gojūon…)
- [../curriculum/overview.md](../curriculum/overview.md) — how content is sequenced
- [../architecture/overview.md](../architecture/overview.md) — how the system is built
- [../roadmap.md](../roadmap.md) — phases and milestones

<!-- ARCHIVE-SOURCE-END: docs/product/vision.md -->

---

<!-- ARCHIVE-SOURCE-START: docs/project-control.md -->

# Michi Project Control

This is the working front door for regaining control of Michi.

It answers three questions:

1. What are we trying to build?
2. What are we working on now?
3. What must be true before we move on?

The older documents contain valuable thinking, but some describe earlier versions of
the project and some describe systems that are not implemented yet. Until the document
review is complete, this file is the guide to the work. It does not silently replace the
product vision or accepted architecture decisions.

## The product in plain language

Michi teaches Japanese through a calm path of short stations. A station introduces or
strengthens one manageable capability. The learner hears correct Japanese, connects it
to meaning or script, retrieves it without excessive help, uses it, and encounters it
again before it is forgotten.

The map makes the course understandable:

- A **station** is one completable learning session.
- A **track** is a short sequence of related stations.
- A **province** is a larger area of capability, such as hiragana or katakana.
- A **book stop** is optional background and cultural context. Essential teaching never
  exists only in a book stop.

## Words we need to keep separate

### Visited

The learner opened or completed the screens in a station. This records travel through
the course, not knowledge.

### Introduced

The learner has been taught an item at least once. The item can now appear in review.

### Station complete

The learner performed the station's required tasks and reached its end. Completion
unlocks the next station, but does not mean the knowledge can never be forgotten.

### Mastered

The learner has demonstrated a capability successfully, through sufficiently strong
retrieval and across time. Mastery can weaken when the knowledge is not reviewed.

### Drill

A bounded set of questions used to build or check a particular connection. A drill is
part of a station; it is not the complete teaching method.

### Review

Retrieval of previously introduced knowledge. Some review is selected automatically by
the spaced-repetition system; some is deliberately authored as a consolidation station.

### SRS

The spaced-repetition system stores when each piece of knowledge should return. Michi's
SRS calculation exists in code, but it is not yet connected to the playable stations or
persistent learner progress.

### Learning item and capability

A learning item is content such as あ or the word こい. A capability is what the learner
can do with it, such as hear あ and identify it, see あ and say it, or write あ. One item
can therefore have several capabilities.

## The reusable station shape

This is a learning contract, not a requirement that every station show the same screens.
Orientation and consolidation stations may omit phases that do not apply.

1. **Retrieve** — bring back due or prerequisite knowledge.
2. **Orient** — state the one useful outcome of this station.
3. **Model** — let the learner hear or see the correct new form.
4. **Connect** — provide guided, open-book practice before grading.
5. **Retrieve new knowledge** — remove help gradually and require recall.
6. **Produce** — say, write, recall, or construct without answer choices where practical.
7. **Use** — apply the knowledge in a real word, sentence, or listening context.
8. **Mix** — distinguish the new material from older or easily confused material.
9. **Close** — state what was demonstrated, save progress, and schedule future review.

The station types are:

- **Orientation:** establishes a mental model; usually introduces no review items.
- **Acquisition:** introduces a small set of new knowledge.
- **Consolidation:** introduces nothing; mixes and strengthens earlier knowledge.
- **Assessment:** checks a broader capability with minimal help.
- **Application:** uses known material in a story, dialogue, sentence, or listening task.

## Step-by-step implementation plan

We do one phase at a time. At the end of every phase, we stop, inspect the result
together, and decide whether to continue. Passing tests alone does not approve a phase.

### Phase 0 — Protect and understand the current work

Goal: establish a safe baseline before redesigning anything.

- [x] Create the `learning-system-foundation` branch.
- [x] Review the current uncommitted changes and group them by purpose.
- [x] Run the complete verification suite and record the result: 82 tests,
  TypeScript, and the Node 22 production build pass on 2026-07-28.
- [ ] Create a named baseline commit once the current work is understood and approved.

Done when: we can always return to the exact current product state.

### Phase 1 — Simplify and reconcile the documentation

Goal: make the project understandable without reading thousands of lines.

- [ ] Classify every document as `canonical`, `reference`, `historical`, or `draft`.
- [ ] Resolve direct contradictions, beginning with the first learner experience,
  session shape, writing, and SRS status.
- [ ] Rewrite `OVERVIEW.md` as a short current-state explanation.
- [ ] Rewrite `docs/roadmap.md` to reflect what is actually built.
- [ ] Make `docs/README.md` a simple reading order with clear ownership.
- [ ] Preserve useful detail in focused reference documents instead of deleting it.

Done when: the founder can explain the present product, the next phase, and the reason
for it using only the overview, this control document, and the roadmap.

### Phase 2 — Define the learning contract as data

Goal: describe any station without adding a new custom page component.

- [ ] Define `StationSpec`, station types, steps, introduced items, prerequisites,
  review policy, completion evidence, and end state.
- [ ] Define learning items separately from learner progress.
- [ ] Define capability facets such as sound-to-symbol, symbol-to-sound, speaking,
  writing, and reading-in-context.
- [ ] Add validators that reject broken station specifications.
- [ ] Express the existing vowel, K-row, and consolidation stations in the new format.

Done when: the three existing station styles can be represented clearly as data and
validated without losing their current teaching sequence.

### Phase 3 — Build one reusable station runner

Goal: render station specifications through shared teaching components.

- [ ] Extract shared step components from the current large station page.
- [ ] Build a station orchestrator that moves through the declared phases.
- [ ] Preserve back navigation, audio controls, accessibility, and bounded completion.
- [ ] Keep special presentation possible without putting whole stations in conditionals.

Done when: Stations 2–4 run through the shared runner and retain their behavior and
visual quality.

### Phase 4 — Connect persistent review

Goal: make “everything cycles back” true in the playable product.

- [ ] Add a learner-state storage interface and a local implementation.
- [ ] Seed new learning items when they are introduced.
- [ ] Save attempt evidence per item and capability.
- [ ] Assemble a bounded due-review segment at station entry.
- [ ] Feed review results into the existing scheduling engine.
- [ ] Re-show missed items later in the session without creating an endless loop.

Done when: completing a station schedules its knowledge, and returning later produces
the appropriate review before new content.

### Phase 5 — Make progress honest

Goal: distinguish travel through the map from current learning capability.

- [ ] Store `visited`, `introduced`, `station complete`, and `mastered` separately.
- [ ] Decide what evidence counts for each capability.
- [ ] Derive current capability from evidence and SRS state.
- [ ] Keep forgetting normal and recoverable in the language and UI.
- [ ] Ensure easy recognition alone cannot claim strong mastery.

Done when: progress statements describe something the learner can currently do and can
change when knowledge becomes overdue.

### Phase 6 — Add production and writing carefully

Goal: make production a real part of learning rather than a promise in the vision.

- [ ] Define which early capabilities require speaking, writing, or both.
- [ ] Add ungraded speaking rehearsal where automated judgement would be unreliable.
- [ ] Implement stroke-guided writing using the accepted stroke data source.
- [ ] Add recall-before-hint behavior and record meaningful evidence.
- [ ] Test the physical interaction on touch devices before expanding it broadly.

Done when: at least one kana station teaches and revisits writing correctly without
making unreliable claims about mastery.

### Phase 7 — Prove the blueprint before scaling

Goal: verify that the system works beyond one kind of kana lesson.

- [ ] Build one acquisition station.
- [ ] Build one consolidation station.
- [ ] Build one vocabulary or grammar application station.
- [ ] Confirm that all three use the same content model and station runner.
- [ ] Observe a real learner and record confusion, fatigue, retention, and pacing.
- [ ] Revise the blueprint before adding a full province.

Done when: a new station is mainly an authoring task, not a new software feature.

## Rules for staying in control

- Work on one phase at a time.
- Before changing code, state the learner problem it solves.
- Do not add a new station until the current phase's definition of done is met.
- Do not call a system implemented because a pure engine or interface exists; verify it
  in the learner flow.
- Keep current behavior covered by tests before restructuring it.
- Prefer one clear canonical document over several overlapping explanations.
- At every checkpoint, explain the result in plain language before asking for approval.

## Right now

We are in **Phase 0**. The next action is to review and preserve the current uncommitted
work. We are not yet rewriting the station code or connecting the SRS.

<!-- ARCHIVE-SOURCE-END: docs/project-control.md -->

---

<!-- ARCHIVE-SOURCE-START: docs/roadmap.md -->

# Roadmap

The phased plan for building Michi. Each phase has a clear focus and a definition of
"done." We work in order and resist pulling later work forward — **depth before
breadth** ([P10](./product/principles.md#p10--depth-before-breadth)).

This is a living document. It describes intent and sequence, not fixed dates.

---

## Guiding Sequencing Rule

> **Build the SRS engine first. Everything else plugs into it.**

The SRS engine is pure logic, testable with zero UI, and every other feature depends
on it — so it is Phase 1. See
[srs-engine.md](./architecture/srs-engine.md) and
[ADR-0003](./decisions/0003-sm2-srs-algorithm.md).

---

## Phase 0 — Foundations _(current phase)_

**Focus:** Get the thinking and the structure right before writing app code.

- [x] Core planning docs (pedagogy, curriculum, SRS, tech stack, typography, audio)
- [x] Professional docs structure (`docs/` hierarchy)
- [x] Flagship vision doc + principles + glossary
- [x] Architecture overview, data model, content model
- [x] Initial ADRs (web-first, no-romaji, SM-2)
- [x] Git initialized, `.gitignore`
- [x] **Resolve stroke-data source** for the drawing mechanic → `strokesvg` (Klee
      One / OFL) for kana, KanjiVG for kanji later
      ([ADR-0004](./decisions/0004-stroke-data-source.md))
- [ ] Decide project scaffolding specifics (TypeScript config, test runner, lint) →
      when Phase 1 begins

**Done when:** the structure and key decisions are settled and a newcomer can read
`docs/` and understand what we're building and why.

---

## Phase 1 — The SRS Engine

**Focus:** Pure, framework-free SM-2 implementation. No UI.

- [ ] Implement SM-2: grade → next `interval` / `easeFactor` / `repetitions` / `dueDate`
- [ ] Derive confidence score from item state
- [ ] Derive capability count and due-queue
- [ ] Exhaustive unit tests (this is testable in isolation — do it thoroughly)

**Done when:** given any item state + grade, the engine returns correct scheduling and
confidence, proven by tests. No browser required.

---

## Phase 2 — Content Layer (the Hiragana Curriculum)

**Focus:** Author the full hiragana curriculum as validated static content.

- [ ] Finalize content schema from [content-model.md](./curriculum/content-model.md)
- [ ] All 46 hiragana as `Character` records (glyphs, readings, stroke data, notes)
- [ ] Hiragana-stage vocabulary (nature + animals themes) and example sentences
- [ ] The hiragana lessons (an ordered session sequence) with exercises, wired to seed the SRS
- [ ] First grammar pattern (SOV) content
- [ ] Content validated against schema in CI

**Done when:** the full hiragana curriculum exists as reviewable, validated data.

---

## Phase 3 — Web App (Desktop-First Browser)

**Focus:** A playable session in the browser, offline-capable.

- [ ] Next.js app shell + Tailwind + the three typefaces
- [ ] Storage layer (IndexedDB) behind the storage interface
- [ ] Session orchestration (review → new → practice, always-completes)
- [ ] Flashcard + active-recall exercises
- [ ] **Drawing canvas** with stroke-order hints and stroke checking
- [ ] Listening drills (audio playback)
- [ ] Honest progress surface (capability count + decay)

**Done when:** a learner can complete real hiragana sessions end to end in a browser,
fully offline.

**Note:** UI *design* work is intentionally deferred; this phase targets a correct,
simple, functional UI, not a polished visual system.

---

## Phase 4 — Mobile via Capacitor

**Focus:** The same app, on a real phone.

- [ ] Capacitor wrap (iOS + Android)
- [ ] SQLite storage on mobile behind the storage interface
- [ ] Bundle fonts + core audio for offline use
- [ ] Touch-event handling for the drawing canvas
- [ ] Native audio / haptics polish as needed

**Done when:** the hiragana curriculum runs on a real phone, offline, with the drawing mechanic
feeling natural to touch.

---

## Phase 5 — Audio Production

**Focus:** Real, accurate audio for core content.

- [ ] Native voice-actor recording for all hiragana + core vocabulary
- [ ] Google Neural2 pipeline for dynamic/generated sentences (SSML, slower beginner
      speed)
- [ ] (Optional) ElevenLabs for intro/cultural narration
- See [audio.md](./design/audio.md) for the hybrid strategy.

**Done when:** every core item has correct, pitch-accurate audio; dynamic sentences
have a working generation path.

---

## Later — Beyond Hiragana

Only after the above is genuinely excellent:

- **Next curriculum** — katakana, high-frequency vocab, present-tense verbs, first
  kanji (一–五), listening comprehension.
- **Cross-device sync** — Supabase (Postgres + auth), added behind the storage
  interface; never a dependency of the core offline loop.
- **Further months / other languages** — the pedagogy is language-agnostic
  ([vision §10](./product/vision.md#10-beyond-japanese)).

Each of these clears the [principles](./product/principles.md) bar and, where
significant, gets its own [ADR](./decisions/README.md) before work starts.

---

## Open Questions (tracked)

- ~~**Stroke-data source** for the drawing mechanic~~ — resolved in
  [ADR-0004](./decisions/0004-stroke-data-source.md) (`strokesvg`/Klee One for kana).
- **Content on-disk format** — JSON vs. TS modules; finalize when Phase 2 begins.
- **Test/lint/TS tooling specifics** — finalize when Phase 1 begins.

<!-- ARCHIVE-SOURCE-END: docs/roadmap.md -->
