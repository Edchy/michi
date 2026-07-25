# 0005 — Roads (街道) and provinces (国) above stations

- **Status:** Accepted; naming superseded by [0006](./0006-provinces-and-tracks.md)
- **Date:** 2026-07-25
- **Deciders:** project founder

## Context

The curriculum had exactly three levels: **Course → Module → Station**
([world-map.md](../curriculum/world-map.md)). At 4 modules and 16 stations, all
hiragana, that worked. It breaks well before the curriculum is finished, in two
separate ways.

**Structural.** Stations carry global canvas coordinates, x stepping ~320px per station.
Station 16 already sits at x=5040, so a course of 100 stations would be a **single flat
canvas over 30,000px wide**. Navigation was worse: glide arrows stepped one module at a
time, and the module "chain" rendered a flat list of *every* module — at 50 modules,
either 50 arrow clicks or an endless scroll list. The old text in
`world-map.md` claimed the chain was "the answer to *this won't scale to 100 stations by
scrolling*." That claim was **wrong**: a flat list of every module reproduces exactly the
scroll problem it was introduced to solve. This ADR supersedes that claim.

**Naming.** Stations were already labeled *STATION N 宿* — *shukuba*, the post-towns of
Japan's old highways — and the brand mark is 道. "Module" was the only term in the
hierarchy with no place in that metaphor; "MODULE 2 / Reading on" reads as courseware in
the middle of a journey, which cuts against the calm, non-gamified surface
[DESIGN.md](../design/DESIGN.md) commits to.

A third, smaller force: "leg of the journey" was used at two different scales in the docs
— one module in `world-map.md`, all of hiragana in `month-1.md`. Any new tier had to
resolve that rather than entrench it.

### The historical record (and its limits)

The naming was checked against sources rather than assumed, and the finding is
**partly negative**:

- The **Tōkaidō** had 53 government-sanctioned post stations (宿場 *shukuba*) between Edo
  and Kyoto — though official records support **57** after the 1619 extension toward
  Osaka. The famous "53" owes much of its dominance to Hiroshige's print series.
- Edo Japan had five great highways, the **五街道 Gokaidō**; **街道 *kaidō*** is the correct
  general word for such a route.
- The Tōkaidō demonstrably ran through **ten provinces (国 *kuni*)**: Musashi, Sagami, Izu,
  Suruga, Tōtōmi, Mikawa, Owari, Ise, Ōmi, Yamashiro. Modern presentations of the road
  routinely group its stations provincially ("Stations 1–4 in Musashi Province").
- **But there was no attested administrative tier between route and station.** Provinces
  were a reference frame, not a subdivision of a highway. Barriers (関所 *sekisho*) were
  too few and irregular to partition a road; distance markers (一里塚 *ichirizuka*) measured
  rather than grouped. Sequential 1–53 station numbering also appears to be modern
  convention, not Edo administrative practice.

So the province tier is **a grouping we impose** — on real, named, well-documented
geography that others already group by, but ours. The docs must not claim the bakufu
chunked highways this way.

## Decision

We will adopt a four-level hierarchy: **Course → Road (街道) → Province (国) → Station (宿)**.

- **Road** — one leg of the journey: a whole script or domain. Today: Hiragana (authored),
  Katakana, First kanji, Words & sentences (declared, empty).
- **Province** — replaces **Module** everywhere, learner-facing and internal. Hiragana's
  four modules become Road 1's four provinces, unchanged in content.
- **Station numbering stays global 1..N.** Progress remains a single furthest-unlocked
  station index, as Tōkaidō post-towns were counted along the whole highway rather than
  per province.
- **Only the current road's path is drawn**, with a quiet dashed seam and a `ROAD N 街道`
  label marking each boundary. Navigation is **roads-then-provinces** — two bounded lists
  (~8 roads, ~5 provinces) instead of one unbounded one. Glide arrows are scoped to the
  current road.
- A road declared with **no provinces** renders as "Not yet built" and is inert — honest
  rather than a fake "coming soon"
  ([P5](../product/principles.md#p5--tell-the-truth-about-memory)).

Roads are the coarse commitment: **road boundaries are fixed** (one script or domain
each), while **province boundaries past Province 4 remain open**, decided as each
curriculum is authored. That asymmetry is what makes it safe to declare roads before
their content exists.

## Alternatives Considered

- **Keep three levels, rely on the chain** — the status quo, and the claim this ADR
  supersedes. A flat list of every province becomes the same endless scroll at 50+, and
  the single canvas keeps growing without bound. Rejected on the evidence.
- **Per-road separate canvases** — cutting the canvas at road boundaries would kill the
  "one continuous walkable road" feeling that is the core metaphor. Drawing per-road paths
  on *one* canvas gets the scale benefit while keeping one world; the seam becomes a
  legible place rather than a wall.
- **Serpentine / 2D folding of the path** — folding a long path into a 2D field to avoid
  the 30,000px line. Rejected: it solves a problem the road tier already deletes (no
  single road approaches that length), breaks the left→right reading direction, and
  requires generating 2D coordinates. Revisit only if one road ever exceeds ~25 stations.
- **Islands / Worlds** — break the route metaphor (you don't walk a continuous road onto
  an island) and "World 2" is platform-game vocabulary, colliding with
  [P1](../product/principles.md#p1--learning-over-engagement),
  [P6](../product/principles.md#p6--respect-the-learner) and the DESIGN anti-gamification
  stance.
- **Region** — structurally identical to Province, but a vague modern word where 国 is the
  specific historical one with real named referents.
- **Stage / Chapter / Leg** — *Stage* reads as a game level; *Chapter* collides with the
  book-stop/codex reading layer; *Leg* was already ambiguous at two scales, so promoting
  it to a tier would have made the ambiguity permanent.
- **Restarting station numbers per road** — friendlier numbers (`STATION 3` forever), but
  progress becomes a `(road, station)` pair threaded through every helper, plus a
  localStorage migration, for a cosmetic gain. Rejected; see Consequences for the
  deferred display-only fallback.

## Consequences

**Easier.** The map is bounded at every level: one road on the canvas, two short lists to
navigate, arrows that can't require 50 clicks. Later curricula can be *declared* (and
shown honestly as unbuilt) long before they're authored — appending a province to a road
requires no code change. The hierarchy is now one metaphor end to end, and "leg of the
journey" has exactly one meaning.

**Accepted downsides.**

- **Station numbers grow large.** Global numbering means later roads show `STATION 63 宿`.
  If that ever reads badly the fix is a display-only `ROAD 3 · STATION 12` form —
  deliberately deferred, not designed.
- **Road boundaries are now a commitment** even though province boundaries aren't. If
  katakana and kanji turn out to belong on one road, that's an ADR to write.
- **The overview is two taps deep** instead of one, for a road hop. Within a road — the
  common case — it's still one tap.
- **The province tier is historically imposed**, not attested. Named as such here so no
  future doc overstates it.
- **One learner-visible URL change**: lessons moved from `/modules/*` to `/provinces/*`,
  covered by a permanent redirect in `next.config.ts`.

## Related

- [world-map.md](../curriculum/world-map.md) — the structure and behavior this ADR sets;
  contains the explicit correction of the superseded scaling claim.
- [stations.md](../curriculum/stations.md) — the roster, now under road headings.
- [station-map.md](../curriculum/station-map.md) — province boundaries beyond hiragana
  stay open; road boundaries are fixed.
- [glossary.md](../product/glossary.md) — **Road** and **Province** entries; *Module*
  retired.
- [P1](../product/principles.md#p1--learning-over-engagement),
  [P5](../product/principles.md#p5--tell-the-truth-about-memory),
  [P6](../product/principles.md#p6--respect-the-learner),
  [P10](../product/principles.md#p10--depth-before-breadth).
- Sources: [53 Stations of the Tōkaidō](https://en.wikipedia.org/wiki/53_Stations_of_the_T%C5%8Dkaid%C5%8D),
  [Edo Five Routes](https://en.wikipedia.org/wiki/Edo_Five_Routes),
  [Shukuba](https://en.wikipedia.org/wiki/Shukuba),
  [Nippon.com on the Tōkaidō](https://www.nippon.com/en/japan-topics/g02415/),
  [Hiroshige's Tōkaidō (Kawaharada)](https://denniskawaharada.wordpress.com/hiroshiges-tokaido-0/).
