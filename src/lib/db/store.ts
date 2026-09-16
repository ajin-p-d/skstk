import fs from 'fs';
import path from 'path';
import {
  Student,
  AttendanceRecord,
  FeeRecord,
  PaymentRecord,
  Batch,
  NotificationItem,
  Instructor,
  UserAccount,
} from '@/types';
import {
  initialStudents,
  initialBatches,
  initialFees,
  initialPayments,
  initialNotifications,
  generateInitialAttendance,
  instructorsData,
} from '../data/seed';

export const initialUsers: UserAccount[] = [
  {
    id: 'user-admin',
    email: 'admin@gmail.com',
    password: 'admin@123',
    name: 'Chief Gurukkal',
    role: 'admin',
    approval_status: 'approved',
    created_at: '2026-01-01T00:00:00.000Z',
    approved_at: '2026-01-01T00:00:00.000Z',
  },
  {
    id: 'user-arun',
    email: 'arun@gmail.com',
    password: 'student@123',
    name: 'Arun Kumar',
    role: 'student',
    approval_status: 'approved',
    student_id: 'KAL-2026-001',
    phone: '+91 98471 23456',
    created_at: '2026-01-10T10:00:00.000Z',
    approved_at: '2026-01-10T10:00:00.000Z',
  },
];

interface KalariDatabase {
  students: Student[];
  batches: Batch[];
  attendance: AttendanceRecord[];
  fees: FeeRecord[];
  payments: PaymentRecord[];
  notifications: NotificationItem[];
  instructors: Instructor[];
  users: UserAccount[];
}

const LOCAL_DB_FILE = path.join(process.cwd(), 'data', 'kalari-db.json');
const IS_SERVERLESS = process.env.VERCEL === '1' || !!process.env.AWS_LAMBDA_FUNCTION_NAME;
const DB_FILE = IS_SERVERLESS ? path.join('/tmp', 'kalari-db.json') : LOCAL_DB_FILE;

// In-memory cache for fast SSR/API responses
let memoryDb: KalariDatabase | null = null;

function ensureDataDir() {
  const dir = path.dirname(DB_FILE);
  if (!fs.existsSync(dir)) {
    try {
      fs.mkdirSync(dir, { recursive: true });
    } catch (e) {
      // ignore
    }
  }
}

function initDb(): KalariDatabase {
  ensureDataDir();

  // If on serverless and /tmp/kalari-db.json doesn't exist, seed it from local file
  if (IS_SERVERLESS && !fs.existsSync(DB_FILE) && fs.existsSync(LOCAL_DB_FILE)) {
    try {
      const initialContent = fs.readFileSync(LOCAL_DB_FILE, 'utf-8');
      fs.writeFileSync(DB_FILE, initialContent, 'utf-8');
    } catch (err) {
      console.error('Error copying db to /tmp:', err);
    }
  }

  const targetFile = fs.existsSync(DB_FILE) ? DB_FILE : fs.existsSync(LOCAL_DB_FILE) ? LOCAL_DB_FILE : null;
  if (targetFile) {
    try {
      const content = fs.readFileSync(targetFile, 'utf-8');
      const parsed = JSON.parse(content);
      if (parsed.students && parsed.fees) {
        let modified = false;
        if (!parsed.instructors || !Array.isArray(parsed.instructors) || parsed.instructors.length === 0) {
          parsed.instructors = [...instructorsData];
          modified = true;
        }
        if (!parsed.users || !Array.isArray(parsed.users) || parsed.users.length === 0) {
          parsed.users = [...initialUsers];
          modified = true;
        }
        if (modified) {
          try {
            ensureDataDir();
            fs.writeFileSync(DB_FILE, JSON.stringify(parsed, null, 2), 'utf-8');
          } catch (writeErr) {
            console.error('Error writing back defaults to db:', writeErr);
          }
        }
        return parsed;
      }
    } catch (err) {
      console.error('Error reading db file, regenerating defaults:', err);
    }
  }

  const defaultDb: KalariDatabase = {
    students: initialStudents,
    batches: initialBatches,
    attendance: generateInitialAttendance(),
    fees: initialFees,
    payments: initialPayments,
    notifications: initialNotifications,
    instructors: instructorsData,
    users: initialUsers,
  };

  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(defaultDb, null, 2), 'utf-8');
  } catch (err) {
    console.error('Error writing initial db:', err);
  }

  return defaultDb;
}

function getDb(): KalariDatabase {
  if (!memoryDb) {
    memoryDb = initDb();
  }
  return memoryDb;
}

function saveDb() {
  if (!memoryDb) return;
  try {
    ensureDataDir();
    fs.writeFileSync(DB_FILE, JSON.stringify(memoryDb, null, 2), 'utf-8');
  } catch (err) {
    console.error('Error saving db:', err);
  }
}

// ==================== STUDENTS ====================

export function getStudents(filters?: {
  batch_id?: string;
  training_level?: string;
  status?: string;
  search?: string;
}): Student[] {
  const db = getDb();
  let list = [...db.students];

  if (filters?.batch_id) {
    list = list.filter((s) => s.batch_id === filters.batch_id);
  }
  if (filters?.training_level) {
    list = list.filter((s) => s.training_level === filters.training_level);
  }
  if (filters?.status) {
    list = list.filter((s) => s.status === filters.status);
  }
  if (filters?.search) {
    const q = filters.search.toLowerCase();
    list = list.filter(
      (s) =>
        s.name.toLowerCase().includes(q) ||
        s.student_id.toLowerCase().includes(q) ||
        s.phone.includes(q)
    );
  }

  return list;
}

export function getStudentById(idOrStudentId: string): Student | null {
  const db = getDb();
  return (
    db.students.find(
      (s) => s.id === idOrStudentId || s.student_id === idOrStudentId
    ) || null
  );
}

export function createStudent(data: Omit<Student, 'id' | 'student_id' | 'created_at'>): Student {
  const db = getDb();
  const nextNum = db.students.length + 1;
  const numStr = nextNum < 10 ? `00${nextNum}` : nextNum < 100 ? `0${nextNum}` : `${nextNum}`;
  const student_id = `KAL-2026-${numStr}`;

  const newStudent: Student = {
    ...data,
    id: `stu-${Date.now()}`,
    student_id,
    created_at: new Date().toISOString(),
  };

  db.students.push(newStudent);

  // Automatically create current month fee for new student
  const newFee: FeeRecord = {
    id: `fee-${Date.now()}`,
    student_id: newStudent.student_id,
    student_name: newStudent.name,
    month: 'September',
    year: 2026,
    total_amount: 500,
    paid_amount: 0,
    due_date: '2026-09-15',
    status: 'pending',
    created_at: new Date().toISOString(),
  };
  db.fees.push(newFee);

  saveDb();
  return newStudent;
}

export function updateStudent(id: string, updates: Partial<Student>): Student | null {
  const db = getDb();
  const index = db.students.findIndex((s) => s.id === id || s.student_id === id);
  if (index === -1) return null;

  db.students[index] = { ...db.students[index], ...updates };
  saveDb();
  return db.students[index];
}

export function deleteStudent(id: string): boolean {
  const db = getDb();
  const initialLen = db.students.length;
  db.students = db.students.filter((s) => s.id !== id && s.student_id !== id);
  if (db.students.length !== initialLen) {
    saveDb();
    return true;
  }
  return false;
}

// ==================== BATCHES ====================

export function getBatches(): Batch[] {
  return getDb().batches;
}

// ==================== ATTENDANCE ====================

export function getAttendance(filters?: {
  date?: string;
  batch_id?: string;
  student_id?: string;
  month?: string;
}): AttendanceRecord[] {
  const db = getDb();
  let list = [...db.attendance];

  if (filters?.date) {
    list = list.filter((a) => a.date === filters.date);
  }
  if (filters?.batch_id) {
    list = list.filter((a) => a.batch_id === filters.batch_id);
  }
  if (filters?.student_id) {
    list = list.filter((a) => a.student_id === filters.student_id);
  }
  if (filters?.month) {
    // format YYYY-MM
    list = list.filter((a) => a.date.startsWith(filters.month!));
  }

  return list;
}

export function markDailyAttendance(records: Omit<AttendanceRecord, 'id' | 'created_at'>[]): AttendanceRecord[] {
  const db = getDb();
  const saved: AttendanceRecord[] = [];

  records.forEach((rec) => {
    const existingIndex = db.attendance.findIndex(
      (a) => a.student_id === rec.student_id && a.date === rec.date
    );

    if (existingIndex !== -1) {
      db.attendance[existingIndex] = {
        ...db.attendance[existingIndex],
        status: rec.status,
        batch_id: rec.batch_id,
        marked_by: rec.marked_by,
        notes: rec.notes,
      };
      saved.push(db.attendance[existingIndex]);
    } else {
      const newRec: AttendanceRecord = {
        ...rec,
        id: `att-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
        created_at: new Date().toISOString(),
      };
      db.attendance.push(newRec);
      saved.push(newRec);
    }
  });

  saveDb();
  return saved;
}

// ==================== FEES & PAYMENTS ====================

export function getFees(filters?: {
  student_id?: string;
  month?: string;
  year?: number;
  status?: string;
}): FeeRecord[] {
  const db = getDb();
  let list = [...db.fees];

  if (filters?.student_id) {
    list = list.filter((f) => f.student_id === filters.student_id);
  }
  if (filters?.month) {
    list = list.filter((f) => f.month.toLowerCase() === filters.month!.toLowerCase());
  }
  if (filters?.year) {
    list = list.filter((f) => f.year === filters.year);
  }
  if (filters?.status) {
    list = list.filter((f) => f.status === filters.status);
  }

  return list;
}

export function getPayments(filters?: {
  student_id?: string;
  fee_id?: string;
  receipt_number?: string;
}): PaymentRecord[] {
  const db = getDb();
  let list = [...db.payments];

  if (filters?.student_id) {
    list = list.filter((p) => p.student_id === filters.student_id);
  }
  if (filters?.fee_id) {
    list = list.filter((p) => p.fee_id === filters.fee_id);
  }
  if (filters?.receipt_number) {
    list = list.filter((p) => p.receipt_number === filters.receipt_number);
  }

  return list;
}

export function recordPayment(data: {
  student_id: string;
  fee_id?: string;
  amount: number;
  payment_method: 'Cash' | 'UPI' | 'Bank Transfer' | 'Card';
  payment_date: string;
  notes?: string;
}): { payment: PaymentRecord; fee: FeeRecord } {
  const db = getDb();
  const student = db.students.find((s) => s.student_id === data.student_id);
  if (!student) throw new Error('Student not found');

  // Find corresponding fee or current pending fee
  let fee = data.fee_id ? db.fees.find((f) => f.id === data.fee_id) : null;
  if (!fee) {
    fee = db.fees.find(
      (f) => f.student_id === data.student_id && (f.status === 'pending' || f.status === 'overdue' || f.status === 'partially_paid')
    );
  }

  if (!fee) {
    // Create new fee record for this payment
    fee = {
      id: `fee-${Date.now()}`,
      student_id: student.student_id,
      student_name: student.name,
      month: 'September',
      year: 2026,
      total_amount: data.amount,
      paid_amount: data.amount,
      due_date: '2026-09-10',
      status: 'paid',
      created_at: new Date().toISOString(),
    };
    db.fees.push(fee);
  } else {
    fee.paid_amount += data.amount;
    if (fee.paid_amount >= fee.total_amount) {
      fee.status = 'paid';
    } else {
      fee.status = 'partially_paid';
    }
  }

  // Generate Receipt Number
  const recCount = db.payments.length + 1;
  const recNumStr = recCount < 10 ? `00${recCount}` : recCount < 100 ? `0${recCount}` : `${recCount}`;
  const receipt_number = `KAL-REC-${recNumStr}`;

  const payment: PaymentRecord = {
    id: `pay-${Date.now()}`,
    student_id: student.student_id,
    student_name: student.name,
    fee_id: fee.id,
    amount: data.amount,
    payment_method: data.payment_method,
    payment_date: data.payment_date,
    receipt_number,
    notes: data.notes,
    created_at: new Date().toISOString(),
  };

  db.payments.unshift(payment);
  saveDb();
  return { payment, fee };
}

// ==================== NOTIFICATIONS ====================

export function getNotifications(student_id?: string): NotificationItem[] {
  const db = getDb();
  let list = [...db.notifications];
  if (student_id) {
    list = list.filter((n) => n.target_student_id === null || n.target_student_id === student_id);
  }
  return list.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function createNotification(data: Omit<NotificationItem, 'id' | 'date' | 'read'>): NotificationItem {
  const db = getDb();
  const notif: NotificationItem = {
    ...data,
    id: `notif-${Date.now()}`,
    date: new Date().toISOString(),
    read: false,
  };
  db.notifications.unshift(notif);
  saveDb();
  return notif;
}

export function markNotificationRead(id: string): boolean {
  const db = getDb();
  const n = db.notifications.find((item) => item.id === id);
  if (n) {
    n.read = true;
    saveDb();
    return true;
  }
  return false;
}

// ==================== AGGREGATED STATS ====================

export function getDashboardStats() {
  const db = getDb();
  const totalStudents = db.students.length;
  const activeStudents = db.students.filter((s) => s.status === 'active').length;

  // Today is 2026-09-11
  const todayDate = '2026-09-11';
  const todayAttendance = db.attendance.filter((a) => a.date === todayDate);
  const presentToday = todayAttendance.filter((a) => a.status === 'present').length;
  const absentToday = todayAttendance.filter((a) => a.status === 'absent').length;

  // Monthly collection for September 2026
  const septFees = db.fees.filter((f) => f.month.toLowerCase() === 'september' && f.year === 2026);
  const monthlyCollection = septFees.reduce((acc, f) => acc + f.paid_amount, 0);
  const pendingFees = septFees.reduce((acc, f) => acc + (f.total_amount - f.paid_amount), 0);

  // Levels breakdown
  const levels = {
    Beginner: db.students.filter((s) => s.training_level === 'Beginner').length,
    Intermediate: db.students.filter((s) => s.training_level === 'Intermediate').length,
    Advanced: db.students.filter((s) => s.training_level === 'Advanced').length,
  };

  return {
    totalStudents,
    activeStudents,
    presentToday,
    absentToday,
    monthlyCollection,
    pendingFees,
    levels,
  };
}

// ==================== INSTRUCTORS / MASTERS ====================

export function getInstructors(): Instructor[] {
  const db = getDb();
  if (!db.instructors || db.instructors.length === 0) {
    db.instructors = [...instructorsData];
    saveDb();
  }
  return db.instructors;
}

export function getInstructorById(id: string): Instructor | null {
  const db = getDb();
  return db.instructors?.find((inst) => inst.id === id) || null;
}

export function createInstructor(data: Omit<Instructor, 'id'>): Instructor {
  const db = getDb();
  if (!db.instructors) {
    db.instructors = [...instructorsData];
  }
  const newInstructor: Instructor = {
    ...data,
    id: `inst-${Date.now()}`,
  };
  db.instructors.push(newInstructor);
  saveDb();
  return newInstructor;
}

export function updateInstructor(id: string, updates: Partial<Instructor>): Instructor | null {
  const db = getDb();
  if (!db.instructors) {
    db.instructors = [...instructorsData];
  }
  const index = db.instructors.findIndex((inst) => inst.id === id);
  if (index === -1) return null;

  db.instructors[index] = {
    ...db.instructors[index],
    ...updates,
    id, // ensure ID is preserved
  };
  saveDb();
  return db.instructors[index];
}

export function deleteInstructor(id: string): boolean {
  const db = getDb();
  if (!db.instructors) return false;
  const initialLen = db.instructors.length;
  db.instructors = db.instructors.filter((inst) => inst.id !== id);
  if (db.instructors.length !== initialLen) {
    saveDb();
    return true;
  }
  return false;
}

// ==================== USERS & APPROVALS ====================

export function getUsers(): UserAccount[] {
  const db = getDb();
  if (!db.users || db.users.length === 0) {
    db.users = [...initialUsers];
    saveDb();
  }
  return db.users;
}

export function getUserByEmail(email: string): UserAccount | null {
  const db = getDb();
  if (!db.users) db.users = [...initialUsers];
  return db.users.find((u) => u.email.toLowerCase() === email.toLowerCase().trim()) || null;
}

export function getUserById(id: string): UserAccount | null {
  const db = getDb();
  if (!db.users) db.users = [...initialUsers];
  return db.users.find((u) => u.id === id) || null;
}

export function createUser(data: Omit<UserAccount, 'id' | 'created_at'>): UserAccount {
  const db = getDb();
  if (!db.users) db.users = [...initialUsers];

  const newUser: UserAccount = {
    ...data,
    id: `user-${Date.now()}`,
    created_at: new Date().toISOString(),
  };

  db.users.push(newUser);
  saveDb();
  return newUser;
}

export function updateUserApproval(id: string, status: 'approved' | 'rejected'): UserAccount | null {
  const db = getDb();
  if (!db.users) db.users = [...initialUsers];
  const user = db.users.find((u) => u.id === id);
  if (!user) return null;

  user.approval_status = status;
  if (status === 'approved') {
    user.approved_at = new Date().toISOString();

    // If student_id does not exist, create or link a Student record
    if (!user.student_id && user.role === 'student') {
      const nextNum = db.students.length + 1;
      const numStr = nextNum < 10 ? `00${nextNum}` : nextNum < 100 ? `0${nextNum}` : `${nextNum}`;
      const student_id = `KAL-2026-${numStr}`;
      user.student_id = student_id;

      const newStudent: Student = {
        id: `stu-${Date.now()}`,
        student_id,
        name: user.name,
        email: user.email,
        phone: user.phone || '+91 98470 00000',
        parent_name: 'Guardian',
        parent_phone: user.phone || '+91 98470 00000',
        date_of_birth: '2005-01-01',
        age: 21,
        gender: 'Male',
        address: 'Kannur, Kerala, India',
        joining_date: new Date().toISOString().split('T')[0],
        batch_id: 'batch-evening',
        training_level: 'Beginner',
        status: 'active',
        blood_group: 'O+ve',
        emergency_notes: 'Initiated student member.',
        created_at: new Date().toISOString(),
      };
      db.students.push(newStudent);
    }
  }

  saveDb();
  return user;
}

export function getPendingUsers(): UserAccount[] {
  const db = getDb();
  if (!db.users) db.users = [...initialUsers];
  return db.users.filter((u) => u.approval_status === 'pending');
}
