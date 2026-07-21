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
by *meaning*. All values OKLCH.

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
| `--accent`        | `oklch(0.585 0.181 32)` | rare emphasis, "the path" |
| `--accent-hover`  | `oklch(0.530 0.181 32)` | hover/pressed |
| `--accent-weak`   | `oklch(0.955 0.030 32)` | quiet tint when the accent needs a surface |

### 藍 Indigo — the ink (near-black) & primary action

The ink is indigo rather than a warm-tinted black — cool, deep, structural.

| Token | OKLCH | Role |
|---|---|---|
| `--ink`       | `oklch(0.250 0.045 264)` | primary text, the character, primary button fill |
| `--ink-muted` | `oklch(0.520 0.030 264)` | secondary text, prompts |
| `--ink-faint` | `oklch(0.680 0.022 264)` | hints, sound labels under glyphs |

### Neutrals (surface)

Barely-tinted toward the indigo ink (≤0.006 chroma) — cool paper, never cream/sand.

| Token | OKLCH | Role |
|---|---|---|
| `--bg`        | `oklch(0.992 0.002 264)` | app background (near-paper off-white) |
| `--surface`   | `oklch(0.968 0.004 264)` | raised fills, option buttons |
| `--surface-2` | `oklch(0.938 0.005 264)` | hover on surfaces |
| `--line`      | `oklch(0.900 0.005 264)` | hairline borders, the trace guide |

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

> **Contrast:** `--ink` (indigo) on `--bg` ≈ 12:1; `--ink-muted` on `--bg` ≈ 5.5:1
> (body ✓); `--ink-faint` is for large glyphs/labels only, not body copy. `--accent`
> on `--bg` ≈ 4.9:1 (✓ for text and large UI); white on `--ink` ≈ 12:1 (button ✓).
> Re-check any new pairing against WCAG AA.

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
