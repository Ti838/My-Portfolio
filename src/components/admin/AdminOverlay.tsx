// REFINED
"use client";

import { useAdmin } from "./AdminProvider";
import { LogOut, Pencil, Inbox, CheckCircle, Trash2, X } from "lucide-react";
import { useState, useEffect } from "react";
import { getInboxMessages, deleteMessage } from "@/lib/admin-actions";
import toast from "react-hot-toast";
import Link from "next/link";

export default function AdminOverlay() {
  const { isAdmin, logout } = useAdmin();
  const [showInbox, setShowInbox] = useState(false);
  const [messages, setMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchMessages = async () => {
    setLoading(true);
    try {
      const msgs = await getInboxMessages();
      setMessages(msgs || []);
    } catch {
      toast.error("Failed to load messages");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this message?")) return;
    try {
      await deleteMessage(id);
      setMessages(prev => prev.filter(m => m.id !== id));
      toast.success("Message deleted");
    } catch {
      toast.error("Failed to delete");
    }
  };

  useEffect(() => {
    if (showInbox) fetchMessages();
  }, [showInbox]);

  if (!isAdmin) return null;

  return (
    <>
      {/* Admin Top Bar */}
      <div className="fixed top-0 left-0 w-full h-10 bg-[var(--bg-secondary)]/95 backdrop-blur-md text-[var(--text-primary)] z-[100] flex items-center justify-between px-6 border-b border-[var(--border)] shadow-[0_4px_20px_rgba(0,0,0,0.3)]">
        <div className="flex items-center gap-3">
          <div className="w-6 h-6 bg-[var(--accent)] rounded-lg flex items-center justify-center">
            <Pencil size={11} className="text-[var(--bg-primary)]" />
          </div>
          <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-[var(--accent)] font-mono">Visual Editor</span>
          <div className="hidden md:flex items-center gap-1.5 ml-2 px-2 py-0.5 bg-emerald-500/10 text-emerald-400 rounded-full border border-emerald-500/20">
            <CheckCircle size={9} />
            <span className="text-[9px] font-bold uppercase tracking-tight font-mono">Live</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/admin/dashboard"
            className="flex items-center gap-1.5 text-[10px] font-bold uppercase bg-[var(--bg-elevated)] hover:bg-[var(--accent-dim)] px-3 py-1.5 rounded-xl transition-all border border-[var(--border)] text-[var(--text-secondary)] hover:text-[var(--accent)] font-mono"
          >
            Dashboard
          </Link>
          <button
            onClick={() => setShowInbox(true)}
            className="flex items-center gap-1.5 text-[10px] font-bold uppercase bg-[var(--bg-elevated)] hover:bg-[var(--accent-dim)] px-3 py-1.5 rounded-xl transition-all border border-[var(--border)] text-[var(--text-secondary)] hover:text-[var(--accent)] font-mono"
          >
            <Inbox size={13} className={messages.length > 0 ? "text-[var(--accent)]" : ""} />
            <span>Inbox</span>
          </button>
          <button
            onClick={logout}
            className="flex items-center gap-1.5 text-[10px] font-bold uppercase bg-[var(--error)]/90 hover:bg-[var(--error)] text-white px-3 py-1.5 rounded-xl transition-all font-mono"
          >
            <LogOut size={12} />
            <span>Out</span>
          </button>
        </div>
      </div>

      {/* Spacer to push page content below the admin bar */}
      <div className="h-10" />

      {/* Inbox Modal */}
      {showInbox && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center px-5">
          <div className="absolute inset-0 bg-black/70 backdrop-blur-md" onClick={() => setShowInbox(false)} />
          <div className="relative w-full max-w-2xl bg-[var(--bg-secondary)] rounded-2xl border border-[var(--border)] overflow-hidden">
            <div className="p-6 border-b border-[var(--border)] flex items-center justify-between">
              <h2 className="heading text-base flex items-center gap-3">
                <Inbox className="text-[var(--accent)]" size={18} /> Message Inbox
              </h2>
              <button onClick={() => setShowInbox(false)} className="w-8 h-8 rounded-xl border border-[var(--border)] flex items-center justify-center text-[var(--text-secondary)] hover:text-[var(--text-primary)]">
                <X size={14} />
              </button>
            </div>

            <div className="max-h-[60vh] overflow-y-auto p-6 space-y-4">
              {loading ? (
                <div className="p-12 text-center text-[var(--text-tertiary)]">Loading…</div>
              ) : messages.length === 0 ? (
                <div className="p-12 text-center border border-dashed border-[var(--border)] rounded-xl text-[var(--text-tertiary)]">
                  Inbox is empty
                </div>
              ) : (
                messages.map((msg) => (
                  <div key={msg.id} className="card p-5">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="heading text-sm">{msg.name}</h4>
                        <a href={`mailto:${msg.email}`} className="text-xs text-[var(--accent)] hover:underline font-mono">{msg.email}</a>
                        {msg.subject && <p className="text-xs text-[var(--text-secondary)] mt-1.5 font-medium">{msg.subject}</p>}
                      </div>
                      <button onClick={() => handleDelete(msg.id)} className="w-8 h-8 rounded-lg border border-[var(--border)] flex items-center justify-center text-[var(--error)] hover:bg-red-500/10">
                        <Trash2 size={14} />
                      </button>
                    </div>
                    <p className="text-sm text-[var(--text-secondary)] mt-3 p-3 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border)]">{msg.message}</p>
                    <p className="font-mono text-[10px] text-[var(--text-tertiary)] mt-3">{new Date(msg.created_at).toLocaleString()}</p>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
