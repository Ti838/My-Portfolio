"use client";

import { motion } from "framer-motion";
import { useState } from "react";

const stickers = [
  { id: 1, text: "✦ Handcrafted", x: "10vw", y: "20vh", rotate: -12, color: "#ef4444" },
  { id: 2, text: "☕ Fueled by Coffee", x: "80vw", y: "15vh", rotate: 8, color: "#8b5cf6" },
  { id: 3, text: "Double tap me!", x: "70vw", y: "75vh", rotate: -5, color: "#10b981" },
  { id: 4, text: "Creative Dev", x: "15vw", y: "85vh", rotate: 15, color: "#f59e0b" },
];

export default function DraggableStickers() {
  const [visibleStickers, setVisibleStickers] = useState(stickers);

  return (
    <div className="fixed inset-0 pointer-events-none z-[100] overflow-hidden">
      {visibleStickers.map((sticker) => (
        <motion.div
          key={sticker.id}
          drag
          dragMomentum={false}
          onDoubleClick={() => setVisibleStickers(prev => prev.filter(s => s.id !== sticker.id))}
          whileHover={{ scale: 1.1, rotate: 0 }}
          whileDrag={{ scale: 1.15, rotate: 0, zIndex: 999 }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", bounce: 0.5, delay: sticker.id * 0.2 }}
          style={{
            position: "absolute",
            left: sticker.x,
            top: sticker.y,
            rotate: sticker.rotate,
          }}
          className="pointer-events-auto cursor-grab active:cursor-grabbing font-handwriting text-2xl px-4 py-2 bg-white text-black shadow-lg"
        >
          {/* Jagged tape effect */}
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-12 h-6 bg-white/40 backdrop-blur-sm" style={{ clipPath: "polygon(0 10%, 10% 0, 20% 10%, 30% 0, 40% 10%, 50% 0, 60% 10%, 70% 0, 80% 10%, 90% 0, 100% 10%, 100% 90%, 90% 100%, 80% 90%, 70% 100%, 60% 90%, 50% 100%, 40% 90%, 30% 100%, 20% 90%, 10% 100%, 0 90%)" }} />
          <span style={{ color: sticker.color }}>{sticker.text}</span>
        </motion.div>
      ))}
    </div>
  );
}
