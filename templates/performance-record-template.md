# Performance experiment

- Assignment / PR / language / runtime / platform:
- Baseline and candidate commits:
- Workload, input sizes, seed, and expected output:
- Hypothesis and measurement chosen:

## Preserve correctness

Record the same expected observations on baseline and candidate, including relevant edge cases. Keep generation/setup outside the timed region unless setup is the subject of the experiment. A faster wrong result is a failed experiment.

## Compare

| Input size | Baseline samples | Candidate samples | Median / slow tail | Memory or allocation observations |
|---|---|---|---|---|
| | | | | |

State sample count, warmup, cold/warm distinction, process reuse, and noise. Separate CPU work, I/O, setup, and cleanup when relevant. Do not use a single stopwatch reading or a CI runtime difference as proof of an algorithm speedup.

## Interpret

- Time and space complexity, including the operations hidden by library calls:
- What the measurements support:
- What remains uncertain:
- Readability/security/behavior tradeoffs:
- Keep or reject the change, and why:

This measures program performance. Assignment lead time comes from CI and measures start commit to PR merge; keep the two meanings separate.
