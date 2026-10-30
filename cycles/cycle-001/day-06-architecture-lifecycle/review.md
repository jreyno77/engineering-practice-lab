# Cycle 001 — Day 06 Review

- Review date: 2026-10-29 (America/Denver).
- Assignment: `cycle-001/day-06/architecture-lifecycle`.
- Learner PR: [#25](https://github.com/jreyno77/engineering-practice-lab/pull/25).
- Original published review: [anchored PR review](https://github.com/jreyno77/engineering-practice-lab/pull/25#pullrequestreview-5707033006), including two inline comments; superseded by reassessment below.
- Reviewed head: `98abfacc3c8b3c7c24e63a52a6396d2d444836d5`.
- Original learner start: `f1952250f4b40b7dc94ab07899d3e56b2ec690d2`.
- Prompt: [Day 06](prompt.md), with the in-chat agreement accepting per-function invocation states.
- Submitted design: [immutable submission](https://github.com/jreyno77/engineering-practice-lab/blob/98abfacc3c8b3c7c24e63a52a6396d2d444836d5/cycles/cycle-001/day-06-architecture-lifecycle/submission.md) and [ResultsRelay.expec](https://github.com/jreyno77/engineering-practice-lab/blob/98abfacc3c8b3c7c24e63a52a6396d2d444836d5/cycles/cycle-001/day-06-architecture-lifecycle/ResultsRelay.expec).
- State: reviewed incomplete attempt; awaiting understanding/disagreement. No completion or merge claimed.
- Reassessment published: [updated PR review](https://github.com/jreyno77/engineering-practice-lab/pull/25#pullrequestreview-5714855173).

## Reassessment — 2026-10-30

Reviewed the same submitted revision, `98abfacc3c8b3c7c24e63a52a6396d2d444836d5`, using the learner's clarification: section 1 gives state facts; section 2 gives execution flows. The coach supplied the replacement table without making the relationship explicit. The reassessment removes deductions based on table shape, repeated paths, missing state labels in those traces, or treating every `Working` row as a violation of section 1. The original invariant-violation finding and 51-point subtotal are superseded by this reassessment.

**Updated assessed subtotal: 73 points across 90 assessed points.** The original rubric still totals 100. The 10-point test criterion remains unassessed because no test descriptions were submitted; this is not a finalized /100 assignment grade or a new overall readiness score.

| Criterion | Score | Evidence and remaining gap |
|---|---:|---|
| State choice and invariants | 18 / 20 | Five useful distinctions and concrete resource/outcome facts. The scope of export-specific facts (Courier handoff, shipping complete, backup exists) remains unclear for download and failures before a backing file exists. This is incomplete scope, not a demonstrated contradiction with the execution trace. |
| Transition completeness | 22 / 25 | Substantial validation, creation/retry, shipping failure, cleanup retry, successful completion, and download/stream-close flows. The remaining 3 points concern what makes a failure eligible for retry. No format deduction. |
| Decisive lifecycle choices | 18 / 20 | All five decisions and consequences are present. Separate invocations and their own cleanup are accepted. For creation and export of the same payload, the allowed overlap still lacks an ordering/coordination guarantee for when export can consume that payload. Retry eligibility is not deducted again here. |
| Cancellation/failure/cleanup paths | 8 / 15 | Credit for stream closure after failed writes, cleanup retries, and terminal cancellation as a stated policy. The public API exposes no separate cleanup operation, and the flows put export cleanup after shipping; this earns credit for avoiding an external cleanup/export race. The remaining gaps are caller results and file/resource guarantees after cancellation with partial backing data or failure with a partial target. |
| Risk-based tests | Not assessed / 10 | Five behavioral test descriptions were requested but not submitted. Executable tests were not required for this design exercise. |
| Caller contract | 3 / 5 | The `.expec` capabilities, types, errors, and promises count. Its download promise says persistence in memory while the trace writes to a supplied location; how that location is supplied is unstated. The scope of `getStatus()` when invocations overlap is also unclear. No object-owned state machine is required. |
| Communication | 4 / 5 | The decisions and execution flows are understandable with the learner's explanation. Only the requested concise final architecture summary is missing; no deduction for using traces or repeating paths. |

The score changes are **+8 states, +9 transitions, +1 decisions, +3 critical paths, +1 communication**. Caller contract retains its score. The additional critical-path credit recognizes internal cleanup ownership and ordering already present in the submitted API and flows. Each remaining gap is charged under the criterion shown, rather than repeatedly penalizing the same omission.

### Two highest-value improvements

1. **Finish the externally observable outcomes of interruption.** Closing the stream after a failed write is useful evidence, but it does not tell the caller what remains at the target or who owns it. Terminal cancellation likewise needs a settled caller outcome and file/resource guarantees. These are policy gaps an implementer would otherwise have to decide.
2. **Make the public contract agree with the intended behavior.** Clarify what download persists, how its location reaches the operation, and which invocation or aggregate `getStatus()` describes. This can stay a per-function design; it needs a clear caller interpretation.

**Compliance:** the difficult paths are incomplete; the proposed tests, final summary, and mini refresh were not submitted. The `.expec` material receives caller-contract credit regardless of section placement. **Engineering judgment:** per-function ownership, self-contained operations, explicit error categories, and the documented tradeoffs receive credit. **Production readiness:** the unresolved policies need definition and behavioral verification before relying on this design in production. This review does not require rewriting the first attempt.

**Timing fixed at the learner's request:** PR #25's practice block now uses assignment `cycle-001/day-06/architecture-lifecycle`, kind `architecture`, and original start `f1952250f4b40b7dc94ab07899d3e56b2ec690d2`. The [new timing check passed](https://github.com/jreyno77/engineering-practice-lab/actions/runs/41083803656), with its [report artifact retained](https://github.com/jreyno77/engineering-practice-lab/actions/runs/41083803656/artifacts/12990423171). The earlier failed report remains historical evidence. No start or solution commit was changed. The PR remains unmerged, so no completed commit-to-merge duration or active-work total is claimed.

Existing practice CI passed on this unchanged submission; it does not verify the lifecycle or the `.expec` runtime promises. Overall readiness remains the historical **65/100**. Preserve the attempt and review history; next focus is caller-visible interruption/resource outcomes. Await the learner's understanding or disagreement before another assignment.
## Prior clarification — 2026-10-30, resolved by reassessment above

This section preserves the correction made before reassessment. Its pending score status is historical.

The learner explained that section 1 defines states and their invariants, while section 2 is a separate step-by-step execution trace: what happens within a state and how the operation progresses to the next state. They followed the coach's replacement table, `Current invocation state | Event or action | Outcome / next state`.

The coach did not make explicit how that table's state column should map to section 1, then graded one interpretation as settled. The categorical invariant-violation finding below is **superseded, pending clarification** of that mapping. This does not establish that the design is correct or remove the need for consistent behavior; it distinguishes unresolved notation/meaning from a demonstrated design defect. Per-function state ownership and `.expec` remain accepted.

The original **10/20 state/invariant** and **13/25 transition-completeness** assessments are under reconsideration. The **51-point provisional subtotal is withdrawn as the current assessment**. No replacement total, renormalization, or readiness change is made. The original review is preserved below as history. Independent observations about missing interruption/partial-file outcomes, unsubmitted test descriptions, and caller-contract ambiguity remain open on their own evidence.

See the [published clarification](https://github.com/jreyno77/engineering-practice-lab/pull/25#issuecomment-6526779073). The submitted revision is unchanged. The immediate next step is to understand how the two views relate; the learner is not being asked to replace their design to match an unstated expectation. No new assignment or clock has been started.

## Original review — 2026-10-29, preserved as history

The affected finding and scores in this historical snapshot are superseded by the reassessment above; they are not the current assessment.

Reviewed PR #25 at `98abfacc3c8b3c7c24e63a52a6396d2d444836d5`. The learner confirmed in chat that this is the attempt to review, although the submission ends after section 3.

The `.expec` source and generated documentation count as design evidence. They add explicit capabilities, input types, error categories, and public promises. The coach previously accepted per-function invocation states as an alternative to the object-wide table; that choice and the additional tooling receive no deduction. No object-owned state machine is required.

### Rubric

| Criterion | Awarded / available | Evidence |
|---|---:|---|
| State choice and invariants | 10 / 20 | Useful success, work, cleanup, and failure distinctions, but the stated `Working` and `Error` invariants are contradicted by the actual traces. |
| Transition completeness | 13 / 25 | Substantial export/download success and retry paths. Declared `Cleanup` and `Complete` states are never entered in those paths, and retry eligibility remains an unanswered branch condition. |
| Decisive lifecycle choices | 17 / 20 | All five policies have answers and consequences. Concurrency scope and the condition for retrying a suboperation still need clarification. |
| Cancellation/failure/cleanup paths | 5 / 15 | Failed writes close the stream and cleanup failures have retry paths. Cancellation after a partial backing file, the fate of a partial target, and cleanup while export runs remain unspecified. |
| Risk-based tests | Not assessed / 10 | No proposed behavioral tests were submitted. The requested evidence was five test descriptions; executable tests were not required for this design exercise. |
| Caller contract | 3 / 5 | `.expec` earns credit for a concrete public surface. The prose download-to-file contract differs from the spec's persistence-in-memory promise; the supplied location and the scope of `getStatus()` during concurrent calls remain unclear. |
| Communication | 3 / 5 | The choices are readable. Repeated paths make the general transition rules harder to locate; the requested final summary is absent. |

**Provisional assessed subtotal: 51 points across 90 assessed points.** The original rubric remains 100 points; the 10-point testing criterion is unassessed, not silently scored zero or normalized away. There is no finalized /100 assignment grade. This is an incomplete training submission, not evidence of zero testing ability. Overall readiness remains the historical **65/100**.

### Two highest-value improvements

1. **Check every state label against its invariant.** `Working` says the payload is valid, a temp file has been created and contains the payload, and the payload has been handed to the Courier (submission lines 9–13). Yet line 29 is already `Working` when validation returns false, and line 34 is `Working` when temp-file creation fails. Similarly, `Error` promises a backup exists even when failure happened before creation. This is a contradiction inside the chosen model, independent of where state is stored. Review one path and ask whether every stated fact is true at each occurrence of a state; choose the labels or invariants yourself.

2. **Finish the observable outcome of interruption and failure.** Lines 117–118 and 135–136 close the stream after a failed write, but do not establish what happens to the partial target or what the caller can rely on when the operation settles. The terminal-cancellation decision is present, but no trace shows cancellation after a partial backing file. Also state how a cleanup request during export is handled or why that request is impossible through your chosen API. Keep the per-invocation model; provide the final state, caller-visible result, and owned-file outcome rather than enumerating more ordinary paths.

### Compliance, judgment, and readiness

Credit is based on content across all submitted files, not matching section headings. The `.expec` material partly covers the caller-contract requirement. The five test descriptions, final architecture summary, and mini refresh answer are absent; some difficult-path evidence is also missing. These are submission gaps. The per-function representation and using `.expec` are valid design choices. Generated contracts do not prove runtime behavior; this remains a training design with unresolved policies before production implementation/adoption.

The coach's original object-centered explanation contributed to representation confusion; the approved adaptation is honored here. No deduction is based on the time spent, family interruption, unfamiliar tooling, or the lack of an implementation that was never requested.

### Checks and timing evidence

- Inspected the exact prompt, both submission commits, all five changed files, PR body, and CI logs. No learner files were rewritten.
- [Practice CI](https://github.com/jreyno77/engineering-practice-lab/actions/runs/40984418062) passed: 44 existing tooling tests and 4 leap-year tests. Current practice discovery found no test files. These checks do not execute this lifecycle design.
- The `.expec` docs say runtime behavior is not verified. The coach did not run the compiler or claim to independently reproduce its static check.
- [Timing CI](https://github.com/jreyno77/engineering-practice-lab/actions/runs/40984415606) failed. The [retained artifact](https://github.com/jreyno77/engineering-practice-lab/actions/runs/40984415606/artifacts/12946515780) records that run. Local reporter validation reproduces rejection of the placeholder start SHA. This administrative issue is separate from the architecture rubric.

The original start is present in history. Replace only the placeholder practice block in the PR description with the actual assignment metadata; do not restart or rewrite the marker:

```practice
{"assignment":"cycle-001/day-06/architecture-lifecycle","kind":"architecture","start_commit":"f1952250f4b40b7dc94ab07899d3e56b2ec690d2"}
```

The start commit is dated `2026-10-29T18:38:50Z`; the submitted solution commit is dated `2026-10-30T01:12:02Z`. The PR is unmerged, so no completed commit-to-merge duration exists. No active-work total is inferred.

The learner reported approximately three hours of family interruption, about 25 minutes on the introductory design, 20 minutes on section 1, 10–15 minutes on section 3, and substantial but unquantified time on section 2; the remaining session was described as task work. These are self-reported context, not measured active minutes or score penalties. Known assistance: coach clarification of presentation and per-function state ownership; `.expec` used for design/docs. Other assistance and independent recall have not been assessed.

### Next focus and closure

Focus: make each per-invocation invariant agree with one concrete success or interruption trace. Preserve this first attempt and feedback. Await the learner's understanding or disagreement before proposing another assignment. This review does not require rewriting the artifact into the coach's preferred solution, and no new learner clock is started.

## Session checkpoint

| Field | Current evidence |
|---|---|
| State | Reassessed the submitted revision using the clarified meaning; awaiting understanding/disagreement |
| Assigned work | Day 06 architecture lifecycle; one learner PR; original marker retained |
| Submission | PR #25, reviewed head `98abfacc3c8b3c7c24e63a52a6396d2d444836d5` |
| Assessment | 73 points across 90 assessed; tests 10 unassessed; original rubric 100 and historical readiness 65 unchanged; previous 51 subtotal superseded |
| Understanding | Learner intended section 1 as state definitions/invariants and section 2 as execution flow using the coach's template. Coach owns the unstated mapping assumption; per-function states and `.expec` remain accepted. |
| Next focus | Caller-visible outcomes and owned-file guarantees after cancellation or partial-target failure; no new assignment |
| Timing | PR #25 metadata corrected at learner request; original start and solution unchanged; timing run 41083803656 passed; PR unmerged |
| Review administration | Separate `review` PR; original marker `952f57e1fd1f11dd8bc39942c5e1888b99b54ff1`; learner solution excluded |
