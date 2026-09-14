'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRole } from '@/context/RoleContext';
import FeeReceiptModal from '@/components/admin/FeeReceiptModal';
import { PaymentRecord, FeeRecord, NotificationItem } from '@/types';
import {
  Calendar,
  CreditCard,
  Award,
  Bell,
  CheckCircle,
  XCircle,
  Clock,
  Printer,
  Sparkles,
  Shield,
  ArrowRight,
  LogOut,
  ChevronRight,
} from 'lucide-react';

export default function StudentPortalPage() {
  const { activeStudent, logout, setRole } = useRole();
  const [activeTab, setActiveTab] = useState<'overview' | 'attendance' | 'fees' | 'notifications'>('overview');
  const [activeReceiptPayment, setActiveReceiptPayment] = useState<PaymentRecord | null>(null);

  // Student information defaults to Arun Kumar if not logged in
  const student = activeStudent || {
    id: 'stu-1',
    student_id: 'KAL-2026-001',
    name: 'Arun Kumar',
    phone: '+91 98471 23456',
    batch_id: 'batch-evening',
    training_level: 'Intermediate',
    status: 'active',
  };

  // Sample student payments
  const studentPayments: PaymentRecord[] = [
    {
      id: 'pay-1',
      student_id: student.student_id,
      student_name: student.name,
      fee_id: 'fee-1',
      amount: 500,
      payment_method: 'UPI',
      payment_date: '2026-09-11',
      receipt_number: 'KAL-REC-001',
      notes: 'GooglePay UPI/6255102941',
      created_at: '2026-09-11T11:00:00Z',
    },
    {
      id: 'pay-past-1',
      student_id: student.student_id,
      student_name: student.name,
      fee_id: 'fee-past-1',
      amount: 500,
      payment_method: 'UPI',
      payment_date: '2026-08-08',
      receipt_number: 'KAL-REC-AUG-01',
      notes: 'Monthly tuition August 2026',
      created_at: '2026-08-08T10:00:00Z',
    },
    {
      id: 'pay-past-2',
      student_id: student.student_id,
      student_name: student.name,
      fee_id: 'fee-past-2',
      amount: 500,
      payment_method: 'Cash',
      payment_date: '2026-07-05',
      receipt_number: 'KAL-REC-JUL-01',
      notes: 'Monthly tuition July 2026',
      created_at: '2026-07-05T09:30:00Z',
    },
    {
      id: 'pay-past-3',
      student_id: student.student_id,
      student_name: student.name,
      fee_id: 'fee-past-3',
      amount: 500,
      payment_method: 'UPI',
      payment_date: '2026-06-02',
      receipt_number: 'KAL-REC-JUN-01',
      notes: 'Monthly tuition June 2026',
      created_at: '2026-06-02T18:00:00Z',
    },
  ];

  // 20-class sample history for September 2026: 18 Present, 2 Absent = 90%
  const attendanceCalendar = [
    { date: 'Sep 01', day: 'Mon', status: 'present' },
    { date: 'Sep 02', day: 'Tue', status: 'present' },
    { date: 'Sep 03', day: 'Wed', status: 'present' },
    { date: 'Sep 04', day: 'Thu', status: 'absent' },
    { date: 'Sep 05', day: 'Fri', status: 'present' },
    { date: 'Sep 06', day: 'Sat', status: 'present' },
    { date: 'Sep 08', day: 'Mon', status: 'present' },
    { date: 'Sep 09', day: 'Tue', status: 'present' },
    { date: 'Sep 10', day: 'Wed', status: 'present' },
    { date: 'Sep 11', day: 'Thu', status: 'present' },
  ];

  return (
    <div className="min-h-screen bg-kalari-black text-kalari-white selection:bg-kalari-gold selection:text-kalari-black flex flex-col">
      {/* Top Header */}
      <header className="border-b border-kalari-gold/25 bg-kalari-darkBrown/90 px-4 sm:px-8 py-4 backdrop-blur sticky top-0 z-30 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-full bg-kalari-black border border-kalari-gold/40 flex items-center justify-center p-1 shadow-gold">
              <Image
                src="/images/kalari-logo.png"
                alt="Logo"
                width={30}
                height={30}
                className="object-contain"
              />
            </div>
            <div>
              <span className="font-serif font-black text-sm text-kalari-white tracking-wider block leading-none">
                THULUNADAN KALARI
              </span>
              <span className="text-[10px] text-kalari-gold uppercase tracking-widest block mt-0.5">
                Student Portal
              </span>
            </div>
          </Link>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="hidden sm:inline-block px-3 py-1 rounded text-xs text-kalari-beige/70 hover:text-kalari-gold border border-kalari-gold/20"
          >
            Public Site
          </Link>
          <button
            onClick={() => {
              setRole('admin');
              window.location.href = '/admin';
            }}
            className="px-3 py-1 rounded text-xs bg-kalari-black border border-kalari-gold/30 text-kalari-gold hover:bg-kalari-gold hover:text-kalari-black transition-all"
          >
            Switch to Admin
          </button>
        </div>
      </header>

      {/* Main Student Container */}
      <main className="max-w-6xl mx-auto w-full p-4 sm:p-8 flex-1 space-y-8">
        {/* Welcome Back Greeting Banner according to spec */}
        <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-kalari-darkBrown via-kalari-darkBrown/90 to-kalari-black border border-kalari-gold/30 shadow-gold flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-kalari-black border border-kalari-gold/30 text-kalari-gold text-xs font-serif uppercase tracking-widest mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Namaskaram & Welcome Back</span>
            </div>
            <h1 className="font-serif text-2xl sm:text-4xl font-extrabold text-kalari-white text-gold-gradient">
              Welcome Back, {student.name} 👋
            </h1>
            <p className="text-xs sm:text-sm text-kalari-beige/80 font-light">
              Student ID: <strong className="text-kalari-gold font-mono">{student.student_id}</strong> • Assigned: Evening Warrior Batch
            </p>
          </div>

          <div className="p-4 rounded-xl bg-kalari-black/70 border border-kalari-gold/30 text-center min-w-[200px] shadow-gold">
            <span className="text-[11px] font-serif uppercase tracking-widest text-kalari-gold block">
              Today's Class
            </span>
            <span className="font-serif text-lg font-bold text-kalari-white block mt-1">
              5:00 PM – 7:00 PM
            </span>
            <span className="text-[10px] text-kalari-beige/70 block mt-0.5">
              Kolthari Staff & Partner Sparring
            </span>
          </div>
        </div>

        {/* 3 Student Statistics according to spec */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {/* Attendance 92% */}
          <div className="p-6 rounded-2xl bg-kalari-darkBrown/80 border border-kalari-gold/25 shadow-gold">
            <div className="flex items-center justify-between text-kalari-gold mb-2">
              <span className="text-xs font-serif uppercase tracking-wider font-semibold">
                Attendance Rate
              </span>
              <Calendar className="w-4 h-4 text-kalari-gold" />
            </div>
            <div className="font-serif text-3xl font-black text-emerald-400">
              92%
            </div>
            <div className="w-full bg-kalari-black h-2 rounded-full mt-3 overflow-hidden">
              <div className="bg-emerald-500 h-full rounded-full" style={{ width: '92%' }} />
            </div>
            <span className="text-[11px] text-kalari-beige/70 mt-2 block">
              Above required 75% threshold
            </span>
          </div>

          {/* Fee Status PAID */}
          <div className="p-6 rounded-2xl bg-kalari-darkBrown/80 border border-kalari-gold/25 shadow-gold">
            <div className="flex items-center justify-between text-kalari-gold mb-2">
              <span className="text-xs font-serif uppercase tracking-wider font-semibold">
                September Fee Status
              </span>
              <CreditCard className="w-4 h-4 text-kalari-gold" />
            </div>
            <div className="font-serif text-3xl font-black text-emerald-400 flex items-center gap-2">
              <span>PAID</span>
              <CheckCircle className="w-6 h-6 text-emerald-400" />
            </div>
            <span className="text-[11px] text-kalari-beige/70 mt-4 block">
              Tuition cleared on 11/09/2026 (Receipt #KAL-REC-001)
            </span>
          </div>

          {/* Training Level: Intermediate */}
          <div className="p-6 rounded-2xl bg-kalari-darkBrown/80 border border-kalari-gold/25 shadow-gold">
            <div className="flex items-center justify-between text-kalari-gold mb-2">
              <span className="text-xs font-serif uppercase tracking-wider font-semibold">
                Training Level
              </span>
              <Award className="w-4 h-4 text-kalari-gold" />
            </div>
            <div className="font-serif text-3xl font-black text-kalari-gold text-gold-gradient">
              {student.training_level}
            </div>
            <span className="text-[11px] text-kalari-beige/70 mt-4 block">
              Stage 2: Kolthari (Wooden Weapons) & Ashta Vadivu
            </span>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-3 border-b border-kalari-gold/20 pb-2">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-4 py-2 rounded-lg text-xs font-serif uppercase tracking-wider transition-all ${
              activeTab === 'overview'
                ? 'bg-kalari-gold text-kalari-black font-bold shadow-gold'
                : 'text-kalari-beige/70 hover:text-kalari-gold'
            }`}
          >
            Training Overview
          </button>
          <button
            onClick={() => setActiveTab('attendance')}
            className={`px-4 py-2 rounded-lg text-xs font-serif uppercase tracking-wider transition-all ${
              activeTab === 'attendance'
                ? 'bg-kalari-gold text-kalari-black font-bold shadow-gold'
                : 'text-kalari-beige/70 hover:text-kalari-gold'
            }`}
          >
            My Attendance Record
          </button>
          <button
            onClick={() => setActiveTab('fees')}
            className={`px-4 py-2 rounded-lg text-xs font-serif uppercase tracking-wider transition-all ${
              activeTab === 'fees'
                ? 'bg-kalari-gold text-kalari-black font-bold shadow-gold'
                : 'text-kalari-beige/70 hover:text-kalari-gold'
            }`}
          >
            Fees & Receipts
          </button>
          <button
            onClick={() => setActiveTab('notifications')}
            className={`px-4 py-2 rounded-lg text-xs font-serif uppercase tracking-wider transition-all ${
              activeTab === 'notifications'
                ? 'bg-kalari-gold text-kalari-black font-bold shadow-gold'
                : 'text-kalari-beige/70 hover:text-kalari-gold'
            }`}
          >
            Notifications
          </button>
        </div>

        {/* Tab 1: Overview & Syllabus */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-7 space-y-6">
              <div className="p-6 rounded-2xl bg-kalari-darkBrown/80 border border-kalari-gold/25 shadow-gold space-y-4">
                <h3 className="font-serif text-lg font-bold text-kalari-white">
                  Curriculum Milestones
                </h3>
                <div className="space-y-3 text-xs">
                  <div className="p-3 rounded-lg bg-kalari-black/50 border border-kalari-earth/40 flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <CheckCircle className="w-4 h-4 text-emerald-400" />
                      <div>
                        <span className="font-bold text-kalari-white block">Meipayattu Body Flexibility</span>
                        <span className="text-[11px] text-kalari-beige/60">Completed & Mastered</span>
                      </div>
                    </div>
                    <span className="text-[10px] font-serif uppercase px-2 py-0.5 rounded bg-emerald-950 text-emerald-300">
                      Certified
                    </span>
                  </div>

                  <div className="p-3 rounded-lg bg-kalari-black/50 border border-kalari-gold/30 flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <span className="w-4 h-4 rounded-full border-2 border-kalari-gold animate-spin" />
                      <div>
                        <span className="font-bold text-kalari-white block">Kettukari (Long Staff Rotations)</span>
                        <span className="text-[11px] text-kalari-beige/60">In Progress (Week 8 of 12)</span>
                      </div>
                    </div>
                    <span className="text-[10px] font-serif uppercase px-2 py-0.5 rounded bg-amber-950 text-amber-300">
                      In Progress
                    </span>
                  </div>

                  <div className="p-3 rounded-lg bg-kalari-black/50 border border-kalari-earth/40 flex items-center justify-between opacity-60">
                    <div className="flex items-center gap-2.5">
                      <Clock className="w-4 h-4 text-kalari-beige/50" />
                      <div>
                        <span className="font-bold text-kalari-white block">Angathari (Sword & Shield)</span>
                        <span className="text-[11px] text-kalari-beige/60">Requires Kolthari completion</span>
                      </div>
                    </div>
                    <span className="text-[10px] font-serif uppercase px-2 py-0.5 rounded bg-kalari-black text-kalari-beige/60">
                      Locked
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 space-y-6">
              <div className="p-6 rounded-2xl bg-kalari-darkBrown/80 border border-kalari-gold/25 shadow-gold space-y-3">
                <h3 className="font-serif text-base font-bold text-kalari-white">
                  Gurukkal Instruction Note
                </h3>
                <p className="text-xs text-kalari-beige/80 font-light leading-relaxed">
                  "Maintain low center of gravity in Ashwa Vadivu. Ensure shoulders remain relaxed during overhead stick strikes. Practice breathing coordination every morning."
                </p>
                <div className="pt-2 text-xs font-serif text-kalari-gold">
                  — Gurukkal K. Chandran
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Student Attendance Page according to spec */}
        {activeTab === 'attendance' && (
          <div className="space-y-6">
            <div className="p-6 rounded-2xl bg-kalari-darkBrown/80 border border-kalari-gold/25 shadow-gold space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-serif text-xl font-bold text-kalari-white">
                    Monthly Attendance: September 2026
                  </h3>
                  <p className="text-xs text-kalari-beige/70">
                    Daily log of practice sessions attended inside the Kuzhi Kalari
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-xs text-kalari-gold font-serif uppercase block">Overall Rate</span>
                  <span className="font-mono text-2xl font-black text-emerald-400">90%</span>
                </div>
              </div>

              {/* Stat summary according to spec: Total Classes: 20, Present: 18, Absent: 2 */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                <div className="p-3 rounded-lg bg-kalari-black/50 border border-kalari-earth/40 text-center">
                  <span className="text-[10px] text-kalari-beige/60 uppercase block">Total Classes</span>
                  <span className="font-serif text-xl font-bold text-kalari-white">20</span>
                </div>
                <div className="p-3 rounded-lg bg-kalari-black/50 border border-emerald-800/40 text-center">
                  <span className="text-[10px] text-emerald-400 uppercase block">Present</span>
                  <span className="font-serif text-xl font-bold text-emerald-300">18</span>
                </div>
                <div className="p-3 rounded-lg bg-kalari-black/50 border border-red-800/40 text-center">
                  <span className="text-[10px] text-red-400 uppercase block">Absent</span>
                  <span className="font-serif text-xl font-bold text-red-300">2</span>
                </div>
                <div className="p-3 rounded-lg bg-kalari-black/50 border border-kalari-gold/40 text-center">
                  <span className="text-[10px] text-kalari-gold uppercase block">Percentage</span>
                  <span className="font-serif text-xl font-bold text-kalari-gold">90%</span>
                </div>
              </div>

              {/* Visual Daily Status indicators according to spec: 🟢 Present, 🔴 Absent */}
              <div className="pt-4 border-t border-kalari-gold/20">
                <span className="text-xs font-serif uppercase tracking-widest text-kalari-gold block mb-3">
                  Recent Session Log:
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                  {attendanceCalendar.map((item, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-lg bg-kalari-black/60 border border-kalari-gold/20 flex items-center justify-between text-xs"
                    >
                      <div>
                        <span className="font-bold text-kalari-white block">{item.date}</span>
                        <span className="text-[10px] text-kalari-beige/60">{item.day}</span>
                      </div>
                      <span className="text-xs font-semibold flex items-center gap-1">
                        {item.status === 'present' ? (
                          <span className="text-emerald-400">🟢 Present</span>
                        ) : (
                          <span className="text-red-400">🔴 Absent</span>
                        )}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Student Fee Page according to spec */}
        {activeTab === 'fees' && (
          <div className="space-y-6">
            <div className="p-6 rounded-2xl bg-kalari-darkBrown/80 border border-kalari-gold/25 shadow-gold space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <span className="text-xs font-serif uppercase tracking-widest text-kalari-gold block">
                    Tuition Status
                  </span>
                  <h3 className="font-serif text-2xl font-bold text-kalari-white">
                    Current Month Fee: September 2026
                  </h3>
                </div>

                <div className="flex items-center gap-3">
                  <span className="font-serif text-2xl font-black text-kalari-white">₹500</span>
                  <span className="px-3 py-1 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-700 font-serif font-bold text-xs uppercase tracking-wider">
                    🟢 PAID
                  </span>
                </div>
              </div>

              {/* Payment history according to spec:
                  August 2026 ₹500 PAID
                  July 2026 ₹500 PAID
                  June 2026 ₹500 PAID */}
              <div className="pt-4 border-t border-kalari-gold/20">
                <h4 className="font-serif text-sm font-bold text-kalari-gold uppercase tracking-wider mb-4">
                  Payment History & Official Receipts
                </h4>

                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="border-b border-kalari-gold/25 text-kalari-gold font-serif uppercase tracking-wider">
                        <th className="py-3 px-4">Period</th>
                        <th className="py-3 px-4">Amount</th>
                        <th className="py-3 px-4">Payment Method</th>
                        <th className="py-3 px-4">Receipt No</th>
                        <th className="py-3 px-4">Status</th>
                        <th className="py-3 px-4 text-right">Official Receipt</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-kalari-gold/15">
                      {studentPayments.map((p) => (
                        <tr key={p.id} className="hover:bg-kalari-black/30">
                          <td className="py-3 px-4 font-bold text-kalari-white">
                            {p.notes?.includes('August')
                              ? 'August 2026'
                              : p.notes?.includes('July')
                              ? 'July 2026'
                              : p.notes?.includes('June')
                              ? 'June 2026'
                              : 'September 2026'}
                          </td>
                          <td className="py-3 px-4 font-serif font-bold text-kalari-gold">
                            ₹{p.amount}
                          </td>
                          <td className="py-3 px-4 text-kalari-beige/80">{p.payment_method}</td>
                          <td className="py-3 px-4 font-mono text-kalari-beige">{p.receipt_number}</td>
                          <td className="py-3 px-4">
                            <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 font-bold text-[10px]">
                              PAID
                            </span>
                          </td>
                          <td className="py-3 px-4 text-right">
                            <button
                              onClick={() => setActiveReceiptPayment(p)}
                              className="px-3 py-1 rounded bg-kalari-black border border-kalari-gold/40 text-kalari-gold hover:bg-kalari-gold hover:text-kalari-black font-serif font-bold uppercase tracking-wider text-[10px] transition-all flex items-center gap-1.5 ml-auto"
                            >
                              <Printer className="w-3 h-3" />
                              <span>View Receipt</span>
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 4: Notifications according to spec */}
        {activeTab === 'notifications' && (
          <div className="space-y-4">
            <div className="p-5 rounded-xl bg-kalari-darkBrown/80 border border-kalari-gold/25 shadow-gold flex items-start gap-4">
              <div className="p-2.5 rounded-lg bg-kalari-black border border-kalari-gold/30 text-kalari-gold shrink-0">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-serif font-bold text-sm text-kalari-white">Class Reminder</h4>
                <p className="text-xs text-kalari-beige/80 mt-1 font-light">
                  Your Kalari class starts at 5:00 PM today. Arrive in traditional Kacha attire 10 minutes early.
                </p>
                <span className="text-[10px] text-kalari-gold mt-2 block">Today at 9:00 AM</span>
              </div>
            </div>

            <div className="p-5 rounded-xl bg-kalari-darkBrown/80 border border-kalari-gold/25 shadow-gold flex items-start gap-4">
              <div className="p-2.5 rounded-lg bg-kalari-black border border-kalari-gold/30 text-kalari-gold shrink-0">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-serif font-bold text-sm text-kalari-white">Special Event Workshop</h4>
                <p className="text-xs text-kalari-beige/80 mt-1 font-light">
                  Special Kalari training session this Sunday at 7:00 AM. Urumi ribbon blade demonstration by Gurukkal K. Chandran.
                </p>
                <span className="text-[10px] text-kalari-gold mt-2 block">Yesterday</span>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Printable Receipt Modal */}
      {activeReceiptPayment && (
        <FeeReceiptModal
          payment={activeReceiptPayment}
          onClose={() => setActiveReceiptPayment(null)}
        />
      )}
    </div>
  );
}
