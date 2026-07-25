/**
 * Audio — plays pre-recorded native-speaker kana clips.
 *
 * Files live in public/audio/kana/<itemId>.mp3 (see that dir's ATTRIBUTION.md).
 * Offline-first: they ship with the app, no network at play time (P9). A missing
 * clip is a silent no-op, so the app stays usable while the set is completed.
 *
 * Long-term these placeholder recordings are replaced by a native voice actor
 * (docs/design/audio.md) — same files keyed by id, no code change here.
 */

/**
 * Anything keyed by a kana id can be played — a Kana, or a Syllable of an example
 * word. Only the id is ever used, so asking for more would force callers to invent
 * fields they do not have.
 */
type Playable = { id: string };

/** Cache one Audio element per item so repeat taps replay instantly. */
const cache = new Map<string, HTMLAudioElement>();

function element(id: string): HTMLAudioElement | null {
  if (typeof window === "undefined") return null;
  let el = cache.get(id);
  if (!el) {
    el = new Audio(`/audio/kana/${id}.mp3`);
    el.preload = "auto";
    cache.set(id, el);
  }
  return el;
}

/** Play a kana's recording. Tapping again restarts it (spammable). No-op if missing. */
export function play(kana: Playable): void {
  const el = element(kana.id);
  if (!el) return;
  el.currentTime = 0;
  // A missing file rejects; swallow it so the UI stays calm until the clip lands.
  void el.play().catch(() => {});
}

/**
 * Preload the clips for a set of kana on an early user gesture, so the first
 * play is instant and the browser has permission to produce sound.
 */
export function primeAudio(pool: Playable[]): void {
  for (const k of pool) element(k.id)?.load();
}
