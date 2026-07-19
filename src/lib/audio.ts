/**
 * PLACEHOLDER audio — browser text-to-speech.
 *
 * Michi's real audio strategy is native-voice recordings with correct pitch
 * accent (docs/design/audio.md). Browser TTS is a temporary stand-in so we can
 * build the flow now; swap speak() for real audio-file playback later.
 * The pronunciation here is NOT accurate enough to teach from — it is scaffolding.
 */

let cachedJaVoice: SpeechSynthesisVoice | null | undefined;

function jaVoice(): SpeechSynthesisVoice | null {
  if (cachedJaVoice !== undefined) return cachedJaVoice;
  const voices = window.speechSynthesis?.getVoices() ?? [];
  cachedJaVoice = voices.find((v) => v.lang.startsWith("ja")) ?? null;
  return cachedJaVoice;
}

/** Speak a kana aloud via browser TTS. No-op if unsupported. */
export function speak(text: string): void {
  const synth = window.speechSynthesis;
  if (!synth) return;
  synth.cancel(); // never overlap two sounds
  const u = new SpeechSynthesisUtterance(text);
  u.lang = "ja-JP";
  const voice = jaVoice();
  if (voice) u.voice = voice;
  u.rate = 0.8; // a touch slower for beginners
  synth.speak(u);
}
