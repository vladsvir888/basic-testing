import {
  throwError,
  throwCustomError,
  resolveValue,
  MyAwesomeError,
  rejectCustomError,
} from './index';

describe('resolveValue', () => {
  test('should resolve provided value', async () => {
    expect(await resolveValue('Some value')).toBe('Some value');
    expect(await resolveValue(true)).toBe(true);
    expect(await resolveValue([1, 2, 3])).toEqual([1, 2, 3]);
  });
});

describe('throwError', () => {
  test('should throw error with provided message', () => {
    expect(() => throwError('Some error')).toThrow('Some error');
  });

  test('should throw error with default message if message is not provided', () => {
    expect(() => throwError()).toThrow('Oops!');
  });
});

describe('throwCustomError', () => {
  test('should throw custom error', () => {
    expect(() => throwCustomError()).toThrow(MyAwesomeError);
  });
});

describe('rejectCustomError', () => {
  test('should reject custom error', async () => {
    await expect(() => rejectCustomError()).rejects.toThrow(
      'This is my awesome custom error!',
    );
  });
});
