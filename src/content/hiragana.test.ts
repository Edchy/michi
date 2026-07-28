import { readdirSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { K_ROW, VOWELS } from "./hiragana";

describe("pronunciation prompts", () => {
  it("provides multiple non-empty variants for every kana", () => {
    for (const kana of [...VOWELS, ...K_ROW]) {
      expect(kana.hints.length).toBeGreaterThanOrEqual(3);
      expect(kana.hints.every((hint) => hint.trim().length > 0)).toBe(true);
    }
  });
});

// English spells two different vowels "oo" (long: food; short: look). う and く are the
// short one, so a hint that just says "oo" leaves the learner guessing which.
describe("the ambiguous \"oo\" sound", () => {
  it("pins down which \"oo\" is meant for う and く", () => {
    for (const kana of [...VOWELS, ...K_ROW]) {
      if (!kana.reading.endsWith("u")) continue;
      const first = kana.hints[0]!;
      expect(first, `${kana.glyph} leads with an unqualified "oo"`).toMatch(/look|book/);
    }
  });
});

describe("the k-row", () => {
  it("runs the k sound across the five vowels in gojūon order", () => {
    expect(K_ROW.map((k) => k.reading)).toEqual(["ka", "ki", "ku", "ke", "ko"]);
    expect(K_ROW.map((k) => k.glyph)).toEqual(["か", "き", "く", "け", "こ"]);
  });

  // Teach and drill steps play every kana, so a missing clip is a silent lesson.
  // Both formats are shipped (webm for the browsers that take it, mp3 as fallback),
  // so a gap in either one is silence for whoever lands on that branch.
  it.each(["webm", "mp3"])("has a %s clip for every kana", (ext) => {
    const clips = new Set(
      readdirSync("public/audio/hiragana")
        .filter((f) => f.endsWith(`.${ext}`))
        .map((f) => f.replace(new RegExp(`\\.${ext}$`), "")),
    );
    for (const kana of [...VOWELS, ...K_ROW]) {
      expect(clips, kana.glyph).toContain(kana.id);
    }
  });
});
