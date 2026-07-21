/**
 * Seed content for Module 1: the five vowels (あ-row of the gojūon).
 * Deliberately tiny — real content-as-data (content-model.md) comes later.
 * `id` is the join key to a learner's SrsItemState (data-model.md).
 */
export interface Kana {
  id: string;
  glyph: string;
  reading: string; // the sound — never shown as a romaji reading aid (P2); used for TTS + labels
  say: string; // an English hint at the sound, for the teaching beat ("ah", "ee"...)
  hints: readonly string[]; // rotating pronunciation prompts for production practice
}

export const VOWELS: Kana[] = [
  {
    id: "hira_a",
    glyph: "あ",
    reading: "a",
    say: "ah",
    hints: [
      'Like the "a" in "father."',
      "A clean, open ah. Short and steady.",
      "Keep it pure: ah, without sliding into uh.",
    ],
  },
  {
    id: "hira_i",
    glyph: "い",
    reading: "i",
    say: "ee",
    hints: [
      'Like the "ee" in "see," but shorter.',
      "Smile lightly and make a clean ee.",
      "Keep the sound steady, without a trailing y.",
    ],
  },
  {
    id: "hira_u",
    glyph: "う",
    reading: "u",
    say: "oo",
    hints: [
      'Like the "oo" in "food," but with relaxed, unpushed lips.',
      "A short oo with neutral lips, not tightly rounded.",
      "Keep the lips relaxed and the sound compact.",
    ],
  },
  {
    id: "hira_e",
    glyph: "え",
    reading: "e",
    say: "eh",
    hints: [
      'Like the "e" in "bed."',
      "A clean eh. Short and steady.",
      "Keep it open and finish without gliding into ay.",
    ],
  },
  {
    id: "hira_o",
    glyph: "お",
    reading: "o",
    say: "oh",
    hints: [
      'Like the "oh" in "boat," but shorter, without the lingering "ow".',
      "A short, pure oh. Do not let it turn into ow.",
      "Round gently, then stop the sound cleanly.",
    ],
  },
];
