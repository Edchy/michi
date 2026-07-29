# Michi agent instructions

Read `README.md` and `PLAN.md` before making project decisions. Use
`DEV-OVERVIEW.md` to locate current code and understand planned responsibility
boundaries.

## Sources of truth

- The working application is the truth about what is implemented.
- `README.md` is the concise current project description.
- `PLAN.md` contains the active decisions and sequence of work.
- `DEV-OVERVIEW.md` maps the current code and planned system boundaries.
- `REFERENCE.md` is a historical archive. Do not treat an archived proposal as an
  accepted requirement unless the user deliberately restores it.

When code, current documentation, and a user request disagree, surface the difference
plainly. Do not silently choose the archived version.

## Working with the founder

- Keep explanations short and concrete.
- Work one phase and one meaningful decision at a time.
- Explain unfamiliar learning or technical terms in ordinary language.
- Do not broaden a narrow request into a product rewrite.
- Preserve working behavior before restructuring it.
- Ask before committing unrelated existing changes.

## Learner-facing work

- Each screen should have one clear learning job.
- Give the learner enough exposure and guidance before testing recall.
- Do not use romaji as a reading or pronunciation aid.
- Do not use streaks, points, lives, guilt, or punishment mechanics.
- Keep feedback calm and make mistakes useful.
- Do not use unexplained jargon or unexplained Japanese.
- Do not use em dashes in learner-facing copy.
- Preserve accessible focus, keyboard behavior, reduced motion, and adequate touch
  targets.

## Verification

Use proportionate checks. For broad learning-flow changes, run:

```sh
npm test
npx tsc --noEmit
```

Also run a production build when routes, application boundaries, or production assets
change. In the current environment, the validated Node binary is:

```sh
/Users/eddietovebeppearonelsa/.nvm/versions/node/v22.12.0/bin/node node_modules/next/dist/bin/next build
```
