"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Globe, Shield, Terminal, Activity, MapPin, Code2, Layers, Cpu, Database, ChevronLeft, ChevronRight } from "lucide-react";
import { FiGithub } from "react-icons/fi";

interface Project {
  id: string;
  title: string;
  description: string;
  techStack: string[];
  githubUrl?: string;
  liveUrl?: string;
}

// Pick an icon based on tech stack keywords
function getProjectIcon(project: Project) {
  const stack = project.techStack.join(" ").toLowerCase() + " " + project.title.toLowerCase();
  if (stack.includes("ai") || stack.includes("machine") || stack.includes("python")) return Cpu;
  if (stack.includes("database") || stack.includes("sql") || stack.includes("firebase") || stack.includes("supabase")) return Database;
  if (stack.includes("java") || stack.includes("android") || stack.includes("dart") || stack.includes("flutter")) return Layers;
  return Code2;
}

// Get accent color for the mobile mockup based on project type
function getAccentColor(project: Project) {
  const stack = project.techStack.join(" ").toLowerCase() + " " + project.title.toLowerCase();
  if (project.id === "philomedis-mobile" || project.id === "Philomedis Mobile App") return "#D45B45";
  if (stack.includes("guard") || stack.includes("safe") || stack.includes("flutter")) return "#10b981";
  if (stack.includes("ai") || stack.includes("jerry") || stack.includes("voice")) return "#6366f1";
  if (stack.includes("java") || stack.includes("android")) return "#f59e0b";
  if (stack.includes("next") || stack.includes("react")) return "#0ea5e9";
  if (stack.includes("python")) return "#3b82f6";
  return "#8b5cf6";
}

export default function InteractiveProjectMockups({ projects }: { projects: Project[] }) {
  const allProjects = projects.filter(p => p.featured !== false);
  const [activeIdx, setActiveIdx] = useState(0);
  const tabsRef = useRef<HTMLDivElement>(null);
  const currentProject = allProjects[activeIdx] || allProjects[0];
  const accent = getAccentColor(currentProject);
  const Icon = getProjectIcon(currentProject);

  const scrollTabs = (dir: "left" | "right") => {
    if (tabsRef.current) {
      tabsRef.current.scrollBy({ left: dir === "left" ? -200 : 200, behavior: "smooth" });
    }
  };

  const renderLeftMockup = (project: Project) => {
    const accent = getAccentColor(project);
    return (
      <div className="w-full h-full bg-[#FCFBF9] text-[#1A1714] font-sans p-5 flex flex-col justify-between rounded-2xl shadow-inner border border-stone-200 relative overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-stone-100 pb-3">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-red-400" />
            <span className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
            <span className="w-2.5 h-2.5 rounded-full bg-green-400" />
          </div>
          <div className="bg-stone-100 rounded-md px-2 py-1 text-[8px] font-mono text-stone-400 tracking-wider truncate max-w-[120px]">
            {project.id.replace(/ /g, "-").toLowerCase()}.dev
          </div>
          <div className="w-5 h-5 rounded-full bg-stone-200" />
        </div>

        {/* Content */}
        <div className="flex-1 py-3 flex flex-col gap-2.5">
          <div className="flex items-center justify-between bg-stone-50 border border-stone-100 p-2.5 rounded-xl">
            <div>
              <h4 className="text-[9px] font-mono text-stone-400 uppercase tracking-wider">Status</h4>
              <p className="text-sm font-display font-semibold mt-0.5 truncate max-w-[130px]">{project.title}</p>
            </div>
            <div className="px-1.5 py-0.5 rounded text-[8px] font-mono font-bold animate-pulse" style={{ backgroundColor: `${accent}22`, color: accent }}>
              ACTIVE
            </div>
          </div>

          <div className="bg-stone-50 border border-stone-100 p-2.5 rounded-xl">
            <span className="text-[8px] font-mono text-stone-400 uppercase tracking-wider block mb-1.5">Tech Stack</span>
            <div className="flex flex-wrap gap-1">
              {project.techStack.slice(0, 4).map((t) => (
                <span key={t} className="text-[8px] font-mono px-1.5 py-0.5 rounded bg-stone-200 text-stone-600">{t}</span>
              ))}
            </div>
          </div>

          <div className="border border-stone-100 p-2 rounded-lg flex items-center gap-2" style={{ backgroundColor: `${accent}10`, borderColor: `${accent}30` }}>
            <MapPin size={10} style={{ color: accent }} />
            <span className="text-[8px] font-mono text-stone-600 truncate">{project.description?.slice(0, 55)}…</span>
          </div>
        </div>

        <div className="text-[7px] font-mono uppercase tracking-widest text-stone-400 border-t border-stone-100 pt-2 flex justify-between">
          <span>Timon Biswas</span>
          <span>github.com/Ti838</span>
        </div>
      </div>
    );
  };

  const renderRightMockup = (project: Project) => {
    const accent = getAccentColor(project);
    const Icon = getProjectIcon(project);
    return (
      <div className="w-full h-full bg-[#111] text-white p-4 flex flex-col justify-between rounded-[2rem] border-4 border-[#222] relative overflow-hidden shadow-2xl">
        <div className="absolute top-2 left-1/2 -translate-x-1/2 w-16 h-3.5 bg-[#222] rounded-full z-20 flex items-center justify-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-blue-500/50" />
          <span className="w-5 h-0.5 bg-[#1a1a1a] rounded" />
        </div>
        <div className="flex-1 pt-6 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[9px] font-mono tracking-widest uppercase" style={{ color: accent }}>{project.title.slice(0, 14)}</span>
              <Icon size={13} style={{ color: accent }} />
            </div>
            <div>
              <h3 className="text-base font-display italic font-semibold leading-tight">{project.title}</h3>
              <p className="text-[8px] text-stone-400 mt-1 line-clamp-2">{project.description}</p>
            </div>
            {project.techStack.length > 0 && (
              <div className="bg-stone-900 border border-stone-800 rounded-lg p-2 text-center">
                <span className="text-[8px] font-mono text-stone-400 block mb-1">PRIMARY LANGUAGE</span>
                <span className="text-sm font-bold" style={{ color: accent }}>{project.techStack[0]}</span>
              </div>
            )}
          </div>
          <a href={project.githubUrl} target="_blank" rel="noopener noreferrer"
            className="flex items-center justify-center gap-1.5 rounded-xl py-2 text-[9px] font-mono uppercase tracking-widest font-bold mb-2 transition-all"
            style={{ backgroundColor: `${accent}22`, color: accent, border: `1px solid ${accent}44` }}
          >
            <FiGithub size={11} /> View Source
          </a>
        </div>
      </div>
    );
  };

  return (
    <div className="w-full flex flex-col gap-8">
      {/* Scrollable Project Tabs */}
      <div className="relative flex items-center gap-2 max-w-4xl mx-auto w-full">
        <button
          onClick={() => scrollTabs("left")}
          className="flex-shrink-0 w-8 h-8 rounded-full border border-white/10 bg-white/[0.03] flex items-center justify-center hover:bg-white/10 transition-all"
        >
          <ChevronLeft size={14} className="text-text-2" />
        </button>

        <div
          ref={tabsRef}
          className="flex gap-2 overflow-x-auto scroll-smooth"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {allProjects.map((proj, idx) => (
            <button
              key={proj.id}
              onClick={() => setActiveIdx(idx)}
              className={`flex-shrink-0 px-5 py-2 rounded-full font-mono text-[10px] uppercase tracking-widest transition-all duration-300 border whitespace-nowrap ${
                activeIdx === idx
                  ? "bg-[var(--accent)] text-white border-[var(--accent)] shadow-lg shadow-[var(--accent)]/20 scale-105"
                  : "bg-white/[0.02] text-[var(--text-secondary)] border-white/5 hover:border-[var(--accent)]/30 hover:text-[var(--text-primary)]"
              }`}
            >
              {proj.title}
            </button>
          ))}
        </div>

        <button
          onClick={() => scrollTabs("right")}
          className="flex-shrink-0 w-8 h-8 rounded-full border border-white/10 bg-white/[0.03] flex items-center justify-center hover:bg-white/10 transition-all"
        >
          <ChevronRight size={14} className="text-text-2" />
        </button>
      </div>

      {/* 3D Overlapping Scrapbook Mockups */}
      <div className="relative w-full max-w-5xl mx-auto h-[560px] md:h-[640px] flex items-center justify-center mt-4">
        {/* Background Aura */}
        <div
          className="absolute inset-0 pointer-events-none -z-10 blur-[100px] transition-all duration-700"
          style={{ background: `radial-gradient(circle at 50% 60%, ${accent}18 0%, transparent 70%)` }}
        />

        {/* LEFT — Dashboard Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`left-${currentProject.id}`}
            initial={{ opacity: 0, x: -80, y: 100, rotate: -6 }}
            animate={{ opacity: 1, x: -130, y: 90, rotate: -4 }}
            exit={{ opacity: 0, x: -80, rotate: -6 }}
            whileHover={{ rotate: -2, zIndex: 30, scale: 1.03 }}
            transition={{ type: "spring", stiffness: 80, damping: 16 }}
            className="hidden md:block absolute z-10 w-[280px] h-[360px] bottom-10 cursor-pointer origin-bottom-left"
          >
            {renderLeftMockup(currentProject)}
          </motion.div>
        </AnimatePresence>

        {/* CENTER — Blueprint Note */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`center-${currentProject.id}`}
            initial={{ opacity: 0, y: 120, rotate: 4 }}
            animate={{ opacity: 1, y: 0, rotate: -2 }}
            exit={{ opacity: 0, y: 60 }}
            whileHover={{ rotate: 0, zIndex: 40, scale: 1.02 }}
            transition={{ type: "spring", stiffness: 90, damping: 14 }}
            className="absolute z-20 w-[290px] h-[380px] md:w-[340px] md:h-[420px] top-10 shadow-2xl cursor-pointer"
          >
            <div
              className="w-full h-full p-8 flex flex-col justify-between relative rounded-xl shadow-black/40"
              style={{
                backgroundColor: "#FCFAF6",
                color: "#1A1714",
                clipPath: "polygon(0 0, 100% 0, 100% 93%, 96% 100%, 92% 93%, 88% 100%, 84% 93%, 80% 100%, 76% 93%, 72% 100%, 68% 93%, 64% 100%, 60% 93%, 56% 100%, 52% 93%, 48% 100%, 44% 93%, 40% 100%, 36% 93%, 32% 100%, 28% 93%, 24% 100%, 20% 93%, 16% 100%, 12% 93%, 8% 100%, 4% 93%, 0 100%)"
              }}
            >
              {/* Blueprint Grid Lines */}
              <div className="absolute inset-0 opacity-[0.06] pointer-events-none"
                style={{ backgroundImage: "linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)", backgroundSize: "20px 20px" }}
              />
              {/* Red margin line */}
              <div className="absolute top-0 bottom-0 left-10 w-0.5 bg-red-400/50 pointer-events-none" />

              {/* Content */}
              <div className="relative z-10 pl-4 space-y-5">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[9px] uppercase tracking-[0.2em] font-bold" style={{ color: accent }}>PROJECT PROFILE</span>
                  <span className="font-mono text-[9px] uppercase tracking-widest text-stone-400">No. {String(activeIdx + 1).padStart(2, "0")}</span>
                </div>
                <div className="space-y-2">
                  <h3 className="font-display italic text-2xl md:text-3xl font-bold leading-tight">{currentProject.title}</h3>
                  <p className="font-sans text-[11px] leading-relaxed text-stone-600 line-clamp-4">{currentProject.description}</p>
                </div>
                <div className="space-y-1.5">
                  <span className="font-mono text-[9px] uppercase tracking-wider text-stone-400 block">Tech Stack</span>
                  <div className="flex flex-wrap gap-1.5">
                    {currentProject.techStack.map((tech) => (
                      <span key={tech} className="font-mono text-[9px] px-2 py-0.5 rounded bg-stone-100 border border-stone-200 text-stone-600 font-medium">{tech}</span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="relative z-10 pl-4 flex gap-4 border-t border-stone-200 pt-4 mb-8">
                {currentProject.githubUrl && (
                  <a href={currentProject.githubUrl} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wider text-stone-700 hover:text-[#D45B45] transition-colors"
                  >
                    <FiGithub size={12} /> Source
                  </a>
                )}
                {currentProject.liveUrl && (
                  <a href={currentProject.liveUrl} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wider text-stone-700 hover:text-[#D45B45] transition-colors"
                  >
                    <Globe size={12} /> Live Demo
                  </a>
                )}
              </div>

              {/* Paperclip */}
              <div className="absolute -top-6 left-12 z-20" style={{ transform: "rotate(-10deg)" }}>
                <div className="w-5 h-14 rounded-full border-[4px] border-stone-300 shadow-sm" style={{ borderBottom: "none", borderBottomLeftRadius: 0, borderBottomRightRadius: 0, background: "linear-gradient(to right, #f4f4f5, #a1a1aa)" }} />
                <div className="w-2.5 h-10 rounded-full border-[4px] border-stone-400 absolute top-1.5 left-[3px]" style={{ borderTop: "none", borderTopLeftRadius: 0, borderTopRightRadius: 0 }} />
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* RIGHT — Dark Mobile Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`right-${currentProject.id}`}
            initial={{ opacity: 0, x: 80, y: 100, rotate: 8 }}
            animate={{ opacity: 1, x: 130, y: 90, rotate: 6 }}
            exit={{ opacity: 0, x: 80, rotate: 8 }}
            whileHover={{ rotate: 3, zIndex: 30, scale: 1.03 }}
            transition={{ type: "spring", stiffness: 80, damping: 16 }}
            className="hidden md:block absolute z-10 w-[200px] h-[360px] md:w-[240px] md:h-[420px] bottom-4 cursor-pointer origin-bottom-right"
          >
            {renderRightMockup(currentProject)}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
