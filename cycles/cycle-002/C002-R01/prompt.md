# C002-R01 — Extract a meaningful calculation

Kind: **refactor** · Language: **TypeScript** · Appetite: **30 minutes** · One PR.

## Learning direction

When ready to begin, run this yourself from a clean checkout on `main`, before studying:

```sh
npm run assignment:start -- C002-R01 refactor
```

The coach provides this command without running it. If this attempt already has a branch and start commit, keep them instead of starting again. Copy the printed metadata into this assignment's PR. See the [assignment workflow](../../../docs/assignment-workflow.md) for prerequisites and recovery.

Read [Extract Function](https://refactoring.com/catalog/extractFunction.html) and the “Two Hats” discussion in [Workflows of Refactoring](https://martinfowler.com/articles/workflowsOfRefactoring/). Optional book: *Refactoring*, second edition, Chapter 6's Extract Function entry.

## Refactor

Use the original **RF-01** receipt snippet in [the refactoring catalog](../../../docs/refactoring.md#rf-01--make-a-calculation-visible). First characterize the output for no items and for a 120-cent pen plus a 230-cent pad. Then make the calculation's meaning visible while preserving the exact strings, order, and input ownership.

Submit the starting snippet, preservation tests, and refactored version through the PR history. Do not add a new validation policy, formatting feature, or builder abstraction. Explain why the extracted name earns its place.

## Review and repeat

Record diagnosis time and transformation time if useful. After a week, use a similar calculation with two real callers and decide again whether extraction helps. That repeat gets a new ID and PR.
