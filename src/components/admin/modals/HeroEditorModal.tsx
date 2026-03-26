"use client";

import React, { useState } from "react";
import { updatePersonalInfo } from "@/lib/admin-actions";
import { FiSave, FiX, FiLoader, FiUpload } from "react-icons/fi";
import { toast } from "react-hot-toast";

export default function HeroEditorModal({ initialData, onClose }: { initialData: any, onClose: () => void }) {
  const [personalInfo, setPersonalInfo] = useState(initialData);
  const [loading, setLoading] = useState(false);

  const save = async () => {
    setLoading(true);
    try {
      await updatePersonalInfo(personalInfo);
      toast.success("Hero updated! Refreshing...");
      window.location.reload();
    } catch (err: any) {
      toast.error(err.message || "Failed to update");
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 animate-in fade-in">
      <div className="bg-white dark:bg-slate-900 w-full max-w-2xl rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
        <div className="flex items-center justify-between p-5 border-b border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50">
          <h2 className="text-lg font-bold">Edit Hero & Stats</h2>
          <button onClick={onClose} className="p-2 text-slate-400 hover:text-slate-900 dark:hover:text-white rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 transition">
            <FiX size={20} />
          </button>
        </div>

        <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto">
          <div className="grid grid-cols-2 gap-4">
            <Input label="Name" value={personalInfo.name} onChange={(v) => setPersonalInfo({ ...personalInfo, name: v })} />
            <Input label="Location" value={personalInfo.location} onChange={(v) => setPersonalInfo({ ...personalInfo, location: v })} />
          </div>
          <div>
            <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1.5">Tagline</label>
            <textarea 
              value={personalInfo.tagline} 
              onChange={(e) => setPersonalInfo({ ...personalInfo, tagline: e.target.value })}
              className="w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm min-h-[80px] focus:ring-2 focus:ring-accent-500 outline-none"
            />
          </div>

          <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
            <h3 className="font-bold mb-4 text-sm text-slate-500 uppercase tracking-widest">Media & Links</h3>
            <div className="space-y-4 mb-6">
              <div className="space-y-4">
                <div className="flex gap-2 items-end">
                  <Input label="Profile Image URL" value={personalInfo.profileImage || ""} onChange={(v) => setPersonalInfo({ ...personalInfo, profileImage: v })} />
                  <label className="shrink-0 mb-1 flex items-center justify-center p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-500 hover:bg-accent-500 hover:text-white transition-all cursor-pointer">
                    <FiUpload size={16} />
                    <input type="file" accept="image/*" className="hidden" onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        const reader = new FileReader();
                        reader.onloadend = () => setPersonalInfo({ ...personalInfo, profileImage: reader.result as string });
                        reader.readAsDataURL(file);
                      }
                    }} />
                  </label>
                </div>
                
                <div className="flex gap-2 items-end">
                  <Input label="Logo Image URL" value={personalInfo.logoImage || ""} onChange={(v) => setPersonalInfo({ ...personalInfo, logoImage: v })} />
                  <label className="shrink-0 mb-1 flex items-center justify-center p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-500 hover:bg-accent-500 hover:text-white transition-all cursor-pointer">
                    <FiUpload size={16} />
                    <input type="file" accept="image/*" className="hidden" onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        const reader = new FileReader();
                        reader.onloadend = () => setPersonalInfo({ ...personalInfo, logoImage: reader.result as string });
                        reader.readAsDataURL(file);
                      }
                    }} />
                  </label>
                </div>

                <Input label="ICPC Certificate URL" value={personalInfo.stats?.icpc_certificate_url || ""} onChange={(v) => setPersonalInfo({ ...personalInfo, stats: { ...personalInfo.stats, icpc_certificate_url: v } })} />
              </div>
            </div>

            <h3 className="font-bold mb-4 text-sm text-slate-500 uppercase tracking-widest">Floating Stats & CP Custom Info</h3>
            <div className="grid grid-cols-2 gap-4">
              <Input label="Certificates" value={personalInfo.stats?.certificates || ""} onChange={(v) => setPersonalInfo({ ...personalInfo, stats: { ...personalInfo.stats, certificates: v } })} />
              <Input label="ICPC Rank" value={personalInfo.stats?.icpc_rank || ""} onChange={(v) => setPersonalInfo({ ...personalInfo, stats: { ...personalInfo.stats, icpc_rank: v } })} />
              <Input label="Languages" value={personalInfo.stats?.languages || ""} onChange={(v) => setPersonalInfo({ ...personalInfo, stats: { ...personalInfo.stats, languages: v } })} />
              <Input label="Projects" value={personalInfo.stats?.projects || ""} onChange={(v) => setPersonalInfo({ ...personalInfo, stats: { ...personalInfo.stats, projects: v } })} />
              <Input label="Codeforces Custom Stats" value={personalInfo.stats?.codeforces_stats || ""} onChange={(v) => setPersonalInfo({ ...personalInfo, stats: { ...personalInfo.stats, codeforces_stats: v } })} />
              <Input label="GitHub Custom Stats" value={personalInfo.stats?.github_stats || ""} onChange={(v) => setPersonalInfo({ ...personalInfo, stats: { ...personalInfo.stats, github_stats: v } })} />
              <Input label="Toph Custom Stats" value={personalInfo.stats?.toph_stats || ""} onChange={(v) => setPersonalInfo({ ...personalInfo, stats: { ...personalInfo.stats, toph_stats: v } })} />
              <Input label="VJudge Custom Stats" value={personalInfo.stats?.vjudge_stats || ""} onChange={(v) => setPersonalInfo({ ...personalInfo, stats: { ...personalInfo.stats, vjudge_stats: v } })} />
            </div>
          </div>
        </div>

        <div className="p-5 border-t border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 flex justify-end gap-3">
          <button onClick={onClose} className="px-5 py-2 rounded-xl text-sm font-bold text-slate-500 hover:bg-slate-200 dark:hover:bg-slate-700 transition">Cancel</button>
          <button onClick={save} disabled={loading} className="btn-primary w-32 justify-center py-2 h-10">
            {loading ? <FiLoader className="animate-spin" /> : <><FiSave /> Save</>}
          </button>
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
