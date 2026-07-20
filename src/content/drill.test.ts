import { describe, it, expect } from "vitest";
import { DrillProgress } from "./drill";

const IDS = ["a", "i", "u", "e", "o"];

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
