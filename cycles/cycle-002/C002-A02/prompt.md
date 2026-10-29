# C002-A02 — Keep a valid moving window

Kind: **kata** · Language: **TypeScript** · Appetite: **45–60 minutes** · One PR.

## Learning direction

When ready to begin, run this yourself from a clean checkout on `main`, before studying:

```sh
npm run assignment:start -- C002-A02 kata
```

The coach provides this command without running it. If this attempt already has a branch and start commit, keep them instead of starting again. Copy the printed metadata into this assignment's PR. See the [assignment workflow](../../../docs/assignment-workflow.md) for prerequisites and recovery.

Review the cost-model discussion in [MIT 6.006 Lecture 1](https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-spring-2020/video_galleries/lecture-videos/) and the lookup operations of [Map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map). Optional practice source: [Longest Substring Without Repeating Characters](https://leetcode.com/problems/longest-substring-without-repeating-characters/). This lab restricts input to ASCII so character encoding does not obscure the window invariant.

Study `"abba"`: after the second `b`, where may a valid span start? When the final `a` arrives, can that start move backwards?

## Build

Return the length of the longest contiguous span containing no repeated character. Input is an ASCII string; output is a nonnegative integer.

- `"" → 0`, `"a" → 1`, `"aaaa" → 1`.
- `"abba" → 2`, `"abcad" → 4`, `"pwwkew" → 3`.
- Spaces count as characters: `"a a" → 2`.

First explain a simple exhaustive approach. Write a clear invariant for any improved implementation. Compare small generated inputs with a simple independent oracle if useful; do not use the optimized function to generate expected results.

## Review and repeat

Explain why the window remains valid and how often each boundary advances. Record the missing concept if a hint was needed. A later rep returns the actual span with an explicit tie rule; do not add that output to this assignment.
