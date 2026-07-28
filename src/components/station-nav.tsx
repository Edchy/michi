"use client";

import { Button } from "@/components/button";

/**
 * The nav row inside a station: `‹ 家 ›`. Three controls, the same button as
 * everywhere else in the app.
 *
 * The middle slot is deliberately just the way home. The world map puts a label card
 * there because on the map you are choosing *which* line to look at, so naming the
 * current one is the point. Inside a station there is no such choice: you can already
 * see which station you are in, and a card restating it is one more thing to read
 * without being one more thing you can do.
 *
 * Arrows are disabled at the ends of the station rather than hidden — a control that
 * vanishes reads as a bug, and the row must not shift under the cursor.
 */
export function StationNav({
  onBack,
  onNext,
  canGoBack,
  canGoNext,
}: {
  onBack: () => void;
  onNext: () => void;
  canGoBack: boolean;
  canGoNext: boolean;
}) {
  return (
    <nav className="flex items-center gap-2" aria-label="Lesson navigation">
      <Button
        icon
        onClick={onBack}
        disabled={!canGoBack}
        aria-label="Back"
        title="Back (Left Arrow)"
      >
        <span aria-hidden>‹</span>
      </Button>

      <Button href="/" icon aria-label="Return to the path" title="Return to the path">
        <PathIcon />
      </Button>

      <Button
        icon
        onClick={onNext}
        disabled={!canGoNext}
        aria-label="Next"
        title="Next (Right Arrow)"
      >
        <span aria-hidden>›</span>
      </Button>
    </nav>
  );
}

/**
 * The route home: a line threading three stops, which is what the world map actually
 * is. A house would say "homepage"; every label in the app calls the destination
 * "the path" (michi, 道), so the mark names the path rather than a building.
 *
 * Drawn to match the arrows beside it: 1.6px strokes, round joins, sized in `em` so it
 * scales with the button. Inline rather than an icon dependency.
 */
function PathIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="1.15em"
      height="1.15em"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      focusable="false"
    >
      {/* A station on its line — the map's own vocabulary, and the one shape that
          survives 17px. A curved route with stops turns to mush at this size; a
          straight line through one ringed stop stays legible. */}
      <path d="M2.5 12h5.2M16.3 12h5.2" />
      <circle cx="12" cy="12" r="4.3" />
    </svg>
  );
}
