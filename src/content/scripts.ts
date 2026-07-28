/**
 * Station 1 — "The three scripts" (しんばし).
 *
 * An orientation station: no drills, no SRS seeds. The learner meets the writing
 * system before being asked to learn any of it — one idea per slide, one example
 * word per script. Depth (origins, a mixed three-script sentence) lives in the
 * book stop after the station (codex: "Three scripts, one language"), never here.
 *
 * Sound clips reuse the per-kana recordings in public/audio/hiragana, so every
 * example word can be played syllable by syllable (lib/audio.ts).
 */

/** One syllable of an example word — glyph plus the kana id its clip is keyed by. */
export type Syllable = { glyph: string; id: string; say: string };

export type Word = {
  word: string;
  /** The word's sounds. For kanji these are its *reading*, not its characters. */
  syllables: Syllable[];
  meaning: string;
  note?: string;
  /** True when `word` is written in characters the syllables don't spell out (kanji). */
  readingDiffers?: boolean;
};

/** A script, as the learner meets it here. */
export type Script = {
  id: "hiragana" | "katakana" | "kanji";
  name: string;
  glyph: string; // the script's own name, written in itself where it can be
  /** One or two sentences carrying the script's essential fact — the station must
   *  say this itself, because the book stop that expands on it is skippable. */
  blurb: string;
  words: Word[];
};

const syl = (glyph: string, id: string, say: string): Syllable => ({ glyph, id, say });

/**
 * Words for the romaji step: familiar in English, and each one splits cleanly into
 * its sounds. Kept to two so the station stays light — more examples, and the point
 * about why the split matters, live in the book stop ("Three scripts, one language").
 *
 * Written in hiragana here on purpose. Real text writes these 津波 and カラオケ, but the
 * station's point is one sound, one symbol, and hiragana is the only script the learner
 * is about to meet. The book stop shows カラオケ in its own script.
 */
export const ROMAJI_WORDS: Word[] = [
  {
    word: "つなみ",
    syllables: [syl("つ", "hira_tsu", "tsu"), syl("な", "hira_na", "na"), syl("み", "hira_mi", "mi")],
    meaning: "tsunami",
  },
  {
    word: "からおけ",
    syllables: [
      syl("か", "hira_ka", "ka"),
      syl("ら", "hira_ra", "ra"),
      syl("お", "hira_o", "o"),
      syl("け", "hira_ke", "ke"),
    ],
    meaning: "karaoke",
  },
];

export const SCRIPTS: Script[] = [
  {
    id: "hiragana",
    name: "Hiragana",
    glyph: "ひらがな",
    blurb:
      "The foundation. 46 symbols, each one a sound that never changes. Anything Japanese can be written in hiragana, so it is the first script you will learn.",
    words: [
      {
        word: "わたし",
        syllables: [syl("わ", "hira_wa", "wa"), syl("た", "hira_ta", "ta"), syl("し", "hira_shi", "shi")],
        meaning: "I / me",
      },
    ],
  },
  {
    id: "katakana",
    name: "Katakana",
    glyph: "カタカナ",
    blurb:
      "The same 46 sounds, drawn with sharper shapes and used for words borrowed from other languages. When a word is written in katakana, you know it came from outside Japanese.",
    words: [
      {
        word: "カメラ",
        syllables: [syl("カ", "hira_ka", "ka"), syl("メ", "hira_me", "me"), syl("ラ", "hira_ra", "ra")],
        meaning: "camera",
      },
    ],
  },
  {
    id: "kanji",
    name: "Kanji",
    glyph: "漢字",
    blurb:
      "Characters adopted from Chinese, each showing a meaning rather than a sound. There are thousands, but you will start learning them much later, a few at a time.",
    words: [
      {
        word: "山",
        syllables: [syl("や", "hira_ya", "ya"), syl("ま", "hira_ma", "ma")],
        meaning: "mountain",
        note: "Look at it: three peaks.",
        readingDiffers: true,
      },
    ],
  },
];
