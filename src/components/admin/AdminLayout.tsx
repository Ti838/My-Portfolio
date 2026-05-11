// REFINED
"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAdmin } from "@/components/admin/AdminProvider";
import {
  LayoutDashboard, User, Zap, FolderKanban, Briefcase, GraduationCap, 
  Sparkles, MessageSquareQuote, FileText, Mail, Settings, Image as ImageIcon,
  ExternalLink, LogOut, Menu, X, ChevronRight
} from "lucide-react";

const sidebarItems = [
  { href: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { href: "/admin/dashboard/profile", label: "Profile & Hero", icon: User },
  { href: "/admin/dashboard/skills", label: "Skills", icon: Zap },
  { href: "/admin/dashboard/projects", label: "Projects", icon: FolderKanban },
  { href: "/admin/dashboard/experience", label: "Experience", icon: Briefcase },
  { href: "/admin/dashboard/education", label: "Education", icon: GraduationCap },
  { href: "/admin/dashboard/blog", label: "Blog Posts", icon: FileText },
  { href: "/admin/dashboard/messages", label: "Messages", icon: Mail, badge: true },
  { href: "/admin/dashboard/settings", label: "Site Settings", icon: Settings },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { logout } = useAdmin();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    router.push("/admin");
  };

  const currentPage = sidebarItems.find(item => 
    item.exact ? pathname === item.href : pathname.startsWith(item.href) && item.href !== "/admin/dashboard"
  )?.label || "Dashboard";

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] flex">
      {/* ── Sidebar ─────────────────────────────────────────────── */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-[260px] bg-[var(--bg-secondary)] border-r border-[var(--border)] flex flex-col transition-transform duration-300 lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Logo */}
        <div className="h-16 px-6 flex items-center border-b border-[var(--border)]">
          <Link href="/" className="flex items-center gap-2 group">
            <span className="font-display text-xl font-bold">
              <span className="text-[var(--accent)]">T</span>
              <span className="text-[var(--text-primary)]">imon</span>
            </span>
            <span className="font-mono text-[9px] text-[var(--text-tertiary)] uppercase tracking-wider">admin</span>
          </Link>
        </div>

        {/* Nav Items */}
        <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
          {sidebarItems.map((item) => {
            const isActive = item.exact 
              ? pathname === item.href 
              : pathname.startsWith(item.href) && item.href !== "/admin/dashboard";
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setSidebarOpen(false)}
                className={`admin-nav-item ${isActive ? "active" : ""}`}
              >
                <item.icon size={18} />
                <span className="flex-1">{item.label}</span>
                {item.badge && (
                  <span className="w-5 h-5 rounded-full bg-[var(--error)] text-white text-[9px] font-bold flex items-center justify-center">
                    •
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Bottom */}
        <div className="border-t border-[var(--border)] p-4 space-y-2">
          <Link
            href="/"
            target="_blank"
            className="flex items-center gap-2 text-sm text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors px-3 py-2"
          >
            <ExternalLink size={14} /> View Site
          </Link>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-sm text-[var(--text-secondary)] hover:text-[var(--error)] transition-colors px-3 py-2 w-full"
          >
            <LogOut size={14} /> Logout
          </button>
        </div>
      </aside>

      {/* Sidebar backdrop (mobile) */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* ── Main Content ────────────────────────────────────────── */}
      <div className="flex-1 lg:ml-[260px] flex flex-col min-h-screen">
        {/* Topbar */}
        <header className="h-16 bg-[var(--bg-primary)] border-b border-[var(--border)] px-6 flex items-center justify-between sticky top-0 z-20">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden w-9 h-9 rounded-xl border border-[var(--border)] flex items-center justify-center text-[var(--text-secondary)] hover:text-[var(--accent)]"
            >
              {sidebarOpen ? <X size={16} /> : <Menu size={16} />}
            </button>
            <div className="flex items-center gap-2 text-sm">
              <span className="text-[var(--text-tertiary)]">Admin</span>
              <ChevronRight size={12} className="text-[var(--text-tertiary)]" />
              <span className="text-[var(--text-primary)] font-medium">{currentPage}</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link href="/" target="_blank" className="hidden md:flex btn-ghost text-xs py-2 px-4">
              <ExternalLink size={12} /> View Live Site
            </Link>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6 md:p-8 overflow-y-auto" style={{ animation: 'none' }}>
          {children}
        </main>
      </div>
    </div>
  );
}
