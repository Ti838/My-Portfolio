// REFINED
"use client";

import { FileText, Plus } from "lucide-react";

export default function AdminBlogPage() {
  return (
    <div className="max-w-5xl space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="display-md mb-1">Blog Posts</h1>
          <p className="body text-sm">Manage your blog content</p>
        </div>
        <button className="btn-primary text-sm py-2.5 px-5 opacity-50 cursor-not-allowed">
          <Plus size={14} /> New Post
        </button>
      </div>

      <div className="card p-12 flex flex-col items-center justify-center text-center space-y-4">
        <div className="w-16 h-16 rounded-2xl bg-[var(--accent-dim)] flex items-center justify-center">
          <FileText size={28} className="text-[var(--accent)]" />
        </div>
        <h3 className="heading text-base">Coming Soon</h3>
        <p className="body text-sm max-w-md">
          Blog management with rich text editing (TipTap), draft/publish workflow, 
          and SEO optimization will be available in the next update.
        </p>
      </div>
    </div>
  );
}
