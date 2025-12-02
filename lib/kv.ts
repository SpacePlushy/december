import { kv } from '@vercel/kv';
import { DAILY_LEDGER } from '@/data/scheduleData';

const SCHEDULE_KEY = 'cashflow:schedule';

// Check if KV is configured
function isKVConfigured(): boolean {
  return !!(process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN);
}

export interface PersistedDayData {
  day: number;
  actualBalance: number | null; // null means use projected
  completed: boolean;
  notes: string;
}

export interface PersistedSchedule {
  days: PersistedDayData[];
  lastUpdated: string;
}

// Get default schedule from static data
export function getDefaultSchedule(): PersistedSchedule {
  return {
    days: DAILY_LEDGER.map((entry) => ({
      day: entry.day,
      actualBalance: null,
      completed: false,
      notes: '',
    })),
    lastUpdated: new Date().toISOString(),
  };
}

// Get schedule from KV (or return default if not set)
export async function getSchedule(): Promise<PersistedSchedule> {
  if (!isKVConfigured()) {
    return getDefaultSchedule();
  }

  try {
    const schedule = await kv.get<PersistedSchedule>(SCHEDULE_KEY);
    if (!schedule) {
      return getDefaultSchedule();
    }
    return schedule;
  } catch (error) {
    console.error('Error fetching schedule from KV:', error);
    return getDefaultSchedule();
  }
}

// Save schedule to KV
export async function saveSchedule(schedule: PersistedSchedule): Promise<void> {
  if (!isKVConfigured()) {
    console.warn('KV not configured, skipping save');
    return;
  }

  try {
    schedule.lastUpdated = new Date().toISOString();
    await kv.set(SCHEDULE_KEY, schedule);
  } catch (error) {
    console.error('Error saving schedule to KV:', error);
    throw error;
  }
}

// Update a single day
export async function updateDay(
  day: number,
  updates: Partial<Omit<PersistedDayData, 'day'>>
): Promise<PersistedSchedule> {
  const schedule = await getSchedule();
  const dayIndex = schedule.days.findIndex((d) => d.day === day);

  if (dayIndex !== -1) {
    schedule.days[dayIndex] = {
      ...schedule.days[dayIndex],
      ...updates,
    };
    await saveSchedule(schedule);
  }

  return schedule;
}

// Reset all data to defaults
export async function resetSchedule(): Promise<PersistedSchedule> {
  const defaultSchedule = getDefaultSchedule();
  await saveSchedule(defaultSchedule);
  return defaultSchedule;
}
