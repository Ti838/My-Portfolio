"use client";

import React, { useState } from "react";
import { updatePersonalInfo } from "@/lib/admin-actions";
import { FiSave, FiX, FiLoader, FiRadio } from "react-icons/fi";
import { toast } from "react-hot-toast";

export default function AnnouncementEditorModal({ initialData, onClose }: { initialData: any, onClose: () => void }) {
  const [personalInfo, setPersonalInfo] = useState(initialData);
  const [loading, setLoading] = useState(false);

  const announcement = personalInfo.announcement || { text: "", link: "", active: false };

  const save = async () => {
    setLoading(true);
    try {
      await updatePersonalInfo(personalInfo);
      toast.success("Announcement updated! Refreshing...");
      window.location.reload();
    } catch (err: any) {
      toast.error(err.message || "Failed to update");
      setLoading(false);
    }
  };

  const handleChange = (key: string, value: any) => {
    setPersonalInfo({
      ...personalInfo,
      announcement: {
        ...announcement,
        [key]: value
      }
    });
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 animate-in fade-in">
      <div className="bg-white dark:bg-slate-900 w-full max-w-lg rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
        <div className="flex items-center justify-between p-5 border-b border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50">
          <h2 className="text-lg font-bold flex items-center gap-2">
            <FiRadio className="text-accent-500" /> Global Announcement
          </h2>
          <button onClick={onClose} className="p-2 text-slate-400 hover:text-slate-900 dark:hover:text-white rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 transition">
            <FiX size={20} />
          </button>
        </div>

        <div className="p-6 space-y-6">
          <label className="flex items-center gap-3 cursor-pointer p-3 rounded-xl border border-slate-100 dark:border-slate-700/50 hover:bg-slate-50 dark:hover:bg-slate-800/20 transition-colors">
            <input 
              type="checkbox" 
              checked={announcement.active} 
              onChange={(e) => handleChange("active", e.target.checked)}
              className="w-5 h-5 rounded text-accent-500 focus:ring-accent-500"
            />
            <div>
              <span className="text-sm font-bold text-slate-900 dark:text-white block">Banner Active</span>
              <span className="text-[10px] text-slate-500 block">Show this announcement to all visitors.</span>
            </div>
          </label>

          <div className={`space-y-4 transition-all ${!announcement.active ? "opacity-50 pointer-events-none grayscale" : ""}`}>
             <Input label="Announcement Message" value={announcement.text} onChange={(v) => handleChange("text", v)} />
             <Input label="Call-to-Action Link (Optional)" value={announcement.link} onChange={(v) => handleChange("link", v)} />
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
