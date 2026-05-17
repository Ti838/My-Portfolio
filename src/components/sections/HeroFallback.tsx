"use client";

import React from "react";
import { motion } from "framer-motion";
import { Code, Award, Monitor } from "lucide-react";

export default function HeroFallback({ personalInfo }: { personalInfo: any }) {
  const stats = personalInfo?.stats || {};
  const skills = ["AI", "Next", "C++", "UI", "DB", "API", "ML", "UX"];

  return (
    <div className="relative flex h-[620px] w-full flex-col justify-between overflow-hidden rounded-[2rem] border border-white/10 bg-black/40 p-8 shadow-[0_28px_100px_rgba(0,0,0,0.34)] backdrop-blur-md">
      {/* Background radial glow */}
      <div className="absolute -right-16 -top-16 h-72 w-72 rounded-full bg-cyan-500/10 blur-[80px]" />
      <div className="absolute -bottom-16 -left-16 h-72 w-72 rounded-full bg-emerald-500/10 blur-[80px]" />

      {/* Header Tag */}
      <div className="flex items-center justify-between">
        <span className="rounded-full border border-cyan-500/20 bg-cyan-500/10 px-3 py-1 font-mono text-[9px] uppercase tracking-[0.22em] text-cyan-200">
          Terminal Console (2D Optimized)
        </span>
        <div className="flex gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-red-500/60" />
          <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/60" />
          <span className="h-2.5 w-2.5 rounded-full bg-green-500/60" />
        </div>
      </div>

      {/* Main Terminal Screen */}
      <div className="my-auto space-y-6 text-center md:text-left">
        <div className="space-y-2">
          <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-cyan-400">
            // INTERACTIVE COMMAND PORTFOLIO
          </span>
          <h2 className="font-display text-4xl font-bold tracking-tight text-white md:text-5xl">
            {personalInfo?.name || "Timon Biswas"}
          </h2>
          <p className="font-mono text-xs uppercase tracking-widest text-text-3">
            {personalInfo?.tagline || "AI focused full stack developer"}
          </p>
        </div>

        {/* Console Action Pills */}
        <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 pt-2">
          {["BUILD", "SHIP", "LEARN"].map((word, i) => (
            <span
              key={word}
              className={`rounded-lg px-3 py-1 font-mono text-[10px] font-semibold tracking-wider ${
                i === 1
                  ? "bg-cyan-500/20 border border-cyan-500/30 text-cyan-300"
                  : "bg-white/[0.03] border border-white/5 text-text-3"
              }`}
            >
              {word}
            </span>
          ))}
        </div>

        {/* Skill Chip Row */}
        <div className="flex flex-wrap items-center justify-center md:justify-start gap-1.5 pt-4 border-t border-white/5">
          {skills.map((skill, index) => (
            <motion.span
              key={skill}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05, duration: 0.3 }}
              className="rounded-md border border-white/5 bg-white/[0.02] px-2.5 py-1 font-mono text-[9px] text-cyan-200/80 shadow-md"
            >
              {skill}
            </motion.span>
          ))}
        </div>
      </div>

      {/* Bottom Stats Grid */}
      <div className="grid grid-cols-3 gap-3 border-t border-white/10 pt-6">
        {[
          { label: "projects", value: stats.projects || "14+", icon: Code, color: "text-cyan-400" },
          { label: "certificates", value: stats.certificates || "4+", icon: Award, color: "text-indigo-400" },
          { label: "icpc", value: stats.icpc_rank || "Ranked", icon: Monitor, color: "text-emerald-400" },
        ].map((item) => (
          <div
            key={item.label}
            className="flex flex-col items-center justify-center rounded-2xl border border-white/5 bg-white/[0.01] p-3 text-center transition hover:bg-white/[0.03]"
          >
            <item.icon size={14} className={`${item.color} mb-1`} />
            <span className="font-display text-sm font-semibold text-white">{item.value}</span>
            <span className="mt-1 font-mono text-[8px] uppercase tracking-wider text-text-3">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
