import { Deposit, Bill, LedgerEntry } from '@/lib/types';

// Off days are evenly spaced throughout the month
export const OFF_DAYS: number[] = [4, 8, 11, 15, 19, 22, 26, 29];

// Financial constants
export const STARTING_BALANCE = 90.50;
export const SPARK_DAILY_EARNINGS = 100;
export const TOTAL_WORK_DAYS = 22;
export const TOTAL_OFF_DAYS = 8;
export const TOTAL_BILLS = 3290.47;
export const TOTAL_DEPOSITS = 2042.00;
export const TOTAL_SPARK_EARNINGS = 2200.00;
export const TOTAL_INCOME = 4242.00;
export const PROJECTED_FINAL_BALANCE = 1042.03;

// Deposits
export const DEPOSITS: Deposit[] = [
  { day: 10, description: 'Paycheck', amount: 1021.00 },
  { day: 24, description: 'Paycheck', amount: 1021.00 },
];

// Bills
export const BILLS: Bill[] = [
  { day: 1, name: 'Auto Insurance', amount: 108.00 },
  { day: 2, name: 'YouTube Premium', amount: 8.00 },
  { day: 5, name: 'Groceries', amount: 112.50 },
  { day: 5, name: 'Weed', amount: 20.00 },
  { day: 6, name: 'Electric', amount: 139.00 },
  { day: 8, name: 'Paramount Plus', amount: 12.00 },
  { day: 8, name: 'iPad AppleCare', amount: 8.49 },
  { day: 10, name: 'Streaming Svcs', amount: 230.00 },
  { day: 10, name: 'AI Subscription', amount: 220.00 },
  { day: 11, name: 'Cat Food', amount: 40.00 },
  { day: 12, name: 'Groceries', amount: 112.50 },
  { day: 12, name: 'Weed', amount: 20.00 },
  { day: 14, name: 'iPad AppleCare', amount: 8.49 },
  { day: 16, name: 'Cat Food', amount: 40.00 },
  { day: 19, name: 'Groceries', amount: 112.50 },
  { day: 19, name: 'Weed', amount: 20.00 },
  { day: 22, name: 'Cell Phone', amount: 177.00 },
  { day: 23, name: 'Cat Food', amount: 40.00 },
  { day: 25, name: 'Ring Subscription', amount: 10.00 },
  { day: 26, name: 'Groceries', amount: 112.50 },
  { day: 26, name: 'Weed', amount: 20.00 },
  { day: 28, name: 'iPhone AppleCare', amount: 13.49 },
  { day: 29, name: 'Internet', amount: 30.00 },
  { day: 29, name: 'Cat Food', amount: 40.00 },
  { day: 30, name: 'Rent', amount: 1636.00 },
];

// Pre-calculated daily ledger with closing balances
export const DAILY_LEDGER: LedgerEntry[] = [
  { day: 1, status: 'work', closingBalance: 82.50 },
  { day: 2, status: 'work', closingBalance: 174.50 },
  { day: 3, status: 'work', closingBalance: 274.50 },
  { day: 4, status: 'off', closingBalance: 274.50 },
  { day: 5, status: 'work', closingBalance: 242.00 },
  { day: 6, status: 'work', closingBalance: 203.00 },
  { day: 7, status: 'work', closingBalance: 303.00 },
  { day: 8, status: 'off', closingBalance: 282.51 },
  { day: 9, status: 'work', closingBalance: 382.51 },
  { day: 10, status: 'work', closingBalance: 1053.51 },
  { day: 11, status: 'off', closingBalance: 1013.51 },
  { day: 12, status: 'work', closingBalance: 981.01 },
  { day: 13, status: 'work', closingBalance: 1081.01 },
  { day: 14, status: 'work', closingBalance: 1172.52 },
  { day: 15, status: 'off', closingBalance: 1172.52 },
  { day: 16, status: 'work', closingBalance: 1232.52 },
  { day: 17, status: 'work', closingBalance: 1332.52 },
  { day: 18, status: 'work', closingBalance: 1432.52 },
  { day: 19, status: 'off', closingBalance: 1300.02 },
  { day: 20, status: 'work', closingBalance: 1400.02 },
  { day: 21, status: 'work', closingBalance: 1500.02 },
  { day: 22, status: 'off', closingBalance: 1323.02 },
  { day: 23, status: 'work', closingBalance: 1383.02 },
  { day: 24, status: 'work', closingBalance: 2504.02 },
  { day: 25, status: 'work', closingBalance: 2594.02 },
  { day: 26, status: 'off', closingBalance: 2461.52 },
  { day: 27, status: 'work', closingBalance: 2561.52 },
  { day: 28, status: 'work', closingBalance: 2648.03 },
  { day: 29, status: 'off', closingBalance: 2578.03 },
  { day: 30, status: 'work', closingBalance: 1042.03 },
];
