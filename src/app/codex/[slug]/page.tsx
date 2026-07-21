import { notFound } from "next/navigation";
import { CODEX_ENTRIES, codexEntry } from "@/content/codex";
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

  return (
    <main className="mx-auto min-h-screen w-full max-w-2xl px-6 py-10 sm:py-16">
      <MarkVisited slug={entry.slug} />
      <nav className="mb-14 flex items-center justify-between gap-4 text-sm">
        <a href="/codex" className="text-ink-muted transition-colors hover:text-ink">← Codex</a>
        <a href="/" className="text-ink-muted transition-colors hover:text-ink">The path</a>
      </nav>

      <article>
        <header className="mb-12">
          <p className="font-kana text-4xl text-accent">文</p>
          <h1 className="mt-5 text-3xl font-semibold tracking-[-0.02em] text-ink text-balance sm:text-4xl">
            {entry.title}
          </h1>
          <p className="mt-4 max-w-xl text-lg leading-relaxed text-ink-muted text-pretty">
            {entry.summary}
          </p>
        </header>

        <div className="space-y-12">
          {entry.sections.map((section) => (
            <section key={section.heading}>
              <h2 className="text-xl font-medium text-ink text-balance">{section.heading}</h2>
              <div className="mt-4 space-y-4">
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph} className="leading-7 text-ink-muted text-pretty">{paragraph}</p>
                ))}
              </div>
            </section>
          ))}
        </div>
      </article>
    </main>
  );
}
