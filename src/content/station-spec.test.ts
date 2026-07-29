import { describe, expect, it } from "vitest";
import {
  FIRST_STATIONS,
  validateStationCourse,
  type StationDefinition,
} from "./station-spec";

function replaceStation(
  id: string,
  change: (station: StationDefinition) => StationDefinition,
): StationDefinition[] {
  return FIRST_STATIONS.map((station) =>
    station.identity.id === id ? change(station) : station,
  );
}

describe("validateStationCourse", () => {
  it("accepts the first four approved station definitions", () => {
    expect(validateStationCourse(FIRST_STATIONS)).toEqual([]);
  });

  it("catches a prerequisite that no earlier station introduces", () => {
    const stations = replaceStation("k-row", (station) => ({
      ...station,
      prerequisites: [
        ...station.prerequisites,
        { itemId: "hira_sa", capability: "symbol-to-sound" },
      ],
    }));

    expect(validateStationCourse(stations)).toContain(
      "Station k-row requires hira_sa:symbol-to-sound, but no earlier station introduces it.",
    );
  });

  it("catches application material the learner has not met", () => {
    const stations = replaceStation("k-row", (station) => ({
      ...station,
      application: { description: "Too early.", itemIds: ["hira_sa"] },
    }));

    expect(validateStationCourse(stations)).toContain(
      "Station k-row uses unintroduced item hira_sa in its application.",
    );
  });

  it("catches an incomplete acquisition checkpoint", () => {
    const stations = replaceStation("vowels", (station) => {
      if (station.completion.kind !== "introduced-targets") throw new Error("wrong fixture");
      return {
        ...station,
        completion: {
          ...station.completion,
          targetKeys: station.completion.targetKeys.filter(
            (key) => key !== "hira_a:sound-to-symbol",
          ),
        },
      };
    });

    expect(validateStationCourse(stations)).toContain(
      "Station vowels completion omits introduced target hira_a:sound-to-symbol.",
    );
  });

  it("catches an ambiguous mixed checkpoint and missing mistake recovery", () => {
    const stations = replaceStation("look-back-1", (station) => {
      if (station.completion.kind !== "mixed-items") throw new Error("wrong fixture");
      return {
        ...station,
        completion: {
          ...station.completion,
          itemIds: [],
          capabilities: [],
          mistakeRecovery: "",
        },
      };
    });

    expect(validateStationCourse(stations)).toEqual(
      expect.arrayContaining([
        "Station look-back-1 mixed completion has no item coverage.",
        "Station look-back-1 mixed completion has no capability coverage.",
        "Station look-back-1 does not explain how checkpoint mistakes recover.",
      ]),
    );
  });
});
