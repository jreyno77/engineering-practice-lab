# Language and ecosystem fluency

Practice recognizing operations, not memorizing package names. First ask: “What capability do I need?” Then decide whether it belongs to the language, its standard/runtime library, or an external dependency. Use [the resource shelf](resources.md) for the exact readings.

## Run the smallest real test

Use the current runtime and lockfile when the project already exists. The commands below are bootstrap recipes for the learner, not claims that a Kotlin or .NET toolchain has already been installed or tested in this repository. If first-time setup needs a whole session, make it a `tooling` assignment with its own PR before starting the coding assignment. Keep a known-good scaffold for later reps instead of relearning setup each time.

**TypeScript:** from the repository root, install the locked dependencies once with `npm ci`. Save code as `submission.ts` and tests as `submission.test.ts` next to the chosen prompt. For C002-F01:

```powershell
npm run test:practice -- cycles/cycle-002/C002-F01/submission.test.ts
```

`test:practice` runs the new exercise convention. The original `npm test` command still runs preserved cycle-001 submissions, including their historical learning failures; do not rewrite those attempts just to make a new assignment green. Use [the Vitest 3 guide](https://v3.vitest.dev/guide/) that matches the installed major version.

**Kotlin/JVM:** with a compatible JDK and Gradle installed, create a fresh assignment subfolder, then use [Gradle Build Init](https://docs.gradle.org/current/userguide/build_init_plugin.html#sec:build_init_types), `kotlin-library` type. From that new empty folder:

```powershell
gradle init --type kotlin-library --dsl kotlin --project-name kotlin-practice --package lab --no-split-project
.\gradlew.bat test
```

Choose the installed compatible Java version when prompted. The generator supplies a wrapper, Kotlin test dependency, and sample test. Put exercise code/tests under the generated module's `src/main/kotlin` and `src/test/kotlin` directories, then replace the sample assertion with a meaningful example. Commit the wrapper and build files; record JDK/Kotlin/Gradle versions. On macOS/Linux run `./gradlew test`. If using IntelliJ's project wizard instead, choose Kotlin/JVM with Gradle and confirm the same terminal test works. See [Kotlin's JUnit/Gradle setup](https://kotlinlang.org/docs/jvm-test-using-junit.html) for test dependency and `useJUnitPlatform` details when adjusting an existing project.

**C#/.NET:** use an installed supported .NET SDK. From the repository root, the [SDK's xUnit template](https://learn.microsoft.com/en-us/dotnet/core/tools/dotnet-new-sdk-templates) provides a small test project for the entry rep:

```powershell
dotnet --info
dotnet new xunit --name C002Cs01.Tests --output cycles/cycle-002/C002-CS01/csharp
dotnet test cycles/cycle-002/C002-CS01/csharp/C002Cs01.Tests.csproj
```

Keep the tiny exercise class in that project initially; a separate production library is unnecessary for a one-function rep. Replace the generated placeholder with actual behavior checks. Record the selected SDK, target framework, and package versions; use a project `global.json` if a pinned SDK is needed. See [dotnet test](https://learn.microsoft.com/en-us/dotnet/core/testing/unit-testing-with-dotnet-test) before adding platform-specific options. Do not commit `bin`/`obj` output or count a passing generated empty test as completion.

## A capability map

| Need | TypeScript / Node starting point | Kotlin / JVM starting point | A small rep and its trap |
|---|---|---|---|
| Transform/filter a collection | Array `map`, `filter`, `flatMap`, `find`, `some`, `every` | `map`, `filter`, `mapNotNull`, `flatMap`, `firstOrNull`, `any`, `all` | Return the first matching record; do not process the whole collection unnecessarily. |
| Group, count, or look up | `Map`, `Set`; a small explicit loop | `groupBy`, `groupingBy().eachCount()`, `associateBy`, `getOrPut` | Count tags and index records; define duplicate-key behavior before choosing an API. |
| Sort by several fields | `sort` with a comparator on a copy, or `toSorted` if the configured runtime supports it | `sortedWith`, `compareBy`, `thenBy` | Sort score descending then ID ascending; avoid lexical number order and unintended mutation. |
| Optional values and variants | `undefined`, `unknown`, discriminated unions, exhaustive handling | nullable types, safe calls, Elvis, sealed hierarchies and `when` | Preserve `0` and `false`; do not collapse “missing,” “invalid,” and “empty.” |
| Queue, stack, or priority queue | Array with a head index for a simple queue; verify a maintained heap package if needed | `ArrayDeque`; JVM `java.util.PriorityQueue` | BFS and top-k; repeated array shifting or sorting may dominate large inputs. |
| Text and regular expressions | String methods, `RegExp`, `Intl`; understand UTF-16 | String methods, `Regex`; understand JVM string representation | Normalize an explicitly ASCII identifier; do not imply a simple regex solves every Unicode rule. |
| Paths, files, and streams | `node:path`, `node:fs/promises`, streams, readline | JVM `java.nio.file.Files`/`Path`, Kotlin I/O extensions and `use` | Read bounded lines and close resources on failure; distinguish path normalization from permission to access a path. |
| Time and duration | Monotonic `performance.now` for durations; explicit timestamp format | `kotlin.time`, JVM `java.time` | Compare UTC timestamps and durations; wall-clock adjustment must not corrupt a benchmark. |
| HTTP, timeouts, cancellation | Runtime `fetch`, `URL`, `URLSearchParams`, `AbortController` | Ktor client plus `kotlinx.coroutines`; JVM HTTP client is another option | Handle non-success status and cancellation; a request returning a response is not necessarily success. |
| JSON and runtime shape | `JSON.parse` plus manual checks for tiny boundaries; Zod for a richer schema | `kotlinx.serialization` plus domain checks | Decode `{count:-1}` successfully but reject it when the domain requires nonnegative count. |
| Database access | A driver such as node-postgres; parameterized values | JDBC or Exposed; transaction ownership | Search a name containing an apostrophe; neither string interpolation nor an ORM name is a security guarantee. |
| Tests and generated examples | Existing Vitest; fast-check for a useful property | `kotlin.test`/JUnit; a property-testing library when justified | Test deduplication idempotence and preservation of allowed values, not an implementation detail. |
| Diagnostics and benchmarks | Debugger, CPU profile, `node:perf_hooks` | IntelliJ debugger, JVM profiler, JMH | Separate input setup from the operation; test a bad hypothesis before optimizing. |

The map is a starting shortlist, not a mandate to install every library. `kotlinx.coroutines`, `kotlinx.serialization`, Ktor, Exposed, Zod, and database drivers are dependencies; being familiar names does not make them part of the core language. Java APIs listed here assume Kotlin/JVM, not all Kotlin targets.

## C# and .NET capability map

| Need | Starting point | A small rep and its trap |
|---|---|---|
| Filter, transform, group, join | LINQ `Where`, `Select`, `GroupBy`, `Join`, `OrderBy`/`ThenBy` | Explain deferred execution and materialization; enumerate once when repeated work or mutable input would change the result. |
| Count and lookup | `Dictionary<TKey,TValue>`, `TryGetValue`, `HashSet<T>`, explicit `StringComparer` | Count case-insensitive ASCII tags while keeping the chosen equality rule consistent. |
| Queue, stack, top-k | `Queue<T>`, `Stack<T>`, `PriorityQueue<TElement,TPriority>` | Use the correct priority direction; do not depend on unspecified tie ordering. |
| Model absence and alternatives | Nullable reference annotations, nullable value types, records, pattern matching | Handle an absent field separately from an invalid value; annotations provide static analysis, not a runtime firewall. |
| Parse text, numbers, dates | `TryParse` APIs, explicit culture, `DateTimeOffset`, `TimeSpan` | Parse a machine-format value consistently across machines without silently defaulting invalid input to zero. |
| Read files and streams | `System.IO`, `StreamReader`, `using`/`await using`, async I/O | Dispose resources on an exception; avoid loading an unbounded file into memory. |
| Compose and cancel I/O | `Task`, `Task.WhenAll`, `CancellationToken` | Propagate the caller's token and await owned tasks; a token is a cooperative request, not forced termination. |
| Make HTTP requests | `HttpClient`, handler lifetime, `IHttpClientFactory` when using a host | Avoid creating a new connection pool per request; define status, timeout, and body limits. |
| Decode and validate JSON | `System.Text.Json`, then explicit domain checks; ASP.NET Core validation at the hosting boundary | A decoded count of `-1` can still violate the domain; test null/missing fields explicitly. |
| Query a database | EF Core with a concrete database provider; parameterized APIs | Know where LINQ runs, project only needed columns, and inspect the executed SQL. |
| Test and measure | `dotnet test` with the chosen test framework; BenchmarkDotNet for a justified microbenchmark | Keep SDK/test-platform versions explicit; run performance experiments in Release configuration. |

LINQ, generic collections, tasks, HTTP, and System.Text.Json are provided by the .NET platform for supported target frameworks. EF Core, a test framework, and BenchmarkDotNet are added packages. Do not install an entire application framework to practice a dictionary or parser. Check target-framework availability before using a newer API.

## C# practice cards

Each card is one 30–60 minute assignment and one PR. Resource IDs refer to [resources](resources.md). Keep the entire C# block together; these are not mandatory translations of every earlier exercise.

| ID | Study | Contract and evidence |
|---|---|---|
| CS-F01 · tag counts | CS-1 and CS-2 article/video | Count ASCII tags case-insensitively: `["Build","build","Test"]` gives build=2/test=1, `[]` gives no entries. Choose the equality rule explicitly; compare an ordinary dictionary loop with a LINQ expression for clarity. |
| CS-F02 · deferred query | CS-2 and CS-9 | Select the first two positive values from a supplied enumerable, preserving order. For `[-2,4,0,7,9]` return `[4,7]`. Use an observed enumerable to show how much input is consumed and whether enumerating the returned result repeats work. Define snapshot versus live-view semantics before implementing. |
| CS-F03 · JSON boundary | CS-3, CS-6, and CS-7 | Decode a JSON record with required nonblank `id` and integer `count >= 0`. Accept zero; reject missing/null `id`, fractional or negative count, and malformed JSON. Return a deliberate error result; explain where deserialization ends and validation begins. |
| CS-F04 · cancellable read | CS-4 and CS-5 | Read one small JSON response through an injected/local HTTP boundary. Verify success, non-success status, and caller cancellation while a response is pending; do not contact public services in tests. State client ownership and show all owned work has settled. |
| CS-F05 · projected query | CS-8 and CS-9 | Return the three highest scores for one account, breaking ties by record ID. Seed two accounts and prove the other account is excluded. Use a local relational test database and inspect the SQL; an in-memory collection does not prove translation or database behavior. |
| CS-F06 · measured query | CS-2 and CS-10 | Starting with a correct collection query, compare repeated enumeration with an explicit snapshot, or compare a scan with an index. Keep output, ordering, and mutation behavior fixed; measure several sizes and disclose the memory/time tradeoff. |

## Make a small personal operation notebook

After a rep, record at most three operations:

```text
Need: count occurrences without retaining every item
API: groupingBy(...).eachCount()
Contract: result is a count per key; decide normalization before grouping
Pitfall: groupBy retains groups when I only need counts
Recall rep: same task with case-sensitive keys and empty input
```

Do not paste the whole documentation page. Keep one example, one caveat, and the source link. Add the missing operation you actually needed; prune entries that are already automatic.

## Choose a dependency deliberately

For a library comparison assignment, spend up to ten minutes answering: does the standard library already meet the contract; what repeated responsibility does the candidate remove; what happens on invalid input or cancellation; how does it affect runtime support, maintenance, licensing, and dependencies? Use the official docs and release information for the version you test. Then implement one tiny caller example and one failure example. A dependency decision can be “use the standard library.”

Avoid a general-purpose wrapper around an API until there is a concrete ownership or policy boundary. A library tour should leave a usable example and a judgment, not an unused abstraction.

## Practice tiers

**Tier 1 — know where to reach:** choose the right capability from the table and find the official API in two or three lookups. Exact signature recall is not required.

**Tier 2 — use it correctly:** solve a small problem while preserving ordering, nullability, ownership, and error behavior. Explain why a tempting alternative would differ.

**Tier 3 — compose it:** connect two capabilities, such as streaming and parsing or HTTP and cancellation, with a visible failure contract.

**Tier 4 — transfer:** solve a changed problem without re-reading the prior submission. Translate only the behavioral contract into another language, then choose that language's own idiom.

## Tool fluency reps

Treat each as a separate 15–30 minute assignment when useful: run one failing test from the terminal; set a conditional breakpoint; inspect a stack trace; rename a symbol with the IDE; find all callers; inspect a dependency's types/source; profile one expensive function; resolve one intentionally created local merge conflict. Record the command or shortcut and the observable result. Do not spend a whole coding session rebuilding the tool environment unless setup itself is the assignment.
