import { describe, it, expect } from "vitest";
import {
  newDrill,
  grade,
  drillProgress,
  MIN_OPTIONS,
  STREAK_TO_ADVANCE,
  type DrillState,
} from "./drill";

const POOL = 5;

/** Answer `n` questions correctly in a row from a state. */
function correctRun(state: DrillState, n: number): DrillState {
  for (let i = 0; i < n; i++) state = grade(state, true, POOL);
  return state;
}

describe("newDrill", () => {
  it("starts at the minimum option count, no streak, not done", () => {
    const s = newDrill();
    expect(s.options).toBe(MIN_OPTIONS);
    expect(s.streak).toBe(0);
    expect(s.done).toBe(false);
  });
});

describe("leveling up", () => {
  it("a full streak advances one option level and resets the streak", () => {
    const s = correctRun(newDrill(), STREAK_TO_ADVANCE);
    expect(s.options).toBe(MIN_OPTIONS + 1);
    expect(s.streak).toBe(0);
    expect(s.done).toBe(false);
  });

  it("needs exactly STREAK_TO_ADVANCE, not fewer", () => {
    const s = correctRun(newDrill(), STREAK_TO_ADVANCE - 1);
    expect(s.options).toBe(MIN_OPTIONS);
    expect(s.streak).toBe(STREAK_TO_ADVANCE - 1);
  });

  it("escalates 2 → 3 → 4 → 5 as streaks are hit", () => {
    let s = newDrill();
    const levels = [MIN_OPTIONS];
    for (let level = MIN_OPTIONS; level < POOL; level++) {
      s = correctRun(s, STREAK_TO_ADVANCE);
      levels.push(s.options);
    }
    expect(levels).toEqual([2, 3, 4, 5]);
  });
});

describe("a wrong answer", () => {
  it("resets the streak but keeps the level", () => {
    let s = correctRun(newDrill(), STREAK_TO_ADVANCE - 1); // streak building
    s = grade(s, false, POOL);
    expect(s.streak).toBe(0);
    expect(s.options).toBe(MIN_OPTIONS); // no level drop
    expect(s.done).toBe(false);
  });
});

describe("finishing", () => {
  it("mastering the top level (pool size) finishes the drill", () => {
    let s = newDrill();
    // climb to the top option level (5), then one more streak finishes it
    for (let level = MIN_OPTIONS; level < POOL; level++) s = correctRun(s, STREAK_TO_ADVANCE);
    expect(s.options).toBe(POOL);
    expect(s.done).toBe(false);
    s = correctRun(s, STREAK_TO_ADVANCE);
    expect(s.done).toBe(true);
  });

  it("is a no-op once done", () => {
    let s: DrillState = { options: POOL, streak: 0, done: true };
    s = grade(s, false, POOL);
    expect(s.done).toBe(true);
  });
});

describe("drillProgress", () => {
  it("is 0 at the start and 1 when done", () => {
    expect(drillProgress(newDrill(), POOL)).toBe(0);
    expect(drillProgress({ options: POOL, streak: 0, done: true }, POOL)).toBe(1);
  });

  it("increases monotonically as correct answers accumulate", () => {
    let s = newDrill();
    let last = drillProgress(s, POOL);
    for (let i = 0; i < 20; i++) {
      s = grade(s, true, POOL);
      const p = drillProgress(s, POOL);
      expect(p).toBeGreaterThanOrEqual(last);
      last = p;
    }
    expect(last).toBe(1);
  });

  it("moves within a level (streak advances the bar before leveling up)", () => {
    const s0 = newDrill();
    const s1 = grade(s0, true, POOL);
    expect(drillProgress(s1, POOL)).toBeGreaterThan(drillProgress(s0, POOL));
  });
});
