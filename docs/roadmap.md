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
- [ ] **Resolve stroke-data source** for the drawing mechanic (KanjiVG vs. authored
      subset vs. hybrid) → write an ADR. *This is the main open technical question.*
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

## Phase 2 — Content Layer (Hiragana + Month 1)

**Focus:** Author Month 1 as validated static content.

- [ ] Finalize content schema from [content-model.md](./curriculum/content-model.md)
- [ ] All 46 hiragana as `Character` records (glyphs, readings, stroke data, notes)
- [ ] Month 1 vocabulary (nature + animals themes) and example sentences
- [ ] Month 1 lessons (28 days) with exercises, wired to seed the SRS
- [ ] First grammar pattern (SOV) content
- [ ] Content validated against schema in CI

**Done when:** Month 1's full curriculum exists as reviewable, validated data.

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

**Done when:** a learner can complete real Month 1 sessions end to end in a browser,
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

**Done when:** Month 1 runs on a real phone, offline, with the drawing mechanic
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

## Later — Beyond Month 1

Only after the above is genuinely excellent:

- **Month 2 curriculum** — katakana, high-frequency vocab, present-tense verbs, first
  kanji (一–五), listening comprehension.
- **Cross-device sync** — Supabase (Postgres + auth), added behind the storage
  interface; never a dependency of the core offline loop.
- **Further months / other languages** — the pedagogy is language-agnostic
  ([vision §10](./product/vision.md#10-beyond-japanese)).

Each of these clears the [principles](./product/principles.md) bar and, where
significant, gets its own [ADR](./decisions/README.md) before work starts.

---

## Open Questions (tracked)

- **Stroke-data source** for the drawing mechanic — the top unresolved technical
  decision (Phase 0). Needs an ADR.
- **Content on-disk format** — JSON vs. TS modules; finalize when Phase 2 begins.
- **Test/lint/TS tooling specifics** — finalize when Phase 1 begins.
