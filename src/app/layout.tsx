import type { Metadata } from "next";
// Klee One — textbook handwriting; every Japanese glyph renders in it so what
// learners see matches what they trace (docs/design/typography.md). Self-hosted
// via @fontsource so it works offline ([P9]) — the browser fetches only the
// subsets it needs via unicode-range.
import "@fontsource/klee-one/400.css";
import "@fontsource/klee-one/600.css";
import "./globals.css";

export const metadata: Metadata = {
  title: "Michi",
  description: "The path. A Japanese learning app built on real learning science.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-bg text-ink antialiased">
        {children}
      </body>
    </html>
  );
}
