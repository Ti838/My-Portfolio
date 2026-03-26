"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

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

  useEffect(() => {
    // Check initial state from localStorage
    const adminAuth = localStorage.getItem("admin_auth");
    if (adminAuth === "true") {
      setIsAdmin(true);
    }
  }, []);

  const login = () => {
    localStorage.setItem("admin_auth", "true");
    setIsAdmin(true);
  };

  const logout = () => {
    localStorage.removeItem("admin_auth");
    setIsAdmin(false);
  };

  return (
    <AdminContext.Provider value={{ isAdmin, login, logout }}>
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  return useContext(AdminContext);
}
