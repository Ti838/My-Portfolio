"use client";

import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import { checkAdminAuth, logoutAdminAction } from "@/lib/admin-actions";

interface AdminContextProps {
  isAdmin: boolean;
  login: () => void;
  logout: () => void;
}

const AdminContext = createContext<AdminContextProps>({
  isAdmin: false,
  login: () => {},
  logout: () => {},
});

export function AdminProvider({ children }: { children: React.ReactNode }) {
  const [isAdmin, setIsAdmin] = useState(false);

  // Check server-side session on mount
  useEffect(() => {
    checkAdminAuth().then(setIsAdmin).catch(() => setIsAdmin(false));
  }, []);

  const login = useCallback(() => {
    setIsAdmin(true);
  }, []);

  const logout = useCallback(async () => {
    try {
      await logoutAdminAction();
    } catch { /* ignore */ }
    setIsAdmin(false);
  }, []);

  return (
    <AdminContext.Provider value={{ isAdmin, login, logout }}>
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  return useContext(AdminContext);
}
