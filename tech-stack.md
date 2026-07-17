# Tech Stack & Platform Strategy

## The Core Question

The app needs to run on phone and desktop. The UI should be simple enough to work everywhere with minimal adjustments. And you already know React and JavaScript. Those three facts point clearly in one direction.

---

## Does Expo + React Native Make Sense?

Partially. Here's the honest picture.

Expo is excellent for iOS and Android. It handles the hard parts of mobile development — build pipelines, device APIs, audio playback, storage — and wraps them in a developer-friendly layer that a React developer can pick up quickly. If this were mobile-only, Expo would be an easy recommendation.

The problem is desktop. Expo has a web build option (React Native Web) but it's a mobile-first system trying to stretch to desktop, and it shows. Complex layouts feel awkward, the drawing canvas (critical for this app) is harder to implement, and you lose the full power of the browser. You'd spend meaningful time fighting the framework to make desktop feel right.

The bigger issue specific to this app: the character drawing mechanic is much more natural to build in a browser using HTML Canvas than in React Native's touch-based drawing system. Getting stroke recognition working well on React Native Web adds real complexity.

**Verdict on Expo + React Native**: good for mobile, friction on desktop. Not the ideal single choice for a both-platforms-from-day-one approach.

---

## The Better Approach: Web-First with Capacitor

Since you know React, the most pragmatic path is:

**Next.js** (web app) + **Capacitor** (wraps it as a native mobile app)

Here's the analogy: Next.js is your kitchen where you cook the food. Capacitor is a container that lets you take that food anywhere — iOS, Android, desktop browser — without having to cook it again.

### How it works
- You build the app as a normal React/Next.js web app
- On desktop, users open it in a browser or as an Electron-style desktop app
- On mobile, Capacitor wraps the web app in a native shell and gives it access to device APIs (camera, haptics, storage, audio)
- The code is identical. One codebase, all platforms.

### Why this works especially well for this app
- HTML Canvas for the drawing mechanic — straightforward, well-documented, works perfectly on both touch and mouse
- Audio playback via the Web Audio API — consistent everywhere
- The SRS engine is pure JavaScript — runs identically on all platforms
- Simple, clean UI in CSS/Tailwind — easier to make responsive than React Native layouts

---

## Mobile First or Both at Once?

Both at once, because the approach above makes it nearly free.

The key is designing for the phone screen first. A layout that works at 375px wide will almost always work on desktop too — it just has more breathing room. The reverse is not true: a desktop layout rarely translates cleanly to mobile.

Concrete rules for designing both at once:
- Everything in a single centered column, max-width ~600px on desktop
- Large tap targets (minimum 48px height) — looks fine on desktop too
- No hover-only interactions — if it needs hover to work, it won't work on mobile
- Font sizes that are readable without zooming on a phone

The drawing canvas is the one element that needs platform-aware handling. On mobile, it listens for touch events. On desktop, it listens for mouse events. This is maybe 10 lines of code difference, handled with a simple check.

---

## Recommended Stack

| Layer | Choice | Why |
|---|---|---|
| Framework | Next.js (React) | You already know React. Full web power. |
| Mobile wrapper | Capacitor | Wraps the web app as a native iOS/Android app with one command |
| Styling | Tailwind CSS | Utility-first, easy to make responsive, no context-switching |
| Drawing canvas | HTML Canvas API | Native to browsers, works on touch and mouse, well-documented |
| Audio | Web Audio API + Howler.js | Consistent playback everywhere, good library support |
| SRS engine | Custom JS module | ~30 lines, pure logic, no library needed |
| Data / storage | SQLite via Capacitor (mobile) + localStorage/IndexedDB (web) | Offline-first, no backend needed to start |
| Backend (later) | Supabase | When you want sync across devices — Postgres + auth, very beginner-friendly |

---

## What About Flutter?

Flutter is genuinely excellent for this use case — truly cross-platform, fast, and the drawing APIs are first-class. But it uses Dart, not JavaScript. Given you already know React, the learning curve adds months before you can ship anything. Not worth it here.

---

## What About a Separate Mobile App and Web App?

Some teams build two codebases — a React web app and a separate React Native mobile app — sharing only the business logic (like the SRS engine). This gives you the best of both worlds in terms of native feel, but it's double the UI work. Only makes sense if native mobile performance becomes a real problem, which it won't be for a learning app like this.

---

## The Simple UI Advantage

The ambition to keep the UI simple is actually a technical advantage. A complex app with lots of custom interactions, animations, and platform-specific patterns would strain the Capacitor approach. A clean, content-focused UI — flashcard, drawing canvas, audio player, progress card — is exactly what web-first-plus-wrapper handles best.

Keep screens to one task at a time. No sidebars, no complex navigation. This makes the app feel native even though it's a web app underneath, and means zero platform-specific layout work.

---

## Development Order

1. **Build the SRS engine** — pure JavaScript, no UI, testable immediately
2. **Build the web app** (Next.js) — desktop browser first, then test on mobile browser
3. **Wrap with Capacitor** — one command, test on a real phone
4. **Add Capacitor plugins** as needed — audio, haptic feedback, native storage

You can have something running on your phone within a week of starting. That early, tactile feedback of using your own app on a real device is invaluable for design decisions.
