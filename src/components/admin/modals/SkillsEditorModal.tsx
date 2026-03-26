"use client";

import React, { useState } from "react";
import { createSkill, updateSkill, deleteSkill } from "@/lib/admin-actions";
import { FiSave, FiX, FiLoader, FiPlus, FiTrash2, FiCode } from "react-icons/fi";
import { toast } from "react-hot-toast";

export default function SkillsEditorModal({ skills, categories, onClose }: { skills: any[], categories: any[], onClose: () => void }) {
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<any>(null);

  const startEdit = (skill: any) => {
    setEditingId(skill.id);
    setFormData({ ...skill });
  };

  const startNew = () => {
    setEditingId("new");
    setFormData({ name: "", level: 80, category_id: categories[0]?.id || "" });
  };

  const save = async () => {
    if (!formData.name) return toast.error("Skill name is required");
    setLoading(true);
    try {
      if (editingId === "new") {
        await createSkill(formData);
        toast.success("Skill added!");
      } else {
        await updateSkill(editingId!, formData);
        toast.success("Skill updated!");
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
      await deleteSkill(id);
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
            <FiCode className="text-accent-500" /> Manage Technical Stack
          </h2>
          <button onClick={onClose} className="p-2 text-slate-400 hover:text-slate-900 dark:hover:text-white rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 transition">
            <FiX size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-hidden flex border-b border-slate-100 dark:border-slate-800">
          {/* Categories & Skills List */}
          <div className="w-1/3 border-r border-slate-100 dark:border-slate-800 overflow-y-auto p-4 space-y-6">
            <button onClick={startNew} className="w-full py-3 px-4 rounded-xl border-2 border-dashed border-slate-200 dark:border-slate-700 text-slate-400 hover:border-accent-500 hover:text-accent-500 transition flex items-center justify-center gap-2 text-sm font-bold">
              <FiPlus /> Add New Skill
            </button>
            
            {categories.map(cat => (
              <div key={cat.id} className="space-y-2">
                <h3 className="text-[10px] uppercase font-bold text-slate-400 px-2">{cat.category}</h3>
                <div className="space-y-1">
                  {skills.filter(s => s.category_id === cat.id).map(skill => (
                    <button 
                      key={skill.id} 
                      onClick={() => startEdit(skill)}
                      className={`w-full text-left p-3 rounded-lg border transition-all text-sm ${editingId === skill.id ? "bg-accent-50 dark:bg-accent-900/20 border-accent-500 text-accent-700 dark:text-accent-300 font-bold" : "bg-white dark:bg-slate-800 border-slate-100 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600"}`}
                    >
                      {skill.name} <span className="float-right opacity-50 font-normal">{skill.level}%</span>
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Form */}
          <div className="flex-1 overflow-y-auto p-6 bg-slate-50/30 dark:bg-slate-900/20">
            {formData ? (
              <div className="space-y-6">
                <div>
                  <label className="text-[10px] uppercase font-bold text-slate-400 mb-1.5 block">Skill Name</label>
                  <input 
                    type="text" 
                    value={formData.name} 
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full px-4 py-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm focus:ring-2 focus:ring-accent-500 outline-none"
                    placeholder="e.g. Next.js"
                  />
                </div>

                <div>
                  <label className="text-[10px] uppercase font-bold text-slate-400 mb-1.5 block">Category</label>
                  <select 
                    value={formData.category_id} 
                    onChange={(e) => setFormData({...formData, category_id: e.target.value})}
                    className="w-full px-4 py-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm focus:ring-2 focus:ring-accent-500 outline-none"
                  >
                    {categories.map(cat => <option key={cat.id} value={cat.id}>{cat.category}</option>)}
                  </select>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-1.5">
                    <label className="text-[10px] uppercase font-bold text-slate-400">Proficiency Level</label>
                    <span className="text-xs font-bold text-accent-500">{formData.level}%</span>
                  </div>
                  <input 
                    type="range" 
                    min="1" 
                    max="100" 
                    value={formData.level} 
                    onChange={(e) => setFormData({...formData, level: parseInt(e.target.value)})}
                    className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-accent-500"
                  />
                </div>

                <div className="flex items-center justify-between pt-4">
                  {editingId !== "new" && (
                    <button onClick={() => handleDelete(editingId!)} className="flex items-center gap-2 text-red-500 hover:text-red-600 text-xs font-bold px-4 py-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition">
                      <FiTrash2 /> Delete Skill
                    </button>
                  )}
                  <div className="flex-1" />
                  <button onClick={save} disabled={loading} className="btn-primary px-8 h-12">
                    {loading ? <FiLoader className="animate-spin" /> : <><FiSave /> Save Skill</>}
                  </button>
                </div>
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-slate-400 space-y-3 text-center p-10">
                <FiCode size={48} className="opacity-10 mb-2" />
                <p className="text-sm font-medium">Select a skill to edit or add a new one to your tech stack.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
