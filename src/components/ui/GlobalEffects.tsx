"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function GlobalEffects() {
  const [taps, setTaps] = useState<{ id: number; x: number; y: number }[]>([]);

  useEffect(() => {
    // ── Audio Context setup for a satisfying "pop" sound ──
    const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
    const ctx = new AudioContext();

    const playPop = () => {
      if (ctx.state === "suspended") ctx.resume();
      
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      
      osc.type = "sine";
      
      // Quick pitch drop for a "pop" sound
      osc.frequency.setValueAtTime(800, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(100, ctx.currentTime + 0.05);
      
      // Volume envelope
      gain.gain.setValueAtTime(0.3, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.05);
      
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.05);
    };

    const handleClick = (e: MouseEvent) => {
      // Don't trigger on actual links/buttons if we don't want to interfere, 
      // but Jackie Zhang's does it everywhere. We'll do it everywhere!
      const id = Date.now();
      setTaps((prev) => [...prev.slice(-4), { id, x: e.clientX, y: e.clientY }]);
      
      // Play sound
      playPop();
    };

    window.addEventListener("click", handleClick);
    return () => {
      window.removeEventListener("click", handleClick);
      ctx.close();
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden">
      <AnimatePresence>
        {taps.map((tap) => (
          <motion.div
            key={tap.id}
            initial={{ scale: 0, opacity: 0.8, rotate: -20 }}
            animate={{ scale: 1.5, opacity: 0, rotate: 20 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="absolute -translate-x-1/2 -translate-y-1/2 text-ethereal-accent font-handwriting text-3xl font-bold"
            style={{ left: tap.x, top: tap.y }}
            onAnimationComplete={() => {
              setTaps((prev) => prev.filter((t) => t.id !== tap.id));
            }}
          >
            {/* Cute hand-drawn spark/star */}
            ✧
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
