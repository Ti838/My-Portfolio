"use client";

import { useState } from "react";
import { FiX, FiExternalLink, FiBell, FiEdit3 } from "react-icons/fi";
import { useAdmin } from "../admin/AdminProvider";

interface AnnouncementProps {
  announcement?: {
    text: string;
    link: string;
    active: boolean;
  };
}

export default function AnnouncementBanner({ announcement }: AnnouncementProps) {
  const [isVisible, setIsVisible] = useState(true);
  const { isAdmin } = useAdmin();

  if (!announcement?.active || !announcement?.text || !isVisible) {
    return null;
  }

  const adminOffset = isAdmin ? 40 : 0;
  const navbarHeight = 72; // Adjusted for the restored navbar
  const topPos = adminOffset + navbarHeight;

  return (
    <div id="announcement-banner" style={{ top: `${topPos}px` }} className={`fixed left-0 w-full h-10 bg-accent-500 text-white z-[49] shadow-md flex items-center`}>
      <div className="max-w-6xl mx-auto px-5 w-full flex items-center justify-between text-[10px] sm:text-xs font-bold uppercase tracking-wider">
        <div className="flex-1 flex justify-center items-center gap-2 sm:gap-3">
          <div className="relative flex items-center justify-center w-6 h-6 shrink-0">
            <span className="absolute inset-0 rounded-full bg-white/30 animate-pulse"></span>
            <span className="absolute inset-0 rounded-full border border-white/40 animate-ping" style={{ animationDuration: '3s' }}></span>
            <div className="relative flex items-center justify-center w-5 h-5 bg-white text-accent-600 rounded-full shadow-sm">
              <FiBell size={12} />
            </div>
          </div>
          <span>{announcement.text}</span>
          {isAdmin && (
            <button 
              onClick={() => window.dispatchEvent(new CustomEvent("open-admin-editor", { detail: "announcement" }))}
              className="p-1 hover:bg-white/20 rounded-md transition-colors text-white/70 hover:text-white"
              title="Edit Announcement"
            >
              <FiEdit3 size={14} />
            </button>
          )}
          {announcement.link && (
            <a 
              href={announcement.link} 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 underline underline-offset-2 hover:text-white/80 transition-colors"
            >
              Learn More <FiExternalLink size={12} />
            </a>
          )}
        </div>
        <button 
          onClick={() => setIsVisible(false)}
          className="p-1 hover:bg-white/20 rounded-md transition-colors shrink-0 ml-4"
          aria-label="Close announcement"
        >
          <FiX size={16} />
        </button>
      </div>
    </div>
  );
}
