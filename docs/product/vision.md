# Michi — Product Vision

> **Michi (道)** — Japanese for "path" or "the way." A road you walk a little
> further every day. The name is the promise: not a game you win, but a path you
> travel until the language is yours.

This is the flagship document. If you read only one file in this repository, read
this one. It defines what Michi **is**, what it is **not**, who it is **for**, why
it is built the way it is, and how we will know it is working. Everything else in
`docs/` exists to serve the vision described here.

---

## 1. One-Sentence Definition

**Michi is a Japanese learning app built on real learning science, optimized for
genuine language acquisition instead of engagement metrics.**

It teaches you to *understand and produce* Japanese — reading its scripts, hearing
its sounds correctly, writing its characters by hand, and building real
sentences — rather than training you to tap the right box in a streak-driven game.

---

## 2. The Origin

Michi began as a tool for one specific learner: a 14-year-old beginning Japanese
from zero. That origin matters and shapes every decision:

- **Real, not abstract.** A teenager can smell filler and busywork instantly. The
  content has to feel like it's teaching *actual Japanese you'd encounter in anime,
  games, music, and real life* — not textbook mannequins buying train tickets.
- **Honest, not manipulative.** No dark patterns, no manufactured streak anxiety,
  no guilt notifications. Respect the learner's attention and intelligence.
- **Motivating through mastery.** The reward is visibly getting better at a hard,
  beautiful thing — not points, gems, or a cartoon owl's disappointment.

Though it started for one learner, the pedagogy is language-agnostic (see
[§10](#10-beyond-japanese)). Japanese is the hardest major language for English
speakers, so a system built to teach it well will teach almost anything.

---

## 3. What Michi Is

Michi is:

1. **A learning tool, first and always.** Every feature is judged by a single
   question: *does this help the learner actually acquire the language?* If a
   feature would boost daily-active-users but not learning, it does not ship.

2. **Comprehensible-input driven.** Learners acquire language by consuming input
   just slightly above their current level ("i+1") in context where meaning is
   inferable — not by memorizing decontextualized lists. See
   [pedagogy.md](./pedagogy.md).

3. **Production-heavy.** Michi biases toward *active recall and output* — write the
   character, produce the word, build the sentence — because retrieval difficulty
   is proportional to memory strength. Recognition (multiple choice) is used
   sparingly, as a scaffold, never as the main event.

4. **Built around handwriting.** Drawing each character by hand, with correct
   stroke order from day one, engages motor memory — a separate, reinforcing memory
   channel. This is a core mechanic, not a bonus feature.

5. **Powered by spaced repetition.** Every character, word, and grammar pattern
   lives inside an SRS. Nothing is ever "done." Everything cycles back right before
   it would be forgotten. See [srs-engine.md](../architecture/srs-engine.md).

6. **Honest about memory.** Knowledge decays; Michi shows this truthfully instead
   of hiding it. Progress reflects *real, tested capability* ("you can read 46
   hiragana, you know 200 words"), and that number can go **down** if you stop —
   framed as normal and quickly recoverable, never as failure.

7. **Offline-first and cross-platform.** One codebase runs in the browser and, via
   Capacitor, as a native mobile app. It works without a connection. See
   [tech-stack.md](../architecture/tech-stack.md).

8. **Script-native.** Japanese is taught in Japanese scripts from the start.
   **Romaji is never used as a reading aid — ever.** (See
   [principles.md](./principles.md) and
   [ADR-0002](../decisions/0002-no-romaji.md).)

---

## 4. What Michi Is *Not*

Being explicit about non-goals is how a project keeps its soul. Michi is **not**:

- **Not an engagement machine.** No streak-loss anxiety, no aggressive push
  notifications, no XP/gem economy designed to trigger daily opens. A learner who
  comes back three times a week and truly learns beats one who taps a streak daily
  and retains nothing.

- **Not a romaji crutch.** We never render Japanese in the Latin alphabet as a
  reading aid. Romaji slows the formation of a native phonological map. (Romaji may
  appear *once*, in passing, only to explain *why we don't use it*.)

- **Not recognition theater.** We do not pad the app with easy multiple-choice
  taps that create the feeling of progress without the substance.

- **Not a gamified dopamine loop wearing an education costume.** Delight is
  welcome; manipulation is not. The distinction is whether the mechanic serves the
  learner or serves our metrics.

- **Not a grammar-drill textbook either.** We explain grammar clearly and lightly
  when it unlocks comprehension — but grammar drills in isolation are not the
  method. Input and production in context are.

- **Not a chat-with-an-AI-tutor product (for now).** The MVP is a structured,
  authored curriculum with deterministic exercises. Conversational AI practice is a
  possible *later* layer, not the foundation. (Scope guard against feature drift.)

- **Not trying to cover everything on day one.** Michi ships a great Month 1
  (hiragana mastery + first words) before it tries to be a complete JLPT-to-fluency
  platform. Depth first, then breadth.

---

## 5. Who It's For

**Primary persona — "the motivated beginner."** A teenager or adult starting
Japanese from zero, curious and willing to do real work, but allergic to busywork
and put off by textbooks. Likely hooked by anime, games, or music. Wants to
*actually be able to read and understand things*, not collect badges.

**Secondary persona — "the returning restarter."** Someone who tried Duolingo (or a
class) and bounced off, retaining little. They need a method that respects their
time and produces visible, real capability.

**Explicitly not the target (yet):** advanced learners seeking JLPT N2/N1 exam
cramming, or learners who want a pure conversation partner. Michi may serve them
later; it is not designed around them now.

---

## 6. Goals

### 6.1 Learning Goals (the ones that actually matter)

- **G1 — Literacy in the scripts.** The learner can *read and write* hiragana, then
  katakana, then a growing set of kanji embedded in real vocabulary.
- **G2 — A correct phonological map.** The learner hears and reproduces Japanese
  sounds — including pitch accent and the flap "r" — from accurate audio, never
  filtered through romaji.
- **G3 — Real comprehension.** The learner understands authentic-feeling sentences
  in context, not just isolated words.
- **G4 — Production ability.** The learner can produce language — write it, say it,
  arrange it — however clumsily at first. Output accelerates acquisition.
- **G5 — Durable retention.** Knowledge is maintained over months through spaced
  repetition, with honest visibility into what has and hasn't stuck.

### 6.2 Product Goals

- **P1 — One codebase, phone + desktop, offline-capable.**
- **P2 — Sessions that always complete.** 15–25 minutes, with a clear end state.
  Never open-ended, never infinite scroll.
- **P3 — Honest progress surface.** Stats reflect tested capability and can decay.
- **P4 — Correct-by-construction teaching.** What the learner sees (fonts, stroke
  order, audio) matches what they're taught to produce. No mismatches that
  silently teach the wrong thing. See [typography.md](../design/typography.md) and
  [audio.md](../design/audio.md).

### 6.3 Non-Goals (restated as goals we deliberately reject)

- We will **not** optimize for DAU, session count, or streak length as success
  metrics.
- We will **not** ship features whose primary effect is engagement without learning.
- We will **not** broaden scope before Month 1 is genuinely excellent.

---

## 7. Why Michi Is Good for Learning — In Contrast to Duolingo

Duolingo is the reference point because it's what most people mean by "language
app." It is a brilliant piece of engagement engineering. That is precisely the
problem: it is optimized for *engagement*, and engagement is not learning.

Research on Duolingo consistently finds **modest vocabulary gains but weak outcomes
in grammar, real comprehension, and speaking.** It teaches users to *complete
exercises*, not to *understand a language*. For Japanese specifically it leans on
romaji, which actively slows learners by preventing a native phonological map from
forming.

Michi inverts each of these choices deliberately:

| Dimension | Duolingo | Michi | Why Michi's choice teaches better |
|---|---|---|---|
| **Core objective** | Maximize engagement (DAU, streaks) | Maximize acquisition | You optimize what you measure. Measuring learning produces learning. |
| **Romaji** | Used as a crutch for Japanese | Never, as a reading aid | Romaji blocks the native phonological map; script-native reading builds it. |
| **Exercise type** | Recognition-heavy (multiple choice) | Production-heavy (recall, write, build) | Retrieval difficulty ∝ memory strength. Recognition makes weak memories. |
| **Grammar** | Largely implicit, inferred | Clear, light, *timed* explanations | A few honest sentences of explanation unlock comprehension faster than guessing. |
| **Writing** | Afterthought / optional | Core mechanic, correct stroke order | Handwriting engages motor memory — a second encoding channel that reinforces recall. |
| **Sentences** | Often weird, decontextualized | Culturally real, relevant, in context | Comprehensible input requires meaning to be inferable and worth caring about. |
| **Progress** | Abstract XP, gems, levels | Concrete capability ("read 46 hiragana") | Real capability is intrinsically motivating and honestly informative. |
| **Memory decay** | Hidden from the learner | Shown honestly, framed as normal | Truthful feedback lets the learner act; hidden decay produces silent forgetting. |
| **Motivation model** | Extrinsic (streaks, guilt, FOMO) | Intrinsic (visible mastery of a hard thing) | Extrinsic loops collapse when you stop; intrinsic motivation compounds. |
| **Notifications** | Frequent, guilt-tinged | Minimal, respectful | Manufactured anxiety is not a learning aid. |
| **Audio** | Variable, TTS, pitch often ignored | Accuracy-first, pitch-accent-aware | Bad audio internalizes wrong patterns that are painful to unlearn. |

The through-line: **Duolingo makes the app the thing you're good at. Michi makes
Japanese the thing you're good at.**

### The five learning-science pillars underneath the table

Each contrast above rests on established principles, detailed in
[pedagogy.md](./pedagogy.md):

1. **Comprehensible Input** (Krashen) — acquire from meaningful i+1 input.
2. **Spaced Repetition** — review each item right before it would be forgotten.
3. **Active Recall over Recognition** — production forms strong memories.
4. **Motor Memory** — handwriting adds a reinforcing encoding channel.
5. **Output Hypothesis** — being made to produce language accelerates acquisition.

---

## 8. The Three Signature Mechanics

If Michi is remembered for three things, they are these — and each is a direct
expression of the pedagogy:

1. **Script-native, no-romaji teaching.** Sounds are taught, then immediately bound
   to hiragana. The Latin alphabet never mediates reading.

2. **Handwriting with correct stroke order.** Canvas-based drawing, stroke accuracy
   checked, hints revealed one stroke at a time. Motor memory as a first-class
   citizen.

3. **Honest progress with decay.** A visible, tested capability count that rises
   when you practice and falls when you don't — always framed as recoverable, never
   as punishment. Powered directly by SRS confidence scores.

---

## 9. How We'll Know It's Working

We deliberately avoid engagement vanity metrics. Success is measured in
**capability and retention**:

- **Literacy velocity** — time to read all 46 hiragana with high accuracy
  (target: within Month 1).
- **Retention curve** — percentage of items still above the confidence threshold
  after 30 / 60 / 90 days.
- **Production accuracy** — stroke-order and recall correctness on *from-memory*
  exercises, not recognition.
- **Honest capability count** — the learner's true tested vocabulary/character
  count over time.
- **Qualitative** — can the learner read a real sentence they've never seen,
  composed of known characters, and understand it? That moment is the product.

Explicitly *not* success metrics: streak length, daily opens, session count,
notification click-through.

---

## 10. Beyond Japanese

The pedagogical framework is language-agnostic. Extending Michi to another language
means applying the same principles, not rebuilding:

- No romanization crutch for languages with their own script (Arabic, Korean,
  Thai, …).
- Comprehensible input from the start.
- SRS for all content.
- Handwriting where the script rewards it.
- Cultural context dripped in over time.
- Honest, decaying progress.

Building for Japanese first — the hardest major language for English speakers —
means the system will handle easier languages with less effort, not more.

---

## 11. Guiding Principles (the short version)

The full, enforceable list lives in [principles.md](./principles.md). In spirit:

> **Teach the language, not the app. Respect the learner. Tell the truth about
> memory. When in doubt, choose the option that produces real acquisition — even if
> it's less "sticky."**

---

## Related Documents

- [pedagogy.md](./pedagogy.md) — the learning science in depth
- [principles.md](./principles.md) — the non-negotiable design rules
- [glossary.md](./glossary.md) — shared vocabulary (SRS, mora, i+1, gojūon…)
- [../curriculum/overview.md](../curriculum/overview.md) — how content is sequenced
- [../architecture/overview.md](../architecture/overview.md) — how the system is built
- [../roadmap.md](../roadmap.md) — phases and milestones
