"use client";

import { useAdmin } from "./AdminProvider";
import { FiLogOut, FiEdit3, FiInbox, FiCheckCircle, FiTrash2 } from "react-icons/fi";
import { useState, useEffect } from "react";
import { getInboxMessages, deleteMessage } from "@/lib/admin-actions";
import toast from "react-hot-toast";

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
      <div className="fixed top-0 left-0 w-full h-10 bg-slate-900/95 text-white z-[100] flex items-center justify-between px-6 shadow-2xl backdrop-blur-md border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-6 h-6 bg-accent-500 rounded-lg flex items-center justify-center animate-pulse shadow-lg shadow-accent-500/20">
            <FiEdit3 size={12} />
          </div>
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-accent-100">Visual Editor Active</span>
          <div className="hidden md:flex items-center gap-1.5 ml-3 px-2 py-0.5 bg-green-500/20 text-green-400 rounded-full border border-green-500/30">
            <FiCheckCircle size={9} />
            <span className="text-[9px] font-bold uppercase tracking-tight">Session Live</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowInbox(true)}
            className="flex items-center gap-1.5 text-[10px] font-bold uppercase bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-xl transition-all border border-white/5 active:scale-95"
          >
            <FiInbox size={13} className={messages.length > 0 ? "text-accent-400" : ""} />
            <span>Inbox {messages.length > 0 && `(${messages.length})`}</span>
          </button>

          <button
            onClick={logout}
            className="flex items-center gap-1.5 text-[10px] font-bold uppercase bg-red-500/80 hover:bg-red-600 text-white px-3 py-1.5 rounded-xl transition-all shadow-lg shadow-red-500/20 active:scale-95"
          >
            <FiLogOut size={12} />
            <span>Sign Out</span>
          </button>
        </div>
      </div>

      {/* Inbox Modal */}
      {showInbox && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center px-5">
          <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-md" onClick={() => setShowInbox(false)} />
          <div className="relative w-full max-w-2xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl overflow-hidden">
            <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-3">
                <FiInbox className="text-accent-500" /> Message Inbox
              </h2>
              <button onClick={() => setShowInbox(false)} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors text-slate-500">
                ✕
              </button>
            </div>

            <div className="max-h-[60vh] overflow-y-auto p-6 space-y-4">
              {loading ? (
                <div className="p-12 text-center text-slate-400">Loading messages…</div>
              ) : messages.length === 0 ? (
                <div className="p-12 text-center border-2 border-dashed border-slate-100 dark:border-slate-800 rounded-2xl text-slate-400">
                  Inbox is empty
                </div>
              ) : (
                messages.map((msg) => (
                  <div key={msg.id} className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700/50 relative">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-bold text-slate-900 dark:text-white">{msg.name}</h4>
                        <p className="text-xs text-accent-500">{msg.email}</p>
                        {msg.subject && <p className="text-xs text-slate-500 mt-0.5 font-medium">{msg.subject}</p>}
                      </div>
                      <button onClick={() => handleDelete(msg.id)} className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-colors">
                        <FiTrash2 size={14} />
                      </button>
                    </div>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mt-3 leading-relaxed">{msg.message}</p>
                    <p className="text-[10px] text-slate-400 mt-2">{new Date(msg.created_at).toLocaleString()}</p>
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
