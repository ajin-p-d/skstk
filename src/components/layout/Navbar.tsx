'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { useRole } from '@/context/RoleContext';
import {
  Shield,
  UserCheck,
  Menu,
  X,
  ChevronRight,
  LogOut,
  LayoutDashboard,
  User,
  Sparkles,
} from 'lucide-react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { role, setRole, activeStudent, setActiveStudent, logout } = useRole();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '/#hero' },
    { name: 'Story', href: '/#story' },
    { name: 'About', href: '/#about' },
    { name: 'Programs', href: '/#programs' },
    { name: 'Masters', href: '/#masters' },
    { name: 'Gallery', href: '/#gallery' },
    { name: 'Schedule', href: '/#schedule' },
    { name: 'Contact', href: '/#contact' },
  ];

  const handleDemoSwitch = (targetRole: 'admin' | 'student' | 'visitor') => {
    if (targetRole === 'admin') {
      setRole('admin');
      setActiveStudent(null);
      router.push('/admin');
    } else if (targetRole === 'student') {
      // Set to Arun Kumar (KAL-2026-001)
      const mockStudent = {
        id: 'stu-1',
        student_id: 'KAL-2026-001',
        name: 'Arun Kumar',
        phone: '+91 98471 23456',
        parent_name: 'Suresh Kumar',
        parent_phone: '+91 98471 23450',
        date_of_birth: '2005-04-14',
        age: 21,
        gender: 'Male' as const,
        address: 'Chirakkal, Kannur, Kerala 670011',
        joining_date: '2024-01-10',
        batch_id: 'batch-evening',
        training_level: 'Intermediate' as const,
        status: 'active' as const,
        blood_group: 'O+ve',
        emergency_notes: 'Proficient in Meipayattu. Learning Kolthari long staff.',
        created_at: '2024-01-10T10:00:00Z',
      };
      setActiveStudent(mockStudent);
      setRole('student');
      router.push('/student');
    } else {
      logout();
      router.push('/');
    }
  };

  return (
    <>
      {/* Top Demo Bar for Reviewer Convenience */}
      <div className="bg-kalari-darkBrown/90 border-b border-kalari-gold/20 py-1.5 px-4 text-xs text-kalari-beige/90 backdrop-blur z-50 relative">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="flex h-2 w-2 rounded-full bg-kalari-gold animate-pulse" />
            <span className="font-semibold text-kalari-gold tracking-wide uppercase">
              Demo Role Mode:
            </span>
            <span className="text-kalari-white font-medium">
              {role === 'admin'
                ? 'Gurukkal Administrator'
                : role === 'student'
                ? `Student Portal (${activeStudent?.name || 'Arun Kumar'} • ${activeStudent?.student_id || 'KAL-2026-001'})`
                : 'Public Visitor'}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-kalari-beige/60 hidden sm:inline">Switch view:</span>
            <button
              onClick={() => handleDemoSwitch('visitor')}
              className={`px-2.5 py-0.5 rounded text-[11px] font-medium transition-all ${
                role === 'visitor'
                  ? 'bg-kalari-gold text-kalari-black font-bold shadow-gold'
                  : 'bg-kalari-black/50 text-kalari-beige/80 hover:text-kalari-gold border border-kalari-earth/40'
              }`}
            >
              Public Web
            </button>
            <button
              onClick={() => handleDemoSwitch('admin')}
              className={`px-2.5 py-0.5 rounded text-[11px] font-medium flex items-center gap-1 transition-all ${
                role === 'admin'
                  ? 'bg-kalari-gold text-kalari-black font-bold shadow-gold'
                  : 'bg-kalari-black/50 text-kalari-beige/80 hover:text-kalari-gold border border-kalari-earth/40'
              }`}
            >
              <Shield className="w-3 h-3" />
              Admin Portal
            </button>
            <button
              onClick={() => handleDemoSwitch('student')}
              className={`px-2.5 py-0.5 rounded text-[11px] font-medium flex items-center gap-1 transition-all ${
                role === 'student'
                  ? 'bg-kalari-gold text-kalari-black font-bold shadow-gold'
                  : 'bg-kalari-black/50 text-kalari-beige/80 hover:text-kalari-gold border border-kalari-earth/40'
              }`}
            >
              <UserCheck className="w-3 h-3" />
              Student Portal
            </button>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          scrolled
            ? 'bg-kalari-black/95 backdrop-blur-md shadow-2xl border-b border-kalari-gold/20 py-2.5'
            : 'bg-gradient-to-b from-kalari-black/90 to-transparent py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo & Title */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
              <div className="w-full h-full flex items-center justify-center overflow-hidden">
                <Image
                  src="/images/kalari-logo.png"
                  alt="Kalari Emblem"
                  width={52}
                  height={52}
                  className="object-contain"
                />
              </div>
            </div>
            <div>
              <span className="font-serif tracking-widest text-lg sm:text-xl font-extrabold text-kalari-white block leading-none group-hover:text-kalari-gold transition-colors">
                SREEDURGA
              </span>
              <span className="text-[10px] sm:text-xs text-kalari-gold tracking-[0.2em] font-medium block mt-1 uppercase">
                Thulunadan Kalari
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-sm font-medium tracking-wide text-kalari-beige/80 hover:text-kalari-gold transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-kalari-gold hover:after:w-full after:transition-all after:duration-300"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Action CTAs */}
          <div className="hidden sm:flex items-center gap-3">
            {role === 'admin' ? (
              <Link
                href="/admin"
                className="px-4 py-2 rounded-md bg-kalari-gold text-kalari-black font-semibold text-xs tracking-wider uppercase flex items-center gap-1.5 shadow-gold hover:bg-kalari-goldLight transition-all"
              >
                <LayoutDashboard className="w-3.5 h-3.5" />
                Admin Dashboard
              </Link>
            ) : role === 'student' ? (
              <Link
                href="/student"
                className="px-4 py-2 rounded-md bg-kalari-gold text-kalari-black font-semibold text-xs tracking-wider uppercase flex items-center gap-1.5 shadow-gold hover:bg-kalari-goldLight transition-all"
              >
                <User className="w-3.5 h-3.5" />
                My Student Portal
              </Link>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  href="/login?role=student"
                  className="px-3.5 py-1.5 rounded text-xs font-semibold tracking-wider uppercase text-kalari-beige/90 hover:text-kalari-gold border border-kalari-gold/30 hover:border-kalari-gold transition-all"
                >
                  Student Login
                </Link>
                <Link
                  href="/login?role=admin"
                  className="px-3.5 py-1.5 rounded text-xs font-semibold tracking-wider uppercase bg-gradient-to-r from-kalari-gold to-kalari-goldDark text-kalari-black hover:brightness-110 shadow-gold transition-all flex items-center gap-1"
                >
                  <Shield className="w-3 h-3" />
                  Admin
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu trigger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-md text-kalari-beige hover:text-kalari-gold focus:outline-none"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile menu dropdown */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-kalari-black/98 border-b border-kalari-gold/30 px-6 py-6 transition-all duration-300">
            <div className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-base font-medium text-kalari-beige hover:text-kalari-gold py-1 flex items-center justify-between border-b border-kalari-darkBrown/60"
                >
                  <span>{link.name}</span>
                  <ChevronRight className="w-4 h-4 text-kalari-gold/50" />
                </Link>
              ))}

              <div className="pt-4 flex flex-col gap-3">
                <Link
                  href="/login?role=student"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full py-2.5 text-center text-sm font-semibold rounded bg-kalari-darkBrown border border-kalari-gold/40 text-kalari-beige hover:text-kalari-gold"
                >
                  Student Login
                </Link>
                <Link
                  href="/login?role=admin"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full py-2.5 text-center text-sm font-semibold rounded bg-kalari-gold text-kalari-black hover:bg-kalari-goldLight shadow-gold"
                >
                  Admin Gurukkal Login
                </Link>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
