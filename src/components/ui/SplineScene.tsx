"use client";
import Spline from "@splinetool/react-spline";
import { useEffect, useState } from "react";

export default function SplineScene() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <div className="w-full h-full min-h-[400px] sm:min-h-[600px] flex items-center justify-center relative cursor-pointer">
      {isMounted ? (
        <Spline 
          scene="https://prod.spline.design/31HP6oZKpT96998E/scene.splinecode" 
          className="w-full h-full drop-shadow-2xl"
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center animate-pulse bg-[var(--surface-secondary)]/50 rounded-[32px] text-[var(--text-muted)] font-mono text-xs">
          Loading 3D Scene...
        </div>
      )}
      
      <div className="absolute bottom-4 right-4 bg-[var(--surface-secondary)]/80 backdrop-blur-md px-4 py-2 rounded-full border border-[var(--border)] shadow-sm pointer-events-none">
        <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[var(--text-secondary)]">Drag to rotate • Scroll to zoom</span>
      </div>
    </div>
  );
}
