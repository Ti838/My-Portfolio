// REFINED
"use client";

import { useState, useRef } from "react";
import { Save, Upload, Loader2, ImageIcon, User, FileText } from "lucide-react";
import { updatePersonalInfo } from "@/lib/admin-actions";
import { uploadImage } from "@/lib/upload";
import Image from "next/image";
import toast from "react-hot-toast";

export default function ProfileEditor({ initialData }: { initialData: any }) {
  const [form, setForm] = useState({
    name: initialData?.name || "",
    tagline: initialData?.tagline || "",
    bio: initialData?.bio || "",
    bioExtended: initialData?.bioExtended || initialData?.bio_extended || "",
    email: initialData?.email || "",
    phone: initialData?.phone || "",
    location: initialData?.location || "",
    profileImage: initialData?.profileImage || initialData?.profile_image || "",
    logoImage: initialData?.logoImage || initialData?.logo_image || "",
    university: initialData?.university || "",
    studentId: initialData?.studentId || initialData?.student_id || "",
    batch: initialData?.batch || "",
    resumeUrl: initialData?.resumeUrl || initialData?.resume_url || "",
    stats: initialData?.stats || {},
  });
  const [saving, setSaving] = useState(false);
  const [uploadingProfile, setUploadingProfile] = useState(false);
  const [uploadingLogo, setUploadingLogo] = useState(false);
  const [uploadingResume, setUploadingResume] = useState(false);
  const profileFileRef = useRef<HTMLInputElement>(null);
  const logoFileRef = useRef<HTMLInputElement>(null);
  const resumeFileRef = useRef<HTMLInputElement>(null);

  const handleSave = async () => {
    setSaving(true);
    try {
      await updatePersonalInfo(form);
      toast.success("Profile updated!");
    } catch (err: any) {
      toast.error(err.message || "Failed to save");
    }
    setSaving(false);
  };

  const updateField = (key: string, value: any) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const updateStat = (key: string, value: string) =>
    setForm((prev) => ({ ...prev, stats: { ...prev.stats, [key]: value } }));

  const handleImageUpload = async (
    file: File,
    field: "profileImage" | "logoImage",
    setUploading: (v: boolean) => void
  ) => {
    setUploading(true);
    try {
      const url = await uploadImage(file, "profile");
      updateField(field, url);
      toast.success("Image uploaded!");
    } catch (err: any) {
      toast.error(err.message || "Upload failed");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="max-w-3xl space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="display-md mb-1">Profile & Hero</h1>
          <p className="body text-sm">Edit your personal information and hero section.</p>
        </div>
        <button onClick={handleSave} disabled={saving} className="btn-primary text-sm py-2.5 px-5 disabled:opacity-50">
          {saving ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />}
          {saving ? "Saving…" : "Save Changes"}
        </button>
      </div>

      <div className="space-y-6">
        {/* Basic Info */}
        <div className="card p-6 space-y-4">
          <h2 className="heading text-sm text-[var(--accent)]">Basic Info</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="label text-[10px] mb-1.5 block">Full Name</label>
              <input className="admin-input" value={form.name} onChange={e => updateField("name", e.target.value)} />
            </div>
            <div>
              <label className="label text-[10px] mb-1.5 block">Tagline / Headline</label>
              <input className="admin-input" value={form.tagline} onChange={e => updateField("tagline", e.target.value)} />
            </div>
          </div>
          <div>
            <label className="label text-[10px] mb-1.5 block">Short Bio</label>
            <textarea className="admin-input resize-none" rows={4} value={form.bio} onChange={e => updateField("bio", e.target.value)} />
          </div>
          <div>
            <label className="label text-[10px] mb-1.5 block">Extended Bio</label>
            <textarea className="admin-input resize-none" rows={4} value={form.bioExtended} onChange={e => updateField("bioExtended", e.target.value)} />
          </div>
        </div>

        {/* Contact */}
        <div className="card p-6 space-y-4">
          <h2 className="heading text-sm text-[var(--accent)]">Contact Info</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { key: "email", label: "Email", type: "email" },
              { key: "phone", label: "Phone" },
              { key: "location", label: "Location" },
            ].map(({ key, label, type }) => (
              <div key={key}>
                <label className="label text-[10px] mb-1.5 block">{label}</label>
                <input className="admin-input" type={type || "text"} value={(form as any)[key]} onChange={e => updateField(key, e.target.value)} />
              </div>
            ))}
          </div>
        </div>

        {/* Images */}
        <div className="card p-6 space-y-6">
          <h2 className="heading text-sm text-[var(--accent)]">Images</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              { field: "profileImage" as const, label: "Profile Photo", ref: profileFileRef, uploading: uploadingProfile, setUploading: setUploadingProfile, icon: <User size={28} className="text-[var(--text-tertiary)]" /> },
              { field: "logoImage" as const, label: "Logo / Brand Icon", ref: logoFileRef, uploading: uploadingLogo, setUploading: setUploadingLogo, icon: <ImageIcon size={28} className="text-[var(--text-tertiary)]" /> },
            ].map(({ field, label, ref, uploading, setUploading, icon }) => (
              <div key={field} className="space-y-3">
                <label className="label text-[10px] block">{label}</label>
                <div className="flex items-start gap-4">
                  <div className="relative w-24 h-24 rounded-2xl overflow-hidden border border-[var(--border)] bg-[var(--bg-elevated)] flex-shrink-0">
                    {form[field] ? (
                      <Image src={form[field]} alt={label} fill className="object-cover" sizes="96px" unoptimized />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">{icon}</div>
                    )}
                  </div>
                  <div className="flex-1 space-y-2">
                    <input className="admin-input text-xs" value={form[field]} onChange={e => updateField(field, e.target.value)} placeholder="URL or upload below…" />
                    <button onClick={() => ref.current?.click()} disabled={uploading} className="btn-ghost text-xs py-2 px-3 w-full">
                      {uploading ? <Loader2 size={12} className="animate-spin" /> : <Upload size={12} />}
                      {uploading ? "Uploading…" : "Upload File"}
                    </button>
                    <input ref={ref} type="file" accept="image/*" className="hidden" onChange={e => { const f = e.target.files?.[0]; if (f) handleImageUpload(f, field, setUploading); }} />
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-6 pt-6 border-t border-[var(--border)]">
             <div className="space-y-3 max-w-sm">
                <label className="label text-[10px] block">CV / Resume (PDF)</label>
                <div className="flex items-center gap-4">
                  <div className="flex-1 space-y-2">
                    <input className="admin-input text-xs" value={form.resumeUrl} onChange={e => updateField("resumeUrl", e.target.value)} placeholder="URL or upload PDF…" />
                    <button onClick={() => resumeFileRef.current?.click()} disabled={uploadingResume} className="btn-ghost text-xs py-2 px-3 w-full">
                      {uploadingResume ? <Loader2 size={12} className="animate-spin" /> : <Upload size={12} />}
                      {uploadingResume ? "Uploading…" : "Upload CV/Resume"}
                    </button>
                    <input ref={resumeFileRef} type="file" accept="application/pdf" className="hidden" onChange={e => { const f = e.target.files?.[0]; if (f) handleImageUpload(f, "resumeUrl" as any, setUploadingResume); }} />
                  </div>
                  <div className="w-12 h-12 rounded-lg bg-[var(--bg-elevated)] border border-[var(--border)] flex items-center justify-center flex-shrink-0">
                     <FileText size={20} className="text-[var(--text-tertiary)]" />
                  </div>
                </div>
             </div>
          </div>
        </div>

        {/* Academic */}
        <div className="card p-6 space-y-4">
          <h2 className="heading text-sm text-[var(--accent)]">Academic</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { key: "university", label: "University" },
              { key: "studentId", label: "Student ID" },
              { key: "batch", label: "Batch" },
            ].map(({ key, label }) => (
              <div key={key}>
                <label className="label text-[10px] mb-1.5 block">{label}</label>
                <input className="admin-input" value={(form as any)[key]} onChange={e => updateField(key, e.target.value)} />
              </div>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="card p-6 space-y-4">
          <h2 className="heading text-sm text-[var(--accent)]">Hero Stats</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { key: "projects", label: "Projects", placeholder: "14+" },
              { key: "certificates", label: "Certificates", placeholder: "4+" },
              { key: "icpc_rank", label: "ICPC Rank", placeholder: "Honorable Mention" },
              { key: "languages", label: "Languages", placeholder: "Java/C++/PHP" },
            ].map(({ key, label, placeholder }) => (
              <div key={key}>
                <label className="label text-[10px] mb-1.5 block">{label}</label>
                <input className="admin-input" value={form.stats?.[key] || ""} onChange={e => updateStat(key, e.target.value)} placeholder={placeholder} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
