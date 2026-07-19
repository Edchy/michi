/**
 * Audio — currently a no-op stub.
 *
 * Browser TTS (speechSynthesis) was tried as a placeholder but is unreliable on
 * macOS Chrome (utterances wedge and never play), and its pronunciation isn't
 * accurate enough to teach from anyway. Michi's real audio is native-voice
 * recordings with correct pitch accent (docs/design/audio.md).
 *
 * The call sites (tappable glyph, auto-play on a teach step, etc.) are kept
 * wired so that dropping in real audio-file playback later is a change to this
 * file alone — swap these stubs for an <audio>/Web Audio implementation keyed by
 * kana id, and everything upstream already calls it.
 */

/** Play the sound for the given kana text. No-op until real audio lands. */
export function speak(_text: string): void {}

/** Warm up audio on an early user gesture. No-op until real audio lands. */
export function primeAudio(): void {}
