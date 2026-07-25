# Michi Documentation

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
  what ships today (macOS `say`/Kyoko for all 46 gojūon)

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
