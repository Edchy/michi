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

## Phase 1: regain a shared product definition

Goal: agree on the small set of ideas that every future station must support.

We will answer these questions one at a time:

- [ ] What should a learner be able to do after completing a station?
- [ ] What is the difference between visiting, completing, learning, and mastering?
- [ ] What kinds of practice build a new memory?
- [ ] What evidence tells us that the learner can recall something?
- [ ] How should earlier knowledge return inside later stations?
- [ ] What should spaced repetition control, and what should authored curriculum
  control?
- [ ] When should speaking and writing enter the learning flow?
- [ ] What makes a session feel complete without pretending its knowledge is permanent?

Output: a short, approved learning blueprint written in this file.

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

Define the promise of a single station:

> After completing a station, what should Michi be able to say truthfully about what
> the learner can do?

We will answer this before designing the station data model or changing lesson code.
