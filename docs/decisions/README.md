# Architecture Decision Records (ADRs)

This directory records **significant decisions** — technical, pedagogical, or
product — along with the context that produced them and the consequences they carry.

## Why we keep ADRs

Docs like [vision.md](../product/vision.md) describe *where we are now*. ADRs capture
*how we got here*: the alternatives we weighed and why we chose as we did. Six months
from now, when someone (including future-you) asks "why don't we just use romaji for
beginners?" or "why SM-2 and not FSRS?", the answer is written down — so we don't
re-litigate settled decisions from memory, and so that *changing* a decision is a
deliberate act with a paper trail.

## What deserves an ADR

Write one when a decision:

- is expensive or painful to reverse (framework, storage, core algorithm), **or**
- shapes the product's identity (no romaji, honest decay), **or**
- represents a deliberate exception to a [principle](../product/principles.md).

Small, easily-reversed choices do not need an ADR. When in doubt, write a short one.

## Format

Each ADR is a numbered file: `NNNN-short-title.md`, using
[template.md](./template.md). Numbers are sequential and never reused. An ADR has a
**status**: `Proposed`, `Accepted`, `Superseded by NNNN`, or `Deprecated`.

**ADRs are immutable once accepted.** To change a decision, write a *new* ADR that
supersedes the old one, and update the old one's status to point at it. This
preserves the history of thinking.

## Index

| # | Title | Status |
|---|---|---|
| [0001](./0001-web-first-capacitor.md) | Web-first with Next.js + Capacitor | Accepted |
| [0002](./0002-no-romaji.md) | No romaji as a reading aid | Accepted |
| [0003](./0003-sm2-srs-algorithm.md) | Use SM-2 for spaced repetition | Accepted |

_Add new rows here as ADRs are written._
