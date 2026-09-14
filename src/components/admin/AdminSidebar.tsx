'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Users,
  CalendarCheck,
  CreditCard,
  FileBarChart,
  Bell,
  Film,
  Globe,
  User,
  LogOut,
  X,
} from 'lucide-react';
import { useRole } from '@/context/RoleContext';

interface AdminSidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export default function AdminSidebar({ isOpen, onClose }: AdminSidebarProps) {
  const pathname = usePathname();
  const { logout } = useRole();

  const navItems = [
    { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    { name: 'Student Management', href: '/admin/students', icon: Users },
    { name: 'Daily Attendance', href: '/admin/attendance', icon: CalendarCheck },
    { name: 'Fee Management', href: '/admin/fees', icon: CreditCard },
    { name: 'Training Videos', href: '/admin/videos', icon: Film },
    { name: 'Reports & Analytics', href: '/admin/reports', icon: FileBarChart },
    { name: 'Notifications', href: '/admin/notifications', icon: Bell },
  ];

  return (
    <>
      {/* Mobile Backdrop Blur Overlay */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40 lg:hidden transition-opacity"
        />
      )}

      <aside
        className={`w-64 bg-kalari-black border-r border-kalari-gold/25 flex flex-col justify-between h-screen fixed lg:sticky top-0 z-50 transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Brand & Crest */}
        <div>
          <div className="p-5 sm:p-6 border-b border-kalari-earth/40 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-kalari-darkBrown border border-kalari-gold/40 flex items-center justify-center p-1 shadow-gold shrink-0">
                <Image
                  src="/images/kalari-logo.png"
                  alt="Logo"
                  width={32}
                  height={32}
                  className="object-contain"
                />
              </div>
              <div>
                <span className="font-serif font-black text-xs sm:text-sm text-kalari-white tracking-wider uppercase block">
                  GURUKKAL DESK
                </span>
                <span className="text-[9px] sm:text-[10px] text-kalari-gold uppercase tracking-widest block font-medium">
                  Student Management
                </span>
              </div>
            </div>

            {/* Mobile Close Button */}
            <button
              onClick={onClose}
              className="lg:hidden p-1.5 rounded-lg text-kalari-beige hover:text-kalari-gold hover:bg-kalari-darkBrown"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Items */}
          <nav className="p-3 sm:p-4 space-y-1 sm:space-y-1.5 overflow-y-auto max-h-[calc(100vh-220px)]">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive =
                item.href === '/admin'
                  ? pathname === '/admin'
                  : pathname.startsWith(item.href);

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={onClose}
                  className={`flex items-center gap-3 px-3 py-2 sm:px-3.5 sm:py-2.5 rounded-lg text-xs font-serif uppercase tracking-wider transition-all ${
                    isActive
                      ? 'bg-kalari-gold text-kalari-black font-bold shadow-gold'
                      : 'text-kalari-beige/80 hover:bg-kalari-darkBrown hover:text-kalari-gold border border-transparent hover:border-kalari-gold/20'
                  }`}
                >
                  <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-kalari-black' : 'text-kalari-gold'}`} />
                  <span className="truncate">{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Bottom Switcher & Exit */}
        <div className="p-3 sm:p-4 border-t border-kalari-earth/40 space-y-1.5">
          <Link
            href="/"
            onClick={onClose}
            className="flex items-center gap-2.5 px-3 py-1.5 sm:py-2 rounded text-xs text-kalari-beige/70 hover:text-kalari-gold hover:bg-kalari-darkBrown transition-colors"
          >
            <Globe className="w-4 h-4 text-kalari-gold/70 shrink-0" />
            <span className="truncate">Public Website</span>
          </Link>
          <Link
            href="/student"
            onClick={onClose}
            className="flex items-center gap-2.5 px-3 py-1.5 sm:py-2 rounded text-xs text-kalari-beige/70 hover:text-kalari-gold hover:bg-kalari-darkBrown transition-colors"
          >
            <User className="w-4 h-4 text-kalari-gold/70 shrink-0" />
            <span className="truncate">Student Portal</span>
          </Link>
          <button
            onClick={() => {
              logout();
              if (onClose) onClose();
            }}
            className="w-full flex items-center gap-2.5 px-3 py-1.5 sm:py-2 rounded text-xs text-red-400/80 hover:text-red-300 hover:bg-red-950/20 transition-colors"
          >
            <LogOut className="w-4 h-4 shrink-0" />
            <span>Exit Session</span>
          </button>
        </div>
      </aside>
    </>
  );
}
