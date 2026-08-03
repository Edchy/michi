# Hiragana audio — attribution & provenance

All 46 clips in this folder are human recordings from
**[Learn-Japanese-Adventure.com](https://www.learn-japanese-adventure.com/)**, by
Kia Leng Koh. One speaker across the whole set. Credited in-app on the Codex page
(`src/app/codex/page.tsx`).

This replaces the older mixed set, which paired five human-recorded vowels with 41
macOS `say` (Kyoko) clips. That older set and the generated-audio script are not kept
in the current tree; `src/lib/audio.ts` points to this folder.

**Permission granted, 25 July 2026.** Kia Leng Koh was asked by email and replied:

> You can use them in your application so long you give credit and link to my
> website.

The request asked about "the hiragana sounds" as a set, and the reply grants "them"
without narrowing to the vowels, so all 46 sit under the same grant. The site carries
"Copyright © 2010– by Kia Leng Koh, Learn-Japanese-Adventure.com. All Rights
Reserved." with no blanket public license, so this is a **specific, conditional grant
to Michi**, not a general licence.

**The two conditions are credit and a link back**, both met by the Credits footer on
the Codex page. They are load-bearing: removing the credit, or keeping the text while
dropping the `href`, breaks the terms. Do not "tidy" that footer away.

The request described Michi as "just a personal project and will likely remain that
way", and the permission was given against that description. **If Michi is ever
published commercially, ask again** rather than assuming this carries over.

The full exchange is archived in [`PERMISSION.md`](./PERMISSION.md).

## Processing

The source clips carry up to 0.6 s of silence before the voice, which reads as broken
latency when the glyph is tapped, and their levels drift by ~13 dB across the set, so
quiet kana (ん, く) sound faint next to loud ones (か, ま). Both are fixed here.

Each clip is, in one pass from the untrimmed originals:

1. **Head trimmed** to its speech (`silenceremove`, −50 dBFS peak threshold).
2. **Tail trimmed** the same way, leaving 30 ms of room.
3. **Loudness-normalized** to `I=-18 LUFS, TP=-1.5 dB, LRA=11`.
4. **Padded 15 ms** at the head so no onset is clipped by the trim.
5. **Faded out over 40 ms** at the true end of the clip.

Result across all 46: lead-in a uniform 15 ms (a few soft-onset kana — h/m/r/y —
measure 37–64 ms because the attack itself ramps in under the threshold), RMS spread
narrowed from ~13 dB to ~6 dB (−19.8 to −25.6), every peak under −2.4 dBFS.

Voiced span was compared before and after for every file; none lost speech. The
largest duration drop is ろ (1.52 s → 0.83 s), which was 0.57 s of leading and 0.16 s
of trailing silence — its 0.79 s of voice is intact.

### Correction: the trim removed stop-consonant onsets

The claim above is wrong for stop consonants. A k or t is produced by closing the vocal
tract and releasing it, so the recording legitimately begins with a near-silent closure
before the burst. The −50 dBFS threshold in step 1 sat above that closure, so the trim
cut into the consonant itself and the 15 ms pad in step 4 did not restore it. The result
was files that begin partway into the vowel.

Found by ear on the K-row station: き く け こ played as い う え お. か survived because
its burst is loud enough that more of the onset stayed above the threshold.

- **Repaired (1 August 2026):** か き く け こ, from newly supplied recordings. Trimmed
  with a −38 dBFS threshold and 40 ms of pre-roll so the closure and burst are kept,
  then peak-normalized to −3 dBFS to sit with the rest of the set.
- **Still affected:** た and て, which belong to the not-yet-built T row. They need the
  same replacement. `src/content/kana-audio.test.ts` lists them explicitly and checks
  every other stop-consonant clip, so this defect cannot return unnoticed.

The processed clips are committed here, but the downloaded untrimmed source files are
not kept in the repository. The following command records the processing recipe; it
requires separately restoring those source files into `../5-vowels/` and `../rows/`:

```sh
TRIM="silenceremove=start_periods=1:start_threshold=-50dB:start_silence=0:detection=peak,\
areverse,silenceremove=start_periods=1:start_threshold=-50dB:start_silence=0.03:detection=peak,areverse,\
loudnorm=I=-18:TP=-1.5:LRA=11"

for f in ../5-vowels/kanasound-*.mp3 ../rows/kanasound-*.mp3; do
  b=$(basename "$f" .mp3); id="hira_${b#kanasound-}"
  ffmpeg -v error -y -i "$f" -af "$TRIM" -ar 44100 -ac 1 "/tmp/$id.wav"
  d=$(ffprobe -v error -show_entries format=duration -of csv=p=0 "/tmp/$id.wav")
  st=$(python3 -c "print(max(0,$d-0.04))")
  ffmpeg -v error -y -i "/tmp/$id.wav" \
    -af "afade=t=out:st=$st:d=0.04:curve=tri,adelay=15" \
    -ar 44100 -ac 1 -b:a 128k "$id.mp3"
done
```

> Anchor the fade at `duration - 0.04`, not at `st=0`. Fading from zero attenuates the
> whole clip; it silently drops peaks to around −53 dBFS and the files still play.

### Then: Opus, because mp3 cannot start at zero

mp3 pads its first frame, so every clip above still sits behind ~25 ms of silence that
the decoder dutifully plays. Combined with the 15 ms head pad, that put 40 ms in front
of every tap, which reads as lag on a tap-the-glyph interaction. Re-encoding does not
help: the padding is structural, and `start_time` stays 0.025 whatever you do.

Opus carries exact priming metadata, so `start_time` is 0 and the voice begins on the
first sample. The `.webm` files are the shipped set; the `.mp3`s stay as the fallback
for Safari older than 15 (`src/lib/audio.ts` picks per browser via `canPlayType`).
Both formats must exist for every id — the tests assert each separately.

```sh
for f in *.mp3; do
  ffmpeg -v error -y -i "$f" -af "atrim=start=0.015,asetpts=PTS-STARTPTS" \
    -c:a libopus -b:a 64k -vbr on -application audio "${f%.mp3}.webm"
done
```

`atrim=start=0.015` removes the 15 ms head pad added above; keeping it would just move
the delay into the new format. Use `-application audio`, not `voip` — voip is tuned for
intelligibility at low bitrate and colors the timbre. Checked against the mp3 sources by
waveform correlation: 0.97–0.99, transparent for speech. The set is 552 KB vs 1.1 MB.

## If Michi stops being free

The grant assumes non-commercial use. If that changes, re-ask Kia Leng Koh, or
replace the files from a source with explicit commercial rights — Google Cloud TTS (1M
chars/month free; the whole gojūon is ~50 characters) or a native voice actor
(see [docs/design/audio.md](../../../docs/design/audio.md)).

Because every file is keyed to the `id` in `src/content/hiragana.ts`, swapping the
source is a file-replacement operation. No code changes — `src/lib/audio.ts` is
deliberately agnostic about where the mp3s came from.
