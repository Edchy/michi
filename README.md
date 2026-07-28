# 道 Michi

Michi is a Japanese-learning app for a beginner. It should teach durable, useful
Japanese without streaks, points, punishment, or other engagement tricks.

The project began with extensive documentation and has since grown into a working
Next.js application. In July 2026, the documentation was deliberately reset because
the plans had become larger and less coherent than the product itself.

## What exists today

The working application currently includes:

- A map organized into provinces, tracks, and stations.
- Four playable stations: an introduction to Japanese scripts, the five hiragana
  vowels, the K row, and a first consolidation station.
- Audio-led kana teaching using licensed human recordings.
- Guided sound-and-symbol pairing followed by recognition drills.
- The first readable Japanese word, こい.
- A gojūon grid that shows the learner's growing place in the hiragana system.
- Optional book stops collected in a Codex.
- A tested SM-2 spaced-repetition calculation engine that is not yet connected to
  the playable learning flow.

The current experience is a strong prototype. It is not yet the repeatable learning
system required for adding many stations and provinces safely.

## Direction we currently agree on

- Learning matters more than engagement.
- Japanese should be heard and read directly, without romaji as a pronunciation aid.
- New material should arrive in small, understandable steps.
- Learners need guided exposure before they are tested.
- Recognition is useful early, but lasting knowledge also requires recall,
  production, application, and review over time.
- Cultural context should enrich the path without blocking the core lesson.
- The interface should remain calm and focused.
- Forgetting is normal. Review should be useful and recoverable, never punitive.

These are starting agreements, not a complete product specification. We will clarify
them through the decision-by-decision process in [PLAN.md](./PLAN.md).

## Documentation

There are only four active or reference documents:

- `README.md`: what the project is and what exists now.
- [`PLAN.md`](./PLAN.md): the current work, decisions, and checkpoints.
- [`CLAUDE.md`](./CLAUDE.md): concise rules for agents working in the repository.
- [`REFERENCE.md`](./REFERENCE.md): the frozen pre-reset documentation archive. It is
  historical reference, not current authority.

## Working safely

The documentation reset is being developed on the
`learning-system-foundation` branch. Baseline commit `936f287` preserves the complete
application and the former documentation hierarchy before the reset.

Before expanding the curriculum, we will first establish and prove a reusable way to
teach, revisit, and measure knowledge.

## Development

```sh
npm test
npx tsc --noEmit
npm run dev
```

The production build requires the repository's supported Node version. In the current
development environment, Node 22.12.0 is known to work.
