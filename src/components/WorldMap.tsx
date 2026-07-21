"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  STATIONS,
  BOOK_STOPS,
  MODULES,
  TOTAL_STATIONS,
  moduleOfStation,
  firstStationOfModule,
  moduleState,
  type Station,
} from "@/app/worldmap";
import { markBookStopVisited, visitedBookStops } from "@/lib/codex-progress";

// One continuous path (module 1 → 2 → 3 …) on a pannable, zoomable canvas — you walk
// the whole road. TWO ways to move between modules:
//  • glide  — selecting a module smoothly pans the camera along the path to it.
//  • chain  — zoom out to a vertical list of module cards, tap to jump (fast at 100+).
// State shown by shape + label, never color alone (PRODUCT: never color-only).

const MIN_ZOOM = 0.45;
const MAX_ZOOM = 1.8;
const R = 30;
const FOCUS_ZOOM = 0.9; // zoom the camera settles at when focusing a module

type View = { x: number; y: number; z: number };

// Catmull-Rom → cubic bézier through all points: one flowing curve, no kinks.
function smoothPath(pts: { x: number; y: number }[]): string {
  if (pts.length < 2) return "";
  const d: string[] = [`M ${pts[0]!.x} ${pts[0]!.y}`];
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[i - 1] ?? pts[i]!;
    const p1 = pts[i]!;
    const p2 = pts[i + 1]!;
    const p3 = pts[i + 2] ?? p2;
    d.push(`C ${p1.x + (p2.x - p0.x) / 6} ${p1.y + (p2.y - p0.y) / 6} ${p2.x - (p3.x - p1.x) / 6} ${p2.y - (p3.y - p1.y) / 6} ${p2.x} ${p2.y}`);
  }
  return d.join(" ");
}

const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);
const prefersReduced = () =>
  typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

export default function WorldMap({
  position,
  onSelect,
}: {
  position: number; // index of current (furthest-unlocked) station
  onSelect?: (station: Station) => void;
}) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [view, setView] = useState<View>({ x: 0, y: 0, z: FOCUS_ZOOM });
  const [ready, setReady] = useState(false);
  const [focusedModule, setFocusedModule] = useState(() => moduleOfStation(position));
  const [chain, setChain] = useState(false); // zoomed out to the module chain?
  const [visitedStops, setVisitedStops] = useState<string[]>([]);
  const drag = useRef<{ px: number; py: number; vx: number; vy: number; moved: boolean } | null>(null);
  const anim = useRef<number | null>(null);

  const path = useMemo(() => smoothPath(STATIONS), []);

  useEffect(() => {
    const refreshVisited = () => setVisitedStops(visitedBookStops());
    refreshVisited();
    window.addEventListener("pageshow", refreshVisited);
    return () => window.removeEventListener("pageshow", refreshVisited);
  }, []);

  // target view that fits a module's stations centered in the viewport
  const viewForModule = useCallback((m: number): View | null => {
    const el = wrapRef.current;
    const mod = MODULES[m];
    if (!el || !mod) return null;
    const { width, height } = el.getBoundingClientRect();
    const xs = mod.stations.map((s) => s.x);
    const ys = mod.stations.map((s) => s.y);
    const cx = (Math.min(...xs) + Math.max(...xs)) / 2;
    const cy = (Math.min(...ys) + Math.max(...ys)) / 2;
    const spanX = Math.max(1, Math.max(...xs) - Math.min(...xs)) + 320;
    const z = Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, Math.min(FOCUS_ZOOM, (width * 0.9) / spanX)));
    return { z, x: width / 2 - cx * z, y: height / 2 - cy * z };
  }, []);

  // keep a ref of the latest view for the animator to read without re-subscribing
  const viewRef = useRef(view);
  viewRef.current = view;

  // animate the camera to a view over ~520ms
  const glideTo = useCallback((target: View | null) => {
    if (!target) return;
    if (anim.current) cancelAnimationFrame(anim.current);
    if (prefersReduced()) { setView(target); return; }
    const start = performance.now();
    const from = { ...viewRef.current };
    const step = (now: number) => {
      const t = Math.min(1, (now - start) / 520);
      const e = easeOut(t);
      setView({
        x: from.x + (target.x - from.x) * e,
        y: from.y + (target.y - from.y) * e,
        z: from.z + (target.z - from.z) * e,
      });
      if (t < 1) anim.current = requestAnimationFrame(step);
    };
    anim.current = requestAnimationFrame(step);
  }, []);

  const focusModule = useCallback((m: number) => {
    const clamped = Math.max(0, Math.min(MODULES.length - 1, m));
    setFocusedModule(clamped);
    glideTo(viewForModule(clamped));
  }, [glideTo, viewForModule]);

  // jump from the chain: close it, then glide the camera along the path to the module
  // module to glide to once the path view has (re)mounted and wrapRef exists
  const pendingFocus = useRef<number | null>(null);

  const jumpToModule = useCallback((m: number) => {
    pendingFocus.current = Math.max(0, Math.min(MODULES.length - 1, m));
    setFocusedModule(pendingFocus.current);
    setChain(false); // the effect below runs after the path renders and drains it
  }, []);

  // on first mount, snap to the module containing the current station
  useEffect(() => {
    const target = viewForModule(moduleOfStation(position));
    if (target) setView(target);
    setReady(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // after returning from the chain, glide to the module that was jumped to
  useEffect(() => {
    if (chain || pendingFocus.current === null) return;
    const m = pendingFocus.current;
    pendingFocus.current = null;
    glideTo(viewForModule(m));
  }, [chain, glideTo, viewForModule]);

  const onWheel = useCallback((e: React.WheelEvent) => {
    const el = wrapRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const cx = e.clientX - rect.left;
    const cy = e.clientY - rect.top;
    setView((v) => {
      const z = Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, v.z * (e.deltaY < 0 ? 1.1 : 0.9)));
      const k = z / v.z;
      return { z, x: cx - (cx - v.x) * k, y: cy - (cy - v.y) * k };
    });
  }, []);

  const onPointerDown = (e: React.PointerEvent) => {
    if (anim.current) cancelAnimationFrame(anim.current);
    (e.target as Element).setPointerCapture?.(e.pointerId);
    drag.current = { px: e.clientX, py: e.clientY, vx: view.x, vy: view.y, moved: false };
  };
  const onPointerMove = (e: React.PointerEvent) => {
    const d = drag.current;
    if (!d) return;
    const dx = e.clientX - d.px;
    const dy = e.clientY - d.py;
    if (Math.abs(dx) + Math.abs(dy) > 3) d.moved = true;
    setView((v) => ({ ...v, x: d.vx + dx, y: d.vy + dy }));
  };
  const onPointerUp = () => { drag.current = null; };

  const current = STATIONS[position];

  if (chain) {
    return (
      <ModuleChain
        position={position}
        onJump={jumpToModule}
        onClose={() => setChain(false)}
      />
    );
  }

  return (
    <div
      ref={wrapRef}
      className="worldmap"
      onWheel={onWheel}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerLeave={onPointerUp}
      role="application"
      aria-label="Course map"
    >
      <svg className="worldmap-svg" style={{ opacity: ready ? 1 : 0 }}>
        <g transform={`translate(${view.x} ${view.y}) scale(${view.z})`}>
          <path d={path} className="wm-path wm-path-track" />
          <path d={path} className="wm-path wm-path-done" pathLength={1}
            style={{ strokeDasharray: 1, strokeDashoffset: 1 - completedFraction(position) }} />

          {STATIONS.map((s, i) => {
            const done = i < position;
            const isCurrent = i === position;
            const locked = i > position;
            const clickable = Boolean(s.href) && (done || isCurrent);
            return (
              <g
                key={s.id}
                transform={`translate(${s.x} ${s.y})`}
                className={`wm-stop ${done ? "is-done" : ""} ${isCurrent ? "is-current" : ""} ${locked ? "is-locked" : ""} ${clickable ? "is-clickable" : ""}`}
                onPointerUp={clickable ? (e) => {
                  e.stopPropagation();
                  const moved = drag.current?.moved;
                  drag.current = null;
                  if (!moved) onSelect?.(s);
                } : undefined}
                {...(clickable
                  ? {
                      tabIndex: 0,
                      role: "button",
                      "aria-label": `Start Station ${s.n}: ${s.title}`,
                      onKeyDown: (e: React.KeyboardEvent) => {
                        if (e.key === "Enter" || e.key === " ") { e.preventDefault(); onSelect?.(s); }
                      },
                    }
                  : { "aria-label": `Station ${s.n}: ${s.title} (locked)` })}
              >
                {clickable && <circle r={R + 6} fill="transparent" className="wm-hit" />}
                <circle r={R} className="wm-disc" />
                {done
                  ? <path d="M -10 1 L -3 8 L 11 -7" className="wm-check" />
                  : <text className="wm-num" dy="0.35em">{s.n}</text>}
                <g className="wm-label" transform={`translate(0 ${R + 24})`}>
                  <text className="wm-station" dy="0">STATION {s.n} <tspan className="wm-station-kana">宿</tspan></text>
                  <text className="wm-title" dy="20">{s.title}</text>
                </g>
              </g>
            );
          })}

          {BOOK_STOPS.filter((stop) => position >= stop.unlockAfterStation).map((stop) => {
            const visited = visitedStops.includes(stop.id);
            const openBookStop = () => {
              setVisitedStops(markBookStopVisited(stop.id));
              window.location.href = stop.href;
            };
            return (
            <g
              key={stop.id}
              transform={`translate(${stop.x} ${stop.y})`}
              className={`wm-book-stop is-clickable ${visited ? "is-visited" : ""}`}
              tabIndex={0}
              role="button"
              aria-label={`Open book stop: ${stop.title}${visited ? " (visited)" : ""}`}
              onPointerUp={(e) => {
                e.stopPropagation();
                const moved = drag.current?.moved;
                drag.current = null;
                if (!moved) openBookStop();
              }}
              onKeyDown={(e: React.KeyboardEvent) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  openBookStop();
                }
              }}
            >
              <rect x={-18} y={-15} width={36} height={30} rx={5} className="wm-book-disc" />
              <text className={visited ? "wm-book-check" : "wm-book-glyph"} dy="0.35em">
                {visited ? "✓" : "文"}
              </text>
              <g className="wm-label" transform="translate(0 34)">
                <text className="wm-book-kind">BOOK STOP</text>
              </g>
            </g>
            );
          })}

          {current && (
            <g transform={`translate(${current.x} ${current.y - R - 16})`} className="wm-avatar">
              <g className="wm-avatar-bob">
                <path d="M 0 8 C -7 -2 -7 -9 0 -9 C 7 -9 7 -2 0 8 Z" className="wm-avatar-pin" />
                <circle cy={-4} r={2.6} className="wm-avatar-eye" />
              </g>
            </g>
          )}
        </g>
      </svg>

      {/* module navigation — glide along the path + zoom out to the chain */}
      <div className="wm-nav">
        <button
          className="wm-arrow"
          type="button"
          onClick={() => focusModule(focusedModule - 1)}
          disabled={focusedModule === 0}
          aria-label="Previous module"
        >‹</button>

        <button
          className="wm-nav-label"
          type="button"
          onClick={() => setChain(true)}
          aria-label="All modules"
        >
          <span className="wm-nav-n">Module {MODULES[focusedModule]!.n}</span>
          <span className="wm-nav-title">{MODULES[focusedModule]!.title}</span>
          <span className="wm-nav-hint">All modules</span>
        </button>

        <button
          className="wm-arrow"
          type="button"
          onClick={() => focusModule(focusedModule + 1)}
          disabled={focusedModule === MODULES.length - 1}
          aria-label="Next module"
        >›</button>
      </div>
    </div>
  );
}

// ── CHAIN: the trail of module cards, for jumping ──────────────────────────────
function ModuleChain({
  position,
  onJump,
  onClose,
}: {
  position: number;
  onJump: (m: number) => void;
  onClose: () => void;
}) {
  return (
    <div className="wm-chain-wrap">
      <button className="wm-chain-close" type="button" onClick={onClose} aria-label="Back to the path">
        ‹ The path
      </button>
      <div className="wm-chain" role="list" aria-label="Modules">
        {MODULES.map((mod, i) => {
          const state = moduleState(i, position);
          const locked = state === "locked";
          const total = mod.stations.length;
          const done = Math.max(0, Math.min(total, position - firstStationOfModule(i)));
          return (
            <button
              key={mod.id}
              type="button"
              role="listitem"
              className={`wm-card is-${state}`}
              disabled={locked}
              onClick={() => onJump(i)}
              aria-label={
                locked
                  ? `Module ${mod.n}: ${mod.title} (locked)`
                  : `Jump to Module ${mod.n}: ${mod.title}, ${done} of ${total} stations complete`
              }
            >
              <span className="wm-card-n">Module {mod.n}</span>
              <span className="wm-card-title">{mod.title}</span>
              <span className="wm-card-meta">
                {state === "done" ? "Complete" : locked ? "Locked" : `${done} of ${total}`}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function completedFraction(position: number): number {
  const legs = STATIONS.length - 1;
  if (legs <= 0) return 0;
  return Math.min(1, position / legs);
}

export { TOTAL_STATIONS };
