'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, Sun, Moon, Sparkles, CheckCircle2, ShieldAlert } from 'lucide-react';

export default function ScheduleSection() {
  const [activeDay, setActiveDay] = useState<string>('Monday');

  const scheduleData = [
    {
      day: 'Monday',
      morning: '6:00 AM – 7:30 AM',
      morningFocus: 'Meipayattu conditioning, Kaalukal kicks & stance geometry',
      evening: '5:00 PM – 7:00 PM',
      eveningFocus: 'Intermediate Kolthari (Kettukari staff drills & partner defense)',
    },
    {
      day: 'Tuesday',
      morning: '6:00 AM – 7:30 AM',
      morningFocus: 'Animal Postures (Ashta Vadivu) & core spinal flexibility',
      evening: '5:00 PM – 7:00 PM',
      eveningFocus: 'Angathari intro (Val & Paricha sword & buckler shield)',
    },
    {
      day: 'Wednesday',
      morning: '6:00 AM – 7:30 AM',
      morningFocus: 'Breathing dynamics (Pranayama) & Kaikuthu payattu flow',
      evening: '5:00 PM – 7:00 PM',
      eveningFocus: 'Verumkai (Empty hand self-defense, locks, and counter-strikes)',
    },
    {
      day: 'Thursday',
      morning: '6:00 AM – 7:30 AM',
      morningFocus: 'Chuvadukal footwork sequences & aerial turns',
      evening: '5:00 PM – 7:00 PM',
      eveningFocus: 'Otta & Muchan curved horn weapon vital point targeting',
    },
    {
      day: 'Friday',
      morning: '6:00 AM – 7:30 AM',
      morningFocus: 'High-intensity endurance conditioning & leg flexibility',
      evening: '5:00 PM – 7:00 PM',
      eveningFocus: 'Combat sparring drills & partner synchronization',
    },
    {
      day: 'Saturday',
      morning: '7:00 AM – 9:30 AM (Special)',
      morningFocus: 'Weekend Intensive: Advanced Angathari & Urumi ribbon blade flow',
      evening: '4:30 PM – 7:00 PM (Special)',
      eveningFocus: 'Marma Chikitsa workshop, recovery massage & Guruvandanam',
    },
    {
      day: 'Sunday',
      morning: 'Special Seminars / Workshops',
      morningFocus: 'Guest master demonstrations & open arena practice',
      evening: 'Arena Rest & Maintenance',
      eveningFocus: 'Red soil consecration & oiling tradition',
    },
  ];

  return (
    <section id="schedule" className="py-28 bg-kalari-darkBrown/40 text-kalari-white relative border-b border-kalari-earth/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-semibold tracking-[0.3em] uppercase text-kalari-gold block mb-3">
            Arena Timetable
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-black text-kalari-white tracking-wider uppercase text-gold-gradient mb-6">
            CLASS SCHEDULE
          </h2>
          <p className="text-kalari-beige/80 text-base sm:text-lg font-light leading-relaxed">
            Training is offered in traditional morning and evening sessions aligned with the natural circadian rhythms and solar energies of Kerala.
          </p>
        </div>

        {/* Schedule Table */}
        <div className="overflow-x-auto rounded-2xl border border-kalari-gold/30 bg-kalari-darkBrown/90 shadow-gold">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-kalari-gold/30 bg-kalari-black/80 font-serif text-xs sm:text-sm tracking-wider uppercase text-kalari-gold">
                <th className="py-5 px-6 font-bold">Day of Week</th>
                <th className="py-5 px-6 font-bold flex-1">
                  <div className="flex items-center gap-2">
                    <Sun className="w-4 h-4 text-kalari-goldLight" />
                    <span>Morning Session</span>
                  </div>
                </th>
                <th className="py-5 px-6 font-bold flex-1">
                  <div className="flex items-center gap-2">
                    <Moon className="w-4 h-4 text-kalari-goldLight" />
                    <span>Evening Session</span>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-kalari-gold/15 text-xs sm:text-sm">
              {scheduleData.map((row, idx) => (
                <tr
                  key={row.day}
                  className={`hover:bg-kalari-black/50 transition-colors ${
                    idx % 2 === 0 ? 'bg-transparent' : 'bg-kalari-black/20'
                  }`}
                >
                  <td className="py-4 px-6 font-serif font-bold text-kalari-white whitespace-nowrap">
                    <span className="text-kalari-gold mr-2">•</span>
                    {row.day}
                  </td>
                  <td className="py-4 px-6">
                    <span className="font-semibold text-kalari-goldLight block text-sm">
                      {row.morning}
                    </span>
                    <span className="text-xs text-kalari-beige/70 block mt-0.5">
                      {row.morningFocus}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <span className="font-semibold text-kalari-goldLight block text-sm">
                      {row.evening}
                    </span>
                    <span className="text-xs text-kalari-beige/70 block mt-0.5">
                      {row.eveningFocus}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Arena Rules & Prerequisites */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-5 rounded-xl bg-kalari-darkBrown/60 border border-kalari-gold/20 flex items-start gap-3.5">
            <CheckCircle2 className="w-5 h-5 text-kalari-gold shrink-0 mt-0.5" />
            <div>
              <h4 className="font-serif text-sm font-bold text-kalari-gold">Traditional Attire</h4>
              <p className="text-xs text-kalari-beige/70 mt-1">
                Practitioners train in traditional red/black <em>Kacha</em> or comfortable martial cotton pants. Barefoot in the arena.
              </p>
            </div>
          </div>

          <div className="p-5 rounded-xl bg-kalari-darkBrown/60 border border-kalari-gold/20 flex items-start gap-3.5">
            <CheckCircle2 className="w-5 h-5 text-kalari-gold shrink-0 mt-0.5" />
            <div>
              <h4 className="font-serif text-sm font-bold text-kalari-gold">Punctuality & Discipline</h4>
              <p className="text-xs text-kalari-beige/70 mt-1">
                Arrive 10 minutes prior to session to apply traditional sesame oil and perform silent meditation before Poothara.
              </p>
            </div>
          </div>

          <div className="p-5 rounded-xl bg-kalari-darkBrown/60 border border-kalari-gold/20 flex items-start gap-3.5">
            <CheckCircle2 className="w-5 h-5 text-kalari-gold shrink-0 mt-0.5" />
            <div>
              <h4 className="font-serif text-sm font-bold text-kalari-gold">Beginner Guidance</h4>
              <p className="text-xs text-kalari-beige/70 mt-1">
                Fresh students undergo individual body conditioning under Asan supervision before advancing to partner drills.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
