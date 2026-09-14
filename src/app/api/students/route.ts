import { NextRequest, NextResponse } from 'next/server';
import { getStudents, createStudent } from '@/lib/db/store';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const batch_id = searchParams.get('batch_id') || undefined;
    const training_level = searchParams.get('training_level') || undefined;
    const status = searchParams.get('status') || undefined;
    const search = searchParams.get('search') || undefined;

    const students = getStudents({ batch_id, training_level, status, search });
    return NextResponse.json({ success: true, data: students });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    if (!body.name || !body.phone || !body.batch_id || !body.training_level) {
      return NextResponse.json(
        { success: false, error: 'Missing required student fields (name, phone, batch, level)' },
        { status: 400 }
      );
    }

    const newStudent = createStudent({
      name: body.name,
      photo: body.photo || '',
      phone: body.phone,
      parent_name: body.parent_name || 'Guardian',
      parent_phone: body.parent_phone || body.phone,
      date_of_birth: body.date_of_birth || '2005-01-01',
      age: body.age ? parseInt(body.age, 10) : 20,
      gender: body.gender || 'Male',
      address: body.address || 'Kerala, India',
      joining_date: body.joining_date || new Date().toISOString().split('T')[0],
      batch_id: body.batch_id,
      training_level: body.training_level,
      status: body.status || 'active',
      blood_group: body.blood_group || '',
      emergency_notes: body.emergency_notes || '',
    });

    return NextResponse.json({ success: true, data: newStudent }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
