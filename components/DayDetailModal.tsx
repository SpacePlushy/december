'use client';

import { useEffect, useCallback } from 'react';
import { DayData } from '@/lib/types';
import { formatCurrency, getBalanceColor, formatDate } from '@/lib/utils';

interface DayDetailModalProps {
  dayData: DayData | null;
  onClose: () => void;
}

export default function DayDetailModal({ dayData, onClose }: DayDetailModalProps) {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    },
    [onClose]
  );

  useEffect(() => {
    if (dayData) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [dayData, handleKeyDown]);

  if (!dayData) return null;

  const { day, date, status, openingBalance, deposits, sparkEarnings, bills, closingBalance, isToday } = dayData;
  const totalDeposits = deposits.reduce((sum, d) => sum + d.amount, 0);
  const totalBills = bills.reduce((sum, b) => sum + b.amount, 0);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

      {/* Modal */}
      <div
        className="relative w-full max-w-md bg-slate-900 rounded-2xl border border-slate-700 shadow-2xl overflow-hidden animate-in zoom-in-95 fade-in duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          className={`p-6 ${
            status === 'work'
              ? 'bg-gradient-to-r from-amber-500/20 to-transparent'
              : 'bg-gradient-to-r from-cyan-500/20 to-transparent'
          }`}
        >
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h2 className="text-2xl font-bold text-white">Day {day}</h2>
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium uppercase ${
                    status === 'work'
                      ? 'bg-amber-500/30 text-amber-300'
                      : 'bg-cyan-500/30 text-cyan-300'
                  }`}
                >
                  {status}
                </span>
                {isToday && (
                  <span className="px-2 py-1 rounded-full text-xs font-medium bg-white/20 text-white">
                    Today
                  </span>
                )}
              </div>
              <p className="text-slate-400">{formatDate(date)}</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-slate-800 transition-colors text-slate-400 hover:text-white"
              aria-label="Close modal"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Opening Balance */}
          <div>
            <p className="text-sm text-slate-400 mb-1">Opening Balance</p>
            <p className="text-xl font-mono text-slate-200">
              {formatCurrency(openingBalance)}
            </p>
          </div>

          {/* Activity */}
          <div className="space-y-4">
            {/* Deposits */}
            {deposits.length > 0 && (
              <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30">
                <p className="text-sm font-medium text-emerald-400 mb-2">Deposits</p>
                <div className="space-y-2">
                  {deposits.map((deposit, index) => (
                    <div key={index} className="flex justify-between items-center">
                      <span className="text-white">{deposit.description}</span>
                      <span className="font-mono text-emerald-400">
                        +{formatCurrency(deposit.amount)}
                      </span>
                    </div>
                  ))}
                </div>
                {deposits.length > 1 && (
                  <div className="mt-2 pt-2 border-t border-emerald-500/30 flex justify-between">
                    <span className="text-sm text-slate-400">Total</span>
                    <span className="font-mono font-semibold text-emerald-400">
                      +{formatCurrency(totalDeposits)}
                    </span>
                  </div>
                )}
              </div>
            )}

            {/* Spark Earnings */}
            {sparkEarnings > 0 && (
              <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30">
                <p className="text-sm font-medium text-amber-400 mb-2">Spark Earnings</p>
                <div className="flex justify-between items-center">
                  <span className="text-white">Delivery work</span>
                  <span className="font-mono text-amber-400">
                    +{formatCurrency(sparkEarnings)}
                  </span>
                </div>
              </div>
            )}

            {/* Bills */}
            {bills.length > 0 && (
              <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/30">
                <p className="text-sm font-medium text-rose-400 mb-2">Bills & Expenses</p>
                <div className="space-y-2">
                  {bills.map((bill, index) => (
                    <div key={index} className="flex justify-between items-center">
                      <span className="text-white">{bill.name}</span>
                      <span className="font-mono text-rose-400">
                        -{formatCurrency(bill.amount)}
                      </span>
                    </div>
                  ))}
                </div>
                {bills.length > 1 && (
                  <div className="mt-2 pt-2 border-t border-rose-500/30 flex justify-between">
                    <span className="text-sm text-slate-400">Total</span>
                    <span className="font-mono font-semibold text-rose-400">
                      -{formatCurrency(totalBills)}
                    </span>
                  </div>
                )}
              </div>
            )}

            {/* No activity */}
            {deposits.length === 0 && sparkEarnings === 0 && bills.length === 0 && (
              <div className="p-4 rounded-xl bg-slate-800/50 border border-slate-700 text-center">
                <p className="text-slate-400">No transactions this day</p>
              </div>
            )}
          </div>

          {/* Closing Balance */}
          <div className="pt-4 border-t border-slate-700">
            <p className="text-sm text-slate-400 mb-1">Closing Balance</p>
            <p className={`text-3xl font-bold font-mono ${getBalanceColor(closingBalance)}`}>
              {formatCurrency(closingBalance)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
