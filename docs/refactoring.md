# Refactoring: recognize, choose, preserve, repeat

The aim is to recognize a costly design choice quickly, choose a small useful change, and make it safely. Shorter code is not the score. Preserve the caller's results, errors, ordering, mutation and relevant performance while making the next change easier.

Use these drills alongside the [curriculum](curriculum.md). Each `RF` card is one assignment and one PR. Three refactors on a day means three start commits, three branches and three PRs, as described in the [assignment workflow](assignment-workflow.md). Use an attempt suffix such as `RF-01-r01`, then `RF-01-r02` for a later independent repeat. Do not reset the first attempt's clock during repairs.

## Learning direction

Start with these free resources; the book is a valuable optional companion, not an entry requirement.

| Resource | Specific portion | Use it for |
|---|---|---|
| [Fowler's Workflows of Refactoring](https://martinfowler.com/articles/workflowsOfRefactoring/) | Two Hats, Comprehension Refactoring, Preparatory Refactoring | Decide whether the current step changes behavior or rearranges existing behavior, and why that rearrangement helps. |
| [Refactoring, second edition: author page](https://martinfowler.com/books/refactoring.html) | Follow “Free Download of Opening Chapter” or “Interviewed by Camilla Crispim” | A worked introduction, or the author's hour-long video discussion of the edition. Watch in portions; do not postpone practice until it is finished. |
| [Fowler's free catalog](https://refactoring.com/catalog/) | Read only the card for today's chosen move | Learn the name and shape, then try it on the original exercises below without copying the catalog example. |
| [Second-edition contents, publisher](https://www.informit.com/store/refactoring-improving-the-design-of-existing-code-9780134757698) | Chapters 2–4, then the relevant chapter below | Use the book's reasoning and mechanics when the short catalog sketch leaves a gap. Chapter numbers here are for the 2018 second edition; use the catalog aliases with an older edition. |

If using the book, prioritize Chapter 2 (principles), Chapter 3 (smells), and Chapter 4 (tests). Then read selected entries from Chapters 6–12 as you practice. Do not read the entire catalog before writing code.

## A 30–45 minute rep

1. **Inspect, 3 minutes:** name the caller and the difficulty. Pick one change; also name a plausible reason to leave the code alone. For a repeat, do this before opening the resource.
2. **Characterize, 5–10 minutes:** copy the card's original snippet into an assignment file; add a few tests for the supplied observations. Run them against the starting code. A green baseline matters here.
3. **Transform, 10–20 minutes:** make one small step, run the relevant tests, and continue. Use the IDE's rename/extract/move tools where they preserve the intended contract; inspect the diff.
4. **Review, 5 minutes:** show the caller before/after. Check every responsibility still has an owner. Record one rejected alternative and any changed precondition.
5. **Recall, 2 minutes:** close the reference and describe the move and one situation where it would be a poor choice.

For a pure refactor, keep the same behavioral assertions before and after. A bug fix needs its own failing example and an explicit behavior change. When an API changes, migrate all supplied callers and state the migration; do not describe an externally broken API as behavior preservation. Seed code below is deliberately small and awkward, not a proposed production design. Put each snippet in its own module. TypeScript is the first pass; repeat selected cards in Kotlin and C# during their language blocks.

Record identification minutes, transformation minutes, failed preservation checks, hints used, and the CI elapsed time. Active minutes are self-reported; CI elapsed time includes breaks and review. First complete two correct attempts; only then try a shorter personal timebox. Correctness and readability remain gates.

## Recognition prompts

On a repeat, have the mentor hide the card heading and chosen move. Use a smell as a question to investigate, not a verdict based on line count.

| Signal to notice | Question before changing it | Starting cards |
|---|---|---|
| A long function mixes parsing, policy and presentation | Which responsibility can receive a clear prepared input? | RF-01, RF-04 |
| A helper or middle layer merely renames the next call | What decision or source of change does it own? | RF-02 |
| Nested decisions obscure the normal path | Which failure takes precedence when several conditions apply? | RF-03 |
| The same values travel together through many signatures | Are these one concept, or merely adjacent arguments? | RF-05 |
| A function repeatedly reaches into another component's data | Where should this knowledge live? | RF-06 |
| Collection mechanics hide selection and transformation | Can standard operations express the intent while preserving evaluation? | RF-07 |
| A query unexpectedly changes state | Does the caller need a read, a command, or an atomic combined operation? | RF-08 |
| Two stored values must always be updated together | Is one derived, and is recomputing it affordable? | RF-09 |
| Boolean arguments are unreadable at call sites | Is the flag choosing operations or representing ordinary data? | RF-10 |
| Mutable data escapes its owner | Which callers actually need mutation, and what promises change? | RF-11 |
| Strings or numbers carry repeated domain rules | Can controlled construction centralize meaningful behavior? | RF-12 |
| Similar conditionals or inheritance spread changes | Would alternative behavior ownership reduce changes, or add ceremony? | RF-13, RF-14 |
| Repeated scans dominate measured work | Which existing collection or algorithm fits the exact contract? | RF-15 |

## First rotation: original drills

### RF-01 — Make a calculation visible

**Read:** [Extract Function](https://refactoring.com/catalog/extractFunction.html); second edition Chapter 6. Look for a calculation whose meaning is hidden by presentation details.

```ts
export function receipt(items: readonly { name: string; cents: number }[]) {
  let total = 0;
  for (const item of items) total += item.cents;
  return items.map(item => item.name).join(", ") + ": " + total + " cents";
}
```

Extract the meaningful calculation with prepared inputs. Preserve `[] → ": 0 cents"` and `[{name:"pen",cents:120},{name:"pad",cents:230}] → "pen, pad: 350 cents"`; inputs remain unchanged. Do not add a receipt-builder class or validation rules absent from this contract. Repeat with a calculation used by two callers, then compare whether extraction earns its name.

### RF-02 — Remove a layer that says nothing

**Read:** [Inline Function](https://refactoring.com/catalog/inlineFunction.html); Chapter 6. Contrast this with RF-01: extraction is not always progress.

```ts
function getNumber(value: number) { return value; }
function calculate(value: number) { return getNumber(value); }
export function remaining(capacity: number, used: number) {
  return calculate(capacity - used);
}
```

Simplify the call path while preserving `(10,3) → 7`, `(10,10) → 0`, `(3,5) → -2`. Then explain why you would retain a wrapper that actually owns rounding, policy, instrumentation, or a public compatibility boundary. Do not silently clamp negatives.

### RF-03 — Flatten decisions without changing precedence

**Read:** [Replace Nested Conditional with Guard Clauses](https://refactoring.com/catalog/replaceNestedConditionalWithGuardClauses.html); Chapter 10.

```ts
export function access(user: { active: boolean; paid: boolean } | null) {
  if (user !== null) {
    if (user.active) {
      if (user.paid) return "allowed";
      else return "payment-required";
    } else return "inactive";
  } else return "anonymous";
}
```

Preserve all four results, including inactive-and-unpaid → `"inactive"`. Name the normal path. Reject a generic rules engine for this small ordered decision. Repeat by adding cleanup in a `finally` block: early returns must not skip required cleanup.

### RF-04 — Separate decoding from calculation

**Read:** [Split Phase](https://refactoring.com/catalog/splitPhase.html); Chapter 6.

```ts
export function lineTotal(line: string) {
  const parts = line.split("|");
  if (parts.length !== 2) throw new Error("invalid line");
  const quantity = Number(parts[0]);
  const cents = Number(parts[1]);
  if (!Number.isInteger(quantity) || !Number.isInteger(cents)) {
    throw new Error("invalid line");
  }
  return quantity * cents;
}
```

Make the internal calculation receive parsed numbers; keep validation at the implemented boundary. Preserve `"3|120" → 360`, `"0|120" → 0`, and rejection of `"3.5|120"` and `"x|120"`. Characterize `"|120" → 0` and `"-2|120" → -240` too: tightening those rules is a separate behavior change, not a hidden cleanup. Avoid moving the whole function unchanged into a helper called `process`.

### RF-05 — Give related parameters a name

**Read:** [Introduce Parameter Object](https://refactoring.com/catalog/introduceParameterObject.html); Chapter 6.

```ts
function contains(value: number, low: number, high: number) {
  return value >= low && value <= high;
}
function clamp(value: number, low: number, high: number) {
  return Math.max(low, Math.min(high, value));
}
export function describe(value: number) {
  return { inside: contains(value, 0, 10), clamped: clamp(value, 0, 10) };
}
```

Model the shared inclusive interval and migrate both internal callers. Preserve `describe(-1) → {inside:false,clamped:0}`, `describe(10) → {inside:true,clamped:10}`. Do not manufacture an object for unrelated parameters or add mutable configuration. Repeat with a real second interval, not a framework for imagined ranges.

### RF-06 — Move knowledge to its owner

**Read:** [Move Function](https://refactoring.com/catalog/moveFunction.html); Chapter 8.

```ts
type Basket = { prices: readonly number[]; discount: number };
class Screen {
  total(basket: Basket) {
    return basket.prices.reduce((sum, price) => sum + price, 0) - basket.discount;
  }
  render(basket: Basket) { return "Total: " + this.total(basket); }
}
export const show = (basket: Basket) => new Screen().render(basket);
```

Put basket calculation where a second consumer could use it without a screen. A function taking a basket is sufficient. Preserve `show({prices:[100,200],discount:50}) → "Total: 250"`, empty prices, and discount greater than subtotal. The move must remove UI ownership of the rule, not simply move the screen to another file.

### RF-07 — Compare a loop and a pipeline

**Read:** [Replace Loop with Pipeline](https://refactoring.com/catalog/replaceLoopWithPipeline.html); Chapter 8. Pair with the collection section of the [language track](language-fluency.md).

```ts
export function labels(rows: readonly { active: boolean; name: string }[]) {
  const result: string[] = [];
  for (const row of rows) {
    if (row.active) result.push(row.name.trim());
  }
  return result;
}
```

Express the selection and mapping using standard collection operations. Preserve encounter order, duplicates and empty names: active `" a "`, inactive `"b"`, active `" "`, active `" a "` yields `["a","","a"]`. Do not claim fewer allocations or faster runtime without measurement. On the Kotlin repeat, compare eager collections with a sequence on a relevant workload; either can be the clearer answer.

### RF-08 — Make reads stop performing writes

**Read:** [Separate Query from Modifier](https://refactoring.com/catalog/separateQueryFromModifier.html); Chapter 11.

```ts
class Counter {
  private count = 0;
  nextLabel() { this.count += 1; return "item-" + this.count; }
}
export function twoLabels() {
  const counter = new Counter();
  return [counter.nextLabel(), counter.nextLabel()];
}
```

Introduce a read and an explicit increment; migrate `twoLabels` so it still returns `["item-1","item-2"]`. Add a new observation that repeated reads do not increment. Explain why an atomic database “allocate next identifier” operation should not automatically be split into an unsafe read-then-write sequence. This exercise is an internal API migration, not a claim that every command must return nothing.

### RF-09 — Remove synchronized derived state

**Read:** [Replace Derived Variable with Query](https://refactoring.com/catalog/replaceDerivedVariableWithQuery.html); Chapter 9.

```ts
export class Scores {
  private values: number[] = [];
  private total = 0;
  add(value: number) { this.values.push(value); this.total += value; }
  clear() { this.values = []; this.total = 0; }
  sum() { return this.total; }
}
```

Remove the second source of truth while retaining the public operations. Preserve new → `0`, add `2`, add `-1` → `1`, clear → `0`. Explain the changed read cost; if `sum()` is called millions of times on a large list, a maintained aggregate may be justified. Use integers for this rep; floating-point reassociation requires separate evidence.

### RF-10 — Replace an opaque flag at the call site

**Read:** [Remove Flag Argument](https://refactoring.com/catalog/removeFlagArgument.html); Chapter 11.

```ts
function deliveryCost(cents: number, express: boolean) {
  return express ? cents + 900 : cents + 300;
}
export function quotes() {
  return [deliveryCost(1000, false), deliveryCost(1000, true)];
}
```

Make the two caller intentions explicit and preserve `[1300,1900]`. Keep any truly shared calculation in one place. Compare this with a boolean that is ordinary domain data, such as `isOpen`; that is not automatically an API smell. Do not introduce inheritance for a two-line difference.

### RF-11 — Encapsulate collection ownership

**Read:** [Encapsulate Collection](https://refactoring.com/catalog/encapsulateCollection.html); Chapter 7.

```ts
class ReadingList { titles: string[] = []; }
export function example() {
  const list = new ReadingList();
  list.titles.push("A", "B", "A");
  return list.titles.join(",");
}
```

Migrate the known caller to named additions and a read operation, preserving `"A,B,A"`. Protect the internal array from mutation through the new read result. State that direct external writes are deliberately removed from the API; an unknown caller using those writes would need migration. A TypeScript `readonly` annotation alone does not prove runtime isolation, and a shallow copy does not isolate nested objects. Repeat with immutable string elements before considering deeper ownership.

### RF-12 — Replace ambiguous primitives when behavior warrants it

**Read:** [Replace Primitive with Object](https://refactoring.com/catalog/replacePrimitiveWithObject.html); Chapter 7.

```ts
export function comesBefore(left: string, right: string) {
  const rank: Record<string, number> = { low: 0, normal: 1, urgent: 2 };
  if (!Object.hasOwn(rank, left) || !Object.hasOwn(rank, right)) {
    throw new Error("unknown priority");
  }
  return rank[left] < rank[right];
}
```

Practice a representation with controlled construction and ordering, preserving the three intended priorities and strict ordering (`normal,normal → false`). Unknown strings, including `"toString"`, still fail. Compare a discriminated union plus functions with a class. Reject a wrapper that merely hides a string without controlling construction or owning useful behavior. Preserve the exported string-taking boundary if existing callers require it; move conversion into that implemented boundary.

### RF-13 — Decide whether polymorphism earns its cost

**Read:** [Replace Conditional with Polymorphism](https://refactoring.com/catalog/replaceConditionalWithPolymorphism.html); Chapter 10.

```ts
type Job = { kind: "text" | "image"; units: number };
export function cost(job: Job) {
  return job.kind === "text" ? job.units * 2 : job.units * 5;
}
export function label(job: Job) {
  return job.kind === "text" ? "Text job" : "Image job";
}
```

Explore a cohesive behavior per variant while preserving text/3 → `6`, image/3 → `15`, both labels, and zero units. Show the proposed caller. Keep the simple tagged union if it is clearer: a justified “no change” is a valid result. The useful question is how likely changes spread, not whether a conditional exists. Do not weaken exhaustive handling when adding a third variant on a later repeat.

### RF-14 — Replace implementation inheritance with delegation

**Read:** [Replace Superclass with Delegate](https://refactoring.com/catalog/replaceSuperclassWithDelegate.html); Chapter 12.

```ts
class Prefix {
  constructor(private text: string) {}
  format(message: string) { return this.text + message; }
}
export class Notice extends Prefix {
  constructor() { super("Notice: "); }
  send(message: string, output: (text: string) => void) {
    output(this.format(message));
  }
}
```

Make the formatting dependency explicit while preserving `send("ready", output)` producing exactly one `"Notice: ready"` event. The inherited public `format` operation must either remain available through forwarding or be explicitly removed with all callers migrated. Do not claim preservation after silently removing it. Compare the result with keeping inheritance when the subtype relationship is meaningful.

### RF-15 — Substitute an algorithm without changing the contract

**Read:** [Substitute Algorithm](https://refactoring.com/catalog/substituteAlgorithm.html); Chapter 7. Use the [performance protocol](algorithms-performance.md) for measurements.

```ts
export function common(left: readonly string[], right: readonly string[]) {
  return left.filter(value => right.includes(value));
}
```

Remove repeated membership scans using a standard collection. Preserve `(["b","a","b"],["b"]) → ["b","b"]`, empty inputs, case sensitivity, encounter order and both inputs. Returning a mathematical set would break this contract. Explain expected time and additional memory; compare small and large fixed workloads before claiming a practical speedup. Keep construction of the lookup in the measured operation unless the real caller reuses it.

## C# and Kotlin transfer

Use a separate attempt ID such as `RF-07-csharp-r01`, with the same observations as its original card. Transfer the idea, not the syntax. In Kotlin, inspect nullability, data-class copy semantics and eager collections versus sequences. In C#, inspect nullable references, record equality, integer overflow policy and deferred enumeration before assuming the TypeScript result carries over.

For a concrete C# RF-07 repeat, begin with this method and replace the loop with standard collection operations while keeping a materialized result:

```csharp
using System.Collections.Generic;

public sealed record Row(bool Active, string Name);

public static class LabelFormatter
{
    public static List<string> Labels(IEnumerable<Row> rows)
    {
        var result = new List<string>();
        foreach (var row in rows)
            if (row.Active) result.Add(row.Name.Trim());
        return result;
    }
}
```

Preserve the same ordering/duplicate/empty-name example from RF-07. Also use an enumerable that records each yielded row: the operation should enumerate it once, finish enumeration before returning, and return a reusable list. Returning a deferred query would change those obligations. Read Microsoft's [CA1851 explanation](https://learn.microsoft.com/en-us/dotnet/fundamentals/code-analysis/quality-rules/ca1851) for why repeated enumeration can change both cost and behavior. Do not “fix” the warning by adding caches to every sequence; choose based on the caller's contract.

For RF-15 in C#, explicitly choose the string comparer used by a `HashSet<string>` and preserve the original comparison policy. For RF-11 in Kotlin/C#, distinguish a read-only view from independent ownership. For all three languages, a new helper, class or library must earn its responsibility.

## Continue through the book without turning it into a checklist race

These 15 cards are a starter rotation, not every entry in the book. Use the [official catalog](https://refactoring.com/catalog/) filtered to the second edition as the continuing queue. Take one unseen entry at a time; use its aliases to avoid counting renamed entries twice. Create an original 10–30 line case, or use a small existing assignment with a real need. The mentor supplies the awkward starting implementation and expected observations when the learner cannot find a suitable case.

| Rotation | Second-edition chapter | Next direction after the starter cards |
|---|---|---|
| [ ] Basic operations | 6 | Names, variables, declarations, grouping related work and phase boundaries |
| [ ] Encapsulation | 7 | Records, class boundaries, delegation and algorithm substitution |
| [ ] Moving behavior | 8 | Function/field ownership, statements, loops and genuinely dead code |
| [ ] Data | 9 | Variable roles, derived data, value versus shared identity |
| [ ] Decisions | 10 | Consolidation, special cases, assertions and alternative control flow |
| [ ] APIs | 11 | Parameters, queries, commands, construction and mutation |
| [ ] Inheritance | 12 | Moving members, simplifying hierarchies and delegation |

For each catalog entry record: link, smell or change pressure, a counterexample where it is wrong, first attempt PR, delayed repeat PR, preservation evidence, and confidence (`new`, `guided`, `independent`, `retained`). Do not mark a whole chapter complete after one entry. Inverse moves are useful: practice both extraction and inlining, both adding and removing delegation, and choosing parameters versus queries.

Repeat a selected move after roughly 2, 7 and 21 days using different names and data. First identify the opportunity without being told the move. Later give a mixed 20-line snippet with two plausible cleanups and ask which is worth doing. One repeat is one PR; no extra timing PR is needed for a brief verbal recall check without a submitted artifact.

## Review rubric

| Evidence | Ready to move on |
|---|---|
| Diagnosis | Names a specific cost or confusing obligation, not just “long” or “ugly.” |
| Selection | Explains why this move helps the next caller/change and why a bigger abstraction is unnecessary. |
| Safety | Same meaningful examples pass; API/behavior changes are identified and all supplied callers accounted for. |
| Mechanics | Small understandable steps; IDE operations checked; no abandoned guarantees hidden in comments. |
| Transfer | Can recognize another example without the move's name and explain when to leave it alone. |

An unsuccessful attempt remains useful evidence. Preserve its original submission and review; use a new independent attempt for further practice rather than replacing the record with an ideal solution.
