# Michi Development Overview

This document is a founder-facing map of the application. It explains the major parts,
where they live, how they interact today, and what we intend to separate as the learning
system is rebuilt.

Use it to understand the code. Use `PLAN.md` for approved learning rules and the active
sequence of work.

## The whole product at a glance

```text
Course map
Province → Track → Station
       │
       ▼
Station session
Review → Teach → Practise → Use → Checkpoint → Complete
       │
       ├───────────────┐
       ▼               ▼
Learner state       Authored content
answers, due dates  kana, words, stations
       │               │
       └───────┬───────┘
               ▼
        Session planner
   decides what the learner sees now
               │
               ▼
          Shared UI runner
```

Today, the course map and four station experiences work. The SRS calculation engine
also works in isolation. Persistent learner state and the session planner do not exist
yet, and station content is still partly embedded in a large React component.

## Course hierarchy

```text
Michi
└── Province
    └── Track
        └── Station
            └── Steps and exercises
```

### Province

A province is a major learning area or stage, currently Hiragana, Katakana, First
kanji, or Words and sentences. Only Hiragana is authored today.

Current code: `src/app/worldmap.ts`

### Track

A track is a shorter sequence within a province. On the map, tracks use Tokyo Metro
line names and colors. Hiragana currently declares four tracks.

Current code: `src/app/worldmap.ts`

### Station

A station is one completable learning session. The first four are playable:

1. The three scripts: orientation.
2. First sounds: vowel acquisition.
3. The K row: acquisition plus the first word.
4. A first look back: consolidation.

Map identity and route: `src/app/worldmap.ts`

Playable routes: `src/app/tracks/*/page.tsx`

Current authored steps: `src/content/track0.ts` and `src/content/track1.ts`

Current rendering: `src/components/track0-page.tsx` and
`src/components/track1-page.tsx`

## What happens today

### Opening the map

```text
src/app/page.tsx
  reads michi-world-position from localStorage
  ↓
src/app/worldmap.ts
  supplies provinces, tracks, stations, coordinates, and routes
  ↓
src/components/WorldMap.tsx
  draws the path and handles navigation
```

Current progress is the furthest unlocked map position. It records travel through the
course, not item-level memory.

### Opening a station

```text
Route page
  ↓ passes a station id
track0-page.tsx or track1-page.tsx
  ↓ selects configuration and builds an ordered step queue
Step renderer
  ↓ presents teaching, matching, drills, speaking, context, and completion
Return to map with ?completed=<station-id>
  ↓
Map unlocks the next station
```

Stations 2–4 share `track1-page.tsx`, but that component currently owns too many jobs:

- Station-specific copy and configuration.
- Step orchestration and navigation.
- Exercise rendering.
- Drill state and adaptive option counts.
- Audio controls and keyboard behavior.
- Completion UI.

The new station architecture will separate these responsibilities without changing the
approved learner experience all at once.

## Current code map

| Area | What it does | Current location |
|---|---|---|
| Application shell | Root layout and global styling | `src/app/layout.tsx`, `src/app/globals.css` |
| Course map data | Provinces, tracks, stations, map coordinates | `src/app/worldmap.ts` |
| Course map UI | Draws and navigates the path | `src/components/WorldMap.tsx` |
| Station routes | Make individual stations addressable | `src/app/tracks/*/page.tsx` |
| Orientation station | Three-script content and rendering | `src/content/track0.ts`, `src/components/track0-page.tsx` |
| Kana stations | Vowel, K-row, and consolidation content | `src/content/track1.ts` |
| Kana station runner | Renders and controls Stations 2–4 | `src/components/track1-page.tsx` |
| Kana items | Vowel and K-row content records | `src/content/hiragana.ts` |
| Questions | Builds choice and rehearsal questions | `src/content/question.ts` |
| Drill progress | In-session difficulty and coverage | `src/content/drill.ts` |
| Question ordering | Avoids uneven random repetition | `src/content/bag.ts` |
| Gojūon model/UI | Full kana grid and learned rows | `src/content/gojuon.ts`, `src/components/gojuon-grid.tsx` |
| Audio | Loads and plays local kana recordings | `src/lib/audio.ts`, `public/audio/hiragana/` |
| Codex content | Optional book-stop articles | `src/content/codex.ts`, `src/app/codex/` |
| Codex state | Remembers visited book stops | `src/lib/codex-progress.ts` |
| SRS calculation | Calculates intervals, due dates, and confidence | `src/srs/engine.ts` |
| Shared controls | Buttons and station navigation | `src/components/button.tsx`, `src/components/station-nav.tsx` |

Most of these areas have focused tests beside them as `*.test.ts` or `*.test.tsx`.

## Current versus planned learning state

### Current

```text
localStorage
└── furthest unlocked station

SRS engine
└── tested calculation functions, not connected to stations
```

### Planned

```text
Learner state
├── visited stations
├── completed stations
├── introduced learning items
├── attempt evidence
└── review records
    ├── item id
    ├── capability
    ├── next review time
    └── SRS state
```

A learning item is content such as `あ`. A capability is something the learner can do
with it, such as hear its sound and identify the symbol. One item-capability pair is a
review target.

## Planned responsibility boundaries

```text
Course map
Where stations live and how the learner travels

Station specification
What one station intends to teach and how

Authored content
The Japanese items, explanations, examples, audio, and reference strokes

Learner-state store
What this learner has done and when review targets are due

SRS engine
Calculates the next review time from one result

Session planner
Combines due review, prerequisites, and one station into a bounded session

Station runner
Displays the planned sequence using reusable step components
```

These boundaries keep authored curriculum free of learner-specific dates and keep UI
components free of course-planning decisions.

## Approved station specification

Every station declares seven sections:

1. **Identity:** id, type, and title.
2. **Outcome:** the one capability the station intends to establish or strengthen.
3. **Prerequisites:** capabilities that must be usable before the station makes sense.
4. **Introduced capabilities:** new review targets created by the station.
5. **Learning sequence:** the ordered authored teaching, guided practice, recall,
   speaking, writing, and context steps.
6. **Application:** meaningful use in a word, sentence, listening task, or other context
   when the learner knows enough material.
7. **Completion contract:** checkpoint coverage, mistake recovery, completion message,
   and the next-course handoff.

The station does not own map coordinates, learner answers, due dates, generated review
questions, or React components.

### Station types

- **Orientation:** establishes a mental model and may introduce no review targets.
- **Acquisition:** introduces a small set of new capabilities.
- **Consolidation:** introduces nothing and strengthens earlier capabilities together.
- **Application:** uses known material in meaningful language.
- **Assessment:** checks broader capability with minimal support.

The shared runner can omit phases that do not apply to a station type.

## Target station runtime

```text
Learner selects station
        │
        ▼
Session planner checks prerequisites and due review
        │
        ├── prerequisites usable ──► normal station
        │                              │
        │                              ▼
        │                         bounded review
        │                              │
        │                              ▼
        │                      authored station sequence
        │                              │
        │                              ▼
        │                       final checkpoint
        │                              │
        │                              ▼
        │                   completion + saved evidence
        │
        └── prerequisites weak ───► recovery session
                                       │
                                       ▼
                                save review evidence
```

## Province structure

The current map declares:

```text
Province 1: Hiragana
Province 2: Katakana
Province 3: First kanji
Province 4: Words and sentences
```

An approved province represents a major change in the learner's mental model of
Japanese or a major new learning domain. It is not merely a content bucket.

A province begins with a short orientation station when entering it genuinely changes
how the learner needs to understand or use Japanese. The orientation explains what is
changing, why it matters now, how it connects to existing knowledge, the capability
ahead, and one concrete example. It may be completed without creating SRS review
targets.

Orientation stations do not carry long lectures. Optional history, cultural depth,
linguistic background, and broader explanation belong in book stops between stations.
Essential teaching stays on the station path; book stops expand it without blocking
progress.

Before this hierarchy becomes authoritative, we need to resolve one tension: words,
sentences, listening, speaking, and grammar should appear throughout the course rather
than waiting for a final province. A province should probably name its dominant new
learning domain, not imply that all other capabilities are absent.

Questions still to decide together:

- Should Hiragana and Katakana each be complete provinces?
- When should the first kanji appear relative to katakana and early grammar?
- What should replace or clarify the current “Words and sentences” province?
- Does every province need a standalone orientation station, or only provinces that
  introduce a genuinely new mental model?

The province definition and orientation/book-stop boundary are approved. The actual
province roster is not. `src/app/worldmap.ts` remains the current implemented map until
the roster questions are settled.

### Approved Province 1: Hiragana foundations

Province 1 ends when the learner can use hiragana to decode beginner words and simple
sentences. Covering the basic 46 is a milestone inside the province, not its final
boundary.

The province therefore includes the basic 46, essential changed and combined sounds,
small-character behavior such as small `っ`, real words throughout, simple sentences,
and progressive speaking and writing rehearsal.

Its opening station combines the brief whole-course orientation to the three scripts
with the reason Michi begins with hiragana. Deeper history remains in the following
book stop.

This is an approved target, not the current map implementation. The existing Province
1 roster in `src/app/worldmap.ts` will need to be revised later.

### Approved Province 2: Katakana in use

Province 2 transfers the sound system learned through hiragana into katakana and
teaches why Japanese chooses this script for particular kinds of words. It ends when
the learner can read common borrowed words, names, sound words, and beginner mixed
hiragana-katakana text.

It includes the core forms, essential changed and combined sounds, `ー`, appropriate
common foreign-sound combinations, real borrowed words from the beginning, and mixed
script reading. Hiragana remains active through review.

The short orientation uses one concrete script contrast. History and broader cultural
background remain in book stops.

### Approved Province 3: Kanji foundations

Province 3 teaches that kanji contributes meaning and that pronunciation depends on
the word in which a character appears. It ends when the learner understands that model
and can read useful beginner words and simple mixed-script sentences containing their
first kanji.

Kanji is learned inside useful words. Specific reading and meaning-in-context
capabilities are tracked instead of pretending each kanji has one permanent sound.
Visual components support distinction and memory when helpful, while writing remains
selective. Kana, grammar, listening, words, and sentences continue throughout.

The province has no approved arbitrary character count. Its content will be the
smallest useful set that proves the functional outcome.

### Approved Province 4: Sentence foundations

Province 4 makes sentence understanding and construction the dominant new learning
domain. Words and sentences already appear throughout the first three provinces; this
province changes the focus rather than introducing language use for the first time.

It ends when the learner can understand and build simple Japanese sentences using
familiar words and scripts. It expands useful vocabulary, listening, mixed-script
reading, speaking rehearsal, concrete grammar patterns, short exchanges, and
mini-stories. The orientation uses one familiar sentence to reveal how its pieces work,
while deeper grammar explanation remains in later stations or book stops.

### Approved initial roster

```text
Province 1: Hiragana foundations
Province 2: Katakana in use
Province 3: Kanji foundations
Province 4: Sentence foundations
```

This closes the province roster for the current planning horizon. Future provinces are
added only when another major mental-model change or learning domain earns one.

## Documentation map

- `README.md`: concise current product truth.
- `PLAN.md`: approved rules, phases, and active decisions.
- `DEV-OVERVIEW.md`: code and system map for the founder.
- `CLAUDE.md`: concise agent instructions.
- `REFERENCE.md`: frozen legacy documentation, not current authority.
