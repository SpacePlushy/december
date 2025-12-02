import { DayData, Bill, Deposit } from './types';
import {
  OFF_DAYS,
  STARTING_BALANCE,
  SPARK_DAILY_EARNINGS,
  DEPOSITS,
  BILLS,
  DAILY_LEDGER
} from '@/data/scheduleData';

/**
 * Format a number as currency
 */
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

/**
 * Get the appropriate color class for a balance amount
 */
export function getBalanceColor(balance: number): string {
  if (balance < 100) return 'text-rose-400';
  if (balance < 300) return 'text-yellow-400';
  if (balance >= 1000) return 'text-emerald-400';
  return 'text-slate-200';
}

/**
 * Get the background color class for a balance amount (for cards)
 */
export function getBalanceBgColor(balance: number): string {
  if (balance < 100) return 'bg-rose-500/10 border-rose-500/30';
  if (balance < 300) return 'bg-yellow-500/10 border-yellow-500/30';
  if (balance >= 1000) return 'bg-emerald-500/10 border-emerald-500/30';
  return 'bg-slate-800/50 border-slate-700';
}

/**
 * Get the first day of the current month
 */
export function getCurrentMonthStart(): Date {
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth(), 1);
}

/**
 * Get the number of days in the current month
 */
export function getDaysInCurrentMonth(): number {
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
}

/**
 * Get dates for current month (up to 30 days for our schedule)
 */
export function getCurrentMonthDates(): Date[] {
  const monthStart = getCurrentMonthStart();
  const dates: Date[] = [];

  for (let i = 0; i < 30; i++) {
    const date = new Date(monthStart);
    date.setDate(i + 1);
    dates.push(date);
  }

  return dates;
}

/**
 * Check if a day is a work day
 */
export function isWorkDay(day: number): boolean {
  return !OFF_DAYS.includes(day);
}

/**
 * Get deposits for a specific day
 */
export function getDepositsForDay(day: number): Deposit[] {
  return DEPOSITS.filter(d => d.day === day);
}

/**
 * Get bills for a specific day
 */
export function getBillsForDay(day: number): Bill[] {
  return BILLS.filter(b => b.day === day);
}

/**
 * Get the opening balance for a day
 */
export function getOpeningBalance(day: number): number {
  if (day === 1) return STARTING_BALANCE;
  const previousDay = DAILY_LEDGER.find(entry => entry.day === day - 1);
  return previousDay ? previousDay.closingBalance : STARTING_BALANCE;
}

/**
 * Get the closing balance for a day
 */
export function getClosingBalance(day: number): number {
  const entry = DAILY_LEDGER.find(e => e.day === day);
  return entry ? entry.closingBalance : 0;
}

/**
 * Check if a given day number is today
 */
export function isDayToday(day: number): boolean {
  const now = new Date();
  return now.getDate() === day;
}

/**
 * Get complete day data
 */
export function getDayData(day: number): DayData {
  const monthStart = getCurrentMonthStart();
  const date = new Date(monthStart);
  date.setDate(day);

  const status = isWorkDay(day) ? 'work' : 'off';
  const deposits = getDepositsForDay(day);
  const bills = getBillsForDay(day);
  const sparkEarnings = status === 'work' ? SPARK_DAILY_EARNINGS : 0;

  return {
    day,
    date,
    status,
    openingBalance: getOpeningBalance(day),
    deposits,
    sparkEarnings,
    bills,
    closingBalance: getClosingBalance(day),
    isToday: isDayToday(day),
  };
}

/**
 * Format a date for display
 */
export function formatDate(date: Date): string {
  return date.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  });
}

/**
 * Format a short date (just month and day)
 */
export function formatShortDate(date: Date): string {
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  });
}

/**
 * Get the current day of the month
 */
export function getCurrentDay(): number {
  return new Date().getDate();
}

/**
 * Calculate completed days (days that have passed)
 */
export function getCompletedDays(): number {
  const today = getCurrentDay();
  return Math.min(today - 1, 30);
}
