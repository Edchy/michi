# SRS — Spaced Repetition System

## What It Is

SRS stands for Spaced Repetition System. It's the algorithm that decides *when* to show each flashcard again.

Instead of reviewing everything every day (wasteful) or only reviewing things once (useless), it tracks how well you know each item and schedules the next review right before you'd forget it.

## The Analogy

Imagine you're juggling balls, but each ball has a different weight. Light balls — things you know well — you can toss high and they stay in the air a long time before you need to catch them again. Heavy balls — things you struggle with — drop fast and need constant attention. The SRS is the system that watches all the balls and tells you which one to catch next.

## How It Works in Practice

The learner sees a hiragana character. They try to recall the sound. Then they rate themselves:

- **Easy** → show again in 2 weeks
- **Got it** → show again in 3 days
- **Hard** → show again tomorrow
- **Forgot** → show again in 5 minutes

Every time an item is reviewed and answered correctly, the interval grows. Every time it's forgotten, the interval resets shorter. Over months, well-known items might only appear once a month. Frequently forgotten items appear daily.

## The Algorithm

The most widely used algorithm is called **SM-2** (SuperMemo 2). It's open source and about 20-30 lines of code. It takes two inputs — the learner's rating and the item's current interval — and outputs the next interval.

Each item in the database stores two things:
- **Interval** — how many days until the next review
- **Next review date** — the actual date it's due

Every session, the app asks: "which items are due today?" and shows exactly those. Nothing more, nothing less.

## What Gets Tracked

Every piece of content in the app lives in the SRS deck:
- Individual hiragana characters
- Individual katakana characters
- Vocabulary words
- Kanji
- Grammar patterns

Each one has its own interval and review date, tracked independently.

## Connection to the Decay Mechanic

The SRS is also what powers the honest decay mechanic described in the pedagogy doc. A word's "confidence score" is derived directly from its SRS interval — a long interval means high confidence, a short or overdue interval means low confidence. The visible stat ("you know 200 words") only counts items above a confidence threshold.

If the learner stops practicing, items go overdue. Confidence scores drop. The weekly snapshot reflects this honestly. Coming back and reviewing brings the scores up fast, because the memory is still there — it just needs a trigger.

## Why It's the First Thing to Build

Everything else in the app depends on the SRS engine:
- Drawing exercises need to know which characters are due
- Vocabulary sessions pull from the SRS deck
- Progress cards read from confidence scores
- The weekly snapshot queries the deck state

Build the SRS engine first. Everything else plugs into it.
