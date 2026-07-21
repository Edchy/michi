import { describe, it, expect } from "vitest";
import { buildModule1 } from "./module1";
import { VOWELS } from "./hiragana";

describe("buildModule1", () => {
  const steps = buildModule1();

  it("opens with an intro, then teaches all five vowels in order", () => {
    expect(steps[0]!.kind).toBe("intro");
    for (let i = 0; i < 5; i++) {
      const s = steps[i + 1]!;
      expect(s.kind).toBe("teach");
      if (s.kind === "teach") {
        expect(s.kana.id).toBe(VOWELS[i]!.id);
      }
    }
  });

  it("reveals the family, adds context, then assesses before speaking rehearsal", () => {
    expect(steps[6]!.kind).toBe("reveal");
    expect(steps[7]!.kind).toBe("context");
    expect(steps[steps.length - 2]!.kind).toBe("rehearse");
    const drills = steps.filter((s) => s.kind === "drill");
    expect(drills).toHaveLength(3); // 2 single-type blocks + 1 mixed capstone
    expect(steps[steps.length - 1]!.kind).toBe("done");
  });

  it("drill blocks go single-type first, then the mixed capstone last", () => {
    const drills = steps.filter((s) => s.kind === "drill");
    // first two are single-type, in order
    const singles = drills.slice(0, 2).map((d) => (d.kind === "drill" ? d.types : []));
    expect(singles).toEqual([["hearPickChar"], ["seePickSound"]]);
    // the capstone mixes only the two assessable recognition types
    const mix = drills[2];
    if (mix?.kind === "drill") {
      expect(mix.types).toEqual(["hearPickChar", "seePickSound"]);
    }
  });

  it("every drill block carries the full pool of five vowels", () => {
    for (const d of steps) {
      if (d.kind === "drill") expect(d.pool).toHaveLength(5);
    }
  });
});
