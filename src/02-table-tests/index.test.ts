import { simpleCalculator, Action } from './index';

const testCases = [
  {
    name: 'should add two numbers',
    a: 1,
    b: 2,
    action: Action.Add,
    expected: 3,
  },
  {
    name: 'should subtract two numbers',
    a: 2,
    b: 2,
    action: Action.Subtract,
    expected: 0,
  },
  {
    name: 'should multiply two numbers',
    a: 3,
    b: 2,
    action: Action.Multiply,
    expected: 6,
  },
  {
    name: 'should divide two numbers',
    a: 4,
    b: 2,
    action: Action.Divide,
    expected: 2,
  },
  {
    name: 'should exponentiate two numbers',
    a: 4,
    b: 2,
    action: Action.Exponentiate,
    expected: 16,
  },
  {
    name: 'should return null for invalid action',
    a: 10,
    b: 20,
    action: '%',
    expected: null,
  },
  {
    name: 'should return null for invalid arguments',
    a: '10',
    b: 10,
    action: Action.Add,
    expected: null,
  },
  {
    name: 'should return null for invalid arguments',
    a: true,
    b: 10,
    action: Action.Add,
    expected: null,
  },
  {
    name: 'should return null for invalid arguments',
    a: 10,
    b: [1, 2, 3],
    action: Action.Add,
    expected: null,
  },
];

describe('simpleCalculator', () => {
  test.each(testCases)('$name', ({ a, b, action, expected }) => {
    const result = simpleCalculator({ a, b, action });
    expect(result).toBe(expected);
  });
});
