export type CodexSection = {
  heading: string;
  paragraphs: readonly string[];
};

export type CodexEntry = {
  slug: string;
  title: string;
  summary: string;
  unlockAfterStation: number;
  sections: readonly CodexSection[];
};

export const CODEX_ENTRIES: readonly CodexEntry[] = [
  {
    slug: "three-scripts-one-language",
    title: "Three scripts, one language",
    summary: "Why Japanese uses hiragana, katakana, and kanji together.",
    unlockAfterStation: 1,
    sections: [
      {
        heading: "One language, three kinds of writing",
        paragraphs: [
          "Japanese is written with three scripts: hiragana, katakana, and kanji. They are not three different alphabets to choose between. A single sentence can use all three, with each doing a different job.",
          "You have started with hiragana. Its symbols represent sounds, so once you know them you can pronounce unfamiliar words written in hiragana.",
        ],
      },
      {
        heading: "Why the system grew this way",
        paragraphs: [
          "Japan first wrote extensively with characters that came from China. Those characters became kanji. Because Japanese and Chinese are different languages, Japanese readers and writers gradually developed simpler sound-based scripts from parts and flowing forms of those characters.",
          "Those two sound-based scripts became hiragana and katakana. Hiragana is the foundation you are learning now. Katakana uses the same sounds but different shapes; you will meet it later. Kanji carries much of a word's meaning and will arrive through real vocabulary.",
        ],
      },
      {
        heading: "What matters now",
        paragraphs: [
          "You do not need to memorise the whole system yet. For now, keep attaching one hiragana symbol to one Japanese sound. The larger picture will fill in as each script becomes useful.",
        ],
      },
    ],
  },
] as const;

export function codexEntry(slug: string): CodexEntry | undefined {
  return CODEX_ENTRIES.find((entry) => entry.slug === slug);
}
