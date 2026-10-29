# Cycle 002: a starter menu for the whole practice lab

This is an optional starter menu, not a record of completed work. Historical cycle-001 reviews remain unchanged, and an active earlier assignment is not silently replaced. Use [the coaching session guide](../../docs/coaching-session.md): the coach assigns the day's work, waits until the learner says it is submitted, reviews the actual PR, then scores it and chooses the next action.

For a new implementation-focused start, **C002-F01** is available; if C# is the immediate priority, use **C002-CS01** and continue that language block in [the whole-lab curriculum](../../docs/curriculum.md). Keep code katas and broader engineering work in the rotation. Use three to five sessions a week, usually one assignment per session; the menus are choices, not a requirement to finish every card in one day or week.

| ID | Assignment | Kind | Appetite | Prompt |
|---|---|---|---|---|
| C002-F01 | Count and rank tokens with standard APIs | fluency | 40 min | [Token counts](C002-F01/prompt.md) |
| C002-F02 | Parse a small runtime boundary | fluency | 45 min | [Boundary parser](C002-F02/prompt.md) |
| C002-A01 | Find a pair without reusing an element | kata | 45 min | [Complement lookup](C002-A01/prompt.md) |
| C002-A02 | Keep a valid moving window | kata | 45–60 min | [Distinct span](C002-A02/prompt.md) |
| C002-P01 | Shape a small progress-summary feature | pitch | 30 min | [Pitch](C002-P01/prompt.md) |
| C002-R01 | Extract a meaningful calculation | refactor | 30 min | [Extract Function](C002-R01/prompt.md) |
| C002-R02 | Remove meaningless wrappers | refactor | 30 min | [Inline Function](C002-R02/prompt.md) |
| C002-R03 | Flatten nested decisions safely | refactor | 30 min | [Guard clauses](C002-R03/prompt.md) |
| C002-S01 | Enforce note ownership | security | 45–60 min | [Object authorization](C002-S01/prompt.md) |
| C002-CS01 | Count tags with an explicit .NET comparer | fluency | 45–60 min | [C# entry rep](C002-CS01/prompt.md) |

## Code katas and broader engineering options

The **K-cards** are recurring small software-building exercises. They complement A01/A02's algorithm practice. The **E-cards** continue the broader training already established in cycle 001. Their linked guides contain the task, examples, and specific learning resources; the coach instantiates only the chosen card as the day's assignment with a fresh attempt ID.

| Focus | Available card | Output |
|---|---|---|
| Code kata | [K-01 leap years or K-03 basket total](../../docs/code-katas.md) | Small working behavior, tests, and a later variation in the current language. |
| Architecture | [E-01 lifecycle or E-02 ownership](../../docs/engineering-practice.md) | State/transition contract or responsibility map with concrete failure behavior. |
| Communication and disagreement | [E-03 PR review or E-04 disagreement](../../docs/engineering-practice.md) | Precise evidence, actionable feedback, and a clear next decision. |
| Product shaping | [E-05 pitch or E-06 construction task](../../docs/engineering-practice.md) | A bounded proposal or one useful build step with acceptance examples; C002-P01 is also ready. |
| Debugging and performance | [E-07 diagnosis or E-08 investigation](../../docs/engineering-practice.md) | Reproduction, discriminating evidence, and a justified fix or optimization decision. |
| Testing and reliability | [E-09 consumer tests or E-10 failure/retry](../../docs/engineering-practice.md) | Observed behavior at the promised boundary, including failure effects. |
| Senior ownership | [E-11 incident, E-12 rollout, or E-15 simulation](../../docs/engineering-practice.md) | A bounded response/rollout decision with evidence, communication, and recovery criteria. |
| Progress-app project and adoption | [E-13 adoption, then E-14 project slice](../../docs/engineering-practice.md) | An explicit adoption decision followed by a separately reviewed, useful product slice. |
| Cycle review | [E-16 retest/reflection](../../docs/engineering-practice.md) | Evidence-based review and the next focus, without inventing completion or scores. |

One possible first rotation is a code kata, F01, the next architecture rep, R01, and a pitch or communication rep. Later selections include A01, F02, and S01; use A02 after A01. The daily coach adapts this from the latest review and available time rather than assigning the whole menu at once.

A pitch + code kata + three refactors means **five PRs**: for example, C002-P01, a fresh attempt of K-01, C002-R01, C002-R02, and C002-R03. Start each branch from current main, or name a genuine dependency explicitly; do not start the next assignment's clock before beginning it. A code kata becomes progress-app code only through an explicit adoption decision and separate project assignment.

For every card, use [the assignment workflow](../../docs/assignment-workflow.md). Put its one ID/kind/start SHA in the PR template. Save the attempt's runnable code/tests alongside its prompt. TypeScript uses separate `submission.ts` and `submission.test.ts` files, tested from the repository root with `npm run test:practice -- cycles/cycle-002/C002-F01/submission.test.ts` (substitute the chosen ID). Follow [language setup](../../docs/language-fluency.md#run-the-smallest-real-test) for Kotlin or C#. Add a short `submission.md` with:

```text
Assignment and assistance mode:
Behavior and exact test command:
Result and any remaining gap:
API/resource I needed to look up:
One decision and its tradeoff:
Active practice minutes (optional, self-recorded):
Delayed repeat to try:
```

No solution is supplied here. For code practice, write a test for one specified result, implement it, then cover the distinct risk cases. For a pure refactor, first run characterization tests against the supplied starting code, then keep their assertions unchanged. Preserve the initial attempt and feedback; later independent repeats use a suffix such as `C002-F01-r02` and a fresh PR.
