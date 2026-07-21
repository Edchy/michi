import { describe, it, expect } from "vitest";
import { ChoiceProgress, DrillProgress } from "./drill";

const IDS = ["a", "i", "u", "e", "o"];

describe("ChoiceProgress", () => {
  it("moves from two to five options after two consecutive correct answers at each level", () => {
    const p = new ChoiceProgress(5);
    expect(p.optionCount).toBe(2);

    for (const expected of [3, 4, 5]) {
      p.mark(true);
      expect(p.optionCount).toBe(expected - 1);
      p.mark(true);
      expect(p.optionCount).toBe(expected);
      expect(p.done).toBe(false);
    }

    p.mark(true);
    p.mark(true);
    expect(p.optionCount).toBe(5);
    expect(p.done).toBe(true);
  });

  it("resets the consistency streak after a miss without dropping a level", () => {
    const p = new ChoiceProgress(5);
    p.mark(true);
    p.mark(false);
    p.mark(true);
    expect(p.optionCount).toBe(2);
    p.mark(true);
    expect(p.optionCount).toBe(3);
  });
});

describe("DrillProgress", () => {
  it("is not done until every item has been correct", () => {
    const p = new DrillProgress(IDS);
    expect(p.done).toBe(false);
    for (const id of IDS.slice(0, 4)) p.mark(id, true);
    expect(p.done).toBe(false); // one still missing
    p.mark("o", true);
    expect(p.done).toBe(true);
  });

  it("a wrong answer does not count toward completion", () => {
    const p = new DrillProgress(IDS);
    for (const id of IDS) p.mark(id, false);
    expect(p.done).toBe(false);
  });

  it("an item stays satisfied once gotten right (a later miss doesn't un-do it)", () => {
    const p = new DrillProgress(IDS);
    for (const id of IDS) p.mark(id, true);
    expect(p.done).toBe(true);
    p.mark("a", false); // miss it again
    expect(p.done).toBe(true);
  });
});
