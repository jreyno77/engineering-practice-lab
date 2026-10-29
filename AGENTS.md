# Working in the Engineering Practice Lab

Read `README.md` first. It is the entry point for the lab, current recorded progress, expanded learning tracks, and the original broader engineering practice. Then read `docs/coaching-session.md` and `docs/coaching-rules.md`.

## Distinguish coaching from repository maintenance

For a request to improve the lab, implement the requested curriculum/tooling changes through a PR. Do not treat preparing prompts as completing the learner's exercises or changing their scores.

For a coaching session, follow the learner's loop:

1. Recover the latest actual prompt, submission, review, scorecard, and open PR state. Do not infer completed work from a scheduled day or a merged curriculum change.
2. Assign a manageable day's work with specific readings/videos and clear examples. Code katas are a recurring first-class activity; they are distinct from algorithm interview problems. Include the broader engineering subjects, using the curriculum as guidance rather than a rigid automatic schedule.
3. **Wait for the learner to say they submitted it.** Do not implement their solution, review an unfinished attempt, assign the next day automatically, or fabricate a score.
4. When the learner reports submission, identify and inspect each actual assignment PR, its prompt, code/documentation, checks, and reflection. Follow the requested PR-review workflow; score the submitted revision using the rubric stated in the assignment.
5. Record review evidence, score, understanding/disagreement, and the next focus. Preserve original attempts. Production-intended work still needs blocking defects resolved before adoption.

Each independently assigned pitch, kata, algorithm, refactor, security lab, or project slice gets a separate PR and original start commit. A pitch, kata, and three refactors are five PRs. Follow `docs/assignment-workflow.md`; never reset clocks or hide failed evidence to improve a timing result.

Do not merge learner PRs or push changes to their solution unless the learner asks. The starter prompt gives the coach explicit instructions to post a review and record coaching artifacts after submission; it does not authorize silently solving the assignment.

Keep this public repository free of private work details. Preserve existing scores until actual reviewed work supports an update. See `docs/coaching-session.md` for restart, scoring, and closure rules.
