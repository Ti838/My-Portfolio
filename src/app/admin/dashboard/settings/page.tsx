// REFINED
"use client";

import { Settings } from "lucide-react";

export default function AdminSettingsPage() {
  return (
    <div className="max-w-5xl space-y-6">
      <div>
        <h1 className="display-md mb-1">Site Settings</h1>
        <p className="body text-sm">Configure global site settings</p>
      </div>

      <div className="card p-12 flex flex-col items-center justify-center text-center space-y-4">
        <div className="w-16 h-16 rounded-2xl bg-[var(--accent-dim)] flex items-center justify-center">
          <Settings size={28} className="text-[var(--accent)]" />
        </div>
        <h3 className="heading text-base">Coming Soon</h3>
        <p className="body text-sm max-w-md">
          Site-wide settings including SEO metadata, social links management, 
          theme customization, and deployment configuration will be available soon.
        </p>
      </div>
    </div>
  );
}
