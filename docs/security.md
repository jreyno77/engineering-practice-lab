# Security: find the boundary, prove the defect, prevent the class

Practice security while implementing ordinary features. A valid value can still be unauthorized, a well-typed string can still be unsafe in a query, and a fast operation can still exhaust a shared resource. Each rep should improve both recognition and the implementation habit that prevents the defect.

Use the [curriculum](curriculum.md) for sequencing. Work in the current language block: TypeScript, Kotlin, or C#. The examples below are intentionally small training cases with generic data. Use your local disposable fixtures or the linked purpose-built PortSwigger labs. No real accounts, production data or public-target scanning are needed.

## How to run one assignment

Each `SEC` card is a separate PR with a distinct attempt ID, for example `SEC-02-r01`; use the [assignment workflow](assignment-workflow.md). A hosted lab is optional preparation for that card. If you submit a separate hosted-lab writeup as another assignment, give it another ID and PR rather than bundling unrelated work.

1. Read the selected section for 10–15 minutes. Before coding, write one sentence each for the asset, untrusted input, trust boundary, and harm.
2. Reproduce one small failing example locally. Observe actual behavior at the relevant boundary: database results, returned records, rendered DOM, opened file or emitted request. A string containing the expected API call does not prove the defense works.
3. Implement the narrow defense with the runtime/framework's established API. Add a valid-use example so the defense does not merely reject everything.
4. Explain why a nearby tempting fix is insufficient. Record the resource and API you needed to look up.
5. Return after about 7 days with a changed input or second route, then after 21 days without the vulnerability's name in the prompt.

Budget 30–60 minutes for one local slice, including the reading. Stop with an honest unfinished result if setup or investigation exceeds that budget; preserve the original clock. Database, framework, or concurrent integration variants may need a separately scheduled longer session. Recognition, negative-case correctness and normal usability matter more than fastest elapsed time.

## Foundation resources

| Free resource | What to read first | Why it belongs here |
|---|---|---|
| [OWASP input validation](https://cheatsheetseries.owasp.org/cheatsheets/Input_Validation_Cheat_Sheet.html) | Input Validation Strategies; Common Pitfalls | Distinguish data validity from authorization and safe use at a sink. |
| [PortSwigger Academy getting started](https://portswigger.net/web-security/getting-started) | Choose an Apprentice lab from the topic being practiced | See an observable failure in an intentionally vulnerable application. Account/tool setup is separate from the coding rep. |
| [OWASP threat modeling](https://cheatsheetseries.owasp.org/cheatsheets/Threat_Modeling_Cheat_Sheet.html) | Identify what can go wrong and what to do about it | Keep a tiny threat note next to the code instead of relying only on a generic checklist. |
| [OWASP cheat-sheet index](https://cheatsheetseries.owasp.org/) | The topic linked by the current card | A prevention reference to revisit while coding, not a list to memorize. |

No paid security book is required. Use the [CS resource bridge](resources.md) for the networking, operating-system and database concepts behind these failures; the exercises here train the implementation boundary.

## SEC-01 — Validate data without losing legitimate values

**Learn:** [OWASP Input Validation](https://cheatsheetseries.owasp.org/cheatsheets/Input_Validation_Cheat_Sheet.html), sections on structured input and field rules. For C#, also read [System.Text.Json deserialization](https://learn.microsoft.com/en-us/dotnet/standard/serialization/system-text-json/deserialization): successful deserialization is not the full domain contract.

**Starting defect:** a request handler casts arbitrary parsed JSON to `{quantity:number, note?:string}` and checks `if (!quantity)`. Its feature accepts integer quantities from 0 through 100 and notes of at most 200 characters. Unknown fields must be rejected. A missing quantity is invalid; a missing note is allowed.

**Build:** a small boundary function that returns either accepted data or a deliberate validation result. Exercise `0`, `100`, `-1`, `101`, `1.5`, `"2"`, missing quantity, `null`, and `{"quantity":2,"isAdmin":true}`. Expected: the first two pass; the rest fail. An empty note passes. The next calculation receives prepared data and does not repeat every input check.

**Transfer:** use `unknown` plus narrowing or an existing runtime schema in TypeScript; serialization plus explicit domain checks in Kotlin/C#. Explain why compile-time types and client-side validation alone do not establish this boundary. Keep authorization out of a generic schema validator.

## SEC-02 — Keep query structure separate from data

**Learn:** [OWASP SQL prevention](https://cheatsheetseries.owasp.org/cheatsheets/SQL_Injection_Prevention_Cheat_Sheet.html), parameter binding and dynamic structure. Optional lab: [hidden rows through a WHERE clause](https://portswigger.net/web-security/sql-injection/lab-retrieve-hidden-data).

**Starting defect:** a lookup builds `SELECT name FROM members WHERE name = '` + input + `'`. A disposable database contains `Ada`, `O'Neil`, and `Grace`.

**Build:** replace concatenation with bound data using the actual database driver. `Ada` returns one matching row; `O'Neil` returns that exact row; a nonmember returns none; a quote-containing condition-like string never broadens the result. Keep a second table intact. If adding sorting later, choose column/direction from application-owned alternatives rather than assuming a data parameter can stand for an identifier.

**API lookup:** TypeScript: [Node SQLite prepared statements](https://nodejs.org/api/sqlite.html) or the project's existing driver's parameters; check the selected Node version's API. Kotlin/JVM: [JDBC prepared statements](https://docs.oracle.com/javase/tutorial/jdbc/basics/prepared.html). C#: [EF Core SQL queries](https://learn.microsoft.com/en-us/ef/core/querying/sql-queries), especially parameterization versus raw SQL. Preserve parameters as parameters; building an interpolated string before passing it to a raw-query API loses that guarantee. The test must execute against a real disposable database, not only inspect a mocked query.

## SEC-03 — Authorize the requested object

**Learn:** [OWASP authorization](https://cheatsheetseries.owasp.org/cheatsheets/Authorization_Cheat_Sheet.html), default denial and checks on each request. Optional lab: [user ID taken from a request parameter](https://portswigger.net/web-security/access-control/lab-user-id-controlled-by-request-parameter).

**Starting defect:** `readNote(principal, id)` returns `notes.get(id)` whenever any user is signed in. Fixture: note `n1` belongs to `u1`; note `n2` belongs to `u2`. The feature has no administrator role.

**Build:** let `u1` read `n1`; deny `u1` reading `n2`; deny anonymous access; handle an unknown note according to a documented response policy without leaking note contents. Add a second access path, such as export, on the delayed repeat and prove it applies the same rule. Random-looking IDs do not replace ownership checks.

**Transfer:** [Ktor authentication](https://ktor.io/docs/server-auth.html) establishes identity; the exercise still needs the resource rule. In C#, use [ASP.NET Core resource authorization](https://learn.microsoft.com/en-us/aspnet/core/security/authorization/resource-based?view=aspnetcore-10.0). Exercise the route/service assembly so an authorization helper cannot pass tests while the endpoint forgets to call it.

## SEC-04 — Render untrusted text as text

**Learn:** [OWASP XSS prevention](https://cheatsheetseries.owasp.org/cheatsheets/Cross_Site_Scripting_Prevention_Cheat_Sheet.html), safe sinks and context-specific encoding. Optional lab: [reflected input in an HTML context](https://portswigger.net/web-security/cross-site-scripting/reflected/lab-html-context-nothing-encoded).

**Starting defect:** a profile renderer assigns a user's display name to `innerHTML`. The product supports plain text names, not user HTML.

**Build:** render `Ada`, `A & B`, and `<b>Sam</b>` as literal text. Assert text content and the absence of a created `b` element in a DOM test; ensure the input does not become markup. Then inspect a URL attribute separately: a text defense is not a universal defense for every HTML, JavaScript or URL context.

**Transfer:** for server-rendered C#, read [ASP.NET Core XSS guidance](https://learn.microsoft.com/en-us/aspnet/core/security/cross-site-scripting?view=aspnetcore-10.0) and compare normal Razor output with raw HTML output. If a future feature really requires rich HTML, create a separate assignment using a maintained sanitizer with an explicit policy; do not invent a regex sanitizer.

## SEC-05 — Constrain file access by design

**Learn:** [PortSwigger path traversal](https://portswigger.net/web-security/file-path-traversal/lab-simple); [Node path documentation](https://nodejs.org/api/path.html), especially Windows versus POSIX behavior. Optional deeper reading: [OWASP upload guidance](https://cheatsheetseries.owasp.org/cheatsheets/File_Upload_Cheat_Sheet.html), filename and storage choices.

**Starting defect:** a download function accepts a client path and concatenates it with `reports/`. Its actual feature only needs two report IDs, `monthly` and `annual`.

**Build:** accept those IDs and resolve them through an application-owned mapping to fixture files. Unknown IDs, `../outside.txt`, absolute paths and platform-specific separator variants must return a rejection without opening an outside file. The valid ID returns the fixture's exact bytes. Test with a real temporary directory and a harmless outside sentinel file.

**Boundary:** this narrow exercise removes the need for arbitrary paths. A later arbitrary-path assignment must account for canonicalization, symlinks and race conditions; a string-prefix check or `normalize()` alone is not a sandbox. C# transfer uses application-owned IDs and `System.IO` for actual access; Kotlin/JVM uses `java.nio.file`. Do not enlarge the interface merely to practice path tricks.

## SEC-06 — Constrain outbound requests

**Learn:** [OWASP SSRF prevention](https://cheatsheetseries.owasp.org/cheatsheets/Server_Side_Request_Forgery_Prevention_Cheat_Sheet.html), known-destination cases and redirect handling. Optional lab: [a server making an unintended local request](https://portswigger.net/web-security/ssrf/lab-basic-ssrf-against-localhost).

**Starting defect:** a stock-status endpoint fetches a URL supplied by the requester. The real feature only supports supplier IDs `north` and `south`.

**Build:** map those IDs to configured destinations and refuse client-controlled URLs, hostnames and ports. Use an in-process request recorder or local fixture server: valid IDs reach the intended fixture; `http://127.0.0.1/`, an unknown ID, and a user-info URL never produce an outbound request. A redirect response must not silently send the client to an unapproved destination.

**Boundary:** map fixed destinations and configure redirect policy in the real HTTP client. This does not solve arbitrary URL fetching or DNS rebinding; those require a separate design including resolution and network egress controls. For this card, do not contact cloud metadata or other real internal services.

## SEC-07 — Preserve the origin of a state-changing request

**Learn:** [OWASP CSRF prevention](https://cheatsheetseries.owasp.org/cheatsheets/Cross-Site_Request_Forgery_Prevention_Cheat_Sheet.html), use of framework defenses. Optional lab: [cookie-authenticated change without CSRF defenses](https://portswigger.net/web-security/csrf/lab-no-defenses). C#: [ASP.NET Core antiforgery](https://learn.microsoft.com/en-us/aspnet/core/security/anti-request-forgery?view=aspnetcore-10.0).

**Starting defect:** a cookie-authenticated POST changes the current user's notification setting without an antiforgery check. Use a disposable local app and session.

**Build:** wire the framework's supported defense into this one route. A valid same-session form submission changes the setting; missing, altered and another session's token fail; a GET does not change state. Observe the persisted setting as well as the response. Explain the difference between authentication, authorization and CSRF protection.

**Boundary:** the contract assumes browser-managed cookie credentials. Do not blindly apply the same mechanism to every API authentication scheme. Do not implement a new token scheme or treat CORS as a substitute for the required request defense.

## SEC-08 — Handle secrets and passwords through existing facilities

**Learn:** [OWASP password storage](https://cheatsheetseries.owasp.org/cheatsheets/Password_Storage_Cheat_Sheet.html), modern password hashing; [OWASP secrets management](https://cheatsheetseries.owasp.org/cheatsheets/Secrets_Management_Cheat_Sheet.html), lifecycle and logging. These are two alternative assignments, not one large authentication project.

**Choose one:**

- `SEC-08-password-r01`: replace a toy plaintext password comparison in a local fixture with a maintained framework/password-hashing API. Correct password verifies; wrong password fails; two hashes for the same password need not be equal; stored output and logs contain no plaintext. Keep algorithm implementation out of the exercise. Document the API and current configuration guidance. Avoid substituting a fast general hash for a password facility.
- `SEC-08-secrets-r01`: repair a tiny logger that dumps the entire request/configuration object. Keep a request ID and outcome visible while an explicitly supplied fake secret never appears in the captured logs. Missing configuration should fail clearly without printing it. Explain that removing a committed secret from the latest file does not revoke it; the recovery action is rotation/revocation, followed by the appropriate history treatment.

**Transfer:** use the chosen web framework's identity facilities for passwords and established configuration/secret providers for credentials. The goal is correct use and boundaries, not memorizing cryptographic internals. A separate delayed repeat can take the other option, in its own PR.

## SEC-09 — Bound work and inspect dependency exposure

**Learn:** [Node: Don't Block the Event Loop](https://nodejs.org/en/learn/asynchronous-work/dont-block-the-event-loop), expensive callbacks and input-dependent work; [OWASP denial-of-service guidance](https://cheatsheetseries.owasp.org/cheatsheets/Denial_of_Service_Cheat_Sheet.html), application controls. These are alternative small assignments.

- `SEC-09-limits-r01`: a local import endpoint reads every supplied item and starts all operations at once. Define an exercise limit of 100 items and at most 4 simultaneous operations. Test 0, 100 and 101 items; the oversized request is rejected before starting operations. A controlled fake operation records peak concurrency and cancellation cleanup. Record the body-size limit at the actual HTTP boundary too; checking array length after parsing does not bound the received body. Distinguish the exercise constants from production limits, which need workload evidence.
- `SEC-09-dependency-r01`: use the existing lockfile and [npm audit documentation](https://docs.npmjs.com/cli/v11/commands/npm-audit/) to investigate one actual finding, if present. Record affected package/version, dependency path, vulnerable use, proposed patch and compatibility evidence. If there is no finding, use a published advisory as a paper exercise without installing a vulnerable package. Do not run a forced blanket upgrade or interpret a clean audit as proof of security. Kotlin/.NET repeats use the project's corresponding dependency report and advisory sources.

Submit one option per PR. Resource limits need tests of the limiting behavior; dependency work needs an evidence-backed decision and the affected application's normal checks.

## SEC-10 — Keep a business invariant under concurrency

**Learn:** [PortSwigger race conditions](https://portswigger.net/web-security/race-conditions), limit overruns and prevention; [PostgreSQL UPDATE](https://www.postgresql.org/docs/current/sql-update.html), conditions, returned results and affected-row semantics.

**Starting defect:** a coupon redemption checks whether `uses === 0`, waits for another operation, and then increments. The coupon can be redeemed once, and two callers share the same stored record.

**Build:** reproduce two overlapping attempts with an explicit barrier, not a lucky sleep. Then use a suitable atomic storage operation or transaction so exactly one succeeds, the other reports “already used,” and the stored use count is 1. A single first request still succeeds; a later retry must not grant another benefit.

**Boundary:** an in-memory mutex only protects its own process. The database variant must use two real connections and assert the final stored result; it cannot be proven by a mocked transaction method. If database setup is unavailable, complete the in-memory version and label that limit, then schedule the database version as a separate PR. Discuss whether idempotency is also required; do not confuse preventing duplicate state changes with making repeated responses identical.

## C# transfer exercise: authorization remains necessary after parsing

Use a separate attempt such as `SEC-03-csharp-r01`. In a tiny ASP.NET Core fixture, a `Note` record has `Id`, `OwnerId` and `Text`. The GET route currently returns a successfully deserialized record to every authenticated principal. Follow the [resource authorization documentation](https://learn.microsoft.com/en-us/aspnet/core/security/authorization/resource-based?view=aspnetcore-10.0) and apply the ownership rule at the route's actual read boundary. Preserve the same `u1/n1`, `u1/n2`, anonymous and missing-record examples from SEC-03. This directly trains the difference between C# types, identity middleware and the resource-specific permission decision.

## What to notice while writing ordinary assignments

Use this short review when the code touches a relevant boundary; do not append irrelevant controls to every kata.

| Boundary | Ask while coding |
|---|---|
| Input | What is untrusted, what is allowed, and where is size/work bounded? |
| Identity and objects | Who may do this to this object, and is that checked on every access path? |
| Queries and rendering | Which API keeps data from becoming syntax in this specific context? |
| Files and network | Can the caller choose a destination they should not control? What follows redirects or aliases? |
| State changes | Can two requests violate an invariant? What happens on retries? |
| Secrets and dependencies | Could this appear in logs/artifacts? What library/version actually provides the guarantee? |

The review record contains the concrete exploit/regression example, defense location, valid-use example, API learned, remaining limitation and next recall date. Keep elapsed time beside those outcomes; never trade a missing security assertion for a faster score.

Resources were checked on 2026-10-29. Recheck version-sensitive framework APIs against the actual project's runtime before each implementation; learning links are not a frozen security policy.
