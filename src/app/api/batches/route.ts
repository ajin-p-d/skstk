import { NextResponse } from 'next/server';
import { getBatches } from '@/lib/db/store';

export async function GET() {
  try {
    const batches = getBatches();
    return NextResponse.json({ success: true, data: batches });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
