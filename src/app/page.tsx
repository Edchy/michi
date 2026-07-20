"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { buildModule1, type Step } from "@/content/module1";
import { newDrill, grade, MIN_OPTIONS, STREAK_TO_ADVANCE, type DrillState } from "@/content/drill";
import { makeQuestion, pickType, type Question, type QuestionType } from "@/content/question";
import { ShuffleBag } from "@/content/bag";
import { play, primeAudio } from "@/lib/audio";
import { VOWELS, type Kana } from "@/content/hiragana";

export default function Module1Page() {
  const steps = useMemo(() => buildModule1(), []);
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1); // 1 forward, -1 back

  const step = steps[index]!;
  const atStart = index === 0;

  function go(delta: number) {
    setDirection(delta);
    setIndex((i) => Math.min(steps.length - 1, Math.max(0, i + delta)));
  }

  // Top bar tracks module steps. The drill (a single step, but the real work)
  // shows its own mastery indicator inside instead of cramming into this sliver.
  const last = steps.length - 1;
  const pct = Math.round((index / last) * 100);

  return (
    <main className="relative mx-auto flex min-h-screen max-w-[600px] flex-col px-5">
      <ProgressBar pct={pct} />

      {/* the moving surface — CSS slide-in keyed per step (always settles visible) */}
      <div className="flex flex-1 items-center justify-center">
        <div key={index} className="w-full step-enter" data-dir={direction}>
          <StepView step={step} onAdvance={() => go(1)} />
        </div>
      </div>

      <BottomBar showBack={!atStart} onBack={() => go(-1)} />
    </main>
  );
}

/* ---------- chrome ---------- */

function ProgressBar({ pct }: { pct: number }) {
  return (
    <div className="mt-8 h-1.5 w-full overflow-hidden rounded-full bg-neutral-200">
      <div
        className="h-full rounded-full bg-neutral-800 transition-[width] duration-300 ease-out"
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}

function BottomBar({ showBack, onBack }: { showBack: boolean; onBack: () => void }) {
  return (
    <div className="flex items-center py-6 text-sm">
      <button
        onClick={onBack}
        className={`min-h-[44px] px-2 text-neutral-400 transition-opacity hover:text-neutral-700 ${
          showBack ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        ← Back
      </button>
    </div>
  );
}

/* ---------- step surface ---------- */

function StepView({ step, onAdvance }: { step: Step; onAdvance: () => void }) {
  return (
    <div className="py-10">
      {step.kind === "welcome" ? (
        <WelcomeStep onContinue={onAdvance} />
      ) : step.kind === "teach" ? (
        <TeachStep kana={step.kana} first={step.first} onContinue={onAdvance} />
      ) : step.kind === "reveal" ? (
        <RevealStep kana={step.kana} onContinue={onAdvance} />
      ) : step.kind === "drill" ? (
        <RecognizeDrill pool={step.pool} onDone={onAdvance} />
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
      className="mx-auto flex min-h-[48px] items-center gap-2 rounded-full bg-neutral-900 px-6 text-white transition-colors hover:bg-neutral-700"
    >
      <span aria-hidden>▶</span>
      <span className="text-sm font-medium">{label}</span>
    </button>
  );
}

function WelcomeStep({ onContinue }: { onContinue: () => void }) {
  return (
    <div className="flex flex-col items-center gap-8 text-center">
      <p className="text-3xl font-medium leading-snug text-neutral-900 text-balance">
        Let’s learn your first Japanese sounds.
      </p>
      <p className="max-w-sm text-base text-neutral-500 text-pretty">
        Five of them. You’ll hear each one and say it back — no reading yet. Once a
        Japanese sound is in your ear, it stays.
      </p>
      {/* preload the clips on this first gesture so the first play is instant */}
      <ContinueButton
        onClick={() => {
          primeAudio(VOWELS);
          onContinue();
        }}
        label="Begin"
      />
    </div>
  );
}

function TeachStep({
  kana,
  first,
  onContinue,
}: {
  kana: Kana;
  first: boolean;
  onContinue: () => void;
}) {
  // auto-play the sound when the step first appears
  useEffect(() => {
    const t = setTimeout(() => play(kana), 250);
    return () => clearTimeout(t);
  }, [kana]);

  return (
    <div className="flex flex-col items-center gap-8 text-center">
      {/* the character IS the sound — tap it (spam it) to hear "ah" */}
      <button
        onClick={() => play(kana)}
        className="group flex flex-col items-center gap-3 rounded-3xl px-8 py-4 transition-transform active:scale-95"
        aria-label={`Hear the sound ${kana.say}`}
      >
        <span className="select-none text-[9rem] leading-none text-neutral-900 transition-transform group-hover:scale-105">
          {kana.glyph}
        </span>
        <span className="text-lg font-light tracking-wide text-neutral-300">{kana.say}</span>
        {first && <span className="mt-1 text-xs text-neutral-400">tap to hear it</span>}
      </button>

      <ContinueButton onClick={onContinue} />
    </div>
  );
}

function RevealStep({ kana, onContinue }: { kana: Kana[]; onContinue: () => void }) {
  return (
    <div className="flex flex-col items-center gap-14 text-center">
      <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-4">
        {kana.map((k, i) => (
          <button
            key={k.id}
            onClick={() => play(k)}
            className="kana-rise flex flex-col items-center gap-1.5 transition-transform hover:scale-110 active:scale-95"
            style={{ animationDelay: `${0.1 + i * 0.09}s` }}
          >
            <span className="text-6xl leading-none text-neutral-900">{k.glyph}</span>
            <span className="text-sm font-light tracking-wide text-neutral-300">{k.say}</span>
          </button>
        ))}
      </div>
      <ContinueButton onClick={onContinue} />
    </div>
  );
}

/** Question types active in Module 1's drill (interleaved). */
const DRILL_TYPES: QuestionType[] = ["hearPickChar", "seePickSound", "sayAloud"];

/**
 * In-drill mastery indicator: the adaptive drill climbs 2 → 3 → 4 → 5 options
 * (harder each level). A dot per level shows how far you've climbed; streak pips
 * show progress toward the next level. This lives inside the drill because the
 * drill is a single module step but the real work — the top bar can't show it.
 */
function MasteryIndicator({ drill, poolSize }: { drill: DrillState; poolSize: number }) {
  const topLevel = Math.min(poolSize, 5);
  const levels = [];
  for (let opt = MIN_OPTIONS; opt <= topLevel; opt++) levels.push(opt);

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="flex items-center gap-2">
        {levels.map((opt) => {
          const done = drill.done || opt < drill.options;
          const current = !drill.done && opt === drill.options;
          return (
            <span
              key={opt}
              className={`h-2 w-2 rounded-full transition-colors ${
                done ? "bg-neutral-800" : current ? "bg-neutral-400" : "bg-neutral-200"
              }`}
            />
          );
        })}
      </div>
      <p className="text-xs text-neutral-400">
        {drill.done ? "Mastered" : `${drill.options} sounds`}
      </p>
      {!drill.done && (
        <div className="flex items-center gap-1.5">
          {Array.from({ length: STREAK_TO_ADVANCE }, (_, i) => (
            <span
              key={i}
              className={`h-1.5 w-1.5 rounded-full transition-colors ${
                i < drill.streak ? "bg-emerald-400" : "bg-neutral-200"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function RecognizeDrill({ pool, onDone }: { pool: Kana[]; onDone: () => void }) {
  // A shuffle bag draws every vowel once before repeating, so all five get
  // tested rather than randomness repeating a few and skipping others.
  const bag = useRef(new ShuffleBag(pool));
  const [drill, setDrill] = useState(() => newDrill());
  const [qNum, setQNum] = useState(0); // increments per question → fresh sub-component
  const [q, setQ] = useState<Question>(() =>
    makeQuestion(pool, bag.current.next(), pickType(DRILL_TYPES), MIN_OPTIONS),
  );

  // Advance after a result: grade (for pick-types; sayAloud always counts) and
  // draw the next question, or finish. `delayMs` lets a miss linger a beat.
  function advance(correct: boolean, delayMs: number) {
    const next = grade(drill, correct, pool.length);
    setDrill(next);
    setTimeout(() => {
      if (next.done) onDone();
      else {
        setQ(makeQuestion(pool, bag.current.next(q.answer.id), pickType(DRILL_TYPES), next.options));
        setQNum((n) => n + 1);
      }
    }, delayMs);
  }

  return (
    <div className="flex flex-col items-center gap-10 text-center">
      <MasteryIndicator drill={drill} poolSize={pool.length} />
      {q.type === "sayAloud" ? (
        <SayAloudQuestion key={qNum} q={q} onDone={() => advance(true, 0)} />
      ) : (
        <PickQuestion
          key={qNum}
          q={q}
          onAnswered={(correct) => advance(correct, correct ? 700 : 1100)}
        />
      )}
    </div>
  );
}

/** A recognition question: pick the character (hear) or the sound (see). */
function PickQuestion({ q, onAnswered }: { q: Question; onAnswered: (correct: boolean) => void }) {
  const [picked, setPicked] = useState<string | null>(null);
  const gotIt = picked === q.answer.id;

  // "hear → pick": play the target on appear. "see → pick sound": the character
  // is the prompt, so no auto audio (that'd give the answer away).
  useEffect(() => {
    if (q.type !== "hearPickChar") return;
    const t = setTimeout(() => play(q.answer), 300);
    return () => clearTimeout(t);
  }, [q]);

  function choose(k: Kana) {
    if (picked) return; // one answer per question — then it advances either way
    setPicked(k.id);
    if (q.type === "seePickSound") play(k); // this drill's options ARE sounds
    onAnswered(k.id === q.answer.id);
  }

  const cols =
    q.options.length <= 2
      ? "grid-cols-2"
      : q.options.length === 3
        ? "grid-cols-3"
        : "grid-cols-3 sm:grid-cols-5";

  return (
    <>
      {q.type === "hearPickChar" ? (
        <div className="flex flex-col items-center gap-4">
          <p className="text-lg text-neutral-500">Which one did you hear?</p>
          <ListenButton kana={q.answer} label="Play again" />
        </div>
      ) : (
        <div className="flex flex-col items-center gap-3">
          <p className="text-lg text-neutral-500">Which sound is this?</p>
          <span className="select-none text-[7rem] leading-none text-neutral-900">
            {q.answer.glyph}
          </span>
        </div>
      )}

      <div className={`grid w-full gap-3 ${cols}`}>
        {q.options.map((k) => {
          let style = "bg-neutral-100 text-neutral-800 hover:bg-neutral-200";
          if (picked) {
            if (k.id === q.answer.id) style = "bg-emerald-50 text-emerald-700 ring-2 ring-emerald-300";
            else if (k.id === picked) style = "bg-rose-50 text-rose-400 ring-1 ring-rose-200";
          }
          return (
            <button
              key={k.id}
              onClick={() => choose(k)}
              className={`flex min-h-[96px] items-center justify-center rounded-2xl transition-all ${style}`}
            >
              {q.type === "seePickSound" ? (
                <span className="flex items-center gap-2 text-base font-medium">
                  <span aria-hidden>▶</span>
                  <span>{k.say}</span>
                </span>
              ) : (
                <span className="text-5xl">{k.glyph}</span>
              )}
            </button>
          );
        })}
      </div>

      <div className="min-h-[1.5rem] text-sm">
        {picked && gotIt && <span className="text-emerald-600">✓ Yes — {q.answer.say}</span>}
        {picked && !gotIt && (
          <span className="text-neutral-500">
            That was <span className="font-semibold text-neutral-800">{q.answer.say}</span>.
          </span>
        )}
      </div>
    </>
  );
}

/**
 * Production drill: see the character → say it out loud → check.
 * Retrieval first — the character shows alone. Tapping "Check" reveals the
 * pronunciation hint and the native audio to compare against; "I said it"
 * advances. No speech recognition: the act of vocalizing is what matters
 * (session-flow.md), so it always counts toward the streak.
 */
function SayAloudQuestion({ q, onDone }: { q: Question; onDone: () => void }) {
  const [checked, setChecked] = useState(false);

  function check() {
    setChecked(true);
    play(q.answer);
  }

  return (
    <>
      <p className="text-lg text-neutral-500">Say this sound out loud.</p>
      <span className="select-none text-[9rem] leading-none text-neutral-900">
        {q.answer.glyph}
      </span>

      {!checked ? (
        <button
          onClick={check}
          className="min-h-[48px] rounded-full bg-neutral-900 px-10 text-base font-medium text-white transition-colors hover:bg-neutral-700"
        >
          Check
        </button>
      ) : (
        <div className="flex flex-col items-center gap-6">
          <div className="flex flex-col items-center gap-2">
            <ListenButton kana={q.answer} label="Hear it" />
            <p className="max-w-xs text-sm leading-relaxed text-neutral-500 text-pretty">
              {q.answer.hint}
            </p>
          </div>
          <button
            onClick={onDone}
            className="min-h-[48px] rounded-full bg-neutral-900 px-10 text-base font-medium text-white transition-colors hover:bg-neutral-700"
          >
            I said it
          </button>
        </div>
      )}
    </>
  );
}

function DoneStep({ learned }: { learned: Kana[] }) {
  return (
    <div className="flex flex-col items-center gap-6 text-center">
      <p className="text-2xl font-medium text-neutral-900">Module complete.</p>
      <div className="flex gap-3 text-4xl text-neutral-800">
        {learned.map((k) => (
          <span key={k.id}>{k.glyph}</span>
        ))}
      </div>
      <p className="text-neutral-500">You can now recognize 5 sounds by ear.</p>
      <p className="mt-4 max-w-xs text-sm text-neutral-400">
        They’ll come back on their own schedule, right before you’d forget them.
      </p>
    </div>
  );
}

function ContinueButton({ onClick, label = "Continue" }: { onClick: () => void; label?: string }) {
  return (
    <button
      onClick={onClick}
      className="mt-2 min-h-[48px] rounded-full bg-neutral-900 px-10 text-base font-medium text-white transition-colors hover:bg-neutral-700"
    >
      {label}
    </button>
  );
}
