# 0007 — Theme the world map as the Tokyo subway

- **Status:** Accepted
- **Date:** 2026-07-25
- **Deciders:** project founder
- **Amends:** [0006](./0006-provinces-and-tracks.md) — resolves the mixed-metaphor caveat
  it recorded; the Province → Track → Station structure is unchanged.

## Context

[ADR 0006](./0006-provinces-and-tracks.md) named the tiers Province (国) → Track (線) →
Station (宿) and recorded an accepted downside: **線 is railway vocabulary while 宿
*shukuba* are Edo-period post-towns on walking highways.** Two eras, mixed, with the docs
instructed not to claim otherwise.

Separately, four hues had been chosen for the tracks. Checking them against the Tokyo Metro
palette produced a striking result — they are that palette, essentially exactly:

| Track hue | Line | Official | Delta (sum of RGB channels, /765) |
|---|---|---|---|
| `#FD9701` | Ginza 銀座線 | `#FF9500` | 5 |
| `#F62E34` | Marunouchi 丸ノ内線 | `#F62E36` | 2 |
| `#00BC87` | Chiyoda 千代田線 | `#00BB85` | 3 |
| `#8F76D7` | Hanzomon 半蔵門線 | `#8F76D6` | 1 |

Given that, the subway reading was already latent in the design. Committing to it turns the
0006 caveat from a compromise into the point: with 駅 *eki* instead of 宿, the whole
vocabulary — 駅, 線, line names, line colors — belongs to one real system.

## Decision

We will theme the world map as the **Tokyo subway**.

- **Stations become real Tokyo stations.** Each carries its place name in **kana** as the
  headline (あさくさ, うえの, しんじゅく), above `Asakusa Station 駅`, with the lesson title
  beneath. **No line code on the label** — `G-01` was tried and removed: the track's color
  and the nav label already state the line, and a code was a third encoding of the same fact
  competing with the two things the learner is actually there to read. `Track.code` survives
  for the track cards (`G · Ginza Line`).
- **Tracks become real Tokyo Metro lines**, presented as `GINZA LINE 銀座線` and drawn in
  that line's official color. `Track.line`, `lineKanji`, and `code` carry this.
- **宿 → 駅.** *Eki* is the word on every real station sign.
- **Track hues are pinned to real lines**, documented with their official values. Track 5
  moved from an invented `#2E9BF6` to Tozai's actual `#009BBF`.
- **Provinces keep 国** and stay named for what they teach (Hiragana, Katakana …). They are
  the one tier left from the older layer, and they group whole *scripts* — a scale no
  subway word covers.

### Romaji, and why this is not a P2 violation

Each station shows its romaji (*Asakusa*) beneath the kana.
[P2](../product/principles.md#p2--no-romaji-ever-as-a-reading-aid) forbids romaji **as a
reading aid** — a Latin gloss that lets the learner skip decoding kana they are being
taught. This is a different thing: a **place label**, in the same category as "Hiragana" or
"The K row", naming a station rather than glossing lesson content. No drill, no SRS item,
and no taught kana is ever accompanied by its romaji.

The line is worth stating precisely because it is thin: **if romaji ever appears next to
kana the learner is being tested on, that is a P2 violation regardless of this ADR.**

Station names were also chosen so the earliest ones are **readable as they are earned** —
あさくさ needs only あ/さ/く, うえの adds の. Later names use dakuten and youon freely
(しんじゅく, ろっぽんぎ); by then that is aspirational texture, not an obstacle.

## Alternatives Considered

- **Invented station names ("Toshi Station")** — the original suggestion. Rejected on
  fact: とし means "city" (都市) or "year" (年), not a place, so "Toshi Station" reads to a
  Japanese speaker roughly like "City Station". Real place names cost nothing extra and
  teach something true.
- **Kana-only invented names** (あい, こい …) chosen so every station is readable from the
  start. Genuinely tempting pedagogically — station 2 would become an "I can read this
  place name" moment. Rejected because the places would be fictional, and Michi's texture
  depends on Japanese being real. Partially recovered by ordering the real names so the
  first few are readable.
- **Keeping 宿** with a subway color palette — leaves 0006's mixed metaphor in place for no
  gain once the colors are admittedly Metro's.
- **Renaming provinces to subway vocabulary too** (a "Metro" per script) — rejected: no
  subway term describes "a whole writing system", and 国 already reads correctly at that
  scale.
- **Naming provinces after places as well** — rejected: it would collide with station place
  names ("Province 1: Shibuya" vs "Station 12: Shibuya").

## Consequences

**Easier.** The metaphor is now one coherent system rather than two eras borrowed from.
Track colors have an external source of truth, so "which hue for the next track" has a real
answer instead of a taste call. Real place names do orienting work that bare numbers did not —
"Asakusa" is memorable in a way "Station 1" is not, which softens the large-station-number
problem 0006 deferred.

**Accepted downsides.**

- **Romaji is now on screen**, in a narrow labelling role. Defensible, but it is a surface
  the docs must keep watching; see the boundary stated above.
- **Most real station names are not readable with the basic 46 kana** — ぎんざ, しんじゅく,
  ろっぽんぎ need dakuten, handakuten, sokuon, or youon. Only あさくさ, うえの, なかの and
  おおてまち are basic-46-clean. Accepted as aspirational texture.
- **A Tokyo-specific frame** on an app that teaches Japanese generally. If the curriculum
  ever moves to another language, this theming does not travel.
- **Official hex values are community-documented**, not first-party — Tokyo Metro publishes
  the color names but blocks automated fetching of a brand guideline. Values are within
  1–5/765 of the widely-used references.

## Related

- [0006](./0006-provinces-and-tracks.md) — the tier structure this themes; its
  mixed-metaphor caveat is now resolved.
- [world-map.md](../curriculum/world-map.md) · [glossary.md](../product/glossary.md) ·
  [DESIGN → Track hues](../design/DESIGN.md)
- [P2](../product/principles.md#p2--no-romaji-ever-as-a-reading-aid) ·
  [P6](../product/principles.md#p6--respect-the-learner)
- Sources: [Template:Ja-rail-color](https://en.wikipedia.org/wiki/Template:Ja-rail-color) ·
  [Tokyo Metro](https://en.wikipedia.org/wiki/Tokyo_Metro) · Japanese Wikipedia station
  articles for each kana reading.
