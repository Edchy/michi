# Session Flow & The First Experience

How a learner actually moves through Michi, minute to minute: how one exercise
advances to the next, what the very first thing they do is, and where the "what are
the three Japanese scripts?" explanations live. This is the *lived experience* layer
that sits between the [curriculum sequencing](./overview.md) (what's taught when) and
the eventual UI.

> **Status:** Accepted design. Interaction decisions here are settled; exact visuals
> are deferred (UI design is out of scope for now).

---

## 1. The Session Interaction Model

### The shape of a session (recap)

Every session is the three-part rhythm from [overview.md](./overview.md#the-session-shape):
**Review → New content → Practice**, 15–25 minutes, always with a clear end state
([P7](../product/principles.md#p7--sessions-always-complete)). This document is about
how you move *within* that — task to task.

### Auto-advance is the default

A session is an **ordered queue of steps**. Most steps are exercises; a few are
*read-this* steps (a new character introduction, a cultural note). The learner does
**not** tap "Next" after every drill.

- **Exercise steps → auto-advance.** Complete a task → brief feedback → it flows
  automatically to the next step. No extra tap. This keeps momentum and respects the
  learner's attention.
- **Read-this steps → tap to continue.** When a step contains something to *read or
  absorb* — a new character's introduction, a "did you know" note, a grammar
  explanation — it waits for an explicit **Continue**. Reading should never be
  yanked away.

```
[====------] 4/10          ← session progress, always visible

   Hear the sound. Which kana?
     ▶ (audio)
   [ あ ]   [ い ]   [ う ]

   ✓  → (auto-advances after brief feedback)


  vs. a read-this step:

   New character:  か  (ka)
   ...introduction, stroke-order animation...

        [ Continue → ]     ← waits for the learner
```

Rationale: this is the fewest-taps model that still never rushes the moments that
deserve dwelling. It reads as modern and calm rather than either frantic or tedious.

### Feedback and correctness

- **Correct** → a brief, quiet affirmation, then auto-advance. No confetti storm; the
  reward is progress, not spectacle ([P6](../product/principles.md#p6--respect-the-learner)).
- **Incorrect** → **never punish, always teach.** Show the correct answer, let the
  learner see/hear it, and — for production/recall items — offer an immediate retry so
  the last thing they do is the *correct* action. A miss lowers that item's SRS grade
  (it'll come back sooner); it does not end anything or cost a "life." There are no
  hearts/lives in Michi ([P1](../product/principles.md#p1--learning-over-engagement),
  [data-model.md](../architecture/data-model.md) — no engagement fields).

### Progress within a session

A **progress indicator** (e.g. `4/10` or a bar) is always visible so the end is
always in sight — this is what makes a session feel *completable*
([P7](../product/principles.md#p7--sessions-always-complete)). At the end: an
unambiguous **"Today's session complete"** state, plus (where relevant) the honest
capability line ("You can read 10 hiragana").

### Pacing control

Auto-advance sets the default rhythm, but the learner is never trapped:
- Audio can be **replayed** on any step.
- A **back** affordance lets them revisit the previous step.
- Nothing is time-pressured. Mora-timing drills care about the *audio's* timing, never
  the learner's reaction speed.

### Why not the alternatives (for the record)

- *Tap "Next" on every step* — calm, but adds a tap per drill and drags on long review
  segments. We reserve the explicit tap for read-this steps only.
- *Swipe/keyboard card-stack (Anki-style)* — fast for power users, but swipe leans on a
  hover-adjacent gesture (awkward under the [no-hover rule](../architecture/tech-stack.md))
  and feels less like a structured lesson. Not the default; a keyboard shortcut for
  advancing on desktop is a fine *addition* later.

---

## 2. The Absolute First Thing

**The learner's first action is to _hear and mimic a real Japanese sound_ — not to
read anything.**

On first open, before any character, any menu, any lecture:

```
        ▶ (native voice: "あ")

   Say it back:  あ

   Once you know a Japanese sound,
   you know it forever — no silent
   letters, no irregular spellings.

        [ I said it ]
```

### Why this is first

- **Doing, not reading.** The product is *acquiring a language*; the first moment
  should feel like doing it, immediately. A hook beats an intro.
- **Audio-first is forced, correctly.** Japanese lives or dies on correct sound
  (pitch accent — see [audio.md](../design/audio.md)); starting with the ear, before
  the eye, is the right encoding order and is *required* by the
  [no-romaji rule](../product/principles.md#p2--no-romaji-ever-as-a-reading-aid) — there
  is no Latin lifeline, so the sound must come from audio.
- **It earns the story.** The "why Japanese / three scripts" narrative lands far
  better *after* the learner has personally made a Japanese sound than as a cold
  opening. This is [pedagogy.md](../product/pedagogy.md)'s "earn it, don't front-load"
  applied to the very first minute.
- **Output from second zero.** Saying it back is production on turn one
  ([Output Hypothesis](../product/pedagogy.md); [P3](../product/principles.md#p3--production-over-recognition)).

> Note: "say it back" is, at MVP, a prompt to speak aloud with a self-confirm
> ("I said it") — we are **not** building speech recognition now
> ([vision §4](../product/vision.md#4-what-michi-is-not)). The act of vocalizing is
> what matters; grading it is a possible later layer.

### What immediately follows

The first sound (あ) flows into the rest of the vowels as *hearing and mimicking*,
still no characters. Characters attach to these now-familiar sounds on the next day —
exactly the existing Day 1 → Day 2 arc in [month-1.md](./month-1.md), now with a
doing-first opening instead of a reading-first one.

---

## 3. Explaining the Three Scripts — Where, When, Why

Japanese has three writing systems (hiragana, katakana, kanji), and *that* fact plus
its history is genuinely fascinating and motivating. But it is **context, not a
prerequisite.** The policy:

> **Drip each script's explanation in at the moment it first becomes relevant — never
> as an upfront lecture.** Cultural/structural context is *earned*, timed to when the
> learner is about to touch the thing being explained.

This follows directly from [pedagogy.md](../product/pedagogy.md) ("Cultural Context:
Earn It, Don't Front-Load It") and keeps every session
[completable and focused](../product/principles.md#p7--sessions-always-complete).

### The placement plan

| What's explained | When / where it appears | Why there |
|---|---|---|
| **"Japanese has three scripts" — the big picture** | A short beat in the **first session**, *after* the first sound-mimic hook — not before it. Kept to a couple of sentences + the promise: "learn 46 sounds and you can read anything written in hiragana." | The learner has just *made* a Japanese sound; now a tiny bit of map-of-the-territory motivates the road ahead without front-loading. |
| **What hiragana is, deeply** | Woven across the **first module** as characters are learned — plus the origin drip ("invented in the Heian period; あ comes from 安") at the **vowels-reinforce beat**, when it adds meaning rather than noise. | You understand hiragana by *learning* it; the history lands best once a few characters feel real. |
| **What katakana is** | at the **start of the katakana module** — right as it's introduced. Includes its monk-origin "did you know" and the key idea: *same sounds as hiragana, different shapes, used for loanwords/emphasis.* | Explaining katakana before the learner needs it is pure front-loading. At introduction, it's instantly concrete ("you already know these sounds"). |
| **What kanji is** | When the **first kanji** appears (一二三四五), embedded in real vocabulary. | Kanji is only graspable in context. Introduced as "borrowed from China, then Japan built hiragana/katakana on top" *at the moment a kanji is on screen.* |
| **The full origin story** (kanji → kana invented on top; why three scripts coexist) | Assembled gradually across the drips above; optionally revisited as one satisfying recap once all three have been met (once kanji have begun). | By then it's a story about things the learner *knows*, not an abstract lecture — exploration, not homework. |

### These drips have a persistent home too: each is saved into the **codex**, and some
also surface as optional **book stops** beside the world-map path — a browsable place
to re-read the "how Japanese is built" lore without ever front-loading it. Timing here
still governs *when* a drip first appears; the codex only records what's already been
met. See [station-map.md §3](./station-map.md#3-book-stops--the-codex--the-lore-without-front-loading).

### The rule for any script/culture explanation

Before adding one, ask: *is the learner about to touch the thing this explains?* If
yes, it's a well-timed drip. If it's "useful background they might need someday," it's
front-loading — cut it or move it to where it becomes relevant. Cultural notes are
**read-this steps** (§1): they get a Continue, never a drill, and never block
progress.

---

## Related

- [overview.md](./overview.md) — session shape and sequencing philosophy
- [month-1.md](./month-1.md) — the concrete day-by-day plan this flow runs on
- [content-model.md](./content-model.md) — lessons as ordered exercise queues; the
  `culturalNotes` and read-this step types
- [pedagogy.md](../product/pedagogy.md) — earn-it-don't-front-load; audio-first
- [P2 no-romaji](../product/principles.md#p2--no-romaji-ever-as-a-reading-aid),
  [P6 respect](../product/principles.md#p6--respect-the-learner),
  [P7 sessions complete](../product/principles.md#p7--sessions-always-complete)
