'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { useRole } from '@/context/RoleContext';
import {
  LogIn,
  LogOut,
  LayoutDashboard,
  User,
  Menu,
  X,
  ChevronRight,
} from 'lucide-react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { role, currentUser, activeStudent, logout } = useRole();

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

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  return (
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
            <div className="flex items-center gap-2">
              <Link
                href="/admin"
                className="px-4 py-2 rounded-md bg-kalari-gold text-kalari-black font-semibold text-xs tracking-wider uppercase flex items-center gap-1.5 shadow-gold hover:bg-kalari-goldLight transition-all"
              >
                <LayoutDashboard className="w-3.5 h-3.5" />
                <span>Admin Dashboard</span>
              </Link>
              <button
                onClick={handleLogout}
                title="Log Out"
                className="p-2 rounded-md bg-kalari-darkBrown/80 border border-kalari-gold/30 text-kalari-beige hover:text-red-400 hover:border-red-400/50 transition-all"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : role === 'student' ? (
            <div className="flex items-center gap-2">
              <Link
                href="/student"
                className="px-4 py-2 rounded-md bg-kalari-gold text-kalari-black font-semibold text-xs tracking-wider uppercase flex items-center gap-1.5 shadow-gold hover:bg-kalari-goldLight transition-all"
              >
                <User className="w-3.5 h-3.5" />
                <span>Student Portal ({activeStudent?.name || currentUser?.name || 'Student'})</span>
              </Link>
              <button
                onClick={handleLogout}
                title="Log Out"
                className="p-2 rounded-md bg-kalari-darkBrown/80 border border-kalari-gold/30 text-kalari-beige hover:text-red-400 hover:border-red-400/50 transition-all"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <Link
              href="/login"
              className="px-5 py-2 rounded-md bg-gradient-to-r from-kalari-gold to-kalari-goldDark text-kalari-black font-serif font-bold text-xs tracking-widest uppercase hover:brightness-110 shadow-gold transition-all flex items-center gap-2"
            >
              <LogIn className="w-3.5 h-3.5" />
              <span>LOGIN</span>
            </Link>
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

            <div className="pt-4 flex flex-col gap-2.5">
              {role === 'admin' ? (
                <>
                  <Link
                    href="/admin"
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-full py-2.5 text-center text-sm font-semibold rounded bg-kalari-gold text-kalari-black shadow-gold flex items-center justify-center gap-2"
                  >
                    <LayoutDashboard className="w-4 h-4" />
                    <span>Admin Dashboard</span>
                  </Link>
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      handleLogout();
                    }}
                    className="w-full py-2 text-center text-xs font-medium rounded bg-red-950/40 border border-red-800 text-red-300 flex items-center justify-center gap-1.5"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>Log Out</span>
                  </button>
                </>
              ) : role === 'student' ? (
                <>
                  <Link
                    href="/student"
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-full py-2.5 text-center text-sm font-semibold rounded bg-kalari-gold text-kalari-black shadow-gold flex items-center justify-center gap-2"
                  >
                    <User className="w-4 h-4" />
                    <span>Student Dashboard</span>
                  </Link>
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      handleLogout();
                    }}
                    className="w-full py-2 text-center text-xs font-medium rounded bg-red-950/40 border border-red-800 text-red-300 flex items-center justify-center gap-1.5"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>Log Out</span>
                  </button>
                </>
              ) : (
                <Link
                  href="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full py-2.5 text-center text-sm font-bold font-serif uppercase tracking-widest rounded bg-kalari-gold text-kalari-black hover:bg-kalari-goldLight shadow-gold flex items-center justify-center gap-2"
                >
                  <LogIn className="w-4 h-4" />
                  <span>LOGIN</span>
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
