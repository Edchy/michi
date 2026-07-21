# The Station Map — How the Path Is Shaped

The bridge between the **curriculum** ([month-1.md](./month-1.md), authored as an
ordered sequence of sessions) and the **world map** ([world-map.md](./world-map.md),
organized by *station*). It answers three things:

1. How that session sequence collapses into a walkable path of stations and modules —
   a **self-paced course, no calendar**.
2. The pedagogical shape a station always has.
3. Where the gradual "how Japanese is built" lore lives — the **book stops** and the
   **codex** — without front-loading it.

Everything here is downstream of the [pedagogy](../product/pedagogy.md) and
[principles](../product/principles.md); this doc adds no new teaching philosophy, only
the *structure* that curriculum authors and the map both depend on.

> For the **flat, authored list of every station and its exact contents** (kana, words,
> drills, drips, seeds, end-states, book stops), see the companion roster
> **[stations.md](./stations.md)**. This doc explains the *shape*; that one is the *list*.

> **Status:** Draft / proposed. The station shape and groupings here are settled; the
> per-station content is finalized as it's authored ([roadmap](../roadmap.md) Phase 2).
> The first book stop and Codex slice are implemented; later entries are authored as
> their stations become relevant.

---

## 1. Sessions → Stations → Modules

The course is **self-paced — Course → Modules → Stations, no calendar.** No months, no
weeks, no daily deadlines; a learner advances when they've earned a station, however
long it takes.

The source content ([month-1.md](./month-1.md)) is authored as an ordered sequence of
**sessions** (sittings). The map shows **stations**. These are **not** one-to-one: a
station is a *meaningful unit of new capability*, which usually spans an **introduce
session + its reinforce session(s)**. Reinforce/rest/quiz sittings are *inside* a
station, not separate stops — they're the sessions you do to clear it.

> **One station = one [Lesson](./content-model.md#lesson) = one clear new capability.**
> The number of *sessions* to clear a station varies (a new-row station is ~2 sittings:
> introduce + reinforce). Each circle is a real "I can now do X," never a calendar tick.

The **full station roster** — every station's exact kana/vocab/grammar, drills, drips,
seeds and end-state — is the companion doc **[stations.md](./stations.md)**. It is the
authoritative list; this section only explains the *principle* by which sessions group
into stations and stations into modules.

The current structure (matches `src/app/worldmap.ts` and [stations.md](./stations.md)):

| Module | Stations | Covers |
|---|---|---|
| 1 · First sounds | 1–3 | vowels → K row → first look back |
| 2 · Reading on | 4–7 | S / T / N rows → halfway snapshot |
| 3 · Completing the kana | 8–11 | H / M / Y-W / R rows + ん (all 46 kana) |
| 4 · First words & grammar | 12–16 | mastery → nature/animal words → first sentence → hiragana complete |

Beyond full hiragana, the same row→station pattern continues (katakana, first kanji,
…) — outlined at the end of [stations.md](./stations.md), placed in code as authored.

---

## 2. The shape of a station

Every station, whatever it teaches, follows the same pedagogical arc — this **is** the
"Michi way" applied at station scale ([pedagogy §Core Principles](../product/pedagogy.md)):

1. **Hear it first.** New sound(s) arrive by ear, native audio, before any symbol —
   audio-first is required by [P2 no-romaji](../product/principles.md#p2--no-romaji-ever-as-a-reading-aid)
   and is the right encoding order.
2. **Attach the symbol.** The character is introduced against the now-familiar sound,
   with correct **stroke order from the start** (motor channel, [pedagogy §Motor Memory]).
3. **Produce, don't just recognize.** Drilling biases to active recall and drawing,
   not multiple choice ([P3](../product/principles.md#p3--production-over-recognition)).
   Simple-stroke characters are introduced first as early drawing wins (く, し, つ).
4. **Use it for real, fast.** The moment enough kana exist to spell a real word, the
   learner reads one — the "I can actually read this" moment is engineered early
   (こい by Station 2). Compounds → words → a first sentence.
5. **It enters the SRS and never leaves.** Everything introduced seeds the deck and
   cycles back forever ([P8](../product/principles.md#p8--everything-lives-in-the-srs)).
6. **The station completes.** A clear "you can now read the K row" end state; the map
   circle flips to *done*. No open-ended stops ([P7](../product/principles.md#p7--sessions-always-complete)).

A station is *cleared* by completing its underlying session(s) — an introduce session
plus its reinforce session(s). The **within-session** flow (auto-advance, read-this
beats, feedback) is specified in [session-flow.md](./session-flow.md); this doc only
fixes what a station *is* and the order stations come in.

### Why stations are grouped by row, five at a time

Straight from [overview.md](./overview.md#sequencing-philosophy): scripts before
everything, **five kana at a time (a gojūon row)**, introduce-then-reinforce, nothing
abandoned, real words as early as possible. The station map is that philosophy made
visible — each row is a station, each cluster of rows a module, the whole gojūon a
journey you can see the end of.

---

## 3. Book stops & the codex — the lore, without front-loading

Japanese's structure and origin (three scripts; kana built on top of borrowed kanji;
mora-timing; how it differs from a Latin alphabet) is **genuinely motivating context —
but never a prerequisite.** [session-flow.md §3](./session-flow.md#3-explaining-the-three-scripts--where-when-why)
already fixes the *timing* of these explanations (drip each in when its topic becomes
relevant). What it did not have was a *home*. Book stops + the codex are that home.

### Book stops (on the map)

Small **book markers sit beside the path between stations** — visually distinct from
station circles (a book/scroll glyph, not a numbered disc). They are **pure
supplementary reading**:

- **Never required, never drilled, never gate a station.** You can walk straight past
  every one and still learn Japanese ([P1 learning over engagement](../product/principles.md#p1--learning-over-engagement),
  [P7](../product/principles.md#p7--sessions-always-complete)). They add no exercises,
  cost nothing to skip.
- **Unlock on relevance, per the drip timing.** A book stop appears only once its topic
  has become relevant — the same rule as the inline drips. Example placements, reusing
  session-flow's table:

  | Book stop | Appears after | Reads about |
  |---|---|---|
  | *Three scripts, one language* | Station 1 | The first high-level map of hiragana, katakana, and kanji, and why they coexist |
  | *Where the letters came from* | early Module 2 | Hiragana was invented in the Heian period, simplified from kanji (あ ← 安) — the shapes have ancestors |
  | *Sounds you already own* | early Module 2 | Why Japanese sound is regular: mora-timing, no silent letters, the "learn the sounds, read anything" promise |
  | *A different kind of alphabet* | when katakana / kanji arrive (later modules) | How Japanese writing differs from a Latin alphabet; what katakana and kanji each do |

- **Tone: exploration, not homework.** Opening one is "opening a book" — a calm reading
  surface, not a lesson. It matches the quiet, museum-like [DESIGN](../design/DESIGN.md)
  feel; it must never look like a quest objective.

### The codex (browsable anytime)

Every lore drip — whether met **inline** during a session (the read-this "did you
know" beats session-flow already defines) **or** in a **book stop** — is saved into a
**codex**: a browsable collection the learner can revisit from the map at any time.

- The codex makes the lore **collectible and re-readable** without changing the
  pedagogical *timing*: an entry only appears in the codex once its moment has passed,
  so the codex never front-loads. It's a record of what you've encountered, not a
  syllabus to read ahead.
- This is the one place all the "how the language is built / where it came from / how
  it's different" content lives as a coherent, growing reference — decoupled from the
  linear path, exactly the supplementary layer you'd want but never need.

### What book stops / codex are NOT

- Not required content, not SRS items, not graded — nothing here touches capability
  counts ([P5 honest progress](../product/principles.md#p5--tell-the-truth-about-memory)).
- Not a front-loaded culture lecture — timing is still "earn it," governed by
  [session-flow.md §3](./session-flow.md).
- Not a second progress system — no completion pressure. A learner who reads zero book
  stops is a fully successful learner.

---

## Open questions

- **Station derivation.** Stations are hand-listed here and in `worldmap.ts`; once
  lessons are authored data (Phase 2) they should be *generated* from lessons so this
  map and the code stay in lockstep. Tracked in [world-map.md](./world-map.md#open-edges).
- **Module boundaries beyond hiragana.** The row→station rule is clear; the exact
  module *groupings* past Module 4 (where the katakana/kanji legs begin, how many
  stations each) are finalized as that curriculum is authored.
- **Codex authoring format.** The lore entries are content; whether they live with
  curriculum content or separately is an implementation decision for Phase 2, alongside
  the [content on-disk format](../roadmap.md).
