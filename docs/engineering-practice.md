# The broader engineering practice track

Coding fluency is one part of this lab. Architecture, communication, product shaping, debugging, testing, ownership and real project work remain recurring assignments alongside the [implementation tracks](curriculum.md). These cards make those earlier goals available to a new coaching chat without depending on the old conversation.

The daily coach chooses or adapts a card using the latest actual submission and review, gives the learning direction and assignment, then **waits until the learner says “submitted.”** The coach then reads the actual PR/files, reviews the work, records the score and evidence, and chooses the next action. A prepared prompt is not a completed exercise. Follow the [coaching session protocol](coaching-session.md); these cards do not authorize the coach to solve the learner's assignment in advance.

The unfinished Cycle 001 Day 06 assignment and its historical evidence remain intact. E-01 is a later variant or a source for coaching that assignment, not a claim that Day 06 is finished. Preserve original attempts, including mistakes and reasoned disagreements.

## Choose a manageable companion assignment

Each card is a **30–60 minute assignment**, including a short selected reading, with one independently reviewable output and one PR. Use a distinct attempt ID such as `E-03-r01`; keep its original start through revisions. Tests and reflection for that output belong in the same PR. If the day has a pitch, kata and three refactors, it still has five separately timed assignments. See the [assignment workflow](assignment-workflow.md).

The [16-week companion map](curriculum.md) offers one of these alongside the implementation work each week. It is a menu for daily coaching, not a requirement to stack all the tracks on every day. A short week can contain one code rep and one companion rep. Longer simulations or product slices require explicit sizing; do not quietly turn one card into a weekend project.

| Cards | Skill | Submitted evidence |
|---|---|---|
| E-01–E-02 | Architecture and contracts | State table, caller examples, boundary diagram and decisions |
| E-03–E-04 | Communication and disagreement | Review comments or a decision-oriented reply |
| E-05–E-06 | Product shaping and construction planning | Small pitch, then one clear construction task/specification |
| E-07–E-08 | Debugging and performance | Reproduction, measurements, causal explanation and bounded fix/decision |
| E-09–E-10 | Testing and reliability | Meaningful consumer checks and failure-path evidence |
| E-11–E-12 | Ownership and delivery | Incident response record or rollout/rollback plan |
| E-13–E-14 | Adoption and real project work | Evidence-backed adoption decision, then one useful progress-app slice |
| E-15–E-16 | Senior simulation and reflection | Bounded scenario response, then a retest and evidence-based review |

Use these `kind` values in each PR's timing metadata so comparisons keep the actual practice modes distinct:

| Card IDs | Timing kind |
|---|---|
| E-01, E-02, E-06, E-12 | `architecture` |
| E-03, E-04 | `communication` |
| E-05 | `pitch` |
| E-07 | `debugging` |
| E-08 | `performance` |
| E-09 | `testing` |
| E-10 | `reliability` |
| E-11, E-15 | `simulation` |
| E-13 | `adoption` |
| E-14 | `project` |
| E-16 | `review` |

Each card names what the coach should score. Apply the session's published rubric to the actual submitted evidence; do not award an automatic score for reading, checking boxes or merging. Do not replace the historical readiness score with a guessed new total. For document work, the relevant evidence is the decision, examples and reasoning; irrelevant executable tests are not required.

## E-01 — Make lifecycle behavior decisive

**Learning direction:** read [C4 dynamic diagrams](https://c4model.com/diagrams/dynamic) for ordering interactions, then the discriminated-union and exhaustiveness portions of the [TypeScript narrowing guide](https://www.typescriptlang.org/docs/handbook/2/narrowing.html) for expressing a closed set of states. The result can be a table; no diagramming tool is required.

**Assignment, 45 minutes:** specify a generic local export job that can be created, started, canceled, retried after failure, and disposed. Define the states, who owns the job, allowed operations, rejected transitions, and what cancellation/disposal guarantees. Include the observable result of disposal during work and two simultaneous start calls. Do not implement the job yet.

**Concrete cases:** starting after disposal cannot recreate the job; a failed job can either retry under an explicit rule or require a new job; a second concurrent start must have one declared result rather than accidentally launching twice. Explain which outcomes are errors, no-ops or successful transitions.

**Deliverable and scoring evidence:** one state/operation table, three short caller traces, and a paragraph about cleanup ownership. Score consistency across traces, clear forbidden behavior, finality, concurrency and the absence of unexplained lifecycle states. A useful rejection of an operation is better than adding states without a caller need.

## E-02 — Explain boundaries and ownership

**Learning direction:** read the [C4 container diagram](https://c4model.com/diagrams/container) and [diagram review checklist](https://c4model.com/diagrams/checklist). Focus on responsibilities and meaningful relationships rather than drawing every class.

**Assignment, 40 minutes:** use the [existing progress-app vision](progress-app/vision.md) to describe how a learner sees the current focus and next action from a simple progress record. Show the learner, display, data source, and any service you actually propose. Identify who validates external records, calculates display state and owns persistence. Preserve the established TypeScript/Kotlin product direction unless a change is explicitly proposed and justified; practicing C# does not silently replace the app's backend.

**Concrete cases:** a valid record displays its next action; a missing record displays an explicit empty state; malformed data does not invent a readiness score. State which boundary handles each case and one concrete payload crossing that boundary.

**Deliverable and scoring evidence:** one readable diagram and at most one page of decisions, including one alternative rejected for the current slice. Score clear ownership, named inputs/results, consistent error behavior and proportionality. Extra services and interfaces do not earn points by themselves.

## E-03 — Write review comments that help someone act

**Learning direction:** read Google's [what to look for](https://google.github.io/eng-practices/review/reviewer/looking-for.html), concentrating on functionality and complexity, and [writing review comments](https://google.github.io/eng-practices/review/reviewer/comments.html), concentrating on explaining the consequence.

**Assignment, 30 minutes:** the coach supplies a small generic diff, or uses the following seed as a changed function. The requirement says a missing limit defaults to 10, zero disables results, and negative values are rejected at the existing input boundary:

```ts
export function resultLimit(limit: number | undefined) {
  return limit || 10;
}
```

Draft one blocking comment supported by a concrete input/result, one genuine clarification if the surrounding contract is missing, and at most one optional readability suggestion. Do not manufacture comments to reach a quota; explicitly say when no clarification or optional comment is needed. The deliverable is the review, not a corrected implementation.

**Deliverable and scoring evidence:** `review-comments.md`, with the exact file/line or seed line each comment addresses. Score factual accuracy, severity, concise explanation of impact and a usable next step. Separate a requirement failure from personal style. Comments intended for another person's PR stay drafts unless posting them is explicitly authorized.

## E-04 — Disagree using evidence and a decision

**Learning direction:** read Google's [handling pushback](https://google.github.io/eng-practices/review/reviewer/pushback.html) and [review standard](https://google.github.io/eng-practices/review/reviewer/standard.html). Focus on reconsidering a suggestion when the evidence changes and balancing improvement with unnecessary work.

**Assignment, 30 minutes:** a reviewer asks for a generic plugin framework around a helper with two fixed callers. The next known requirement adds a third caller with the same operation. Draft a response that fairly restates the concern, explains your proposed boundary, and offers a concrete condition under which you would introduce the framework. Then answer one coach follow-up: a real independently deployed extension now needs a new operation.

**Concrete cases:** distinguish “another caller” from “a separately changing implementation.” Changing your recommendation after the follow-up is acceptable; defending the original answer regardless of evidence is not the goal.

**Deliverable and scoring evidence:** a reply of roughly 150–250 words and a short follow-up. Score clarity, accurate treatment of the other position, concrete tradeoffs and an explicit next decision. Agreeing with the coach is not itself a scoring criterion.

## E-05 — Shape a small product pitch

**Learning direction:** read Shape Up's free [Set Boundaries](https://basecamp.com/shapeup/1.2-chapter-03), especially choosing an appetite and narrowing the problem, and [Write the Pitch](https://basecamp.com/shapeup/1.5-chapter-06), concentrating on the problem and exclusions.

**Assignment, 45 minutes:** shape this request from the progress-app vision: “I want to know what to practice next without hunting through old reviews.” Choose one learner situation, a small initial appetite, a possible solution shape, and an observable success criterion. Identify a risk worth resolving before implementation. Leave comprehensive analytics, accounts and full Git history ingestion out unless one is indispensable to the selected outcome.

**Concrete case:** after a review records “practice distinguishing zero from missing,” the learner can discover that next action from the current progress view. Describe what happens when no review exists. Do not promise a numerical skill improvement merely because the page exists.

**Deliverable and scoring evidence:** a one-page pitch with a small sketch if useful. Score problem clarity, user outcome, appetite/scope fit, useful exclusions and risk judgment. A pitch proposes work; it does not authorize the coach to implement it or claim delivery.

## E-06 — Turn the pitch into one construction step

**Learning direction:** read Google's [Small CLs](https://google.github.io/eng-practices/review/developer/small-cls.html) for a self-contained change, then the acceptance-testing section of [The Practical Test Pyramid](https://martinfowler.com/articles/practical-test-pyramid.html) for observable consumer behavior.

**Assignment, 45 minutes:** take an accepted E-05 pitch, or a coach-supplied tiny feature if it is not available. Write one construction task naming the next useful piece, its inputs and what its consumer can do with its result. State genuine dependencies already available and any missing one. Follow the task with a compact proposed public contract and literal acceptance-test bodies in the project's language; mark proposed helpers as proposals, not executed tests.

**Concrete cases:** a progress record with next action “repeat zero parsing” produces that visible action; an absent action produces a clearly specified empty state. The high-level test steps should show those values without making the reader inspect a fixture to discover the story.

**Deliverable and scoring evidence:** one task/specification document. Score a complete small outcome, readable caller usage, explicit invalid/incomplete behavior and tests that would observe that outcome. Do not force a class hierarchy or database into the task before their need is established.

## E-07 — Reproduce and isolate a bug

**Learning direction:** use the Debugging portion of MIT's [Missing Semester lecture and notes](https://missing.csail.mit.edu/2020/debugging-profiling/), then [Node's debugger guide](https://nodejs.org/en/learn/getting-started/debugging). For Kotlin/C#, substitute the already-selected IDE debugger documentation from the language track.

**Assignment, 45 minutes:** the coach provides a 20–40 line local lookup with an in-memory cache and two language-specific greetings. A first request for person `p1` in English returns `Hello Ada`; a later request for the same person in Spanish should return `Hola Ada`, but returns the English greeting. Reproduce the defect, state two plausible causes before changing code, and use a breakpoint or focused observation to discriminate them. Do not print private payloads or credentials.

**Concrete cases:** English then Spanish, Spanish then English, and two different people. After the narrow correction, preserve the established repeat-request behavior and state exactly what your regression test proves. The coach supplies the starting fixture before the learner starts the assignment clock, so fixture construction is not hidden homework.

**Deliverable and scoring evidence:** reproduction command, failing-then-passing regression evidence, the small code change and a short causal note. Score discrimination between symptom and cause, useful tool use and scope control. A passing rerun without a causal explanation is insufficient.

## E-08 — Measure before choosing an optimization

**Learning direction:** use the Profiling portion of [Missing Semester](https://missing.csail.mit.edu/2020/debugging-profiling/) and [Node profiling](https://nodejs.org/en/learn/getting-started/profiling). The [algorithm/performance track](algorithms-performance.md) supplies the shared measurement protocol and Kotlin/.NET tools.

**Assignment, 45–60 minutes:** investigate a coach-supplied local report builder that reads a fixed fixture, groups entries and formats a summary. The concern is “the report feels slow,” not a predetermined algorithm fix. Separate input acquisition, repeated computation and output construction. Keep the same fixture and output checks while testing one hypothesis.

**Concrete cases:** record a small workload and a larger one, and distinguish a cold run from repeated runs. If acquisition dominates, changing the grouping loop might not improve the user's wait. If the proposed change adds an index, include its construction unless the real caller reuses it.

**Deliverable and scoring evidence:** one command to reproduce the comparison, environment/fixture identity, before/after observations and a decision to keep or reject the change. A justified “no optimization” is valid. Score comparable measurement, preserved outputs, memory/cost awareness and claims limited to the tested workload; do not turn noisy single samples into a broad speed claim.

## E-09 — Test the behavior at the right boundary

**Learning direction:** read the unit, integration and acceptance portions relevant to this exercise in [The Practical Test Pyramid](https://martinfowler.com/articles/practical-test-pyramid.html), then Google's [review guidance on tests](https://google.github.io/eng-practices/review/reviewer/looking-for.html). Focus on what an assertion establishes rather than test-count targets.

**Assignment, 45 minutes:** use one small already-submitted function or the coach's fixture. It reads a progress record and displays the next action. A supplied test only asserts that a rendering dependency was called. Replace or complement that weak evidence with the smallest test that observes the claimed result. Keep meaningful existing assertions, and separate pure transformation checks from a real file/DOM integration check when both claims matter.

**Concrete cases:** a valid next action is visible; an empty action is represented deliberately; malformed input follows the agreed error behavior. Temporarily return a plausible wrong action and confirm the relevant assertion fails, then restore the intended implementation.

**Deliverable and scoring evidence:** focused tests, their command/results and a sentence on what remains outside their claim. Score readable consumer actions, independently specified expected values, actual boundary observation and isolation. Do not add an entire browser/server stack to prove a pure calculation, or mock the boundary the test claims to verify.

## E-10 — Specify and prove a failure/retry contract

**Learning direction:** read the side-effects and repeated-request sections of AWS's [Making retries safe with idempotent APIs](https://aws.amazon.com/builders-library/making-retries-safe-with-idempotent-APIs/). Then use the current language's cancellation material: for example [.NET task cancellation](https://learn.microsoft.com/en-us/dotnet/standard/parallel-programming/task-cancellation), or the coroutine/AbortSignal references in the [language track](language-fluency.md).

**Assignment, 45–60 minutes:** a local fixture saves a practice result, but the response can be lost after saving. Define what a retry with the same request identity should observe and implement one narrow failure-path check. A second attempt with genuinely different intent must remain possible. Keep the exercise in one process/store unless the coach explicitly sizes a database variant separately.

**Concrete cases:** successful initial save; save succeeds but response is lost, followed by retry; cancellation before starting a save. State what you cannot promise once an operation has committed. If the same request identity is reused with different content, choose and test an explicit response.

**Deliverable and scoring evidence:** a small contract table, controlled failure test and implementation or clearly scoped contract-only submission as assigned. Score side-effect accounting, bounded retries/cancellation, cleanup ownership and honest scope. A process-local fake cannot prove multi-process database idempotency.

## E-11 — Own the first response to an incident

**Learning direction:** read the roles and practical checklist in the free SRE Workbook's [Incident Response](https://sre.google/workbook/incident-response/), then the concrete-action discussion in [Postmortem Culture](https://sre.google/workbook/postmortem-culture/). Use the principles at the scale of a small team; no incident-management platform is required.

**Assignment, 40 minutes:** tabletop scenario: at 10:00 a new import version is enabled; at 10:04 malformed-record errors rise; at 10:06 the previous version still reads existing data. The coach reveals observations one at a time. Keep facts separate from hypotheses, assign immediate investigation/communication responsibilities, and choose the next reversible mitigation based on the available evidence.

**Concrete cases:** a test request succeeds after mitigation, but an earlier failed request has not yet been retried. Explain what would justify saying service is recovered and what remains unknown. Do not claim that closing an incident note proves recovery.

**Deliverable and scoring evidence:** a short timestamped response record, a user-impact update draft and one follow-up with an owner and observable completion condition. Score prioritization, evidence handling, clear handoff and verification of recovery. No real messages, deployments or rollbacks are performed for this tabletop assignment.

## E-12 — Make a rollout and rollback reviewable

**Learning direction:** read the requirements/evaluation portions of the SRE Workbook's [Canarying Releases](https://sre.google/workbook/canarying-releases/) and the release-toggle portion of [Feature Toggles](https://martinfowler.com/articles/feature-toggles.html). A flag is an option, not a mandatory new subsystem.

**Assignment, 40 minutes:** a progress-record parser gains an optional `nextAction` field. Existing records omit it, and the previous app version does not understand it. Write a small rollout plan covering compatible reads, a reversible release boundary, what to observe, and the point at which rollback would no longer be safe if data later changes irreversibly.

**Concrete cases:** old record/new reader, new record/new reader, and new record/old reader after rollback. Specify evidence needed for each instead of writing “backward compatible.” Choose a simpler rollout when staged deployment adds no useful protection to a local app.

**Deliverable and scoring evidence:** a compatibility table, release/rollback steps, stop conditions and ownership. Score precise compatibility, detection, recovery and proportionality. The document proposes a release; it is not authorization to publish or modify a real environment.

## E-13 — Decide whether a kata belongs in the product

**Learning direction:** read the repository's [adoption-decision template](../templates/adoption-decision-template.md) and [progress-app vision](progress-app/vision.md). Use Google's [review design/functionality questions](https://google.github.io/eng-practices/review/reviewer/looking-for.html) as a short outside check.

**Assignment, 30 minutes:** choose one actual completed kata, such as a validated record parser or aggregation helper. Decide `adopt`, `adopt with changes`, or `do not adopt` for one named progress-app use. Use its real review/tests; a nice-looking snippet alone is not adoption evidence. Preserve the practice artifact.

**Concrete cases:** the product may receive missing fields or malformed external data that the kata never handled. Explain whether the existing contract already covers those cases, a boundary must supply the guarantee, or the proposed reuse should be rejected. Identify the actual caller before introducing shared code.

**Deliverable and scoring evidence:** one filled adoption decision, with links to the source PR and evidence, what moves forward and the next smallest step. Use timing kind `adoption`. Score product fit, preservation of learning history, honest gaps and avoidance of unnecessary shared abstractions. This decision has its own PR; any independently assigned implementation uses a later PR and clock.

## E-14 — Deliver one real progress-app outcome

**Learning direction:** reread the first slice in the [progress-app vision](progress-app/vision.md), then selected portions of [MDN Fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch) for response/error handling and [textContent](https://developer.mozilla.org/en-US/docs/Web/API/Node/textContent) for plain text output. Use equivalent established framework operations if the app already has them.

**Assignment, up to 60 minutes:** after an accepted pitch/construction step and any relevant E-13 adoption decision, implement a local read-only view of the current focus and next action from one small fixture. Prefer the existing app's structure. If no app exists, the coach must size a minimal runnable one-screen slice before work begins; do not silently add authentication, charts, a database or a backend framework. Backend work remains a later independently useful slice.

**Concrete cases:** fixture focus `boundary parsing` and action `repeat zero parsing` appear as text; missing data shows an honest empty state; malformed/unavailable data shows the agreed error state rather than fabricated progress. Do not recalculate or replace historical coaching scores.

**Deliverable and scoring evidence:** runnable product code, a short start/demo command and focused evidence for the actual displayed result. Use timing kind `project`. Score a usable consumer outcome, fit with the accepted scope, failure behavior and maintenance cost. Unlike a kata, blocking product defects must be fixed before adoption/merge. Finishing this card does not mean the full dashboard is complete.

## E-15 — Practice senior ownership in a bounded scenario

**Learning direction:** revisit Shape Up's [Set Boundaries](https://basecamp.com/shapeup/1.2-chapter-03), especially narrowing the problem, and the SRE Workbook's [Incident Response](https://sre.google/workbook/incident-response/) practical checklist. Read only the portions relevant to the scenario.

**Assignment, 45–60 minutes:** the coach presents a generic request: “Show practice trends tomorrow.” Existing records have missing dates and one duplicated assignment. Halfway through the tabletop, the coach adds that a teammate depends on the current file format. Choose a useful honest slice, surface the consequential uncertainty, propose the next construction step, and respond to the changed constraint. This is a decision/communication exercise; implementing a dashboard is out of scope.

**Concrete cases:** an unknown completion date must not become today's date; a repeated assignment ID must not silently count twice; preserving old-file readability may constrain the first change. State which evidence would change your proposal and which decision requires the user's input.

**Deliverable and scoring evidence:** one cohesive scenario response containing the scope decision, one contract example, one risk/verification choice and a short stakeholder update draft. Use timing kind `simulation`. Score prioritization, coherent tradeoffs, adaptation and clear ownership. Separate outputs only if the coach assigns independent work; do not split one simulation into artificial PR fragments to improve a timing score.

## E-16 — Retest and choose the next learning experiment

**Learning direction:** read the actual recent assignment reviews and [scorecard](../scorecard.md), then the review/recall rules in the [coaching protocol](coaching-session.md). Use [Teach Yourself CS](https://teachyourselfcs.com/) only to choose one deeper concept when the evidence points there; do not restart a whole course because one rep was difficult.

**Assignment, 30–45 minutes:** select two comparable earlier attempts in one skill, including any unfinished or unmeasured attempt relevant to the comparison. The coach gives one changed small example before showing the prior solution. Explain it and, when code is the assessed skill, solve the small variation. Then identify the next focused practice experiment.

**Concrete cases:** a faster repeat that forgot the zero case is not improved correctness; a longer attempt that learned a needed API may still be useful progress; a missing timing artifact is unknown, not zero minutes. Keep independent and heavily assisted attempts distinguishable.

**Deliverable and scoring evidence:** the retest artifact plus a short reflection citing the actual prior PRs, strengths, one gap and the next changed rep. Score retained understanding, transfer and evidence-based self-assessment. Update scores only through the normal actual-submission review; do not smooth away regressions or manufacture a trend from unlike tasks.

## Reuse and progression

These are starting cards for an ongoing coach, not a fixed answer key. The coach can narrow a card, change the domain, add a language transfer, or return to an earlier weak area while keeping its intended skill and observable outcome clear. Repeating E-03 with a Kotlin cancellation diff or E-09 with a C# file reader should test the same review/testing judgment with different mechanics.

Keep the durable chain visible: assignment prompt → learner submission → actual PR review → scored evidence → understood feedback → next assignment. Use the original seven-area skill loop to ensure architecture and communication do not disappear during a language block, and use the implementation tracks to ensure comfortable design discussions do not replace writing code.

External resources checked on 2026-10-29. The readings above are free web articles, official documentation, course notes/videos or free online book sections; no new purchase is required.
