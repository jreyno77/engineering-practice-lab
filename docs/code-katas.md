# Code katas: practice making working code

Code katas are a core part of the lab. Use a small, familiar problem to practice choosing examples, writing tests, implementing with language idioms, running feedback quickly, and improving the code. Return to the problem with a different constraint so those moves become easier to perform.

This guide is a separate track from [algorithm and interview practice](algorithms-performance.md). An algorithm exercise emphasizes recognizing a data structure, invariant, or complexity improvement. A code kata emphasizes the craft of implementing and changing a small program. A problem can serve either purpose, but the coach names the purpose before the attempt. Keep both in the training rotation.

## The coach assigns; the learner implements

The coach chooses a card, language, one practice constraint, and concrete examples for the day's assignment, using the latest reviewed work. The cards below are a source library, not completed work or a substitute for a daily prompt.

1. **Assign:** the coach gives the small task and learning direction, using [the assignment template](../templates/assignment-template.md). A first attempt has a 30–45 minute appetite, including a short reading.
2. **Wait:** the coach waits for your actual submission. It does not implement the solution, invent tests you supposedly wrote, mark the assignment complete, or award a score while waiting. Hints are available when requested and should be recorded.
3. **Submit:** you create the start commit before studying or coding, write the tests and implementation, and submit the assignment PR with the commands and observed results. Follow [the PR workflow](assignment-workflow.md).
4. **Review:** the coach reads the actual PR and its evidence, reviews correctness and technique, then records the score and specific next focus. An unrun check remains unverified; a failed case remains failed. Preserve the original attempt and your response to feedback.
5. **Repeat:** the coach chooses a later variation based on what the review exposed. It becomes another assignment and PR with its own clock, linked to the original.

Use `kind: kata` and an attempt ID such as `K-03-ts-r01`, `K-03-ts-r02`, or `K-03-csharp-r01`. Algorithm exercises may also use the existing `kata` metadata kind; their `A`/`C002-A` IDs and prompt identify that separate track. One pitch, one code kata, and three refactor assignments require five PRs. The tests, implementation, and reflection for one kata belong together in its single PR.

## Learning direction

For a first session, read the short TDD article and the relevant language reference. The other sources are useful for coaching or later rotations; they are not all required before coding.

| Resource | Specific part | Purpose |
|---|---|---|
| [Martin Fowler: Test Driven Development](https://martinfowler.com/bliki/TestDrivenDevelopment.html) | Test list, red–green–refactor, and the role of the public interface | Choose a useful first example and preserve time for refactoring. |
| [Emily Bache: Coding Dojo Handbook, free catalog extract](https://media.pragprog.com/titles/ebdojo/kata-catalogue.pdf) | “What is a Code Kata?” and “How to choose a good Kata for your dojo” | Understand repeated practice and vary the process, not just the final code. No purchase is needed for this extract. |
| [Coding Dojo catalog](https://codingdojo.org/kata/) | Leap Years and FizzBuzz for short practice; select one entry at a time | Find established kata families after this original starter rotation. The cards below define their own contracts. |
| [Emily Bache's Gilded Rose starter repository](https://github.com/emilybache/GildedRose-Refactoring-Kata) | “How to use this Kata”; then [Why Developers LOVE The Gilded Rose Kata](https://youtu.be/Mt4XpGxigT4), the author's linked video | Move from new implementation to characterization tests and small safe changes. TypeScript, Kotlin, and C# starters are available. Save worked solutions until after your own attempt. |
| [Coding Dojo Handbook: free Dojo Principles extract](https://media.pragprog.com/titles/ebdojo/dojo-principles.pdf) | “Slow Down,” “Learning Again,” and “Subjecting To A Master” | Use feedback and explanation while developing speed; a rushed finish is not the only useful result. |

Use the [language setup guide](language-fluency.md#run-the-smallest-real-test) to run one real test before the first kata in a new toolchain. For collection/string work, start with [MDN String methods](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String), [Kotlin collection operations](https://kotlinlang.org/docs/collection-operations.html), or [Microsoft's LINQ query introduction](https://learn.microsoft.com/en-us/dotnet/csharp/linq/get-started/introduction-to-linq-queries). Read the relevant method or execution section, not the whole API catalog.

## Practice cadence and constraints

The coach should normally include at least one code kata in a study week, alongside language/library, algorithm, security, refactoring, and design work. A day may have more than one assignment when the agreed time allows it. This is not a requirement to finish every card or open several clocks at once.

| Attempt | Constraint chosen before starting | What the review looks for |
|---|---|---|
| First | Documentation allowed; choose examples and test-drive a straightforward solution | Small useful tests, correct behavior, readable operations, and a working feedback loop. |
| Delayed repeat | Start with a blank implementation; previous solution closed; predict the useful APIs before checking signatures | Recall of the approach and language tools, with actual lookup/hint notes. |
| Library-aware repeat | Use the standard library when it expresses the contract; compare one tempting but unsuitable API | Correct ordering, duplicates, mutation, evaluation, and error semantics. Avoid custom versions of existing utilities without a reason. |
| Change/refactor repeat | Start from your preserved previous implementation; keep existing behavior tests and make one specified change | Safe edits, a clear boundary between new behavior and cleanup, and a smaller understandable diff. |
| Language transfer | Keep the examples but implement in the current TypeScript, Kotlin, or C# block | Idioms and runtime semantics of that language, rather than line-by-line translation. |

Choose **one** constraint per session. Revisit after roughly 2, 7, and 21 days where useful; the coach adjusts this based on recall. A pure code cleanup becomes a separate `refactor` assignment when assigned independently. Routine cleanup inside the kata's red–green–refactor loop stays in that kata PR.

A typical 40-minute session leaves 5 minutes for the test list, 25 for implementation/test cycles, 5 for cleanup, and 5 for reflection. These are practice budgets, not performance promises. If it remains incomplete, submit the real state and keep the original clock. Only shorten a personal timebox after correct, understood attempts; never drop an edge case to improve the time.

## Starter rotation

These are original small variants built around common kata techniques. They intentionally omit web servers, databases, UIs, and deployment. The examples describe observations, not supplied test implementations. You choose a small caller-facing API and write the tests yourself.

When a card names input preconditions, state them in the caller contract. Do not add a generic validation framework. When it explicitly requires rejection, choose and document one deliberate error/result shape before writing tests. Keep that choice consistent within the attempt.

### K-01 — Leap years in a range

**Appetite:** 30 minutes. **Focus:** example selection, boundary cases, a small predicate and collection operation. **Read:** [Coding Dojo's Leap Years](https://codingdojo.org/kata/LeapYears/) for the calendar rule; review the test-list section of Fowler's article above. This lab's range interface is the assignment.

Return the leap years in an inclusive range, in ascending order. Use the Gregorian divisibility rule: years divisible by 4 qualify, except centuries that are not divisible by 400. Inputs are integer years from 1 through 9999; reject a reversed range. Do not add historical country-specific calendar adoption rules.

| Input range | Expected result |
|---|---|
| 2000 through 2008 | `[2000, 2004, 2008]` |
| 1900 through 1900 | `[]` |
| 2000 through 2000 | `[2000]` |
| 2001 through 2003 | `[]` |
| 2100 through 2100 | `[]` |
| 2004 through 2000 | Rejected |

**Next attempts:** choose a different test order without changing the contract; then use the language's range/filter tools where appropriate. During a later library-comparison assignment, compare the predicate with the platform's calendar facility over the supported domain. Preserve the existing `leap-years-1` attempt; create a new attempt rather than rewriting that record.

### K-02 — Number labels with overlapping rules

**Appetite:** 30 minutes. **Focus:** overlapping conditions, simple control flow, meaningful tests. **Read:** [Coding Dojo's FizzBuzz](https://codingdojo.org/kata/FizzBuzz/) for the practice pattern; this card uses its own rules and outputs.

For a positive integer from 1 through 10000, return `"Quad"` if divisible by 4, `"Hex"` if divisible by 6, and `"QuadHex"` if both apply. Otherwise return its decimal digits. The result has no spaces or trailing newline. Input validation outside this integer domain is not part of the first attempt.

| Input | Expected result |
|---|---|
| 1 | `"1"` |
| 4 | `"Quad"` |
| 6 | `"Hex"` |
| 12 | `"QuadHex"` |
| 24 | `"QuadHex"` |
| 14 | `"14"` |

**Next attempts:** explain which test exposes a wrongly ordered `if/else`; later add a caller that labels a supplied list while preserving order and duplicates. Refactor an overly elaborate solution only after its behavior is characterized. A configurable rules engine is not a requirement.

### K-03 — Basket totals in integer cents

**Appetite:** 35 minutes. **Focus:** folds/aggregation, empty input, zero values, data ownership. **Read:** the aggregation section of the current language's collection reference; compare the relevant choices in [language fluency](language-fluency.md).

Given at most 100 prepared basket lines, return their total price in integer cents. Each line has `unitCents` from 0 through 100000 and `quantity` from 0 through 10, both integers. These bounds keep the total within a signed 32-bit integer. Do not mutate the input. Taxes, discounts, and floating-point currency are outside this first attempt.

| Lines, written as `(unitCents, quantity)` | Expected total |
|---|---|
| `[]` | `0` |
| `[(125, 2), (299, 1)]` | `549` |
| `[(500, 0), (0, 3)]` | `0` |
| `[(125, 1), (125, 1)]` | `250` |

**Next attempts:** solve using a clear loop, then an idiomatic aggregate in a separate attempt; compare clarity and allocation without claiming an unmeasured speedup. A later behavior-change assignment can add one explicit discount rule with new examples. A distinct refactor can separate that policy from aggregation.

### K-04 — A deliberately small text sum

**Appetite:** 40 minutes. **Focus:** parsing contracts, error cases, standard string operations. **Read:** the current language's split and numeric-parsing APIs; study how they handle empty fields and partial numeric input.

Accept an empty string or a comma-separated list of at most 100 decimal nonnegative integers, each at most 1000. ASCII spaces may surround each token. Leading zeroes are allowed; signs, decimal points, exponent syntax, empty tokens, tabs, and newlines are not. An empty string or a string consisting only of ASCII spaces returns 0. Reject the entire input if any token is invalid.

| Input | Expected observation |
|---|---|
| `""` or `"   "` | `0` |
| `"2, 10,0"` | `12` |
| `"007,3"` | `10` |
| `"1,,2"`, `"1,"`, or `",1"` | Rejected |
| `"-1,2"`, `"1.5"`, or `"1e2"` | Rejected |
| `"1001"` or a token containing a tab/newline | Rejected |

**Next attempts:** make the error identify the first invalid token's zero-based index, with an explicit new result contract; then separate decoding from summation while retaining those observations. Do not accidentally broaden the grammar by switching to a permissive parsing API. Add file input only as a later, separately assigned I/O exercise.

### K-05 — Wrap words without splitting them

**Appetite:** 45 minutes. **Focus:** accumulating state, boundary comparisons, readable string handling. **Read:** the current language's split/join behavior and collection-building APIs.

Return a list of wrapped lines. Input is empty or contains ASCII letters separated by ASCII spaces; collapse repeated/leading/trailing spaces. Width is an integer from 1 through 80. Add words in order with one separating space while a line fits. A word longer than the width stays intact on its own line. Do not split words or leave trailing spaces; whitespace-only input produces an empty list.

| Text and width | Expected lines |
|---|---|
| `"", 4` | `[]` |
| `"ab c def", 4` | `["ab c", "def"]` |
| `"abc de f", 4` | `["abc", "de f"]` |
| `"longword a", 3` | `["longword", "a"]` |
| `"  a   b  ", 3` | `["a b"]` |

**Next attempts:** characterize then simplify a tangled implementation; in a later language block accept a sequence of words while retaining a materialized list result. Unicode display width is a different problem and requires a separate contract and suitable existing tools; do not silently substitute character counts for rendered width.

### K-06 — Encode consecutive runs

**Appetite:** 35 minutes. **Focus:** state transitions, empty/singleton input, choosing the right collection operation. **Read:** the current language's iteration and grouping documentation; predict whether grouping preserves consecutive runs.

Given a string of zero to 100 uppercase ASCII letters, return consecutive runs as `(symbol, count)` records. Preserve run order. This first attempt assumes the caller supplies that restricted alphabet and does not define a compact serialized format.

| Input | Expected records |
|---|---|
| `""` | `[]` |
| `"A"` | `[("A", 1)]` |
| `"AAABBA"` | `[("A", 3), ("B", 2), ("A", 1)]` |
| `"ABAB"` | `[("A", 1), ("B", 1), ("A", 1), ("B", 1)]` |

**Next attempts:** identify why grouping all equal symbols would violate the contract; then add a separately assigned decoder for valid run records. Once both exist, preserve concrete examples and add a round-trip check; a round trip alone can hide matching encoder/decoder mistakes. Use a later refactor to clarify ownership of the current run.

### K-07 — Half-open interval overlap

**Appetite:** 30 minutes. **Focus:** precise boundaries, counterexamples, simple boolean logic. **Read:** the tests-first interface discussion in Fowler's article; use [refactoring RF-03](refactoring.md#rf-03--flatten-decisions-without-changing-precedence) only when simplifying already tested logic.

Given two prepared intervals `[start, end)` with integer bounds from 0 through 1000 and `start <= end`, report whether they share any values. The start is included; the end is excluded. Equal bounds describe an empty interval, which never overlaps anything. Inputs remain unchanged.

| Intervals | Expected overlap |
|---|---|
| `[1, 4)` and `[3, 5)` | `true` |
| `[1, 3)` and `[3, 5)` | `false` |
| `[1, 5)` and `[2, 4)` | `true` |
| `[3, 3)` and `[1, 5)` | `false` |
| `[0, 1)` and `[2, 3)` | `false` |

**Next attempts:** change test order and add the symmetry observation; later introduce an interval type only if it centralizes a useful invariant. Date/time-zone intervals are a separate assignment with platform date APIs, not a reason to build a calendar library here.

### K-08 — Hold and release a small inventory

**Appetite:** 45 minutes. **Focus:** a small stateful API, invariant checks, failure without mutation. **Read:** the current language's map/dictionary lookup and update APIs; pair with the ownership discussion in [refactoring RF-11](refactoring.md#rf-11--encapsulate-collection-ownership).

Create an in-memory inventory with an initial nonnegative integer capacity. `hold(id, quantity)` succeeds only for a currently unused nonempty ID, a positive integer quantity, and enough available units. `release(id)` restores the held quantity to availability exactly once; unknown IDs fail. Use a boolean success result for both operations. Reading available units never changes them. A released ID may be used again. Keep the initial capacity at most 100 for this exercise.

For capacity 3, test this exact observable sequence:

| Action | Result | Available afterward |
|---|---|---:|
| Read available | `3` | 3 |
| `hold("A", 2)` | `true` | 1 |
| `hold("A", 1)` | `false` | 1 |
| `hold("B", 2)` | `false` | 1 |
| `release("A")` | `true` | 3 |
| `release("A")` | `false` | 3 |
| `hold("A", 1)` | `true` | 2 |

Also test that holding 0 or a negative quantity fails without state change, and that two inventory instances do not share holds. This is a single-process exercise; it provides no distributed concurrency guarantee.

**Next attempts:** rebuild from a blank file using the language's idiomatic map API; then refactor tangled success/failure paths while preserving the observations. Database concurrency belongs in a separately assigned [security SEC-10](security.md#sec-10--keep-a-business-invariant-under-concurrency) rep, with its actual storage boundary tested.

## Review and the next assignment

Use the lab's [practice review](../templates/practice-review-template.md). The coach scores only after inspecting the submitted PR, taking the day's stated focus into account. Keep these observations explicit:

- **Correctness:** which promised examples pass, fail, or remain unverified; what a counterexample exposed.
- **Test craft:** useful examples and feedback, rather than test count or coverage percentage alone.
- **Implementation fluency:** appropriate language/library operations, clear caller contract, and lookup/hint needs.
- **Refactoring:** a demonstrated simplification that preserves the intended behavior; an explanation when no cleanup is worthwhile.
- **Speed with understanding:** elapsed CI time alongside optional active minutes, correctness, and the ability to explain the result.

The next prompt should target one observed gap. A fast memorized rewrite or an assistant-written solution does not establish independent fluency. The learner's actual code, review, and delayed variation provide that evidence.

Resources checked on 2026-10-29. This guide contains prompts and observations only; no learner solutions or scores have been generated.
