# Cycle 001 — Day 05 Architecture Rep

## Learning Direction

Today starts the system design / architecture skill area in the senior skill loop.

The senior move for this exercise is:

```txt
Separate behavior, ownership, and lifecycle before choosing code shape.
```

This is not an implementation exercise. The goal is to make the system understandable before making the code clever.

## Timebox

45–75 minutes.

Stop before this turns into a rewrite or a giant design doc.

## Prompt: Result Download Lifecycle Architecture

Design the next version of a result download/export pipeline.

The system needs to support:

- large result payloads,
- writing result files,
- exporting result files,
- cancellation,
- cleanup,
- failure handling,
- future result types,
- callers that should not need to manually manage too much lifecycle.

## Submission

Create:

```txt
cycles/cycle-001/day-05-architecture/submission.md
```

Do not include private employer, customer, project, URL, token, header, log, screenshot, or internal workflow details. Keep the scenario generic.

## Mini Refresh Quiz

Answer these first:

```txt
1. Why is `if (!input)` dangerous in boundary parsing?
2. If cleanup is final, what should write/export do after cleanup?
3. If cancellation happens after a partial target file is created, what must happen before returning?
```

## 1. Problem

Write 3–6 sentences.

Answer:

```txt
What is the actual architecture problem here?
Why is it hard?
Who pays the cost when the design is unclear?
```

Do not start with code.

## 2. Current Design Risk

Name the top 3 risks in the current shape.

Use this format:

```txt
Risk 1:
Why it matters:
Example failure:
```

Possible risks:

- unclear temp-file ownership,
- cleanup lifecycle confusion,
- cancellation not stopping heavy work,
- callers owning too much orchestration,
- errors being hidden or duplicated,
- export/write behavior overlapping.

Pick your own.

## 3. Proposed Architecture Shape

Sketch the design in words.

Include:

```txt
Main object(s)
Responsibilities
Who owns temp files
Who owns target files
Who owns cleanup
Who owns cancellation
Who reports errors
```

A simple diagram is enough.

Example:

```txt
Payload
  -> ResultDownloadPart
    -> backing file
    -> write/export operations
    -> cleanup
```

## 4. Lifecycle Contract

Define the lifecycle states.

Example states:

```txt
new
writing
ready
exporting
exported
cancelled
errored
cleaned
```

Then answer:

```txt
Which states are allowed?
Which transitions are allowed?
Which transitions are forbidden?
Is cleanup final?
Can export regenerate a missing backing file?
Can write/export/cleanup run concurrently?
```

This is the most important section.

## 5. Tradeoffs

Pick two tradeoffs.

Use this format:

```txt
Tradeoff:
What we gain:
What we lose:
Why this is acceptable:
```

Possible tradeoffs:

- throwing errors vs returning result objects,
- cleanup final vs cleanup allows regeneration,
- public helpers vs one owner object,
- immediate write vs lazy write during export,
- boolean cancel callback vs `AbortSignal`.

## 6. Testing Strategy

Do not list every possible test.

Pick the 5 most valuable tests for this architecture.

For each:

```txt
Test:
Why this matters:
Bug it would catch:
```

## 7. Rollout / Migration

Assume this touches real callers.

Answer:

```txt
Can this be changed safely in one PR?
What behavior must stay backward compatible?
What would you deprecate or remove later?
What would you watch after release?
```

## 8. Short PR Summary

Write the PR summary you would post if this design were implemented.

Sections:

```txt
Summary
Why
Testing
Risks
Follow-up
```

Keep it short.

## Scoring

100 points total:

| Area | Points |
|---|---:|
| Problem framing | 15 |
| Ownership boundaries | 20 |
| Lifecycle clarity | 25 |
| Tradeoffs | 15 |
| Testing strategy | 10 |
| Rollout thinking | 10 |
| Communication | 5 |

## Review Focus

The review will focus on whether you can make the system understandable before changing implementation details.

Main questions:

- Did you define ownership clearly?
- Did you define lifecycle states before proposing code shape?
- Did you name tradeoffs instead of hiding them?
- Did your tests target the riskiest behavior?
- Did you keep the design generic enough for the public repo?
