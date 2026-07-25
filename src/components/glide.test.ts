import { describe, expect, it } from "vitest";

// The camera glide from WorldMap.tsx, extracted so its convergence is testable without
// a browser (rAF can't be driven reliably in a background tab).
//
// The bug this pins: spam-clicking the line arrows used to leave the camera short of the
// final track. Each click restarted the tween from a PARTIAL position, so the shortfall
// compounded. The loop now integrates its own position and only ever RETARGETS, so any
// click pattern must still land exactly on the last requested view.

type View = { x: number; y: number; z: number };

function makeGlide(initial: View) {
  let view = { ...initial };
  let target: View | null = null;
  let running = false;
  let pos: View | null = null;
  let prev = 0;

  return {
    get view() { return view; },
    get running() { return running; },
    glideTo(t: View, now: number) {
      target = t;
      if (running) return; // a loop already owns the camera; it picks up the new target
      pos = { ...view };
      prev = now;
      running = true;
    },
    frame(now: number) {
      if (!running || !target || !pos) return;
      const k = 1 - Math.exp(-Math.min(now - prev, 100) / 165);
      prev = now;
      pos = {
        x: pos.x + (target.x - pos.x) * k,
        y: pos.y + (target.y - pos.y) * k,
        z: pos.z + (target.z - pos.z) * k,
      };
      const done =
        Math.abs(target.x - pos.x) < 0.5 &&
        Math.abs(target.y - pos.y) < 0.5 &&
        Math.abs(target.z - pos.z) < 0.001;
      if (done) pos = { ...target };
      view = { ...pos };
      if (done) running = false;
    },
  };
}

// Run a click schedule against a 16ms frame clock. Clicks are delivered when the clock
// passes their timestamp — real clicks don't align to frame boundaries, and several can
// land between two frames.
function simulate(clickTimes: number[], targets: View[]) {
  const g = makeGlide({ x: 0, y: 0, z: 0.9 });
  const pending = clickTimes.map((t, i) => ({ t, view: targets[i]! }));
  let next = 0;
  for (let t = 0; t < 8000; t += 16) {
    while (next < pending.length && pending[next]!.t <= t) {
      g.glideTo(pending[next]!.view, pending[next]!.t);
      next++;
    }
    g.frame(t);
  }
  return g;
}

const T = (x: number): View => ({ x, y: x / 2, z: 0.9 });

describe("camera glide", () => {
  it("reaches a single target", () => {
    const g = simulate([96], [T(-2000)]);
    expect(g.view.x).toBeCloseTo(-2000, 5);
    expect(g.running).toBe(false);
  });

  it("lands on the FINAL target when clicks arrive mid-flight", () => {
    // the spam case: three clicks well inside one ~500ms glide
    const g = simulate([96, 192, 288], [T(-1000), T(-2000), T(-3000)]);
    expect(g.view.x).toBeCloseTo(-3000, 5);
  });

  it("lands on the final target when clicks land in the same frame", () => {
    const g = simulate([96, 96 + 1, 96 + 2], [T(-1000), T(-2000), T(-3000)]);
    expect(g.view.x).toBeCloseTo(-3000, 5);
  });

  it("settles and stops between well-separated clicks", () => {
    const g = simulate([96, 2000, 4000], [T(-1000), T(-2000), T(-3000)]);
    expect(g.view.x).toBeCloseTo(-3000, 5);
    expect(g.running).toBe(false); // loop must not spin forever
  });
});
