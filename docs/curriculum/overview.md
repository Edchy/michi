# Curriculum Overview

This document explains *how* Michi sequences what it teaches and the principles
behind that sequencing. The concrete day-by-day plan for the first month lives in
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
   moment is engineered to arrive fast (day 5).

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

---

## Progression Map

The long-range arc. Only Month 1 is fully specified today (depth before breadth,
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
