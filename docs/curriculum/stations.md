# Stations — The Full Roster

The authoritative, station-by-station list of what every stop on the path contains.
Where [station-map.md](./station-map.md) explains *how* sessions collapse into stations
and *why*, this doc is the flat roster authors build from: each station's kana/
vocabulary/grammar, what the learner reads, the drills, the cultural drip, SRS seeds,
end-state, and any book stop after it.

The course is **self-paced: Course → Modules → Stations, no calendar** — no months, no
weeks, no daily deadlines. A learner advances a station when they've earned it, however
long that takes. The source content in [month-1.md](./month-1.md) is authored as an
ordered sequence of *sessions* (sittings); this roster reorganizes that sequence into
the station units the [world map](./world-map.md) shows. ("Sessions N–M" below points at
that ordered content, not a date.) Drill types are from
[content-model.md](./content-model.md#exercise); the per-station arc (hear → symbol →
produce → use → SRS → complete) is from [station-map.md §2](./station-map.md#2-the-shape-of-a-station).

> **Status:** Draft / proposed. **Stations 1–16 (through full hiragana) are specced in
> full below; later stations are a one-line outline** to be filled as those curricula
> are authored ([roadmap](../roadmap.md) Phase 2). Kana readings shown in parentheses
> are for authoring only — **never rendered to the learner**
> ([P2](../product/principles.md#p2--no-romaji-ever-as-a-reading-aid)).

> **Code status:** `src/app/worldmap.ts` matches this roster (4 modules, 16 stations,
> station ids and titles as below). When stations become authored data they should be
> *derived* from lessons so code and content can't drift — see
> [world-map.md → Open edges](./world-map.md#open-edges).

---

## Legend

Each station entry uses these fields:

- **Module / n** — which module, and the global station number.
- **Teaches** — the new items introduced (seed the SRS here).
- **Reads** — real words/sentences the learner reads at this station (only from
  already-known kana — the "I can actually read this" moments).
- **Drills** — the exercise types run ([content-model.md](./content-model.md#exercise)),
  biased to production ([P3](../product/principles.md#p3--production-over-recognition)).
- **Drip** — the timed cultural/structural note, if any (a read-this beat, and it lands
  in the [codex](./station-map.md#the-codex-browsable-anytime)).
- **Sessions** — which ordered sessions in [month-1.md](./month-1.md) this station covers (a session = one sitting, not a date).
- **Seeds** — what enters the SRS deck on completion.
- **End-state** — the clear "you can now…" the station certifies.
- **📖 Book stop after** — optional lore beside the path after this station, if any
  ([station-map.md §3](./station-map.md#3-book-stops--the-codex--the-lore-without-front-loading)).

---

# Module 1 — First sounds

*Sound before symbol. The foundation: the vowels, the first consonant row, and the
first real word.*

### Station 1 · First sounds
- **Teaches:** the five vowel **sounds** by ear, then the five vowel **characters** —
  あ (a), い (i), う (u), え (e), お (o).
- **Reads:** — (no words yet).
- **Drills:** `listen-identify` (audio → pick kana); `recognize-sound` (kana → pick
  sound); final mixed recognition; then hear-and-mimic rehearsal (self-confirm, no
  speech recognition). Drawing begins later with proper stroke guidance.
- **Drip:** after all five symbols are introduced, name them as **hiragana**: one of
  Japanese's three scripts, with 46 basic sound symbols; the learner already knows five.
- **Sessions:** 1–3.
- **Seeds:** あ い う え お (5 kana).
- **End-state:** hear, say, and recognize the five vowels.
- **📖 Book stop after:** *"Three scripts, one language"* — the first high-level map
  of hiragana, katakana, and kanji, plus the brief history of why they coexist.

### Station 2 · The K row
- **Teaches:** か (ka), き (ki), く (ku), け (ke), こ (ko) — the k-sound across the five
  vowels. Note for the learner: no formula, each is memorized.
- **Reads:** **こい** (koi) — the first real word; the "I can actually read this" moment.
- **Drills:** quick vowel SRS review; `listen-identify` + `recognize-sound` on the
  k-row; `draw-character` featuring く (single stroke — a great first drawing win);
  `recognize-sound` active recall.
- **Drip:** —
- **Sessions:** 4–5.
- **Seeds:** か き く け こ (5 kana) → 10 total.
- **End-state:** read the K row; read your first Japanese word.
- **📖 Book stop after:** —

### Station 3 · A first look back
- **Teaches:** no new kana — the first gentle checkpoint + consolidation of all 10.
- **Reads:** re-reads こい; free reading of any 2-kana combo the learner can form.
- **Drills:** gentle mini-quiz (recognize all 10; match audio→kana; draw 3 from memory —
  not graded, not punishing); full SRS review of the 10.
- **Drip:** the first honest **progress card**: "You can read 10 hiragana — 22% of the
  set." (frames capability, not points — [P5](../product/principles.md#p5--tell-the-truth-about-memory)).
- **Sessions:** 6–7 (the reinforce/rest sitting folds in as SRS-only).
- **Seeds:** — (consolidation).
- **End-state:** confidently read/write the vowels + k-row; a real checkpoint met.
- **📖 Book stop after:** *"Where the letters came from"* — hiragana was simplified from
  kanji in the Heian period; the shapes have ancestors (あ ← 安).

> **Note:** the vowels-through-K-row content forms Module 1 cleanly as **3 stations**.
> (The code now matches this — the earlier provisional 5-station Module 1 is gone.)
> Real words, sentences, and listening are *capabilities threaded through later
> stations*, not separate early stops.

---

# Module 2 — Reading on

*The rest of the core gojūon rows; real words and the first sentence accumulate.*

### Station 4 · The S row
- **Teaches:** さ (sa), し (**shi**, not "si"), す (su), せ (se), そ (so).
- **Reads:** **しま** (shima = island) — first compound from two known kana.
- **Drills:** full SRS review; `listen-identify` + `recognize-sound` on the s-row;
  `draw-character` featuring そ (flowing 1-stroke); `recognize-sound` recall.
- **Drip:** し is "shi" — Japanese has sounds that don't map neatly to English spelling
  (this is *why romaji misleads*). Origin note: し derived from 之.
- **Sessions:** 8–9.
- **Seeds:** さ し す せ そ → 15 total.
- **End-state:** read the S row; read しま.
- **📖 Book stop after:** —

### Station 5 · The T row
- **Teaches:** た (ta), ち (**chi**), つ (**tsu**), て (te), と (to).
- **Reads:** **とり** (tori = bird), **うた** (uta = song) — real words.
- **Drills:** SRS review; new-row intro; `draw-character` featuring て (elegant, 2
  strokes); `recognize-sound` recall.
- **Drip:** ち = "chi", つ = "tsu" — another reminder Japanese sounds don't follow
  English conventions.
- **Sessions:** 10–11.
- **Seeds:** た ち つ て と → 20 total.
- **End-state:** read the T row; reading real Japanese words now.
- **📖 Book stop after:** —

### Station 6 · The N row
- **Teaches:** な (na), に (ni), ぬ (nu), ね (ne), の (no).
- **Reads:** **ねこ** (neko = cat), **にほん** (nihon = Japan); **first mini-story** —
  "ねこ が いる。ねこ は かわいい。" (There is a cat. The cat is cute.), with audio.
- **Drills:** full SRS review (25 kana in deck); new-row intro; `draw-character`
  featuring の (single flowing stroke); `story-read` on the two-sentence story.
- **Drip:** の is the most common particle (possession, like "of"/"'s") — it's
  everywhere. "Did you know: の is so iconic it's in the Studio Ghibli logo."
- **Sessions:** 12–13.
- **Seeds:** な に ぬ ね の → 25 total.
- **End-state:** read the N row; read your first Japanese sentence.
- **📖 Book stop after:** —

### Station 7 · Halfway snapshot
- **Teaches:** no new kana — first weekly **knowledge snapshot** + consolidation.
- **Reads:** 5 real words using known kana; re-read the mini-story.
- **Drills:** full recognition pass on all 25; `draw-from-memory` (5 random);
  `read-word` on 5 real words.
- **Drip:** "Halfway there — you can read 25 hiragana, more than half the set." First
  explanation of the **decay mechanic**: confidence is tracked; unreviewed kana fade;
  the snapshot shows true tested knowledge ([P5](../product/principles.md#p5--tell-the-truth-about-memory)).
- **Sessions:** 14.
- **Seeds:** — (consolidation).
- **End-state:** honest checkpoint — over half of hiragana, first sentence read.
- **📖 Book stop after:** *"Three scripts, one language"* — the fuller picture now that
  hiragana feels real: kanji borrowed from China, kana built on top, why three coexist.

---

# Module 3 — Completing the kana

*The remaining rows and the final character; full hiragana literacy.*

### Station 8 · The H row
- **Teaches:** は (ha), ひ (hi), ふ (**fu**, not "hu"), へ (he), ほ (ho).
- **Reads:** **ひと** (hito = person), **はな** (hana = flower/nose), **ほし** (hoshi = star).
- **Drills:** SRS review; new-row intro; `draw-character`; `read-word` on the compounds.
- **Drip:** ふ = "fu"; は as a grammatical particle is said "wa" — surfaced as an
  interesting quirk, not a scary exception. "You already know the first character of
  はじめまして (nice to meet you)."
- **Sessions:** 15–16.
- **Seeds:** は ひ ふ へ ほ → 30 total.
- **End-state:** read the H row.
- **📖 Book stop after:** —

### Station 9 · The M row
- **Teaches:** ま (ma), み (mi), む (mu), め (me), も (mo).
- **Reads:** **みず** (mizu = water), **もり** (mori = forest), **うみ** (umi = sea);
  **mini-story 2** — slightly longer, introduces a boy (e.g. こうた) who sees the sea and
  a cat, full audio to read along.
- **Drills:** SRS review; new-row intro; `draw-character` featuring む (fun looping
  stroke); `story-read`.
- **Drip:** —
- **Sessions:** 17–18.
- **Seeds:** ま み む め も → 35 total.
- **End-state:** read the M row; read a longer story.
- **📖 Book stop after:** —

### Station 10 · The Y & W rows
- **Teaches:** や (ya), ゆ (yu), よ (yo), わ (wa), を (**wo**, said like お, grammar-only).
- **Reads:** **やまと** (Yamato — an old name for Japan itself).
- **Drills:** SRS review; new-characters intro; `draw-character`; `recognize-sound` recall.
- **Drip:** を is kept alive almost only as the object particle — "a character kept alive
  for grammar." "You can now read やまと."
- **Sessions:** 19.
- **Seeds:** や ゆ よ わ を → 40 total.
- **End-state:** read the Y and W rows.
- **📖 Book stop after:** —

### Station 11 · The R row & ん
- **Teaches:** ら (ra), り (ri), る (ru), れ (re), ろ (ro), then the final character **ん**
  (n) — the only non-syllable kana; never starts a word.
- **Reads:** **さくら** (sakura = cherry blossom), **そら** (sora = sky), **りんご**
  (ringo = apple).
- **Drills:** SRS review of everything; new-characters intro (r-row is audio-critical —
  the Japanese "r" is a flap, not English/Spanish r); introduce ん; full hiragana grid
  reveal — every character the learner knows.
- **Drip:** the big moment — **"You now know all 46 hiragana. You can read any Japanese
  written in hiragana."** Marked clearly.
- **Sessions:** 20–21.
- **Seeds:** ら り る れ ろ ん → **46 total (all hiragana)**.
- **End-state:** **full hiragana literacy.**
- **📖 Book stop after:** *"A different kind of alphabet"* (preview) — sets up how
  Japanese writing differs from a Latin alphabet, ahead of katakana/kanji in later modules.

---

# Module 4 — First real words & grammar

*Vocabulary themes, the first grammar concept, and the full-hiragana milestone.*

### Station 12 · Hiragana mastery
- **Teaches:** no new kana — full consolidation of all 46.
- **Reads:** all 46 in random order; a speed round.
- **Drills:** recognition drill (all 46 random); `draw-from-memory` (10 random); reading
  speed round.
- **Drip:** "46 hiragana. All of them. This took most people months in a classroom —
  you did it in about three weeks."
- **Sessions:** 22.
- **Seeds:** — (consolidation).
- **End-state:** fluent recognition of all 46.
- **📖 Book stop after:** —

### Station 13 · Words of nature
- **Teaches:** 10 nature words — かわ (river), やま (mountain), うみ (sea), そら (sky),
  はな (flower), もり (forest), つき (moon), ほし (star), かぜ (wind), ゆき (snow).
- **Reads:** each word with audio, image, one example sentence.
- **Drills:** `read-word` on each; `recognize-sound`; SRS review of kana.
- **Drip:** why nature words first — they appear constantly in songs, poetry, anime.
- **Sessions:** 23.
- **Seeds:** 10 nature words.
- **End-state:** read and know 10 nature words.
- **📖 Book stop after:** —

### Station 14 · Words of animals
- **Teaches:** 10 animal words — いぬ (dog), ねこ (cat), とり (bird), さかな (fish),
  うま (horse), くま (bear), うさぎ (rabbit), きつね (fox), たぬき (raccoon dog), さる (monkey).
- **Reads:** each with audio, image, example sentence.
- **Drills:** `read-word`; `recognize-sound`; SRS review.
- **Drip:** foxes (きつね) and raccoon dogs (たぬき) in Japanese folklore.
- **Sessions:** 24.
- **Seeds:** 10 animal words → 20 vocab total.
- **End-state:** read and know 10 animal words.
- **📖 Book stop after:** —

### Station 15 · A first sentence
- **Teaches:** the **first grammar** — Japanese is **Subject–Object–Verb** ("I sushi
  eat"); the verb always goes last.
- **Reads:** **ねこ が さかな を たべる。** (The cat eats fish.) — each word explained,
  known kana pointed out.
- **Drills:** visual English-vs-Japanese word-by-word comparison, audio of both, **no
  production pressure yet** (understand first); then `arrange-sentence` — order word
  blocks into SOV on 3–4 simple sentences (dog sees the moon; cat is in the forest;
  bird flies in the sky).
- **Drip:** SOV explained explicitly and early — Michi teaches grammar, lightly, when it
  unlocks comprehension.
- **Sessions:** 25–26.
- **Seeds:** first `GrammarPattern` (SOV).
- **End-state:** understand SOV; arrange simple Japanese sentences.
- **📖 Book stop after:** —

### Station 16 · Hiragana complete
- **Teaches:** no new content — the full-hiragana milestone review + assessment.
- **Reads:** mini-story 3 (known vocab + SOV), with audio + comprehension questions;
  3 simple sentences to read and explain.
- **Drills:** full SRS review (46 kana + 20 words); recognition + `draw-from-memory`
  (5 random) on all 46; `read-word` on 15 words; `comprehension-q` on the story;
  read-and-explain 3 sentences.
- **Drip:** the milestone **knowledge card** — "Hiragana complete. 46 kana, 20 words.
  You can read: ねこ が うみ を みる。 (The cat looks at the sea.)"
- **Sessions:** 27–28.
- **Seeds:** — (assessment).
- **End-state:** **all 46 hiragana** — full kana literacy, 20 words, simple sentences.
- **📖 Book stop after:** —

---

# Beyond hiragana — Outline (to be specced)

Filled in as each curriculum is authored. One line each; these become full station
entries above when their content exists.

**Module 5 — Katakana begins.** Same sounds as hiragana, new shapes — much faster now.
Stations by row (ア-row, カ-row, …), same introduce→reinforce arc. **Drip / book stop:**
*"What katakana is"* — invented by Buddhist monks in the 800s; used for loanwords,
emphasis, onomatopoeia (the deep katakana explanation lands here, at introduction).

**Module 6 — First kanji.** 一 二 三 四 五 (numbers 1–5) — simple strokes, high utility,
embedded in real vocabulary. **Drip / book stop:** *"What kanji is"* — borrowed from
China, then Japan built kana on top; the full three-scripts origin story assembled as a
satisfying recap once all three have been met.

**Module 7+ — The language starts to feel real.** High-frequency vocab (numbers,
colors, common verbs), present-tense verb conjugation (positive/negative), listening
comprehension with short native audio. Stations TBD as this curriculum is authored.

---

## Related

- [station-map.md](./station-map.md) — how days collapse into stations; the station
  arc; book stops & codex design.
- [world-map.md](./world-map.md) — the map surface these stations appear on.
- [month-1.md](./month-1.md) — the ordered session content this roster reorganizes.
- [content-model.md](./content-model.md) — Lesson / Exercise data shapes; drill types.
- [session-flow.md](./session-flow.md) — how a session (a station's sessions) plays out.
