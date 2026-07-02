# Senior Readiness Scorecard

The Senior Readiness Score is a coaching metric. It estimates how closely the current work resembles senior-level engineering behavior. It is not a certification or a job title claim.

## Current Score

| Area | Weight | Current Score | Notes |
|---|---:|---:|---|
| Code quality/refactoring | 16% | 8 / 16 | Good instinct toward discriminated unions; needs stronger boundary parsing and `unknown` narrowing. |
| System design/architecture | 16% | 10 / 16 | Good separation direction; needs more explicit contracts and clearer component names. |
| Debugging/performance | 12% | 7 / 12 | Shows awareness; needs sharper distinction between assembly, streaming, and UI materialization costs. |
| Testing/reliability | 10% | 5 / 10 | Testing philosophy is reasonable; submitted test plans need clearer risk-based concrete cases when requested. |
| Product requirements → pitch shaping | 16% | 8 / 16 | Solid problem awareness; needs tighter structure and clearer boundaries. |
| Communication/vocabulary | 20% | 15 / 20 | Clear, direct writing is a relative strength; PR responses should stay shorter. |
| Leadership/product judgment | 10% | 8 / 10 | Strong judgment around preserving training history, moving forward after understanding feedback, and pushing back when review asks for too much. |

**Overall Senior Readiness:** 61 / 100

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
| Week 1 | Cycle 001 | 61 | Baseline | 🟡 Baseline / Steady | Boundary parsing and intentional tradeoffs |

## Review History

| Date | Cycle | Day | Score | Summary | Review Record |
|---|---|---|---:|---|---|
| 2026-07-01 | Cycle 001 | Day 01 baseline | 61 | Baseline submitted, reviewed, understood, and preserved as training history. | `cycles/cycle-001/day-01-baseline/review.md` |
| 2026-07-02 | Cycle 001 | Day 02 code quality | 55 | Boundary parsing improved from Day 01; review identified runtime proof gaps and recorded user disagreement on test-plan detail. | `cycles/cycle-001/day-02-code-quality/review.md` |
