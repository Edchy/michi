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
