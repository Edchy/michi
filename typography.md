# Typography

## Why Typeface Choice Matters More Than Usual

For most apps, typography is a visual preference. For a Japanese learning app, it's a pedagogical decision.

Many fonts write Japanese characters in stylized ways that differ from how they're actually taught in schools and written by hand. A learner who sees さ rendered one way on screen and then tries to write it differently in the drawing exercise gets confused. The font and the drawing mechanic must match. Pick the wrong typeface and you're actively undermining the teaching.

---

## The Three Typefaces

### 1. Klee One — Character Instruction
**Use for**: flashcard faces, drawing prompts, character introduction screens, hiragana/katakana reference grids.

Klee One is a Google Font designed to resemble natural, careful handwriting — exactly the style used in Japanese textbooks. When a learner sees a character in Klee One and then tries to draw it, they're copying the same form. No mismatch between what they see and what they're being taught to write.

This is the most important font choice in the app.

- Source: [Google Fonts — Klee One](https://fonts.google.com/specimen/Klee+One)
- Free, single import
- Covers hiragana, katakana, and kanji

---

### 2. Noto Sans JP — Japanese Body Text
**Use for**: vocabulary lists, example sentences, UI labels in Japanese, story text, grammar explanations containing Japanese characters.

Noto Sans JP is Google's universal Japanese typeface. The name "Noto" stands for "no tofu" — it was built so no character ever renders as an empty rectangle (called "tofu" by developers) because the font doesn't support it. At any size, on any device, every character renders correctly.

Clean, neutral, and highly legible. The safe workhorse for everything that isn't a direct teaching moment.

- Source: [Google Fonts — Noto Sans JP](https://fonts.google.com/noto/specimen/Noto+Sans+JP)
- Free, single import
- Covers hiragana, katakana, and 6,000+ kanji

---

### 3. Inter — English UI Text
**Use for**: menus, buttons, navigation, English instructions, headers, all Latin-script text.

Inter is the standard modern UI typeface — clean, neutral, optimized for screen readability at small sizes. It won't compete visually with the Japanese characters on screen and pairs comfortably with both Klee One and Noto Sans JP.

- Source: [Google Fonts — Inter](https://fonts.google.com/specimen/Inter)
- Free, single import

---

## When to Use Each

| Context | Typeface |
|---|---|
| Hiragana / katakana flashcard face | Klee One |
| Drawing exercise prompt character | Klee One |
| Character introduction screen | Klee One |
| Hiragana reference grid | Klee One |
| Vocabulary word (Japanese) | Noto Sans JP |
| Example sentences | Noto Sans JP |
| Story text | Noto Sans JP |
| Grammar notes (Japanese portions) | Noto Sans JP |
| All English UI (buttons, labels, menus) | Inter |
| Progress cards and stats | Inter |
| "Did you know" cultural notes | Inter |

---

## Loading All Three

All three are on Google Fonts and load with a single `<link>` tag or `@import`. No licensing, no cost, no self-hosting required (though self-hosting is recommended for performance and offline support via Capacitor).

```html
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Klee+One&family=Noto+Sans+JP:wght@400;500&display=swap" rel="stylesheet" />
```

For the Capacitor (offline) build, download the font files and bundle them with the app so they load without an internet connection.
