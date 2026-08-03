"use client";

import { Button } from "@/components/button";
import { AudioButton } from "@/components/audio-button";

/**
 * The nav row inside a station: `Back · Path · Next`. Three signs using the same
 * shared button as everywhere else in the app.
 *
 * The middle slot anchors station-wide actions: Path is always at the bottom, and the
 * progress sits above Path when present, and the shared audio control sits above the
 * progress. Back and Next align with Path, so optional elements never shift the row.
 *
 * End controls are disabled rather than hidden: a control that vanishes reads as a bug,
 * and the row must not shift under the cursor. The one exception is the completion slide,
 * where Path becomes the forward action and Next is removed, because there is no next
 * step to be temporarily unavailable. Its space is reserved so the row still holds still.
 */
export function StationNav({
  onBack,
  onNext,
  canGoBack,
  canGoNext,
  pathHref = "/",
  pathIsForward = false,
  onSound,
  soundLabel = "Play sound",
  progress,
}: {
  onBack: () => void;
  onNext: () => void;
  canGoBack: boolean;
  canGoNext: boolean;
  pathHref?: string;
  pathIsForward?: boolean;
  onSound?: () => void;
  soundLabel?: string;
  progress?: React.ReactNode;
}) {
  return (
    <nav className="flex items-end gap-2" aria-label="Lesson navigation">
      <Button
        onClick={onBack}
        disabled={!canGoBack}
        aria-label="Back"
        title="Back (Left Arrow)"
      >
        <span aria-hidden>←</span>
        <span>Back</span>
      </Button>

      <div className="flex flex-col items-stretch gap-2">
        {onSound && (
          <AudioButton
            onClick={onSound}
            label={soundLabel}
            className="audio-nav-stripe !w-full"
          />
        )}
        {progress}
        <Button
          href={pathHref}
          variant={pathIsForward ? "primary" : "secondary"}
          className="w-full"
          aria-label="Return to the path"
          title="Return to the path"
        >
          <PathIcon />
          <span>Path</span>
        </Button>
      </div>

      {/* On the completion slide Path is the forward action and there is no next step, so
          Next is removed rather than shown dead. Elsewhere it stays disabled per the rule
          above. The placeholder keeps Path in the same place either way, so the row does
          not shift when the learner reaches the end. */}
      {pathIsForward ? (
        <div aria-hidden className="pointer-events-none invisible">
          <Button>
            <span>Next</span>
            <span aria-hidden>→</span>
          </Button>
        </div>
      ) : (
        <Button
          variant="primary"
          onClick={onNext}
          disabled={!canGoNext}
          aria-label="Next"
          title="Next (Right Arrow)"
        >
          <span>Next</span>
          <span aria-hidden>→</span>
        </Button>
      )}
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
