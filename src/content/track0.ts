import { SCRIPTS, type Script } from "./scripts";

/**
 * Station 1 — "The three scripts."
 *
 * A read-through orientation station. It teaches no kana and seeds no SRS items;
 * it exists so the learner knows what they are looking at before Station 2 starts
 * drilling あいうえお. Every step is a tap-to-continue beat (session-flow.md §1:
 * read-this steps wait for a tap).
 */
export type ScriptStep =
  | { kind: "open" }
  | { kind: "script"; script: Script }
  | { kind: "romaji" } // named and set aside (P2) — deliberately NOT one of the scripts
  | { kind: "handoff" }; // "we start with hiragana, and with its five vowels"

export function buildTrack0(): ScriptStep[] {
  return [
    { kind: "open" },
    ...SCRIPTS.map((script): ScriptStep => ({ kind: "script", script })),
    { kind: "romaji" },
    { kind: "handoff" },
  ];
}
