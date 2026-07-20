"use client";

import { useEffect, useMemo, useState } from "react";
import { buildModule1, type Step } from "@/content/module1";
import { newDrill, grade, MIN_OPTIONS } from "@/content/drill";
import { makeQuestion, pickType, type Question, type QuestionType } from "@/content/question";
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

  return (
    <main className="relative mx-auto flex min-h-screen max-w-[600px] flex-col px-5">
      <ProgressBar index={index} total={steps.length} />

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

function ProgressBar({ index, total }: { index: number; total: number }) {
  const pct = Math.round((index / (total - 1)) * 100);
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

      <p className="max-w-xs text-sm leading-relaxed text-neutral-500 text-pretty">{kana.hint}</p>

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
const DRILL_TYPES: QuestionType[] = ["hearPickChar", "seePickSound"];

function RecognizeDrill({ pool, onDone }: { pool: Kana[]; onDone: () => void }) {
  const [drill, setDrill] = useState(() => newDrill());
  const [q, setQ] = useState<Question>(() =>
    makeQuestion(pool, pickType(DRILL_TYPES), MIN_OPTIONS),
  );
  const [picked, setPicked] = useState<string | null>(null);

  const gotIt = picked === q.answer.id;

  // On a "hear → pick" question, play the target on appear. On "see → pick sound",
  // the prompt is the visible character — no auto audio (that'd give it away).
  useEffect(() => {
    if (q.type !== "hearPickChar") return;
    const t = setTimeout(() => play(q.answer), 300);
    return () => clearTimeout(t);
  }, [q]);

  function choose(k: Kana) {
    if (picked) return; // one answer per question — then it advances either way
    setPicked(k.id);
    if (q.type === "seePickSound") play(k); // this drill's options ARE sounds

    const correct = k.id === q.answer.id;
    const next = grade(drill, correct, pool.length); // wrong lowers the streak
    setDrill(next);
    setTimeout(
      () => {
        if (next.done) onDone();
        else {
          setQ(makeQuestion(pool, pickType(DRILL_TYPES), next.options, q.answer.id));
          setPicked(null);
        }
      },
      correct ? 700 : 1100,
    );
  }

  const cols =
    q.options.length <= 2
      ? "grid-cols-2"
      : q.options.length === 3
        ? "grid-cols-3"
        : "grid-cols-3 sm:grid-cols-5";

  return (
    <div className="flex flex-col items-center gap-10 text-center">
      {/* Prompt: the thing to identify — a sound (hear) or a character (see). */}
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

      {/* Options: characters (hear-drill) or sound buttons (see-drill). */}
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
    </div>
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
