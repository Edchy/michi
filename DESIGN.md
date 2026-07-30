---
name: Michi
description: A calm Japanese learning journey guided like a transit line.
colors:
  signal-yellow: "#FFD43B"
  signal-yellow-hover: "#F2C62D"
  sign-black: "#111318"
  station-white: "#FAFAF7"
  platform-gray: "#F0EFE9"
  rail-gray: "#C9C7BE"
  muted-ink: "#555960"
  vermilion: "#C94735"
typography:
  title:
    fontFamily: "system-ui, sans-serif"
    fontSize: "1.5rem"
    fontWeight: 600
    lineHeight: 1.25
  body:
    fontFamily: "system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "system-ui, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 700
    lineHeight: 1
rounded:
  sign: "6px"
  surface: "12px"
spacing:
  control-x: "18px"
  control-y: "14px"
  touch: "44px"
components:
  button-forward:
    backgroundColor: "{colors.signal-yellow}"
    textColor: "{colors.sign-black}"
    typography: "{typography.label}"
    rounded: "{rounded.sign}"
    padding: "14px 18px"
  button-secondary:
    backgroundColor: "{colors.station-white}"
    textColor: "{colors.sign-black}"
    typography: "{typography.label}"
    rounded: "{rounded.sign}"
    padding: "14px 18px"
---

# Design System: Michi

## 1. Overview

**Creative North Star: “The Learning Line”**

Michi behaves like excellent Japanese transit wayfinding: bold enough to read without
hesitation, quiet enough to disappear once the route is understood, and consistent
enough that a learner never has to relearn the controls. Yellow marks movement and the
current teaching focus; black supplies structure; near-white keeps the lesson open and
calm.

The world may become playful through routes, stamps, collections, and milestones. The
interface itself remains disciplined. It rejects childish learning-app chrome, fake
Japanese ornament, low-contrast neumorphism, and one-off controls.

**Key Characteristics:**

- High-contrast signage silhouettes.
- One obvious forward action.
- Rectangular controls throughout; no circular button family.
- Flat at rest, tactile through borders and press states.
- Track colors identify routes rather than control importance.

## 2. Colors

The palette borrows the decisiveness of Japanese subway exit signage without imitating
a station literally.

### Primary

- **Signal Yellow** (`#FFD43B`): forward movement, completion handoff, and the focused
  teaching sign on a lesson slide.
- **Sign Black** (`#111318`): text, icons, strong borders, and structural controls.

### Secondary

- **Vermilion** (`#C94735`): focus emphasis, correction, and rare instructional marks;
  never a competing general action color.

### Neutral

- **Station White** (`#FAFAF7`): page and secondary-control ground.
- **Platform Gray** (`#F0EFE9`): quiet raised surfaces and disabled controls.
- **Rail Gray** (`#C9C7BE`): dividers, incomplete paths, and non-interactive outlines.
- **Muted Ink** (`#555960`): supporting prose that still meets AA contrast.

**The Route Color Rule.** Track colors identify where something belongs. They do not
replace Signal Yellow as the action hierarchy.

**The Yellow Sign Rule.** Yellow marks either the next movement or the content currently
being taught, revealed, or checked. It is never an unrelated decorative fill.

## 3. Typography

**Display Font:** system UI sans-serif
**Body Font:** system UI sans-serif
**Japanese Font:** Klee One

**Character:** Interface text is direct, open, and sturdy like passenger information.
Klee One is reserved for Japanese content and writing references, not UI labels.

### Hierarchy

- **Headline** (600, 1.5rem, 1.25): one teaching idea or station state.
- **Title** (600, 1.25rem, 1.3): supporting section titles.
- **Body** (400, 1rem, 1.6): explanations, capped near 65 characters per line.
- **Label** (700, 0.875rem, 1): control text; sentence case, never decorative tracking.

**The Passenger Language Rule.** Text labels describe the learner's destination or
result: “Reveal shape,” “Path,” “Next.” The familiar speaker mark is the sole icon-only
action and always carries an accessible label and tooltip.

**Copy punctuation:** do not use em dashes in learner-facing text. Prefer a period,
comma, colon, or parentheses, choosing whichever makes the thought easiest to scan.

## 4. Elevation

Michi is flat by default. Borders and contrasting fills establish hierarchy. A compact
shadow may separate floating navigation from moving lesson content, but buttons do not
use ambient neumorphic shadows.

### Shadow Vocabulary

- **Floating control** (`0 2px 6px rgb(17 19 24 / 0.12)`): the fixed station-navigation
  cluster only.

**The Physical Sign Rule.** A control earns tactility through a firm border and a small
pressed translation, not a diffuse glow.

## 5. Components

### Buttons

- **Shape:** rectangular sign with a restrained 6px radius and a 2px black border.
- **Forward:** Signal Yellow fill, Sign Black label; one per screen or control cluster.
- **Secondary:** Station White fill, Sign Black label and border.
- **Quiet:** Platform Gray fill and reduced border contrast, but still visibly a control.
- **Hover / Focus / Active:** darken the fill on hover, use a 3px high-contrast focus
  outline, and translate down 1px while pressed.
- **Icon use:** the speaker control is an icon-only sign matching the Path button's
  dimensions. Other unfamiliar actions include text. No circular button language.
- **Icon source:** generic interface actions use Lucide at a consistent 1.8 stroke
  weight. Custom SVGs are reserved for Michi-specific concepts such as its route mark,
  world map, and authored kana stroke guides.
- **Size:** minimum 44px height and width.

### Cards / Containers

- **Corner Style:** 12px only for lesson surfaces; controls keep the tighter sign radius.
- **Background:** Station White or Platform Gray.
- **Shadow Strategy:** none at rest.
- **Border:** use Rail Gray when containment needs to be explicit.

### Inputs / Fields

- **Style:** Station White, 2px Sign Black border, 6px radius.
- **Focus:** 3px Signal Yellow outline with black border preserved.
- **Error / Disabled:** errors use text plus Vermilion; disabled fields use Platform Gray.

### Navigation

Station navigation is a single sign row labelled **Back**, **Path**, and **Next**. The
current forward destination uses Signal Yellow. On a completion slide, **Path** becomes
the forward action and carries the completion query; no duplicate return button appears
in the lesson content.

### Audio controls

Every explicit playback action uses the same speaker-sign button, sized to match Path.
Its visible
mark is the speaker alone; **Play sound** or **Replay sound** remains available through
its accessible label and tooltip. When a slide has playable audio, the control occupies
one fixed place at the top of the station navigation, above progress and **Path**. This is the only
manual playback pattern: glyphs,
words, yellow teaching signs, and answer cards are never secretly clickable for sound.
Audio may still play automatically when a teaching step appears or as answer feedback;
manual replay always returns to the square speaker sign.

## 6. Do's and Don'ts

### Do:

- **Do** use Signal Yellow for the next meaningful movement or the current teaching sign.
- **Do** make the same action look and read the same in every station.
- **Do** pair color with labels, borders, state, or shape.
- **Do** keep controls at least 44 by 44 pixels with visible keyboard focus.
- **Do** let the map carry route color and playful progression.

### Don't:

- **Don't** mix circular, square, text-only, and floating-icon versions of one action.
- **Don't** show two controls that lead to the same destination on one screen.
- **Don't** use childish or noisy language-learning chrome.
- **Don't** use streak pressure, depleted lives, punitive loss, or rewards for empty
  repetition.
- **Don't** add generic currencies, XP clutter, or attention-seeking celebration.
- **Don't** use decorative or stereotyped Japanese styling without a functional reason.
- **Don't** use low-contrast neumorphism or diffuse button shadows.
