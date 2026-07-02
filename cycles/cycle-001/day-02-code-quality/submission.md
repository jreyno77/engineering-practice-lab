## Part 1 — Refactor with Runtime Guards

You are given this TypeScript function:

```ts
export function createConnectionOptions(input: any) {
  return {
    mode: input.mode || "local",
    enabled: input.enabled === true || input.enabled === "true",
    retries: input.retries ? Number(input.retries) : 3,
    endpoint: input.endpoint,
  };
}
```

Refactor it into a safer version.

Answers:
```ts
type LocalConnectionOptions = {
  mode: 'local';
  enabled: boolean;
  retries: number;
};

type RemoteConnectionOptions = {
  mode: 'remote';
  enabled: boolean;
  retries: number;
  endpoint: string;
};

type ConnectionOptions = LocalConnectionOptions | RemoteConnectionOptions;
type ConnectionOptionsError = Error;

const isConnection = (connection: unknown): connection is ConnectionOptions => {
    const tryConnection = connection as ConnectionOptions;
    const invalidEnabled = !tryConnection.enabled || typeof tryConnection.enabled !== "boolean";
    const invalidMode = tryConnection.mode && typeof tryConnection.mode !== "string";
    const invalidRetries = !tryConnection.retries || !Number(tryConnection.retries);
    if (invalidEnabled) {
        throw new Error(`A valid enabled boolean is required for ConnectionOptions, received ${tryConnection.enabled}`) as ConnectionOptionsError;
    }
    if (invalidMode) {
        throw new Error(`A valid mode string is required for ConnectionOptions`) as ConnectionOptionsError;
    }
    if (invalidRetries) {
        throw Error(`Connection retries was not a valid number, ${tryConnection.retries}`) as ConnectionOptionsError;
    }
    return true;
}

const isRemote = (connection: unknown):  connection is RemoteConnectionOptions => {
    const tryConnection = connection as RemoteConnectionOptions;
    const validEndpoint = "endpoint" in tryConnection;
    const validMode = tryConnection.mode === 'remote';
    return validEndpoint && validMode;
};

const isLocal = (connection: unknown):  connection is LocalConnectionOptions => {
    const tryConnection = connection as LocalConnectionOptions;
    const doesNotContainEndpoint = !("endpoint" in tryConnection);
    const validMode = tryConnection.mode === 'local';
    return doesNotContainEndpoint && validMode;
};

type InvalidConnectionOptionsInput = Error;
export function createConnectionOptions(input: unknown): ConnectionOptions {
    if (isConnection(input)) {
        if (!(input as ConnectionOptions).mode) {
            input.mode = 'local';
        }
    }
    if (isRemote(input)) return input;
    if (isLocal(input)) return input;
    throw Error(`Input was neither remote or local, received: ${input}`) as InvalidConnectionOptionsInput;
}

```

## Part 2 — Explain the Boundary

Write a short explanation covering:

1. What is the boundary in this function?
2. Why is `unknown` better than `any` here?
3. What rules are enforced at runtime?
4. What rules are enforced by the TypeScript type model?
5. What tradeoff did you make between strict validation and simple code?

The boundary of the function is definitely that we are dealing with ConnectionOptions. Connections are the data that we are validating, the number of types of Connections can be extended and managed internally.  The caller is unconcerned with the different implementations of Connections, all the caller is concerned with is creating a ConnectionOptions. Unknown is useful here because we are making a promise that this thing will be typed at some point before it is used.  If it has not been typed yet somewhere in the system it will not be usefull and error.  This will catch bugs before they happen.  For example, if we later added a DataBaseConnectionOptions type, then in our implementation we accidentally didn't narrow the type and just returned input after validation, we will not be able to use it. The rules are very clear in the code as I wrote boolean names for each rule it requires, a valid enabled property, a valid mode, a valid number of retries, if it is remote it requires a valid endpoint, and a valid remote mode, if it is local it requires that it does not contain a endpoint property and the mode is local.  The rules the TypeScript type model are enforcing are that input must be typed before use, the returned types meet the required property names and types at compile time.  Strict validation definitely added quite a bit of additional code, it took about an hour to get all this together.  It could also impact performance, but luckily these are small bits of data.  Given the design adding or removing both properties to different options, or adding/removing entirely new connection options is relatively small.  They are separated out and self contained.

## Part 3 — Test Plan

List the tests you would write.

Include at least:

- valid local config with defaults
- valid remote config with endpoint
- remote config missing endpoint
- invalid mode
- invalid retries, including `NaN`
- boolean parsing behavior
- ensuring local config does not return endpoint

You do not need to write a full test suite unless you want to. A precise test list is enough.

I would write tests that assert the rules are enforced and that's it.  Those tests would be written as I went asserting first failing then continuing.  I do not think that completely exhaustive tests are really worth it.  I believe that unit tests are useful for development work, then the other tests that really ensure quality are acceptance testing.  I do not believe this bit of code justifies any acceptance tests.

## Part 4 — Communication Drill

Rewrite this message so it is clear, short, and technically precise:

> We should just use any here because this is only config and TypeScript already knows what the shape is after we pass it around. Adding guards feels like extra code and probably does not matter.

Answer:
any should only be used as a last resort.  The issue with any is not that it does not work for the code you are writing now, but rather the code that is written in the future.  It is very unlikely that code is perfect the first time and this bit of code is expected to grow and change over time.  As this code changes any does not provide us with any information or clarity to what kind of data we are working with. If the kind of data is uncertain, then it is still useful to use unknown because in that case that data cannot be used unless we figure out what kind of data we are dealing with.  This will help with misunderstanding or bad assumptions in the future.  Outside the boundary there is also no worry of what is coming out of that function.  It must be what we expect and therefor no other bits of code will need to guess, hack, or work around this bit of code.  They know what to expect and whether it provides what they need or not.  There is also risk of passing around corrupted data or malicous data. At runtime Typescript does not validate any of it's types, security is a very important concern and with this we have built in some security for our codebase.