import { K_ROW, VOWELS, type Kana } from "./hiragana";
import type { QuestionType } from "./question";

/**
 * The kana-teaching station shape, shared by station 2 (あいうえお) and station 3
 * (the k-row). A track is an ordered queue of steps the learner walks through
 * (session-flow.md §1). Practice is *blocked then interleaved*: each drill type
 * is its own block, mastered in turn (easiest → hardest), then a final mixed
 * block interleaves them all as a consolidation capstone.
 */
export type Step =
  | { kind: "intro" } // a brief explainer of what's about to happen
  // A refresher on earlier kana needs announcing first: dropping the learner into a
  // vowel drill on a station billed as the k row reads as a bug, not as revision.
  | { kind: "reviewIntro"; pool: Kana[] }
  // Open-book pairing: the whole set stays on screen while sounds play. Sits between
  // teaching and the graded drills so the sound-shape link is *built* before it is
  // tested. Without it the learner goes from one tap per glyph straight to picking
  // blind, which is guessing, and guessing teaches nothing.
  | { kind: "match"; pool: Kana[] }
  | { kind: "review"; pool: Kana[] } // warm up kana from earlier stations before adding more
  | { kind: "teach"; kana: Kana } // hear it, say it
  | { kind: "reveal"; kana: Kana[] } // "these sounds have shapes" — the family
  | { kind: "context"; kana: Kana[] } // name hiragana after the learner has used it
  | { kind: "read"; word: ReadableWord } // read a real word, built only from known kana
  | { kind: "rehearse"; pool: Kana[] } // guided speaking, not an assessed drill
  | { kind: "guidedTrace"; kana: Kana } // ungraded motor rehearsal with a faint guide
  // The gojūon table, with the row just learned landing into it. Ends the station by
  // placing the five new characters in the map of the whole set.
  | { kind: "grid" }
  | {
      kind: "drill";
      pool: Kana[];
      types: QuestionType[];
      role: "practice" | "checkpoint" | "consolidation";
    }
  | { kind: "done"; learned: Kana[] };

/** A word the learner can decode unaided, because every kana in it is already taught. */
export type ReadableWord = { kana: Kana[]; meaning: string; note: string };

/**
 * Recognition drills and a mixed capstone, easiest direction first.
 *
 * seePickSound keeps the glyph on screen while you choose, so it is recognition: the cue
 * is present the whole time. hearPickChar gives you nothing to look at until you commit,
 * which makes it recall-like and much harder on a set met minutes ago. Running it first
 * (as this did) meant guessing, and guessing teaches nothing.
 */
const ASSESSED_DRILL_BLOCKS: Array<{
  types: QuestionType[];
  role: "practice" | "checkpoint";
}> = [
  { types: ["seePickSound"], role: "practice" },
  { types: ["hearPickChar"], role: "practice" },
  { types: ["hearPickChar", "seePickSound"], role: "checkpoint" },
];

export function buildTrack1(): Step[] {
  const intro: Step = { kind: "intro" };
  const teach: Step[] = VOWELS.map((kana) => ({ kind: "teach", kana }));
  const reveal: Step = { kind: "reveal", kana: VOWELS };
  const match: Step = { kind: "match", pool: VOWELS };
  const speak: Step = { kind: "rehearse", pool: VOWELS };
  const traceA: Step = { kind: "guidedTrace", kana: VOWELS[0]! };
  const context: Step = { kind: "context", kana: VOWELS };
  const drills: Step[] = ASSESSED_DRILL_BLOCKS.map(({ types, role }) => ({
    kind: "drill", pool: VOWELS, types, role,
  }));
  const grid: Step = { kind: "grid" };
  const done: Step = { kind: "done", learned: VOWELS };
  return [intro, ...teach, reveal, match, context, ...drills, traceA, speak, grid, done];
}

/** こい — a carp, and the first word the learner can read unaided (こ + い). */
export const KOI: ReadableWord = {
  kana: [K_ROW[4]!, VOWELS[1]!],
  meaning: "carp",
  note: "The ornamental fish in Japanese ponds, often orange and white.",
};

/**
 * Station 3 — "The K row" (うえの).
 *
 * Same shape as station 2, with two additions its spec calls for: it opens by
 * reviewing the vowels (the learner has them now, so the station starts from what
 * they know), and it ends on reading こい, the first real word. The drill pool is
 * the k-row alone; mixing the vowels back in is station 4's consolidation job.
 */
export function buildTrack2(): Step[] {
  const intro: Step = { kind: "intro" };
  const reviewIntro: Step = { kind: "reviewIntro", pool: VOWELS };
  const review: Step = { kind: "review", pool: VOWELS };
  const teach: Step[] = K_ROW.map((kana) => ({ kind: "teach", kana }));
  const reveal: Step = { kind: "reveal", kana: K_ROW };
  const match: Step = { kind: "match", pool: K_ROW };
  const context: Step = { kind: "context", kana: K_ROW };
  const drills: Step[] = ASSESSED_DRILL_BLOCKS.map(({ types, role }) => ({
    kind: "drill", pool: K_ROW, types, role,
  }));
  const speak: Step = { kind: "rehearse", pool: K_ROW };
  const read: Step = { kind: "read", word: KOI };
  const grid: Step = { kind: "grid" };
  const done: Step = { kind: "done", learned: K_ROW };
  // `context` sits just before `read`, not back with the teaching: it now promises that
  // ten kana is enough for a real word, so it should land immediately before こい proves
  // it, rather than three drill blocks earlier where "where this station ends" is vague.
  return [intro, reviewIntro, review, ...teach, reveal, match, ...drills, speak, context, read, grid, done];
}

/** The first complete learning set: the vowels and k-row together. */
export const FIRST_TEN = [...VOWELS, ...K_ROW];

/**
 * Station 4 — "A first look back" (なかの).
 *
 * No new teaching and no new SRS seeds. The learner gets one open refresher,
 * one adaptive mixed-recall block across all ten kana, then reads こい again.
 * Keeping this as a short checkpoint makes consolidation feel like part of the
 * path rather than a second exam immediately after station 3.
 */
export function buildTrack3(): Step[] {
  const intro: Step = { kind: "intro" };
  const recall: Step = {
    kind: "drill",
    pool: FIRST_TEN,
    types: ["hearPickChar", "seePickSound"],
    role: "consolidation",
  };
  const read: Step = { kind: "read", word: KOI };
  const grid: Step = { kind: "grid" };
  const done: Step = { kind: "done", learned: [] };
  return [intro, recall, read, grid, done];
}
