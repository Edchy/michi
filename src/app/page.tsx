"use client";

import { useMemo, useState } from "react";
import { HIRAGANA, type Kana } from "@/content/hiragana";
import { newItem, review, dueItems, type Grade, type SrsItemState } from "@/srs";

/** A card = the content item joined to its SRS state (by id). */
interface Card {
  kana: Kana;
  state: SrsItemState;
}

const GRADES: { grade: Grade; label: string; hint: string; className: string }[] = [
  { grade: "forgot", label: "Forgot", hint: "in a few minutes", className: "bg-rose-100 hover:bg-rose-200 text-rose-900" },
  { grade: "hard", label: "Hard", hint: "tomorrow", className: "bg-amber-100 hover:bg-amber-200 text-amber-900" },
  { grade: "got_it", label: "Got it", hint: "in a few days", className: "bg-sky-100 hover:bg-sky-200 text-sky-900" },
  { grade: "easy", label: "Easy", hint: "in weeks", className: "bg-emerald-100 hover:bg-emerald-200 text-emerald-900" },
];

export default function ReviewPage() {
  const now = useMemo(() => new Date(), []);
  // Seed every kana as a fresh, due-now SRS item. In-memory only for the MVP.
  const [cards, setCards] = useState<Card[]>(() =>
    HIRAGANA.map((kana) => ({ kana, state: newItem(now) })),
  );
  const [revealed, setRevealed] = useState(false);
  const [reviewedCount, setReviewedCount] = useState(0);

  const due = dueItems(
    cards.map((c) => c.state),
    new Date(),
  );
  const current = cards.find((c) => c.state.dueDate.getTime() <= Date.now()) ?? null;
  const totalDueNow = due.length;

  function grade(g: Grade) {
    if (!current) return;
    const when = new Date();
    setCards((prev) =>
      prev.map((c) =>
        c.kana.id === current.kana.id ? { ...c, state: review(c.state, g, when) } : c,
      ),
    );
    setReviewedCount((n) => n + 1);
    setRevealed(false);
  }

  const done = current === null;
  const totalCards = cards.length;
  const progress = totalCards === 0 ? 1 : (totalCards - totalDueNow) / totalCards;

  return (
    <main className="mx-auto flex min-h-screen max-w-[600px] flex-col px-5 py-8">
      {/* progress bar — always visible (session-flow.md) */}
      <div className="mb-10 h-2 w-full overflow-hidden rounded-full bg-neutral-200">
        <div
          className="h-full rounded-full bg-neutral-800 transition-all duration-300"
          style={{ width: `${Math.round(progress * 100)}%` }}
        />
      </div>

      {done ? (
        <section className="flex flex-1 flex-col items-center justify-center text-center">
          <p className="text-2xl font-medium">Session complete.</p>
          <p className="mt-2 text-neutral-500">
            {reviewedCount} {reviewedCount === 1 ? "review" : "reviews"} · nothing left due.
          </p>
          <p className="mt-8 max-w-xs text-sm text-neutral-400">
            Come back later — items you reviewed will resurface right before you&apos;d
            forget them.
          </p>
        </section>
      ) : (
        <section className="flex flex-1 flex-col items-center justify-center">
          <div className="mb-2 text-sm text-neutral-400">{totalDueNow} due</div>

          <div className="select-none text-[10rem] leading-none">{current.kana.glyph}</div>

          <div className="mt-10 flex min-h-[3rem] items-center">
            {revealed ? (
              <span className="text-3xl text-neutral-600">{current.kana.reading}</span>
            ) : (
              <button
                onClick={() => setRevealed(true)}
                className="min-h-[48px] rounded-xl bg-neutral-900 px-8 text-lg font-medium text-white hover:bg-neutral-700"
              >
                Reveal sound
              </button>
            )}
          </div>

          {revealed && (
            <div className="mt-12 grid w-full grid-cols-2 gap-3">
              {GRADES.map(({ grade: g, label, hint, className }) => (
                <button
                  key={g}
                  onClick={() => grade(g)}
                  className={`flex min-h-[64px] flex-col items-center justify-center rounded-xl px-4 font-medium transition-colors ${className}`}
                >
                  <span>{label}</span>
                  <span className="text-xs font-normal opacity-70">{hint}</span>
                </button>
              ))}
            </div>
          )}
        </section>
      )}
    </main>
  );
}
