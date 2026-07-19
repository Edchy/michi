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

  it("reveals the family, then runs the drill, then done", () => {
    expect(steps[6]!.kind).toBe("reveal");
    expect(steps[7]!.kind).toBe("drill");
    expect(steps[8]!.kind).toBe("done");
    expect(steps).toHaveLength(9);
  });

  it("the drill carries the full pool of five vowels", () => {
    const drill = steps[7]!;
    expect(drill.kind).toBe("drill");
    if (drill.kind === "drill") expect(drill.pool).toHaveLength(5);
  });
});
