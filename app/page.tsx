'use client';

import { useState, useEffect, useCallback } from 'react';
import { TabType, DayData } from '@/lib/types';
import { PersistedSchedule } from '@/lib/kv';
import Header from '@/components/Header';
import TabNav from '@/components/TabNav';
import CalendarView from '@/components/CalendarView';
import LedgerView from '@/components/LedgerView';
import BillsIncomeView from '@/components/BillsIncomeView';
import DayDetailModal from '@/components/DayDetailModal';

export default function Home() {
  const [activeTab, setActiveTab] = useState<TabType>('calendar');
  const [selectedDay, setSelectedDay] = useState<DayData | null>(null);
  const [schedule, setSchedule] = useState<PersistedSchedule | null>(null);
  const [refreshKey, setRefreshKey] = useState(0);

  // Fetch schedule data on mount
  const fetchSchedule = useCallback(async () => {
    try {
      const response = await fetch('/api/schedule');
      if (response.ok) {
        const data = await response.json();
        setSchedule(data);
      }
    } catch (error) {
      console.error('Error fetching schedule:', error);
    }
  }, []);

  useEffect(() => {
    fetchSchedule();
  }, [fetchSchedule, refreshKey]);

  const handleDayClick = (dayData: DayData) => {
    setSelectedDay(dayData);
  };

  const handleCloseModal = () => {
    setSelectedDay(null);
  };

  const handleReset = () => {
    setRefreshKey((prev) => prev + 1);
  };

  return (
    <main className="min-h-screen pb-8">
      <Header onReset={handleReset} />
      <TabNav activeTab={activeTab} onTabChange={setActiveTab} />

      {activeTab === 'calendar' && (
        <CalendarView onDayClick={handleDayClick} />
      )}

      {activeTab === 'ledger' && (
        <LedgerView onDayClick={handleDayClick} />
      )}

      {activeTab === 'bills' && (
        <BillsIncomeView />
      )}

      <DayDetailModal dayData={selectedDay} onClose={handleCloseModal} />
    </main>
  );
}
