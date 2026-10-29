# C002-F02 — Parse a small runtime boundary

Kind: **fluency** · Language: **TypeScript** · Appetite: **45 minutes** · One PR.

## Learning direction

When ready to begin, run this yourself from a clean checkout on `main`, before studying:

```sh
npm run assignment:start -- C002-F02 fluency
```

The coach provides this command without running it. If this attempt already has a branch and start commit, keep them instead of starting again. Copy the printed metadata into this assignment's PR. See the [assignment workflow](../../../docs/assignment-workflow.md) for prerequisites and recovery.

Read [TypeScript Narrowing](https://www.typescriptlang.org/docs/handbook/2/narrowing.html), specifically truthiness, discriminated unions, and exhaustive handling. Read [Zod Basic usage](https://zod.dev/basics), defining schemas and handling errors, to recognize the existing tool; this first attempt uses small manual checks so the runtime proof is visible.

Study `{attempts: 0, enabled: false}`. Which checks establish the types without incorrectly rejecting either value?

## Build

Receive an `unknown` value and return either accepted `{attempts:number, enabled:boolean}` data or a useful validation result. `attempts` must be an integer from 0 through 5; `enabled` must be a boolean. Both fields are required. Unknown fields are rejected. Reject arrays and null. Do not coerce strings or mutate the input.

Concrete examples:

- `{attempts:0, enabled:false}` and `{attempts:5, enabled:true}` succeed.
- Missing `attempts`, `attempts:-1`, `attempts:1.5`, and `attempts:"2"` fail.
- `enabled:"false"`, null, and an array fail.
- An extra `role:"admin"` field fails.

Keep domain calculation separate from this boundary. No parser framework or generic schema DSL is needed. Add tests for the distinct ways a plausible implementation could be wrong.

## Review and repeat

Explain why a cast or a truthiness check is insufficient. In a later, separate PR, satisfy the same contract with Zod; compare error handling, dependency cost, and clarity. Keep the contract fixed so the comparison teaches library choice instead of changing the problem.
