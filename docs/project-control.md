# Michi Project Control

This is the working front door for regaining control of Michi.

It answers three questions:

1. What are we trying to build?
2. What are we working on now?
3. What must be true before we move on?

The older documents contain valuable thinking, but some describe earlier versions of
the project and some describe systems that are not implemented yet. Until the document
review is complete, this file is the guide to the work. It does not silently replace the
product vision or accepted architecture decisions.

## The product in plain language

Michi teaches Japanese through a calm path of short stations. A station introduces or
strengthens one manageable capability. The learner hears correct Japanese, connects it
to meaning or script, retrieves it without excessive help, uses it, and encounters it
again before it is forgotten.

The map makes the course understandable:

- A **station** is one completable learning session.
- A **track** is a short sequence of related stations.
- A **province** is a larger area of capability, such as hiragana or katakana.
- A **book stop** is optional background and cultural context. Essential teaching never
  exists only in a book stop.

## Words we need to keep separate

### Visited

The learner opened or completed the screens in a station. This records travel through
the course, not knowledge.

### Introduced

The learner has been taught an item at least once. The item can now appear in review.

### Station complete

The learner performed the station's required tasks and reached its end. Completion
unlocks the next station, but does not mean the knowledge can never be forgotten.

### Mastered

The learner has demonstrated a capability successfully, through sufficiently strong
retrieval and across time. Mastery can weaken when the knowledge is not reviewed.

### Drill

A bounded set of questions used to build or check a particular connection. A drill is
part of a station; it is not the complete teaching method.

### Review

Retrieval of previously introduced knowledge. Some review is selected automatically by
the spaced-repetition system; some is deliberately authored as a consolidation station.

### SRS

The spaced-repetition system stores when each piece of knowledge should return. Michi's
SRS calculation exists in code, but it is not yet connected to the playable stations or
persistent learner progress.

### Learning item and capability

A learning item is content such as あ or the word こい. A capability is what the learner
can do with it, such as hear あ and identify it, see あ and say it, or write あ. One item
can therefore have several capabilities.

## The reusable station shape

This is a learning contract, not a requirement that every station show the same screens.
Orientation and consolidation stations may omit phases that do not apply.

1. **Retrieve** — bring back due or prerequisite knowledge.
2. **Orient** — state the one useful outcome of this station.
3. **Model** — let the learner hear or see the correct new form.
4. **Connect** — provide guided, open-book practice before grading.
5. **Retrieve new knowledge** — remove help gradually and require recall.
6. **Produce** — say, write, recall, or construct without answer choices where practical.
7. **Use** — apply the knowledge in a real word, sentence, or listening context.
8. **Mix** — distinguish the new material from older or easily confused material.
9. **Close** — state what was demonstrated, save progress, and schedule future review.

The station types are:

- **Orientation:** establishes a mental model; usually introduces no review items.
- **Acquisition:** introduces a small set of new knowledge.
- **Consolidation:** introduces nothing; mixes and strengthens earlier knowledge.
- **Assessment:** checks a broader capability with minimal help.
- **Application:** uses known material in a story, dialogue, sentence, or listening task.

## Step-by-step implementation plan

We do one phase at a time. At the end of every phase, we stop, inspect the result
together, and decide whether to continue. Passing tests alone does not approve a phase.

### Phase 0 — Protect and understand the current work

Goal: establish a safe baseline before redesigning anything.

- [x] Create the `learning-system-foundation` branch.
- [x] Review the current uncommitted changes and group them by purpose.
- [x] Run the complete verification suite and record the result: 82 tests,
  TypeScript, and the Node 22 production build pass on 2026-07-28.
- [ ] Create a named baseline commit once the current work is understood and approved.

Done when: we can always return to the exact current product state.

### Phase 1 — Simplify and reconcile the documentation

Goal: make the project understandable without reading thousands of lines.

- [ ] Classify every document as `canonical`, `reference`, `historical`, or `draft`.
- [ ] Resolve direct contradictions, beginning with the first learner experience,
  session shape, writing, and SRS status.
- [ ] Rewrite `OVERVIEW.md` as a short current-state explanation.
- [ ] Rewrite `docs/roadmap.md` to reflect what is actually built.
- [ ] Make `docs/README.md` a simple reading order with clear ownership.
- [ ] Preserve useful detail in focused reference documents instead of deleting it.

Done when: the founder can explain the present product, the next phase, and the reason
for it using only the overview, this control document, and the roadmap.

### Phase 2 — Define the learning contract as data

Goal: describe any station without adding a new custom page component.

- [ ] Define `StationSpec`, station types, steps, introduced items, prerequisites,
  review policy, completion evidence, and end state.
- [ ] Define learning items separately from learner progress.
- [ ] Define capability facets such as sound-to-symbol, symbol-to-sound, speaking,
  writing, and reading-in-context.
- [ ] Add validators that reject broken station specifications.
- [ ] Express the existing vowel, K-row, and consolidation stations in the new format.

Done when: the three existing station styles can be represented clearly as data and
validated without losing their current teaching sequence.

### Phase 3 — Build one reusable station runner

Goal: render station specifications through shared teaching components.

- [ ] Extract shared step components from the current large station page.
- [ ] Build a station orchestrator that moves through the declared phases.
- [ ] Preserve back navigation, audio controls, accessibility, and bounded completion.
- [ ] Keep special presentation possible without putting whole stations in conditionals.

Done when: Stations 2–4 run through the shared runner and retain their behavior and
visual quality.

### Phase 4 — Connect persistent review

Goal: make “everything cycles back” true in the playable product.

- [ ] Add a learner-state storage interface and a local implementation.
- [ ] Seed new learning items when they are introduced.
- [ ] Save attempt evidence per item and capability.
- [ ] Assemble a bounded due-review segment at station entry.
- [ ] Feed review results into the existing scheduling engine.
- [ ] Re-show missed items later in the session without creating an endless loop.

Done when: completing a station schedules its knowledge, and returning later produces
the appropriate review before new content.

### Phase 5 — Make progress honest

Goal: distinguish travel through the map from current learning capability.

- [ ] Store `visited`, `introduced`, `station complete`, and `mastered` separately.
- [ ] Decide what evidence counts for each capability.
- [ ] Derive current capability from evidence and SRS state.
- [ ] Keep forgetting normal and recoverable in the language and UI.
- [ ] Ensure easy recognition alone cannot claim strong mastery.

Done when: progress statements describe something the learner can currently do and can
change when knowledge becomes overdue.

### Phase 6 — Add production and writing carefully

Goal: make production a real part of learning rather than a promise in the vision.

- [ ] Define which early capabilities require speaking, writing, or both.
- [ ] Add ungraded speaking rehearsal where automated judgement would be unreliable.
- [ ] Implement stroke-guided writing using the accepted stroke data source.
- [ ] Add recall-before-hint behavior and record meaningful evidence.
- [ ] Test the physical interaction on touch devices before expanding it broadly.

Done when: at least one kana station teaches and revisits writing correctly without
making unreliable claims about mastery.

### Phase 7 — Prove the blueprint before scaling

Goal: verify that the system works beyond one kind of kana lesson.

- [ ] Build one acquisition station.
- [ ] Build one consolidation station.
- [ ] Build one vocabulary or grammar application station.
- [ ] Confirm that all three use the same content model and station runner.
- [ ] Observe a real learner and record confusion, fatigue, retention, and pacing.
- [ ] Revise the blueprint before adding a full province.

Done when: a new station is mainly an authoring task, not a new software feature.

## Rules for staying in control

- Work on one phase at a time.
- Before changing code, state the learner problem it solves.
- Do not add a new station until the current phase's definition of done is met.
- Do not call a system implemented because a pure engine or interface exists; verify it
  in the learner flow.
- Keep current behavior covered by tests before restructuring it.
- Prefer one clear canonical document over several overlapping explanations.
- At every checkpoint, explain the result in plain language before asking for approval.

## Right now

We are in **Phase 0**. The next action is to review and preserve the current uncommitted
work. We are not yet rewriting the station code or connecting the SRS.
