// REFINED
"use client";

import { useState } from "react";
import { Plus, Pencil, Trash2, Search, Star, ExternalLink, X } from "lucide-react";
import { FiGithub as Github } from "react-icons/fi";
import { createProject, updateProject, deleteProject } from "@/lib/admin-actions";
import toast from "react-hot-toast";

interface Project {
  id: string;
  title: string;
  description: string;
  techStack?: string[];
  tags?: string[];
  githubUrl?: string;
  liveUrl?: string;
  imageUrl?: string;
  featured?: boolean;
  status?: string;
  sort_order?: number;
}

export default function ProjectsManager({ initialProjects }: { initialProjects: Project[] }) {
  const [projects, setProjects] = useState(initialProjects);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState<Project | null>(null);
  const [form, setForm] = useState({
    title: "", description: "", techStack: "",
    githubUrl: "", liveUrl: "", imageUrl: "",
    featured: false, status: "completed"
  });
  const [saving, setSaving] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);

  const filtered = projects.filter(p =>
    p.title.toLowerCase().includes(search.toLowerCase())
  );

  const openNew = () => {
    setEditing(null);
    setForm({ title: "", description: "", techStack: "", githubUrl: "", liveUrl: "", imageUrl: "", featured: false, status: "completed" });
    setShowModal(true);
  };

  const openEdit = (p: Project) => {
    setEditing(p);
    setForm({
      title: p.title,
      description: p.description || "",
      techStack: (p.techStack || p.tags || []).join(", "),
      githubUrl: p.githubUrl || "",
      liveUrl: p.liveUrl || "",
      imageUrl: p.imageUrl || "",
      featured: p.featured || false,
      status: p.status || "completed",
    });
    setShowModal(true);
  };

  const handleSave = async () => {
    if (!form.title.trim()) { toast.error("Title is required"); return; }
    setSaving(true);
    try {
      const payload = {
        title: form.title,
        description: form.description,
        techStack: form.techStack.split(",").map(s => s.trim()).filter(Boolean),
        githubUrl: form.githubUrl,
        liveUrl: form.liveUrl,
        imageUrl: form.imageUrl,
        featured: form.featured,
        status: form.status,
      };

      if (editing) {
        await updateProject(editing.id, payload);
        setProjects(prev => prev.map(p => p.id === editing.id ? { ...p, ...payload } : p));
        toast.success("Project updated!");
      } else {
        await createProject(payload);
        toast.success("Project created!");
        // Optimistic — would need refetch for real ID
        setProjects(prev => [...prev, { id: Date.now().toString(), ...payload }]);
      }
      setShowModal(false);
    } catch (err: any) {
      toast.error(err.message || "Failed to save");
    }
    setSaving(false);
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteProject(id);
      setProjects(prev => prev.filter(p => p.id !== id));
      toast.success("Project deleted");
      setConfirmDelete(null);
    } catch (err: any) {
      toast.error(err.message || "Failed to delete");
    }
  };

  return (
    <div className="max-w-5xl space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="display-md mb-1">Projects</h1>
          <p className="body text-sm">{projects.length} projects total</p>
        </div>
        <button onClick={openNew} className="btn-primary text-sm py-2.5 px-5">
          <Plus size={14} /> Add New
        </button>
      </div>

      {/* Search */}
      <div className="relative">
        <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-tertiary)]" />
        <input
          type="text"
          placeholder="Search projects..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="admin-input pl-10"
        />
      </div>

      {/* Table */}
      <div className="card overflow-hidden">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Title</th>
              <th className="hidden md:table-cell">Tech</th>
              <th className="hidden sm:table-cell">Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((p) => (
              <tr key={p.id}>
                <td>
                  <div className="flex items-center gap-2">
                    {p.featured && <Star size={12} className="text-[var(--accent)] fill-[var(--accent)]" />}
                    <span className="font-medium text-sm">{p.title}</span>
                  </div>
                </td>
                <td className="hidden md:table-cell">
                  <div className="flex flex-wrap gap-1">
                    {(p.techStack || p.tags || []).slice(0, 3).map(t => (
                      <span key={t} className="font-mono text-[9px] text-[var(--text-tertiary)] px-2 py-0.5 border border-[var(--border)] rounded-full">{t}</span>
                    ))}
                  </div>
                </td>
                <td className="hidden sm:table-cell">
                  <span className={`font-mono text-[10px] uppercase tracking-wider ${p.status === 'completed' ? 'text-[var(--success)]' : 'text-[var(--warning)]'}`}>
                    {p.status || "completed"}
                  </span>
                </td>
                <td>
                  <div className="flex items-center gap-2">
                    <button onClick={() => openEdit(p)} className="w-8 h-8 rounded-lg border border-[var(--border)] flex items-center justify-center text-[var(--accent)] hover:bg-[var(--accent-dim)] transition-colors">
                      <Pencil size={13} />
                    </button>
                    <button onClick={() => setConfirmDelete(p.id)} className="w-8 h-8 rounded-lg border border-[var(--border)] flex items-center justify-center text-[var(--error)] hover:bg-red-500/10 transition-colors">
                      <Trash2 size={13} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr><td colSpan={4} className="text-center py-8 text-[var(--text-tertiary)] text-sm">No projects found</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Delete Confirmation */}
      {confirmDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm" onClick={() => setConfirmDelete(null)}>
          <div className="card p-6 max-w-sm w-full mx-4 space-y-4" onClick={e => e.stopPropagation()}>
            <h3 className="heading text-base">Confirm Delete</h3>
            <p className="body text-sm">Are you sure? This action cannot be undone.</p>
            <div className="flex gap-3 justify-end">
              <button onClick={() => setConfirmDelete(null)} className="btn-ghost text-sm py-2 px-4">Cancel</button>
              <button onClick={() => handleDelete(confirmDelete)} className="btn-primary text-sm py-2 px-4 !bg-[var(--error)]">Delete</button>
            </div>
          </div>
        </div>
      )}

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4" onClick={() => setShowModal(false)}>
          <div className="card p-8 max-w-lg w-full max-h-[90vh] overflow-y-auto space-y-5" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between">
              <h3 className="heading text-base">{editing ? "Edit Project" : "New Project"}</h3>
              <button onClick={() => setShowModal(false)} className="w-8 h-8 rounded-lg border border-[var(--border)] flex items-center justify-center text-[var(--text-secondary)] hover:text-[var(--text-primary)]">
                <X size={14} />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="label text-[10px] mb-1.5 block">Title *</label>
                <input className="admin-input" value={form.title} onChange={e => setForm({...form, title: e.target.value})} placeholder="Project title" />
              </div>
              <div>
                <label className="label text-[10px] mb-1.5 block">Description</label>
                <textarea className="admin-input resize-none" rows={3} value={form.description} onChange={e => setForm({...form, description: e.target.value})} placeholder="Short description" />
              </div>
              <div>
                <label className="label text-[10px] mb-1.5 block">Tech Stack (comma-separated)</label>
                <input className="admin-input" value={form.techStack} onChange={e => setForm({...form, techStack: e.target.value})} placeholder="React, Next.js, Supabase" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="label text-[10px] mb-1.5 block">GitHub URL</label>
                  <input className="admin-input" value={form.githubUrl} onChange={e => setForm({...form, githubUrl: e.target.value})} placeholder="https://github.com/..." />
                </div>
                <div>
                  <label className="label text-[10px] mb-1.5 block">Live URL</label>
                  <input className="admin-input" value={form.liveUrl} onChange={e => setForm({...form, liveUrl: e.target.value})} placeholder="https://..." />
                </div>
              </div>
              <div>
                <label className="label text-[10px] mb-1.5 block">Cover Image URL</label>
                <input className="admin-input" value={form.imageUrl} onChange={e => setForm({...form, imageUrl: e.target.value})} placeholder="https://..." />
              </div>
              <div className="flex items-center gap-6">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={form.featured} onChange={e => setForm({...form, featured: e.target.checked})} className="accent-[var(--accent)]" />
                  <span className="text-sm text-[var(--text-secondary)]">Featured</span>
                </label>
                <select className="admin-input w-auto" value={form.status} onChange={e => setForm({...form, status: e.target.value})}>
                  <option value="completed">Completed</option>
                  <option value="in-progress">In Progress</option>
                  <option value="planned">Planned</option>
                </select>
              </div>
            </div>

            <div className="flex gap-3 justify-end pt-2">
              <button onClick={() => setShowModal(false)} className="btn-ghost text-sm py-2.5 px-5">Cancel</button>
              <button onClick={handleSave} disabled={saving} className="btn-primary text-sm py-2.5 px-5 disabled:opacity-50">
                {saving ? "Saving..." : (editing ? "Update" : "Create")}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
