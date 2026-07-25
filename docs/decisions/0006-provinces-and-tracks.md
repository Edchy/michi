# 0006 — Provinces (国) and tracks (線): renaming the 0005 tiers

- **Status:** Accepted
- **Date:** 2026-07-25
- **Deciders:** project founder
- **Supersedes:** [0005](./0005-roads-and-provinces.md) — *partially*: the structure,
  scaling model and global station numbering stand; only the tier **names** and the
  province-switching interaction change.

## Context

[ADR 0005](./0005-roads-and-provinces.md) added a tier above the old "module" and named
the result **Course → Road (街道) → Province (国) → Station (宿)**. The structure was right
and is unchanged here. Two things about it were wrong in use.

**1. The geography was inverted.** A *road* was the large container and a *province* the
small one — but provinces are regions that roads run *through*, not the reverse. The
naming inverted the real size relationship, which is exactly the kind of detail that
quietly makes a metaphor feel off without the reader being able to say why.

**2. Switching the top tier was buried.** Reaching another road took two taps through a
back button (`nav label → ‹ Roads → pick`). Changing script — hiragana to katakana — is a
meaningful move, and it was harder to find than stepping one province sideways.

## Decision

We will rename the tiers to **Course → Province (国) → Track (線) → Station (宿)**:

| 0005 | 0006 | Label |
|---|---|---|
| Road | **Province** | `PROVINCE N 国` (*kuni*) |
| Province | **Track** | `TRACK N 線` (*sen*) |
| Station | Station (unchanged) | `STATION N 宿` (*shukuba*) |

Sizes now nest the way the words do: a province is a region you cross, a track is a run of
line inside it, a station is where you stop.

We will also **split the nav label into two tap targets in one card**: the top row
(province name) opens the province list; the bottom row (track name) opens this province's
tracks. One tap to either level; the `‹ Provinces` back step remains as a way up from the
track list but is no longer the only route.

We will also give **each track its own hue** on the map — the walked ink, its station
rings, the `TRACK N` nav label and its card edge — so a stretch of path and its name read
as one object. This adds a third color family to a system that
[DESIGN §2](../design/DESIGN.md) had held to two pigments, and is bounded accordingly:
hues are matched in lightness and chroma (categorical, never a ranking), held clear of
vermilion, **carry grouping only** (state stays shape + label, and *current* overrides hue
with vermilion), restart at each province, and are scoped to the map alone. The map must
remain fully readable under `grayscale(1)`; that is the acceptance test.

Everything else from 0005 is retained unchanged: global station numbering 1..N, the single
furthest-unlocked-index progress model, the dashed seam at province boundaries, "Not yet
built" for declared-but-unauthored provinces, and the bounded-lists-at-both-levels scaling
argument. (Path ink is now drawn per *track* rather than per province, so each track can
carry its hue; segments join at the shared station, so the visible seam is still only at
province boundaries.)

### The metaphor cost, stated plainly

**"Track" is railway vocabulary; 宿 *shukuba* are Edo-period post-towns on walking
highways.** The eras are mixed on purpose — "track" is the plain English word that pairs
with "station", and the middle tier needed to be concrete for a beginner. The cost is that
線 is *not* historical alongside 宿, and no doc should imply it is.

The walking-era alternatives were 道 (*michi* — already the brand mark, too load-bearing to
spend on a tier) and 筋 (*suji*, a route/line — accurate but obscure to a learner). "Line"
was also considered and is arguably the better railway word (the Yamanote Line), but
"track" was chosen for concreteness.

The 0005 caveats still hold and are restated here: the historical highway system was
**two-tiered** (route and station, no attested layer between), so the *track* tier is a
grouping we impose; the famous "53 stations" is a print-series number where official
records support 57; and sequential 1–53 numbering is modern convention, not Edo practice.

## Alternatives Considered

- **Keep Road → Province** (0005 as-is) — rejected: the inverted size relationship is the
  whole reason this ADR exists.
- **Province → Road → Station** — fixes the ordering while keeping the middle tier in the
  Edo walking-road era, so 街道 and 宿 stay consistent. Rejected in favour of the more
  concrete "track"; this remains the cheapest reversal if the railway mixing grates.
- **Province → Line → Station** — "Line" is the railway term that genuinely pairs with
  "Station" in English and Japanese (山手線). A close call; "track" won on concreteness.
- **Renaming Station too** (to keep one era) — rejected: *STATION N 宿* is the most
  established label in the product, appears on every stop, and is the one piece of this
  vocabulary that was never in question.
- **Leaving province-switching at two taps** — rejected: it is a rare action, but rare and
  *significant*. Two taps for "start katakana" undersold the moment.

## Consequences

**Easier.** The hierarchy reads at a glance and the sizes are no longer backwards.
Switching province is one tap from the map. "Module" is fully retired from the product.

**Accepted downsides.**

- **A second rename in one day**, touching ~200 references across code and docs. Mitigated
  by tests and a link check, but the churn is real and recorded here so the next renaming
  impulse is weighed against it.
- **Lesson URLs moved twice**: `/modules/*` → `/provinces/*` → `/tracks/*`. Both old forms
  keep working via permanent redirects in `next.config.ts`; note that `/provinces/*` now
  redirects *away* from a word still used in the product, which is briefly confusing when
  reading the config.
- **Mixed metaphor eras** (線 railway vs 宿 highway), as stated above.
- **A third color family** on a deliberately two-pigment system. Constrained as above, but
  it is a real widening of the palette and the map is now the one screen where color does
  categorical work. If it ever reads as decoration, the tonal fallback (one hue stepped
  through lightness) is the retreat.
- **The 0005 file remains on disk and is now partly inaccurate** in isolation. It is
  immutable per [decisions/README](./README.md); this ADR is the pointer that corrects it.

## Related

- [0005](./0005-roads-and-provinces.md) — the structure and scaling argument this ADR
  keeps; superseded only on naming and the switching interaction.
- [world-map.md](../curriculum/world-map.md) — terms, tree, behavior.
- [glossary.md](../product/glossary.md) — **Province** and **Track** entries.
- [stations.md](../curriculum/stations.md) · [station-map.md](../curriculum/station-map.md)
- [P1](../product/principles.md#p1--learning-over-engagement),
  [P5](../product/principles.md#p5--tell-the-truth-about-memory),
  [P6](../product/principles.md#p6--respect-the-learner).
