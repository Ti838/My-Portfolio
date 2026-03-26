"use client";

import React, { useState } from "react";
import { updateProject, createProject, deleteProject } from "@/lib/admin-actions";
import { FiSave, FiX, FiLoader, FiPlus, FiTrash2, FiUpload } from "react-icons/fi";
import { toast } from "react-hot-toast";

export default function ProjectsEditorModal({ initialProjects, onClose }: { initialProjects: any[], onClose: () => void }) {
  const [projects, setProjects] = useState(initialProjects);
  const [loading, setLoading] = useState(false);

  const saveProject = async (proj: any) => {
    setLoading(true);
    try {
      await updateProject(proj.id, proj);
      toast.success("Project updated!");
    } catch (err) {
      toast.error("Failed to update project");
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async () => {
    setLoading(true);
    try {
      const newProj = { title: "New Project", description: "...", techStack: [], featured: false, status: "completed" };
      await createProject(newProj);
      toast.success("Project created! Refreshing...");
      window.location.reload();
    } catch (err) {
      toast.error("Failed to create");
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure?")) return;
    setLoading(true);
    try {
      await deleteProject(id);
      toast.success("Project deleted! Refreshing...");
      window.location.reload();
    } catch (err) {
      toast.error("Failed to delete");
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 animate-in fade-in">
      <div className="bg-white dark:bg-slate-900 w-full max-w-4xl rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col max-h-[90vh]">
        <div className="flex items-center justify-between p-5 border-b border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50">
          <div className="flex items-center gap-4">
            <h2 className="text-lg font-bold">Edit Projects</h2>
            <button onClick={handleCreate} disabled={loading} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-accent-500/10 text-accent-500 text-xs font-bold hover:bg-accent-500 hover:text-white transition-all">
              <FiPlus /> Add New
            </button>
          </div>
          <button onClick={onClose} className="p-2 text-slate-400 hover:text-slate-900 dark:hover:text-white rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 transition">
            <FiX size={20} />
          </button>
        </div>

        <div className="p-6 space-y-6 overflow-y-auto flex-1 bg-slate-50 dark:bg-slate-900/50">
          {projects.map((proj) => (
            <div key={proj.id} className="p-5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4">
              <div className="flex items-center justify-between">
                <Input label="Title" value={proj.title} onChange={(v) => {
                  const next = [...projects];
                  next.find(p => p.id === proj.id)!.title = v;
                  setProjects(next);
                }} />
                <div className="flex gap-2 ml-4">
                  <button onClick={() => saveProject(proj)} className="p-2.5 rounded-xl hover:bg-accent-500 hover:text-white bg-slate-100 dark:bg-slate-800 text-slate-500 transition-colors">
                    <FiSave size={16} />
                  </button>
                  <button onClick={() => handleDelete(proj.id)} className="p-2.5 rounded-xl hover:bg-red-500 hover:text-white bg-slate-100 dark:bg-slate-800 text-red-500 transition-colors">
                    <FiTrash2 size={16} />
                  </button>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 <div>
                    <label className="text-[10px] uppercase font-bold text-slate-400 mb-1.5 block">Description</label>
                    <textarea 
                      value={proj.description} 
                      onChange={(e) => {
                        const next = [...projects];
                        next.find(p => p.id === proj.id)!.description = e.target.value;
                        setProjects(next);
                      }}
                      className="w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm min-h-[80px] focus:ring-2 focus:ring-accent-500 outline-none"
                    />
                 </div>
                 <div className="space-y-4">
                    <div className="space-y-1.5 overflow-hidden">
                      <label className="text-[10px] uppercase font-bold text-slate-400 mb-1.5 block">Project Preview Image</label>
                      <div className="flex gap-2">
                        <Input label="" value={proj.imageUrl || ""} onChange={(v) => {
                          const next = [...projects];
                          next.find(p => p.id === proj.id)!.imageUrl = v;
                          setProjects(next);
                        }} />
                        <label className="shrink-0 flex items-center justify-center p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-500 hover:bg-accent-500 hover:text-white transition-all cursor-pointer">
                          <FiUpload size={16} />
                          <input type="file" accept="image/*" className="hidden" onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              const reader = new FileReader();
                              reader.onloadend = () => {
                                const next = [...projects];
                                next.find(p => p.id === proj.id)!.imageUrl = reader.result as string;
                                setProjects(next);
                              };
                              reader.readAsDataURL(file);
                            }
                          }} />
                        </label>
                      </div>
                    </div>
                    <Input label="GitHub URL" value={proj.githubUrl || ""} onChange={(v) => {
                      const next = [...projects];
                      next.find(p => p.id === proj.id)!.githubUrl = v;
                      setProjects(next);
                    }} />
                    <Input label="Live Demo URL" value={proj.liveUrl || ""} onChange={(v) => {
                      const next = [...projects];
                      next.find(p => p.id === proj.id)!.liveUrl = v;
                      setProjects(next);
                    }} />
                    <Input label="Tech Stack (comma separated)" value={proj.techStack.join(", ")} onChange={(v) => {
                      const next = [...projects];
                      next.find(p => p.id === proj.id)!.techStack = v.split(",").map(s => s.trim());
                      setProjects(next);
                    }} />
                    
                    <label className="flex items-center gap-3 cursor-pointer pt-2">
                       <input 
                         type="checkbox" 
                         checked={proj.featured} 
                         onChange={(e) => {
                           const next = [...projects];
                           next.find(p => p.id === proj.id)!.featured = e.target.checked;
                           setProjects(next);
                         }}
                         className="w-4 h-4 rounded text-accent-500 focus:ring-accent-500"
                       />
                       <span className="text-sm font-bold text-slate-700 dark:text-slate-300">Feature on Homepage</span>
                    </label>
                 </div>
              </div>
            </div>
          ))}
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
        className="w-full px-4 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm focus:ring-2 focus:ring-accent-500 outline-none"
      />
    </div>
  );
}
