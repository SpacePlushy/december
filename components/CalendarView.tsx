'use client';

import { DayData } from '@/lib/types';
import { getDayData, getCompletedDays, getCurrentDay } from '@/lib/utils';
import DayCard from './DayCard';

interface CalendarViewProps {
  onDayClick: (dayData: DayData) => void;
}

export default function CalendarView({ onDayClick }: CalendarViewProps) {
  const days = Array.from({ length: 30 }, (_, i) => getDayData(i + 1));
  const completedDays = getCompletedDays();
  const currentDay = getCurrentDay();

  return (
    <div className="px-4 md:px-6">
      <div className="max-w-7xl mx-auto">
        {/* Progress indicator */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-slate-400">Progress</span>
            <span className="text-sm text-slate-400">
              Day {Math.min(currentDay, 30)} of 30
            </span>
          </div>
          <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-amber-500 to-emerald-500 transition-all duration-500"
              style={{ width: `${(completedDays / 30) * 100}%` }}
            />
          </div>
        </div>

        {/* Calendar grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-10 gap-3 md:gap-4">
          {days.map((dayData) => (
            <DayCard
              key={dayData.day}
              dayData={dayData}
              onClick={() => onDayClick(dayData)}
            />
          ))}
        </div>

        {/* Legend */}
        <div className="flex flex-wrap gap-4 mt-6 justify-center text-sm">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-amber-500/50 border border-amber-500" />
            <span className="text-slate-400">Work Day</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-cyan-500/50 border border-cyan-500" />
            <span className="text-slate-400">Off Day</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-emerald-500" />
            <span className="text-slate-400">Deposit</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-rose-500" />
            <span className="text-slate-400">Bills</span>
          </div>
        </div>
      </div>
    </div>
  );
}
