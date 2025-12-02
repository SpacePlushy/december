'use client';

import { formatCurrency } from '@/lib/utils';
import {
  TOTAL_WORK_DAYS,
  TOTAL_OFF_DAYS,
  STARTING_BALANCE,
  PROJECTED_FINAL_BALANCE,
} from '@/data/scheduleData';
import ResetButton from './ResetButton';

interface StatCardProps {
  label: string;
  value: string | number;
  color?: 'amber' | 'cyan' | 'emerald' | 'slate';
}

function StatCard({ label, value, color = 'slate' }: StatCardProps) {
  const colorClasses = {
    amber: 'bg-amber-500/10 border-amber-500/30 text-amber-400',
    cyan: 'bg-cyan-500/10 border-cyan-500/30 text-cyan-400',
    emerald: 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400',
    slate: 'bg-slate-800/50 border-slate-700 text-slate-200',
  };

  return (
    <div
      className={`p-4 rounded-xl border ${colorClasses[color]} transition-all duration-200 hover:scale-[1.02]`}
    >
      <p className="text-sm text-slate-400 mb-1">{label}</p>
      <p className="text-2xl font-semibold font-mono">{value}</p>
    </div>
  );
}

interface HeaderProps {
  onReset: () => void;
}

export default function Header({ onReset }: HeaderProps) {
  return (
    <header className="px-4 py-6 md:px-6 md:py-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6 flex items-start justify-between">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
              Cashflow Tracker
            </h1>
            <p className="text-slate-400">
              Spark Delivery 30-Day Schedule
            </p>
          </div>
          <ResetButton onReset={onReset} />
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
          <StatCard
            label="Work Days"
            value={TOTAL_WORK_DAYS}
            color="amber"
          />
          <StatCard
            label="Off Days"
            value={TOTAL_OFF_DAYS}
            color="cyan"
          />
          <StatCard
            label="Starting Balance"
            value={formatCurrency(STARTING_BALANCE)}
          />
          <StatCard
            label="Projected End"
            value={formatCurrency(PROJECTED_FINAL_BALANCE)}
            color="emerald"
          />
        </div>
      </div>
    </header>
  );
}
