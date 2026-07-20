import { describe, it, expect } from "vitest";
import { makeQuestion, type QuestionType } from "./question";
import { VOWELS } from "./hiragana";

describe("makeQuestion — pick types", () => {
  for (const type of ["hearPickChar", "seePickSound"] as QuestionType[]) {
    it(`${type}: answer is among the options, correct count, no dupes`, () => {
      for (let i = 0; i < 50; i++) {
        const q = makeQuestion(VOWELS, type, 3);
        expect(q.options).toContain(q.answer);
        expect(q.options).toHaveLength(3);
        expect(new Set(q.options.map((k) => k.id)).size).toBe(3); // distinct
      }
    });
  }

  it("respects the requested option count", () => {
    expect(makeQuestion(VOWELS, "hearPickChar", 2).options).toHaveLength(2);
    expect(makeQuestion(VOWELS, "hearPickChar", 5).options).toHaveLength(5);
  });

  it("avoids repeating the previous answer when asked", () => {
    for (let i = 0; i < 50; i++) {
      const q = makeQuestion(VOWELS, "hearPickChar", 2, "hira_a");
      expect(q.answer.id).not.toBe("hira_a");
    }
  });
});

describe("makeQuestion — sayAloud", () => {
  it("has an answer but no options", () => {
    const q = makeQuestion(VOWELS, "sayAloud", 3);
    expect(q.answer).toBeDefined();
    expect(q.options).toHaveLength(0);
  });
});
