"use client";

import { motion } from "framer-motion";
import { Coffee, Code, Sparkles, Feather, Hash, Zap } from "lucide-react";

const STAMP_COLOR = "#ef4444"; // Red color from the screenshot

const stamps = [
  { id: 1, icon: Coffee },
  { id: 2, icon: Code },
  { id: 3, icon: Sparkles },
  { id: 4, icon: Feather },
  { id: 5, icon: Hash },
  { id: 6, icon: Zap },
];

export default function VerticalStamps({ position = "left" }: { position?: "left" | "right" }) {
  return (
    <div 
      className={`fixed ${position === "left" ? "left-0 border-r" : "right-0 border-l"} top-0 bottom-0 w-12 md:w-16 hidden md:flex flex-col items-center py-8 gap-8 overflow-hidden z-50`}
      style={{ backgroundColor: "#D45B45", borderColor: "rgba(0,0,0,0.1)" }}
    >
      {/* Infinite vertical scroll effect using framer motion */}
      <motion.div
        animate={{ y: ["0%", "-50%"] }}
        transition={{ repeat: Infinity, duration: 40, ease: "linear" }}
        className="flex flex-col items-center gap-6"
      >
        {[...stamps, ...stamps, ...stamps].map((stamp, i) => {
          const Icon = stamp.icon;
          return (
            <div
              key={i}
              className="relative w-10 h-10 md:w-12 md:h-12 flex items-center justify-center p-1.5"
              style={{
                color: "#FAF7F2", // Paper white
                rotate: `${(i % 2 === 0 ? 1 : -1) * (Math.random() * 6 + 2)}deg`,
              }}
            >
              {/* Hand-drawn style border for the stamp */}
              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                <path
                  d="M 5,5 Q 50,0 95,5 Q 100,50 95,95 Q 50,100 5,95 Q 0,50 5,5 Z"
                  fill="none"
                  stroke="#FAF7F2"
                  strokeWidth="5"
                  strokeDasharray="10 4"
                />
              </svg>
              <Icon size={20} strokeWidth={2.5} className="relative z-10" />
            </div>
          );
        })}
      </motion.div>
    </div>
  );
}
