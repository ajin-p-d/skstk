'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Student, UserAccount } from '@/types';

export type UserRole = 'visitor' | 'admin' | 'student';

export type SafeUser = Omit<UserAccount, 'password'>;

interface RoleContextType {
  role: UserRole;
  setRole: (role: UserRole) => void;
  currentUser: SafeUser | null;
  setCurrentUser: (user: SafeUser | null) => void;
  activeStudent: Student | null;
  setActiveStudent: (student: Student | null) => void;
  loginWithCredentials: (
    email: string,
    password: string
  ) => Promise<{ success: boolean; error?: string; pending?: boolean; role?: UserRole }>;
  loginAsAdmin: () => void;
  loginAsStudent: (studentId: string) => Promise<boolean>;
  logout: () => void;
}

const RoleContext = createContext<RoleContextType | undefined>(undefined);

export function RoleProvider({ children }: { children: React.ReactNode }) {
  const [role, setRoleState] = useState<UserRole>('visitor');
  const [currentUser, setCurrentUserState] = useState<SafeUser | null>(null);
  const [activeStudent, setActiveStudentState] = useState<Student | null>(null);

  useEffect(() => {
    const savedRole = localStorage.getItem('kalari_role') as UserRole | null;
    const savedStudent = localStorage.getItem('kalari_student');
    const savedUser = localStorage.getItem('kalari_user');

    if (savedRole) {
      setRoleState(savedRole);
    }
    if (savedStudent) {
      try {
        setActiveStudentState(JSON.parse(savedStudent));
      } catch (e) {
        console.error(e);
      }
    }
    if (savedUser) {
      try {
        setCurrentUserState(JSON.parse(savedUser));
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  const setRole = (newRole: UserRole) => {
    setRoleState(newRole);
    localStorage.setItem('kalari_role', newRole);
  };

  const setCurrentUser = (user: SafeUser | null) => {
    setCurrentUserState(user);
    if (user) {
      localStorage.setItem('kalari_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('kalari_user');
    }
  };

  const setActiveStudent = (student: Student | null) => {
    setActiveStudentState(student);
    if (student) {
      localStorage.setItem('kalari_student', JSON.stringify(student));
    } else {
      localStorage.removeItem('kalari_student');
    }
  };

  const loginWithCredentials = async (
    email: string,
    password: string
  ): Promise<{ success: boolean; error?: string; pending?: boolean; role?: UserRole }> => {
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();

      if (data.success) {
        setRole(data.role);
        setCurrentUser(data.user);
        if (data.student) {
          setActiveStudent(data.student);
        } else {
          setActiveStudent(null);
        }
        return { success: true, role: data.role };
      }

      return {
        success: false,
        error: data.error || 'Authentication failed',
        pending: !!data.pending,
      };
    } catch (err: any) {
      return { success: false, error: err.message || 'Network error logging in' };
    }
  };

  const loginAsAdmin = () => {
    setRole('admin');
    setCurrentUser({
      id: 'user-admin',
      email: 'admin@gmail.com',
      name: 'Chief Gurukkal',
      role: 'admin',
      approval_status: 'approved',
      created_at: new Date().toISOString(),
    });
    setActiveStudent(null);
  };

  const loginAsStudent = async (studentId: string): Promise<boolean> => {
    try {
      const res = await fetch(`/api/students/${studentId}`);
      const data = await res.json();
      if (data.success && data.data) {
        setActiveStudent(data.data);
        setRole('student');
        return true;
      }
      return false;
    } catch (err) {
      console.error(err);
      return false;
    }
  };

  const logout = () => {
    setRole('visitor');
    setCurrentUser(null);
    setActiveStudent(null);
    localStorage.removeItem('kalari_role');
    localStorage.removeItem('kalari_student');
    localStorage.removeItem('kalari_user');
  };

  return (
    <RoleContext.Provider
      value={{
        role,
        setRole,
        currentUser,
        setCurrentUser,
        activeStudent,
        setActiveStudent,
        loginWithCredentials,
        loginAsAdmin,
        loginAsStudent,
        logout,
      }}
    >
      {children}
    </RoleContext.Provider>
  );
}

export function useRole() {
  const context = useContext(RoleContext);
  if (!context) {
    throw new Error('useRole must be used within a RoleProvider');
  }
  return context;
}
