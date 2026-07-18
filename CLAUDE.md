# Michi — project rules for Claude

Start by reading **[OVERVIEW.md](./OVERVIEW.md)** — the single entry point that
summarizes the whole project and links to every doc.

This repository is in the **planning/documentation phase**: no application code yet.
The work is designing and documenting Michi well before building it. Respect the
existing docs and their voice (direct, warm, opinionated, honest).

## Keep OVERVIEW.md in sync (important)

`OVERVIEW.md` is the project's single source-of-entry. It must not silently drift out
of date.

**When you add, remove, or rename a doc under `docs/`, add or change an ADR, or change
a fact that OVERVIEW.md summarizes, update OVERVIEW.md in the same change** — its
relevant section *and* the file map in §9. Also update the index in
[docs/README.md](./docs/README.md).

If a docs change is trivial (a typo or wording tweak that doesn't affect any summary),
no OVERVIEW.md update is needed — proceed normally.

> A `PostToolUse` hook will remind you if you edit `docs/` without touching
> OVERVIEW.md. Treat the reminder as a prompt to decide whether the change is
> significant, not as an order to always edit OVERVIEW.md.

## Working conventions

- **Decisions go in ADRs** (`docs/decisions/`) and are immutable once accepted —
  supersede with a new ADR rather than editing an accepted one.
- **Cross-link liberally**; cite principles as `[P#]` (see
  [principles.md](./docs/product/principles.md)).
- **Honor the principles.** A change that violates one (P1–P10) needs a fix or a
  documented ADR exception.
- **Verify doc links resolve** when you add or move files.
