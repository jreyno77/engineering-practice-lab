# C002-R03 — Flatten decisions safely

Kind: **refactor** · Language: **TypeScript** · Appetite: **30 minutes** · One PR.

## Learning direction

Read [Replace Nested Conditional with Guard Clauses](https://refactoring.com/catalog/replaceNestedConditionalWithGuardClauses.html) and TypeScript's [control-flow analysis](https://www.typescriptlang.org/docs/handbook/2/narrowing.html#control-flow-analysis). Optional book: *Refactoring*, second edition, Chapter 10.

## Refactor

Use **RF-03** in [the refactoring catalog](../../../docs/refactoring.md#rf-03--flatten-decisions-without-changing-precedence). Preserve the anonymous, inactive, payment-required, and allowed results. Include the combined inactive-and-unpaid case, whose result must remain `inactive`.

Run those tests against the original nested version before changing it. Make the ordinary path easy to see while preserving precedence. Do not replace this small decision with a configurable rules system.

## Review and repeat

Explain which order of checks is part of the contract. On a later repeat add a resource that must be closed; verify early returns still respect cleanup. Keep that added behavior out of this first PR.
