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

  // Cards start deep inside the envelope (y: 200 to 250) and slide up to reveal
  const card1Y = useTransform(scrollYProgress, [0.1, 0.45], [250, -40]); // Lined paper (back)
  const card2Y = useTransform(scrollYProgress, [0.15, 0.65], [280, 20]);  // Spiral (middle)
  const card3Y = useTransform(scrollYProgress, [0.2, 0.85], [300, 80]); // Grid (front)

  const transforms = [
    { y: card1Y, rotate: "-2deg" },
    { y: card2Y, rotate: "1.5deg" },
    { y: card3Y, rotate: "-1deg" },
  ];

  return (
    <section ref={containerRef} className="py-16 md:py-24 px-6 relative overflow-hidden h-[130vh]">
      <div className="sticky top-20 max-w-[1400px] mx-auto">
        {/* Section header */}
        <div className="flex flex-col items-center text-center mb-12">
          <span className="section-label mb-4 text-white">00 // The Principles</span>
          <h2 className="font-display text-4xl md:text-6xl text-white leading-tight max-w-2xl">
            3 things I strongly believe in.
          </h2>
        </div>

        {/* The Envelope / Pocket Container */}
        <div className="relative max-w-2xl mx-auto w-full" style={{ height: "650px" }}>
          
          {/* Back of the Pocket (Darker Kraft Paper) */}
          <div className="absolute bottom-0 left-0 right-0 h-[400px] rounded-b-xl z-0 shadow-inner" style={{ backgroundColor: "#8c6b4a", backgroundImage: "url('https://www.transparenttextures.com/patterns/cardboard.png')" }} />

          {/* The Stacked Cards */}
          {beliefs.map((belief, i) => (
            <motion.div
              key={belief.id}
              style={{
                y: transforms[i].y,
                rotate: transforms[i].rotate,
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
                  background: i === 0 ? "#fdfbf7" : i === 1 ? "#fffefc" : "#f4f1ea",
                  color: "#1a1a1a",
                  borderTopLeftRadius: i === 1 ? '0px' : '4px',
                  borderTopRightRadius: i === 1 ? '0px' : '4px',
                  clipPath: i === 1 
                    ? "polygon(0 0, 100% 0, 100% 90%, 95% 100%, 90% 92%, 85% 98%, 80% 90%, 75% 100%, 70% 92%, 65% 98%, 60% 90%, 55% 100%, 50% 92%, 45% 98%, 40% 90%, 35% 100%, 30% 92%, 25% 98%, 20% 90%, 15% 100%, 10% 92%, 5% 98%, 0 90%)"
                    : "none",
                }}
              >
                {/* Paper Textures based on Jackie Zhang's design */}
                
                {/* Card 1 (Bottom/Back): Lined paper with red margin */}
                {i === 0 && (
                  <>
                    <div className="absolute inset-0 pointer-events-none opacity-[0.07]">
                      {Array.from({ length: 20 }).map((_, idx) => (
                        <div key={idx} className="absolute w-full border-b border-blue-600" style={{ top: `${(idx + 1) * 5}%` }} />
                      ))}
                    </div>
                    <div className="absolute top-0 bottom-0 left-12 w-0.5 bg-red-400/60 pointer-events-none" />
                  </>
                )}

                {/* Card 2 (Middle): Spiral Notebook */}
                {i === 1 && (
                  <>
                    <div className="absolute top-4 left-0 right-0 flex justify-between px-8">
                      {[...Array(14)].map((_, idx) => (
                        <div key={idx} className="w-3 h-3 rounded-full bg-[#111] shadow-inner border border-white/20" />
                      ))}
                    </div>
                    <div className="absolute top-12 left-0 right-0 border-t-2 border-red-200 pointer-events-none" />
                  </>
                )}
                
                {/* Card 3 (Top/Front): Beige Grid Paper */}
                {i === 2 && (
                  <>
                    <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: "linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)", backgroundSize: "20px 20px" }} />
                    {/* Metal Paperclip on Top Left */}
                    <div className="absolute -top-6 left-16 z-20" style={{ transform: "rotate(-15deg)" }}>
                      <div className="w-6 h-16 rounded-full border-[5px] border-zinc-300 shadow-sm" style={{ borderBottom: "none", borderBottomLeftRadius: 0, borderBottomRightRadius: 0, background: "linear-gradient(to right, #e4e4e7, #71717a)" }} />
                      <div className="w-3 h-12 rounded-full border-[5px] border-zinc-400 absolute top-2 left-[5px]" style={{ borderTop: "none", borderTopLeftRadius: 0, borderTopRightRadius: 0 }} />
                    </div>
                  </>
                )}

                <div className="relative z-10 flex items-center gap-4 mb-6 mt-4">
                  <span className="font-mono text-[10px] uppercase tracking-[0.3em] font-bold text-gray-400">
                    0{i + 1} ——
                  </span>
                </div>

                <p className="relative z-10 font-display italic text-3xl md:text-4xl leading-snug mb-4 text-[#1a1a1a]">
                  &ldquo;{belief.text}&rdquo;
                </p>
                <p className="relative z-10 font-sans text-sm leading-relaxed max-w-xl text-gray-700">
                  {belief.sub}
                </p>
              </div>
            </motion.div>
          ))}

          {/* Front of the Pocket (Ripped Kraft Paper) */}
          <div className="absolute bottom-0 left-[-2%] right-[-2%] h-[420px] z-[50] pointer-events-none filter drop-shadow-[0_-10px_20px_rgba(0,0,0,0.6)]">
             <div 
                className="absolute inset-0 w-full h-full" 
                style={{ 
                   backgroundColor: "#b38c64", 
                   backgroundImage: "url('https://www.transparenttextures.com/patterns/cardboard.png')",
                   clipPath: "polygon(0 100%, 100% 100%, 100% 60%, 98% 58%, 95% 62%, 92% 57%, 89% 60%, 85% 55%, 82% 58%, 78% 52%, 75% 55%, 72% 50%, 68% 53%, 65% 48%, 62% 51%, 58% 46%, 55% 49%, 52% 43%, 48% 46%, 45% 40%, 42% 44%, 38% 38%, 35% 42%, 32% 35%, 28% 40%, 25% 33%, 22% 37%, 18% 30%, 15% 34%, 12% 28%, 8% 31%, 5% 25%, 2% 28%, 0 22%)",
                   borderRadius: "0 0 12px 12px"
                }} 
             />
             {/* Inner ripped edge highlight to make it look realistic */}
             <div 
                className="absolute inset-0 w-full h-full opacity-30" 
                style={{ 
                   backgroundColor: "#f4cd9a", 
                   clipPath: "polygon(0 100%, 100% 100%, 100% 60%, 98% 58%, 95% 62%, 92% 57%, 89% 60%, 85% 55%, 82% 58%, 78% 52%, 75% 55%, 72% 50%, 68% 53%, 65% 48%, 62% 51%, 58% 46%, 55% 49%, 52% 43%, 48% 46%, 45% 40%, 42% 44%, 38% 38%, 35% 42%, 32% 35%, 28% 40%, 25% 33%, 22% 37%, 18% 30%, 15% 34%, 12% 28%, 8% 31%, 5% 25%, 2% 28%, 0 22%)",
                   transform: "translateY(2px)"
                }} 
             />
             
             {/* A cute piece of tape or label on the front of the envelope */}
             <div className="absolute bottom-12 right-12 bg-[#fffcf5] text-[#d97706] font-handwriting text-2xl px-6 py-2 rotate-[-4deg] shadow-md border border-[#e5e5e5]">
                My Principles
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-12 h-6 bg-white/40 backdrop-blur-sm shadow-sm" style={{ clipPath: "polygon(5% 0, 95% 2%, 100% 100%, 0 98%)" }} />
             </div>
          </div>

        </div>
      </div>
    </section>
  );
}
