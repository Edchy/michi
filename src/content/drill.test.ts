import { describe, it, expect } from "vitest";
import { ChoiceProgress, DrillProgress } from "./drill";

const IDS = ["a", "i", "u", "e", "o"];

describe("ChoiceProgress", () => {
  it("takes three correct answers at two options, then two at each later level", () => {
    const p = new ChoiceProgress(5);
    expect(p.optionCount).toBe(2);

    p.mark(true);
    p.mark(true);
    expect(p.optionCount).toBe(2);
    p.mark(true);
    expect(p.optionCount).toBe(3);

    for (const expected of [4, 5]) {
      p.mark(true);
      p.mark(true);
      expect(p.optionCount).toBe(expected);
    }

    p.mark(true);
    p.mark(true);
    expect(p.optionCount).toBe(5);
    expect(p.done).toBe(true);
  });

  it("moves mastery backward on a miss and resets the correct streak", () => {
    const p = new ChoiceProgress(5);
    p.mark(true);
    expect(p.masteryPoints).toBe(1);
    p.mark(false);
    expect(p.masteryPoints).toBe(0);
    p.mark(true);
    expect(p.optionCount).toBe(2);
    p.mark(true);
    expect(p.optionCount).toBe(2);
    p.mark(true);
    expect(p.optionCount).toBe(3);
  });

  it("drops a level after two consecutive misses, but not after one", () => {
    const p = new ChoiceProgress(5);
    p.mark(true);
    p.mark(true);
    p.mark(true);
    expect(p.optionCount).toBe(3);

    p.mark(false);
    expect(p.optionCount).toBe(3);
    p.mark(false);
    expect(p.optionCount).toBe(2);
  });

  it("a correct answer clears the miss streak", () => {
    const p = new ChoiceProgress(5);
    p.mark(true);
    p.mark(true);
    p.mark(true);
    p.mark(false);
    p.mark(true);
    p.mark(false);
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
