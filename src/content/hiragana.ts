/**
 * Seed content for the first stations: the five vowels (あ-row of the gojūon) and
 * the k-row built on them.
 * Deliberately tiny — real content-as-data (content-model.md) comes later.
 * `id` is the join key to a learner's SrsItemState (data-model.md).
 */
export interface Kana {
  id: string;
  glyph: string;
  reading: string; // the sound — never shown as a romaji reading aid (P2); used for TTS + labels
  say: string; // the sound as the learner says it, for the teaching beat ("a", "i"...)
  hints: readonly string[]; // rotating pronunciation prompts for production practice
}

export const VOWELS: Kana[] = [
  {
    id: "hira_a",
    glyph: "あ",
    reading: "a",
    say: "a",
    hints: [
      'Like the "a" in "father."',
      "A clean, open a. Short and steady.",
      "Keep it pure: a, without sliding into uh.",
    ],
  },
  {
    id: "hira_i",
    glyph: "い",
    reading: "i",
    say: "i",
    hints: [
      'Like the "ee" in "see," but shorter.',
      "Smile lightly and make a clean i.",
      "Keep the sound steady, without a trailing y.",
    ],
  },
  {
    id: "hira_u",
    glyph: "う",
    reading: "u",
    say: "u",
    hints: [
      // English writes two different sounds "oo": the long one in "food" and the short
      // one in "look". う is the short one, so the hint has to say which, not just "oo".
      'The short "oo" in "look" and "book," not the long "oo" in "food."',
      "A short u with relaxed lips, never pushed forward.",
      "Keep the lips easy and the sound compact.",
    ],
  },
  {
    id: "hira_e",
    glyph: "え",
    reading: "e",
    say: "e",
    hints: [
      'Like the "e" in "bed."',
      "A clean e. Short and steady.",
      "Keep it open and finish without gliding into ay.",
    ],
  },
  {
    id: "hira_o",
    glyph: "お",
    reading: "o",
    say: "o",
    hints: [
      'Like the "oh" in "boat," but shorter, without the lingering "ow".',
      "A short, pure o. Do not let it turn into ow.",
      "Round gently, then stop the sound cleanly.",
    ],
  },
];

/**
 * The k-row (か行): the k sound joined to each of the five vowels, in gojūon order.
 * Every one is regular, so the hints are about the vowel the learner already knows
 * rather than about anything new in the consonant.
 */
export const K_ROW: Kana[] = [
  {
    id: "hira_ka",
    glyph: "か",
    reading: "ka",
    say: "ka",
    hints: [
      "k plus あ: ka.",
      "A clean ka, with the same open vowel as あ.",
      "Keep the vowel pure: ka, not kuh.",
    ],
  },
  {
    id: "hira_ki",
    glyph: "き",
    reading: "ki",
    say: "ki",
    hints: [
      "k plus い: ki, like the start of \"key.\"",
      "A short, clean ki. Do not let it trail off.",
      "Same vowel as い, with a k in front.",
    ],
  },
  {
    id: "hira_ku",
    glyph: "く",
    reading: "ku",
    say: "ku",
    hints: [
      // Same trap as う: "koo" alone reads as "coo". Name the short vowel explicitly.
      'k plus う: the short "oo" in "look," so it sounds like the start of "cook," not "coo."',
      "A compact ku, with the same relaxed lips as う.",
      "Short and light. Do not stretch the vowel out.",
    ],
  },
  {
    id: "hira_ke",
    glyph: "け",
    reading: "ke",
    say: "ke",
    hints: [
      "k plus え: ke, like the start of \"kettle.\"",
      "A clean ke. Stop it before it slides into kay.",
      "Same open e as え, with a k in front.",
    ],
  },
  {
    id: "hira_ko",
    glyph: "こ",
    reading: "ko",
    say: "ko",
    hints: [
      "k plus お: ko, like the start of \"coat.\"",
      "A short, pure ko. No trailing ow.",
      "Round gently, then cut the sound off.",
    ],
  },
];
