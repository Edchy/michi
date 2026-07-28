# Stations — The Full Roster

The authoritative, station-by-station list of what every stop on the path contains.
Where [station-map.md](./station-map.md) explains *how* sessions collapse into stations
and *why*, this doc is the flat roster authors build from: each station's kana/
vocabulary/grammar, what the learner reads, the drills, the cultural drip, SRS seeds,
end-state, and any book stop after it.

The course is **self-paced: Course → Provinces → Tracks → Stations, no calendar** — no months, no
weeks, no daily deadlines. A learner advances a station when they've earned it, however
long that takes. The source content in [month-1.md](./month-1.md) is authored as an
ordered sequence of *sessions* (sittings); this roster reorganizes that sequence into
the station units the [world map](./world-map.md) shows. ("Sessions N–M" below points at
that ordered content, not a date.) Drill types are from
[content-model.md](./content-model.md#exercise); the per-station arc (hear → symbol →
produce → use → SRS → complete) is from [station-map.md §2](./station-map.md#2-the-shape-of-a-station).

> **Status:** Draft / proposed. **Stations 1–17 (through full hiragana) are specced in
> full below; later stations are a one-line outline** to be filled as those curricula
> are authored ([roadmap](../roadmap.md) Phase 2). Kana readings shown in parentheses
> are for authoring only — **never rendered to the learner**
> ([P2](../product/principles.md#p2--no-romaji-ever-as-a-reading-aid)).

> **Code status:** `src/app/worldmap.ts` matches this roster (4 tracks, 17 stations,
> station ids and titles as below). When stations become authored data they should be
> *derived* from lessons so code and content can't drift — see
> [world-map.md → Open edges](./world-map.md#open-edges).

---

## Legend

Each station entry uses these fields:

- **Track / n** — which track, and the global station number.
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

# Track 1 — First sounds

*Orientation, then sound before symbol: what the writing system is, the vowels, the
first consonant row, and the first real word.*

### Station 1 · The three scripts
- **Teaches:** no kana and no SRS items — an **orientation stop**. What hiragana,
  katakana and kanji are, what each is for, and why romaji is named but set aside
  ([P2](../product/principles.md#p2--no-romaji-ever-as-a-reading-aid)).
- **Reads:** **one** example word per script, broken into syllables and tappable for
  audio — **わたし** (I) for hiragana; **カメラ** (camera) for katakana; **山** (mountain)
  for kanji, with its kana reading beneath. The learner is not asked to retain any of
  them. One idea per slide; anything deeper waits for the book stop.
- **Romaji step:** names romaji, sets it aside, and makes *one* further point: a
  Japanese word splits into small even sounds, one symbol each. Shown with **すし**
  (su-shi), then **つなみ** and **からおけ**, tappable syllable by syllable. Written in
  hiragana rather than 津波/カラオケ because hiragana is the only script the learner is
  about to meet; the book stop shows カラオケ in its own script and carries the rest.
- **Drills:** none. Every step is a read-this beat
  ([session-flow.md §1](./session-flow.md)).
- **Drip:** each script's blurb carries its one essential fact, so the learner cannot
  miss it even if they skip the book stop — a kana always sounds the same; katakana
  signals a borrowed word; a kanji shows meaning, not pronunciation.
- **Sessions:** — (new; precedes session 1).
- **Seeds:** — (nothing enters the SRS).
- **Closing grid:** the station ends on the **gojūon table**, the whole 46-kana set laid
  out in rows of five as a ruled grid. **No row is filled in**: the learner has not
  learned a single kana yet, so nothing may be shown as earned. The vowel row is only
  *outlined* (tinted cells, ink border), marking where they start, and no count is
  shown: at this station the grid is the road ahead, not a score. The slide is **two
  columns** (table left, copy right) so all 46 fit on screen at once without scrolling.
  (Every kana station from here closes on the same grid, each one filling in another
  row — see stations 2 and 3.)
- **End-state:** knows what the three scripts are and why the course starts with
  hiragana, and specifically with its five vowels.
- **📖 Book stop after:** *"Three scripts, one language"* — **expands** on this station
  rather than repeating it: how Chinese characters were adapted to a language they did
  not fit, how cursive whole-forms became hiragana while character fragments became
  katakana (and why that makes one round and the other angular), why Japanese kept
  kanji instead of simplifying to kana alone — capped with one sentence
  (**私はコーヒーを飲みます**) showing all three scripts sharing the work. The **mora**
  material (loanwords splitting into even one-symbol sounds, why romaji misleads) moved
  to the station-2 book stop, where the learner has actual kana to hang it on.

### Station 2 · First sounds
- **Teaches:** the five vowel **sounds** by ear, then the five vowel **characters** —
  あ (a), い (i), う (u), え (e), お (o).
- **Reads:** — (no words yet).
- **Drills:** an **open-book pairing beat first** (whole set on screen, one sound at a
  time, tap the match; nothing scored, a miss only replays, the sound is named after two
  misses). Then `recognize-sound` (kana → pick sound), `listen-identify` (audio → pick
  kana), final mixed recognition, then hear-and-mimic rehearsal (self-confirm, no speech
  recognition). Drawing begins later with proper stroke guidance.
- **Why that order:** teaching gives one exposure per kana, so going straight into a
  graded pick is guessing, not retrieval. The pairing beat builds the sound-shape link
  while both are visible; and `recognize-sound` precedes `listen-identify` because the
  glyph stays on screen in the former and vanishes in the latter.
- **Drip:** **new information, not a repeat of station 1** — Japanese has exactly five
  vowels and they never shift (unlike English "a" in cat/car/cake), and あいうえお is the
  ordering Japanese itself uses for dictionaries and lists, the way A-B-C works in
  English. The remaining 41 kana are rows built on these five.
- **Sessions:** 1–3.
- **Closing grid:** the gojūon table again, and this time the **vowel row animates into
  it** cell by cell, then stays filled. Caption: "5 of 46 hiragana." The station-1 slide
  promised the shape of the set; this one puts the learner's first row in it.
- **Seeds:** あ い う え お (5 kana).
- **End-state:** hear, say, and recognize the five vowels; 5 of 46.
- **📖 Book stop after:** *"Five sounds that hold still"* — **expands** on this station's
  drip rather than repeating it. Opens with the **mora** idea (loanwords English already
  borrowed — tsunami, karaoke, origami, sudoku, emoji — splitting into even one-symbol
  sounds, which is *why* 46 characters suffice, and why romaji misleads on grouping and
  stress); this material lives here rather than at station 1 because the learner now has
  kana to hang it on, and karaoke's o and e *are* two of the vowels just learned. Then:
  the station *asserts* the vowels never shift, so this shows **why that is remarkable**
  (English "a" in cat/car/cake/about/many is one letter for five sounds, because its
  spelling froze while pronunciation moved), what the stability **buys** the learner (you
  can pronounce an unseen Japanese word correctly, which colonel/yacht/though will never
  let you do in English), and one honest caveat: long vowels change a word's length, not
  the vowel's quality.

### Station 3 · The K row
- **Teaches:** か (ka), き (ki), く (ku), け (ke), こ (ko) — the k-sound across the five
  vowels. Note for the learner: no formula, each is memorized.
- **Reads:** **こい** (koi) — the first real word; the "I can actually read this" moment.
  Shown as bare kana with no `say` labels: this is the one beat that asks the learner to
  decode unaided, so Latin letters underneath would be the crutch they read instead
  ([P2](../product/principles.md#p2--no-romaji-ever-as-a-reading-aid)). Tapping plays it
  kana by kana and reveals the meaning.
- **Drills:** a vowel review opens the station from what the learner already has. It is
  **announced first** ("But first, a quick refresher", showing あいうえお): a station
  billed as the k row that silently drills あいうえお reads as a bug, not as revision.
  Then the **open-book pairing beat** (see station 2 — it matters more here, since
  かきくけこ are five near-neighbour sounds sharing one consonant with no prior hook,
  where あいうえお at least map onto vowels an English speaker already owns), then
  `recognize-sound` → `listen-identify` → the mixed capstone, and hear-and-mimic
  rehearsal. `draw-character` featuring く (single stroke — a great first
  drawing win) is still the trace placeholder, pending stroke data
  ([ADR-0004](../decisions/0004-stroke-data-source.md)).
- **Drip:** one idea, and one the intro did not already state: **ten kana is enough for
  real words**. ("Five vowels with a k in front" is the intro's line, so a context slide
  repeating it wastes the slide.) It sits immediately before こい so the promise is proved
  at once. No forward references: the learner has met no other row and never seen the
  gojūon table, so naming さしすせそ or the grid *in the station* explains nothing. That is
  the book stop's job; the station's job is the drills.
- **Sessions:** 4–5.
- **Closing grid:** the gojūon table with the vowel row already filled and the **k row
  animating in beneath it**. Caption: "10 of 46 hiragana." Two filled rows is the first
  point at which the grid shows a *pattern* rather than a single line, so the copy names
  it: every row below works the same way, one consonant crossed with あいうえお. The row
  structure is stated here because the learner can now see it; the word *gojūon* and the
  bending cells stay in the book stop.
- **Seeds:** か き く け こ (5 kana) → 10 total.
- **End-state:** read the K row; read your first Japanese word.
- **📖 Book stop after:** *"Rows, and the table they sit in"* — **expands** on this
  station: that a consonant run across the five vowels *is* a row (so 46 characters are
  nine rows of five, not 46 unrelated shapes); that the rows stack into the gojūon grid,
  vowels as columns; why the vowel row was worth a whole station (it is the axis, so a
  sloppy vowel repeats 41 times); and a warning that four or five cells (し, ち, つ, ふ)
  bend, though the k row has none of them.

### Station 4 · A first look back
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

> **Note:** Track 1 is **4 stations**: the orientation stop plus the
> vowels-through-K-row content. (The code matches this.)
> Real words, sentences, and listening are *capabilities threaded through later
> stations*, not separate early stops.

---

# Track 2 — Reading on

*The rest of the core gojūon rows; real words and the first sentence accumulate.*

### Station 5 · The S row
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

### Station 6 · The T row
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

### Station 7 · The N row
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

### Station 8 · Halfway snapshot
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
- **📖 Book stop after:** *"Why the kana are ordered as they are"* — now that half the
  set is known, what the **gojūon** (五十音) grid is *for*: that it is the order
  dictionaries, indexes and forms sort by, the way A-B-C is in English; why it counts
  fifty but holds 46 (empty y/w cells, ん outside the table); and the cells that bend
  (し, ち, つ, ふ), which by now the learner has actually met. The grid itself is
  introduced at the station-3 book stop and the three-scripts history at station 1;
  neither is repeated here. *(Authored: `src/content/codex.ts`.)*

---

# Track 3 — Completing the kana

*The remaining rows and the final character; full hiragana literacy.*

### Station 9 · The H row
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

### Station 10 · The M row
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

### Station 11 · The Y & W rows
- **Teaches:** や (ya), ゆ (yu), よ (yo), わ (wa), を (**wo**, said like お, grammar-only).
- **Reads:** **やまと** (Yamato — an old name for Japan itself).
- **Drills:** SRS review; new-characters intro; `draw-character`; `recognize-sound` recall.
- **Drip:** を is kept alive almost only as the object particle — "a character kept alive
  for grammar." "You can now read やまと."
- **Sessions:** 19.
- **Seeds:** や ゆ よ わ を → 40 total.
- **End-state:** read the Y and W rows.
- **📖 Book stop after:** —

### Station 12 · The R row & ん
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
  Japanese writing differs from a Latin alphabet, ahead of the katakana and kanji provinces.

---

# Track 4 — First real words & grammar

*Vocabulary themes, the first grammar concept, and the full-hiragana milestone.*

### Station 13 · Hiragana mastery
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

### Station 14 · Words of nature
- **Teaches:** 10 nature words — かわ (river), やま (mountain), うみ (sea), そら (sky),
  はな (flower), もり (forest), つき (moon), ほし (star), かぜ (wind), ゆき (snow).
- **Reads:** each word with audio, image, one example sentence.
- **Drills:** `read-word` on each; `recognize-sound`; SRS review of kana.
- **Drip:** why nature words first — they appear constantly in songs, poetry, anime.
- **Sessions:** 23.
- **Seeds:** 10 nature words.
- **End-state:** read and know 10 nature words.
- **📖 Book stop after:** —

### Station 15 · Words of animals
- **Teaches:** 10 animal words — いぬ (dog), ねこ (cat), とり (bird), さかな (fish),
  うま (horse), くま (bear), うさぎ (rabbit), きつね (fox), たぬき (raccoon dog), さる (monkey).
- **Reads:** each with audio, image, example sentence.
- **Drills:** `read-word`; `recognize-sound`; SRS review.
- **Drip:** foxes (きつね) and raccoon dogs (たぬき) in Japanese folklore.
- **Sessions:** 24.
- **Seeds:** 10 animal words → 20 vocab total.
- **End-state:** read and know 10 animal words.
- **📖 Book stop after:** —

### Station 16 · A first sentence
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

### Station 17 · Hiragana complete
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

Everything above is **Province 1 国 — Hiragana**. The provinces below are *declared* in
`src/app/worldmap.ts` with empty track lists (so they show as "Not yet built" rather
than a fake "coming soon"), and filled in as each curriculum is authored. One line each;
these become full station entries above when their content exists.

Province boundaries are fixed — one script or domain each. The **track** groupings inside
them are deliberately open, decided as the curriculum is written.

**Province 2 国 — Katakana.** Same sounds as hiragana, new shapes — much faster now.
Stations by row (ア-row, カ-row, …), same introduce→reinforce arc, grouped into tracks
as authored. **Drip / book stop:** *"What katakana is"* — invented by Buddhist monks in
the 800s; used for loanwords, emphasis, onomatopoeia (the deep katakana explanation lands
here, at introduction).

**Province 3 国 — First kanji.** 一 二 三 四 五 (numbers 1–5) — simple strokes, high
utility, embedded in real vocabulary. **Drip / book stop:** *"What kanji is"* — borrowed
from China, then Japan built kana on top; the full three-scripts origin story assembled
as a satisfying recap once all three have been met.

**Province 4 国 — Words & sentences.** The language starts to feel real: high-frequency
vocab (numbers, colors, common verbs), present-tense verb conjugation
(positive/negative), listening comprehension with short native audio. Tracks and
stations TBD as this curriculum is authored.

---

## Related

- [station-map.md](./station-map.md) — how days collapse into stations; the station
  arc; book stops & codex design.
- [world-map.md](./world-map.md) — the map surface these stations appear on.
- [month-1.md](./month-1.md) — the ordered session content this roster reorganizes.
- [content-model.md](./content-model.md) — Lesson / Exercise data shapes; drill types.
- [session-flow.md](./session-flow.md) — how a session (a station's sessions) plays out.
