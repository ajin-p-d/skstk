import { NextRequest, NextResponse } from 'next/server';
import { getInstructors, createInstructor } from '@/lib/db/store';

export async function GET() {
  try {
    const instructors = getInstructors();
    return NextResponse.json({ success: true, data: instructors });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    if (!body.name || !body.designation) {
      return NextResponse.json(
        { success: false, error: 'Master name and designation are required' },
        { status: 400 }
      );
    }

    const newInstructor = createInstructor({
      name: body.name.trim(),
      designation: body.designation.trim(),
      experience: body.experience?.trim() || '10+ Years of Experience',
      specialization: Array.isArray(body.specialization)
        ? body.specialization.filter((s: string) => s.trim().length > 0)
        : typeof body.specialization === 'string'
        ? body.specialization.split(',').map((s: string) => s.trim()).filter(Boolean)
        : [],
      quote: body.quote?.trim() || '',
      image: body.image?.trim() || '/images/KALESH.jpg',
      bio: body.bio?.trim() || '',
    });

    return NextResponse.json({ success: true, data: newInstructor }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
