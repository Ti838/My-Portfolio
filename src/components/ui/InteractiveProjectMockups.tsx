"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Code2, Globe, Heart, Shield, Terminal, ArrowRight, Activity, MapPin } from "lucide-react";
import { FiGithub } from "react-icons/fi";

interface Project {
  id: string;
  title: string;
  description: string;
  techStack: string[];
  githubUrl?: string;
  liveUrl?: string;
}

export default function InteractiveProjectMockups({ projects }: { projects: Project[] }) {
  const featured = projects.slice(0, 3); // Get the top 3 featured projects
  const [activeIdx, setActiveIdx] = useState(0);
  const currentProject = featured[activeIdx] || featured[0];

  // Custom high-fidelity mockups designed with pure CSS & HTML for premium visual wow-factor!
  const renderMockup = (projectId: string, type: "left" | "right") => {
    if (type === "left") {
      // Laptop/Tablet/Dashboard Mockup
      return (
        <div className="w-full h-full bg-[#FCFBF9] text-[#1A1714] font-sans p-6 flex flex-col justify-between rounded-2xl shadow-inner border border-stone-200 relative overflow-hidden">
          {/* Dashboard Header */}
          <div className="flex items-center justify-between border-b border-stone-100 pb-3">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-red-400" />
              <span className="w-3 h-3 rounded-full bg-yellow-400" />
              <span className="w-3 h-3 rounded-full bg-green-400" />
            </div>
            <div className="bg-stone-100 rounded-md px-3 py-1 text-[9px] font-mono text-stone-400 tracking-wider">
              {projectId === "philomedis-mobile" ? "hospital-portal.med" : "admin-dashboard.local"}
            </div>
            <div className="w-6 h-6 rounded-full bg-stone-200" />
          </div>

          {/* Dashboard Content based on Project */}
          {projectId === "philomedis-mobile" ? (
            <div className="flex-1 py-4 flex flex-col gap-3">
              <div className="flex items-center justify-between bg-stone-50 border border-stone-100 p-3 rounded-xl">
                <div>
                  <h4 className="text-[10px] font-mono text-stone-400 uppercase tracking-wider">Active Admissions</h4>
                  <p className="text-xl font-display font-semibold mt-0.5">142 Patients</p>
                </div>
                <div className="px-2 py-1 rounded bg-[#E8856F]/20 text-[#D45B45] text-[9px] font-mono font-bold animate-pulse">LIVE</div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div className="bg-[#FAF7F2] p-3 rounded-xl border border-stone-100">
                  <span className="text-[9px] font-mono text-stone-400 block">Emergency Beds</span>
                  <span className="text-sm font-bold text-stone-700 mt-1 block">85% Capacity</span>
                </div>
                <div className="bg-[#FAF7F2] p-3 rounded-xl border border-stone-100">
                  <span className="text-[9px] font-mono text-stone-400 block">Doctors Duty</span>
                  <span className="text-sm font-bold text-stone-700 mt-1 block">12 Active</span>
                </div>
              </div>
              <div className="bg-[#E8856F]/10 border border-[#E8856F]/20 p-2.5 rounded-lg flex items-center gap-2.5">
                <MapPin size={12} className="text-[#D45B45]" />
                <span className="text-[9px] font-mono text-stone-600">Ambulance #3 enroute to Emergency</span>
              </div>
            </div>
          ) : projectId === "speed-guard" ? (
            <div className="flex-1 py-4 flex flex-col gap-3">
              <div className="flex items-center justify-between bg-[#FCFBF9] border border-stone-100 p-3 rounded-xl">
                <div>
                  <h4 className="text-[10px] font-mono text-stone-400 uppercase tracking-wider">Tracking Terminal</h4>
                  <p className="text-sm font-bold mt-0.5">Location Guard Active</p>
                </div>
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
              </div>
              <div className="bg-stone-50 border border-stone-100 p-3 rounded-xl space-y-2">
                <div className="flex justify-between text-[9px] font-mono text-stone-400 border-b border-stone-100 pb-1">
                  <span>SYSTEM LOG</span>
                  <span>02:14:59</span>
                </div>
                <div className="font-mono text-[8px] text-stone-600 space-y-1">
                  <p className="text-emerald-600">&gt; GPS Initialized: Lock acquired</p>
                  <p>&gt; Velocity limit set: 60 km/h</p>
                  <p>&gt; Guard system: Safe mode enabled</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex-1 py-4 flex flex-col gap-3">
              <div className="flex items-center justify-between bg-stone-50 p-3 rounded-xl border border-stone-100">
                <div>
                  <h4 className="text-[10px] font-mono text-stone-400 uppercase tracking-wider">System Allocation</h4>
                  <p className="text-sm font-bold mt-0.5">Resident Database</p>
                </div>
                <span className="text-[9px] font-mono bg-stone-200 px-2 py-0.5 rounded text-stone-600">124 Rooms</span>
              </div>
              <div className="space-y-1.5">
                {[
                  { name: "John Doe", room: "A-204", status: "Paid", color: "text-emerald-600 bg-emerald-50" },
                  { name: "Alex Mercer", room: "B-102", status: "Pending", color: "text-amber-600 bg-amber-50" },
                ].map((row, i) => (
                  <div key={i} className="flex justify-between items-center text-[10px] bg-white border border-stone-100 p-2 rounded-lg">
                    <span className="font-medium text-stone-700">{row.name}</span>
                    <div className="flex items-center gap-2 font-mono">
                      <span>Room {row.room}</span>
                      <span className={`px-1.5 py-0.5 rounded text-[8px] font-bold ${row.color}`}>{row.status}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Footer Branding */}
          <div className="text-[8px] font-mono uppercase tracking-widest text-stone-400 mt-2 border-t border-stone-100 pt-2 flex justify-between">
            <span>Timon Biswas</span>
            <span>HCD · 2026</span>
          </div>
        </div>
      );
    } else {
      // Mobile mockup (Right side)
      return (
        <div className="w-full h-full bg-[#121212] text-white p-5 flex flex-col justify-between rounded-[2rem] border-4 border-[#222222] relative overflow-hidden shadow-2xl">
          {/* Top Notch */}
          <div className="absolute top-2 left-1/2 -translate-x-1/2 w-20 h-4 bg-[#222222] rounded-full z-20 flex items-center justify-center">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500/50 mr-2" />
            <span className="w-6 h-1 bg-[#1a1a1a] rounded" />
          </div>

          {/* Mobile Screen based on Project */}
          {projectId === "philomedis-mobile" ? (
            <div className="flex-1 pt-6 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono text-[#D45B45]">PHILOMEDIS</span>
                  <Activity size={14} className="text-[#D45B45] animate-pulse" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-lg font-display italic font-semibold leading-tight">Your Patient Care Hub</h3>
                  <p className="text-[9px] text-stone-400">Securely check schedules, emergency cases, and report patient updates directly from your mobile device.</p>
                </div>
              </div>
              <div className="bg-[#D45B45] rounded-xl p-3 text-center cursor-pointer hover:bg-[#E8856F] transition-colors mb-2">
                <span className="text-[10px] font-mono uppercase tracking-widest font-bold">Emergency Call</span>
              </div>
            </div>
          ) : projectId === "speed-guard" ? (
            <div className="flex-1 pt-6 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono text-[#E8856F]">SPEED GUARD</span>
                  <Shield size={14} className="text-[#E8856F]" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-lg font-display italic font-semibold leading-tight text-[#FAF7F2]">Safety Compass</h3>
                  <div className="bg-stone-900 border border-stone-800 p-3 rounded-xl text-center space-y-1">
                    <span className="text-[10px] font-mono text-stone-400 block">CURRENT VELOCITY</span>
                    <span className="text-3xl font-display font-bold text-[#E8856F]">48 <span className="text-xs font-sans font-normal text-stone-500">km/h</span></span>
                  </div>
                </div>
              </div>
              <div className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-lg p-2 text-center text-[8px] font-mono mb-2">
                &gt; SAFE TRAVEL THRESHOLD MAINTAINED
              </div>
            </div>
          ) : (
            <div className="flex-1 pt-6 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono text-stone-400">JERRY AI</span>
                  <Terminal size={14} className="text-[#D45B45]" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-lg font-display italic font-semibold leading-tight text-[#FAF7F2]">Voice Assistant</h3>
                  <div className="flex flex-col gap-2">
                    <div className="bg-stone-900 border border-stone-850 p-2.5 rounded-lg text-[9px] text-stone-300">
                      &quot;Jerry, launch the compiler&quot;
                    </div>
                    <div className="bg-[#D45B45]/20 border border-[#D45B45]/30 p-2.5 rounded-lg text-[9px] text-[#E8856F] text-right font-mono">
                      Launching environment... Done.
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex justify-center gap-1.5 mb-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#D45B45] animate-ping" />
                <span className="text-[8px] font-mono text-stone-500">AI LISTENING...</span>
              </div>
            </div>
          )}
        </div>
      );
    }
  };

  return (
    <div className="w-full flex flex-col gap-12">
      {/* Dynamic Projects Selector Tabs */}
      <div className="flex flex-wrap justify-center gap-3 relative z-20">
        {featured.map((proj, idx) => (
          <button
            key={proj.id}
            onClick={() => setActiveIdx(idx)}
            className={`px-6 py-2.5 rounded-full font-mono text-[10px] uppercase tracking-widest transition-all duration-500 border ${
              activeIdx === idx
                ? "bg-[var(--accent)] text-white border-[var(--accent)] shadow-lg shadow-[var(--accent)]/20 scale-105"
                : "bg-white/[0.02] text-[var(--text-secondary)] border-white/5 hover:border-[var(--accent)]/30 hover:text-[var(--text-primary)]"
            }`}
          >
            {proj.title}
          </button>
        ))}
      </div>

      {/* Floating Overlapping Scrapbook Mockups Section */}
      <div className="relative w-full max-w-5xl mx-auto h-[600px] md:h-[650px] flex items-center justify-center mt-6">
        
        {/* Background Aura */}
        <div className="absolute inset-0 bg-radial-gradient from-[var(--accent)]/5 to-transparent blur-[80px] pointer-events-none -z-10" />

        {/* LEFT MOCKUP: Tablet/Dashboard Card */}
        <motion.div
          key={`left-${currentProject.id}`}
          initial={{ opacity: 0, x: -100, y: 120, rotate: -8 }}
          animate={{ opacity: 1, x: -140, y: 100, rotate: -4 }}
          whileHover={{ rotate: -2, zIndex: 30, scale: 1.03 }}
          transition={{ type: "spring", stiffness: 80, damping: 15 }}
          className="hidden md:block absolute z-15 w-[260px] h-[340px] md:w-[320px] md:h-[400px] left-2 md:left-10 bottom-12 cursor-pointer origin-bottom-left"
        >
          {renderMockup(currentProject.id, "left")}
        </motion.div>

        {/* CENTER MOCKUP: Parchment / Lined Blueprint Note displaying current project details */}
        <motion.div
          key={`center-${currentProject.id}`}
          initial={{ opacity: 0, y: 150, rotate: 5 }}
          animate={{ opacity: 1, y: 0, rotate: -2 }}
          whileHover={{ rotate: 0, zIndex: 40, scale: 1.02 }}
          transition={{ type: "spring", stiffness: 90, damping: 14 }}
          className="absolute z-20 w-[280px] h-[360px] md:w-[340px] md:h-[420px] top-6 md:top-12 shadow-2xl cursor-pointer"
        >
          <div 
            className="w-full h-full p-8 flex flex-col justify-between relative shadow-black/40 rounded-xl"
            style={{
              backgroundColor: "#FCFAF6",
              backgroundImage: "url('https://www.transparenttextures.com/patterns/natural-paper.png')",
              color: "#1A1714",
              clipPath: "polygon(0 0, 100% 0, 100% 93%, 96% 100%, 92% 93%, 88% 100%, 84% 93%, 80% 100%, 76% 93%, 72% 100%, 68% 93%, 64% 100%, 60% 93%, 56% 100%, 52% 93%, 48% 100%, 44% 93%, 40% 100%, 36% 93%, 32% 100%, 28% 93%, 24% 100%, 20% 93%, 16% 100%, 12% 93%, 8% 100%, 4% 93%, 0 100%)"
            }}
          >
            {/* Blueprint Grid Lines overlay */}
            <div className="absolute inset-0 opacity-[0.06] pointer-events-none" 
              style={{
                backgroundImage: "linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)",
                backgroundSize: "20px 20px"
              }} 
            />

            {/* Red margin line */}
            <div className="absolute top-0 bottom-0 left-10 w-0.5 bg-red-400/50 pointer-events-none" />

            {/* Note Content */}
            <div className="relative z-10 pl-4 space-y-6">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-[#D45B45] font-bold">PROJECT PROFILE</span>
                <span className="font-mono text-[9px] uppercase tracking-widest text-stone-400">No. 0{activeIdx + 1}</span>
              </div>
              <div className="space-y-2">
                <h3 className="font-display italic text-3xl font-bold leading-tight">{currentProject.title}</h3>
                <p className="font-sans text-[11px] leading-relaxed text-stone-600 line-clamp-4">{currentProject.description}</p>
              </div>
              
              <div className="space-y-1.5">
                <span className="font-mono text-[9px] uppercase tracking-wider text-stone-400 block">Tech Stack</span>
                <div className="flex flex-wrap gap-1.5">
                  {currentProject.techStack.map((tech) => (
                    <span key={tech} className="font-mono text-[9px] px-2 py-0.5 rounded bg-stone-100 border border-stone-200 text-stone-600 font-medium">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Codebase / Live Demo buttons on the bottom */}
            <div className="relative z-10 pl-4 flex gap-4 border-t border-stone-150 pt-4 mb-8">
              {currentProject.githubUrl && (
                <a 
                  href={currentProject.githubUrl} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wider text-stone-700 hover:text-[#D45B45] transition-colors"
                >
                  <FiGithub size={12} /> Source
                </a>
              )}
              {currentProject.liveUrl && (
                <a 
                  href={currentProject.liveUrl} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wider text-stone-700 hover:text-[#D45B45] transition-colors"
                >
                  <Globe size={12} /> Live Demo
                </a>
              )}
            </div>

            {/* Ripped Paper Clip representation */}
            <div className="absolute -top-6 left-12 z-20" style={{ transform: "rotate(-10deg)" }}>
              <div className="w-5 h-14 rounded-full border-[4px] border-stone-300 shadow-sm" style={{ borderBottom: "none", borderBottomLeftRadius: 0, borderBottomRightRadius: 0, background: "linear-gradient(to right, #f4f4f5, #a1a1aa)" }} />
              <div className="w-2.5 h-10 rounded-full border-[4px] border-stone-400 absolute top-1.5 left-[3px]" style={{ borderTop: "none", borderTopLeftRadius: 0, borderTopRightRadius: 0 }} />
            </div>
          </div>
        </motion.div>

        {/* RIGHT MOCKUP: Dark Mobile Card */}
        <motion.div
          key={`right-${currentProject.id}`}
          initial={{ opacity: 0, x: 100, y: 120, rotate: 8 }}
          animate={{ opacity: 1, x: 140, y: 100, rotate: 6 }}
          whileHover={{ rotate: 3, zIndex: 30, scale: 1.03 }}
          transition={{ type: "spring", stiffness: 80, damping: 15 }}
          className="hidden md:block absolute z-15 w-[210px] h-[360px] md:w-[260px] md:h-[440px] right-2 md:right-10 bottom-6 cursor-pointer origin-bottom-right"
        >
          {renderMockup(currentProject.id, "right")}
        </motion.div>

      </div>
    </div>
  );
}
