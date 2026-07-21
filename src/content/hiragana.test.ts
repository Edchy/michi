import { describe, expect, it } from "vitest";
import { VOWELS } from "./hiragana";

describe("vowel pronunciation prompts", () => {
  it("provides multiple non-empty variants for every vowel", () => {
    for (const vowel of VOWELS) {
      expect(vowel.hints.length).toBeGreaterThanOrEqual(3);
      expect(vowel.hints.every((hint) => hint.trim().length > 0)).toBe(true);
    }
  });
});
