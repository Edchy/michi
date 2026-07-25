import { describe, it, expect } from "vitest";
import { buildTrack0 } from "./track0";
import { SCRIPTS } from "./scripts";

describe("buildTrack0 — the three-scripts orientation station", () => {
  const steps = buildTrack0();

  it("opens, covers the three scripts in order, sets romaji aside, then hands off", () => {
    expect(steps[0]!.kind).toBe("open");
    expect(steps.at(-2)!.kind).toBe("romaji");
    expect(steps.at(-1)!.kind).toBe("handoff");

    const scripts = steps.flatMap((s) => (s.kind === "script" ? [s.script.id] : []));
    expect(scripts).toEqual(["hiragana", "katakana", "kanji"]);
  });

  it("romaji is named but is not one of the scripts (P2)", () => {
    expect(steps.filter((s) => s.kind === "romaji")).toHaveLength(1);
    expect(SCRIPTS.some((s) => (s.id as string) === "romaji")).toBe(false);
  });

  it("stays light: exactly one example word per script", () => {
    for (const script of SCRIPTS) {
      expect(script.words).toHaveLength(1);
    }
  });
});

describe("script example words", () => {
  it("every syllable carries a kana id an audio clip can be keyed by", () => {
    for (const script of SCRIPTS) {
      for (const word of script.words) {
        expect(word.syllables.length).toBeGreaterThan(0);
        for (const s of word.syllables) {
          expect(s.id).toMatch(/^hira_[a-z]+$/);
          expect(s.glyph).not.toBe("");
        }
      }
    }
  });
});
