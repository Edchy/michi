# Kana audio — attribution & provenance

Native-speaker recordings of the hiragana vowels, sourced from Wikimedia Commons.

All by **Hakatanoshio117117** (Wikimedia Commons, "Audio files of hiragana" set),
public domain (PD-self).

| File | Kana | Source | License |
|------|------|--------|---------|
| `hira_a.mp3` | あ | `Ja-A.oga` | Public domain |
| `hira_i.mp3` | い | `Japanese I.ogg` | Public domain |
| `hira_u.mp3` | う | `Ja-U.oga` | Public domain |
| `hira_e.mp3` | え | `Ja-E.oga` | Public domain |
| `hira_o.mp3` | お | `Ja-O.oga` | Public domain |

## Processing

Each source `.oga`/`.ogg` was converted to mono MP3, trimmed to a single clean
utterance (several sources repeated the sound three times), and peak-normalized
to ~-2 dB so volume is consistent across the set. Tooling: `ffmpeg`.

## Status

These are **placeholder-grade** real recordings — good enough to learn the five
vowel sounds now. Michi's long-term plan is a native voice actor for the full
kana set with verified pitch accent (see `docs/design/audio.md`). Replace these
per-`itemId` files when that recording session happens; no code change needed.
