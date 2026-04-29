"use client";

import React, { useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Code, Download } from "lucide-react";
import { FiGithub, FiLinkedin, FiCode } from "react-icons/fi";
import TypeWriter from "@/components/ui/TypeWriter";
import ScrollReveal from "@/components/ui/ScrollReveal";
import MagneticButton from "@/components/ui/MagneticButton";

export default function Hero({ personalInfo }: { personalInfo: any }) {
  const [imgSrc, setImgSrc] = useState(() => {
    const src = personalInfo?.profileImage;
    if (!src || src === "null" || src === "") return "/profile.jpg";
    return src;
  });
  
  const { scrollY } = useScroll();
  
  // High-precision parallax
  const imageY = useTransform(scrollY, [0, 500], [0, 60]);
  const textY = useTransform(scrollY, [0, 500], [0, -30]);

  return (
    <section className="relative h-screen min-h-[700px] flex items-center bg-transparent overflow-hidden">
      {/* ── Precise Background Elements ─────────────────────────────── */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-[var(--accent)]/10 to-transparent pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-8 md:px-16 w-full flex flex-col md:flex-row items-center justify-between gap-12 relative z-10">
        
        {/* ── Left Content (Precision Typography) ─────────────────────── */}
        <motion.div 
          style={{ y: textY }} 
          className="flex-1 flex flex-col items-start text-left space-y-8"
        >
          <ScrollReveal direction="left">
            <div className="flex items-center gap-4">
              <span className="w-12 h-[1px] bg-[var(--accent)]" />
              <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-[var(--accent)] font-black">
                Available for projects
              </span>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={200} direction="left">
            <div className="space-y-2">
              <h1 className="font-display text-[clamp(3.5rem,8vw,6rem)] leading-[1.1] tracking-tighter text-[var(--text-primary)]">
                {personalInfo?.name?.split(' ')[0] || "Timon"} <br/>
                <span className="text-[var(--text-secondary)]">{personalInfo?.name?.split(' ').slice(1).join(' ') || "Biswas"}</span>
              </h1>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={400} direction="left">
            <div className="space-y-6">
              <div className="h-8 flex items-center font-mono text-lg md:text-xl text-[var(--accent)] font-bold">
                <TypeWriter 
                  words={["Competitive Programmer", "Full Stack Developer", "AI Enthusiast"]} 
                  typingSpeed={80}
                />
              </div>
              <p className="text-[var(--text-secondary)] text-sm md:text-base max-w-sm leading-relaxed border-l-2 border-[var(--accent)]/30 pl-4">
                CSE Student at SMUCT. Engineering intelligent software ecosystems with logic and creativity.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={600} direction="up" className="flex flex-wrap items-center gap-6 pt-4">
            <MagneticButton>
              <Link href="#contact" className="btn-primary px-10 py-4 text-[10px] uppercase tracking-widest font-black shadow-[0_0_30px_rgba(var(--accent-rgb),0.3)]">
                Get Started <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </MagneticButton>
            <MagneticButton>
              <a href="/resume.pdf" className="btn-outline px-10 py-4 text-[10px] uppercase tracking-widest font-black hover:border-[var(--accent)]">
                Download CV
              </a>
            </MagneticButton>
          </ScrollReveal>

          <ScrollReveal delay={800} direction="up" className="flex items-center gap-6 pt-8">
            {[
              { icon: FiGithub, href: "https://github.com/Ti838" },
              { icon: FiLinkedin, href: "https://linkedin.com/in/timon-biswas-83493a328/" },
              { icon: FiCode, href: "mailto:timonbiswas33@gmail.com" }
            ].map((social, idx) => (
              <motion.a
                key={idx}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1, y: -5 }}
                whileTap={{ scale: 0.9 }}
                className="w-12 h-12 rounded-xl flex items-center justify-center glass-card text-[var(--text-secondary)] hover:text-[var(--accent)] hover:border-[var(--accent)]/50 transition-all shadow-xl"
              >
                <social.icon size={20} />
              </motion.a>
            ))}
          </ScrollReveal>
        </motion.div>

        {/* ── Right Portrait (Golden Ratio Scaling) ─────────────────── */}
        <motion.div 
          style={{ y: imageY }}
          className="flex-1 relative w-full max-w-[420px] aspect-[10/13] md:aspect-[4/5] mx-auto"
        >
          {/* Outer Glow */}
          <div className="absolute inset-0 bg-[var(--accent)]/10 blur-[60px] rounded-full scale-90" />
          
          {/* Glass Frame */}
          <div className="absolute inset-0 border border-[var(--border)] rounded-[40px] translate-x-4 translate-y-4 backdrop-blur-sm" />
          
          <div className="relative w-full h-full rounded-[40px] overflow-hidden shadow-2xl border border-[var(--border)] bg-[var(--surface-secondary)] backdrop-blur-md group">
            <img
              src={imgSrc}
              alt={personalInfo?.name || "Profile"}
              className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-1000"
              onError={() => setImgSrc("/profile.jpg")}
            />
            
            {/* Cinematic Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--surface)]/80 via-transparent to-transparent opacity-60" />
          </div>

          {/* Precision Badge */}
          <div className="absolute -bottom-4 -left-4 bg-[var(--surface-secondary)]/90 border border-[var(--border)] px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-3 backdrop-blur-xl">
            <div className="w-8 h-8 rounded-full bg-[var(--accent)] flex items-center justify-center text-white text-[10px] font-black shadow-[0_0_15px_rgba(var(--accent-rgb),0.5)]">
              CF
            </div>
            <div>
              <p className="text-[8px] font-mono uppercase tracking-widest text-[var(--text-muted)] leading-none mb-1">Ranked</p>
              <p className="text-[10px] font-bold text-[var(--text-primary)] leading-none">Competitive Programmer</p>
            </div>
          </div>
        </motion.div>

      </div>

      {/* Side Scroll Indicator */}
      <div className="absolute right-8 bottom-12 hidden md:flex flex-col items-center gap-4">
        <span className="font-mono text-[8px] uppercase tracking-[0.4em] text-[var(--text-muted)] rotate-90 origin-right whitespace-nowrap">Scroll for More</span>
        <div className="w-[1px] h-20 bg-gradient-to-b from-[var(--accent)] to-transparent" />
      </div>
    </section>
  );
}
