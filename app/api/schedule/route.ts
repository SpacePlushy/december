import { NextResponse } from 'next/server';
import { getSchedule, updateDay, PersistedDayData } from '@/lib/kv';

// GET /api/schedule - Fetch the current schedule
export async function GET() {
  try {
    const schedule = await getSchedule();
    return NextResponse.json(schedule);
  } catch (error) {
    console.error('Error in GET /api/schedule:', error);
    return NextResponse.json(
      { error: 'Failed to fetch schedule' },
      { status: 500 }
    );
  }
}

// PATCH /api/schedule - Update a specific day
export async function PATCH(request: Request) {
  try {
    const body = await request.json();
    const { day, ...updates } = body as { day: number } & Partial<Omit<PersistedDayData, 'day'>>;

    if (!day || day < 1 || day > 30) {
      return NextResponse.json(
        { error: 'Invalid day number' },
        { status: 400 }
      );
    }

    const schedule = await updateDay(day, updates);
    return NextResponse.json(schedule);
  } catch (error) {
    console.error('Error in PATCH /api/schedule:', error);
    return NextResponse.json(
      { error: 'Failed to update schedule' },
      { status: 500 }
    );
  }
}
