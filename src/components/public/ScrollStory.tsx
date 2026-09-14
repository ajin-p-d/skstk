'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Shield, Sparkles, Compass, Flame, ArrowRight, Zap, Target } from 'lucide-react';

export default function ScrollStory() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section id="story" ref={containerRef} className="relative bg-kalari-black text-kalari-white">
      {/* Background Ambience / Red Soil Texture Glow */}
      <div className="absolute inset-0 bg-radial-flame opacity-30 pointer-events-none" />

      {/* =========================================================================
          SCENE 1: "Every movement begins with discipline."
          ========================================================================= */}
      <div className="min-h-screen relative flex items-center justify-center overflow-hidden px-4 py-24 border-b border-kalari-earth/30">
        {/* Cinematic Background Zoom/Scale */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/thulunadan1.png"
            alt="Kalari Warrior Stance"
            fill
            className="object-cover object-center filter brightness-40 contrast-125 scale-105"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-kalari-black via-kalari-black/70 to-kalari-black" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.4 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 max-w-4xl mx-auto text-center"
        >
          <span className="text-xs font-semibold tracking-[0.3em] uppercase text-kalari-gold block mb-4">
            Scene I • The Foundation
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl font-light text-kalari-white leading-tight tracking-wide">
            Every movement begins with{' '}
            <span className="font-bold text-kalari-gold block sm:inline mt-2 sm:mt-0 italic font-serif">
              discipline.
            </span>
          </h2>
          <p className="mt-6 text-base sm:text-lg text-kalari-beige/80 max-w-xl mx-auto font-light leading-relaxed">
            Before touching any blade or staff, the student learns submission of the ego, reverence to the arena, and the sacred salute to the Gurus.
          </p>
          <div className="mt-8 flex justify-center items-center gap-2 text-kalari-gold/80">
            <span className="w-12 h-[1px] bg-kalari-gold/40" />
            <Flame className="w-4 h-4 text-kalari-gold animate-pulse" />
            <span className="w-12 h-[1px] bg-kalari-gold/40" />
          </div>
        </motion.div>
      </div>

      {/* =========================================================================
          SCENE 2: "Every step carries centuries of tradition."
          ========================================================================= */}
      <div className="min-h-screen relative flex items-center justify-center overflow-hidden px-4 py-24 border-b border-kalari-earth/30">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/gallery-1.png"
            alt="Kalari Footwork & Vadivu"
            fill
            className="object-cover object-center filter brightness-35 contrast-125"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-kalari-black via-kalari-black/85 to-kalari-black" />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 1 }}
            className="lg:col-span-6 space-y-6"
          >
            <span className="text-xs font-semibold tracking-[0.3em] uppercase text-kalari-gold block">
              Scene II • The Stances & Footwork
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-light text-kalari-white leading-tight">
              Every step carries{' '}
              <span className="font-bold text-kalari-gold block text-gold-gradient">
                centuries of tradition.
              </span>
            </h2>
            <p className="text-base text-kalari-beige/80 leading-relaxed">
              In Kalari, posture is power. The ancient masters observed the raw power, balance, and survival instincts of nature's formidable creatures to craft the eight animal postures (Ashta Vadivukal).
            </p>

            {/* Visual Stance Badges */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <div className="p-3.5 rounded-lg bg-kalari-darkBrown/80 border border-kalari-gold/20 hover:border-kalari-gold/50 transition-colors">
                <h4 className="font-serif text-sm font-bold text-kalari-gold">Gaja Vadivu</h4>
                <p className="text-xs text-kalari-beige/70 mt-1">Elephant Stance — Unshakable ground stability</p>
              </div>
              <div className="p-3.5 rounded-lg bg-kalari-darkBrown/80 border border-kalari-gold/20 hover:border-kalari-gold/50 transition-colors">
                <h4 className="font-serif text-sm font-bold text-kalari-gold">Simha Vadivu</h4>
                <p className="text-xs text-kalari-beige/70 mt-1">Lion Stance — Explosive forward pounce</p>
              </div>
              <div className="p-3.5 rounded-lg bg-kalari-darkBrown/80 border border-kalari-gold/20 hover:border-kalari-gold/50 transition-colors">
                <h4 className="font-serif text-sm font-bold text-kalari-gold">Ashwa Vadivu</h4>
                <p className="text-xs text-kalari-beige/70 mt-1">Horse Stance — Dynamic rotational power</p>
              </div>
              <div className="p-3.5 rounded-lg bg-kalari-darkBrown/80 border border-kalari-gold/20 hover:border-kalari-gold/50 transition-colors">
                <h4 className="font-serif text-sm font-bold text-kalari-gold">Sarpa Vadivu</h4>
                <p className="text-xs text-kalari-beige/70 mt-1">Serpent Stance — Low-coiled evasive stealth</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 1.2 }}
            className="lg:col-span-6 relative"
          >
            <div className="relative aspect-video rounded-xl overflow-hidden border-2 border-kalari-gold/40 shadow-gold">
              <Image
                src="/images/thulunadan2.png"
                alt="Kalari Footwork Training"
                fill
                className="object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-kalari-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 text-xs font-serif text-kalari-beige/90">
                Chuvadukal (Steps) • The Sacred Sacred Floor Geometry of Northern Kalari
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* =========================================================================
          SCENE 3: "Strength is not only in the body. It is in the mind."
          ========================================================================= */}
      <div className="min-h-screen relative flex items-center justify-center overflow-hidden px-4 py-24 border-b border-kalari-earth/30">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/gallery-2.png"
            alt="Meditation and Focus"
            fill
            className="object-cover object-center filter brightness-30 contrast-130"
          />
          <div className="absolute inset-0 bg-kalari-black/75" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.4 }}
          transition={{ duration: 1.2 }}
          className="relative z-10 max-w-4xl mx-auto text-center px-4"
        >
          <span className="text-xs font-semibold tracking-[0.3em] uppercase text-kalari-gold block mb-4">
            Scene III • The Inner Forge
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl font-light text-kalari-white leading-tight">
            Strength is not only in the body.
          </h2>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: false, amount: 0.5 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="my-6"
          >
            <span className="font-serif text-3xl sm:text-5xl md:text-6xl font-black text-gold-gradient uppercase tracking-widest block">
              It is in the mind.
            </span>
          </motion.div>

          <p className="text-base sm:text-lg text-kalari-beige/80 max-w-2xl mx-auto font-light leading-relaxed">
            Through Pranayama (breath synchronization), intense concentration (Dhyana), and unwavering discipline, the warrior transforms physical fatigue into calm, crystalline clarity.
          </p>

          <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto text-left">
            <div className="p-4 rounded bg-kalari-darkBrown/60 border-l-2 border-kalari-gold">
              <span className="text-xs text-kalari-gold uppercase font-serif block">01. Meditation</span>
              <p className="text-xs text-kalari-beige/70 mt-1">Quieting turbulence before stepping onto sacred earth</p>
            </div>
            <div className="p-4 rounded bg-kalari-darkBrown/60 border-l-2 border-kalari-gold">
              <span className="text-xs text-kalari-gold uppercase font-serif block">02. Focus</span>
              <p className="text-xs text-kalari-beige/70 mt-1">360-degree sensory alertness (Meykkan)</p>
            </div>
            <div className="p-4 rounded bg-kalari-darkBrown/60 border-l-2 border-kalari-gold">
              <span className="text-xs text-kalari-gold uppercase font-serif block">03. Discipline</span>
              <p className="text-xs text-kalari-beige/70 mt-1">Rigorous adherence to lineage and ethical conduct</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* =========================================================================
          SCENE 4: "Speed. Balance. Control."
          Each word appears separately while scrolling.
          ========================================================================= */}
      <div className="min-h-screen relative flex flex-col items-center justify-center overflow-hidden px-4 py-24 border-b border-kalari-earth/30">
        <div className="text-center mb-12">
          <span className="text-xs font-semibold tracking-[0.3em] uppercase text-kalari-gold block mb-2">
            Scene IV • The Trinity of Combat
          </span>
          <p className="text-xs sm:text-sm text-kalari-beige/60 tracking-widest uppercase">
            Scroll to awaken the three virtues
          </p>
        </div>

        <div className="w-full max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-4">
          {/* 1. SPEED */}
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="flex flex-col items-center text-center p-8 rounded-xl bg-kalari-darkBrown/80 border border-kalari-gold/30 shadow-gold group hover:border-kalari-gold transition-all duration-300"
          >
            <div className="w-14 h-14 rounded-full bg-kalari-black flex items-center justify-center border border-kalari-gold/40 text-kalari-gold mb-6 group-hover:scale-110 transition-transform">
              <Zap className="w-7 h-7" />
            </div>
            <h3 className="font-serif text-3xl sm:text-4xl font-extrabold text-gold-gradient tracking-widest uppercase mb-3">
              SPEED
            </h3>
            <p className="text-sm text-kalari-beige/75 font-light leading-relaxed">
              Like lightning striking the earth. The strike lands before the observer can comprehend the impulse.
            </p>
          </motion.div>

          {/* 2. BALANCE */}
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
            className="flex flex-col items-center text-center p-8 rounded-xl bg-kalari-darkBrown/80 border border-kalari-gold/30 shadow-gold group hover:border-kalari-gold transition-all duration-300"
          >
            <div className="w-14 h-14 rounded-full bg-kalari-black flex items-center justify-center border border-kalari-gold/40 text-kalari-gold mb-6 group-hover:scale-110 transition-transform">
              <Compass className="w-7 h-7" />
            </div>
            <h3 className="font-serif text-3xl sm:text-4xl font-extrabold text-gold-gradient tracking-widest uppercase mb-3">
              BALANCE
            </h3>
            <p className="text-sm text-kalari-beige/75 font-light leading-relaxed">
              Equilibrium in aerial leaps, low sweeps, and abrupt pivots. Grounded like the mountains of the Western Ghats.
            </p>
          </motion.div>

          {/* 3. CONTROL */}
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.8, delay: 0.4, ease: 'easeOut' }}
            className="flex flex-col items-center text-center p-8 rounded-xl bg-kalari-darkBrown/80 border border-kalari-gold/30 shadow-gold group hover:border-kalari-gold transition-all duration-300"
          >
            <div className="w-14 h-14 rounded-full bg-kalari-black flex items-center justify-center border border-kalari-gold/40 text-kalari-gold mb-6 group-hover:scale-110 transition-transform">
              <Target className="w-7 h-7" />
            </div>
            <h3 className="font-serif text-3xl sm:text-4xl font-extrabold text-gold-gradient tracking-widest uppercase mb-3">
              CONTROL
            </h3>
            <p className="text-sm text-kalari-beige/75 font-light leading-relaxed">
              Subduing without malice. Halting a razor blade a millimeter from the flesh with absolute restraint.
            </p>
          </motion.div>
        </div>
      </div>

      {/* =========================================================================
          SCENE 5: "THIS IS KALARI."
          Final Introduction & CTA
          ========================================================================= */}
      <div className="min-h-screen relative flex items-center justify-center overflow-hidden px-4 py-28 bg-gradient-to-b from-kalari-black via-kalari-darkBrown/90 to-kalari-black">
        <div className="absolute inset-0 z-0 opacity-20">
          <Image
            src="/images/gallery-3.png"
            alt="Kalari Arena Atmosphere"
            fill
            className="object-cover object-center"
          />
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: false, amount: 0.4 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 max-w-4xl mx-auto text-center px-4"
        >
          <span className="text-xs font-semibold tracking-[0.35em] uppercase text-kalari-gold block mb-6">
            Scene V • The Culmination
          </span>

          <h2 className="font-serif text-4xl sm:text-6xl md:text-8xl font-black text-kalari-white tracking-widest uppercase drop-shadow-2xl mb-8">
            THIS IS <span className="text-gold-gradient">KALARI.</span>
          </h2>

          <div className="space-y-2 sm:space-y-3 font-serif text-lg sm:text-2xl md:text-3xl text-kalari-beige tracking-wider max-w-xl mx-auto mb-10">
            <p className="font-light">
              Train the <span className="text-kalari-white font-semibold">Body.</span>
            </p>
            <p className="font-light">
              Discipline the <span className="text-kalari-white font-semibold">Mind.</span>
            </p>
            <p className="font-light">
              Strengthen the <span className="text-kalari-white font-semibold">Spirit.</span>
            </p>
          </div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className="inline-block"
          >
            <a
              href="#contact"
              className="inline-flex items-center gap-3 px-10 py-4 rounded-md gold-gradient-bg text-kalari-black font-serif font-black text-sm sm:text-base tracking-[0.2em] uppercase shadow-gold-lg hover:brightness-110 transition-all duration-300"
            >
              <span>JOIN OUR KALARI</span>
              <ArrowRight className="w-5 h-5" />
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
