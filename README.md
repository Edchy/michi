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
> code yet — this is a fully documented project foundation. Start with the
> **[Product Vision](./docs/product/vision.md)**.

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
everything else plugs into it. The main open technical question is the **stroke-data
source** for the drawing mechanic.

## Working in this repo

Read the [principles](./docs/product/principles.md) first — a change that violates one
needs a fix or a documented [ADR](./docs/decisions/README.md).
