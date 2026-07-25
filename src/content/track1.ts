import { VOWELS, type Kana } from "./hiragana";
import type { QuestionType } from "./question";

/**
 * Track 1 — "The First Sounds" (あいうえお).
 * A track is an ordered queue of steps the learner walks through
 * (session-flow.md §1). Practice is *blocked then interleaved*: each drill type
 * is its own block, mastered in turn (easiest → hardest), then a final mixed
 * block interleaves them all as a consolidation capstone.
 */
export type Step =
  | { kind: "intro" } // a brief explainer of what's about to happen
  | { kind: "teach"; kana: Kana } // hear it, say it
  | { kind: "reveal"; kana: Kana[] } // "these sounds have shapes" — the family
  | { kind: "context"; kana: Kana[] } // name hiragana after the learner has used it
  | { kind: "rehearse"; pool: Kana[] } // guided speaking, not an assessed drill
  | { kind: "drill"; pool: Kana[]; types: QuestionType[] } // one block; single-type or mixed
  | { kind: "done"; learned: Kana[] };

/** Recognition drills and a mixed capstone, after guided speaking rehearsal. */
const ASSESSED_DRILL_BLOCKS: QuestionType[][] = [
  ["hearPickChar"], // hear → pick the character   (ear → eye)
  ["seePickSound"], // see → pick the sound         (eye → ear)
  ["hearPickChar", "seePickSound"], // mixed recognition assessment
];

export function buildTrack1(): Step[] {
  const intro: Step = { kind: "intro" };
  const teach: Step[] = VOWELS.map((kana) => ({ kind: "teach", kana }));
  const reveal: Step = { kind: "reveal", kana: VOWELS };
  const speak: Step = { kind: "rehearse", pool: VOWELS };
  const context: Step = { kind: "context", kana: VOWELS };
  const drills: Step[] = ASSESSED_DRILL_BLOCKS.map((types) => ({ kind: "drill", pool: VOWELS, types }));
  const done: Step = { kind: "done", learned: VOWELS };
  return [intro, ...teach, reveal, context, ...drills, speak, done];
}
