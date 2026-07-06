# Cycle 001 — Day 03 Review

## Status

Submission merged, reviewed, and preserved as training history.

Day 03 confirmed that the boundary-parsing skill is still important, but also showed that the exercise size was too large for a daily rep.

## PR

- PR: #13 — Cycle 001 Day 003
- Submission markdown: `cycles/cycle-001/day-03-boundary-parser-rep/submission.md`
- Submission code: `cycles/cycle-001/day-03-boundary-parser-rep/submission.ts`
- Review style: GitHub review comments plus process adjustment

## Score

**Day 03 Technical Score:** 58 / 100

The process and judgment signal was stronger than the technical score. The user stopped, named the scope problem, and still submitted runnable code and tests instead of hiding the struggle.

| Area | Score | Notes |
|---|---:|---|
| Parsing from `unknown` | 8 / 15 | Outer object check was present, but the parser still leaned on validating a copied object. |
| New clean object construction | 7 / 20 | Input was copied before defaults, but the returned value could still leak raw fields or unparsed values. |
| Narrowing helpers | 9 / 15 | Helpers were split up and tested, but they tried to prove final domain objects too early. |
| Defaulting behavior | 7 / 15 | Light defaults worked; dark `highContrast` defaulting was incomplete. |
| Runtime validation | 8 / 15 | Used `Number.isFinite` and range checks; string booleans still needed conversion before return. |
| Tests / TDD behavior | 12 / 15 | Strong improvement: added Vitest and wrote tests while working. |
| Communication / process feedback | 7 / 10 | Clearly identified the exercise was too large and requested smaller targeted reps. |

## Key Feedback

- The assignment was too large for a daily exercise.
- Future daily exercises should be smaller and more targeted.
- Runnable `.ts` / `.kt` exercises with tests are preferred over large mixed written/code prompts.
- The parser should parse fields into local variables, then construct a new clean object.
- String booleans should be converted into real booleans before returning.
- Extra raw input fields should not leak out of the parser.
- Dark theme should default missing `highContrast` to `false`.
- Error handling should stay simple for now; `throw new Error(...)` is enough.

## User Feedback

The user wrote that the exercise took about three hours, was not finished, and was too much for a daily exercise.

They asked for targeted smaller exercises, possibly quiz/check-in/test style, and preferred creating a `.ts` file or `.kt` file with tests included. That format better reinforces TDD principles while keeping daily practice manageable.

## Coaching Adjustment

Future daily assignments should usually be one small runnable rep, not a broad multi-part exercise.

Preferred daily exercise shape:

1. one small helper or parser slice,
2. one `.ts` or `.kt` file,
3. tests included or required,
4. 30–60 minute scope,
5. short optional written explanation only when useful.

Longer exercises should be explicitly labeled as longer assignments and should ask for readiness before starting.

## Next Focus

Day 04 should be much smaller:

- one helper function,
- tests first or alongside implementation,
- no broad parser,
- no long written response,
- focus on converting unknown input into one trusted primitive value.
