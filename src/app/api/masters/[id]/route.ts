import { NextRequest, NextResponse } from 'next/server';
import { getInstructorById, updateInstructor, deleteInstructor } from '@/lib/db/store';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const instructor = getInstructorById(params.id);
    if (!instructor) {
      return NextResponse.json({ success: false, error: 'Master not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: instructor });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();

    const updates: Record<string, any> = {};
    if (body.name !== undefined) updates.name = body.name.trim();
    if (body.designation !== undefined) updates.designation = body.designation.trim();
    if (body.experience !== undefined) updates.experience = body.experience.trim();
    if (body.quote !== undefined) updates.quote = body.quote.trim();
    if (body.image !== undefined) updates.image = body.image.trim();
    if (body.bio !== undefined) updates.bio = body.bio.trim();
    if (body.specialization !== undefined) {
      updates.specialization = Array.isArray(body.specialization)
        ? body.specialization.filter((s: string) => s.trim().length > 0)
        : typeof body.specialization === 'string'
        ? body.specialization.split(',').map((s: string) => s.trim()).filter(Boolean)
        : [];
    }

    const updated = updateInstructor(params.id, updates);
    if (!updated) {
      return NextResponse.json({ success: false, error: 'Master not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: updated });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const deleted = deleteInstructor(params.id);
    if (!deleted) {
      return NextResponse.json({ success: false, error: 'Master not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true, message: 'Master deleted successfully' });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
