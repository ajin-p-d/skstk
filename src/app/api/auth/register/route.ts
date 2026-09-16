import { NextRequest, NextResponse } from 'next/server';
import { getUserByEmail, createUser, createNotification } from '@/lib/db/store';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, password, phone, student_id } = body;

    if (!name || !email || !password) {
      return NextResponse.json(
        { success: false, error: 'Name, email, and password are required' },
        { status: 400 }
      );
    }

    const cleanEmail = email.trim().toLowerCase();

    // Prevent registering with admin email
    if (cleanEmail === 'admin@gmail.com') {
      return NextResponse.json(
        { success: false, error: 'This email is reserved for administration' },
        { status: 400 }
      );
    }

    // Check existing
    const existing = getUserByEmail(cleanEmail);
    if (existing) {
      return NextResponse.json(
        { success: false, error: 'An account with this email already exists' },
        { status: 400 }
      );
    }

    const newUser = createUser({
      email: cleanEmail,
      password: password.trim(),
      name: name.trim(),
      role: 'student',
      approval_status: 'pending',
      phone: phone?.trim() || '',
      student_id: student_id?.trim() || undefined,
    });

    // Notify admin
    try {
      createNotification({
        type: 'class',
        title: 'New Student Registration Pending Approval',
        message: `${name.trim()} (${cleanEmail}) has applied for student portal access. Please review and approve in Admin Approvals.`,
        target_student_id: null,
      });
    } catch (e) {
      // ignore notification error
    }

    const { password: _, ...safeUser } = newUser;

    return NextResponse.json(
      {
        success: true,
        data: safeUser,
        message: 'Registration request submitted successfully! Your account is pending approval by the Admin.',
      },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
