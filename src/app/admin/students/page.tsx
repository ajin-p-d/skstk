'use client';

import React, { useState, useEffect } from 'react';
import AdminHeader from '@/components/admin/AdminHeader';
import { Student, TrainingLevel, StudentStatus } from '@/types';
import {
  Search,
  Plus,
  Filter,
  User,
  Phone,
  Calendar,
  Shield,
  Edit2,
  Trash2,
  CheckCircle,
  XCircle,
  Clock,
  X,
  Eye,
  Sparkles,
} from 'lucide-react';

export default function StudentsManagementPage() {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [levelFilter, setLevelFilter] = useState('');
  const [batchFilter, setBatchFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  // Modals state
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [viewProfileStudent, setViewProfileStudent] = useState<Student | null>(null);

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    parent_name: '',
    parent_phone: '',
    date_of_birth: '2005-01-01',
    age: 21,
    gender: 'Male' as 'Male' | 'Female' | 'Other',
    address: 'Kannur, Kerala',
    joining_date: '2026-09-11',
    batch_id: 'batch-evening',
    training_level: 'Beginner' as TrainingLevel,
    status: 'active' as StudentStatus,
    blood_group: 'O+ve',
    emergency_notes: '',
  });

  const fetchStudents = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/students');
      const data = await res.json();
      if (data.success && Array.isArray(data.data)) {
        setStudents(data.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const handleAddSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/students', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success) {
        setIsAddModalOpen(false);
        fetchStudents();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedStudent) return;
    try {
      const res = await fetch(`/api/students/${selectedStudent.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success) {
        setIsEditModalOpen(false);
        setSelectedStudent(null);
        fetchStudents();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const toggleStatus = async (student: Student) => {
    const newStatus: StudentStatus = student.status === 'active' ? 'inactive' : 'active';
    try {
      await fetch(`/api/students/${student.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      fetchStudents();
    } catch (err) {
      console.error(err);
    }
  };

  const openEditModal = (student: Student) => {
    setSelectedStudent(student);
    setFormData({
      name: student.name,
      phone: student.phone,
      parent_name: student.parent_name,
      parent_phone: student.parent_phone,
      date_of_birth: student.date_of_birth,
      age: student.age,
      gender: student.gender,
      address: student.address,
      joining_date: student.joining_date,
      batch_id: student.batch_id,
      training_level: student.training_level,
      status: student.status,
      blood_group: student.blood_group || 'O+ve',
      emergency_notes: student.emergency_notes || '',
    });
    setIsEditModalOpen(true);
  };

  const filteredStudents = students.filter((s) => {
    const matchesSearch =
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.student_id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.phone.includes(searchQuery);

    const matchesLevel = !levelFilter || s.training_level === levelFilter;
    const matchesBatch = !batchFilter || s.batch_id === batchFilter;
    const matchesStatus = !statusFilter || s.status === statusFilter;

    return matchesSearch && matchesLevel && matchesBatch && matchesStatus;
  });

  return (
    <div className="flex-1 flex flex-col">
      <AdminHeader
        title="Student Management"
        subtitle="Manage student profiles, registrations, martial progression, and batch assignments."
      />

      <main className="p-6 sm:p-8 space-y-6 flex-1">
        {/* Controls Bar: Search, Filters, Add Student Button */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          {/* Search Box */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-kalari-gold absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by student name, ID (e.g. KAL-2026-001), or phone..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-kalari-darkBrown border border-kalari-gold/25 focus:border-kalari-gold text-xs text-kalari-white placeholder:text-kalari-beige/50 focus:outline-none focus:ring-1 focus:ring-kalari-gold transition-all"
            />
          </div>

          {/* Filters & Actions */}
          <div className="flex flex-wrap items-center gap-3">
            <select
              value={levelFilter}
              onChange={(e) => setLevelFilter(e.target.value)}
              className="px-3 py-2 rounded-lg bg-kalari-darkBrown border border-kalari-gold/25 text-xs text-kalari-beige focus:outline-none focus:border-kalari-gold"
            >
              <option value="">All Levels</option>
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>

            <select
              value={batchFilter}
              onChange={(e) => setBatchFilter(e.target.value)}
              className="px-3 py-2 rounded-lg bg-kalari-darkBrown border border-kalari-gold/25 text-xs text-kalari-beige focus:outline-none focus:border-kalari-gold"
            >
              <option value="">All Batches</option>
              <option value="batch-morning">Morning Batch</option>
              <option value="batch-evening">Evening Batch</option>
              <option value="batch-weekend">Weekend Batch</option>
            </select>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 rounded-lg bg-kalari-darkBrown border border-kalari-gold/25 text-xs text-kalari-beige focus:outline-none focus:border-kalari-gold"
            >
              <option value="">All Statuses</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>

            <button
              onClick={() => {
                setFormData({
                  name: '',
                  phone: '',
                  parent_name: '',
                  parent_phone: '',
                  date_of_birth: '2005-01-01',
                  age: 21,
                  gender: 'Male',
                  address: 'Kannur, Kerala',
                  joining_date: '2026-09-11',
                  batch_id: 'batch-evening',
                  training_level: 'Beginner',
                  status: 'active',
                  blood_group: 'O+ve',
                  emergency_notes: '',
                });
                setIsAddModalOpen(true);
              }}
              className="px-4 py-2 rounded-lg gold-gradient-bg text-kalari-black font-serif font-bold text-xs uppercase tracking-wider shadow-gold hover:brightness-110 transition-all flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" />
              <span>Register Student</span>
            </button>
          </div>
        </div>

        {/* Student Roster Table */}
        <div className="rounded-2xl border border-kalari-gold/25 bg-kalari-darkBrown/80 shadow-gold overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-kalari-gold/30 bg-kalari-black/70 font-serif uppercase tracking-wider text-kalari-gold">
                  <th className="py-4 px-5">Student</th>
                  <th className="py-4 px-5">Student ID</th>
                  <th className="py-4 px-5">Batch</th>
                  <th className="py-4 px-5">Level</th>
                  <th className="py-4 px-5">Parent Contact</th>
                  <th className="py-4 px-5">Status</th>
                  <th className="py-4 px-5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-kalari-gold/15">
                {filteredStudents.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="py-8 text-center text-kalari-beige/60">
                      No students found matching current filters.
                    </td>
                  </tr>
                ) : (
                  filteredStudents.map((s) => (
                    <tr
                      key={s.id}
                      className="hover:bg-kalari-black/40 transition-colors group"
                    >
                      <td className="py-4 px-5">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-full bg-kalari-black border border-kalari-gold/40 text-kalari-gold font-serif font-bold flex items-center justify-center text-xs shrink-0 shadow-gold">
                            {s.name.substring(0, 2).toUpperCase()}
                          </div>
                          <div>
                            <span className="font-serif font-bold text-kalari-white text-sm block group-hover:text-kalari-gold transition-colors">
                              {s.name}
                            </span>
                            <span className="text-[11px] text-kalari-beige/70 block">
                              {s.phone}
                            </span>
                          </div>
                        </div>
                      </td>

                      <td className="py-4 px-5 font-mono font-semibold text-kalari-gold">
                        {s.student_id}
                      </td>

                      <td className="py-4 px-5 text-kalari-beige/90">
                        {s.batch_id === 'batch-morning'
                          ? 'Morning (6:00 AM)'
                          : s.batch_id === 'batch-evening'
                          ? 'Evening (5:00 PM)'
                          : 'Weekend Special'}
                      </td>

                      <td className="py-4 px-5">
                        <span
                          className={`px-2.5 py-1 rounded-full text-[10px] font-serif uppercase tracking-wider font-semibold border ${
                            s.training_level === 'Advanced'
                              ? 'bg-kalari-earth/40 text-kalari-gold border-kalari-gold/40'
                              : s.training_level === 'Intermediate'
                              ? 'bg-kalari-darkBrown text-kalari-goldLight border-kalari-gold/30'
                              : 'bg-kalari-black text-kalari-beige border-kalari-earth/50'
                          }`}
                        >
                          {s.training_level}
                        </span>
                      </td>

                      <td className="py-4 px-5 text-kalari-beige/80">
                        <div>{s.parent_name}</div>
                        <div className="text-[10px] text-kalari-beige/50">{s.parent_phone}</div>
                      </td>

                      <td className="py-4 px-5">
                        <button
                          onClick={() => toggleStatus(s)}
                          className={`px-2.5 py-1 rounded-full text-[10px] font-medium tracking-wide flex items-center gap-1 ${
                            s.status === 'active'
                              ? 'bg-emerald-950/60 text-emerald-300 border border-emerald-800/60 hover:bg-emerald-900/60'
                              : 'bg-red-950/60 text-red-300 border border-red-800/60 hover:bg-red-900/60'
                          }`}
                        >
                          {s.status === 'active' ? (
                            <>
                              <CheckCircle className="w-3 h-3 text-emerald-400" />
                              <span>Active</span>
                            </>
                          ) : (
                            <>
                              <XCircle className="w-3 h-3 text-red-400" />
                              <span>Inactive</span>
                            </>
                          )}
                        </button>
                      </td>

                      <td className="py-4 px-5 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => setViewProfileStudent(s)}
                            className="p-1.5 rounded bg-kalari-black/60 border border-kalari-gold/20 text-kalari-gold hover:bg-kalari-gold hover:text-kalari-black transition-all"
                            title="View Full Profile"
                          >
                            <Eye className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => openEditModal(s)}
                            className="p-1.5 rounded bg-kalari-black/60 border border-kalari-gold/20 text-kalari-beige hover:text-kalari-gold transition-all"
                            title="Edit Student"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {/* Add Student Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="relative w-full max-w-2xl bg-kalari-black border-2 border-kalari-gold rounded-2xl shadow-gold-lg overflow-hidden my-8">
            <div className="px-6 py-4 bg-kalari-darkBrown border-b border-kalari-gold/30 flex items-center justify-between">
              <h3 className="font-serif text-lg font-bold text-kalari-gold uppercase tracking-wider">
                Register New Student
              </h3>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="text-kalari-beige hover:text-kalari-gold"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddSubmit} className="p-6 space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-kalari-gold uppercase tracking-wider mb-1">Student Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3 py-2 rounded bg-kalari-darkBrown border border-kalari-earth focus:border-kalari-gold text-kalari-white text-xs focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-kalari-gold uppercase tracking-wider mb-1">Student Phone *</label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3 py-2 rounded bg-kalari-darkBrown border border-kalari-earth focus:border-kalari-gold text-kalari-white text-xs focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-kalari-gold uppercase tracking-wider mb-1">Parent / Guardian Name</label>
                  <input
                    type="text"
                    value={formData.parent_name}
                    onChange={(e) => setFormData({ ...formData, parent_name: e.target.value })}
                    className="w-full px-3 py-2 rounded bg-kalari-darkBrown border border-kalari-earth focus:border-kalari-gold text-kalari-white text-xs focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-kalari-gold uppercase tracking-wider mb-1">Parent Phone</label>
                  <input
                    type="tel"
                    value={formData.parent_phone}
                    onChange={(e) => setFormData({ ...formData, parent_phone: e.target.value })}
                    className="w-full px-3 py-2 rounded bg-kalari-darkBrown border border-kalari-earth focus:border-kalari-gold text-kalari-white text-xs focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-kalari-gold uppercase tracking-wider mb-1">Training Level</label>
                  <select
                    value={formData.training_level}
                    onChange={(e) => setFormData({ ...formData, training_level: e.target.value as TrainingLevel })}
                    className="w-full px-3 py-2 rounded bg-kalari-darkBrown border border-kalari-earth focus:border-kalari-gold text-kalari-white text-xs focus:outline-none"
                  >
                    <option value="Beginner">Beginner (Meipayattu)</option>
                    <option value="Intermediate">Intermediate (Kolthari)</option>
                    <option value="Advanced">Advanced (Angathari & Marma)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-kalari-gold uppercase tracking-wider mb-1">Assigned Batch</label>
                  <select
                    value={formData.batch_id}
                    onChange={(e) => setFormData({ ...formData, batch_id: e.target.value })}
                    className="w-full px-3 py-2 rounded bg-kalari-darkBrown border border-kalari-earth focus:border-kalari-gold text-kalari-white text-xs focus:outline-none"
                  >
                    <option value="batch-morning">Morning (6:00 AM – 7:30 AM)</option>
                    <option value="batch-evening">Evening (5:00 PM – 7:00 PM)</option>
                    <option value="batch-weekend">Weekend Intensive</option>
                  </select>
                </div>

                <div>
                  <label className="block text-kalari-gold uppercase tracking-wider mb-1">Blood Group</label>
                  <input
                    type="text"
                    value={formData.blood_group}
                    onChange={(e) => setFormData({ ...formData, blood_group: e.target.value })}
                    placeholder="e.g. O+ve"
                    className="w-full px-3 py-2 rounded bg-kalari-darkBrown border border-kalari-earth focus:border-kalari-gold text-kalari-white text-xs focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-kalari-gold uppercase tracking-wider mb-1">Residential Address</label>
                <input
                  type="text"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full px-3 py-2 rounded bg-kalari-darkBrown border border-kalari-earth focus:border-kalari-gold text-kalari-white text-xs focus:outline-none"
                />
              </div>

              <div className="pt-4 border-t border-kalari-gold/20 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 rounded bg-kalari-darkBrown text-kalari-beige hover:text-kalari-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded gold-gradient-bg text-kalari-black font-serif font-bold uppercase tracking-wider shadow-gold"
                >
                  Complete Registration
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Student Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="relative w-full max-w-2xl bg-kalari-black border-2 border-kalari-gold rounded-2xl shadow-gold-lg overflow-hidden my-8">
            <div className="px-6 py-4 bg-kalari-darkBrown border-b border-kalari-gold/30 flex items-center justify-between">
              <h3 className="font-serif text-lg font-bold text-kalari-gold uppercase tracking-wider">
                Edit Student Details: {selectedStudent?.student_id}
              </h3>
              <button
                onClick={() => setIsEditModalOpen(false)}
                className="text-kalari-beige hover:text-kalari-gold"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleEditSubmit} className="p-6 space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-kalari-gold uppercase tracking-wider mb-1">Student Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3 py-2 rounded bg-kalari-darkBrown border border-kalari-earth text-kalari-white text-xs"
                  />
                </div>
                <div>
                  <label className="block text-kalari-gold uppercase tracking-wider mb-1">Phone</label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3 py-2 rounded bg-kalari-darkBrown border border-kalari-earth text-kalari-white text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-kalari-gold uppercase tracking-wider mb-1">Parent Name</label>
                  <input
                    type="text"
                    value={formData.parent_name}
                    onChange={(e) => setFormData({ ...formData, parent_name: e.target.value })}
                    className="w-full px-3 py-2 rounded bg-kalari-darkBrown border border-kalari-earth text-kalari-white text-xs"
                  />
                </div>
                <div>
                  <label className="block text-kalari-gold uppercase tracking-wider mb-1">Parent Phone</label>
                  <input
                    type="tel"
                    value={formData.parent_phone}
                    onChange={(e) => setFormData({ ...formData, parent_phone: e.target.value })}
                    className="w-full px-3 py-2 rounded bg-kalari-darkBrown border border-kalari-earth text-kalari-white text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-kalari-gold uppercase tracking-wider mb-1">Training Level</label>
                  <select
                    value={formData.training_level}
                    onChange={(e) => setFormData({ ...formData, training_level: e.target.value as TrainingLevel })}
                    className="w-full px-3 py-2 rounded bg-kalari-darkBrown border border-kalari-earth text-kalari-white text-xs"
                  >
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                  </select>
                </div>

                <div>
                  <label className="block text-kalari-gold uppercase tracking-wider mb-1">Assigned Batch</label>
                  <select
                    value={formData.batch_id}
                    onChange={(e) => setFormData({ ...formData, batch_id: e.target.value })}
                    className="w-full px-3 py-2 rounded bg-kalari-darkBrown border border-kalari-earth text-kalari-white text-xs"
                  >
                    <option value="batch-morning">Morning Batch</option>
                    <option value="batch-evening">Evening Batch</option>
                    <option value="batch-weekend">Weekend Batch</option>
                  </select>
                </div>

                <div>
                  <label className="block text-kalari-gold uppercase tracking-wider mb-1">Status</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value as StudentStatus })}
                    className="w-full px-3 py-2 rounded bg-kalari-darkBrown border border-kalari-earth text-kalari-white text-xs"
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                    <option value="on_leave">On Leave</option>
                  </select>
                </div>
              </div>

              <div className="pt-4 border-t border-kalari-gold/20 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="px-4 py-2 rounded bg-kalari-darkBrown text-kalari-beige hover:text-kalari-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded gold-gradient-bg text-kalari-black font-serif font-bold uppercase tracking-wider shadow-gold"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* View Full Profile Drawer/Modal */}
      {viewProfileStudent && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="relative w-full max-w-lg bg-kalari-darkBrown border-2 border-kalari-gold rounded-2xl shadow-gold-lg overflow-hidden text-kalari-white">
            <div className="p-6 bg-kalari-black border-b border-kalari-gold/30 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-kalari-gold text-kalari-black font-serif font-black flex items-center justify-center text-base shadow-gold">
                  {viewProfileStudent.name.substring(0, 2).toUpperCase()}
                </div>
                <div>
                  <h3 className="font-serif text-xl font-bold text-kalari-white text-gold-gradient">
                    {viewProfileStudent.name}
                  </h3>
                  <span className="font-mono text-xs text-kalari-gold font-bold">
                    {viewProfileStudent.student_id}
                  </span>
                </div>
              </div>
              <button
                onClick={() => setViewProfileStudent(null)}
                className="p-1 rounded-full text-kalari-beige hover:text-kalari-gold"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3 p-3 rounded-lg bg-kalari-black/50 border border-kalari-earth/40">
                <div>
                  <span className="text-kalari-gold uppercase font-serif tracking-wider block text-[10px]">
                    Training Level
                  </span>
                  <span className="font-bold text-kalari-white">{viewProfileStudent.training_level}</span>
                </div>
                <div>
                  <span className="text-kalari-gold uppercase font-serif tracking-wider block text-[10px]">
                    Assigned Batch
                  </span>
                  <span className="font-bold text-kalari-white">{viewProfileStudent.batch_id}</span>
                </div>
                <div>
                  <span className="text-kalari-gold uppercase font-serif tracking-wider block text-[10px]">
                    Joining Date
                  </span>
                  <span className="font-mono text-kalari-beige">{viewProfileStudent.joining_date}</span>
                </div>
                <div>
                  <span className="text-kalari-gold uppercase font-serif tracking-wider block text-[10px]">
                    Blood Group
                  </span>
                  <span className="font-mono text-kalari-beige">{viewProfileStudent.blood_group || 'O+ve'}</span>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between py-1 border-b border-kalari-earth/30">
                  <span className="text-kalari-beige/70">Phone Number:</span>
                  <span className="text-kalari-white font-medium">{viewProfileStudent.phone}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-kalari-earth/30">
                  <span className="text-kalari-beige/70">Parent / Guardian:</span>
                  <span className="text-kalari-white font-medium">{viewProfileStudent.parent_name}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-kalari-earth/30">
                  <span className="text-kalari-beige/70">Parent Phone:</span>
                  <span className="text-kalari-white font-medium">{viewProfileStudent.parent_phone}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-kalari-earth/30">
                  <span className="text-kalari-beige/70">Address:</span>
                  <span className="text-kalari-white font-medium">{viewProfileStudent.address}</span>
                </div>
              </div>

              {viewProfileStudent.emergency_notes && (
                <div className="p-3 rounded bg-kalari-black/40 border border-kalari-gold/20 text-kalari-beige/90">
                  <span className="text-kalari-gold font-semibold block mb-0.5">Instructor Notes:</span>
                  <p>{viewProfileStudent.emergency_notes}</p>
                </div>
              )}
            </div>

            <div className="p-4 bg-kalari-black border-t border-kalari-gold/20 flex justify-end">
              <button
                onClick={() => setViewProfileStudent(null)}
                className="px-4 py-1.5 rounded bg-kalari-darkBrown border border-kalari-gold/40 text-kalari-gold text-xs font-serif uppercase tracking-wider"
              >
                Close Profile
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
