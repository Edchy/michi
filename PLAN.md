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
- [ ] What kinds of practice build a new memory?
- [ ] What evidence tells us that the learner can recall something?
- [x] How should earlier knowledge return inside later stations?
- [x] What should spaced repetition control, and what should authored curriculum
  control?
- [ ] When should speaking and writing enter the learning flow?
- [ ] What makes a session feel complete without pretending its knowledge is permanent?

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

## Next decision

Define what kinds of practice count as learning evidence:

> When is choosing an answer useful, and when must the learner recall, speak, write, or
> use the knowledge without choices?

We will answer this before assigning evidence rules to exercise types.
