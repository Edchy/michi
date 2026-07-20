import { VOWELS, type Kana } from "./hiragana";
import type { QuestionType } from "./question";

/**
 * Module 1 — "The First Sounds" (あいうえお).
 * A module is an ordered queue of steps the learner walks through
 * (session-flow.md §1). Practice is *blocked then interleaved*: each drill type
 * is its own block, mastered in turn (easiest → hardest), then a final mixed
 * block interleaves them all as a consolidation capstone.
 */
export type Step =
  | { kind: "welcome" } // a warm intro before the first sound
  | { kind: "teach"; kana: Kana; first: boolean } // hear it, say it; first shows the tap hint
  | { kind: "reveal"; kana: Kana[] } // "these sounds have shapes" — the family
  | { kind: "drill"; pool: Kana[]; types: QuestionType[] } // one block; single-type or mixed
  | { kind: "done"; learned: Kana[] };

/** The drill blocks, in order: recognition → production → writing → mixed capstone. */
const DRILL_BLOCKS: QuestionType[][] = [
  ["hearPickChar"], // hear → pick the character   (ear → eye)
  ["seePickSound"], // see → pick the sound         (eye → ear)
  ["sayAloud"], // see → say it aloud            (production)
  ["trace"], // trace the character          (writing — placeholder)
  ["hearPickChar", "seePickSound", "sayAloud", "trace"], // the mix
];

export function buildModule1(): Step[] {
  const welcome: Step = { kind: "welcome" };
  const teach: Step[] = VOWELS.map((kana, i) => ({ kind: "teach", kana, first: i === 0 }));
  const reveal: Step = { kind: "reveal", kana: VOWELS };
  const drills: Step[] = DRILL_BLOCKS.map((types) => ({ kind: "drill", pool: VOWELS, types }));
  const done: Step = { kind: "done", learned: VOWELS };
  return [welcome, ...teach, reveal, ...drills, done];
}
