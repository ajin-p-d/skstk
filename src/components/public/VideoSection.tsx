'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { videosData } from '@/lib/data/seed';
import { VideoItem } from '@/types';
import { Play, X, Clock, ShieldCheck, Film, Pause, Volume2, VolumeX } from 'lucide-react';

export default function VideoSection() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeVideo, setActiveVideo] = useState<VideoItem | null>(null);

  const categories = ['All', 'Technique', 'Weapons', 'Takedown', 'Sparring'];

  const filteredVideos =
    selectedCategory === 'All'
      ? videosData
      : videosData.filter((v) => v.category === selectedCategory);

  return (
    <section id="videos" className="py-28 bg-kalari-black text-kalari-white relative border-b border-kalari-earth/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-semibold tracking-[0.3em] uppercase text-kalari-gold block mb-3">
            Cinematic Demonstrations
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-black text-kalari-white tracking-wider uppercase text-gold-gradient mb-6">
            KALARI IN MOTION
          </h2>
          <p className="text-kalari-beige/80 text-base sm:text-lg font-light leading-relaxed">
            Watch authentic techniques, weapon flows, agile takedowns, and combat sparring recorded directly inside our training arena.
          </p>

          {/* Filter Categories */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-xs font-serif tracking-wider uppercase transition-all ${
                  selectedCategory === cat
                    ? 'bg-kalari-gold text-kalari-black font-bold shadow-gold'
                    : 'bg-kalari-darkBrown/60 text-kalari-beige/70 hover:text-kalari-gold border border-kalari-gold/20'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Video Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredVideos.map((video, idx) => (
            <motion.div
              key={video.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              onClick={() => setActiveVideo(video)}
              className="rounded-2xl bg-kalari-darkBrown/80 border border-kalari-gold/30 hover:border-kalari-gold overflow-hidden group cursor-pointer shadow-gold transition-all duration-300 hover:-translate-y-1.5"
            >
              {/* Thumbnail with Play Button Overlay */}
              <div className="relative aspect-video w-full bg-kalari-black overflow-hidden">
                <Image
                  src={video.thumbnail}
                  alt={video.title}
                  fill
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-500 filter brightness-80 group-hover:brightness-95"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-kalari-darkBrown via-transparent to-transparent opacity-80" />

                {/* Pulsing Play Button */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-14 h-14 rounded-full bg-kalari-gold/90 text-kalari-black flex items-center justify-center shadow-gold group-hover:scale-110 group-hover:bg-kalari-gold transition-all duration-300">
                    <Play className="w-6 h-6 fill-current translate-x-0.5" />
                  </div>
                </div>

                {/* Duration & Category Badges */}
                <div className="absolute bottom-3 left-3 px-2.5 py-1 rounded bg-kalari-black/80 border border-kalari-gold/30 text-[10px] font-serif uppercase tracking-widest text-kalari-gold">
                  {video.category}
                </div>
                <div className="absolute bottom-3 right-3 px-2 py-0.5 rounded bg-kalari-black/80 text-[11px] font-mono text-kalari-beige flex items-center gap-1">
                  <Clock className="w-3 h-3 text-kalari-gold" />
                  <span>{video.duration}</span>
                </div>
              </div>

              {/* Video Info */}
              <div className="p-5 space-y-2">
                <h3 className="font-serif text-lg font-bold text-kalari-white group-hover:text-kalari-gold transition-colors line-clamp-1">
                  {video.title}
                </h3>
                <p className="text-xs text-kalari-beige/75 font-light line-clamp-2 leading-relaxed">
                  {video.description}
                </p>
                <div className="pt-2 flex items-center text-xs text-kalari-gold font-medium gap-1">
                  <span>Watch Demonstration</span>
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Video Streaming Modal */}
      <AnimatePresence>
        {activeVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveVideo(null)}
            className="fixed inset-0 z-50 bg-kalari-black/95 backdrop-blur-md flex items-center justify-center p-4 sm:p-8"
          >
            <button
              onClick={() => setActiveVideo(null)}
              className="absolute top-6 right-6 z-50 p-2.5 rounded-full bg-kalari-darkBrown border border-kalari-gold/40 text-kalari-gold hover:bg-kalari-gold hover:text-kalari-black transition-all"
            >
              <X className="w-6 h-6" />
            </button>

            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
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
              <div className="p-6 sm:p-7 space-y-3 bg-kalari-black/90">
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 rounded-full bg-kalari-darkBrown text-kalari-gold text-xs font-serif uppercase tracking-widest border border-kalari-gold/30">
                    {activeVideo.category} • Authentic Arena Footage
                  </span>
                  <span className="text-xs text-kalari-beige/60">Duration: {activeVideo.duration}</span>
                </div>
                <h3 className="font-serif text-2xl font-bold text-kalari-white text-gold-gradient">
                  {activeVideo.title}
                </h3>
                <p className="text-sm text-kalari-beige/80 font-light leading-relaxed">
                  {activeVideo.description}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
