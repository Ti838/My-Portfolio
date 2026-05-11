// REFINED
"use client";

import { useState } from "react";
import { Plus, Pencil, Trash2, X } from "lucide-react";
import { createExperience, updateExperience, deleteExperience } from "@/lib/admin-actions";
import toast from "react-hot-toast";

export default function ExperienceManager({ initialExperiences }: { initialExperiences: any[] }) {
  const [items, setItems] = useState(initialExperiences);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState<any | null>(null);
  const [form, setForm] = useState({ title: "", type: "work", duration: "", description: "", tags: "" });
  const [saving, setSaving] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);

  const openNew = () => {
    setEditing(null);
    setForm({ title: "", type: "work", duration: "", description: "", tags: "" });
    setShowModal(true);
  };

  const openEdit = (item: any) => {
    setEditing(item);
    setForm({
      title: item.title || "",
      type: item.type || "work",
      duration: item.duration || "",
      description: item.description || "",
      tags: (item.tags || []).join(", "),
    });
    setShowModal(true);
  };

  const handleSave = async () => {
    if (!form.title.trim()) { toast.error("Title is required"); return; }
    setSaving(true);
    try {
      const payload = { ...form, tags: form.tags.split(",").map(s => s.trim()).filter(Boolean) };
      if (editing) {
        await updateExperience(editing.id, payload);
        setItems(prev => prev.map(i => i.id === editing.id ? { ...i, ...payload } : i));
        toast.success("Updated!");
      } else {
        await createExperience(payload);
        setItems(prev => [...prev, { id: Date.now().toString(), ...payload }]);
        toast.success("Created!");
      }
      setShowModal(false);
    } catch (err: any) { toast.error(err.message || "Failed"); }
    setSaving(false);
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteExperience(id);
      setItems(prev => prev.filter(i => i.id !== id));
      toast.success("Deleted");
      setConfirmDelete(null);
    } catch { toast.error("Failed to delete"); }
  };

  return (
    <div className="max-w-5xl space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="display-md mb-1">Experience</h1>
          <p className="body text-sm">{items.length} entries</p>
        </div>
        <button onClick={openNew} className="btn-primary text-sm py-2.5 px-5"><Plus size={14} /> Add New</button>
      </div>

      <div className="card overflow-hidden">
        <table className="admin-table">
          <thead><tr><th>Role / Title</th><th className="hidden md:table-cell">Type</th><th className="hidden sm:table-cell">Duration</th><th>Actions</th></tr></thead>
          <tbody>
            {items.map(item => (
              <tr key={item.id}>
                <td className="font-medium text-sm">{item.title}</td>
                <td className="hidden md:table-cell"><span className="font-mono text-[10px] text-[var(--accent)] uppercase">{item.type}</span></td>
                <td className="hidden sm:table-cell text-sm text-[var(--text-secondary)]">{item.duration}</td>
                <td>
                  <div className="flex gap-2">
                    <button onClick={() => openEdit(item)} className="w-8 h-8 rounded-lg border border-[var(--border)] flex items-center justify-center text-[var(--accent)] hover:bg-[var(--accent-dim)]"><Pencil size={13} /></button>
                    <button onClick={() => setConfirmDelete(item.id)} className="w-8 h-8 rounded-lg border border-[var(--border)] flex items-center justify-center text-[var(--error)] hover:bg-red-500/10"><Trash2 size={13} /></button>
                  </div>
                </td>
              </tr>
            ))}
            {items.length === 0 && <tr><td colSpan={4} className="text-center py-8 text-[var(--text-tertiary)] text-sm">No entries yet</td></tr>}
          </tbody>
        </table>
      </div>

      {confirmDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm" onClick={() => setConfirmDelete(null)}>
          <div className="card p-6 max-w-sm w-full mx-4 space-y-4" onClick={e => e.stopPropagation()}>
            <h3 className="heading text-base">Confirm Delete</h3>
            <p className="body text-sm">This cannot be undone.</p>
            <div className="flex gap-3 justify-end">
              <button onClick={() => setConfirmDelete(null)} className="btn-ghost text-sm py-2 px-4">Cancel</button>
              <button onClick={() => handleDelete(confirmDelete)} className="btn-primary text-sm py-2 px-4 !bg-[var(--error)]">Delete</button>
            </div>
          </div>
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4" onClick={() => setShowModal(false)}>
          <div className="card p-8 max-w-lg w-full max-h-[90vh] overflow-y-auto space-y-5" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between">
              <h3 className="heading text-base">{editing ? "Edit" : "New"} Experience</h3>
              <button onClick={() => setShowModal(false)} className="w-8 h-8 rounded-lg border border-[var(--border)] flex items-center justify-center text-[var(--text-secondary)]"><X size={14} /></button>
            </div>
            <div className="space-y-4">
              <div><label className="label text-[10px] mb-1.5 block">Title / Role *</label><input className="admin-input" value={form.title} onChange={e => setForm({...form, title: e.target.value})} /></div>
              <div className="grid grid-cols-2 gap-4">
                <div><label className="label text-[10px] mb-1.5 block">Type</label>
                  <select className="admin-input" value={form.type} onChange={e => setForm({...form, type: e.target.value})}>
                    <option value="work">Work</option><option value="volunteer">Volunteer</option><option value="competition">Competition</option>
                  </select>
                </div>
                <div><label className="label text-[10px] mb-1.5 block">Duration</label><input className="admin-input" value={form.duration} onChange={e => setForm({...form, duration: e.target.value})} placeholder="2024 – Present" /></div>
              </div>
              <div><label className="label text-[10px] mb-1.5 block">Description</label><textarea className="admin-input resize-none" rows={4} value={form.description} onChange={e => setForm({...form, description: e.target.value})} /></div>
              <div><label className="label text-[10px] mb-1.5 block">Tags (comma-separated)</label><input className="admin-input" value={form.tags} onChange={e => setForm({...form, tags: e.target.value})} placeholder="Next.js, Supabase" /></div>
            </div>
            <div className="flex gap-3 justify-end pt-2">
              <button onClick={() => setShowModal(false)} className="btn-ghost text-sm py-2.5 px-5">Cancel</button>
              <button onClick={handleSave} disabled={saving} className="btn-primary text-sm py-2.5 px-5 disabled:opacity-50">{saving ? "Saving..." : editing ? "Update" : "Create"}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
