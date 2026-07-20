# Kana audio — attribution & provenance

Native-speaker recordings of the hiragana vowels, sourced from Wikimedia Commons.

All by **Hakatanoshio117117** (Wikimedia Commons, "Audio files of hiragana" set),
public domain (PD-self). Sourced from the uniform `Japanese X.ogg` set so all
five are the same speaker/session (an earlier mix had う/お from different
recordings, which sounded incoherent).

| File | Kana | Source | License |
|------|------|--------|---------|
| `hira_a.mp3` | あ | `Japanese A.ogg` (→ `Ja-A.oga`) | Public domain |
| `hira_i.mp3` | い | `Japanese I.ogg` | Public domain |
| `hira_u.mp3` | う | `Japanese U.ogg` | Public domain |
| `hira_e.mp3` | え | `Japanese E.ogg` (→ `Ja-E.oga`) | Public domain |
| `hira_o.mp3` | お | `Japanese O.ogg` | Public domain |

## Processing

Each source was trimmed to a single clean utterance (the sources repeat the
sound three times), converted to mono MP3, and peak-normalized to −3 dB.
Tooling: `ffmpeg`.

> Note: あ and え were recorded a few dB quieter (in RMS) than the others by the
> speaker; normalization can't fully match perceived loudness without clipping,
> so they sound slightly softer. Acceptable for placeholder audio — the eventual
> native-voice-actor set (docs/design/audio.md) resolves this.

## Status

These are **placeholder-grade** real recordings — good enough to learn the five
vowel sounds now. Michi's long-term plan is a native voice actor for the full
kana set with verified pitch accent (see `docs/design/audio.md`). Replace these
per-`itemId` files when that recording session happens; no code change needed.
