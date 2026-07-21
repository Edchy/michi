# Voiceover Options for the Japanese Learning App

## The Core Problem

Japanese has pitch accent — words change meaning based on whether the pitch rises or falls on a syllable. 橋 (hashi = bridge) and 箸 (hashi = chopsticks) are written identically in hiragana but pronounced differently. A beginner learning from incorrect audio will internalize wrong patterns that are very hard to unlearn later. This makes audio quality more critical for Japanese than for most other languages.

Every option below is evaluated against that standard.

---

## Recommendation Summary

| Use case | Best option |
|---|---|
| MVP / getting started | ElevenLabs (narration) + Google Neural2 (drilling) |
| Production app | Native voice actor recording + Google Neural2 for generated sentences |
| Long-term / scalable | Hybrid: native recordings for core content, API for dynamic content |

---

## Option 1: ElevenLabs

**Best for**: Narrative moments, cultural intros, story narration, UI moments where expressiveness matters.

**Not ideal for**: Vocabulary drilling, character audio, phonetic precision work.

### Pricing (2026)

| Plan | Monthly cost | Characters/credits | Commercial rights |
|---|---|---|---|
| Free | $0 | 10,000 credits (~10 min) | No — must attribute ElevenLabs |
| Starter | $5 | 30,000 credits (~30 min) | Yes |
| Creator | $22 | 121,000 credits | Yes + voice cloning |
| Pro | $99 | 500,000 characters | Yes |
| Scale | $330 | 2,000,000 characters | Yes |

Annual billing saves ~17% across all paid plans.

### Pros
- Easiest API to integrate — excellent developer documentation
- Most expressive and human-sounding for narration
- Large selection of Japanese voices (male, female, various tones)
- Good for anime/dramatic content which fits the app's audience
- Fast to prototype with

### Cons
- Japanese pitch accent can be inconsistent
- Not designed specifically for language learning accuracy
- Free tier has no commercial rights — cannot ship a product on it
- Gets expensive at scale if used for all audio
- Credits system is slightly opaque (varies by model used)

---

## Option 2: Google Cloud TTS — Neural2

**Best for**: Vocabulary drilling, character audio, any audio where phonetic accuracy matters most.

### Pricing (2026)

| Tier | Cost per 1M characters | Free tier |
|---|---|---|
| Standard / WaveNet | $4 | 1M chars/month |
| Neural2 | $16 | 1M chars/month |
| Chirp 3 HD | $30 | — |
| Studio | $160 | — |

Neural2 is the sweet spot. The free tier (1M chars/month) is genuinely generous for a learning app at early scale.

### Scale estimate
1 million characters = roughly 500,000–700,000 short words or syllables. For a learner going through 20-30 new items per day, you're well within the free tier for a long time.

### Pros
- Most consistent Japanese pronunciation of all API options
- Handles pitch accent more reliably than competitors
- Generous free tier — likely free for a long time at early user scale
- Pay-as-you-go, no subscription required
- Widely used in production language apps
- SSML support (can control speed, pauses, emphasis — useful for learner audio)

### Cons
- Less expressive than ElevenLabs — sounds more "robotic" for narration
- Requires a Google Cloud account and some setup
- Not the best choice for story narration or cultural context moments
- Neural2 Japanese voice selection is smaller than ElevenLabs

---

## Option 3: OpenAI TTS

**Best for**: Realtime conversational features, if the app ever adds speaking practice.

### Pricing (2026)

| Model | Cost |
|---|---|
| TTS-1 (Standard) | $15 per 1M characters |
| TTS-1 HD | $30 per 1M characters |
| GPT-4o-mini-TTS | ~$0.015 per minute of audio |

No subscription — pure pay-as-you-go.

### Pros
- Currently ranked #1 for realtime TTS quality
- No credits or tiers — clean pricing
- Excellent if you later add conversational practice features
- Good Japanese quality, competitive with Google Neural2
- GPT-4o-mini-TTS supports natural-language steering (adjust speed, tone)

### Cons
- Slightly more expensive than Google Neural2 for the same quality level
- Less proven specifically for language learning apps
- Realtime features add latency complexity to the app
- Not as fine-grained SSML control as Google

---

## Option 4: Azure TTS (Neural)

**Best for**: Teams already in the Microsoft ecosystem, or apps needing very high volume at commitment pricing.

### Pricing (2026)

| Tier | Cost per 1M characters |
|---|---|
| Neural | $16 |
| Neural HD | $22 |
| Custom Neural | $24–$48 |
| Free tier | 500K characters/month |
| Commitment tier | As low as $7.50/1M |

### Pros
- Competitive pricing, especially at volume (commitment tiers)
- Good Japanese voice quality, 46+ Japanese voices available
- SSML support for fine-grained pronunciation control
- Free tier is decent (500K chars/month)

### Cons
- More complex setup than Google or OpenAI
- Smaller developer community for troubleshooting
- Not meaningfully better than Google Neural2 for this use case
- Best value only at high volume commitment tiers

---

## Option 5: Native Japanese Voice Actor (Recording Session)

**Best for**: Core hiragana set, core vocabulary, anything the learner will hear hundreds of times.

This is the gold standard and what serious language apps (Pimsleur, early Rosetta Stone) have always done. A human professional gets pitch accent right every time, brings natural rhythm and warmth, and produces audio the learner won't get fatigued by.

### Cost estimate

| Type | Rate |
|---|---|
| Freelance Japanese voice actor (remote) | ~$20–$65/hour |
| Professional studio session (Japan-based) | ~$300–$800/hour |
| Specialized dubbing/eLearning talent | ~$500–$1,500/hour |

For this app's core needs: the entire hiragana set (46 characters, each said 3-4 ways) + ~500 core vocabulary words is realistically a 3-5 hour session with a freelance voice actor. Budget roughly $200–$400 for that. A one-time cost.

Platforms to find talent: [Japan Voice Talent](https://www.japanvoicetalent.com), Voices.com, Voice123, or directly via Twitter/X where many Japanese voice actors advertise freelance work.

### Pros
- Unmatched quality — pitch accent is always correct
- Warm, human audio that doesn't cause listener fatigue
- No per-character cost ever again for recorded content
- One-time investment that pays off over the app's lifetime
- Allows the learner to form a connection to a consistent voice

### Cons
- Upfront cost and coordination effort
- Not scalable for dynamic/generated sentences
- Requires re-recording if you want to change something
- Can't cover every possible sentence the app might generate

---

## The Recommended Hybrid Approach

Don't pick just one. Use each option for what it's best at:

**Native voice actor** → all 46 hiragana characters, all katakana, core vocabulary (~500 words). These are heard hundreds of times each. Quality here matters most.

**Google Cloud TTS Neural2** → dynamically generated sentences, grammar examples, anything that can't be pre-recorded because it varies. Use SSML to set a slightly slower speed for beginner audio.

**ElevenLabs** → intro narration, "did you know" cultural moments, story narration once stories begin. Use a consistent character voice to give the app personality.

This hybrid approach gives you native-quality for everything critical, flexibility for dynamic content, and personality for narrative moments — at a cost that stays near zero until you have real users.

---

## Sources

- [Google Cloud TTS Pricing](https://cloud.google.com/text-to-speech/pricing)
- [ElevenLabs Pricing 2026](https://costbench.com/software/ai-voice-tools/elevenlabs/)
- [OpenAI TTS Pricing](https://developers.openai.com/api/docs/pricing)
- [Azure TTS Pricing 2026](https://texttolab.com/blog/azure-text-to-speech-pricing)
- [Best TTS API for Language Learning 2026](https://inworld.ai/resources/best-voice-ai-for-language-learning-apps)
- [TTS APIs Compared for Language Apps](https://dev.to/pocket_linguist/text-to-speech-in-2026-comparing-5-tts-apis-for-language-apps-606)
- [Japan Voice Talent Pricing](https://www.japanvoicetalent.com/pricing)
