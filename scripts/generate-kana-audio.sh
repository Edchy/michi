#!/usr/bin/env bash
# Regenerate the hiragana audio set with macOS `say` (Kyoko, ja_JP).
#
# Free, offline, no account. Kyoko is a concatenative voice, which handles
# ISOLATED morae better than neural TTS does — see docs/design/audio.md.
#
# Output: public/audio/kana/hira_<romaji>.mp3, keyed to the ids in
# src/content/hiragana.ts, so src/lib/audio.ts needs no changes.
#
# Usage: ./scripts/generate-kana-audio.sh
set -euo pipefail

OUT="$(cd "$(dirname "$0")/.." && pwd)/public/audio/kana"
RATE=140          # `say` rate; barely affects single morae but keeps them unhurried
PAD=0.06          # trailing silence (s) so short clips don't feel clipped
TARGET_RMS=-20.0  # dB, matches the original PD recordings

command -v ffmpeg >/dev/null || { echo "needs ffmpeg (brew install ffmpeg)" >&2; exit 1; }
say -v Kyoko "" 2>/dev/null || { echo "needs the Kyoko voice (System Settings > Accessibility > Spoken Content)" >&2; exit 1; }

mkdir -p "$OUT"
tmp="$(mktemp -d)"; trap 'rm -rf "$tmp"' EXIT

# romaji:kana — the 46 gojūon. romaji half becomes the filename/id.
KANA="a:あ i:い u:う e:え o:お \
ka:か ki:き ku:く ke:け ko:こ \
sa:さ shi:し su:す se:せ so:そ \
ta:た chi:ち tsu:つ te:て to:と \
na:な ni:に nu:ぬ ne:ね no:の \
ha:は hi:ひ fu:ふ he:へ ho:ほ \
ma:ま mi:み mu:む me:め mo:も \
ya:や yu:ゆ yo:よ \
ra:ら ri:り ru:る re:れ ro:ろ \
wa:わ wo:を n:ん"

for pair in $KANA; do
  rom="${pair%%:*}"; glyph="${pair##*:}"

  # Feed `say` the KANA GLYPH, never romaji — romaji gets read as English.
  say -v Kyoko -r "$RATE" -o "$tmp/$rom.aiff" "$glyph"

  # Trim silence both ends (areverse trick), then pad the tail.
  ffmpeg -y -hide_banner -loglevel error -i "$tmp/$rom.aiff" \
    -af "silenceremove=start_periods=1:start_threshold=-50dB:start_silence=0.02,\
areverse,silenceremove=start_periods=1:start_threshold=-50dB:start_silence=0.02,areverse,\
apad=pad_dur=$PAD,aresample=44100" \
    -ac 1 -b:a 96k "$tmp/$rom.mp3"

  # RMS-normalize. Peak normalization is NOT enough here: the original PD clips
  # all peaked at -3dB yet ranged 6.6dB in RMS, which is what you actually hear.
  # (EBU R128 / loudnorm is also wrong for this — its gating window is ~400ms,
  # longer than these clips, so it silently fails to converge.)
  mean=$(ffmpeg -hide_banner -nostats -i "$tmp/$rom.mp3" -af volumedetect -f null - 2>&1 \
         | sed -n 's/.*mean_volume: *\(-*[0-9.]*\) dB.*/\1/p')
  gain=$(python3 -c "print(f'{$TARGET_RMS - ($mean):.2f}')")

  # Limiter catches the transient so the gain can't clip.
  ffmpeg -y -hide_banner -loglevel error -i "$tmp/$rom.mp3" \
    -af "volume=${gain}dB,alimiter=limit=0.89:level=disabled,aresample=44100" \
    -ac 1 -b:a 96k "$OUT/hira_$rom.mp3"

  printf '%-5s %s  %+6sdB\n' "$rom" "$glyph" "$gain"
done

echo "wrote $(ls "$OUT"/hira_*.mp3 | wc -l | tr -d ' ') files to $OUT"
