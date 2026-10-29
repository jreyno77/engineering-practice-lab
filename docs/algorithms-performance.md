# Algorithms and performance practice

The target is a reliable problem-solving process: recognize a structure, derive a correct solution, use an existing implementation when appropriate, and improve the measured bottleneck. Algorithm exercises and library-fluency exercises have different rules. Implementing a heap once can teach its invariant; using a tested priority queue in an application is often the useful engineering choice.

## Problem sequence

The examples are original lab contracts. The optional LeetCode links are external practice variants; preserve your own work and cite the problem instead of copying an editorial. Each row and each repeat is one PR, not a bundle. Resource IDs are in [resources](resources.md).

| ID / pattern | Small assignment and literal example | Study | Done when |
|---|---|---|---|
| A-01 · hashing | Return whether an ID repeats: `["b","a","b"] → true`, `[] → false`. Variant: [Contains Duplicate](https://leetcode.com/problems/contains-duplicate/). | ALG-1 L4; TS-2 or KT-1 | Correctness argument and expected time/space; compare with a simple scan on the same inputs. |
| A-02 · complement lookup | Return two distinct indices whose values sum to a target: `[3,3]`, target `6` → `[0,1]`; `[3]`, target `6` → no pair. Variant: [Two Sum](https://leetcode.com/problems/two-sum/). | ALG-1 L4; TS-2 | Define tie behavior, handle duplicates and no match, and never reuse one element. |
| A-03 · two pointers / window | Longest contiguous span of distinct ASCII characters: `"abba" → 2`, `"" → 0`. Variant: [Longest Substring Without Repeating Characters](https://leetcode.com/problems/longest-substring-without-repeating-characters/). | ALG-1 L1 cost model; TS-2 | Explain what the current window guarantees and why each boundary moves safely. |
| A-04 · binary search | First position at which `4` may be inserted into `[1,4,4,9]` is `1`; into `[]` is `0`. Variant: [Search Insert Position](https://leetcode.com/problems/search-insert-position/), whose distinct-input contract is narrower. | ALG-2 L3; sorted-collection API docs | State the interval invariant; test empty, duplicate, first, and past-end positions. |
| A-05 · stack | Match brackets in `"([])" → true`, `"([)]" → false`; reject characters outside `()[]{}`. Variant: [Valid Parentheses](https://leetcode.com/problems/valid-parentheses/). | ALG-1 L2; collection API | Keep nesting order, handle unmatched closings, and explain the stack's meaning. |
| A-06 · intervals | Merge closed intervals: `[[1,3],[3,5],[8,9]] → [[1,5],[8,9]]`; caller input must stay unchanged. Variant: [Merge Intervals](https://leetcode.com/problems/merge-intervals/). | ALG-2 L3; TS-3 | Define touching intervals, reject reversed ranges, and justify sorting plus scan. |
| A-07 · heap / top-k | Third largest value in `[9,2,9,4]` is `4` when duplicates occupy ranks; reject `k=0`. Variant: [Kth Largest Element in an Array](https://leetcode.com/problems/kth-largest-element-in-an-array/). | ALG-2 L8; priority queue docs | Compare sorting with a bounded heap and identify the useful `n/k` regime. |
| A-08 · DFS | Count connected components in vertices `{a,b,c,d}` with edges `{a-b,b-c}` → `2`. Variant: [Number of Islands](https://leetcode.com/problems/number-of-islands/). | ALG-3 L10 | Handle isolated vertices and cycles, avoid revisiting, explain recursion-depth risk. |
| A-09 · BFS | Fewest edges from `a` to `d` with `a-b,a-c,b-d,c-e,e-d` → `2`; unreachable → no route. Variant: [Rotting Oranges](https://leetcode.com/problems/rotting-oranges/) for multi-source BFS. | ALG-3 L9; later L13 for weighted edges | Explain why this answer is shortest and why arbitrary weighted edges change the algorithm. |
| A-10 · backtracking | Subsets of distinct `[1,2]` contain exactly `[],[1],[2],[1,2]`; ordering is not part of the contract. Variant: [Subsets](https://leetcode.com/problems/subsets/). | Skiena combinatorial-search chapter | Preserve independent result snapshots and state output-size cost honestly. |
| A-11 · dynamic programming | Minimum coins from `{1,3,4}` for `6` → `2`; `{2}` for `3` → impossible. Variant: [Coin Change](https://leetcode.com/problems/coin-change/). | ALG-4 L15–16 | Write state, recurrence, base cases, evaluation order, and complexity; show why greedy fails. |
| A-12 · mixed transfer | Choose an unseen variant of a prior family; write down two candidate approaches before coding. | Only the source for the gap you discover | Explain the discriminator, solve edge cases, and compare delayed recall with the earlier attempt. |

Progress from two supported examples to one unseen variant per pattern. Revisit a missed pattern later rather than grinding an arbitrary problem count. The advanced variant is optional; a solid invariant and a simple correct implementation are more useful than rushing to hard problems.

## A 45–60 minute algorithm session

Spend about five minutes clarifying examples and constraints, ten on a simple correct approach and its cost, twenty implementing and checking, then ten explaining and comparing. The remaining time is a hint or reflection buffer. If stuck, request the next useful question, then a pattern hint, then a partial worked example. Record what help was needed. Submit an incomplete attempt honestly if the appetite ends.

Before changing complexity, retain a simple oracle for small inputs when practical. Compare independently generated small cases against it. This is especially useful for a window boundary, interval merge, or dynamic-programming recurrence; do not use the optimized implementation to generate its own expected results.

## Performance experiments

Use a separate performance PR when optimization is the assignment. Keep the earlier correct solution and its tests as evidence.

1. State the workload and hypothesis: for example, repeated membership checks dominate a join, so constructing one index may help when the lookup count is high.
2. Freeze observable behavior: results, order, errors, mutation, and resource limits. Record the baseline commit.
3. Measure several input sizes and at least one unfavorable distribution. Keep data generation, compilation, installation, and process startup separate from the operation unless they are part of the claimed outcome.
4. Warm up the runtime, repeat measurements, consume results, and use the same machine/runtime/configuration. For JVM microbenchmarks use JMH's guidance; for .NET use BenchmarkDotNet in Release configuration; for Node use a monotonic timer and a profiler when attribution is unclear.
5. Save the actual samples and report units, sample count, a center and range/tail, memory observations where relevant, and exact before/after revisions. A single fast run or online judge percentile does not establish a speedup.
6. Check the unchanged behavioral examples again. Explain a tradeoff, such as extra memory for an index or sequence overhead for a small collection.

Suggested experiments: nested scan versus map lookup; sort-all versus top-k; eager Kotlin pipeline versus sequence with early termination; repeated LINQ enumeration versus a deliberate snapshot; whole-file processing versus bounded streaming. Each experiment is its own assignment. “No meaningful improvement” is a valid result.

Keep three clocks separate: **algorithm runtime**, **self-recorded active practice time**, and **CI first-commit-to-merge elapsed time**. They answer different questions. The [assignment workflow](assignment-workflow.md) reports the third and must not be used to claim that a particular algorithm became faster.
