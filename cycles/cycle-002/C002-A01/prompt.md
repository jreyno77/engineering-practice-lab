# C002-A01 — Find a pair without reusing an element

Kind: **kata** · Language: **TypeScript** · Appetite: **45 minutes** · One PR.

## Learning direction

Watch the relevant part of [MIT 6.006 Lecture 4, Hashing](https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-spring-2020/video_galleries/lecture-videos/) and look up [Map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map). Optional owned reading: Skiena's algorithm-analysis and data-structure chapters. The external [Two Sum](https://leetcode.com/problems/two-sum/) problem is a variant; this lab also specifies no-match and tie behavior.

Before reading an answer, explain why `[3]` cannot satisfy target 6 while `[3,3]` can.

## Build

Receive a readonly integer list and an integer target. Values and their sums are within JavaScript's safe-integer range. Return two distinct indices `i < j` whose values sum to target, or no pair. Choose the smallest matching `j`, then the smallest `i` for that `j`. Preserve the input.

- `[3,3]`, target 6 → `[0,1]`.
- `[3]`, target 6 → no pair.
- `[5,1,5,1]`, target 6 → `[0,1]`.
- `[2,2,7]`, target 9 → `[0,2]`.
- `[-4,7,1]`, target 3 → `[0,1]`.
- `[]` → no pair.

Start with a straightforward correct approach, then choose whether a lookup structure improves it. Keep a small reference solution or explicit examples as a correctness oracle. Explain what is stored and when the current element becomes eligible.

## Review and repeat

State expected time and extra space, tie behavior, and the input constraint you relied on. A delayed repetition changes the requested answer to a boolean or pair of values; it is a new PR, not a rewrite of this attempt. Do not include an unrelated refactor in this PR.
