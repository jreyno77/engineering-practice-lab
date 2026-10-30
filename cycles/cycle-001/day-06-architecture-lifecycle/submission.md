Component ResultsRelay


# 1 States
State: Ready
Invariant: Courier connected and supporting destinations explicitly communicated to the user
Invariant: Download Location supplied

State: Working
Invariant: Temp file created and contains payload
Invariant: Destination is valid and available
Invariant: Payload is valid
Invariant: Payload handed off to the Courier

State: Cleanup
Invariant: Shipping completed

State: Error
Invariant: Process failure thrown to caller
Invariant: Temp file backup still exists

State: Complete
Invariant: Status complete and no temp file exists
Invariant: Payload exists at destination

# 2

Ready       Courier Object Constructed       export()
Working     validatePayload                  returns false
Error       explain validation error         throws

Ready       Courier Object Constructed       export()
Working     validatePayload                  returns true
Working     createTempFile                   throws error
Error       acceptable to retry? NO          throws

Ready       Courier Object Constructed       export()
Working     validatePayload                  returns true
Working     createTempFile                   throws error
Error       acceptable to retry? Yes         retry createTempFile
Working     createTempFile                   throws error
Error       mention retry and explain        throws

Ready       Courier Object Constructed       export()
Working     validatePayload                  returns true
Working     createTempFile                   returns
Working     Handoff to Courier to ship       awaits
Error       Explains error during shipping   throws

Ready       Courier Object Constructed       export()
Working     validatePayload                  returns true
Working     createTempFile                   throws error
Error       acceptable to retry? Yes         retry createTempFile
Working     createTempFile                   returns
Working     Handoff to Courier to ship       awaits
Error       Explains error during shipping   throws

Ready       Courier Object Constructed       export()
Working     validatePayload                  returns true
Working     createTempFile                   returns
Working     Handoff to Courier to ship       awaits
Working     Shipping completes               cleanup()
Working     deleteTempFile                   throws error
Error       acceptable to retry? Yes         retry deleteTempFile
Error       deleteTempFile                   throws error    

Ready       Courier Object Constructed       export()
Working     validatePayload                  returns true
Working     createTempFile                   returns
Working     Handoff to Courier to ship       awaits
Working     Shipping completes               cleanup()
Working     deleteTempFile                   throws error
Error       acceptable to retry? No          throws

Ready       Courier Object Constructed       export()
Working     validatePayload                  returns true
Working     createTempFile                   returns
Working     Handoff to Courier to ship       awaits
Working     Shipping completes               cleanup()
Working     deleteTempFile                   throws error
Error       acceptable to retry? Yes         retry deleteTempFile
Working     deleteTempFile                   return

Ready       Courier Object Constructed       export()
Working     validatePayload                  returns true
Working     createTempFile                   returns
Working     Handoff to Courier to ship       awaits
Working     Shipping completes               cleanup()
Working     deleteTempFile                   return

Ready       Courier Object Constructed       download()
Working     validatePayload                  returns false
Error       explain validation error         throws

Ready       Courier Object Constructed
Ready       Download Location Supplied       download()
Working     validatePayload                  returns true
Working     createFileAtDownloadLocation     throws
Error       should/can retry? Yes            retry createFileAtDownloadLocation
Working     createFileAtDownloadLocation     throws
Error       mention retry and explain        throws error

Ready       Courier Object Constructed
Ready       Download Location Supplied       download()
Working     validatePayload                  returns true
Working     createFileAtDownloadLocation     throws
Error       should/can retry? no            throws
Error       explain error                    throw Error

Ready       Courier Object Constructed
Ready       Download Location Supplied       download()
Working     validatePayload                  returns true
Working     createFileAtDownloadLocation     throws
Error       should/can retry? Yes            retry createFileAtDownloadLocation
Working     createFileAtDownloadLocation     return
Working     Open write stream                await
Error       fails write                      throws
Error       close stream and explain error   throws error

Ready       Courier Object Constructed
Ready       Download Location Supplied       download()
Working     validatePayload                  returns true
Working     createFileAtDownloadLocation     throws
Error       should/can retry? Yes            retry createFileAtDownloadLocation
Working     createFileAtDownloadLocation     return
Working     Open write stream                await
Working     finishes write                   cleanup()
Working     close stream                     return

Ready       Courier Object Constructed
Ready       Download Location Supplied       download()
Working     validatePayload                  returns true
Working     createFileAtDownloadLocation     return
Working     Open write stream                await
Error       fails write                      throws
Error       close stream and explain error   throws error

Ready       Courier Object Constructed
Ready       Download Location Supplied       download()
Working     validatePayload                  returns true
Working     createFileAtDownloadLocation     return
Working     Open write stream                await
Working     finishes write                   cleanup()
Working     close stream                     return


## 3. Make Five Explicit Decisions

Answer decisively:

1. Is cleanup final?
Yes clean up is final, a consequence of this would be there is no fallback incase the export went bad
2. Can export create or regenerate a missing backing file?
No, once the backing file is gone it is gone forever, a consequence of this choice would be export will fail if the temp file is removed before finishing
3. Can write, export, and cleanup run concurrently?
Yes, the entire process can run concurrently because every single step is self contained, but for a single payload only create and export can run concurrently. They each have their own cleanup so export cleanup and download cleanup can run concurrently.  A consequence of this is there is a possiblity of the memory / system being overloaded with work if they are not limited, there is also a possibility of temp files and/or destinations competing for I guess slots.  And kind of depends on the destination, if the destination does not support concurency then we receive 0 benefit.
4. Is cancellation a terminal state or may the operation be retried?
cancellation is terminal no retries, a consequence of this is because these payloads are possibly very large cancellation does not become an easy decision and instead is risking redoing all that work.
5. Are operational failures returned, thrown, or both?
Operational failures are thrown, sub operations are returned then possibly retried, then thrown or returned, A consequence of this is that each write / export that fails must be understood / handled by the caller or something else in order for it to fix the failure and try again, also that handler does not have all the runtime state handling it here would have so it is up to the error message to communicate all the considerations effectively.