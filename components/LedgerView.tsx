'use client';

import { DayData } from '@/lib/types';
import { getDayData, formatCurrency, getBalanceColor, formatShortDate } from '@/lib/utils';

interface LedgerViewProps {
  onDayClick: (dayData: DayData) => void;
}

export default function LedgerView({ onDayClick }: LedgerViewProps) {
  const days = Array.from({ length: 30 }, (_, i) => getDayData(i + 1));

  return (
    <div className="px-4 md:px-6">
      <div className="max-w-7xl mx-auto">
        {/* Desktop Table View */}
        <div className="hidden md:block overflow-x-auto rounded-xl border border-slate-700">
          <table className="w-full">
            <thead className="bg-slate-800 sticky top-0">
              <tr>
                <th className="text-left p-4 text-sm font-semibold text-slate-300">Day</th>
                <th className="text-left p-4 text-sm font-semibold text-slate-300">Date</th>
                <th className="text-left p-4 text-sm font-semibold text-slate-300">Status</th>
                <th className="text-right p-4 text-sm font-semibold text-slate-300">Opening</th>
                <th className="text-right p-4 text-sm font-semibold text-slate-300">Deposits</th>
                <th className="text-right p-4 text-sm font-semibold text-slate-300">Earnings</th>
                <th className="text-right p-4 text-sm font-semibold text-slate-300">Bills</th>
                <th className="text-right p-4 text-sm font-semibold text-slate-300">Closing</th>
              </tr>
            </thead>
            <tbody>
              {days.map((day, index) => {
                const totalDeposits = day.deposits.reduce((sum, d) => sum + d.amount, 0);
                const totalBills = day.bills.reduce((sum, b) => sum + b.amount, 0);

                return (
                  <tr
                    key={day.day}
                    onClick={() => onDayClick(day)}
                    className={`
                      cursor-pointer transition-colors hover:bg-slate-700/50
                      ${index % 2 === 0 ? 'bg-slate-900' : 'bg-slate-800/50'}
                      ${day.isToday ? 'ring-1 ring-inset ring-white/20' : ''}
                    `}
                  >
                    <td className="p-4 font-semibold text-white">{day.day}</td>
                    <td className="p-4 text-slate-400">{formatShortDate(day.date)}</td>
                    <td className="p-4">
                      <span
                        className={`
                          px-2 py-1 rounded-full text-xs font-medium uppercase
                          ${day.status === 'work' ? 'bg-amber-500/20 text-amber-400' : 'bg-cyan-500/20 text-cyan-400'}
                        `}
                      >
                        {day.status}
                      </span>
                    </td>
                    <td className="p-4 text-right font-mono text-slate-300">
                      {formatCurrency(day.openingBalance)}
                    </td>
                    <td className="p-4 text-right font-mono text-emerald-400">
                      {totalDeposits > 0 ? `+${formatCurrency(totalDeposits)}` : '-'}
                    </td>
                    <td className="p-4 text-right font-mono text-amber-400">
                      {day.sparkEarnings > 0 ? `+${formatCurrency(day.sparkEarnings)}` : '-'}
                    </td>
                    <td className="p-4 text-right font-mono text-rose-400">
                      {totalBills > 0 ? `-${formatCurrency(totalBills)}` : '-'}
                    </td>
                    <td className={`p-4 text-right font-mono font-semibold ${getBalanceColor(day.closingBalance)}`}>
                      {formatCurrency(day.closingBalance)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Mobile Card View */}
        <div className="md:hidden space-y-3">
          {days.map((day) => {
            const totalDeposits = day.deposits.reduce((sum, d) => sum + d.amount, 0);
            const totalBills = day.bills.reduce((sum, b) => sum + b.amount, 0);

            return (
              <div
                key={day.day}
                onClick={() => onDayClick(day)}
                className={`
                  p-4 rounded-xl border cursor-pointer transition-all
                  hover:scale-[1.01] active:scale-[0.99]
                  ${day.status === 'work' ? 'border-amber-500/30 bg-amber-500/5' : 'border-cyan-500/30 bg-cyan-500/5'}
                  ${day.isToday ? 'ring-1 ring-white/30' : ''}
                `}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <span className="text-xl font-bold text-white">Day {day.day}</span>
                    <span
                      className={`
                        px-2 py-0.5 rounded-full text-xs font-medium uppercase
                        ${day.status === 'work' ? 'bg-amber-500/20 text-amber-400' : 'bg-cyan-500/20 text-cyan-400'}
                      `}
                    >
                      {day.status}
                    </span>
                  </div>
                  <span className="text-sm text-slate-500">{formatShortDate(day.date)}</span>
                </div>

                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <p className="text-slate-500 mb-1">Opening</p>
                    <p className="font-mono text-slate-300">{formatCurrency(day.openingBalance)}</p>
                  </div>
                  <div>
                    <p className="text-slate-500 mb-1">Closing</p>
                    <p className={`font-mono font-semibold ${getBalanceColor(day.closingBalance)}`}>
                      {formatCurrency(day.closingBalance)}
                    </p>
                  </div>
                </div>

                {(totalDeposits > 0 || day.sparkEarnings > 0 || totalBills > 0) && (
                  <div className="flex flex-wrap gap-2 mt-3 pt-3 border-t border-slate-700/50">
                    {totalDeposits > 0 && (
                      <span className="text-xs bg-emerald-500/20 text-emerald-400 px-2 py-1 rounded-full">
                        +{formatCurrency(totalDeposits)} deposit
                      </span>
                    )}
                    {day.sparkEarnings > 0 && (
                      <span className="text-xs bg-amber-500/20 text-amber-400 px-2 py-1 rounded-full">
                        +{formatCurrency(day.sparkEarnings)} spark
                      </span>
                    )}
                    {totalBills > 0 && (
                      <span className="text-xs bg-rose-500/20 text-rose-400 px-2 py-1 rounded-full">
                        -{formatCurrency(totalBills)} bills
                      </span>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
