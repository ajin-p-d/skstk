'use client';

import React, { useState } from 'react';
import AdminHeader from '@/components/admin/AdminHeader';
import {
  FileBarChart,
  Download,
  Printer,
  Calendar,
  Filter,
  Users,
  CreditCard,
  AlertCircle,
  CheckCircle,
} from 'lucide-react';
import { initialStudents } from '@/lib/data/seed';

export default function ReportsPage() {
  const [reportType, setReportType] = useState<
    'daily_attendance' | 'monthly_attendance' | 'pending_fees' | 'monthly_collection'
  >('monthly_attendance');

  const exportCSV = () => {
    let headers = '';
    let rows = '';

    if (reportType.includes('attendance')) {
      headers = 'Student ID,Name,Level,Batch,Attendance %,Status\n';
      rows = initialStudents
        .map(
          (s) =>
            `${s.student_id},"${s.name}",${s.training_level},${s.batch_id},${
              s.student_id === 'KAL-2026-004' ? '68%' : '92%'
            },${s.status}`
        )
        .join('\n');
    } else {
      headers = 'Student ID,Name,Month,Year,Amount,Status\n';
      rows = initialStudents
        .map(
          (s) =>
            `${s.student_id},"${s.name}",September,2026,₹500,${
              s.student_id === 'KAL-2026-004'
                ? 'Pending'
                : s.student_id === 'KAL-2026-007'
                ? 'Overdue'
                : 'Paid'
            }`
        )
        .join('\n');
    }

    const blob = new Blob([headers + rows], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Kalari_${reportType}_Report_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="flex-1 flex flex-col">
      <AdminHeader
        title="Reports & Analytics"
        subtitle="Generate, filter, and export attendance records, monthly collections, and defaulter audits."
      />

      <main className="p-6 sm:p-8 space-y-6 flex-1">
        {/* Report Selector & Export Bar */}
        <div className="p-6 rounded-2xl bg-kalari-darkBrown/90 border border-kalari-gold/30 shadow-gold flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setReportType('monthly_attendance')}
              className={`px-3.5 py-2 rounded-lg text-xs font-serif uppercase tracking-wider transition-all ${
                reportType === 'monthly_attendance'
                  ? 'bg-kalari-gold text-kalari-black font-bold shadow-gold'
                  : 'bg-kalari-black text-kalari-beige/70 hover:text-kalari-gold border border-kalari-gold/20'
              }`}
            >
              Monthly Attendance
            </button>

            <button
              onClick={() => setReportType('daily_attendance')}
              className={`px-3.5 py-2 rounded-lg text-xs font-serif uppercase tracking-wider transition-all ${
                reportType === 'daily_attendance'
                  ? 'bg-kalari-gold text-kalari-black font-bold shadow-gold'
                  : 'bg-kalari-black text-kalari-beige/70 hover:text-kalari-gold border border-kalari-gold/20'
              }`}
            >
              Daily Sheet (Sep 11)
            </button>

            <button
              onClick={() => setReportType('pending_fees')}
              className={`px-3.5 py-2 rounded-lg text-xs font-serif uppercase tracking-wider transition-all ${
                reportType === 'pending_fees'
                  ? 'bg-kalari-gold text-kalari-black font-bold shadow-gold'
                  : 'bg-kalari-black text-kalari-beige/70 hover:text-kalari-gold border border-kalari-gold/20'
              }`}
            >
              Pending & Overdue Fees
            </button>

            <button
              onClick={() => setReportType('monthly_collection')}
              className={`px-3.5 py-2 rounded-lg text-xs font-serif uppercase tracking-wider transition-all ${
                reportType === 'monthly_collection'
                  ? 'bg-kalari-gold text-kalari-black font-bold shadow-gold'
                  : 'bg-kalari-black text-kalari-beige/70 hover:text-kalari-gold border border-kalari-gold/20'
              }`}
            >
              Monthly Collection
            </button>
          </div>

          <div className="flex items-center gap-3 self-end sm:self-center">
            <button
              onClick={exportCSV}
              className="px-4 py-2 rounded-lg bg-kalari-black border border-kalari-gold/40 text-kalari-gold hover:bg-kalari-gold hover:text-kalari-black text-xs font-serif uppercase tracking-wider flex items-center gap-1.5 transition-all shadow-gold"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export CSV</span>
            </button>

            <button
              onClick={handlePrint}
              className="px-4 py-2 rounded-lg gold-gradient-bg text-kalari-black font-serif font-bold text-xs uppercase tracking-wider shadow-gold hover:brightness-110 flex items-center gap-1.5 transition-all"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Report</span>
            </button>
          </div>
        </div>

        {/* Report Preview Container */}
        <div className="rounded-2xl border border-kalari-gold/25 bg-kalari-darkBrown/80 shadow-gold p-6 space-y-6">
          <div className="flex items-center justify-between border-b border-kalari-gold/20 pb-4">
            <div>
              <span className="text-[10px] uppercase font-serif tracking-widest text-kalari-gold block">
                Official Academy Audit
              </span>
              <h3 className="font-serif text-xl font-bold text-kalari-white capitalize">
                {reportType.replace('_', ' ')} Report
              </h3>
              <p className="text-xs text-kalari-beige/70">Generated on September 11, 2026</p>
            </div>
            <div className="text-right">
              <span className="text-xs text-kalari-gold block font-serif uppercase">
                Thulunadan Kalari Sangham
              </span>
              <span className="text-[11px] text-kalari-beige/60">Kannur, Kerala</span>
            </div>
          </div>

          {/* Table display */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-kalari-gold/25 text-kalari-gold font-serif uppercase tracking-wider">
                  <th className="py-3 px-4">Student ID</th>
                  <th className="py-3 px-4">Student Name</th>
                  <th className="py-3 px-4">Level</th>
                  <th className="py-3 px-4">Batch</th>
                  {reportType.includes('attendance') ? (
                    <>
                      <th className="py-3 px-4">Total Sessions</th>
                      <th className="py-3 px-4">Attended</th>
                      <th className="py-3 px-4">Attendance Rate</th>
                      <th className="py-3 px-4">Standing</th>
                    </>
                  ) : (
                    <>
                      <th className="py-3 px-4">Due Date</th>
                      <th className="py-3 px-4">Tuition Amount</th>
                      <th className="py-3 px-4">Status</th>
                    </>
                  )}
                </tr>
              </thead>
              <tbody className="divide-y divide-kalari-gold/15">
                {initialStudents.map((s) => {
                  const isLow = s.student_id === 'KAL-2026-004';
                  const isOverdue = s.student_id === 'KAL-2026-007';
                  const isPending = s.student_id === 'KAL-2026-006' || isLow;

                  return (
                    <tr key={s.id} className="hover:bg-kalari-black/30">
                      <td className="py-3 px-4 font-mono text-kalari-gold font-bold">
                        {s.student_id}
                      </td>
                      <td className="py-3 px-4 font-serif font-bold text-kalari-white">
                        {s.name}
                      </td>
                      <td className="py-3 px-4 text-kalari-beige">{s.training_level}</td>
                      <td className="py-3 px-4 text-kalari-beige/80">{s.batch_id}</td>

                      {reportType.includes('attendance') ? (
                        <>
                          <td className="py-3 px-4">20</td>
                          <td className="py-3 px-4">{isLow ? 13 : 19}</td>
                          <td className="py-3 px-4 font-mono font-bold">
                            <span className={isLow ? 'text-red-400' : 'text-emerald-400'}>
                              {isLow ? '68%' : '92%'}
                            </span>
                          </td>
                          <td className="py-3 px-4">
                            {isLow ? (
                              <span className="px-2 py-0.5 rounded bg-red-950 text-red-300 border border-red-800 text-[10px]">
                                Defaulter (&lt;75%)
                              </span>
                            ) : (
                              <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800 text-[10px]">
                                Good Standing
                              </span>
                            )}
                          </td>
                        </>
                      ) : (
                        <>
                          <td className="py-3 px-4 text-kalari-beige/80">10/09/2026</td>
                          <td className="py-3 px-4 font-serif font-bold text-kalari-white">
                            ₹500
                          </td>
                          <td className="py-3 px-4">
                            {isOverdue ? (
                              <span className="px-2 py-0.5 rounded bg-red-900 text-white text-[10px] font-bold">
                                OVERDUE
                              </span>
                            ) : isPending ? (
                              <span className="px-2 py-0.5 rounded bg-red-950 text-red-300 text-[10px] font-bold">
                                PENDING
                              </span>
                            ) : (
                              <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 text-[10px] font-bold">
                                PAID
                              </span>
                            )}
                          </td>
                        </>
                      )}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
