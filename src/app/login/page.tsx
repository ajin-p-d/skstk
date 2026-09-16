'use client';

import React, { useState, Suspense } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useRole } from '@/context/RoleContext';
import {
  Shield,
  User,
  Lock,
  Mail,
  Phone,
  ArrowRight,
  AlertCircle,
  CheckCircle2,
  Clock,
  Sparkles,
} from 'lucide-react';

function LoginForm() {
  const router = useRouter();
  const { loginWithCredentials } = useRole();

  const [mode, setMode] = useState<'login' | 'register'>('login');

  // Login form state
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  // Register form state
  const [registerName, setRegisterName] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [registerPhone, setRegisterPhone] = useState('');
  const [registerStudentId, setRegisterStudentId] = useState('');

  // Status state
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isPendingApproval, setIsPendingApproval] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setIsPendingApproval(false);
    setLoading(true);

    try {
      const res = await loginWithCredentials(loginEmail, loginPassword);
      if (res.success) {
        if (res.role === 'admin') {
          router.push('/admin');
        } else {
          router.push('/student');
        }
      } else {
        if (res.pending) {
          setIsPendingApproval(true);
        } else {
          setErrorMessage(res.error || 'Invalid email or password.');
        }
      }
    } catch (err: any) {
      setErrorMessage(err.message || 'Login failed.');
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');
    setLoading(true);

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: registerName,
          email: registerEmail,
          password: registerPassword,
          phone: registerPhone,
          student_id: registerStudentId || undefined,
        }),
      });
      const data = await res.json();

      if (data.success) {
        setSuccessMessage(
          data.message ||
            'Registration submitted successfully! Your account is pending admin approval.'
        );
        // Switch to login tab and prefill email
        setLoginEmail(registerEmail);
        setLoginPassword('');
        setTimeout(() => {
          setMode('login');
        }, 3000);
      } else {
        setErrorMessage(data.error || 'Failed to submit registration');
      }
    } catch (err: any) {
      setErrorMessage(err.message || 'Error submitting registration');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative z-10 w-full max-w-md bg-kalari-darkBrown/95 border-2 border-kalari-gold/40 rounded-2xl shadow-gold-lg overflow-hidden backdrop-blur">
      {/* Mode Switcher */}
      <div className="grid grid-cols-2 border-b border-kalari-gold/30">
        <button
          type="button"
          onClick={() => {
            setMode('login');
            setErrorMessage('');
            setIsPendingApproval(false);
          }}
          className={`py-3.5 text-xs font-serif uppercase tracking-widest font-bold flex items-center justify-center gap-2 transition-all ${
            mode === 'login'
              ? 'bg-kalari-gold text-kalari-black shadow-gold'
              : 'bg-kalari-black/60 text-kalari-beige/70 hover:text-kalari-gold'
          }`}
        >
          <Lock className="w-3.5 h-3.5" />
          <span>SIGN IN</span>
        </button>

        <button
          type="button"
          onClick={() => {
            setMode('register');
            setErrorMessage('');
            setIsPendingApproval(false);
          }}
          className={`py-3.5 text-xs font-serif uppercase tracking-widest font-bold flex items-center justify-center gap-2 transition-all ${
            mode === 'register'
              ? 'bg-kalari-gold text-kalari-black shadow-gold'
              : 'bg-kalari-black/60 text-kalari-beige/70 hover:text-kalari-gold'
          }`}
        >
          <User className="w-3.5 h-3.5" />
          <span>REQUEST ACCESS</span>
        </button>
      </div>

      {mode === 'login' ? (
        /* LOGIN FORM */
        <form onSubmit={handleLogin} className="p-7 sm:p-8 space-y-5">
          <div>
            <span className="text-xs font-serif uppercase tracking-wider text-kalari-gold block mb-1">
              Kalari Arena Access
            </span>
            <h3 className="font-serif text-xl font-bold text-kalari-white text-gold-gradient">
              Portal Sign In
            </h3>
            <p className="text-xs text-kalari-beige/70 font-light mt-0.5">
              Enter your registered email and password to access your dashboard.
            </p>
          </div>

          {/* Pending Approval Notice */}
          {isPendingApproval && (
            <div className="p-4 rounded-xl bg-amber-950/80 border border-amber-500/50 text-amber-200 text-xs space-y-2">
              <div className="flex items-center gap-2 font-serif font-bold uppercase tracking-wider text-amber-300">
                <Clock className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Pending Admin Approval</span>
              </div>
              <p className="leading-relaxed text-amber-100/90 font-light">
                Your account has been registered, but it has not been approved by the Admin yet. You
                will be able to log in once the Gurukkal/Admin approves your registration.
              </p>
            </div>
          )}

          {/* Error Message */}
          {errorMessage && !isPendingApproval && (
            <div className="p-3.5 rounded-xl bg-red-950/80 border border-red-500/50 text-red-200 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Success Message from registration */}
          {successMessage && (
            <div className="p-3.5 rounded-xl bg-emerald-950/80 border border-emerald-500/50 text-emerald-200 text-xs flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>{successMessage}</span>
            </div>
          )}

          {/* Email input */}
          <div>
            <label className="block text-[11px] font-serif uppercase tracking-wider text-kalari-gold mb-1.5 font-semibold">
              Email Address *
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-kalari-gold absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                placeholder="e.g. admin@gmail.com or your email"
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-kalari-black border border-kalari-earth focus:border-kalari-gold text-xs text-kalari-white focus:outline-none transition-colors"
              />
            </div>
          </div>

          {/* Password input */}
          <div>
            <label className="block text-[11px] font-serif uppercase tracking-wider text-kalari-gold mb-1.5 font-semibold">
              Password *
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-kalari-gold absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                placeholder="Enter password"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-kalari-black border border-kalari-earth focus:border-kalari-gold text-xs text-kalari-white focus:outline-none transition-colors"
              />
            </div>
          </div>

          {/* Submit button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-lg gold-gradient-bg text-kalari-black font-serif font-bold text-xs uppercase tracking-widest shadow-gold hover:brightness-110 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
          >
            <span>{loading ? 'Authenticating...' : 'Sign In to Portal'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          {/* Admin Credentials Helper */}
          <div className="pt-4 border-t border-kalari-gold/20 text-center space-y-1">
            <span className="text-[11px] text-kalari-beige/60 block">
              Admin Login:{' '}
              <strong className="text-kalari-gold font-mono font-medium">admin@gmail.com</strong> •
              Password: <strong className="text-kalari-gold font-mono font-medium">admin@123</strong>
            </span>
            <button
              type="button"
              onClick={() => {
                setLoginEmail('admin@gmail.com');
                setLoginPassword('admin@123');
              }}
              className="text-[10px] text-kalari-gold hover:underline uppercase tracking-wider"
            >
              Fill Admin Credentials
            </button>
          </div>
        </form>
      ) : (
        /* REGISTRATION / REQUEST ACCESS FORM */
        <form onSubmit={handleRegister} className="p-7 sm:p-8 space-y-4">
          <div>
            <span className="text-xs font-serif uppercase tracking-wider text-kalari-gold block mb-1">
              New Student Initiation
            </span>
            <h3 className="font-serif text-xl font-bold text-kalari-white text-gold-gradient">
              Request Student Access
            </h3>
            <p className="text-xs text-kalari-beige/70 font-light mt-0.5">
              Submit your details. Access to the student dashboard is granted only after Admin
              approval.
            </p>
          </div>

          {errorMessage && (
            <div className="p-3 rounded-xl bg-red-950/80 border border-red-500/50 text-red-200 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Full Name */}
          <div>
            <label className="block text-[11px] font-serif uppercase tracking-wider text-kalari-gold mb-1 font-semibold">
              Full Name *
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-kalari-gold absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                required
                placeholder="e.g. Rohit Nair"
                value={registerName}
                onChange={(e) => setRegisterName(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-lg bg-kalari-black border border-kalari-earth focus:border-kalari-gold text-xs text-kalari-white focus:outline-none"
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="block text-[11px] font-serif uppercase tracking-wider text-kalari-gold mb-1 font-semibold">
              Email Address *
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-kalari-gold absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                placeholder="e.g. rohit@gmail.com"
                value={registerEmail}
                onChange={(e) => setRegisterEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-lg bg-kalari-black border border-kalari-earth focus:border-kalari-gold text-xs text-kalari-white focus:outline-none"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-[11px] font-serif uppercase tracking-wider text-kalari-gold mb-1 font-semibold">
              Password *
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-kalari-gold absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                placeholder="Create a password"
                value={registerPassword}
                onChange={(e) => setRegisterPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-lg bg-kalari-black border border-kalari-earth focus:border-kalari-gold text-xs text-kalari-white focus:outline-none"
              />
            </div>
          </div>

          {/* Phone */}
          <div>
            <label className="block text-[11px] font-serif uppercase tracking-wider text-kalari-gold mb-1 font-semibold">
              Phone Number
            </label>
            <div className="relative">
              <Phone className="w-4 h-4 text-kalari-gold absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="tel"
                placeholder="+91 98470 00000"
                value={registerPhone}
                onChange={(e) => setRegisterPhone(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-lg bg-kalari-black border border-kalari-earth focus:border-kalari-gold text-xs text-kalari-white focus:outline-none"
              />
            </div>
          </div>

          {/* Optional Existing Student ID */}
          <div>
            <label className="block text-[11px] font-serif uppercase tracking-wider text-kalari-gold mb-1 font-semibold">
              Existing Student ID (Optional)
            </label>
            <input
              type="text"
              placeholder="e.g. KAL-2026-001 (if already enrolled)"
              value={registerStudentId}
              onChange={(e) => setRegisterStudentId(e.target.value)}
              className="w-full px-3.5 py-2 rounded-lg bg-kalari-black border border-kalari-earth focus:border-kalari-gold text-xs text-kalari-white focus:outline-none"
            />
          </div>

          {/* Policy Notice */}
          <div className="p-3 rounded-lg bg-kalari-black/60 border border-kalari-gold/20 text-[11px] text-kalari-beige/70 flex items-start gap-2">
            <Shield className="w-4 h-4 text-kalari-gold shrink-0 mt-0.5" />
            <span>
              All registration requests must be approved by the Gurukkal/Admin before you can log in
              to the student portal.
            </span>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 rounded-lg bg-kalari-gold text-kalari-black font-serif font-bold text-xs uppercase tracking-widest shadow-gold hover:bg-kalari-goldLight transition-all flex items-center justify-center gap-2 disabled:opacity-50"
          >
            <span>{loading ? 'Submitting...' : 'Submit Request for Approval'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>
      )}

      {/* Return to Public Website */}
      <div className="px-8 py-3.5 bg-kalari-black/80 border-t border-kalari-gold/20 text-center text-xs text-kalari-beige/60">
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
      <div className="relative z-10 text-center mb-6">
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
            Authentication & Student Access
          </span>
        </Link>
      </div>

      <Suspense fallback={<div className="text-kalari-gold font-serif">Loading portal...</div>}>
        <LoginForm />
      </Suspense>
    </div>
  );
}
