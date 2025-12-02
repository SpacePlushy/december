'use client';

import { TabType } from '@/lib/types';

interface TabNavProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

const tabs: { id: TabType; label: string }[] = [
  { id: 'calendar', label: 'Calendar' },
  { id: 'ledger', label: 'Ledger' },
  { id: 'bills', label: 'Bills & Income' },
];

export default function TabNav({ activeTab, onTabChange }: TabNavProps) {
  return (
    <nav className="px-4 md:px-6 mb-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-center">
          <div className="inline-flex bg-slate-900 rounded-xl p-1 gap-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={`
                  px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200
                  min-w-[100px] md:min-w-[120px]
                  ${
                    activeTab === tab.id
                      ? 'bg-slate-800 text-white shadow-lg'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
                  }
                `}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}
