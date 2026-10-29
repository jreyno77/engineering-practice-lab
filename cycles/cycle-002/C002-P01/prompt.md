# C002-P01 — Shape one progress-summary feature

Kind: **pitch** · Appetite: **30 minutes** · One PR.

## Learning direction

When ready to begin, run this yourself from a clean checkout on `main`, before studying:

```sh
npm run assignment:start -- C002-P01 pitch
```

The coach provides this command without running it. If this attempt already has a branch and start commit, keep them instead of starting again. Copy the printed metadata into this assignment's PR. See the [assignment workflow](../../../docs/assignment-workflow.md) for prerequisites and recovery.

Read the existing [progress-app vision](../../../docs/progress-app/vision.md) and the metric meaning in [the assignment workflow](../../../docs/assignment-workflow.md). Revisit [Teach Yourself CS](https://teachyourselfcs.com/)'s distinction between foundations and individual tools: the feature should help identify a learning gap, not reward activity alone.

Study this scenario: one 30-minute coding attempt merged the next day; another took 90 active minutes and merged immediately. Explain why sorting by PR elapsed time alone would tell an incomplete story.

## Shape

Write a one-page pitch for a local view that helps choose the next practice assignment from completed and unfinished attempts. Include one user story, a small appetite, two literal examples, success criteria, and explicit exclusions. Treat active time as optional self-reported evidence; preserve missing values and assistance mode.

Your pitch must answer what the learner decides after seeing the view, which data supports that decision, and what should happen when a report is missing. It should be small enough to split into independently useful construction steps later. Do not implement a dashboard or design a generic metrics platform in this PR.

## Review and repeat

The reviewer should be able to explain the learner's decision and identify a smallest useful slice. Name one tempting chart you excluded and why. A later implementation is a separate assignment with a separate PR and start commit.
