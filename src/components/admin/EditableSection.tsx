// REFINED
"use client";

import React, { useState } from "react";
import { useAdmin } from "./AdminProvider";
import { Pencil } from "lucide-react";

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
        isHovered ? "ring-2 ring-[var(--accent)]/40 ring-inset z-10" : "ring-0"
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={(e) => {
        const target = e.target as HTMLElement;
        if (!target.closest('button, a, input, textarea')) {
          handleEdit();
        }
      }}
    >
      {/* Amber overlay on hover */}
      <div className={`absolute inset-0 bg-[var(--accent)]/5 pointer-events-none transition-opacity duration-300 ${isHovered ? "opacity-100" : "opacity-0"}`} />
      
      {isHovered && (
        <div className="absolute z-[60] top-0 left-1/2 -translate-x-1/2 -translate-y-full pb-2 animate-fade-in">
          <div className="bg-[var(--accent)] text-[var(--bg-primary)] shadow-2xl px-4 py-2 rounded-t-xl text-[10px] font-bold uppercase tracking-[0.15em] flex items-center gap-2 whitespace-nowrap font-mono">
            <Pencil size={11} /> Edit {label}
          </div>
        </div>
      )}

      {isHovered && (
        <button
          onClick={(e) => { e.stopPropagation(); handleEdit(); }}
          className="absolute z-[60] bottom-4 right-4 bg-[var(--bg-secondary)] border border-[var(--accent)] text-[var(--accent)] hover:bg-[var(--accent)] hover:text-[var(--bg-primary)] shadow-xl px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-all active:scale-95"
        >
          <Pencil size={12} /> Edit {label}
        </button>
      )}
      
      <div className={`transition-all duration-500 ${isHovered ? "scale-[0.995] origin-center" : ""}`}>
        {children}
      </div>
    </div>
  );
}
