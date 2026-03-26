"use client";
import React, { useState } from "react";
import { updatePersonalInfo, updateProject, deleteProject, createProject } from "@/lib/admin-actions";
import { 
  FiUser, FiMail, FiPhone, FiMapPin, FiBriefcase, 
  FiSave, FiPlus, FiTrash2, FiLoader, FiCheckCircle, FiAlertCircle
} from "react-icons/fi";
import { toast } from "react-hot-toast";

export default function SiteEditor({ initialData }: { initialData: any }) {
  const [personalInfo, setPersonalInfo] = useState(initialData.personalInfo);
  const [projects, setProjects] = useState(initialData.projects);
  const [loading, setLoading] = useState(false);

  const savePersonalInfo = async () => {
    setLoading(true);
    try {
      await updatePersonalInfo(personalInfo);
      toast.success("Personal Info updated successfully!");
    } catch (err: any) {
      toast.error(err.message || "Failed to update info");
    } finally {
      setLoading(false);
    }
  };

  const saveProject = async (id: string, data: any) => {
    setLoading(true);
    try {
      await updateProject(id, data);
      toast.success("Project updated!");
    } catch (err: any) {
      toast.error("Failed to update project");
    } finally {
      setLoading(false);
    }
  };

  const handleCreateProject = async () => {
    setLoading(true);
    try {
      const newProj = {
        title: "New Project",
        description: "Project description...",
        techStack: [],
        featured: false,
        status: "completed"
      };
      await createProject(newProj);
      toast.success("Project created! Refreshing...");
      window.location.reload();
    } catch (err) {
      toast.error("Failed to create project");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteProject = async (id: string) => {
    if (!confirm("Are you sure you want to delete this project?")) return;
    setLoading(true);
    try {
      await deleteProject(id);
      setProjects((prev: any[]) => prev.filter((p: any) => p.id !== id));
      toast.success("Project deleted");
    } catch (err) {
      toast.error("Failed to delete project");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-12 max-w-4xl mx-auto py-10 px-6">
      {/* Introduction Section */}
      <section className="space-y-6">
        <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <FiUser className="text-accent-500" /> Intro & Bio
          </h2>
          <button 
            onClick={savePersonalInfo} 
            disabled={loading}
            className="btn-primary py-2 text-sm"
          >
            {loading ? <FiLoader className="animate-spin" /> : <FiSave />} Save Intro
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input label="Name" value={personalInfo.name} onChange={(v) => setPersonalInfo({...personalInfo, name: v})} />
          <Input label="Tagline" value={personalInfo.tagline} onChange={(v) => setPersonalInfo({...personalInfo, tagline: v})} />
          <Input label="Location" value={personalInfo.location} onChange={(v) => setPersonalInfo({...personalInfo, location: v})} />
          <Input label="Email" value={personalInfo.email} onChange={(v) => setPersonalInfo({...personalInfo, email: v})} />
          <div className="md:col-span-2">
            <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Main Bio</label>
            <textarea 
               value={personalInfo.bio} 
               onChange={(e) => setPersonalInfo({...personalInfo, bio: e.target.value})}
               className="w-full p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-sm min-h-[120px] focus:ring-2 focus:ring-accent-500 outline-none"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Extended Bio (About Page)</label>
            <textarea 
               value={personalInfo.bioExtended} 
               onChange={(e) => setPersonalInfo({...personalInfo, bioExtended: e.target.value})}
               className="w-full p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-sm min-h-[120px] focus:ring-2 focus:ring-accent-500 outline-none"
            />
          </div>
        </div>
      </section>

      {/* Hero Stats Section */}
      <section className="space-y-6">
        <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <FiCheckCircle className="text-accent-500" /> Hero Stats
          </h2>
          <p className="text-[10px] text-slate-400 font-mono italic">These appear on your home page photo</p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Input 
            label="Certificates" 
            value={personalInfo.stats?.certificates || ""} 
            onChange={(v) => setPersonalInfo({...personalInfo, stats: {...personalInfo.stats, certificates: v}})} 
          />
          <Input 
            label="ICPC Rank" 
            value={personalInfo.stats?.icpc_rank || ""} 
            onChange={(v) => setPersonalInfo({...personalInfo, stats: {...personalInfo.stats, icpc_rank: v}})} 
          />
          <Input 
            label="Languages" 
            value={personalInfo.stats?.languages || ""} 
            onChange={(v) => setPersonalInfo({...personalInfo, stats: {...personalInfo.stats, languages: v}})} 
          />
          <Input 
            label="Projects" 
            value={personalInfo.stats?.projects || ""} 
            onChange={(v) => setPersonalInfo({...personalInfo, stats: {...personalInfo.stats, projects: v}})} 
          />
        </div>
      </section>

      {/* Projects Section */}
      <section className="space-y-6">
        <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <FiBriefcase className="text-accent-500" /> Projects
          </h2>
          <button onClick={handleCreateProject} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-accent-500/10 text-accent-500 text-sm hover:bg-accent-500 hover:text-white transition-all">
            <FiPlus /> New Project
          </button>
        </div>

        <div className="space-y-6">
          {projects.map((proj: any) => (
            <div key={proj.id} className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4 group">
              <div className="flex items-center justify-between">
                <Input label="Title" value={proj.title} onChange={(v) => {
                  const next = [...projects];
                  const i = next.findIndex((p: any) => p.id === proj.id);
                  next[i].title = v;
                  setProjects(next);
                }} />
                <div className="flex gap-2">
                  <button onClick={() => saveProject(proj.id, proj)} className="p-2 rounded-lg hover:bg-green-500/10 text-green-500 transition-colors">
                    <FiSave size={18} />
                  </button>
                  <button onClick={() => handleDeleteProject(proj.id)} className="p-2 rounded-lg hover:bg-red-500/10 text-red-500 transition-colors">
                    <FiTrash2 size={18} />
                  </button>
                </div>
              </div>
              <textarea 
                 value={proj.description} 
                 onChange={(e) => {
                  const next = [...projects];
                  const i = next.findIndex((p: any) => p.id === proj.id);
                  next[i].description = e.target.value;
                  setProjects(next);
                 }}
                 className="w-full p-3 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 text-xs min-h-[80px] outline-none"
              />
              <div className="grid grid-cols-2 gap-4">
                 <Input label="GitHub URL" value={proj.githubUrl || ""} onChange={(v) => {
                    const next = [...projects];
                    const i = next.findIndex((p: any) => p.id === proj.id);
                    next[i].githubUrl = v;
                    setProjects(next);
                 }} />
                 <Input label="Tech (comma split)" value={proj.techStack.join(", ")} onChange={(v) => {
                    const next = [...projects];
                    const i = next.findIndex((p: any) => p.id === proj.id);
                    next[i].techStack = v.split(",").map((s: string) => s.trim());
                    setProjects(next);
                 }} />
              </div>
            </div>
          ))}
        </div>
      </section>
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
        className="w-full px-4 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 text-sm focus:ring-2 focus:ring-accent-500 outline-none"
      />
    </div>
  );
}
