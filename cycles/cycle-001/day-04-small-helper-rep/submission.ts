import { describe, expect, test } from 'vitest'
/**
 * ## Rules

- If `input` is `true`, return `true`.
- If `input` is `false`, return `false`.
- If `input` is the string `"true"`, return `true`.
- If `input` is the string `"false"`, return `false`.
- If `input` is `undefined` or `null`, return `defaultValue`.
- For any other value, throw an `Error` with a clear message.

## Constraints

- Do not use `any`.
- Do not use a type assertion unless you explain why it is safe.
- Do not use a library.
- Keep the implementation simple.
- Tests matter more than cleverness.
 * @param input 
 * @param defaultValue 
 */
type ParseBooleanError = Error;
export function parseBoolean(input: unknown, defaultValue?: boolean): boolean {
    let returnBoolean: boolean;
    const checkBoolean: () => boolean | undefined = () => {
        if (typeof input === 'boolean') {
            return returnBoolean = input;
        }
    }
    const checkDefault: () => boolean | undefined = () => {
        if (!input && typeof defaultValue === 'boolean') {
            return returnBoolean = defaultValue;
        } else if (!input && !defaultValue) {
            throw Error(`Input did not exist and no default value was provided, you must have one or the other, received: ${input}`) as ParseBooleanError;
        }
    }
    const checkStringTruthiness: () => boolean | undefined = () => {
        if (input === 'true' || input === 'false') {
            return returnBoolean = input === 'true';
        }
    };
    // const orderedChecks = { checkBoolean, checkDefault, checkStringTruthiness }; // this doesn't really enforce the order though...
    // const thing = orderedChecks.checkBoolean() ?? orderedChecks.checkDefault() ?? orderedChecks.checkStringTruthiness(); // so rather than this...
    const orderedChecks = checkBoolean() ?? checkDefault() ?? checkStringTruthiness(); // this still makes it clear that order matters through naming, but the order is not enforced.
    // I could also make this a Checker thing like wrap all these into a local checker(input, default) that simply calls check, but I think that is overkill here. If the complexity arised, I would add that.
    if (orderedChecks === undefined) {
        throw Error(`Input was not a valid boolean value, this only accepts boolean types and either 'true' or 'false' string types, received: ${input}`) as ParseBooleanError;
    }
    return returnBoolean = orderedChecks;
}
describe('parseBoolean test suite', () => {
    test('parseBoolean should provide boolean values for both string and boolean types', () => {
        expect(parseBoolean(true)).toBe(true);
        expect(parseBoolean('true')).toBe(true);
        expect(parseBoolean(false)).toBe(false);
        expect(parseBoolean('false')).toBe(false);
        expect(() => parseBoolean(null)).toThrowError('Input did not exist and no default value was provided, you must have one or the other, received: null');
        expect(() => parseBoolean(undefined)).toThrowError('Input did not exist and no default value was provided, you must have one or the other, received: undefined');
        expect(() => parseBoolean({})).toThrowError(`Input was not a valid boolean value, this only accepts boolean types and either 'true' or 'false' string types, received: [object Object]`);
    });
    test('parseBoolean should use the default value if input does not exist', () => {
        expect(parseBoolean(null, true)).toBe(true);
        expect(parseBoolean(null, false)).toBe(false);
        expect(() => parseBoolean({}, false)).toThrowError(`Input was not a valid boolean value, this only accepts boolean types and either 'true' or 'false' string types, received: [object Object]`);
    });
});

// I believe the if statements here actually maintain readability and make it read like a clear path of reasoning.  I am concerned though with the ordering, if someone changed the order this could break.  I am thinking of how to enforce the order or make that explicit, so future refactors or changes are less prone to breakage.