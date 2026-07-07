# Engineering Practice Lab

A public engineering practice repository for deliberate improvement in software design, code quality, testing, product thinking, and technical communication.

This repository is a broader practice lab for building senior-level engineering judgment through exercises, reviewable artifacts, product work, and steady iteration.

## Current Progress

| Metric | Status |
|---|---|
| Current Cycle | Cycle 001 |
| Senior Readiness | 65 / 100 |
| Weekly Trend | +4 |
| Momentum | 🟢 On Track |
| Primary Focus | Balanced senior loop: architecture, pitch shaping, communication, and code quality |
| Last Completed Exercise | Day 04 Small Helper Rep |
| Current / Next Exercise | Day 05 System Design / Architecture |

## Latest Review Summary

Day 04 was the first right-sized helper rep after the Day 03 scope correction.

| Item | Result |
|---|---|
| Review Record | `cycles/cycle-001/day-04-small-helper-rep/review.md` |
| Scorecard | `scorecard.md` |
| Score | 76 / 100 |
| Main Strength | Focused helper implementation, direct `unknown` checks, tests in the same `.ts` file, and useful review pushback |
| Main Growth Area | Avoid truthiness for boundary parsing; use explicit null/undefined checks and simpler control flow |
| Next Focus | Return to the full senior cycle with system design / architecture next |

## Senior Engineering Readiness

The readiness score is a coaching metric used to track growth over time. It is not a job title claim or a certification.

The goal is to practice the full loop of senior engineering:

1. Understand the problem.
2. Identify constraints and tradeoffs.
3. Design a maintainable solution.
4. Implement with clear, type-safe code.
5. Test the behavior.
6. Communicate the reasoning clearly.
7. Record the review, score, and next focus.

## Cycle 001 Plan

This cycle should not become code-only. Code quality is one block inside the larger senior loop.

| Day | Focus |
|---:|---|
| Day 01 | Baseline assessment |
| Days 02–04 | Code quality and fundamentals |
| Days 05–06 | System design and architecture |
| Day 07 | Communication checkpoint |
| Days 08–09 | Product requirement → pitch shaping |
| Days 10–11 | Debugging and performance |
| Days 12–13 | Senior simulation |
| Day 14 | Retest and score update |

## Coaching Rules

The durable coaching rules live in:

```txt
docs/coaching-rules.md
```

Important rules:

- Daily assignments should include a learning direction section first.
- Daily code exercises should usually be small runnable reps: one helper, parser slice, refactor, or communication drill.
- Code-focused reps should prefer `.ts` or `.kt` files with tests when practical.
- Longer exercises should be clearly labeled and should ask for readiness first.
- Training examples must stay generic because this repo is public.
- Do not include employer, client, team, private system, private domain, private URL, credential, header, log, screenshot, or internal workflow details.
- For baseline and training submissions, preserve the original attempt, review, score, and user understanding instead of rewriting the work into a perfect final answer.
- Continue back-and-forth only when there is disagreement, confusion, or production-intended project code that needs fixes.

## Focus Areas

- TypeScript and Kotlin
- Type-safe design
- Functional programming patterns where they improve clarity
- Test-driven development
- Refactoring and maintainability
- Debugging and performance reasoning
- System design and architecture
- Product requirement breakdowns and pitch writing
- Senior-level technical communication
- Building a local progress dashboard over time

## Development Modes

This repository supports several kinds of engineering practice. Not everything is a kata.

| Mode | Purpose | Example Artifact |
|---|---|---|
| Code kata | Repeated practice with variation | Rebuild score calculation with different constraints |
| Project work | Real product development | Build the local TypeScript/Kotlin progress dashboard |
| Pitch/design doc | Shape vague ideas into clear work | Progress dashboard pitch |
| Architecture exercise | Practice boundaries, contracts, and tradeoffs | Frontend/backend contract design |
| Communication drill | Practice senior technical writing | PR comment, Slack update, risk summary |
| Review/reflection | Score work and identify the next gap | Cycle review or exercise review |
| Adoption decision | Decide whether practice work should become product code | Promote kata result into the app or leave it as practice |

## Kata Practice

Code katas are practice reps. They are intentionally repeated with variation so the same skill can be exercised from different angles.

Kata submissions are stored as learning artifacts. They are not automatically treated as production app code.

When a kata produces a useful design or implementation, it can be promoted into the actual progress app through an explicit adoption decision.

## Progress App Direction

A long-running goal of this repository is to build a local TypeScript/Kotlin web app that visualizes progress through the training journey.

The app should grow gradually from the training work rather than becoming a large side project. Some exercises will produce app-related artifacts, but the app and the katas remain separate concepts.

Initial product direction:

- TypeScript frontend for the visual dashboard
- Kotlin backend for progress data and scoring APIs
- Progress data stored simply at first
- Visual indicators for readiness, weekly trend, momentum, current focus, and next action
- Real training artifacts used as the eventual source of truth where practical

## Senior Readiness Scorecard

| Area | Weight | Current Score |
|---|---:|---:|
| Code quality/refactoring | 16% | 9 / 16 |
| System design/architecture | 16% | 10 / 16 |
| Debugging/performance | 12% | 7 / 12 |
| Testing/reliability | 10% | 7 / 10 |
| Product requirements → pitch shaping | 16% | 8 / 16 |
| Communication/vocabulary | 20% | 15 / 20 |
| Leadership/product judgment | 10% | 9 / 10 |

**Overall Senior Readiness:** 65 / 100

## Weekly Progress

| Week | Cycle | Readiness | Trend | Momentum | Main Focus |
|---|---|---:|---:|---|---|
| Week 1 | Cycle 001 | 65 | +4 | 🟢 On Track | Balanced senior loop: architecture, pitch shaping, communication, and code quality |

## Momentum Legend

| Status | Meaning |
|---|---|
| 🟢 On Track | Completed the planned work and improved or held steady |
| 🟡 Baseline / Steady | Work is active, but not enough data yet or progress is flat |
| 🟠 Needs Attention | Missed work, unclear submission, or a skill gap needs focused practice |
| 🔴 Recovery Focus | Multiple missed days or a repeated gap requires a reset exercise |

## Repository Structure

```txt
katas/
  typescript/
  kotlin/
  functional-programming/

exercises/
  product-pitches/
  communication/
  system-design/

apps/
  progress-web/

services/
  progress-api/

docs/
  coaching-rules.md
  progress-app/
  decisions/

cycles/
  cycle-001/
    day-01-baseline/
      prompt.md
      submission.md
      review.md
    day-02-code-quality/
      prompt.md
      submission.md
      review.md
    day-03-boundary-parser-rep/
      prompt.md
      submission.md
      submission.ts
      review.md
    day-04-small-helper-rep/
      prompt.md
      submission.ts
      review.md

templates/
  pitch-template.md
  adr-template.md
  pr-review-template.md
  design-note-template.md
  bug-investigation-template.md
  adoption-decision-template.md
```

## Working Style

Changes are made through branches and pull requests. Direct commits to `main` are avoided so each exercise can be reviewed like real engineering work.
