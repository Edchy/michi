# Design Principles

These are Michi's non-negotiables. [vision.md](./vision.md) explains *what* we're
building and *why*; this document is the short, enforceable list of rules that any
feature, exercise, or line of code must respect. When a decision is unclear, come
back here.

Each principle is stated as a rule, with its rationale and a concrete test you can
apply during design and review.

---

## P1 — Learning over engagement

**Rule:** Every feature is justified by how it helps the learner acquire the
language. Engagement is a side effect of good learning, never the goal.

**Why:** You optimize what you measure. Optimizing engagement produces addictive
mediocrity; optimizing learning produces learning.

**Test:** *"Would this feature earn its place if it increased learning but had zero
effect on daily opens?"* If no, cut it.

---

## P2 — No romaji, ever (as a reading aid)

**Rule:** Japanese is never rendered in the Latin alphabet to help the learner
read or pronounce it. Sounds are taught, then immediately bound to hiragana.

**Why:** Romaji prevents the formation of a native phonological map and slows
hiragana acquisition. See [ADR-0002](../decisions/0002-no-romaji.md).

**Allowed exception:** Romaji may appear *once*, explicitly, to explain why we
don't use it — and in English UI chrome that has nothing to do with reading
Japanese. It is never a pronunciation guide.

**Test:** *"Could the learner lean on the Latin letters instead of the kana here?"*
If yes, remove them.

---

## P3 — Production over recognition

**Rule:** Bias every exercise toward active recall and output — write, recall,
produce, arrange — over passive multiple-choice recognition.

**Why:** Retrieval difficulty is proportional to resulting memory strength.
Recognition feels like progress but builds weak memories.

**Test:** *"Is the learner retrieving from memory, or just picking the least-wrong
option?"* Recognition is allowed only as a scaffold on brand-new material.

---

## P4 — Correct by construction

**Rule:** What the learner sees must match what they're taught to produce. Fonts
show textbook-correct character forms; stroke order is always correct; audio has
correct pronunciation and pitch accent.

**Why:** A mismatch silently teaches the wrong thing, and wrong patterns are
painful to unlearn. See [typography.md](../design/typography.md) and
[audio.md](../design/audio.md).

**Test:** *"If the learner perfectly imitated what we show/play, would they be
correct?"* If not, fix the source, not the learner.

---

## P5 — Tell the truth about memory

**Rule:** Progress reflects real, tested capability and is allowed to decay.
Confidence scores fall when items go unreviewed. Visible counts only include items
above threshold.

**Why:** Honest feedback lets the learner act. Hidden decay produces silent
forgetting and a false sense of mastery.

**Test:** *"Does this number reflect what the learner can actually do right now?"*
If it's inflated or frozen, it's lying.

---

## P6 — Respect the learner

**Rule:** No dark patterns. No manufactured streak anxiety, no guilt-tripping
notifications, no FOMO economies. Decay and slips are always framed as normal and
quickly recoverable.

**Why:** Manipulation is not a teaching method, and it corrodes trust and intrinsic
motivation.

**Test:** *"Would I feel respected, or manipulated, receiving this?"*

---

## P7 — Sessions always complete

**Rule:** A session is 15–25 minutes with a clear beginning, middle, and defined
end state. No infinite scroll, no open-ended loops.

**Why:** A completable session is motivating and sustainable; an endless one
produces fatigue and guilt.

**Test:** *"Does the learner reach an unambiguous 'done for today'?"*

---

## P8 — Everything lives in the SRS

**Rule:** Every unit of knowledge — character, word, kanji, grammar pattern — is an
SRS item with its own interval and review date. Nothing is ever permanently "done."

**Why:** Durable retention requires scheduled review; a single exposure is useless.
See [srs-engine.md](../architecture/srs-engine.md).

**Test:** *"Can this piece of knowledge go stale? Then it must be an SRS item."*

---

## P9 — Offline-first, one codebase

**Rule:** Core learning works without a network connection, from a single codebase
that runs on phone and desktop.

**Why:** Learning shouldn't depend on connectivity, and two codebases double the
work while halving the polish. See [tech-stack.md](../architecture/tech-stack.md).

**Test:** *"Does this feature break in airplane mode?"* Core learning must not.

---

## P10 — Depth before breadth

**Rule:** Make the hiragana curriculum genuinely excellent before expanding scope. Resist feature
creep and premature breadth (JLPT-to-fluency, AI tutor, etc.).

**Why:** A deep, correct slice teaches more and validates the method better than a
broad, shallow one.

**Test:** *"Is this making the current phase better, or just bigger?"*

---

## Using these principles

- **In design:** state which principles a feature serves, and which it risks
  violating.
- **In review:** a change that violates a principle needs either a fix or a
  documented, deliberate exception recorded as an [ADR](../decisions/README.md).
- **In disputes:** principles outrank preferences. If two conflict, escalate to
  [vision.md](./vision.md) — learning wins.
