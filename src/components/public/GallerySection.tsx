'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Maximize2, X, ChevronLeft, ChevronRight, Eye } from 'lucide-react';

interface GalleryItem {
  id: string;
  title: string;
  category: 'Arena' | 'Training' | 'Weapons' | 'Rituals';
  src: string;
  aspect: string;
}

export default function GallerySection() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeLightboxIndex, setActiveLightboxIndex] = useState<number | null>(null);

  const galleryItems: GalleryItem[] = [
    {
      id: 'gal-1',
      title: 'Sacred Kuzhi Kalari Arena & Red Earth Pit',
      category: 'Arena',
      src: '/images/gallery-1.png',
      aspect: 'aspect-[4/3]',
    },
    {
      id: 'gal-2',
      title: 'Thulunadan Animal Stance Training (Gaja Vadivu)',
      category: 'Training',
      src: '/images/thulunadan1.png',
      aspect: 'aspect-[16/9]',
    },
    {
      id: 'gal-3',
      title: 'Student Body Flexibility & Kaalukal Kicks',
      category: 'Training',
      src: '/images/gallery-2.png',
      aspect: 'aspect-[3/4]',
    },
    {
      id: 'gal-4',
      title: 'Synchronized Wooden Staff (Kolthari) Sparring',
      category: 'Weapons',
      src: '/images/gallery-3.png',
      aspect: 'aspect-[4/3]',
    },
    {
      id: 'gal-5',
      title: 'Ancient Northern Footwork Form (Chuvadukal)',
      category: 'Training',
      src: '/images/thulunadan2.png',
      aspect: 'aspect-[16/9]',
    },
    {
      id: 'gal-6',
      title: 'The Seven-Tiered Poothara & Guru Vandanam',
      category: 'Rituals',
      src: '/images/gallery-1.png',
      aspect: 'aspect-[3/4]',
    },
  ];

  const categories = ['All', 'Arena', 'Training', 'Weapons', 'Rituals'];

  const filteredItems =
    selectedCategory === 'All'
      ? galleryItems
      : galleryItems.filter((item) => item.category === selectedCategory);

  const openLightbox = (index: number) => {
    setActiveLightboxIndex(index);
  };

  const closeLightbox = () => {
    setActiveLightboxIndex(null);
  };

  const nextLightbox = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activeLightboxIndex !== null) {
      setActiveLightboxIndex((activeLightboxIndex + 1) % filteredItems.length);
    }
  };

  const prevLightbox = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activeLightboxIndex !== null) {
      setActiveLightboxIndex(
        (activeLightboxIndex - 1 + filteredItems.length) % filteredItems.length
      );
    }
  };

  return (
    <section id="gallery" className="py-28 bg-kalari-darkBrown/30 text-kalari-white relative border-b border-kalari-earth/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-semibold tracking-[0.3em] uppercase text-kalari-gold block mb-3">
            Moments of Discipline
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-black text-kalari-white tracking-wider uppercase text-gold-gradient mb-6">
            KALARI GALLERY
          </h2>
          <p className="text-kalari-beige/80 text-base sm:text-lg font-light leading-relaxed">
            Witness the sacred earth, explosive agility, traditional rituals, and warrior camaraderie inside the Kuzhi Kalari arena.
          </p>

          {/* Filter Pills */}
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

        {/* Masonry / Grid Style Layout */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
          {filteredItems.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: false, amount: 0.1 }}
              transition={{ duration: 0.6, delay: idx * 0.08 }}
              onClick={() => openLightbox(idx)}
              className="relative overflow-hidden rounded-xl border border-kalari-gold/30 hover:border-kalari-gold shadow-gold group cursor-pointer bg-kalari-black break-inside-avoid"
            >
              <div className={`relative w-full ${item.aspect} overflow-hidden`}>
                <Image
                  src={item.src}
                  alt={item.title}
                  fill
                  className="object-cover object-center group-hover:scale-110 transition-transform duration-700 ease-out filter brightness-90 group-hover:brightness-105"
                />

                {/* Dark Overlay with Traditional Gold Frame */}
                <div className="absolute inset-0 bg-gradient-to-t from-kalari-black via-kalari-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5">
                  <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    <span className="text-[10px] font-serif uppercase tracking-widest text-kalari-gold block mb-1">
                      {item.category}
                    </span>
                    <h4 className="font-serif text-sm font-bold text-kalari-white drop-shadow">
                      {item.title}
                    </h4>
                    <div className="mt-3 flex items-center gap-1.5 text-xs text-kalari-gold font-medium">
                      <Maximize2 className="w-3.5 h-3.5" />
                      <span>View Fullscreen</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {activeLightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeLightbox}
            className="fixed inset-0 z-50 bg-kalari-black/95 backdrop-blur-md flex items-center justify-center p-4 sm:p-8"
          >
            {/* Close Button */}
            <button
              onClick={closeLightbox}
              className="absolute top-6 right-6 z-50 p-2.5 rounded-full bg-kalari-darkBrown border border-kalari-gold/40 text-kalari-gold hover:bg-kalari-gold hover:text-kalari-black transition-all"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Left Nav */}
            <button
              onClick={prevLightbox}
              className="absolute left-6 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full bg-kalari-darkBrown/80 border border-kalari-gold/40 text-kalari-gold hover:bg-kalari-gold hover:text-kalari-black transition-all"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Right Nav */}
            <button
              onClick={nextLightbox}
              className="absolute right-6 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full bg-kalari-darkBrown/80 border border-kalari-gold/40 text-kalari-gold hover:bg-kalari-gold hover:text-kalari-black transition-all"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Lightbox Image & Info */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-5xl max-h-[85vh] w-full flex flex-col items-center"
            >
              <div className="relative w-full h-[65vh] rounded-xl overflow-hidden border-2 border-kalari-gold/50 shadow-gold-lg">
                <Image
                  src={filteredItems[activeLightboxIndex].src}
                  alt={filteredItems[activeLightboxIndex].title}
                  fill
                  className="object-contain"
                  priority
                />
              </div>

              <div className="mt-4 text-center">
                <span className="text-xs text-kalari-gold font-serif uppercase tracking-widest block">
                  {filteredItems[activeLightboxIndex].category} • {activeLightboxIndex + 1} of{' '}
                  {filteredItems.length}
                </span>
                <h3 className="font-serif text-lg sm:text-xl font-bold text-kalari-white mt-1">
                  {filteredItems[activeLightboxIndex].title}
                </h3>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
