"use client";

import React, { useState } from "react";
import { updatePersonalInfo } from "@/lib/admin-actions";
import { FiSave, FiX, FiLoader } from "react-icons/fi";
import { toast } from "react-hot-toast";

export default function BioEditorModal({ initialData, onClose }: { initialData: any, onClose: () => void }) {
  const [personalInfo, setPersonalInfo] = useState(initialData);
  const [loading, setLoading] = useState(false);

  const save = async () => {
    setLoading(true);
    try {
      await updatePersonalInfo(personalInfo);
      toast.success("Bio updated! Refreshing...");
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
          <h2 className="text-lg font-bold">Edit Biography</h2>
          <button onClick={onClose} className="p-2 text-slate-400 hover:text-slate-900 dark:hover:text-white rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 transition">
            <FiX size={20} />
          </button>
        </div>

        <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto">
          <div>
            <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1.5">Short Bio (Homepage)</label>
            <textarea 
              value={personalInfo.bio} 
              onChange={(e) => setPersonalInfo({ ...personalInfo, bio: e.target.value })}
              className="w-full p-4 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm min-h-[120px] focus:ring-2 focus:ring-accent-500 outline-none"
            />
          </div>
          <div>
            <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1.5">Extended Bio (About Page)</label>
            <textarea 
              value={personalInfo.bioExtended} 
              onChange={(e) => setPersonalInfo({ ...personalInfo, bioExtended: e.target.value })}
              className="w-full p-4 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm min-h-[150px] focus:ring-2 focus:ring-accent-500 outline-none"
            />
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
