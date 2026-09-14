'use client';

import React, { useState, useEffect } from 'react';
import AdminHeader from '@/components/admin/AdminHeader';
import { NotificationItem, Student } from '@/types';
import {
  Bell,
  Send,
  AlertTriangle,
  CreditCard,
  Calendar,
  Sparkles,
  Users,
  CheckCircle,
  X,
} from 'lucide-react';

export default function AdminNotificationsPage() {
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [students, setStudents] = useState<Student[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newNotif, setNewNotif] = useState({
    type: 'class' as 'fee' | 'attendance' | 'class' | 'event',
    title: 'Class Reminder',
    message: 'Your Kalari training session starts at 5:00 PM today.',
    target_student_id: '' as string,
  });

  const loadNotifs = async () => {
    try {
      const [notifRes, stuRes] = await Promise.all([
        fetch('/api/notifications'),
        fetch('/api/students'),
      ]);
      const notifData = await notifRes.json();
      const stuData = await stuRes.json();
      if (notifData.success) setNotifications(notifData.data);
      if (stuData.success) setStudents(stuData.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    loadNotifs();
  }, []);

  const handleTypeSelect = (type: 'fee' | 'attendance' | 'class' | 'event') => {
    let title = '';
    let message = '';
    switch (type) {
      case 'fee':
        title = 'Fee Reminder';
        message = 'Your monthly Kalari fee is due. Please complete the payment to maintain active standing.';
        break;
      case 'attendance':
        title = 'Attendance Alert';
        message = 'Your attendance has fallen below 75%. Regularity in Kalari is essential for muscle memory and safety.';
        break;
      case 'class':
        title = 'Class Reminder';
        message = 'Your Kalari class starts at 5:00 PM today.';
        break;
      case 'event':
        title = 'Event Notification';
        message = 'Special Kalari training session this Sunday at 7:00 AM with Gurukkal K. Chandran.';
        break;
    }
    setNewNotif({
      ...newNotif,
      type,
      title,
      message,
    });
  };

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/notifications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...newNotif,
          target_student_id: newNotif.target_student_id || null,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setIsModalOpen(false);
        loadNotifs();
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex-1 flex flex-col">
      <AdminHeader
        title="Notifications Center"
        subtitle="Broadcast announcements, dispatch fee alerts, and alert students regarding attendance requirements."
      />

      <main className="p-6 sm:p-8 space-y-6 flex-1">
        {/* Top Dispatch Button */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-serif text-xl font-bold text-kalari-white text-gold-gradient">
              Active Alerts & Broadcasts
            </h2>
            <p className="text-xs text-kalari-beige/70">
              System alerts delivered instantly to Student Portals
            </p>
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="px-5 py-2.5 rounded-lg gold-gradient-bg text-kalari-black font-serif font-bold text-xs uppercase tracking-wider shadow-gold hover:brightness-110 flex items-center gap-2 transition-all"
          >
            <Send className="w-4 h-4" />
            <span>Send New Notification</span>
          </button>
        </div>

        {/* Notifications Roster */}
        <div className="space-y-4">
          {notifications.map((n) => (
            <div
              key={n.id}
              className="p-5 rounded-xl bg-kalari-darkBrown/80 border border-kalari-gold/25 shadow-gold flex items-start justify-between gap-4 group hover:border-kalari-gold transition-all"
            >
              <div className="flex items-start gap-4">
                <div className="p-2.5 rounded-lg bg-kalari-black border border-kalari-gold/30 text-kalari-gold shrink-0">
                  {n.type === 'fee' ? (
                    <CreditCard className="w-5 h-5 text-amber-400" />
                  ) : n.type === 'attendance' ? (
                    <AlertTriangle className="w-5 h-5 text-red-400" />
                  ) : n.type === 'class' ? (
                    <Calendar className="w-5 h-5 text-kalari-gold" />
                  ) : (
                    <Sparkles className="w-5 h-5 text-kalari-goldLight" />
                  )}
                </div>

                <div>
                  <div className="flex items-center gap-3">
                    <h3 className="font-serif font-bold text-sm text-kalari-white">
                      {n.title}
                    </h3>
                    <span className="px-2 py-0.5 rounded text-[10px] font-serif uppercase tracking-widest bg-kalari-black text-kalari-gold border border-kalari-gold/20">
                      {n.type}
                    </span>
                    <span className="text-[11px] text-kalari-beige/50">
                      {new Date(n.date).toLocaleDateString('en-IN', {
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </span>
                  </div>

                  <p className="text-xs text-kalari-beige/80 mt-1.5 leading-relaxed font-light">
                    {n.message}
                  </p>

                  <div className="mt-2 text-[11px] text-kalari-gold font-medium">
                    Target:{' '}
                    {n.target_student_id ? (
                      <span className="font-mono text-kalari-white">
                        Student {n.target_student_id}
                      </span>
                    ) : (
                      <span className="text-emerald-400">All Students (Broadcast)</span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="relative w-full max-w-lg bg-kalari-black border-2 border-kalari-gold rounded-2xl shadow-gold-lg overflow-hidden my-8 text-kalari-white">
            <div className="px-6 py-4 bg-kalari-darkBrown border-b border-kalari-gold/30 flex items-center justify-between">
              <h3 className="font-serif text-lg font-bold text-kalari-gold uppercase tracking-wider">
                Dispatch Notification
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-kalari-beige hover:text-kalari-gold"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSend} className="p-6 space-y-4 text-xs">
              <div>
                <label className="block text-kalari-gold uppercase tracking-wider mb-2 font-semibold">
                  Notification Type Preset
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { type: 'class', label: 'Class Reminder' },
                    { type: 'fee', label: 'Fee Reminder' },
                    { type: 'attendance', label: 'Attendance Alert (<75%)' },
                    { type: 'event', label: 'Special Event' },
                  ].map((preset) => (
                    <button
                      key={preset.type}
                      type="button"
                      onClick={() =>
                        handleTypeSelect(preset.type as 'fee' | 'attendance' | 'class' | 'event')
                      }
                      className={`p-2 rounded text-left border text-xs transition-all ${
                        newNotif.type === preset.type
                          ? 'bg-kalari-gold text-kalari-black font-bold border-kalari-gold'
                          : 'bg-kalari-darkBrown border-kalari-earth text-kalari-beige/80 hover:text-kalari-gold'
                      }`}
                    >
                      {preset.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-kalari-gold uppercase tracking-wider mb-1 font-semibold">
                  Notification Title *
                </label>
                <input
                  type="text"
                  required
                  value={newNotif.title}
                  onChange={(e) => setNewNotif({ ...newNotif, title: e.target.value })}
                  className="w-full px-3 py-2 rounded bg-kalari-darkBrown border border-kalari-earth focus:border-kalari-gold text-kalari-white text-xs focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-kalari-gold uppercase tracking-wider mb-1 font-semibold">
                  Target Recipient
                </label>
                <select
                  value={newNotif.target_student_id}
                  onChange={(e) =>
                    setNewNotif({ ...newNotif, target_student_id: e.target.value })
                  }
                  className="w-full px-3 py-2 rounded bg-kalari-darkBrown border border-kalari-earth focus:border-kalari-gold text-kalari-white text-xs focus:outline-none"
                >
                  <option value="">Broadcast to All Students</option>
                  {students.map((s) => (
                    <option key={s.id} value={s.student_id}>
                      {s.name} ({s.student_id})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-kalari-gold uppercase tracking-wider mb-1 font-semibold">
                  Notification Message *
                </label>
                <textarea
                  rows={3}
                  required
                  value={newNotif.message}
                  onChange={(e) => setNewNotif({ ...newNotif, message: e.target.value })}
                  className="w-full px-3 py-2 rounded bg-kalari-darkBrown border border-kalari-earth focus:border-kalari-gold text-kalari-white text-xs focus:outline-none"
                />
              </div>

              <div className="pt-4 border-t border-kalari-gold/20 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded bg-kalari-darkBrown text-kalari-beige hover:text-kalari-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded gold-gradient-bg text-kalari-black font-serif font-bold uppercase tracking-wider shadow-gold"
                >
                  Dispatch Alert
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
