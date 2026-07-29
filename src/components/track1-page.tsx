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
import { CheckpointProgress, ChoiceProgress, DrillProgress } from "@/content/drill";
import { makeQuestion, pickType, type Question, type QuestionType } from "@/content/question";
import { ShuffleBag } from "@/content/bag";
import { play, primeAudio } from "@/lib/audio";
import { K_ROW, VOWELS, type Kana } from "@/content/hiragana";
import { GojuonGrid } from "@/components/gojuon-grid";
import { Button } from "@/components/button";
import { StationNav } from "@/components/station-nav";
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
  build: buildTrack1,
  kana: VOWELS,
  introCopy: (
    <>
      Here is hiragana&rsquo;s whole vowel set. Japanese has exactly five, and they never
      shift, unlike English, where &ldquo;a&rdquo; sounds different in cat, car and cake.
    </>
  ),
  context: {
    headline: "This is the order they always come in.",
    body: (
      <>
        あいうえお is not alphabetical order. It is the order Japanese itself uses, for
        dictionaries, forms and lists, the way A-B-C works in English. The remaining 41
        kana are built as rows on top of these five: か き く け こ, さ し す せ そ, and so
        on. Learn this sequence and you have learned the shape of the whole set.
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

/** Shared with track0-page so both stations render the same keyboard hint. */
export const SPACE_KEY_CLASS =
  "inline-flex min-h-[24px] min-w-[64px] items-center justify-center rounded-[var(--radius-btn)] bg-surface px-3 font-sans text-[11px] leading-none text-ink-muted shadow-[inset_0_-2px_0_var(--color-line)]";
export const ARROW_KEY_CLASS =
  "inline-flex min-h-[24px] min-w-[28px] items-center justify-center rounded-[var(--radius-btn)] bg-surface px-2 font-sans text-xs leading-none text-ink-muted shadow-[inset_0_-2px_0_var(--color-line)]";

type DrillMeterData = { value: number; max: number };

const K_ROW_STATION: StationConfig = {
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
    // is the capability: ten kana is enough for real words, which sets up the こい beat.
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
        you arrived with—only easier to call back. That is what a look back is for.
      </>
    ),
    known: ["vowels", "k-row"],
  },
  done: {
    capability: "You can recall the vowels and K row together, and read こい again. 10 of 46.",
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
  const soundCycleIndex = useRef(0);

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
    step.kind === "rehearse" ||
    step.kind === "review" ||
    step.kind === "match";

  function go(delta: number) {
    setDrillBack(null);
    setDrillNext(null);
    setDrillSound(null);
    setDrillMeter(null);
    soundCycleIndex.current = 0;
    setDirection(delta);
    setIndex((i) => Math.min(steps.length - 1, Math.max(0, i + delta)));
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

  const canPlaySound =
    step.kind === "intro" ||
    step.kind === "teach" ||
    step.kind === "reveal" ||
    step.kind === "match" ||
    drillSound !== null;

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
        if (canPlaySound) {
          event.preventDefault();
          target?.closest<HTMLButtonElement>("[data-floating-nav] button")?.blur();
          const focusedAudioControl = target?.closest<HTMLButtonElement>("[data-audio-control]");
          if ((step.kind === "intro" || step.kind === "reveal") && focusedAudioControl) {
            focusedAudioControl.click();
          } else if (step.kind === "intro" || step.kind === "reveal") {
            const sounds = step.kind === "intro" ? station.kana : step.kana;
            play(sounds[soundCycleIndex.current]!);
            soundCycleIndex.current = (soundCycleIndex.current + 1) % sounds.length;
          } else if (step.kind === "teach") {
            if (focusedAudioControl) focusedAudioControl.click();
            else play(step.kana);
          } else if (step.kind === "match") {
            // The step owns which sound is current, so replay via its own control.
            document.querySelector<HTMLButtonElement>("[data-audio-control]")?.click();
          } else {
            drillSound?.();
          }
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
    // pb leaves room for the floating nav so it never covers content
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
            : "pb-28"
      }`}
    >
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
        showShortcutGuide={step.kind === "intro"}
      />
    </main>
  );
}

/* ---------- chrome ---------- */

/** Floating control cluster — pinned to the bottom, out of the content's way. */
function FloatingNav({
  onBack,
  showBack,
  showNext,
  onNext,
  drillMeter,
  showShortcutGuide,
}: {
  onBack: () => void;
  showBack: boolean;
  showNext: boolean;
  onNext: () => void;
  drillMeter: DrillMeterData | null;
  showShortcutGuide: boolean;
}) {
  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-10 flex justify-center pb-6">
      <div data-floating-nav className="pointer-events-auto flex flex-col items-center gap-2">
        {showShortcutGuide && (
          <div className="mb-2 hidden flex-col items-center gap-2 text-xs text-ink-faint sm:flex">
            <p className="flex items-center gap-1.5">
              <kbd className={ARROW_KEY_CLASS}>←</kbd>
              <kbd className={ARROW_KEY_CLASS}>→</kbd>
              <span>keys to navigate</span>
            </p>
            <p className="flex items-center gap-1.5">
              <kbd className={SPACE_KEY_CLASS}>
                Space
              </kbd>
              <span>key to play sounds</span>
            </p>
          </div>
        )}
        {drillMeter && <DrillPath value={drillMeter.value} max={drillMeter.max} />}
        <StationNav
          onBack={onBack}
          onNext={onNext}
          canGoBack={showBack}
          canGoNext={showNext}
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
    <div className="py-10">
      {step.kind === "intro" ? (
        <IntroStep station={station} />
      ) : step.kind === "teach" ? (
        <TeachStep kana={step.kana} />
      ) : step.kind === "reveal" ? (
        <RevealStep kana={step.kana} />
      ) : step.kind === "context" ? (
        <HiraganaContextStep kana={step.kana} context={station.context} />
      ) : step.kind === "read" ? (
        <ReadWordStep word={step.word} />
      ) : step.kind === "grid" ? (
        <GridStep grid={station.grid} />
      ) : step.kind === "match" ? (
        <MatchStep pool={step.pool} onDone={onAdvance} />
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

function ListenButton({ kana, label = "Listen" }: { kana: Kana; label?: string }) {
  return (
    <Button variant="primary" onClick={() => play(kana)} className="mx-auto">
      <span aria-hidden>▶</span>
      <span>{label}</span>
    </Button>
  );
}

function IntroStep({ station }: { station: StationConfig }) {
  return (
    <div className="flex flex-col items-center gap-8 text-center">
      <p className="max-w-sm text-base font-medium leading-relaxed text-ink-muted text-balance">
        {station.introCopy}
      </p>
      <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-4">
        {station.kana.map((k) => (
          <button
            key={k.id}
            data-audio-control
            onClick={() => play(k)}
            aria-label={`Hear the sound ${k.say}`}
            className="group flex min-h-[72px] min-w-[56px] flex-col items-center justify-center gap-1 rounded-[var(--radius-btn)] transition-transform hover:scale-110 active:scale-95"
          >
            <span className="font-kana text-5xl leading-none text-ink">{k.glyph}</span>
            <span className="text-sm font-light tracking-wide text-ink-faint">{k.say}</span>
          </button>
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
            className="mx-px inline-flex items-baseline gap-1 rounded-[var(--radius-btn)] border border-line bg-surface px-1.5 py-0.5 align-baseline text-ink"
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
  const [tapped, setTapped] = useState(false);

  // reset the hint pulse for each new character
  useEffect(() => setTapped(false), [kana]);

  // auto-play the sound when the step first appears. Just enough delay to let the
  // slide paint first, so the glyph is on screen when its sound arrives. The old
  // 250 ms was tuned when playback itself was slow; now that it is ~1 ms, that
  // padding is pure lag.
  useEffect(() => {
    const t = setTimeout(() => play(kana), 60);
    return () => clearTimeout(t);
  }, [kana]);

  return (
    <div className="flex flex-col items-center gap-8 text-center">
      {/* the character IS the sound — tap it (spam it) to hear "a" */}
      <button
        data-audio-control
        onClick={() => {
          setTapped(true);
          play(kana);
        }}
        className="group flex cursor-pointer flex-col items-center gap-3 rounded-[var(--radius-lg)] px-8 py-4 transition-transform active:scale-95"
        aria-label={`Hear the sound ${kana.say}`}
      >
        <span className="select-none font-kana text-[13rem] leading-none text-ink transition-transform group-hover:scale-105">
          {kana.glyph}
        </span>
        <span className="text-lg font-light tracking-wide text-ink-faint">{kana.say}</span>
        <span
          className={`text-xs text-ink-faint/50 transition-opacity sm:hidden ${
            tapped ? "opacity-0" : "opacity-100"
          }`}
        >
          (tap to replay)
        </span>
      </button>
      <p className="max-w-xs text-sm leading-relaxed text-ink-muted text-pretty">
        <KanaInText text={kana.hints[0]!} />
      </p>
    </div>
  );
}

function RevealStep({ kana }: { kana: Kana[] }) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-4 text-center">
      {kana.map((k, i) => (
        <button
          key={k.id}
          data-audio-control
          onClick={() => play(k)}
          aria-label={`Hear the sound ${k.say}`}
          className="kana-rise flex flex-col items-center gap-1.5 transition-transform hover:scale-110 active:scale-95"
          style={{ animationDelay: `${0.1 + i * 0.09}s` }}
        >
          <span className="font-kana text-7xl leading-none text-ink">{k.glyph}</span>
          <span className="text-sm font-light tracking-wide text-ink-faint">{k.say}</span>
        </button>
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
    <div className="mx-auto flex max-w-md flex-col items-center gap-6 text-center">
      <p className="flex gap-4 font-kana text-6xl leading-none text-ink">
        {kana.map((k) => (
          <span key={k.id}>{k.glyph}</span>
        ))}
      </p>
      <p className="text-lg font-medium text-ink text-balance">{context.headline}</p>
      <p className="leading-relaxed text-ink-muted text-pretty">{context.body}</p>
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
function MatchStep({ pool, onDone }: { pool: Kana[]; onDone: () => void }) {
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
  const [misses, setMisses] = useState(0);
  const advanceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const target = order.current[at];
  // After two misses, name the sound. Open-book means never stuck guessing blind.
  const showHint = misses >= 2;

  useEffect(() => () => {
    if (advanceTimer.current) clearTimeout(advanceTimer.current);
  }, []);

  // Play the current target when it changes, so the learner always has a sound to hunt.
  useEffect(() => {
    if (!target) return;
    const t = setTimeout(() => play(target), 60);
    return () => clearTimeout(t);
  }, [target]);

  function tap(k: Kana) {
    if (!target || advanceTimer.current) return;
    if (k.id !== target.id) {
      // A miss is not a failure here: replay the target so the pairing is reinforced.
      setWrong(k.id);
      setMisses((m) => m + 1);
      play(target);
      setTimeout(() => setWrong(null), 600);
      return;
    }
    setFound((f) => [...f, k.id]);
    advanceTimer.current = setTimeout(() => {
      advanceTimer.current = null;
      setMisses(0);
      if (at + 1 >= order.current.length) onDone();
      else setAt((i) => i + 1);
    }, 650);
  }

  return (
    <div className="mx-auto flex max-w-md flex-col items-center gap-8 text-center">
      <div className="flex flex-col items-center gap-2">
        <p className={DRILL_PROMPT}>Which one is this? Tap it.</p>
        <Button
          icon
          data-audio-control
          onClick={() => target && play(target)}
          aria-label="Play the sound again"
          title="Play the sound again (Space)"
        >
          <span aria-hidden>▶</span>
        </Button>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-3">
        {pool.map((k) => {
          const isFound = found.includes(k.id);
          const isWrong = wrong === k.id;
          return (
            <button
              key={k.id}
              onClick={() => tap(k)}
              aria-label={`Choose ${k.glyph}`}
              className={`flex min-h-[92px] min-w-[76px] flex-col items-center justify-center gap-1 rounded-[var(--radius-lg)] border transition-all duration-200 motion-reduce:transition-none ${
                isFound
                  ? "border-transparent bg-ink text-paper"
                  : isWrong
                    // A miss must be unmistakable without relying on hearing the replay.
                    ? "-translate-y-0.5 border-accent bg-surface-2 text-ink-faint motion-reduce:translate-y-0"
                    : "border-line bg-surface text-ink hover:bg-surface-2"
              }`}
            >
              <span className="font-kana text-5xl leading-none">{k.glyph}</span>
              {/* The sound appears only once found, and is not in the DOM before that:
                  hiding it with a transparent colour would still let a screen reader
                  announce every answer. The empty span holds the row height. */}
              <span className="min-h-[16px] text-xs font-light tracking-wide text-paper/70">
                {isFound ? k.say : ""}
              </span>
            </button>
          );
        })}
      </div>

      {/* Reserve the line so revealing the hint does not shift the grid. */}
      <p className="min-h-[20px] text-sm text-ink-muted">
        {showHint && target ? `It is the one that sounds like "${target.say}".` : `${found.length} of ${pool.length}`}
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
    <div className="mx-auto flex max-w-md flex-col items-center gap-6 text-center">
      <p className="text-2xl font-medium text-ink text-balance">
        A quick look back.
      </p>
      <p className="flex gap-4 font-kana text-5xl leading-none text-ink">
        {kana.map((k) => (
          <span key={k.id}>{k.glyph}</span>
        ))}
      </p>
      <p className="leading-relaxed text-ink-muted text-pretty">
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
      <div className="mx-auto flex max-w-sm flex-col items-center gap-4 text-center">
        <p className="text-2xl font-medium text-ink text-balance">
          Let&rsquo;s see {recoveryCount === 1 ? "that one" : `${recoveryCount} of those`} once
          more.
        </p>
        <p className="leading-relaxed text-ink-muted text-pretty">
          No need to restart. Only the connections that paused are coming back.
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto flex max-w-sm flex-col items-center gap-4 text-center">
      <p className="text-2xl font-medium text-ink text-balance">
        {recoveryHadMiss ? "That’s enough for today." : "Good. Let’s continue."}
      </p>
      <p className="leading-relaxed text-ink-muted text-pretty">
        {recoveryHadMiss
          ? "We’ll bring those connections back again later. Your place on the path has not changed."
          : "The earlier sounds are ready for what comes next."}
      </p>
    </div>
  );
}

/**
 * The first-word beat: the learner decodes こい themselves, kana by kana, before the
 * meaning is shown. Tapping plays the syllables, then the whole word.
 */
function ReadWordStep({ word }: { word: ReadableWord }) {
  const [revealed, setRevealed] = useState(false);

  return (
    <div className="mx-auto flex max-w-md flex-col items-center gap-6 text-center">
      <p className={DRILL_PROMPT}>You know every sound in this word. Read it.</p>

      <button
        data-audio-control
        onClick={() => {
          setRevealed(true);
          word.kana.forEach((k, i) => setTimeout(() => play(k), i * 480));
        }}
        aria-label={`Hear ${word.kana.map((k) => k.say).join(" ")}`}
        className="flex touch-manipulation items-end gap-3 rounded-[var(--radius-lg)] px-6 py-2 transition-transform hover:scale-105 active:scale-95"
      >
        {/* No `say` labels here, unlike the teaching slides: this is the one beat that
            asks the learner to decode unaided, and Latin letters under the kana would
            be exactly the crutch they could read instead (P2). */}
        {word.kana.map((k) => (
          <span key={k.id} className="font-kana text-[7rem] leading-none text-ink">
            {k.glyph}
          </span>
        ))}
      </button>

      {/* The meaning stays hidden until they have tried, so the decoding is theirs. */}
      <div className={`flex flex-col gap-2 transition-opacity duration-300 ${revealed ? "opacity-100" : "opacity-0"}`}>
        <p className="text-2xl font-medium text-ink">{word.meaning}</p>
        <p className="text-sm leading-relaxed text-ink-muted text-pretty">{word.note}</p>
      </div>

      {!revealed && (
        <p className="text-sm text-ink-muted">Say it out loud, then tap to check.</p>
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

  const [q, setQ] = useState<Question>(() =>
    isBoundedReview
      ? makeReviewQuestion()
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
    : isCoverageCheckpoint
      ? checkpoint.current.completedCount
    : isChoiceBlock
      ? choices.current.masteryPoints
      : isSpeakBlock
        ? spokenAttempts.current
        : progress.current.completedCount;
  const progressMax = isBoundedReview
    ? boundedReview.current.promptCount
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
    else if (isCoverageCheckpoint) checkpoint.current.mark(correct);
    else if (isChoiceBlock) choices.current.mark(correct);
    else if (isSpeakBlock) spokenAttempts.current += 1;
    else progress.current.mark(q.answer.id, correct);

    const done = isBoundedReview
      ? boundedReview.current.done
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

  function moveForward() {
    const upcoming = future.current.pop();
    if (!upcoming) {
      advance(true);
      return;
    }
    history.current.push(q);
    setQ(upcoming);
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

    const usesQuestionHistory = q.type === "sayAloud" || q.type === "trace";
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

    if (q.type !== "trace") {
      onNavNextChange(null);
    } else {
      let used = false;
      onNavNextChange(() => {
        if (used) return;
        used = true;
        moveForward();
      });
    }

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
      ) : q.type === "trace" ? (
        <TraceQuestion key={qNum} q={q} />
      ) : q.type === "sayAloud" ? (
        <SayAloudQuestion
          key={qNum}
          q={q}
          onReveal={revealSpokenAnswer}
        />
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
const DRILL_PROMPT = "text-sm text-ink-muted";
const DRILL_GLYPH = "select-none font-kana text-[9rem] font-semibold leading-none";

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
    // Always end on the right sound. On seePickSound the answer is a sound, so it plays
    // either way. On hearPickChar a miss used to play nothing at all, which threw away
    // the one moment the learner most needs to hear the sound again next to its shape.
    if (q.type === "seePickSound") play(correct ? k : q.answer);
    else if (!correct) play(q.answer);
    advanceTimer.current = setTimeout(() => onAnswered(correct), correct ? 1000 : 1600);
  }

  const cols =
    q.options.length <= 2
      ? "grid-cols-2"
      : q.options.length === 3
        ? "grid-cols-3"
        : q.options.length === 4
          ? "grid-cols-2 sm:grid-cols-4"
          : "grid-cols-3 sm:grid-cols-5";
  const width = q.options.length === 2 ? "max-w-[260px]" : "max-w-none";

  return (
    <div className={PICK_DRILL_SHELL}>
      {q.type === "hearPickChar" ? (
        <div className="flex flex-col items-center gap-2">
          <p className={DRILL_PROMPT}>Which one did you hear?</p>
          <Button
            icon
            data-audio-control
            onClick={() => play(q.answer)}
            aria-label="Play sound again. Press Space."
            title="Play sound again (Space)"
            className="touch-manipulation sm:hidden"
          >
            <span aria-hidden>▶</span>
          </Button>
        </div>
      ) : (
        <div className="flex flex-col items-center gap-6">
          <p className={DRILL_PROMPT}>Which sound is this?</p>
          <span className={`${DRILL_GLYPH} text-ink`}>{q.answer.glyph}</span>
        </div>
      )}

      <div className={`grid w-full gap-3 ${width} ${cols}`}>
        {q.options.map((k) => {
          const isCorrect = picked !== null && k.id === q.answer.id;
          const isAlternative = picked !== null && k.id !== q.answer.id;
          const answeredCorrectly = picked === q.answer.id;

          return (
            <button
              key={k.id}
              onClick={() => choose(k)}
              className={`flex min-h-[112px] items-center justify-center rounded-[var(--radius-btn)] transition-[color,filter,opacity,transform] duration-200 ease-out motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink ${
                isCorrect
                  ? answeredCorrectly
                    ? "answer-success text-ink"
                    : "scale-125 text-ink motion-reduce:scale-100"
                  : isAlternative
                    ? answeredCorrectly
                      ? "opacity-0"
                      : "opacity-10"
                    : "text-ink"
              }`}
            >
              {q.type === "seePickSound" ? (
                <span className="text-2xl font-semibold">{k.say}</span>
              ) : (
                <span className="font-kana text-7xl font-semibold sm:text-8xl">{k.glyph}</span>
              )}
            </button>
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
function SayAloudQuestion({
  q,
  onReveal,
}: {
  q: Question;
  onReveal: () => void;
}) {
  return (
    <div className={DRILL_SHELL}>
      <p className={DRILL_PROMPT}>Say this sound.</p>

      {/* Speak first; tapping reveals the native sound and continues. */}
      <button
        data-audio-control
        onClick={onReveal}
        className="flex touch-manipulation flex-col items-center rounded-[var(--radius-lg)] px-8 py-2 transition-transform hover:scale-105 active:scale-95"
        aria-label="Hear the answer"
      >
        <span className={`${DRILL_GLYPH} text-ink`}>{q.answer.glyph}</span>
      </button>
      <p className="text-sm text-ink-muted">Try it, then tap the glyph.</p>
    </div>
  );
}

/**
 * PLACEHOLDER — the trace/write drill (motor memory, the signature handwriting
 * mechanic). Not built yet: this only marks where it belongs in the flow so we
 * can see it interleaved. A real version needs a drawing canvas + stroke-order
 * guidance + stroke checking (docs/design/typography.md, ADR-0004 stroke data).
 */
function TraceQuestion({ q }: { q: Question }) {
  return (
    <div className={DRILL_SHELL}>
      <p className={DRILL_PROMPT}>Trace the character.</p>

      {/* stubbed canvas: shows the target glyph faintly, as a guide would */}
      <div className="relative flex h-56 w-56 items-center justify-center rounded-[var(--radius-lg)] border-2 border-dashed border-line">
        <span className={`${DRILL_GLYPH} text-line`}>{q.answer.glyph}</span>
        <span className="absolute bottom-3 rounded-full bg-surface px-3 py-1 text-xs font-medium text-ink-faint">
          drawing, coming soon
        </span>
      </div>
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
      <div className="flex max-w-sm flex-col gap-4">
        <p className="text-xl font-medium text-ink text-balance">{grid.headline}</p>
        <p className="text-sm leading-relaxed text-ink-muted text-pretty">{grid.body}</p>
      </div>
    </div>
  );
}

function DoneStep({ done }: { done: StationConfig["done"] }) {
  return (
    <div className="flex flex-col items-center gap-6 text-center">
      <p className="text-2xl font-medium text-ink">Station complete.</p>
      <p className="max-w-sm text-ink-muted text-balance">{done.capability}</p>
      <p className="max-w-sm text-sm text-ink-muted text-balance">{done.next}</p>
      <Button href={`/?completed=${done.completedId}`} variant="primary" wide className="mt-3">
        Return to the path
      </Button>
    </div>
  );
}
