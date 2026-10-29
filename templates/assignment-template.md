# Assignment: <one outcome>

- ID: `<cycle/day/skill-attempt>` (unique per attempt; ASCII letters, digits, `/`, `_`, `-`)
- Kind: fluency / kata / refactor / security / performance / pitch / architecture / communication / review / tooling / project / adoption / simulation / debugging / testing / reliability
- Language/runtime: TypeScript / Kotlin / C# + version
- Appetite: 30–60 minutes, or an explicitly chosen smaller rep
- Prior attempt / prerequisite: link, or none
- Assistance mode: independent / hinted / assisted

## Start when ready

Coach: replace both placeholders below with this assignment's actual ID and kind before giving the prompt. Provide the command for the learner to copy and paste; do not execute it or create their start marker.

From a clean checkout on `main`, run this yourself immediately before the assigned reading and work:

```sh
npm run assignment:start -- <assignment-id> <kind>
```

If you already started this attempt, continue with its existing branch and original start commit. Copy the command's printed metadata into this assignment's PR. See the [assignment workflow](../docs/assignment-workflow.md) for prerequisites and recovery.

## Learning direction

List 2–4 specific resources, normally one primary explanation/video and one official API reference. Name the section/lecture, estimated study portion, what to look for, and whether it is free or an optional owned-book reading. An entire documentation homepage is not an assigned reading.

## Problem and examples

State what a caller needs and what this assignment delivers. Include literal inputs, expected results, one edge case, and the allowed scope. Keep the solution open enough to practice judgment. For a refactor, define the existing behavior to preserve; for security, show both allowed and rejected behavior.

## Submission

- Runnable code and focused tests, or the specific pitch/design/review document requested.
- Exact command and observed result, including any failures.
- A short note: tool/library chosen, one alternative, uncertainty, and learning.
- PR metadata from the repository PR template. Keep one assignment in this PR.

## Changed repeat

Name a variation for roughly 2, 7, or 21 days later. Create its branch and start commit when you actually begin it. Do not create a speculative clock now.
