# Content Model

How Michi's teaching content is represented as structured data. This is the bridge
between the [curriculum](./overview.md) (what we teach) and the
[data model](../architecture/data-model.md) (how the running app stores learner
state).

> **Status:** Draft / proposed. This is a design document, not yet code. Field
> names are illustrative and will be finalized when the schema is implemented. The
> goal here is to agree on the *shape* of content before writing it.

---

## Two Kinds of Data

It's essential to keep these separate:

1. **Content (authored, static, shared by all learners).** The curriculum itself:
   which characters exist, their stroke data, which words are taught, example
   sentences, lessons, audio references. This ships *with* the app and is
   version-controlled. It does not change per learner.

2. **Learner state (dynamic, per-user).** SRS schedules, confidence scores,
   progress, which lessons are complete. This is described in
   [data-model.md](../architecture/data-model.md).

This document specifies **(1)**. The link between them is the **item id**: authored
content defines items; learner state tracks each learner's relationship to those
items.

---

## Core Content Entities

### Character

An individual kana or kanji.

```
Character {
  id            // stable unique id, e.g. "hira_ka"
  kind          // "hiragana" | "katakana" | "kanji"
  glyph         // "か"
  reading       // phonetic reading in kana (NOT romaji), e.g. "か"
  romaji        // present ONLY for internal tooling/search, never shown to learner
  strokes       // ordered stroke path data (see "Stroke Data" below)
  audio         // reference(s) to pronunciation audio
  mnemonic?     // optional memory hook / etymology note
  notes?        // teaching notes (e.g. "shi not si")
}
```

> The `romaji` field exists for authoring, search, and testing convenience only.
> Per [P2](../product/principles.md#p2--no-romaji-ever-as-a-reading-aid) it must
> **never** be rendered to the learner as a reading aid. Its presence in the data is
> not permission to display it.

### Word (Vocabulary)

```
Word {
  id            // e.g. "word_kawa"
  kana          // "かわ"
  kanji?        // "川" (when applicable / later)
  meaning       // "river"
  partOfSpeech  // "noun" | "verb" | "adjective" | ...
  theme         // "nature" | "animals" | ...
  audio         // reference to pronunciation audio
  exampleRefs   // ids of ExampleSentences using this word
  composedOf?   // character ids, for "you can read this because you know X, Y"
}
```

### Grammar Pattern

```
GrammarPattern {
  id            // e.g. "grammar_sov"
  name          // "Subject–Object–Verb order"
  explanation   // clear, light English explanation
  examples      // ExampleSentence ids demonstrating it
}
```

### Example Sentence

```
ExampleSentence {
  id            // e.g. "sent_neko_sakana"
  kana          // "ねこ が さかな を たべる。"
  meaning       // "The cat eats fish."
  gloss?        // per-word breakdown for teaching
  audio         // reference to audio
  usesWords     // Word ids
  usesGrammar   // GrammarPattern ids
}
```

### Story

A short multi-sentence reading, built only from known content.

```
Story {
  id
  title
  sentences     // ordered ExampleSentence ids (or inline sentences)
  audio         // full-story narration reference
  questions?    // simple comprehension questions
}
```

---

## Lessons and Sequencing

### Lesson

An authored unit of a session's *new content*. Lessons are ordered into the
curriculum; they **seed items into the SRS** on completion but never schedule
reviews themselves (the [SRS owns scheduling](./overview.md#how-the-curriculum-meets-the-srs)).
On the world map, a lesson is presented as a **station** — what each station teaches
and how lessons map to stations is in [station-map.md](./station-map.md).

```
Lesson {
  id            // e.g. "m1_d04_k_row"
  day           // ordinal session number in the sequence (1..N)
  title         // "K-row: か き く け こ"
  kind          // "intro" | "new" | "reinforce" | "quiz" | "rest" | "assessment"
  introduces    // item ids first taught here (seed into SRS)
  reviews       // "all-due" | explicit item ids (usually "all-due")
  exercises     // ordered Exercise specs
  culturalNotes // optional "did you know" content, timed to this lesson
  endState      // description of the clear completion state
}
```

### Exercise

A single interactive task within a lesson. The exercise *types* map directly to the
[pedagogy](../product/pedagogy.md) — heavily weighted toward production.

```
Exercise {
  id
  type          // see types below
  targetItems   // Character / Word / etc. ids this exercise drills
  prompt        // what the learner is shown/asked
  ...typeSpecificFields
}
```

**Exercise types (initial set):**

| Type | Modality | Recall vs. recognition |
|---|---|---|
| `listen-identify` | audio → pick character | recognition (scaffold) |
| `recognize-sound` | character → produce sound | **active recall** |
| `draw-character` | draw the glyph, stroke-checked | **active recall + motor** |
| `draw-from-memory` | draw with no reference | **active recall + motor** |
| `read-word` | show kana word → learner reads/understands | **active recall** |
| `arrange-sentence` | order word blocks into SOV | **production** |
| `story-read` | read a short story, then answer | comprehension |
| `comprehension-q` | answer a question about a sentence/story | comprehension |

New types are added as the curriculum grows, always biased toward production per
[P3](../product/principles.md#p3--production-over-recognition).

---

## Stroke Data

The drawing mechanic ([vision §8](../product/vision.md#8-the-three-signature-mechanics))
needs machine-usable stroke information for every drawable character:

- An **ordered list of strokes**, each stroke a path (sequence of points or an SVG
  path).
- Used for: rendering the animated stroke-order hint, and checking the learner's
  drawn strokes against the correct path and order.

**Source (decided):** kana stroke data comes from **`strokesvg`** (derived from the
Klee One typeface, OFL-licensed), so the stroke hints match our Klee One teaching
face exactly; gaps in the core 92 kana are hand-authored. Kanji stroke data (a later
phase) will come from KanjiVG. The matcher consumes a normalized ordered list of
stroke paths and is independent of the source. Full rationale in
[ADR-0004](../decisions/0004-stroke-data-source.md).

---

## Audio References

Content entities reference audio rather than embedding it. A reference resolves to:

- a **pre-recorded** asset (native voice actor) for core, high-repetition content, or
- a **generated** asset (Google Neural2) for dynamic sentences.

The hybrid strategy and rationale live in [audio.md](../design/audio.md). The content
model only needs the reference; the audio pipeline resolves it.

---

## Where Content Lives

Authored content is **static, versioned data that ships with the app** — not user
data in a database. Likely form: structured files (JSON/TS modules) under a
`content/` directory, validated against a schema. This keeps content:

- reviewable in pull requests (curriculum changes are diffable),
- available offline by default ([P9](../product/principles.md#p9--offline-first-one-codebase)),
- decoupled from per-learner state.

The exact on-disk format is an implementation decision for when coding begins; this
document fixes the *entities and relationships*, which is what the curriculum authors
and the SRS both depend on.
