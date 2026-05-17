// REFINED — Ethereal Craft Hero
"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowDown, Mail } from "lucide-react";

// ── Animated Counter ──────────────────────────────────────────────────────────
function AnimatedCounter({ target, duration = 1500 }: { target: number; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true;
        const start = performance.now();
        const tick = (now: number) => {
          const progress = Math.min((now - start) / duration, 1);
          const ease = 1 - Math.pow(1 - progress, 3);
          setCount(Math.round(ease * target));
          if (progress < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      }
    }, { threshold: 0.3 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target, duration]);

  return <span ref={ref}>{count}</span>;
}

// ── Belief Ticker ─────────────────────────────────────────────────────────────
const beliefs = [
  "Tirelessly pursue clarity.",
  "Design for moments.",
  "Software should empower.",
];

function BeliefTicker() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setIndex(i => (i + 1) % beliefs.length), 3000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="relative overflow-hidden h-6">
      {beliefs.map((b, i) => (
        <motion.span
          key={b}
          initial={{ y: 24, opacity: 0 }}
          animate={i === index ? { y: 0, opacity: 1 } : { y: -24, opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-0 font-mono text-xs text-ethereal-accent uppercase tracking-widest"
        >
          {b}
        </motion.span>
      ))}
    </div>
  );
}

// ── Main Hero ─────────────────────────────────────────────────────────────────
interface HeroProps {
  personalInfo?: any;
}

const fadeUp = {
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0 },
};

export default function Hero({ personalInfo }: HeroProps) {
  const name = personalInfo?.name || "Timon Biswas";
  const profileImage = personalInfo?.profile_image || personalInfo?.profileImage || "/profile.jpg";
  const stats = personalInfo?.stats || {
    projects: "14",
    certificates: "4",
    icpc_rank: "Honorable Mention",
    languages: "Java/C++/PHP",
  };

  const parseNum = (val: string) => parseInt(val?.replace(/\D/g, "") || "0", 10);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col justify-center overflow-hidden pt-24 pb-16"
    >
      {/* Subtle background glyph */}
      <div
        aria-hidden
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full opacity-[0.02] bg-ethereal-accent blur-3xl pointer-events-none"
      />

      <div className="relative max-w-[1400px] mx-auto px-6 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">

          {/* ── Left: Typography ── */}
          <div className="lg:col-span-7 space-y-8">
            {/* Status Pill */}
            <motion.div
              variants={fadeUp}
              initial="initial"
              animate="animate"
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              <div className="inline-flex items-center gap-3">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-400" />
                </span>
                <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-ethereal-text-3">
                  Available for work
                </span>
              </div>
            </motion.div>

            {/* Name */}
            <motion.div
              variants={fadeUp}
              initial="initial"
              animate="animate"
              transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            >
              <h1 className="font-display font-bold text-ethereal-text-1 leading-[0.95] tracking-tighter text-[clamp(3.5rem,8vw,7rem)]">
                {name.split(" ").map((word: string, i: number) => (
                  <span key={word} className={`block ${i === 1 ? "italic text-ethereal-text-2" : ""}`}>
                    {word}
                  </span>
                ))}
              </h1>
            </motion.div>

            {/* Rotating Beliefs */}
            <motion.div
              variants={fadeUp}
              initial="initial"
              animate="animate"
              transition={{ duration: 0.8, delay: 0.45 }}
            >
              <BeliefTicker />
            </motion.div>

            {/* Bio line */}
            <motion.p
              variants={fadeUp}
              initial="initial"
              animate="animate"
              transition={{ duration: 0.8, delay: 0.55 }}
              className="font-sans text-ethereal-text-2 text-base leading-relaxed max-w-lg"
            >
              <em className="font-display text-lg text-ethereal-text-1 not-italic">
                Software should feel natural.
              </em>{" "}
              CSE student at SMUCT, building products at the intersection of AI,
              elegant code, and human experience.
            </motion.p>

            {/* CTAs */}
            <motion.div
              variants={fadeUp}
              initial="initial"
              animate="animate"
              transition={{ duration: 0.8, delay: 0.65 }}
              className="flex flex-wrap items-center gap-4"
            >
              <a
                href="#contact"
                onClick={e => { e.preventDefault(); document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" }); }}
                className="btn-primary"
              >
                <Mail size={16} />
                Get in Touch
              </a>
              <a
                href="#projects"
                onClick={e => { e.preventDefault(); document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" }); }}
                className="btn-ghost"
              >
                View Work
                <ArrowDown size={16} />
              </a>
            </motion.div>
          </div>

          {/* ── Right: Photo + Stats ── */}
          <div className="lg:col-span-5 flex flex-col items-center lg:items-end gap-8">
            {/* Profile Photo */}
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="relative"
            >
              <div className="relative w-60 h-72 sm:w-72 sm:h-80 rounded-3xl overflow-hidden border border-white/5">
                <Image
                  src={profileImage}
                  alt={name}
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 640px) 240px, 288px"
                  priority
                  unoptimized
                />
                {/* Gradient overlay at bottom */}
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-primary)]/60 via-transparent to-transparent" />
              </div>

              {/* Floating accent label */}
              <div className="absolute -bottom-4 -left-4 bg-[var(--bg-elevated)] border border-[var(--border)] rounded-2xl px-4 py-2 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-ethereal-accent animate-pulse-slow" />
                <span className="font-mono text-[10px] uppercase tracking-widest text-ethereal-text-2">
                  CSE · SMUCT
                </span>
              </div>
            </motion.div>

            {/* Stats Grid */}
            <motion.div
              variants={fadeUp}
              initial="initial"
              animate="animate"
              transition={{ duration: 0.8, delay: 0.75 }}
              className="grid grid-cols-2 gap-3 w-full max-w-xs"
            >
              {[
                { label: "Projects", value: parseNum(stats.projects), suffix: "+" },
                { label: "Certificates", value: parseNum(stats.certificates), suffix: "+" },
                { label: "ICPC", value: stats.icpc_rank || "HM", isText: true },
                { label: "Languages", value: stats.languages || "5+", isText: true },
              ].map(({ label, value, suffix, isText }) => (
                <div
                  key={label}
                  className="bg-[var(--bg-elevated)] border border-[var(--border)] rounded-2xl p-4"
                >
                  <div className="font-display text-2xl font-bold text-ethereal-text-1 leading-none mb-1">
                    {isText ? (
                      <span className="text-lg">{value}</span>
                    ) : (
                      <><AnimatedCounter target={value as number} />{suffix}</>
                    )}
                  </div>
                  <div className="font-mono text-[9px] uppercase tracking-widest text-ethereal-text-3">
                    {label}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-0 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pb-8"
        >
          <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-ethereal-text-3">
            Scroll
          </span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          >
            <ArrowDown size={14} className="text-ethereal-text-3" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
