"use client";

import { useState, useMemo, useEffect } from "react";
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
  Smartphone
} from "lucide-react";
// Re-import icons correctly
import { FiGithub as FiGithubIcon } from "react-icons/fi";

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
  if (project.id.toLowerCase().includes("philomedis")) return { base: "#e87a5d", glow: "rgba(232, 122, 93, 0.14)", gradient: "from-orange-500/10 to-red-500/5" };
  if (stack.includes("guard") || stack.includes("safe") || stack.includes("shield")) return { base: "#10b981", glow: "rgba(16, 185, 129, 0.14)", gradient: "from-emerald-500/10 to-teal-500/5" };
  if (stack.includes("ai") || stack.includes("bot") || stack.includes("voice") || stack.includes("jerry")) return { base: "#a855f7", glow: "rgba(168, 85, 247, 0.14)", gradient: "from-purple-500/10 to-indigo-500/5" };
  if (stack.includes("java") || stack.includes("android") || stack.includes("hostel")) return { base: "#f59e0b", glow: "rgba(245, 158, 11, 0.14)", gradient: "from-amber-500/10 to-yellow-500/5" };
  if (stack.includes("next") || stack.includes("react") || stack.includes("portfolio")) return { base: "#0ea5e9", glow: "rgba(14, 165, 233, 0.14)", gradient: "from-sky-500/10 to-blue-500/5" };
  if (stack.includes("python") || stack.includes("django")) return { base: "#3b82f6", glow: "rgba(59, 130, 246, 0.14)", gradient: "from-blue-500/10 to-indigo-500/5" };
  return { base: "#6366f1", glow: "rgba(99, 102, 241, 0.14)", gradient: "from-indigo-500/10 to-purple-500/5" };
}

// Get modern category tags for color badge styling
const getTechColorClass = (tech: string) => {
  const t = tech.toLowerCase();
  if (t.includes("java") && !t.includes("javascript")) return "bg-orange-500/10 border-orange-500/20 text-orange-600 dark:text-orange-400";
  if (t.includes("dart") || t.includes("flutter")) return "bg-cyan-500/10 border-cyan-500/20 text-cyan-600 dark:text-cyan-400";
  if (t.includes("javascript") || t.includes("js")) return "bg-yellow-500/10 border-yellow-500/20 text-yellow-600 dark:text-yellow-550";
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

// 3D perspective mouse-tilt wrapper
function TiltCard({ 
  children, 
  project 
}: { 
  children: React.ReactNode; 
  project: Project; 
}) {
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [glareX, setGlareX] = useState(0);
  const [glareY, setGlareY] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  // Disable 3D tilt calculations on mobile touch interfaces to keep scrolling fluid
  useEffect(() => {
    const checkTouch = () => {
      setIsTouchDevice(
        "ontouchstart" in window || 
        navigator.maxTouchPoints > 0
      );
    };
    checkTouch();
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isTouchDevice) return;
    const card = e.currentTarget;
    const box = card.getBoundingClientRect();
    const x = e.clientX - box.left;
    const y = e.clientY - box.top;
    
    // Normalize positioning centered around origin
    const percentX = (x / box.width) - 0.5;
    const percentY = (y / box.height) - 0.5;
    
    // Tilt limit
    const maxTilt = 8;
    setRotateX(-percentY * maxTilt);
    setRotateY(percentX * maxTilt);
    
    // Cursor glare position percentage
    setGlareX((x / box.width) * 100);
    setGlareY((y / box.height) * 100);
  };

  const handleMouseEnter = () => {
    if (isTouchDevice) return;
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotateX(0);
    setRotateY(0);
  };

  const accent = getAccentColor(project);

  return (
    <motion.div
      layout
      className="relative w-full rounded-[2.3rem] overflow-hidden"
      style={{ perspective: 1000 }}
    >
      <motion.div
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        animate={{
          rotateX: isHovered ? rotateX : 0,
          rotateY: isHovered ? rotateY : 0,
          scale: isHovered ? 1.015 : 1,
        }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
        style={{
          transformStyle: "preserve-3d",
          boxShadow: isHovered 
            ? `0 25px 50px -12px ${accent.glow}, 0 0 15px -3px ${accent.base}22`
            : `0 15px 30px -15px ${accent.glow}`,
        }}
        className="w-full h-full relative group/device"
      >
        {children}

        {/* Ambient Glass Glow spotlight mask overlay */}
        {!isTouchDevice && (
          <div
            className="absolute inset-0 pointer-events-none transition-opacity duration-300 opacity-0 z-30"
            style={{
              opacity: isHovered ? 1 : 0,
              background: `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255, 255, 255, 0.08), transparent 45%)`,
            }}
          />
        )}
      </motion.div>
    </motion.div>
  );
}

export default function InteractiveProjectMockups({ projects }: { projects: Project[] }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");

  const allProjects = projects.length > 0 ? projects : [];

  // Helper: determine the mockup category for a project (single source of truth)
  const getCategory = (project: Project): "mobile" | "terminal" | "browser" => {
    const techLower = project.techStack.map(t => t.toLowerCase());
    const titleLower = project.title.toLowerCase();

    // Mobile: uses Android SDK, Dart/Flutter, explicit mobile keyword
    const isMobile =
      techLower.some(t => t === "dart" || t === "flutter" || t === "android sdk" || t === "android") ||
      titleLower.includes("mobile") ||
      techLower.some(t => t.includes("flutter") || t.includes("android"));

    if (isMobile) return "mobile";

    // Terminal/CLI: Python, C++ (exact), AI/ML specific, bot, compiler
    const isTerminal =
      techLower.some(t => t === "python" || t === "c++" || t === "c" || t === "ai" || t === "artificial intelligence" || t === "machine learning") ||
      techLower.some(t => t.includes("python") || t.includes("c++")) ||
      titleLower.includes("bot") ||
      titleLower.includes("compiler") ||
      titleLower.includes("cli") ||
      titleLower.includes("terminal") ||
      titleLower.includes("jerry") || // Jerry AI — terminal chatbot
      titleLower.includes("bank"); // Bank transaction — python/php backend

    if (isTerminal) return "terminal";

    // Everything else: web
    return "browser";
  };

  // Filter projects by both search query and quick category selection
  const filteredProjects = useMemo(() => {
    return allProjects.filter((project) => {
      const titleMatches = project.title.toLowerCase().includes(searchQuery.toLowerCase());
      const descriptionMatches = project.description.toLowerCase().includes(searchQuery.toLowerCase());
      const techMatches = project.techStack.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchesSearch = titleMatches || descriptionMatches || techMatches;

      if (!matchesSearch) return false;
      if (activeFilter === "all") return true;

      const cat = getCategory(project);
      if (activeFilter === "mobile") return cat === "mobile";
      if (activeFilter === "terminal") return cat === "terminal";
      if (activeFilter === "web") return cat === "browser";
      return true;
    });
  }, [allProjects, searchQuery, activeFilter]);

  // Determine mockup category to render — uses shared getCategory helper
  const getMockupType = (project: Project): "mobile" | "terminal" | "browser" => {
    return getCategory(project);
  };

  const renderEmbeddedMockup = (project: Project, idx: number) => {
    const type = getMockupType(project);
    const accent = getAccentColor(project);
    const Icon = getProjectIcon(project);

    // 1. SMARTPHONE MOCKUP CARD (Option 1)
    if (type === "mobile") {
      return (
        <div className="relative w-full h-[380px] bg-[#0d0d0e] rounded-[2.3rem] border-2 border-zinc-800 p-2 flex flex-col overflow-hidden">
          
          {/* Bezel Camera Punchhole (Dynamic Island Style) */}
          <div className="absolute top-1.5 left-1/2 -translate-x-1/2 w-20 h-3.5 bg-black rounded-full z-20 flex items-center justify-between px-2.5 border border-zinc-900 shadow-inner">
            <span className="w-1 h-1 rounded-full bg-blue-600/60" />
            <span className="w-6 h-0.5 bg-zinc-900 rounded-full" />
            <span className="w-1 h-1 rounded-full bg-green-500/80 animate-pulse" />
          </div>
          
          {/* Floating metallic side keys */}
          <div className="absolute left-[-2px] top-16 w-[2px] h-8 bg-zinc-700/60 rounded-r" />
          <div className="absolute left-[-2px] top-26 w-[2px] h-8 bg-zinc-700/60 rounded-r" />
          <div className="absolute right-[-2px] top-20 w-[2px] h-10 bg-zinc-700/60 rounded-l" />

          {/* Internal Smartphone Screen */}
          <div className="flex-1 bg-[#050506] rounded-[1.9rem] overflow-hidden p-3.5 relative flex flex-col justify-between border border-zinc-955">
            {/* Soft Ambient Mesh */}
            <div className={`absolute inset-0 bg-gradient-to-br ${accent.gradient} opacity-25 pointer-events-none`} />

            {/* Cellular telemetry */}
            <div className="flex items-center justify-between text-[7px] text-zinc-400/80 font-mono tracking-wider pt-0.5 relative z-10">
              <span>9:41 AM</span>
              <div className="flex items-center gap-1">
                <Icon size={7} style={{ color: accent.base }} />
                <span>5G</span>
                <div className="w-3.5 h-1.8 border border-zinc-800 rounded-xs p-[1px] flex items-center">
                  <div className="w-full h-full bg-emerald-500 rounded-2xs" />
                </div>
              </div>
            </div>

            {/* Mobile App Header */}
            <div className="flex items-center gap-2 border-b border-zinc-900/60 pb-2 mt-3 relative z-10">
              <div className="w-6.5 h-6.5 rounded-lg bg-zinc-900/90 border border-zinc-800/80 flex items-center justify-center flex-shrink-0">
                <Icon size={12} style={{ color: accent.base }} />
              </div>
              <div className="min-w-0">
                <span className="text-[6.5px] font-mono tracking-widest text-zinc-500 uppercase block">MOBILE INTERFACE</span>
                <span className="text-[10px] font-bold text-zinc-100 block truncate font-display tracking-tight leading-none mt-0.5">{project.title}</span>
              </div>
            </div>

            {/* Smartphone Scroll Body */}
            <div className="flex-1 py-3 flex flex-col justify-between relative z-10 min-h-0">
              <div className="space-y-2.5">
                <div className="bg-zinc-950/60 backdrop-blur-xs border border-zinc-900 p-2.5 rounded-lg">
                  <span className="text-[6.5px] font-mono text-zinc-500 uppercase block mb-0.5">Description</span>
                  <p className="text-[9px] leading-relaxed text-zinc-300 font-sans line-clamp-3">
                    {project.description}
                  </p>
                </div>

                <div className="space-y-0.5">
                  <span className="text-[6.5px] font-mono text-zinc-500 uppercase block">Framework</span>
                  <div className="flex flex-wrap gap-1">
                    {project.techStack.map(tech => (
                      <span key={tech} className={`text-[7.5px] px-1.5 py-0.5 rounded border font-mono ${getTechColorClass(tech)}`}>
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Status Box */}
              <div className="bg-zinc-950/40 border border-zinc-900 p-2 rounded-lg flex items-center justify-between">
                <div className="flex items-center gap-1">
                  <span className="w-1 h-1 rounded-full bg-emerald-500" />
                  <span className="text-[7px] font-mono text-zinc-400 uppercase">SYS: ACTIVE</span>
                </div>
                <span className="text-[7px] font-mono text-zinc-500">NO. {String(idx + 1).padStart(2, "0")}</span>
              </div>
            </div>

            {/* Smartphone OS-native buttons */}
            <div className="flex gap-1.5 relative z-10 pt-1.5 border-t border-zinc-950">
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-1 bg-zinc-900 hover:bg-zinc-850 text-zinc-300 font-mono text-[8.5px] uppercase tracking-wider py-2 rounded-lg border border-zinc-850 hover:text-white transition-all"
                >
                  <FiGithubIcon size={10} /> Code
                </a>
              )}
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-1 font-mono text-[8.5px] font-bold uppercase tracking-wider py-2 rounded-lg transition-all"
                  style={{ backgroundColor: accent.base, color: '#000' }}
                >
                  Launch <ArrowUpRight size={8} />
                </a>
              )}
            </div>
            
            {/* Bottom iOS Home Indicator */}
            <div className="w-16 h-0.5 bg-zinc-800 rounded-full mx-auto mt-2 flex-shrink-0" />
          </div>
        </div>
      );
    }

    // 2. BROWSER MOCKUP CARD (Option 1)
    if (type === "browser") {
      return (
        <div className="relative w-full h-[380px] bg-stone-50 dark:bg-[#0c0c0d] rounded-2xl border border-stone-200 dark:border-zinc-800/80 p-3 flex flex-col overflow-hidden">
          
          {/* Header Chrome */}
          <div className="flex items-center justify-between border-b border-stone-200 dark:border-zinc-900 pb-2 mb-2">
            <div className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-[#ef4444]/80 block" />
              <span className="w-2 h-2 rounded-full bg-[#f59e0b]/80 block" />
              <span className="w-2 h-2 rounded-full bg-[#10b981]/80 block" />
            </div>
            
            {/* Address Bar */}
            <div className="bg-stone-100 dark:bg-zinc-900 border border-stone-200 dark:border-zinc-800/80 rounded px-2.5 py-0.5 text-[7px] font-mono text-stone-500 dark:text-zinc-400 tracking-wider truncate max-w-[150px] flex items-center gap-1">
              <Globe size={7} className="text-stone-400 dark:text-zinc-500" />
              <span>{project.id.replace(/ /g, "-").toLowerCase()}.app</span>
            </div>
            
            <div className="w-6 h-2" />
          </div>

          {/* Webpage Viewport */}
          <div className="flex-1 bg-[#FCFBF9] dark:bg-[#050506] rounded-lg border border-stone-150 dark:border-zinc-900/50 p-3.5 flex flex-col justify-between relative overflow-hidden">
            {/* Soft Ambient Mesh */}
            <div className={`absolute inset-0 bg-gradient-to-br ${accent.gradient} opacity-25 pointer-events-none`} />

            <div className="space-y-3 relative z-10">
              <div className="flex items-center justify-between bg-stone-100/50 dark:bg-zinc-900/50 border border-stone-200/40 dark:border-zinc-850 p-1.5 rounded-md">
                <div className="flex items-center gap-1">
                  <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: accent.base }} />
                  <span className="text-[6px] font-mono tracking-widest uppercase text-stone-400 dark:text-zinc-500">Live Station</span>
                </div>
                <span className="text-[7px] font-mono font-bold text-stone-600 dark:text-zinc-400">ONLINE</span>
              </div>

              {/* Meta details */}
              <div className="space-y-1">
                <h3 className="text-[12px] font-display font-bold text-stone-850 dark:text-zinc-150 leading-none">
                  {project.title}
                </h3>
                <p className="text-[9px] font-sans text-stone-600 dark:text-zinc-400 leading-relaxed line-clamp-3">
                  {project.description}
                </p>
              </div>

              {/* Technologies */}
              <div className="space-y-1">
                <span className="text-[6.5px] font-mono text-stone-400 dark:text-zinc-500 uppercase tracking-widest block">Systems</span>
                <div className="flex flex-wrap gap-1">
                  {project.techStack.map((tech) => (
                    <span
                      key={tech}
                      className={`font-mono text-[7.5px] px-1.5 py-0.5 rounded border font-medium ${getTechColorClass(tech)}`}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Viewport footer */}
            <div className="border-t border-stone-200/60 dark:border-zinc-900/80 pt-2 flex items-center justify-between relative z-10">
              <span className="font-mono text-[6.5px] text-stone-400 dark:text-zinc-500">SYS_INDEX: {String(idx + 1).padStart(2, "0")}</span>
              
              <div className="flex items-center gap-3">
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 font-mono text-[8.5px] uppercase tracking-wider text-stone-600 hover:text-stone-900 dark:text-zinc-450 dark:hover:text-white transition-colors"
                  >
                    <FiGithubIcon size={10} /> Source
                  </a>
                )}
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 font-mono text-[8.5px] uppercase tracking-wider font-bold transition-all"
                    style={{ color: accent.base }}
                  >
                    Launch <ArrowUpRight size={8} />
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      );
    }

    // 3. TERMINAL MOCKUP CARD (Option 1)
    return (
      <div className="relative w-full h-[380px] bg-[#070708] rounded-2xl border border-zinc-800/80 p-3 flex flex-col overflow-hidden">
        
        {/* Terminal Header */}
        <div className="flex items-center justify-between border-b border-zinc-900 pb-2 mb-2">
          <div className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-[#ef4444]/80 block" />
            <span className="w-2 h-2 rounded-full bg-[#f59e0b]/80 block" />
            <span className="w-2 h-2 rounded-full bg-[#10b981]/80 block" />
          </div>
          <div className="flex items-center gap-1 px-2 py-0.5 rounded bg-zinc-900 border border-zinc-850">
            <Terminal size={7} className="text-zinc-500" />
            <span className="text-[7px] text-zinc-400">bash • {project.id.toLowerCase()}.py</span>
          </div>
          <div className="w-6" />
        </div>

        {/* Terminal logs */}
        <div className="flex-1 flex flex-col justify-between text-zinc-300 text-[9px] leading-relaxed p-1">
          <div className="space-y-3.5">
            <div className="space-y-0.5">
              <p className="text-zinc-500">$ python -m init</p>
              <p className="text-emerald-400/90">&gt; initialization successful. loading...</p>
            </div>

            {/* Output log details */}
            <div className="space-y-1.5 border-l border-indigo-500/30 pl-2">
              <div className="flex items-center gap-1.5">
                <span className="text-indigo-400 uppercase tracking-widest text-[7px] font-bold">[MODULE]</span>
                <span className="text-zinc-150 font-bold font-display text-[10px]">{project.title}</span>
              </div>
              <div>
                <p className="text-zinc-350 font-sans leading-relaxed line-clamp-3">
                  {project.description}
                </p>
              </div>
            </div>

            {/* Channels loaded */}
            <div className="space-y-1">
              <span className="text-zinc-500 uppercase tracking-widest text-[6.5px] block">[SYSTEMS]</span>
              <div className="flex flex-wrap gap-1 font-mono">
                {project.techStack.map(tech => (
                  <span key={tech} className={`text-[7.5px] px-1.5 py-0.5 rounded border ${getTechColorClass(tech)}`}>
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Terminal prompt footer */}
          <div className="space-y-2 pt-2 border-t border-zinc-900">
            <div className="flex items-center justify-between text-[7px] text-zinc-500 tracking-wider">
              <span>SYS: ONLINE</span>
              <span>NODE_{String(idx + 1).padStart(2, "0")}</span>
            </div>

            <div className="bg-zinc-950 p-2 rounded-lg border border-zinc-900 flex items-center justify-between flex-wrap gap-1.5">
              <div className="flex items-center gap-1 font-mono text-[8px]">
                <span className="text-emerald-500">$</span>
                <span className="text-zinc-300">run --status</span>
                <span className="w-1 h-2.5 bg-zinc-300 animate-pulse inline-block align-middle ml-0.5" />
              </div>

              <div className="flex items-center gap-2.5">
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-zinc-400 hover:text-white underline font-mono text-[8px] transition-colors"
                  >
                    [Code]
                  </a>
                )}
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline font-mono text-[8px] font-bold transition-all"
                    style={{ color: accent.base }}
                  >
                    [Live]
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-10">
      {/* ══════════════════════════════════════════════════════════════ */}
      {/* UNIFIED GLASS WORKSPACE CABINET CONSOLE */}
      {/* ══════════════════════════════════════════════════════════════ */}
      <div className="relative bg-stone-100/40 dark:bg-zinc-950/40 border border-stone-200/80 dark:border-white/10 rounded-[2rem] p-5 md:p-6 shadow-2xl backdrop-blur-xl transition-colors duration-300">
        
        {/* Glow telemetry line */}
        <div className="absolute top-0 left-20 right-20 h-[1px] bg-gradient-to-r from-transparent via-indigo-500/30 to-transparent" />
        
        {/* 1. Cabinet Dashboard Header Panel */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-stone-200 dark:border-zinc-900/80">
          
          {/* Telemetry Status Lights */}
          <div className="flex items-center gap-2.5">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <div>
              <span className="font-mono text-[8px] md:text-[9px] uppercase tracking-[0.18em] text-stone-400 dark:text-zinc-500 block leading-none">CORE SYSTEM // WORKSTATION</span>
              <span className="font-display font-semibold text-[11px] md:text-[13px] text-stone-850 dark:text-zinc-200 block mt-0.5">FEED: ACTIVE LAB</span>
            </div>
          </div>

          {/* Minimalist Glass Search Input */}
          <div className="relative flex-1 max-w-sm w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400 dark:text-zinc-500" size={11} />
            <input 
              type="text"
              placeholder="Search title, description or stack..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-stone-200/50 dark:bg-zinc-900/60 border border-stone-200 dark:border-zinc-800/80 rounded-xl pl-8 pr-4 py-2 text-[11px] text-stone-800 dark:text-zinc-100 placeholder-stone-500 dark:placeholder-zinc-500 focus:outline-none focus:border-indigo-500 dark:focus:border-indigo-500/60 backdrop-blur-xs transition-all font-mono"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[9px] font-mono text-stone-500 dark:text-zinc-500 hover:text-stone-800 dark:hover:text-white"
              >
                [clear]
              </button>
            )}
          </div>

          {/* Active Counters */}
          <div className="flex items-center gap-4 font-mono text-[8px] uppercase tracking-wider text-stone-400 dark:text-zinc-500 border-l border-stone-250 dark:border-zinc-800/60 pl-4 lg:block hidden">
            <p>ONLINE: <span className="text-emerald-500 font-bold font-mono">{filteredProjects.length} / {allProjects.length}</span></p>
          </div>
        </div>

        {/* 2. Sleek Filter Badges Selector Row */}
        <div className="flex flex-wrap items-center gap-2 py-4 border-b border-stone-200 dark:border-zinc-900/60 mb-6">
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
                className={`flex items-center gap-1 font-mono text-[8.5px] uppercase tracking-wider px-3 py-1 rounded-full border transition-all duration-300 ${
                  isActive 
                    ? "bg-zinc-900 text-white dark:bg-white dark:text-zinc-950 border-zinc-900 dark:border-white font-bold scale-[1.02] shadow-sm"
                    : "bg-stone-200/50 text-stone-600 border-stone-200 hover:bg-stone-200 dark:bg-zinc-900/30 dark:text-zinc-400 dark:border-zinc-800/60 dark:hover:bg-zinc-900/60"
                }`}
              >
                <FIcon size={9} />
                {filt.label}
              </button>
            );
          })}
        </div>

        {/* 3. The Grid Cabinet Layout */}
        {filteredProjects.length === 0 ? (
          <div className="py-16 text-center space-y-2 font-mono">
            <p className="text-zinc-500 text-[10px]">NO MODULES MATCHING SEARCH OR FILTERS FOUND</p>
            <button 
              onClick={() => { setSearchQuery(""); setActiveFilter("all"); }}
              className="text-[9px] text-indigo-500 hover:text-indigo-400 underline uppercase tracking-wider"
            >
              [Reset Workspace]
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project, idx) => (
                <TiltCard key={project.id} project={project}>
                  {renderEmbeddedMockup(project, idx)}
                </TiltCard>
              ))}
            </AnimatePresence>
          </div>
        )}

      </div>
    </div>
  );
}
