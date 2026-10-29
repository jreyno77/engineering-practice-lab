# C002-S01 — Enforce note ownership

Kind: **security** · Language: **TypeScript** · Appetite: **45–60 minutes** · One PR.

## Learning direction

When ready to begin, run this yourself from a clean checkout on `main`, before studying:

```sh
npm run assignment:start -- C002-S01 security
```

The coach provides this command without running it. If this attempt already has a branch and start commit, keep them instead of starting again. Copy the printed metadata into this assignment's PR. See the [assignment workflow](../../../docs/assignment-workflow.md) for prerequisites and recovery.

Read [OWASP Authorization](https://cheatsheetseries.owasp.org/cheatsheets/Authorization_Cheat_Sheet.html), especially default denial and checks on every request. Review the **SEC-03** task in [the security track](../../../docs/security.md#sec-03--authorize-the-requested-object). Optional demonstration: the linked PortSwigger access-control lab; it is preparation, not a requirement to set up a web framework for this rep.

Study a signed-in user `u1` requesting a note owned by `u2`. Identify which fact establishes identity and which separate fact permits access.

## Build

Create a small public read operation over an in-memory note store. Fixture: `n1` belongs to `u1`; `n2` belongs to `u2`. Begin with the specified defect: any signed-in user can read either note. Prove the incorrect cross-user access through that read operation, then implement the resource rule.

Expected: `u1` can read `n1`; `u1` cannot read `n2`; anonymous callers cannot read either; an unknown ID follows a documented response policy. A denied result contains no note body. There is no administrator role in this exercise.

The test must invoke the assembled operation, not merely a helper called `isAuthorized`. No HTTP framework or external service is necessary for this scope.

## Review and repeat

Explain why valid input, login, and random-looking IDs do not replace object authorization. After a week add a second read path such as export, in its own PR, and prove the same rule holds there.
