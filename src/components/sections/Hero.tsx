"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { FiArrowRight, FiGithub, FiLinkedin, FiCode, FiDownload } from "react-icons/fi";
import TypeWriter from "@/components/ui/TypeWriter";
import ScrollReveal from "@/components/ui/ScrollReveal";
import MagneticButton from "@/components/ui/MagneticButton";

export default function Hero({ personalInfo }: { personalInfo: any }) {
  const { scrollY } = useScroll();
  
  // Subtle Parallax
  const imageY = useTransform(scrollY, [0, 500], [0, 80]);
  const textY = useTransform(scrollY, [0, 500], [0, -40]);

  return (
    <section className="relative min-h-screen flex items-center bg-[var(--background)] overflow-hidden pt-20">
      {/* ── Background Orbs ─────────────────────────────────────────── */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[var(--accent)]/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[30%] h-[30%] bg-blue-500/5 blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full grid lg:grid-cols-2 gap-12 items-center relative z-10">
        
        {/* ── Left Content ────────────────────────────────────────────── */}
        <motion.div style={{ y: textY }} className="flex flex-col items-start text-left">
          <ScrollReveal direction="left">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-[2px] bg-[var(--accent)]" />
              <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-[var(--accent)] font-bold">
                Available for projects
              </span>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={200} direction="left">
            <h1 className="font-display text-6xl md:text-8xl lg:text-9xl text-[var(--text-primary)] leading-[0.9] tracking-tighter mb-8">
              {personalInfo?.name?.split(' ')[0] || "Timon"} <br/>
              <span className="text-[var(--text-muted)]">{personalInfo?.name?.split(' ').slice(1).join(' ') || "Biswas"}</span>
            </h1>
          </ScrollReveal>

          <ScrollReveal delay={400} direction="left">
            <div className="space-y-6 mb-12">
              <div className="h-8 flex items-center font-mono text-xl md:text-2xl text-[var(--text-secondary)]">
                <TypeWriter 
                  words={["Competitive Programmer", "Full Stack Developer", "AI Enthusiast"]} 
                  typingSpeed={80}
                />
              </div>
              <p className="text-[var(--text-secondary)] text-base md:text-lg max-w-md leading-relaxed opacity-80">
                CSE Student at SMUCT. Passionate about solving complex problems and building intelligent software ecosystems.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={600} direction="up" className="flex flex-wrap items-center gap-6">
            <MagneticButton>
              <Link href="#contact" className="btn-primary px-8 py-4 text-xs">
                Let&apos;s Talk <FiArrowRight className="ml-2" />
              </Link>
            </MagneticButton>
            <MagneticButton>
              <a href="/resume.pdf" className="btn-outline px-8 py-4 text-xs">
                <FiDownload className="mr-2" /> CV
              </a>
            </MagneticButton>
          </ScrollReveal>

          <ScrollReveal delay={800} direction="up" className="flex items-center gap-6 mt-16 text-[var(--text-muted)]">
            <a href="https://github.com/Ti838" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--accent)] transition-colors"><FiGithub size={20} /></a>
            <a href="https://linkedin.com/in/timon-biswas-83493a328/" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--accent)] transition-colors"><FiLinkedin size={20} /></a>
            <a href="mailto:timonbiswas33@gmail.com" className="hover:text-[var(--accent)] transition-colors"><FiCode size={20} /></a>
          </ScrollReveal>
        </motion.div>

        {/* ── Right Portrait ───────────────────────────────────────────── */}
        <motion.div 
          style={{ y: imageY }}
          className="relative aspect-[4/5] w-full max-w-md lg:max-w-none mx-auto lg:ml-auto"
        >
          {/* Decorative frame elements */}
          <div className="absolute inset-0 border border-[var(--border)] translate-x-4 translate-y-4 rounded-[40px] -z-10" />
          <div className="absolute -top-4 -left-4 w-24 h-24 border-t-2 border-l-2 border-[var(--accent)] rounded-tl-[40px] opacity-20" />
          <div className="absolute -bottom-4 -right-4 w-24 h-24 border-b-2 border-r-2 border-[var(--accent)] rounded-br-[40px] opacity-20" />
          
          {/* Main Image Container */}
          <div className="relative w-full h-full rounded-[40px] overflow-hidden shadow-2xl border border-[var(--border)] group">
            <Image
              src="/profile.jpg"
              alt={personalInfo?.name || "Profile"}
              fill
              className="object-cover object-top group-hover:scale-105 transition-transform duration-1000"
              priority
            />
            {/* Subtle Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--background)]/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
          </div>

          {/* Floating badge */}
          <div className="absolute -bottom-6 -left-6 bg-[var(--surface)] border border-[var(--border)] p-4 rounded-2xl shadow-xl animate-float">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[var(--accent)]/10 flex items-center justify-center text-[var(--accent)] font-bold">
                CF
              </div>
              <div>
                <p className="text-[10px] font-mono uppercase tracking-widest text-[var(--text-muted)]">Top Rated</p>
                <p className="text-xs font-bold text-[var(--text-primary)]">Competitive Programmer</p>
              </div>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
