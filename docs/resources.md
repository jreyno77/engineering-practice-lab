# Learning resources

Start with the resources attached to the current assignment. This is a lookup shelf, not a list to finish before coding. Links were checked on 2026-10-29. Official documentation changes: select the version matching the repository lockfile, Node runtime, Kotlin plugin/JDK, or .NET SDK before copying an API example.

[Teach Yourself Computer Science](https://teachyourselfcs.com/) remains the foundation. Its algorithms, computer architecture, operating systems, networking, and database recommendations support this practical course. The sequence below is tailored to the current gap: recognizing an operation, choosing an existing tool, and implementing it fluently.

## TypeScript and JavaScript

| ID | Free resource and exact focus | Use it to practice |
|---|---|---|
| TS-1 | [TypeScript Handbook: Narrowing](https://www.typescriptlang.org/docs/handbook/2/narrowing.html), “Truthiness narrowing,” “Discriminated unions,” and “Exhaustiveness checking” | Explain what has actually been proved about an unknown value; preserve `0`, `false`, and empty strings when allowed. |
| TS-2 | [MDN: Map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map), “Objects vs. Maps,” iteration, `get`, `has`, and `set` | Count/group/index values without inventing a dictionary abstraction. |
| TS-3 | [MDN: Array.sort](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort), comparison function and mutating behavior | Sort numbers and compound records deliberately; preserve caller-owned inputs. |
| TS-4 | [Zod: Basic usage](https://zod.dev/basics), defining a schema, parsing, and handling errors | Compare a small manual parser with a schema library on the same contract; do not assume a TypeScript type validates JSON. |
| TS-5 | [Node: Readline](https://nodejs.org/api/readline.html), “Example: Read file stream line-by-Line” | Process a stream incrementally and identify who closes it. |
| TS-6 | [Node: Don't Block the Event Loop](https://nodejs.org/learn/asynchronous-work/dont-block-the-event-loop), “What code runs on the Event Loop?” and blocking examples | Recognize why `async` alone does not make CPU-heavy work cooperative. |
| TS-7 | [node-postgres: Queries](https://node-postgres.com/features/queries), “Parameterized query” | Keep SQL data separate from SQL syntax; distinguish values from identifiers. |
| TS-8 | [Vitest 3 guide](https://v3.vitest.dev/guide/), writing tests and command-line usage | Run one relevant file, read a failure, then run the regression suite. The existing lab uses Vitest 3. |

## Kotlin and JVM

| ID | Free resource and exact focus | Use it to practice |
|---|---|---|
| KT-1 | [Collections overview](https://kotlinlang.org/docs/collections-overview.html), collection types and the embedded List/Set/Map video by Sebastian Aigner | Choose a collection and explain read-only versus mutable views. |
| KT-2 | [Collection transformations](https://kotlinlang.org/docs/collection-transformations.html), `mapNotNull`, `associateBy`, and flattening; [Grouping](https://kotlinlang.org/docs/collection-grouping.html), `groupBy` versus `groupingBy().eachCount()` | Express a query directly and notice duplicate-key loss or unnecessary intermediate collections. |
| KT-3 | [Sequences](https://kotlinlang.org/docs/sequences.html), lazy execution and operation order | Predict which elements are visited, then measure whether laziness helps this workload. |
| KT-4 | [Coroutines basics](https://kotlinlang.org/docs/coroutines-basics.html), suspending functions, scope, and coroutine builders | Learn the language/library boundary and structure child work under an owner. |
| KT-5 | [Coroutines guide](https://kotlinlang.org/docs/coroutines-guide.html), follow “Cancellation and timeouts” and “Composing suspending functions” | Make cancellation propagate, avoid swallowing it, and observe cleanup. |
| KT-6 | [Serialization](https://kotlinlang.org/docs/serialization.html), “Get started” and JSON serialization overview | Learn `kotlinx.serialization` and separate decoded shape from domain validation. |
| KT-7 | [Ktor client: Making requests](https://ktor.io/docs/client-requests.html), URL components and request parameters | Use the client's encoding and lifecycle facilities instead of assembling URLs by hand. |
| KT-8 | [Exposed: Working with Transactions](https://www.jetbrains.com/help/exposed/transactions.html), create a transaction and accessing returned values | Understand transaction boundaries and the difference between blocking JDBC work and a suspend function. |

## C# and .NET

| ID | Free resource and exact focus | Use it to practice |
|---|---|---|
| CS-1 | [Microsoft: Selecting a Collection Class](https://learn.microsoft.com/en-us/dotnet/standard/collections/selecting-a-collection-class), the questions about key lookup, indexing, FIFO, and LIFO | Choose `Dictionary`, `HashSet`, `Queue`, or `Stack` from the operation rather than inventing a structure. |
| CS-2 | [Introduction to LINQ Queries](https://learn.microsoft.com/en-us/dotnet/csharp/linq/get-started/introduction-to-linq-queries), “Three Parts of a Query Operation” and query execution; [LINQ and IEnumerable video, Part 15](https://learn.microsoft.com/en-us/shows/csharp-for-beginners/language-integrated-query-linq-and-ienumerable-csharp-for-beginners) with Scott Hanselman and David Fowler | Predict when a query runs and why a second enumeration can repeat work. |
| CS-3 | [Nullable reference types](https://learn.microsoft.com/en-us/dotnet/csharp/fundamentals/null-safety/nullable-reference-types), annotations and null-state analysis | Explain static warnings separately from runtime input validation. |
| CS-4 | [Asynchronous programming with async and await](https://learn.microsoft.com/en-us/dotnet/csharp/asynchronous-programming/), composing the breakfast example; [Cooperative cancellation](https://learn.microsoft.com/en-us/dotnet/standard/threading/cancellation-in-managed-threads), the token/source pattern | Return owned tasks, propagate cancellation, and distinguish asynchronous I/O from CPU parallelism. |
| CS-5 | [HttpClient guidelines](https://learn.microsoft.com/en-us/dotnet/fundamentals/networking/http/httpclient-guidelines), pooled connections and recommended use | Decide who owns the client/handler, pass cancellation, and avoid recreating connection pools for every request. |
| CS-6 | [System.Text.Json deserialization](https://learn.microsoft.com/en-us/dotnet/standard/serialization/system-text-json/deserialization), the typed-object examples and defaults | Decode a small record and test missing, null, and unexpected properties explicitly. |
| CS-7 | [ASP.NET Core model validation](https://learn.microsoft.com/en-us/aspnet/core/mvc/models/validation), “Model state” and validation attributes | Distinguish parsing/binding from domain validation. This page covers MVC/Razor Pages; do not assume every other hosting model behaves identically. |
| CS-8 | [EF Core: Querying Data](https://learn.microsoft.com/en-us/ef/core/querying/), filtering and loading one result; [Efficient Querying](https://learn.microsoft.com/en-us/ef/core/performance/efficient-querying), projecting required properties and limiting results | Notice the database/provider boundary behind LINQ and inspect the executed query. |
| CS-9 | [Testing with dotnet test](https://learn.microsoft.com/en-us/dotnet/core/testing/unit-testing-with-dotnet-test), test-platform modes and linked CLI reference | Run an exact test project with its configured framework; choose arguments that match its SDK/test platform. |
| CS-10 | [BenchmarkDotNet: Getting started](https://benchmarkdotnet.org/articles/guides/getting-started.html), benchmark design, Release execution, and report output | Compare a LINQ query with an alternative while keeping setup, runtime, and result consumption explicit. |

## Algorithms, tools, and performance

| ID | Free resource and exact focus | Use it to practice |
|---|---|---|
| ALG-1 | [MIT 6.006, Spring 2020, lecture videos](https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-spring-2020/video_galleries/lecture-videos/): Lecture 1 “Algorithms and Computation,” Lecture 2 “Data Structures and Dynamic Arrays,” Lecture 4 “Hashing” | State a correctness argument and cost model before optimizing a lookup problem. |
| ALG-2 | [Same MIT course](https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-spring-2020/video_galleries/lecture-videos/): Lecture 3 “Sets and Sorting,” Lecture 8 “Binary Heaps” | Recognize when ordering or a priority queue changes the algorithm. |
| ALG-3 | [Same MIT course](https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-spring-2020/video_galleries/lecture-videos/): Lecture 9 “Breadth-First Search,” Lecture 10 “Depth-First Search,” Lecture 13 “Dijkstra” | Distinguish reachability, fewest edges, and minimum weighted cost. |
| ALG-4 | [Same MIT course](https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-spring-2020/video_galleries/lecture-videos/): Lecture 15 “Dynamic Programming, Part 1: SRTBOT, Fib, DAGs, Bowling” and Lecture 16 “Dynamic Programming, Part 2: LCS, LIS, Coins” | Define subproblems, recurrence, order, base cases, and reconstruction. |
| TOOL-1 | [MIT Missing Semester: Debugging and Profiling](https://missing.csail.mit.edu/2020/debugging-profiling/), free video and notes; focus on debuggers, CPU profiling, and memory profiling | Replace random edits with a hypothesis and one useful observation. |
| TOOL-2 | [MIT Missing Semester: Command-line Environment](https://missing.csail.mit.edu/2020/command-line/), free video and notes; job control and configuration | Shorten repeated test/debug loops. Its shell examples use Unix; translate the idea to PowerShell or use an existing Unix environment. |
| PERF-1 | [Node performance APIs](https://nodejs.org/api/perf_hooks.html), `performance.now`, marks, and measures | Time an operation separately from input generation, process startup, and I/O. |
| PERF-2 | [OpenJDK JMH](https://github.com/openjdk/jmh), Usage and Samples | Learn JVM warmup, forks, result consumption, and benchmark setup before claiming a small JVM speedup. |
| TEST-1 | [fast-check Quick Start](https://fast-check.dev/docs/tutorials/quick-start/), first property and reading counterexamples | Find an edge case using a meaningful invariant and preserve the failing seed. Add the library only for an exercise that needs it. |

For secure coding, use the ordered resources in [Security](security.md). For diagnosis and concrete transformations, use [Refactoring](refactoring.md). Those pages attach their references directly to exercises.

## The books already on your shelf

These are optional depth readings with a practical payoff, not required purchases. Match chapter **titles** if your edition differs. Videos and articles above remain the default starting point.

| Book | Specific reading | Why and when |
|---|---|---|
| Steven Skiena, [The Algorithm Design Manual, 3rd edition](https://www.algorist.com/) | The chapters on algorithm analysis, data structures, sorting, graph traversal, and dynamic programming; then the relevant problem entry in the algorithm catalog | Before the corresponding algorithm unit, learn to recognize the problem family and locate an existing implementation. Use the catalog as a tool-selection reference, not a second course to complete. |
| Bryant and O'Hallaron, [Computer Systems: A Programmer's Perspective, 3rd edition](https://csapp.cs.cmu.edu/3e/pieces/preface3e.pdf) | Chapter 5, especially 5.14 “Identifying and Eliminating Performance Bottlenecks”; Chapter 6, especially 6.2 “Locality” and 6.5 “Writing Cache-Friendly Code” | Weeks 4 and 8: distinguish an algorithmic gain, fewer allocations, and memory-access effects. C examples transfer conceptually; do not infer JVM/JavaScript timings from them. |
| Arpaci-Dusseau and Arpaci-Dusseau, [Operating Systems: Three Easy Pieces](https://pages.cs.wisc.edu/~remzi/OSTEP/) | Free chapters “Concurrency: An Introduction,” “Locks,” “Condition Variables,” and “Common Concurrency Problems” | Week 7: reason about ownership and interleavings before choosing coroutine or synchronization APIs. |
| Abelson and Sussman, *Structure and Interpretation of Computer Programs*, 2nd edition | Sections 1.2 “Procedures and the Processes They Generate,” 2.1 “Introduction to Data Abstraction,” and 3.1 “Assignment and Local State”; access through [Teach Yourself CS](https://teachyourselfcs.com/) | Explain recursion versus iteration, the value of a representation boundary, and when local state helps. One section at a time, paired with a current refactor. |
| Martin Kleppmann, *Designing Data-Intensive Applications*, 1st edition | Chapter 3 “Storage and Retrieval” and Chapter 7 “Transactions”; see [author's book site](https://dataintensive.net/) | Weeks 12 and 14: understand the behavior a database library cannot decide for you. Use section titles rather than these chapter numbers for another edition. |
| Martin Fowler, *Refactoring: Improving the Design of Existing Code*, 2nd edition | Chapters 1–4, then the named catalog entries selected in [the refactoring track](refactoring.md) | Learn the small-step discipline, smells, and safety checks. The free online catalog is enough to start; use the book for worked mechanics. |

For each reading, write one sentence from memory: “When I see ___, I can use ___, provided ___.” Then apply it. A bookmarked page or completed video alone is not evidence of fluency.
