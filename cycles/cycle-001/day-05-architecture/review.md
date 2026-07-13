# Cycle 001 — Day 05 Review

## Status

Submission merged, reviewed, and preserved as training history.

Day 05 moved the training loop from code-quality reps into system design and architecture. The exercise focused on lifecycle ownership for a result download/export pipeline.

## PR

- PR: #20 — Day 05 submission
- Submission: `cycles/cycle-001/day-05-architecture/submission.md`
- Review style: GitHub review comments plus chat follow-up

## Score

**Day 05 Score:** 58 / 100

| Area | Score | Notes |
|---|---:|---|
| Problem framing | 10 / 15 | Correctly named cohesion vs separation, ownership, testability, and changeability. |
| Ownership boundaries | 11 / 20 | Good instinct to reduce lifecycle leakage, but proposed responsibilities were still broad and exploratory. |
| Lifecycle clarity | 10 / 25 | Main gap: cleanup final, export regeneration, and concurrent write/export/cleanup were not reconciled. |
| Tradeoffs | 10 / 15 | Useful tradeoffs around cancellation tokens and manager-owned error handling. |
| Testing strategy | 6 / 10 | Tests targeted important areas but were too component-focused and less tied to lifecycle transitions. |
| Rollout thinking | 7 / 10 | Good instinct to split into PRs and protect callsites. |
| Communication | 4 / 5 | Clear intent, but the design needed more decisive choices. |

## What Went Well

- The submission focused on ownership and testability instead of jumping into implementation.
- It correctly identified the balance between cohesion and separation as the core architecture tension.
- It recognized cancellation and cleanup as high-risk parts of the design.
- It proposed reducing caller lifecycle responsibility through an `OutputManager` style boundary.
- It included rollout thinking and named backward-compatible behavior.

## Main Feedback

The main issue was not lack of ideas. It was lack of a firm lifecycle contract.

The submission allowed or implied all of these at the same time:

```txt
cleanup is final
export can regenerate a missing backing file
write/export/cleanup can run concurrently
```

Those can only all be true if the design adds a real state machine, lock, queue, or other coordination model. Without that, the lifecycle becomes ambiguous.

## Key Takeaway

Define the lifecycle first, then make every operation prove that lifecycle.

A stronger architecture document would start with a state table:

```txt
State       write()       exportTo()       cleanup()
new         allowed       allowed          allowed
writing     forbidden     forbidden        forbidden / queued
ready       no-op         allowed          final cleanup
exporting   forbidden     forbidden        forbidden / queued
cleaned     error/no-op    error/no-op      no-op
errored     retry?        retry?           cleanup allowed
cancelled   retry?        retry?           cleanup allowed
```

The exact table can change, but the design must choose it. Once the lifecycle is chosen, every branch in the implementation and every high-value test should prove one transition.

## Review Adjustment

This was a useful first architecture rep. The design thinking is present, but it is still too exploratory. The next architecture pass should be more decisive:

- choose the lifecycle states,
- choose which transitions are allowed,
- choose whether cleanup is final,
- choose whether export can regenerate backing files,
- choose whether concurrency is supported or forbidden,
- choose how errors are surfaced.

## Next Focus

Continue the senior skill loop.

The next primary area should be communication and disagreement.

Architecture should come back in a later cycle with a narrower prompt focused only on lifecycle state tables and transition rules.
