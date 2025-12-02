import Redis from 'ioredis';
import { DAILY_LEDGER } from '@/data/scheduleData';

const SCHEDULE_KEY = 'cashflow:schedule';

// Singleton Redis client
let redisClient: Redis | null = null;

// Initialize Redis client from REDIS_URL
function getRedisClient(): Redis | null {
  if (redisClient) {
    return redisClient;
  }

  const redisUrl = process.env.REDIS_URL;

  if (!redisUrl) {
    return null;
  }

  try {
    redisClient = new Redis(redisUrl, {
      maxRetriesPerRequest: 3,
      lazyConnect: true,
    });
    return redisClient;
  } catch (error) {
    console.error('Failed to create Redis client:', error);
    return null;
  }
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

// Get schedule from Redis (or return default if not set)
export async function getSchedule(): Promise<PersistedSchedule> {
  const redis = getRedisClient();

  if (!redis) {
    return getDefaultSchedule();
  }

  try {
    const data = await redis.get(SCHEDULE_KEY);
    if (!data) {
      return getDefaultSchedule();
    }
    return JSON.parse(data) as PersistedSchedule;
  } catch (error) {
    console.error('Error fetching schedule from Redis:', error);
    return getDefaultSchedule();
  }
}

// Save schedule to Redis
export async function saveSchedule(schedule: PersistedSchedule): Promise<void> {
  const redis = getRedisClient();

  if (!redis) {
    console.warn('Redis not configured, skipping save');
    return;
  }

  try {
    schedule.lastUpdated = new Date().toISOString();
    await redis.set(SCHEDULE_KEY, JSON.stringify(schedule));
  } catch (error) {
    console.error('Error saving schedule to Redis:', error);
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
