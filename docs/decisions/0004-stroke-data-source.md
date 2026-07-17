# 0004 — Stroke-data source for the drawing mechanic

- **Status:** Accepted
- **Date:** 2026-07-17
- **Deciders:** project founder

## Context

Handwriting with correct stroke order is one of Michi's three signature mechanics
([vision §8](../product/vision.md#8-the-three-signature-mechanics)). Building it
requires **stroke data** for every drawable character: an ordered list of strokes,
each with a path/shape. The app uses this for two jobs — (1) rendering the animated
stroke-order **hint**, and (2) **checking** the learner's drawn strokes against the
correct strokes and order. See
[content-model.md §Stroke Data](../curriculum/content-model.md#stroke-data).

We must not silently teach the wrong character forms
([P4 — correct by construction](../product/principles.md#p4--correct-by-construction)),
the data must be bundleable for offline use
([P9](../product/principles.md#p9--offline-first-one-codebase)), and its license must
permit shipping it in the app. Michi's near-term need (Months 1–2) is **kana only**;
kanji come later ([P10 — depth before breadth](../product/principles.md#p10--depth-before-breadth)).

Two constraints shaped this decision heavily:

- **Typeface match.** [typography.md](../design/typography.md) already commits to
  **Klee One** for character instruction — the handwriting-style face the learner
  sees on flashcards and drawing prompts. If the stroke hint's letterforms don't
  match that face, the learner copies one shape while seeing another — a direct P4
  violation.
- **License.** The data is bundled and redistributed with the app, so its license
  terms apply to us directly.

### What the research found

| Source | Coverage | License | Letterforms | Notes |
|---|---|---|---|---|
| **strokesvg** | Hiragana + katakana | **SIL Open Font License** (derived from Klee One) | **Klee One** — matches our teaching face | Per-stroke animatable SVG paths; *not* derived from KanjiVG; kana only |
| **KanjiVG** | Kana **and** ~thousands of kanji (86 hiragana + 91 katakana SVGs incl. variants) | **CC-BY-SA 3.0** (attribution + **share-alike/copyleft**) | Its own reference style — correct, but *not* Klee One | Authoritative, hand-drawn from Japanese govt. references; rich stroke-type/radical metadata |
| **Hand-authored** | Whatever we draw | Ours | Whatever we design | Full control; manual effort; doesn't scale to kanji |

## Decision

**We will use `strokesvg` (Klee One, OFL) as the primary stroke-data source for
kana, hand-authoring any gaps needed for the 46 hiragana + 46 katakana core set.**

When Michi reaches kanji (a later phase), we will **adopt KanjiVG for kanji**, and
record that as its own decision (superseding or extending this ADR) — including how
we reconcile its letterform style and its CC-BY-SA terms at that time.

The **stroke-matcher is Michi's own code** and is deliberately independent of the
data source: it consumes an ordered list of stroke paths, whatever produced them.
This choice therefore does not lock in any recognition algorithm.

## Alternatives Considered

- **KanjiVG as the primary source (now).** Comprehensive and authoritative, and the
  obvious choice *for kanji later*. Rejected as the primary source now for two
  reasons: (1) its letterforms are not Klee One, so kana stroke hints would not match
  our teaching face — a P4 mismatch precisely where the learner is most impressionable;
  (2) **CC-BY-SA 3.0 is share-alike/copyleft**, which is heavier for a bundled
  commercial-capable app than OFL and risks obligations on redistributed derivatives.
  For a kana-only near-term need, it's the wrong tradeoff.

- **Hand-author everything from scratch.** Maximum control and a guaranteed match to
  our design. Rejected as the *primary* approach: it reinvents work `strokesvg`
  already did correctly against Klee One, and doesn't scale to katakana/kanji. We keep
  it only as the **fallback for gaps** in the core 92 kana.

- **animCJK.** Another open animated-stroke project (kana + CJK). Viable, but its
  letterforms are not Klee One either, giving it the same P4 mismatch as KanjiVG
  without KanjiVG's authority. Rejected.

## Consequences

- **Easier / better:** kana stroke hints match the Klee One flashcard faces exactly
  (strong P4 win); OFL is simple to comply with (attribution, doesn't infect the app);
  per-stroke SVG paths drop straight into the content model; covers exactly the
  near-term kana scope; bundles cleanly for offline.
- **Requires:** carrying the OFL notice and attributing Klee One / `strokesvg`; a
  small hand-authoring pass to fill any missing or low-quality kana strokes;
  normalizing `strokesvg`'s SVG into our own stroke-path representation so the matcher
  isn't coupled to its file format.
- **Accepted downside / deferred work:** this covers **kana only**. Kanji needs a
  separate source (likely KanjiVG), which will reintroduce the letterform-style and
  CC-BY-SA questions — deferred deliberately to when kanji actually arrive, not solved
  now. That is consistent with depth-before-breadth and is explicitly **not** a dead
  end, since KanjiVG remains available.

## Related

- [content-model.md §Stroke Data](../curriculum/content-model.md#stroke-data)
- [typography.md](../design/typography.md) — the Klee One commitment this hinges on
- [P4 — Correct by construction](../product/principles.md#p4--correct-by-construction)
- [P9 — Offline-first](../product/principles.md#p9--offline-first-one-codebase)
- [P10 — Depth before breadth](../product/principles.md#p10--depth-before-breadth)
- Sources: KanjiVG (kanjivg.tagaini.net, github.com/KanjiVG/kanjivg),
  strokesvg (github.com/zhengkyl/strokesvg)
