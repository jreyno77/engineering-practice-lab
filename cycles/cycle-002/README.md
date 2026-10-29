# Cycle 002: build fluency through small finished attempts

This is a ready-to-start menu, not a record of completed work. Historical cycle-001 reviews remain unchanged. Start with **C002-F01**; if C# is the immediate priority, start **C002-CS01** and continue the C# block in [the curriculum](../../docs/curriculum.md) instead of switching languages daily.

Use three to five sessions a week. Choose one assignment per normal session. The extra refactors and pitch are available when useful; the menu is not a requirement to finish ten assignments in one day or week.

| ID | Assignment | Kind | Appetite | Prompt |
|---|---|---|---|---|
| C002-F01 | Count and rank tokens with standard APIs | fluency | 40 min | [Token counts](C002-F01/prompt.md) |
| C002-F02 | Parse a small runtime boundary | fluency | 45 min | [Boundary parser](C002-F02/prompt.md) |
| C002-A01 | Find a pair without reusing an element | kata | 45 min | [Complement lookup](C002-A01/prompt.md) |
| C002-A02 | Keep a valid moving window | kata | 45–60 min | [Distinct span](C002-A02/prompt.md) |
| C002-P01 | Shape a small progress-summary feature | pitch | 30 min | [Pitch](C002-P01/prompt.md) |
| C002-R01 | Extract a meaningful calculation | refactor | 30 min | [Extract Function](C002-R01/prompt.md) |
| C002-R02 | Remove meaningless wrappers | refactor | 30 min | [Inline Function](C002-R02/prompt.md) |
| C002-R03 | Flatten nested decisions safely | refactor | 30 min | [Guard clauses](C002-R03/prompt.md) |
| C002-S01 | Enforce note ownership | security | 45–60 min | [Object authorization](C002-S01/prompt.md) |
| C002-CS01 | Count tags with an explicit .NET comparer | fluency | 45–60 min | [C# entry rep](C002-CS01/prompt.md) |

Suggested first five sessions: F01, A01, R01, F02, S01. Use A02 after A01; the other cards are independent. A pitch + kata + three refactors means **five PRs**: C002-P01, C002-A01, C002-R01, C002-R02, C002-R03. Start each branch from current main, or name a genuine dependency explicitly; do not start the next assignment's clock before beginning it.

For every card, use [the assignment workflow](../../docs/assignment-workflow.md). Put its one ID/kind/start SHA in the PR template. Save the attempt's runnable code/tests alongside its prompt. TypeScript uses separate `submission.ts` and `submission.test.ts` files, tested from the repository root with `npm run test:practice -- cycles/cycle-002/C002-F01/submission.test.ts` (substitute the chosen ID). Follow [language setup](../../docs/language-fluency.md#run-the-smallest-real-test) for Kotlin or C#. Add a short `submission.md` with:

```text
Assignment and assistance mode:
Behavior and exact test command:
Result and any remaining gap:
API/resource I needed to look up:
One decision and its tradeoff:
Active practice minutes (optional, self-recorded):
Delayed repeat to try:
```

No solution is supplied here. For code practice, write a test for one specified result, implement it, then cover the distinct risk cases. For a pure refactor, first run characterization tests against the supplied starting code, then keep their assertions unchanged. Preserve the initial attempt and feedback; later independent repeats use a suffix such as `C002-F01-r02` and a fresh PR.
