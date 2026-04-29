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

  return (
    <div className="fixed top-6 left-1/2 -translate-x-1/2 z-[60] animate-in fade-in slide-in-from-top-4 duration-700 pointer-events-none">
      <div className="glass-card py-2 px-4 rounded-full border border-accent-500/30 flex items-center gap-3 shadow-2xl pointer-events-auto bg-accent-500/10 backdrop-blur-xl">
        <div className="relative flex items-center justify-center w-5 h-5">
          <span className="absolute inset-0 rounded-full bg-accent-500/20 animate-ping"></span>
          <FiBell size={12} className="text-accent-500" />
        </div>
        <p className="text-[10px] font-black uppercase tracking-[0.15em] text-slate-700 dark:text-slate-200 whitespace-nowrap">
          {announcement.text}
        </p>
        {announcement.link && (
          <a 
            href={announcement.link} 
            target="_blank" 
            rel="noopener noreferrer"
            className="w-6 h-6 rounded-full bg-accent-500 text-white flex items-center justify-center hover:scale-110 transition-transform shadow-glow"
          >
            <FiExternalLink size={10} />
          </a>
        )}
        <div className="h-4 w-[1px] bg-white/20 mx-1" />
        <button 
          onClick={() => setIsVisible(false)}
          className="text-slate-400 hover:text-accent-500 transition-colors"
        >
          <FiX size={14} />
        </button>
      </div>
    </div>
  );
}
