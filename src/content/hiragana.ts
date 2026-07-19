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
}

export const VOWELS: Kana[] = [
  { id: "hira_a", glyph: "あ", reading: "a", say: "ah" },
  { id: "hira_i", glyph: "い", reading: "i", say: "ee" },
  { id: "hira_u", glyph: "う", reading: "u", say: "oo" },
  { id: "hira_e", glyph: "え", reading: "e", say: "eh" },
  { id: "hira_o", glyph: "お", reading: "o", say: "oh" },
];
