# Michi Plan

This is the active project-control document. It should stay short enough to read in a
few minutes.

## How we will work

We will not design the entire course in advance again. We will make one layer clear,
prove it with the existing stations, and continue only after reviewing it together.

For every phase:

1. Explain the problem in plain language.
2. Agree on the intended learner outcome.
3. Make the smallest useful change.
4. Test it in code and in the learner flow.
5. Stop for review before expanding the scope.

## Current position

- Branch: `learning-system-foundation`
- Safe pre-reset baseline: `936f287`
- Current focus: rebuild the project definition from the working product outward.
- Not in scope yet: adding more kana rows, tracks, or provinces.

## Shared terminology

- **Learning item:** one piece of Japanese content, such as the kana `あ`, the word
  `こい`, a kanji, or a grammar pattern.
- **Capability:** one thing the learner can do with an item. For `あ`, this might be
  hearing its sound and identifying the symbol, seeing the symbol and recalling its
  sound, speaking it, writing it, or reading it in context.
- **Review target:** one item-capability pair whose memory is tracked and scheduled.
  For example, `あ / symbol-to-sound` can be strong while `あ / writing` has not yet
  been introduced.
- **Due:** the review target's scheduled review time has arrived. “Due tomorrow” means
  it is ready to review from tomorrow onward, not that the learner must return on that
  exact day.

## How personalized review works in a static application

Michi can be deployed as static HTML, CSS, JavaScript, content, and audio files. React
and JavaScript still run dynamically in the learner's browser. The learner's answers,
completion state, and review schedules are stored locally on their device, so the core
experience does not require a server or account.

The review system has three responsibilities:

1. **Local storage** remembers the learner's introduced items, attempt evidence,
   completion state, and review records.
2. **The SRS engine** calculates when a review target should return and whether it is
   currently due.
3. **The session planner** selects a bounded set of due targets and places them in a
   future station, recovery session, or review-only session.

The existing code contains the pure SRS calculation engine. Persistent learner storage,
answer integration, and session planning are not implemented yet.

The authored curriculum decides what is introduced, its prerequisites, how it is
taught, and where deliberate consolidation or application belongs. The SRS decides
when an individual review target should return. The session planner joins the two
without allowing review to make a session endless.

## Phase 1: regain a shared product definition

Goal: agree on the small set of ideas that every future station must support.

We will answer these questions one at a time:

- [x] What should a learner be able to do after completing a station?
- [x] What is the difference between visiting, completing, learning, and mastering?
- [x] What kinds of practice build a new memory?
- [x] What evidence tells us that the learner can recall something?
- [x] How should earlier knowledge return inside later stations?
- [x] What should spaced repetition control, and what should authored curriculum
  control?
- [x] When should speaking and writing enter the learning flow?
- [x] What makes a session feel complete without pretending its knowledge is permanent?

Output: a short, approved learning blueprint written in this file.

### Approved rule 1: station completion

Completing a station means the learner understood the new idea and successfully
recalled or used it during that session.

Completion does not mean the knowledge is permanently mastered. It means the learner
has enough initial understanding to continue, while later review determines whether
the knowledge becomes durable.

Michi distinguishes three stages:

1. **Introduced:** the learner received the teaching.
2. **Station complete:** the learner demonstrated initial recall or use during the
   session.
3. **Mastered:** the learner recalled the knowledge successfully across multiple
   reviews over time.

A completed station may unlock the next station. Its individual learning items still
return through review.

### Approved rule 2: completion evidence

An acquisition station ends with a mixed checkpoint covering every newly introduced
item once, in a shuffled order.

- The learner must recall every new item correctly without its answer being shown.
- A mistake is treated as teaching: Michi shows or replays the correct answer.
- The missed item returns after other items rather than being repeated immediately.
- Correct work on other items remains complete; one mistake does not reset the whole
  checkpoint.
- The station completes when every new item has been recalled correctly in the final
  checkpoint.
- Earlier mistakes remain useful evidence for deciding when an item should return in
  later review.

This tests the whole set close together without turning completion into a brittle
perfect-score streak.

### Approved rule 3: course progress and memory are separate

- **Visited:** the learner opened a station. This says nothing about learning.
- **Completed:** the learner passed the station's final checkpoint. The station stays
  complete permanently.
- **Learning:** an introduced capability is still new, uncertain, or returning
  frequently in review.
- **Mastered:** the capability has been recalled successfully across multiple sessions
  with meaningful time between them.

The map records course progress. Individual learning records describe what the learner
can probably recall now. Forgetting does not move the learner backward on the map.

### Approved rule 4: earlier knowledge returns naturally

Due knowledge normally appears in a short review section at the beginning of a future
station. A review-only session is also available when the learner wants to practise
without beginning new content.

After a longer absence, Michi offers a bounded recovery session instead of dumping the
entire backlog on the learner. It prioritizes prerequisites for the next station, weak
and overdue knowledge, and easily confused items. Unrelated weakness does not block
progress.

Learner progress and review schedules can be stored locally on the device. Michi can
therefore remain statically deployed and offline-capable; cross-device synchronization
can be considered separately later.

### Approved rule 5: practice does not impersonate spaced recall

Each item and capability has a next review time. The due queue is calculated from those
records rather than maintained as a permanent list.

Repeating a station immediately is useful practice, but it does not cancel a future
scheduled review or prove long-term memory. A successful recall after the item becomes
due advances its schedule and removes it from the current due queue until its next
review time.

### Approved rule 6: stations share one runner

Stations are authored as structured content and rendered by one reusable station
runner. Individual stations are not separate bespoke page systems.

The shared station sequence is:

1. Prepare prerequisites.
2. Review due earlier knowledge.
3. Orient the learner around one outcome.
4. Teach the new material correctly.
5. Connect it through guided, open-book practice.
6. Recall it with the answer removed.
7. Use it in meaningful context.
8. Complete the final mixed checkpoint.
9. Close, save evidence, and schedule future review.

Station types may omit phases that do not apply. For example, an orientation station
may introduce no reviewable items, while a consolidation station introduces no new
knowledge.

### Approved rule 7: practice has different evidence strength

Different exercises support different claims:

1. **Guided exposure** builds the connection while the answer or help remains
   available. It does not prove recall.
2. **Supported recognition** asks the learner to choose from a small set. It shows
   growing familiarity but remains guessable.
3. **Full-set discrimination** asks the learner to distinguish every new item from the
   rest of that station's new set, normally about five items.
4. **Unaided production** asks the learner to speak, write, or construct an answer
   without choices. It counts as verified evidence only when Michi can judge the
   response reliably.
5. **Real use** applies the knowledge in a word, sentence, listening task, or other
   meaningful context.

For the current kana acquisition stations, the final checkpoint tests every new kana
in both automatically verifiable directions:

- Hear the sound and select its symbol from the complete new set.
- See the symbol and select its sound from the complete new set.

Mistakes are retaught and requeued according to rule 2. Passing this checkpoint is
strong enough for initial station completion, but not for a claim of production,
long-term retention, or mastery.

Speaking rehearsal remains valuable practice but does not affect completion while it
is self-confirmed. Writing can provide stronger verified evidence once reliable stroke
checking exists. Later reviews may mix in older, easily confused items rather than
continually expanding the choice set.

### Approved rule 8: speaking begins as honest rehearsal

Speaking enters the learning flow in three forms:

1. During teaching, the learner hears a native recording and imitates it while the
   model is fresh.
2. After the sound-symbol connection is established, the learner sees the symbol,
   attempts the sound before hearing it, and then plays the recording to compare.
3. Once words become readable, the learner reads them aloud before hearing the native
   recording.

Michi does not ask the learner to grade themselves with “got it” or “forgot.” Without
reliable evaluation, speaking does not affect station completion, advance an SRS
schedule, or count toward mastery. It remains a required learning opportunity while
Michi stays honest that participation and pronunciation are not verified.

Reliable speech evaluation may be added in the future. If it becomes accurate enough
for beginner Japanese pronunciation, speaking can become its own scheduled capability
with explicit evidence rules. The current learning system must not depend on that
future feature.

### Approved rule 9: writing grows from guided motion to blank recall

Writing begins only after the learner has connected a kana's sound and symbol.

1. On the first writing encounter, the learner traces the correct strokes over a faint
   guide at roughly 20% opacity. Michi presents the strokes in the correct order and
   guides generously rather than assigning a correctness grade.
2. On a later writing review, the learner starts with an empty surface and draws the
   kana from memory. Michi then overlays the correct form for comparison and offers a
   clean retry without asking the learner to grade themselves.
3. Automated structural evaluation is a later layer. It may compare stroke count,
   order, direction, path proximity, and coverage against normalized reference paths.
   It must tolerate wobble and reasonable variation in size, placement, and proportion.

Tracing and ungraded blank recall do not affect station completion or mastery.
`Writing` becomes its own scheduled capability only after evaluation is reliable
enough to avoid teaching through false rejection. Thresholds must be tested with real
learner drawings rather than chosen only from synthetic examples.

The writing surface is a quiet, responsive tool:

- The drawing area scales to the available phone, tablet, or desktop space while using
  normalized coordinates so the same reference data works everywhere.
- Ink follows the pointer in the same frame with no perceptible lag and supports touch,
  mouse, and stylus input.
- The learner draws with a substantial ink stroke rather than a thin digital line.
- A restrained change in width or taper may respond to real pointer pressure, with a
  consistent fallback when pressure is unavailable.
- The physical feeling should suggest Japanese brush writing through stroke weight,
  taper, and rhythm, not through decorative paper texture or ornamental chrome.
- Clear and retry actions remain immediately available, and the surface never becomes
  a completion barrier before its judgement is trustworthy.

### Approved rule 10: review is bounded and prerequisites guide recovery

Michi supports three session modes:

1. A **normal station** begins with roughly five minutes or 5–10 prompts of prioritized
   review, then continues into new content and its final checkpoint. The review favors
   prerequisites, then weak and overdue targets. It ends when its budget is reached,
   even if other knowledge remains due.
2. A **recovery session** is recommended when important prerequisites cannot be
   refreshed in the opening review or a returning learner has a meaningful overdue
   backlog. It lasts roughly 10–15 minutes, prioritizes prerequisite and weak knowledge,
   and ends without requiring the complete backlog to disappear.
3. An optional **review-only session** lets the learner work through a bounded selection
   of due knowledge without beginning new content.

A long absence does not automatically prove forgetting. Stored history selects likely
review needs, while the learner's actual opening responses reveal whether recovery is
necessary. Unrelated overdue knowledge does not block a new station.

Every mode has a truthful end:

- A normal station completes after its bounded review and final station checkpoint.
- A recovery session completes when its fixed review budget is finished.
- A review-only session completes when its selected queue has been attempted.

Anything still due is scheduled forward rather than becoming an endless obligation.
Recovery language remains calm and practical, never punitive.

## Phase 2: describe stations consistently

Goal: represent the existing stations through one understandable content structure.

- [x] Define a small station specification in ordinary language first.
- [x] Translate the vowels station into it without changing the experience.
- [x] Translate the K-row station into it.
- [x] Translate the consolidation station into it.
- [x] Confirm that orientation, teaching, and consolidation can differ without needing
  unrelated custom page systems.
- [x] Add validation that catches missing prerequisites, unintroduced material, and
  unclear completion conditions.

Output: the existing stations behave as they do now, but their teaching structure is
clear and reusable.

### Approved station specification

Every station declares seven sections:

1. **Identity:** id, station type, and title.
2. **Outcome:** the one capability the station intends to establish or strengthen.
3. **Prerequisites:** capabilities that must be usable before the station makes sense.
4. **Introduced capabilities:** the new review targets created by the station.
5. **Learning sequence:** the ordered authored teaching and practice steps.
6. **Application:** meaningful use in a word, sentence, listening task, or other context
   when enough material is available.
7. **Completion contract:** checkpoint coverage, mistake recovery, completion message,
   and the handoff to what comes next.

The station does not own React components, map coordinates, learner answers, SRS dates,
or a manually authored list of due review. Those belong to the shared runner, course
map, learner-state store, SRS engine, and session planner.

The approved station types are orientation, acquisition, consolidation, application,
and assessment. The shared runner may omit phases that do not apply to a particular
type.

The first proof below translates the current vowel station without changing its learner
experience.

### Vowel station specification

This specification describes Station 2 through the approved seven-part structure. It
does not change application code. Differences between the current implementation and
the approved contract are listed separately below.

#### 1. Identity

- ID: `vowels`.
- Type: acquisition.
- Title: First sounds.

#### 2. Outcome

Connect the five Japanese vowel sounds to `あいうえお` in both directions during the
session.

#### 3. Prerequisites

- Course order: the three-script orientation station has been completed.
- Learning capabilities: none. The station begins the reviewable curriculum.

#### 4. Introduced capabilities

Items: `hira_a`, `hira_i`, `hira_u`, `hira_e`, and `hira_o`.

For each item, the station introduces:

- Sound-to-symbol discrimination.
- Symbol-to-sound discrimination.

Speaking imitation and symbol-to-sound speaking rehearsal are included but unverified,
so they do not create scheduled speaking targets yet.

#### 5. Learning sequence

1. Orient: Japanese has five stable vowel sounds.
2. Model: hear and imitate each vowel in `あいうえお` order.
3. Reveal: see the five sounds as one symbol family.
4. Connect: complete open-book sound-symbol matching with the full set visible.
5. Context: learn that `あいうえお` is the ordering used by the Japanese sound system.
6. Practise symbol-to-sound with choices that grow from two to the full five.
7. Practise sound-to-symbol with choices that grow from two to the full five.
8. Check both directions in a final mixed full-set checkpoint.
9. Rehearse speaking: see each symbol, attempt its sound, then play the native recording
   for comparison. This remains ungraded.
10. Place the vowel row into the gojūon grid.

Guided tracing is an approved future addition after the sound-symbol connection is
stable, but it is not part of the current implemented learner experience.

#### 6. Application

No real-word application is required in this station because the five vowels alone do
not yet provide a suitable first decoding moment. The gojūon grid applies them as the
organizing foundation of the wider hiragana system. The first real word arrives in the
K-row station.

#### 7. Completion contract

- Test every vowel once in sound-to-symbol using all five symbols.
- Test every vowel once in symbol-to-sound using all five sounds.
- Shuffle item order and option placement.
- On a mistake, show or replay the correct answer and requeue only that target after
  other questions.
- Preserve correct work on other targets.
- Complete when all ten item-capability targets have been answered correctly in the
  final checkpoint.

Truthful completion message:

> You connected the five Japanese vowel sounds to `あいうえお` in both directions. The
> first 5 of 46 basic hiragana are now introduced.

Handoff: the K row combines these same five vowel sounds with `k` and ends with the
learner's first decoded Japanese word.

### Vowel station implementation gaps

These are documented gaps, not changes made during the specification step:

1. The current mixed capstone randomly chooses direction and completes through a
   general difficulty ladder. It does not guarantee that every vowel is checked in
   both directions.
2. The current completion message says the learner can “hear, say, and recognize” all
   five sounds. Speaking is rehearsed but unverified, so this overstates the evidence.
3. Completion currently unlocks the next map position but does not create persistent
   item-capability review records.
4. Guided tracing is not implemented and remains outside completion evidence.

The K-row translation below applies the same seven sections and checks whether the
second acquisition station introduces any new structural requirement.

### K-row station specification

This specification describes Station 3 through the same seven sections. It adds no
K-row-specific field to the station contract.

#### 1. Identity

- ID: `k-row`.
- Type: acquisition.
- Title: The K row.

#### 2. Outcome

Connect `かきくけこ` to their five sounds in both directions and use known kana to
decode the first real Japanese word, `こい`.

#### 3. Prerequisites

The following capabilities for `あいうえお` must be usable:

- Sound-to-symbol discrimination.
- Symbol-to-sound discrimination.

The station declares these prerequisites. The future session planner decides which
vowel targets are due, whether a short review is sufficient, and whether recovery is
needed. The station does not own a permanent manual vowel-review block.

#### 4. Introduced capabilities

Items: `hira_ka`, `hira_ki`, `hira_ku`, `hira_ke`, and `hira_ko`.

For each item, the station introduces:

- Sound-to-symbol discrimination.
- Symbol-to-sound discrimination.

Speaking remains unverified rehearsal. `こい` is application of kana decoding in this
station, not automatically a vocabulary target whose meaning must be memorized. A
future station may deliberately introduce it as a word item with its own capabilities.

#### 5. Learning sequence

1. Prepare and review the vowel prerequisites through the generated session review.
2. Orient: the known five vowel sounds now appear with `k` in front.
3. Model: hear and imitate each K-row sound in gojūon order.
4. Reveal: see the five sounds as the K-row symbol family.
5. Connect: complete open-book sound-symbol matching with the full new set visible.
6. Practise symbol-to-sound with choices that grow from two to the full five.
7. Practise sound-to-symbol with choices that grow from two to the full five.
8. Check both directions in a final mixed full-set checkpoint.
9. Rehearse speaking: see each symbol, attempt its sound, then play the native recording
   for comparison. This remains ungraded.
10. Context: ten known kana are enough to decode a real Japanese word.
11. Use: decode `こい` before hearing it and revealing its meaning.
12. Place the K row beneath the vowels in the gojūon grid.

Guided tracing is an approved future addition after the sound-symbol connection is
stable, but it is not part of the current implemented learner experience.

#### 6. Application

The learner decodes `こい` using only `こ` and `い`, both already introduced. The word
proves that the kana system is becoming usable. Its meaning is revealed after the
decoding attempt, but memorizing “carp” is not required for station completion.

#### 7. Completion contract

- Test every K-row kana once in sound-to-symbol using all five new symbols.
- Test every K-row kana once in symbol-to-sound using all five new sounds.
- Shuffle item order and option placement.
- On a mistake, show or replay the correct answer and requeue only that target after
  other questions.
- Preserve correct work on other targets.
- Complete when all ten new item-capability targets have been answered correctly in the
  final checkpoint.
- `こい` remains required application in the station sequence but is not a graded
  vocabulary checkpoint.

Truthful completion message:

> You connected the five K-row sounds to `かきくけこ` in both directions and decoded
> your first Japanese word, `こい`. The first 10 of 46 basic hiragana are now
> introduced.

Handoff: the next station consolidates the vowels and K row together without adding new
kana.

### K-row station implementation gaps

1. The authored step queue still contains a vowel-review placeholder, but the live page
   now fills or removes it from the bounded session plan.
2. The K-row checkpoint now guarantees all five kana in both directions.
3. Due prerequisite review and one finite recovery pass are tracked; broader readiness
   language and recovery UI remain future work.
4. Completion does not yet create persistent K-row review targets.
5. Guided tracing is not implemented and remains outside completion evidence.

The K-row translation confirms that prerequisites and application fit the existing
seven sections. It does not require another station field. The next Phase 2 task is the
consolidation station, which tests whether a station with no introduced capabilities
also fits the contract.

### First consolidation station specification

This specification describes Station 4 through the same seven sections. Unlike the two
acquisition stations, it creates no new review targets. It deliberately brings the
vowels and K row together so the learner must distinguish across the complete known set.

#### 1. Identity

- ID: `look-back-1`.
- Type: consolidation.
- Title: A first look back.

#### 2. Outcome

Retrieve the first ten hiragana from one mixed set and use them to decode `こい` again,
without adding new material.

This is a strengthening outcome, not a claim that every existing capability has become
permanently mastered.

#### 3. Prerequisites

The following capabilities for `あいうえお` and `かきくけこ` must already have been
introduced:

- Sound-to-symbol discrimination.
- Symbol-to-sound discrimination.

The station may still be useful when some targets are fragile. The session planner uses
current learner records to decide whether a bounded due review or recovery should happen
before the authored consolidation. The consolidation sequence itself is not generated
from the due queue.

#### 4. Introduced capabilities

None. The station creates no new learning items and no new item-capability pairs.

It strengthens the existing twenty review targets by changing the retrieval context:
vowels and K-row kana now compete in one mixed pool rather than two separate families.
This distinction is the reason the station exists even when no item is currently due.

#### 5. Learning sequence

1. Prepare: explain that no new characters will be introduced and that a pause supplies
   useful information.
2. Complete any bounded generated review selected for this session, if needed.
3. Recall: work through a shuffled mixed checkpoint containing all ten known kana, with
   sound-to-symbol and symbol-to-sound prompts balanced across the set.
4. Recover mistakes: reveal or replay the correct association, then requeue only the
   missed target after intervening questions.
5. Use: decode `こい` again from its two known kana.
6. Close: see the vowel and K rows held together in the gojūon grid.

There is no teach, reveal, guided match, or speaking phase because no new association is
being established. The runner omits those phases for this station type.

#### 6. Application

The learner decodes `こい` again after recalling from the mixed ten-kana pool. This
checks that known symbols remain usable in sequence, not only as isolated multiple-choice
answers. Its meaning remains context rather than a graded vocabulary target.

Future consolidation stations should use more varied words or short sentences as the
known inventory grows. Repeating one word is appropriate only for this smallest first
set.

#### 7. Completion contract

- Present every one of the ten kana once in the initial mixed pass.
- Balance the two directions across that pass rather than requiring all twenty existing
  item-capability pairs again in one station.
- Use the full ten-kana option pool where the interface permits; distractors must come
  only from introduced material.
- Shuffle item order, direction assignment, and option placement.
- On a mistake, show or replay the correct answer and requeue only that target after
  other questions.
- Preserve correct work and finish after every initial item plus every requeued miss has
  been answered correctly.
- Require the `こい` decoding application, but do not grade its meaning as vocabulary.

The scheduled SRS records remain responsible for checking each item-capability pair in
its appropriate direction over time. This authored checkpoint proves mixed-set use today;
it does not replace future spaced review.

Truthful completion message:

> You recalled the first ten hiragana together and used them to read `こい` again. No
> new characters were added at this stop.

Handoff: the S row returns to acquisition, using the same five-vowel pattern to introduce
`さしすせそ`.

### First consolidation station implementation gaps

1. The current adaptive drill does not guarantee one initial prompt for every kana or a
   deliberately balanced direction assignment.
2. It is not preceded by generated due review or recovery based on learner records.
3. Attempts do not update persistent item-capability review records.
4. The current completion copy says the learner can recall both rows together, although
   checkpoint coverage does not yet guarantee that every kana appeared.
5. The existing `Step` union and station configuration can express the shorter sequence,
   but the consolidation station still runs through the kana-specific page rather than a
   future shared `StationRunner`.

### What the three station proofs establish

Orientation, acquisition, and consolidation need different sequences, not different page
architectures:

- Orientation uses context and examples, then closes without review targets.
- Acquisition models and connects new items, practises them, checks them, and creates
  review targets.
- Consolidation mixes and applies existing targets without teaching or seeding new ones.

The seven-section specification describes all three. A shared runner can render only the
phases declared by each station, while learner state, due review, and navigation remain
outside authored station content. No additional station field is required by the first
consolidation proof.

### Implemented station validation

`src/content/station-spec.ts` now expresses the first four approved stations as ordered,
typed definitions and validates the course before those definitions are used by the
future runner. It reports all detected problems in one pass, including:

- a prerequisite target that no earlier station introduced;
- application or checkpoint material the learner has not met;
- acquisition completion that omits an introduced target or checks an undeclared one;
- consolidation completion with no item or capability coverage;
- missing outcomes, sequences, completion evidence, messages, or mistake recovery; and
- duplicate station ids, prerequisites, or introduced targets.

Focused tests prove the current four definitions pass and each agreed failure mode is
caught. This is content validation, not runtime learner-state validation. The existing
station pages do not consume these definitions yet; connecting them belongs to the
shared-runner phase so this step does not create a second partial rendering system.

Phase 2 is complete: the station contract has three different proofs and an executable
guardrail. Phase 3 can now establish persistent learner records and one-item review
lifecycle before the runner begins relying on them.

### Province decision context

The current implemented hierarchy uses Hiragana, Katakana, First kanji, and Words and
sentences as provinces. The intended pattern is for a province to begin with a short
orientation station that introduces its overarching mental model.

The original hierarchy raised an important problem: words, sentences, listening,
speaking, and grammar should appear throughout the course rather than waiting inside a
final isolated bucket. The approved rules and initial province roster below resolve the
conceptual structure. Changing `src/app/worldmap.ts` remains later implementation work.

### Approved province rule 1: provinces mark a new mental model

A province represents a major change in the learner's mental model of Japanese or a
major new learning domain. It is not merely a bucket for accumulating content.

A province begins with a short orientation station when entering it genuinely changes
how the learner needs to understand or use Japanese. The orientation answers only:

- What is changing?
- Why are we learning it now?
- How does it connect to what the learner already knows?
- What capability will this province build?
- What is one concrete example?

The orientation must not become a long lecture. Optional history, cultural depth,
linguistic background, and broader explanation belong in book stops between stations.
Essential knowledge remains in the station path; book stops expand it without blocking
progress.

### Approved province 1: Hiragana foundations

Province 1 is a functional Hiragana foundation. Its ending promise is:

> The learner can use hiragana to decode beginner Japanese words and simple sentences.

The province includes the basic 46 hiragana, essential changed and combined sounds,
small-character behavior such as small `っ`, real words throughout, and simple
sentences before completion. Speaking and writing rehearsal grow alongside reading
according to the approved evidence rules.

Completing the basic 46 remains an important milestone inside the province, but it is
not the province boundary. The province ends when hiragana has become usable rather
than when the character table has merely been covered.

The opening station combines the whole course's brief three-script orientation with
the Hiragana province orientation: what the scripts are and why learning begins with
hiragana. Deeper script history belongs in the following book stop.

### Approved province 2: Katakana in use

Province 2 introduces a second script for mostly familiar sounds and a new reason for
choosing one script rather than another. Its ending promise is:

> The learner can use katakana to read common borrowed words, names, sound words, and
> beginner Japanese text where hiragana and katakana appear together.

The province transfers existing sound knowledge instead of reteaching the Japanese
sound system from zero. It includes the core katakana forms, essential changed and
combined sounds, the long-vowel mark `ー`, appropriate common foreign-sound
combinations, real borrowed words from the beginning, and mixed hiragana-katakana
reading. Hiragana continues to return through review.

The short orientation demonstrates one concrete script contrast and explains the new
job katakana performs. Katakana's history and broader cultural background belong in
book stops between stations.

### Approved province 3: Kanji foundations

Province 3 introduces the mental model that kanji contributes meaning and that its
pronunciation depends on the word in which it appears. Its ending promise is:

> The learner understands how kanji functions inside Japanese and can read useful
> beginner words and simple mixed-script sentences containing their first kanji.

Kanji is taught inside useful words rather than as isolated English keyword cards. The
learning system tracks specific capabilities, such as reading a known word or
recognizing meaning in context, and does not pretend that one kanji has one permanent
pronunciation. Visual components are introduced when they help distinguish and remember
forms. Writing remains selective and progressive rather than becoming a copying burden.

The short orientation uses one concrete shift from kana spelling to a meaning-bearing
form. Detailed reading terminology, classification, and history belong in later
stations or book stops. Hiragana, katakana, grammar, listening, words, and sentences
remain active throughout the province.

No arbitrary kanji count is approved. The curriculum will choose the smallest useful
set that supports the functional outcome. Province 2 remains comparatively compact so
Kanji foundations is not delayed excessively.

### Approved province 4: Sentence foundations

Province 4 makes understanding and constructing sentences the dominant new learning
domain. Its ending promise is:

> The learner can understand and build simple Japanese sentences using familiar words
> and scripts.

Words and sentences do not begin here; they are threaded through all earlier provinces.
The new mental model is that Japanese sentences organize relationships through
particles and often present information in a different order from English.

The province expands useful vocabulary, listening comprehension, mixed-script reading,
speaking rehearsal, concrete grammar patterns, short exchanges, and mini-stories. Its
orientation uses one familiar sentence to show how the pieces work. Detailed grammar
terminology and broader explanation remain in later stations or book stops.

### Approved initial province roster

1. Hiragana foundations.
2. Katakana in use.
3. Kanji foundations.
4. Sentence foundations.

This is the complete roster for the current planning horizon. More provinces will be
added later only when the curriculum reaches another major mental-model change or
learning domain. We will not design them prematurely.

## Phase 3: make review real

Goal: connect previous learning to future sessions instead of relying only on manually
placed review stations.

- [x] Store which learning items have been introduced.
- [x] Store evidence from learner attempts.
- [x] Connect the existing spaced-repetition engine to persistent learner state.
- [x] Begin stations with a short, bounded review of relevant due knowledge.
- [x] Revisit misses later without creating an endless session.
- [x] Keep authored consolidation stations for cumulative use and transfer.

Output: knowledge returns according to learner need, while every station remains
completable.

### Smallest persistent-review proof

The persistent lifecycle began with one review target in `src/lib/learner-state.ts`, such
as `hira_a:sound-to-symbol`:

```text
introduce target
→ create due-now schedule
→ record checkpoint or review evidence
→ update the existing SRS engine
→ save one versioned learner-state document
→ reload with Date values restored
→ derive whether the target is due
```

The record stores the item-capability pair, introduction time, compact evidence totals,
the latest attempt and its source, and the SRS schedule. Guided practice does not belong
in this evidence. An honest checkpoint or scheduled review may update the schedule;
immediate recovery is recorded but cannot advance it. Repeating an introduction is
idempotent, so revisiting a station cannot erase a mature schedule. Malformed local data
falls back safely instead of breaking the course.

Focused tests prove success, failure/relearn, reload, idempotency, and the requirement
that a target be introduced before evidence is accepted.

The vowel station now guarantees its actual completion contract. Its final checkpoint
creates all ten vowel item-capability records, shuffles one initial question for every
vowel in both directions, uses the full five-option pool, and requeues only misses. A
correct initial answer schedules future review. A missed target schedules a short
relearn; its immediate in-session retry is stored as recovery evidence but cannot cancel
that scheduled review. Earlier supported practice still writes nothing.

The K-row final block uses the same guaranteed checkpoint mechanism but is not connected
to persistence yet. The consolidation block remains a separate role with its shorter
authored behavior.

### Implemented bounded session planning

`src/learning/session-planner.ts` now turns persistent due records and a station's
declared prerequisites into a bounded opening plan:

```text
all due review records
→ keep only this station's prerequisites
→ prioritize lapsed targets, then oldest due
→ select at most 5 targets
→ report overflow and unrelated due work without blocking the station
```

The default opening limit is five prompts. A separate recovery plan is created only from
targets actually missed in that opening review. It deduplicates them, selects at most ten
for one finite pass, and leaves any overflow scheduled for later rather than extending
the session indefinitely.

This planner does not declare recovery merely because a backlog is large; the learner's
opening answers supply that evidence. It also cannot move unrelated overdue material
into a station just because it exists. Focused tests cover relevance, future schedules,
long-gap overflow, priority, deduplication, and bounded recovery.

The K-row station now consumes this plan. Its authored review steps act only as insertion
points: when no prerequisite target is due, both are removed; otherwise they render the
selected exact item-capability prompts. Each initial answer updates its spaced schedule.
Actual misses receive one recovery pass, whose answers are recorded without advancing the
SRS clock, and then the station continues even if recovery was unsuccessful.

For compatibility, a learner who reached the K row before review-state existed has the
declared vowel prerequisites seeded as due rather than silently skipping review. This is
a course-order migration bridge, not evidence that those targets were remembered.

Phase 3 is complete for the first end-to-end proof: vowel checkpoint evidence now returns
as bounded, need-based review in the K-row station. Later acquisition stations can reuse
the same seam while the next phase separates course travel from current capability in the
learner-facing progress model.

## Phase 4: make progress honest

Goal: show travel and present capability as related but different things.

- [x] Keep map position as course progression.
- [x] Track introduced knowledge separately.
- [x] Define what counts as demonstrated recall.
- [x] Avoid calling easy recognition permanent mastery.
- [x] Let current capability weaken when knowledge becomes overdue.
- [x] Explain recovery calmly and without guilt.

Output: progress language describes something the learner can actually do.

### Implemented capability projection

`src/learning/capability-progress.ts` now derives present capability from review evidence
without changing or reading map position. The state is never stored as a second truth:

- **Not introduced:** no item-capability record exists.
- **Learning:** introduced, but fewer than two successful spaced retrievals are present,
  or a later miss reset the schedule.
- **Mastered:** at least two consecutive successful retrievals across scheduled sessions
  produced the first six-day interval, and the target is not currently due.
- **Review due:** the target reached that evidence threshold previously, but its next
  scheduled review has arrived. This weakens the present claim without erasing history or
  moving the learner backward on the map.

One successful final checkpoint is demonstrated recall, but remains `learning`; easy
multiple-choice recognition is not permanent mastery. Immediate recovery never advances
the schedule. A correct station replay is stored as replay practice and cannot inflate
mastery, while a wrong replay is accepted as real forgetting evidence and resets the
schedule toward relearning.

The world map continues to use only `michi-world-position` for course travel. Capability
summaries use only review records and time. Focused tests prove those boundaries and the
transitions from introduced to recalled, mastered, review-due, and learning again.

The learner-facing treatment now keeps these concepts in their proper places:

- The map says “stations completed,” a permanent travel measure.
- Due prerequisites open with “A quick look back” and the exact number of connections,
  explaining that a pause is useful information rather than failure.
- Actual misses receive a quiet transition before their one recovery pass. It explicitly
  says the learner does not restart and only paused connections return.
- Review closes on its own teaching beat. If recovery still contained a miss, the learner
  is told that enough has been done today, the connections will return later, and their
  place on the path has not changed.

There is no red warning, lost-progress state, streak, percentage, mastery badge, or
capability dashboard. Internal `mastered` remains learner-facing “steady” language for a
future optional detail view; it is not promoted on the map now while only the opening
curriculum is persisted.

Phase 4 is complete: course travel remains permanent, present capability can weaken
honestly, and the only visible memory language appears when it helps the learner act.

## Phase 5: add production carefully

Goal: move beyond answer selection without pretending unreliable measurements are
precise.

- [ ] Decide where ungraded speaking rehearsal helps.
- [ ] Decide which knowledge should require unaided spoken or written recall.
- [ ] Implement correct stroke-guided writing for a small first set.
- [ ] Test writing on touch hardware.
- [ ] Record only evidence the interaction can honestly support.

Output: at least one station teaches and revisits production correctly.

## Phase 6: prove the blueprint before expanding

Goal: show that adding content is mostly authoring rather than rebuilding the app.

- [ ] Prove one new acquisition station.
- [ ] Prove one consolidation station.
- [ ] Prove one vocabulary or grammar application station.
- [ ] Observe a real learner using the sequence.
- [ ] Revise the blueprint based on confusion, fatigue, recall, and pacing.

Only after this phase should we scale into more tracks and provinces.

## Phase 1 result

The shared learning blueprint now defines:

- What station completion proves.
- How final checkpoints handle complete coverage and mistakes.
- The difference between path progress and current memory.
- How learning items, capabilities, review targets, and due schedules relate.
- How authored curriculum, local storage, the SRS engine, and the session planner divide
  responsibility.
- How earlier knowledge returns without creating endless sessions.
- What different forms of practice can honestly prove.
- How speaking and writing enter progressively without false grading.
- The reusable sequence shared by different station types.

Phase 1 is complete. The next work belongs to Phase 2: define the small station
specification in ordinary language before changing application code.
