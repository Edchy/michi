import { VOWELS, type Kana } from "./hiragana";

/**
 * Module 1 — "The First Sounds" (あいうえお).
 * A module is an ordered queue of steps the learner walks through
 * (session-flow.md §1). Two kinds:
 *  - teach / reveal / done : read-this steps → wait for a tap.
 *  - recognize             : exercise steps → check answer, auto-advance.
 */
export type Step =
  | { kind: "welcome" } // a warm intro before the first sound
  | { kind: "teach"; kana: Kana; first: boolean } // hear it, say it; first shows the tap hint
  | { kind: "reveal"; kana: Kana[] } // "these sounds have shapes" — the family
  | { kind: "recognize"; answer: Kana; options: Kana[] } // hear → pick the character
  | { kind: "done"; learned: Kana[] };

/** Deterministic small shuffle so option order varies but stays reproducible. */
function pick<T>(all: T[], answer: T, count: number, seed: number): T[] {
  const others = all.filter((x) => x !== answer);
  for (let i = others.length - 1; i > 0; i--) {
    seed = (seed * 1103515245 + 12345) & 0x7fffffff;
    const j = seed % (i + 1);
    [others[i], others[j]] = [others[j]!, others[i]!];
  }
  const chosen = [answer, ...others.slice(0, count - 1)];
  for (let i = chosen.length - 1; i > 0; i--) {
    seed = (seed * 1103515245 + 12345) & 0x7fffffff;
    const j = seed % (i + 1);
    [chosen[i], chosen[j]] = [chosen[j]!, chosen[i]!];
  }
  return chosen;
}

export function buildModule1(): Step[] {
  const welcome: Step = { kind: "welcome" };
  const teach: Step[] = VOWELS.map((kana, i) => ({ kind: "teach", kana, first: i === 0 }));
  const reveal: Step = { kind: "reveal", kana: VOWELS };
  const recognize: Step[] = VOWELS.map((answer, i) => ({
    kind: "recognize",
    answer,
    options: pick(VOWELS, answer, 3, i + 1),
  }));
  const done: Step = { kind: "done", learned: VOWELS };
  return [welcome, ...teach, reveal, ...recognize, done];
}
