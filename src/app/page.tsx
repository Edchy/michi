"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { buildModule1, type Step } from "@/content/module1";
import { ChoiceProgress, DrillProgress } from "@/content/drill";
import { makeQuestion, pickType, type Question, type QuestionType } from "@/content/question";
import { ShuffleBag } from "@/content/bag";
import { play, primeAudio } from "@/lib/audio";
import { VOWELS, type Kana } from "@/content/hiragana";

const PRACTICE_MODES: { type: QuestionType; label: string }[] = [
  { type: "hearPickChar", label: "Listen" },
  { type: "seePickSound", label: "Match" },
  { type: "sayAloud", label: "Speak" },
  { type: "trace", label: "Write" },
];

const SPACE_KEY_CLASS =
  "inline-flex min-h-[24px] min-w-[64px] items-center justify-center rounded-[var(--radius-btn)] bg-surface px-3 font-sans text-[11px] leading-none text-ink-muted shadow-[inset_0_-2px_0_var(--color-line)]";
const ARROW_KEY_CLASS =
  "inline-flex min-h-[24px] min-w-[28px] items-center justify-center rounded-[var(--radius-btn)] bg-surface px-2 font-sans text-xs leading-none text-ink-muted shadow-[inset_0_-2px_0_var(--color-line)]";

export default function Module1Page() {
  const steps = useMemo(() => buildModule1(), []);
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1); // 1 forward, -1 back
  const [drillBack, setDrillBack] = useState<(() => void) | null>(null);
  const [drillNext, setDrillNext] = useState<(() => void) | null>(null);
  const [drillSound, setDrillSound] = useState<(() => void) | null>(null);
  const [drillSoundKind, setDrillSoundKind] = useState<"button" | "glyph" | null>(null);
  const [shortcutHintUsed, setShortcutHintUsed] = useState(false);
  const soundCycleIndex = useRef(0);

  const step = steps[index]!;
  const atStart = index === 0;
  const modes = PRACTICE_MODES.map((mode) => ({
    ...mode,
    index: steps.findIndex(
      (candidate) =>
        candidate.kind === "drill" &&
        candidate.types.length === 1 &&
        candidate.types[0] === mode.type,
    ),
  })).filter((mode) => mode.index >= 0);
  const activeMode =
    step.kind === "drill" && step.types.length === 1 ? step.types[0]! : null;

  function go(delta: number) {
    setDrillBack(null);
    setDrillNext(null);
    setDrillSound(null);
    setDrillSoundKind(null);
    setShortcutHintUsed(false);
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
    kind: "button" | "glyph" | null,
  ) => {
    setDrillSound(handler ? () => handler : null);
    setDrillSoundKind(kind);
  }, []);

  // Lesson steps advance from the nav's Next. Choice drills auto-advance, while
  // self-confirmed production questions register their action with the same nav.
  const showNext = (step.kind !== "drill" && step.kind !== "done") || drillNext !== null;
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
    if (step.kind === "intro") primeAudio(VOWELS); // last gesture before sound plays
    go(1);
  }

  const canPlaySound =
    step.kind === "intro" ||
    step.kind === "teach" ||
    step.kind === "reveal" ||
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
          setShortcutHintUsed(true);
          const focusedAudioControl = target?.closest<HTMLButtonElement>("[data-audio-control]");
          if (step.kind === "intro" || step.kind === "reveal") {
            const sounds = step.kind === "intro" ? VOWELS : step.kana;
            play(sounds[soundCycleIndex.current]!);
            soundCycleIndex.current = (soundCycleIndex.current + 1) % sounds.length;
          } else if (step.kind === "teach") {
            if (focusedAudioControl) focusedAudioControl.click();
            else play(step.kana);
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
      className={`relative mx-auto flex min-h-screen max-w-[600px] flex-col px-5 pt-8 ${
        step.kind === "drill" || step.kind === "intro" ? "pb-40" : "pb-28"
      }`}
    >
      {/* the moving surface — CSS slide-in keyed per step (always settles visible) */}
      <div className="flex flex-1 items-center justify-center">
        <div key={index} className="w-full step-enter" data-dir={direction}>
          <StepView
            step={step}
            onAdvance={() => go(1)}
            onDrillBackChange={registerDrillBack}
            onDrillNextChange={registerDrillNext}
            onDrillSoundChange={registerDrillSound}
          />
        </div>
      </div>

      {/* welcome has its own in-content Begin button — no floating nav there */}
      {!atStart && (
        <FloatingNav
          onBack={back}
          showNext={showNext}
          onNext={next}
          modes={step.kind === "drill" ? modes : []}
          activeMode={activeMode}
          showShortcutGuide={step.kind === "intro"}
          replayHint={
            shortcutHintUsed
              ? null
              : step.kind === "teach"
                ? "glyph"
                : step.kind === "reveal"
                  ? "glyphs"
                  : drillSoundKind
          }
          onModeSelect={(targetIndex) => {
            if (targetIndex !== index) go(targetIndex - index);
          }}
        />
      )}
    </main>
  );
}

/* ---------- chrome ---------- */

/** Floating control cluster — pinned to the bottom, out of the content's way. A
 * tight centered row: Back · Home · Next. Not shown on welcome (that step has its
 * own Begin button). Choice drills omit Next; self-confirmed production uses it. */
function FloatingNav({
  onBack,
  showNext,
  onNext,
  modes,
  activeMode,
  showShortcutGuide,
  replayHint,
  onModeSelect,
}: {
  onBack: () => void;
  showNext: boolean;
  onNext: () => void;
  modes: { type: QuestionType; label: string; index: number }[];
  activeMode: QuestionType | null;
  showShortcutGuide: boolean;
  replayHint: "button" | "glyph" | "glyphs" | null;
  onModeSelect: (index: number) => void;
}) {
  const base =
    "min-h-[48px] min-w-[48px] rounded-[var(--radius-btn)] bg-surface px-4 text-ink-muted transition-colors hover:bg-surface-2";
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
        {replayHint && (
          <p className="mb-2 hidden items-center gap-1.5 text-xs text-ink-faint sm:flex">
            {(replayHint === "glyph" || replayHint === "glyphs") && (
              <span>tap glyph or press</span>
            )}
            <kbd className={SPACE_KEY_CLASS}>Space</kbd>
            <span>{replayHint === "button" ? "key to replay" : "to replay"}</span>
          </p>
        )}
        {modes.length > 0 && (
          <nav aria-label="Practice modes" className="flex items-center gap-1.5">
            {modes.map((mode) => {
              const active = activeMode === mode.type;
              return (
                <button
                  key={mode.type}
                  onClick={() => onModeSelect(mode.index)}
                  aria-current={active ? "page" : undefined}
                  className={`min-h-[44px] rounded-[var(--radius-btn)] bg-surface px-3 text-sm transition-colors hover:bg-surface-2 ${
                    active ? "font-semibold text-ink" : "text-ink-muted"
                  }`}
                >
                  {mode.label}
                </button>
              );
            })}
          </nav>
        )}
        <nav className="flex items-center gap-2" aria-label="Lesson navigation">
          <button onClick={onBack} aria-label="Back" title="Back (Left Arrow)" className={base}>
            <span aria-hidden className="text-lg">←</span>
          </button>
          {/* ponytail: Home is a placeholder — no home route yet (single-page module).
              Wire onClick to router.push("/") once a home page exists. */}
          <button aria-label="Home" className={`${base} font-kana text-lg`}>
            家
          </button>
          {showNext && (
            <button
              onClick={onNext}
              aria-label="Next"
              title="Next (Right Arrow)"
              className={base}
            >
              <span aria-hidden className="text-lg">→</span>
            </button>
          )}
        </nav>
      </div>
    </div>
  );
}

/* ---------- step surface ---------- */

function StepView({
  step,
  onAdvance,
  onDrillBackChange,
  onDrillNextChange,
  onDrillSoundChange,
}: {
  step: Step;
  onAdvance: () => void;
  onDrillBackChange: (handler: (() => void) | null) => void;
  onDrillNextChange: (handler: (() => void) | null) => void;
  onDrillSoundChange: (
    handler: (() => void) | null,
    kind: "button" | "glyph" | null,
  ) => void;
}) {
  return (
    <div className="py-10">
      {step.kind === "welcome" ? (
        <WelcomeStep onBegin={onAdvance} />
      ) : step.kind === "intro" ? (
        <IntroStep />
      ) : step.kind === "teach" ? (
        <TeachStep kana={step.kana} />
      ) : step.kind === "reveal" ? (
        <RevealStep kana={step.kana} />
      ) : step.kind === "drill" ? (
        <DrillBlock
          pool={step.pool}
          types={step.types}
          onDone={onAdvance}
          onNavBackChange={onDrillBackChange}
          onNavNextChange={onDrillNextChange}
          onSoundChange={onDrillSoundChange}
        />
      ) : (
        <DoneStep learned={step.learned} />
      )}
    </div>
  );
}

/* ---------- steps ---------- */

function ListenButton({ kana, label = "Listen" }: { kana: Kana; label?: string }) {
  return (
    <button
      onClick={() => play(kana)}
      className="mx-auto flex min-h-[48px] items-center gap-2 rounded-[var(--radius-btn)] bg-ink px-6 text-white transition-colors hover:bg-ink/90"
    >
      <span aria-hidden>▶</span>
      <span className="text-sm font-medium">{label}</span>
    </button>
  );
}

function WelcomeStep({ onBegin }: { onBegin: () => void }) {
  return (
    <div className="flex flex-col items-center gap-6 text-center">
      <span className="select-none font-kana text-[8rem] leading-none text-ink">道</span>
      <p className="text-sm text-ink-muted">Learn Japanese</p>
      <button onClick={onBegin} className={`mt-2 ${PRIMARY_BTN}`}>
        Begin
      </button>
    </div>
  );
}

function IntroStep() {
  return (
    <div className="flex flex-col items-center gap-8 text-center">
      <p className="text-base font-medium text-ink-muted text-balance">
        Five sounds to begin.
      </p>
      <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-4">
        {VOWELS.map((k) => (
          <div key={k.id} className="flex flex-col items-center gap-1">
            <span className="font-kana text-5xl leading-none text-ink">{k.glyph}</span>
            <span className="text-sm font-light tracking-wide text-ink-faint">{k.say}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function TeachStep({ kana }: { kana: Kana }) {
  const [tapped, setTapped] = useState(false);

  // reset the hint pulse for each new character
  useEffect(() => setTapped(false), [kana]);

  // auto-play the sound when the step first appears
  useEffect(() => {
    const t = setTimeout(() => play(kana), 250);
    return () => clearTimeout(t);
  }, [kana]);

  return (
    <div className="flex flex-col items-center gap-8 text-center">
      {/* the character IS the sound — tap it (spam it) to hear "ah" */}
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
    </div>
  );
}

function RevealStep({ kana }: { kana: Kana[] }) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-4 text-center">
      {kana.map((k, i) => (
        <button
          key={k.id}
          onClick={() => play(k)}
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
}) {
  // A shuffle bag draws every vowel once before repeating, so all five come up.
  const bag = useRef(new ShuffleBag(pool));
  const progress = useRef(new DrillProgress(pool.map((k) => k.id)));
  const choices = useRef(new ChoiceProgress(pool.length));
  const history = useRef<Question[]>([]);
  const future = useRef<Question[]>([]);
  const isChoiceBlock = types.every(
    (type) => type === "hearPickChar" || type === "seePickSound",
  );
  const [qNum, setQNum] = useState(0); // increments per question → fresh sub-component
  const [q, setQ] = useState<Question>(() =>
    makeQuestion(
      pool,
      bag.current.next(),
      pickType(types),
      isChoiceBlock ? choices.current.optionCount : pool.length,
    ),
  );

  function advance(correct: boolean) {
    if (isChoiceBlock) choices.current.mark(correct);
    else progress.current.mark(q.answer.id, correct);

    const done = isChoiceBlock ? choices.current.done : progress.current.done;
    if (done) {
      onDone();
      return;
    }

    history.current.push(q);
    future.current = [];
    setQ(
      makeQuestion(
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

  useEffect(() => {
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

    if (q.type !== "sayAloud" && q.type !== "trace") {
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
      onSoundChange(() => {
        play(q.answer);
      }, q.type === "sayAloud" ? "glyph" : "button");
    } else {
      onSoundChange(null, null);
    }

    return () => {
      onNavBackChange(null);
      onNavNextChange(null);
      onSoundChange(null, null);
    };
  }, [qNum, q.type, onNavBackChange, onNavNextChange, onSoundChange]);

  return (
    <div className="w-full">
      {q.type === "trace" ? (
        <TraceQuestion key={qNum} q={q} />
      ) : q.type === "sayAloud" ? (
        <SayAloudQuestion
          key={qNum}
          q={q}
          variant={qNum}
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
    setPicked(k.id);
    if (q.type === "seePickSound") {
      play(k.id === q.answer.id ? k : q.answer);
    }
    advanceTimer.current = setTimeout(() => onAnswered(k.id === q.answer.id), 1000);
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
          <button
            data-audio-control
            onClick={() => play(q.answer)}
            aria-label="Play sound again. Press Space."
            title="Play sound again (Space)"
            className="flex min-h-[52px] min-w-[52px] touch-manipulation items-center justify-center rounded-[var(--radius-btn)] bg-surface text-base text-ink transition-colors hover:bg-surface-2 sm:hidden"
          >
            <span aria-hidden>▶</span>
          </button>
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
 * Production drill: see the character → say it out loud → confirm with nav Next.
 * The character is the sound button (tap/spam to hear it), like the teach step,
 * with the pronunciation hint always visible beneath. The shared floating nav
 * confirms the attempt. No speech recognition — the act of vocalizing is what
 * matters (session-flow.md), so it always counts.
 */
function SayAloudQuestion({
  q,
  variant,
}: {
  q: Question;
  variant: number;
}) {
  const [tapped, setTapped] = useState(false);
  const pronunciationHint = q.answer.hints[variant % q.answer.hints.length]!;

  // auto-play the sound on arrival (re-plays on tap)
  useEffect(() => {
    const t = setTimeout(() => play(q.answer), 250);
    return () => clearTimeout(t);
  }, [q.answer]);

  return (
    <div className={DRILL_SHELL}>
      <p className={DRILL_PROMPT}>Say this sound out loud.</p>

      {/* the character IS the sound — tap it to hear it again */}
      <button
        data-audio-control
        onClick={() => {
          setTapped(true);
          play(q.answer);
        }}
        className="flex touch-manipulation flex-col items-center gap-3 rounded-[var(--radius-lg)] px-8 py-2"
        aria-label={`Hear the sound ${q.answer.say}`}
      >
        <span className={`${DRILL_GLYPH} text-ink`}>{q.answer.glyph}</span>
        <span
          className={`text-sm text-ink-faint transition-opacity sm:hidden ${
            tapped ? "opacity-0" : "opacity-100"
          }`}
        >
          (tap to replay)
        </span>
      </button>

      <p className="max-w-xs text-sm leading-relaxed text-ink-muted text-pretty">
        {pronunciationHint}
      </p>
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

function DoneStep({ learned }: { learned: Kana[] }) {
  return (
    <div className="flex flex-col items-center gap-6 text-center">
      <p className="text-2xl font-medium text-ink">Module complete.</p>
      <div className="flex gap-3 font-kana text-4xl text-ink">
        {learned.map((k) => (
          <span key={k.id}>{k.glyph}</span>
        ))}
      </div>
      <p className="text-ink-muted">You can now recognize 5 sounds by ear.</p>
      <p className="mt-4 max-w-xs text-sm text-ink-faint">
        They’ll come back on their own schedule, right before you’d forget them.
      </p>
    </div>
  );
}

/** The primary action — solid indigo (ink) fill, small quiet radius. On nearly
 * every slide, so it's noticeable but never in the way. */
const PRIMARY_BTN =
  "min-h-[48px] rounded-[var(--radius-btn)] bg-ink px-10 text-base font-medium text-white transition-colors hover:bg-ink/90";
