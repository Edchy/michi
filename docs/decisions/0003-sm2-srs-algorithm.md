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
