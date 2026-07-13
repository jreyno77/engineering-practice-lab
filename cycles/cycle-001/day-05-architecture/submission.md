## Mini Refresh Quiz

Answer these first:

1. Why is `if (!input)` dangerous in boundary parsing?
If the expectation is to only check null or undefined, it catches more than just that, it catches all 'Falsey values'.
It also interacts with boolean values and if input is boolean it is dangerous for sure, not true would be false and not false would be true.
It also catches other values like 0, NaN.
2. If cleanup is final, what should write/export do after cleanup? It should do nothing, if cleanup is final everything should be cleaned up.  You could
throw if it is possible for users / consumers to call it after cleanup, but ideally cleanup makes that impossible.
3. If cancellation happens after a partial target file is created, what must happen before returning?  You must delete the file and end the stream if there is one.

## Prompt: Result Download Lifecycle Architecture

Design the next version of a result download/export pipeline.

The system needs to support:

- large result payloads,
- writing result files,
- exporting result files,
- cancellation,
- cleanup,
- failure handling,
- future result types,
- callers that should not need to manually manage too much lifecycle.

I think the solution should break things up a bit into components that can be composed.  Each responsibility should be separated out into pieces that can be easily tested in isolation.  Testability is the main focus as that has been shown to be a leading impact on quality.  So, there should be a writer, an exporter,
some kind of cancellation wrapper or manager, there should be a cleanup separation.  Failures should be handled throughout, there is more consideration around where the failures should live.  They can be owned by each piece and thrown until the top level consumption, but if we want to protect the system we may want each piece to own it's own error handling either through logging or some kind of error packaging.  This separation supports future result types because if we want a new one we simply write either another writer, exporter and either include or extend to support cancellation / cleanup.  The writers could all live within the same writing module, the exporters could all stay within the same export module, so that we can easily see what write / export types we support.  Depending on the output whether we want to just write json or if we want to manage the data before write/export we could even write a single write / export that does the same thing every time and instead of the different writers / exporters we could create a transformer interface and we write implementations for each result type.  Then each result type has a transform(input) extends cancellable? that gets registered to a transformers list.  Then all we do is register transformers we want, call transform on each and then a single write, export and wrap a cancellation, or inject a cancellation token, then cleanup.  If we just want some simple output, I would prefer an OutputManager that registers / injects implemented transformers for each result type at startup/initialization into a generic array of transformers.  Then at the callsite I would want to recieve either a single payload, or possibly a stream / list of payloads.  If it is a stream or list I would iterate, then call an overloaded call that takes just a single payload, then in that handleOutput(payload), we could either iterate through the transformers and call each until we get a result or an error(this would require transofmation to return either undefined or some kind of boolean to determine if it worked or not and only throw if there was an actual error), or at setup / startup the transformation is a map that supports results types directly and the caller would then need to know of the result types and pass in an additional parameter transform(input, resultType) extends cancellable?. Both sound alright to me depending on the situation.  Then the outputManager simply takes the transformed result and returns an output object thing either with a cancellation token or that extends cancellable? that has a writer.write(cancellationToken), exporter.export(cancellationToken), cleanup(), errorHandler()(that has errors[]).  The writer exists in it's own module, the exporter exists in it's own module, but the manager leverages / surfaces it.  That way we can easily test each piece.

## 1. Problem

Write 3–6 sentences.

Answer:

```txt
What is the actual architecture problem here?
The architecture problem comes with the balance between cohesion and separation.  What owns what and who is responsible for what.  Everything can exist all together or every tiny piece of code can be separated.  The problem is what makes sense and what makes things testable and digestable and changeable.
Why is it hard?
This is something that mostly comes with experience, this is the art of programming where everyone has their own preference, it's all a tradeoff, and it's more about making a hypothesis of how the system will move and ensuring that it is clear and testable.
Who pays the cost when the design is unclear?
Everyone pays the cost when the design is unclear, but it is less about the design and more about the testability.  No architect is going to provide the perfect solution every single time, most of the time it will be wrong the first time and leaning too heavily into the design without an expectation for change will create immovable concrete systems that take a ton of work to break down and rebuild.  The key is clarity combined with changeability.
```

## 2. Current Design Risk

Name the top 3 risks in the current shape.

Use this format:

```txt
Risk 1:
Why it matters:
Example failure:
```
Risk 1
I think one of the risks is if the system does not want to setup transformers or be aware of result types before the write/export calls.  If that is unknown then I think the design kind of breaks down and a different solution would be necessary.  We could infer from the input, but then there needs to be another piece between transform and implementation.  This matters because it literally would not work if that assumption is incorrect.
For the example failure we would need to ensure transformers exist and that the result type was either provided or that we got some resolution from the transformers.

Risk 2
Another risk would be the cancellation, what does it mean to actually extend cancellable is there an assumption that it would be the same across all the implementations, writes, exports?  Is that too much?  Does each piece instead need to take a cancellation token?  If that is the case then the caller would need to know about the cancellation token and how to manage it, that would then possibly create the need for a cancelToken creation call.
Cancellation is a key part to the requirements and mismanagement can create complexity at the callsite, or it could hide / miss information / processing.
An example failure would either be throwing if the cancellation looks incorrect, or if it is unable to cancel for one reason or another.

Risk 3
Along with the last one I think the last key risk would be the cleanup, we are also making the assumption that cleanup could work across the board for all the writes / exports.  If that is not the case it can break cleanup.  I think this matters because cleanup can lead to performance considerations it could create data misses, it can bottle neck systems and cause failures. This could easily lead to mismanagement and I'm going to say shadow failures as it happens in the shadow of the other pieces. An example failure would be if we call cleanup and any piece of it does not happen as intended we through immediately and get that clearly communicated/surfaced to the user / consumer. cleanup failure is important.

## 3. Proposed Architecture Shape

Sketch the design in words.

Include:

```txt
Main object(s)
Responsibilities
Who owns temp files
Who owns target files
Who owns cleanup
Who owns cancellation
Who reports errors
```

```txt
OutputManager
    This guy catches errors and manages report, the rest throw meaningful errors.  This guy either takes cancellation tokens and passes them along, or takes cancellation from the user and manages cancellation by calling cancel on cancellables.
  -> Transformer
    -> JSON string or whatever writeable/exportable implementation
  -> backing file
  OutputObject
  -> Writer
    -> write
  -> Exporter
    -> export
  -> cleanup
```
## 4. Lifecycle Contract

Define the lifecycle states.

Example states:

```txt
transforming
creating temp backup
writing
exporting
finished
cancelled
errored
cleaned
```

Then answer:

```txt
Which states are allowed?  All of those are allowed
Which transitions are allowed? The transition is clear in the OutputManager, each piece can smoothly transition from one to the next in the manager
Which transitions are forbidden?
I guess you are asking this because if it is writing while exporting there could be a mismatch? This is only the case depending on what write actually means. I guess I thought of it as a single one and done thing separate from export. 
Is cleanup final?
Yes
Can export regenerate a missing backing file?  Yeah that would be fine, export can regenerate to reduce failures if it is missing
Can write/export/cleanup run concurrently?
It should be able to yes, each piece should be self contained and not rely on each other.
```

## 5. Tradeoffs

Pick two tradeoffs.

Use this format:

```txt
Tradeoff:  Cancellation token vs cancellable extensions
What we gain:  If we use the token we gain a single point of contact for all pieces
What we lose: complexity at the callsite and every piece needs to have it's own interaction point with the token
Why this is acceptable:  A token makes cancellation clear and easy to implement for the pieces and each individual piece has direct cancellation control

Tradeoff:  Error handling within the Manager
What we gain:  The system does not break when errors occur and we can retry components or manage them based on errors within the manager before reporting to the consumer
What we lose: Easy try catch at the callsite with the manager.  The caller would need to manage errors by interacting with and checking the manager return or errorHandler
Why this is acceptable:  Not breaking the system and allowing retries would make the system far more stable and accurate when providing output
```

## 6. Testing Strategy

Pick the 5 most valuable tests for this architecture.

```txt
Test: Test transformation for each
Why this matters: transformation is fundamental and expected output will impact the rest of the system
Bug it would catch:  Missed or wrong transformation results

Test: Missing transformation setup throws
Why this matters: If we are missing transformations for the expected result types all will fail
Bug it would catch:  Missing setup or unsupported transformations being missed

if we combined the aboe 2 into 1 we could also test for
Test: Backup temp file works as expected
Why this matters: Backup temp file being wrong could cause some trouble
Bug it would catch:  Failing backup files could lead to issues down the road

Test: Writeable write cancel
Why this matters: writes should work as expected and cancel at the expected time
Bug it would catch:  Write failures and missed cancellations

Test: Exporter export cancel
Why this matters: exports should work as expected and cancel at the expected time
Bug it would catch:  Export failures and missed cancellations

Test: Cleanup works / happens at the right time and truly cleans up
Why this matters: Cleanup is essential and should be tested thoroughly
Bug it would catch:  Cleanup failures / misses
```

## 7. Rollout / Migration

Assume this touches real callers.

Answer:

```txt
Can this be changed safely in one PR?  I think this can break things out into separate PRs, one for the writer, one for the exporter, possibly the cancellable wrapper, then one for a Manager.  The manager would be the real change that interacts with the caller and if we keep the callsite simple and straight forward it would be fine in a single PR
What behavior must stay backward compatible? Cancellation, Write and Export should all be backwards compatible.
What would you deprecate or remove later?  Possibly the backup file, it may impact performance and be uncessesary
What would you watch after release?  I would watch cancellation and backup file management
```

## 8. Short PR Summary

Write the PR summary you would post if this design were implemented.

Sections:

```txt
Summary This PR introduces OutputManagement component to manage the write, export, cancel, and cleanup lifecycle.
Why. To support better testability, change, and growth. The manager and it's transformers would support swapping in and out different implementations that can grow and change with time.  This will allow testing different implementations and through the scientific method we could hone in and find the fastest simplest solutions without breaking the system / callsite.
Testing
Write and see the written result, export and see the exported result, ensure cancellation works for both, and try cleanup and ensure you cannot write / export / cleanup again with that piece.  Ensure the backup file was created / managed properly throughout the lifecycles.
Risks
Error handling is a risk and this new implementation makes some assumptions that need to be verified.
Follow-up
Ensure the error handling, temp file backup, and cancellations are working properly.
```
