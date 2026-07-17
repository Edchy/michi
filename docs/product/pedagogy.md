# Japanese Learning App — Pedagogy & Design Philosophy

## What This App Is

A Japanese learning app built for a 14-year-old, from scratch, with real learning science at its core. Not a gamification machine optimized for daily active users. A tool that actually teaches.

Inspired by Duolingo in format, but different in philosophy: this app prioritizes genuine language acquisition over engagement metrics. If that means fewer notifications and no streak anxiety, good.

---

## What Duolingo Gets Wrong

Duolingo optimizes for *engagement* — streaks, XP, hearts, push notifications — not for *learning*. Research shows it produces modest vocabulary retention but is weak at grammar acquisition, real comprehension, and speaking ability.

The core problem: it teaches users to complete exercises, not to understand the language. For Japanese specifically, it leans on romaji (romanized Japanese characters) as a crutch, which actively slows learners down by preventing them from building a native phonological map of the language.

This app does not use romaji. Ever.

---

## Core Learning Science Principles

### 1. Comprehensible Input (Krashen's Input Hypothesis)
Language is acquired — not learned — by consuming input that is just slightly above the learner's current level, known as "i+1". Not isolated vocabulary lists. Not grammar drills. Actual language in context, where meaning is inferable.

Analogy: You didn't learn your first language from a textbook. You were surrounded by language that made sense in context, and your brain did the pattern recognition. This app tries to recreate that process, guided and structured.

### 2. Spaced Repetition (SRS)
Memory decays in a predictable curve. Spaced repetition systems exploit this by scheduling review of each item right before it would be forgotten. Items you struggle with appear more often. Items you know well appear less often.

Every word, character, and grammar pattern in this app lives inside an SRS. Nothing is ever "done." Everything cycles back.

### 3. Active Recall Over Passive Recognition
Multiple choice is too easy. Passive recognition ("does this mean river or mountain?") produces weak memories. Active recall ("write/say the Japanese word for river") produces strong ones.

The difficulty of retrieval is proportional to the strength of the resulting memory. This app biases heavily toward production exercises, not recognition exercises.

### 4. Motor Memory (Writing)
When learners write characters by hand (or by tracing on screen), they encode information in a separate memory channel — motor memory — that reinforces visual memory. This is why people who write vocabulary by hand remember it better than people who type it.

Every character in this app can be practiced through drawing exercises. Stroke order is taught correctly from the start, not as an afterthought.

### 5. Output Hypothesis
You cannot become fluent by consuming language alone. Being *forced* to produce language — even clumsily — accelerates acquisition significantly. This app includes production exercises throughout, not just at advanced stages.

---

## Japanese-Specific Considerations

### Three Writing Systems
Japanese uses three scripts simultaneously, sometimes in a single sentence:

- **Hiragana** — 46 phonetic characters, covers all Japanese sounds. The foundation of everything.
- **Katakana** — another 46 phonetic characters with the same sounds as hiragana. Used for foreign loanwords, emphasis, and onomatopoeia.
- **Kanji** — Chinese-derived logographic characters. Japanese uses roughly 2,000 in everyday life.

The order matters: hiragana first, fully, before anything else. Katakana second. Kanji gradually, embedded in real vocabulary.

### No Romaji Policy
Romaji (writing Japanese sounds in the Latin alphabet) is a crutch. It prevents learners from building a proper mental model of the language and slows hiragana acquisition. This app introduces the Japanese sound system and then immediately teaches it through hiragana. The Latin alphabet is never used as a reading aid.

### Grammar Structure
Japanese word order is Subject-Object-Verb, the opposite of English. Verbs go at the end. This is introduced explicitly and early, with clear explanation, not left to inference.

### Sound System
Japanese is mora-timed: every syllable takes roughly the same amount of time. There are no silent letters, no irregular pronunciations. Once the sounds are learned, anything can be read and pronounced correctly. This is framed as good news early in the learning journey.

---

## Cultural Context: Earn It, Don't Front-Load It

Japanese has a genuinely fascinating origin story. Kanji were borrowed from China and adapted. Then Japanese invented two phonetic alphabets — hiragana and katakana — on top of that system. The result is a writing system unlike anything in Europe.

This context matters for motivation and mental modeling, but it should not be dumped upfront as a lecture. Instead:

- A short, engaging intro (5 minutes maximum) when the app is first opened.
- "Did you know" moments dripped in throughout the learning journey, timed to when they're relevant. When katakana is introduced: "This script was invented by Buddhist monks in the 800s."
- Cultural context makes learning feel like exploration, not homework.

For a 14-year-old specifically: anchor to relevance. If he's into anime, gaming, or Japanese music, those are valid and powerful hooks. The sentences and examples in this app should feel real and interesting, not like textbook filler.

---

## The Drawing Mechanic

One of the most distinctive features of this app. Each character can be practiced by drawing it on screen.

Why this works:
- Motor memory is a separate and reinforcing encoding channel.
- Stroke order is meaningful — it affects how characters look when written quickly and is deeply ingrained in native speakers.
- The satisfaction of drawing a character and having it recognized is a strong feedback loop.

Implementation notes:
- Canvas-based drawing input, checking stroke accuracy via path-matching.
- Strokes are shown one at a time as hints when the learner is stuck.
- Simple characters are introduced first (く, し, つ — one or two strokes).
- Stroke order is always shown correctly, never skipped.

---

## Progress Visibility: Honest, Not Punishing

Instead of abstract XP and levels, this app shows the learner what they actually know:

> "You can read 46 hiragana. You know 200 words. You can understand sentences like: 川は青い (The river is blue)."

This is meaningful, concrete, and motivating. It reflects real capability, not points accumulated.

### The Decay Mechanic

Memory fades without reinforcement. The app reflects this honestly.

Each word, character, and grammar pattern has a confidence score. That score decays over time if not reviewed. The visible stats ("you know 200 words") only count items above a confidence threshold. If practice stops, the number goes down — not as punishment, but as an accurate reflection of reality.

A weekly knowledge snapshot is surfaced every Monday:

> "Last week: 187 words. This week: 194 words. Keep going."

Or, after a quiet week:

> "You've slipped from 194 to 181. A quick review session will bring most of it back fast."

Tone is crucial here. The message is always: *memory is normal, review is fast, you've got this.* Not: *you failed, your streak is broken.*

---

## Session Design

Each daily session should take 15-25 minutes maximum. Broken into:

1. **Spaced repetition review** (5-10 min) — review of due items from the SRS deck.
2. **New content** (5-10 min) — one small new concept, introduced clearly.
3. **Practice** (5 min) — drawing, listening, or production exercise on the new content.

Sessions should always feel completable. Never open-ended. A clear end state ("today's session complete") matters.

---

## What "Better Than Duolingo" Actually Means

| Duolingo | This App |
|---|---|
| Romaji crutch | No romaji, ever |
| Recognition-heavy exercises | Production-heavy exercises |
| Abstract gamification | Concrete capability tracking |
| Weird, decontextualized sentences | Culturally relevant, real sentences |
| No explicit grammar | Clear, light grammar explanations |
| Engagement-optimized | Learning-optimized |
| Decay hidden from learner | Decay shown honestly |
| Writing as afterthought | Writing as core mechanic |

---

## Extension to Other Languages

The pedagogical framework here is language-agnostic. When extending to other languages, the same principles apply:

- No romanization crutches for languages with other scripts (Arabic, Korean, Thai, etc.)
- Comprehensible input from the start
- SRS for all content
- Cultural context dripped in over time
- Honest progress tracking with decay

Japanese is the hardest major language for English speakers, so building the system for Japanese first means it will handle anything else with less effort.
