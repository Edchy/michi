"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { buildTrack0, type ScriptStep } from "@/content/track0";
import { MICHI, type Script, type Word } from "@/content/scripts";
import { VOWELS } from "@/content/hiragana";
import { playRecording } from "@/lib/audio";
import { ARROW_KEY_CLASS, SPACE_KEY_CLASS } from "@/components/keyboard-key";
import { StationNav } from "@/components/station-nav";
import { SignTitle } from "@/components/sign-title";

export default function Track0Page() {
  const steps = useMemo(() => buildTrack0(), []);
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const soundCycleIndex = useRef(0);

  const step = steps[index]!;
  const atStart = index === 0;
  const atEnd = index === steps.length - 1;
  const playSlideSound =
    step.kind === "script"
      ? () => playRecording(step.script.words[0]!.audioSrc)
      : step.kind === "michi" || step.kind === "welcome"
        ? () => playRecording(MICHI.audioSrc)
        : undefined;

  function go(delta: number) {
    setDirection(delta);
    soundCycleIndex.current = 0;
    setIndex((i) => Math.min(steps.length - 1, Math.max(0, i + delta)));
  }

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.metaKey || event.ctrlKey || event.altKey) return;
      const target = event.target instanceof HTMLElement ? event.target : null;
      if (target && (target.isContentEditable || ["INPUT", "TEXTAREA", "SELECT"].includes(target.tagName))) return;

      if (event.code === "Space") {
        // Space plays sound wherever focus sits, so it behaves the same as on the later
        // stations. A focused speaker plays itself; otherwise cycle the slide's speakers.
        const cards = Array.from(
          document.querySelectorAll<HTMLButtonElement>("[data-audio-control]"),
        );
        if (cards.length === 0) return;
        event.preventDefault();
        target?.closest<HTMLButtonElement>("[data-floating-nav] button")?.blur();
        const focused = target?.closest<HTMLButtonElement>("[data-audio-control]");
        if (focused) {
          focused.click();
        } else {
          cards[soundCycleIndex.current % cards.length]!.click();
          soundCycleIndex.current = (soundCycleIndex.current + 1) % cards.length;
        }
        return;
      }

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
          <StationNav
            onBack={() => go(-1)}
            onNext={() => go(1)}
            canGoBack={!atStart}
            canGoNext={!atEnd}
            pathHref={atEnd ? "/?completed=three-scripts" : "/"}
            pathIsForward={atEnd}
            onSound={playSlideSound}
            soundLabel="Play sound"
            progress={<Dots count={steps.length} at={index} />}
          />
        </div>
      </div>
    </main>
  );
}

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
  if (step.kind === "welcome") return <WelcomeStep />;
  if (step.kind === "controls") return <ControlsStep />;
  if (step.kind === "script") return <ScriptStepView script={step.script} />;
  if (step.kind === "romaji") return <RomajiStep />;
  if (step.kind === "michi") return <MichiStep />;
  return <HandoffStep />;
}

/* ---------- steps ---------- */

function WelcomeStep() {
  return (
    <div className="mx-auto flex w-full max-w-md flex-col items-center gap-8 text-center">
      <SignTitle title="Welcome to Michi." />

      <div className="flex w-full flex-col items-center justify-center gap-3 rounded-[var(--radius-lg)] border-2 border-ink bg-accent px-6 py-8 text-ink">
        <span className="font-kana text-[9rem] leading-none">{MICHI.kanji}</span>
        <span className="text-sm font-bold uppercase tracking-[0.22em]">michi</span>
      </div>

      <p className="max-w-sm text-base leading-relaxed text-ink-muted text-pretty">
        Michi means way, road, or path. This is where yours begins.
      </p>
    </div>
  );
}

function OpenStep() {
  return (
    <div className="mx-auto flex w-full max-w-md flex-col items-center gap-8 text-center">
      <SignTitle title="Japanese uses three scripts." />
      <div className="grid w-full max-w-sm grid-cols-3 gap-3">
        {[
          ["ひ", "hiragana"],
          ["カ", "katakana"],
          ["漢", "kanji"],
        ].map(([glyph, name]) => (
          <span
            key={name}
            className="flex flex-col items-center gap-2 rounded-[var(--radius-lg)] border-2 border-ink bg-accent px-2 py-4"
          >
            <span className="font-kana text-6xl leading-none text-ink">{glyph}</span>
            <span className="text-xs font-bold uppercase tracking-[0.18em] text-ink/65">{name}</span>
          </span>
        ))}
      </div>
      <div className="flex w-full max-w-sm flex-col text-left">
        <p className="mb-3 text-center text-base font-semibold text-ink">
          One Japanese sentence can mix all three.
        </p>
        {[
          ["Kanji", "carries much of the meaning"],
          ["Hiragana", "connects words and shows grammar"],
          ["Katakana", "marks many borrowed words"],
        ].map(([name, role], index) => (
          <p
            key={name}
            className={`flex items-baseline gap-3 py-2.5 text-sm ${
              index > 0 ? "border-t border-line" : ""
            }`}
          >
            <strong className="min-w-20 text-ink underline decoration-[5px] decoration-accent/80 underline-offset-[-2px] decoration-skip-ink-none">
              {name}
            </strong>
            <span className="text-ink-muted">{role}</span>
          </p>
        ))}
      </div>
    </div>
  );
}

function ControlsStep() {
  return (
    <div className="mx-auto flex w-full max-w-md flex-col items-center gap-8 text-center">
      <p className="text-2xl font-medium text-ink text-balance">A quick way to move.</p>

      <div className="flex w-full flex-col overflow-hidden rounded-[var(--radius-lg)] border-2 border-ink bg-accent text-left">
        <div className="flex min-h-24 items-center gap-5 border-b-2 border-ink px-5 py-4">
          <span className="flex shrink-0 gap-1.5">
            <kbd className={`${ARROW_KEY_CLASS} !bg-ink !text-paper !shadow-none`}>←</kbd>
            <kbd className={`${ARROW_KEY_CLASS} !bg-ink !text-paper !shadow-none`}>→</kbd>
          </span>
          <span className="font-semibold text-ink">Move between slides</span>
        </div>
        <div className="flex min-h-24 items-center gap-5 px-5 py-4">
          <kbd className={`${SPACE_KEY_CLASS} shrink-0 !bg-ink !text-paper !shadow-none`}>Space</kbd>
          <span className="font-semibold text-ink">Play sound when one is available</span>
        </div>
      </div>

      <p className="text-sm leading-relaxed text-ink-muted text-pretty">
        On a keyboard, these shortcuts work throughout Michi. You can always use the
        controls below instead.
      </p>
    </div>
  );
}

function ScriptStepView({ script }: { script: Script }) {
  return (
    <div className="mx-auto flex w-full max-w-md flex-col items-center gap-5 text-center">
      <SignTitle title={script.glyph} label={script.name} kana />

      <div className="flex max-w-sm flex-col gap-2 text-pretty">
        <p className="text-base font-semibold leading-relaxed text-ink">
          {script.blurb.lead}
        </p>
        <p className="text-sm leading-relaxed text-ink-muted">{script.blurb.detail}</p>
      </div>

      <div className="flex w-full flex-col gap-4">
        {script.words.map((w) => (
          <WordCard key={w.word} word={w} />
        ))}
      </div>
    </div>
  );
}

/** A compact example sign. Playback lives in the station nav, never inside content. */
function WordCard({ word }: { word: Word }) {
  return (
    <div className="mx-auto flex w-full max-w-xs flex-col items-center gap-2 rounded-[var(--radius-lg)] border-2 border-ink bg-accent px-4 py-4">
      {/* Kanji is written in characters its sounds don't spell, so the word leads and
          the reading follows underneath. Kana words already ARE their syllables. */}
      {word.readingDiffers && (
        <span className="font-kana text-6xl leading-none text-ink">{word.word}</span>
      )}
      <span className="flex items-end gap-2">
        {word.syllables.map((s, i) => (
          <span key={i} className="flex flex-col items-center gap-1">
            <span
              className={`font-kana leading-none ${
                word.readingDiffers ? "text-3xl text-ink-muted" : "text-5xl text-ink"
              }`}
            >
              {s.glyph}
            </span>
            <span className="text-xs font-medium tracking-wide text-ink-muted">{s.say}</span>
          </span>
        ))}
      </span>
      <span className="text-lg font-semibold text-ink">{word.meaning}</span>
      {word.note && (
        <span className="text-sm leading-relaxed text-ink-muted text-pretty">{word.note}</span>
      )}
    </div>
  );
}

/** Romaji is named, then set aside (P2). Deliberately NOT the script-slide template:
    it is not a fourth script, and the layout should not suggest it is. */
function RomajiStep() {
  return (
    <div className="mx-auto flex w-full max-w-md flex-col items-center gap-7 text-center">
      <SignTitle title="Romaji." label="Latin letters" />

      <div className="flex max-w-sm flex-col gap-2 text-pretty">
        <p className="text-base font-semibold leading-relaxed text-ink">
          Romaji writes Japanese sounds with the Latin alphabet.
        </p>
        <p className="text-sm leading-relaxed text-ink-muted">
          You already know examples like <em className="font-medium text-ink">sushi</em>,{" "}
          <em className="font-medium text-ink">Tokyo</em>, and{" "}
          <em className="font-medium text-ink">karaoke</em>.
        </p>
        <p className="text-sm leading-relaxed text-ink-muted">
          It helps with keyboards and signs, but it is <strong className="text-ink">not</strong>{" "}
          one of Japanese&rsquo;s three scripts.
        </p>
      </div>

      <div className="flex w-full items-center justify-center gap-5 rounded-[var(--radius-lg)] border-2 border-ink bg-accent px-6 py-6">
        <span className="text-xl tracking-wide text-ink/65 line-through decoration-ink decoration-2">
          sushi
        </span>
        <span aria-hidden className="text-xl font-bold text-ink">→</span>
        <span className="font-kana text-4xl leading-none text-ink">すし</span>
      </div>

      <p className="text-sm font-semibold leading-relaxed text-ink text-pretty">
        Michi teaches the Japanese scripts directly, so romaji stops here.
      </p>
    </div>
  );
}

function MichiStep() {
  return (
    <div className="mx-auto flex w-full max-w-md flex-col items-center gap-7 text-center">
      <SignTitle title="One name, three scripts." />

      <p className="text-sm leading-relaxed text-ink-muted text-pretty">
        Here is the name Michi written in each script.
      </p>

      <div className="grid w-full grid-cols-3 overflow-hidden rounded-[var(--radius-lg)] border-2 border-ink bg-accent text-ink">
        {[
          ["Hiragana", MICHI.hiragana],
          ["Katakana", MICHI.katakana],
          ["Kanji", MICHI.kanji],
        ].map(([label, form], index) => (
          <span
            key={label}
            className={`flex min-h-32 flex-col items-center justify-center gap-3 px-2 ${
              index > 0 ? "border-l-2 border-ink" : ""
            }`}
          >
            <span className="text-xs font-bold uppercase tracking-wide text-ink/65">{label}</span>
            <span className="font-kana text-5xl leading-none">{form}</span>
          </span>
        ))}
      </div>
    </div>
  );
}

function HandoffStep() {
  return (
    <div className="mx-auto flex w-full max-w-md flex-col items-center gap-7 text-center">
      <SignTitle title="Hiragana first." />

      <div className="flex max-w-sm flex-col gap-2 text-pretty">
        <p className="text-base font-semibold leading-relaxed text-ink">
          Hiragana begins with five vowels.
        </p>
        <p className="text-sm leading-relaxed text-ink-muted">
          These five sounds become the foundation for nearly everything that follows.
        </p>
      </div>

      <div
        className="grid w-full grid-cols-5 overflow-hidden rounded-[var(--radius-lg)] border-2 border-ink bg-accent"
        aria-label="The five hiragana vowels"
      >
        {VOWELS.map((kana, index) => (
          <span
            key={kana.id}
            className={`flex min-h-28 items-center justify-center font-kana text-5xl leading-none text-ink ${
              index > 0 ? "border-l-2 border-ink" : ""
            }`}
          >
            {kana.glyph}
          </span>
        ))}
      </div>
    </div>
  );
}
