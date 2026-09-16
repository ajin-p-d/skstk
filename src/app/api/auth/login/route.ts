import { NextRequest, NextResponse } from 'next/server';
import { getUserByEmail, getStudentById } from '@/lib/db/store';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { success: false, error: 'Email and password are required' },
        { status: 400 }
      );
    }

    const cleanEmail = email.trim().toLowerCase();
    const cleanPassword = password.trim();

    // Check for admin login
    if (cleanEmail === 'admin@gmail.com' && cleanPassword === 'admin@123') {
      return NextResponse.json({
        success: true,
        user: {
          id: 'user-admin',
          email: 'admin@gmail.com',
          name: 'Chief Gurukkal',
          role: 'admin',
          approval_status: 'approved',
        },
        role: 'admin',
      });
    }

    // Lookup user in database
    const user = getUserByEmail(cleanEmail);
    if (!user) {
      return NextResponse.json(
        { success: false, error: 'No account found with this email. Please register for student access.' },
        { status: 401 }
      );
    }

    // Check password
    if (user.password !== cleanPassword) {
      return NextResponse.json(
        { success: false, error: 'Incorrect password. Please try again.' },
        { status: 401 }
      );
    }

    // Check approval status
    if (user.approval_status === 'pending') {
      return NextResponse.json(
        {
          success: false,
          pending: true,
          error: 'Your account is pending admin approval. You will be able to log in once the Gurukkal/Admin approves your registration.',
        },
        { status: 403 }
      );
    }

    if (user.approval_status === 'rejected') {
      return NextResponse.json(
        {
          success: false,
          error: 'Your registration request was not approved. Please contact the academy administration.',
        },
        { status: 403 }
      );
    }

    // If student, find student details
    let studentData = null;
    if (user.student_id) {
      studentData = getStudentById(user.student_id);
    }

    // Safe user object (omit password)
    const { password: _, ...safeUser } = user;

    return NextResponse.json({
      success: true,
      user: safeUser,
      role: user.role,
      student: studentData,
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
