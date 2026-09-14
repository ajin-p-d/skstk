import { NextRequest, NextResponse } from 'next/server';
import { getFees } from '@/lib/db/store';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const student_id = searchParams.get('student_id') || undefined;
    const month = searchParams.get('month') || undefined;
    const year = searchParams.get('year') ? parseInt(searchParams.get('year')!, 10) : undefined;
    const status = searchParams.get('status') || undefined;

    const fees = getFees({ student_id, month, year, status });
    return NextResponse.json({ success: true, data: fees });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
