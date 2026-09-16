'use client';

import React, { useState, useEffect } from 'react';
import AdminHeader from '@/components/admin/AdminHeader';
import { UserAccount, UserApprovalStatus } from '@/types';
import {
  UserCheck,
  UserX,
  Clock,
  Mail,
  Phone,
  Calendar,
  CheckCircle,
  XCircle,
  AlertCircle,
  Search,
  RefreshCw,
  Sparkles,
  Shield,
  User,
} from 'lucide-react';

type SafeUser = Omit<UserAccount, 'password'>;

export default function ApprovalsPage() {
  const [users, setUsers] = useState<SafeUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'pending' | 'approved' | 'rejected'>('pending');
  const [search, setSearch] = useState('');
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/auth/approvals');
      const data = await res.json();
      if (data.success && Array.isArray(data.data)) {
        setUsers(data.data);
      }
    } catch (err: any) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleUpdateStatus = async (userId: string, status: 'approved' | 'rejected') => {
    try {
      setActionLoading(userId);
      const res = await fetch('/api/auth/approvals', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, status }),
      });
      const data = await res.json();
      if (data.success) {
        setMessage({
          type: 'success',
          text: `User access ${status === 'approved' ? 'APPROVED' : 'REJECTED'} successfully.`,
        });
        setTimeout(() => setMessage(null), 4000);
        fetchUsers();
      } else {
        setMessage({ type: 'error', text: data.error || 'Failed to update approval status' });
      }
    } catch (err: any) {
      setMessage({ type: 'error', text: err.message || 'Error updating approval' });
    } finally {
      setActionLoading(null);
    }
  };

  const pendingCount = users.filter((u) => u.approval_status === 'pending').length;
  const approvedCount = users.filter((u) => u.approval_status === 'approved').length;
  const rejectedCount = users.filter((u) => u.approval_status === 'rejected').length;

  const filteredUsers = users
    .filter((u) => {
      if (filter === 'all') return true;
      return u.approval_status === filter;
    })
    .filter((u) => {
      if (!search.trim()) return true;
      const q = search.toLowerCase();
      return (
        u.name.toLowerCase().includes(q) ||
        u.email.toLowerCase().includes(q) ||
        (u.phone && u.phone.includes(q)) ||
        (u.student_id && u.student_id.toLowerCase().includes(q))
      );
    });

  return (
    <div className="flex-1 flex flex-col min-h-screen">
      <AdminHeader
        title="Student Access Approvals"
        subtitle="Review registration requests and authorize students to access the Student Portal."
      />

      <main className="p-4 sm:p-8 space-y-6 flex-1 max-w-7xl w-full mx-auto">
        {/* Toast / Notification */}
        {message && (
          <div
            className={`p-4 rounded-xl flex items-center justify-between gap-3 border ${
              message.type === 'success'
                ? 'bg-emerald-950/80 border-emerald-500/50 text-emerald-200'
                : 'bg-red-950/80 border-red-500/50 text-red-200'
            }`}
          >
            <div className="flex items-center gap-2 text-sm font-medium">
              {message.type === 'success' ? (
                <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0" />
              ) : (
                <AlertCircle className="w-5 h-5 text-red-400 shrink-0" />
              )}
              <span>{message.text}</span>
            </div>
          </div>
        )}

        {/* Top KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div
            onClick={() => setFilter('pending')}
            className={`p-5 rounded-xl bg-kalari-darkBrown/80 border cursor-pointer transition-all ${
              filter === 'pending'
                ? 'border-amber-400 shadow-gold'
                : 'border-kalari-gold/25 hover:border-kalari-gold/50'
            }`}
          >
            <div className="flex items-center justify-between text-amber-400 mb-2">
              <span className="text-[11px] font-serif uppercase tracking-widest font-semibold">
                Pending Requests
              </span>
              <Clock className="w-5 h-5 text-amber-400" />
            </div>
            <div className="font-serif text-3xl font-black text-amber-300">{pendingCount}</div>
            <p className="text-[11px] text-kalari-beige/60 mt-1 font-light">
              Awaiting authorization to log in
            </p>
          </div>

          <div
            onClick={() => setFilter('approved')}
            className={`p-5 rounded-xl bg-kalari-darkBrown/80 border cursor-pointer transition-all ${
              filter === 'approved'
                ? 'border-emerald-400 shadow-gold'
                : 'border-kalari-gold/25 hover:border-kalari-gold/50'
            }`}
          >
            <div className="flex items-center justify-between text-emerald-400 mb-2">
              <span className="text-[11px] font-serif uppercase tracking-widest font-semibold">
                Approved Members
              </span>
              <UserCheck className="w-5 h-5 text-emerald-400" />
            </div>
            <div className="font-serif text-3xl font-black text-emerald-300">{approvedCount}</div>
            <p className="text-[11px] text-kalari-beige/60 mt-1 font-light">
              Active student portal accounts
            </p>
          </div>

          <div
            onClick={() => setFilter('rejected')}
            className={`p-5 rounded-xl bg-kalari-darkBrown/80 border cursor-pointer transition-all ${
              filter === 'rejected'
                ? 'border-red-400 shadow-gold'
                : 'border-kalari-gold/25 hover:border-kalari-gold/50'
            }`}
          >
            <div className="flex items-center justify-between text-red-400 mb-2">
              <span className="text-[11px] font-serif uppercase tracking-widest font-semibold">
                Rejected / Blocked
              </span>
              <UserX className="w-5 h-5 text-red-400" />
            </div>
            <div className="font-serif text-3xl font-black text-red-400">{rejectedCount}</div>
            <p className="text-[11px] text-kalari-beige/60 mt-1 font-light">
              Access denied or deactivated
            </p>
          </div>
        </div>

        {/* Filters & Search */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 p-4 rounded-xl bg-kalari-darkBrown/60 border border-kalari-gold/20">
          <div className="flex items-center gap-1.5 overflow-x-auto">
            {(['all', 'pending', 'approved', 'rejected'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setFilter(tab)}
                className={`px-3 py-1.5 rounded-lg text-xs font-serif uppercase tracking-wider transition-all whitespace-nowrap ${
                  filter === tab
                    ? 'bg-kalari-gold text-kalari-black font-bold shadow-gold'
                    : 'bg-kalari-black/50 text-kalari-beige/70 hover:text-kalari-gold'
                }`}
              >
                {tab === 'all'
                  ? `All (${users.length})`
                  : tab === 'pending'
                  ? `Pending (${pendingCount})`
                  : tab === 'approved'
                  ? `Approved (${approvedCount})`
                  : `Rejected (${rejectedCount})`}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <div className="relative flex-1 sm:w-64">
              <Search className="w-4 h-4 text-kalari-gold absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search applicant..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 rounded-lg bg-kalari-black border border-kalari-earth focus:border-kalari-gold text-xs text-kalari-white outline-none"
              />
            </div>
            <button
              onClick={fetchUsers}
              title="Refresh List"
              className="p-2 rounded-lg bg-kalari-black border border-kalari-gold/30 text-kalari-gold hover:bg-kalari-gold hover:text-kalari-black transition-all"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Requests Table / Cards */}
        {loading ? (
          <div className="py-20 text-center text-kalari-gold font-serif text-sm">
            <RefreshCw className="w-8 h-8 animate-spin mx-auto mb-2" />
            <span>Loading Access Requests...</span>
          </div>
        ) : filteredUsers.length === 0 ? (
          <div className="p-12 text-center rounded-2xl bg-kalari-darkBrown/40 border border-kalari-gold/20 space-y-3">
            <Shield className="w-12 h-12 text-kalari-gold/50 mx-auto" />
            <h3 className="font-serif text-base font-bold text-kalari-white">
              No {filter !== 'all' ? filter : ''} registrations found
            </h3>
            <p className="text-xs text-kalari-beige/60">
              When new practitioners apply on the login page, their pending approval will show here.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredUsers.map((user) => {
              const isPending = user.approval_status === 'pending';
              const isApproved = user.approval_status === 'approved';
              const isRejected = user.approval_status === 'rejected';

              return (
                <div
                  key={user.id}
                  className="p-5 rounded-xl bg-kalari-darkBrown/80 border border-kalari-gold/25 hover:border-kalari-gold/50 shadow-gold transition-all flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4"
                >
                  {/* User info */}
                  <div className="flex items-start gap-4 flex-1">
                    <div className="w-12 h-12 rounded-full bg-kalari-black border border-kalari-gold/40 flex items-center justify-center font-serif font-bold text-kalari-gold text-base shrink-0">
                      {user.name.charAt(0).toUpperCase()}
                    </div>

                    <div className="space-y-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <h4 className="font-serif text-base font-bold text-kalari-white">
                          {user.name}
                        </h4>

                        {/* Status Badge */}
                        <span
                          className={`px-2.5 py-0.5 rounded-full text-[10px] font-serif uppercase tracking-wider font-bold border ${
                            isPending
                              ? 'bg-amber-950/80 border-amber-500/60 text-amber-300'
                              : isApproved
                              ? 'bg-emerald-950/80 border-emerald-500/60 text-emerald-300'
                              : 'bg-red-950/80 border-red-500/60 text-red-300'
                          }`}
                        >
                          {user.approval_status}
                        </span>

                        {user.role === 'admin' && (
                          <span className="px-2 py-0.5 rounded-full bg-kalari-gold text-kalari-black font-bold text-[9px] uppercase tracking-wider">
                            Admin
                          </span>
                        )}
                      </div>

                      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-kalari-beige/80">
                        <div className="flex items-center gap-1.5">
                          <Mail className="w-3.5 h-3.5 text-kalari-gold/70" />
                          <span className="font-mono text-kalari-goldLight">{user.email}</span>
                        </div>

                        {user.phone && (
                          <div className="flex items-center gap-1.5">
                            <Phone className="w-3.5 h-3.5 text-kalari-gold/70" />
                            <span>{user.phone}</span>
                          </div>
                        )}

                        {user.student_id && (
                          <div className="flex items-center gap-1.5">
                            <User className="w-3.5 h-3.5 text-kalari-gold/70" />
                            <span className="font-mono font-medium text-kalari-gold">
                              ID: {user.student_id}
                            </span>
                          </div>
                        )}

                        <div className="flex items-center gap-1.5 text-kalari-beige/50">
                          <Calendar className="w-3.5 h-3.5" />
                          <span>
                            Applied: {new Date(user.created_at).toLocaleDateString('en-IN')}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  {user.role !== 'admin' && (
                    <div className="flex items-center gap-2.5 w-full lg:w-auto justify-end pt-2 lg:pt-0 border-t lg:border-t-0 border-kalari-earth/40">
                      {isPending ? (
                        <>
                          <button
                            type="button"
                            disabled={actionLoading === user.id}
                            onClick={() => handleUpdateStatus(user.id, 'approved')}
                            className="flex-1 lg:flex-initial px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-serif font-bold text-xs uppercase tracking-wider shadow transition-all flex items-center justify-center gap-1.5 disabled:opacity-50"
                          >
                            <CheckCircle className="w-4 h-4" />
                            <span>Approve Access</span>
                          </button>

                          <button
                            type="button"
                            disabled={actionLoading === user.id}
                            onClick={() => handleUpdateStatus(user.id, 'rejected')}
                            className="flex-1 lg:flex-initial px-3.5 py-2 rounded-lg bg-red-950/80 border border-red-500/50 text-red-300 hover:bg-red-900 font-serif text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 disabled:opacity-50"
                          >
                            <XCircle className="w-4 h-4" />
                            <span>Reject</span>
                          </button>
                        </>
                      ) : isApproved ? (
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-emerald-400/80 font-medium flex items-center gap-1">
                            <CheckCircle className="w-4 h-4" />
                            <span>Authorized</span>
                          </span>
                          <button
                            type="button"
                            disabled={actionLoading === user.id}
                            onClick={() => handleUpdateStatus(user.id, 'rejected')}
                            className="px-2.5 py-1.5 rounded bg-kalari-black border border-red-500/30 text-red-400 hover:bg-red-950 text-[11px] font-serif uppercase tracking-wider transition-all"
                          >
                            Revoke
                          </button>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-red-400/80 font-medium flex items-center gap-1">
                            <XCircle className="w-4 h-4" />
                            <span>Rejected</span>
                          </span>
                          <button
                            type="button"
                            disabled={actionLoading === user.id}
                            onClick={() => handleUpdateStatus(user.id, 'approved')}
                            className="px-3 py-1.5 rounded bg-emerald-700 hover:bg-emerald-600 text-white text-xs font-serif uppercase tracking-wider transition-all"
                          >
                            Approve Now
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}
