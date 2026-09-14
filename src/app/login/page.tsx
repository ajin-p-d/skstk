'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useRole } from '@/context/RoleContext';
import { Shield, User, Sparkles, ArrowRight, Lock } from 'lucide-react';

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialRole = searchParams.get('role') === 'admin' ? 'admin' : 'student';

  const [activeTab, setActiveTab] = useState<'student' | 'admin'>(initialRole);
  const [studentId, setStudentId] = useState('KAL-2026-001');
  const [adminEmail, setAdminEmail] = useState('admin@thulunadankalari.org');
  const [password, setPassword] = useState('••••••••');
  const [errorMsg, setErrorMsg] = useState('');

  const { loginAsAdmin, loginAsStudent } = useRole();

  useEffect(() => {
    if (searchParams.get('role') === 'admin') {
      setActiveTab('admin');
    }
  }, [searchParams]);

  const handleStudentLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    const success = await loginAsStudent(studentId);
    if (success) {
      router.push('/student');
    } else {
      setErrorMsg('Invalid Student ID. Use demo ID: KAL-2026-001');
    }
  };

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    loginAsAdmin();
    router.push('/admin');
  };

  const quickDemoLogin = (type: 'student' | 'admin') => {
    if (type === 'student') {
      loginAsStudent('KAL-2026-001').then(() => router.push('/student'));
    } else {
      loginAsAdmin();
      router.push('/admin');
    }
  };

  return (
    <div className="relative z-10 w-full max-w-md bg-kalari-darkBrown/90 border-2 border-kalari-gold/40 rounded-2xl shadow-gold-lg overflow-hidden backdrop-blur">
      {/* Tab Switcher */}
      <div className="grid grid-cols-2 border-b border-kalari-gold/30">
        <button
          onClick={() => {
            setActiveTab('student');
            setErrorMsg('');
          }}
          className={`py-3.5 text-xs font-serif uppercase tracking-widest font-bold flex items-center justify-center gap-2 transition-all ${
            activeTab === 'student'
              ? 'bg-kalari-gold text-kalari-black shadow-gold'
              : 'bg-kalari-black/60 text-kalari-beige/70 hover:text-kalari-gold'
          }`}
        >
          <User className="w-4 h-4" />
          <span>STUDENT LOGIN</span>
        </button>

        <button
          onClick={() => {
            setActiveTab('admin');
            setErrorMsg('');
          }}
          className={`py-3.5 text-xs font-serif uppercase tracking-widest font-bold flex items-center justify-center gap-2 transition-all ${
            activeTab === 'admin'
              ? 'bg-kalari-gold text-kalari-black shadow-gold'
              : 'bg-kalari-black/60 text-kalari-beige/70 hover:text-kalari-gold'
          }`}
        >
          <Shield className="w-4 h-4" />
          <span>ADMIN LOGIN</span>
        </button>
      </div>

      {/* Student Form */}
      {activeTab === 'student' ? (
        <form onSubmit={handleStudentLogin} className="p-8 space-y-5">
          <div>
            <span className="text-xs font-serif uppercase tracking-wider text-kalari-gold block mb-1">
              Student Identifier
            </span>
            <h3 className="font-serif text-lg font-bold text-kalari-white">
              Enter Your Student ID
            </h3>
            <p className="text-xs text-kalari-beige/70 font-light mt-0.5">
              Provided during your initiation ceremony
            </p>
          </div>

          {errorMsg && (
            <div className="p-3 rounded bg-red-950/80 border border-red-800 text-red-300 text-xs">
              {errorMsg}
            </div>
          )}

          <div>
            <label className="block text-[11px] font-serif uppercase tracking-wider text-kalari-gold mb-1.5 font-semibold">
              Student ID
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-kalari-gold absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                required
                placeholder="e.g. KAL-2026-001"
                value={studentId}
                onChange={(e) => setStudentId(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-kalari-black border border-kalari-earth focus:border-kalari-gold text-xs text-kalari-white font-mono tracking-wider focus:outline-none"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-lg gold-gradient-bg text-kalari-black font-serif font-bold text-xs uppercase tracking-widest shadow-gold hover:brightness-110 transition-all flex items-center justify-center gap-2"
          >
            <span>Access Student Portal</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          {/* Quick Demo Button */}
          <div className="pt-4 border-t border-kalari-gold/20 text-center">
            <span className="text-[11px] text-kalari-beige/60 block mb-2">
              Quick Evaluator Access:
            </span>
            <button
              type="button"
              onClick={() => quickDemoLogin('student')}
              className="w-full py-2 px-3 rounded bg-kalari-black border border-kalari-gold/30 text-kalari-gold text-xs font-serif uppercase tracking-wider hover:bg-kalari-gold hover:text-kalari-black transition-all flex items-center justify-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Instant Login as Arun Kumar (KAL-2026-001)</span>
            </button>
          </div>
        </form>
      ) : (
        /* Admin Form */
        <form onSubmit={handleAdminLogin} className="p-8 space-y-5">
          <div>
            <span className="text-xs font-serif uppercase tracking-wider text-kalari-gold block mb-1">
              Gurukkal Administration
            </span>
            <h3 className="font-serif text-lg font-bold text-kalari-white">
              Admin Secure Desk
            </h3>
            <p className="text-xs text-kalari-beige/70 font-light mt-0.5">
              Restricted to authorized instructors and masters
            </p>
          </div>

          <div>
            <label className="block text-[11px] font-serif uppercase tracking-wider text-kalari-gold mb-1.5 font-semibold">
              Admin Email
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-kalari-gold absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={adminEmail}
                onChange={(e) => setAdminEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-kalari-black border border-kalari-earth focus:border-kalari-gold text-xs text-kalari-white focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-serif uppercase tracking-wider text-kalari-gold mb-1.5 font-semibold">
              Passphrase
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-kalari-gold absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-kalari-black border border-kalari-earth focus:border-kalari-gold text-xs text-kalari-white focus:outline-none"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-lg gold-gradient-bg text-kalari-black font-serif font-bold text-xs uppercase tracking-widest shadow-gold hover:brightness-110 transition-all flex items-center justify-center gap-2"
          >
            <span>Access Gurukkal Desk</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          {/* Quick Demo Button */}
          <div className="pt-4 border-t border-kalari-gold/20 text-center">
            <span className="text-[11px] text-kalari-beige/60 block mb-2">
              Quick Evaluator Access:
            </span>
            <button
              type="button"
              onClick={() => quickDemoLogin('admin')}
              className="w-full py-2 px-3 rounded bg-kalari-black border border-kalari-gold/30 text-kalari-gold text-xs font-serif uppercase tracking-wider hover:bg-kalari-gold hover:text-kalari-black transition-all flex items-center justify-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Instant Login as Chief Gurukkal</span>
            </button>
          </div>
        </form>
      )}

      <div className="px-8 py-4 bg-kalari-black/80 border-t border-kalari-gold/20 text-center text-xs text-kalari-beige/60">
        <Link href="/" className="hover:text-kalari-gold transition-colors">
          ← Return to Public Homepage
        </Link>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-kalari-black text-kalari-white flex flex-col justify-center items-center p-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-radial-flame opacity-40 pointer-events-none" />
      <div className="relative z-10 text-center mb-8">
        <Link href="/" className="inline-flex flex-col items-center group">
          <div className="w-16 h-16 rounded-full bg-kalari-darkBrown border-2 border-kalari-gold flex items-center justify-center p-2 shadow-gold group-hover:scale-105 transition-transform">
            <Image
              src="/images/kalari-logo.png"
              alt="Kalari Logo"
              width={50}
              height={50}
              className="object-contain"
            />
          </div>
          <span className="font-serif tracking-widest text-xl font-black text-kalari-white block mt-3 uppercase text-gold-gradient">
            THULUNADAN KALARI
          </span>
          <span className="text-[11px] text-kalari-gold tracking-[0.25em] font-medium block uppercase">
            Authentication Portal
          </span>
        </Link>
      </div>

      <Suspense fallback={<div className="text-kalari-gold font-serif">Loading portal...</div>}>
        <LoginForm />
      </Suspense>
    </div>
  );
}
