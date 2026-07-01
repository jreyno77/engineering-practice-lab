# Senior Engineer Training Plan

## Goal

Build senior-level engineering judgment, vocabulary, communication, and implementation skill through deliberate practice.

This plan is not only about solving code problems. It is about practicing the full senior engineering loop:

1. Understand the problem.
2. Clarify constraints.
3. Shape the work.
4. Design the solution.
5. Implement cleanly.
6. Test the behavior.
7. Communicate the tradeoffs.
8. Iterate based on feedback.

## Primary Languages

- TypeScript
- Kotlin

## Technical Emphasis

- Type safety first
- Clear boundaries and contracts
- Functional programming where it improves clarity
- Local mutation when it is simpler and scoped
- Test-driven development
- Refactoring and maintainability
- Debugging and performance reasoning
- System design and architecture
- Product requirement breakdowns and pitch writing
- Senior-level technical communication
- Building a useful local progress dashboard over time

## Training Modes

The training system uses multiple modes. Code katas are important, but they are not the whole system.

| Mode | Purpose | Output |
|---|---|---|
| Code kata | Repetition and focused practice | A stored practice run with review/reflection |
| Project work | Build the real progress app | Production-intended app or service code |
| Pitch/design doc | Shape vague requirements | Pitch, ADR, or design note |
| Architecture exercise | Practice boundaries and tradeoffs | Architecture note or diagram |
| Communication drill | Build senior vocabulary and writing skill | PR comment, Slack update, risk summary |
| Review/reflection | Measure growth and identify gaps | Review file, score update, next action |
| Adoption decision | Decide whether practice work becomes app code | Adopt / do not adopt / adopt with changes |

## Kata Rules

A kata is a practice rep.

A good kata is:

- focused on one or two skills
- repeatable with variation
- small enough to review
- useful even when the result is not adopted
- stored as evidence of practice

A kata is not automatically production code. If a kata produces a useful implementation or design, it can be promoted into the progress app through an explicit adoption decision.

## Progress App Direction

A long-running goal is to build a local TypeScript/Kotlin web app that visualizes progress through the training journey.

The app should grow gradually from the training work. It should not replace katas, pitch writing, architecture exercises, or communication drills.

Initial app goals:

- show current cycle, current day, readiness score, momentum, focus area, and next action
- visualize weekly progress over time
- keep TypeScript and Kotlin models aligned
- use simple progress data first before parsing complex repo history
- create a useful artifact while still preserving the training purpose

Potential structure:

```txt
apps/
  progress-web/        # TypeScript frontend
services/
  progress-api/        # Kotlin backend
data/
  progress.json        # simple initial source of truth
docs/
  progress-app/        # pitch, architecture, decisions
```

## Two-Week Cycle

### Day 1 — Baseline Assessment

Complete a short code/refactor task, architecture prompt, and communication or pitch-writing prompt.

### Days 2–4 — Code Quality and Fundamentals

Practice type-safety, parsing, clear object construction, small helpers, exhaustive handling, and testable code.

### Days 5–6 — System Design and Architecture

Practice boundaries, contracts, tradeoffs, failure modes, rollout plans, and maintainability.

### Day 7 — Communication Checkpoint

Write a senior-style PR comment, design explanation, risk summary, Slack update, or disagreement.

### Days 8–9 — Product Requirement to Pitch

Turn vague requirements into a shaped pitch with problem, story, appetite, solution shape, boundaries, risks, and success criteria.

### Days 10–11 — Debugging and Performance

Practice forming hypotheses, measuring before guessing, isolating bottlenecks, and proving fixes.

### Days 12–13 — Senior Simulation

Handle one realistic messy scenario that combines design, implementation shape, testing, rollout, and stakeholder communication.

### Day 14 — Retest and Score Update

Retest key areas, update the senior readiness score, and choose focus areas for the next cycle.

## Daily Coaching Loop

1. Receive the day’s task.
2. Submit the answer in the repo or chat.
3. Get a scored review.
4. Complete a follow-up drill if needed.
5. Move to the next day or rest until tomorrow.

Every review should end with a clear next action.
