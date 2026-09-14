'use client';

import React, { useState, useEffect } from 'react';
import AdminHeader from '@/components/admin/AdminHeader';
import { Student, AttendanceRecord, AttendanceStatus, Batch } from '@/types';
import {
  CalendarCheck,
  Calendar as CalendarIcon,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Save,
  Users,
  Clock,
  Sparkles,
  TrendingUp,
} from 'lucide-react';

export default function AttendanceManagementPage() {
  const [selectedDate, setSelectedDate] = useState('2026-09-11');
  const [selectedBatch, setSelectedBatch] = useState('batch-evening');
  const [students, setStudents] = useState<Student[]>([]);
  const [attendanceMap, setAttendanceMap] = useState<Record<string, AttendanceStatus>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Fetch students & existing attendance for selected date/batch
  const loadData = async () => {
    try {
      setLoading(true);
      const [stuRes, attRes] = await Promise.all([
        fetch('/api/students'),
        fetch(`/api/attendance?date=${selectedDate}&batch_id=${selectedBatch}`),
      ]);

      const stuData = await stuRes.json();
      const attData = await attRes.json();

      if (stuData.success) {
        const batchStudents = stuData.data.filter(
          (s: Student) => s.batch_id === selectedBatch && s.status === 'active'
        );
        setStudents(batchStudents);

        // Map existing attendance or default to 'present'
        const currentMap: Record<string, AttendanceStatus> = {};
        batchStudents.forEach((s: Student) => {
          const existing = attData.data?.find(
            (a: AttendanceRecord) => a.student_id === s.student_id
          );
          currentMap[s.student_id] = existing ? existing.status : 'present';
        });
        setAttendanceMap(currentMap);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [selectedDate, selectedBatch]);

  const setStatus = (studentId: string, status: AttendanceStatus) => {
    setAttendanceMap((prev) => ({
      ...prev,
      [studentId]: status,
    }));
  };

  const markAll = (status: AttendanceStatus) => {
    const updated: Record<string, AttendanceStatus> = {};
    students.forEach((s) => {
      updated[s.student_id] = status;
    });
    setAttendanceMap(updated);
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      const records = students.map((s) => ({
        student_id: s.student_id,
        student_name: s.name,
        date: selectedDate,
        batch_id: selectedBatch,
        status: attendanceMap[s.student_id] || 'present',
        marked_by: 'Gurukkal K. Chandran',
      }));

      const res = await fetch('/api/attendance', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ records }),
      });

      const data = await res.json();
      if (data.success) {
        setSaveSuccess(true);
        setTimeout(() => setSaveSuccess(false), 3000);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  // Counts for today's selected batch
  const presentCount = Object.values(attendanceMap).filter((v) => v === 'present').length;
  const absentCount = Object.values(attendanceMap).filter((v) => v === 'absent').length;
  const leaveCount = Object.values(attendanceMap).filter((v) => v === 'leave').length;

  return (
    <div className="flex-1 flex flex-col">
      <AdminHeader
        title="Daily Attendance"
        subtitle="Mark, verify, and monitor daily Kalari batch attendance and regularity thresholds."
      />

      <main className="p-6 sm:p-8 space-y-6 flex-1">
        {/* Selector & Controls Bar */}
        <div className="p-6 rounded-2xl bg-kalari-darkBrown/90 border border-kalari-gold/30 shadow-gold flex flex-col md:flex-row items-stretch md:items-center justify-between gap-5">
          <div className="flex flex-wrap items-center gap-4">
            {/* Date Picker */}
            <div>
              <label className="block text-[11px] font-serif uppercase tracking-widest text-kalari-gold mb-1.5 font-semibold">
                Attendance Date
              </label>
              <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-kalari-black border border-kalari-earth focus-within:border-kalari-gold">
                <CalendarIcon className="w-4 h-4 text-kalari-gold" />
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="bg-transparent text-xs text-kalari-white focus:outline-none"
                />
              </div>
            </div>

            {/* Batch Selector */}
            <div>
              <label className="block text-[11px] font-serif uppercase tracking-widest text-kalari-gold mb-1.5 font-semibold">
                Select Batch
              </label>
              <select
                value={selectedBatch}
                onChange={(e) => setSelectedBatch(e.target.value)}
                className="px-3 py-2 rounded-lg bg-kalari-black border border-kalari-earth text-xs text-kalari-beige focus:outline-none focus:border-kalari-gold"
              >
                <option value="batch-morning">Morning Batch (6:00 AM – 7:30 AM)</option>
                <option value="batch-evening">Evening Batch (5:00 PM – 7:00 PM)</option>
                <option value="batch-weekend">Weekend Batch (7:00 AM – 9:30 AM)</option>
              </select>
            </div>
          </div>

          {/* Quick Shortcuts: Mark All Present, Save */}
          <div className="flex items-center gap-3 self-end md:self-center">
            <button
              onClick={() => markAll('present')}
              className="px-3.5 py-2 rounded-lg bg-kalari-black border border-kalari-gold/30 text-kalari-gold hover:bg-kalari-gold/10 text-xs font-serif uppercase tracking-wider transition-all"
            >
              Mark All Present
            </button>

            <button
              onClick={handleSave}
              disabled={saving}
              className="px-5 py-2 rounded-lg gold-gradient-bg text-kalari-black font-serif font-bold text-xs uppercase tracking-wider shadow-gold hover:brightness-110 flex items-center gap-1.5 transition-all disabled:opacity-50"
            >
              <Save className="w-4 h-4" />
              <span>{saving ? 'Saving...' : 'Save Attendance'}</span>
            </button>
          </div>
        </div>

        {saveSuccess && (
          <div className="p-4 rounded-xl bg-emerald-950/80 border border-emerald-500/50 text-emerald-300 text-xs flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Attendance saved successfully for {selectedDate}!</span>
          </div>
        )}

        {/* Tally Metric Badges */}
        <div className="grid grid-cols-3 gap-4">
          <div className="p-4 rounded-xl bg-kalari-darkBrown/70 border border-emerald-800/40 flex items-center justify-between">
            <div>
              <span className="text-[10px] uppercase font-serif tracking-wider text-emerald-400 block font-semibold">
                Present
              </span>
              <span className="font-serif text-2xl font-bold text-emerald-300">
                {presentCount}
              </span>
            </div>
            <CheckCircle2 className="w-7 h-7 text-emerald-500/80" />
          </div>

          <div className="p-4 rounded-xl bg-kalari-darkBrown/70 border border-red-800/40 flex items-center justify-between">
            <div>
              <span className="text-[10px] uppercase font-serif tracking-wider text-red-400 block font-semibold">
                Absent
              </span>
              <span className="font-serif text-2xl font-bold text-red-300">
                {absentCount}
              </span>
            </div>
            <XCircle className="w-7 h-7 text-red-500/80" />
          </div>

          <div className="p-4 rounded-xl bg-kalari-darkBrown/70 border border-amber-800/40 flex items-center justify-between">
            <div>
              <span className="text-[10px] uppercase font-serif tracking-wider text-amber-400 block font-semibold">
                Leave
              </span>
              <span className="font-serif text-2xl font-bold text-amber-300">
                {leaveCount}
              </span>
            </div>
            <AlertTriangle className="w-7 h-7 text-amber-500/80" />
          </div>
        </div>

        {/* Attendance Roster Table */}
        <div className="rounded-2xl border border-kalari-gold/25 bg-kalari-darkBrown/80 shadow-gold overflow-hidden">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-kalari-gold/30 bg-kalari-black/70 font-serif uppercase tracking-wider text-kalari-gold">
                <th className="py-4 px-5">Student</th>
                <th className="py-4 px-5">Student ID</th>
                <th className="py-4 px-5">Training Level</th>
                <th className="py-4 px-5">Month Attendance</th>
                <th className="py-4 px-5 text-center">Status Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-kalari-gold/15">
              {students.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-kalari-beige/60">
                    No active students assigned to this batch.
                  </td>
                </tr>
              ) : (
                students.map((s) => {
                  const currentStatus = attendanceMap[s.student_id] || 'present';
                  // Sample percentage: Arun 92%, Ajay 68%, etc.
                  const isLow = s.student_id === 'KAL-2026-004';
                  const pct = isLow ? 68 : s.student_id === 'KAL-2026-001' ? 92 : 89;

                  return (
                    <tr
                      key={s.id}
                      className="hover:bg-kalari-black/40 transition-colors"
                    >
                      <td className="py-4 px-5">
                        <div className="font-serif font-bold text-kalari-white text-sm">
                          {s.name}
                        </div>
                        <div className="text-[10px] text-kalari-beige/60">{s.phone}</div>
                      </td>

                      <td className="py-4 px-5 font-mono font-semibold text-kalari-gold">
                        {s.student_id}
                      </td>

                      <td className="py-4 px-5">
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-serif uppercase tracking-wider bg-kalari-black text-kalari-goldLight border border-kalari-gold/20">
                          {s.training_level}
                        </span>
                      </td>

                      <td className="py-4 px-5">
                        <div className="flex items-center gap-2">
                          <span
                            className={`font-mono font-bold text-xs ${
                              pct < 75 ? 'text-red-400' : 'text-emerald-400'
                            }`}
                          >
                            {pct}%
                          </span>
                          <div className="w-24 bg-kalari-black h-1.5 rounded-full overflow-hidden">
                            <div
                              style={{ width: `${pct}%` }}
                              className={`h-full rounded-full ${
                                pct < 75 ? 'bg-red-500' : 'bg-kalari-gold'
                              }`}
                            />
                          </div>
                          {pct < 75 && (
                            <span className="text-[10px] px-1.5 py-0.5 rounded bg-red-950 text-red-300 border border-red-800">
                              Alert &lt;75%
                            </span>
                          )}
                        </div>
                      </td>

                      {/* 3 Status Options: 🟢 Present, 🔴 Absent, 🟡 Leave */}
                      <td className="py-4 px-5 text-center">
                        <div className="inline-flex items-center gap-1.5 p-1 rounded-lg bg-kalari-black/60 border border-kalari-earth/40">
                          <button
                            type="button"
                            onClick={() => setStatus(s.student_id, 'present')}
                            className={`px-3 py-1 rounded text-xs font-semibold tracking-wider uppercase transition-all flex items-center gap-1 ${
                              currentStatus === 'present'
                                ? 'bg-emerald-600 text-white shadow-md'
                                : 'text-kalari-beige/70 hover:text-white'
                            }`}
                          >
                            <span>🟢</span>
                            <span>Present</span>
                          </button>

                          <button
                            type="button"
                            onClick={() => setStatus(s.student_id, 'absent')}
                            className={`px-3 py-1 rounded text-xs font-semibold tracking-wider uppercase transition-all flex items-center gap-1 ${
                              currentStatus === 'absent'
                                ? 'bg-red-600 text-white shadow-md'
                                : 'text-kalari-beige/70 hover:text-white'
                            }`}
                          >
                            <span>🔴</span>
                            <span>Absent</span>
                          </button>

                          <button
                            type="button"
                            onClick={() => setStatus(s.student_id, 'leave')}
                            className={`px-3 py-1 rounded text-xs font-semibold tracking-wider uppercase transition-all flex items-center gap-1 ${
                              currentStatus === 'leave'
                                ? 'bg-amber-600 text-white shadow-md'
                                : 'text-kalari-beige/70 hover:text-white'
                            }`}
                          >
                            <span>🟡</span>
                            <span>Leave</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
