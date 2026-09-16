'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import AdminHeader from '@/components/admin/AdminHeader';
import { Instructor } from '@/types';
import {
  Award,
  Plus,
  Edit2,
  Trash2,
  Quote,
  Shield,
  Sparkles,
  Upload,
  Check,
  X,
  AlertCircle,
  Eye,
  RefreshCw,
  ExternalLink,
  ChevronRight,
} from 'lucide-react';
import Link from 'next/link';

// Preset images available in public folder
const PRESET_IMAGES = [
  { label: 'E S Kalesh Gurukkal', path: '/images/KALESH.jpg' },
  { label: 'Traditional Weapons 1', path: '/images/gallery-1.png' },
  { label: 'Arena Master 2', path: '/images/gallery-2.png' },
  { label: 'Chikitsa Specialist 3', path: '/images/gallery-3.png' },
  { label: 'Thulunadan Arena 1', path: '/images/thulunadan1.png' },
  { label: 'Thulunadan Arena 2', path: '/images/thulunadan2.png' },
];

export default function MastersManagementPage() {
  const [masters, setMasters] = useState<Instructor[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Modals state
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [deleteConfirmMaster, setDeleteConfirmMaster] = useState<Instructor | null>(null);
  const [selectedMaster, setSelectedMaster] = useState<Instructor | null>(null);

  // Form state
  const [formData, setFormData] = useState<{
    name: string;
    designation: string;
    experience: string;
    specialization: string[];
    quote: string;
    image: string;
    bio: string;
  }>({
    name: '',
    designation: '',
    experience: '',
    specialization: [],
    quote: '',
    image: '/images/KALESH.jpg',
    bio: '',
  });

  const [tagInput, setTagInput] = useState('');
  const [previewMode, setPreviewMode] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const fetchMasters = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/masters');
      const data = await res.json();
      if (data.success && Array.isArray(data.data)) {
        setMasters(data.data);
        try {
          localStorage.setItem('kalari_masters', JSON.stringify(data.data));
          window.dispatchEvent(new Event('mastersUpdated'));
        } catch (e) {}
      } else {
        setMessage({ type: 'error', text: data.error || 'Failed to load masters' });
      }
    } catch (err: any) {
      setMessage({ type: 'error', text: err.message || 'Error fetching masters' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMasters();
  }, []);

  const showNotification = (type: 'success' | 'error', text: string) => {
    setMessage({ type, text });
    setTimeout(() => {
      setMessage(null);
    }, 4000);
  };

  const openEditModal = (master: Instructor) => {
    setSelectedMaster(master);
    setFormData({
      name: master.name,
      designation: master.designation,
      experience: master.experience,
      specialization: [...master.specialization],
      quote: master.quote,
      image: master.image,
      bio: master.bio,
    });
    setTagInput('');
    setPreviewMode(false);
    setIsEditModalOpen(true);
  };

  const openAddModal = () => {
    setSelectedMaster(null);
    setFormData({
      name: '',
      designation: 'Senior Kalari Instructor',
      experience: '10+ Years of Experience',
      specialization: ['Meipayattu', 'Kolthari', 'Verumkai'],
      quote: 'Discipline in training creates unbreakable spirit.',
      image: '/images/KALESH.jpg',
      bio: '',
    });
    setTagInput('');
    setPreviewMode(false);
    setIsAddModalOpen(true);
  };

  const handleAddTag = () => {
    const trimmed = tagInput.trim();
    if (trimmed && !formData.specialization.includes(trimmed)) {
      setFormData((prev) => ({
        ...prev,
        specialization: [...prev.specialization, trimmed],
      }));
      setTagInput('');
    }
  };

  const handleRemoveTag = (indexToRemove: number) => {
    setFormData((prev) => ({
      ...prev,
      specialization: prev.specialization.filter((_, i) => i !== indexToRemove),
    }));
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploadingImage(true);
      const data = new FormData();
      data.append('file', file);

      const res = await fetch('/api/upload', {
        method: 'POST',
        body: data,
      });
      const result = await res.json();
      if (result.success && result.url) {
        setFormData((prev) => ({ ...prev, image: result.url }));
        showNotification('success', 'Photo uploaded successfully!');
      } else {
        showNotification('error', result.error || 'Failed to upload photo');
      }
    } catch (err: any) {
      showNotification('error', err.message || 'Upload error');
    } finally {
      setUploadingImage(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedMaster) return;

    if (!formData.name.trim() || !formData.designation.trim()) {
      showNotification('error', 'Master name and designation are required.');
      return;
    }

    try {
      setActionLoading(true);
      const res = await fetch(`/api/masters/${selectedMaster.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success) {
        showNotification('success', `Master "${formData.name}" updated successfully!`);
        setIsEditModalOpen(false);
        fetchMasters();
      } else {
        showNotification('error', data.error || 'Failed to update master');
      }
    } catch (err: any) {
      showNotification('error', err.message || 'Network error updating master');
    } finally {
      setActionLoading(false);
    }
  };

  const handleAddSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.designation.trim()) {
      showNotification('error', 'Master name and designation are required.');
      return;
    }

    try {
      setActionLoading(true);
      const res = await fetch('/api/masters', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success) {
        showNotification('success', `Master "${formData.name}" added successfully!`);
        setIsAddModalOpen(false);
        fetchMasters();
      } else {
        showNotification('error', data.error || 'Failed to create master');
      }
    } catch (err: any) {
      showNotification('error', err.message || 'Network error adding master');
    } finally {
      setActionLoading(false);
    }
  };

  const handleDelete = async (master: Instructor) => {
    if (masters.length <= 1) {
      showNotification('error', 'Cannot delete the only remaining master.');
      setDeleteConfirmMaster(null);
      return;
    }

    try {
      setActionLoading(true);
      const res = await fetch(`/api/masters/${master.id}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (data.success) {
        showNotification('success', `Master "${master.name}" removed successfully.`);
        setDeleteConfirmMaster(null);
        fetchMasters();
      } else {
        showNotification('error', data.error || 'Failed to delete master');
      }
    } catch (err: any) {
      showNotification('error', err.message || 'Network error deleting master');
    } finally {
      setActionLoading(false);
    }
  };

  return (
    <div className="flex-1 flex flex-col min-h-screen">
      <AdminHeader
        title="Masters & Instructors"
        subtitle="Manage Gurukkals, lineage titles, years of experience, photos, and training philosophies."
      />

      <main className="p-4 sm:p-8 space-y-8 flex-1 max-w-7xl w-full mx-auto">
        {/* Notification Banner */}
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
                <Check className="w-5 h-5 text-emerald-400 shrink-0" />
              ) : (
                <AlertCircle className="w-5 h-5 text-red-400 shrink-0" />
              )}
              <span>{message.text}</span>
            </div>
            <button
              onClick={() => setMessage(null)}
              className="p-1 hover:bg-white/10 rounded-lg"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Top Summary & Action Bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-6 rounded-2xl bg-gradient-to-r from-kalari-darkBrown to-kalari-black border border-kalari-gold/30 shadow-gold">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-kalari-gold">
              <Award className="w-5 h-5" />
              <span className="font-serif text-xs uppercase tracking-widest font-bold">
                Lineage Council
              </span>
            </div>
            <h2 className="font-serif text-2xl font-bold text-kalari-white text-gold-gradient">
              Gurukkal Lineage & Master Profiles
            </h2>
            <p className="text-xs text-kalari-beige/70 font-light">
              Updates made here instantly sync with the public website's{' '}
              <span className="text-kalari-gold font-medium">Masters & Instructors</span>{' '}
              showcase.
            </p>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <Link
              href="/#masters"
              target="_blank"
              className="flex-1 sm:flex-initial px-4 py-2.5 rounded-lg bg-kalari-darkBrown border border-kalari-gold/30 hover:border-kalari-gold text-kalari-beige hover:text-kalari-gold text-xs font-serif uppercase tracking-wider transition-all flex items-center justify-center gap-1.5"
            >
              <ExternalLink className="w-4 h-4" />
              <span>View Public Page</span>
            </Link>

            <button
              onClick={openAddModal}
              className="flex-1 sm:flex-initial px-4 py-2.5 rounded-lg bg-kalari-gold text-kalari-black font-serif font-bold text-xs uppercase tracking-wider shadow-gold hover:bg-kalari-goldLight transition-all flex items-center justify-center gap-1.5"
            >
              <Plus className="w-4 h-4" />
              <span>Add New Master</span>
            </button>
          </div>
        </div>

        {/* Masters Grid */}
        {loading ? (
          <div className="py-20 flex flex-col items-center justify-center text-kalari-gold gap-3">
            <RefreshCw className="w-8 h-8 animate-spin" />
            <span className="text-xs font-serif uppercase tracking-widest">
              Loading Lineage Records...
            </span>
          </div>
        ) : masters.length === 0 ? (
          <div className="p-12 text-center rounded-2xl bg-kalari-darkBrown/60 border border-kalari-gold/20 space-y-4">
            <Shield className="w-12 h-12 text-kalari-gold/50 mx-auto" />
            <h3 className="font-serif text-lg font-bold text-kalari-white">No Masters Found</h3>
            <p className="text-xs text-kalari-beige/70 max-w-md mx-auto">
              Initialize your masters directory by adding the chief Gurukkal or importing seed data.
            </p>
            <button
              onClick={openAddModal}
              className="px-5 py-2.5 rounded-lg bg-kalari-gold text-kalari-black font-serif font-bold text-xs uppercase tracking-wider inline-flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              <span>Add First Master</span>
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {masters.map((master, idx) => (
              <div
                key={master.id}
                className="rounded-2xl bg-kalari-darkBrown/90 border border-kalari-gold/30 hover:border-kalari-gold shadow-gold overflow-hidden flex flex-col justify-between group transition-all duration-300"
              >
                {/* Master Card Header Image */}
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-kalari-black">
                  <Image
                    src={master.image || '/images/KALESH.jpg'}
                    alt={master.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover object-top filter brightness-90 group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      // Fallback if image path is broken
                      const target = e.target as HTMLImageElement;
                      target.src = '/images/kalari-logo.png';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-kalari-darkBrown via-transparent to-transparent" />

                  {/* Experience Badge */}
                  <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-kalari-black/85 border border-kalari-gold/50 text-kalari-gold text-xs font-semibold tracking-wider uppercase backdrop-blur shadow-md">
                    {master.experience}
                  </div>

                  {/* Order Number Badge */}
                  <div className="absolute top-3 left-3 w-7 h-7 rounded-full bg-kalari-gold text-kalari-black font-serif font-black text-xs flex items-center justify-center shadow-gold">
                    {idx + 1}
                  </div>
                </div>

                {/* Master Details */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <h3 className="font-serif text-xl font-bold text-kalari-white tracking-wide text-gold-gradient group-hover:text-kalari-gold transition-colors">
                      {master.name}
                    </h3>
                    <span className="text-xs font-semibold text-kalari-gold tracking-widest uppercase block">
                      {master.designation}
                    </span>
                    <p className="text-xs text-kalari-beige/75 font-light leading-relaxed line-clamp-3">
                      {master.bio || 'No biography recorded.'}
                    </p>
                  </div>

                  {/* Specializations */}
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-kalari-beige/60 block mb-2">
                      Specializations ({master.specialization.length}):
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {master.specialization.map((spec, sIdx) => (
                        <span
                          key={sIdx}
                          className="px-2.5 py-0.5 rounded-full bg-kalari-black/70 border border-kalari-gold/30 text-[11px] text-kalari-goldLight font-medium"
                        >
                          {spec}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Quote */}
                  {master.quote && (
                    <div className="pt-3 border-t border-kalari-gold/20 flex items-start gap-2">
                      <Quote className="w-3.5 h-3.5 text-kalari-gold/60 shrink-0 mt-0.5" />
                      <p className="italic font-serif text-xs text-kalari-goldLight line-clamp-2">
                        "{master.quote}"
                      </p>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="pt-4 border-t border-kalari-earth/40 flex items-center gap-2">
                    <button
                      onClick={() => openEditModal(master)}
                      className="flex-1 py-2.5 px-3 rounded-lg bg-kalari-gold text-kalari-black font-serif font-bold text-xs uppercase tracking-wider hover:bg-kalari-goldLight shadow-gold transition-all flex items-center justify-center gap-1.5"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                      <span>Edit Master</span>
                    </button>

                    <button
                      onClick={() => setDeleteConfirmMaster(master)}
                      disabled={masters.length <= 1}
                      title={masters.length <= 1 ? 'Cannot delete the only master' : 'Delete Master'}
                      className={`p-2.5 rounded-lg border text-xs transition-all ${
                        masters.length <= 1
                          ? 'border-neutral-700 text-neutral-600 cursor-not-allowed'
                          : 'border-red-500/40 text-red-400 hover:bg-red-950/40 hover:border-red-400'
                      }`}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Edit / Add Modal */}
      {(isEditModalOpen || isAddModalOpen) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
          <div className="relative w-full max-w-3xl bg-kalari-darkBrown border border-kalari-gold/40 rounded-2xl shadow-2xl p-6 sm:p-8 my-8 text-kalari-white max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-kalari-gold/20 pb-4 mb-6">
              <div>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-gold-gradient uppercase tracking-wide">
                  {isEditModalOpen ? `Edit Master: ${formData.name || 'Details'}` : 'Add New Master'}
                </h3>
                <p className="text-xs text-kalari-beige/70 mt-0.5">
                  {isEditModalOpen
                    ? 'Changes will immediately update the public landing page.'
                    : 'Fill in the details to add a new Gurukkal or Asan to the public lineage.'}
                </p>
              </div>
              <button
                onClick={() => {
                  setIsEditModalOpen(false);
                  setIsAddModalOpen(false);
                }}
                className="p-2 rounded-lg text-kalari-beige hover:text-kalari-gold hover:bg-kalari-black/50"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Toggle Preview Button */}
            <div className="flex items-center justify-end mb-4">
              <button
                type="button"
                onClick={() => setPreviewMode(!previewMode)}
                className="px-3 py-1.5 rounded-lg bg-kalari-black border border-kalari-gold/30 text-kalari-gold hover:bg-kalari-gold hover:text-kalari-black text-xs font-serif uppercase tracking-wider flex items-center gap-1.5 transition-all"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>{previewMode ? 'Back to Editor' : 'Live Card Preview'}</span>
              </button>
            </div>

            {previewMode ? (
              /* Live Preview Box */
              <div className="p-6 rounded-xl bg-kalari-black border border-kalari-gold/30 mb-6 flex flex-col items-center">
                <span className="text-xs text-kalari-gold uppercase tracking-widest font-semibold mb-4">
                  Website Card Preview
                </span>
                <div className="w-full max-w-sm rounded-2xl bg-kalari-darkBrown/90 border border-kalari-gold/30 shadow-gold overflow-hidden flex flex-col">
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-kalari-black">
                    <Image
                      src={formData.image || '/images/KALESH.jpg'}
                      alt={formData.name || 'Master'}
                      fill
                      className="object-cover object-top filter brightness-90"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = '/images/kalari-logo.png';
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-kalari-darkBrown via-transparent to-transparent" />
                    <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-kalari-black/80 border border-kalari-gold/40 text-kalari-gold text-xs font-semibold tracking-wider uppercase backdrop-blur">
                      {formData.experience || 'Experience'}
                    </div>
                  </div>
                  <div className="p-6 space-y-4">
                    <div>
                      <h4 className="font-serif text-xl font-bold text-kalari-white">
                        {formData.name || 'Master Name'}
                      </h4>
                      <span className="text-xs font-medium text-kalari-gold tracking-widest uppercase block mt-1">
                        {formData.designation || 'Designation'}
                      </span>
                      <p className="text-xs text-kalari-beige/70 mt-2 font-light leading-relaxed">
                        {formData.bio || 'Biography preview...'}
                      </p>
                    </div>
                    <div>
                      <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-kalari-beige/60 block mb-1">
                        Specialization:
                      </span>
                      <div className="flex flex-wrap gap-1">
                        {formData.specialization.map((s, i) => (
                          <span
                            key={i}
                            className="px-2 py-0.5 rounded-full bg-kalari-black text-[10px] text-kalari-goldLight border border-kalari-gold/30"
                          >
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>
                    {formData.quote && (
                      <div className="pt-3 border-t border-kalari-gold/20 flex items-start gap-2">
                        <Quote className="w-3.5 h-3.5 text-kalari-gold/60 shrink-0 mt-0.5" />
                        <p className="italic font-serif text-xs text-kalari-goldLight font-medium">
                          "{formData.quote}"
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              /* Editor Form */
              <form onSubmit={isEditModalOpen ? handleEditSubmit : handleAddSubmit} className="space-y-6">
                {/* Row 1: Name & Designation */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-serif uppercase tracking-wider text-kalari-gold mb-1.5">
                      Master Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. E S KALESH"
                      className="w-full px-3.5 py-2.5 rounded-lg bg-kalari-black border border-kalari-gold/30 focus:border-kalari-gold text-kalari-white text-sm outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-serif uppercase tracking-wider text-kalari-gold mb-1.5">
                      Designation / Traditional Title *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.designation}
                      onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
                      placeholder="e.g. Chief Gurukkal & Lineage Holder"
                      className="w-full px-3.5 py-2.5 rounded-lg bg-kalari-black border border-kalari-gold/30 focus:border-kalari-gold text-kalari-white text-sm outline-none transition-colors"
                    />
                  </div>
                </div>

                {/* Row 2: Experience Badge */}
                <div>
                  <label className="block text-xs font-serif uppercase tracking-wider text-kalari-gold mb-1.5">
                    Experience Badge
                  </label>
                  <input
                    type="text"
                    value={formData.experience}
                    onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                    placeholder="e.g. 35+ Years of Experience"
                    className="w-full px-3.5 py-2.5 rounded-lg bg-kalari-black border border-kalari-gold/30 focus:border-kalari-gold text-kalari-white text-sm outline-none transition-colors"
                  />
                  <span className="text-[11px] text-kalari-beige/50 mt-1 block">
                    Displays prominently as the gold badge on the top right of the master's card.
                  </span>
                </div>

                {/* Row 3: Photo / Image Selection */}
                <div className="p-4 rounded-xl bg-kalari-black/60 border border-kalari-gold/20 space-y-3">
                  <label className="block text-xs font-serif uppercase tracking-wider text-kalari-gold">
                    Master Photo
                  </label>

                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                    {/* Thumbnail Preview */}
                    <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-kalari-black border border-kalari-gold/40 shrink-0">
                      <Image
                        src={formData.image || '/images/KALESH.jpg'}
                        alt="Preview"
                        fill
                        className="object-cover object-top"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = '/images/kalari-logo.png';
                        }}
                      />
                    </div>

                    <div className="flex-1 space-y-2 w-full">
                      {/* Upload from Computer */}
                      <div className="flex items-center gap-2">
                        <input
                          ref={fileInputRef}
                          type="file"
                          accept="image/*"
                          onChange={handleFileUpload}
                          className="hidden"
                          id="master-photo-file"
                        />
                        <label
                          htmlFor="master-photo-file"
                          className="cursor-pointer px-3.5 py-2 rounded-lg bg-kalari-gold text-kalari-black text-xs font-serif font-bold uppercase tracking-wider hover:bg-kalari-goldLight transition-all inline-flex items-center gap-1.5"
                        >
                          <Upload className="w-3.5 h-3.5" />
                          <span>{uploadingImage ? 'Uploading...' : 'Upload Photo from Device'}</span>
                        </label>
                      </div>

                      {/* Path input */}
                      <input
                        type="text"
                        value={formData.image}
                        onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                        placeholder="Image URL or public path (e.g. /images/KALESH.jpg)"
                        className="w-full px-3 py-1.5 rounded-lg bg-kalari-black border border-kalari-gold/25 focus:border-kalari-gold text-kalari-white text-xs outline-none"
                      />
                    </div>
                  </div>

                  {/* Preset Selector */}
                  <div>
                    <span className="text-[11px] font-serif uppercase tracking-wider text-kalari-beige/60 block mb-1.5">
                      Or Pick Academy Preset Photo:
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {PRESET_IMAGES.map((preset) => (
                        <button
                          key={preset.path}
                          type="button"
                          onClick={() => setFormData({ ...formData, image: preset.path })}
                          className={`px-2.5 py-1 rounded-md text-[11px] border transition-all ${
                            formData.image === preset.path
                              ? 'bg-kalari-gold text-kalari-black font-semibold border-kalari-gold'
                              : 'bg-kalari-darkBrown/80 text-kalari-beige/80 border-kalari-gold/20 hover:border-kalari-gold/50'
                          }`}
                        >
                          {preset.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Row 4: Specializations (Tag Manager) */}
                <div>
                  <label className="block text-xs font-serif uppercase tracking-wider text-kalari-gold mb-1.5">
                    Specializations & Disciplines
                  </label>

                  <div className="flex items-center gap-2 mb-2.5">
                    <input
                      type="text"
                      value={tagInput}
                      onChange={(e) => setTagInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          handleAddTag();
                        }
                      }}
                      placeholder="e.g. Marma Chikitsa, Angathari, Urumi Flow..."
                      className="flex-1 px-3.5 py-2 rounded-lg bg-kalari-black border border-kalari-gold/30 focus:border-kalari-gold text-kalari-white text-xs outline-none transition-colors"
                    />
                    <button
                      type="button"
                      onClick={handleAddTag}
                      className="px-3.5 py-2 rounded-lg bg-kalari-darkBrown border border-kalari-gold/40 text-kalari-gold hover:bg-kalari-gold hover:text-kalari-black text-xs font-serif uppercase tracking-wider font-semibold transition-all"
                    >
                      Add Tag
                    </button>
                  </div>

                  {/* Tags List */}
                  <div className="flex flex-wrap gap-1.5 min-h-[32px] p-2 rounded-lg bg-kalari-black/50 border border-kalari-earth/40">
                    {formData.specialization.length === 0 ? (
                      <span className="text-xs text-kalari-beige/40 italic">
                        No specializations added yet. Type a discipline above and click Add.
                      </span>
                    ) : (
                      formData.specialization.map((tag, idx) => (
                        <span
                          key={idx}
                          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-kalari-darkBrown border border-kalari-gold/40 text-xs text-kalari-gold"
                        >
                          <span>{tag}</span>
                          <button
                            type="button"
                            onClick={() => handleRemoveTag(idx)}
                            className="hover:text-red-400 p-0.5"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </span>
                      ))
                    )}
                  </div>
                </div>

                {/* Row 5: Quote */}
                <div>
                  <label className="block text-xs font-serif uppercase tracking-wider text-kalari-gold mb-1.5">
                    Master Inspirational Quote
                  </label>
                  <textarea
                    rows={2}
                    value={formData.quote}
                    onChange={(e) => setFormData({ ...formData, quote: e.target.value })}
                    placeholder="e.g. Train with discipline. Live with strength. The Kalari arena is not just ground, it is consecrated spirit."
                    className="w-full px-3.5 py-2.5 rounded-lg bg-kalari-black border border-kalari-gold/30 focus:border-kalari-gold text-kalari-white text-xs outline-none transition-colors"
                  />
                </div>

                {/* Row 6: Bio & History */}
                <div>
                  <label className="block text-xs font-serif uppercase tracking-wider text-kalari-gold mb-1.5">
                    Biography & Traditional Lineage History
                  </label>
                  <textarea
                    rows={4}
                    value={formData.bio}
                    onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                    placeholder="Direct disciple of traditional northern masters. Preserving authentic Thulunadan techniques, animal stances (Ashta Vadivukal), and ancient Kalari healing traditions..."
                    className="w-full px-3.5 py-2.5 rounded-lg bg-kalari-black border border-kalari-gold/30 focus:border-kalari-gold text-kalari-white text-xs outline-none transition-colors"
                  />
                </div>

                {/* Modal Actions */}
                <div className="pt-4 border-t border-kalari-gold/20 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      setIsEditModalOpen(false);
                      setIsAddModalOpen(false);
                    }}
                    className="px-4 py-2.5 rounded-lg bg-kalari-darkBrown border border-kalari-gold/30 text-kalari-beige hover:text-kalari-gold text-xs font-serif uppercase tracking-wider transition-all"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    disabled={actionLoading}
                    className="px-6 py-2.5 rounded-lg bg-kalari-gold text-kalari-black font-serif font-bold text-xs uppercase tracking-wider shadow-gold hover:bg-kalari-goldLight transition-all flex items-center gap-2 disabled:opacity-50"
                  >
                    {actionLoading && <RefreshCw className="w-3.5 h-3.5 animate-spin" />}
                    <span>
                      {actionLoading
                        ? 'Saving...'
                        : isEditModalOpen
                        ? 'Save Master Details'
                        : 'Create Master'}
                    </span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirmMaster && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="relative w-full max-w-md bg-kalari-darkBrown border border-red-500/40 rounded-2xl shadow-2xl p-6 text-kalari-white space-y-4">
            <div className="flex items-center gap-3 text-red-400">
              <div className="w-10 h-10 rounded-full bg-red-950/80 border border-red-500/40 flex items-center justify-center">
                <Trash2 className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-lg font-bold">Remove Master?</h3>
            </div>

            <p className="text-xs text-kalari-beige/80 leading-relaxed">
              Are you sure you want to remove{' '}
              <strong className="text-kalari-gold font-serif">
                {deleteConfirmMaster.name}
              </strong>{' '}
              ({deleteConfirmMaster.designation}) from the Gurukkal Lineage? This action will remove
              their profile from both the admin dashboard and public website.
            </p>

            <div className="pt-2 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setDeleteConfirmMaster(null)}
                className="px-4 py-2 rounded-lg bg-kalari-black border border-kalari-earth text-xs font-serif uppercase tracking-wider text-kalari-beige hover:text-kalari-gold"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={actionLoading}
                onClick={() => handleDelete(deleteConfirmMaster)}
                className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-500 text-white text-xs font-serif uppercase tracking-wider font-bold shadow transition-all disabled:opacity-50"
              >
                {actionLoading ? 'Deleting...' : 'Confirm Remove'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
