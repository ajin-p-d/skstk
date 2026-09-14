'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import AdminHeader from '@/components/admin/AdminHeader';
import { videosData } from '@/lib/data/seed';
import { VideoItem } from '@/types';
import {
  Film,
  Play,
  X,
  Clock,
  Shield,
  Plus,
  Search,
  CheckCircle2,
  Lock,
  Sparkles,
  FileVideo,
} from 'lucide-react';

export default function AdminVideosPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeVideo, setActiveVideo] = useState<VideoItem | null>(null);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [videoList, setVideoList] = useState<VideoItem[]>(videosData);
  const [newVideoData, setNewVideoData] = useState({
    title: '',
    description: '',
    filename: '',
    category: 'Technique' as 'Sparring' | 'Weapons' | 'Takedown' | 'Technique',
    duration: '2:00',
  });

  const categories = ['All', 'Technique', 'Weapons', 'Takedown', 'Sparring'];

  const filteredVideos = videoList.filter((v) => {
    const matchesCategory = selectedCategory === 'All' || v.category === selectedCategory;
    const matchesSearch =
      v.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      v.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      v.filename.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleAddVideo = (e: React.FormEvent) => {
    e.preventDefault();
    const item: VideoItem = {
      id: `vid-${Date.now()}`,
      title: newVideoData.title,
      description: newVideoData.description,
      filename: newVideoData.filename,
      category: newVideoData.category,
      duration: newVideoData.duration,
      thumbnail: '/images/gallery-1.png',
    };
    setVideoList([item, ...videoList]);
    setIsUploadModalOpen(false);
  };

  return (
    <div className="flex-1 flex flex-col">
      <AdminHeader
        title="Training Videos & Arena Footage"
        subtitle="Exclusive master archive of martial techniques, sparring sessions, and weapon demonstrations."
      />

      <main className="p-6 sm:p-8 space-y-6 flex-1">
        {/* Top Confidential Banner */}
        <div className="p-4 rounded-xl bg-kalari-darkBrown/80 border border-kalari-gold/30 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-kalari-black text-kalari-gold border border-kalari-gold/20">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <span className="font-serif text-sm font-bold text-kalari-white block">
                Gurukkal Internal Archive • Confidential Training Materials
              </span>
              <span className="text-xs text-kalari-beige/70">
                These authentic training recordings and martial secrets are restricted to instructors and verified practitioners.
              </span>
            </div>
          </div>

          <button
            onClick={() => setIsUploadModalOpen(true)}
            className="px-4 py-2 rounded-lg gold-gradient-bg text-kalari-black font-serif font-bold text-xs uppercase tracking-wider shadow-gold hover:brightness-110 flex items-center gap-1.5 transition-all shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span>Index New Video</span>
          </button>
        </div>

        {/* Filter and Search Bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-serif uppercase tracking-wider transition-all ${
                  selectedCategory === cat
                    ? 'bg-kalari-gold text-kalari-black font-bold shadow-gold'
                    : 'bg-kalari-darkBrown text-kalari-beige/70 hover:text-kalari-gold border border-kalari-gold/20'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="relative w-full sm:w-72">
            <Search className="w-3.5 h-3.5 text-kalari-gold absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search footage or technique..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 rounded-lg bg-kalari-darkBrown border border-kalari-gold/20 text-xs text-kalari-white placeholder:text-kalari-beige/40 focus:outline-none focus:border-kalari-gold"
            />
          </div>
        </div>

        {/* Video Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredVideos.map((video) => (
            <div
              key={video.id}
              className="rounded-2xl bg-kalari-darkBrown/90 border border-kalari-gold/30 hover:border-kalari-gold overflow-hidden shadow-gold flex flex-col justify-between group transition-all duration-300"
            >
              {/* Thumbnail Container */}
              <div
                onClick={() => setActiveVideo(video)}
                className="relative aspect-video w-full bg-kalari-black overflow-hidden cursor-pointer"
              >
                <Image
                  src={video.thumbnail}
                  alt={video.title}
                  fill
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-500 filter brightness-85 group-hover:brightness-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-kalari-darkBrown via-transparent to-transparent opacity-70" />

                {/* Play Button */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-kalari-gold/90 text-kalari-black flex items-center justify-center shadow-gold group-hover:scale-110 group-hover:bg-kalari-gold transition-all duration-300">
                    <Play className="w-5 h-5 fill-current translate-x-0.5" />
                  </div>
                </div>

                <div className="absolute bottom-2.5 left-2.5 px-2 py-0.5 rounded bg-kalari-black/80 border border-kalari-gold/30 text-[10px] font-serif uppercase tracking-widest text-kalari-gold">
                  {video.category}
                </div>
                <div className="absolute bottom-2.5 right-2.5 px-2 py-0.5 rounded bg-kalari-black/80 text-[10px] font-mono text-kalari-beige flex items-center gap-1">
                  <Clock className="w-3 h-3 text-kalari-gold" />
                  <span>{video.duration}</span>
                </div>
              </div>

              {/* Card Meta & Info */}
              <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-serif text-base font-bold text-kalari-white group-hover:text-kalari-gold transition-colors line-clamp-1">
                    {video.title}
                  </h3>
                  <p className="text-xs text-kalari-beige/70 font-light line-clamp-2 mt-1 leading-relaxed">
                    {video.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-kalari-gold/20 flex items-center justify-between">
                  <span className="font-mono text-[10px] text-kalari-beige/50">
                    {video.filename}
                  </span>
                  <button
                    onClick={() => setActiveVideo(video)}
                    className="px-3 py-1 rounded bg-kalari-black border border-kalari-gold/30 text-kalari-gold hover:bg-kalari-gold hover:text-kalari-black text-xs font-serif uppercase tracking-wider transition-all"
                  >
                    Play Clip
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Video Streaming Modal */}
      {activeVideo && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-8">
          <button
            onClick={() => setActiveVideo(null)}
            className="absolute top-6 right-6 z-50 p-2.5 rounded-full bg-kalari-darkBrown border border-kalari-gold/40 text-kalari-gold hover:bg-kalari-gold hover:text-kalari-black transition-all"
          >
            <X className="w-6 h-6" />
          </button>

          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-4xl w-full bg-kalari-darkBrown border-2 border-kalari-gold/50 rounded-2xl overflow-hidden shadow-gold-lg"
          >
            {/* HTML5 Video Streaming via API route */}
            <div className="relative aspect-video w-full bg-black">
              <video
                src={`/api/video/${activeVideo.filename}`}
                controls
                autoPlay
                className="w-full h-full object-contain"
              />
            </div>

            {/* Video Details */}
            <div className="p-6 sm:p-7 space-y-3 bg-kalari-black/95">
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded-full bg-kalari-darkBrown text-kalari-gold text-xs font-serif uppercase tracking-widest border border-kalari-gold/30">
                  {activeVideo.category} • Confidential Technique
                </span>
                <span className="text-xs text-kalari-beige/60">Duration: {activeVideo.duration}</span>
              </div>
              <h3 className="font-serif text-2xl font-bold text-kalari-white text-gold-gradient">
                {activeVideo.title}
              </h3>
              <p className="text-sm text-kalari-beige/80 font-light leading-relaxed">
                {activeVideo.description}
              </p>
              <div className="text-xs text-kalari-gold font-mono pt-1">
                Source File: {activeVideo.filename}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Index New Video Modal */}
      {isUploadModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="relative w-full max-w-md bg-kalari-black border-2 border-kalari-gold rounded-2xl shadow-gold-lg overflow-hidden my-8 text-kalari-white">
            <div className="px-6 py-4 bg-kalari-darkBrown border-b border-kalari-gold/30 flex items-center justify-between">
              <h3 className="font-serif text-lg font-bold text-kalari-gold uppercase tracking-wider">
                Index Arena Video
              </h3>
              <button
                onClick={() => setIsUploadModalOpen(false)}
                className="text-kalari-beige hover:text-kalari-gold"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddVideo} className="p-6 space-y-4 text-xs">
              <div>
                <label className="block text-kalari-gold uppercase tracking-wider mb-1 font-semibold">
                  Video Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Urumi Continuous Ribbon Whip"
                  value={newVideoData.title}
                  onChange={(e) => setNewVideoData({ ...newVideoData, title: e.target.value })}
                  className="w-full px-3 py-2 rounded bg-kalari-darkBrown border border-kalari-earth focus:border-kalari-gold text-kalari-white text-xs focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-kalari-gold uppercase tracking-wider mb-1 font-semibold">
                  Video Filename (in workspace) *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. valichuYeru.mp4"
                  value={newVideoData.filename}
                  onChange={(e) => setNewVideoData({ ...newVideoData, filename: e.target.value })}
                  className="w-full px-3 py-2 rounded bg-kalari-darkBrown border border-kalari-earth focus:border-kalari-gold text-kalari-white text-xs font-mono focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-kalari-gold uppercase tracking-wider mb-1 font-semibold">
                    Category
                  </label>
                  <select
                    value={newVideoData.category}
                    onChange={(e) =>
                      setNewVideoData({
                        ...newVideoData,
                        category: e.target.value as any,
                      })
                    }
                    className="w-full px-3 py-2 rounded bg-kalari-darkBrown border border-kalari-earth focus:border-kalari-gold text-kalari-white text-xs focus:outline-none"
                  >
                    <option value="Technique">Technique</option>
                    <option value="Weapons">Weapons</option>
                    <option value="Takedown">Takedown</option>
                    <option value="Sparring">Sparring</option>
                  </select>
                </div>

                <div>
                  <label className="block text-kalari-gold uppercase tracking-wider mb-1 font-semibold">
                    Duration
                  </label>
                  <input
                    type="text"
                    value={newVideoData.duration}
                    onChange={(e) => setNewVideoData({ ...newVideoData, duration: e.target.value })}
                    className="w-full px-3 py-2 rounded bg-kalari-darkBrown border border-kalari-earth focus:border-kalari-gold text-kalari-white text-xs focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-kalari-gold uppercase tracking-wider mb-1 font-semibold">
                  Technique Description
                </label>
                <textarea
                  rows={3}
                  value={newVideoData.description}
                  onChange={(e) => setNewVideoData({ ...newVideoData, description: e.target.value })}
                  className="w-full px-3 py-2 rounded bg-kalari-darkBrown border border-kalari-earth focus:border-kalari-gold text-kalari-white text-xs focus:outline-none"
                />
              </div>

              <div className="pt-4 border-t border-kalari-gold/20 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsUploadModalOpen(false)}
                  className="px-4 py-2 rounded bg-kalari-darkBrown text-kalari-beige hover:text-kalari-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded gold-gradient-bg text-kalari-black font-serif font-bold uppercase tracking-wider shadow-gold"
                >
                  Index Video
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
