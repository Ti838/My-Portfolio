// REFINED — Ethereal Craft Hero (Jackie Zhang Inspired)
"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { ArrowDown, MapPin } from "lucide-react";
import MagneticButton from "@/components/ui/MagneticButton";

// ── Rotating belief words (Jackie Zhang signature) ────────────────────────────
const beliefWords = ["natural.", "powerful.", "reliable.", "joyful.", "precise."];

function RotatingWord() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setIndex(i => (i + 1) % beliefWords.length), 2500);
    return () => clearInterval(id);
  }, []);

  return (
    <span className="relative inline-block">
      <AnimatePresence mode="wait">
        <motion.span
          key={beliefWords[index]}
          initial={{ y: 40, opacity: 0, filter: "blur(8px)" }}
          animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
          exit={{ y: -40, opacity: 0, filter: "blur(8px)" }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="inline-block text-ethereal-accent italic"
        >
          {beliefWords[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

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

// ── Main Hero ─────────────────────────────────────────────────────────────────
export default function Hero({ personalInfo }: { personalInfo?: any }) {
  const name = personalInfo?.name || "Timon Biswas";
  const firstName = name.split(" ")[0];
  const lastName = name.split(" ").slice(1).join(" ");
  const profileImage = personalInfo?.profile_image || personalInfo?.profileImage || "/profile.jpg";
  const location = personalInfo?.location || "Dhaka, Bangladesh";
  const stats = personalInfo?.stats || { projects: "14", certificates: "4" };

  const parseNum = (val: string) => parseInt(val?.replace(/\D/g, "") || "0", 10);

  const fadeUp = {
    initial: { opacity: 0, y: 40 },
    animate: { opacity: 1, y: 0 },
  };

  return (
    <section id="hero" className="relative min-h-screen flex flex-col justify-center overflow-hidden pt-24 pb-16">
      {/* Subtle radial glow */}
      <div
        aria-hidden
        className="absolute top-1/2 right-0 w-[600px] h-[600px] -translate-y-1/2 translate-x-1/4 rounded-full opacity-[0.04] bg-ethereal-accent blur-3xl pointer-events-none"
      />

      <div className="relative max-w-[1400px] mx-auto px-6 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center min-h-[85vh]">

          {/* ── Left: Typography ── */}
          <div className="lg:col-span-7 space-y-10">

            {/* Available pill */}
            <motion.div variants={fadeUp} initial="initial" animate="animate" transition={{ duration: 0.7, delay: 0.1 }}>
              <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-white/10 bg-white/[0.02]">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-400" />
                </span>
                <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-ethereal-text-3">Available for work</span>
                <span className="font-mono text-[10px] text-ethereal-text-3">·</span>
                <MapPin size={10} className="text-ethereal-text-3" />
                <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-ethereal-text-3">{location}</span>
              </div>
            </motion.div>

            {/* Signature name — handwriting label */}
            <motion.div variants={fadeUp} initial="initial" animate="animate" transition={{ duration: 0.9, delay: 0.15 }}>
              <div className="relative">
                {/* Handwriting annotation */}
                <span className="absolute -top-8 -left-2 font-handwriting text-2xl text-ethereal-accent/70 rotate-[-3deg] select-none">
                  {firstName} :)
                </span>
                <h1 className="font-display font-bold text-ethereal-text-1 leading-[0.9] tracking-tighter text-[clamp(3.5rem,9vw,7.5rem)]">
                  <span className="block">{firstName}</span>
                  <span className="block italic text-ethereal-text-2 text-[0.85em]">{lastName}</span>
                </h1>
              </div>
            </motion.div>

            {/* Jackie Zhang signature: "Software should feel ___" rotating */}
            <motion.div variants={fadeUp} initial="initial" animate="animate" transition={{ duration: 0.8, delay: 0.3 }}>
              <p className="font-display text-xl md:text-2xl text-ethereal-text-1 leading-snug">
                Software should feel{" "}
                <RotatingWord />
              </p>
              <p className="font-sans text-ethereal-text-2 text-sm leading-relaxed max-w-md mt-4">
                CSE student at SMUCT — building products at the intersection of
                AI, elegant code, and human experience.
              </p>
            </motion.div>

            {/* CTAs */}
            <motion.div variants={fadeUp} initial="initial" animate="animate" transition={{ duration: 0.8, delay: 0.45 }} className="flex flex-wrap items-center gap-4">
              <MagneticButton
                as="a"
                href="#contact"
                className="btn-primary"
                onClick={(e: any) => { e.preventDefault(); document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" }); }}
              >
                let&apos;s chat!
              </MagneticButton>
              <a
                href="#projects"
                onClick={e => { e.preventDefault(); document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" }); }}
                className="btn-ghost"
              >
                View Work <ArrowDown size={14} />
              </a>
            </motion.div>

            {/* Stats */}
            <motion.div variants={fadeUp} initial="initial" animate="animate" transition={{ duration: 0.8, delay: 0.55 }} className="flex items-center gap-10 pt-4 border-t border-white/5">
              {[
                { label: "Projects shipped", value: parseNum(stats.projects), suffix: "+" },
                { label: "Certifications", value: parseNum(stats.certificates), suffix: "+" },
                { label: "ICPC Rank", value: "HM", isText: true },
              ].map(({ label, value, suffix, isText }) => (
                <div key={label}>
                  <div className="font-display text-2xl font-bold text-ethereal-text-1">
                    {isText ? value : <><AnimatedCounter target={value as number} />{suffix}</>}
                  </div>
                  <div className="font-mono text-[9px] uppercase tracking-widest text-ethereal-text-3 mt-0.5">{label}</div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* ── Right: Polaroid-style tilted photo ── */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <motion.div
              initial={{ opacity: 0, rotate: -3, y: 30 }}
              animate={{ opacity: 1, rotate: -2, y: 0 }}
              transition={{ duration: 1.2, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ rotate: 0, scale: 1.02, transition: { duration: 0.4 } }}
              className="relative cursor-pointer"
            >
              {/* Polaroid frame */}
              <div className="bg-white p-3 pb-16 shadow-2xl shadow-black/50 rounded-sm" style={{ width: "280px" }}>
                <div className="relative w-full aspect-[3/4] overflow-hidden bg-gray-100">
                  <Image
                    src={profileImage}
                    alt={name}
                    fill
                    className="object-cover object-center"
                    sizes="280px"
                    priority
                    unoptimized
                  />
                </div>
                {/* Polaroid bottom label */}
                <div className="absolute bottom-4 left-0 right-0 flex justify-center">
                  <span className="font-handwriting text-2xl text-gray-600 rotate-[-1deg]">
                    {firstName} :)
                  </span>
                </div>
              </div>

              {/* Sticker tags scattered around */}
              <div className="absolute -top-4 -right-6 bg-ethereal-accent/90 text-white font-mono text-[9px] uppercase tracking-widest px-2 py-1 rounded rotate-[4deg] shadow-lg">
                AI Dev
              </div>
              <div className="absolute -bottom-3 -left-6 bg-white text-gray-700 font-handwriting text-sm px-2 py-1 rounded shadow rotate-[-3deg]">
                ICPC 2024
              </div>
              <div className="absolute top-1/2 -right-8 bg-[var(--bg-elevated)] border border-white/10 text-ethereal-text-2 font-mono text-[9px] uppercase tracking-widest px-2 py-1 rounded rotate-[2deg] shadow">
                SMUCT
              </div>
            </motion.div>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8, duration: 1 }}
          className="flex flex-col items-center gap-2 mt-8"
        >
          <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-ethereal-text-3">Scroll</span>
          <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}>
            <ArrowDown size={14} className="text-ethereal-text-3" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
