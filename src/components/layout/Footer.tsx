'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Sparkles, Shield, Heart, MapPin, Phone, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-kalari-black text-kalari-white border-t border-kalari-gold/30 pt-16 pb-12 relative overflow-hidden">
      {/* Subtle Lamp Glow at Center Top */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-1 bg-gradient-to-r from-transparent via-kalari-gold to-transparent shadow-lamp" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-kalari-earth/40">
          {/* Col 1: Logo & Essence */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-kalari-black border border-kalari-gold/40 flex items-center justify-center overflow-hidden p-1 shadow-gold">
                <Image
                  src="/images/kalari-logo.png"
                  alt="Kalari Logo"
                  width={34}
                  height={34}
                  className="object-contain"
                />
              </div>
              <span className="font-serif tracking-widest text-lg font-black text-kalari-white block">
                THULUNADAN KALARI
              </span>
            </div>

            <p className="text-xs text-kalari-beige/75 font-light leading-relaxed">
              Preserving the primordial warrior lineage of northern Kerala. Combining three thousand years of battlefield discipline with contemporary health, flexibility, and student management.
            </p>

            <div className="pt-2 text-xs font-serif text-kalari-goldLight italic">
              "Train the Body. Discipline the Mind. Strengthen the Spirit."
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="space-y-4">
            <h4 className="font-serif text-sm font-bold text-kalari-gold uppercase tracking-widest">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs text-kalari-beige/80">
              <li>
                <a href="/#hero" className="hover:text-kalari-gold transition-colors">Home Introduction</a>
              </li>
              <li>
                <a href="/#story" className="hover:text-kalari-gold transition-colors">Cinematic Scroll Story</a>
              </li>
              <li>
                <a href="/#about" className="hover:text-kalari-gold transition-colors">The 4 Stages of Kalari</a>
              </li>
              <li>
                <a href="/#programs" className="hover:text-kalari-gold transition-colors">Training Programs</a>
              </li>
              <li>
                <a href="/#masters" className="hover:text-kalari-gold transition-colors">Gurukkals & Masters</a>
              </li>
              <li>
                <a href="/#gallery" className="hover:text-kalari-gold transition-colors">Arena Gallery</a>
              </li>
              <li>
                <a href="/#schedule" className="hover:text-kalari-gold transition-colors">Class Timetable</a>
              </li>
            </ul>
          </div>

          {/* Col 3: Student Management & Portals */}
          <div className="space-y-4">
            <h4 className="font-serif text-sm font-bold text-kalari-gold uppercase tracking-widest">
              Digital Portals
            </h4>
            <ul className="space-y-2 text-xs text-kalari-beige/80">
              <li>
                <Link href="/admin" className="hover:text-kalari-gold transition-colors flex items-center gap-1.5">
                  <Shield className="w-3.5 h-3.5 text-kalari-gold" />
                  <span>Admin Gurukkal Dashboard</span>
                </Link>
              </li>
              <li>
                <Link href="/student" className="hover:text-kalari-gold transition-colors flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-kalari-gold" />
                  <span>Student Attendance & Fees</span>
                </Link>
              </li>
              <li>
                <Link href="/login" className="hover:text-kalari-gold transition-colors flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-kalari-gold" />
                  <span>Secure Login</span>
                </Link>
              </li>
            </ul>

            <div className="mt-4 p-3 rounded bg-kalari-darkBrown/60 border border-kalari-gold/20 text-[11px] text-kalari-beige/70">
              <span className="text-kalari-gold font-semibold block mb-1">Authentic Malayalam Vandanam:</span>
              <p className="italic font-serif leading-snug">
                "ഗുരുവേ നമഃ ഗുരുർ ബ്രഹ്മ ഗുരുർ വിഷ്ണു ഗുരുർ ദേവോ മഹേശ്വര..."
              </p>
            </div>
          </div>

          {/* Col 4: Location & Contact */}
          <div className="space-y-4">
            <h4 className="font-serif text-sm font-bold text-kalari-gold uppercase tracking-widest">
              Kannur Kalari Arena
            </h4>
            <div className="space-y-2 text-xs text-kalari-beige/80">
              <p className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-kalari-gold shrink-0 mt-0.5" />
                <span>Kuzhi Kalari Complex, Chirakkal, Kannur, Kerala 670011</span>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-kalari-gold shrink-0" />
                <span>+91 98471 23456</span>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-kalari-gold shrink-0" />
                <span>info@thulunadankalari.org</span>
              </p>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-kalari-beige/60">
          <p>© {new Date().getFullYear()} Thulunadan Kalaripayattu Academy. All Rights Reserved.</p>
          <p className="text-[11px] flex items-center gap-1">
            <span>Tradition</span>
            <span className="text-kalari-gold">×</span>
            <span>Discipline</span>
            <span className="text-kalari-gold">×</span>
            <span>Technology</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
