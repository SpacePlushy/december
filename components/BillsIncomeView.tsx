'use client';

import { formatCurrency } from '@/lib/utils';
import {
  BILLS,
  DEPOSITS,
  TOTAL_BILLS,
  TOTAL_DEPOSITS,
  TOTAL_SPARK_EARNINGS,
  TOTAL_WORK_DAYS,
  SPARK_DAILY_EARNINGS,
  TOTAL_INCOME,
} from '@/data/scheduleData';

export default function BillsIncomeView() {
  const netIncome = TOTAL_INCOME - TOTAL_BILLS;

  return (
    <div className="px-4 md:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Bills Section */}
          <div className="bg-slate-900/50 rounded-2xl border border-slate-700 overflow-hidden">
            <div className="p-4 border-b border-slate-700 bg-slate-800/50">
              <h2 className="text-lg font-semibold text-white flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-rose-500" />
                Bills & Expenses
              </h2>
            </div>

            <div className="divide-y divide-slate-700/50 max-h-[500px] overflow-y-auto">
              {BILLS.map((bill, index) => (
                <div
                  key={`${bill.day}-${bill.name}-${index}`}
                  className="p-4 flex items-center justify-between hover:bg-slate-800/50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-slate-500 w-12">Day {bill.day}</span>
                    <span className="text-white">{bill.name}</span>
                  </div>
                  <span className="font-mono text-rose-400">
                    -{formatCurrency(bill.amount)}
                  </span>
                </div>
              ))}
            </div>

            <div className="p-4 border-t border-slate-700 bg-slate-800/50">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-white">Total Bills</span>
                <span className="font-mono font-bold text-rose-400 text-lg">
                  -{formatCurrency(TOTAL_BILLS)}
                </span>
              </div>
            </div>
          </div>

          {/* Income Section */}
          <div className="bg-slate-900/50 rounded-2xl border border-slate-700 overflow-hidden">
            <div className="p-4 border-b border-slate-700 bg-slate-800/50">
              <h2 className="text-lg font-semibold text-white flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                Income
              </h2>
            </div>

            <div className="divide-y divide-slate-700/50">
              {/* Deposits */}
              <div className="p-4">
                <h3 className="text-sm font-medium text-slate-400 mb-3">Deposits</h3>
                <div className="space-y-3">
                  {DEPOSITS.map((deposit, index) => (
                    <div
                      key={`${deposit.day}-${index}`}
                      className="flex items-center justify-between"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-sm text-slate-500">Day {deposit.day}</span>
                        <span className="text-white">{deposit.description}</span>
                      </div>
                      <span className="font-mono text-emerald-400">
                        +{formatCurrency(deposit.amount)}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="mt-4 pt-3 border-t border-slate-700/50 flex justify-between">
                  <span className="text-slate-400">Subtotal</span>
                  <span className="font-mono text-emerald-400">
                    +{formatCurrency(TOTAL_DEPOSITS)}
                  </span>
                </div>
              </div>

              {/* Spark Earnings */}
              <div className="p-4">
                <h3 className="text-sm font-medium text-slate-400 mb-3">Spark Earnings</h3>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <span className="text-white">Daily Rate</span>
                    <span className="text-xs bg-amber-500/20 text-amber-400 px-2 py-0.5 rounded-full">
                      {TOTAL_WORK_DAYS} work days
                    </span>
                  </div>
                  <span className="font-mono text-slate-300">
                    {formatCurrency(SPARK_DAILY_EARNINGS)}/day
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Subtotal</span>
                  <span className="font-mono text-amber-400">
                    +{formatCurrency(TOTAL_SPARK_EARNINGS)}
                  </span>
                </div>
              </div>
            </div>

            <div className="p-4 border-t border-slate-700 bg-slate-800/50">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-white">Total Income</span>
                <span className="font-mono font-bold text-emerald-400 text-lg">
                  +{formatCurrency(TOTAL_INCOME)}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Net Summary */}
        <div className="mt-6 p-6 rounded-2xl bg-gradient-to-r from-slate-800/50 to-slate-900/50 border border-slate-700">
          <div className="grid sm:grid-cols-3 gap-6 text-center">
            <div>
              <p className="text-sm text-slate-400 mb-1">Total Income</p>
              <p className="text-2xl font-bold font-mono text-emerald-400">
                +{formatCurrency(TOTAL_INCOME)}
              </p>
            </div>
            <div>
              <p className="text-sm text-slate-400 mb-1">Total Expenses</p>
              <p className="text-2xl font-bold font-mono text-rose-400">
                -{formatCurrency(TOTAL_BILLS)}
              </p>
            </div>
            <div>
              <p className="text-sm text-slate-400 mb-1">Net Cashflow</p>
              <p className={`text-2xl font-bold font-mono ${netIncome >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                {netIncome >= 0 ? '+' : ''}{formatCurrency(netIncome)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
