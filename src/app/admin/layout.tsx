'use client';

import React, { useState, createContext, useContext } from 'react';
import AdminSidebar from '@/components/admin/AdminSidebar';

interface AdminNavContextType {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  toggleSidebar: () => void;
}

const AdminNavContext = createContext<AdminNavContextType>({
  sidebarOpen: false,
  setSidebarOpen: () => {},
  toggleSidebar: () => {},
});

export const useAdminNav = () => useContext(AdminNavContext);

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen((prev) => !prev);

  return (
    <AdminNavContext.Provider
      value={{
        sidebarOpen,
        setSidebarOpen,
        toggleSidebar,
      }}
    >
      <div className="flex min-h-screen bg-kalari-black text-kalari-white font-sans">
        <AdminSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
          {children}
        </div>
      </div>
    </AdminNavContext.Provider>
  );
}
