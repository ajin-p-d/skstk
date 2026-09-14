import { NextRequest, NextResponse } from 'next/server';
import { getAttendance, markDailyAttendance } from '@/lib/db/store';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const date = searchParams.get('date') || undefined;
    const batch_id = searchParams.get('batch_id') || undefined;
    const student_id = searchParams.get('student_id') || undefined;
    const month = searchParams.get('month') || undefined;

    const records = getAttendance({ date, batch_id, student_id, month });
    return NextResponse.json({ success: true, data: records });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    if (!Array.isArray(body.records)) {
      return NextResponse.json(
        { success: false, error: 'Expected records array in body' },
        { status: 400 }
      );
    }

    const saved = markDailyAttendance(body.records);
    return NextResponse.json({ success: true, data: saved });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
