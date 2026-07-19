import { describe, it, expect } from "vitest";
import { buildModule1 } from "./module1";
import { VOWELS } from "./hiragana";

describe("buildModule1", () => {
  const steps = buildModule1();

  it("opens with a welcome, then teaches all five vowels in order", () => {
    expect(steps[0]!.kind).toBe("welcome");
    for (let i = 0; i < 5; i++) {
      const s = steps[i + 1]!;
      expect(s.kind).toBe("teach");
      if (s.kind === "teach") {
        expect(s.kana.id).toBe(VOWELS[i]!.id);
        expect(s.first).toBe(i === 0);
      }
    }
  });

  it("reveals the family, then checks each, then done", () => {
    expect(steps[6]!.kind).toBe("reveal");
    for (let i = 7; i < 12; i++) expect(steps[i]!.kind).toBe("recognize");
    expect(steps[12]!.kind).toBe("done");
    expect(steps).toHaveLength(13);
  });

  it("every recognize step includes its answer among options", () => {
    for (const s of steps) {
      if (s.kind === "recognize") {
        expect(s.options).toContain(s.answer);
        expect(s.options).toHaveLength(3);
      }
    }
  });
});
