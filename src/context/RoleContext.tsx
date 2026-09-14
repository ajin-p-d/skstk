'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Student } from '@/types';

export type UserRole = 'visitor' | 'admin' | 'student';

interface RoleContextType {
  role: UserRole;
  setRole: (role: UserRole) => void;
  activeStudent: Student | null;
  setActiveStudent: (student: Student | null) => void;
  loginAsAdmin: () => void;
  loginAsStudent: (studentId: string) => Promise<boolean>;
  logout: () => void;
}

const RoleContext = createContext<RoleContextType | undefined>(undefined);

export function RoleProvider({ children }: { children: React.ReactNode }) {
  const [role, setRoleState] = useState<UserRole>('visitor');
  const [activeStudent, setActiveStudentState] = useState<Student | null>(null);

  useEffect(() => {
    const savedRole = localStorage.getItem('kalari_role') as UserRole | null;
    const savedStudent = localStorage.getItem('kalari_student');
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
  }, []);

  const setRole = (newRole: UserRole) => {
    setRoleState(newRole);
    localStorage.setItem('kalari_role', newRole);
  };

  const setActiveStudent = (student: Student | null) => {
    setActiveStudentState(student);
    if (student) {
      localStorage.setItem('kalari_student', JSON.stringify(student));
    } else {
      localStorage.removeItem('kalari_student');
    }
  };

  const loginAsAdmin = () => {
    setRole('admin');
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
    setActiveStudent(null);
  };

  return (
    <RoleContext.Provider
      value={{
        role,
        setRole,
        activeStudent,
        setActiveStudent,
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
