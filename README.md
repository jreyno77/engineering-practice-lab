# Engineering Practice Lab

A public engineering practice repository for deliberate improvement in software design, code quality, testing, product thinking, and technical communication.

This repository is a broader practice lab for building senior-level engineering judgment through exercises, reviewable artifacts, product work, and steady iteration.

## Expanded curriculum and daily coaching

The daily coaching loop remains the default: **assign the work → wait until you say it is submitted → review the actual PR → score it and record the next focus**. Architecture, communication, pitches, testing/reliability, senior simulations, project work, and the progress-app direction all stay in the lab and now have explicit curriculum cards alongside the new coding tracks. The optional 16-week route helps choose practice; it does not automatically advance you through assignments.

**Starting a new coaching chat?** Copy the [starter prompt](docs/coaching-session.md#starter-prompt-for-a-new-chat). It explicitly tells the coach to read this complete README first, recover the latest work from the repository, and wait for your submission before reviewing or scoring. [AGENTS.md](AGENTS.md) preserves the same behavior for coding agents.

| Addition | What it provides |
|---|---|
| [Curriculum and resources](docs/curriculum.md) · [Resource shelf](docs/resources.md) | Specific free videos/articles and selected Teach Yourself CS book sections, attached to concrete practice. |
| [TypeScript, Kotlin, and C# fluency](docs/language-fluency.md) | Standard APIs, ecosystem choices, setup recipes, and repeated small implementation problems. |
| [Recurring code katas](docs/code-katas.md) | Small repeated implementations that build fluency, testing, and refactoring skill, distinct from LeetCode-style algorithm drills. |
| [Algorithms and performance](docs/algorithms-performance.md) | Twelve problem patterns, invariants, complexity, and measured optimization exercises. |
| [Refactoring](docs/refactoring.md) | Fifteen original drills, smell recognition, Fowler catalog references, and a continuing rotation. |
| [Security](docs/security.md) | Ten topics with narrow vulnerability/defense exercises, valid-use tests, and official resources. |
| [Broader engineering practice](docs/engineering-practice.md) | Explicit architecture, pitch, communication, debugging, testing/reliability, ownership, adoption, and real project assignments. |
| [Cycle 002 starter menu](cycles/cycle-002/README.md) | Ten ready-to-use assignment prompts, including a C# entry point; no completed learner solutions. |
| [Implementation practice plan](docs/implementation-practice-plan.md) · [Practice/recall loop](docs/implementation-practice-loop.md) | Optional study blocks, AI assistance modes, and delayed repetitions to use within daily coaching. |

Every separately assigned outcome gets its own PR and original start commit. A pitch, kata, and three refactors on one day mean **five PRs**, each with its own Markdown/JSON timing artifact. Follow the [assignment workflow](docs/assignment-workflow.md). Elapsed time runs from the first commit's committer timestamp to GitHub's actual merge timestamp; it includes study, breaks, review, and CI, so it is distinct from optional self-reported active time.

Use the [assignment](templates/assignment-template.md), [API notebook](templates/api-notebook-template.md), [review](templates/practice-review-template.md), and [performance](templates/performance-record-template.md) templates when relevant. The existing scorecard and submissions remain historical evidence; adding material does not change their scores. The status below is the last recorded coaching position, not a newly assessed result.

### Running practice

Each assignment prompt includes its own copy-paste start command. Run it yourself from a clean checkout on `main` when you are ready to begin studying. For the pending Day 06 assignment:

```sh
npm run assignment:start -- cycle-001/day-06/architecture-lifecycle architecture
```

With Git, Node.js 22/npm, configured Git identity, and push access through `origin`, this updates `main` by fast-forward, creates and pushes the assignment branch and original start commit, and prints metadata to paste into its PR. No dependency installation is needed for the starter. An existing attempt keeps its original branch and clock. The coach gives you the command and waits; it does not start assignments for you. See the [workflow](docs/assignment-workflow.md#start-an-assignment) for prerequisites, failures, and PR creation.

With Node.js 22 and the locked dependencies installed using `npm ci`:

```sh
npm run test:practice
npm run test:timing
```

New TypeScript attempts use `submission.ts` and `submission.test.ts` under Cycle 002 or later. The new practice suite reports no tests until submissions exist; prompts are not completed exercises. [Language setup](docs/language-fluency.md#run-the-smallest-real-test) covers Kotlin/C#. Their projects need their own language-specific test commands and are not executed by Vitest.

`npm test` retains the original discovery and currently reproduces **7 passed / 1 failed** in Cycle 001. Day 03 leaks extra input fields, as its review already records; its code and failing assertion are preserved. CI checks new submissions, the timing tool, and the leap-year kata. Passing CI does not claim that historical defect was fixed.

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
- Code-focused reps should prefer `.ts`, `.kt`, or `.cs` files with tests when practical.
- Longer exercises should be clearly labeled and should ask for readiness first.
- Training examples must stay generic because this repo is public.
- Do not include employer, client, team, private system, private domain, private URL, credential, header, log, screenshot, or internal workflow details.
- For baseline and training submissions, preserve the original attempt, review, score, and user understanding instead of rewriting the work into a perfect final answer.
- Continue back-and-forth only when there is disagreement, confusion, or production-intended project code that needs fixes.

## Focus Areas

- TypeScript, Kotlin, and C#
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
