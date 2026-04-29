"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { FiAward, FiX, FiExternalLink } from "react-icons/fi";
import GlowCard from "@/components/ui/GlowCard";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { Achievement } from "@/types";

export default function AwardsList({ achievements }: { achievements: Achievement[] }) {
  const [selectedCert, setSelectedCert] = useState<Achievement | null>(null);

  // Lock scroll when modal is open
  useEffect(() => {
    if (selectedCert) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [selectedCert]);

  return (
    <>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {achievements.slice(0, 4).map((a, i) => (
          <ScrollReveal key={a.id} delay={i * 100} direction="up">
            <div onClick={() => setSelectedCert(a)} className="cursor-pointer h-full">
              <GlowCard className="glass-card p-8 h-full group hover:border-[var(--accent)] transition-all duration-300">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[var(--surface-tertiary)] border border-[var(--border)] flex items-center justify-center text-[var(--accent)] group-hover:bg-[var(--accent)] group-hover:text-white transition-all duration-500">
                      <FiAward size={18} />
                    </div>
                    <span className="font-mono text-[10px] uppercase tracking-wider text-[var(--text-muted)]">{a.category}</span>
                  </div>
                  <FiExternalLink className="text-[var(--text-muted)] opacity-0 group-hover:opacity-100 transition-opacity" size={14} />
                </div>
                <h3 className="font-mono font-bold text-[var(--text-primary)] mb-3 leading-tight text-sm group-hover:text-[var(--accent)] transition-colors">{a.title}</h3>
                <p className="text-xs text-[var(--text-secondary)] line-clamp-3 mb-4">{a.description}</p>
                <p className="font-mono text-[10px] text-[var(--accent)] uppercase tracking-wider mt-auto">{a.date}</p>
              </GlowCard>
            </div>
          </ScrollReveal>
        ))}
      </div>

      {/* ── Fixed Static Modal ────────────────────────────────────────── */}
      {selectedCert && (
        <div 
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4 md:p-8 backdrop-blur-md bg-black/80 animate-in fade-in duration-300"
          onClick={() => setSelectedCert(null)}
        >
          <div 
            className="relative w-full max-w-5xl max-h-[90vh] bg-[var(--surface)] rounded-[32px] overflow-hidden shadow-2xl border border-[var(--border)] flex flex-col animate-in zoom-in-95 duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-8 py-6 border-b border-[var(--border)]">
              <div>
                <h2 className="font-mono font-bold text-[var(--text-primary)] text-lg">{selectedCert.title}</h2>
                <p className="text-xs text-[var(--text-muted)] font-mono uppercase tracking-widest mt-1">{selectedCert.issuer}</p>
              </div>
              <button 
                onClick={() => setSelectedCert(null)}
                className="w-10 h-10 rounded-full bg-[var(--surface-secondary)] border border-[var(--border)] flex items-center justify-center text-[var(--text-primary)] hover:bg-red-500 hover:text-white transition-all"
              >
                <FiX size={20} />
              </button>
            </div>

            {/* Certificate Image Container */}
            <div className="flex-1 overflow-y-auto p-4 md:p-12 flex items-center justify-center bg-[#f5f5f5] dark:bg-[#111]">
              <div className="relative w-full h-full min-h-[400px] shadow-2xl rounded-lg overflow-hidden border border-[var(--border)]">
                <Image
                  src={selectedCert.imageUrl || "/images/cert-placeholder.png"}
                  alt={selectedCert.title}
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </div>

            {/* Footer */}
            <div className="px-8 py-6 border-t border-[var(--border)] bg-[var(--surface-secondary)]">
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed max-w-3xl mx-auto text-center">
                {selectedCert.description}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
