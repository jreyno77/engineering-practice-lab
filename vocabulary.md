# Senior Engineering Vocabulary

This file tracks technical language worth practicing in design docs, code reviews, and architecture discussions.

The goal is not to define obvious words. The goal is to build a working vocabulary for senior-level TypeScript, Kotlin, functional design, refactoring, testing, and delivery conversations.

## Core Terms to Keep Practicing

| Term | Working Meaning |
|---|---|
| Invariant | A rule that should always remain true |
| Coupling | How much two parts depend on each other |
| Cohesion | How focused one module/component is |
| Idempotent | Safe to run more than once with the same result |
| Serialization | Converting an in-memory value into an external format like JSON, text, or bytes |
| Deserialization | Converting external data into an in-memory value the program can use |
| Codec | A paired encoder/decoder that defines how a value crosses a boundary |
| Discriminated union | A TypeScript union where a tag field determines the valid shape |
| Sealed type | A Kotlin type hierarchy where the allowed subtypes are closed and known |
| Referential transparency | A property where an expression can be replaced by its value without changing behavior |
| Boundary object | A type used specifically where data crosses a system or module boundary |
| Idempotency | Safe repeat execution with the same externally visible result |

## Type Modeling and Data Boundaries

| Term | Working Meaning |
|---|---|
| Algebraic data type | A model built from product types and sum types so invalid states are harder to represent |
| Product type | A type made by combining fields, such as a Kotlin `data class` or TypeScript object type |
| Sum type | A type that represents one of several alternatives, such as a TypeScript discriminated union or Kotlin sealed hierarchy |
| Branded type | A TypeScript technique for making primitive values more specific, such as `UserId` instead of plain `string` |
| Phantom type | A type parameter used to track compile-time state without changing the runtime representation |
| Smart constructor | A function that validates or normalizes input before constructing a domain value |
| Type-level invariant | A rule enforced by the type model instead of repeated runtime checks |
| Boundary decoding | Parsing and validating data as it enters the system instead of spreading checks throughout the code |
| Schema evolution | Changing a data contract while preserving compatibility with existing data or callers |
| Contract drift | When two sides of an API or data boundary slowly stop agreeing about the real shape or behavior |

## Functional Design

| Term | Working Meaning |
|---|---|
| Total function | A function that returns a valid result for every input in its declared domain |
| Partial function | A function that can fail, throw, or behave unexpectedly for some inputs |
| Effect boundary | The edge where pure logic meets I/O, mutation, logging, network calls, or time |
| Error algebra | A typed set of possible failures that callers can handle explicitly |
| Railway-oriented flow | A style where success and failure paths are composed without hiding errors in exceptions |
| Equational reasoning | Understanding code by substituting expressions with their values when side effects are controlled |
| Function composition | Building larger behavior by connecting smaller functions with compatible inputs and outputs |
| Persistent data structure | An immutable data structure that shares structure efficiently across versions |
| Higher-order function | A function that accepts or returns another function to abstract behavior safely |

## Refactoring and Design Pressure

| Term | Working Meaning |
|---|---|
| Characterization test | A test that captures current behavior before refactoring legacy or unclear code |
| Seam | A place where behavior can be isolated, replaced, or tested without invasive changes |
| Temporal coupling | A hidden dependency on operations happening in a specific order |
| Connascence | A measure of how strongly two pieces of code must change together |
| Shotgun surgery | A smell where one behavior change requires edits in many places |
| Divergent change | A smell where one module changes for many unrelated reasons |
| Primitive obsession | Overusing raw primitives where domain-specific types would protect meaning |
| Refactoring safety net | Tests, types, and review practices that make incremental design improvement safer |
| Expand-contract migration | A safe migration pattern: add new behavior, migrate callers, then remove old behavior |
| Strangler migration | Replacing a legacy path gradually by routing slices of behavior to the new path |

## Testing, Reliability, and Delivery

| Term | Working Meaning |
|---|---|
| Property-based testing | Testing general rules across many generated inputs instead of only hand-picked examples |
| Mutation testing | Testing the tests by changing code and checking whether the test suite catches it |
| Golden master | A captured output used to detect behavior changes during refactoring |
| Flake budget | A team threshold for how much nondeterminism is tolerated before tests must be fixed |
| Tail latency | High-percentile latency, such as p95 or p99, that shows worst-user experience better than averages |
| Backpressure | A mechanism that stops producers from overwhelming slower consumers |
| Failure isolation | Designing so one failure does not cascade through unrelated parts of the system |
| Progressive delivery | Releasing changes gradually with flags, staged delivery, monitoring, and rollback paths |

## Practice Rule

For each exercise, use at least three relevant terms naturally in the written explanation.

The target is not memorization. The target is using precise vocabulary to explain design pressure, design quality, and risk.
