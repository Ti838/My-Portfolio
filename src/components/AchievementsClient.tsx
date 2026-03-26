"use client";
import Image from "next/image";
import { useState } from "react";
import type { Achievement } from "@/types";
import { FiX, FiZoomIn } from "react-icons/fi";

const categories = [
  { key: "all", label: "All" },
  { key: "competitive-programming", label: "🏆 Competitive Programming" },
  { key: "academic", label: "🎓 Academic" },
  { key: "singing", label: "🎤 Singing" },
];

export default function AchievementsClient({ achievements }: { achievements: Achievement[] }) {
  const [active, setActive] = useState("all");
  const [lightbox, setLightbox] = useState<Achievement | null>(null);

  const filtered =
    active === "all" ? achievements : achievements.filter((a) => a.category === active);

  return (
    <>
      <div className="flex flex-wrap gap-2 mb-10">
        {categories.map(({ key, label }) => (
          <button
            key={key}
            onClick={() => setActive(key)}
            className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
              active === key
                ? "bg-accent-500 text-white shadow-md"
                : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-20 text-slate-400">
          <p className="text-4xl mb-3">🎤</p>
          <p className="font-display font-700 text-slate-900 dark:text-white text-lg">Coming Soon</p>
          <p className="text-sm mt-1">Singing achievements will be added here.</p>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((a) => (
            <div key={a.id} className="card-base overflow-hidden group cursor-pointer" onClick={() => setLightbox(a)}>
              <div className="relative h-48 bg-slate-100 dark:bg-slate-800 overflow-hidden">
                <Image src={a.imageUrl} alt={a.title} fill className="object-contain p-3 group-hover:scale-105 transition-transform duration-300" />
                <div className="absolute inset-0 bg-accent-500/0 group-hover:bg-accent-500/10 transition-all flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-white dark:bg-slate-800 p-2 rounded-full shadow-md">
                    <FiZoomIn size={18} className="text-accent-500" />
                  </div>
                </div>
              </div>
              <div className="p-5">
                <div className="flex items-center justify-between gap-2 mb-2">
                  <h3 className="font-display font-700 text-slate-900 dark:text-white text-base leading-tight">{a.title}</h3>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{a.description}</p>
                <div className="flex items-center justify-between mt-4">
                  <span className="text-[10px] font-mono text-accent-500">{a.date}</span>
                  {a.issuer && <span className="text-[10px] text-slate-400 dark:text-slate-500">{a.issuer}</span>}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setLightbox(null)}
        >
          <div
            className="relative bg-white dark:bg-slate-900 rounded-2xl overflow-hidden max-w-3xl w-full shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setLightbox(null)}
              aria-label="Close"
              className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-black/20 hover:bg-black/40 flex items-center justify-center text-white transition-colors"
            >
              <FiX size={16} />
            </button>
            <div className="relative h-72 sm:h-96 bg-slate-100 dark:bg-slate-800">
              <Image src={lightbox.imageUrl} alt={lightbox.title} fill className="object-contain p-4" />
            </div>
            <div className="p-6">
              <h2 className="font-display font-700 text-xl text-slate-900 dark:text-white mb-2">{lightbox.title}</h2>
              <p className="text-sm text-slate-600 dark:text-slate-400">{lightbox.description}</p>
              <div className="flex items-center gap-4 mt-4 text-xs text-slate-500">
                <span>📅 {lightbox.date}</span>
                {lightbox.issuer && <span>🏛️ {lightbox.issuer}</span>}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
