"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Globe, 
  Shield, 
  Terminal, 
  Activity, 
  Code2, 
  Layers, 
  Cpu, 
  Database, 
  ArrowUpRight,
  Search,
  Filter,
  Monitor,
  Smartphone,
  Flame,
  Check
} from "lucide-react";
import { FiGithub } from "react-icons/fi";

interface Project {
  id: string;
  title: string;
  description: string;
  techStack: string[];
  githubUrl?: string;
  liveUrl?: string;
}

// Map tech stack keywords to matching icons for general display
function getProjectIcon(project: Project) {
  const stack = project.techStack.join(" ").toLowerCase() + " " + project.title.toLowerCase();
  if (stack.includes("ai") || stack.includes("machine") || stack.includes("python") || stack.includes("bot") || stack.includes("jerry")) return Cpu;
  if (stack.includes("database") || stack.includes("sql") || stack.includes("firebase") || stack.includes("supabase")) return Database;
  if (stack.includes("java") || stack.includes("android") || stack.includes("dart") || stack.includes("flutter") || stack.includes("app") || stack.includes("mobile")) return Layers;
  return Code2;
}

// Get dynamic modern gradients/accents for simulated screens
function getAccentColor(project: Project) {
  const stack = project.techStack.join(" ").toLowerCase() + " " + project.title.toLowerCase();
  if (project.id.toLowerCase().includes("philomedis")) return { base: "#e26d5c", glow: "rgba(226, 109, 92, 0.15)", gradient: "from-orange-500/10 to-red-500/5" };
  if (stack.includes("guard") || stack.includes("safe") || stack.includes("shield")) return { base: "#10b981", glow: "rgba(16, 185, 129, 0.15)", gradient: "from-emerald-500/10 to-teal-500/5" };
  if (stack.includes("ai") || stack.includes("bot") || stack.includes("voice") || stack.includes("jerry")) return { base: "#8b5cf6", glow: "rgba(139, 92, 246, 0.15)", gradient: "from-purple-500/10 to-indigo-500/5" };
  if (stack.includes("java") || stack.includes("android") || stack.includes("hostel")) return { base: "#f59e0b", glow: "rgba(245, 158, 11, 0.15)", gradient: "from-amber-500/10 to-yellow-500/5" };
  if (stack.includes("next") || stack.includes("react") || stack.includes("portfolio")) return { base: "#0ea5e9", glow: "rgba(14, 165, 233, 0.15)", gradient: "from-sky-500/10 to-blue-500/5" };
  if (stack.includes("python") || stack.includes("django")) return { base: "#3b82f6", glow: "rgba(59, 130, 246, 0.15)", gradient: "from-blue-500/10 to-indigo-500/5" };
  return { base: "#6366f1", glow: "rgba(99, 102, 241, 0.15)", gradient: "from-indigo-500/10 to-purple-500/5" };
}

// Get modern category tags for color badge styling
const getTechColorClass = (tech: string) => {
  const t = tech.toLowerCase();
  if (t.includes("java") && !t.includes("javascript")) return "bg-orange-500/10 border-orange-500/20 text-orange-600 dark:text-orange-400";
  if (t.includes("dart") || t.includes("flutter")) return "bg-cyan-500/10 border-cyan-500/20 text-cyan-600 dark:text-cyan-400";
  if (t.includes("javascript") || t.includes("js")) return "bg-yellow-500/10 border-yellow-500/20 text-yellow-600 dark:text-yellow-400";
  if (t.includes("python")) return "bg-blue-500/10 border-blue-500/20 text-blue-600 dark:text-blue-400";
  if (t.includes("php")) return "bg-indigo-500/10 border-indigo-500/20 text-indigo-600 dark:text-indigo-400";
  if (t.includes("react") || t.includes("next")) return "bg-sky-500/10 border-sky-500/20 text-sky-600 dark:text-sky-400";
  if (t.includes("firebase") || t.includes("supabase") || t.includes("database") || t.includes("sql")) return "bg-amber-500/10 border-amber-500/20 text-amber-600 dark:text-amber-400";
  if (t.includes("css") || t.includes("tailwind")) return "bg-fuchsia-500/10 border-fuchsia-500/20 text-fuchsia-600 dark:text-fuchsia-400";
  if (t.includes("html")) return "bg-rose-500/10 border-rose-500/20 text-rose-600 dark:text-rose-400";
  if (t.includes("c++") || t.includes("c")) return "bg-emerald-500/10 border-emerald-500/20 text-emerald-600 dark:text-emerald-400";
  if (t.includes("ai") || t.includes("machine learning")) return "bg-purple-500/10 border-purple-500/20 text-purple-600 dark:text-purple-400";
  return "bg-stone-500/10 border-stone-500/20 text-stone-600 dark:text-stone-300";
};

export default function InteractiveProjectMockups({ projects }: { projects: Project[] }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");

  const allProjects = projects.length > 0 ? projects : [];

  // Filter projects by both search query and quick category selection
  const filteredProjects = useMemo(() => {
    return allProjects.filter((project) => {
      const titleMatches = project.title.toLowerCase().includes(searchQuery.toLowerCase());
      const descriptionMatches = project.description.toLowerCase().includes(searchQuery.toLowerCase());
      const techMatches = project.techStack.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchesSearch = titleMatches || descriptionMatches || techMatches;

      if (!matchesSearch) return false;

      if (activeFilter === "all") return true;
      const stack = project.techStack.join(" ").toLowerCase() + " " + project.title.toLowerCase();

      if (activeFilter === "mobile") {
        return stack.includes("mobile") || stack.includes("app") || stack.includes("flutter") || stack.includes("android") || stack.includes("dart");
      }
      if (activeFilter === "terminal") {
        return stack.includes("python") || stack.includes("ai") || stack.includes("terminal") || stack.includes("bot") || stack.includes("compiler") || stack.includes("c++") || stack.includes("c");
      }
      if (activeFilter === "web") {
        return !stack.includes("mobile") && !stack.includes("app") && !stack.includes("flutter") && !stack.includes("android") &&
               (stack.includes("web") || stack.includes("next") || stack.includes("react") || stack.includes("html") || stack.includes("css") || stack.includes("javascript") || stack.includes("js") || stack.includes("hostel") || stack.includes("subscribly"));
      }
      return true;
    });
  }, [allProjects, searchQuery, activeFilter]);

  // Determine mockup category to render
  const getMockupType = (project: Project): "mobile" | "terminal" | "browser" => {
    const stack = project.techStack.join(" ").toLowerCase() + " " + project.title.toLowerCase();
    if (stack.includes("mobile") || stack.includes("app") || stack.includes("flutter") || stack.includes("android") || stack.includes("dart")) {
      return "mobile";
    }
    if (stack.includes("python") || stack.includes("ai") || stack.includes("terminal") || stack.includes("bot") || stack.includes("compiler") || stack.includes("c++") || stack.includes("c")) {
      return "terminal";
    }
    return "browser";
  };

  const renderEmbeddedMockup = (project: Project, idx: number) => {
    const type = getMockupType(project);
    const accent = getAccentColor(project);
    const Icon = getProjectIcon(project);

    // 1. MOBILE SMARTPHONE MOCKUP CARD
    if (type === "mobile") {
      return (
        <motion.div 
          layout
          className="relative w-full h-[460px] bg-[#161618] rounded-[2.5rem] border border-zinc-800 p-3 shadow-2xl flex flex-col group/device hover:border-zinc-700/80 transition-all duration-300 overflow-hidden"
          style={{ boxShadow: `0 20px 40px -20px ${accent.glow}` }}
        >
          {/* Smartphone Bezel & Notch */}
          <div className="absolute top-2 left-1/2 -translate-x-1/2 w-28 h-4.5 bg-[#27272a] rounded-full z-20 flex items-center justify-center gap-2 border border-zinc-800">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500/40" />
            <span className="w-8 h-1 bg-zinc-950 rounded-full" />
          </div>
          
          {/* Side buttons */}
          <div className="absolute left-[-2px] top-24 w-[3px] h-10 bg-zinc-700 rounded-r" />
          <div className="absolute left-[-2px] top-36 w-[3px] h-10 bg-zinc-700 rounded-r" />
          <div className="absolute right-[-2px] top-28 w-[3px] h-14 bg-zinc-700 rounded-l" />

          {/* Internal Mobile Screen Viewport */}
          <div className="flex-1 bg-zinc-950 rounded-[2rem] overflow-hidden p-4 relative flex flex-col justify-between border border-zinc-900">
            {/* Ambient Background Gradient Mesh */}
            <div className={`absolute inset-0 bg-gradient-to-br ${accent.gradient} opacity-20 pointer-events-none`} />

            {/* Mobile Bar Telemetry */}
            <div className="flex items-center justify-between text-[7px] text-zinc-400/80 font-mono tracking-wider pt-1.5 relative z-10">
              <span>9:41 AM</span>
              <div className="flex items-center gap-1">
                <Icon size={7} style={{ color: accent.base }} />
                <span>5G</span>
                <div className="w-4 h-2 border border-zinc-700 rounded-sm p-0.5 flex items-center">
                  <div className="w-full h-full bg-emerald-500 rounded-2xs" />
                </div>
              </div>
            </div>

            {/* Simulated App Header */}
            <div className="flex items-center gap-2 border-b border-zinc-800/60 pb-3 mt-4 relative z-10">
              <div className="w-8 h-8 rounded-xl bg-zinc-900 border border-zinc-800/80 flex items-center justify-center flex-shrink-0">
                <Icon size={14} style={{ color: accent.base }} />
              </div>
              <div className="min-w-0">
                <span className="text-[7px] font-mono tracking-widest uppercase block" style={{ color: accent.base }}>APP CONSOLE</span>
                <span className="text-[11px] font-bold text-zinc-200 block truncate font-display tracking-tight">{project.title}</span>
              </div>
            </div>

            {/* App Body Content */}
            <div className="flex-1 py-4 flex flex-col justify-between relative z-10 min-h-0">
              <div className="space-y-3.5">
                <div className="bg-zinc-900/60 backdrop-blur-xs border border-zinc-800/50 p-3 rounded-xl">
                  <span className="text-[7px] font-mono text-zinc-500 uppercase tracking-widest block mb-1">Description</span>
                  <p className="text-[9.5px] leading-relaxed text-zinc-300 font-sans line-clamp-4">
                    {project.description}
                  </p>
                </div>

                <div className="space-y-1">
                  <span className="text-[7px] font-mono text-zinc-500 uppercase tracking-widest block">Framework/Tech</span>
                  <div className="flex flex-wrap gap-1">
                    {project.techStack.map(tech => (
                      <span key={tech} className={`text-[8px] px-2 py-0.5 rounded-md border font-mono ${getTechColorClass(tech)}`}>
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Decorative Screen Indicator */}
              <div className="bg-zinc-900/40 border border-zinc-800/60 p-2.5 rounded-xl flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-[7.5px] font-mono text-zinc-400 uppercase tracking-wider">Device Online</span>
                </div>
                <span className="text-[7.5px] font-mono text-zinc-500">NO. {String(idx + 1).padStart(2, "0")}</span>
              </div>
            </div>

            {/* Native Mobile Action Trigger Buttons */}
            <div className="flex gap-2 relative z-10 pt-2 border-t border-zinc-900">
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-1.5 bg-zinc-900 hover:bg-zinc-800 text-zinc-300 font-mono text-[9px] uppercase tracking-wider py-2.5 rounded-xl border border-zinc-800/80 hover:text-white transition-all"
                >
                  <FiGithub size={10} /> Code
                </a>
              )}
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-1 bg-zinc-100 hover:bg-white text-zinc-950 font-mono text-[9px] font-bold uppercase tracking-wider py-2.5 rounded-xl shadow-lg transition-all"
                  style={{ backgroundColor: accent.base, color: '#000' }}
                >
                  Launch <ArrowUpRight size={10} />
                </a>
              )}
            </div>
            
            {/* iOS Home Indicator Bar */}
            <div className="w-20 h-1 bg-zinc-800 rounded-full mx-auto mt-2.5 flex-shrink-0" />
          </div>
        </motion.div>
      );
    }

    // 2. DEVELOPER TERMINAL MOCKUP CARD
    if (type === "terminal") {
      return (
        <motion.div
          layout
          className="relative w-full h-[460px] bg-[#0c0c0e] rounded-[1.8rem] border border-zinc-800/80 p-3.5 shadow-2xl flex flex-col group/device hover:border-zinc-700/80 transition-all duration-300 overflow-hidden font-mono"
          style={{ boxShadow: `0 20px 40px -20px ${accent.glow}` }}
        >
          {/* Terminal Title Bar */}
          <div className="flex items-center justify-between border-b border-zinc-900 pb-3 mb-3">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#ef4444]/80 block" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#f59e0b]/80 block" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#10b981]/80 block" />
            </div>
            <div className="flex items-center gap-1 px-3 py-0.5 rounded bg-zinc-900 border border-zinc-800/50">
              <Terminal size={8} className="text-zinc-500" />
              <span className="text-[7.5px] text-zinc-400">bash • {project.id.toLowerCase()}.py</span>
            </div>
            <div className="w-10" />
          </div>

          {/* Terminal Shell Body */}
          <div className="flex-1 flex flex-col justify-between text-zinc-300 text-[9.5px] leading-relaxed p-1.5">
            <div className="space-y-4">
              {/* Commands run */}
              <div className="space-y-1">
                <p className="text-zinc-500 font-mono">$ python -m pip install -r requirements.txt</p>
                <p className="text-emerald-400/90 font-mono">&gt; installation successful. initializing...</p>
                <p className="text-zinc-500 font-mono">$ python run_laboratory.py --mode=live</p>
              </div>

              {/* Formatted Output logs for Title & Description */}
              <div className="space-y-2 border-l-2 pl-3 border-indigo-500/30">
                <div className="flex items-center gap-2">
                  <span className="text-indigo-400 uppercase tracking-widest text-[8px] font-bold">[REPOSITORY]</span>
                  <span className="text-zinc-100 font-bold font-display text-[12px]">{project.title}</span>
                </div>
                <div>
                  <span className="text-zinc-500 uppercase tracking-widest text-[7px] block mb-0.5">[DESCRIPTION]</span>
                  <p className="text-zinc-300 font-sans leading-relaxed line-clamp-5">
                    {project.description}
                  </p>
                </div>
              </div>

              {/* Technologies */}
              <div className="space-y-1.5">
                <span className="text-zinc-500 uppercase tracking-widest text-[7px] block">[LOADED_CHANNELS]</span>
                <div className="flex flex-wrap gap-1 font-mono">
                  {project.techStack.map(tech => (
                    <span key={tech} className={`text-[8.5px] px-2 py-0.5 rounded border ${getTechColorClass(tech)}`}>
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Active Task Telemetry and Interactive Links inside CLI */}
            <div className="space-y-3.5 pt-3 border-t border-zinc-900">
              <div className="flex items-center justify-between text-[8px] text-zinc-500 tracking-wider">
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-500 animate-ping" />
                  <span>SESSION: ACTIVE // LOGGED</span>
                </div>
                <span>NODE_{String(idx + 1).padStart(2, "0")}</span>
              </div>

              {/* Actions formatted inside terminal prompt */}
              <div className="bg-zinc-950 p-2.5 rounded-xl border border-zinc-900 flex items-center justify-between flex-wrap gap-2">
                <div className="flex items-center gap-1 font-mono text-[9px]">
                  <span className="text-emerald-500">$</span>
                  <span className="text-zinc-300 font-bold">explore --trigger</span>
                  <span className="w-1 h-3 bg-zinc-300 animate-pulse inline-block align-middle ml-0.5" />
                </div>

                <div className="flex items-center gap-3">
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-zinc-400 hover:text-white underline font-mono text-[9px] flex items-center gap-0.5 transition-colors"
                    >
                      [Source]
                    </a>
                  )}
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:underline font-mono text-[9px] flex items-center gap-0.5 font-bold transition-all"
                      style={{ color: accent.base }}
                    >
                      [Launch]
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      );
    }

    // 3. WEB BROWSER MOCKUP CARD (Default)
    return (
      <motion.div
        layout
        className="relative w-full h-[460px] bg-stone-50 dark:bg-[#111112] rounded-[1.8rem] border border-stone-200 dark:border-zinc-800 p-3.5 shadow-2xl flex flex-col group/device hover:border-stone-300 dark:hover:border-zinc-700/80 transition-all duration-300 overflow-hidden"
        style={{ boxShadow: `0 20px 40px -20px ${accent.glow}` }}
      >
        {/* Browser Chrome Header */}
        <div className="flex items-center justify-between border-b border-stone-200 dark:border-zinc-900 pb-3 mb-3">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#ef4444]/80 block" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#f59e0b]/80 block" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#10b981]/80 block" />
          </div>
          
          {/* Glass Address Bar */}
          <div className="bg-stone-100 dark:bg-zinc-900 border border-stone-200 dark:border-zinc-800/80 rounded-lg px-4 py-1 text-[7.5px] font-mono text-stone-500 dark:text-zinc-400 tracking-wider truncate max-w-[200px] flex items-center gap-1.5">
            <Globe size={8} className="text-stone-400 dark:text-zinc-500" />
            <span>https://{project.id.replace(/ /g, "-").toLowerCase()}.dev</span>
          </div>
          
          <div className="w-10 h-2" />
        </div>

        {/* Browser Webpage Content inside cabinet card */}
        <div className="flex-1 bg-[#FCFBF9] dark:bg-[#070708] rounded-xl border border-stone-150 dark:border-zinc-900/60 p-4.5 flex flex-col justify-between relative overflow-hidden">
          {/* Ambient Background Gradient Mesh */}
          <div className={`absolute inset-0 bg-gradient-to-br ${accent.gradient} opacity-20 pointer-events-none`} />

          <div className="space-y-4 relative z-10">
            {/* Top Indicator */}
            <div className="flex items-center justify-between bg-stone-100/50 dark:bg-zinc-900/50 border border-stone-200/40 dark:border-zinc-800/40 p-2 rounded-lg">
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: accent.base }} />
                <span className="text-[6.5px] font-mono tracking-widest uppercase text-stone-400 dark:text-zinc-500">Overview Panel</span>
              </div>
              <span className="text-[8px] font-mono font-bold uppercase tracking-wider text-stone-600 dark:text-zinc-400">ONLINE</span>
            </div>

            {/* Title & Description details */}
            <div className="space-y-2">
              <h3 className="text-[16px] font-display font-bold text-stone-850 dark:text-zinc-100 leading-tight tracking-tight">
                {project.title}
              </h3>
              <p className="text-[9.5px] font-sans text-stone-600 dark:text-zinc-400 leading-relaxed line-clamp-5">
                {project.description}
              </p>
            </div>

            {/* Tech Stack Pills */}
            <div className="space-y-1.5">
              <span className="text-[7.5px] font-mono text-stone-400 dark:text-zinc-500 uppercase tracking-widest block">Systems</span>
              <div className="flex flex-wrap gap-1">
                {project.techStack.map((tech) => (
                  <span
                    key={tech}
                    className={`font-mono text-[8px] px-2 py-0.5 rounded-md border font-medium ${getTechColorClass(tech)}`}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Footer Action Links */}
          <div className="border-t border-stone-200/60 dark:border-zinc-900/80 pt-3 mt-4 flex items-center justify-between relative z-10">
            <span className="font-mono text-[7px] tracking-widest text-stone-400 dark:text-zinc-500 uppercase">SYS_INDEX: {String(idx + 1).padStart(2, "0")}</span>
            
            <div className="flex items-center gap-3">
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 font-mono text-[9px] uppercase tracking-wider text-stone-600 hover:text-stone-900 dark:text-zinc-400 dark:hover:text-white transition-colors"
                >
                  <FiGithub size={10} /> Source
                </a>
              )}
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 font-mono text-[9px] uppercase tracking-wider font-bold transition-all"
                  style={{ color: accent.base }}
                >
                  Launch <ArrowUpRight size={10} />
                </a>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    );
  };

  return (
    <div className="space-y-10">
      {/* ══════════════════════════════════════════════════════════════ */}
      {/* UNIFIED GLASS WORKSPACE CABINET CONSOLE */}
      {/* ══════════════════════════════════════════════════════════════ */}
      <div className="relative bg-stone-100/40 dark:bg-zinc-950/40 border border-stone-200/80 dark:border-white/10 rounded-[2.5rem] p-6 md:p-8 shadow-2xl backdrop-blur-xl transition-colors duration-300">
        
        {/* Glow Telemetry Accent Line */}
        <div className="absolute top-0 left-20 right-20 h-[1px] bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent" />
        
        {/* 1. Cabinet Dashboard Header Panel */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-8 border-b border-stone-200 dark:border-zinc-900/80">
          
          {/* Telemetry Status Lights */}
          <div className="flex items-center gap-3">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
            <div>
              <span className="font-mono text-[8px] md:text-[9.5px] uppercase tracking-[0.2em] text-stone-400 dark:text-zinc-500 block leading-none">PROJECT CORE // LAB STATION</span>
              <span className="font-display font-semibold text-[13px] md:text-[15px] text-stone-850 dark:text-zinc-200 block mt-1">FEED: ACTIVE SYSTEM</span>
            </div>
          </div>

          {/* Minimalist Glass Search Input */}
          <div className="relative flex-1 max-w-md w-full">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400 dark:text-zinc-500" size={13} />
            <input 
              type="text"
              placeholder="Search by title, description or technology..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-stone-200/50 dark:bg-zinc-900/60 border border-stone-200 dark:border-zinc-800/80 rounded-2xl pl-10 pr-4 py-2.5 text-xs text-stone-800 dark:text-zinc-100 placeholder-stone-500 dark:placeholder-zinc-500 focus:outline-none focus:border-indigo-500 dark:focus:border-indigo-500/60 backdrop-blur-xs transition-all font-mono"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery("")}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-mono text-stone-500 dark:text-zinc-500 hover:text-stone-800 dark:hover:text-white"
              >
                [clear]
              </button>
            )}
          </div>

          {/* Active Counters Telemetry */}
          <div className="flex items-center gap-6 font-mono text-[9px] uppercase tracking-wider text-stone-400 dark:text-zinc-500 border-l border-stone-250 dark:border-zinc-800/60 pl-6 lg:block hidden">
            <p>ONLINE: <span className="text-emerald-500 font-bold font-mono">{filteredProjects.length} / {allProjects.length}</span></p>
            <p className="mt-1">CHANNELS: <span className="text-indigo-400 font-bold font-mono">ACTIVE</span></p>
          </div>
        </div>

        {/* 2. Sleek Filter Badges Selector Row */}
        <div className="flex flex-wrap items-center gap-2 py-6 border-b border-stone-200 dark:border-zinc-900/60 mb-8">
          <span className="font-mono text-[8px] uppercase tracking-widest text-stone-400 dark:text-zinc-500 mr-2 flex items-center gap-1">
            <Filter size={8} /> Channels
          </span>
          {[
            { id: "all", label: "All Repositories", icon: Monitor },
            { id: "web", label: "Web Applications", icon: Globe },
            { id: "mobile", label: "Mobile / Apps", icon: Smartphone },
            { id: "terminal", label: "CLI & Backend Systems", icon: Terminal }
          ].map((filt) => {
            const FIcon = filt.icon;
            const isActive = activeFilter === filt.id;
            return (
              <button
                key={filt.id}
                onClick={() => setActiveFilter(filt.id)}
                className={`flex items-center gap-1.5 font-mono text-[9.5px] uppercase tracking-wider px-3.5 py-1.5 rounded-full border transition-all duration-300 ${
                  isActive 
                    ? "bg-zinc-900 text-white dark:bg-white dark:text-zinc-950 border-zinc-900 dark:border-white font-bold scale-[1.03] shadow-md"
                    : "bg-stone-200/60 text-stone-600 border-stone-250 hover:bg-stone-200 dark:bg-zinc-900/40 dark:text-zinc-400 dark:border-zinc-800/80 dark:hover:bg-zinc-900/80"
                }`}
              >
                <FIcon size={10} />
                {filt.label}
              </button>
            );
          })}
        </div>

        {/* 3. The Grid Cabinet Layout */}
        {filteredProjects.length === 0 ? (
          <div className="py-24 text-center space-y-3 font-mono">
            <p className="text-zinc-500 text-xs">NO CHANNELS FOUND MATCHING SEARCH CRITERIA</p>
            <button 
              onClick={() => { setSearchQuery(""); setActiveFilter("all"); }}
              className="text-[10px] text-indigo-500 hover:text-indigo-400 underline uppercase tracking-wider"
            >
              [Reset Filters]
            </button>
          </div>
        ) : (
          <motion.div 
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project, idx) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.35 }}
                  whileHover={{ y: -6 }}
                  className="flex flex-col relative"
                >
                  {renderEmbeddedMockup(project, idx)}
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}

      </div>
    </div>
  );
}
