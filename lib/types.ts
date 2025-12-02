export interface Deposit {
  day: number;
  description: string;
  amount: number;
}

export interface Bill {
  day: number;
  name: string;
  amount: number;
}

export interface LedgerEntry {
  day: number;
  status: 'work' | 'off';
  closingBalance: number;
}

export interface DayData {
  day: number;
  date: Date;
  status: 'work' | 'off';
  openingBalance: number;
  deposits: Deposit[];
  sparkEarnings: number;
  bills: Bill[];
  closingBalance: number;
  isToday: boolean;
}

export type TabType = 'calendar' | 'ledger' | 'bills';
