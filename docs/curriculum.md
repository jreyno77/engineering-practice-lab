# The whole-lab curriculum

The goal is to translate an intended solution into clear, working code with less friction while continuing to grow across the full engineering role. This curriculum brings code katas, language fluency, algorithms, security, refactoring, architecture, communication, product shaping, debugging, testing, ownership, and real project work into one course. It expands the lab's existing [daily coaching loop](../training-loop.md).

**Start or resume through [the coaching session guide](coaching-session.md).** The coach selects and assigns the day's work, then waits for the learner to say it is submitted. Review uses the actual submitted PR before a score is recorded. This page supplies material for that conversation; it does not automatically start assignments, solve them, advance the cycle, or award scores. An already active assignment remains the starting point unless the learner changes direction.

The optional route has 16 instructional weeks. They are units, not deadlines: spread a week across more calendar time when needed. Use three to five 30–60 minute sessions per week. Reading is normally 10–20 minutes of a session; a full lecture is optional preparation and may need a separate session.

For a three-session week, choose one code kata, one current technical focus from the implementation map, and one broader engineering assignment from the companion map. Rotate that technical focus across fluency, algorithms, security, and refactoring over successive weeks. With four or five sessions, add a second technical focus and a delayed repeat or review follow-up. The two maps are coordinated menus, not two sets of work to complete in full. A day may contain several chosen assignments, but each gets its own PR and clock.

Keep one anchor language for several weeks: TypeScript for weeks 1–4, Kotlin for weeks 5–8, C# for weeks 9–12, then transfer in weeks 13–16. TypeScript is the default starting point because the lab already has runnable examples; move the entire C# block first if that is more useful. Do not translate every exercise into all three languages immediately; that multiplies work and can hide how each ecosystem wants to solve the problem.

## Distinct kinds of practice

| Track | What is practiced | Evidence |
|---|---|---|
| [Code katas](code-katas.md) | Repeatedly build a small piece of software behavior, choose examples, test it, and improve the implementation. These are recurring practice, not only interview problems. | Runnable behavior, tests, a short explanation, and a later variant. |
| [Language and ecosystem fluency](language-fluency.md) | Reach for the right language operation, standard API, or existing library. | A small caller example, a failure case, and an API lookup note. |
| [Algorithm drills](algorithms-performance.md) | Recognize a problem family, establish correctness, and reason about time/space. | An invariant or recurrence, edge cases, and a justified complexity claim. |
| [Security](security.md) and [refactoring](refactoring.md) | Prevent a vulnerability class or improve structure while preserving intended behavior. | An observed defect and defense, or unchanged characterization tests across a refactor. |
| [Broader engineering practice](engineering-practice.md) | Architecture, communication/disagreement, pitches, debugging, testing/reliability, and ownership decisions. | The specific reviewable output named in each E-card. |
| Progress-app project and adoption | Decide when practice work belongs in a product, then deliver an accepted small slice. | An adoption decision, production-intended code, and behavior verified through its real consumer. |

The reporting workflow may use `kata` for either a code kata or an algorithm exercise. Keep the catalog/assignment ID and practice focus in the submission so comparisons retain that distinction. A code kata is not automatically progress-app code; use the adoption step explicitly.

## Implementation map

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
| 16 · Transfer and retention | Solve an unfamiliar variant, diagnose unfamiliar code, and explain tool choice | Revisit only the pages missed during recall; [refactoring rotation](refactoring.md); [security review](security.md) | Choose an unseen algorithm, an unfamiliar refactor, a security fix, or a short pitch. If all four are selected, use four PRs across available sessions. Compare comparable earlier attempts and pick the next weak skill. |

## Code-kata and broader engineering companion map

Each row offers one recurring code kata and one broader engineering assignment alongside the technical choices above. The linked **K-card** and **E-card** contain the actual task, literal examples, and selected reading/video sections. The coach chooses a bounded variant and names its attempt ID before work begins. Repeats use new IDs/PRs while keeping prior attempts intact. The language shown is the anchor for coding; a design or communication artifact does not need a forced language rewrite.

| Week | Recurring code kata | Broader engineering assignment and reviewable output |
|---|---|---|
| 1 · TypeScript | [K-01 leap years](code-katas.md): first attempt, ordinary and century boundaries | [E-01 lifecycle contract](engineering-practice.md): state table, allowed/forbidden transitions, cleanup finality. Continue the pending Day 06 first when that remains the agreed next assignment. |
| 2 · TypeScript | [K-02 number labels](code-katas.md): precedence and overlapping rules | [E-02 boundary/ownership map](engineering-practice.md): callers, responsibilities, data ownership, and one failure path. |
| 3 · TypeScript | [K-03 basket total](code-katas.md): small pricing behavior with examples | [E-03 actionable PR review](engineering-practice.md): a small set of precise comments tied to observable risks and a clear next action. |
| 4 · TypeScript | [K-04 text number sum](code-katas.md): parsing, limits, and errors | [E-04 disagreement](engineering-practice.md): evidence, a proposed alternative, and the condition that would change the decision. |
| 5 · Kotlin | [K-03 basket total](code-katas.md): delayed transfer using Kotlin idioms | [E-05 product pitch](engineering-practice.md): problem, user story, appetite, boundaries, risks, and success criteria. C002-P01 is a ready starter alternative. |
| 6 · Kotlin | [K-05 word wrapping](code-katas.md): one line-width contract | [E-06 construction task](engineering-practice.md): one useful piece from an accepted pitch, its consumer contract, and literal acceptance examples. |
| 7 · Kotlin | [K-06 run-length encoding](code-katas.md): round-trip behavior and edge cases | [E-07 debugging](engineering-practice.md): reproducible symptom, narrowed cause, and a test that distinguishes the proposed fix. |
| 8 · Kotlin | [K-07 intervals](code-katas.md): membership/overlap boundaries | [E-08 performance investigation](engineering-practice.md): hypothesis, profile/measurement evidence, and a decision including an unsuccessful result if appropriate. |
| 9 · C# | [K-01 leap years](code-katas.md): delayed transfer with a changed range | [E-09 testing at the consumer boundary](engineering-practice.md): tests that observe the promised behavior and demonstrate that a plausible defect fails. |
| 10 · C# | [K-02 number labels](code-katas.md): a changed rule with explicit precedence | [E-10 reliability](engineering-practice.md): bounded failure/retry behavior and proof that a successful retry does not duplicate the effect. |
| 11 · C# | [K-03 basket total](code-katas.md): one changed pricing rule | [E-11 incident ownership](engineering-practice.md): evidence-led triage, mitigation, status communication, and recovery criteria. |
| 12 · C# | [K-08 inventory holds](code-katas.md): one hold/release lifecycle slice | [E-12 safe rollout](engineering-practice.md): staged delivery, observables, stop conditions, and rollback/recovery decision. |
| 13 · Chosen anchor | [K-05 word wrapping](code-katas.md): unseen boundary variant | [E-13 adoption decision](engineering-practice.md): adopt, reject, or adapt one kata result for the progress app, with concrete reasons. |
| 14 · Chosen anchor | [K-06 run-length encoding](code-katas.md): a changed input contract | [E-14 progress-app project slice](engineering-practice.md): one read-only screen using accepted scope and actual data. Start only after the needed pitch/adoption decisions; a kata completion alone does not authorize promotion. |
| 15 · Chosen anchor | [K-07 intervals](code-katas.md): delayed repeat without the old solution | [E-15 senior simulation](engineering-practice.md): a bounded tabletop decision across product, design, testing, rollout, and communication. Any implementation discovered during it becomes a separate assignment. |
| 16 · Chosen anchor | [K-08 inventory holds](code-katas.md): changed condition and review of state ownership | [E-16 retest and reflection](engineering-practice.md): compare actual evidence, identify one retained skill and one gap, and choose the next cycle's focus. |

Architecture, communication, and product judgment stay recurring subjects. Later cycles return to the E-cards with new constraints rather than treating one completed document as mastery. Testing and reliability are also practiced inside code work; their dedicated cards develop test choice and failure reasoning explicitly.

For project work, retain the existing [progress-app vision](progress-app/vision.md) and [adoption decision template](../templates/adoption-decision-template.md). Keep the product scope small enough to run and review. If a project slice cannot fit the normal appetite, the coach offers a smaller useful slice or explicitly schedules a longer assignment under the coaching rules.

## What one session looks like

1. Receive the coach's selected assignment, examples, resources, and appetite; clarify any material gap. When beginning it, create its start commit using [the PR workflow](assignment-workflow.md). Start the clock before assigned study; keep optional earlier study disclosed.
2. State the input, result, and two concrete examples. Spend a few minutes predicting the useful APIs before opening their docs.
3. Read the assigned section or video segment. Close it and explain the operation in your own words.
4. Write and run the smallest useful solution. Use docs normally for exact signatures. For an algorithm-learning rep, the assigned structure may be implemented deliberately; for an ecosystem rep, use the existing implementation.
5. Explain one tradeoff and one failure case. Submit one PR with the test command, resources used, assistance, and a short reflection.
6. Tell the coach the work is submitted and provide the PR. The coach reviews that actual attempt for the assigned outcome, then records feedback, score, understanding, and next action without erasing the original attempt.

If the 60-minute appetite expires, preserve the work and uncertainty in the same PR. Do not reset the clock, silently narrow the expected behavior, or combine it with another assignment to make the result look finished.

## Recall and transfer

Revisit an operation after roughly 2, 7, and 21 days. These intervals are a practical starting schedule, not a claim that they are optimal. First explain it without notes, then solve a changed input or constraint. A completed coding repetition gets a fresh assignment ID and PR; the original attempt remains intact.

A useful progression is: supported attempt → docs-only variant → delayed variant in the same language → occasional transfer to another language. Advance when two variants pass and you can explain the relevant contract. A fast copied solution does not establish recall; looking up an exact API spelling is normal professional work.

## AI during practice

Declare one mode in the submission: **independent** (docs allowed), **hinted** (questions or graduated hints), or **assisted** (generated code allowed). Start new fluency and algorithm patterns with a short independent attempt. Ask for a hint about the missing concept before a complete solution. After an assisted exercise, schedule a small docs-only transfer rep. Review AI-generated code as an exercise in its own right; label that mode so it is not compared with an independent implementation.

## Evidence of improvement

Keep PR elapsed time, optionally self-recorded active minutes, correctness, review findings, help used, and delayed recall together. The CI clock includes breaks, review, and queues. Compare the same task family, language, difficulty, and assistance mode; keep cohort size and unfinished attempts visible. Speed means less searching, fewer false starts, and a shorter path to a correct result. It should not come from removing meaningful tests or avoiding hard material.

The older cycle-001 submissions and scores remain historical evidence. This pathway does not claim those scores changed. The coach resumes from the latest actual assignment/review; the learner can explicitly change focus without rewriting earlier attempts or pretending an unfinished assignment was completed.
