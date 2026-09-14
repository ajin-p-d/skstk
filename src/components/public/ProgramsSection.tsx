'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { trainingProgramsData } from '@/lib/data/seed';
import { CheckCircle, Clock, Users, ArrowRight, ShieldCheck } from 'lucide-react';

export default function ProgramsSection() {
  return (
    <section id="programs" className="py-28 bg-kalari-black text-kalari-white relative border-b border-kalari-earth/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-semibold tracking-[0.3em] uppercase text-kalari-gold block mb-3">
            Structured Curriculum
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-black text-kalari-white tracking-wider uppercase text-gold-gradient mb-6">
            TRAINING PROGRAMS
          </h2>
          <p className="text-kalari-beige/80 text-base sm:text-lg font-light leading-relaxed">
            From initial body conditioning to master-level weapon duels and practical self-defense, our curriculum is structured according to authentic Kerala Shastras.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {trainingProgramsData.map((prog, idx) => (
            <motion.div
              key={prog.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 0.7, delay: idx * 0.1 }}
              className="rounded-2xl bg-kalari-darkBrown/80 border border-kalari-gold/30 hover:border-kalari-gold p-6 flex flex-col justify-between shadow-gold transition-all duration-300 group hover:-translate-y-1"
            >
              <div>
                {/* Level Badge */}
                <div className="flex items-center justify-between mb-4">
                  <span className="px-3 py-1 rounded-full bg-kalari-black text-kalari-gold text-[11px] font-serif tracking-widest uppercase border border-kalari-gold/30">
                    {prog.level}
                  </span>
                  <span className="text-xs text-kalari-beige/60 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-kalari-gold/70" />
                    {prog.duration}
                  </span>
                </div>

                <h3 className="font-serif text-xl font-bold text-kalari-white group-hover:text-kalari-gold transition-colors mb-1">
                  {prog.title}
                </h3>
                <span className="text-xs font-medium text-kalari-goldLight block mb-4">
                  {prog.keralaStage}
                </span>

                <p className="text-xs text-kalari-beige/80 leading-relaxed mb-6">
                  {prog.description}
                </p>

                {/* Highlights */}
                <div className="space-y-2.5 pt-4 border-t border-kalari-gold/15">
                  <span className="text-[11px] font-bold text-kalari-gold tracking-widest uppercase block">
                    Core Focus:
                  </span>
                  {prog.highlights.map((h, hIdx) => (
                    <div key={hIdx} className="flex items-start gap-2 text-xs text-kalari-beige/90">
                      <CheckCircle className="w-3.5 h-3.5 text-kalari-gold shrink-0 mt-0.5" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom CTA & Target Audience */}
              <div className="mt-8 pt-4 border-t border-kalari-gold/20">
                <div className="text-[11px] text-kalari-beige/60 mb-4 flex items-center gap-1.5">
                  <Users className="w-3 h-3 text-kalari-gold/80" />
                  <span className="truncate">{prog.idealFor}</span>
                </div>
                <a
                  href="#contact"
                  className="w-full py-2.5 rounded text-center block bg-kalari-black border border-kalari-gold/40 text-kalari-gold hover:bg-kalari-gold hover:text-kalari-black font-serif font-bold text-xs tracking-widest uppercase transition-all duration-300 shadow-gold"
                >
                  Enroll In Program
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
