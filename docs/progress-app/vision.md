# Progress App Vision

## Purpose

Build a local TypeScript/Kotlin web app that visualizes progress through the engineering practice journey.

The app is both a useful product and a training vehicle. It should grow gradually through small, reviewable slices.

## Product Goal

Make the training journey visible.

The app should eventually show:

- current cycle and day
- current senior readiness score
- readiness trend over time
- momentum status
- active focus areas
- completed exercises
- late or missed work
- vocabulary growth
- pitch/design progress
- code quality trend
- refactoring skill and effectiveness trend
- next action

## Training Goal

Use the app to practice real senior engineering skills:

- TypeScript domain modeling
- Kotlin API modeling
- frontend/backend contracts
- functional transformations
- type-safe parsing
- TDD and regression testing
- incremental refactoring
- measuring refactoring effectiveness
- architecture boundaries
- product pitch writing
- PR-style communication

## Important Boundary

The progress app is not the same thing as a code kata.

Katas are repeated practice reps. The progress app is product work.

A kata result may influence the app, but it should only become app code through an explicit adoption decision.

## First Slice

The first useful version should be intentionally small:

```txt
Current Cycle: Cycle 001
Current Day: Day 01
Senior Readiness: TBD / 100
Momentum: 🟡 Baseline Pending
Current Focus: Baseline assessment
Next Action: Submit Day 01 baseline
```

## Initial Architecture Direction

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

Start with simple data and clear boundaries. Avoid parsing complex repo history until the basic product shape is useful.

## Success Criteria

The app is successful when it helps answer:

1. What am I working on now?
2. How close am I to my senior-readiness goal?
3. What changed this week?
4. What should I do next?
5. Which areas need more practice?
6. Is my refactoring skill improving over time?
