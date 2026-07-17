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
