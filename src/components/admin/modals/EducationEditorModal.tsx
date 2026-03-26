"use client";

import React, { useState, useRef } from "react";
import { createEducation, updateEducation, deleteEducation } from "@/lib/admin-actions";
import { FiSave, FiX, FiLoader, FiPlus, FiTrash2, FiBookOpen, FiUpload, FiExternalLink } from "react-icons/fi";
import { toast } from "react-hot-toast";
import Image from "next/image";

export default function EducationEditorModal({ initialEducation, onClose }: { initialEducation: any[], onClose: () => void }) {
  const [education, setEducation] = useState(initialEducation);
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<any>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const startEdit = (edu: any) => {
    setEditingId(edu.id);
    setFormData({ ...edu });
  };

  const startNew = () => {
    setEditingId("new");
    setFormData({ institution: "", degree: "", field: "", duration: "", logoUrl: "/images/university-logo.png", url: "", details: [] });
  };

  const save = async () => {
    if (!formData.institution) return toast.error("Institution name is required");
    setLoading(true);
    try {
      if (editingId === "new") {
        await createEducation(formData);
        toast.success("Education added!");
      } else {
        await updateEducation(editingId!, formData);
        toast.success("Education updated!");
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
      await deleteEducation(id);
      toast.success("Deleted!");
      window.location.reload();
    } catch (err: any) {
      toast.error(err.message || "Failed to delete");
      setLoading(false);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, logoUrl: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 animate-in fade-in">
      <div className="bg-white dark:bg-slate-900 w-full max-w-4xl rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 flex flex-col max-h-[90vh]">
        <div className="flex items-center justify-between p-5 border-b border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50">
          <h2 className="text-lg font-bold flex items-center gap-2">
            <FiBookOpen className="text-accent-500" /> Manage Education
          </h2>
          <button onClick={onClose} className="p-2 text-slate-400 hover:text-slate-900 dark:hover:text-white rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 transition">
            <FiX size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-hidden flex border-b border-slate-100 dark:border-slate-800">
          {/* List */}
          <div className="w-1/3 border-r border-slate-100 dark:border-slate-800 overflow-y-auto p-4 space-y-2 text-left">
            <button onClick={startNew} className="w-full py-3 px-4 rounded-xl border-2 border-dashed border-slate-200 dark:border-slate-700 text-slate-400 hover:border-accent-500 hover:text-accent-500 transition flex items-center justify-center gap-2 text-sm font-bold">
              <FiPlus /> Add New Record
            </button>
            {education.map((edu) => (
              <button 
                key={edu.id} 
                onClick={() => startEdit(edu)}
                className={`w-full text-left p-4 rounded-xl border transition-all flex items-center gap-3 ${editingId === edu.id ? "bg-accent-50 dark:bg-accent-900/20 border-accent-500 ring-1 ring-accent-500" : "bg-white dark:bg-slate-800 border-slate-100 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600"}`}
              >
                <div className="w-10 h-10 rounded-lg overflow-hidden border border-slate-100 dark:border-slate-700 bg-white flex-shrink-0">
                  <Image src={edu.logoUrl || "/images/university-logo.png"} alt="L" width={40} height={40} className="object-contain" />
                </div>
                <div className="flex-1 overflow-hidden">
                  <div className="text-sm font-bold text-slate-900 dark:text-white truncate">{edu.institution}</div>
                  <div className="text-[10px] text-slate-500">{edu.duration}</div>
                </div>
              </button>
            ))}
          </div>

          {/* Form */}
          <div className="flex-1 overflow-y-auto p-6 bg-slate-50/30 dark:bg-slate-900/20">
            {formData ? (
              <div className="space-y-6">
                <div className="flex items-start gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase font-bold text-slate-400 block">Institution Logo</label>
                    <div 
                      onClick={() => fileInputRef.current?.click()}
                      className="group relative w-24 h-24 rounded-2xl border-2 border-dashed border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 flex items-center justify-center cursor-pointer overflow-hidden hover:border-accent-500 transition-colors"
                    >
                      {formData.logoUrl ? (
                        <Image src={formData.logoUrl} alt="Logo" fill className="object-contain p-2" />
                      ) : (
                        <FiUpload size={24} className="text-slate-300 group-hover:text-accent-500" />
                      )}
                      <div className="absolute inset-0 bg-accent-500/0 group-hover:bg-accent-500/10 flex items-center justify-center transition-colors">
                        <FiUpload className="text-white opacity-0 group-hover:opacity-100" />
                      </div>
                    </div>
                    <input type="file" ref={fileInputRef} onChange={handleImageUpload} className="hidden" accept="image/*" />
                  </div>
                  <div className="flex-1 space-y-4">
                    <Input label="Institution Name" value={formData.institution} onChange={(v) => setFormData({...formData, institution: v})} />
                    <Input label="Degree / Certificate" value={formData.degree} onChange={(v) => setFormData({...formData, degree: v})} />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <Input label="Field of Study (Group)" value={formData.field || ""} onChange={(v) => setFormData({...formData, field: v})} />
                  <Input label="Duration (e.g. 2024 - Present)" value={formData.duration} onChange={(v) => setFormData({...formData, duration: v})} />
                </div>

                <Input label="Official Website URL" value={formData.url || ""} onChange={(v) => setFormData({...formData, url: v})} />

                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase font-bold text-slate-400">Key Details (One per line)</label>
                  <textarea 
                    value={formData.details?.join("\n") || ""} 
                    onChange={(e) => setFormData({...formData, details: e.target.value.split("\n").filter(Boolean)})}
                    className="w-full px-4 py-3 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm min-h-[100px] focus:ring-2 focus:ring-accent-500 outline-none"
                    placeholder="e.g. CGPA: 3.80&#10;Student ID: 123"
                  />
                </div>

                <div className="flex items-center justify-between pt-4">
                  {editingId !== "new" && (
                    <button onClick={() => handleDelete(editingId!)} className="flex items-center gap-2 text-red-500 hover:text-red-600 text-xs font-bold px-4 py-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition">
                      <FiTrash2 /> Delete Record
                    </button>
                  )}
                  <div className="flex-1" />
                  <button onClick={save} disabled={loading} className="btn-primary px-8 h-12">
                    {loading ? <FiLoader className="animate-spin" /> : <><FiSave /> Save Education</>}
                  </button>
                </div>
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-slate-400 space-y-3">
                <FiBookOpen size={40} className="opacity-20" />
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
