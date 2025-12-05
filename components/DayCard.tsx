'use client';

import { DayData } from '@/lib/types';
import { formatCurrency, getBalanceColor, formatShortDate } from '@/lib/utils';

interface DayCardProps {
  dayData: DayData;
  onClick: () => void;
}

export default function DayCard({ dayData, onClick }: DayCardProps) {
  const { day, date, status, closingBalance, isToday, bills, deposits } = dayData;

  const statusStyles = {
    work: 'border-amber-500/40 bg-amber-500/5',
    off: 'border-cyan-500/40 bg-cyan-500/5',
  };

  const badgeStyles = {
    work: 'bg-amber-500/20 text-amber-400',
    off: 'bg-cyan-500/20 text-cyan-400',
  };

  const hasActivity = bills.length > 0 || deposits.length > 0;

  return (
    <button
      onClick={onClick}
      className={`
        relative p-4 rounded-xl border transition-all duration-200
        hover:scale-[1.02] hover:shadow-lg hover:shadow-slate-900/50
        active:scale-[0.98] cursor-pointer text-left w-full min-h-[120px]
        ${statusStyles[status]}
        ${isToday ? 'ring-2 ring-white/30' : ''}
      `}
    >
      {isToday && (
        <div className="absolute -top-1 -right-1 w-3 h-3 bg-white rounded-full animate-pulse" />
      )}

      <div className="flex items-start justify-between mb-3">
        <span className="text-2xl font-bold text-white">{day}</span>
        <span className={`text-[10px] px-2 py-1 rounded-full font-medium uppercase ${badgeStyles[status]}`}>
          {status}
        </span>
      </div>

      <p className="text-xs text-slate-500 mb-3">
        {formatShortDate(date)}
      </p>

      <p className={`text-base font-mono font-semibold ${getBalanceColor(closingBalance)}`}>
        {formatCurrency(closingBalance)}
      </p>

      {hasActivity && (
        <div className="flex gap-1.5 mt-3">
          {deposits.length > 0 && (
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" title="Deposit" />
          )}
          {bills.length > 0 && (
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500" title="Bills" />
          )}
        </div>
      )}
    </button>
  );
}
