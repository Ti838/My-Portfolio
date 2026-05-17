"use client";

import { useEffect, useRef } from "react";
import { motion, useAnimationFrame, useMotionValue, useTransform } from "framer-motion";

const lyrics = [
  "🎵 I write code like I write music — in the key of clarity.",
  "🎸 Almost heaven, Bangladesh hills —",
  "🎤 Still composing. Still building. Still in love with both.",
  "🎵 Every bug fixed is a note resolved.",
  "🎸 The best apps hum with quiet elegance.",
  "🎤 Ship it. Sing it. Ship it again.",
  "🎵 Code is poetry. Silence is design.",
];

export default function LyricTicker() {
  const baseX = useMotionValue(0);
  const speed = 0.4; // px per frame
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useAnimationFrame(() => {
    const container = containerRef.current;
    const content = contentRef.current;
    if (!container || !content) return;

    const contentWidth = content.scrollWidth / 2;
    baseX.set(baseX.get() - speed);

    if (Math.abs(baseX.get()) >= contentWidth) {
      baseX.set(0);
    }
  });

  const x = useTransform(baseX, (v) => `${v}px`);
  const repeated = [...lyrics, ...lyrics];

  return (
    <div className="w-full overflow-hidden py-4 border-t border-b border-white/5 my-12">
      <motion.div ref={contentRef} style={{ x }} className="flex items-center whitespace-nowrap will-change-transform">
        {repeated.map((lyric, i) => (
          <span key={i} className="flex items-center">
            <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-ethereal-text-3 px-8">
              {lyric}
            </span>
            <span className="text-ethereal-text-3/30 text-xs">✦</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}
