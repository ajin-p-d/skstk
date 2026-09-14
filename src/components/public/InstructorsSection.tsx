'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { instructorsData } from '@/lib/data/seed';
import { Shield, Sparkles, Award, Quote } from 'lucide-react';

export default function InstructorsSection() {
  return (
    <section id="masters" className="py-28 bg-kalari-darkBrown/40 text-kalari-white relative border-b border-kalari-earth/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-semibold tracking-[0.3em] uppercase text-kalari-gold block mb-3">
            The Gurukkal Lineage
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-black text-kalari-white tracking-wider uppercase text-gold-gradient mb-6">
            MASTERS & INSTRUCTORS
          </h2>
          <p className="text-kalari-beige/80 text-base sm:text-lg font-light leading-relaxed">
            Our Gurukkals and Asans are lifelong practitioners of the Thulunadan and Northern Kalari traditions, passing the sacred flame of discipline and martial science to the next generation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {instructorsData.map((master, idx) => (
            <motion.div
              key={master.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 0.8, delay: idx * 0.15 }}
              className="rounded-2xl bg-kalari-darkBrown/90 border border-kalari-gold/30 hover:border-kalari-gold shadow-gold overflow-hidden flex flex-col group transition-all duration-300 hover:-translate-y-1.5"
            >
              {/* Profile Image with Traditional Vignette */}
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-kalari-black">
                <Image
                  src={master.image}
                  alt={master.name}
                  fill
                  className="object-cover object-top group-hover:scale-105 transition-transform duration-500 filter brightness-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-kalari-darkBrown via-transparent to-transparent" />
                <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-kalari-black/80 border border-kalari-gold/40 text-kalari-gold text-xs font-semibold tracking-wider uppercase backdrop-blur">
                  {master.experience}
                </div>
              </div>

              {/* Master Details */}
              <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between space-y-5">
                <div>
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-kalari-white tracking-wide group-hover:text-kalari-gold transition-colors">
                    {master.name}
                  </h3>
                  <span className="text-xs font-medium text-kalari-gold tracking-widest uppercase block mt-1">
                    {master.designation}
                  </span>

                  <p className="text-xs text-kalari-beige/70 mt-3 font-light leading-relaxed">
                    {master.bio}
                  </p>
                </div>

                {/* Specializations */}
                <div>
                  <h4 className="text-[11px] font-bold uppercase tracking-[0.2em] text-kalari-beige/60 mb-2">
                    Specialization:
                  </h4>
                  <ul className="space-y-1 text-xs text-kalari-beige/90">
                    {master.specialization.map((spec, sIdx) => (
                      <li key={sIdx} className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-kalari-gold shrink-0" />
                        <span>{spec}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Quote */}
                <div className="pt-4 border-t border-kalari-gold/20 flex items-start gap-2.5">
                  <Quote className="w-4 h-4 text-kalari-gold/60 shrink-0 mt-0.5" />
                  <p className="italic font-serif text-xs sm:text-sm text-kalari-goldLight font-medium">
                    "{master.quote}"
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
