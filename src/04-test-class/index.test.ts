import {
  getBankAccount,
  BankAccount,
  InsufficientFundsError,
  TransferFailedError,
  SynchronizationFailedError,
} from '.';

describe('BankAccount', () => {
  const INITIAL_BALANCE = 1000;
  let acc: BankAccount;
  let anotherAcc: BankAccount;

  beforeEach(() => {
    acc = getBankAccount(INITIAL_BALANCE);
    anotherAcc = getBankAccount(INITIAL_BALANCE);
  });

  test('should create account with initial balance', () => {
    expect(acc).toBeInstanceOf(BankAccount);
    expect(acc.getBalance()).toBe(INITIAL_BALANCE);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    expect(() => acc.withdraw(INITIAL_BALANCE + 500)).toThrow(
      InsufficientFundsError,
    );
  });

  test('should throw error when transferring more than balance', () => {
    expect(() => acc.transfer(INITIAL_BALANCE + 500, anotherAcc)).toThrow(
      InsufficientFundsError,
    );
  });

  test('should throw error when transferring to the same account', () => {
    expect(() => acc.transfer(INITIAL_BALANCE, acc)).toThrow(
      TransferFailedError,
    );
  });

  test('should deposit money', () => {
    const amount = 500;
    expect(acc.deposit(amount).getBalance()).toBe(INITIAL_BALANCE + amount);
  });

  test('should withdraw money', () => {
    const amount = 500;
    expect(acc.withdraw(amount).getBalance()).toBe(INITIAL_BALANCE - amount);
  });

  test('should transfer money', () => {
    const amount = 500;
    expect(acc.transfer(amount, anotherAcc).getBalance()).toBe(
      INITIAL_BALANCE - amount,
    );
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    jest.spyOn(acc, 'fetchBalance').mockResolvedValue(100);
    const balance = await acc.fetchBalance();
    expect(balance).toBe(100);
  });

  test('should set new balance if fetchBalance returned number', async () => {
    jest.spyOn(acc, 'fetchBalance').mockResolvedValue(100);
    expect(acc.getBalance()).toBe(INITIAL_BALANCE);
    await acc.synchronizeBalance();
    expect(acc.getBalance()).toBe(100);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    jest.spyOn(acc, 'fetchBalance').mockResolvedValue(null);
    await expect(acc.synchronizeBalance()).rejects.toThrow(
      SynchronizationFailedError,
    );
  });
});
