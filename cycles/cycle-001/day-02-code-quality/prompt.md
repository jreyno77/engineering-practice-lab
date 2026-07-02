# Cycle 001 — Day 02 Code Quality and Fundamentals

## Purpose

Day 02 focuses on type-safe boundary parsing.

The goal is to practice taking untrusted runtime input and turning it into a safe domain type without using `any` or pretending compile-time types can validate external data.

## Learning Direction

Before starting, spend 20–30 minutes reviewing these concepts:

- TypeScript `unknown` vs `any`
- Type narrowing with `typeof`, `in`, and small predicate functions
- Discriminated unions
- Runtime validation at system boundaries
- Clear error messages for invalid configuration input

Use these resources first:

1. TypeScript Handbook — Narrowing  
   https://www.typescriptlang.org/docs/handbook/2/narrowing.html

2. TypeScript Handbook — Everyday Types  
   https://www.typescriptlang.org/docs/handbook/2/everyday-types.html

3. Parse, don’t validate — Alexis King  
   https://lexi-lambda.github.io/blog/2019/11/05/parse-don-t-validate/

Suggested YouTube search topics:

- `TypeScript unknown vs any`
- `TypeScript type guards explained`
- `TypeScript discriminated unions explained`

Suggested search terms:

- `TypeScript unknown type narrowing`
- `TypeScript discriminated unions narrowing`
- `TypeScript user defined type guards`
- `parse don't validate TypeScript`

The point is not to copy a library pattern. The point is to understand the boundary: external input starts as unknown, then your code proves enough about it before constructing a safe value.

## Public Repo Safety

Use only generic examples. Do not include private work details, internal project names, private URLs, headers, logs, screenshots, domain-specific examples, or anything that could connect this exercise to a real employer or client system.

## Assignment

Create a submission file at:

```txt
cycles/cycle-001/day-02-code-quality/submission.md
```

Answer all parts below.

---

## Part 1 — Refactor with Runtime Guards

You are given this TypeScript function:

```ts
export function createConnectionOptions(input: any) {
  return {
    mode: input.mode || "local",
    enabled: input.enabled === true || input.enabled === "true",
    retries: input.retries ? Number(input.retries) : 3,
    endpoint: input.endpoint,
  };
}
```

Refactor it into a safer version.

Requirements:

1. The public boundary must accept `unknown`, not `any`.
2. The final output must be a discriminated union:

```ts
type LocalConnectionOptions = {
  mode: "local";
  enabled: boolean;
  retries: number;
};

type RemoteConnectionOptions = {
  mode: "remote";
  enabled: boolean;
  retries: number;
  endpoint: string;
};

type ConnectionOptions = LocalConnectionOptions | RemoteConnectionOptions;
```

3. Remote mode must require a non-empty endpoint.
4. Local mode must not include an endpoint.
5. Invalid retry values must produce a clear error.
6. Missing mode should default to `local`.
7. Do not use `any` in the final version.
8. Avoid unsafe casts unless you explain why the cast is contained and safe enough.

---

## Part 2 — Explain the Boundary

Write a short explanation covering:

1. What is the boundary in this function?
2. Why is `unknown` better than `any` here?
3. What rules are enforced at runtime?
4. What rules are enforced by the TypeScript type model?
5. What tradeoff did you make between strict validation and simple code?

---

## Part 3 — Test Plan

List the tests you would write.

Include at least:

- valid local config with defaults
- valid remote config with endpoint
- remote config missing endpoint
- invalid mode
- invalid retries, including `NaN`
- boolean parsing behavior
- ensuring local config does not return endpoint

You do not need to write a full test suite unless you want to. A precise test list is enough.

---

## Part 4 — Communication Drill

Rewrite this message so it is clear, short, and technically precise:

> We should just use any here because this is only config and TypeScript already knows what the shape is after we pass it around. Adding guards feels like extra code and probably does not matter.

Write one response that explains why boundary parsing is still useful without sounding dismissive.

## Expected Output

Submit:

```txt
cycles/cycle-001/day-02-code-quality/submission.md
```

## Review Criteria

You will be reviewed on:

- safe boundary handling
- use of `unknown`
- narrowing and runtime guards
- discriminated union design
- clear error handling
- testing judgment
- concise technical explanation
