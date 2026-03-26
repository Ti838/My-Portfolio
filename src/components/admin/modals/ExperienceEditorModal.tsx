"use client";

import React, { useState } from "react";
import { createExperience, updateExperience, deleteExperience } from "@/lib/admin-actions";
import { FiSave, FiX, FiLoader, FiPlus, FiTrash2, FiBriefcase, FiCode, FiMusic } from "react-icons/fi";
import { toast } from "react-hot-toast";

const typeOptions = [
  { value: "work", label: "Work", icon: FiBriefcase },
  { value: "competition", label: "Competition", icon: FiCode },
  { value: "volunteer", label: "Volunteer/Other", icon: FiMusic },
];

export default function ExperienceEditorModal({ initialExperiences, onClose }: { initialExperiences: any[], onClose: () => void }) {
  const [experiences, setExperiences] = useState(initialExperiences);
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<any>(null);

  const startEdit = (exp: any) => {
    setEditingId(exp.id);
    setFormData({ ...exp });
  };

  const startNew = () => {
    setEditingId("new");
    setFormData({ title: "", type: "work", duration: "", description: "", tags: [] });
  };

  const save = async () => {
    if (!formData.title) return toast.error("Title is required");
    setLoading(true);
    try {
      if (editingId === "new") {
        await createExperience(formData);
        toast.success("Experience added!");
      } else {
        await updateExperience(editingId!, formData);
        toast.success("Experience updated!");
      }
      window.location.reload();
    } catch (err: any) {
      toast.error(err.message || "Failed to save");
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure?")) return;
    setLoading(true);
    try {
      await deleteExperience(id);
      toast.success("Deleted!");
      window.location.reload();
    } catch (err: any) {
      toast.error(err.message || "Failed to delete");
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 animate-in fade-in">
      <div className="bg-white dark:bg-slate-900 w-full max-w-4xl rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 flex flex-col max-h-[90vh]">
        <div className="flex items-center justify-between p-5 border-b border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50">
          <h2 className="text-lg font-bold flex items-center gap-2">
            <FiBriefcase className="text-accent-500" /> Manage Experience
          </h2>
          <button onClick={onClose} className="p-2 text-slate-400 hover:text-slate-900 dark:hover:text-white rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 transition">
            <FiX size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-hidden flex border-b border-slate-100 dark:border-slate-800">
          {/* List */}
          <div className="w-1/3 border-r border-slate-100 dark:border-slate-800 overflow-y-auto p-4 space-y-2">
            <button onClick={startNew} className="w-full py-3 px-4 rounded-xl border-2 border-dashed border-slate-200 dark:border-slate-700 text-slate-400 hover:border-accent-500 hover:text-accent-500 transition flex items-center justify-center gap-2 text-sm font-bold">
              <FiPlus /> Add New
            </button>
            {experiences.map((exp) => (
              <button 
                key={exp.id} 
                onClick={() => startEdit(exp)}
                className={`w-full text-left p-4 rounded-xl border transition-all ${editingId === exp.id ? "bg-accent-50 dark:bg-accent-900/20 border-accent-500 ring-1 ring-accent-500" : "bg-white dark:bg-slate-800 border-slate-100 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600"}`}
              >
                <div className="text-xs font-bold text-accent-500 mb-1 uppercase tracking-wider">{exp.type}</div>
                <div className="text-sm font-bold text-slate-900 dark:text-white truncate">{exp.title}</div>
                <div className="text-[10px] text-slate-500 mt-1">{exp.duration}</div>
              </button>
            ))}
          </div>

          {/* Form */}
          <div className="flex-1 overflow-y-auto p-6 bg-slate-50/30 dark:bg-slate-900/20">
            {formData ? (
              <div className="space-y-5">
                <div className="grid grid-cols-2 gap-4">
                  <Input label="Job/Event Title" value={formData.title} onChange={(v) => setFormData({...formData, title: v})} />
                  <div className="space-y-1.5">
                    <label className="text-[10px] uppercase font-bold text-slate-400">Type</label>
                    <select 
                      value={formData.type} 
                      onChange={(e) => setFormData({...formData, type: e.target.value})}
                      className="w-full px-4 py-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm focus:ring-2 focus:ring-accent-500 outline-none"
                    >
                      {typeOptions.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <Input label="Duration (e.g. 2024 - Present)" value={formData.duration} onChange={(v) => setFormData({...formData, duration: v})} />
                  <Input label="Tags (comma separated)" value={formData.tags?.join(", ") || ""} onChange={(v) => setFormData({...formData, tags: v.split(",").map((s:string) => s.trim()).filter(Boolean)})} />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase font-bold text-slate-400">Description</label>
                  <textarea 
                    value={formData.description} 
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm min-h-[120px] focus:ring-2 focus:ring-accent-500 outline-none"
                  />
                </div>

                <div className="flex items-center justify-between pt-4">
                  {editingId !== "new" && (
                    <button onClick={() => handleDelete(editingId!)} className="flex items-center gap-2 text-red-500 hover:text-red-600 text-xs font-bold px-4 py-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition">
                      <FiTrash2 /> Delete This
                    </button>
                  )}
                  <div className="flex-1" />
                  <button onClick={save} disabled={loading} className="btn-primary px-8 h-12">
                    {loading ? <FiLoader className="animate-spin" /> : <><FiSave /> Save Experience</>}
                  </button>
                </div>
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-slate-400 space-y-3">
                <FiBriefcase size={40} className="opacity-20" />
                <p className="text-sm font-medium">Select an item to edit or create a new one.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function Input({ label, value, onChange }: { label: string, value: string, onChange: (v: string) => void }) {
  return (
    <div className="space-y-1.5 w-full">
      <label className="text-[10px] uppercase font-bold text-slate-400">{label}</label>
      <input 
        type="text" 
        value={value} 
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-4 py-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm focus:ring-2 focus:ring-accent-500 outline-none"
      />
    </div>
  );
}
