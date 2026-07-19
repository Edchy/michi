import { VOWELS, type Kana } from "./hiragana";

/**
 * Module 1 — "The First Sounds" (あいうえお).
 * A module is an ordered queue of steps the learner walks through
 * (session-flow.md §1):
 *  - welcome / teach / reveal / done : read-this steps → wait for a tap.
 *  - drill : an adaptive recognition drill → runs until mastered, then advances.
 */
export type Step =
  | { kind: "welcome" } // a warm intro before the first sound
  | { kind: "teach"; kana: Kana; first: boolean } // hear it, say it; first shows the tap hint
  | { kind: "reveal"; kana: Kana[] } // "these sounds have shapes" — the family
  | { kind: "drill"; pool: Kana[] } // adaptive "hear → pick" until mastered
  | { kind: "done"; learned: Kana[] };

export function buildModule1(): Step[] {
  const welcome: Step = { kind: "welcome" };
  const teach: Step[] = VOWELS.map((kana, i) => ({ kind: "teach", kana, first: i === 0 }));
  const reveal: Step = { kind: "reveal", kana: VOWELS };
  const drill: Step = { kind: "drill", pool: VOWELS };
  const done: Step = { kind: "done", learned: VOWELS };
  return [welcome, ...teach, reveal, drill, done];
}
