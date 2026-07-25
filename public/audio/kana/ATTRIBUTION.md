# Kana audio — attribution & provenance

## The five vowels: Learn Japanese Adventure

`hira_a`, `hira_i`, `hira_u`, `hira_e`, `hira_o` are human recordings from
**[Learn-Japanese-Adventure.com](https://www.learn-japanese-adventure.com/)**, by
Kia Leng Koh. Credited in-app on the Codex page (`src/app/codex/page.tsx`).

**Permission granted, 25 July 2026.** Kia Leng Koh was asked by email and replied:

> You can use them in your application so long you give credit and link to my
> website.

The site itself carries "Copyright © 2010– by Kia Leng Koh,
Learn-Japanese-Adventure.com. All Rights Reserved." with no blanket public license,
so this is a **specific, conditional grant to Michi**, not a general licence.

**The two conditions are credit and a link back**, both met by the Credits footer on
the Codex page. They are load-bearing: removing the credit, or keeping the text while
dropping the `href`, breaks the terms. Do not "tidy" that footer away.

The request described Michi as "just a personal project and will likely remain that
way", and the permission was given against that description. **If Michi is ever
published commercially, ask again** rather than assuming this carries over.

The full exchange is archived in [`PERMISSION.md`](./PERMISSION.md). If the terms
ever need re-checking and cannot be, the public-domain Wikimedia originals in
[`_pd_originals/`](./_pd_originals/) are a drop-in replacement.

### Processing

The source clips carry ~0.6 s of silence at the head and another ~0.6 s at the
tail; the voice is about a sixth of each file. That lead-in reads as broken
latency when the glyph is tapped, so each clip is cut to its speech, given a
15 ms fade-in and 40 ms fade-out, and loudness-normalized.

Cut points were picked by hand, not by a gate. `hira_u` has a low-level breath
running 0.05–0.55 s before the voice, and a threshold-based trim latches onto it
as speech; its real onset is 0.56 s, where the signal jumps roughly eightfold.

| Kana | Cut from source | Result | Peak |
|------|-----------------|--------|------|
| あ | 0.55–0.82 s | 0.27 s | −1.9 dBFS |
| い | 0.56–0.85 s | 0.29 s | −3.3 dBFS |
| う | 0.53–0.86 s | 0.33 s | −2.7 dBFS |
| え | 0.59–0.89 s | 0.30 s | −2.5 dBFS |
| お | 0.57–0.88 s | 0.31 s | −2.2 dBFS |

Untrimmed originals are kept in [`../5-vowels/`](../5-vowels/).

## The other 41: macOS `say` (Kyoko)

Generated locally by [`scripts/generate-kana-audio.sh`](../../../scripts/generate-kana-audio.sh)
using the **Kyoko** (ja_JP) voice built into macOS. No account, no API key, no
cost, no network at build or run time.

Apple's system voices are licensed for use on macOS; audio generated with them
is fine to ship in a free, non-commercial app. **Revisit this if Michi is ever
monetized** — see "If Michi stops being free" below.

Regenerate with:

```sh
./scripts/generate-kana-audio.sh
```

### Processing

Each glyph (never romaji — romaji gets read as English) is spoken by Kyoko,
trimmed of leading/trailing silence, padded 60 ms at the tail, then
**RMS-normalized to −20 dB** with a limiter to prevent clipping.

RMS, not peak, and not EBU R128 — both alternatives fail on clips this short:

- **Peak normalization** is what the previous set used. All five clips peaked at
  −3 dB yet ranged 6.6 dB in RMS, which is what the ear actually tracks. That
  mismatch is why あ and え sounded noticeably quieter than い and う.
- **EBU R128 / ffmpeg `loudnorm`** gates on ~400 ms blocks. These clips are
  120–310 ms — roughly one block — so the measurement is degenerate and
  `linear=true` cannot converge. Measured: it moved every file by an identical
  +1.0 LU and left the spread completely intact.

Result across the 41: **0.1 dB RMS spread** (−20.5 to −20.4), no clipping.

The five vowels above sit outside this and were normalized with `loudnorm`, which
this section rightly calls degenerate at these lengths. Their peaks landed within
1.4 dB of each other (−1.9 to −3.3 dBFS) and they sound level against the Kyoko
set, so it was left alone. **If the vowels ever sound loud or quiet next to a
neighbouring kana, re-do them through the RMS path above** rather than trusting
the `loudnorm` figures.

## Fallback set: Wikimedia Commons (retained)

The original five vowels are kept in [`_pd_originals/`](./_pd_originals/) —
**public domain**, so they carry no obligations and are worth keeping. These are
the drop-in replacement if the licensing question above resolves badly.

All by **Hakatanoshio117117** (Wikimedia Commons), public domain (PD-self),
sourced from the uniform `Japanese X.ogg` set so all five share a speaker.

| File | Kana | Source | License |
|------|------|--------|---------|
| `hira_a.mp3` | あ | `Japanese A.ogg` (→ `Ja-A.oga`) | Public domain |
| `hira_i.mp3` | い | `Japanese I.ogg` | Public domain |
| `hira_u.mp3` | う | `Japanese U.ogg` | Public domain |
| `hira_e.mp3` | え | `Japanese E.ogg` (→ `Ja-E.oga`) | Public domain |
| `hira_o.mp3` | お | `Japanese O.ogg` | Public domain |

These are **human recordings and still the best-sounding audio in the project**.
They were replaced only because Commons has no complete set: a survey of the
full gojūon found **18 of 46 kana**, spread across three different speakers, and
Hakatanoshio117117 covers only 10 (あいうえお + か, そ, ん). Mixing speakers
mid-chart was rejected — an earlier version of this file records the same
decision being made once already.

If a future set is recorded properly, these remain a useful quality benchmark.

## If Michi stops being free

The Kyoko set assumes non-commercial use. If that changes, regenerate from a
source with explicit commercial rights — Google Cloud TTS (1M chars/month free,
recurring; the whole gojūon is ~50 characters) or a native voice actor
(see [docs/design/audio.md](../../../docs/design/audio.md)).

Because every file is keyed to the `id` in `src/content/hiragana.ts`, swapping
the source is a file-replacement operation. No code changes — `src/lib/audio.ts`
is deliberately agnostic about where the mp3s came from.
