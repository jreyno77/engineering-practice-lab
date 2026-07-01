# Cycle 001 — Day 01 Baseline Review

## Status

Baseline submitted, reviewed, and understood.

This review is meant to preserve the training history, not replace the original submission with a perfect answer.

## PR

- PR: #6 — Day 01 Exercise
- Submission: `cycles/cycle-001/day-01-baseline/submission.md`
- Review style: GitHub review comments plus score summary

## Score

**Overall Senior Readiness:** 61 / 100

| Area | Weight | Score | Notes |
|---|---:|---:|---|
| Code quality/refactoring | 16% | 8 / 16 | Good instinct toward discriminated unions, but final answer did not fully satisfy the boundary parsing and `unknown` input constraint. |
| System design/architecture | 16% | 10 / 16 | Good separation direction; needs more explicit component contracts and clearer naming. |
| Debugging/performance | 12% | 7 / 12 | Shows performance awareness; needs sharper distinction between assembly cost, streaming cost, and UI data materialization. |
| Testing/reliability | 10% | 5 / 10 | Compile-time checks were identified, but runtime tests for untrusted input were underdeveloped. |
| Product requirements → pitch shaping | 16% | 8 / 16 | Solid problem awareness, but the artifact needs tighter structure and clearer boundaries. |
| Communication/vocabulary | 20% | 15 / 20 | Clear and honest writing; concise communication is a relative strength. |
| Leadership/product judgment | 10% | 8 / 10 | Strong self-awareness and good judgment about preserving feedback history instead of rewriting the submission into an ideal answer. |

## Key Feedback

- Use `unknown` for untrusted boundary input, then narrow with guards or parsers.
- Keep a boundary function when the original input is untrusted; do not push all validation responsibility to the caller unless that contract is explicit.
- Avoid `any` in final submitted TypeScript.
- `Number(...)` can produce `NaN` without throwing, so numeric parsing needs an explicit `Number.isFinite` check.
- Compile-time checks help, but runtime tests are needed when parsing unknown input.
- Architecture notes should define explicit contracts such as request, resolved connection, execution result, and configuration error types.
- Performance feedback should separate assembly cost, streaming/write cost, and UI materialization cost.

## User Response / Understanding

The follow-up discussion showed understanding of the feedback and identified practice areas:

- TypeScript boundary parsing with `unknown` and narrowing is a practice gap.
- Writing TypeScript utility code without compiler support is a weak point worth training.
- The distinction between building config and validating/parsing config became clearer.
- More context is sometimes needed to decide what is trusted input versus already-validated input.
- Component contract naming and benchmark scope feedback was understood.

## Decision

Move forward instead of rewriting the submission.

For baseline and training submissions, the repo should preserve:

1. the assignment,
2. the original submitted answer,
3. the review and score,
4. the user's response or understanding,
5. the next training focus.

Back-and-forth correction should happen when there is disagreement, confusion, or when the work is real project code that needs to be production-ready.

## Next Focus

Cycle 001 Day 02 should focus on type-safe boundary parsing:

- `unknown` input
- narrowing helpers
- runtime guards
- clear config errors
- discriminated union output
- tests for invalid runtime input
