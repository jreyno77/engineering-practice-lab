# Cycle 001 — Day 02 Review

## Status

Submission merged, reviewed, and discussed.

This review preserves both the feedback and the user's disagreement so the training record shows the actual coaching loop.

## PR

- PR: #10 — Cycle 001 Day 02 Submission
- Submission: `cycles/cycle-001/day-02-code-quality/submission.md`
- Review style: GitHub review comments plus follow-up discussion

## Score

**Day 02 Score:** 55 / 100

| Area | Score | Notes |
|---|---:|---|
| Boundary handling | 8 / 15 | Public input moved to `unknown`, but runtime proof was incomplete. |
| `unknown` usage | 10 / 15 | Correct direction; still relied too much on assertions. |
| Narrowing/runtime guards | 8 / 20 | Guards did not first prove non-null object shape and did not fully parse values. |
| Discriminated union design | 11 / 15 | Local/remote union was the right shape. |
| Error handling | 7 / 10 | Error direction was good; details need tighter parsing and clearer invalid-value handling. |
| Testing judgment | 4 / 15 | Philosophy was reasonable, but the submitted artifact did not list the requested concrete cases. |
| Communication | 7 / 10 | The core message was right but too long for a PR-style response. |

## Key Feedback

- Prove the input is a non-null object before reading properties or using `in`.
- Avoid using a type guard to assert that unknown input is already the final domain type.
- Parse into a new `ConnectionOptions` object instead of mutating and returning the original input.
- `false` is a valid boolean and should not fail validation.
- Store parsed numbers and check them with `Number.isFinite`.
- Remote endpoint validation should require a non-empty string.
- The submitted test-plan section should have listed the requested concrete cases.

## User Disagreement

The user disagreed with the testing comment.

The disagreement was not that tests are useless. The user pushed back against being expected to do exactly what the prompt or reviewer asks every time, especially when the requested detail feels like overkill or unnecessary code.

The clarified distinction:

> The testing philosophy is reasonable, but the submitted artifact did not satisfy the requested test-plan detail.

That distinction stands, but the disagreement is important. Senior-level judgment includes pushing back when requested work is too much, too rigid, or not valuable enough.

## Coaching Adjustment

Future reviews should separate:

1. assignment compliance,
2. engineering judgment,
3. production readiness,
4. intentional tradeoff or disagreement.

If the user intentionally chooses not to follow part of a prompt, the submission should say why. That turns non-compliance into an engineering tradeoff instead of an accidental omission.

## Next Focus

Continue with boundary parsing, but make the next exercise smaller and more focused:

- parse `unknown` into a new object,
- avoid mutation of untrusted input,
- keep runtime guards small,
- write a lean risk-based test list,
- explicitly explain any rejected requirement or tradeoff.
