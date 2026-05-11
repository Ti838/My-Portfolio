// REFINED
"use client";

import Link from "next/link";
import { FolderKanban, Zap, Mail, Briefcase, Plus, FileText, ArrowUpRight, Clock } from "lucide-react";

interface DashboardProps {
  projectCount: number;
  skillCount: number;
  messageCount: number;
  experienceCount: number;
  recentMessages: any[];
}

export default function AdminDashboardClient({
  projectCount,
  skillCount,
  messageCount,
  experienceCount,
  recentMessages,
}: DashboardProps) {
  const stats = [
    { label: "Projects", value: projectCount, icon: FolderKanban, color: "text-blue-400" },
    { label: "Skills", value: skillCount, icon: Zap, color: "text-emerald-400" },
    { label: "Messages", value: messageCount, icon: Mail, color: "text-amber-400" },
    { label: "Experience", value: experienceCount, icon: Briefcase, color: "text-purple-400" },
  ];

  return (
    <div className="max-w-5xl space-y-8">
      <div>
        <h1 className="display-md mb-2">Dashboard</h1>
        <p className="body text-sm">Welcome back. Here&apos;s an overview of your portfolio.</p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div key={stat.label} className="card p-5">
            <div className="flex items-center justify-between mb-3">
              <stat.icon size={18} className={stat.color} />
              <ArrowUpRight size={12} className="text-[var(--text-tertiary)]" />
            </div>
            <p className="font-display text-3xl font-bold text-[var(--accent)]">{stat.value}</p>
            <p className="label text-[10px] text-[var(--text-tertiary)] mt-1">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="flex flex-wrap gap-3">
        <Link href="/admin/dashboard/projects" className="btn-primary text-sm py-2.5 px-5">
          <Plus size={14} /> Add Project
        </Link>
        <Link href="/admin/dashboard/blog" className="btn-ghost text-sm py-2.5 px-5">
          <FileText size={14} /> New Blog Post
        </Link>
        <Link href="/admin/dashboard/messages" className="btn-ghost text-sm py-2.5 px-5">
          <Mail size={14} /> View Messages
        </Link>
      </div>

      {/* Recent Messages */}
      <div>
        <h2 className="heading text-base mb-4">Recent Messages</h2>
        <div className="card overflow-hidden">
          {recentMessages.length === 0 ? (
            <div className="p-8 text-center text-[var(--text-tertiary)] text-sm">
              No messages yet
            </div>
          ) : (
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Subject</th>
                  <th>Date</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {recentMessages.map((msg: any) => (
                  <tr key={msg.id}>
                    <td>
                      <div>
                        <p className="font-medium text-sm">{msg.name}</p>
                        <p className="text-[var(--text-tertiary)] text-xs">{msg.email}</p>
                      </div>
                    </td>
                    <td className="text-sm text-[var(--text-secondary)]">{msg.subject || "No subject"}</td>
                    <td>
                      <span className="flex items-center gap-1.5 text-xs text-[var(--text-tertiary)]">
                        <Clock size={10} />
                        {new Date(msg.created_at).toLocaleDateString()}
                      </span>
                    </td>
                    <td>
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[var(--accent-dim)] text-[var(--accent)] text-[10px] font-mono uppercase">
                        New
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
