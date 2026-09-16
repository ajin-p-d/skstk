'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useRole } from '@/context/RoleContext';
import FeeReceiptModal from '@/components/admin/FeeReceiptModal';
import { PaymentRecord, FeeRecord, NotificationItem, Student } from '@/types';
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
  Edit2,
  User,
  Phone,
  Mail,
  MapPin,
  Heart,
  AlertCircle,
  Save,
  X,
  Upload,
} from 'lucide-react';

export default function StudentPortalPage() {
  const router = useRouter();
  const { role, activeStudent, setActiveStudent, logout } = useRole();
  const [activeTab, setActiveTab] = useState<
    'overview' | 'profile' | 'attendance' | 'fees' | 'notifications'
  >('overview');
  const [activeReceiptPayment, setActiveReceiptPayment] = useState<PaymentRecord | null>(null);

  // Student information defaults to Arun Kumar if not logged in
  const [currentStudent, setCurrentStudent] = useState<Student>(
    activeStudent || {
      id: 'stu-1',
      student_id: 'KAL-2026-001',
      name: 'Arun Kumar',
      email: 'arun@gmail.com',
      phone: '+91 98471 23456',
      parent_name: 'Suresh Kumar',
      parent_phone: '+91 98471 23450',
      date_of_birth: '2005-04-14',
      age: 21,
      gender: 'Male',
      address: 'Chirakkal, Kannur, Kerala 670011',
      joining_date: '2024-01-10',
      batch_id: 'batch-evening',
      training_level: 'Intermediate',
      status: 'active',
      blood_group: 'O+ve',
      emergency_notes: 'Proficient in Meipayattu. Learning Kolthari long staff.',
      created_at: '2024-01-10T10:00:00Z',
    }
  );

  // Edit profile modal state
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editFormData, setEditFormData] = useState({
    name: '',
    phone: '',
    email: '',
    date_of_birth: '',
    age: 21,
    gender: 'Male' as 'Male' | 'Female' | 'Other',
    address: '',
    blood_group: '',
    parent_name: '',
    parent_phone: '',
    emergency_notes: '',
    photo: '',
  });
  const [saveLoading, setSaveLoading] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Sync with active student when available
  useEffect(() => {
    if (activeStudent) {
      setCurrentStudent(activeStudent);
      // Fetch latest from API
      fetch(`/api/students/${activeStudent.id}`)
        .then((r) => r.json())
        .then((data) => {
          if (data.success && data.data) {
            setCurrentStudent(data.data);
            setActiveStudent(data.data);
          }
        })
        .catch(() => {});
    }
  }, [activeStudent, setActiveStudent]);

  const openEditModal = () => {
    setEditFormData({
      name: currentStudent.name || '',
      phone: currentStudent.phone || '',
      email: currentStudent.email || '',
      date_of_birth: currentStudent.date_of_birth || '2005-01-01',
      age: currentStudent.age || 20,
      gender: currentStudent.gender || 'Male',
      address: currentStudent.address || '',
      blood_group: currentStudent.blood_group || '',
      parent_name: currentStudent.parent_name || '',
      parent_phone: currentStudent.parent_phone || '',
      emergency_notes: currentStudent.emergency_notes || '',
      photo: currentStudent.photo || '',
    });
    setIsEditModalOpen(true);
  };

  const handleProfileSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaveLoading(true);

    try {
      const res = await fetch(`/api/students/${currentStudent.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editFormData),
      });
      const data = await res.json();
      if (data.success && data.data) {
        setCurrentStudent(data.data);
        setActiveStudent(data.data);
        setIsEditModalOpen(false);
        setToastMessage('Your student details have been updated successfully!');
        setTimeout(() => setToastMessage(null), 4000);
      } else {
        alert(data.error || 'Failed to update student details');
      }
    } catch (err: any) {
      alert(err.message || 'Network error updating details');
    } finally {
      setSaveLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  // Sample student payments
  const studentPayments: PaymentRecord[] = [
    {
      id: 'pay-1',
      student_id: currentStudent.student_id,
      student_name: currentStudent.name,
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
      student_id: currentStudent.student_id,
      student_name: currentStudent.name,
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
      student_id: currentStudent.student_id,
      student_name: currentStudent.name,
      fee_id: 'fee-past-2',
      amount: 500,
      payment_method: 'Cash',
      payment_date: '2026-07-05',
      receipt_number: 'KAL-REC-JUL-01',
      notes: 'Monthly tuition July 2026',
      created_at: '2026-07-05T09:30:00Z',
    },
  ];

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
    <div className="min-h-screen bg-kalari-black text-kalari-white flex flex-col">
      {/* Top Banner Bar */}
      <header className="bg-kalari-black/95 border-b border-kalari-gold/20 px-4 sm:px-8 py-3.5 flex items-center justify-between sticky top-0 z-30 backdrop-blur">
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-full bg-kalari-darkBrown border border-kalari-gold/40 flex items-center justify-center p-1 shadow-gold">
              <Image
                src="/images/kalari-logo.png"
                alt="Logo"
                width={28}
                height={28}
                className="object-contain"
              />
            </div>
            <div>
              <span className="font-serif font-black text-xs sm:text-sm text-kalari-white tracking-wider uppercase block">
                THULUNADAN KALARI
              </span>
              <span className="text-[9px] text-kalari-gold uppercase tracking-widest block font-medium">
                Student Portal
              </span>
            </div>
          </Link>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={openEditModal}
            className="px-3 py-1.5 rounded-lg bg-kalari-darkBrown border border-kalari-gold/40 text-kalari-gold hover:bg-kalari-gold hover:text-kalari-black text-xs font-serif uppercase tracking-wider transition-all flex items-center gap-1.5 shadow"
          >
            <Edit2 className="w-3.5 h-3.5" />
            <span className="hidden xs:inline">Edit Details</span>
          </button>

          <Link
            href="/"
            className="hidden sm:inline-block px-3 py-1.5 rounded-lg text-xs text-kalari-beige/70 hover:text-kalari-gold border border-kalari-gold/20 transition-colors"
          >
            Public Site
          </Link>

          <button
            onClick={handleLogout}
            title="Log Out"
            className="px-3 py-1.5 rounded-lg bg-red-950/40 border border-red-800/40 text-red-300 hover:bg-red-900/60 text-xs font-serif uppercase tracking-wider transition-all flex items-center gap-1.5"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span className="hidden xs:inline">Exit</span>
          </button>
        </div>
      </header>

      {/* Main Student Container */}
      <main className="max-w-6xl mx-auto w-full p-4 sm:p-8 flex-1 space-y-8">
        {/* Toast Alert */}
        {toastMessage && (
          <div className="p-4 rounded-xl bg-emerald-950/90 border border-emerald-500/50 text-emerald-200 text-xs flex items-center gap-2 shadow-gold">
            <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{toastMessage}</span>
          </div>
        )}

        {/* Welcome Back Greeting Banner */}
        <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-kalari-darkBrown via-kalari-darkBrown/90 to-kalari-black border border-kalari-gold/30 shadow-gold flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-kalari-black border border-kalari-gold/30 text-kalari-gold text-xs font-serif uppercase tracking-widest">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Namaskaram & Welcome Back</span>
            </div>
            <h1 className="font-serif text-2xl sm:text-4xl font-extrabold text-kalari-white text-gold-gradient">
              Welcome Back, {currentStudent.name} 👋
            </h1>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs sm:text-sm text-kalari-beige/80 font-light">
              <span>
                Student ID:{' '}
                <strong className="text-kalari-gold font-mono">{currentStudent.student_id}</strong>
              </span>
              <span>•</span>
              <span>
                Batch:{' '}
                <strong className="text-kalari-white">
                  {currentStudent.batch_id === 'batch-morning'
                    ? 'Morning Discipline Batch'
                    : currentStudent.batch_id === 'batch-weekend'
                    ? 'Weekend Intensive Batch'
                    : 'Evening Warrior Batch'}
                </strong>
              </span>
              <span>•</span>
              <span className="text-emerald-400 capitalize">
                ● Status: {currentStudent.status}
              </span>
            </div>
          </div>

          <div className="flex flex-col sm:items-end gap-2">
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
            <button
              onClick={openEditModal}
              className="w-full py-2 px-3 rounded-lg bg-kalari-gold text-kalari-black font-serif font-bold text-xs uppercase tracking-wider hover:bg-kalari-goldLight transition-all flex items-center justify-center gap-1.5 shadow"
            >
              <Edit2 className="w-3.5 h-3.5" />
              <span>Update Student Details</span>
            </button>
          </div>
        </div>

        {/* 3 Student Statistics */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {/* Attendance 92% */}
          <div className="p-6 rounded-2xl bg-kalari-darkBrown/80 border border-kalari-gold/25 shadow-gold">
            <div className="flex items-center justify-between text-kalari-gold mb-2">
              <span className="text-xs font-serif uppercase tracking-wider font-semibold">
                Attendance Rate
              </span>
              <Calendar className="w-4 h-4 text-kalari-gold" />
            </div>
            <div className="font-serif text-3xl font-black text-emerald-400">92%</div>
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
              Tuition cleared for September 2026 (Receipt #KAL-REC-001)
            </span>
          </div>

          {/* Training Level */}
          <div className="p-6 rounded-2xl bg-kalari-darkBrown/80 border border-kalari-gold/25 shadow-gold">
            <div className="flex items-center justify-between text-kalari-gold mb-2">
              <span className="text-xs font-serif uppercase tracking-wider font-semibold">
                Training Level
              </span>
              <Award className="w-4 h-4 text-kalari-gold" />
            </div>
            <div className="font-serif text-3xl font-black text-kalari-gold text-gold-gradient">
              {currentStudent.training_level}
            </div>
            <span className="text-[11px] text-kalari-beige/70 mt-4 block">
              Stage 2: Kolthari (Wooden Weapons) & Ashta Vadivu
            </span>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 sm:gap-3 border-b border-kalari-gold/20 pb-2 overflow-x-auto">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-4 py-2 rounded-lg text-xs font-serif uppercase tracking-wider transition-all whitespace-nowrap ${
              activeTab === 'overview'
                ? 'bg-kalari-gold text-kalari-black font-bold shadow-gold'
                : 'text-kalari-beige/70 hover:text-kalari-gold'
            }`}
          >
            Training Overview
          </button>
          <button
            onClick={() => setActiveTab('profile')}
            className={`px-4 py-2 rounded-lg text-xs font-serif uppercase tracking-wider transition-all whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'profile'
                ? 'bg-kalari-gold text-kalari-black font-bold shadow-gold'
                : 'text-kalari-beige/70 hover:text-kalari-gold'
            }`}
          >
            <User className="w-3.5 h-3.5" />
            <span>Profile & Details</span>
          </button>
          <button
            onClick={() => setActiveTab('attendance')}
            className={`px-4 py-2 rounded-lg text-xs font-serif uppercase tracking-wider transition-all whitespace-nowrap ${
              activeTab === 'attendance'
                ? 'bg-kalari-gold text-kalari-black font-bold shadow-gold'
                : 'text-kalari-beige/70 hover:text-kalari-gold'
            }`}
          >
            My Attendance Record
          </button>
          <button
            onClick={() => setActiveTab('fees')}
            className={`px-4 py-2 rounded-lg text-xs font-serif uppercase tracking-wider transition-all whitespace-nowrap ${
              activeTab === 'fees'
                ? 'bg-kalari-gold text-kalari-black font-bold shadow-gold'
                : 'text-kalari-beige/70 hover:text-kalari-gold'
            }`}
          >
            Fees & Receipts
          </button>
          <button
            onClick={() => setActiveTab('notifications')}
            className={`px-4 py-2 rounded-lg text-xs font-serif uppercase tracking-wider transition-all whitespace-nowrap ${
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
                        <span className="font-bold text-kalari-white block">
                          Meipayattu Body Flexibility
                        </span>
                        <span className="text-[11px] text-kalari-beige/60">
                          Completed & Mastered
                        </span>
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
                        <span className="font-bold text-kalari-white block">
                          Kettukari (Long Staff Rotations)
                        </span>
                        <span className="text-[11px] text-kalari-beige/60">
                          In Progress (Week 8 of 12)
                        </span>
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
                        <span className="font-bold text-kalari-white block">
                          Angathari (Sword & Shield)
                        </span>
                        <span className="text-[11px] text-kalari-beige/60">
                          Requires Kolthari completion
                        </span>
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
                  "Maintain low center of gravity in Ashwa Vadivu. Ensure shoulders remain relaxed
                  during overhead stick strikes. Practice breathing coordination every morning."
                </p>
                <div className="pt-2 text-xs font-serif text-kalari-gold">
                  — Gurukkal E S Kalesh
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Profile & Details */}
        {activeTab === 'profile' && (
          <div className="p-6 sm:p-8 rounded-2xl bg-kalari-darkBrown/80 border border-kalari-gold/25 shadow-gold space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-kalari-gold/20 pb-4">
              <div>
                <h3 className="font-serif text-xl font-bold text-kalari-white text-gold-gradient">
                  Student Record & Personal Details
                </h3>
                <p className="text-xs text-kalari-beige/70 font-light">
                  View and keep your contact, medical, and guardian details up to date.
                </p>
              </div>
              <button
                onClick={openEditModal}
                className="px-4 py-2 rounded-lg bg-kalari-gold text-kalari-black font-serif font-bold text-xs uppercase tracking-wider shadow-gold hover:bg-kalari-goldLight transition-all flex items-center justify-center gap-2"
              >
                <Edit2 className="w-4 h-4" />
                <span>Edit Profile Details</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-xs">
              {/* Personal Info */}
              <div className="p-4 rounded-xl bg-kalari-black/50 border border-kalari-gold/20 space-y-3">
                <div className="flex items-center gap-2 text-kalari-gold font-serif uppercase tracking-wider font-bold">
                  <User className="w-4 h-4" />
                  <span>Personal Identity</span>
                </div>
                <div className="space-y-2">
                  <div>
                    <span className="text-kalari-beige/60 block text-[11px]">Full Name:</span>
                    <span className="font-semibold text-kalari-white text-sm">
                      {currentStudent.name}
                    </span>
                  </div>
                  <div>
                    <span className="text-kalari-beige/60 block text-[11px]">Student ID:</span>
                    <span className="font-mono text-kalari-gold font-bold">
                      {currentStudent.student_id}
                    </span>
                  </div>
                  <div>
                    <span className="text-kalari-beige/60 block text-[11px]">Gender & Age:</span>
                    <span className="text-kalari-white">
                      {currentStudent.gender} • {currentStudent.age} years old (DOB:{' '}
                      {currentStudent.date_of_birth})
                    </span>
                  </div>
                  <div>
                    <span className="text-kalari-beige/60 block text-[11px]">Blood Group:</span>
                    <span className="text-kalari-gold font-bold">
                      {currentStudent.blood_group || 'Not specified'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Contact Info */}
              <div className="p-4 rounded-xl bg-kalari-black/50 border border-kalari-gold/20 space-y-3">
                <div className="flex items-center gap-2 text-kalari-gold font-serif uppercase tracking-wider font-bold">
                  <Phone className="w-4 h-4" />
                  <span>Contact Information</span>
                </div>
                <div className="space-y-2">
                  <div>
                    <span className="text-kalari-beige/60 block text-[11px]">Phone Number:</span>
                    <span className="text-kalari-white font-medium">{currentStudent.phone}</span>
                  </div>
                  <div>
                    <span className="text-kalari-beige/60 block text-[11px]">Email ID:</span>
                    <span className="text-kalari-white font-mono">
                      {currentStudent.email || 'Not provided'}
                    </span>
                  </div>
                  <div>
                    <span className="text-kalari-beige/60 block text-[11px]">Residential Address:</span>
                    <span className="text-kalari-beige/90 leading-relaxed block">
                      {currentStudent.address}
                    </span>
                  </div>
                </div>
              </div>

              {/* Guardian & Emergency */}
              <div className="p-4 rounded-xl bg-kalari-black/50 border border-kalari-gold/20 space-y-3">
                <div className="flex items-center gap-2 text-kalari-gold font-serif uppercase tracking-wider font-bold">
                  <Heart className="w-4 h-4 text-red-400" />
                  <span>Guardian & Emergency</span>
                </div>
                <div className="space-y-2">
                  <div>
                    <span className="text-kalari-beige/60 block text-[11px]">Parent / Guardian:</span>
                    <span className="text-kalari-white font-medium">
                      {currentStudent.parent_name || 'Guardian'}
                    </span>
                  </div>
                  <div>
                    <span className="text-kalari-beige/60 block text-[11px]">Guardian Phone:</span>
                    <span className="text-kalari-white">
                      {currentStudent.parent_phone || currentStudent.phone}
                    </span>
                  </div>
                  <div>
                    <span className="text-kalari-beige/60 block text-[11px]">Emergency Notes:</span>
                    <span className="text-kalari-beige/80 italic block">
                      {currentStudent.emergency_notes || 'No emergency notes specified.'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Attendance */}
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
                  <span className="text-xs text-kalari-gold font-serif uppercase block">
                    Overall Rate
                  </span>
                  <span className="font-mono text-2xl font-black text-emerald-400">92%</span>
                </div>
              </div>

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

        {/* Tab 4: Fees */}
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

              <div className="pt-4 border-t border-kalari-gold/20">
                <h4 className="font-serif text-sm font-bold text-kalari-gold uppercase tracking-wider mb-4">
                  Payment History & Official Receipts
                </h4>

                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="border-b border-kalari-earth/40 text-kalari-beige/70 uppercase">
                        <th className="py-2.5">Date</th>
                        <th className="py-2.5">Receipt #</th>
                        <th className="py-2.5">Amount</th>
                        <th className="py-2.5">Method</th>
                        <th className="py-2.5 text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-kalari-earth/20">
                      {studentPayments.map((p) => (
                        <tr key={p.id} className="hover:bg-kalari-black/40">
                          <td className="py-3">{p.payment_date}</td>
                          <td className="py-3 font-mono text-kalari-gold">{p.receipt_number}</td>
                          <td className="py-3 font-bold text-kalari-white">₹{p.amount}</td>
                          <td className="py-3">{p.payment_method}</td>
                          <td className="py-3 text-right">
                            <button
                              onClick={() => setActiveReceiptPayment(p)}
                              className="px-3 py-1 rounded bg-kalari-darkBrown border border-kalari-gold/30 hover:border-kalari-gold text-kalari-gold hover:text-kalari-goldLight font-serif uppercase tracking-wider text-[10px] inline-flex items-center gap-1.5"
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

        {/* Tab 5: Notifications */}
        {activeTab === 'notifications' && (
          <div className="p-6 rounded-2xl bg-kalari-darkBrown/80 border border-kalari-gold/25 shadow-gold space-y-4">
            <h3 className="font-serif text-xl font-bold text-kalari-white">
              Announcements & Arena Notices
            </h3>
            <div className="space-y-3 text-xs">
              <div className="p-4 rounded-xl bg-kalari-black/60 border border-kalari-gold/25 space-y-1">
                <span className="text-[10px] text-kalari-gold font-serif uppercase tracking-wider block">
                  September 10, 2026 • Ceremony
                </span>
                <h4 className="font-serif font-bold text-sm text-kalari-white">
                  Ayudha Pooja & Weapons Consecration
                </h4>
                <p className="text-kalari-beige/70 font-light">
                  All practitioners in the Evening batch are requested to attend the red soil
                  cleansing and traditional oil blessing ceremony.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-kalari-black/60 border border-kalari-gold/25 space-y-1">
                <span className="text-[10px] text-emerald-400 font-serif uppercase tracking-wider block">
                  September 01, 2026 • Fee
                </span>
                <h4 className="font-serif font-bold text-sm text-kalari-white">
                  Tuition Receipt Issued
                </h4>
                <p className="text-kalari-beige/70 font-light">
                  Your monthly Kalari practice tuition fee of ₹500 was recorded.
                </p>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Edit Student Details Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
          <div className="relative w-full max-w-2xl bg-kalari-darkBrown border border-kalari-gold/40 rounded-2xl shadow-2xl p-6 sm:p-8 my-8 text-kalari-white max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-kalari-gold/20 pb-4 mb-6">
              <div>
                <h3 className="font-serif text-xl font-bold text-gold-gradient uppercase tracking-wide">
                  Update Student Details
                </h3>
                <p className="text-xs text-kalari-beige/70 mt-0.5">
                  ID: <span className="font-mono text-kalari-gold">{currentStudent.student_id}</span> •
                  Changes will be saved to your official Kalari record.
                </p>
              </div>
              <button
                onClick={() => setIsEditModalOpen(false)}
                className="p-1.5 rounded-lg text-kalari-beige hover:text-kalari-gold hover:bg-kalari-black/50"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleProfileSave} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-serif uppercase tracking-wider text-kalari-gold mb-1 font-semibold">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={editFormData.name}
                    onChange={(e) => setEditFormData({ ...editFormData, name: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-kalari-black border border-kalari-earth focus:border-kalari-gold text-kalari-white outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-serif uppercase tracking-wider text-kalari-gold mb-1 font-semibold">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={editFormData.phone}
                    onChange={(e) => setEditFormData({ ...editFormData, phone: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-kalari-black border border-kalari-earth focus:border-kalari-gold text-kalari-white outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-serif uppercase tracking-wider text-kalari-gold mb-1 font-semibold">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={editFormData.email}
                    onChange={(e) => setEditFormData({ ...editFormData, email: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-kalari-black border border-kalari-earth focus:border-kalari-gold text-kalari-white outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-serif uppercase tracking-wider text-kalari-gold mb-1 font-semibold">
                    Blood Group
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. O+ve, A+ve, B+ve"
                    value={editFormData.blood_group}
                    onChange={(e) =>
                      setEditFormData({ ...editFormData, blood_group: e.target.value })
                    }
                    className="w-full px-3 py-2 rounded-lg bg-kalari-black border border-kalari-earth focus:border-kalari-gold text-kalari-white outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-[11px] font-serif uppercase tracking-wider text-kalari-gold mb-1 font-semibold">
                    Date of Birth
                  </label>
                  <input
                    type="date"
                    value={editFormData.date_of_birth}
                    onChange={(e) =>
                      setEditFormData({ ...editFormData, date_of_birth: e.target.value })
                    }
                    className="w-full px-3 py-2 rounded-lg bg-kalari-black border border-kalari-earth focus:border-kalari-gold text-kalari-white outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-serif uppercase tracking-wider text-kalari-gold mb-1 font-semibold">
                    Age
                  </label>
                  <input
                    type="number"
                    value={editFormData.age}
                    onChange={(e) =>
                      setEditFormData({ ...editFormData, age: parseInt(e.target.value, 10) || 0 })
                    }
                    className="w-full px-3 py-2 rounded-lg bg-kalari-black border border-kalari-earth focus:border-kalari-gold text-kalari-white outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-serif uppercase tracking-wider text-kalari-gold mb-1 font-semibold">
                    Gender
                  </label>
                  <select
                    value={editFormData.gender}
                    onChange={(e) =>
                      setEditFormData({
                        ...editFormData,
                        gender: e.target.value as 'Male' | 'Female' | 'Other',
                      })
                    }
                    className="w-full px-3 py-2 rounded-lg bg-kalari-black border border-kalari-earth focus:border-kalari-gold text-kalari-white outline-none"
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-serif uppercase tracking-wider text-kalari-gold mb-1 font-semibold">
                  Residential Address
                </label>
                <textarea
                  rows={2}
                  value={editFormData.address}
                  onChange={(e) => setEditFormData({ ...editFormData, address: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-kalari-black border border-kalari-earth focus:border-kalari-gold text-kalari-white outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-serif uppercase tracking-wider text-kalari-gold mb-1 font-semibold">
                    Parent / Guardian Name
                  </label>
                  <input
                    type="text"
                    value={editFormData.parent_name}
                    onChange={(e) =>
                      setEditFormData({ ...editFormData, parent_name: e.target.value })
                    }
                    className="w-full px-3 py-2 rounded-lg bg-kalari-black border border-kalari-earth focus:border-kalari-gold text-kalari-white outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-serif uppercase tracking-wider text-kalari-gold mb-1 font-semibold">
                    Parent / Guardian Phone
                  </label>
                  <input
                    type="tel"
                    value={editFormData.parent_phone}
                    onChange={(e) =>
                      setEditFormData({ ...editFormData, parent_phone: e.target.value })
                    }
                    className="w-full px-3 py-2 rounded-lg bg-kalari-black border border-kalari-earth focus:border-kalari-gold text-kalari-white outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-serif uppercase tracking-wider text-kalari-gold mb-1 font-semibold">
                  Emergency & Health Notes
                </label>
                <textarea
                  rows={2}
                  placeholder="Medical conditions, allergies, or emergency instructions..."
                  value={editFormData.emergency_notes}
                  onChange={(e) =>
                    setEditFormData({ ...editFormData, emergency_notes: e.target.value })
                  }
                  className="w-full px-3 py-2 rounded-lg bg-kalari-black border border-kalari-earth focus:border-kalari-gold text-kalari-white outline-none"
                />
              </div>

              <div className="pt-4 border-t border-kalari-gold/20 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="px-4 py-2 rounded-lg bg-kalari-black border border-kalari-earth text-xs font-serif uppercase tracking-wider text-kalari-beige hover:text-kalari-gold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saveLoading}
                  className="px-5 py-2 rounded-lg bg-kalari-gold text-kalari-black font-serif font-bold text-xs uppercase tracking-wider shadow-gold hover:bg-kalari-goldLight transition-all flex items-center gap-1.5 disabled:opacity-50"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>{saveLoading ? 'Saving...' : 'Save Changes'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Official Receipt Modal */}
      {activeReceiptPayment && (
        <FeeReceiptModal
          onClose={() => setActiveReceiptPayment(null)}
          payment={activeReceiptPayment}
          fee={{
            id: activeReceiptPayment.fee_id,
            student_id: activeReceiptPayment.student_id,
            student_name: activeReceiptPayment.student_name,
            month: 'September',
            year: 2026,
            total_amount: activeReceiptPayment.amount,
            paid_amount: activeReceiptPayment.amount,
            due_date: '2026-09-10',
            status: 'paid',
            created_at: activeReceiptPayment.created_at,
          }}
        />
      )}
    </div>
  );
}
