"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  buildTrack1,
  buildTrack2,
  buildTrack3,
  FIRST_TEN,
  type ReadableWord,
  type Step,
} from "@/content/track1";
import {
  CheckpointProgress,
  ChoiceProgress,
  ConsolidationProgress,
  DrillProgress,
} from "@/content/drill";
import { makeQuestion, pickType, type Question, type QuestionType } from "@/content/question";
import { ShuffleBag } from "@/content/bag";
import { play, playRecording, primeAudio } from "@/lib/audio";
import { K_ROW, VOWELS, type Kana } from "@/content/hiragana";
import { GojuonGrid } from "@/components/gojuon-grid";
import { Button } from "@/components/button";
import { StationNav } from "@/components/station-nav";
import { WritingSurface } from "@/components/writing-surface";
import { SignTitle } from "@/components/sign-title";
import {
  loadLearnerState,
  persistIntroducedReviewTarget,
  persistReviewAttempt,
} from "@/lib/learner-state";
import {
  FIRST_STATIONS,
  reviewTargetKey,
  type ReviewTarget,
} from "@/content/station-spec";
import {
  BoundedReviewProgress,
  planOpeningReview,
  type OpeningReviewPlan,
} from "@/learning/session-planner";

/**
 * What differs between the kana-teaching stations. Everything else on this page (the
 * drill blocks, nav, audio, progress) is kana-agnostic, so stations 2 and 3 share it
 * and hand in only their own copy and content.
 *
 * Keyed by a plain string id rather than holding its own `build` function: a route is
 * a server component, and functions cannot cross into a client component. The id is
 * serializable, so `<Track1Page station="k-row" />` works from any route.
 */
type StationConfig = {
  title: string;
  /** The step queue for this station. */
  build: () => Step[];
  /** The kana taught here, for audio priming and the intro grid. */
  kana: Kana[];
  /** The intro slide's framing sentence. */
  introCopy: React.ReactNode;
  /** The context slide: the one idea to land after the learner has used the set. */
  context: { headline: string; body: React.ReactNode };
  /** The done slide: what they can now do, and what comes next. */
  done: { capability: string; next: string; completedId: string };
  /** The closing gojūon slide: which rows are already filled, and which one lands now. */
  grid: { headline: string; body: React.ReactNode; known: string[]; arriving?: string };
};

const VOWEL_STATION: StationConfig = {
  title: "First sounds.",
  build: buildTrack1,
  kana: VOWELS,
  introCopy: (
    <>
      Here is hiragana&rsquo;s whole vowel set. Japanese has exactly five, and they never
      shift, unlike English, where &ldquo;a&rdquo; sounds different in cat, car and cake.
    </>
  ),
  context: {
    headline: "This order stays the same.",
    body: (
      <>
        Japanese lists these sounds as あ い う え お, much like A-B-C in English. Every
        new row follows this same vowel order.
      </>
    ),
  },
  grid: {
    headline: "Here is where those five sit.",
    body: (
      <>
        All of hiragana, laid out the way Japanese lays it out: rows of five, each row a
        consonant sound crossed with the vowels you just learned. You have the top row,
        which is the one every other row is built on.
      </>
    ),
    known: [],
    arriving: "vowels",
  },
  done: {
    capability: "You can hear, say, and recognize all five Japanese vowel sounds. 5 of 46.",
    next: "Next comes the K row: か き く け こ. Those same five vowels again, each with a k in front, and at the end of it you will read your first real Japanese word.",
    completedId: "vowels",
  },
};

type DrillMeterData = { value: number; max: number };

const K_ROW_STATION: StationConfig = {
  title: "The K row.",
  build: buildTrack2,
  kana: K_ROW,
  introCopy: (
    <>
      Now the same five vowels with a k in front. Each one is a single sound, and there is
      no formula to work them out: five new shapes to learn.
    </>
  ),
  context: {
    headline: "Ten sounds, and a word you can read.",
    // One idea, and it must be one the intro did not already state. "Five vowels with a k
    // in front" is the intro's line, so repeating it here wastes the slide. The new fact
    // is the capability: ten kana is enough for real words, which sets up the えき beat.
    // No forward references: the gojūon table and the other rows are the book stop's job.
    body: (
      <>
        With the vowels, that is ten characters. Enough that some real Japanese words are
        now fully within reach, which is where this station ends.
      </>
    ),
  },
  grid: {
    headline: "Two rows down.",
    body: (
      <>
        The k row drops in under the vowels. Every row below works the same way: one
        consonant sound crossed with あ い う え お, in that order, every time. Two rows
        are yours, and the rest are the same shape.
      </>
    ),
    known: ["vowels"],
    arriving: "k-row",
  },
  done: {
    capability: "You can read the K row, and you read your first Japanese word. 10 of 46.",
    next: "Next is a look back: no new characters, just time with the ten you have, until they come without effort.",
    completedId: "k-row",
  },
};

const FIRST_LOOK_BACK_STATION: StationConfig = {
  title: "A first look back.",
  build: buildTrack3,
  kana: FIRST_TEN,
  introCopy: (
    <>
      No new characters here. Tap through the ten you know, then see which ones come
      back without help. A pause is useful information, not a failure.
    </>
  ),
  context: {
    // This checkpoint has no context step; the field stays present because teaching
    // stations share one serializable configuration shape.
    headline: "",
    body: null,
  },
  grid: {
    headline: "Ten characters, held together.",
    body: (
      <>
        Nothing new was added at this stop. The vowels and k row are still the same ten
        you arrived with, only easier to call back. That is what a look back is for.
      </>
    ),
    known: ["vowels", "k-row"],
  },
  done: {
    capability: "You can recall the vowels and K row together, and read えき again. 10 of 46.",
    next: "Next comes the S row: さ し す せ そ. Five new characters, built on the vowels you already know.",
    completedId: "look-back-1",
  },
};

/** The stations this page can render, by id. Routes pass the id, never the config. */
const STATIONS: Record<"vowels" | "k-row" | "look-back-1", StationConfig> = {
  vowels: VOWEL_STATION,
  "k-row": K_ROW_STATION,
  "look-back-1": FIRST_LOOK_BACK_STATION,
};

export type StationId = keyof typeof STATIONS;

const K_ROW_PREREQUISITES =
  FIRST_STATIONS.find((station) => station.identity.id === "k-row")?.prerequisites ?? [];

export default function Track1Page({ station: id = "vowels" }: { station?: StationId }) {
  const station = STATIONS[id];
  const [openingReview, setOpeningReview] = useState<OpeningReviewPlan | null>(null);
  const steps = useMemo(() => {
    const authored = station.build();
    if (id === "k-row" && openingReview?.kind === "none") {
      return authored.filter((step) => step.kind !== "reviewIntro" && step.kind !== "review");
    }
    return authored;
  }, [id, openingReview, station]);
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1); // 1 forward, -1 back
  const [drillBack, setDrillBack] = useState<(() => void) | null>(null);
  const [drillNext, setDrillNext] = useState<(() => void) | null>(null);
  const [drillSound, setDrillSound] = useState<(() => void) | null>(null);
  const [drillMeter, setDrillMeter] = useState<DrillMeterData | null>(null);
  const rowSoundIndex = useRef(0);

  useEffect(() => {
    if (id !== "k-row") {
      setOpeningReview(null);
      return;
    }

    // Compatibility bridge: learners who completed vowels before review-state existed
    // have no records yet. Course order tells us the targets were introduced, so seed
    // them due-now rather than silently skipping prerequisite review.
    let state = loadLearnerState();
    for (const target of K_ROW_PREREQUISITES) {
      if (!state.reviewRecords[reviewTargetKey(target)]) {
        persistIntroducedReviewTarget(target, new Date());
        state = loadLearnerState();
      }
    }
    setOpeningReview(
      planOpeningReview({ state, prerequisites: K_ROW_PREREQUISITES, now: new Date() }),
    );
  }, [id]);

  const step = steps[index]!;
  const atStart = index === 0;
  // Steps that drive their own completion, so the nav must not offer Next past them.
  const isPracticeStep =
    step.kind === "drill" ||
    step.kind === "guidedTrace" ||
    step.kind === "blankRecall" ||
    step.kind === "rehearse" ||
    step.kind === "review" ||
    step.kind === "match";

  function go(delta: number) {
    rowSoundIndex.current = 0;
    setDrillBack(null);
    setDrillNext(null);
    setDrillSound(null);
    setDrillMeter(null);
    setDirection(delta);
    setIndex((i) => Math.min(steps.length - 1, Math.max(0, i + delta)));
  }

  function jumpTo(nextIndex: number) {
    rowSoundIndex.current = 0;
    setDrillBack(null);
    setDrillNext(null);
    setDrillSound(null);
    setDrillMeter(null);
    setDirection(nextIndex < index ? -1 : 1);
    setIndex(Math.min(steps.length - 1, Math.max(0, nextIndex)));
  }

  const registerDrillNext = useCallback((handler: (() => void) | null) => {
    setDrillNext(handler ? () => handler : null);
  }, []);
  const registerDrillBack = useCallback((handler: (() => void) | null) => {
    setDrillBack(handler ? () => handler : null);
  }, []);
  const registerDrillSound = useCallback((
    handler: (() => void) | null,
    _kind: "button" | "glyph" | null,
  ) => {
    setDrillSound(handler ? () => handler : null);
  }, []);
  const registerDrillMeter = useCallback((meter: DrillMeterData | null) => {
    setDrillMeter(meter);
  }, []);

  // Lesson steps advance from Next; drills manage their own completion.
  const showNext = (!isPracticeStep && step.kind !== "done") || drillNext !== null;
  function back() {
    if (drillBack) {
      drillBack();
      return;
    }
    go(-1);
  }

  function next() {
    if (drillNext) {
      drillNext();
      return;
    }
    // Prime on the last tap before sound plays. The refresher slide leads into a drill on
    // an *earlier* pool, so prime that pool too rather than only the station's own kana.
    if (step.kind === "intro") primeAudio(station.kana);
    else if (step.kind === "reviewIntro") primeAudio(step.pool);
    go(1);
  }

  const slideSound =
    step.kind === "intro"
      ? () => {
          play(station.kana[rowSoundIndex.current % station.kana.length]!);
          rowSoundIndex.current = (rowSoundIndex.current + 1) % station.kana.length;
        }
      : step.kind === "reveal"
        ? () => {
            play(step.kana[rowSoundIndex.current % step.kana.length]!);
            rowSoundIndex.current = (rowSoundIndex.current + 1) % step.kana.length;
          }
        : step.kind === "context"
          ? () => {
              play(step.kana[rowSoundIndex.current % step.kana.length]!);
              rowSoundIndex.current = (rowSoundIndex.current + 1) % step.kana.length;
            }
        : step.kind === "teach" || step.kind === "blankRecall"
      ? () => play(step.kana)
      : drillSound;

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.metaKey || event.ctrlKey || event.altKey) return;
      const target = event.target instanceof HTMLElement ? event.target : null;
      if (
        target &&
        (target.isContentEditable || ["INPUT", "TEXTAREA", "SELECT"].includes(target.tagName))
      ) {
        return;
      }

      if (event.code === "Space") {
        if (slideSound) {
          event.preventDefault();
          target?.closest<HTMLButtonElement>("[data-floating-nav] button")?.blur();
          slideSound();
        } else if (target?.closest("[data-floating-nav]")) {
          event.preventDefault();
        }
        return;
      }

      if (event.key === "ArrowLeft" && !atStart) {
        event.preventDefault();
        back();
      } else if (event.key === "ArrowRight" && showNext) {
        event.preventDefault();
        next();
      }
    }

    window.addEventListener("keydown", handleKeyDown, true);
    return () => window.removeEventListener("keydown", handleKeyDown, true);
  });

  return (
    // pb leaves room for the two-tier floating nav (speaker above Path) so it never
    // covers lesson content.
    <main
      className={`relative mx-auto flex min-h-screen flex-col px-5 pt-8 ${
        // The gojūon slide is two columns, so it needs more than the reading measure
        // every other slide is held to.
        step.kind === "grid" ? "max-w-[900px]" : "max-w-[600px]"
      } ${
        isPracticeStep || step.kind === "intro"
          ? "pb-40"
          : step.kind === "grid"
            ? "pb-20" // the tall two-column slide; its caption already clears the nav
            : "pb-40"
      }`}
    >
      {process.env.NODE_ENV === "development" && (
        <DevStepControls steps={steps} index={index} onJump={jumpTo} />
      )}

      {/* the moving surface — CSS slide-in keyed per step (always settles visible) */}
      <div className="flex flex-1 items-center justify-center">
        <div key={index} className="w-full step-enter" data-dir={direction}>
          <StepView
            step={step}
            station={station}
            onAdvance={() => go(1)}
            onDrillBackChange={registerDrillBack}
            onDrillNextChange={registerDrillNext}
            onDrillSoundChange={registerDrillSound}
            onDrillMeterChange={registerDrillMeter}
            openingReview={openingReview}
          />
        </div>
      </div>

      <FloatingNav
        onBack={back}
        showBack={!atStart}
        showNext={showNext}
        onNext={next}
        drillMeter={isPracticeStep ? drillMeter : null}
        onSound={slideSound}
        pathHref={step.kind === "done" ? `/?completed=${station.done.completedId}` : "/"}
        pathIsForward={step.kind === "done"}
      />
    </main>
  );
}

/* ---------- chrome ---------- */

function devStepLabel(step: Step, index: number): string {
  switch (step.kind) {
    case "intro":
      return "Introduction";
    case "reviewIntro":
      return "Review introduction";
    case "review":
      return "Opening review";
    case "teach":
      return `Teach ${step.kana.glyph}`;
    case "reveal":
      return "Reveal the row";
    case "match":
      return "Guided matching";
    case "context":
      return "Context";
    case "drill":
      return step.role === "checkpoint"
        ? "Final checkpoint"
        : step.role === "consolidation"
          ? "Consolidation drill"
          : `Practice ${index}`;
    case "guidedTrace":
      return `Trace ${step.kana.glyph}`;
    case "blankRecall":
      return "Writing recall";
    case "rehearse":
      return "Speaking rehearsal";
    case "read":
      return `Read ${step.word.kana.map((kana) => kana.glyph).join("")}`;
    case "grid":
      return "Gojūon grid";
    case "done":
      return "Station complete";
  }
}

function DevStepControls({
  steps,
  index,
  onJump,
}: {
  steps: Step[];
  index: number;
  onJump: (index: number) => void;
}) {
  return (
    <aside
      data-dev-step-controls
      className="fixed right-3 top-3 z-20 flex items-center gap-2 rounded-[var(--radius-btn)] bg-surface p-2 shadow-[var(--shadow-card)]"
      aria-label="Development step controls"
    >
      <span className="px-1 text-xs font-semibold text-ink-muted">Dev</span>
      <Button
        icon
        variant="ghost"
        onClick={() => onJump(index - 1)}
        disabled={index === 0}
        aria-label="Previous step, bypassing completion"
        title="Previous step"
      >
        <span aria-hidden>‹</span>
      </Button>
      <label className="sr-only" htmlFor="dev-step-picker">
        Jump to station step
      </label>
      <select
        id="dev-step-picker"
        value={index}
        onChange={(event) => onJump(Number(event.target.value))}
        className="h-11 max-w-[min(46vw,240px)] rounded-[var(--radius-btn)] border border-line bg-bg px-3 text-sm font-medium text-ink outline-none focus-visible:border-accent focus-visible:ring-2 focus-visible:ring-accent/30"
      >
        {steps.map((step, stepIndex) => (
          <option key={`${step.kind}-${stepIndex}`} value={stepIndex}>
            {stepIndex + 1}/{steps.length} · {devStepLabel(step, stepIndex + 1)}
          </option>
        ))}
      </select>
      <Button
        icon
        variant="ghost"
        onClick={() => onJump(index + 1)}
        disabled={index === steps.length - 1}
        aria-label="Next step, bypassing completion"
        title="Next step"
      >
        <span aria-hidden>›</span>
      </Button>
    </aside>
  );
}

/** Floating control cluster — pinned to the bottom, out of the content's way. */
function FloatingNav({
  onBack,
  showBack,
  showNext,
  onNext,
  drillMeter,
  onSound,
  pathHref,
  pathIsForward,
}: {
  onBack: () => void;
  showBack: boolean;
  showNext: boolean;
  onNext: () => void;
  drillMeter: DrillMeterData | null;
  onSound: (() => void) | null;
  pathHref: string;
  pathIsForward: boolean;
}) {
  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-10 flex justify-center pb-6">
      <div data-floating-nav className="pointer-events-auto flex flex-col items-center gap-2">
        <StationNav
          onBack={onBack}
          onNext={onNext}
          canGoBack={showBack}
          canGoNext={showNext}
          pathHref={pathHref}
          pathIsForward={pathIsForward}
          onSound={onSound ?? undefined}
          progress={
            drillMeter ? <DrillPath value={drillMeter.value} max={drillMeter.max} /> : undefined
          }
        />
      </div>
    </div>
  );
}

function DrillPath({ value, max }: DrillMeterData) {
  const percent = max === 0 ? 0 : Math.round((value / max) * 100);
  return (
    <div
      role="progressbar"
      aria-label="Practice progress"
      aria-valuemin={0}
      aria-valuemax={max}
      aria-valuenow={value}
      aria-valuetext={`${percent}% complete`}
      className="my-1 flex h-5 items-center justify-center"
    >
      {Array.from({ length: max }, (_, index) => {
        const complete = index < value;
        const current = index === value;
        const startsNewChoiceLevel = max === 9 && [3, 5, 7].includes(index);
        const heights = [8, 12, 9];
        return (
          <span
            key={index}
            aria-hidden
            className={`block w-[3px] rounded-full transition-[height,background-color,transform] duration-200 ease-out motion-reduce:transition-none ${
              startsNewChoiceLevel ? "ml-2.5" : "ml-1.5 first:ml-0"
            } ${
              complete
                ? "bg-ink"
                : current
                  ? "scale-x-150 bg-accent"
                  : "bg-line"
            }`}
            style={{ height: `${heights[index % heights.length]}px` }}
          />
        );
      })}
    </div>
  );
}

/* ---------- step surface ---------- */

function StepView({
  step,
  station,
  onAdvance,
  onDrillBackChange,
  onDrillNextChange,
  onDrillSoundChange,
  onDrillMeterChange,
  openingReview,
}: {
  step: Step;
  station: StationConfig;
  onAdvance: () => void;
  onDrillBackChange: (handler: (() => void) | null) => void;
  onDrillNextChange: (handler: (() => void) | null) => void;
  onDrillSoundChange: (
    handler: (() => void) | null,
    kind: "button" | "glyph" | null,
  ) => void;
  onDrillMeterChange: (meter: DrillMeterData | null) => void;
  openingReview: OpeningReviewPlan | null;
}) {
  const plannedReviewIds = new Set(openingReview?.targets.map((target) => target.itemId));
  const plannedReviewKana = VOWELS.filter((kana) => plannedReviewIds.has(kana.id));

  return (
    <div className={step.kind === "guidedTrace" || step.kind === "blankRecall" ? "py-3" : "py-10"}>
      {step.kind === "intro" ? (
        <IntroStep station={station} />
      ) : step.kind === "teach" ? (
        <TeachStep kana={step.kana} />
      ) : step.kind === "reveal" ? (
        <RevealStep kana={step.kana} />
      ) : step.kind === "context" ? (
        <HiraganaContextStep kana={step.kana} context={station.context} />
      ) : step.kind === "read" ? (
        <ReadWordStep word={step.word} onSoundChange={onDrillSoundChange} />
      ) : step.kind === "grid" ? (
        <GridStep grid={station.grid} />
      ) : step.kind === "match" ? (
        <MatchStep pool={step.pool} onDone={onAdvance} onSoundChange={onDrillSoundChange} />
      ) : step.kind === "guidedTrace" ? (
        <GuidedTraceStep
          kana={step.kana}
          onDone={onAdvance}
          onNavNextChange={onDrillNextChange}
        />
      ) : step.kind === "blankRecall" ? (
        <BlankRecallStep
          kana={step.kana}
          onDone={onAdvance}
          onNavNextChange={onDrillNextChange}
        />
      ) : step.kind === "reviewIntro" ? (
        <ReviewIntroStep
          kana={plannedReviewKana.length > 0 ? plannedReviewKana : step.pool}
          targetCount={openingReview?.targets.length ?? step.pool.length}
        />
      ) : step.kind === "review" ? (
        <DrillBlock
          pool={step.pool}
          types={["hearPickChar", "seePickSound"]}
          onDone={onAdvance}
          onNavBackChange={onDrillBackChange}
          onNavNextChange={onDrillNextChange}
          onSoundChange={onDrillSoundChange}
          onMeterChange={onDrillMeterChange}
          role="opening-review"
          reviewTargets={openingReview?.targets ?? []}
        />
      ) : step.kind === "rehearse" ? (
        <DrillBlock
          pool={step.pool}
          types={["sayAloud"]}
          onDone={onAdvance}
          onNavBackChange={onDrillBackChange}
          onNavNextChange={onDrillNextChange}
          onSoundChange={onDrillSoundChange}
          onMeterChange={onDrillMeterChange}
          role="practice"
        />
      ) : step.kind === "drill" ? (
        <DrillBlock
          pool={step.pool}
          types={step.types}
          onDone={onAdvance}
          onNavBackChange={onDrillBackChange}
          onNavNextChange={onDrillNextChange}
          onSoundChange={onDrillSoundChange}
          onMeterChange={onDrillMeterChange}
          role={step.role}
          persistCheckpointEvidence={
            station.done.completedId === "vowels" && step.role === "checkpoint"
          }
        />
      ) : (
        <DoneStep done={station.done} />
      )}
    </div>
  );
}

/* ---------- steps ---------- */

function IntroStep({ station }: { station: StationConfig }) {
  return (
    <div className="mx-auto flex max-w-md flex-col items-center gap-7 text-center">
      <SignTitle title={station.title} />
      <p className="max-w-sm text-sm leading-relaxed text-ink-muted text-pretty">
        {station.introCopy}
      </p>
      <div className="grid w-full grid-cols-5 overflow-hidden rounded-[var(--radius-lg)] border-2 border-ink bg-accent">
        {station.kana.map((k, index) => (
          <span
            key={k.id}
            className={`flex min-h-28 flex-col items-center justify-center gap-1 ${
              index % 5 > 0 ? "border-l-2 border-ink" : ""
            } ${
              index >= 5 ? "border-t-2 border-ink" : ""
            }`}
          >
            <span className="font-kana text-5xl leading-none text-ink">{k.glyph}</span>
            <span className="text-sm font-light tracking-wide text-ink-faint">{k.say}</span>
          </span>
        ))}
      </div>
    </div>
  );
}

/**
 * Renders hint prose with any kana in it set as a chip: kana font, bordered, on a raised
 * fill. Inline at body size they read as part of the sentence and are easy to skim past,
 * which defeats the point of a hint that says "the same vowel as う".
 */
/** Every kana the app can gloss, by glyph, so a chip can show its sound alongside it. */
const SAY_BY_GLYPH = new Map([...VOWELS, ...K_ROW].map((k) => [k.glyph, k.say]));

function KanaInText({ text }: { text: string }) {
  // Hiragana and katakana blocks, plus the long-vowel mark. Split keeps the separators.
  const parts = text.split(/([ぁ-ゖァ-ヺー]+)/);
  return (
    <>
      {parts.map((part, i) =>
        i % 2 === 1 ? (
          <span
            key={i}
            className="mx-px inline-flex items-baseline gap-1 rounded-[var(--radius-btn)] border-2 border-ink bg-accent px-1.5 py-0.5 align-baseline text-ink"
          >
            <span className="font-kana text-base leading-none">{part}</span>
            {SAY_BY_GLYPH.get(part) && (
              <span className="text-xs leading-none text-ink-muted">
                {SAY_BY_GLYPH.get(part)}
              </span>
            )}
          </span>
        ) : (
          part
        ),
      )}
    </>
  );
}

function TeachStep({ kana }: { kana: Kana }) {
  // auto-play the sound when the step first appears. Just enough delay to let the
  // slide paint first, so the glyph is on screen when its sound arrives. The old
  // 250 ms was tuned when playback itself was slow; now that it is ~1 ms, that
  // padding is pure lag.
  useEffect(() => {
    const t = setTimeout(() => play(kana), 60);
    return () => clearTimeout(t);
  }, [kana]);

  return (
    <div className="mx-auto flex max-w-md flex-col items-center gap-7 text-center">
      <div className="flex w-full flex-col items-center gap-3 rounded-[var(--radius-lg)] border-2 border-ink bg-accent px-8 py-6">
        <span className="select-none font-kana text-[11rem] leading-none text-ink sm:text-[13rem]">
          {kana.glyph}
        </span>
        <span className="text-lg font-light tracking-wide text-ink-faint">{kana.say}</span>
      </div>
      <p className="max-w-xs text-sm leading-relaxed text-ink-muted text-pretty">
        <KanaInText text={kana.hints[0]!} />
      </p>
    </div>
  );
}

function RevealStep({ kana }: { kana: Kana[] }) {
  return (
    <div className="mx-auto grid w-full max-w-md grid-cols-5 overflow-hidden rounded-[var(--radius-lg)] border-2 border-ink bg-accent text-center">
      {kana.map((k, i) => (
        <span
          key={k.id}
          className={`kana-rise flex min-h-32 flex-col items-center justify-center gap-1.5 ${
            i > 0 ? "border-l-2 border-ink" : ""
          }`}
          style={{ animationDelay: `${0.1 + i * 0.09}s` }}
        >
          <span className="font-kana text-7xl leading-none text-ink">{k.glyph}</span>
          <span className="text-sm font-light tracking-wide text-ink-faint">{k.say}</span>
        </span>
      ))}
    </div>
  );
}

function HiraganaContextStep({
  kana,
  context,
}: {
  kana: Kana[];
  context: StationConfig["context"];
}) {
  return (
    <div className="mx-auto flex max-w-md flex-col items-center gap-7 text-center">
      <SignTitle title={context.headline} />
      <p className="flex w-full justify-center gap-4 rounded-[var(--radius-lg)] border-2 border-ink bg-accent px-5 py-6 font-kana text-6xl leading-none text-ink">
        {kana.map((k) => (
          <span key={k.id}>{k.glyph}</span>
        ))}
      </p>
      <p className="text-sm leading-relaxed text-ink-muted text-pretty">{context.body}</p>
    </div>
  );
}

/**
 * Open-book pairing, between teaching and the graded drills.
 *
 * The whole set stays on screen and one sound plays at a time: find it and tap it. This
 * is deliberately not assessment. Nothing is scored, a wrong tap only replays the sound,
 * and the answer is always visible somewhere on screen. Its job is to build the
 * sound-to-shape link while both are in front of the learner, so that the graded drill
 * that follows is retrieval rather than a coin flip.
 */
function MatchStep({
  pool,
  onDone,
  onSoundChange,
}: {
  pool: Kana[];
  onDone: () => void;
  onSoundChange: (handler: (() => void) | null, kind: "button" | "glyph" | null) => void;
}) {
  // Each sound is asked once, in a random order fixed for the life of the step.
  const order = useRef<Kana[]>([]);
  if (order.current.length === 0) {
    const shuffled = [...pool];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j]!, shuffled[i]!];
    }
    order.current = shuffled;
  }

  const [at, setAt] = useState(0);
  const [wrong, setWrong] = useState<string | null>(null);
  const [found, setFound] = useState<string[]>([]);
  const advanceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const target = order.current[at];

  useEffect(() => () => {
    if (advanceTimer.current) clearTimeout(advanceTimer.current);
  }, []);

  // Play the current target when it changes, so the learner always has a sound to hunt.
  useEffect(() => {
    if (!target) return;
    const t = setTimeout(() => play(target), 60);
    return () => clearTimeout(t);
  }, [target]);

  useEffect(() => {
    if (!target) {
      onSoundChange(null, null);
      return;
    }
    onSoundChange(() => play(target), "button");
    return () => onSoundChange(null, null);
  }, [target, onSoundChange]);

  function tap(k: Kana) {
    if (!target || advanceTimer.current) return;
    if (k.id !== target.id) {
      // A miss is not a failure here: replay the target so the pairing is reinforced.
      setWrong(k.id);
      play(target);
      setTimeout(() => setWrong(null), 600);
      return;
    }
    setFound((f) => [...f, k.id]);
    advanceTimer.current = setTimeout(() => {
      advanceTimer.current = null;
      if (at + 1 >= order.current.length) onDone();
      else setAt((i) => i + 1);
    }, 650);
  }

  return (
    <div className="mx-auto flex max-w-md flex-col items-center gap-8 text-center">
      <p className={DRILL_PROMPT}>Which one is this? Tap it.</p>

      <div className="flex w-full flex-wrap items-center justify-center gap-3">
        {pool.map((k) => {
          const isFound = found.includes(k.id);
          const isWrong = wrong === k.id;
          return (
            <Button
              key={k.id}
              onClick={() => tap(k)}
              aria-label={`Choose ${k.glyph}`}
              className={`${CHOICE_BUTTON} flex-col gap-1 ${
                isFound
                  ? "border-ink !bg-accent text-ink"
                  : isWrong
                    // A miss must be unmistakable without relying on hearing the replay.
                    ? "!border-error !bg-surface-2 text-ink-faint"
                    : "text-ink"
              }`}
            >
              <span className="font-kana text-5xl leading-none">{k.glyph}</span>
              {/* The sound appears only once found, and is not in the DOM before that:
                  hiding it with a transparent colour would still let a screen reader
                  announce every answer. The empty span holds the row height. */}
              <span className="min-h-[16px] text-xs font-medium tracking-wide text-ink/65">
                {isFound ? k.say : ""}
              </span>
            </Button>
          );
        })}
      </div>

      <p className="min-h-[20px] text-sm text-ink-muted">
        {found.length} of {pool.length}
      </p>
    </div>
  );
}

/**
 * Frames the refresher that follows. Without this, a station billed as the k row opens
 * by drilling あいうえお with no explanation, which reads as a mistake.
 */
function ReviewIntroStep({ kana, targetCount }: { kana: Kana[]; targetCount: number }) {
  return (
    <div className="mx-auto flex max-w-md flex-col items-center gap-7 text-center">
      <SignTitle title="A quick look back." />
      <p className="flex w-full justify-center gap-4 rounded-[var(--radius-lg)] border-2 border-ink bg-accent px-5 py-6 font-kana text-5xl leading-none text-ink">
        {kana.map((k) => (
          <span key={k.id}>{k.glyph}</span>
        ))}
      </p>
      <p className="text-sm leading-relaxed text-ink-muted text-pretty">
        {targetCount} earlier {targetCount === 1 ? "connection is" : "connections are"}
        {" "}ready for another pass. A pause is useful information, not a failure.
      </p>
    </div>
  );
}

function ReviewTransition({
  kind,
  recoveryCount,
  recoveryHadMiss,
}: {
  kind: "recovery" | "complete";
  recoveryCount: number;
  recoveryHadMiss: boolean;
}) {
  if (kind === "recovery") {
    return (
      <div className="mx-auto flex max-w-sm flex-col items-center gap-6 text-center">
        <SignTitle
          title={`Let’s see ${recoveryCount === 1 ? "that one" : `${recoveryCount} of those`} once more.`}
        />
        <p className="leading-relaxed text-ink-muted text-pretty">
          No need to restart. Only the connections that paused are coming back.
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto flex max-w-sm flex-col items-center gap-6 text-center">
      <SignTitle
        title={recoveryHadMiss ? "That’s enough for today." : "Good. Let’s continue."}
      />
      <p className="leading-relaxed text-ink-muted text-pretty">
        {recoveryHadMiss
          ? "We’ll bring those connections back again later. Your place on the path has not changed."
          : "The earlier sounds are ready for what comes next."}
      </p>
    </div>
  );
}

/**
 * The first-word beat: the learner decodes えき themselves, kana by kana, before the
 * meaning is shown. The shared speaker button reveals and plays the whole word.
 */
function ReadWordStep({
  word,
  onSoundChange,
}: {
  word: ReadableWord;
  onSoundChange: (handler: (() => void) | null, kind: "button" | "glyph" | null) => void;
}) {
  const [revealed, setRevealed] = useState(false);
  const playAndReveal = useCallback(() => {
    setRevealed(true);
    playRecording(word.audioSrc);
  }, [word.audioSrc]);

  useEffect(() => {
    onSoundChange(playAndReveal, "button");
    return () => onSoundChange(null, null);
  }, [onSoundChange, playAndReveal]);

  return (
    <div className="mx-auto flex max-w-md flex-col items-center gap-6 text-center">
      <p className={DRILL_PROMPT}>You know every sound in this word. Read it.</p>

      <div className="flex w-full items-end justify-center gap-3 rounded-[var(--radius-lg)] border-2 border-ink bg-accent px-6 py-6">
        {/* No `say` labels here, unlike the teaching slides: this is the one beat that
            asks the learner to decode unaided, and Latin letters under the kana would
            be exactly the crutch they could read instead (P2). */}
        {word.kana.map((k) => (
          <span key={k.id} className="font-kana text-[7rem] leading-none text-ink">
            {k.glyph}
          </span>
        ))}
      </div>

      {/* The meaning stays hidden until they have tried, so the decoding is theirs. */}
      <div className={`flex flex-col gap-2 transition-opacity duration-300 ${revealed ? "opacity-100" : "opacity-0"}`}>
        <p className="text-2xl font-medium text-ink">{word.meaning}</p>
        <p className="text-sm leading-relaxed text-ink-muted text-pretty">{word.note}</p>
      </div>

      {!revealed && (
        <p className="text-sm text-ink-muted">Say it out loud, then use the speaker below to check.</p>
      )}
    </div>
  );
}

/**
 * One drill block. Runs a single question type (or a mix, for the capstone) over
 * the pool until the learner is consistent, then advances. Choice-only blocks
 * progress from 2 → 3 → 4 → 5 options; other blocks cover every vowel once.
 */
function DrillBlock({
  pool,
  types,
  onDone,
  onNavBackChange,
  onNavNextChange,
  onSoundChange,
  onMeterChange,
  role,
  persistCheckpointEvidence = false,
  reviewTargets = [],
}: {
  pool: Kana[];
  types: QuestionType[];
  onDone: () => void;
  onNavBackChange: (handler: (() => void) | null) => void;
  onNavNextChange: (handler: (() => void) | null) => void;
  onSoundChange: (
    handler: (() => void) | null,
    kind: "button" | "glyph" | null,
  ) => void;
  onMeterChange: (meter: DrillMeterData | null) => void;
  role: "practice" | "checkpoint" | "consolidation" | "opening-review";
  persistCheckpointEvidence?: boolean;
  reviewTargets?: readonly ReviewTarget[];
}) {
  // A shuffle bag draws every vowel once before repeating, so all five come up.
  const bag = useRef(new ShuffleBag(pool));
  const progress = useRef(new DrillProgress(pool.map((k) => k.id)));
  const choices = useRef(new ChoiceProgress(pool.length));
  const checkpoint = useRef(
    new CheckpointProgress(
      pool.map((kana) => kana.id),
      types.filter(
        (type): type is "hearPickChar" | "seePickSound" =>
          type === "hearPickChar" || type === "seePickSound",
      ),
    ),
  );
  const consolidation = useRef(
    new ConsolidationProgress(pool.map((kana) => kana.id)),
  );
  const boundedReview = useRef(new BoundedReviewProgress(reviewTargets));
  const history = useRef<Question[]>([]);
  const future = useRef<Question[]>([]);
  const spokenAdvanceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const spokenAnswered = useRef(false);
  const spokenAttempts = useRef(0);
  const isChoiceBlock = types.every(
    (type) => type === "hearPickChar" || type === "seePickSound",
  );
  const isCoverageCheckpoint = role === "checkpoint";
  const isConsolidation = role === "consolidation";
  const isBoundedReview = role === "opening-review" && reviewTargets.length > 0;
  const isSpeakBlock = types.length === 1 && types[0] === "sayAloud";
  const speakTarget = pool.length * 2;
  const [qNum, setQNum] = useState(0); // increments per question → fresh sub-component
  const [reviewInterstitial, setReviewInterstitial] = useState<"recovery" | "complete" | null>(null);

  function makeCheckpointQuestion(): Question {
    const target = checkpoint.current.current;
    const answer = pool.find((kana) => kana.id === target.itemId);
    if (!answer) throw new Error(`Checkpoint item ${target.itemId} is not in its pool.`);
    return makeQuestion(pool, answer, target.type, pool.length);
  }

  function makeReviewQuestion(): Question {
    const target = boundedReview.current.current;
    const answer = pool.find((kana) => kana.id === target.itemId);
    if (!answer) throw new Error(`Review item ${target.itemId} is not in its pool.`);
    const type =
      target.capability === "sound-to-symbol" ? "hearPickChar" : "seePickSound";
    return makeQuestion(pool, answer, type, pool.length);
  }

  function makeConsolidationQuestion(): Question {
    const target = consolidation.current.current;
    const answer = pool.find((kana) => kana.id === target.itemId);
    if (!answer) throw new Error(`Consolidation item ${target.itemId} is not in its pool.`);
    return makeQuestion(pool, answer, target.type, pool.length);
  }

  const [q, setQ] = useState<Question>(() =>
    isBoundedReview
      ? makeReviewQuestion()
      : isConsolidation
        ? makeConsolidationQuestion()
      : isCoverageCheckpoint
      ? makeCheckpointQuestion()
      : makeQuestion(
          pool,
          bag.current.next(),
          pickType(types),
          isChoiceBlock ? choices.current.optionCount : pool.length,
        ),
  );
  const progressValue = isBoundedReview
    ? boundedReview.current.completedCount
    : isConsolidation
      ? consolidation.current.completedCount
    : isCoverageCheckpoint
      ? checkpoint.current.completedCount
    : isChoiceBlock
      ? choices.current.masteryPoints
      : isSpeakBlock
        ? spokenAttempts.current
        : progress.current.completedCount;
  const progressMax = isBoundedReview
    ? boundedReview.current.promptCount
    : isConsolidation
      ? consolidation.current.targetCount
    : isCoverageCheckpoint
      ? checkpoint.current.targetCount
    : isChoiceBlock
      ? choices.current.maxPoints
      : isSpeakBlock
        ? speakTarget
        : progress.current.totalCount;

  useEffect(() => {
    if (!persistCheckpointEvidence) return;
    const now = new Date();
    for (const kana of pool) {
      for (const capability of ["sound-to-symbol", "symbol-to-sound"] as const) {
        persistIntroducedReviewTarget({ itemId: kana.id, capability }, now);
      }
    }
  }, [persistCheckpointEvidence, pool]);

  useEffect(() => {
    onMeterChange({ value: progressValue, max: progressMax });
    return () => onMeterChange(null);
  }, [onMeterChange, progressMax, progressValue]);

  useEffect(() => {
    spokenAnswered.current = false;
    return () => {
      if (spokenAdvanceTimer.current) clearTimeout(spokenAdvanceTimer.current);
    };
  }, [qNum]);

  function advance(correct: boolean) {
    const activeCheckpointTarget = isCoverageCheckpoint ? checkpoint.current.current : null;
    const activeReviewTarget = isBoundedReview ? boundedReview.current.current : null;
    const capability =
      q.type === "hearPickChar"
        ? "sound-to-symbol"
        : q.type === "seePickSound"
          ? "symbol-to-sound"
          : null;
    if (persistCheckpointEvidence && capability) {
      persistReviewAttempt(
        { itemId: q.answer.id, capability },
        {
          correct,
          source: activeCheckpointTarget?.recovery ? "recovery" : "checkpoint",
        },
        new Date(),
      );
    }
    if (activeReviewTarget) {
      persistReviewAttempt(
        { itemId: activeReviewTarget.itemId, capability: activeReviewTarget.capability },
        {
          correct,
          source: activeReviewTarget.recovery ? "recovery" : "review",
        },
        new Date(),
      );
    }

    if (isBoundedReview) boundedReview.current.mark(correct);
    else if (isConsolidation) consolidation.current.mark(correct);
    else if (isCoverageCheckpoint) checkpoint.current.mark(correct);
    else if (isChoiceBlock) choices.current.mark(correct);
    else if (isSpeakBlock) spokenAttempts.current += 1;
    else progress.current.mark(q.answer.id, correct);

    const done = isBoundedReview
      ? boundedReview.current.done
      : isConsolidation
        ? consolidation.current.done
      : isCoverageCheckpoint
        ? checkpoint.current.done
      : isChoiceBlock
        ? choices.current.done
        : isSpeakBlock
          ? spokenAttempts.current >= speakTarget
          : progress.current.done;
    if (isBoundedReview && done) {
      setReviewInterstitial("complete");
      return;
    }
    if (
      isBoundedReview &&
      activeReviewTarget &&
      !activeReviewTarget.recovery &&
      boundedReview.current.current.recovery
    ) {
      setReviewInterstitial("recovery");
      return;
    }
    if (done) {
      onDone();
      return;
    }

    history.current.push(q);
    future.current = [];
    setQ(
      isBoundedReview
        ? makeReviewQuestion()
        : isConsolidation
          ? makeConsolidationQuestion()
        : isCoverageCheckpoint
          ? makeCheckpointQuestion()
        : makeQuestion(
            pool,
            bag.current.next(q.answer.id),
            pickType(types),
            isChoiceBlock ? choices.current.optionCount : pool.length,
          ),
    );
    setQNum((n) => n + 1);
  }

  function moveBack() {
    const previous = history.current.pop();
    if (!previous) return;
    future.current.push(q);
    setQ(previous);
    setQNum((n) => n + 1);
  }

  function revealSpokenAnswer() {
    if (spokenAnswered.current) return;
    spokenAnswered.current = true;
    play(q.answer);
    spokenAdvanceTimer.current = setTimeout(() => advance(true), 1000);
  }

  useEffect(() => {
    if (reviewInterstitial) {
      onNavBackChange(null);
      onSoundChange(null, null);
      let used = false;
      onNavNextChange(() => {
        if (used) return;
        used = true;
        if (reviewInterstitial === "complete") {
          onDone();
          return;
        }
        setQ(makeReviewQuestion());
        setQNum((n) => n + 1);
        setReviewInterstitial(null);
      });
      return () => {
        onNavNextChange(null);
        onSoundChange(null, null);
      };
    }

    const usesQuestionHistory = q.type === "sayAloud";
    if (usesQuestionHistory && history.current.length > 0) {
      let used = false;
      onNavBackChange(() => {
        if (used) return;
        used = true;
        moveBack();
      });
    } else {
      onNavBackChange(null);
    }

    onNavNextChange(null);

    if (q.type === "hearPickChar" || q.type === "sayAloud") {
      onSoundChange(
        q.type === "sayAloud" ? revealSpokenAnswer : () => play(q.answer),
        q.type === "sayAloud" ? "glyph" : "button",
      );
    } else {
      onSoundChange(null, null);
    }

    return () => {
      onNavBackChange(null);
      onNavNextChange(null);
      onSoundChange(null, null);
    };
  }, [
    qNum,
    q.type,
    reviewInterstitial,
    onNavBackChange,
    onNavNextChange,
    onSoundChange,
  ]);

  return (
    <div className="w-full">
      {reviewInterstitial ? (
        <ReviewTransition
          kind={reviewInterstitial}
          recoveryCount={boundedReview.current.recoveryCount}
          recoveryHadMiss={boundedReview.current.recoveryHadMiss}
        />
      ) : q.type === "sayAloud" ? (
        <SayAloudQuestion key={qNum} q={q} />
      ) : (
        <PickQuestion
          key={qNum}
          q={q}
          onAnswered={advance}
        />
      )}
    </div>
  );
}

/** A recognition question: pick the character (hear) or the sound (see). */
const DRILL_SHELL = "flex w-full flex-col items-center gap-8 text-center";
const PICK_DRILL_SHELL = "flex w-full flex-col items-center gap-6 text-center";
const DRILL_PROMPT = "relative pb-3 text-xl font-semibold text-ink after:absolute after:bottom-0 after:left-1/2 after:h-1 after:w-12 after:-translate-x-1/2 after:rounded-sm after:bg-accent";
const DRILL_GLYPH = "select-none font-kana text-[9rem] font-semibold leading-none";
const CHOICE_BUTTON = "h-24 w-24 shrink-0 !p-0";

function PickQuestion({
  q,
  onAnswered,
}: {
  q: Question;
  onAnswered: (correct: boolean) => void;
}) {
  const answered = useRef(false);
  const advanceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [picked, setPicked] = useState<string | null>(null);

  useEffect(
    () => () => {
      if (advanceTimer.current) clearTimeout(advanceTimer.current);
    },
    [],
  );

  // "hear → pick": play the target on appear. "see → pick sound": the character
  // is the prompt, so no auto audio (that'd give the answer away).
  useEffect(() => {
    if (q.type !== "hearPickChar") return;
    play(q.answer);
  }, [q]);

  function choose(k: Kana) {
    if (answered.current) return;
    answered.current = true;
    const correct = k.id === q.answer.id;
    setPicked(k.id);
    // On seePickSound the selected answer is itself a sound, so feedback plays it. On
    // hearPickChar (Practice 11), a wrong shape stays silent rather than revealing the
    // correct sound. The learner can deliberately replay the prompt from the nav.
    if (q.type === "seePickSound") play(correct ? k : q.answer);
    advanceTimer.current = setTimeout(
      () => onAnswered(correct),
      q.type === "hearPickChar" ? (correct ? 600 : 850) : correct ? 1000 : 1600,
    );
  }

  return (
    <div className={PICK_DRILL_SHELL}>
      {q.type === "hearPickChar" ? (
        <p className={DRILL_PROMPT}>Which one did you hear?</p>
      ) : (
        <div className="flex flex-col items-center gap-6">
          <p className={DRILL_PROMPT}>Which sound is this?</p>
          <span className={`${DRILL_GLYPH} text-ink`}>{q.answer.glyph}</span>
        </div>
      )}

      <div className="flex w-full flex-wrap items-center justify-center gap-3">
        {q.options.map((k) => {
          const isCorrect = picked !== null && k.id === q.answer.id;
          const isPicked = picked === k.id;
          const isAlternative = picked !== null && k.id !== q.answer.id;
          const answeredCorrectly = picked === q.answer.id;
          const feedbackClass =
            q.type === "hearPickChar"
              ? picked === null
                ? ""
                : answeredCorrectly
                  ? isCorrect
                    ? "!bg-accent text-ink"
                    : "opacity-25"
                  : isPicked
                    ? "!border-error !bg-surface-2 text-ink"
                    : "opacity-55"
              : isCorrect
                ? answeredCorrectly
                  ? "answer-success !bg-accent text-ink"
                  : "scale-125 !bg-accent text-ink motion-reduce:scale-100"
                : isAlternative
                  ? answeredCorrectly
                    ? "opacity-0"
                    : "opacity-10"
                  : "text-ink";

          return (
            <Button
              key={k.id}
              onClick={() => choose(k)}
              className={`${CHOICE_BUTTON} ${feedbackClass}`}
            >
              {q.type === "seePickSound" ? (
                <span className="text-2xl font-semibold">{k.say}</span>
              ) : (
                <span className="font-kana text-6xl font-semibold">{k.glyph}</span>
              )}
            </Button>
          );
        })}
      </div>
      <span aria-live="polite" className="sr-only">
        {picked
          ? picked === q.answer.id
            ? "Correct"
            : `Not correct. The correct answer is ${q.answer.say}.`
          : ""}
      </span>
    </div>
  );
}

/**
 * Production drill: see the character → say it out loud → tap to hear the native
 * sound. It then advances automatically. No speech recognition or self-grading:
 * the act of vocalizing and comparing is the practice.
 */
function SayAloudQuestion({ q }: { q: Question }) {
  return (
    <div className={DRILL_SHELL}>
      <p className={DRILL_PROMPT}>Say this sound.</p>

      <div className="flex flex-col items-center px-8 py-2">
        <span className={`${DRILL_GLYPH} text-ink`}>{q.answer.glyph}</span>
      </div>
      <p className="text-sm text-ink-muted">Try it, then use the speaker below to check.</p>
    </div>
  );
}

function GuidedTraceStep({
  kana,
  onDone,
  onNavNextChange,
}: {
  kana: Kana;
  onDone: () => void;
  onNavNextChange: (handler: (() => void) | null) => void;
}) {
  return (
    <div className="mx-auto flex max-w-xl flex-col items-center gap-3 text-center">
      <SignTitle title="Write あ." />
      <WritingSurface
        glyph={kana.glyph}
        onReadyChange={(ready) => onNavNextChange(ready ? onDone : null)}
      />
    </div>
  );
}

function BlankRecallStep({
  kana,
  onDone,
  onNavNextChange,
}: {
  kana: Kana;
  onDone: () => void;
  onNavNextChange: (handler: (() => void) | null) => void;
}) {
  return (
    <div className="mx-auto flex max-w-xl flex-col items-center gap-3 text-center">
      <SignTitle title="Write the sound you hear." />
      <WritingSurface
        glyph={kana.glyph}
        mode="recall"
        onReadyChange={(ready) => onNavNextChange(ready ? onDone : null)}
      />
    </div>
  );
}

function GridStep({ grid }: { grid: StationConfig["grid"] }) {
  return (
    // Two columns: the table on the left, the copy centered against it on the right.
    // Stacked on narrow screens, where the grid sits above the text.
    // Anchored left rather than centered as a pair: on a wide screen a centered
    // grid+text unit floats as an island with no edge to line up against.
    <div className="flex flex-col items-center gap-8 text-center sm:flex-row sm:items-center sm:justify-start sm:gap-12 sm:text-left">
      <div className="sm:shrink-0">
        <GojuonGrid known={grid.known} arriving={grid.arriving} />
      </div>
      <div className="flex max-w-sm flex-col items-center gap-5 sm:items-start">
        <SignTitle title={grid.headline} />
        <p className="text-sm leading-relaxed text-ink-muted text-pretty">{grid.body}</p>
      </div>
    </div>
  );
}

function DoneStep({ done }: { done: StationConfig["done"] }) {
  return (
    <div className="mx-auto flex max-w-md flex-col items-center gap-7 text-center">
      <SignTitle title="Station complete." />
      <p className="w-full rounded-[var(--radius-lg)] border-2 border-ink bg-accent px-6 py-5 font-medium leading-relaxed text-ink text-pretty">
        {done.capability}
      </p>
      <p className="max-w-sm text-sm text-ink-muted text-balance">{done.next}</p>
    </div>
  );
}
