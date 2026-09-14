import { NextRequest, NextResponse } from 'next/server';
import { getPayments, recordPayment } from '@/lib/db/store';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const student_id = searchParams.get('student_id') || undefined;
    const fee_id = searchParams.get('fee_id') || undefined;
    const receipt_number = searchParams.get('receipt_number') || undefined;

    const payments = getPayments({ student_id, fee_id, receipt_number });
    return NextResponse.json({ success: true, data: payments });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    if (!body.student_id || !body.amount || !body.payment_method) {
      return NextResponse.json(
        { success: false, error: 'Missing required payment fields (student_id, amount, payment_method)' },
        { status: 400 }
      );
    }

    const result = recordPayment({
      student_id: body.student_id,
      fee_id: body.fee_id,
      amount: parseFloat(body.amount),
      payment_method: body.payment_method,
      payment_date: body.payment_date || new Date().toISOString().split('T')[0],
      notes: body.notes || '',
    });

    return NextResponse.json({ success: true, data: result }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
