import type { Kana } from "./hiragana";

/**
 * Adaptive recognition drill state machine (pure).
 *
 * The learner hears a sound and picks the matching character. Difficulty is the
 * number of options shown. It starts small and escalates as they prove mastery:
 *
 *   - Start at MIN_OPTIONS (2) options.
 *   - A streak of STREAK_TO_ADVANCE correct-in-a-row levels up: +1 option.
 *   - A wrong answer resets the streak but keeps the current level (gentle).
 *   - Mastering the top level (options == pool size) finishes the drill.
 *
 * Escalation: 2 → 3 → 4 → 5 options for the five vowels.
 */

export const MIN_OPTIONS = 2;
export const STREAK_TO_ADVANCE = 3;

export interface DrillState {
  options: number; // how many choices this question shows
  streak: number; // consecutive correct at the current level
  done: boolean; // whole drill mastered
}

/** Fresh drill for a pool of `poolSize` items. */
export function newDrill(): DrillState {
  return { options: MIN_OPTIONS, streak: 0, done: false };
}

/**
 * Apply an answer. `correct` = did the learner pick the right character.
 * `poolSize` is the number of distinct items (the max option count / top level).
 */
export function grade(state: DrillState, correct: boolean, poolSize: number): DrillState {
  if (state.done) return state;

  if (!correct) {
    return { ...state, streak: 0 }; // reset streak, stay at level
  }

  const streak = state.streak + 1;
  if (streak < STREAK_TO_ADVANCE) {
    return { ...state, streak };
  }

  // hit the streak → level up, or finish if already at the top level
  const topLevel = Math.min(poolSize, MAX_OPTIONS_CAP);
  if (state.options >= topLevel) {
    return { ...state, streak, done: true };
  }
  return { options: state.options + 1, streak: 0, done: false };
}

/** Safety cap so a huge pool doesn't demand an unreasonable number of buttons. */
const MAX_OPTIONS_CAP = 5;

/**
 * Progress toward finishing the drill, in [0, 1]. Combines how far up the option
 * ladder the learner has climbed with their streak within the current level, so
 * the progress bar advances on every correct answer instead of sitting frozen.
 */
export function drillProgress(state: DrillState, poolSize: number): number {
  if (state.done) return 1;
  const topLevel = Math.min(poolSize, MAX_OPTIONS_CAP);
  const levels = topLevel - MIN_OPTIONS + 1; // e.g. 2..5 → 4 levels
  const levelIndex = state.options - MIN_OPTIONS; // 0-based level reached
  const withinLevel = Math.min(state.streak, STREAK_TO_ADVANCE) / STREAK_TO_ADVANCE;
  return (levelIndex + withinLevel) / levels;
}
