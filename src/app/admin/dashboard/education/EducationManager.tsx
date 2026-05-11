// REFINED
"use client";

import { useState } from "react";
import { Plus, Pencil, Trash2, X } from "lucide-react";
import { createEducation, updateEducation, deleteEducation } from "@/lib/admin-actions";
import toast from "react-hot-toast";

export default function EducationManager({ initialEducation }: { initialEducation: any[] }) {
  const [items, setItems] = useState(initialEducation);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState<any | null>(null);
  const [form, setForm] = useState({ institution: "", degree: "", field: "", duration: "", logoUrl: "", url: "", details: "" });
  const [saving, setSaving] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);

  const openNew = () => { setEditing(null); setForm({ institution: "", degree: "", field: "", duration: "", logoUrl: "", url: "", details: "" }); setShowModal(true); };

  const openEdit = (item: any) => {
    setEditing(item);
    setForm({ institution: item.institution || "", degree: item.degree || "", field: item.field || "", duration: item.duration || "", logoUrl: item.logo_url || item.logoUrl || "", url: item.url || "", details: Array.isArray(item.details) ? item.details.join(", ") : (item.details || "") });
    setShowModal(true);
  };

  const handleSave = async () => {
    if (!form.institution.trim()) { toast.error("Institution is required"); return; }
    setSaving(true);
    try {
      const payload = { ...form, details: form.details.split(",").map(s => s.trim()).filter(Boolean) };
      if (editing) {
        await updateEducation(editing.id, payload);
        setItems(prev => prev.map(i => i.id === editing.id ? { ...i, ...payload, logo_url: payload.logoUrl } : i));
        toast.success("Updated!");
      } else {
        await createEducation(payload);
        setItems(prev => [...prev, { id: Date.now().toString(), ...payload, logo_url: payload.logoUrl }]);
        toast.success("Created!");
      }
      setShowModal(false);
    } catch (err: any) { toast.error(err.message || "Failed"); }
    setSaving(false);
  };

  const handleDelete = async (id: string) => {
    try { await deleteEducation(id); setItems(prev => prev.filter(i => i.id !== id)); toast.success("Deleted"); setConfirmDelete(null); } catch { toast.error("Failed"); }
  };

  return (
    <div className="max-w-5xl space-y-6">
      <div className="flex items-center justify-between">
        <div><h1 className="display-md mb-1">Education</h1><p className="body text-sm">{items.length} entries</p></div>
        <button onClick={openNew} className="btn-primary text-sm py-2.5 px-5"><Plus size={14} /> Add New</button>
      </div>

      <div className="card overflow-hidden">
        <table className="admin-table">
          <thead><tr><th>Institution</th><th className="hidden md:table-cell">Degree</th><th className="hidden sm:table-cell">Duration</th><th>Actions</th></tr></thead>
          <tbody>
            {items.map(item => (
              <tr key={item.id}>
                <td className="font-medium text-sm">{item.institution}</td>
                <td className="hidden md:table-cell text-sm text-[var(--text-secondary)]">{item.degree}</td>
                <td className="hidden sm:table-cell text-sm text-[var(--text-secondary)]">{item.duration}</td>
                <td>
                  <div className="flex gap-2">
                    <button onClick={() => openEdit(item)} className="w-8 h-8 rounded-lg border border-[var(--border)] flex items-center justify-center text-[var(--accent)] hover:bg-[var(--accent-dim)]"><Pencil size={13} /></button>
                    <button onClick={() => setConfirmDelete(item.id)} className="w-8 h-8 rounded-lg border border-[var(--border)] flex items-center justify-center text-[var(--error)] hover:bg-red-500/10"><Trash2 size={13} /></button>
                  </div>
                </td>
              </tr>
            ))}
            {items.length === 0 && <tr><td colSpan={4} className="text-center py-8 text-[var(--text-tertiary)] text-sm">No entries</td></tr>}
          </tbody>
        </table>
      </div>

      {confirmDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm" onClick={() => setConfirmDelete(null)}>
          <div className="card p-6 max-w-sm w-full mx-4 space-y-4" onClick={e => e.stopPropagation()}>
            <h3 className="heading text-base">Confirm Delete</h3><p className="body text-sm">This cannot be undone.</p>
            <div className="flex gap-3 justify-end"><button onClick={() => setConfirmDelete(null)} className="btn-ghost text-sm py-2 px-4">Cancel</button><button onClick={() => handleDelete(confirmDelete)} className="btn-primary text-sm py-2 px-4 !bg-[var(--error)]">Delete</button></div>
          </div>
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4" onClick={() => setShowModal(false)}>
          <div className="card p-8 max-w-lg w-full max-h-[90vh] overflow-y-auto space-y-5" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between"><h3 className="heading text-base">{editing ? "Edit" : "New"} Education</h3><button onClick={() => setShowModal(false)} className="w-8 h-8 rounded-lg border border-[var(--border)] flex items-center justify-center text-[var(--text-secondary)]"><X size={14} /></button></div>
            <div className="space-y-4">
              <div><label className="label text-[10px] mb-1.5 block">Institution *</label><input className="admin-input" value={form.institution} onChange={e => setForm({...form, institution: e.target.value})} /></div>
              <div className="grid grid-cols-2 gap-4">
                <div><label className="label text-[10px] mb-1.5 block">Degree</label><input className="admin-input" value={form.degree} onChange={e => setForm({...form, degree: e.target.value})} /></div>
                <div><label className="label text-[10px] mb-1.5 block">Field of Study</label><input className="admin-input" value={form.field} onChange={e => setForm({...form, field: e.target.value})} /></div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div><label className="label text-[10px] mb-1.5 block">Duration</label><input className="admin-input" value={form.duration} onChange={e => setForm({...form, duration: e.target.value})} placeholder="2024 – Present" /></div>
                <div><label className="label text-[10px] mb-1.5 block">Website URL</label><input className="admin-input" value={form.url} onChange={e => setForm({...form, url: e.target.value})} /></div>
              </div>
              <div><label className="label text-[10px] mb-1.5 block">Logo URL</label><input className="admin-input" value={form.logoUrl} onChange={e => setForm({...form, logoUrl: e.target.value})} /></div>
              <div><label className="label text-[10px] mb-1.5 block">Details (comma-separated)</label><input className="admin-input" value={form.details} onChange={e => setForm({...form, details: e.target.value})} placeholder="Batch: 34th, ID: 241071015" /></div>
            </div>
            <div className="flex gap-3 justify-end pt-2"><button onClick={() => setShowModal(false)} className="btn-ghost text-sm py-2.5 px-5">Cancel</button><button onClick={handleSave} disabled={saving} className="btn-primary text-sm py-2.5 px-5 disabled:opacity-50">{saving ? "Saving..." : editing ? "Update" : "Create"}</button></div>
          </div>
        </div>
      )}
    </div>
  );
}
