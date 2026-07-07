# Senior Skill Loop

This plan replaces a strict day-by-day calendar with repeated skill cycles.

The goal is not to fully master one area before touching the next. The goal is to cycle through the major senior-engineer skills, record evidence, identify weak spots, and return to those weak spots in later cycles.

## Why This Shape

Senior engineering skills overlap. Product shaping affects architecture. Architecture affects tests. Debugging affects communication. Communication affects leadership.

A strict mastery-first path can overfit one isolated skill. A repeated loop gives better transfer because each skill comes back under new constraints.

## How To Use This Loop

- Move through each skill area once per cycle.
- Record the prompt, submission, review, score, and next focus.
- Do not block the whole cycle just because one area is not mastered yet.
- Give weak areas extra reps in the next cycle.
- Add 5–15 minute refresh checks from earlier areas so previous lessons stay active.
- Keep normal exercises small unless a senior simulation is explicitly chosen.

## Skill Areas

| Order | Skill Area | What Good Looks Like | Evidence |
|---:|---|---|---|
| 1 | Code quality and fundamentals | Parses boundaries safely, keeps contracts explicit, simplifies before abstracting, avoids accidental behavior changes. | Small `.ts` / `.kt` reps, tests, refactors, review comments. |
| 2 | System design and architecture | Defines boundaries, contracts, failure modes, ownership, rollout path, and tradeoffs without jumping straight to code. | Design notes, architecture sketches, ADR-style writeups. |
| 3 | Communication and disagreement | Explains risks clearly, pushes back without drifting, asks focused questions, and makes decisions easier for others. | PR comments, Slack-style updates, review replies, risk summaries. |
| 4 | Product requirement to pitch shaping | Turns vague requirements into a clear problem, specific story, appetite, scope, no-gos, risks, and success criteria. | Shape Up-style pitches and product/engineering planning notes. |
| 5 | Debugging and performance | Forms hypotheses, separates symptoms from causes, measures before guessing, and proves whether a fix helped. | Investigation notes, measurement plans, bottleneck analysis. |
| 6 | Testing and reliability | Chooses the few tests that expose real risk, prevents regressions, and avoids busywork coverage. | Focused test plans, failing-first tests, reliability notes. |
| 7 | Senior simulation and ownership | Handles a messy scenario across product, design, implementation shape, testing, rollout, risk, and communication. | End-to-end senior simulation artifact and final review. |

## Refresh Checks

Refresh checks are short quizzes or tiny reps from earlier skill areas.

They should take 5–15 minutes and should not become the main exercise.

Examples:

| Earlier Skill | Refresh Check |
|---|---|
| Code quality | Spot the hidden contract bug in a small helper. |
| Testing | Name the one test that would catch the likely regression. |
| Architecture | Identify the boundary that should own a decision. |
| Communication | Rewrite a too-long PR response into two clear sentences. |
| Pitch shaping | Turn one vague request into a problem statement and no-go. |
| Debugging | Pick the first measurement before proposing a fix. |

## Cycle Behavior

Each cycle should produce:

- one score update,
- one short review summary,
- one or two weak areas to emphasize next cycle,
- one or two old lessons to keep fresh with quizzes.

A skill does not need to be mastered before moving on. The next cycle brings it back with better context.

## Current Position

The first code-quality pass is complete enough to move on.

Known code-quality lesson to keep fresh:

- avoid truthiness when parsing boundary values,
- make contract changes explicit,
- simplify control flow before adding abstractions,
- write the test that exposes the real edge case.

Next primary skill area:

```txt
System design and architecture
```

Code-quality refreshers can continue as short quizzes while architecture becomes the main focus.
