"use client";
import Spline from "@splinetool/react-spline";

export default function SplineScene() {
  return (
    <div className="w-full h-full min-h-[400px] sm:min-h-[600px] flex items-center justify-center relative cursor-pointer">
      <Spline 
        scene="https://prod.spline.design/6Wq1Q7YGyM-iab9i/scene.splinecode" 
        className="w-full h-full drop-shadow-2xl"
      />
      
      <div className="absolute bottom-4 right-4 bg-[var(--surface-secondary)]/80 backdrop-blur-md px-4 py-2 rounded-full border border-[var(--border)] shadow-sm pointer-events-none">
        <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[var(--text-secondary)]">Drag to rotate • Scroll to zoom</span>
      </div>
    </div>
  );
}
