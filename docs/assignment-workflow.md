# One assignment, one PR, one clock

Every independently assigned pitch, kata, fluency drill, security exercise, performance exercise, or refactor gets its own PR. A day containing a pitch, a kata, and three refactors produces **five PRs**, each with its own start commit and report. The tests and reflection for one assignment stay with that assignment.

Do not open all five clocks in advance. Start each when you actually begin its study and work. Prefer completing and merging one assignment before branching the next from the updated `main`. If a later exercise depends on an earlier refactor, merge the prerequisite first; do not duplicate its code in a supposedly independent PR. A new attempt or spaced repeat has a new assignment ID and clock; fixes to the current attempt keep its existing clock.

This workflow applies equally to TypeScript, Kotlin, C#, and document assignments.

## Start an assignment

From a clean checkout, update `main`, create the assignment branch, and immediately create and push a start marker:

```sh
git switch main
git pull --ff-only
git switch -c practice/cycle-002-day-01-kata-01
git commit --allow-empty -m "start: cycle-002/day-01/kata-01"
git rev-parse HEAD
git push -u origin practice/cycle-002-day-01-kata-01
```

Copy the full SHA printed by `git rev-parse HEAD` into a draft PR's description. GitHub's PR template includes this block:

````markdown
```practice
{"assignment":"cycle-002/day-01/kata-01","kind":"kata","start_commit":"0123456789abcdef0123456789abcdef01234567"}
```
````

The SHA above is illustrative; use your actual marker SHA. If GitHub will not open a PR containing only an empty commit, commit the assignment prompt or a short `submission.md` intent note, push, and then open the draft PR. Keep the original marker SHA as the start. Starting a clock before studying means the elapsed interval includes the assigned learning resources.

The block must contain exactly these three fields and exactly one assignment. Supported `kind` values are `fluency`, `kata`, `refactor`, `security`, `performance`, `pitch`, `architecture`, `communication`, `review`, `tooling`, `project`, `adoption`, `simulation`, `debugging`, `testing`, and `reliability`. Use `tooling` for maintaining this lab, `project` for production-intended slices, and `review` for a coaching-record assignment. IDs use ASCII letters, digits, `/`, `_`, and `-`; the course's IDs such as `C002-F01` work directly. Give every repeat a distinct ID, such as `C002-F01-repeat-1`.

Commit and push the implementation, tests, and reflection normally. Keep your first attempt and coaching feedback as learning evidence. Passing tests matter; preserving the original attempt does not mean merging broken production tooling. For a deliberately incomplete training attempt, retain it as an explicitly reviewed learning artifact without presenting it as a successful implementation.

## Keep the original clock

The reporter verifies that `start_commit` is the **first commit returned by GitHub for that PR**, obtains its Git committer timestamp, and uses GitHub's `merged_at` as the end. It does not use the PR creation date or a later implementation commit as a substitute start. The completed report therefore survives GitHub's **Squash and merge** operation: it reads the original PR commit list rather than treating the new squash commit as the start.

- Do not amend, rebase, force-push away, or otherwise rewrite the marker. If the branch needs updates, merge `origin/main` into it.
- Do not replace the start SHA to make a duration shorter. A late/missing start is missing evidence, not permission to backdate a new marker.
- If the original marker is lost or GitHub cannot provide it, preserve the failed report and explain the gap in the reflection. Do not invent a recovered duration. Restore the original history if possible; otherwise retain this attempt as unmeasured.
- Git timestamps are supplied by the committer's machine and can be manually changed. This is a personal learning record, not a tamper-proof time tracker. Keep the local clock accurate.

The script cannot prove that you did not start work before the marker, or that the code inside a PR really contains only one assignment. Review remains responsible for those facts. Do not rewrite metadata/history to hide a prior clock. If scope genuinely changes, record the original assignment and explanation in the reflection.

## Find the report

In GitHub, open **Actions → Assignment timing → the relevant run**. The job summary shows the readable report. Download the artifact named `assignment-timing-pr-<number>-<run-id>-<attempt>` for:

- `report.md`: human-readable result;
- `report.json`: versioned fields for later charting, including original SHA, timestamps, PR URL, head and merge SHA, workflow run/attempt, and evidence problems.

Reports are uploaded for successful and invalid evidence. Artifacts request **90-day retention**, subject to the repository's retention setting; download the reports you want to preserve beyond that window. Reruns use distinct artifact names and keep the same completed merge endpoint. They fetch the current PR evidence, so metadata edits can change a regenerated report; retain earlier artifacts when investigating a discrepancy.

| Status | Meaning | Completed duration |
|---|---|---|
| `in_progress` | Open PR; shows age as of this run | None |
| `completed` | Merged PR with validated original start | `merged_at - first commit committer date` |
| `closed_unmerged` | Closed without merging | None; excluded from completed comparisons |
| `invalid` | Missing metadata, wrong SHA, incomplete evidence, impossible time, or API failure | None; job fails and explains the issue |

For example, a marker at **09:00 UTC** and merge at **10:30 UTC** reports **5,400 seconds / 90 minutes**, even if CI produces the report at 11:00. An open PR observed at 11:00 instead shows **120 minutes of unfinished age**, never a completed 120-minute result.

On open/edit/push/reopen, the report is provisional. On close, it uses the actual merge result or records closure without merge. No scheduled polling is required. Reports do not update continuously while a PR is idle.

After the workflow is on `main`, you can recover a missed run or report an older PR with **Run workflow**, choose `main`, and enter its PR number. Historical PRs without the required original evidence remain invalid; do not fabricate starts. The initial PR adding this workflow may need this manual run after merge because trusted reporting uses base-branch code.

## Interpret speed alongside learning

Elapsed time includes study, coding, breaks, review waiting, and CI. It is **not active coding time**, typing speed, or an individual productivity score. If useful, record active minutes separately in your reflection as a self-reported observation; this script does not infer them.

Compare repeated or similarly sized assignments within the same kind and language, and keep assistance mode, correctness, clarity, security findings, and next-day recall visible. A faster result with skipped cases or an unexplained AI solution is not evidence of better fluency. Include unfinished and unmeasured attempts when reviewing your practice so only easy completions do not dominate the story.

## CI trust and limits

Regular `Practice lab CI` runs `npm run test:practice` for current TypeScript submissions, the timing tests, and the existing leap-year kata with locked dependency installs. Current TypeScript submissions use `submission.test.ts` next to `submission.ts` under `cycles/`; the current suite excludes the frozen Cycle 001 learning record. Until new exercises are submitted, this suite explicitly reports **no test files**. That is not evidence that an assignment has been completed. TypeScript practice tests and leap-year tests have separate commands so an install/test failure cannot be hidden by a later successful `cd` command.

The original `npm test` command and its assertions remain unchanged for reproducing the historical exercises. At this curriculum update it reports **7 passing tests and 1 failing test**: Day 03's parser retains unexpected raw fields, the defect already recorded in [its review](../cycles/cycle-001/day-03-boundary-parser-rep/review.md). CI previously ran only the leap-year kata, so the historical suite was never a green CI gate. We preserve that failed evidence rather than change the old attempt or weaken its assertion. Current CI does not claim that the historical suite passes; a separately assigned repair can demonstrate the corrected behavior without rewriting the old learning record.

`Assignment timing` deliberately uses `pull_request_target` with read-only `contents` and `pull-requests` permissions. It checks out only the trusted **base commit**, executes the dependency-free reporter from that base, and reads PR text/commits as data from GitHub's API. It does not check out the PR head, install PR packages, execute submitted code, interpolate PR text in shell commands, post comments, or write repository state. Keep that boundary when changing it. Workflow dispatch should use `main`; a maintainer choosing another ref is explicitly selecting the reporter code on that ref.

The API fetcher paginates commit evidence. GitHub caps its PR commit-list endpoint at 250 commits, so larger PRs fail visibly rather than using a partial list. A small assignment should stay well below this limit. Concurrent changes to the PR head or incomplete API responses also fail visibly; rerun after the branch settles.

To test the reporter locally with Node 22:

```sh
node --test tests/assignment-timing.test.mjs
```

The automated cases cover the 90-minute example, squash merge metadata, reruns, unfinished and closed states, missing/invalid input, foreign or later SHAs, impossible/future dates, injection-like text, changing heads, and pagination. Actual GitHub artifact upload and event delivery require a live Actions run.

Implementation references: [GitHub PR commits API and its limit](https://docs.github.com/en/rest/pulls/pulls#list-commits-on-a-pull-request), [workflow events and `pull_request_target` security](https://docs.github.com/en/actions/reference/workflows-and-actions/events-that-trigger-workflows#pull_request_target), and [artifact upload and retention](https://docs.github.com/en/actions/tutorials/store-and-share-data).
