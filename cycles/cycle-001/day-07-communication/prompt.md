# Day 07 — Write one actionable review comment

- ID: `cycle-001/day-07/communication-r01`
- Kind: `communication`
- Format: Markdown; a TypeScript-style API is supplied as context.
- Appetite: **30 minutes total** — about 7 reading, 18 writing, 5 checking.
- Assistance: independent, with the linked articles allowed; record any hints used.
- Prior evidence: [Day 06 reassessment](../day-06-architecture-lifecycle/review.md). This is a separate exercise; preserve that attempt.

## Start when ready

From the repository root in a clean checkout on `main`, run this yourself before the assigned reading and work:

```sh
npm run assignment:start -- cycle-001/day-07/communication-r01 communication
```

Prerequisites are Git, Node.js 22/npm, configured Git identity, and push access through `origin`. No dependency install is needed for this document exercise. The command creates and pushes your assignment branch and original start commit, then prints metadata. Paste that exact `practice` block into your PR description, replacing the template placeholder. If already started, retain the existing branch and marker.

The coach prepares this prompt but does not run the command. Follow the [assignment workflow](../../../docs/assignment-workflow.md).

## Learning direction

Practice connecting a concrete observation to the caller's requirement and a useful next action. Your last review identified caller-visible failure outcomes as the next focus; this exercise practices communicating one such issue.

Read these two free Google Engineering Practices articles:

1. [How to write code review comments](https://google.github.io/eng-practices/review/reviewer/comments.html): only “Explain Why,” “Giving Guidance,” and “Label comment severity.”
2. [The Standard of Code Review](https://google.github.io/eng-practices/review/reviewer/standard.html): the opening standard and “Principles.” Focus on evidence versus preferences and proportional review scope.

This adapts [E-03](../../../docs/engineering-practice.md#e-03--write-review-comments-that-help-someone-act). No additional book or video is needed for this short session.

## Supplied review scenario

You are reviewing a proposed download implementation. These are fictional exercise facts, not new findings about Day 06.

**Accepted caller requirement:** after `download(payload, target)` settles, the target must contain the complete result or be absent. The caller can open any file present at that target without a separate completeness check.

For this exercise, the target did not exist before the call. Existing-file replacement, cancellation, retries, simultaneous calls, and what is visible while the promise is pending are outside scope.

The author provides this numbered proposal, referred to as `download-proposal.txt`:

```text
1  download(payload, target): Promise<void>
2  Write the payload to target through a file stream.
3  Resolve when all bytes have been written.
4  If a write fails, reject with DownloadError.
5  Close the stream before resolving or rejecting.
6  Closing the stream completes all cleanup needed for this change.
```

The accompanying manual check reports:

```text
Input: a 20 MiB payload, target report.csv initially absent
Injected event: write failure after 8 MiB
Observed after rejection: DownloadError received; stream closed;
                          report.csv still exists and contains 8 MiB
Success check: without the injected failure, the promise resolves
               and report.csv contains all 20 MiB
```

Treat these observations as supplied evidence. You do not need to reproduce them or invent implementation details.

## Your deliverable

Write **one review comment**, roughly 100–180 words, addressed to the author. Shorter is fine if it communicates the same substance.

Include:

- the relevant proposal line(s);
- whether the comment blocks approval, asks for clarification, or is optional, with a reason;
- the concrete observation, its relationship to the accepted requirement, and the consequence for the caller;
- the smallest useful next action and evidence you would need to resolve the comment.

Choose your own wording and recommendation. Judge the documented outcome; do not infer hidden mechanisms. Leave the implementation approach to the author where the requirement permits choices. No state table, corrected implementation, or additional comment quota is required.

Save `cycles/cycle-001/day-07-communication/submission.md` with the comment and a brief reflection: assistance/resources used and one sentence explaining what makes your comment actionable. The document itself is the deliverable; no executable tests are required.

## Rubric — 100 points

| Criterion | Points | Evidence |
|---|---:|---|
| Factual accuracy and scope | 30 | Correctly uses the supplied observation and requirement, references relevant lines, and avoids unsupported claims. |
| Caller impact and severity | 25 | Explains a concrete consequence and justifies the review severity. |
| Actionable next step and verification | 25 | Gives the author a bounded next action and an observable condition for resolving the comment. |
| Clarity and collaboration | 20 | Concise, respectful, understandable feedback that distinguishes requirements from preferences. |

Agreement with a preferred implementation, extra diagrams, and longer answers earn no additional points. Word count is a sizing guide, not a mechanical deduction.

## Submit, then wait for review

Use **one new PR** targeting `main` for this assignment, with the starter's printed metadata and this prompt linked. Keep its original start through revisions. If the coaching prompt PR is still open, link its prompt there; your assignment still branches from current `main` and needs only its own submission file.

At 30 minutes, save the actual attempt and note any uncertainty instead of letting the scope expand. When ready, say **“submitted”** and send the assignment PR link. The coach waits until that handoff to review it.

A later changed repeat can use a new observation that changes the appropriate severity; it is not assigned or started now.
