# Cycle 001 — Day 06 Review

- Review date: 2026-10-29 (America/Denver).
- Assignment: `cycle-001/day-06/architecture-lifecycle`.
- Learner PR: [#25](https://github.com/jreyno77/engineering-practice-lab/pull/25).
- Published review: [anchored PR review](https://github.com/jreyno77/engineering-practice-lab/pull/25#pullrequestreview-5707033006), including two inline comments.
- Reviewed head: `98abfacc3c8b3c7c24e63a52a6396d2d444836d5`.
- Original learner start: `f1952250f4b40b7dc94ab07899d3e56b2ec690d2`.
- Prompt: [Day 06](prompt.md), with the in-chat agreement accepting per-function invocation states.
- Submitted design: [immutable submission](https://github.com/jreyno77/engineering-practice-lab/blob/98abfacc3c8b3c7c24e63a52a6396d2d444836d5/cycles/cycle-001/day-06-architecture-lifecycle/submission.md) and [ResultsRelay.expec](https://github.com/jreyno77/engineering-practice-lab/blob/98abfacc3c8b3c7c24e63a52a6396d2d444836d5/cycles/cycle-001/day-06-architecture-lifecycle/ResultsRelay.expec).
- State: reviewed incomplete attempt; awaiting understanding/disagreement. No completion or merge claimed.

## Day 06 review — submitted revision

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
| State | Awaiting understanding/disagreement |
| Assigned work | Day 06 architecture lifecycle; one learner PR; original marker retained |
| Submission | PR #25, reviewed head `98abfacc3c8b3c7c24e63a52a6396d2d444836d5` |
| Assessment | Provisional 51 points across 90 assessed; testing 10 points unassessed; original rubric 100; no finalized /100 grade |
| Understanding | Learner requested no penalty for `.expec`; coach accepts the medium and per-function representation. No response to this review yet. |
| Next focus | State invariants consistent with a concrete interruption trace; next assignment waits for acknowledgment |
| Review administration | Separate `review` PR; original marker `952f57e1fd1f11dd8bc39942c5e1888b99b54ff1`; learner solution excluded |
