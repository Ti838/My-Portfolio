// REFINED
"use client";

import { useState } from "react";
import { Save, Upload } from "lucide-react";
import { updatePersonalInfo } from "@/lib/admin-actions";
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
    stats: initialData?.stats || {},
  });
  const [saving, setSaving] = useState(false);

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

  const updateField = (key: string, value: any) => {
    setForm(prev => ({ ...prev, [key]: value }));
  };

  const updateStat = (key: string, value: string) => {
    setForm(prev => ({ ...prev, stats: { ...prev.stats, [key]: value } }));
  };

  return (
    <div className="max-w-3xl space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="display-md mb-1">Profile & Hero</h1>
          <p className="body text-sm">Edit your personal information and hero section.</p>
        </div>
        <button onClick={handleSave} disabled={saving} className="btn-primary text-sm py-2.5 px-5 disabled:opacity-50">
          {saving ? "Saving..." : <><Save size={14} /> Save Changes</>}
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
            <div>
              <label className="label text-[10px] mb-1.5 block">Email</label>
              <input className="admin-input" type="email" value={form.email} onChange={e => updateField("email", e.target.value)} />
            </div>
            <div>
              <label className="label text-[10px] mb-1.5 block">Phone</label>
              <input className="admin-input" value={form.phone} onChange={e => updateField("phone", e.target.value)} />
            </div>
            <div>
              <label className="label text-[10px] mb-1.5 block">Location</label>
              <input className="admin-input" value={form.location} onChange={e => updateField("location", e.target.value)} />
            </div>
          </div>
        </div>

        {/* Images */}
        <div className="card p-6 space-y-4">
          <h2 className="heading text-sm text-[var(--accent)]">Images</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="label text-[10px] mb-1.5 block">Profile Image URL</label>
              <input className="admin-input" value={form.profileImage} onChange={e => updateField("profileImage", e.target.value)} placeholder="/profile.jpg or https://..." />
              {form.profileImage && (
                <div className="mt-2 w-20 h-20 rounded-xl overflow-hidden border border-[var(--border)]">
                  <img src={form.profileImage} alt="Profile" className="w-full h-full object-cover" />
                </div>
              )}
            </div>
            <div>
              <label className="label text-[10px] mb-1.5 block">Logo Image URL</label>
              <input className="admin-input" value={form.logoImage} onChange={e => updateField("logoImage", e.target.value)} placeholder="/images/logo.png" />
            </div>
          </div>
        </div>

        {/* Academic */}
        <div className="card p-6 space-y-4">
          <h2 className="heading text-sm text-[var(--accent)]">Academic</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="label text-[10px] mb-1.5 block">University</label>
              <input className="admin-input" value={form.university} onChange={e => updateField("university", e.target.value)} />
            </div>
            <div>
              <label className="label text-[10px] mb-1.5 block">Student ID</label>
              <input className="admin-input" value={form.studentId} onChange={e => updateField("studentId", e.target.value)} />
            </div>
            <div>
              <label className="label text-[10px] mb-1.5 block">Batch</label>
              <input className="admin-input" value={form.batch} onChange={e => updateField("batch", e.target.value)} />
            </div>
          </div>
        </div>

        {/* Stats (for hero) */}
        <div className="card p-6 space-y-4">
          <h2 className="heading text-sm text-[var(--accent)]">Hero Stats</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="label text-[10px] mb-1.5 block">Projects Count</label>
              <input className="admin-input" value={form.stats?.projects || ""} onChange={e => updateStat("projects", e.target.value)} placeholder="14+" />
            </div>
            <div>
              <label className="label text-[10px] mb-1.5 block">Certificates</label>
              <input className="admin-input" value={form.stats?.certificates || ""} onChange={e => updateStat("certificates", e.target.value)} placeholder="4+" />
            </div>
            <div>
              <label className="label text-[10px] mb-1.5 block">ICPC Rank</label>
              <input className="admin-input" value={form.stats?.icpc_rank || ""} onChange={e => updateStat("icpc_rank", e.target.value)} placeholder="Honorable Mention" />
            </div>
            <div>
              <label className="label text-[10px] mb-1.5 block">Languages</label>
              <input className="admin-input" value={form.stats?.languages || ""} onChange={e => updateStat("languages", e.target.value)} placeholder="Java/C++/PHP" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
