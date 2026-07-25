# Glossary

Shared vocabulary for Michi. Both the pedagogy and the architecture borrow terms
from linguistics, cognitive science, and Japanese itself. This is the single place
they're defined so the docs and code can use them precisely.

Terms are grouped by domain. Within each group they're roughly ordered by when
you'd first meet them.

---

## Learning Science

**Acquisition (vs. learning)**
In Krashen's framework, *acquisition* is the subconscious absorption of language
through meaningful input (how you got your first language); *learning* is conscious
study of rules. Michi prioritizes acquisition and uses explicit learning only as a
light assist. See [pedagogy.md](./pedagogy.md).

**Comprehensible Input**
Language input the learner can *mostly* understand from context. The engine of
acquisition. See also *i+1*.

**i+1**
Input pitched just one step above the learner's current level ("i") — hard enough
to stretch, easy enough to infer. The target difficulty for new content.

**Active Recall**
Retrieving information from memory without prompts (e.g., "write the kana for this
sound"). Produces strong memories.

**Passive Recognition**
Identifying the right answer among options (multiple choice). Feels productive,
produces weak memories. Used sparingly in Michi. See [P3](./principles.md#p3--production-over-recognition).

**Retrieval difficulty**
The effort of recalling something. The harder the (successful) retrieval, the
stronger the resulting memory — the principle behind favoring production.

**Motor memory**
Memory encoded through physical movement (handwriting strokes). A separate channel
that reinforces visual memory — the rationale for the drawing mechanic.

**Output Hypothesis**
Swain's claim that *producing* language (not just consuming it) is necessary for
acquisition; being forced to produce reveals gaps and accelerates learning.

**Forgetting curve**
The predictable decay of memory over time without reinforcement. SRS schedules
review against this curve.

---

## Spaced Repetition

**SRS (Spaced Repetition System)**
The algorithm that schedules *when* each item is reviewed — right before it would be
forgotten. See [srs-engine.md](../architecture/srs-engine.md).

**SM-2**
The SuperMemo-2 algorithm; the specific, open, ~20–30 line SRS algorithm Michi
uses. See [ADR-0003](../decisions/0003-sm2-srs-algorithm.md).

**Item**
Any single unit of knowledge tracked by the SRS: one hiragana, one word, one kanji,
one grammar pattern. Each has its own schedule.

**Interval**
The number of days until an item's next scheduled review. Grows on success, resets
shorter on failure.

**Ease factor**
A per-item multiplier (SM-2) that determines how fast its interval grows. Adjusted
by how easily the learner recalled it.

**Due / overdue**
An item is *due* when its next review date has arrived; *overdue* when that date has
passed unreviewed. Overdue items lose confidence.

**Confidence score**
A derived measure of how well the learner knows an item, computed from its SRS state
(long interval → high confidence; overdue → low). Powers the honest progress
surface and the decay mechanic. See [P5](./principles.md#p5--tell-the-truth-about-memory).

**Decay mechanic**
Michi's honest surfacing of forgetting: visible capability counts include only items
above the confidence threshold, so they fall if practice stops — framed as normal
and recoverable.

**Confidence threshold**
The cutoff a confidence score must exceed for an item to count toward visible stats
(e.g., "you know 200 words").

---

## Japanese Language

**Hiragana (ひらがな)**
The 46 core phonetic characters covering every Japanese sound; the foundation script,
taught first and in full.

**Katakana (カタカナ)**
A second set of 46 phonetic characters with the *same* sounds as hiragana, used for
loanwords, emphasis, and onomatopoeia. Taught second.

**Kanji (漢字)**
Chinese-derived logographic characters (~2,000 in everyday use). Introduced
gradually, embedded in real vocabulary.

**Gojūon (五十音)**
"Fifty sounds" — the traditional ordered grid of the kana, arranged by consonant row
and vowel column. Michi's teaching order follows it, one row per station. Named for its
10 × 5 shape, though only 46 cells are filled (the y- and w-rows have gaps, and ん sits
outside the grid). Explained to the learner in the codex entry *"Why the kana are
ordered as they are"*, unlocked after station 8.

**Mora**
The basic timing unit of Japanese sound. Japanese is *mora-timed*: each mora takes
roughly equal time. Most kana = one mora; small ゃゅょ and ん have special behavior.

**Pitch accent**
Meaning-bearing rises and falls in pitch across a word (e.g., 橋 *hashi* "bridge" vs.
箸 *hashi* "chopsticks"). Why audio accuracy is critical. See [audio.md](../design/audio.md).

**Romaji (ローマ字)**
Japanese written in Latin letters. A crutch Michi refuses as a reading aid. See
[P2](./principles.md#p2--no-romaji-ever-as-a-reading-aid) and
[ADR-0002](../decisions/0002-no-romaji.md).

**Particle**
A short grammatical marker (は, が, を, の, …) that indicates a word's role in a
sentence. Introduced in context as they appear.

**SOV (Subject–Object–Verb)**
Japanese word order — the verb goes last ("I sushi eat"), the opposite of English
SVO. Taught explicitly and early.

**Stroke order**
The correct, fixed sequence in which a character's strokes are drawn. Meaningful to
how characters look and deeply ingrained in native writing; taught correctly from
the start.

---

## Product & Content

**Session**
One 15–25 minute unit of study with a clear end state: review → new content →
practice. See [P7](./principles.md#p7--sessions-always-complete).

**Lesson**
An authored unit of new content (e.g., "the k-row") that introduces items and
exercises. Composed into the curriculum. See [content-model.md](../curriculum/content-model.md).
On the world map a lesson is presented as a **Station**.

**Station**
The map/navigation name for one stop on the path — corresponds one-to-one to a
**Lesson**. Presented as a real Tokyo station — its place name in kana (あさくさ) over
*Asakusa Station 駅* (*eki*, station). Numbered continuously across the course.
See [world-map.md](../curriculum/world-map.md).

**Track**
An ordered group of stations (currently ~3–5) — the run of line they sit on, roughly a
curriculum unit. Presented as a real **Tokyo Metro line** (*Ginza Line 銀座線*) whose
official color is the track's hue, alongside what it teaches ("First sounds"). Completing a
track unlocks the next. Replaces the earlier terms *Module* and, briefly,
*Province-as-middle-tier*.
See [world-map.md](../curriculum/world-map.md).

**Province**
An ordered group of tracks — one **leg of the journey**: a whole script or domain
(Hiragana, Katakana, First kanji, …). Labeled *PROVINCE N 国* (*kuni*, the old provinces a
traveller crossed). Provinces bound the map: only the current province's path is drawn,
and the learner moves via glide arrows within a province, or jumps by tapping the province
or track name in the nav label — one tap to either list. A province declared without
content reads "Not yet built". See
[world-map.md](../curriculum/world-map.md) and
[ADR 0006](../decisions/0006-provinces-and-tracks.md).

**World map ("the path")**
The learner-facing surface that presents the course as a walkable path of stations
grouped into tracks grouped into provinces — the navigation and progress home.
Structure in [world-map.md](../curriculum/world-map.md); look & feel in
[DESIGN.md](../design/DESIGN.md).

**Book stop**
An optional reading marker beside the path, between stations. Supplementary lore about
how Japanese is built and where it came from — never required, never drilled, never
gates a station; unlocks when its topic becomes relevant. See
[station-map.md §3](../curriculum/station-map.md#3-book-stops--the-codex--the-lore-without-front-loading).

**Codex**
A browsable collection of every lore drip the learner has encountered — from inline
"did you know" beats and from book stops — revisitable anytime from the map. Records
what's been met (never front-loads), decoupled from the required path. See
[station-map.md §3](../curriculum/station-map.md#3-book-stops--the-codex--the-lore-without-front-loading).

**Exercise**
A single interactive task: recognition, active recall, drawing, listening, sentence
arrangement, etc.

**Knowledge snapshot**
A periodic (e.g., weekly/monthly) honest summary of tested capability, including any
decay since last time.

**Capability count**
A user-facing, honest number of what the learner can actually do now ("read 46
hiragana," "know 200 words") — counting only items above the confidence threshold.

---

## Technical

**Capacitor**
The wrapper that packages the web app as a native iOS/Android app from one codebase.
See [tech-stack.md](../architecture/tech-stack.md).

**Offline-first**
An architecture where core functionality works without a network, syncing later if
at all. See [P9](./principles.md#p9--offline-first-one-codebase).

**ADR (Architecture Decision Record)**
A short document capturing one significant decision, its context, and its
consequences. See [decisions/README.md](../decisions/README.md).

**SSML**
Speech Synthesis Markup Language — used to control TTS speed, pauses, and emphasis
for beginner-friendly audio. See [audio.md](../design/audio.md).
