# Cycle 001 — Day 04 Review

## Status

Submission merged, reviewed, and preserved as training history.

Day 04 was the first intentionally small helper rep after the Day 03 sizing correction. The scope was much better: one helper, one `.ts` file, tests included, and about one hour of work.

## PR

- PR: #16 — Cycle 001 Day 04
- Submission: `cycles/cycle-001/day-04-small-helper-rep/submission.ts`
- Time reported: exactly 1 hour
- Review style: GitHub review comments plus follow-up discussion

## Score

**Day 04 Score:** 76 / 100

| Area | Score | Notes |
|---|---:|---|
| Correct behavior | 17 / 25 | Happy paths worked; truthiness bug affected invalid missing-value behavior. |
| `unknown` handling | 13 / 15 | Direct runtime checks against `unknown`; no `any`. |
| Simplicity | 12 / 20 | Extra helper closures and mutable state made the helper more complex than needed. |
| Tests | 17 / 25 | Covered key happy paths and default behavior; missing number case exposed the main bug. |
| Tradeoff / communication | 17 / 15 | Strong bonus signal from calling out ordering concerns and pushing back thoughtfully. |

## What Went Well

- The exercise size was right.
- The submission stayed focused on one helper.
- The code used `unknown` without `any`.
- Tests were included in the same file.
- The final comment identified a real design concern around ordering.
- The user pushed back appropriately on review comments that were too rigid.

## Main Technical Feedback

The key bug was using truthiness to detect missing input:

```ts
if (!input && typeof defaultValue === 'boolean')
```

That treats `0`, `""`, and `NaN` like missing values. The intended behavior was to use the default only for `undefined` and `null`.

The safer check is:

```ts
input === undefined || input === null
```

## Review Adjustment

The review originally overemphasized that `defaultValue` should remain required because the prompt signature made it required.

After user pushback, that feedback was softened:

- making `defaultValue` optional is acceptable if intentional,
- optional default behavior does not require a larger ordering framework,
- the important issue is still the explicit null/undefined check instead of truthiness.

The user also pushed back on named errors. That instinct was valid: distinguishable runtime errors can help callers separate boolean parsing failures from other parsing failures.

The technical nuance is that this does not create a distinct runtime error:

```ts
type ParseBooleanError = Error;
throw Error("...") as ParseBooleanError;
```

That type alias is erased by TypeScript. A runtime-distinguishable error would need a custom class or a named `Error` instance.

This named-error nuance is recorded here, but it should not become a future lesson item unless it becomes relevant.

## Next Focus

Continue with small TDD-style reps.

Day 05 should stay small and focus on one of:

- fixing truthiness vs explicit checks,
- parsing one primitive value,
- writing one targeted failing test before implementation,
- simplifying control flow without adding abstraction.
