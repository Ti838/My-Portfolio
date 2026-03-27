"use client";
import React, { useState } from "react";
import { updatePersonalInfo, updateProject, deleteProject, createProject, uploadAdminAsset } from "@/lib/admin-actions";
import { 
  FiUser, FiMail, FiPhone, FiMapPin, FiBriefcase, 
  FiSave, FiPlus, FiTrash2, FiLoader, FiCheckCircle, FiAlertCircle
} from "react-icons/fi";
import { toast } from "react-hot-toast";

export default function SiteEditor({ initialData }: { initialData: any }) {
  const [personalInfo, setPersonalInfo] = useState(initialData.personalInfo);
  const [projects, setProjects] = useState(initialData.projects);
  const [loading, setLoading] = useState(false);

  const uploadImage = async (file: File, folder: string) => {
    const bytes = await file.arrayBuffer();
    const bytesBase64 = arrayBufferToBase64(bytes);
    const { publicUrl } = await uploadAdminAsset({
      bucket: "portfolio",
      folder,
      filename: file.name,
      contentType: file.type || "application/octet-stream",
      bytesBase64,
    });
    return publicUrl;
  };

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

          <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="block text-xs font-bold text-slate-400 uppercase">Logo Image</label>
              <div className="flex items-center gap-3">
                <input
                  type="file"
                  accept="image/*"
                  disabled={loading}
                  onChange={async (e) => {
                    const file = e.target.files?.[0];
                    if (!file) return;
                    setLoading(true);
                    try {
                      const url = await uploadImage(file, "logo");
                      setPersonalInfo((prev: any) => ({ ...prev, logoImage: url }));
                      toast.success("Logo uploaded. Click Save Intro to persist.");
                    } catch (err: any) {
                      toast.error(err?.message || "Logo upload failed");
                    } finally {
                      setLoading(false);
                      e.currentTarget.value = "";
                    }
                  }}
                  className="block w-full text-xs"
                />
              </div>
              {personalInfo.logoImage && (
                <p className="text-[11px] text-slate-500 break-all">{personalInfo.logoImage}</p>
              )}
            </div>
            <div className="space-y-2">
              <label className="block text-xs font-bold text-slate-400 uppercase">Profile Image</label>
              <input
                type="file"
                accept="image/*"
                disabled={loading}
                onChange={async (e) => {
                  const file = e.target.files?.[0];
                  if (!file) return;
                  setLoading(true);
                  try {
                    const url = await uploadImage(file, "profile");
                    setPersonalInfo((prev: any) => ({ ...prev, profileImage: url }));
                    toast.success("Profile uploaded. Click Save Intro to persist.");
                  } catch (err: any) {
                    toast.error(err?.message || "Profile upload failed");
                  } finally {
                    setLoading(false);
                    e.currentTarget.value = "";
                  }
                }}
                className="block w-full text-xs"
              />
              {personalInfo.profileImage && (
                <p className="text-[11px] text-slate-500 break-all">{personalInfo.profileImage}</p>
              )}
            </div>
          </div>

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
            onChange={(v) => setPersonalInfo({ ...personalInfo, stats: { ...personalInfo.stats, certificates: v } })}
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

        <div className="pt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input
            label="Location (fallback)"
            value={personalInfo.location}
            onChange={(v) => setPersonalInfo({ ...personalInfo, location: v })}
          />
          <div className="space-y-2">
            <label className="block text-[10px] uppercase font-bold text-slate-400">Show Location Publicly</label>
            <select
              value={String(personalInfo.stats?.location_public ?? true)}
              onChange={(e) => {
                const val = e.target.value === "true";
                setPersonalInfo({
                  ...personalInfo,
                  stats: { ...personalInfo.stats, location_public: val },
                });
              }}
              className="w-full px-4 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 text-sm focus:ring-2 focus:ring-accent-500 outline-none"
            >
              <option value="true">Yes (show)</option>
              <option value="false">No (hide)</option>
            </select>
            <p className="text-[11px] text-slate-400">If hidden, Home/About won't show your location.</p>
          </div>

          <Input
            label="Public Location Label (Home tag)"
            value={personalInfo.stats?.location_label || ""}
            onChange={(v) =>
              setPersonalInfo({
                ...personalInfo,
                stats: { ...personalInfo.stats, location_label: v },
              })
            }
          />

          <div className="space-y-2">
            <label className="block text-[10px] uppercase font-bold text-slate-400">Full Address (About page)</label>
            <input
              type="text"
              value={personalInfo.stats?.location_full || ""}
              onChange={(e) =>
                setPersonalInfo({
                  ...personalInfo,
                  stats: { ...personalInfo.stats, location_full: e.target.value },
                })
              }
              className="w-full px-4 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 text-sm focus:ring-2 focus:ring-accent-500 outline-none"
            />
          </div>
        </div>

        <div className="pt-2">
          <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-3">Profile Cards (Live Text)</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Codeforces Handle"
              value={personalInfo.stats?.codeforces_handle || ""}
              onChange={(v) => setPersonalInfo({
                ...personalInfo,
                stats: { ...personalInfo.stats, codeforces_handle: v },
              })}
            />
            <Input
              label="LeetCode Username"
              value={personalInfo.stats?.leetcode_user || ""}
              onChange={(v) => setPersonalInfo({
                ...personalInfo,
                stats: { ...personalInfo.stats, leetcode_user: v },
              })}
            />
            <Input
              label="GitHub Username"
              value={personalInfo.stats?.github_user || ""}
              onChange={(v) => setPersonalInfo({
                ...personalInfo,
                stats: { ...personalInfo.stats, github_user: v },
              })}
            />
            <Input
              label="Toph Username (optional)"
              value={personalInfo.stats?.toph_user || ""}
              onChange={(v) => setPersonalInfo({
                ...personalInfo,
                stats: { ...personalInfo.stats, toph_user: v },
              })}
            />
            <Input
              label="VJudge Username (optional)"
              value={personalInfo.stats?.vjudge_user || ""}
              onChange={(v) => setPersonalInfo({
                ...personalInfo,
                stats: { ...personalInfo.stats, vjudge_user: v },
              })}
            />
            <Input
              label="Codeforces Card Text"
              value={personalInfo.stats?.codeforces_stats || ""}
              onChange={(v) => setPersonalInfo({
                ...personalInfo,
                stats: { ...personalInfo.stats, codeforces_stats: v },
              })}
            />
            <Input
              label="LeetCode Card Text"
              value={personalInfo.stats?.leetcode_stats || ""}
              onChange={(v) => setPersonalInfo({
                ...personalInfo,
                stats: { ...personalInfo.stats, leetcode_stats: v },
              })}
            />
            <Input
              label="GitHub Card Text"
              value={personalInfo.stats?.github_stats || ""}
              onChange={(v) => setPersonalInfo({
                ...personalInfo,
                stats: { ...personalInfo.stats, github_stats: v },
              })}
            />
            <Input
              label="Toph Card Text"
              value={personalInfo.stats?.toph_stats || ""}
              onChange={(v) => setPersonalInfo({
                ...personalInfo,
                stats: { ...personalInfo.stats, toph_stats: v },
              })}
            />
            <Input
              label="VJudge Card Text"
              value={personalInfo.stats?.vjudge_stats || ""}
              onChange={(v) => setPersonalInfo({
                ...personalInfo,
                stats: { ...personalInfo.stats, vjudge_stats: v },
              })}
            />
            <Input
              label="ICPC Certificate URL (Badge link)"
              value={personalInfo.stats?.icpc_certificate_url || ""}
              onChange={(v) => setPersonalInfo({
                ...personalInfo,
                stats: { ...personalInfo.stats, icpc_certificate_url: v },
              })}
            />
          </div>
          <p className="text-[11px] text-slate-400 mt-2">Leave empty to auto-show fetched stats.</p>
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

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
                <div className="space-y-2">
                  <label className="block text-[10px] uppercase font-bold text-slate-400">Project Image</label>
                  <input
                    type="file"
                    accept="image/*"
                    disabled={loading}
                    onChange={async (e) => {
                      const file = e.target.files?.[0];
                      if (!file) return;
                      setLoading(true);
                      try {
                        const url = await uploadImage(file, "projects");
                        const next = [...projects];
                        const i = next.findIndex((p: any) => p.id === proj.id);
                        next[i].imageUrl = url;
                        setProjects(next);
                        await saveProject(proj.id, { ...proj, imageUrl: url });
                        toast.success("Project image saved!");
                      } catch (err: any) {
                        toast.error(err?.message || "Project image upload failed");
                      } finally {
                        setLoading(false);
                        e.currentTarget.value = "";
                      }
                    }}
                    className="block w-full text-xs"
                  />
                  {(proj.imageUrl || proj.image_url) && (
                    <p className="text-[11px] text-slate-500 break-all">{proj.imageUrl || proj.image_url}</p>
                  )}
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase font-bold text-slate-400">Live URL</label>
                  <input
                    type="text"
                    value={proj.liveUrl || ""}
                    onChange={(e) => {
                      const next = [...projects];
                      const i = next.findIndex((p: any) => p.id === proj.id);
                      next[i].liveUrl = e.target.value;
                      setProjects(next);
                    }}
                    className="w-full px-4 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 text-sm focus:ring-2 focus:ring-accent-500 outline-none"
                  />
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

function arrayBufferToBase64(buffer: ArrayBuffer) {
  let binary = "";
  const bytes = new Uint8Array(buffer);
  const chunkSize = 0x8000;
  for (let i = 0; i < bytes.length; i += chunkSize) {
    const chunk = bytes.subarray(i, i + chunkSize);
    for (let j = 0; j < chunk.length; j++) {
      binary += String.fromCharCode(chunk[j]!);
    }
  }
  return btoa(binary);
}
