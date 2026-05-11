// REFINED
"use client";

import { useState } from "react";
import { Trash2, Mail, MailOpen, X, Clock } from "lucide-react";
import { deleteMessage } from "@/lib/admin-actions";
import toast from "react-hot-toast";

export default function MessagesClient({ initialMessages }: { initialMessages: any[] }) {
  const [messages, setMessages] = useState(initialMessages);
  const [selected, setSelected] = useState<any | null>(null);
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);

  const handleDelete = async (id: string) => {
    try {
      await deleteMessage(id);
      setMessages(prev => prev.filter(m => m.id !== id));
      toast.success("Message deleted");
      setConfirmDelete(null);
      if (selected?.id === id) setSelected(null);
    } catch {
      toast.error("Failed to delete");
    }
  };

  return (
    <div className="max-w-5xl space-y-6">
      <div>
        <h1 className="display-md mb-1">Messages</h1>
        <p className="body text-sm">{messages.length} messages in inbox</p>
      </div>

      <div className="card overflow-hidden">
        {messages.length === 0 ? (
          <div className="p-12 text-center text-[var(--text-tertiary)] text-sm">No messages yet</div>
        ) : (
          <table className="admin-table">
            <thead>
              <tr>
                <th>Sender</th>
                <th className="hidden md:table-cell">Subject</th>
                <th className="hidden sm:table-cell">Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {messages.map((msg) => (
                <tr key={msg.id} className="cursor-pointer" onClick={() => setSelected(msg)}>
                  <td>
                    <div>
                      <p className="font-medium text-sm">{msg.name}</p>
                      <p className="text-[var(--text-tertiary)] text-xs">{msg.email}</p>
                    </div>
                  </td>
                  <td className="hidden md:table-cell text-sm text-[var(--text-secondary)]">{msg.subject || "No subject"}</td>
                  <td className="hidden sm:table-cell">
                    <span className="flex items-center gap-1 text-xs text-[var(--text-tertiary)]">
                      <Clock size={10} />
                      {new Date(msg.created_at).toLocaleDateString()}
                    </span>
                  </td>
                  <td onClick={e => e.stopPropagation()}>
                    <button onClick={() => setConfirmDelete(msg.id)} className="w-8 h-8 rounded-lg border border-[var(--border)] flex items-center justify-center text-[var(--error)] hover:bg-red-500/10 transition-colors">
                      <Trash2 size={13} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Message Detail Modal */}
      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4" onClick={() => setSelected(null)}>
          <div className="card p-8 max-w-lg w-full space-y-4" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="heading text-base">{selected.subject || "No Subject"}</h3>
                <p className="text-xs text-[var(--text-tertiary)] mt-1">From: {selected.name} &lt;{selected.email}&gt;</p>
              </div>
              <button onClick={() => setSelected(null)} className="w-8 h-8 rounded-lg border border-[var(--border)] flex items-center justify-center text-[var(--text-secondary)]">
                <X size={14} />
              </button>
            </div>
            <div className="border-t border-[var(--border)] pt-4">
              <p className="body text-sm whitespace-pre-wrap">{selected.message}</p>
            </div>
            <div className="flex items-center justify-between pt-2">
              <span className="text-xs text-[var(--text-tertiary)]">
                {new Date(selected.created_at).toLocaleString()}
              </span>
              <a href={`mailto:${selected.email}`} className="btn-primary text-xs py-2 px-4">
                <Mail size={12} /> Reply
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation */}
      {confirmDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm" onClick={() => setConfirmDelete(null)}>
          <div className="card p-6 max-w-sm w-full mx-4 space-y-4" onClick={e => e.stopPropagation()}>
            <h3 className="heading text-base">Delete Message?</h3>
            <p className="body text-sm">This cannot be undone.</p>
            <div className="flex gap-3 justify-end">
              <button onClick={() => setConfirmDelete(null)} className="btn-ghost text-sm py-2 px-4">Cancel</button>
              <button onClick={() => handleDelete(confirmDelete)} className="btn-primary text-sm py-2 px-4 !bg-[var(--error)]">Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
