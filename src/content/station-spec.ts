import { K_ROW, VOWELS } from "./hiragana";

export type StationType =
  | "orientation"
  | "acquisition"
  | "consolidation"
  | "application"
  | "assessment";

export type Capability = "sound-to-symbol" | "symbol-to-sound";

export interface ReviewTarget {
  itemId: string;
  capability: Capability;
}

export type StationPhase =
  | "prepare"
  | "review"
  | "orient"
  | "teach"
  | "connect"
  | "recall"
  | "use"
  | "checkpoint"
  | "close";

export interface StationApplication {
  description: string;
  /** Every learning item needed to perform the application. */
  itemIds: readonly string[];
}

export type CompletionContract =
  | {
      kind: "acknowledgement";
      evidence: string;
      message: string;
    }
  | {
      kind: "introduced-targets";
      targetKeys: readonly string[];
      mistakeRecovery: string;
      message: string;
    }
  | {
      kind: "mixed-items";
      itemIds: readonly string[];
      capabilities: readonly Capability[];
      mistakeRecovery: string;
      message: string;
    };

/**
 * The seven authored sections of a station. Runtime state, due dates, map position,
 * and React components deliberately do not belong here.
 */
export interface StationDefinition {
  identity: {
    id: string;
    type: StationType;
    title: string;
  };
  outcome: string;
  prerequisites: readonly ReviewTarget[];
  introducedCapabilities: readonly ReviewTarget[];
  learningSequence: readonly StationPhase[];
  application: StationApplication | null;
  completion: CompletionContract;
}

export function reviewTargetKey(target: ReviewTarget): string {
  return `${target.itemId}:${target.capability}`;
}

function targetsFor(itemIds: readonly string[]): ReviewTarget[] {
  return itemIds.flatMap((itemId) => [
    { itemId, capability: "sound-to-symbol" },
    { itemId, capability: "symbol-to-sound" },
  ] satisfies ReviewTarget[]);
}

const vowelIds = VOWELS.map((kana) => kana.id);
const kRowIds = K_ROW.map((kana) => kana.id);
const firstTenIds = [...vowelIds, ...kRowIds];
const vowelTargets = targetsFor(vowelIds);
const kRowTargets = targetsFor(kRowIds);

/** The first four stations expressed as data, in course order. */
export const FIRST_STATIONS: readonly StationDefinition[] = [
  {
    identity: { id: "three-scripts", type: "orientation", title: "The three scripts" },
    outcome: "Understand the three-script map and why the course begins with hiragana.",
    prerequisites: [],
    introducedCapabilities: [],
    learningSequence: ["orient", "use", "close"],
    application: null,
    completion: {
      kind: "acknowledgement",
      evidence: "The learner reaches the end of the short orientation.",
      message: "You know what the three scripts do and why hiragana comes first.",
    },
  },
  {
    identity: { id: "vowels", type: "acquisition", title: "First sounds" },
    outcome: "Connect あいうえお to their sounds in both directions.",
    prerequisites: [],
    introducedCapabilities: vowelTargets,
    learningSequence: ["orient", "teach", "connect", "recall", "checkpoint", "close"],
    application: null,
    completion: {
      kind: "introduced-targets",
      targetKeys: vowelTargets.map(reviewTargetKey),
      mistakeRecovery: "Reteach and requeue only the missed target after other questions.",
      message: "You connected the five vowel sounds to あいうえお in both directions.",
    },
  },
  {
    identity: { id: "k-row", type: "acquisition", title: "The K row" },
    outcome: "Connect かきくけこ to their sounds in both directions and decode えき.",
    prerequisites: vowelTargets,
    introducedCapabilities: kRowTargets,
    learningSequence: [
      "prepare",
      "review",
      "orient",
      "teach",
      "connect",
      "recall",
      "checkpoint",
      "use",
      "close",
    ],
    application: {
      description: "Decode えき; its meaning is ungraded context.",
      itemIds: ["hira_e", "hira_ki"],
    },
    completion: {
      kind: "introduced-targets",
      targetKeys: kRowTargets.map(reviewTargetKey),
      mistakeRecovery: "Reteach and requeue only the missed target after other questions.",
      message: "You connected the K-row sounds in both directions and decoded えき.",
    },
  },
  {
    identity: { id: "look-back-1", type: "consolidation", title: "A first look back" },
    outcome: "Retrieve the first ten hiragana from one mixed set and decode えき again.",
    prerequisites: [...vowelTargets, ...kRowTargets],
    introducedCapabilities: [],
    learningSequence: ["prepare", "review", "recall", "use", "close"],
    application: {
      description: "Decode えき again from the mixed first-ten set.",
      itemIds: ["hira_e", "hira_ki"],
    },
    completion: {
      kind: "mixed-items",
      itemIds: firstTenIds,
      capabilities: ["sound-to-symbol", "symbol-to-sound"],
      mistakeRecovery: "Reveal the association and requeue only the missed target.",
      message: "You recalled the first ten hiragana together and read えき again.",
    },
  },
];

function duplicates(values: readonly string[]): string[] {
  const seen = new Set<string>();
  const repeated = new Set<string>();
  for (const value of values) {
    if (seen.has(value)) repeated.add(value);
    seen.add(value);
  }
  return [...repeated];
}

/**
 * Validate authored course order. Returns all actionable errors so content authors can
 * repair a station in one pass instead of discovering problems one at a time.
 */
export function validateStationCourse(stations: readonly StationDefinition[]): string[] {
  const errors: string[] = [];
  const stationIds = stations.map((station) => station.identity.id);
  for (const id of duplicates(stationIds)) errors.push(`Duplicate station id: ${id}.`);

  const introducedTargets = new Set<string>();
  const introducedItems = new Set<string>();

  for (const station of stations) {
    const label = `Station ${station.identity.id}`;
    const prerequisiteKeys = station.prerequisites.map(reviewTargetKey);
    const introducedKeys = station.introducedCapabilities.map(reviewTargetKey);

    for (const key of duplicates(prerequisiteKeys)) {
      errors.push(`${label} repeats prerequisite ${key}.`);
    }
    for (const key of prerequisiteKeys) {
      if (!introducedTargets.has(key)) {
        errors.push(`${label} requires ${key}, but no earlier station introduces it.`);
      }
    }
    for (const key of duplicates(introducedKeys)) {
      errors.push(`${label} introduces ${key} more than once.`);
    }
    for (const key of introducedKeys) {
      if (introducedTargets.has(key)) {
        errors.push(`${label} reintroduces existing target ${key}.`);
      }
    }

    const availableItems = new Set(introducedItems);
    for (const target of station.introducedCapabilities) availableItems.add(target.itemId);
    for (const itemId of station.application?.itemIds ?? []) {
      if (!availableItems.has(itemId)) {
        errors.push(`${label} uses unintroduced item ${itemId} in its application.`);
      }
    }

    if (!station.outcome.trim()) errors.push(`${label} has no outcome.`);
    if (station.learningSequence.length === 0) errors.push(`${label} has no learning sequence.`);
    if (!station.completion.message.trim()) errors.push(`${label} has no completion message.`);

    if (station.completion.kind === "acknowledgement") {
      if (!station.completion.evidence.trim()) errors.push(`${label} has no completion evidence.`);
    } else {
      if (!station.completion.mistakeRecovery.trim()) {
        errors.push(`${label} does not explain how checkpoint mistakes recover.`);
      }
      if (station.completion.kind === "introduced-targets") {
        const expected = new Set(introducedKeys);
        const actual = new Set(station.completion.targetKeys);
        for (const key of expected) {
          if (!actual.has(key)) errors.push(`${label} completion omits introduced target ${key}.`);
        }
        for (const key of actual) {
          if (!expected.has(key)) errors.push(`${label} completion checks undeclared target ${key}.`);
        }
      } else {
        if (station.completion.itemIds.length === 0) {
          errors.push(`${label} mixed completion has no item coverage.`);
        }
        if (station.completion.capabilities.length === 0) {
          errors.push(`${label} mixed completion has no capability coverage.`);
        }
        for (const itemId of station.completion.itemIds) {
          if (!availableItems.has(itemId)) {
            errors.push(`${label} completion checks unintroduced item ${itemId}.`);
          }
        }
      }
    }

    for (const target of station.introducedCapabilities) {
      introducedTargets.add(reviewTargetKey(target));
      introducedItems.add(target.itemId);
    }
  }

  return errors;
}
