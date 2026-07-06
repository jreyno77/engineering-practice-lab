# Cycle 001 — Day 03 Boundary Parser Rep

## Purpose

Day 03 is a smaller repeat of the Day 02 skill.

The goal is to practice parsing `unknown` input into a new trusted object without mutating or returning the raw input.

This is not meant to be a large coding assignment. Keep it tight.

## Learning Direction

Before starting, spend 15–20 minutes reviewing these resources:

1. TypeScript Handbook — Narrowing  
   https://www.typescriptlang.org/docs/handbook/2/narrowing.html

2. TypeScript Handbook — More on Functions, especially function signatures and optional parameters  
   https://www.typescriptlang.org/docs/handbook/2/functions.html

3. Parse, don’t validate — Alexis King  
   https://lexi-lambda.github.io/blog/2019/11/05/parse-don-t-validate/

Suggested YouTube search topics:

- `TypeScript unknown type guard tutorial`
- `TypeScript parse unknown object`
- `TypeScript discriminated union type guard`

Focus on the idea, not copying code: raw input comes in as `unknown`, your parser proves what it needs, then it creates a new clean output object.

## Public Repo Safety

Use only generic examples. Do not include private work details, internal project names, private URLs, headers, logs, screenshots, domain-specific examples, or anything that could connect this exercise to a real employer or client system.

## Assignment

Create a submission file at:

```txt
cycles/cycle-001/day-03-boundary-parser-rep/submission.md
```

Answer all parts below.

---

## Scenario

A small tool reads raw user preferences from a JSON file.

The raw input is untrusted and may come from a manually edited file.

You need to parse it into this trusted type:

```ts
type LightThemePreference = {
  theme: "light";
  fontSize: number;
  compact: boolean;
};

type DarkThemePreference = {
  theme: "dark";
  fontSize: number;
  compact: boolean;
  highContrast: boolean;
};

type ThemePreference = LightThemePreference | DarkThemePreference;
```

Rules:

- missing `theme` defaults to `light`
- `theme` must be `light` or `dark`
- missing `fontSize` defaults to `14`
- `fontSize` must be a finite number between `10` and `30`
- missing `compact` defaults to `false`
- `compact` may be a boolean or the strings `"true"` / `"false"`
- dark theme may include `highContrast`
- missing `highContrast` defaults to `false`
- `highContrast` may be a boolean or the strings `"true"` / `"false"`
- light theme output must not include `highContrast`

---

## Part 1 — Parser

Write:

```ts
export function parseThemePreference(input: unknown): ThemePreference
```

Constraints:

- no `any`
- do not mutate `input`
- do not return `input`
- construct a new `ThemePreference` object
- keep helper functions small
- explain any cast you use
- avoid libraries

---

## Part 2 — Intentional Tradeoff

Write a short note answering:

1. What did you intentionally keep simple?
2. What did you choose not to validate?
3. Why is that acceptable for this exercise?

This is where you should push back if the prompt asks for more than you think is valuable.

---

## Part 3 — Lean Test List

List only the tests you think are worth writing.

Do not list every possible case.

Your test list should be risk-based: enough to protect the important behavior without becoming busywork.

Include one sentence explaining why your list is enough.

---

## Part 4 — Communication Drill

Rewrite this response so it is clear, direct, and not defensive:

> I didn’t write all the test cases because I think that is overkill and not worth it for this tiny thing.

Your version should explain the tradeoff professionally.

## Expected Output

Submit:

```txt
cycles/cycle-001/day-03-boundary-parser-rep/submission.md
```

## Review Criteria

You will be reviewed on:

- parsing from `unknown` into a new object
- avoiding mutation of raw input
- small narrowing helpers
- clear defaulting behavior
- reasonable runtime validation
- intentional tradeoff explanation
- lean risk-based testing judgment
- concise communication
