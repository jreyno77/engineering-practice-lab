# Additional implementation practice plan

## Intention

Become faster at turning a problem into a clear working solution, with enough language and ecosystem knowledge to recognize existing tools. Build fluency through repeated implementation in TypeScript, Kotlin, and C#, and retain architecture and communication practice at a smaller dose.

The [course map](curriculum.md) contains an optional sequence and assigned resources. [Teach Yourself CS](https://teachyourselfcs.com/) supplies deeper foundations; this plan connects them to everyday implementation. The original [training plan](../training-plan.md) and adaptive daily coaching remain in place. Use Cycle 002 when a new coding rep fits; the existing Day 06 architecture prompt and other broader skills remain available in that same coaching loop.

## Priorities

| Priority | Observable improvement |
|---|---|
| Language fluency | Start a small program without setup confusion; choose the right collection/API; explain nullability, mutation, errors, and async behavior. |
| Ecosystem familiarity | Know whether a capability is built in, supplied by the framework, or needs a library; use documentation efficiently. |
| Algorithms | Recognize a useful pattern, explain its invariant and complexity, and implement it correctly on unfamiliar inputs. |
| Refactoring | Recognize common smells quickly, make a small behavior-preserving change, and avoid an abstraction that adds no value. |
| Performance | Find the bottleneck, make a comparable measurement, and improve it without weakening correctness. |
| Security | Identify an untrusted boundary, demonstrate the vulnerability safely, fix it with established mechanisms, and test both allowed and denied behavior. |
| Design and communication | Write a concise pitch or contract and explain a decision so another person can act on it. |

## Workload and language blocks

Use the course's anchor-language blocks instead of switching languages every day. A normal exercise should fit roughly 30–60 minutes; split a larger outcome into independently useful assignments before starting. The schedule can stretch around available time. A slower thoughtful attempt is useful evidence.

A sustainable menu is two language/library reps, one algorithm rep, and one refactor or security rep per study week. Alternate refactoring and security, and use the other as a short recall drill when time permits. An optional pitch or architecture rep maintains current strengths. Do not turn this menu into a requirement to complete five PRs every day.

Every independently assigned deliverable gets a separate PR, including a pitch, kata, each individual refactor, and a security fix. A short verbal retrieval question inside an assignment needs no extra PR; a separately assigned coded refresh does.

## How to build useful recall

1. Before looking up the answer, name a plausible API or algorithm and explain why it might fit. Keep this brief.
2. Study the assigned page or lecture section. Write a tiny example, including one failure or edge case.
3. Close the example and solve the assigned variation. Looking up an exact signature is allowed and should become faster with practice.
4. Record what you did not know in an API notebook. Include a problem cue, not just a method name.
5. Revisit after about 2, 7, and 21 days with changed inputs or constraints. Reschedule freely; the spacing matters more than the calendar.

Do not memorize entire libraries. Learn the map: where to look, what responsibility each library owns, and which common operations should become automatic.

## Using AI while developing the skill

Choose and record the mode before each attempt:

- **Independent:** documentation and debugger allowed; no generated implementation or algorithm answer before the first attempt is saved.
- **Hinted:** ask for one question, counterexample, or relevant documentation pointer at a time; record hints.
- **Assisted:** use generated code and practice reviewing, testing, and refactoring it. Keep these results separate from independent recall measurements.

After the attempt, AI can propose counterexamples, review complexity/security, compare idioms, or ask you to explain an unfamiliar API. Rebuild a small variation yourself to establish learning. A generated passing solution is evidence about that artifact; it does not by itself show personal fluency.

## Completion and feedback

A practice attempt is complete when its submission, executed checks (including failures), explanation, and review/understanding are recorded. An incorrect baseline may be preserved as completed practice with its failed outcome clearly recorded. It must not be marked correct or silently promoted into product code. Production-intended work needs its blocking problems fixed before adoption.

Keep the original attempt visible in commits. If fixing it is a new assignment, give that assignment its own PR and clock, linking the original. Do not rewrite the old review to match the improved result.

Use [practice review](../templates/practice-review-template.md) and [scorecard observations](../scorecard.md). Measure speed alongside correctness, assistance, familiarity, and comparable scope. Keep elapsed commit-to-merge time distinct from optional self-reported active minutes and actual program runtime.

## Course maintenance

At the end of a block, choose two things that improved, one repeated gap, and the next few assignments. Prefer fewer finished exercises to a large unfinished backlog. Rotate the problems while retaining the same skill so a faster repeat reflects transferable understanding instead of a memorized answer.

The progress dashboard remains optional project work. A kata becomes app code only through the existing [adoption decision](../templates/adoption-decision-template.md).
