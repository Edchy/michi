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
