"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const beliefs = [
  {
    id: 1,
    text: "Tirelessly pursue clarity.",
    sub: "Great code reads like prose — obvious, elegant, inevitable.",
    style: "lined",   // notebook lines
    rotate: "-2deg",
    accent: "#6366f1",
  },
  {
    id: 2,
    text: "Design for moments.",
    sub: "Interfaces are felt before they're understood. Make every millisecond count.",
    style: "grid",    // blueprint grid
    rotate: "1.5deg",
    accent: "#8b5cf6",
  },
  {
    id: 3,
    text: "Software should empower.",
    sub: "Technology's highest calling is amplifying human potential — not replacing it.",
    style: "plain",   // parchment
    rotate: "-1deg",
    accent: "#a78bfa",
  },
];

function PaperLines({ style }: { style: string }) {
  if (style === "lined") {
    return (
      <div className="absolute inset-0 pointer-events-none opacity-[0.07]">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-full border-b border-current"
            style={{ top: `${(i + 1) * 5}%` }}
          />
        ))}
        <div className="absolute left-12 top-0 bottom-0 border-l border-red-400/30 w-0" />
      </div>
    );
  }
  if (style === "grid") {
    return (
      <div className="absolute inset-0 pointer-events-none opacity-[0.06]"
        style={{
          backgroundImage: `linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)`,
          backgroundSize: "32px 32px",
        }}
      />
    );
  }
  return null;
}

export default function StackedBeliefs() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Each card enters at different scroll points
  const card1Y = useTransform(scrollYProgress, [0, 0.3, 0.6], [120, 0, 0]);
  const card1Opacity = useTransform(scrollYProgress, [0, 0.25], [0, 1]);

  const card2Y = useTransform(scrollYProgress, [0.15, 0.45, 0.7], [120, 0, 0]);
  const card2Opacity = useTransform(scrollYProgress, [0.15, 0.4], [0, 1]);

  const card3Y = useTransform(scrollYProgress, [0.35, 0.6, 1], [120, 0, 0]);
  const card3Opacity = useTransform(scrollYProgress, [0.35, 0.55], [0, 1]);

  const transforms = [
    { y: card1Y, opacity: card1Opacity },
    { y: card2Y, opacity: card2Opacity },
    { y: card3Y, opacity: card3Opacity },
  ];

  return (
    <section ref={containerRef} className="py-32 md:py-48 px-6 relative overflow-hidden">
      <div className="max-w-[1400px] mx-auto">
        {/* Section header */}
        <div className="flex flex-col items-center text-center mb-24">
          <span className="section-label mb-4">00 // The Principles</span>
          <h2 className="font-display text-4xl md:text-6xl text-ethereal-text-1 leading-tight max-w-2xl">
            3 things I strongly believe in.
          </h2>
        </div>

        {/* Stacked cards */}
        <div className="relative max-w-3xl mx-auto" style={{ height: "560px" }}>
          {beliefs.map((belief, i) => (
            <motion.div
              key={belief.id}
              style={{
                y: transforms[i].y,
                opacity: transforms[i].opacity,
                rotate: belief.rotate,
                zIndex: i + 1,
              }}
              className="absolute inset-x-0"
              whileHover={{
                rotate: "0deg",
                scale: 1.02,
                zIndex: 10,
                transition: { duration: 0.3 },
              }}
            >
              <div
                className="relative rounded-3xl p-10 md:p-14 overflow-hidden shadow-2xl cursor-pointer"
                style={{
                  background: i === 0
                    ? "rgba(255,255,255,0.04)"
                    : i === 1
                    ? "rgba(99,102,241,0.06)"
                    : "rgba(139,92,246,0.05)",
                  border: `1px solid ${belief.accent}25`,
                  backdropFilter: "blur(20px)",
                  top: `${i * 40}px`,
                }}
              >
                <PaperLines style={belief.style} />

                {/* Paper clip decoration */}
                {i === 2 && (
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    <div className="w-8 h-8 rounded-full border-2 border-current opacity-20" />
                  </div>
                )}

                {/* Number */}
                <div className="flex items-center gap-4 mb-8">
                  <span
                    className="font-mono text-[10px] uppercase tracking-[0.3em]"
                    style={{ color: belief.accent }}
                  >
                    {String(i + 1).padStart(2, "0")} ——
                  </span>
                </div>

                {/* Belief text */}
                <p className="font-display italic text-3xl md:text-4xl text-ethereal-text-1 leading-snug mb-6">
                  &ldquo;{belief.text}&rdquo;
                </p>
                <p className="font-sans text-ethereal-text-2 text-sm leading-relaxed max-w-xl">
                  {belief.sub}
                </p>

                {/* Bottom accent bar */}
                <div
                  className="absolute bottom-0 left-0 right-0 h-[2px] opacity-30"
                  style={{ background: `linear-gradient(90deg, transparent, ${belief.accent}, transparent)` }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
