"use client";

import React, { useState } from "react";
import { updateSocialLink, createSocialLink, deleteSocialLink } from "@/lib/admin-actions";
import {
  FiSave, FiX, FiLoader, FiLink, FiGithub, FiLinkedin, FiTwitter,
  FiMessageCircle, FiGlobe, FiCode, FiPlus, FiTrash2, FiInstagram, FiYoutube, FiMail
} from "react-icons/fi";
import { toast } from "react-hot-toast";

const iconOptions = [
  { value: "FiGithub", label: "GitHub", icon: FiGithub },
  { value: "FiLinkedin", label: "LinkedIn", icon: FiLinkedin },
  { value: "FiTwitter", label: "Twitter / X", icon: FiTwitter },
  { value: "FiInstagram", label: "Instagram", icon: FiInstagram },
  { value: "FiYoutube", label: "YouTube", icon: FiYoutube },
  { value: "FiMessageCircle", label: "WhatsApp", icon: FiMessageCircle },
  { value: "FiMail", label: "Email", icon: FiMail },
  { value: "FiGlobe", label: "Website", icon: FiGlobe },
  { value: "FiCode", label: "Codeforces", icon: FiCode },
  { value: "FiLink", label: "Generic Link", icon: FiLink },
];

const icons: Record<string, React.ElementType> = {
  FiGithub, FiLinkedin, FiTwitter, FiInstagram, FiYoutube,
  FiMessageCircle, FiMail, FiGlobe, FiCode, FiLink,
};

const emptyForm = { label: "", url: "", icon: "FiLink" };

export default function SocialLinksEditorModal({
  socialLinks,
  onClose,
}: {
  socialLinks: any[];
  onClose: () => void;
}) {
  const [loading, setLoading] = useState(false);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [mode, setMode] = useState<"edit" | "add">("edit");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<any>(null);
  const [newForm, setNewForm] = useState({ ...emptyForm });

  const startEdit = (link: any) => {
    setMode("edit");
    setEditingId(link.id);
    setFormData({ ...link });
  };

  const startAdd = () => {
    setMode("add");
    setEditingId(null);
    setFormData(null);
    setNewForm({ ...emptyForm });
  };

  const saveEdit = async () => {
    if (!formData?.url) return toast.error("URL is required");
    setLoading(true);
    try {
      await updateSocialLink(editingId!, formData);
      toast.success("Link updated!");
      window.location.reload();
    } catch (err: any) {
      toast.error(err.message || "Failed to save");
    } finally {
      setLoading(false);
    }
  };

  const saveNew = async () => {
    if (!newForm.url || !newForm.label) return toast.error("Label and URL are required");
    setLoading(true);
    try {
      await createSocialLink(newForm);
      toast.success("Link added!");
      window.location.reload();
    } catch (err: any) {
      toast.error(err.message || "Failed to add");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this social link?")) return;
    setDeleting(id);
    try {
      await deleteSocialLink(id);
      toast.success("Link deleted!");
      window.location.reload();
    } catch (err: any) {
      toast.error(err.message || "Failed to delete");
    } finally {
      setDeleting(null);
    }
  };

  const activeForm = mode === "add" ? newForm : formData;
  const setActive = mode === "add"
    ? (v: any) => setNewForm(v)
    : (v: any) => setFormData(v);

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
      <div className="bg-[var(--bg-elevated)] w-full max-w-2xl rounded-3xl shadow-2xl border border-[var(--border)] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-[var(--border)]">
          <h2 className="heading flex items-center gap-2">
            <FiLink className="text-[var(--accent)]" /> Social Links
          </h2>
          <div className="flex items-center gap-2">
            <button
              onClick={startAdd}
              className="btn-primary text-xs py-2 px-3"
            >
              <FiPlus size={14} /> Add New
            </button>
            <button
              onClick={onClose}
              className="p-2 text-[var(--text-tertiary)] hover:text-[var(--text-primary)] rounded-xl hover:bg-white/5 transition"
            >
              <FiX size={20} />
            </button>
          </div>
        </div>

        <div className="flex flex-col md:flex-row max-h-[70vh]">
          {/* List */}
          <div className="w-full md:w-2/5 border-r border-[var(--border)] overflow-y-auto p-4 space-y-2">
            {/* Add new entry */}
            <button
              onClick={startAdd}
              className={`w-full text-left p-3 rounded-2xl border transition-all flex items-center gap-3 ${
                mode === "add"
                  ? "border-[var(--accent)] bg-[var(--accent-dim)]"
                  : "border-dashed border-[var(--border-highlight)] hover:border-[var(--accent)]/50 text-[var(--text-tertiary)]"
              }`}
            >
              <div className="w-8 h-8 rounded-xl bg-[var(--accent-dim)] flex items-center justify-center">
                <FiPlus size={16} className="text-[var(--accent)]" />
              </div>
              <span className="text-sm font-medium">Add New Link</span>
            </button>

            {socialLinks.map((link) => {
              const Icon = icons[link.icon] || FiLink;
              return (
                <div
                  key={link.id}
                  className={`w-full p-3 rounded-2xl border transition-all flex items-center gap-3 group ${
                    editingId === link.id && mode === "edit"
                      ? "border-[var(--accent)] bg-[var(--accent-dim)]"
                      : "border-[var(--border)] hover:border-[var(--border-highlight)] bg-[var(--bg-secondary)]"
                  }`}
                >
                  <button
                    className="flex items-center gap-3 flex-1 min-w-0"
                    onClick={() => startEdit(link)}
                  >
                    <div
                      className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 ${
                        editingId === link.id && mode === "edit"
                          ? "bg-[var(--accent)] text-white"
                          : "bg-[var(--bg-elevated)] text-[var(--text-tertiary)]"
                      }`}
                    >
                      <Icon size={16} />
                    </div>
                    <div className="min-w-0">
                      <div className="text-sm font-medium text-[var(--text-primary)] truncate">{link.label}</div>
                      <div className="text-[10px] text-[var(--text-tertiary)] truncate">{link.url}</div>
                    </div>
                  </button>
                  <button
                    onClick={() => handleDelete(link.id)}
                    disabled={deleting === link.id}
                    className="flex-shrink-0 p-1.5 rounded-lg text-[var(--text-tertiary)] hover:text-[var(--error)] hover:bg-[var(--error)]/10 opacity-0 group-hover:opacity-100 transition-all"
                  >
                    {deleting === link.id ? <FiLoader size={14} className="animate-spin" /> : <FiTrash2 size={14} />}
                  </button>
                </div>
              );
            })}
          </div>

          {/* Form */}
          <div className="flex-1 p-6 overflow-y-auto">
            {activeForm !== null ? (
              <div className="space-y-5">
                <h3 className="heading text-sm text-[var(--accent)]">
                  {mode === "add" ? "Add New Platform" : "Edit Platform"}
                </h3>

                <div>
                  <label className="label text-[10px] mb-1.5 block">Label</label>
                  <input
                    type="text"
                    value={activeForm.label}
                    onChange={(e) => setActive({ ...activeForm, label: e.target.value })}
                    className="admin-input"
                    placeholder="GitHub, LinkedIn, etc."
                  />
                </div>

                <div>
                  <label className="label text-[10px] mb-1.5 block">URL</label>
                  <input
                    type="text"
                    value={activeForm.url}
                    onChange={(e) => setActive({ ...activeForm, url: e.target.value })}
                    className="admin-input"
                    placeholder="https://..."
                  />
                </div>

                <div>
                  <label className="label text-[10px] mb-2 block">Icon</label>
                  <div className="grid grid-cols-5 gap-2">
                    {iconOptions.map((opt) => {
                      const Icon = opt.icon;
                      return (
                        <button
                          key={opt.value}
                          onClick={() => setActive({ ...activeForm, icon: opt.value })}
                          title={opt.label}
                          className={`p-3 rounded-xl border flex items-center justify-center transition-all ${
                            activeForm.icon === opt.value
                              ? "bg-[var(--accent)] border-[var(--accent)] text-white shadow-lg"
                              : "border-[var(--border)] text-[var(--text-tertiary)] hover:border-[var(--border-highlight)]"
                          }`}
                        >
                          <Icon size={18} />
                        </button>
                      );
                    })}
                  </div>
                </div>

                <button
                  onClick={mode === "add" ? saveNew : saveEdit}
                  disabled={loading}
                  className="btn-primary w-full"
                >
                  {loading ? <FiLoader className="animate-spin" /> : <FiSave />}
                  {mode === "add" ? "Add Link" : "Save Changes"}
                </button>
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-[var(--text-tertiary)] space-y-3 text-center">
                <FiLink size={40} className="opacity-10 mb-2" />
                <p className="text-sm max-w-[200px]">Select a link to edit or click "Add New" to create one.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
