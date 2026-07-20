# Kana audio — attribution & provenance

Native-speaker recordings of the hiragana vowels, sourced from Wikimedia Commons.

| File | Kana | Source | License |
|------|------|--------|---------|
| `hira_a.mp3` | あ | Wikimedia Commons, `Ja-A.oga` | Public domain |
| `hira_u.mp3` | う | Wikimedia Commons, `Ja-U.oga` | Public domain |
| `hira_e.mp3` | え | Wikimedia Commons, `Ja-E.oga` | Public domain |
| `hira_o.mp3` | お | Wikimedia Commons, `Ja-O.oga` | Public domain |
| `hira_i.mp3` | い | _pending_ — Wikimedia rate-limited during sourcing | — |

## Processing

Each `.oga` was converted to mono MP3, trimmed to a single clean utterance
(the あ/え source repeated the sound three times), and peak-normalized to ~-2 dB
so volume is consistent across the set. Tooling: `ffmpeg`.

## Status

These are **placeholder-grade** real recordings — good enough to learn the five
vowel sounds now. Michi's long-term plan is a native voice actor for the full
kana set with verified pitch accent (see `docs/design/audio.md`). Replace these
per-`itemId` files when that recording session happens; no code change needed.
