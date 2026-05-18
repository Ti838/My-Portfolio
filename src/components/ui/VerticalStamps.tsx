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
  // Generate enough stamps to fill a tall screen vertically (static)
  const displayStamps = [...stamps, ...stamps, ...stamps, ...stamps];

  return (
    <div 
      className={`fixed ${position === "left" ? "left-0 border-r" : "right-0 border-l"} top-0 bottom-0 w-12 md:w-16 hidden md:flex flex-col items-center py-8 gap-12 overflow-hidden z-[40]`}
      style={{ backgroundColor: "#FAF7F2" }}
    >
      <div className="flex flex-col items-center gap-12 h-full opacity-30">
        {displayStamps.map((stamp, i) => {
          const Icon = stamp.icon;
          return (
            <div
              key={i}
              className="relative w-10 h-10 md:w-12 md:h-12 flex items-center justify-center p-1.5"
              style={{
                color: "#D45B45", 
                rotate: `${(i % 2 === 0 ? 1 : -1) * (Math.random() * 8 + 4)}deg`,
              }}
            >
              {/* Hand-drawn style border for the stamp */}
              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                <path
                  d="M 5,5 Q 50,0 95,5 Q 100,50 95,95 Q 50,100 5,95 Q 0,50 5,5 Z"
                  fill="none"
                  stroke="#D45B45"
                  strokeWidth="3"
                  strokeDasharray="6 6"
                />
              </svg>
              <Icon size={20} strokeWidth={2} className="relative z-10" />
            </div>
          );
        })}
      </div>
    </div>
  );
}
