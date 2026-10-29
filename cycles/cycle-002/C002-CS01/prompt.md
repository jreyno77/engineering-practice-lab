# C002-CS01 — Count tags with an explicit .NET comparer

Kind: **fluency** · Language: **C#** · Appetite: **45–60 minutes** · One PR.

This is an optional entry point for the C# block, not an extra translation required during the TypeScript block. Use an installed supported .NET SDK and the exact xUnit bootstrap commands in [language setup](../../../docs/language-fluency.md#run-the-smallest-real-test). If environment setup is already part of this attempt and takes the session, preserve that fact and continue the same assignment clock; do not claim code practice completed.

## Learning direction

When ready to begin, run this yourself from a clean checkout on `main`, before studying:

```sh
npm run assignment:start -- C002-CS01 fluency
```

The coach provides this command without running it. If this attempt already has a branch and start commit, keep them instead of starting again. Copy the printed metadata into this assignment's PR. See the [assignment workflow](../../../docs/assignment-workflow.md) for prerequisites and recovery.

Read Microsoft's [Selecting a Collection Class](https://learn.microsoft.com/en-us/dotnet/standard/collections/selecting-a-collection-class), especially key lookup. Watch [LINQ and IEnumerable, Part 15](https://learn.microsoft.com/en-us/shows/csharp-for-beginners/language-integrated-query-linq-and-ienumerable-csharp-for-beginners), focusing on when a query executes. Use [dotnet test](https://learn.microsoft.com/en-us/dotnet/core/testing/unit-testing-with-dotnet-test) for the chosen project's test platform.

Study `["Build","build","Test"]`: decide which comparer expresses the requested equality without depending on the machine's culture.

## Build

Receive a readonly collection of ASCII alphabetic tags. Return counts with case-insensitive ordinal key lookup. Preserve the supplied collection. The spelling of the retained key is not part of the contract; lookup semantics and counts are.

- Build/build/Test gives a count of 2 when looked up as `BUILD`, and 1 for `test`.
- Empty input gives an empty result.
- Three spellings of the same tag make one logical entry.
- A missing key is distinguishable from a zero count.

Choose a straightforward dictionary loop or LINQ expression. Explain the comparer choice and what is materialized. Do not add a web host, ORM, or general-purpose collection wrapper.

## Review and repeat

Submit the exact build/test command and SDK version. Review nullability, caller ownership, equality semantics, and readability. Continue with **CS-F02** in [the language track](../../../docs/language-fluency.md#c-practice-cards), then the remaining C# block as separate PRs.
