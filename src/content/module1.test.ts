import { describe, it, expect } from "vitest";
import { buildModule1 } from "./module1";
import { VOWELS } from "./hiragana";

describe("buildModule1", () => {
  const steps = buildModule1();

  it("opens with a welcome and an intro, then teaches all five vowels in order", () => {
    expect(steps[0]!.kind).toBe("welcome");
    expect(steps[1]!.kind).toBe("intro");
    for (let i = 0; i < 5; i++) {
      const s = steps[i + 2]!;
      expect(s.kind).toBe("teach");
      if (s.kind === "teach") {
        expect(s.kana.id).toBe(VOWELS[i]!.id);
      }
    }
  });

  it("reveals the family, then runs sequential drill blocks, then done", () => {
    expect(steps[7]!.kind).toBe("reveal");
    const drills = steps.filter((s) => s.kind === "drill");
    expect(drills).toHaveLength(5); // 4 single-type blocks + 1 mixed capstone
    expect(steps[steps.length - 1]!.kind).toBe("done");
  });

  it("drill blocks go single-type first, then the mixed capstone last", () => {
    const drills = steps.filter((s) => s.kind === "drill");
    // first four are single-type, in order
    const singles = drills.slice(0, 4).map((d) => (d.kind === "drill" ? d.types : []));
    expect(singles).toEqual([["hearPickChar"], ["seePickSound"], ["sayAloud"], ["trace"]]);
    // last block mixes all types
    const mix = drills[4];
    if (mix?.kind === "drill") expect(mix.types.length).toBeGreaterThan(1);
  });

  it("every drill block carries the full pool of five vowels", () => {
    for (const d of steps) {
      if (d.kind === "drill") expect(d.pool).toHaveLength(5);
    }
  });
});
