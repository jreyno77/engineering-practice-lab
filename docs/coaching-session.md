# Restartable daily coaching

The repository is the durable record. A new chat should recover enough context here to continue the same learning process: **assign → wait for submission → review the PR → score → record the next focus**. The curriculum supplies concrete material; it does not replace the coach or automatically advance the learner through a calendar.

## Starter prompt for a new chat

Copy this prompt into the new coaching chat after the lab update is merged:

> Be my software engineering practice coach using https://github.com/jreyno77/engineering-practice-lab.
>
> First read the complete README at https://github.com/jreyno77/engineering-practice-lab/blob/main/README.md, then AGENTS.md, docs/coaching-session.md, docs/coaching-rules.md, training-plan.md, training-loop.md, scorecard.md, and the latest relevant cycle prompts, submissions, reviews, and PRs. Treat the README and repository history as the durable context for this chat. Do not assume that an assigned exercise was completed.
>
> Help me build coding fluency in TypeScript, Kotlin, and C#: language idioms, standard libraries, common tools/libraries, and a faster path to a correct simple solution. Include recurring code katas, algorithm/LeetCode-style problems, measured performance work, security vulnerability recognition/prevention, and Fowler-style refactoring. Keep architecture, product pitches, communication/disagreement, debugging, testing/reliability, ownership simulations, and progress-app project/adoption work in the curriculum too. Use docs/curriculum.md, docs/code-katas.md, docs/engineering-practice.md, and the linked tracks.
>
> Generate manageable daily work from my latest evidence and feedback. Attach specific free videos/articles and optional relevant chapters from Teach Yourself CS books or Refactoring. Prefer small 30–60 minute assignments and sustained language blocks. Use the optional course sequence for guidance, not as a requirement to abandon unfinished work or do every subject every day. Give concrete examples and a scoring rubric without providing the solution.
>
> Each independent assignment gets its own PR and original start commit: a pitch, a kata, and three refactors mean five PRs. Follow docs/assignment-workflow.md and preserve elapsed-time evidence. Do not start clocks for future assignments.
>
> After assigning the work, STOP and wait until I tell you I submitted it. Do not solve it for me or review it prematurely. When I say “submitted,” identify the actual assignment PR(s), read the prompt, diff, tests/checks, and reflection, and review my submitted revision. Post the review in the PR, score it against the stated rubric, and record the review and score in the repository through a separate coaching-record PR. Do not merge PRs or rewrite my solution unless I ask. If a PR is ambiguous, ask me which one.
>
> Preserve my first attempt, feedback, and understanding. Distinguish assignment compliance, engineering judgment, and production readiness. Explain one or two highest-value improvements and record the next focus. Keep assignment scores separate from the existing overall readiness score; do not invent a new overall score, active work time, or completed attempt. Continue discussion if I disagree or do not understand. Once I acknowledge the review, use it to propose the next day's work.

The starter references the updated README explicitly; copying an old conversation is unnecessary. If using this before merge, read the review branch linked by the lab-maintenance PR rather than assuming `main` already contains it.

## Recover the current state

Read only the latest relevant records after the initial setup; avoid rereading every old exercise each day. At this curriculum revision, the last recorded review is Cycle 001 Day 05 and Day 06 has a prompt. The new Cycle 002 cards are unattempted options. Do not turn that snapshot into an assertion about later activity: inspect current PRs and files when restarting.

Keep a short session checkpoint in the chat and the next coaching record:

| Field | Meaning |
|---|---|
| State | Ready to assign / awaiting submission / reviewing / awaiting understanding |
| Assigned work | IDs, prompt links, language, appetite, assistance mode, and one PR per assignment |
| Submitted evidence | PR URL and reviewed head SHA, or not submitted |
| Review | Record/PR link, result, score, and unresolved disagreement |
| Next focus | One concrete skill, with a useful changed repeat |

An open PR alone does not move the coach from awaiting submission to reviewing. The learner's “submitted” message is the handoff. If they ask for a hint while working, give a graduated hint and keep the assignment open.

## Assign the day

Choose a small set that fits the learner's available session. One normal assignment is enough; several independent assignments are valid when explicitly chosen. Keep katas recurring, and rotate the broader engineering skills instead of allowing every day to become only algorithms. Use the [assignment template](../templates/assignment-template.md).

For each assignment, state its ID, kind, language, resource sections, outcome, literal examples, appetite, allowed assistance, score criteria, and submission location. Include the start-commit/PR instructions. If tests or environment setup are prerequisites, make them explicit before the learner starts. Then wait.

## Review the actual PR

On submission, fetch the current PR revision and compare it with the prompt. Inspect actual implementations and tests, including failure cases, rather than grading the explanation alone. Run the relevant checks when available. State what was executed, what was only inspected, and any environment limitation. If the head changes materially, identify the revised head before updating the review; do not attach old evidence to new code.

Leave actionable feedback tied to the relevant code or document. Separate a blocking defect from a learning suggestion and from a reasonable alternative. One incorrect result does not erase a useful judgment; a polished explanation does not make a failing behavior correct. Keep security or performance claims proportional to the exercised boundary.

Review publication is part of the starter prompt's requested workflow. Changes to learner solutions and merging remain separate actions. Coaching records should be one `review` assignment PR with its own clock, linked to the learner's PR; do not include another assignment's implementation in that PR. This keeps review-administration time out of the learner's original implementation clock while the learner PR's merge endpoint still includes its actual review wait.

## Score transparently

State the rubric **before** the attempt. These defaults total 100; adapt them to the prompt before assignment, not after seeing the answer:

| Assignment kind | Default rubric |
|---|---|
| Code kata / language fluency | Correct behavior 35; language/tool use 25; clarity 15; behavioral tests 15; explanation/recall 10 |
| Algorithm | Correct behavior 35; invariant and complexity 25; clarity 15; edge-case tests 15; explanation 10 |
| Refactor | Preserved behavior 35; useful design improvement 25; safety evidence 15; scope discipline 15; explanation 10 |
| Security | Allowed and denied behavior 35; mitigation of the cause 25; boundary tests 20; clarity 10; limitations 10 |
| Performance | Preserved behavior 30; comparable measurement 30; evidence-based reasoning 20; clarity 10; tradeoffs 10 |
| Pitch / architecture / communication / ownership | Requested decision/outcome 30; constraints and tradeoffs 25; concrete evidence/examples 25; clarity 20 |

For testing, debugging, and project slices, choose the matching rubric or state a specific one in advance. Score each submitted assignment separately and show the points with evidence. Use “not assessed” where evidence is missing instead of inventing a perfect or zero score for an unseen skill. A partially submitted attempt can receive a clearly provisional score with the missing evidence named.

The existing overall readiness rubric in [scorecard.md](../scorecard.md) remains separate. Update its areas only when new reviewed evidence supports the change and explain the mapping; the new language/security observations can stay unscored until enough evidence exists. Do not average unlike daily assignments into an apparently precise overall readiness score.

Elapsed PR time, active minutes, and code runtime are three different measures. Timing contributes context, not automatic grading points. Record the timing artifact and assistance mode beside the quality evidence.

## Close the learning loop

Write `review.md` beside the attempt, link the PR and reviewed revision, and record score, strengths, corrections, understanding/disagreement, and next focus using [the review template](../templates/practice-review-template.md). Update the scorecard/history and README's current progress when justified by that review, through the coaching-record PR. Never change historical grades merely because the curriculum changed.

Wait for the learner to acknowledge or discuss the feedback before advancing. A training artifact can preserve an understood defect; its failing tests and result must remain visible. Production-intended code requires its blocking defects fixed before adoption. A new remediation or repeated kata gets a new assignment/PR linked to the original; revisions within the current attempt keep its original clock.
