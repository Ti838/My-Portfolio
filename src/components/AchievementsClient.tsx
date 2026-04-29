"use client";
import Image from "next/image";
import { useState } from "react";
import type { Achievement } from "@/types";
import { FiX, FiZoomIn, FiAward, FiBookOpen, FiMusic, FiLayers } from "react-icons/fi";
import ScrollReveal from "@/components/ui/ScrollReveal";
import GlowCard from "@/components/ui/GlowCard";
import MagneticButton from "@/components/ui/MagneticButton";

const categories = [
  { key: "all", label: "All", icon: FiLayers },
  { key: "competitive-programming", label: "Competition", icon: FiAward },
  { key: "academic", label: "Academic", icon: FiBookOpen },
  { key: "singing", label: "Singing", icon: FiMusic },
];

export default function AchievementsClient({ achievements }: { achievements: Achievement[] }) {
  const [active, setActive] = useState("all");
  const [lightbox, setLightbox] = useState<Achievement | null>(null);

  const filtered =
    active === "all" ? achievements : achievements.filter((a) => a.category === active);

  return (
    <>
      <ScrollReveal direction="up" delay={100} className="flex flex-wrap gap-4 mb-16">
        {categories.map(({ key, label, icon: Icon }) => (
          <MagneticButton key={key} strength={0.1}>
            <button
              onClick={() => setActive(key)}
              className={`px-8 py-3 rounded-full text-xs font-mono font-bold uppercase tracking-widest transition-all flex items-center gap-2 border ${
                active === key
                  ? "bg-[var(--text-primary)] text-[var(--surface)] border-[var(--text-primary)] shadow-sm"
                  : "glass text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--text-primary)]"
              }`}
            >
              <Icon size={14} /> {label}
            </button>
          </MagneticButton>
        ))}
      </ScrollReveal>

      {filtered.length === 0 ? (
        <ScrollReveal direction="up">
          <div className="text-center py-32 glass-card border-dashed">
            <p className="text-6xl mb-6 animate-float">🎤</p>
            <h3 className="font-mono font-bold text-2xl text-[var(--text-primary)] uppercase tracking-wider">Silence in the Studio</h3>
            <p className="text-[var(--text-secondary)] mt-2">Singing achievements are being mastered and will be added soon.</p>
          </div>
        </ScrollReveal>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((a, i) => (
            <ScrollReveal key={a.id} delay={i * 100} direction="up">
              <GlowCard className="glass-card overflow-hidden group cursor-pointer" onClick={() => setLightbox(a)}>
                <div className="relative h-64 bg-white/50 dark:bg-black/20 overflow-hidden border-b border-[var(--border)]">
                  <Image 
                    src={a.imageUrl} 
                    alt={a.title} 
                    fill 
                    className="object-contain p-6 group-hover:scale-110 transition-transform duration-700" 
                  />
                  <div className="absolute inset-0 bg-[var(--accent-glow)] opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center backdrop-blur-0 group-hover:backdrop-blur-sm">
                    <div className="scale-50 group-hover:scale-100 transition-transform duration-500 bg-[var(--surface)] w-12 h-12 rounded-full shadow-lg flex items-center justify-center">
                      <FiZoomIn size={20} className="text-[var(--text-primary)]" />
                    </div>
                  </div>
                </div>
                <div className="p-8 space-y-4">
                  <h3 className="font-mono font-bold text-lg text-[var(--text-primary)] leading-tight group-hover:text-[var(--accent)] transition-colors">
                    {a.title}
                  </h3>
                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed line-clamp-3">
                    {a.description}
                  </p>
                  <div className="flex items-center justify-between pt-4 border-t border-[var(--border)]">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[var(--accent)]">{a.date}</span>
                    {a.issuer && <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[var(--text-muted)]">{a.issuer}</span>}
                  </div>
                </div>
              </GlowCard>
            </ScrollReveal>
          ))}
        </div>
      )}

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-[60] bg-slate-900/90 backdrop-blur-xl flex items-center justify-center p-6 animate-in fade-in duration-300"
          onClick={() => setLightbox(null)}
        >
          <div
            className="relative glass-card overflow-hidden max-w-4xl w-full shadow-[0_0_100px_rgba(0,0,0,0.5)] border-white/20 animate-in zoom-in-95 duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setLightbox(null)}
              className="absolute top-6 right-6 z-20 w-12 h-12 rounded-full glass border-white/20 hover:bg-white/10 flex items-center justify-center text-white transition-all hover:rotate-90"
            >
              <FiX size={20} />
            </button>
            <div className="grid lg:grid-cols-2">
              <div className="relative h-72 lg:h-[500px] bg-white p-8 flex items-center justify-center">
                <Image src={lightbox.imageUrl} alt={lightbox.title} fill className="object-contain p-4 lg:p-10" />
              </div>
              <div className="p-10 flex flex-col justify-center space-y-6">
                <span className="tag-pill text-xs self-start uppercase tracking-widest">{lightbox.category}</span>
                <h2 className="font-display font-900 text-4xl text-slate-900 dark:text-white uppercase tracking-tighter leading-none">{lightbox.title}</h2>
                <p className="text-lg text-slate-600 dark:text-slate-400 font-medium leading-relaxed">{lightbox.description}</p>
                <div className="flex items-center gap-8 pt-6 border-t border-white/10 text-xs font-black uppercase tracking-widest text-slate-500">
                  <span className="flex items-center gap-2"><FiAward className="text-accent-500" /> {lightbox.date}</span>
                  {lightbox.issuer && <span className="flex items-center gap-2"><FiBookOpen className="text-accent-500" /> {lightbox.issuer}</span>}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
