/**
 * Drill completion tracking (pure, minimal).
 *
 * Practice is blocked: each drill block runs until the learner is consistent,
 * then the module advances to the next block. "Consistent" here = every vowel in
 * the pool has been answered correctly. The shuffle bag guarantees each vowel
 * comes up, so this terminates; a wrong answer just means that vowel comes back.
 *
 * (No option-count escalation, no streak pips, no progress bar — a block is
 * simply done once all its items have been gotten right.)
 */

/** Track which item ids have been answered correctly at least once. */
export class DrillProgress {
  private readonly correct = new Set<string>();

  constructor(private readonly poolIds: string[]) {}

  /** Record an answer for an item. */
  mark(itemId: string, wasCorrect: boolean): void {
    if (wasCorrect) this.correct.add(itemId);
  }

  /** True once every item in the pool has been answered correctly. */
  get done(): boolean {
    return this.poolIds.every((id) => this.correct.has(id));
  }
}
