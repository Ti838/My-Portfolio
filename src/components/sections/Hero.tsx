"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { FiArrowRight, FiArrowUpRight, FiGithub, FiLinkedin, FiCode, FiMessageCircle, FiDownload } from "react-icons/fi";
import TypeWriter from "@/components/ui/TypeWriter";
import ScrollReveal from "@/components/ui/ScrollReveal";
import MagneticButton from "@/components/ui/MagneticButton";

export default function Hero({ personalInfo }: { personalInfo: any }) {
  const { scrollY } = useScroll();
  
  // Parallax and Fade effects
  const y = useTransform(scrollY, [0, 500], [0, 200]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);
  const scale = useTransform(scrollY, [0, 500], [1, 1.1]);
  const textY = useTransform(scrollY, [0, 500], [0, -50]);

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-[var(--background)] px-6">
      {/* ── Background Image Section ──────────────────────────────────── */}
      <motion.div 
        style={{ y, opacity, scale }}
        className="absolute inset-0 z-0 flex items-center justify-center"
      >
        <div className="relative w-full h-full max-w-6xl mx-auto opacity-20 dark:opacity-20 grayscale hover:grayscale-0 transition-all duration-1000">
          <Image
            src="/profile.jpg"
            alt="Background Profile"
            fill
            className="object-contain object-center"
            priority
          />
          {/* Mask to blend with background */}
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--background)] via-transparent to-[var(--background)]" />
          <div className="absolute inset-0 bg-gradient-to-r from-[var(--background)] via-transparent to-[var(--background)]" />
        </div>
      </motion.div>

      {/* ── Floating Orbs ─────────────────────────────────────────────── */}
      <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-blue-400/5 rounded-full blur-[100px] animate-float-slow pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-[var(--accent)]/5 rounded-full blur-[80px] animate-float pointer-events-none" />

      {/* ── Content ───────────────────────────────────────────────────── */}
      <motion.div 
        style={{ y: textY }}
        className="relative z-10 flex flex-col items-center text-center w-full max-w-4xl mx-auto pt-20"
      >
        <ScrollReveal direction="down">
          <span className="font-mono text-[10px] md:text-xs uppercase tracking-[0.4em] text-[var(--accent)] mb-6 block font-bold">
            Hello, I&apos;m
          </span>
        </ScrollReveal>

        <ScrollReveal delay={200}>
          <h1 className="font-display text-7xl md:text-9xl lg:text-[11rem] leading-[0.85] tracking-tighter text-[var(--text-primary)] mb-8">
            {personalInfo?.name?.split(' ')[0] || "Timon"}<br />
            <span className="text-[var(--text-muted)]">{personalInfo?.name?.split(' ').slice(1).join(' ') || "Biswas"}</span>
          </h1>
        </ScrollReveal>

        <ScrollReveal delay={400}>
          <div className="flex flex-col items-center gap-6">
            <div className="h-8 flex items-center justify-center font-mono text-sm md:text-lg text-[var(--text-secondary)] tracking-tight">
              <TypeWriter 
                words={["Competitive Programmer", "Full Stack Developer", "AI Enthusiast", "Vocalist"]} 
                delay={80}
              />
            </div>
            <p className="text-[var(--text-muted)] max-w-sm text-sm md:text-base leading-relaxed">
              CSE Student & AI Enthusiast focused on building intelligent systems and solving complex problems.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={600} className="mt-12">
          <div className="flex flex-wrap items-center justify-center gap-6">
            <MagneticButton>
              <Link href="#contact" className="btn-primary group">
                Get in touch <FiArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </MagneticButton>
            <MagneticButton>
              <a href="/resume.pdf" className="btn-outline group">
                <FiDownload size={16} className="group-hover:translate-y-0.5 transition-transform" /> Resume
              </a>
            </MagneticButton>
          </div>
        </ScrollReveal>

        {/* Social Quick Links */}
        <ScrollReveal delay={800} className="mt-16">
          <div className="flex items-center gap-8 text-[var(--text-muted)]">
            <a href="https://github.com/Ti838" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--accent)] transition-colors"><FiGithub size={20} /></a>
            <a href="https://linkedin.com/in/timon-biswas-83493a328/" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--accent)] transition-colors"><FiLinkedin size={20} /></a>
            <a href="mailto:timonbiswas33@gmail.com" className="hover:text-[var(--accent)] transition-colors"><FiCode size={20} /></a>
          </div>
        </ScrollReveal>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div 
        style={{ opacity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <div className="w-[1px] h-12 bg-gradient-to-b from-[var(--accent)] to-transparent animate-pulse" />
        <span className="font-mono text-[8px] uppercase tracking-[0.2em] text-[var(--text-muted)]">scroll</span>
      </motion.div>
    </section>
  );
}
