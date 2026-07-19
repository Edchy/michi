/**
 * Seed content for the MVP: the first row of the gojūon (あ-row).
 * Deliberately tiny — real content-as-data (content-model.md) comes later.
 * `id` is the join key to a learner's SrsItemState (data-model.md).
 */
export interface Kana {
  id: string;
  glyph: string;
  reading: string; // the sound, in the learner's head — never shown as a reading aid (P2)
}

export const HIRAGANA: Kana[] = [
  { id: "hira_a", glyph: "あ", reading: "a" },
  { id: "hira_i", glyph: "い", reading: "i" },
  { id: "hira_u", glyph: "う", reading: "u" },
  { id: "hira_e", glyph: "え", reading: "e" },
  { id: "hira_o", glyph: "お", reading: "o" },
];
