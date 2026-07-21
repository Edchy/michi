"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { TOTAL_STATIONS } from "@/app/worldmap";

const WorldMap = dynamic(() => import("@/components/WorldMap"), { ssr: false });

export default function WorldPage() {
  const [position, setPosition] = useState(0);

  useEffect(() => {
    const justCompleted = new URLSearchParams(window.location.search).get("completed") === "first-sounds";
    const saved = Math.min(Number(window.localStorage.getItem("michi-world-position") ?? "0"), TOTAL_STATIONS - 1);
    if (justCompleted && saved < 1) {
      window.localStorage.setItem("michi-world-position", "1");
      window.history.replaceState({}, "", "/");
      setPosition(1);
      return;
    }
    setPosition(Math.max(saved, 0));
  }, []);

  // course completion — quiet text, not a stat tile (PRODUCT anti-reference)
  const done = position;
  const total = TOTAL_STATIONS;

  return (
    <main className="world-page">
      <header className="world-header">
        <div className="world-brand">
          <span className="world-mark font-kana">道</span>
          <div>
            <h1>The path</h1>
            <p>Japanese, one place at a time</p>
          </div>
        </div>
        <p className="world-progress">
          <span>{done}</span> of {total} complete
        </p>
        <a href="/codex" className="world-codex" aria-label="Open Codex">
          <span className="font-kana" aria-hidden>文</span>
          Codex
        </a>
      </header>

      <WorldMap
        position={position}
        onSelect={(stop) => { if (stop.href) window.location.href = stop.href; }}
      />
    </main>
  );
}
