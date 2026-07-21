"use client";

import { useEffect, useState } from "react";
import { CODEX_ENTRIES } from "@/content/codex";

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
      <header className="mb-14 flex items-center justify-between gap-6">
        <div>
          <p className="font-kana text-3xl text-ink">文</p>
          <h1 className="mt-2 text-2xl font-semibold text-ink">Codex</h1>
          <p className="mt-2 text-sm text-ink-muted">Notes from the path, saved as you encounter them.</p>
        </div>
        <a href="/" className="rounded-[var(--radius-btn)] bg-surface px-4 py-3 text-sm text-ink-muted transition-colors hover:bg-surface-2">
          The path
        </a>
      </header>

      {position === null ? null : entries.length > 0 ? (
        <div className="divide-y divide-line">
          {entries.map((entry) => (
            <a
              key={entry.slug}
              href={`/codex/${entry.slug}`}
              className="group block py-6 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
            >
              <h2 className="text-lg font-medium text-ink transition-colors group-hover:text-accent">
                {entry.title}
              </h2>
              <p className="mt-2 max-w-xl text-sm leading-relaxed text-ink-muted">{entry.summary}</p>
            </a>
          ))}
        </div>
      ) : (
        <div className="max-w-md py-10">
          <p className="text-lg font-medium text-ink">The pages are still blank.</p>
          <p className="mt-3 leading-relaxed text-ink-muted">
            Notes will appear here after the ideas behind them become useful on the path.
          </p>
        </div>
      )}
    </main>
  );
}
