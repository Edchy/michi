# The World Map — Modules & Stations

How the curriculum is **structured for navigation and progress**: the course
presented as a walkable path of *stations*, grouped into *modules*. This is the
learner-facing shape of the sequencing defined in [overview.md](./overview.md); it
does not change *what* is taught, only how the journey is grouped and moved through.

> **Status:** Implemented (first pass). The map surface exists in code
> (`src/app/page.tsx`, `src/components/WorldMap.tsx`, data in
> `src/app/worldmap.ts`). Station↔lesson wiring is still nominal — see
> [Open edges](#open-edges).

---

## The two terms

**Station** — one stop on the path: a single unit of the journey the learner walks
to and starts. A station corresponds to a
[**Lesson**](./content-model.md#lesson) (an authored unit of new content). "Station"
is the *map/navigation* name for it; "Lesson" is the *content* name. One station →
one lesson. Stations are numbered continuously across the whole course
(1, 2, 3, …), and each carries the flavor label **STATION N 宿** — *shukuba*, the
post-towns travelers rested at along Japan's old highways.

**Module** — an ordered group of stations (a few each), forming one leg of the
journey. A module is roughly a curriculum *unit* (a cluster of gojūon rows). Modules
are numbered (Module 1, Module 2, …) and named (e.g. "First sounds", "Reading on").
The course is **self-paced — Course → Modules → Stations, no calendar** (no months or
weeks). The authoritative station roster is [stations.md](./stations.md).

```
Course  (self-paced; no calendar)
└── Module 1 "First sounds"            stations 1–3
    ├── Station 1  First sounds         → Lesson (first-sounds)
    ├── Station 2  The K row
    └── Station 3  A first look back
└── Module 2 "Reading on"              stations 4–7   (S/T/N rows → snapshot)
└── Module 3 "Completing the kana"     stations 8–11  (H/M/Y-W/R rows + ん)
└── Module 4 "First words & grammar"   stations 12–16 (mastery → words → sentence)
```

### Why a new pair of words

What each station *teaches*, how sessions collapse into stations, and the
optional book-stop/codex lore layer are specified in
[station-map.md](./station-map.md). This doc owns the map's structure and behavior;
station-map.md owns the pedagogical content of the stops.

The map is a **navigation surface over the curriculum**, not a new content model.
It needed learner-facing names for "a stop" and "a group of stops" that read as a
journey rather than a syllabus. "Lesson"/"unit" stay the authoring words in
[content-model.md](./content-model.md); "Station"/"Module" are what the learner
sees on the path. Keep the mapping one-to-one so the two vocabularies never drift:

| Map term | Curriculum/content term |
|---|---|
| Station | [Lesson](./content-model.md#lesson) |
| Module  | a unit / cluster of lessons (a leg of the journey) |
| The path / course | the whole curriculum |

---

## How it behaves

The whole course is **one continuous path** — module 1 flows into module 2 into
module 3, one walkable road on a pannable, zoomable canvas. On top of that, a **chain**
overview lets you jump between modules without scrolling the whole line (the answer to
"this won't scale to 100 stations by scrolling"). **Two ways to move, one world.**

**The path (primary surface):**

- **Stations** are circles joined by one smooth ink curve threading *every* module in
  global order. Three states, shown by **shape + label, never color alone**
  ([DESIGN §2](../design/DESIGN.md)):
  - *done* — filled indigo disc + check
  - *current* — open disc, vermilion number, a floating "you are here" pin
  - *locked* — faint outline + muted number
  - The solid portion of the path grows to reflect overall completion.
- On load the camera **snaps to the current module**; you can drag/scroll freely across
  the entire road and wheel-zoom.

**Moving between modules — two affordances (bottom-left):**

- **Glide arrows** (‹ / ›) pan the camera smoothly *along the path* to the previous /
  next module (ease-out, ~520 ms, reduced-motion aware). The map stays one world; the
  camera moves.
- **The module label** opens the **chain** — a vertical trail of module cards. Each
  shows its state by shape + label: *done* (✓ Complete), *current* (vermilion outline,
  "N of M"), *locked* (dimmed, inert). Tapping an unlocked card closes the chain and
  **glides the camera along the path** to that module. "‹ The path" returns without
  jumping.

- **Completing a module unlocks the next.** Progress is a single furthest-unlocked
  station index; a module is *done* once that index passes its last station.
- **Reinforcement / redo:** decayed items resurface in the **SRS review** at session
  start ([P8](../product/principles.md#p8--everything-lives-in-the-srs)); modules are
  **never re-locked**, so advancing is never punished
  ([P1](../product/principles.md#p1--learning-over-engagement),
  [P7](../product/principles.md#p7--sessions-always-complete)). A quiet "needs review"
  flag on a past module card is a possible future addition, not built.
- **Starting a station**: clicking a `done`/`current` station that has an `href`
  navigates into its lesson. Locked stations are inert (not focusable, no pointer).
- **Progress** is surfaced as quiet text ("N of M complete"), never a stat tile —
  [DESIGN §1](../design/DESIGN.md) anti-reference.

The visual system (色 vermilion/indigo, quiet motion, no gamification) is governed
by [DESIGN.md](../design/DESIGN.md); this doc owns only the structure and behavior.

---

## Data shape (current)

Authoring data lives in `src/app/worldmap.ts`:

```
Module { id, n, title, stations: Station[] }
Station { id, n, title, href?, x, y }
```

- `x` / `y` are **global canvas coords** — positions continue rightward across module
  boundaries, and one path (`STATIONS = MODULES.flatMap(...)`) threads them in order.
- `href` is set once a lesson is playable (only `first-sounds` today).
- Helpers map the flat furthest-unlocked index ↔ module: `moduleOfStation`,
  `firstStationOfModule`, `moduleState`; `TOTAL_STATIONS` is the course total for the
  "N of M complete" line.

Adding a module = append to `MODULES` with positions continuing rightward; the path,
glide arrows, and chain pick it up automatically.

---

## Open edges

- **Station ↔ Lesson wiring is nominal.** Stations currently hold their own title +
  `href`; they are not yet generated from the authored [lessons](./content-model.md#lesson).
  When content becomes real data (roadmap Phase 2, on-disk format TBD), stations
  should be *derived* from lessons so the two never diverge.
- **Completion percentages.** Only the coarse furthest-unlocked index drives state
  today (done/current/locked). Per-station confidence rings and honest per-module/course
  percentages are planned; they read from
  [learner state](../architecture/data-model.md) /
  [confidence](../product/glossary.md), not authored content, and must stay honest
  ([P5](../product/principles.md#p5--tell-the-truth-about-memory)) — no inflated
  counts. This is also where a "needs review" module flag would draw from.
- **All course-level stats** (the "everything on this page" surface) will live on the
  map, kept quiet per [DESIGN §1](../design/DESIGN.md).
