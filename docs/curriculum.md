# A practical course in writing software

The goal is to translate an intended solution into clear, working code with less friction. This is an additional resource and exercise library for the lab's existing [daily coaching loop](../training-loop.md). Coaching can choose from it when generating each day's assignments while retaining architecture, pitches, communication, testing, simulations, and project work. The sequence below is optional: use it for a sustained implementation block or select individual reps based on current feedback.

The course has 16 instructional weeks. They are units, not deadlines: spread a week across more calendar time when needed. Plan three to five 30–60 minute sessions per week. A typical week has two language reps, one algorithm rep, and one security or refactoring rep. A pitch or communication assignment can replace a session. Reading is normally 10–20 minutes of the session; a full lecture is optional preparation and may need a separate session.

Keep one anchor language for several weeks: TypeScript for weeks 1–4, Kotlin for weeks 5–8, C# for weeks 9–12, then transfer in weeks 13–16. TypeScript is the default starting point because the lab already has runnable examples; move the entire C# block first if that is more useful. Do not translate every exercise into all three languages immediately; that multiplies work and can hide how each ecosystem wants to solve the problem.

## Course map

Resource IDs refer to the exact titles and sections in [the resource shelf](resources.md). Select two required items and at most one optional depth reading for a session. The exercise catalogs provide choices; completing every listed drill is not a weekly requirement.

| Week | Outcome | Study before practice | Separate assignment choices and evidence |
|---|---|---|---|
| 1 · TS collections | Count, group, find, and sort using existing APIs; explain ordering and mutation | TS-2 Map; TS-3 sort; ALG-1 Lecture 2 | Token counter; latest-record index; duplicate detection. Show empty input, repeated values, and preserved inputs. Begin [cycle 002](../cycles/cycle-002/README.md). |
| 2 · TS boundaries | Convert unknown input to a useful result without accidental coercion | TS-1 narrowing; TS-4 Zod; [SEC-01](security.md) | Manual boundary parser; separate schema-library comparison; [RF-01](refactoring.md). Reject one malformed input while accepting valid `0`/`false`. |
| 3 · TS I/O and async | Use streams and cancellation with explicit resource ownership | TS-5 readline; TS-6 event loop; TOOL-1 debugger section | Summarize bounded JSON-lines input; a separately scoped cancelled read; algorithm window drill A-03. Record error and cleanup behavior. |
| 4 · TS speed and diagnosis | Identify a bottleneck and improve it without changing the result | TOOL-1 profiling; PERF-1; optional CS:APP 3e §5.14 | Replace repeated linear lookup with an index; compare equivalent outputs and multiple input sizes; [RF-02/RF-03](refactoring.md) separately. |
| 5 · Kotlin collections | Solve familiar problems idiomatically and explain changed semantics | KT-1 (including video); KT-2 transformations/grouping; ALG-2 Lecture 3 | Port one week-1 behavior; count/group without materializing unnecessary lists; binary-search drill A-04. Explain `val` versus read-only versus immutable. |
| 6 · Kotlin boundaries and libraries | Decode data and enforce the domain contract using a small library surface | KT-6 serialization; KT-3 sequences; [SEC-02](security.md) | Decode one record; validate domain constraints; compare eager and lazy query; add a parameterized query in a separate assignment. |
| 7 · Kotlin concurrency | Own concurrent tasks and handle cancellation/failure deliberately | KT-4 coroutine basics; KT-5 cancellation; optional OSTEP concurrency chapters | Two-result aggregation; cancel one delayed operation and observe cleanup; [SEC-10](security.md) race exercise. Keep synchronization and security fixes separately reviewable. |
| 8 · Kotlin performance | Use a priority queue or a better representation when the problem needs it | ALG-2 Lecture 8; PERF-2 JMH samples; optional CS:APP 3e §§6.2, 6.5 | Top-k problem A-07; benchmark a collection pipeline; [RF-04/RF-05](refactoring.md) as separate reps. Include a workload where the “optimization” loses. |
| 9 · C# collections and LINQ | Express collection queries and know when they execute | CS-1 collections; CS-2 LINQ article/video; CS-9 test tooling | CS-F01 tag counts; CS-F02 deferred query; port one binary-search contract. Explain a comparer, duplicate keys, and repeated enumeration. |
| 10 · C# boundaries | Decode JSON and enforce an explicit domain rule | CS-3 null-state analysis; CS-6 System.Text.Json; CS-7 validation | CS-F03 parser; [SEC-01/SEC-03](security.md); one [refactor](refactoring.md) in C#. Do not treat nullable annotations as a validator. |
| 11 · C# async and I/O | Compose tasks, cancel work, and own HTTP resources | CS-4 async/cancellation; CS-5 HttpClient; TOOL-1 | CS-F04 cancellable read; a separate task-composition failure case; a stack or heap algorithm. Observe task completion and cleanup. |
| 12 · C# data and performance | Inspect a real query and measure an optimization | CS-8 EF Core; CS-10 BenchmarkDotNet; optional DDIA 1e Ch.7 | CS-F05 projected database query; CS-F06 measured LINQ alternative; [SEC-02](security.md). Separate query semantics from in-memory LINQ behavior. |
| 13 · Graphs and transfer | Recognize graph structure and choose traversal from the requested answer | ALG-3 Lectures 9–10; relevant Skiena graph-traversal section | Reachability A-08; shortest unweighted route A-09; explain why sorting or a hash table alone cannot answer it. Use the language with the weaker recall. |
| 14 · Useful library composition | Combine a transport, parser, and data store without hiding their failure contracts | KT-7/KT-8, TS-7, or CS-5/CS-8 for the chosen language; optional DDIA 1e Ch.7 | One local HTTP read; one database operation; [SEC-03/SEC-06](security.md). Each is an independently testable slice, not a full web app. |
| 15 · Search and dynamic programming | Write a recurrence or search invariant and recover an actual answer | ALG-4 Lectures 15–16; relevant Skiena dynamic-programming chapter; TEST-1 | Backtracking A-10; coin change A-11; an invariant-based test. Keep the first working solution before optimization. |
| 16 · Transfer and retention | Solve an unfamiliar variant, diagnose unfamiliar code, and explain tool choice | Revisit only the pages missed during recall; [refactoring rotation](refactoring.md); [security review](security.md) | One unseen algorithm; one refactor with an unfamiliar smell; one security fix; one short pitch. Four PRs. Compare against comparable earlier attempts and pick the next weak skill. |

## What one session looks like

1. Choose one assignment and create its start commit using [the PR workflow](assignment-workflow.md). Start the clock before assigned study; keep optional earlier study disclosed.
2. State the input, result, and two concrete examples. Spend a few minutes predicting the useful APIs before opening their docs.
3. Read the assigned section or video segment. Close it and explain the operation in your own words.
4. Write and run the smallest useful solution. Use docs normally for exact signatures. For an algorithm-learning rep, the assigned structure may be implemented deliberately; for an ecosystem rep, use the existing implementation.
5. Explain one tradeoff and one failure case. Submit one PR with the test command, resources used, assistance, and a short reflection.
6. Review for correctness, clarity, security, complexity, and newly learned vocabulary. Record understanding without erasing the original attempt.

If the 60-minute appetite expires, preserve the work and uncertainty in the same PR. Do not reset the clock, silently narrow the expected behavior, or combine it with another assignment to make the result look finished.

## Recall and transfer

Revisit an operation after roughly 2, 7, and 21 days. These intervals are a practical starting schedule, not a claim that they are optimal. First explain it without notes, then solve a changed input or constraint. A completed coding repetition gets a fresh assignment ID and PR; the original attempt remains intact.

A useful progression is: supported attempt → docs-only variant → delayed variant in the same language → occasional transfer to another language. Advance when two variants pass and you can explain the relevant contract. A fast copied solution does not establish recall; looking up an exact API spelling is normal professional work.

## AI during practice

Declare one mode in the submission: **independent** (docs allowed), **hinted** (questions or graduated hints), or **assisted** (generated code allowed). Start new fluency and algorithm patterns with a short independent attempt. Ask for a hint about the missing concept before a complete solution. After an assisted exercise, schedule a small docs-only transfer rep. Review AI-generated code as an exercise in its own right; label that mode so it is not compared with an independent implementation.

## Evidence of improvement

Keep PR elapsed time, optionally self-recorded active minutes, correctness, review findings, help used, and delayed recall together. The CI clock includes breaks, review, and queues. Compare the same task family, language, difficulty, and assistance mode; keep cohort size and unfinished attempts visible. Speed means less searching, fewer false starts, and a shorter path to a correct result. It should not come from removing meaningful tests or avoiding hard material.

The older cycle-001 submissions and scores remain historical evidence. This pathway does not claim those scores changed and does not require finishing all earlier architecture prompts before beginning implementation practice.
