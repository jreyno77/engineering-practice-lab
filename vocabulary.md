# Senior Engineering Vocabulary

This file tracks words and phrases that are useful for senior-level engineering communication.

The goal is not to sound fancy. The goal is to describe engineering decisions clearly, especially in TypeScript, Kotlin, functional design, data modeling, and review conversations.

## Technical Vocabulary to Practice

| Term | Working Meaning |
|---|---|
| Serialization | Converting an in-memory value into an external format like JSON, text, or bytes |
| Deserialization | Converting external data into an in-memory value the program can use |
| Codec | A paired encoder/decoder that defines how a value crosses a boundary |
| Schema | The expected structure and rules for a data shape |
| Parser | Code that turns raw input into a validated domain value |
| Validation | Checking that input satisfies the rules before it enters the domain model |
| Normalization | Converting equivalent inputs into one consistent shape |
| Projection | Transforming a larger model into the smaller shape a caller needs |
| DTO | A data transfer object used at a boundary instead of exposing the full domain model |
| Domain model | Types that represent the business concept rather than the transport format |
| Discriminated union | A TypeScript union where a tag field determines the valid shape |
| Sealed type | A Kotlin type hierarchy where the allowed subtypes are closed and known |
| Exhaustiveness | Handling every known case so new cases produce compile-time pressure |
| Refinement | Narrowing a broad or unsafe value into a more specific validated type |
| Side effect | A change outside the function, such as I/O, mutation, logging, or network calls |
| Referential transparency | A property where an expression can be replaced by its value without changing behavior |
| Adapter | Code that translates between an external contract and an internal model |
| Boundary object | A type used specifically where data crosses a system or module boundary |
| Contract test | A test that verifies two sides agree on a shared API or data shape |
| Backward compatibility | Keeping existing callers working while changing or extending behavior |
| Migration path | A safe sequence for moving from old behavior to new behavior |
| Idempotency | Safe repeat execution with the same externally visible result |
| Determinism | The same input produces the same output without hidden variation |
| Regression | Previously working behavior breaks again |

## Practice Rule

For each exercise, use at least three relevant vocabulary terms naturally in the written explanation.
