// REFINED
"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Award, X, ExternalLink, Calendar } from "lucide-react";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { Achievement } from "@/types";

export default function AwardsList({ achievements }: { achievements: Achievement[] }) {
  const [selectedCert, setSelectedCert] = useState<Achievement | null>(null);

  useEffect(() => {
    if (selectedCert) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => { document.body.style.overflow = "unset"; };
  }, [selectedCert]);

  return (
    <>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {achievements.slice(0, 8).map((a, i) => (
          <ScrollReveal key={a.id} delay={i * 80} direction="up">
            <div onClick={() => setSelectedCert(a)} className="cursor-pointer h-full">
              <div className="card card-glow p-6 h-full group">
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-[var(--accent-dim)] flex items-center justify-center text-[var(--accent)] group-hover:bg-[var(--accent)] group-hover:text-[var(--bg-primary)] transition-all duration-300">
                      <Award size={16} />
                    </div>
                    <span className="font-mono text-[9px] uppercase tracking-wider text-[var(--text-tertiary)]">{a.category}</span>
                  </div>
                  <ExternalLink className="text-[var(--text-tertiary)] opacity-0 group-hover:opacity-100 transition-opacity" size={12} />
                </div>
                <h3 className="heading text-sm mb-2 group-hover:text-[var(--accent)] transition-colors leading-tight">{a.title}</h3>
                <p className="text-xs text-[var(--text-secondary)] line-clamp-2 mb-4">{a.description}</p>
                <div className="flex items-center gap-1.5 mt-auto">
                  <Calendar size={10} className="text-[var(--accent)]" />
                  <span className="font-mono text-[10px] text-[var(--accent)]">{a.date}</span>
                </div>
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>

      {/* Certificate Modal */}
      {selectedCert && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4 md:p-8 backdrop-blur-md bg-black/80"
          onClick={() => setSelectedCert(null)}
        >
          <div
            className="relative w-full max-w-4xl max-h-[90vh] bg-[var(--bg-secondary)] rounded-2xl overflow-hidden border border-[var(--border)] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-[var(--border)]">
              <div>
                <h2 className="heading text-base">{selectedCert.title}</h2>
                <p className="font-mono text-[10px] text-[var(--text-tertiary)] uppercase tracking-wider mt-1">{selectedCert.issuer}</p>
              </div>
              <button
                onClick={() => setSelectedCert(null)}
                className="w-9 h-9 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border)] flex items-center justify-center text-[var(--text-primary)] hover:bg-[var(--error)] hover:text-white hover:border-[var(--error)] transition-all"
              >
                <X size={16} />
              </button>
            </div>

            {/* Certificate Image */}
            <div className="flex-1 overflow-y-auto p-6 flex items-center justify-center bg-[var(--bg-primary)]">
              <div className="relative w-full h-full min-h-[400px] rounded-xl overflow-hidden border border-[var(--border)]">
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
            <div className="px-6 py-4 border-t border-[var(--border)] bg-[var(--bg-elevated)]">
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed text-center">
                {selectedCert.description}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
