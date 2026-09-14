'use client';

import React, { useState, useEffect } from 'react';
import AdminHeader from '@/components/admin/AdminHeader';
import FeeReceiptModal from '@/components/admin/FeeReceiptModal';
import { FeeRecord, PaymentRecord, Student, PaymentMethod, FeeStatus } from '@/types';
import {
  CreditCard,
  PlusCircle,
  Search,
  CheckCircle,
  AlertCircle,
  Clock,
  Printer,
  X,
  Sparkles,
  ArrowUpRight,
  Receipt,
} from 'lucide-react';

export default function FeeManagementPage() {
  const [fees, setFees] = useState<FeeRecord[]>([]);
  const [payments, setPayments] = useState<PaymentRecord[]>([]);
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);

  // Filter & Search state
  const [statusFilter, setStatusFilter] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'fees' | 'payments'>('fees');

  // Collect Fee Modal state
  const [isCollectModalOpen, setIsCollectModalOpen] = useState(false);
  const [collectFormData, setCollectFormData] = useState({
    student_id: '',
    amount: 500,
    payment_method: 'UPI' as PaymentMethod,
    payment_date: '2026-09-11',
    notes: '',
  });

  // Active Receipt Modal state
  const [activeReceiptPayment, setActiveReceiptPayment] = useState<PaymentRecord | null>(null);

  const loadFeeData = async () => {
    try {
      setLoading(true);
      const [feeRes, payRes, stuRes] = await Promise.all([
        fetch('/api/fees?year=2026&month=September'),
        fetch('/api/payments'),
        fetch('/api/students'),
      ]);

      const feeData = await feeRes.json();
      const payData = await payRes.json();
      const stuData = await stuRes.json();

      if (feeData.success) setFees(feeData.data);
      if (payData.success) setPayments(payData.data);
      if (stuData.success) {
        setStudents(stuData.data);
        if (stuData.data.length > 0 && !collectFormData.student_id) {
          setCollectFormData((prev) => ({
            ...prev,
            student_id: stuData.data[0].student_id,
          }));
        }
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadFeeData();
  }, []);

  const handleCollectFeeSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/payments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(collectFormData),
      });

      const data = await res.json();
      if (data.success && data.data) {
        setIsCollectModalOpen(false);
        // Refresh tables
        loadFeeData();
        // Immediately pop open the official printable receipt!
        setActiveReceiptPayment(data.data.payment);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const getStatusBadge = (status: FeeStatus) => {
    switch (status) {
      case 'paid':
        return (
          <span className="px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase bg-emerald-950/80 text-emerald-300 border border-emerald-700/60 inline-flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            PAID
          </span>
        );
      case 'partially_paid':
        return (
          <span className="px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase bg-amber-950/80 text-amber-300 border border-amber-700/60 inline-flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
            PARTIALLY PAID
          </span>
        );
      case 'pending':
        return (
          <span className="px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase bg-red-950/80 text-red-300 border border-red-700/60 inline-flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-red-400" />
            PENDING
          </span>
        );
      case 'overdue':
        return (
          <span className="px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase bg-red-900 text-white border border-red-500 inline-flex items-center gap-1 animate-pulse">
            <AlertCircle className="w-3 h-3" />
            OVERDUE
          </span>
        );
    }
  };

  const filteredFees = fees.filter((f) => {
    const matchesSearch =
      f.student_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.student_id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = !statusFilter || f.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const filteredPayments = payments.filter((p) => {
    return (
      p.student_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.student_id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.receipt_number.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  return (
    <div className="flex-1 flex flex-col">
      <AdminHeader
        title="Fee Management"
        subtitle="Track monthly tuition fees, record payments, and generate official printable receipts."
      />

      <main className="p-6 sm:p-8 space-y-6 flex-1">
        {/* Monthly Fee Dashboard Banner according to spec */}
        <div className="p-6 rounded-2xl bg-kalari-darkBrown/90 border border-kalari-gold/30 shadow-gold">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <span className="text-xs font-serif uppercase tracking-widest text-kalari-gold block mb-1">
                Fee Collection Summary
              </span>
              <h2 className="font-serif text-2xl font-bold text-kalari-white">
                September 2026 Academic Term
              </h2>
              <p className="text-xs text-kalari-beige/70 font-light mt-0.5">
                Standard Monthly Kalari Tuition: ₹500 per practitioner
              </p>
            </div>

            <button
              onClick={() => setIsCollectModalOpen(true)}
              className="px-5 py-3 rounded-lg gold-gradient-bg text-kalari-black font-serif font-bold text-xs uppercase tracking-wider shadow-gold hover:brightness-110 transition-all flex items-center gap-2 self-start md:self-center"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Collect Fee & Issue Receipt</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6 pt-6 border-t border-kalari-gold/20">
            <div className="p-4 rounded-xl bg-kalari-black/60 border border-kalari-earth/40">
              <span className="text-[11px] font-serif uppercase tracking-wider text-kalari-beige/60 block">
                Expected Collection
              </span>
              <span className="font-serif text-2xl font-bold text-kalari-white block mt-1">
                ₹50,000
              </span>
            </div>

            <div className="p-4 rounded-xl bg-kalari-black/60 border border-emerald-800/40">
              <span className="text-[11px] font-serif uppercase tracking-wider text-emerald-400 block font-semibold">
                Collected (Paid)
              </span>
              <span className="font-serif text-2xl font-bold text-emerald-300 block mt-1">
                ₹42,000
              </span>
            </div>

            <div className="p-4 rounded-xl bg-kalari-black/60 border border-amber-800/40">
              <span className="text-[11px] font-serif uppercase tracking-wider text-amber-400 block font-semibold">
                Pending Collection
              </span>
              <span className="font-serif text-2xl font-bold text-amber-300 block mt-1">
                ₹8,000
              </span>
            </div>
          </div>
        </div>

        {/* Tab & Filter Bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2 bg-kalari-darkBrown p-1 rounded-lg border border-kalari-gold/20">
            <button
              onClick={() => setActiveTab('fees')}
              className={`px-4 py-1.5 rounded-md text-xs font-serif uppercase tracking-wider transition-all ${
                activeTab === 'fees'
                  ? 'bg-kalari-gold text-kalari-black font-bold shadow-gold'
                  : 'text-kalari-beige/70 hover:text-kalari-gold'
              }`}
            >
              Fee Status Roster
            </button>
            <button
              onClick={() => setActiveTab('payments')}
              className={`px-4 py-1.5 rounded-md text-xs font-serif uppercase tracking-wider transition-all ${
                activeTab === 'payments'
                  ? 'bg-kalari-gold text-kalari-black font-bold shadow-gold'
                  : 'text-kalari-beige/70 hover:text-kalari-gold'
              }`}
            >
              Payment History & Receipts ({payments.length})
            </button>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <div className="relative flex-1 sm:w-64">
              <Search className="w-3.5 h-3.5 text-kalari-gold absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search student or receipt..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 rounded-lg bg-kalari-darkBrown border border-kalari-gold/20 text-xs text-kalari-white placeholder:text-kalari-beige/40 focus:outline-none focus:border-kalari-gold"
              />
            </div>

            {activeTab === 'fees' && (
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-3 py-1.5 rounded-lg bg-kalari-darkBrown border border-kalari-gold/20 text-xs text-kalari-beige focus:outline-none focus:border-kalari-gold"
              >
                <option value="">All Statuses</option>
                <option value="paid">Paid</option>
                <option value="pending">Pending</option>
                <option value="overdue">Overdue</option>
              </select>
            )}
          </div>
        </div>

        {/* Tab 1: Current Month Fee Status Roster */}
        {activeTab === 'fees' && (
          <div className="rounded-2xl border border-kalari-gold/25 bg-kalari-darkBrown/80 shadow-gold overflow-hidden">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-kalari-gold/30 bg-kalari-black/70 font-serif uppercase tracking-wider text-kalari-gold">
                  <th className="py-4 px-5">Student</th>
                  <th className="py-4 px-5">Student ID</th>
                  <th className="py-4 px-5">Month / Term</th>
                  <th className="py-4 px-5">Due Date</th>
                  <th className="py-4 px-5">Fee Amount</th>
                  <th className="py-4 px-5">Status</th>
                  <th className="py-4 px-5 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-kalari-gold/15">
                {filteredFees.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="py-8 text-center text-kalari-beige/60">
                      No fee records found.
                    </td>
                  </tr>
                ) : (
                  filteredFees.map((f) => (
                    <tr key={f.id} className="hover:bg-kalari-black/40 transition-colors">
                      <td className="py-4 px-5 font-serif font-bold text-kalari-white text-sm">
                        {f.student_name}
                      </td>
                      <td className="py-4 px-5 font-mono font-semibold text-kalari-gold">
                        {f.student_id}
                      </td>
                      <td className="py-4 px-5 text-kalari-beige">
                        {f.month} {f.year}
                      </td>
                      <td className="py-4 px-5 text-kalari-beige/80">{f.due_date}</td>
                      <td className="py-4 px-5 font-serif font-bold text-kalari-white text-sm">
                        ₹{f.total_amount}
                      </td>
                      <td className="py-4 px-5">{getStatusBadge(f.status)}</td>
                      <td className="py-4 px-5 text-right">
                        {f.status !== 'paid' ? (
                          <button
                            onClick={() => {
                              setCollectFormData({
                                student_id: f.student_id,
                                amount: f.total_amount - f.paid_amount,
                                payment_method: 'UPI',
                                payment_date: '2026-09-11',
                                notes: `Fee payment for ${f.month} ${f.year}`,
                              });
                              setIsCollectModalOpen(true);
                            }}
                            className="px-3 py-1 rounded bg-kalari-gold text-kalari-black font-serif font-bold uppercase tracking-wider text-[11px] shadow-gold hover:bg-kalari-goldLight transition-all"
                          >
                            Collect ₹{f.total_amount - f.paid_amount}
                          </button>
                        ) : (
                          <span className="text-emerald-400 font-medium text-[11px]">
                            Cleared ✓
                          </span>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}

        {/* Tab 2: Payment History & Printable Receipts */}
        {activeTab === 'payments' && (
          <div className="rounded-2xl border border-kalari-gold/25 bg-kalari-darkBrown/80 shadow-gold overflow-hidden">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-kalari-gold/30 bg-kalari-black/70 font-serif uppercase tracking-wider text-kalari-gold">
                  <th className="py-4 px-5">Receipt No</th>
                  <th className="py-4 px-5">Student</th>
                  <th className="py-4 px-5">Student ID</th>
                  <th className="py-4 px-5">Payment Date</th>
                  <th className="py-4 px-5">Method</th>
                  <th className="py-4 px-5">Amount Paid</th>
                  <th className="py-4 px-5 text-right">Printable Receipt</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-kalari-gold/15">
                {filteredPayments.map((p) => (
                  <tr key={p.id} className="hover:bg-kalari-black/40 transition-colors">
                    <td className="py-4 px-5 font-mono font-bold text-kalari-gold">
                      {p.receipt_number}
                    </td>
                    <td className="py-4 px-5 font-serif font-bold text-kalari-white text-sm">
                      {p.student_name}
                    </td>
                    <td className="py-4 px-5 font-mono text-kalari-beige/80">
                      {p.student_id}
                    </td>
                    <td className="py-4 px-5 text-kalari-beige/80">{p.payment_date}</td>
                    <td className="py-4 px-5">
                      <span className="px-2 py-0.5 rounded bg-kalari-black text-kalari-goldLight border border-kalari-gold/20">
                        {p.payment_method}
                      </span>
                    </td>
                    <td className="py-4 px-5 font-serif font-bold text-kalari-white text-sm">
                      ₹{p.amount}
                    </td>
                    <td className="py-4 px-5 text-right">
                      <button
                        onClick={() => setActiveReceiptPayment(p)}
                        className="px-3 py-1 rounded bg-kalari-darkBrown border border-kalari-gold/40 text-kalari-gold hover:bg-kalari-gold hover:text-kalari-black font-serif font-bold uppercase tracking-wider text-[11px] transition-all flex items-center gap-1.5 ml-auto"
                      >
                        <Printer className="w-3 h-3" />
                        <span>View / Print Receipt</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>

      {/* Collect Fee Modal */}
      {isCollectModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="relative w-full max-w-md bg-kalari-black border-2 border-kalari-gold rounded-2xl shadow-gold-lg overflow-hidden my-8">
            <div className="px-6 py-4 bg-kalari-darkBrown border-b border-kalari-gold/30 flex items-center justify-between">
              <h3 className="font-serif text-lg font-bold text-kalari-gold uppercase tracking-wider">
                Collect Tuition Fee
              </h3>
              <button
                onClick={() => setIsCollectModalOpen(false)}
                className="text-kalari-beige hover:text-kalari-gold"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCollectFeeSubmit} className="p-6 space-y-4 text-xs">
              <div>
                <label className="block text-kalari-gold uppercase tracking-wider mb-1 font-semibold">
                  Select Student *
                </label>
                <select
                  value={collectFormData.student_id}
                  onChange={(e) => setCollectFormData({ ...collectFormData, student_id: e.target.value })}
                  className="w-full px-3 py-2 rounded bg-kalari-darkBrown border border-kalari-earth focus:border-kalari-gold text-kalari-white text-xs focus:outline-none"
                >
                  {students.map((s) => (
                    <option key={s.id} value={s.student_id}>
                      {s.name} ({s.student_id})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-kalari-gold uppercase tracking-wider mb-1 font-semibold">
                  Amount (₹) *
                </label>
                <input
                  type="number"
                  required
                  value={collectFormData.amount}
                  onChange={(e) => setCollectFormData({ ...collectFormData, amount: parseFloat(e.target.value) || 0 })}
                  className="w-full px-3 py-2 rounded bg-kalari-darkBrown border border-kalari-earth focus:border-kalari-gold text-kalari-white text-sm font-serif font-bold focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-kalari-gold uppercase tracking-wider mb-1 font-semibold">
                  Payment Method *
                </label>
                <select
                  value={collectFormData.payment_method}
                  onChange={(e) => setCollectFormData({ ...collectFormData, payment_method: e.target.value as PaymentMethod })}
                  className="w-full px-3 py-2 rounded bg-kalari-darkBrown border border-kalari-earth focus:border-kalari-gold text-kalari-white text-xs focus:outline-none"
                >
                  <option value="UPI">UPI (GooglePay, PhonePe, PayTM)</option>
                  <option value="Cash">Cash in Arena</option>
                  <option value="Bank Transfer">Bank Transfer / NEFT</option>
                  <option value="Card">Card</option>
                </select>
              </div>

              <div>
                <label className="block text-kalari-gold uppercase tracking-wider mb-1 font-semibold">
                  Payment Date
                </label>
                <input
                  type="date"
                  value={collectFormData.payment_date}
                  onChange={(e) => setCollectFormData({ ...collectFormData, payment_date: e.target.value })}
                  className="w-full px-3 py-2 rounded bg-kalari-darkBrown border border-kalari-earth focus:border-kalari-gold text-kalari-white text-xs focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-kalari-gold uppercase tracking-wider mb-1 font-semibold">
                  Reference Note / Transaction ID
                </label>
                <input
                  type="text"
                  placeholder="e.g. UPI Ref: 6255102941"
                  value={collectFormData.notes}
                  onChange={(e) => setCollectFormData({ ...collectFormData, notes: e.target.value })}
                  className="w-full px-3 py-2 rounded bg-kalari-darkBrown border border-kalari-earth focus:border-kalari-gold text-kalari-white text-xs focus:outline-none"
                />
              </div>

              <div className="pt-4 border-t border-kalari-gold/20 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsCollectModalOpen(false)}
                  className="px-4 py-2 rounded bg-kalari-darkBrown text-kalari-beige hover:text-kalari-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded gold-gradient-bg text-kalari-black font-serif font-bold uppercase tracking-wider shadow-gold"
                >
                  Confirm & Generate Receipt
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Official Printable Receipt Modal */}
      {activeReceiptPayment && (
        <FeeReceiptModal
          payment={activeReceiptPayment}
          onClose={() => setActiveReceiptPayment(null)}
        />
      )}
    </div>
  );
}
