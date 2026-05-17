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

  // Cards start inside the envelope (y: 400) and slide up to spread out
  const card1Y = useTransform(scrollYProgress, [0, 0.5], [400, 0]);
  const card2Y = useTransform(scrollYProgress, [0, 0.7], [400, 80]);
  const card3Y = useTransform(scrollYProgress, [0, 0.9], [400, 160]);

  const transforms = [
    { y: card1Y },
    { y: card2Y },
    { y: card3Y },
  ];

  return (
    <section ref={containerRef} className="py-32 md:py-48 px-6 relative overflow-hidden h-[150vh]">
      <div className="sticky top-32 max-w-[1400px] mx-auto">
        {/* Section header */}
        <div className="flex flex-col items-center text-center mb-12">
          <span className="section-label mb-4 text-white">00 // The Principles</span>
          <h2 className="font-display text-4xl md:text-6xl text-white leading-tight max-w-2xl">
            3 things I strongly believe in.
          </h2>
        </div>

        {/* Envelope Container */}
        <div className="relative max-w-3xl mx-auto w-full" style={{ height: "600px" }}>
          
          {/* Envelope Back */}
          <div className="absolute bottom-0 left-0 right-0 h-[300px] bg-[#8c6b4a] rounded-b-xl z-0 shadow-inner" style={{ backgroundImage: "radial-gradient(circle, rgba(0,0,0,0.1) 1px, transparent 1px)", backgroundSize: "4px 4px" }} />

          {/* Stacked cards */}
          {beliefs.map((belief, i) => (
            <motion.div
              key={belief.id}
              style={{
                y: transforms[i].y,
                rotate: belief.rotate,
                zIndex: i + 1,
              }}
              className="absolute left-4 right-4 md:left-8 md:right-8 top-0"
              whileHover={{
                rotate: "0deg",
                scale: 1.02,
                zIndex: 10,
                transition: { duration: 0.3 },
              }}
            >
              <div
                className="relative p-8 md:p-12 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)] cursor-pointer h-[400px]"
                style={{
                  background: i === 0 ? "#fdfbf7" : i === 1 ? "#d6d1c4" : "#b38c64",
                  color: "#1a1a1a",
                  borderTopLeftRadius: i === 0 ? '0px' : '4px',
                  borderTopRightRadius: i === 0 ? '0px' : '4px',
                  clipPath: i === 1 
                    ? "polygon(2% 0, 98% 2%, 100% 98%, 95% 100%, 85% 98%, 75% 100%, 65% 98%, 55% 100%, 45% 98%, 35% 100%, 25% 98%, 15% 100%, 5% 98%, 0 95%, 2% 80%, 0 60%, 2% 40%, 0 20%)"
                    : i === 0
                    ? "polygon(0 0, 100% 0, 100% 90%, 95% 100%, 90% 92%, 85% 98%, 80% 90%, 75% 100%, 70% 92%, 65% 98%, 60% 90%, 55% 100%, 50% 92%, 45% 98%, 40% 90%, 35% 100%, 30% 92%, 25% 98%, 20% 90%, 15% 100%, 10% 92%, 5% 98%, 0 90%)"
                    : "none",
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
                <div className="relative z-10 flex items-center gap-4 mb-6">
                  <span
                    className="font-mono text-[10px] uppercase tracking-[0.3em] font-bold"
                    style={{ color: i === 0 ? "#1a1a1a" : i === 1 ? "#333" : "#fff" }}
                  >
                    0{i + 1} ——
                  </span>
                </div>

                {/* Belief text */}
                <p 
                  className={`relative z-10 font-display italic text-2xl md:text-3xl leading-snug mb-4 ${i === 1 ? 'font-mono' : ''}`}
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

          {/* Envelope Front (Covers the cards as they slide down) */}
          <div className="absolute bottom-0 left-0 right-0 h-[300px] z-[50] pointer-events-none drop-shadow-2xl overflow-hidden rounded-b-xl">
             <div className="absolute inset-0 bg-[#a68059]" style={{ backgroundImage: "radial-gradient(circle, rgba(0,0,0,0.05) 1px, transparent 1px)", backgroundSize: "4px 4px" }} />
             {/* Envelope flap folds */}
             <div className="absolute -top-10 left-0 right-0 h-[100px] bg-[#b38c64] rotate-3 origin-left shadow-lg" />
             <div className="absolute -top-10 left-0 right-0 h-[100px] bg-[#b38c64] -rotate-3 origin-right shadow-lg" />
             {/* Label on the envelope */}
             <div className="absolute bottom-10 right-10 rotate-[-5deg] bg-white text-black font-handwriting px-4 py-2 text-xl shadow-md">
                Top Secret
             </div>
          </div>

        </div>
      </div>
    </section>
  );
}
