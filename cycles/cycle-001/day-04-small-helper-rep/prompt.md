# Cycle 001 — Day 04 Small Helper Rep

## Purpose

Day 04 is intentionally small.

The goal is to practice one boundary-parsing helper with tests. No broad parser. No long written response.

Target scope: 30–60 minutes.

## Learning Direction

Spend 10 minutes reviewing:

1. TypeScript Handbook — Narrowing  
   https://www.typescriptlang.org/docs/handbook/2/narrowing.html

2. Vitest — Writing Tests  
   https://vitest.dev/guide/

Focus on one idea: an `unknown` value should be converted into one trusted primitive value before the rest of the code uses it.

## Public Repo Safety

Use only generic examples. Do not include private work details, internal project names, private URLs, headers, logs, screenshots, domain-specific examples, or anything that could connect this exercise to a real employer or client system.

## Assignment

Create one file:

```txt
cycles/cycle-001/day-04-small-helper-rep/submission.ts
```

Write this helper and its tests in the same file:

```ts
export function parseBoolean(input: unknown, defaultValue: boolean): boolean
```

## Rules

- If `input` is `true`, return `true`.
- If `input` is `false`, return `false`.
- If `input` is the string `"true"`, return `true`.
- If `input` is the string `"false"`, return `false`.
- If `input` is `undefined` or `null`, return `defaultValue`.
- For any other value, throw an `Error` with a clear message.

## Constraints

- Do not use `any`.
- Do not use a type assertion unless you explain why it is safe.
- Do not use a library.
- Keep the implementation simple.
- Tests matter more than cleverness.

## Required Tests

Use Vitest.

Include tests for:

- boolean `true`
- boolean `false`
- string `"true"`
- string `"false"`
- `undefined` uses default
- `null` uses default
- invalid string throws
- number throws

You may add more tests if you think they are worth it, but do not turn this into a giant suite.

## Optional Short Note

At the bottom of the file, add a short comment if you intentionally reject or simplify anything.

Example:

```ts
// Tradeoff: I did not trim or lowercase strings because the accepted input format is intentionally strict for this helper.
```

## Expected Output

Submit:

```txt
cycles/cycle-001/day-04-small-helper-rep/submission.ts
```

## Review Criteria

You will be reviewed on:

- correct behavior
- clear tests
- use of `unknown`
- no `any`
- simple implementation
- clear error message
- avoiding unnecessary scope creep
