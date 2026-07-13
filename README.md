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
| Primary Focus | Architecture block: lifecycle states and transition rules |
| Last Completed Exercise | Day 05 Architecture Rep |
| Current / Next Exercise | Day 06 Focused Architecture Rep |

## Latest Review Summary

Day 05 was the first architecture-focused rep in the senior skill loop.

| Item | Result |
|---|---|
| Review Record | `cycles/cycle-001/day-05-architecture/review.md` |
| Scorecard | `scorecard.md` |
| Score | 58 / 100 |
| Main Strength | Strong instincts around cohesion, separation, ownership, testability, and changeability |
| Main Growth Area | The lifecycle contract needs to be more decisive: allowed states, forbidden transitions, cleanup finality, regeneration, and concurrency cannot stay ambiguous |
| Next Focus | Complete Day 06 with a focused lifecycle state-table and transition-rules architecture rep |

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

## Skill Loop

The durable training loop lives in:

```txt
training-loop.md
```

The loop is ordered and uses planned multi-day blocks inside each cycle. Each cycle touches the major senior skill areas, records progress, moves on after the planned block, and brings weak areas back in later cycles.

| Order | Skill Area |
|---:|---|
| 1 | Code quality and fundamentals |
| 2 | System design and architecture |
| 3 | Communication and disagreement |
| 4 | Product requirement to pitch shaping |
| 5 | Debugging and performance |
| 6 | Testing and reliability |
| 7 | Senior simulation and ownership |

Current position:

```txt
Day 05 completed the first architecture rep.
Day 06 remains in the architecture block.
Communication and disagreement begins after Day 06.
```

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
| Product requirements to pitch shaping | 16% | 8 / 16 |
| Communication/vocabulary | 20% | 15 / 20 |
| Leadership/product judgment | 10% | 9 / 10 |

**Overall Senior Readiness:** 65 / 100

## Weekly Progress

| Week | Cycle | Readiness | Trend | Momentum | Main Focus |
|---|---|---:|---:|---|---|
| Week 1 | Cycle 001 | 65 | +4 | 🟢 On Track | Architecture block: Day 06 lifecycle state-table rep next |

## Momentum Legend

| Status | Meaning |
|---|---|
| 🟢 On Track | Completed the planned work and improved or held steady |
| 🟡 Baseline / Steady | Work is active, but not enough data yet or progress is flat |
| 🟠 Needs Attention | Missed work, unclear submission, or a skill gap needs focused practice |
| 🔴 Recovery Focus | Multiple missed days or a repeated gap requires a reset exercise |

## Repository Structure

```txt
training-loop.md

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
    day-05-architecture/
      prompt.md
      submission.md
      review.md
    day-06-architecture-lifecycle/
      prompt.md

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
