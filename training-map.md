# Senior Training Mastery Map

This map replaces a strict day-by-day plan with ordered mastery areas.

The goal is mastery first: focus deeply on the current area, then use short quizzes and small refresh checks to keep earlier areas warm.

## How To Use This Map

- Work through the mastery areas in order.
- Do not treat the order as a rigid calendar.
- Stay on an area until the work is consistently solid.
- Mix in small quizzes from earlier areas so old skills do not fade.
- Keep exercises small unless a larger senior simulation is explicitly chosen.
- Record prompts, submissions, reviews, and score changes in the repo.

## Ordered Mastery Areas

| Order | Mastery Area | What Good Looks Like | Evidence |
|---:|---|---|---|
| 1 | Code quality and fundamentals | Parses boundaries safely, keeps contracts explicit, simplifies before abstracting, avoids accidental behavior changes. | Small `.ts` / `.kt` reps, tests, refactors, review comments. |
| 2 | System design and architecture | Defines boundaries, contracts, failure modes, ownership, rollout path, and tradeoffs without jumping straight to code. | Design notes, architecture sketches, ADR-style writeups. |
| 3 | Communication and disagreement | Explains risks clearly, pushes back without drifting, asks focused questions, and makes decisions easier for others. | PR comments, Slack-style updates, review replies, risk summaries. |
| 4 | Product requirement to pitch shaping | Turns vague requirements into a clear problem, specific story, appetite, scope, no-gos, risks, and success criteria. | Shape Up-style pitches and product/engineering planning notes. |
| 5 | Debugging and performance | Forms hypotheses, separates symptoms from causes, measures before guessing, and proves whether a fix helped. | Investigation notes, measurement plans, bottleneck analysis. |
| 6 | Testing and reliability | Chooses the few tests that expose real risk, prevents regressions, and avoids busywork coverage. | Focused test plans, failing-first tests, reliability notes. |
| 7 | Senior simulation and ownership | Handles a messy scenario across product, design, implementation shape, testing, rollout, risk, and communication. | End-to-end senior simulation artifact and final review. |

## Freshness Checks

Freshness checks are short quizzes or tiny reps from earlier mastery areas.

They should take 5–15 minutes and should not become the main exercise.

Examples:

| Earlier Area | Freshness Check |
|---|---|
| Code quality | Spot the hidden contract bug in a small helper. |
| Testing | Name the one test that would catch the likely regression. |
| Architecture | Identify the boundary that should own a decision. |
| Communication | Rewrite a too-long PR response into two clear sentences. |
| Pitch shaping | Turn one vague request into a problem statement and no-go. |
| Debugging | Pick the first measurement before proposing a fix. |

## Current Position

The first code-quality pass is complete enough to move on.

Known code-quality lesson to keep fresh:

- avoid truthiness when parsing boundary values,
- make contract changes explicit,
- simplify control flow before adding abstractions,
- write the test that exposes the real edge case.

Next primary mastery area:

```txt
System design and architecture
```

Code-quality refreshers can continue as short quizzes while architecture becomes the main focus.
