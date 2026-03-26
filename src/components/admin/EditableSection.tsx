"use client";

import React, { useState } from "react";
import { useAdmin } from "./AdminProvider";
import { FiEdit2 } from "react-icons/fi";

interface EditableSectionProps {
  children: React.ReactNode;
  eventKey: string;
  label: string;
}

export default function EditableSection({ children, eventKey, label }: EditableSectionProps) {
  const { isAdmin } = useAdmin();
  const [isHovered, setIsHovered] = useState(false);

  const handleEdit = () => {
    document.dispatchEvent(new CustomEvent("open-admin-editor", { detail: eventKey }));
  };

  if (!isAdmin) {
    return <>{children}</>;
  }

  return (
    <div
      className={`relative transition-all duration-500 cursor-crosshair group/editable ${
        isHovered ? "ring-4 ring-accent-500/50 dark:ring-accent-500/30 ring-inset z-10" : "ring-0"
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={(e) => {
        // Only trigger edit if clicking the section itself or a non-interactive child
        const target = e.target as HTMLElement;
        if (!target.closest('button, a, input, textarea')) {
          handleEdit();
        }
      }}
    >
      {/* Visual Overlay for Admin */}
      <div className={`absolute inset-0 bg-accent-500/5 dark:bg-accent-500/5 pointer-events-none transition-opacity duration-300 ${isHovered ? "opacity-100" : "opacity-0"}`} />
      
      {isHovered && (
        <div className="absolute z-[60] top-0 left-1/2 -translate-x-1/2 -translate-y-full pb-2 animate-fade-in">
          <div className="bg-accent-500 text-white shadow-2xl px-4 py-2 rounded-t-xl text-[10px] font-black uppercase tracking-[0.2em] flex items-center gap-2 whitespace-nowrap">
            <FiEdit2 size={12} className="animate-pulse" />
            Click to Edit {label}
          </div>
        </div>
      )}

      {isHovered && (
        <button
          onClick={(e) => { e.stopPropagation(); handleEdit(); }}
          className="absolute z-[60] bottom-4 right-4 bg-white dark:bg-slate-900 border-2 border-accent-500 text-accent-500 hover:bg-accent-500 hover:text-white shadow-xl px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-all transform hover:scale-110 active:scale-95"
        >
          <FiEdit2 size={14} /> Edit {label}
        </button>
      )}
      
      <div className={`transition-all duration-500 ${isHovered ? "scale-[0.99] origin-center" : ""}`}>
        {children}
      </div>
    </div>
  );
}
