# The World Map — Provinces, Tracks & Stations

How the curriculum is **structured for navigation and progress**: the course
presented as a walkable path of *stations*, grouped into *tracks*, grouped into
*provinces*. This is the learner-facing shape of the sequencing defined in
[overview.md](./overview.md); it does not change *what* is taught, only how the journey
is grouped and moved through.

> **Status:** Implemented (first pass). The map surface exists in code
> (`src/app/page.tsx`, `src/components/WorldMap.tsx`, data in
> `src/app/worldmap.ts`). Station↔lesson wiring is still nominal — see
> [Open edges](#open-edges).

---

## The three terms

**Station** — one stop on the path: a single unit of the journey the learner walks
to and starts. A station corresponds to a
[**Lesson**](./content-model.md#lesson) (an authored unit of new content). "Station"
is the *map/navigation* name for it; "Lesson" is the *content* name. One station →
one lesson.

Each station is **a real Tokyo station**, shown by its place name in kana (あさくさ,
うえの, しんじゅく) above `Asakusa Station 駅`. The romaji is a **label on a place, never a
reading aid** for the lesson's kana ([P2](../product/principles.md#p2--no-romaji-ever-as-a-reading-aid)).
Stations are still numbered continuously (the disc shows the number until it's complete),
but the label carries no line code — the track's color and the nav label already say which
line you're on, and a third encoding of the same fact only competed for attention.

**Track** — an ordered group of stations (a few each): the run of **line** they sit on. A
track is roughly a curriculum *unit* (a cluster of gojūon rows), and is presented as a real
**Tokyo Metro line** — `GINZA LINE 銀座線` — whose official color is that track's hue. It
also carries what it teaches ("First sounds").

**Province** — an ordered group of tracks: one **leg of the journey**, a whole script or
domain (Hiragana, Katakana, First kanji, …). Provinces are numbered and named and carry
the label **PROVINCE N 国** — *kuni*, the old provinces a traveller crossed on a long
journey. The course is **self-paced — Course → Provinces → Tracks → Stations, no
calendar** (no months or weeks). The authoritative station roster is
[stations.md](./stations.md).

```
Course  (self-paced; no calendar)
└── Province 1 "Hiragana" 国
    ├── Track 1 "First sounds"          stations 1–3
    │   ├── Station 1  First sounds         → Lesson (first-sounds)
    │   ├── Station 2  The K row
    │   └── Station 3  A first look back
    ├── Track 2 "Reading on"            stations 4–7   (S/T/N rows → snapshot)
    ├── Track 3 "Completing the kana"   stations 8–11  (H/M/Y-W/R rows + ん)
    └── Track 4 "First words & grammar" stations 12–16 (mastery → words → sentence)
└── Province 2 "Katakana" 国                 declared, not yet authored
└── Province 3 "First kanji" 国              declared, not yet authored
└── Province 4 "Words & sentences" 国        declared, not yet authored
```

**Why these words.** The sizes nest the way the words do: a **province** is a region you
cross, a **track** is a run of line inside it, a **station** is where you stop. The
Tōkaidō really did run through ten named provinces (Musashi, Sagami, Izu, …), and modern
presentations of it already group its stations provincially — so the top tier is grounded
rather than invented.

Two honest caveats, recorded in
[ADR 0006](../decisions/0006-provinces-and-tracks.md):

- The historical highway system was **two-tiered** — route and station, with no attested
  administrative layer between. The track tier is a grouping *we* impose.
- The subway framing **resolved an earlier mixed metaphor**: stations were once labeled
  宿 *shukuba* (Edo walking-highway post-towns) beside 線 (modern rail). They are now 駅
  *eki* — the word on every real Tokyo station sign — so 駅 / 線 / line names are one
  coherent era. Only 国 *kuni* (province) remains from the older layer, as the tier that
  groups whole scripts.

### Why a separate set of words

What each station *teaches*, how sessions collapse into stations, and the
optional book-stop/codex lore layer are specified in
[station-map.md](./station-map.md). This doc owns the map's structure and behavior;
station-map.md owns the pedagogical content of the stops.

The map is a **navigation surface over the curriculum**, not a new content model.
It needed learner-facing names for "a stop" and "a group of stops" that read as a
journey rather than a syllabus. "Lesson"/"unit" stay the authoring words in
[content-model.md](./content-model.md); "Station"/"Track"/"Province" are what the learner
sees on the path. Keep the mapping one-to-one so the two vocabularies never drift:

| Map term | Curriculum/content term |
|---|---|
| Station | [Lesson](./content-model.md#lesson) |
| Track | a unit / cluster of lessons |
| Province | a curriculum leg — one script or domain |
| The path / course | the whole curriculum |

---

## How it behaves

Each **province** is one continuous walkable stretch of ink on a pannable, zoomable canvas —
its tracks flow one into the next. Between provinces the ink **breaks**, marked by a quiet
seam. On top of that, a two-level **chain** overview jumps between provinces and tracks.

> **Correction (supersedes the earlier claim here).** This section used to say the chain
> was "the answer to *this won't scale to 100 stations by scrolling*". It wasn't. A chain
> listing *every* track becomes the same endless scroll it was meant to replace, and
> one flat canvas holding every station grows past 30,000px. **Provinces bound both surfaces:**
> the canvas holds one province, and the overview is provinces-then-tracks — never more than
> ~8 items at either level, however long the course gets. See
> [ADR 0006](../decisions/0006-provinces-and-tracks.md).

**The path (primary surface):**

- **Stations** are circles joined by one smooth ink curve threading every track of a
  province in global order. Three states, shown by **shape + label, never color alone**
  ([DESIGN §2](../design/DESIGN.md)):
  - *done* — filled disc + check
  - *current* — thick ring + a soft halo, ink-dark bold number, a floating "you are here"
    pin. Deliberately **hue-free**, so it reads the same on every track color
  - *locked* — thin faint outline + muted number
  - The solid portion of each track's ink grows to reflect completion *of that track*.
- **Each track has its own hue**, so a stretch of path and its name are visibly the same
  thing. It appears on: the walked ink and station rings along it; the **whole nav card's
  track row**, filled with the hue behind light text; and the left edge of its card in the
  track list. The hues are matched in lightness and chroma (no track shouts louder than
  another) and held clear of 朱 vermilion's hue.
  - **Unwalked ink is tinted too** — the same hue mixed toward the background — so every
    track is identifiable *before* you reach it. Walked ink is the full-strength version.
  - **Hue carries grouping only** — never state. done/current/locked are shape and weight
    (see above); locked stations stay faint grey regardless of hue. Removing color entirely
    (grayscale) leaves all three fully distinguishable — worth re-checking with a grayscale
    filter after any change here.
  - The filled surfaces use a **deepened mix** of the hue, not the raw color: paper text
    fails AA on all four raw hues, and clears at **4.8–7.2:1** on the mix. See
    [DESIGN → Track hues](../design/DESIGN.md) for the full strength table.
  - Hues **restart at each province**, so every province opens on the same first color.
    Five are defined and they cycle; a province with more than five tracks repeats.
  - They live in `:root`, **not** Tailwind's `@theme` — `@theme` tokens are tree-shaken
    unless referenced literally in source, and these are composed at runtime.
- **Province boundaries** are drawn as a dashed hairline and a `PROVINCE N 国` label in the gap
  between one province's last station and the next province's first — legible when you pan past
  it, invisible otherwise. A declared-but-unauthored province draws nothing at all. Track
  boundaries *within* a province have no gap: consecutive hues meet at the shared station.
- On load the camera **snaps to the current track**; you can drag/scroll freely and
  wheel-zoom.

**Moving around — three affordances (bottom-left):**

- **Glide arrows** (‹ / ›) pan the camera smoothly *along the path* to the previous /
  next track (ease-out, ~520 ms, reduced-motion aware). They are **scoped to the
  current province** and disabled at its edges, so the click count stays bounded; to leave a
  province you use the nav label. The map stays one world; the camera moves.
- **The nav label is two tap targets, one card.** The top row (`PROVINCE N 国 · <name>`,
  neutral) opens the **province list**; the bottom row (the current track, **filled with
  that track's hue**) opens **this province's tracks**. One tap to either level —
  switching province is never buried behind a back button.
- **"‹ Provinces"** steps up to the **province list**. Each card shows state by shape + label:
  *done* (✓ Complete), *current* (vermilion outline, "N of M tracks"), *locked*
  (dimmed, inert), *unauthored* ("Not yet built", inert — honest rather than a fake
  "coming soon", [P5](../product/principles.md#p5--tell-the-truth-about-memory)). Tapping
  a province opens its tracks; tapping a track closes the chain and **glides the camera
  along the path** to it. "‹ The path" returns without jumping.

- **Completing a track unlocks the next.** Progress is a single furthest-unlocked
  station index; a track is *done* once that index passes its last station, and a province
  is *done* once it passes the province's last station.
- **Reinforcement / redo:** decayed items resurface in the **SRS review** at session
  start ([P8](../product/principles.md#p8--everything-lives-in-the-srs)); tracks are
  **never re-locked**, so advancing is never punished
  ([P1](../product/principles.md#p1--learning-over-engagement),
  [P7](../product/principles.md#p7--sessions-always-complete)). A quiet "needs review"
  flag on a past track card is a possible future addition, not built.
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
Province     { id, n, title, subtitle?, tracks: Track[] }
Track { id, n, title, stations: Station[] }
Station  { id, n, title, href?, x, y }
```

- `x` / `y` are **global canvas coords** — positions continue rightward across track
  and province boundaries. `TRACKS = PROVINCES.flatMap(...)` and
  `STATIONS = TRACKS.flatMap(...)` keep the flat, globally-ordered station list that
  progress indexes into, so **station numbering stays global 1..N** (as Tōkaidō post-towns
  were counted along the whole highway, not per track).
- An **empty `tracks` array** means the province is declared but not yet authored — it
  renders as "Not yet built" and draws nothing on the canvas.
- `href` is set once a lesson is playable (only `first-sounds` today).
- Helpers map the flat furthest-unlocked index ↔ track ↔ province: `trackOfStation`,
  `firstStationOfTrack`, `trackState`, `provinceOfTrack`, `firstTrackOfProvince`,
  `provinceState`, `stationRangeOfProvince`; `TOTAL_STATIONS` is the course total for the
  "N of M complete" line. `provinceState` returns `locked` for an unauthored province — without
  that guard an empty index range reads as *current*.

Adding a track = append to a province's `tracks` with positions continuing rightward;
the path, boundary markers, glide arrows, and both chain levels pick it up automatically.

---

## Open edges

- **Station ↔ Lesson wiring is nominal.** Stations currently hold their own title +
  `href`; they are not yet generated from the authored [lessons](./content-model.md#lesson).
  When content becomes real data (roadmap Phase 2, on-disk format TBD), stations
  should be *derived* from lessons so the two never diverge.
- **Completion percentages.** Only the coarse furthest-unlocked index drives state
  today (done/current/locked). Per-station confidence rings and honest
  per-track/province/course percentages are planned; they read from
  [learner state](../architecture/data-model.md) /
  [confidence](../product/glossary.md), not authored content, and must stay honest
  ([P5](../product/principles.md#p5--tell-the-truth-about-memory)) — no inflated
  counts. This is also where a "needs review" track flag would draw from.
- **Province-local station numbering.** Numbers are global, so later provinces will show large
  station numbers on the disc. Place names carry the orienting work now, so this matters
  less than it did; a display-only per-province reset stays deferred.
- **Track boundaries past Province 1** are open; the row→station rule is settled but the
  groupings are decided as each province's curriculum is authored. Province boundaries (one script
  or domain each) are fixed.
- **All course-level stats** (the "everything on this page" surface) will live on the
  map, kept quiet per [DESIGN §1](../design/DESIGN.md).
