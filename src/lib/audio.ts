/**
 * Audio — plays local kana clips and complete word/sentence recordings.
 *
 * Kana files live in public/audio/hiragana/<itemId>.{webm,mp3}. Complete AI-voiced
 * utterances live in public/audio/words/ and are played as single recordings; words
 * must never be reconstructed by overlapping isolated kana clips.
 * Offline-first: they ship with the app, no network at play time (P9). A missing
 * clip is a silent no-op, so the app stays usable while the set is completed.
 *
 * These licensed human recordings are suitable for the current personal,
 * non-commercial build. A later native-voice production pass can replace the same
 * files by id without changing this code (docs/design/audio.md).
 *
 * ## Why Web Audio and not `new Audio().play()`
 *
 * The character IS the sound: you tap あ and you should hear あ. `HTMLAudioElement`
 * cannot do that. Its `play()` is asynchronous by contract — it returns a promise the
 * browser resolves on its own schedule, re-checking readiness and re-seeking after
 * `currentTime = 0`, then handing off to the OS mixer. That is tens to hundreds of
 * milliseconds, it varies per tap, and no amount of preloading removes it.
 *
 * Web Audio schedules on the audio clock instead. Clips are decoded once into memory,
 * and starting one is a buffer hookup measured in single-digit milliseconds. Decode
 * cost for one clip here is ~5 ms and output latency ~5 ms, against a file whose voice
 * begins on its first sample.
 *
 * The tradeoff is that decoded audio lives in memory. 46 clips of ~1.3 s mono at 48 kHz
 * is roughly 11 MB of Float32 — fine for this set, and worth re-checking if the library
 * ever grows to thousands of clips.
 */

/**
 * Anything keyed by a kana id can be played — a Kana, or a Syllable of an example
 * word. Only the id is ever used, so asking for more would force callers to invent
 * fields they do not have.
 */
type Playable = { id: string };

/** Decoded clips, keyed by id. Decode happens once; every later tap is a buffer hookup. */
const buffers = new Map<string, AudioBuffer>();
/** In-flight fetch+decode, so priming twice does not fetch twice. */
const pending = new Map<string, Promise<AudioBuffer | null>>();

let ctx: AudioContext | null = null;

/**
 * Opus where it plays, mp3 otherwise.
 *
 * mp3 pads its first frame, so every clip sits behind ~25 ms of silence baked into the
 * file. Opus carries exact priming metadata and starts on sample zero — and the files
 * are half the size. Safari gained Opus-in-WebM in 15; older ones fall back to the
 * mp3s, which are kept beside them for exactly this reason.
 */
function extension(): "webm" | "mp3" {
  return new Audio().canPlayType('audio/webm; codecs="opus"') ? "webm" : "mp3";
}

/**
 * The context is created lazily and resumed on a user gesture. Browsers start it
 * `suspended` until the user has interacted; resuming inside a gesture is what buys
 * permission to make sound at all.
 */
function context(): AudioContext | null {
  if (typeof window === "undefined") return null;
  ctx ??= new AudioContext();
  if (ctx.state === "suspended") void ctx.resume();
  return ctx;
}

function loadSource(key: string, source: string): Promise<AudioBuffer | null> {
  const existing = pending.get(key);
  if (existing) return existing;

  const ac = context();
  if (!ac) return Promise.resolve(null);

  // A missing clip resolves to null rather than throwing: the lesson stays usable.
  const task = fetch(source)
    .then((r) => (r.ok ? r.arrayBuffer() : Promise.reject(new Error("404"))))
    .then((b) => ac.decodeAudioData(b))
    .then((buf) => {
      buffers.set(key, buf);
      return buf;
    })
    .catch(() => null);

  pending.set(key, task);
  return task;
}

function load(id: string): Promise<AudioBuffer | null> {
  return loadSource(id, `/audio/hiragana/${id}.${extension()}`);
}

/** Play a kana's recording. Tapping again restarts it (spammable). No-op if missing. */
export function play(kana: Playable): void {
  const ac = context();
  if (!ac) return;

  const buf = buffers.get(kana.id);
  if (buf) {
    start(ac, buf);
    return;
  }
  // Not primed yet (or priming still in flight) — play as soon as it lands.
  void load(kana.id).then((b) => b && start(ac, b));
}

/** Play a complete word or sentence recording shipped with the app. */
export function playRecording(source: string): void {
  const ac = context();
  if (!ac) return;

  const key = `recording:${source}`;
  const buf = buffers.get(key);
  if (buf) {
    start(ac, buf);
    return;
  }

  void loadSource(key, source).then((loaded) => loaded && start(ac, loaded));
}

function start(ac: AudioContext, buf: AudioBuffer): void {
  const src = ac.createBufferSource();
  src.buffer = buf;
  src.connect(ac.destination);
  // Overlapping taps are the point: each tap is its own node, so spamming a glyph
  // retriggers instantly rather than waiting for the previous one to be rewound.
  src.start();
}

/**
 * Decode the clips for a set of kana on an early user gesture, so the first tap is
 * instant and the context has permission to produce sound.
 */
export function primeAudio(pool: Playable[]): void {
  if (!context()) return;
  for (const k of pool) if (!buffers.has(k.id)) void load(k.id);
}
