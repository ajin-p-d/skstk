import { NextRequest, NextResponse } from 'next/server';
import { getUsers, updateUserApproval, createNotification } from '@/lib/db/store';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');

    let users = getUsers();
    if (status) {
      users = users.filter((u) => u.approval_status === status);
    }

    // Omit passwords
    const safeUsers = users.map(({ password: _, ...rest }) => rest);

    return NextResponse.json({ success: true, data: safeUsers });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId, status } = body;

    if (!userId || !status || (status !== 'approved' && status !== 'rejected')) {
      return NextResponse.json(
        { success: false, error: 'Valid userId and status ("approved" or "rejected") are required' },
        { status: 400 }
      );
    }

    const updatedUser = updateUserApproval(userId, status);
    if (!updatedUser) {
      return NextResponse.json({ success: false, error: 'User not found' }, { status: 404 });
    }

    // Create notification
    try {
      createNotification({
        type: 'event',
        title: `Student Access ${status === 'approved' ? 'Approved' : 'Rejected'}`,
        message: `Account for ${updatedUser.name} (${updatedUser.email}) was marked as ${status}.`,
        target_student_id: updatedUser.student_id || null,
      });
    } catch (e) {
      // ignore
    }

    const { password: _, ...safeUser } = updatedUser;
    return NextResponse.json({
      success: true,
      data: safeUser,
      message: `User ${status === 'approved' ? 'approved' : 'rejected'} successfully`,
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
