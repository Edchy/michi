import { notFound } from "next/navigation";
import { CODEX_ENTRIES, codexEntry } from "@/content/codex";
import { stationBadge } from "@/app/worldmap";
import MarkVisited from "./MarkVisited";

export function generateStaticParams() {
  return CODEX_ENTRIES.map((entry) => ({ slug: entry.slug }));
}

export default async function CodexEntryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const entry = codexEntry(slug);
  if (!entry) notFound();
  const badge = stationBadge(entry.unlockAfterStation);

  return (
    <main className="mx-auto min-h-screen w-full max-w-2xl px-6 py-10 sm:py-16">
      <MarkVisited slug={entry.slug} />
      <nav className="mb-14 flex items-center justify-between gap-4 text-sm">
        <a href="/" className="text-ink-muted transition-colors hover:text-ink">← The path</a>
        <a href="/codex" className="text-ink-muted transition-colors hover:text-ink">
          <span aria-hidden className="font-kana">文</span> Codex
        </a>
      </nav>

      {/* The page itself: a sheet slightly lighter than the desk it lies on, serif
          type, chapter-style centered opening, first-line indents instead of gaps
          between paragraphs. The nav and footer stay on the desk, off the page. */}
      <article className="rounded-[var(--radius-lg)] border border-line bg-[#FBF6EC] px-6 py-12 shadow-[var(--shadow-card)] sm:px-14 sm:py-16">
        <header className="text-center">
          {badge ? (
            // The stop's identity as the map gives it: the line's color and the station
            // name in kana. No line code — the map deliberately omits it on stations.
            <div className="flex flex-col items-center gap-3">
              <span
                className="inline-flex items-center gap-2 rounded-[var(--radius-btn)] px-3 py-1.5 text-paper"
                style={{ backgroundColor: badge.hue }}
              >
                <span className="font-kana text-sm">{badge.station.place}</span>
                <span className="text-[11px] tracking-[0.1em] text-paper/75">
                  {badge.station.placeRomaji}
                </span>
              </span>
              <span className="text-xs uppercase tracking-[0.18em] text-ink-faint">
                Book stop
              </span>
            </div>
          ) : (
            <p className="text-xs uppercase tracking-[0.18em] text-ink-faint">
              Book stop after station {entry.unlockAfterStation}
            </p>
          )}
          <h1 className="mt-5 font-serif text-3xl font-semibold tracking-[-0.01em] text-ink text-balance sm:text-4xl">
            {entry.title}
          </h1>
          <p className="mx-auto mt-4 max-w-md font-serif text-lg italic leading-relaxed text-ink-muted text-pretty">
            {entry.summary}
          </p>
          <hr className="mx-auto mt-10 w-12 border-line" />
        </header>

        <div className="mt-10 space-y-10">
          {entry.sections.map((section) => (
            <section key={section.heading}>
              <h2 className="font-serif text-xl font-medium text-ink text-balance">
                {section.heading}
              </h2>
              <div className="mt-4">
                {section.paragraphs.map((paragraph, i) => (
                  <p
                    key={paragraph}
                    className={`font-serif leading-7 text-ink-muted text-pretty ${
                      i > 0 ? "indent-6" : "drop-cap"
                    }`}
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </section>
          ))}
        </div>
      </article>

      <footer className="mt-16 flex items-center justify-between gap-4 border-t border-line pt-8">
        <a
          href="/"
          className="rounded-[var(--radius-btn)] bg-surface px-4 py-3 text-sm text-ink-muted transition-colors hover:bg-surface-2"
        >
          ← Return to the path
        </a>
        <a href="/codex" className="text-sm text-ink-muted transition-colors hover:text-ink">
          More in the codex
        </a>
      </footer>
    </main>
  );
}
