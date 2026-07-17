# Contributing to Michi

Thanks for your interest in Michi. This project has strong opinions — that's the
point — so contributing well starts with understanding them.

## Before anything else: read these

1. **[Product Vision](./docs/product/vision.md)** — what Michi is and is not.
2. **[Principles](./docs/product/principles.md)** — the ten non-negotiables.
3. **[Pedagogy](./docs/product/pedagogy.md)** — the learning science underneath.

Michi optimizes for *genuine language acquisition*, not engagement. Many
conventional "good app" instincts (streaks, gamified rewards, easy multiple-choice,
romaji for beginners) are **deliberately rejected here**. If a contribution reaches
for one of those, it's probably fighting the project's purpose.

## The bar every contribution must clear

Ask, of any change:

- **Does it serve learning over engagement?** ([P1](./docs/product/principles.md#p1--learning-over-engagement))
- **Does it respect the no-romaji rule?** ([P2](./docs/product/principles.md#p2--no-romaji-ever-as-a-reading-aid))
- **Does it favor production over recognition?** ([P3](./docs/product/principles.md#p3--production-over-recognition))
- **Is it correct by construction** — does what we show match what we teach?
  ([P4](./docs/product/principles.md#p4--correct-by-construction))
- **Is it honest about memory?** ([P5](./docs/product/principles.md#p5--tell-the-truth-about-memory))

A change that violates a principle needs **either** a fix **or** a deliberate,
documented exception recorded as an [ADR](./docs/decisions/README.md).

## Types of contribution

- **Documentation / planning** (the current phase) — improvements to the docs,
  sharpening the vision, resolving open questions in the
  [roadmap](./docs/roadmap.md).
- **Curriculum content** — see
  [content-model.md](./docs/curriculum/content-model.md) and the authoring principles
  in [curriculum/overview.md](./docs/curriculum/overview.md#authoring-principles).
  Content must feel real, never like textbook filler.
- **Code** (once building begins) — follow the [architecture](./docs/architecture/overview.md).
  Build in the order the [roadmap](./docs/roadmap.md) sets (SRS engine first). Keep
  the SRS engine pure and framework-free.

## Making a change

1. **Branch** off the default branch. Don't commit directly to it.
2. **Keep changes focused** — one concern per pull request.
3. **Cross-link docs.** Cite principles as `[P#]`; link related docs and ADRs.
4. **Update the index** when you add a doc (`docs/README.md`) or an ADR
   (`docs/decisions/README.md`).
5. **Write a clear description** — what changed and *why*, referencing the vision or
   principles where relevant.

## Significant decisions → write an ADR

If your change is expensive to reverse, shapes the product's identity, or deviates
from a principle, capture it as an [ADR](./docs/decisions/README.md) using the
[template](./docs/decisions/template.md). ADRs are immutable once accepted; supersede
rather than edit.

## Style

- **Docs:** Markdown, wrap prose sensibly, prefer clarity over cleverness. Match the
  voice of the existing docs — direct, warm, opinionated, honest.
- **Japanese:** always in the correct script; never romaji as a reading aid (an
  internal-only `romaji` field for tooling is fine — see
  [content-model.md](./docs/curriculum/content-model.md)).
- **Code (later):** conventions to be finalized when Phase 1 begins; expect
  TypeScript, a linter, and tests, with the SRS engine covered exhaustively.

## Code of conduct

Participation is governed by [CODE_OF_CONDUCT.md](./CODE_OF_CONDUCT.md). Be kind;
this is, at heart, a project about helping someone learn.
