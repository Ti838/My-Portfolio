"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function GlobalEffects() {
  const [taps, setTaps] = useState<{ id: number; x: number; y: number }[]>([]);
  const [selectionEffect, setSelectionEffect] = useState<{ id: number; x: number; y: number; text: string } | null>(null);

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

    const playMemeSound = () => {
      if (ctx.state === "suspended") ctx.resume();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.type = "triangle";
      
      // A little melodic jingle for text selection
      osc.frequency.setValueAtTime(440, ctx.currentTime);
      osc.frequency.setValueAtTime(554, ctx.currentTime + 0.1);
      osc.frequency.setValueAtTime(659, ctx.currentTime + 0.2);
      
      gain.gain.setValueAtTime(0, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.2, ctx.currentTime + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.4);
      
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.4);
    };

    const handleClick = (e: MouseEvent) => {
      const id = Date.now();
      setTaps((prev) => [...prev.slice(-4), { id, x: e.clientX, y: e.clientY }]);
      playPop();
    };

    const handleSelection = () => {
      const selection = window.getSelection();
      if (selection && selection.toString().trim().length > 3) {
        const range = selection.getRangeAt(0);
        const rect = range.getBoundingClientRect();
        
        setSelectionEffect({
          id: Date.now(),
          x: rect.left + rect.width / 2,
          y: rect.top - 20, // slightly above selection
          text: selection.toString().trim()
        });
        
        playMemeSound();
        
        // Auto hide after 3 seconds
        setTimeout(() => setSelectionEffect(null), 3000);
      } else {
        setSelectionEffect(null);
      }
    };

    window.addEventListener("click", handleClick);
    document.addEventListener("selectionchange", handleSelection);
    
    return () => {
      window.removeEventListener("click", handleClick);
      document.removeEventListener("selectionchange", handleSelection);
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
            ✧
          </motion.div>
        ))}
      </AnimatePresence>

      <AnimatePresence>
        {selectionEffect && (
          <motion.div
            key={selectionEffect.id}
            initial={{ scale: 0, y: 20, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0, y: -20, opacity: 0 }}
            transition={{ type: "spring", bounce: 0.5 }}
            className="absolute -translate-x-1/2 -translate-y-full pointer-events-none drop-shadow-2xl"
            style={{ left: selectionEffect.x, top: selectionEffect.y }}
          >
            <div className="relative">
              <div className="bg-ethereal-accent text-white px-3 py-2 rounded-xl text-xs font-mono font-bold shadow-xl border-2 border-white/20 mb-2 rotate-[-3deg]">
                nice selection! 🎵
              </div>
              {/* Using a placeholder meme image (a cat or something) */}
              <img 
                src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExMDJmODc3MzMwOTYzZDMxZjUzZjQwMjQ5Zjg0OGJiMzYzMzExMmEyMSZlcD12MV9pbnRlcm5hbF9naWZzX2dpZklkJmN0PWc/MDJ9CRV1424LbsL38f/giphy.gif" 
                alt="meme" 
                className="w-24 h-24 object-cover rounded-full border-4 border-white shadow-2xl mx-auto rotate-6"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
