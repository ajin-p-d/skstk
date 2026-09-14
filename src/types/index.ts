export type TrainingLevel = 'Beginner' | 'Intermediate' | 'Advanced' | 'Instructor';

export type StudentStatus = 'active' | 'inactive' | 'on_leave';

export type BatchTime = 'Morning (6:00 AM – 7:30 AM)' | 'Evening (5:00 PM – 7:00 PM)' | 'Weekend Special (7:00 AM – 9:30 AM)';

export interface Batch {
  id: string;
  name: string;
  instructor_id: string;
  instructor_name: string;
  start_time: string;
  end_time: string;
  days: string[];
  capacity: number;
  enrolled: number;
}

export interface Student {
  id: string;
  student_id: string; // e.g. "KAL-2026-001"
  name: string;
  photo?: string;
  phone: string;
  parent_name: string;
  parent_phone: string;
  date_of_birth: string;
  age: number;
  gender: 'Male' | 'Female' | 'Other';
  address: string;
  joining_date: string;
  batch_id: string;
  training_level: TrainingLevel;
  status: StudentStatus;
  blood_group?: string;
  emergency_notes?: string;
  created_at: string;
}

export type AttendanceStatus = 'present' | 'absent' | 'leave';

export interface AttendanceRecord {
  id: string;
  student_id: string;
  student_name: string;
  date: string; // YYYY-MM-DD
  batch_id: string;
  status: AttendanceStatus;
  marked_by: string;
  notes?: string;
  created_at: string;
}

export type FeeStatus = 'paid' | 'partially_paid' | 'pending' | 'overdue';

export type PaymentMethod = 'Cash' | 'UPI' | 'Bank Transfer' | 'Card';

export interface FeeRecord {
  id: string;
  student_id: string;
  student_name: string;
  month: string; // e.g. "September"
  year: number; // e.g. 2026
  total_amount: number;
  paid_amount: number;
  due_date: string;
  status: FeeStatus;
  created_at: string;
}

export interface PaymentRecord {
  id: string;
  student_id: string;
  student_name: string;
  fee_id: string;
  amount: number;
  payment_method: PaymentMethod;
  payment_date: string;
  receipt_number: string; // e.g. "KAL-REC-001"
  notes?: string;
  created_at: string;
}

export interface NotificationItem {
  id: string;
  type: 'fee' | 'attendance' | 'class' | 'event';
  title: string;
  message: string;
  target_student_id?: string | null; // null for broadcast
  date: string;
  read: boolean;
}

export interface Instructor {
  id: string;
  name: string;
  designation: string;
  experience: string;
  specialization: string[];
  quote: string;
  image: string;
  bio: string;
}

export interface TrainingProgram {
  id: string;
  title: string;
  keralaStage: string; // e.g. Meipayattu
  level: string;
  description: string;
  highlights: string[];
  duration: string;
  idealFor: string;
}

export interface VideoItem {
  id: string;
  title: string;
  description: string;
  filename: string;
  category: 'Sparring' | 'Weapons' | 'Takedown' | 'Technique';
  duration: string;
  thumbnail: string;
}
