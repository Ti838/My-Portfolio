"use client";

import React, { useState } from "react";
import { updateAchievement, createAchievement, deleteAchievement, uploadAdminAsset } from "@/lib/admin-actions";
import { FiSave, FiX, FiLoader, FiPlus, FiTrash2, FiUpload } from "react-icons/fi";
import { toast } from "react-hot-toast";

export default function AchievementsEditorModal({ initialAchievements, onClose }: { initialAchievements: any[], onClose: () => void }) {
  const [achievements, setAchievements] = useState(initialAchievements);
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

  const saveAchievement = async (ach: any) => {
    setLoading(true);
    try {
      await updateAchievement(ach.id, ach);
      toast.success("Certificate updated!");
    } catch (err) {
      toast.error("Failed to update certificate");
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async () => {
    setLoading(true);
    try {
      const newAch = { 
        title: "New Certificate", 
        description: "Description of the certificate...", 
        imageUrl: "", 
        category: "academic", 
        date: "2025", 
        issuer: "Institution",
        sort_order: 99
      };
      await createAchievement(newAch);
      toast.success("Certificate added! Refreshing...");
      window.location.reload();
    } catch (err) {
      toast.error("Failed to create context");
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this certificate?")) return;
    setLoading(true);
    try {
      await deleteAchievement(id);
      toast.success("Certificate deleted! Refreshing...");
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
            <h2 className="text-lg font-bold">Edit Certificates / Achievements</h2>
            <button onClick={handleCreate} disabled={loading} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-accent-500/10 text-accent-500 text-xs font-bold hover:bg-accent-500 hover:text-white transition-all">
              <FiPlus /> Add New
            </button>
          </div>
          <button onClick={onClose} className="p-2 text-slate-400 hover:text-slate-900 dark:hover:text-white rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 transition">
            <FiX size={20} />
          </button>
        </div>

        <div className="p-6 space-y-6 overflow-y-auto flex-1 bg-slate-50 dark:bg-slate-900/50">
          {achievements.map((ach) => (
            <div key={ach.id} className="p-5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4">
              <div className="flex items-center justify-between">
                <Input label="Title" value={ach.title} onChange={(v) => {
                  const next = [...achievements];
                  next.find(a => a.id === ach.id)!.title = v;
                  setAchievements(next);
                }} />
                <div className="flex gap-2 ml-4">
                  <button onClick={() => saveAchievement(ach)} className="p-2.5 rounded-xl hover:bg-accent-500 hover:text-white bg-slate-100 dark:bg-slate-800 text-slate-500 transition-colors">
                    <FiSave size={16} />
                  </button>
                  <button onClick={() => handleDelete(ach.id)} className="p-2.5 rounded-xl hover:bg-red-500 hover:text-white bg-slate-100 dark:bg-slate-800 text-red-500 transition-colors">
                    <FiTrash2 size={16} />
                  </button>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 <div>
                    <label className="text-[10px] uppercase font-bold text-slate-400 mb-1.5 block">Description</label>
                    <textarea 
                      value={ach.description} 
                      onChange={(e) => {
                        const next = [...achievements];
                        next.find(a => a.id === ach.id)!.description = e.target.value;
                        setAchievements(next);
                      }}
                      className="w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm min-h-[80px] focus:ring-2 focus:ring-accent-500 outline-none"
                    />
                 </div>
                 <div className="space-y-4">
                    <div className="space-y-1.5 overflow-hidden">
                      <label className="text-[10px] uppercase font-bold text-slate-400 mb-1.5 block">Certificate Image</label>
                      <div className="flex gap-2">
                        <Input label="" value={ach.imageUrl || ""} onChange={(v) => {
                          const next = [...achievements];
                          next.find(a => a.id === ach.id)!.imageUrl = v;
                          setAchievements(next);
                        }} />
                        <label className="shrink-0 flex items-center justify-center p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-500 hover:bg-accent-500 hover:text-white transition-all cursor-pointer">
                          <FiUpload size={16} />
                          <input 
                            type="file" 
                            accept="image/*" 
                            className="hidden" 
                            onChange={async (e) => {
                              const file = e.target.files?.[0];
                              if (!file) return;
                              setLoading(true);
                              try {
                                const url = await uploadImage(file, "achievements");
                                const next = [...achievements];
                                next.find(a => a.id === ach.id)!.imageUrl = url;
                                setAchievements(next);
                                await saveAchievement({ ...ach, imageUrl: url });
                              } catch (err: any) {
                                toast.error(err?.message || "Upload failed");
                              } finally {
                                setLoading(false);
                                e.currentTarget.value = "";
                              }
                            }}
                          />
                        </label>
                      </div>
                    </div>
                    <Input label="Issuer" value={ach.issuer || ""} onChange={(v) => {
                      const next = [...achievements];
                      next.find(a => a.id === ach.id)!.issuer = v;
                      setAchievements(next);
                    }} />
                    <Input label="Date (e.g. November 2024)" value={ach.date || ""} onChange={(v) => {
                      const next = [...achievements];
                      next.find(a => a.id === ach.id)!.date = v;
                      setAchievements(next);
                    }} />
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
