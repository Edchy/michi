"use client";

import { useEffect, useMemo, useState } from "react";
import { buildTrack0, type ScriptStep } from "@/content/track0";
import { type Script, type Syllable, type Word } from "@/content/scripts";
import { play } from "@/lib/audio";

/** Clips are keyed by kana id; the Word syllables carry those ids directly. */
function playSyllable(s: Syllable) {
  play(s);
}

/** Play a word one syllable at a time, ~420ms apart. */
function playWord(syllables: Syllable[]) {
  syllables.forEach((s, i) => setTimeout(() => playSyllable(s), i * 420));
}

export default function Track0Page() {
  const steps = useMemo(() => buildTrack0(), []);
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  const step = steps[index]!;
  const atStart = index === 0;
  const atEnd = index === steps.length - 1;

  function go(delta: number) {
    setDirection(delta);
    setIndex((i) => Math.min(steps.length - 1, Math.max(0, i + delta)));
  }

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.metaKey || event.ctrlKey || event.altKey) return;
      const target = event.target instanceof HTMLElement ? event.target : null;
      if (target && (target.isContentEditable || ["INPUT", "TEXTAREA", "SELECT"].includes(target.tagName))) return;
      if (event.key === "ArrowLeft" && !atStart) {
        event.preventDefault();
        go(-1);
      } else if (event.key === "ArrowRight" && !atEnd) {
        event.preventDefault();
        go(1);
      }
    }
    window.addEventListener("keydown", onKeyDown, true);
    return () => window.removeEventListener("keydown", onKeyDown, true);
  });

  return (
    // pb clears the floating nav (~112px incl. its own pb-6) plus breathing room, so a
    // tall script slide scrolls to a readable end instead of stopping under the buttons.
    <main className="relative mx-auto flex min-h-screen max-w-[600px] flex-col px-5 pb-44 pt-8">
      <div className="flex flex-1 items-center justify-center">
        <div key={index} className="w-full step-enter py-6" data-dir={direction}>
          <StepView step={step} />
        </div>
      </div>

      {/* A paper-to-transparent scrim: content scrolling under the nav fades out rather
          than colliding with the buttons. */}
      <div className="pointer-events-none fixed inset-x-0 bottom-0 z-10 flex justify-center bg-gradient-to-t from-paper via-paper/95 to-transparent pb-6 pt-10">
        <div data-floating-nav className="pointer-events-auto flex flex-col items-center gap-2">
          <Dots count={steps.length} at={index} />
          <nav className="flex items-center gap-2" aria-label="Lesson navigation">
            {!atStart && (
              <button onClick={() => go(-1)} aria-label="Back" title="Back (Left Arrow)" className={NAV_BTN}>
                <span aria-hidden className="text-lg">←</span>
              </button>
            )}
            <a href="/" aria-label="World map" className={`${NAV_BTN} flex items-center justify-center font-kana text-lg`}>
              家
            </a>
            {!atEnd && (
              <button onClick={() => go(1)} aria-label="Next" title="Next (Right Arrow)" className={NAV_BTN}>
                <span aria-hidden className="text-lg">→</span>
              </button>
            )}
          </nav>
        </div>
      </div>
    </main>
  );
}

const NAV_BTN =
  "min-h-[48px] min-w-[48px] rounded-[var(--radius-btn)] bg-surface px-4 text-ink-muted transition-colors hover:bg-surface-2";

const PRIMARY_BTN =
  "min-h-[48px] rounded-[var(--radius-btn)] bg-ink px-10 text-base font-medium text-paper transition-colors hover:bg-ink/90";

function Dots({ count, at }: { count: number; at: number }) {
  return (
    <div
      role="progressbar"
      aria-label="Station progress"
      aria-valuemin={0}
      aria-valuemax={count}
      aria-valuenow={at + 1}
      className="my-1 flex h-5 items-center justify-center gap-1.5"
    >
      {Array.from({ length: count }, (_, i) => (
        <span
          key={i}
          aria-hidden
          className={`block h-[3px] rounded-full transition-all duration-200 ease-out motion-reduce:transition-none ${
            i === at ? "w-5 bg-accent" : i < at ? "w-2.5 bg-ink" : "w-2.5 bg-line"
          }`}
        />
      ))}
    </div>
  );
}

function StepView({ step }: { step: ScriptStep }) {
  if (step.kind === "open") return <OpenStep />;
  if (step.kind === "script") return <ScriptStepView script={step.script} />;
  if (step.kind === "romaji") return <RomajiStep />;
  return <HandoffStep />;
}

/* ---------- steps ---------- */

function OpenStep() {
  return (
    <div className="mx-auto flex w-full max-w-md flex-col items-center gap-8 text-center">
      <p className="text-2xl font-medium text-ink text-balance">
        Japanese is written with three scripts.
      </p>
      <div className="grid w-full max-w-sm grid-cols-3 gap-3">
        {[
          ["ひ", "hiragana"],
          ["カ", "katakana"],
          ["漢", "kanji"],
        ].map(([glyph, name]) => (
          <span
            key={name}
            className="flex flex-col items-center gap-2 rounded-[var(--radius-lg)] bg-ink px-2 py-4"
          >
            <span className="font-kana text-6xl leading-none text-paper">{glyph}</span>
            <span className="text-xs uppercase tracking-[0.18em] text-paper/60">{name}</span>
          </span>
        ))}
      </div>
      <p className="leading-relaxed text-ink-muted text-pretty">
        Often all three in a single sentence. Each one does a different job, and you are
        about to meet them one at a time.
      </p>
    </div>
  );
}

function ScriptStepView({ script }: { script: Script }) {
  return (
    <div className="mx-auto flex w-full max-w-md flex-col items-center gap-5 text-center">
      <div className="flex flex-col items-center gap-2">
        <span className="font-kana text-4xl leading-none text-ink">{script.glyph}</span>
        <span className="text-sm uppercase tracking-[0.18em] text-ink-faint">{script.name}</span>
      </div>

      <p className="text-sm leading-relaxed text-ink-muted text-pretty">{script.blurb}</p>

      <div className="flex w-full flex-col gap-4">
        {script.words.map((w) => (
          <WordCard key={w.word} word={w} />
        ))}
      </div>
    </div>
  );
}

/** A word, broken into tappable syllables with its meaning underneath. */
function WordCard({ word }: { word: Word }) {
  // A dark slab, like the world-map brand: paper text on ink. ink-muted/faint are
  // tuned for the light bg and would vanish here, so secondary text is paper at
  // reduced opacity instead (globals.css notes the same for .world-brand).
  return (
    <button
      onClick={() => playWord(word.syllables)}
      aria-label={`Hear ${word.word}`}
      className="relative flex flex-col items-center gap-2 rounded-[var(--radius-lg)] bg-ink px-4 py-4 transition-colors hover:bg-ink/90"
    >
      <SpeakerIcon className="pointer-events-none absolute right-3 top-3 text-paper/50" />
      {/* Kanji is written in characters its sounds don't spell, so the word leads and
          the reading follows underneath. Kana words already ARE their syllables. */}
      {word.readingDiffers && (
        <span className="font-kana text-6xl leading-none text-paper">{word.word}</span>
      )}
      <span className="flex items-end gap-2">
        {word.syllables.map((s, i) => (
          <span key={i} className="flex flex-col items-center gap-1">
            <span
              className={`font-kana leading-none ${
                word.readingDiffers ? "text-3xl text-paper/70" : "text-5xl text-paper"
              }`}
            >
              {s.glyph}
            </span>
            <span className="text-xs font-light tracking-wide text-paper/60">{s.say}</span>
          </span>
        ))}
      </span>
      <span className="text-lg font-medium text-paper">{word.meaning}</span>
      {word.note && (
        <span className="text-sm leading-relaxed text-paper/70 text-pretty">{word.note}</span>
      )}
    </button>
  );
}

/** A small "this plays sound" affordance for the tappable word cards. */
function SpeakerIcon({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 24 24"
      width="16"
      height="16"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" fill="currentColor" stroke="none" />
      <path d="M15.5 8.5a5 5 0 0 1 0 7" />
    </svg>
  );
}

/** Romaji is named, then set aside (P2). Deliberately NOT the script-slide template:
    it is not a fourth script, and the layout should not suggest it is. */
function RomajiStep() {
  return (
    <div className="mx-auto flex w-full max-w-md flex-col items-center gap-5 text-center">
      <p className="text-2xl font-medium text-ink text-balance">
        One more thing: romaji.
      </p>
      <p className="text-sm leading-relaxed text-ink-muted text-pretty">
        You have probably seen Japanese words written in English letters: sushi, Tokyo,
        samurai. That is romaji, Japanese spelled with the Latin alphabet. It is not one
        of the three scripts, and Japanese is not written this way. It exists for
        keyboards, street signs, and people who cannot read the scripts.
      </p>
      <div className="flex items-center gap-4 rounded-[var(--radius-lg)] bg-surface px-6 py-5">
        <span className="text-xl tracking-wide text-ink-faint line-through decoration-accent decoration-2">
          sushi
        </span>
        <span aria-hidden className="text-ink-faint">→</span>
        <span className="font-kana text-3xl leading-none text-ink">すし</span>
      </div>
      <p className="text-sm leading-relaxed text-ink-muted text-pretty">
        Michi never teaches through romaji, because reading Japanese through English
        spelling is a habit that is hard to undo. Here, sushi is written すし, and that is
        how you will learn to read it.
      </p>
    </div>
  );
}

function HandoffStep() {
  return (
    <div className="mx-auto flex w-full max-w-md flex-col items-center gap-6 text-center">
      <p className="text-2xl font-medium text-ink text-balance">We start with hiragana.</p>
      <p className="leading-relaxed text-ink-muted text-pretty">
        Its 46 symbols can write anything in Japanese, and each one stands for a single
        sound. Learn them and you can read any hiragana word out loud.
      </p>
      <p className="flex gap-4 font-kana text-5xl leading-none text-ink">
        <span>あ</span>
        <span>い</span>
        <span>う</span>
        <span>え</span>
        <span>お</span>
      </p>
      <p className="leading-relaxed text-ink-muted text-pretty">
        These are the five vowels, and they are where you begin. Nearly every other
        symbol is a consonant joined to one of these five sounds, so knowing them makes
        the other 41 far easier.
      </p>
      <a
        href="/?completed=three-scripts"
        className={`mt-2 inline-flex items-center justify-center ${PRIMARY_BTN}`}
      >
        Return to the path
      </a>
    </div>
  );
}
