# Additional implementation practice loop

The optional learning sequence is in [the course map](curriculum.md). Use this loop inside the lab's [existing daily coaching](../training-loop.md) when practicing TypeScript, Kotlin, or C#. Broader assignments and prior Cycle 001 submissions/reviews retain their place and meaning.

## One assignment, one PR

1. Select one prompt. Choose independent, hinted, or assisted mode.
2. Create a branch from current `main` and the start commit using [the assignment workflow](assignment-workflow.md). Start the clock before studying or solving this attempt. Do not create clocks for future work.
3. Define the completion examples and study the assigned section or video. Make a tiny example and predict its result before running it.
4. Attempt the task. Write the smallest useful behavioral tests. Use the debugger or profiler where the task calls for it.
5. Save the first attempt. Record results honestly, including failures and assistance.
6. Open the assignment PR with its ID, kind, and original start SHA. Submit only that assignment's artifacts.
7. Review correctness, language/library choices, clarity, complexity, and relevant security. Record understanding or disagreement. Preserve original learning evidence.
8. Merge when the practice outcome and review are recorded, or when production-intended code meets its acceptance criteria. Download the completed timing artifacts after the merge workflow runs.
9. Plan a changed repeat in your own study calendar. A repeat is another attempt, assignment ID, branch, and PR.

There is no automatic daily scheduler. Choose your next session when ready.

## Repetition with transfer

| When | Retrieval task | Evidence |
|---|---|---|
| Next session / about 2 days | Explain the operation or invariant without the previous solution open; implement a tiny variation. | Correct output and one edge case; lookup/hint notes. |
| About 7 days | Solve a new problem using the same technique among plausible alternatives. | Explain why this tool fits and an alternative does not. |
| About 21 days | Reuse the skill in a mixed task or later language block. | Working code, changed constraints, and a short comparison of idioms. |

If recall fails, reread the narrow source and reduce the next rep. Do not reset the old clock or erase the first result. A recall question incorporated into an existing task is part of that task; a separately assigned implementation gets a separate PR.

## Review outcomes

- **Correct and understood:** retain the evidence, then repeat with a harder variation.
- **Works but understanding is weak:** ask for a trace, counterexample, or explanation; repeat a small version without the solution.
- **Incorrect but the lesson is understood:** preserve the attempt and review; explicitly record the defect. Assign a separate fix/retest when useful. Failing new tests remain failing CI checks; understanding a defect does not make the implementation pass.
- **Disagreement:** record the tradeoff, distinguish prompt compliance from engineering judgment, and use examples to resolve uncertainty.
- **Product code:** resolve blocking behavior/security defects before adoption; a historical training score is not a release gate.

## Speed and correctness

The CI report measures **elapsed assignment lead time**, from original start commit to merge. It includes study, breaks, review, and CI. Open assignments show aging; abandoned ones remain visible without a completion duration.

Optional self-reported active minutes, time to first correct solution, hints, and lookup count can explain changes in fluency. They are not inferred from Git timestamps. Program runtime belongs in a separate performance record.

Compare similar tasks in the same language and assistance mode. Keep task difficulty, prior exposure, failure/rework, and sample count visible. Avoid rewarding rushed incorrect solutions, artificially tiny PRs, or rewriting start commits. A pitch, security lab, and kata are different cohorts.

## Block review

Use five minutes to note one reusable API, one algorithm invariant, one smell or vulnerability, and one remaining gap. Choose the next small assignment. Update the [scorecard](../scorecard.md) only when new submitted work supports it; adding curriculum does not increase a score.
