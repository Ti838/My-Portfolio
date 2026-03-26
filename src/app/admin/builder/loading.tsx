import React from "react";
import { FiLoader } from "react-icons/fi";

export default function AdminLoading() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col items-center justify-center space-y-4">
      <div className="relative">
        <div className="w-16 h-16 border-4 border-accent-500/20 border-t-accent-500 rounded-full animate-spin"></div>
        <FiLoader className="absolute inset-0 m-auto text-accent-500 animate-pulse" size={24} />
      </div>
      <div className="text-center space-y-1">
        <h2 className="font-display font-bold text-slate-900 dark:text-white">Loading Admin Console</h2>
        <p className="text-xs text-slate-500 animate-pulse">Fetching your portfolio data...</p>
      </div>
    </div>
  );
}
