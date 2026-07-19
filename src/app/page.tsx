"use client";

import { useEffect, useMemo, useState } from "react";
import { buildModule1, type Step } from "@/content/module1";
import { speak, primeAudio } from "@/lib/audio";
import type { Kana } from "@/content/hiragana";

type Feel = "bleed" | "card";

export default function Module1Page() {
  const steps = useMemo(() => buildModule1(), []);
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1); // 1 forward, -1 back
  const [feel, setFeel] = useState<Feel>("bleed");

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
          <StepView step={step} feel={feel} onAdvance={() => go(1)} />
        </div>
      </div>

      <BottomBar
        feel={feel}
        onToggleFeel={() => setFeel((f) => (f === "bleed" ? "card" : "bleed"))}
        showBack={!atStart}
        onBack={() => go(-1)}
      />
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

function BottomBar({
  feel,
  onToggleFeel,
  showBack,
  onBack,
}: {
  feel: Feel;
  onToggleFeel: () => void;
  showBack: boolean;
  onBack: () => void;
}) {
  return (
    <div className="flex items-center justify-between py-6 text-sm">
      <button
        onClick={onBack}
        className={`min-h-[44px] px-2 text-neutral-400 transition-opacity hover:text-neutral-700 ${
          showBack ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        ← Back
      </button>
      {/* dev-only feel toggle — remove once we pick */}
      <button
        onClick={onToggleFeel}
        className="min-h-[44px] rounded-full border border-neutral-200 px-4 text-neutral-500 transition-colors hover:bg-neutral-100"
      >
        feel: {feel === "bleed" ? "full-bleed" : "soft card"}
      </button>
    </div>
  );
}

/* ---------- step surface ---------- */

function StepView({
  step,
  feel,
  onAdvance,
}: {
  step: Step;
  feel: Feel;
  onAdvance: () => void;
}) {
  const inner =
    step.kind === "welcome" ? (
      <WelcomeStep onContinue={onAdvance} />
    ) : step.kind === "teach" ? (
      <TeachStep kana={step.kana} first={step.first} onContinue={onAdvance} />
    ) : step.kind === "reveal" ? (
      <RevealStep kana={step.kana} onContinue={onAdvance} />
    ) : step.kind === "recognize" ? (
      <RecognizeStep answer={step.answer} options={step.options} onDone={onAdvance} />
    ) : (
      <DoneStep learned={step.learned} />
    );

  if (feel === "card") {
    return (
      <div className="mx-auto rounded-3xl bg-white px-6 py-14 shadow-[0_1px_3px_rgba(0,0,0,0.04),0_12px_32px_-8px_rgba(0,0,0,0.10)] ring-1 ring-neutral-100">
        {inner}
      </div>
    );
  }
  return <div className="py-10">{inner}</div>;
}

/* ---------- steps ---------- */

function ListenButton({ text, label = "Listen" }: { text: string; label?: string }) {
  return (
    <button
      onClick={() => speak(text)}
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
      {/* prime the speech engine on this first gesture so audio is ready */}
      <ContinueButton
        onClick={() => {
          primeAudio();
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
    const t = setTimeout(() => speak(kana.glyph), 250);
    return () => clearTimeout(t);
  }, [kana.glyph]);

  return (
    <div className="flex flex-col items-center gap-14 text-center">
      {/* the character IS the sound — tap it (spam it) to hear "ah" */}
      <button
        onClick={() => speak(kana.glyph)}
        className="group flex flex-col items-center gap-3 rounded-3xl px-8 py-4 transition-transform active:scale-95"
        aria-label={`Hear the sound ${kana.say}`}
      >
        <span className="select-none text-[9rem] leading-none text-neutral-900 transition-transform group-hover:scale-105">
          {kana.glyph}
        </span>
        <span className="text-lg font-light tracking-wide text-neutral-300">{kana.say}</span>
        {first && (
          <span className="mt-1 text-xs text-neutral-400">tap to hear it</span>
        )}
      </button>

      <ContinueButton onClick={onContinue} />
    </div>
  );
}

function RevealStep({ kana, onContinue }: { kana: Kana[]; onContinue: () => void }) {
  return (
    <div className="flex flex-col items-center gap-14 text-center">
      <div className="flex flex-wrap items-center justify-center gap-5">
        {kana.map((k, i) => (
          <button
            key={k.id}
            onClick={() => speak(k.glyph)}
            className="kana-rise text-6xl leading-none text-neutral-900 transition-transform hover:scale-110 active:scale-95"
            style={{ animationDelay: `${0.1 + i * 0.09}s` }}
          >
            {k.glyph}
          </button>
        ))}
      </div>
      <ContinueButton onClick={onContinue} />
    </div>
  );
}

function RecognizeStep({
  answer,
  options,
  onDone,
}: {
  answer: Kana;
  options: Kana[];
  onDone: () => void;
}) {
  const [picked, setPicked] = useState<string | null>(null);
  const correct = picked === answer.id;

  useEffect(() => {
    const t = setTimeout(() => speak(answer.glyph), 300);
    return () => clearTimeout(t);
  }, [answer.glyph]);

  function choose(k: Kana) {
    if (picked && correct) return; // locked once right
    setPicked(k.id);
    if (k.id === answer.id) {
      speak(k.glyph);
      setTimeout(onDone, 700); // brief affirmation, then auto-advance
    } else {
      speak(answer.glyph); // teach: play the right one
    }
  }

  return (
    <div className="flex flex-col items-center gap-10 text-center">
      <div className="flex flex-col items-center gap-4">
        <p className="text-lg text-neutral-500">Which one did you hear?</p>
        <ListenButton text={answer.glyph} label="Play again" />
      </div>
      <div className="grid w-full grid-cols-3 gap-3">
        {options.map((k) => {
          // once any pick is made: highlight the correct one green, a wrong pick red.
          let style = "bg-neutral-100 text-neutral-800 hover:bg-neutral-200";
          if (picked) {
            if (k.id === answer.id) style = "bg-emerald-50 text-emerald-700 ring-2 ring-emerald-300";
            else if (k.id === picked) style = "bg-rose-50 text-rose-400 ring-1 ring-rose-200";
          }
          return (
            <button
              key={k.id}
              onClick={() => choose(k)}
              className={`flex min-h-[96px] items-center justify-center rounded-2xl text-5xl transition-all ${style}`}
            >
              {k.glyph}
            </button>
          );
        })}
      </div>
      <div className="min-h-[1.5rem] text-sm">
        {picked && correct && <span className="text-emerald-600">✓ Yes — {answer.say}</span>}
        {picked && !correct && (
          <span className="text-neutral-500">
            This is <span className="font-semibold text-neutral-800">{answer.glyph}</span> — try
            it.
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
