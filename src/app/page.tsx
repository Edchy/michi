"use client";

import { useCallback, useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { PROVINCES, STATIONS, TOTAL_STATIONS, stationRangeOfProvince } from "@/app/worldmap";

const WorldMap = dynamic(() => import("@/components/WorldMap"), { ssr: false });

export default function WorldPage() {
  const [position, setPosition] = useState(0);
  // Which province the map is LOOKING at — it follows the nav arrows, so the header
  // names the province you're browsing rather than the one you happen to stand in.
  const [province, setProvince] = useState(0);
  const [api, setApi] = useState<{ openProvinces: () => void } | null>(null);

  useEffect(() => {
    // A station hands back `?completed=<its id>`; the path unlocks up to the station
    // after it. Keyed by id (not a hardcoded index) so inserting a station can't
    // silently unlock the wrong one.
    const completed = new URLSearchParams(window.location.search).get("completed");
    const finishedIndex = STATIONS.findIndex((s) => s.id === completed);
    const saved = Math.min(Number(window.localStorage.getItem("michi-world-position") ?? "0"), TOTAL_STATIONS - 1);
    if (finishedIndex >= 0 && saved <= finishedIndex) {
      const unlocked = Math.min(finishedIndex + 1, TOTAL_STATIONS - 1);
      window.localStorage.setItem("michi-world-position", String(unlocked));
      window.history.replaceState({}, "", "/");
      setPosition(unlocked);
      return;
    }
    setPosition(Math.max(saved, 0));
  }, []);

  // Progress is scoped to the province named above it — a count of the whole course
  // under a province heading would read as that province's total. Quiet text, not a
  // stat tile (PRODUCT anti-reference).
  const p = PROVINCES[province]!;
  const range = stationRangeOfProvince(province);
  const done = Math.max(0, Math.min(range.count, position - range.start));

  return (
    <main className="world-page">
      <header className="world-header">
        {/* Holds the shared measure so the header's two ends stay a readable distance
            apart on a wide display — see --chrome-measure. */}
        <div className="world-chrome">
          {/* The whole block is ONE target — mark, province and progress together — and
              it opens the province list. A single dark slab rather than a dark square
              next to loose text on the map.
              The h1 wraps the button (not the reverse): a button may only contain
              phrasing content, so an <h1> inside it would be invalid. */}
          <h1 className="world-brand-heading">
            <button
              type="button"
              className="world-brand"
              onClick={() => api?.openProvinces()}
              aria-label={`Province ${p.n}: ${p.title}${
                range.count === 0 ? " (not yet built)" : `, ${done} of ${range.count} stations completed`
              } — browse all provinces`}
            >
              <span className="world-mark font-kana" aria-hidden>道</span>
              <span className="world-brand-text">
                <span className="world-brand-title">
                  Province {p.n} <span className="font-kana">国</span> · {p.title}
                </span>
                {/* Progress sits under the heading as one honest sentence, scoped to the
                    province it names. An unbuilt province has no stations to count. */}
                <span className="world-progress">
                  {range.count === 0
                    ? "Not yet built"
                    : <><span>{done}</span> of {range.count} stations completed</>}
                </span>
              </span>
            </button>
          </h1>
          <a href="/codex" className="btn btn-secondary world-codex" aria-label="Open Codex">
            <span className="font-kana" aria-hidden>文</span>
            <span>Codex</span>
          </a>
        </div>
      </header>

      <WorldMap
        position={position}
        onProvinceChange={setProvince}
        // Wrapped: setApi(obj) would treat a bare object as fine, but keeping the
        // updater form makes the intent explicit and stays safe if `api` grows.
        onReady={useCallback((a: { openProvinces: () => void }) => setApi(() => a), [])}
        onSelect={(stop) => { if (stop.href) window.location.href = stop.href; }}
      />
    </main>
  );
}
