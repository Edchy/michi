"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  PROVINCES,
  TRACKS,
  STATIONS,
  BOOK_STOPS,
  TOTAL_STATIONS,
  trackOfStation,
  firstStationOfTrack,
  trackState,
  provinceOfTrack,
  firstTrackOfProvince,
  provinceState,
  trackHue,
  type Station,
} from "@/app/worldmap";
import { markBookStopVisited, visitedBookStops } from "@/lib/codex-progress";

// The course as PROVINCES (国) → TRACKS (線) → STATIONS (宿), on a pannable, zoomable
// canvas. Each TRACK is drawn as its own stretch of ink in its own hue, and the ink breaks
// between provinces, so the canvas holds one province rather than the whole course.
// Moving around:
//  • glide  — arrows pan the camera along the path, track by track, within a province.
//  • chain  — the nav label is two targets: province name → all provinces, track name →
//    this province's tracks. Two bounded lists (~8 provinces, ~5 tracks), never one
//    endless one — the reason this still works at 50+ tracks.
// See docs/decisions/0006-provinces-and-tracks.md.
//
// Track hue carries GROUPING only. done/current/locked is still shape + label, and 朱
// vermilion still means "you are here" and nothing else (PRODUCT: never color-only).

const MIN_ZOOM = 0.45;
const MAX_ZOOM = 1.8;
const R = 30;
const FOCUS_ZOOM = 0.9; // zoom the camera settles at when focusing a track

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

// How much of one segment's ink is walked, 0..1 — `start` is the segment's first global
// station index and `count` its station count (including the joining station).
function doneFraction(start: number, count: number, position: number): number {
  const legs = count - 1;
  if (legs <= 0) return 0;
  return Math.max(0, Math.min(1, (position - start) / legs));
}

export default function WorldMap({
  position,
  onSelect,
  onProvinceChange,
  onReady,
}: {
  position: number; // index of current (furthest-unlocked) station
  onSelect?: (station: Station) => void;
  onProvinceChange?: (province: number) => void; // the province now in view
  // Handed a function that opens the province list, so the header — which names the
  // province — can be the thing that opens it. Avoids lifting the chain out of here.
  onReady?: (api: { openProvinces: () => void }) => void;
}) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [view, setView] = useState<View>({ x: 0, y: 0, z: FOCUS_ZOOM });
  const [ready, setReady] = useState(false);
  const [focusedTrack, setFocusedTrack] = useState(() => trackOfStation(position));
  // null = closed. A number opens that province's tracks; "provinces" opens the province list.
  const [chain, setChain] = useState<number | "provinces" | null>(null);
  const [visitedStops, setVisitedStops] = useState<string[]>([]);
  const drag = useRef<{ px: number; py: number; vx: number; vy: number; moved: boolean } | null>(null);
  const anim = useRef<number | null>(null);

  const focusedProvince = provinceOfTrack(focusedTrack);

  // Tell the page which province is in view, so the header can name it. Fires on mount
  // too — the map may open on any province, not just the first.
  useEffect(() => {
    onProvinceChange?.(focusedProvince);
  }, [focusedProvince, onProvinceChange]);

  useEffect(() => {
    onReady?.({ openProvinces: () => setChain("provinces") });
  }, [onReady]);

  // One ink stretch per TRACK, each in its own hue. A segment runs to the FIRST STATION
  // OF THE NEXT TRACK in the same province, so consecutive hues meet at a station
  // instead of leaving a gap. Province boundaries get no such join — that break is the
  // seam the province marker labels.
  const trackPaths = useMemo(
    () =>
      TRACKS.map((track, t) => {
        const province = provinceOfTrack(t);
        const isLastInProvince =
          t === firstTrackOfProvince(province) + PROVINCES[province]!.tracks.length - 1;
        const next = isLastInProvince ? [] : TRACKS[t + 1]!.stations.slice(0, 1);
        const pts = [...track.stations, ...next];
        return {
          id: track.id,
          d: smoothPath(pts),
          hue: trackHue(t),
          start: firstStationOfTrack(t),
          count: pts.length,
        };
      }),
    [],
  );

  useEffect(() => {
    const refreshVisited = () => setVisitedStops(visitedBookStops());
    refreshVisited();
    window.addEventListener("pageshow", refreshVisited);
    return () => window.removeEventListener("pageshow", refreshVisited);
  }, []);

  // target view that fits a track's stations centered in the viewport
  const viewForTrack = useCallback((p: number): View | null => {
    const el = wrapRef.current;
    const prov = TRACKS[p];
    if (!el || !prov) return null;
    const { width, height } = el.getBoundingClientRect();
    const xs = prov.stations.map((s) => s.x);
    const ys = prov.stations.map((s) => s.y);
    const cx = (Math.min(...xs) + Math.max(...xs)) / 2;
    const cy = (Math.min(...ys) + Math.max(...ys)) / 2;
    const spanX = Math.max(1, Math.max(...xs) - Math.min(...xs)) + 320;
    const z = Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, Math.min(FOCUS_ZOOM, (width * 0.9) / spanX)));
    return { z, x: width / 2 - cx * z, y: height / 2 - cy * z };
  }, []);

  // keep a ref of the latest view for the animator to read without re-subscribing
  const viewRef = useRef(view);
  viewRef.current = view;

  // The camera's current destination. Held in a ref so a click landing mid-flight
  // RETARGETS the running animation instead of starting a fresh one.
  const glideTarget = useRef<View | null>(null);

  // Animate the camera to a view over ~520ms.
  //
  // Spam-clicking used to leave the camera short of the last track: each click cancelled
  // the in-flight rAF and started a new tween from `viewRef.current` — a PARTIAL position
  // the previous tween hadn't finished reaching. Every click compounded that shortfall, so
  // the view crept while `focusedTrack` had already run to the edge.
  //
  // Now one loop owns the camera for its lifetime and simply re-reads the target each
  // frame. Interrupting only changes where it's heading, never where it's measured from,
  // so any number of clicks still lands exactly on the final track.
  const glideTo = useCallback((target: View | null) => {
    if (!target) return;
    glideTarget.current = target;
    if (prefersReduced()) { setView(target); anim.current = null; return; }
    if (anim.current !== null) return; // a loop is already running; it will pick this up

    // The loop integrates its OWN position. It must not read viewRef between frames:
    // that ref is refreshed during render, and setView doesn't re-render synchronously,
    // so mid-flight it reports a stale value — the camera would integrate from the same
    // point every frame, never converge, and spin rAF forever.
    let pos = { ...viewRef.current };
    let prev = performance.now();
    const step = (now: number) => {
      const dest = glideTarget.current!;
      // Exponential approach: framerate-independent, and continuous across a retarget
      // (no restart means no visible snap when you click again mid-glide).
      const k = 1 - Math.exp(-Math.min(now - prev, 100) / 165);
      prev = now;
      pos = {
        x: pos.x + (dest.x - pos.x) * k,
        y: pos.y + (dest.y - pos.y) * k,
        z: pos.z + (dest.z - pos.z) * k,
      };
      const done =
        Math.abs(dest.x - pos.x) < 0.5 &&
        Math.abs(dest.y - pos.y) < 0.5 &&
        Math.abs(dest.z - pos.z) < 0.001;
      if (done) pos = { ...dest };
      setView(pos);
      anim.current = done ? null : requestAnimationFrame(step);
    };
    anim.current = requestAnimationFrame(step);
  }, []);

  // Arrows stay inside the current province: at a province edge they're disabled, and you
  // step up to the province list instead. Bounded clicks, however long the course gets.
  const provinceBounds = useMemo(() => {
    const first = firstTrackOfProvince(focusedProvince);
    return { first, last: first + PROVINCES[focusedProvince]!.tracks.length - 1 };
  }, [focusedProvince]);

  // Step by DELTA, not to an absolute index computed from a possibly-stale `focusedTrack`.
  // Spam-clicking an arrow fires several handlers before React commits, so an absolute
  // target would collapse them all onto the same value and stall short of the edge.
  const stepTrack = useCallback((delta: number) => {
    setFocusedTrack((prev) => {
      const next = Math.max(provinceBounds.first, Math.min(provinceBounds.last, prev + delta));
      if (next !== prev) glideTo(viewForTrack(next));
      return next;
    });
  }, [glideTo, viewForTrack, provinceBounds]);

  // track to glide to once the path view has (re)mounted and wrapRef exists
  const pendingFocus = useRef<number | null>(null);

  const jumpToTrack = useCallback((p: number) => {
    pendingFocus.current = Math.max(0, Math.min(TRACKS.length - 1, p));
    setFocusedTrack(pendingFocus.current);
    setChain(null); // the effect below runs after the path renders and drains it
  }, []);

  // on first mount, snap to the track containing the current station
  useEffect(() => {
    const target = viewForTrack(trackOfStation(position));
    if (target) setView(target);
    setReady(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // after returning from the chain, glide to the track that was jumped to
  useEffect(() => {
    if (chain !== null || pendingFocus.current === null) return;
    const p = pendingFocus.current;
    pendingFocus.current = null;
    glideTo(viewForTrack(p));
  }, [chain, glideTo, viewForTrack]);

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
    // Grabbing the map takes the camera back from the animator — clear the flag too, or
    // the next glide would think a loop is still running and never start one.
    if (anim.current) cancelAnimationFrame(anim.current);
    anim.current = null;
    glideTarget.current = null;
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

  if (chain !== null) {
    return (
      <Chain
        province={chain === "provinces" ? null : chain}
        position={position}
        onJump={jumpToTrack}
        onOpenProvince={(r) => setChain(r)}
        onUpToProvinces={() => setChain("provinces")}
        onClose={() => setChain(null)}
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
          {trackPaths.map((tp) => tp.d && (
            <g key={tp.id} style={{ ["--track" as string]: tp.hue }}>
              <path d={tp.d} className="wm-path wm-path-base" />
              <path d={tp.d} className="wm-path wm-path-done" pathLength={1}
                style={{ strokeDasharray: 1, strokeDashoffset: 1 - doneFraction(tp.start, tp.count, position) }} />
            </g>
          ))}

          {/* province boundary: a quiet marker where one province's ink ends and the next begins */}
          {PROVINCES.map((province, r) => {
            if (r === 0 || province.tracks.length === 0) return null;
            const first = province.tracks[0]!.stations[0]!;
            const x = first.x - 160; // midway in the gap left by the previous province
            return (
              <g key={`edge-${province.id}`} className="wm-province-marker" aria-hidden>
                <line x1={x} y1={300} x2={x} y2={700} />
                <text x={x} y={286} className="wm-province-marker-label">
                  PROVINCE {province.n} <tspan className="wm-station-kana">国</tspan>
                </text>
              </g>
            );
          })}

          {STATIONS.map((s, i) => {
            const done = i < position;
            const isCurrent = i === position;
            const locked = i > position;
            const clickable = Boolean(s.href) && (done || isCurrent);
            return (
              <g
                key={s.id}
                transform={`translate(${s.x} ${s.y})`}
                style={{ ["--track" as string]: trackHue(trackOfStation(i)) }}
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
                      "aria-label": `Start ${s.placeRomaji} Station, stop ${s.n}: ${s.title}`,
                      onKeyDown: (e: React.KeyboardEvent) => {
                        if (e.key === "Enter" || e.key === " ") { e.preventDefault(); onSelect?.(s); }
                      },
                    }
                  : { "aria-label": `${s.placeRomaji} Station, stop ${s.n}: ${s.title} (locked)` })}
              >
                {clickable && <circle r={R + 6} fill="transparent" className="wm-hit" />}
                {isCurrent && <circle r={R + 8} className="wm-halo" />}
                {/* The station's number above the disc, in its line's hue — the one label
                    that survives every state. Inside the disc the number is replaced by a
                    check once walked, so without this a completed station loses its
                    number entirely and you can't tell station 3 from station 12. */}
                <text className="wm-stop-n" dy={-R - 11} aria-hidden>{s.n}</text>
                <circle r={R} className="wm-disc" />
                {done ? (
                  <path d="M -10 1 L -3 8 L 11 -7" className="wm-check" />
                ) : isCurrent ? (
                  // The stop you're on shows a map mark rather than its number: the
                  // number is already above the disc, so repeating it inside says
                  // nothing, where this says "you are here". Pinhead Map Icons (CC0),
                  // 15×15 viewBox scaled to ~27px. Centred on the mark's own bounding
                  // box (7.5, 7.35 — it does not fill the viewBox vertically), not on
                  // the viewBox centre, which would sit it fractionally low.
                  <g transform="translate(-14 -13.72) scale(1.8667)" aria-hidden>
                    <path className="wm-here" d="M13.1 10.34c-2.01 2.91-3.88 4.35-5.59 4.35c-1.72 0-3.59-1.44-5.6-4.35a3.69 3.69 0 0 1-.4-3.41C1.84 6.08 2 5.41 2 4.9C2 3.67 3.65 0 7.51 0c4.44 0 5.5 3.67 5.5 4.9c0 .51.16 1.18.49 2.03a3.69 3.69 0 0 1-.4 3.41M4.49 3.38l.97 2.36c.1.23.32.38.56.38h2.97c.24 0 .46-.15.56-.38l.97-2.36c.08-.21.05-.44-.09-.61c-.79-1.03-1.77-1.55-2.92-1.55c-1.16 0-2.14.52-2.93 1.55c-.14.17-.17.4-.09.61m3.02 10.09c.67 0 1.22-.56 1.22-1.23a1.225 1.225 0 0 0-2.45 0c0 .67.55 1.23 1.23 1.23" />
                  </g>
                ) : (
                  <text className="wm-num" dy="0.35em">{s.n}</text>
                )}
                <g className="wm-label" transform={`translate(0 ${R + 24})`}>
                  {/* Place name in kana is the headline — the learner meets real Japanese
                      here. The romaji line names the STATION, a label on a place, never a
                      reading aid for taught kana (P2). No line code: the track's color and
                      the nav label already say which line you're on. */}
                  <text className="wm-place font-kana" dy="0">{s.place}</text>
                  <text className="wm-station" dy="18">
                    {s.placeRomaji} Station <tspan className="wm-station-kana">駅</tspan>
                  </text>
                  <text className="wm-title" dy="38">{s.title}</text>
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

          {/* The pin sits ABOVE the station number (which is at -R-11), not on top of it. */}
          {current && (
            <g transform={`translate(${current.x} ${current.y - R - 42})`} className="wm-avatar">
              {/* 1.5× the original pin, so it carries across the map at a glance. */}
              <g className="wm-avatar-bob">
                <path d="M 0 12 C -10.5 -3 -10.5 -13.5 0 -13.5 C 10.5 -13.5 10.5 -3 0 12 Z" className="wm-avatar-pin" />
                <circle cy={-6} r={3.9} className="wm-avatar-eye" />
              </g>
            </g>
          )}
        </g>
      </svg>

      {/* One bar, centered: where you are, how to move, and the way in to the lists.
          Everything that used to be scattered across three corners lives here. */}
      <div className="wm-nav">
        <button
          className="btn btn-secondary btn-icon wm-arrow"
          type="button"
          onClick={() => stepTrack(-1)}
          disabled={focusedTrack <= provinceBounds.first}
          aria-label="Previous line"
        >
          <span aria-hidden>‹</span>
        </button>

        {/* One target: the line you're on, which opens this province's lines. The
            province itself is named in the header now. */}
        <div className="wm-nav-label">
          {/* The line's own code (G, M, C…) in a roundel, the way Tokyo Metro marks a
              line — it identifies the line without repeating the station title, which
              is what made this row read as a duplicate of the map. */}
          <button
            className="wm-nav-track"
            type="button"
            style={{ ["--track" as string]: trackHue(focusedTrack) }}
            onClick={() => setChain(focusedProvince)}
            aria-label={`${TRACKS[focusedTrack]!.line} Line, line ${TRACKS[focusedTrack]!.n} of ${PROVINCES[focusedProvince]!.tracks.length}. Browse all lines in ${PROVINCES[focusedProvince]!.title}`}
          >
            <span className="wm-nav-roundel" aria-hidden>{TRACKS[focusedTrack]!.code}</span>
            {/* Title first: "The Ginza Line" says what this is. A bare "Ginza 銀座線"
                reads as two words rather than as the name of a line, and putting the
                count on top made the least useful fact the most prominent one. */}
            <span className="wm-nav-track-text">
              <span className="wm-nav-title">
                The {TRACKS[focusedTrack]!.line} Line{" "}
                <span className="font-kana">{TRACKS[focusedTrack]!.lineKanji}</span>
              </span>
              <span className="wm-nav-n">
                Line {TRACKS[focusedTrack]!.n} of {PROVINCES[focusedProvince]!.tracks.length}
              </span>
            </span>
          </button>
        </div>

        <button
          className="btn btn-secondary btn-icon wm-arrow"
          type="button"
          onClick={() => stepTrack(1)}
          disabled={focusedTrack >= provinceBounds.last}
          aria-label="Next line"
        >
          <span aria-hidden>›</span>
        </button>
      </div>
    </div>
  );
}

// ── CHAIN: two bounded lists — provinces, then the tracks of one province ────────────
function Chain({
  province,
  position,
  onJump,
  onOpenProvince,
  onUpToProvinces,
  onClose,
}: {
  province: number | null; // null = show provinces
  position: number;
  onJump: (p: number) => void;
  onOpenProvince: (r: number) => void;
  onUpToProvinces: () => void;
  onClose: () => void;
}) {
  if (province === null) {
    return (
      <div className="wm-chain-wrap">
        <button className="btn btn-secondary wm-chain-close" type="button" onClick={onClose} aria-label="Back to the path">
          ‹ The path
        </button>
        <div className="wm-chain" role="list" aria-label="Provinces">
          {PROVINCES.map((r, i) => {
            const state = provinceState(i, position);
            const count = r.tracks.length;
            const built = count > 0;
            const done = built
              ? r.tracks.filter((_, j) => trackState(firstTrackOfProvince(i) + j, position) === "done").length
              : 0;
            return (
              <button
                key={r.id}
                type="button"
                role="listitem"
                className={`wm-card is-${state}`}
                disabled={!built || state === "locked"}
                onClick={() => onOpenProvince(i)}
                aria-label={
                  !built
                    ? `Province ${r.n}: ${r.title} (not yet built)`
                    : `Open Province ${r.n}: ${r.title}, ${done} of ${count} tracks complete`
                }
              >
                <span className="wm-card-n">Province {r.n} 国</span>
                <span className="wm-card-title">{r.title}</span>
                {r.subtitle && <span className="wm-card-sub">{r.subtitle}</span>}
                <span className="wm-card-meta">
                  {!built
                    ? "Not yet built"
                    : state === "done"
                      ? "Complete"
                      : state === "locked"
                        ? "Locked"
                        : `${done} of ${count} tracks`}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  const r = PROVINCES[province]!;
  const offset = firstTrackOfProvince(province);
  return (
    <div className="wm-chain-wrap">
      <button className="btn btn-secondary wm-chain-close" type="button" onClick={onUpToProvinces} aria-label="All provinces">
        ‹ Provinces
      </button>
      <div className="wm-chain" role="list" aria-label={`Tracks in Province ${r.n}`}>
        {r.tracks.map((prov, j) => {
          const p = offset + j;
          const state = trackState(p, position);
          const locked = state === "locked";
          const total = prov.stations.length;
          const done = Math.max(0, Math.min(total, position - firstStationOfTrack(p)));
          return (
            <button
              key={prov.id}
              type="button"
              role="listitem"
              className={`wm-card is-${state}`}
              style={{ ["--track" as string]: trackHue(p) }}
              disabled={locked}
              onClick={() => onJump(p)}
              aria-label={
                locked
                  ? `Track ${prov.n}: ${prov.title} (locked)`
                  : `Jump to Track ${prov.n}: ${prov.title}, ${done} of ${total} stations complete`
              }
            >
              <span className="wm-card-n">
                {prov.code} · {prov.line} Line <span className="font-kana">{prov.lineKanji}</span>
              </span>
              <span className="wm-card-title">{prov.title}</span>
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

export { TOTAL_STATIONS };
