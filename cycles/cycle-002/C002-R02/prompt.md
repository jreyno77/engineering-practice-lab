# C002-R02 — Remove meaningless wrappers

Kind: **refactor** · Language: **TypeScript** · Appetite: **30 minutes** · One PR.

## Learning direction

When ready to begin, run this yourself from a clean checkout on `main`, before studying:

```sh
npm run assignment:start -- C002-R02 refactor
```

The coach provides this command without running it. If this attempt already has a branch and start commit, keep them instead of starting again. Copy the printed metadata into this assignment's PR. See the [assignment workflow](../../../docs/assignment-workflow.md) for prerequisites and recovery.

Read [Inline Function](https://refactoring.com/catalog/inlineFunction.html) and compare it with [Extract Function](https://refactoring.com/catalog/extractFunction.html). Optional book: *Refactoring*, second edition, Chapter 6. The lesson is choosing a useful boundary, not always making more functions.

## Refactor

Use **RF-02** in [the refactoring catalog](../../../docs/refactoring.md#rf-02--remove-a-layer-that-says-nothing). Characterize `remaining(10,3) → 7`, `remaining(10,10) → 0`, and `remaining(3,5) → -2`. Simplify the call path without changing any result or the public operation.

Keep the negative case: clamping is a behavior change and does not belong in this cleanup. Explain a concrete responsibility that would justify keeping a wrapper in another context.

## Review and repeat

Show the caller before and after. On a delayed repeat, have the coach add a real policy or compatibility obligation to one wrapper; identify which wrapper should remain. Submit that independently.
