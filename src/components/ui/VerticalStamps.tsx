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

export default function VerticalStamps() {
  return (
    <div className="absolute left-0 top-32 bottom-0 w-16 md:w-20 hidden md:flex flex-col items-center py-8 gap-8 overflow-hidden pointer-events-none z-0 opacity-40">
      {/* Infinite vertical scroll effect using framer motion */}
      <motion.div
        animate={{ y: ["0%", "-50%"] }}
        transition={{ repeat: Infinity, duration: 40, ease: "linear" }}
        className="flex flex-col items-center gap-8"
      >
        {[...stamps, ...stamps, ...stamps].map((stamp, i) => {
          const Icon = stamp.icon;
          return (
            <div
              key={i}
              className="relative w-12 h-12 md:w-14 md:h-14 flex items-center justify-center p-2"
              style={{
                color: STAMP_COLOR,
                rotate: `${(i % 2 === 0 ? 1 : -1) * (Math.random() * 6 + 2)}deg`,
              }}
            >
              {/* Hand-drawn style border for the stamp */}
              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                <path
                  d="M 5,5 Q 50,0 95,5 Q 100,50 95,95 Q 50,100 5,95 Q 0,50 5,5 Z"
                  fill="none"
                  stroke={STAMP_COLOR}
                  strokeWidth="4"
                  strokeDasharray="8 4"
                />
              </svg>
              <Icon size={24} strokeWidth={2.5} className="relative z-10" />
            </div>
          );
        })}
      </motion.div>
    </div>
  );
}
