"use client";
import React, { useState, useEffect } from "react";
import ResumeBuilder from "@/components/ResumeBuilder";
import SiteEditor from "@/components/SiteEditor";
import { FiEdit3, FiFileText, FiLogOut } from "react-icons/fi";

export default function AdminDashboard({ initialData }: { initialData: any }) {
  const [activeTab, setActiveTab] = useState<"resume" | "site">("site");
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  return (
    <div className="flex h-screen bg-slate-50 dark:bg-slate-950 overflow-hidden font-sans">
      {/* Sidebar */}
      <aside className="w-64 border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col shrink-0">
        <div className="p-6 border-b border-slate-100 dark:border-slate-800/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent-500 to-accent-600 flex items-center justify-center text-white shadow-lg shadow-accent-500/20">
              <span className="font-display font-black text-lg">TB</span>
            </div>
            <div>
              <h1 className="font-display font-bold text-slate-900 dark:text-white leading-tight">Admin</h1>
              <p className="text-[10px] text-slate-400 font-medium uppercase tracking-widest">Management</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-2 mt-4">
          <SideButton 
            active={activeTab === "site"} 
            onClick={() => setActiveTab("site")}
            icon={<FiEdit3 size={18} />}
            label="Portfolio Editor"
            desc="Manage content & stats"
          />
          <SideButton 
            active={activeTab === "resume"} 
            onClick={() => setActiveTab("resume")}
            icon={<FiFileText size={18} />}
            label="Resume Builder"
            desc="Generate ATS-friendly CV"
          />
        </nav>

        <div className="p-4 border-t border-slate-100 dark:border-slate-800/50 space-y-2">
           <button 
            onClick={() => window.open("/", "_blank")}
            className="w-full flex items-center justify-between px-4 py-3 rounded-xl text-xs font-bold text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all border border-transparent hover:border-slate-200 dark:hover:border-slate-700"
          >
            <span>Preview Site</span>
            <FiLogOut className="rotate-180" />
          </button>
          <button 
            onClick={() => window.location.href = "/"}
            className="w-full flex items-center justify-between px-4 py-3 rounded-xl text-xs font-bold text-red-500 hover:bg-red-500/5 transition-all"
          >
            <span>Exit Admin</span>
            <FiLogOut />
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 relative overflow-hidden flex flex-col">
        <header className="h-16 border-b border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 backdrop-blur-xl flex items-center justify-between px-8 shrink-0 z-10">
          <h2 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-tight">
            {activeTab === "site" ? "Content Management" : "Resume Generation Engine"}
          </h2>
          <div className="flex items-center gap-3">
            <div className="px-3 py-1 rounded-full bg-green-500/10 text-green-500 text-[10px] font-bold flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
              System Live
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto custom-scrollbar bg-slate-50/50 dark:bg-slate-950/50 p-8">
          {activeTab === "site" ? (
            <SiteEditor initialData={initialData} />
          ) : (
            <ResumeBuilder initialData={initialData.resumeInitial} />
          )}
        </div>
      </main>
    </div>
  );
}

function SideButton({ active, onClick, icon, label, desc }: { active: boolean, onClick: () => void, icon: React.ReactNode, label: string, desc: string }) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all group ${
        active 
          ? "bg-accent-500 text-white shadow-lg shadow-accent-500/25 translate-x-1" 
          : "text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800/50 hover:text-slate-900 dark:hover:text-white"
      }`}
    >
      <div className={`${active ? "text-white" : "text-slate-400 group-hover:text-accent-500"} transition-colors`}>
        {icon}
      </div>
      <div className="text-left">
        <div className="text-sm font-bold leading-none">{label}</div>
        <div className={`text-[10px] mt-1 font-medium ${active ? "text-accent-100" : "text-slate-400"}`}>{desc}</div>
      </div>
    </button>
  );
}
