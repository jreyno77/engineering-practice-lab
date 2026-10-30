# Senior Readiness Scorecard

## Updated practice observations

The new course emphasizes implementation fluency in TypeScript, Kotlin, and C#, algorithms/performance, security, and refactoring. The historical 65/100 below has **not** been recalculated: a curriculum change is not evidence of improved skill. Use this parallel record until enough new work supports a revised rubric.

| Skill | Baseline | Evidence to collect |
|---|---|---|
| TypeScript idioms and ecosystem | Not yet assessed under new rubric | Independent rep, appropriate API, edge cases, changed repeat |
| Kotlin idioms and ecosystem | Not yet assessed | Collections/nullability, coroutine ownership, tooling and test evidence |
| C#/.NET idioms and ecosystem | Not yet assessed | Collections/LINQ, async/cancellation, framework API and test evidence |
| Algorithm patterns | Not yet assessed | Invariant, time/space reasoning, unseen variation, correctness |
| Refactoring recognition and execution | Prior reviews below; new drill baseline pending | Smell diagnosis, smallest useful move, preserved behavior, next-day recall |
| Security recognition and prevention | Not yet assessed | Reproduction, trust boundary, allowed/denied cases, established mitigation |
| Performance improvement | Prior qualitative reviews below; benchmark baseline pending | Same workload and assertions, runtime/space samples, tradeoff explanation |

For each attempt, link its PR and timing artifact, language, assistance mode, result, and review. Optional active minutes and lookup/hint counts are self-reported. Compare similar tasks and retain unfinished/invalid attempts. Do not pool a pitch, refactor, and algorithm into one apparent speed ranking. See [practice review](templates/practice-review-template.md).

## Current assignment review — separate from readiness

Cycle 001 Day 06 was reviewed at [PR #25](https://github.com/jreyno77/engineering-practice-lab/pull/25), head `98abfacc3c8b3c7c24e63a52a6396d2d444836d5`. The learner confirmed review of the current attempt, which ends after section 3 and includes a `.expec` caller contract and generated docs.

**Current assessment is under clarification.** On 2026-10-30 the learner explained section 1 as state definitions/invariants and section 2 as a step-by-step execution trace using the coach's replacement template. The coach had not made the mapping explicit. The original state/invariant (10/20) and transition-completeness (13/25) assessments are pending clarification, and the **previous 51-point subtotal is withdrawn as the current assessment**. No replacement total is assigned. The original rubric remains **100 points**, testing remains unassessed, and overall readiness is unchanged. See the [clarification and preserved original review](cycles/cycle-001/day-06-architecture-lifecycle/review.md).

Explicit policies, failure/retry paths, and the `.expec` public contract receive credit. Next focus: understand how the two representations relate before reassessing affected criteria. Independent gaps in interruption/file outcomes, proposed tests, and caller-contract clarity remain open. Representation choice and self-reported elapsed effort do not reduce the score. The original start commit is preserved; timing CI is invalid because the PR description still contains placeholder metadata. Family interruption and section estimates are recorded as self-reported context; no active total is inferred.

## Historical rubric and results

The Senior Readiness Score is a coaching metric. It estimates current senior-engineering readiness. It is not a certification or job title claim.

## Current Score

| Area | Weight | Current Score | Notes |
|---|---:|---:|---|
| Code quality/refactoring | 16% | 9 / 16 | Improved small-helper boundary parsing; keep prior code lessons fresh with short checks. |
| System design/architecture | 16% | 10 / 16 | Historical area score retained. Day 06 has a separate provisional assignment review awaiting discussion; see the current assignment section above. |
| Debugging/performance | 12% | 7 / 12 | Shows awareness; needs sharper distinction between assembly, streaming, and UI materialization costs. |
| Testing/reliability | 10% | 7 / 10 | Improved runnable Vitest coverage; continue with targeted tests that expose real edge-case bugs. |
| Product requirements to pitch shaping | 16% | 8 / 16 | Stays in the loop as its own senior skill area. |
| Communication/vocabulary | 20% | 15 / 20 | Clear, direct writing is a relative strength; continue practicing disagreement, risk summaries, and planning language. |
| Leadership/product judgment | 10% | 9 / 10 | Strong judgment around preserving training history, pushing back, and correcting scope drift. |

**Overall Senior Readiness:** 65 / 100

## Score Interpretation

| Range | Meaning |
|---:|---|
| 40–55 | Solid mid-level, still needs guided direction |
| 55–70 | Strong mid-level / approaching senior |
| 70–85 | Senior-ready in many situations |
| 85–95 | Strong senior |
| 95–100 | Operating with strong senior or staff-level consistency |

## Momentum Legend

| Status | Meaning |
|---|---|
| 🟢 On Track | Completed the planned work and improved or held steady |
| 🟡 Baseline / Steady | Work is active, but not enough data yet or progress is flat |
| 🟠 Needs Attention | Missed work, unclear submission, or a skill gap needs focused practice |
| 🔴 Recovery Focus | Multiple missed days or a repeated gap requires a reset exercise |

## Weekly Progress

| Week | Cycle | Readiness | Trend | Momentum | Main Focus |
|---|---|---:|---:|---|---|
| Week 1 | Cycle 001 | 65 | +4 | 🟢 On Track | Architecture block: Day 06 lifecycle state-table rep next |

## Review History

| Date | Cycle | Day | Score | Summary | Review Record |
|---|---|---|---:|---|---|
| 2026-07-01 | Cycle 001 | Day 01 baseline | 61 | Baseline submitted, reviewed, understood, and preserved as training history. | `cycles/cycle-001/day-01-baseline/review.md` |
| 2026-07-02 | Cycle 001 | Day 02 code quality | 55 | Boundary parsing improved from Day 01; review identified runtime proof gaps and recorded user disagreement on test-plan detail. | `cycles/cycle-001/day-02-code-quality/review.md` |
| 2026-07-06 | Cycle 001 | Day 03 boundary parser rep | 58 | Added runnable TypeScript and Vitest tests; review identified clean-output gaps and corrected future exercise sizing. | `cycles/cycle-001/day-03-boundary-parser-rep/review.md` |
| 2026-07-07 | Cycle 001 | Day 04 small helper rep | 76 | Right-sized helper exercise with Vitest tests; review identified truthiness bug and recorded valid pushback on optional default and named-error feedback. | `cycles/cycle-001/day-04-small-helper-rep/review.md` |
| 2026-07-13 | Cycle 001 | Day 05 architecture rep | 58 | First architecture rep showed good ownership and testability instincts; review identified lifecycle ambiguity and need for explicit state/transition contracts. Day 06 continues the architecture block. | `cycles/cycle-001/day-05-architecture/review.md` |
| 2026-10-29 | Cycle 001 | Day 06 architecture lifecycle | Original provisional subtotal 51; withdrawn 2026-10-30 | Historical review preserved. State/transition assessments are pending clarification of the coach's template; no replacement total. Overall readiness unchanged. | [Review and clarification](cycles/cycle-001/day-06-architecture-lifecycle/review.md) |
