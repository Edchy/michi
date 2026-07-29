import { describe, it, expect } from "vitest";
import { buildTrack1, buildTrack2, buildTrack3, FIRST_TEN, KOI } from "./track1";
import { K_ROW, VOWELS } from "./hiragana";

describe("buildTrack1", () => {
  const steps = buildTrack1();

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
    expect(steps[7]!.kind).toBe("match");
    expect(steps[8]!.kind).toBe("context");
    expect(steps.at(-3)!.kind).toBe("rehearse");
    const drills = steps.filter((s) => s.kind === "drill");
    expect(drills).toHaveLength(3); // 2 single-type blocks + 1 mixed capstone
    // The station closes on the gojūon table: the vowel row landing in the whole set.
    expect(steps.at(-2)!.kind).toBe("grid");
    expect(steps.at(-1)!.kind).toBe("done");
  });

  it("drill blocks go single-type first, then the mixed capstone last", () => {
    const drills = steps.filter((s) => s.kind === "drill");
    // Easiest direction first: seePickSound keeps the glyph on screen while you choose,
    // hearPickChar shows nothing until you commit. Hard-first meant guessing.
    const singles = drills.slice(0, 2).map((d) => (d.kind === "drill" ? d.types : []));
    expect(singles).toEqual([["seePickSound"], ["hearPickChar"]]);
    // the capstone mixes only the two assessable recognition types
    const mix = drills[2];
    if (mix?.kind === "drill") {
      expect(mix.types).toEqual(["hearPickChar", "seePickSound"]);
      expect(mix.role).toBe("checkpoint");
    }
    expect(drills.slice(0, 2).map((drill) => drill.role)).toEqual(["practice", "practice"]);
  });

  it("every drill block carries the full pool of five vowels", () => {
    for (const d of steps) {
      if (d.kind === "drill") expect(d.pool).toHaveLength(5);
    }
  });
});

describe("buildTrack2 — the k-row station", () => {
  const steps = buildTrack2();

  it("reviews the vowels before teaching anything new", () => {
    expect(steps[0]!.kind).toBe("intro");
    const review = steps[2]!;
    expect(review.kind).toBe("review");
    if (review.kind === "review") expect(review.pool).toEqual(VOWELS);
    // the review must come before the first new character
    const firstTeach = steps.findIndex((s) => s.kind === "teach");
    expect(steps.findIndex((s) => s.kind === "review")).toBeLessThan(firstTeach);
  });

  // Dropping into a vowel drill unannounced reads as a bug, so the refresher is framed.
  it("announces the refresher immediately before the review drill", () => {
    const announce = steps.findIndex((s) => s.kind === "reviewIntro");
    const review = steps.findIndex((s) => s.kind === "review");
    expect(announce).toBeGreaterThan(-1);
    expect(review).toBe(announce + 1);
    const step = steps[announce]!;
    // it shows the pool being revised, so the switch back to あいうえお is visible
    if (step.kind === "reviewIntro") expect(step.pool).toEqual(VOWELS);
  });

  it("teaches all five k-row kana in gojūon order", () => {
    const taught = steps.flatMap((s) => (s.kind === "teach" ? [s.kana.id] : []));
    expect(taught).toEqual(K_ROW.map((k) => k.id));
  });

  // The context slide promises ten kana is enough for a real word, so it must sit
  // immediately before こい makes good on that rather than back with the teaching.
  it("sets up こい immediately before reading it", () => {
    const context = steps.findIndex((s) => s.kind === "context");
    const read = steps.findIndex((s) => s.kind === "read");
    expect(context).toBeGreaterThan(-1);
    expect(read).toBe(context + 1);
  });

  it("ends on reading こい, then the gojūon grid, then the done step", () => {
    const read = steps.at(-3)!;
    expect(read.kind).toBe("read");
    if (read.kind === "read") expect(read.word).toBe(KOI);
    expect(steps.at(-2)!.kind).toBe("grid");
    expect(steps.at(-1)!.kind).toBe("done");
  });

  it("drills only the new k-row; mixing the vowels back in is station 4's job", () => {
    for (const s of steps) {
      if (s.kind === "drill") expect(s.pool).toEqual(K_ROW);
    }
    const drills = steps.filter((s) => s.kind === "drill");
    expect(drills).toHaveLength(3);
  });

  // The defect this station shipped with: five glyphs taught one tap each, then straight
  // into a graded pick. That is guessing, not retrieval. Every kana-teaching station must
  // pair sound to shape open-book before anything is scored.
  it("pairs open-book before the first graded drill", () => {
    const match = steps.findIndex((s) => s.kind === "match");
    const firstDrill = steps.findIndex((s) => s.kind === "drill");
    expect(match).toBeGreaterThan(-1);
    expect(match).toBeLessThan(firstDrill);
    const step = steps[match]!;
    if (step.kind === "match") expect(step.pool).toEqual(K_ROW);
    // and it must come after teaching, or there is nothing to pair
    expect(steps.findIndex((s) => s.kind === "teach")).toBeLessThan(match);
  });

  // The "I can read this" moment only works if nothing in the word is unseen.
  it("こい uses only kana taught by the end of this station", () => {
    const known = new Set([...VOWELS, ...K_ROW].map((k) => k.id));
    for (const k of KOI.kana) expect(known).toContain(k.id);
    expect(KOI.kana.map((k) => k.glyph).join("")).toBe("こい");
  });
});

describe("buildTrack3 — the first look back", () => {
  const steps = buildTrack3();

  it("introduces no new kana and runs one mixed checkpoint across all ten", () => {
    expect(steps.some((step) => step.kind === "teach")).toBe(false);
    expect(steps.some((step) => step.kind === "match")).toBe(false);
    const drills = steps.filter((step) => step.kind === "drill");
    expect(drills).toHaveLength(1);
    const drill = drills[0]!;
    if (drill.kind === "drill") {
      expect(drill.pool).toEqual(FIRST_TEN);
      expect(drill.types).toEqual(["hearPickChar", "seePickSound"]);
      expect(drill.role).toBe("consolidation");
    }
  });

  it("re-reads こい before the progress grid and completion", () => {
    expect(steps.map((step) => step.kind)).toEqual([
      "intro",
      "drill",
      "read",
      "grid",
      "done",
    ]);
    const read = steps[2]!;
    if (read.kind === "read") expect(read.word).toBe(KOI);
    const done = steps.at(-1)!;
    if (done.kind === "done") expect(done.learned).toEqual([]);
  });
});
