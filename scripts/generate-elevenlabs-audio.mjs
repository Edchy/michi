import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const voiceId = "EGPLqH9Wz2tNLu58EJVR";
const samples = [
  ["tsunami", "つなみ"],
  ["karaoke", "カラオケ"],
  ["watashi", "わたし"],
  ["camera", "カメラ"],
  ["yama", "やま"],
  ["michi", "みち"],
  ["eki-station", "えき"],
  ["this-is-michi", "これは、みちです。"],
  ["next-station", "つぎの駅で降ります。"],
];

const env = await readFile(".env.local", "utf8");
const keyLine = env
  .split(/\r?\n/)
  .find((line) => line.startsWith("ELEVENLABS_API_KEY="));
const apiKey = keyLine?.slice("ELEVENLABS_API_KEY=".length).trim();

if (!apiKey) {
  throw new Error("ELEVENLABS_API_KEY is missing from .env.local");
}

const outputDirectory = path.join("public", "audio", "words");
await mkdir(outputDirectory, { recursive: true });
const requestedSamples = new Set(process.argv.slice(2));

for (const [filename, text] of samples) {
  if (requestedSamples.size > 0 && !requestedSamples.has(filename)) continue;
  const response = await fetch(
    `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}?output_format=mp3_44100_128`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "xi-api-key": apiKey,
      },
      body: JSON.stringify({
        text,
        model_id: "eleven_multilingual_v2",
        language_code: "ja",
        voice_settings: {
          stability: 0.65,
          similarity_boost: 0.75,
          style: 0,
          use_speaker_boost: true,
        },
      }),
    },
  );

  if (!response.ok) {
    const details = await response.text();
    throw new Error(`${filename}: ElevenLabs returned ${response.status}: ${details}`);
  }

  const outputPath = path.join(outputDirectory, `${filename}.mp3`);
  await writeFile(outputPath, Buffer.from(await response.arrayBuffer()));
  console.log(`${text} -> ${outputPath}`);
}
