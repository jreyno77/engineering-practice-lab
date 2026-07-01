# Cycle 001 — Day 01 Baseline Assessment

## Purpose

This baseline measures current senior-readiness across code quality, system design, product thinking, debugging, testing, and communication.

This is not a pass/fail test. It creates the starting point for the training cycle.

## Submission Instructions

Create a `submission.md` file in this directory and answer all three parts.

Use clear reasoning. Do not over-polish. The goal is to see your current default level.

---

## Part 1 — Code Review and Refactor

You are given this TypeScript function:

```ts
export function buildConfig(raw: any) {
  const config: any = {};

  config.mode = raw.mode || "local";
  config.retryCount = raw.retryCount ? Number(raw.retryCount) : 3;
  config.enabled = raw.enabled === "true" || raw.enabled === true;

  if (config.mode === "remote") {
    config.url = raw.url;
  }

  return config;
}
```

### Task

1. Identify the main risks in this implementation.
2. Refactor it into a more type-safe version.
3. Add a short explanation of your design choices.
4. List the tests you would write.

Constraints:

- Avoid `any` in the final version.
- Avoid unsafe casts unless you explain why one is unavoidable.
- Prefer readable code over clever abstractions.
- Guard untrusted input.

---

## Part 2 — Architecture Prompt

A VS Code extension supports local and remote CQL execution.

Current problems:

- UI state, file-system paths, and execution logic are mixed together.
- Remote execution needs URLs and headers.
- Local execution needs workspace paths and generated output locations.
- Test data can be large.
- Users need clear errors when configuration is invalid.

### Task

Write a short design note covering:

1. Problem summary
2. Proposed boundaries/components
3. Key contracts between components
4. Tradeoffs
5. Failure modes
6. Testing strategy

---

## Part 3 — Communication Prompt

Rewrite this message so it sounds like a concise senior engineer responding in a PR or Slack thread:

> Not quite, the data parts have been built that can be used for writing, but those can still be millions of lines of JSON and streaming those to a file does impact the performance. It saves seconds, but those seconds added up across all these MRs.

### Task

Write one version that is:

- clear
- short
- accurate
- not defensive
- technically precise

---

## Expected Output

Add your answer to:

```txt
cycles/cycle-001/day-01-baseline/submission.md
```

## Review Criteria

You will be scored on:

- Code quality/refactoring
- Type safety
- Architecture judgment
- Debugging/performance awareness
- Testing/reliability
- Communication/vocabulary
- Product/leadership judgment
