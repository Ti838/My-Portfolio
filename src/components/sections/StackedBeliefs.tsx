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
                className="relative p-10 md:p-14 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)] cursor-pointer"
                style={{
                  background: i === 0
                    ? "#fdfbf7" // Spiral notebook white
                    : i === 1
                    ? "#d6d1c4" // Graph paper greyish brown
                    : "#b38c64", // Kraft paper brown
                  color: "#1a1a1a", // Dark text
                  borderTopLeftRadius: i === 0 ? '0px' : '4px',
                  borderTopRightRadius: i === 0 ? '0px' : '4px',
                  clipPath: i === 1 
                    ? "polygon(2% 0, 98% 2%, 100% 98%, 95% 100%, 85% 98%, 75% 100%, 65% 98%, 55% 100%, 45% 98%, 35% 100%, 25% 98%, 15% 100%, 5% 98%, 0 95%, 2% 80%, 0 60%, 2% 40%, 0 20%)" // Torn all around
                    : i === 0
                    ? "polygon(0 0, 100% 0, 100% 90%, 95% 100%, 90% 92%, 85% 98%, 80% 90%, 75% 100%, 70% 92%, 65% 98%, 60% 90%, 55% 100%, 50% 92%, 45% 98%, 40% 90%, 35% 100%, 30% 92%, 25% 98%, 20% 90%, 15% 100%, 10% 92%, 5% 98%, 0 90%)" // Torn bottom
                    : "none",
                  top: `${i * 40}px`,
                }}
              >
                {/* Custom Paper Textures */}
                {i === 0 && (
                  <>
                    <div className="absolute top-4 left-0 right-0 flex justify-between px-8">
                      {[...Array(12)].map((_, idx) => (
                        <div key={idx} className="w-3 h-3 rounded-full bg-[#111] shadow-inner" />
                      ))}
                    </div>
                    <div className="absolute inset-0 top-12 bottom-8 opacity-40 pointer-events-none" style={{ backgroundImage: "repeating-linear-gradient(transparent, transparent 27px, #3b82f6 27px, #3b82f6 28px)" }} />
                    <div className="absolute top-0 bottom-0 left-12 w-0.5 bg-red-400/60 pointer-events-none" />
                  </>
                )}
                
                {i === 1 && (
                  <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: "linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)", backgroundSize: "20px 20px" }} />
                )}

                {/* Paper clip decoration */}
                {i === 2 && (
                  <div className="absolute -top-6 left-1/4 -translate-x-1/2 z-20" style={{ transform: "rotate(-15deg)" }}>
                    <div className="w-6 h-16 rounded-full border-[5px] border-zinc-300 shadow-sm" style={{ borderBottom: "none", borderBottomLeftRadius: 0, borderBottomRightRadius: 0, background: "linear-gradient(to right, #e4e4e7, #71717a)" }} />
                    <div className="w-3 h-12 rounded-full border-[5px] border-zinc-400 absolute top-2 left-[5px]" style={{ borderTop: "none", borderTopLeftRadius: 0, borderTopRightRadius: 0 }} />
                  </div>
                )}

                {/* Number */}
                <div className="relative z-10 flex items-center gap-4 mb-8">
                  <span
                    className="font-mono text-[10px] uppercase tracking-[0.3em] font-bold"
                    style={{ color: i === 0 ? "#1a1a1a" : i === 1 ? "#333" : "#fff" }}
                  >
                    0{i + 1} ——
                  </span>
                </div>

                {/* Belief text */}
                <p 
                  className={`relative z-10 font-display italic text-3xl md:text-4xl leading-snug mb-6 ${i === 1 ? 'font-mono' : ''}`}
                  style={{ color: i === 2 ? "#fff" : "#1a1a1a" }}
                >
                  &ldquo;{belief.text}&rdquo;
                </p>
                <p 
                  className={`relative z-10 font-sans text-sm leading-relaxed max-w-xl ${i === 1 ? 'font-mono' : ''}`}
                  style={{ color: i === 2 ? "rgba(255,255,255,0.8)" : "rgba(26,26,26,0.8)" }}
                >
                  {belief.sub}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
