'use client';

import React from 'react';
import { Bell, Calendar, Menu } from 'lucide-react';
import Link from 'next/link';
import { useAdminNav } from '@/app/admin/layout';

interface AdminHeaderProps {
  title: string;
  subtitle?: string;
  onMenuToggle?: () => void;
}

export default function AdminHeader({ title, subtitle, onMenuToggle }: AdminHeaderProps) {
  const formattedDate = 'Friday, Sep 11, 2026';
  const nav = useAdminNav();

  const handleToggle = onMenuToggle || (nav ? nav.toggleSidebar : undefined);

  return (
    <header className="bg-kalari-black/90 border-b border-kalari-gold/20 px-4 sm:px-8 py-3.5 sm:py-5 flex items-center justify-between sticky top-0 z-20 backdrop-blur-md">
      <div className="flex items-center gap-3">
        {/* Mobile Hamburger Menu Toggle */}
        <button
          onClick={handleToggle}
          className="lg:hidden p-2 rounded-lg bg-kalari-darkBrown border border-kalari-gold/30 text-kalari-gold hover:bg-kalari-gold hover:text-kalari-black transition-all"
          aria-label="Open Admin Navigation"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div>
          <h1 className="font-serif text-base sm:text-2xl font-bold text-kalari-white text-gold-gradient tracking-wide uppercase leading-tight">
            {title}
          </h1>
          {subtitle && (
            <p className="text-[11px] sm:text-xs text-kalari-beige/70 font-light mt-0.5 line-clamp-1 hidden xs:block">
              {subtitle}
            </p>
          )}
        </div>
      </div>

      <div className="flex items-center gap-2.5 sm:gap-6">
        {/* Today's Date */}
        <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-kalari-darkBrown border border-kalari-gold/20 text-xs text-kalari-beige/90">
          <Calendar className="w-3.5 h-3.5 text-kalari-gold" />
          <span>{formattedDate}</span>
        </div>

        {/* Notification Bell */}
        <Link
          href="/admin/notifications"
          className="relative p-2 rounded-lg bg-kalari-darkBrown border border-kalari-gold/20 text-kalari-beige hover:text-kalari-gold hover:border-kalari-gold/50 transition-all"
        >
          <Bell className="w-4 h-4" />
          <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-kalari-gold animate-pulse" />
        </Link>

        {/* Gurukkal Profile Badge */}
        <div className="flex items-center gap-2.5 pl-2.5 sm:pl-4 border-l border-kalari-earth/50">
          <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-kalari-gold text-kalari-black font-serif font-black flex items-center justify-center text-xs sm:text-sm shadow-gold shrink-0">
            GC
          </div>
          <div className="hidden sm:block">
            <span className="text-xs font-serif font-bold text-kalari-white block leading-none">
              Gurukkal K. Chandran
            </span>
            <span className="text-[9px] text-kalari-gold font-medium uppercase tracking-wider block mt-0.5">
              Chief Master
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
