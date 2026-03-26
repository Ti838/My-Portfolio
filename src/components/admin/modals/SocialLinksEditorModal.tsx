"use client";

import React, { useState } from "react";
import { updateSocialLink } from "@/lib/admin-actions";
import { FiSave, FiX, FiLoader, FiLink, FiGithub, FiLinkedin, FiTwitter, FiMessageCircle, FiGlobe, FiCode } from "react-icons/fi";
import { toast } from "react-hot-toast";

const iconOptions = [
  { value: "FiGithub", label: "GitHub", icon: FiGithub },
  { value: "FiLinkedin", label: "LinkedIn", icon: FiLinkedin },
  { value: "FiTwitter", label: "Twitter", icon: FiTwitter },
  { value: "FiMessageCircle", label: "WhatsApp/Message", icon: FiMessageCircle },
  { value: "FiGlobe", label: "Website", icon: FiGlobe },
  { value: "FiCode", label: "Codeforces/Coding", icon: FiCode },
  { value: "FiLink", label: "Generic Link", icon: FiLink },
];

const icons: Record<string, React.ElementType> = {
  FiGithub, FiLinkedin, FiTwitter, FiMessageCircle, FiGlobe, FiCode, FiLink
};

export default function SocialLinksEditorModal({ socialLinks, onClose }: { socialLinks: any[], onClose: () => void }) {
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<any>(null);

  const startEdit = (link: any) => {
    setEditingId(link.id);
    setFormData({ ...link });
  };

  const save = async () => {
    if (!formData.url) return toast.error("URL is required");
    setLoading(true);
    try {
      await updateSocialLink(editingId!, formData);
      toast.success("Social link updated!");
      window.location.reload();
    } catch (err: any) {
      toast.error(err.message || "Failed to save");
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 animate-in fade-in">
      <div className="bg-white dark:bg-slate-900 w-full max-w-2xl rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
        <div className="flex items-center justify-between p-5 border-b border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50">
          <h2 className="text-lg font-bold flex items-center gap-2">
            <FiLink className="text-accent-500" /> Manage Connect Links
          </h2>
          <button onClick={onClose} className="p-2 text-slate-400 hover:text-slate-900 dark:hover:text-white rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 transition">
            <FiX size={20} />
          </button>
        </div>

        <div className="flex flex-col md:flex-row max-h-[70vh]">
          {/* List */}
          <div className="w-full md:w-1/2 border-r border-slate-100 dark:border-slate-800 overflow-y-auto p-4 space-y-2">
            {socialLinks.map((link) => {
              const Icon = icons[link.icon] || FiLink;
              return (
                <button 
                  key={link.id} 
                  onClick={() => startEdit(link)}
                  className={`w-full text-left p-4 rounded-xl border transition-all flex items-center gap-4 ${editingId === link.id ? "bg-accent-50 dark:bg-accent-900/20 border-accent-500 ring-1 ring-accent-500" : "bg-white dark:bg-slate-800 border-slate-100 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600"}`}
                >
                  <div className={`p-2 rounded-lg ${editingId === link.id ? "bg-accent-500 text-white" : "bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400"}`}>
                    <Icon size={18} />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-slate-900 dark:text-white">{link.label}</div>
                    <div className="text-[10px] text-slate-500 truncate max-w-[150px]">{link.url}</div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Form */}
          <div className="flex-1 p-6 bg-slate-50/30 dark:bg-slate-900/20 overflow-y-auto">
            {formData ? (
              <div className="space-y-5">
                <div>
                  <label className="text-[10px] uppercase font-bold text-slate-400 mb-1.5 block">Label</label>
                  <input 
                    type="text" 
                    value={formData.label} 
                    onChange={(e) => setFormData({...formData, label: e.target.value})}
                    className="w-full px-4 py-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm focus:ring-2 focus:ring-accent-500 outline-none"
                  />
                </div>

                <div>
                  <label className="text-[10px] uppercase font-bold text-slate-400 mb-1.5 block">URL</label>
                  <input 
                    type="text" 
                    value={formData.url} 
                    onChange={(e) => setFormData({...formData, url: e.target.value})}
                    className="w-full px-4 py-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm focus:ring-2 focus:ring-accent-500 outline-none"
                    placeholder="https://..."
                  />
                </div>

                <div>
                  <label className="text-[10px] uppercase font-bold text-slate-400 mb-1.5 block">Icon</label>
                  <div className="grid grid-cols-4 gap-2">
                    {iconOptions.map(opt => {
                      const Icon = opt.icon;
                      return (
                        <button 
                          key={opt.value}
                          onClick={() => setFormData({...formData, icon: opt.value})}
                          className={`p-3 rounded-xl border flex items-center justify-center transition-all ${formData.icon === opt.value ? "bg-accent-500 border-accent-500 text-white shadow-lg shadow-accent-500/20" : "bg-white dark:bg-slate-800 border-slate-100 dark:border-slate-700 text-slate-400 hover:border-slate-300 dark:hover:border-slate-600"}`}
                          title={opt.label}
                        >
                          <Icon size={18} />
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="pt-4">
                  <button onClick={save} disabled={loading} className="btn-primary w-full h-12">
                    {loading ? <FiLoader className="animate-spin" /> : <><FiSave /> Save Changes</>}
                  </button>
                </div>
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-slate-400 space-y-3 text-center">
                <FiLink size={40} className="opacity-10 mb-2" />
                <p className="text-sm font-medium px-6">Select a platform to update your profile link.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
