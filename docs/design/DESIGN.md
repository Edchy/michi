# DESIGN.md — Michi visual system

The **how it looks** companion to the product docs. Strategy lives in
[vision.md](../product/vision.md) and [principles.md](../product/principles.md);
this file commits the visual decisions those principles imply. Typeface reasoning
is in [typography.md](./typography.md) — this file only references the tokens.

> **Register:** product. The design *serves* the learning; it never performs. The
> Japanese character is the only thing on screen allowed to be loud.

---

## 1. The feel

**Quiet & focused, light-first.** Ink on warm-neutral off-white, one accent used
sparingly. Calm and museum-like — the character is the hero, everything else
recedes. This is not a game and must never dress like one ([P1], [P6]).

One-sentence scene: *a 14-year-old at a desk in the evening, tracing characters
like a workbook.* That scene forces light-first, paper-like surfaces, and Klee One
as a textbook hand.

**Anti-references (what Michi must not look like):**

- Gamified language apps (Duolingo) — mascots, gems, streak-anxiety confetti. [P6]
- Marketing-page effect libraries (Aceternity-style aurora/beam/spotlight/3D-tilt).
  Spectacle is brand register; it fights [P4] the moment it distorts a glyph.
- Dashboard density — stat tiles, card grids, chrome competing for attention.

---

## 2. Color

**Strategy: restrained.** Tinted-neutral surfaces + two traditional pigments split
by *meaning*, plus one categorical set (track hues) scoped to the world map. All values
OKLCH.

The two colors are the classic Japanese pairing — **朱 (shu, vermilion)** and
**藍 (ai, indigo)** — and they never fight because they mean different things:

- **朱 Vermilion — rare emphasis.** Warm and distinctive, reserved for moments that
  genuinely need emphasis rather than routine answer feedback. Kept **under 10% of
  the surface**; nothing else is this saturated.
- **藍 Indigo — the ink & structure.** Cool; it holds still. It IS the near-black:
  primary text, the character, the primary button fill. Load-bearing, not decoration.

### 朱 Vermilion — rare emphasis

The red of torii gates and hanko seals — a mark made deliberately.

| Token | OKLCH | Role |
|---|---|---|
| `--accent`        | `oklch(0.545 0.190 32)` | focus rings, lesson & codex emphasis |
| `--accent-hover`  | `oklch(0.490 0.190 32)` | hover/pressed |
| `--accent-weak`   | `oklch(0.940 0.035 40)` | quiet tint when the accent needs a surface |

Vermilion does **not** mark "you are here" on the world map — that is form-only. See
*Track hues* below.

### 藍 Indigo — the ink (near-black) & primary action

The ink is indigo rather than a warm-tinted black — cool, deep, structural.

| Token | OKLCH | Role |
|---|---|---|
| `--ink`       | = `--color-navy` | primary text, the character, primary button fill |
| `--ink-muted` | `oklch(0.500 0.032 264)` | secondary text, prompts |
| `--ink-faint` | `oklch(0.620 0.026 264)` | hints, sound labels under glyphs |

### The two base pigments

Every neutral derives from these. **Never write `white`, `black`, or a raw hex** — use a
token, and add one here if none fits.

| Token | OKLCH | Role |
|---|---|---|
| `--color-paper` | `#F6EEE2` | **the off-white** — a warm cream. Michi's "white" everywhere: page, light text on dark fills, check marks. Never `#fff` — paper, not a screen |
| `--color-navy`  | `oklch(0.220 0.042 264)` | **the dark.** Deep blue-black, never `#000` — the ink the app is drawn in |

Measured on the cream: ink **15.1:1**, muted **5.2:1**, faint **3.2:1**, accent **4.7:1** — all clear.
The cream is darker than a cool white, so `--ink-faint` and `--accent` are tuned *for it*;
re-measure all four if the paper ever changes again.

### Neutrals (surface)

Tinted **warm** (hue ~78) to sit on the cream paper rather than reading grey-blue against
it. `--bg` and `--ink` are aliases of the two pigments above, so the pair stays in charge.

| Token | OKLCH | Role |
|---|---|---|
| `--bg`        | = `--color-paper` | app background |
| `--surface`   | `oklch(0.938 0.014 78)` | raised fills, option buttons |
| `--surface-2` | `oklch(0.906 0.018 78)` | hover on surfaces |
| `--line`      | `oklch(0.872 0.019 78)` | hairline borders, the trace guide |
| `--ink`       | = `--color-navy` | primary text, the glyph |
| `--shadow-card` | `0 1px 3px navy/7%` | elevation, tinted with the ink rather than neutral black |

### Track hues (world map only)

The one place a third color family is allowed. Each **track** on the
[world map](../curriculum/world-map.md) is a real **Tokyo Metro line**, drawn in that
line's official color — so the hue is not decoration, it *is* the line's identity.

| Token | Hex | Line | Official |
|---|---|---|---|
| `--color-track-1` | `#FD9701` | Ginza 銀座線 | `#FF9500` |
| `--color-track-2` | `#F62E34` | Marunouchi 丸ノ内線 | `#F62E36` |
| `--color-track-3` | `#00BC87` | Chiyoda 千代田線 | `#00BB85` |
| `--color-track-4` | `#8F76D7` | Hanzomon 半蔵門線 | `#8F76D6` |
| `--color-track-5` | `#009BBF` | Tozai 東西線 | `#009BBF` |

Each is within 1–5/765 of the official value (community-documented hex; Tokyo Metro
publishes the color *names* but blocks automated fetches of a brand guideline). Keep any
new track hue on a real line rather than inventing one.

These are bright and vary widely in lightness, so they are used at **derived strengths**,
all `color-mix`ed from the one token — change the hex and everything follows:

| Use | Strength |
|---|---|
| path ink, station rings, card left edge (nothing textual on them) | full |
| a surface with light text on it (the nav track row) | 55% with `--ink` |
| the hue as small text on paper (card labels) | 55% with `--ink` |
| unwalked path ink — a track is identifiable *before* it's reached | 55% with `--bg` |

The constraints that keep this from breaking §2's discipline:

- **Never light text on a raw hue.** Paper text fails AA on all four (2.1–3.8:1); on the
  55% fill it clears every one (**4.9–7.0:1**, measured). Don't fade it with `opacity`
  either — the 10px `TRACK N` label has no headroom.
- **Grouping only, never state.** done/current/locked are carried by **shape and weight**:
  done = filled + check, current = thick ring + halo + ink-dark number + pin, locked =
  thin faint ring. No state has a hue of its own, so "you are here" reads identically on
  every track color. The map must survive `grayscale(1)` with every state still
  distinguishable — check that after any change here.
- **Vermilion no longer marks current state.** It was ~6° from `#F62E34` in OKLCH and lost
  its meaning on the red track; it's now reserved for focus rings and lesson/codex
  emphasis.
- **Categorical, never a ranking** — a track's hue says *which*, never *how far*.
- **Scoped to the map.** These do not appear in lessons, drills, or the codex.
- Declared in both `:root` and `@theme` — see the note in `globals.css` for why (runtime
  composition vs. Tailwind utilities). Keep the two in sync.

### Semantic (feedback)

Feedback is brief and corrective — a slip is normal and recoverable ([P6]). After
any selection, the correct option snaps larger in indigo while every alternative
fades. A wrong press resolves with the same animation focused on the actual answer,
directing attention toward what should be learned rather than emphasizing the error.
Answer glyphs use Klee One at 600 weight and a larger size so the state reads
immediately.

A correct press is more rewarding than a correction: it pops to 140%, gains a soft
glyph-only indigo glow, and fully dissolves the alternatives. A revealed answer after
a miss stays at the quieter 125% treatment. Neither animation rebounds or scales down.

> **Contrast** (measured on the `#F6EEE2` paper): `--ink` **15.1:1**; `--ink-muted`
> **5.2:1** (body ✓); `--ink-faint` **3.2:1** — large glyphs/labels only, not body copy;
> `--accent` **4.7:1** (✓ text and large UI); `--color-paper` on `--ink` **15.1:1**
> (button ✓). Re-check any new pairing against WCAG AA.

---

## 3. Typography

Full reasoning in [typography.md](./typography.md). Tokens:

| Token | Family | Use |
|---|---|---|
| `font-kana` | **Klee One** | every Japanese glyph — must match the tracing hand [P4] |
| `font-sans` | **system stack** | all Latin UI (default `font-sans`) |
| `font-jp`   | *Noto Sans JP (later)* | Japanese body text; not loaded until there's any |

- **The glyph is the display type.** No separate display font — the character *is*
  the hero. Sizes range `text-5xl` (grids) → `text-[9rem]` (teach/trace).
- Latin copy: one family (system), weight for hierarchy. Prompts `text-lg`
  `--ink-muted`; body caps at ~65ch; `text-balance` on headings.
- Never romaji as a reading aid ([P2]). `say`/`hint` are English pronunciation
  cues, styled as faint labels, never a Latin transliteration of the kana.

---

## 4. Layout & space

- **One thing per screen.** A step is a single centered column, `max-w-[600px]`,
  vertically centered with breathing room. No sidebars, no persistent chrome — just
  the step and a quiet ← Back.
- **Generous, varied space** — the emptiness is the design; it's what lets the
  character be loud. Don't fill it.
- Flexbox for the column; Grid only for the option rows.
- **No cards by reflex.** Option buttons are the one justified surface (they're
  tap targets). Never nest surfaces.
- Touch targets ≥44px (mobile-first — this ships to phones via Capacitor, [P9]).
- The four practice modes share one drill shell: `text-sm` muted prompts, `gap-8`
  vertical rhythm, and a 9rem/600-weight primary glyph where the task has one focal
  character. Multi-choice glyphs stay smaller so the full set remains scannable.
- Speak and Write confirm through the shared floating Next control; choice modes
  advance from the answer itself.
- Speak and Write keep question-level history: Back returns to the previous glyph,
  and Next returns to the glyph the learner left. On the first item, Back exits to
  the previous mode.

### Desktop keyboard

- `Space` replays the current sound whenever replay is available.
- `←` goes back and `→` advances only when the corresponding navigation action is
  available.
- The intro slide directly after Welcome teaches the shortcuts once with styled
  keycaps. Later desktop replay hints use the same placement above the bottom nav:
  `tap glyph or press [Space] to replay` for glyph controls and `[Space] key to
  replay` for the Listen control. The hint disappears after Space is used.
- Keyboard-only hints are hidden below the desktop breakpoint. Mobile always retains
  a clear 52px replay control or a tappable glyph, with tap-specific copy only.
- Listen drills invert that treatment on desktop: the replay button disappears in
  favor of a quiet Space hint, leaving the larger answer glyphs as the visual focus.

### Radius — small and quiet

No pills. Pills are the SaaS reflex; the primary button appears on nearly every
slide, so it must be *clearly noticeable but never in the way.*

| Token | Value | Use |
|---|---|---|
| `--radius`    | `6px`  | buttons — the default (`rounded-md`-ish) |
| `--radius-lg` | `12px` | option buttons, the trace canvas |

Small radius reads as "a tool," not "a product tour." One step above sharp so it
doesn't feel severe next to Klee's round handwriting.

---

## 5. Motion

Subtle, purposeful, **ease-out with no bounce** — this is a study tool, not a toy.

- Curve: `cubic-bezier(0.16, 1, 0.3, 1)` (ease-out-expo-ish). No elastic/spring.
- Steps slide in from the direction of travel (`step-enter`); reveal glyphs stagger
  in (`kana-rise`). Both already in `globals.css`.
- The answer state holds in place for ~1 second, then the drill advances.
- **Reduced motion is honored** (`prefers-reduced-motion` block exists) — animations
  collapse to near-instant, never removed entirely.
- Reach for a motion library (`motion`) only for the tracing drill's stroke
  animation; CSS covers everything else.

---

## 6. Components (current)

Small owned set on Tailwind v4 — **no component library** ([P10]: depth before
breadth; a UI kit is breadth). Aceternity-style effect kits are an explicit
anti-reference (§1).

| Component | Notes |
|---|---|
| `ContinueButton` / `ListenButton` | `--radius`, solid indigo `--ink` fill, white text; the primary action |
| Option button (`PickQuestion`) | Bare glyph or sound with a generous invisible hit area and no tile fill; Match options have no play icons and resolve with one sound only: the correct answer |
| Glyph button (teach / say-aloud) | the character IS the audio control; tap to replay |
| Trace canvas | placeholder; real version is the signature mechanic (ADR-0004) |
| Practice mode switcher | Listen · Match · Speak · Write; shared above the floating lesson nav |
| World map | The course as provinces (国) of tracks (線) of station circles (done / current / locked by shape, not color); each track in its own hue (see *Track hues* above). Move between tracks via bottom-left glide arrows, or tap the province / track name in the nav label for either list. Province boundaries show as a quiet dashed seam. Structure in [world-map.md](../curriculum/world-map.md) |

---

## 7. Tokens live where

**Wired.** The tokens live in a `@theme` block in `src/app/globals.css` as
`--color-*` / `--radius-*` keys, which generate the Tailwind utilities used across
`page.tsx` (`text-ink`, `bg-surface`, `rounded-[var(--radius-btn)]`,
…). No more stock `neutral`/`emerald`/`rose`. A dark theme, when added, overrides the
same `--color-*` vars under a `prefers-color-scheme` / `[data-theme]` block.

> **Tailwind v4 gotcha:** reference a radius var as `rounded-[var(--radius-btn)]`,
> not `rounded-[--radius-btn]` — the bare-property shorthand emits no rule and the
> corner silently renders sharp.
