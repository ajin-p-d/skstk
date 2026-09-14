'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Shield, Sparkles, Award, HeartHandshake, Eye, CheckCircle2 } from 'lucide-react';

export default function AboutSection() {
  const [activeTab, setActiveTab] = useState<'history' | 'discipline' | 'training'>('history');

  return (
    <section id="about" className="relative py-28 bg-kalari-black text-kalari-white overflow-hidden border-b border-kalari-earth/40">
      {/* Subtle Background Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-kalari-gold/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-kalari-earth/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-semibold tracking-[0.3em] uppercase text-kalari-gold block mb-3">
            Heritage & Roots
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-black text-kalari-white tracking-wider uppercase text-gold-gradient mb-6">
            THE ART OF KALARIPAYATTU
          </h2>
          <p className="text-kalari-beige/80 text-base sm:text-lg font-light leading-relaxed">
            Regarded as the mother of all martial arts, Kalaripayattu originated in the verdant lands of Kerala over three millennia ago. It is not merely a combat discipline, but a holistic science of movement, breath, healing, and spiritual devotion.
          </p>

          {/* Navigation Pills */}
          <div className="flex items-center justify-center gap-3 mt-8">
            <button
              onClick={() => setActiveTab('history')}
              className={`px-5 py-2 rounded-full text-xs font-serif tracking-widest uppercase transition-all ${
                activeTab === 'history'
                  ? 'bg-kalari-gold text-kalari-black font-bold shadow-gold'
                  : 'bg-kalari-darkBrown/70 text-kalari-beige/70 hover:text-kalari-gold border border-kalari-gold/20'
              }`}
            >
              History & Roots
            </button>
            <button
              onClick={() => setActiveTab('discipline')}
              className={`px-5 py-2 rounded-full text-xs font-serif tracking-widest uppercase transition-all ${
                activeTab === 'discipline'
                  ? 'bg-kalari-gold text-kalari-black font-bold shadow-gold'
                  : 'bg-kalari-darkBrown/70 text-kalari-beige/70 hover:text-kalari-gold border border-kalari-gold/20'
              }`}
            >
              The 4 Pillars of Discipline
            </button>
            <button
              onClick={() => setActiveTab('training')}
              className={`px-5 py-2 rounded-full text-xs font-serif tracking-widest uppercase transition-all ${
                activeTab === 'training'
                  ? 'bg-kalari-gold text-kalari-black font-bold shadow-gold'
                  : 'bg-kalari-darkBrown/70 text-kalari-beige/70 hover:text-kalari-gold border border-kalari-gold/20'
              }`}
            >
              The 4 Training Stages
            </button>
          </div>
        </div>

        {/* Tab 1: History */}
        {activeTab === 'history' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center"
          >
            <div className="lg:col-span-6 space-y-6">
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-kalari-gold">
                The Sacred Kuzhi Kalari Arena
              </h3>
              <p className="text-kalari-beige/80 text-sm sm:text-base leading-relaxed">
                Traditionally dug four to six feet into the earth to insulate the practitioner from Kerala's tropical heat and winds, the sacred arena—known as the <span className="text-kalari-gold font-medium">Kuzhi Kalari</span>—is blessed with consecrated red earth treated with herbal oils.
              </p>
              <p className="text-kalari-beige/80 text-sm sm:text-base leading-relaxed">
                At the southwest corner stands the <span className="text-kalari-white font-medium">Poothara</span>, a seven-tiered stepped altar symbolizing the seven celestial energies and the lineage of Gurukkals. Every practitioner bows before the Poothara before stepping onto the sacred earth.
              </p>

              <div className="border-l-2 border-kalari-gold pl-4 py-2 bg-kalari-darkBrown/40 rounded-r">
                <blockquote className="italic font-serif text-sm text-kalari-beige/90">
                  "ഗുരുവേ നമഃ (Guruve Namah) — Homage to the teacher who removes darkness and awakens the inner warrior through balance and awareness."
                </blockquote>
              </div>
            </div>

            <div className="lg:col-span-6 relative">
              <div className="relative aspect-[4/3] rounded-xl overflow-hidden border-2 border-kalari-gold/30 shadow-gold">
                <Image
                  src="/images/thulunadan1.png"
                  alt="Ancient Kalari Tradition"
                  fill
                  className="object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-kalari-black/90 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 text-xs font-serif text-kalari-goldLight">
                  Thulunadan Tradition • The ancient northern lineage celebrated for extraordinary flexibility and agile combat
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Tab 2: Discipline */}
        {activeTab === 'discipline' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            <div className="p-6 rounded-xl bg-kalari-darkBrown/70 border border-kalari-gold/30 hover:border-kalari-gold transition-all duration-300">
              <div className="w-12 h-12 rounded-lg bg-kalari-black flex items-center justify-center text-kalari-gold mb-4 border border-kalari-gold/30">
                <Award className="w-6 h-6" />
              </div>
              <h4 className="font-serif text-lg font-bold text-kalari-gold mb-2">Physical Discipline</h4>
              <p className="text-xs sm:text-sm text-kalari-beige/75 leading-relaxed">
                Punctuality, rigorous daily training at dawn or dusk, adherence to traditional diet, and relentless repetition to condition every sinew and tendon.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-kalari-darkBrown/70 border border-kalari-gold/30 hover:border-kalari-gold transition-all duration-300">
              <div className="w-12 h-12 rounded-lg bg-kalari-black flex items-center justify-center text-kalari-gold mb-4 border border-kalari-gold/30">
                <Eye className="w-6 h-6" />
              </div>
              <h4 className="font-serif text-lg font-bold text-kalari-gold mb-2">Mental Focus</h4>
              <p className="text-xs sm:text-sm text-kalari-beige/75 leading-relaxed">
                Known as <em>Meykkan</em>—where the entire body becomes an eye. Developing acute peripheral awareness and unwavering stillness amidst chaotic conflict.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-kalari-darkBrown/70 border border-kalari-gold/30 hover:border-kalari-gold transition-all duration-300">
              <div className="w-12 h-12 rounded-lg bg-kalari-black flex items-center justify-center text-kalari-gold mb-4 border border-kalari-gold/30">
                <HeartHandshake className="w-6 h-6" />
              </div>
              <h4 className="font-serif text-lg font-bold text-kalari-gold mb-2">Respect (Vandanam)</h4>
              <p className="text-xs sm:text-sm text-kalari-beige/75 leading-relaxed">
                Reverence to the earth, the lineage, the weapons, and fellow practitioners. Combat skill is wielded with profound humility and ethics.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-kalari-darkBrown/70 border border-kalari-gold/30 hover:border-kalari-gold transition-all duration-300">
              <div className="w-12 h-12 rounded-lg bg-kalari-black flex items-center justify-center text-kalari-gold mb-4 border border-kalari-gold/30">
                <Shield className="w-6 h-6" />
              </div>
              <h4 className="font-serif text-lg font-bold text-kalari-gold mb-2">Self-Control</h4>
              <p className="text-xs sm:text-sm text-kalari-beige/75 leading-relaxed">
                The vow of Kalari dictates that lethal techniques and Marma strikes are never used for aggression, arrogance, or vanity, but solely for preservation of life and truth.
              </p>
            </div>
          </motion.div>
        )}

        {/* Tab 3: Training Stages */}
        {activeTab === 'training' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {/* Stage 1: Meipayattu */}
            <div className="p-6 rounded-xl bg-kalari-darkBrown/80 border-t-4 border-kalari-gold shadow-gold relative group">
              <span className="text-xs font-bold text-kalari-gold tracking-widest uppercase block mb-1">
                Stage 01
              </span>
              <h4 className="font-serif text-xl font-extrabold text-kalari-white mb-2">
                Meipayattu
              </h4>
              <p className="text-xs text-kalari-goldLight font-medium mb-3">
                Body Conditioning & Flexibility
              </p>
              <ul className="space-y-2 text-xs text-kalari-beige/80">
                <li className="flex items-start gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-kalari-gold shrink-0 mt-0.5" />
                  <span>Kaikuthu payattu & core conditioning</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-kalari-gold shrink-0 mt-0.5" />
                  <span>High vertical and diagonal kicks (Kaalukal)</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-kalari-gold shrink-0 mt-0.5" />
                  <span>Eight animal stances (Ashta Vadivukal)</span>
                </li>
              </ul>
            </div>

            {/* Stage 2: Kolthari */}
            <div className="p-6 rounded-xl bg-kalari-darkBrown/80 border-t-4 border-kalari-gold shadow-gold relative group">
              <span className="text-xs font-bold text-kalari-gold tracking-widest uppercase block mb-1">
                Stage 02
              </span>
              <h4 className="font-serif text-xl font-extrabold text-kalari-white mb-2">
                Kolthari
              </h4>
              <p className="text-xs text-kalari-goldLight font-medium mb-3">
                Wooden Weapon Combat
              </p>
              <ul className="space-y-2 text-xs text-kalari-beige/80">
                <li className="flex items-start gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-kalari-gold shrink-0 mt-0.5" />
                  <span>Kettukari (12-span long staff)</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-kalari-gold shrink-0 mt-0.5" />
                  <span>Muchan (short wooden stick)</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-kalari-gold shrink-0 mt-0.5" />
                  <span>Otta (curved S-shaped elephant tusk weapon)</span>
                </li>
              </ul>
            </div>

            {/* Stage 3: Angathari */}
            <div className="p-6 rounded-xl bg-kalari-darkBrown/80 border-t-4 border-kalari-gold shadow-gold relative group">
              <span className="text-xs font-bold text-kalari-gold tracking-widest uppercase block mb-1">
                Stage 03
              </span>
              <h4 className="font-serif text-xl font-extrabold text-kalari-white mb-2">
                Angathari
              </h4>
              <p className="text-xs text-kalari-goldLight font-medium mb-3">
                Metal Weapon Mastery
              </p>
              <ul className="space-y-2 text-xs text-kalari-beige/80">
                <li className="flex items-start gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-kalari-gold shrink-0 mt-0.5" />
                  <span>Val & Paricha (Sword and Shield)</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-kalari-gold shrink-0 mt-0.5" />
                  <span>Kathi (Double-edged Dagger)</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-kalari-gold shrink-0 mt-0.5" />
                  <span>Urumi (Legendary flexible whip-blade)</span>
                </li>
              </ul>
            </div>

            {/* Stage 4: Verumkai */}
            <div className="p-6 rounded-xl bg-kalari-darkBrown/80 border-t-4 border-kalari-gold shadow-gold relative group">
              <span className="text-xs font-bold text-kalari-gold tracking-widest uppercase block mb-1">
                Stage 04
              </span>
              <h4 className="font-serif text-xl font-extrabold text-kalari-white mb-2">
                Verumkai
              </h4>
              <p className="text-xs text-kalari-goldLight font-medium mb-3">
                Empty Hand & Marma Points
              </p>
              <ul className="space-y-2 text-xs text-kalari-beige/80">
                <li className="flex items-start gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-kalari-gold shrink-0 mt-0.5" />
                  <span>Disarming armed adversaries</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-kalari-gold shrink-0 mt-0.5" />
                  <span>Joint locks, sweeps & throws</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-kalari-gold shrink-0 mt-0.5" />
                  <span>108 Marmas: vital points for defense & healing</span>
                </li>
              </ul>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
