"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Sparkles, Coffee, Code2, PenTool } from "lucide-react";

const stickers = [
  { id: 1, text: "Handcrafted", icon: PenTool, x: "10vw", y: "20vh", rotate: -12, color: "#d1d5db" },
  { id: 2, text: "Fueled by Coffee", icon: Coffee, x: "80vw", y: "15vh", rotate: 8, color: "#d1d5db" },
  { id: 3, text: "Double tap me!", icon: Sparkles, x: "70vw", y: "75vh", rotate: -5, color: "#d1d5db" },
  { id: 4, text: "Creative Dev", icon: Code2, x: "15vw", y: "85vh", rotate: 15, color: "#d1d5db" },
];

export default function DraggableStickers() {
  const [visibleStickers, setVisibleStickers] = useState(stickers);

  return (
    <div className="absolute inset-0 pointer-events-none z-[100] overflow-hidden">
      {visibleStickers.map((sticker) => {
        const Icon = sticker.icon;
        return (
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
            className="pointer-events-auto cursor-grab active:cursor-grabbing flex flex-col items-center justify-center p-4 drop-shadow-md"
          >
            <Icon size={48} strokeWidth={1.5} color={sticker.color} className="mb-2 opacity-80" />
            <span className="font-handwriting text-2xl" style={{ color: sticker.color }}>{sticker.text}</span>
          </motion.div>
        );
      })}
    </div>
  );
}
