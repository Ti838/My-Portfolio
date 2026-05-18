"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function GlobalEffects() {
  const [taps, setTaps] = useState<{ id: number; x: number; y: number }[]>([]);
  const [selectionEffect, setSelectionEffect] = useState<{ id: number; x: number; y: number; text: string } | null>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const id = Date.now();
      setTaps((prev) => [...prev.slice(-4), { id, x: e.clientX, y: e.clientY }]);
    };

    window.addEventListener("click", handleClick);
    
    return () => {
      window.removeEventListener("click", handleClick);
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
    </div>
  );
}
