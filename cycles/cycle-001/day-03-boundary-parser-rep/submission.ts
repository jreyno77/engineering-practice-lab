import { describe, expect, test } from 'vitest'

type LightThemePreference = {
  theme: "light";
  fontSize: number;
  compact: boolean;
};

type DarkThemePreference = {
  theme: "dark";
  fontSize: number;
  compact: boolean;
  highContrast: boolean;
};

type ThemePreference = LightThemePreference | DarkThemePreference;

const isLightThemePreference = (input: object): input is LightThemePreference => {
  let valid: boolean = true;
  valid = isThemePreference(input) ?
    input.theme === 'light' && !("highContrast" in input)
    : false;
  return valid;
}
test('isLightThemePreference should falsify invalid light theme preferences', () => {
  const workItem = {} as ThemePreference;
  expect(isLightThemePreference(workItem)).toBe(false);
  const workItem1 = { theme: 'dark', fontSize: 15, compact: true };
  expect(isLightThemePreference(workItem1)).toBe(false);
  const workItem2 = { theme: 'light', fontSize: 15, compact: true, highContrast: false };
  expect(isLightThemePreference(workItem2)).toBe(false);

  const workItem3 = { theme: 'light', fontSize: 15, compact: true };
  expect(isLightThemePreference(workItem3)).toBe(true);
});

const isDarkThemePreference = (input: object): input is DarkThemePreference => {
  let valid: boolean = false;
  if (isThemePreference(input)) {
    if (input.theme === 'dark' && "highContrast" in input) {
      valid = typeof input.highContrast === 'boolean' || typeof input.highContrast === 'string';
      if (typeof input.highContrast === 'string')
        valid = (input.highContrast === 'true' || input.highContrast === 'false');
    }
  }
  return valid;
}
test('isDarkThemePreference should falsify invalid dark theme preferences', () => {
  const workItem = {} as ThemePreference;
  expect(isDarkThemePreference(workItem)).toBe(false);
  const workItem1 = { theme: 'light', fontSize: 15, compact: true, highContrast: true };
  expect(isDarkThemePreference(workItem1)).toBe(false);
  const workItem2 = { theme: 'dark', fontSize: 15, compact: true };
  expect(isDarkThemePreference(workItem2)).toBe(false);
  const workItem3 = { theme: 'dark', fontSize: 15, compact: true, highContrast: null };
  expect(isDarkThemePreference(workItem3)).toBe(false);
  const workItem4 = { theme: 'dark', fontSize: 15, compact: true, highContrast: 'cheese' };
  expect(isDarkThemePreference(workItem4)).toBe(false);


  const workItem5 = { theme: 'dark', fontSize: 15, compact: true, highContrast: true };
  expect(isDarkThemePreference(workItem5)).toBe(true);
  const workItem6 = { theme: 'dark', fontSize: 15, compact: true, highContrast: 'true' };
  expect(isDarkThemePreference(workItem6)).toBe(true);
});

const isThemePreference = (input: object): input is ThemePreference => {
  let valid: boolean = false;
  if ("fontSize" in input && "theme" in input && "compact" in input) {
    valid = typeof input.theme === 'string' && (input.theme === 'light' || input.theme === 'dark');
    valid = valid ? typeof input.fontSize === 'number' && Number.isFinite(input.fontSize) && input.fontSize >= 10 && input.fontSize <= 30 : false;
    valid = valid ? typeof input.compact === 'boolean' || (typeof input.compact === 'string' && (input.compact === 'true' || input.compact === 'false')) : false;
  }
  return valid;
}
test('isThemePreference should falsify invalid theme preferences', () => {
  const workItem1 = { theme: 'light', fontSize: 100, compact: true };
  expect(isThemePreference(workItem1)).toBe(false);
  const workItem2 = { theme: 'green', fontSize: 13, compact: true };
  expect(isThemePreference(workItem2)).toBe(false);
  const workItem3 = { theme: 'light', fontSize: 13, compact: null };
  expect(isThemePreference(workItem3)).toBe(false);
  const workItem5 = {};
  expect(isThemePreference(workItem5)).toBe(false);

  const workItem4 = { theme: 'light', fontSize: 13, compact: true };
  expect(isThemePreference(workItem4)).toBe(true);
});

function assignDefaults(input: object) {
  const defaulted = { ...input };
  if (!("theme" in defaulted)) Object.assign(defaulted, { theme: 'light' });
  if (!("fontSize" in defaulted)) Object.assign(defaulted, { fontSize: 14 });
  if (!("compact" in defaulted)) Object.assign(defaulted, { compact: false });
  return defaulted;
}
describe('assignDefaults test suite', () => {
  test('assignDefaults should return defaulted and correct values', () => {
    const workItem = { };
    const expectation = expect(parseThemePreference(workItem));
    expectation.toEqual({ theme: 'light', fontSize: 14, compact: false });
  });

  test('assignDefaults should not overwrite', () => {
    const fontsize = { fontSize: 20 };
    const fsexpectation = expect(assignDefaults(fontsize));
    fsexpectation.toEqual({ theme: 'light', fontSize: 20, compact: false });

    const theme = { theme: 'dark' };
    const texpectation = expect(assignDefaults(theme));
    texpectation.toEqual({ theme: 'dark', fontSize: 14, compact: false });

    const compact = { compact: true };
    const cexpectation = expect(assignDefaults(compact));
    cexpectation.toEqual({ theme: 'light', fontSize: 14, compact: true });
  });
});

/**
 * 
 * @param input Rules:

- missing `theme` defaults to `light`
- `theme` must be `light` or `dark`
- missing `fontSize` defaults to `14`
- `fontSize` must be a finite number between `10` and `30`
- missing `compact` defaults to `false`
- `compact` may be a boolean or the strings `"true"` / `"false"`
- dark theme may include `highContrast`
- missing `highContrast` defaults to `false`
- `highContrast` may be a boolean or the strings `"true"` / `"false"`
- light theme output must not include `highContrast`
 */
type ThemePreferenceParsingError = Error;
export function parseThemePreference(input: unknown): ThemePreference {
  if (!input || !(typeof input === 'object')) {
      throw (`A theme preference input must exist for parsing. received, ${input}`); 
  }
  const themePreference = assignDefaults(input);
  try {
    if (isLightThemePreference(themePreference)) return themePreference;
  } catch (error) {
    if (!error || !(typeof error === 'object' && "msg" in error))
      throw Error(`Unable to parse light theme preference for an unknown reason, ${themePreference}`) as ThemePreferenceParsingError;
    error.msg = `Unable to parse light theme preference because, ${error.msg}`;
    throw error;
  }
  try {
    if (isDarkThemePreference(themePreference)) return themePreference;
  } catch (error) {
    if (!error || !(typeof error === 'object' && "msg" in error))
      throw Error(`Unable to parse dark theme preference for an unknown reason, ${themePreference}`) as ThemePreferenceParsingError;
    error.msg = `Unable to parse dark theme preference because, ${error.msg}`;
    throw error;
  }
  throw Error(`Unable to parse theme preference for an unknown reason, ${themePreference}`) as ThemePreferenceParsingError;
}
test('parseThemePreference narrows objects to ThemePreferences', () => {
  const workItem = { cheese: 'Asiago', smelly: true, theme: 'light', fontSize: 15, compact: true };
  expect(parseThemePreference(workItem)).toEqual({ theme: 'light', fontSize: 15, compact: true })
});
