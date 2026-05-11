// REFINED
"use client";

import { useState } from "react";
import { Plus, Pencil, Trash2, X } from "lucide-react";
import { createSkill, updateSkill, deleteSkill } from "@/lib/admin-actions";
import toast from "react-hot-toast";

export default function SkillsManager({ initialSkills, initialCategories }: { initialSkills: any[]; initialCategories: any[] }) {
  const [skills, setSkills] = useState(initialSkills);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState<any | null>(null);
  const [form, setForm] = useState({ name: "", level: 80, category_id: "" });
  const [saving, setSaving] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);
  const [filterCat, setFilterCat] = useState<string>("all");

  const filtered = filterCat === "all" ? skills : skills.filter(s => s.category_id === filterCat);

  const getCategoryName = (id: string) => initialCategories.find((c: any) => c.id === id)?.name || "Uncategorized";

  const openNew = () => { setEditing(null); setForm({ name: "", level: 80, category_id: initialCategories[0]?.id || "" }); setShowModal(true); };
  const openEdit = (item: any) => { setEditing(item); setForm({ name: item.name, level: item.level || item.proficiency || 80, category_id: item.category_id || "" }); setShowModal(true); };

  const handleSave = async () => {
    if (!form.name.trim()) { toast.error("Name is required"); return; }
    setSaving(true);
    try {
      if (editing) {
        await updateSkill(editing.id, form);
        setSkills(prev => prev.map(s => s.id === editing.id ? { ...s, ...form } : s));
        toast.success("Updated!");
      } else {
        await createSkill(form);
        setSkills(prev => [...prev, { id: Date.now().toString(), ...form }]);
        toast.success("Created!");
      }
      setShowModal(false);
    } catch (err: any) { toast.error(err.message || "Failed"); }
    setSaving(false);
  };

  const handleDelete = async (id: string) => {
    try { await deleteSkill(id); setSkills(prev => prev.filter(s => s.id !== id)); toast.success("Deleted"); setConfirmDelete(null); } catch { toast.error("Failed"); }
  };

  return (
    <div className="max-w-5xl space-y-6">
      <div className="flex items-center justify-between">
        <div><h1 className="display-md mb-1">Skills</h1><p className="body text-sm">{skills.length} skills across {initialCategories.length} categories</p></div>
        <button onClick={openNew} className="btn-primary text-sm py-2.5 px-5"><Plus size={14} /> Add Skill</button>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2">
        <button onClick={() => setFilterCat("all")} className={`skill-pill text-xs ${filterCat === "all" ? "!border-[var(--accent)] !text-[var(--accent)]" : ""}`}>All</button>
        {initialCategories.map((cat: any) => (
          <button key={cat.id} onClick={() => setFilterCat(cat.id)} className={`skill-pill text-xs ${filterCat === cat.id ? "!border-[var(--accent)] !text-[var(--accent)]" : ""}`}>
            {cat.name}
          </button>
        ))}
      </div>

      <div className="card overflow-hidden">
        <table className="admin-table">
          <thead><tr><th>Skill</th><th>Category</th><th className="hidden sm:table-cell">Proficiency</th><th>Actions</th></tr></thead>
          <tbody>
            {filtered.map(skill => (
              <tr key={skill.id}>
                <td className="font-medium text-sm">{skill.name}</td>
                <td><span className="font-mono text-[10px] text-[var(--accent)] uppercase">{getCategoryName(skill.category_id)}</span></td>
                <td className="hidden sm:table-cell">
                  <div className="flex items-center gap-3">
                    <div className="progress-track w-24"><div className="progress-fill" style={{ width: `${skill.level || skill.proficiency || 0}%` }} /></div>
                    <span className="font-mono text-xs text-[var(--text-secondary)]">{skill.level || skill.proficiency || 0}%</span>
                  </div>
                </td>
                <td>
                  <div className="flex gap-2">
                    <button onClick={() => openEdit(skill)} className="w-8 h-8 rounded-lg border border-[var(--border)] flex items-center justify-center text-[var(--accent)] hover:bg-[var(--accent-dim)]"><Pencil size={13} /></button>
                    <button onClick={() => setConfirmDelete(skill.id)} className="w-8 h-8 rounded-lg border border-[var(--border)] flex items-center justify-center text-[var(--error)] hover:bg-red-500/10"><Trash2 size={13} /></button>
                  </div>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && <tr><td colSpan={4} className="text-center py-8 text-[var(--text-tertiary)] text-sm">No skills found</td></tr>}
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
          <div className="card p-8 max-w-lg w-full space-y-5" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between"><h3 className="heading text-base">{editing ? "Edit" : "New"} Skill</h3><button onClick={() => setShowModal(false)} className="w-8 h-8 rounded-lg border border-[var(--border)] flex items-center justify-center text-[var(--text-secondary)]"><X size={14} /></button></div>
            <div className="space-y-4">
              <div><label className="label text-[10px] mb-1.5 block">Skill Name *</label><input className="admin-input" value={form.name} onChange={e => setForm({...form, name: e.target.value})} placeholder="React.js" /></div>
              <div><label className="label text-[10px] mb-1.5 block">Category</label>
                <select className="admin-input" value={form.category_id} onChange={e => setForm({...form, category_id: e.target.value})}>
                  <option value="">Select category</option>
                  {initialCategories.map((cat: any) => <option key={cat.id} value={cat.id}>{cat.name}</option>)}
                </select>
              </div>
              <div>
                <label className="label text-[10px] mb-1.5 block">Proficiency: {form.level}%</label>
                <input type="range" min={0} max={100} value={form.level} onChange={e => setForm({...form, level: parseInt(e.target.value)})} className="w-full accent-[var(--accent)]" />
                <div className="progress-track mt-2"><div className="progress-fill" style={{ width: `${form.level}%` }} /></div>
              </div>
            </div>
            <div className="flex gap-3 justify-end pt-2"><button onClick={() => setShowModal(false)} className="btn-ghost text-sm py-2.5 px-5">Cancel</button><button onClick={handleSave} disabled={saving} className="btn-primary text-sm py-2.5 px-5 disabled:opacity-50">{saving ? "Saving..." : editing ? "Update" : "Create"}</button></div>
          </div>
        </div>
      )}
    </div>
  );
}
