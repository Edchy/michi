"use client";

import { useEffect, useState } from "react";
import { CODEX_ENTRIES } from "@/content/codex";
import { stationBadge } from "@/app/worldmap";

export default function CodexPage() {
  const [position, setPosition] = useState<number | null>(null);

  useEffect(() => {
    setPosition(Math.max(0, Number(window.localStorage.getItem("michi-world-position") ?? "0")));
  }, []);

  const entries = position === null
    ? []
    : CODEX_ENTRIES.filter((entry) => position >= entry.unlockAfterStation);

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-2xl flex-col px-6 py-10 sm:py-16">
      <nav className="mb-8 text-sm">
        <a href="/" className="text-ink-muted transition-colors hover:text-ink">← The path</a>
      </nav>

      {/* The same sheet as a book stop: this is the volume those pages live in. */}
      <div className="rounded-[var(--radius-lg)] border border-line bg-[#FBF6EC] px-6 py-12 shadow-[var(--shadow-card)] sm:px-14 sm:py-16">
        <header className="text-center">
          <p className="font-kana text-3xl text-ink">文</p>
          <h1 className="mt-4 font-serif text-3xl font-semibold tracking-[-0.01em] text-ink sm:text-4xl">
            Codex
          </h1>
          <p className="mx-auto mt-4 max-w-sm font-serif text-lg italic leading-relaxed text-ink-muted text-pretty">
            Notes from the path, saved as you encounter them.
          </p>
          <hr className="mx-auto mt-10 w-12 border-line" />
        </header>

        {position === null ? null : entries.length > 0 ? (
          <ol className="mt-10 space-y-1">
            {entries.map((entry, i) => {
              const badge = stationBadge(entry.unlockAfterStation);
              return (
                <li key={entry.slug}>
                  <a
                    href={`/codex/${entry.slug}`}
                    className="group flex items-baseline gap-4 rounded-[var(--radius-btn)] px-3 py-4 transition-colors hover:bg-line/40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                  >
                    <span className="font-serif text-sm tabular-nums text-ink-faint">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block font-serif text-lg font-medium text-ink transition-colors group-hover:text-accent">
                        {entry.title}
                      </span>
                      <span className="mt-1 block font-serif leading-7 text-ink-muted text-pretty">
                        {entry.summary}
                      </span>
                    </span>
                    {badge && (
                      <span
                        className="hidden shrink-0 items-center rounded-[var(--radius-btn)] px-2 py-1 text-paper sm:inline-flex"
                        style={{ backgroundColor: badge.hue }}
                        title={`Book stop after ${badge.station.title}`}
                      >
                        <span className="font-kana text-xs">{badge.station.place}</span>
                      </span>
                    )}
                  </a>
                </li>
              );
            })}
          </ol>
        ) : (
          <div className="mt-10 text-center">
            <p className="font-serif text-lg font-medium text-ink">The pages are still blank.</p>
            <p className="mx-auto mt-3 max-w-sm font-serif leading-7 text-ink-muted text-pretty">
              Notes will appear here after the ideas behind them become useful on the path.
            </p>
          </div>
        )}

        {/* Credits live on the Codex sheet: it is the reference volume, and the world
            map is full-bleed with nowhere honest to put a footer.

            REQUIRED, do not remove. All 46 kana recordings are used by permission from
            Kia Leng Koh, granted on the condition that they are attributed with a link
            back to learn-japanese-adventure.com. The credit and its href ARE the terms
            of that permission, not decoration: dropping either breaks the agreement.
            Record of the grant: public/audio/hiragana/PERMISSION.md. */}
        <footer className="mt-16 border-t border-line pt-8">
          <h2 className="font-serif text-sm font-medium text-ink">Credits</h2>
          <p className="mt-3 font-serif leading-7 text-ink-muted text-pretty">
            The kana recordings come from{" "}
            <a
              href="https://www.learn-japanese-adventure.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-ink underline decoration-line underline-offset-4 transition-colors hover:text-accent"
            >
              Learn Japanese Adventure
            </a>
            , by Kia Leng Koh. Every sound you hear is her voice.
          </p>
        </footer>
      </div>
    </main>
  );
}
