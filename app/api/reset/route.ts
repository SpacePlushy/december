import { NextResponse } from 'next/server';
import { resetSchedule } from '@/lib/kv';

// POST /api/reset - Reset all data to defaults
export async function POST() {
  try {
    const schedule = await resetSchedule();
    return NextResponse.json({
      success: true,
      message: 'Schedule reset to defaults',
      schedule,
    });
  } catch (error) {
    console.error('Error in POST /api/reset:', error);
    return NextResponse.json(
      { error: 'Failed to reset schedule' },
      { status: 500 }
    );
  }
}
