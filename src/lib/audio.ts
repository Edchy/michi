/**
 * PLACEHOLDER audio — browser text-to-speech.
 *
 * Michi's real audio strategy is native-voice recordings with correct pitch
 * accent (docs/design/audio.md). Browser TTS is a temporary stand-in so we can
 * build the flow now; swap speak() for real audio-file playback later.
 * The pronunciation here is NOT accurate enough to teach from — it is scaffolding.
 */

/** Best available Japanese voice, or undefined (let the engine pick by lang). */
function jaVoice(synth: SpeechSynthesis): SpeechSynthesisVoice | undefined {
  return synth.getVoices().find((v) => v.lang.toLowerCase().startsWith("ja"));
}

/**
 * Resolve once the voice list is populated. Browsers load voices asynchronously
 * and the first getVoices() often returns []; speaking before then produces no
 * sound. Waits for the `voiceschanged` event, with a timeout fallback.
 */
function voicesReady(synth: SpeechSynthesis): Promise<void> {
  if (synth.getVoices().length > 0) return Promise.resolve();
  return new Promise((resolve) => {
    const done = () => {
      synth.removeEventListener("voiceschanged", done);
      resolve();
    };
    synth.addEventListener("voiceschanged", done);
    setTimeout(done, 1500); // fallback if the event never fires
  });
}

/** Speak a kana aloud via browser TTS. No-op if unsupported. */
export function speak(text: string): void {
  const synth = typeof window !== "undefined" ? window.speechSynthesis : undefined;
  if (!synth) return;
  void voicesReady(synth).then(() => {
    synth.cancel(); // never overlap two sounds
    const u = new SpeechSynthesisUtterance(text);
    u.lang = "ja-JP";
    const voice = jaVoice(synth);
    if (voice) u.voice = voice;
    u.rate = 0.85; // a touch slower for beginners
    synth.speak(u);
  });
}

/**
 * Warm up the speech engine so the first real speak() has voices ready.
 * Call once from an early user gesture.
 */
export function primeAudio(): void {
  const synth = typeof window !== "undefined" ? window.speechSynthesis : undefined;
  if (!synth) return;
  void voicesReady(synth);
}
