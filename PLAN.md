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

- [ ] Define a small station specification in ordinary language first.
- [ ] Translate the vowels station into it without changing the experience.
- [ ] Translate the K-row station into it.
- [ ] Translate the consolidation station into it.
- [ ] Confirm that orientation, teaching, and consolidation can differ without needing
  unrelated custom page systems.
- [ ] Add validation that catches missing prerequisites, unintroduced material, and
  unclear completion conditions.

Output: the existing stations behave as they do now, but their teaching structure is
clear and reusable.

## Phase 3: make review real

Goal: connect previous learning to future sessions instead of relying only on manually
placed review stations.

- [ ] Store which learning items have been introduced.
- [ ] Store evidence from learner attempts.
- [ ] Connect the existing spaced-repetition engine to persistent learner state.
- [ ] Begin stations with a short, bounded review of relevant due knowledge.
- [ ] Revisit misses later without creating an endless session.
- [ ] Keep authored consolidation stations for cumulative use and transfer.

Output: knowledge returns according to learner need, while every station remains
completable.

## Phase 4: make progress honest

Goal: show travel and present capability as related but different things.

- [ ] Keep map position as course progression.
- [ ] Track introduced knowledge separately.
- [ ] Define what counts as demonstrated recall.
- [ ] Avoid calling easy recognition permanent mastery.
- [ ] Let current capability weaken when knowledge becomes overdue.
- [ ] Explain recovery calmly and without guilt.

Output: progress language describes something the learner can actually do.

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
