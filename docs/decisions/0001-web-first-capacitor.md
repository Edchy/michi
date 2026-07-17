# 0001 — Web-first with Next.js + Capacitor

- **Status:** Accepted
- **Date:** 2026-07-17
- **Deciders:** project founder

## Context

Michi must run on both phone and desktop from day one, with a deliberately simple,
content-focused UI. The builder already knows React and JavaScript. Two features are
architecturally load-bearing:

- a **character-drawing canvas** with stroke recognition, and
- **offline-first** operation (core learning without a network).

We need a single approach that serves web and mobile without doubling UI work, and
that makes the drawing canvas natural rather than a fight with the framework. Full
context in [tech-stack.md](../architecture/tech-stack.md).

## Decision

**We will build Michi as a web-first Next.js (React) app, styled with Tailwind, and
wrap it for native mobile with Capacitor — one codebase for web, iOS, and Android.**

The character-drawing mechanic uses the HTML Canvas API; audio uses the Web Audio API
(with Howler.js). Learner state persists offline via IndexedDB on web and SQLite (via
Capacitor) on mobile, behind a storage interface. Optional Supabase sync is a later
addition, not a launch dependency.

## Alternatives Considered

- **Expo + React Native (with React Native Web for desktop).** Excellent for mobile,
  but a mobile-first system stretched to desktop: awkward complex layouts, and the
  critical drawing canvas is harder to build well on RN's touch-drawing system than
  on HTML Canvas. Rejected for the desktop friction and canvas complexity.

- **Flutter.** Genuinely excellent cross-platform with first-class drawing APIs — but
  it uses Dart. Given existing React skills, the learning curve adds months before
  anything ships. Rejected on time-to-first-ship.

- **Two separate codebases (React web + React Native mobile), sharing only logic.**
  Best native feel, but double the UI work — only justified if native performance
  becomes a real problem, which it won't for a content-focused learning app.
  Rejected as premature.

## Consequences

- **Easier:** one UI codebase; HTML Canvas makes the drawing mechanic
  straightforward on both mouse and touch; the pure-JS SRS engine runs identically
  everywhere; responsive CSS/Tailwind is simpler than RN layouts; fast path to
  running on a real phone (Capacitor wrap is one command).
- **Requires:** a small amount of platform-aware code (touch vs. mouse events on the
  canvas — roughly a 10-line difference); bundling fonts and core audio for offline
  use in the Capacitor build.
- **Accepted downside:** a Capacitor-wrapped web app is not as "native" as a true
  native app in the most demanding scenarios. For Michi's simple, single-task-per-
  screen UI this is a non-issue, and the simplicity is itself an advantage for this
  approach.

## Related

- [tech-stack.md](../architecture/tech-stack.md) — full analysis
- [overview.md](../architecture/overview.md) — how the layers fit
- [P9 — Offline-first, one codebase](../product/principles.md#p9--offline-first-one-codebase)
