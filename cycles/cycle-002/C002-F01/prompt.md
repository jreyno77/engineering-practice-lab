# C002-F01 — Count and rank tokens

Kind: **fluency** · Language: **TypeScript** · Appetite: **40 minutes** · One PR.

## Learning direction

When ready to begin, run this yourself from a clean checkout on `main`, before studying:

```sh
npm run assignment:start -- C002-F01 fluency
```

The coach provides this command without running it. If this attempt already has a branch and start commit, keep them instead of starting again. Copy the printed metadata into this assignment's PR. See the [assignment workflow](../../../docs/assignment-workflow.md) for prerequisites and recovery.

Read [MDN Map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map), focusing on `get`, `has`, `set`, and iteration. Then read the comparator and mutation sections of [Array.sort](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort). Predict which two capabilities the task needs before opening the docs. Optional video: [MIT 6.006 Lecture 4, Hashing](https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-spring-2020/video_galleries/lecture-videos/).

Study this input: `["pear", "apple", "pear"]`. Explain the difference between the list's encounter order, a count lookup, and a ranked result. Do not write a general collection library.

## Build

Create a function receiving a readonly list of nonempty ASCII tokens, treated verbatim with case-sensitive equality. Return records `{word, count}` sorted by count descending, then token ascending by ASCII order for ties. Do not mutate the input. Input validation and case normalization are outside this rep's contract.

Concrete examples:

- `[]` returns `[]`.
- `["pear","apple","pear","banana"]` returns pear/2, apple/1, banana/1 in that order.
- `["z","a","z","a"]` returns a/2, z/2.
- `["constructor","constructor","toString"]` counts the literal keys correctly; do not silently normalize or alter these values.

Use the standard runtime collections; local mutation inside the function is allowed. Choose a clear public signature and tests. State the time/space cost in terms of word count and distinct-word count, treating string comparison cost explicitly if discussing long words.

## Review and repeat

Show that the input stays unchanged. Explain the equality/order rules, one API you looked up, and whether a loop or chained operation was clearer. After two days, repeat with a minimum-count filter in a new PR. After seven days, produce only the top three entries and discuss whether sorting all entries remains appropriate.
