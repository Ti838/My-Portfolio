// REFINED
"use client";

import { useState, useEffect, useRef } from "react";
import { Settings, Save, RefreshCw, Image as ImageIcon, Check, Loader2 } from "lucide-react";
import { updateSiteSetting, getSiteSettings } from "@/lib/admin-actions";
import { uploadImage } from "@/lib/upload";
import toast from "react-hot-toast";

type SettingEntry = {
  key: string;
  value: string;
  type: string;
  label: string;
  description: string;
};

function SettingField({
  entry,
  onChange,
}: {
  entry: SettingEntry;
  onChange: (key: string, val: string) => void;
}) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const url = await uploadImage(file, "settings");
      onChange(entry.key, url);
      toast.success("Image uploaded!");
    } catch (err: any) {
      toast.error(err.message || "Upload failed");
    } finally {
      setUploading(false);
    }
  };

  switch (entry.type) {
    case "textarea":
      return (
        <textarea
          className="admin-input resize-none text-sm"
          rows={3}
          value={entry.value || ""}
          onChange={(e) => onChange(entry.key, e.target.value)}
        />
      );

    case "boolean":
      return (
        <div className="flex items-center gap-3">
          <button
            onClick={() => onChange(entry.key, entry.value === "true" ? "false" : "true")}
            className={`relative w-12 h-6 rounded-full transition-all duration-300 ${
              entry.value === "true" ? "bg-[var(--accent)]" : "bg-[var(--border-highlight)]"
            }`}
          >
            <span
              className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-white shadow transition-all duration-300 ${
                entry.value === "true" ? "translate-x-6" : ""
              }`}
            />
          </button>
          <span className="text-sm text-[var(--text-secondary)]">
            {entry.value === "true" ? "Enabled" : "Disabled"}
          </span>
        </div>
      );

    case "color":
      return (
        <div className="flex items-center gap-3">
          <input
            type="color"
            value={entry.value || "#6366f1"}
            onChange={(e) => onChange(entry.key, e.target.value)}
            className="w-10 h-10 rounded-lg border border-[var(--border)] cursor-pointer bg-transparent"
          />
          <input
            type="text"
            value={entry.value || ""}
            onChange={(e) => onChange(entry.key, e.target.value)}
            className="admin-input text-sm flex-1"
            placeholder="#6366f1"
          />
        </div>
      );

    case "image_url":
      return (
        <div className="space-y-3">
          <div className="flex gap-2">
            <input
              type="text"
              value={entry.value || ""}
              onChange={(e) => onChange(entry.key, e.target.value)}
              className="admin-input text-sm flex-1"
              placeholder="https://... or /path/to/image"
            />
            <button
              onClick={() => fileRef.current?.click()}
              disabled={uploading}
              className="btn-ghost text-xs px-3 py-2 flex items-center gap-1.5"
            >
              {uploading ? <Loader2 size={14} className="animate-spin" /> : <ImageIcon size={14} />}
              Upload
            </button>
          </div>
          <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleUpload} />
          {entry.value && (
            <div className="relative w-20 h-20 rounded-xl overflow-hidden border border-[var(--border)]">
              <img src={entry.value} alt="preview" className="w-full h-full object-cover" />
            </div>
          )}
        </div>
      );

    default:
      return (
        <input
          type="text"
          value={entry.value || ""}
          onChange={(e) => onChange(entry.key, e.target.value)}
          className="admin-input text-sm"
        />
      );
  }
}

const GROUP_LABELS: Record<string, string> = {
  hero: "🦸 Hero Section",
  site: "🌐 Site Meta",
  announcement: "📢 Announcement",
  about: "👤 About Section",
  skills: "⚡ Skills Section",
  projects: "🛠 Projects Section",
  experience: "💼 Experience Section",
  contact: "📬 Contact Section",
  accent: "🎨 Theme / Colors",
  favicon: "🔖 Favicon",
};

function groupKey(key: string): string {
  const prefix = key.split("_")[0];
  return GROUP_LABELS[prefix] ?? "🔧 General";
}

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<SettingEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState<Record<string, boolean>>({});
  const [saved, setSaved] = useState<Record<string, boolean>>({});
  const [changed, setChanged] = useState<Record<string, string>>({});

  useEffect(() => {
    const load = async () => {
      try {
        const data = await getSiteSettings();
        setSettings(data);
      } catch {
        toast.error("Failed to load settings");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const handleChange = (key: string, val: string) => {
    setSettings((prev) => prev.map((s) => (s.key === key ? { ...s, value: val } : s)));
    setChanged((prev) => ({ ...prev, [key]: val }));
    setSaved((prev) => ({ ...prev, [key]: false }));
  };

  const handleSave = async (key: string) => {
    const entry = settings.find((s) => s.key === key);
    if (!entry) return;
    setSaving((prev) => ({ ...prev, [key]: true }));
    try {
      await updateSiteSetting(key, entry.value);
      setSaved((prev) => ({ ...prev, [key]: true }));
      toast.success(`"${entry.label}" saved!`);
      setTimeout(() => setSaved((prev) => ({ ...prev, [key]: false })), 2000);
    } catch (err: any) {
      toast.error(err.message || "Save failed");
    } finally {
      setSaving((prev) => ({ ...prev, [key]: false }));
    }
  };

  const handleSaveAll = async () => {
    const changedKeys = Object.keys(changed);
    if (changedKeys.length === 0) return toast("No changes to save.");
    await Promise.all(changedKeys.map((k) => handleSave(k)));
    setChanged({});
  };

  // Group settings
  const groups: Record<string, SettingEntry[]> = {};
  for (const s of settings) {
    const group = groupKey(s.key);
    if (!groups[group]) groups[group] = [];
    groups[group].push(s);
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64 gap-3 text-[var(--text-tertiary)]">
        <Loader2 size={20} className="animate-spin" /> Loading settings…
      </div>
    );
  }

  return (
    <div className="max-w-4xl space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="display-md mb-1">Site Settings</h1>
          <p className="body text-sm">Configure all global site content and appearance.</p>
        </div>
        <div className="flex items-center gap-3">
          {Object.keys(changed).length > 0 && (
            <span className="font-mono text-[10px] text-[var(--warning)] uppercase tracking-widest animate-pulse">
              {Object.keys(changed).length} unsaved
            </span>
          )}
          <button
            onClick={handleSaveAll}
            disabled={Object.keys(changed).length === 0}
            className="btn-primary text-sm py-2.5 px-5 disabled:opacity-40"
          >
            <Save size={14} /> Save All Changes
          </button>
        </div>
      </div>

      {Object.entries(groups).map(([groupLabel, entries]) => (
        <div key={groupLabel} className="card p-6 space-y-6">
          <h2 className="heading text-sm text-[var(--accent)]">{groupLabel}</h2>
          <div className="divide-y divide-[var(--border)]/30 space-y-0">
            {entries.map((entry) => (
              <div key={entry.key} className="py-5 first:pt-0 last:pb-0">
                <div className="flex items-start justify-between gap-4 mb-2">
                  <div>
                    <label className="label text-[10px] block mb-0.5">{entry.label}</label>
                    {entry.description && (
                      <p className="text-[11px] text-[var(--text-tertiary)]">{entry.description}</p>
                    )}
                  </div>
                  <button
                    onClick={() => handleSave(entry.key)}
                    disabled={saving[entry.key] || !changed[entry.key]}
                    className={`flex-shrink-0 inline-flex items-center gap-1.5 text-[11px] px-3 py-1.5 rounded-full border transition-all ${
                      saved[entry.key]
                        ? "border-[var(--success)] text-[var(--success)] bg-[var(--success)]/10"
                        : changed[entry.key]
                        ? "border-[var(--accent)] text-[var(--accent)] bg-[var(--accent-dim)] hover:bg-[var(--accent)] hover:text-white"
                        : "border-[var(--border)] text-[var(--text-tertiary)] opacity-40 cursor-not-allowed"
                    }`}
                  >
                    {saving[entry.key] ? (
                      <Loader2 size={12} className="animate-spin" />
                    ) : saved[entry.key] ? (
                      <Check size={12} />
                    ) : (
                      <Save size={12} />
                    )}
                    {saved[entry.key] ? "Saved!" : "Save"}
                  </button>
                </div>
                <SettingField entry={entry} onChange={handleChange} />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
