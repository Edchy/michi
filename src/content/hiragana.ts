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
  hint: string; // a fuller pronunciation explanation shown when the sound is first taught
}

export const VOWELS: Kana[] = [
  { id: "hira_a", glyph: "あ", reading: "a", say: "ah", hint: 'Like the "a" in "father."' },
  { id: "hira_i", glyph: "い", reading: "i", say: "ee", hint: 'Like the "ee" in "see."' },
  {
    id: "hira_u",
    glyph: "う",
    reading: "u",
    say: "oo",
    hint: 'Like the "oo" in "food" — but with relaxed, unpushed lips.',
  },
  { id: "hira_e", glyph: "え", reading: "e", say: "eh", hint: 'Like the "e" in "bed."' },
  {
    id: "hira_o",
    glyph: "お",
    reading: "o",
    say: "oh",
    hint: 'Like the "oh" in "boat" — but shorter, without the lingering "ow".',
  },
];
