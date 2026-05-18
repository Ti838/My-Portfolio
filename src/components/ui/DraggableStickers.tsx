"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Sparkles, Coffee, Code2, PenTool, Brain, Music } from "lucide-react";

// Beautiful scrapbook-style die-cut stickers with vibrant colors
const stickers = [
  { 
    id: 1, 
    text: "Handcrafted 🎨", 
    icon: PenTool, 
    x: "8vw", 
    y: "18vh", 
    rotate: -12, 
    bgColor: "#D45B45", // Coral Red
    textColor: "#ffffff",
    borderColor: "#ffffff"
  },
  { 
    id: 2, 
    text: "Fueled by Coffee ☕", 
    icon: Coffee, 
    x: "80vw", 
    y: "14vh", 
    rotate: 10, 
    bgColor: "#5C4033", // Coffee Brown
    textColor: "#FAF7F2",
    borderColor: "#ffffff"
  },
  { 
    id: 3, 
    text: "Double tap me! ✨", 
    icon: Sparkles, 
    x: "48vw", 
    y: "15vh", 
    rotate: -5, 
    bgColor: "#F5B041", // Sunshine Yellow
    textColor: "#1A1714",
    borderColor: "#ffffff"
  },
  { 
    id: 4, 
    text: "Creative Dev 💻", 
    icon: Code2, 
    x: "8vw", 
    y: "74vh", 
    rotate: 15, 
    bgColor: "#2E86C1", // Soft Blue
    textColor: "#ffffff",
    borderColor: "#ffffff"
  },
  { 
    id: 5, 
    text: "AI & ML 🧠", 
    icon: Brain, 
    x: "82vw", 
    y: "76vh", 
    rotate: -8, 
    bgColor: "#8E44AD", // Deep Purple
    textColor: "#ffffff",
    borderColor: "#ffffff"
  },
  { 
    id: 6, 
    text: "Vocalist 🎤", 
    icon: Music, 
    x: "52vw", 
    y: "78vh", 
    rotate: 12, 
    bgColor: "#E74C3C", // Red
    textColor: "#ffffff",
    borderColor: "#ffffff"
  },
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
            transition={{ type: "spring", bounce: 0.5, delay: sticker.id * 0.15 }}
            style={{
              position: "absolute",
              left: sticker.x,
              top: sticker.y,
              rotate: sticker.rotate,
              backgroundColor: sticker.bgColor,
              color: sticker.textColor,
              borderColor: sticker.borderColor,
            }}
            className="pointer-events-auto cursor-grab active:cursor-grabbing flex items-center gap-2 px-4 py-2 rounded-xl border-4 shadow-lg shadow-black/30 font-handwriting select-none"
          >
            <Icon size={20} strokeWidth={2.5} />
            <span className="text-xl md:text-2xl pt-0.5 tracking-wide">{sticker.text}</span>
          </motion.div>
        );
      })}
    </div>
  );
}
