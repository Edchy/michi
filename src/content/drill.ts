/**
 * Drill completion tracking (pure, minimal).
 *
 * Practice is blocked: each drill block runs until the learner is consistent,
 * then the module advances to the next block. Choice drills use a progressive
 * difficulty ladder; production drills require every item in the pool once.
 */

/** Progressive choice difficulty: two consecutive correct answers unlock the
 * next option count. A miss resets the streak, but never removes a level. */
export class ChoiceProgress {
  private streak = 0;
  private complete = false;
  private currentOptions: number;

  constructor(
    private readonly maxOptions: number,
    private readonly correctToAdvance = 2,
  ) {
    this.currentOptions = Math.min(2, maxOptions);
  }

  mark(wasCorrect: boolean): void {
    if (this.complete) return;
    if (!wasCorrect) {
      this.streak = 0;
      return;
    }

    this.streak += 1;
    if (this.streak < this.correctToAdvance) return;

    this.streak = 0;
    if (this.currentOptions < this.maxOptions) this.currentOptions += 1;
    else this.complete = true;
  }

  get optionCount(): number {
    return this.currentOptions;
  }

  get done(): boolean {
    return this.complete;
  }
}

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
