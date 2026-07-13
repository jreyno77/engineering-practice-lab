# Cycle 001 — Day 06 Architecture Lifecycle Rep

## Learning Direction

Day 05 explored the architecture broadly. Day 06 narrows the problem to one senior design skill: defining lifecycle states and transition rules before implementation.

The goal is not to invent more components. The goal is to make the behavior unambiguous.

## Timebox

30–45 minutes.

## Prompt

Design the lifecycle contract for a result download/export object.

Assume the object may:

- create a temporary backing file,
- write a large result,
- export to a caller-provided target,
- be cancelled,
- fail,
- be cleaned up.

Create a submission at:

```txt
cycles/cycle-001/day-06-architecture-lifecycle/submission.md
```

## 1. Choose the States

Choose the smallest useful set of states. Do not use every possible state unless each one changes legal behavior.

For each state, write one invariant that must be true.

Example format:

```txt
State: ready
Invariant: the complete backing file exists and may be exported.
```

## 2. Complete the State Table

Define what each operation does from every state.

Use one of these outcomes in each cell:

```txt
allowed -> next state
no-op
returns cancelled
returns error
throws contract error
queued
```

Complete this table using your chosen states:

```txt
State       write()       exportTo()       cleanup()       cancel()
...
```

## 3. Make Five Explicit Decisions

Answer decisively:

1. Is cleanup final?
2. Can export create or regenerate a missing backing file?
3. Can write, export, and cleanup run concurrently?
4. Is cancellation a terminal state or may the operation be retried?
5. Are operational failures returned, thrown, or both?

For each decision, include one consequence of that choice.

## 4. Prove Three Difficult Paths

Describe the exact state transitions and file cleanup for:

- cancellation after a partial backing file exists,
- failure after a partial target file exists,
- cleanup requested while export is running.

## 5. Name the Five Highest-Value Tests

Each test must prove a lifecycle transition or invariant, not merely that a component method was called.

Use:

```txt
Test:
Transition/invariant proved:
Bug prevented:
```

## 6. Caller Contract

Write the smallest public contract the caller needs to understand.

The caller should not need to know internal temp-file details. State what the caller may call, what outcomes it receives, and what it must not do.

## 7. Final Architecture Summary

Write 4–7 sentences describing the chosen lifecycle as though you were asking a team to approve the design.

## Mini Code-Quality Refresh

Answer in one or two sentences:

```ts
function parseLimit(input: unknown, fallback: number): number {
  if (!input) return fallback;
  if (typeof input !== 'number') throw new Error('Invalid limit');
  return input;
}
```

What contract bug exists, and what explicit condition should replace it?

## Scoring

| Area | Points |
|---|---:|
| State choice and invariants | 20 |
| Transition-table completeness | 25 |
| Decisive lifecycle choices | 20 |
| Cancellation/failure/cleanup paths | 15 |
| Risk-based tests | 10 |
| Caller contract | 5 |
| Communication | 5 |

**Total: 100**

Main criterion:

> Can another engineer implement the lifecycle without making new policy decisions inside the code?
