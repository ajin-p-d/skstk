import { NextRequest, NextResponse } from 'next/server';
import { getNotifications, createNotification, markNotificationRead } from '@/lib/db/store';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const student_id = searchParams.get('student_id') || undefined;

    const notifs = getNotifications(student_id);
    return NextResponse.json({ success: true, data: notifs });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    if (!body.title || !body.message || !body.type) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields (title, message, type)' },
        { status: 400 }
      );
    }

    const created = createNotification({
      type: body.type,
      title: body.title,
      message: body.message,
      target_student_id: body.target_student_id || null,
    });

    return NextResponse.json({ success: true, data: created }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    if (!body.id) {
      return NextResponse.json({ success: false, error: 'Missing notification id' }, { status: 400 });
    }

    const ok = markNotificationRead(body.id);
    return NextResponse.json({ success: ok });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
