// REFINED
"use client";

import React, { useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Download, ChevronDown, Mail } from "lucide-react";
import { FiGithub as Github, FiLinkedin as Linkedin, FiTwitter as Twitter } from "react-icons/fi";
import TypeWriter from "@/components/ui/TypeWriter";
import ScrollReveal from "@/components/ui/ScrollReveal";

export default function Hero({ personalInfo }: { personalInfo: any }) {
  const [imgSrc, setImgSrc] = useState(() => {
    const src = personalInfo?.profileImage;
    if (!src || src === "null" || src === "") return "/profile.jpg";
    return src;
  });

  const { scrollY } = useScroll();
  const textY = useTransform(scrollY, [0, 600], [0, -40]);
  const orbY = useTransform(scrollY, [0, 600], [0, 60]);
  const orbRotate = useTransform(scrollY, [0, 1000], [0, 45]);

  return (
    <section id="hero" className="relative min-h-screen flex items-center overflow-hidden">
      {/* Dot grid background */}
      <div className="absolute inset-0 dot-grid-bg opacity-40 pointer-events-none" />

      {/* Ambient glow */}
      <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-[var(--accent)]/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-[1200px] mx-auto px-6 w-full flex flex-col lg:flex-row items-center justify-between gap-16 relative z-10 py-32">
        
        {/* ── Left: Text Content ──────────────────────────────────── */}
        <motion.div style={{ y: textY }} className="flex-1 flex flex-col items-start text-left space-y-7 max-w-xl">
          {/* Available tag */}
          <ScrollReveal direction="left">
            <span className="font-mono text-xs text-[var(--accent)] tracking-wider">
              &lt; available for work /&gt;
            </span>
          </ScrollReveal>

          {/* Greeting */}
          <ScrollReveal delay={100} direction="left">
            <p className="body-lg text-[var(--text-secondary)]">Hi, I&apos;m</p>
          </ScrollReveal>

          {/* Name — massive Cormorant */}
          <ScrollReveal delay={200} direction="left">
            <h1 className="display-xl">
              {personalInfo?.name || "Timon Biswas"}
            </h1>
          </ScrollReveal>

          {/* Typewriter roles */}
          <ScrollReveal delay={300} direction="left">
            <div className="h-9 flex items-center">
              <span className="font-mono text-lg md:text-xl text-[var(--accent)] font-medium">
                <TypeWriter
                  words={["Competitive Programmer", "Full Stack Developer", "AI Enthusiast", "Problem Solver"]}
                  typingSpeed={80}
                />
              </span>
            </div>
          </ScrollReveal>

          {/* Short bio */}
          <ScrollReveal delay={400} direction="left">
            <p className="text-[var(--text-secondary)] text-base leading-relaxed max-w-md">
              CSE Student at SMUCT. Engineering intelligent software ecosystems with logic and creativity.
            </p>
          </ScrollReveal>

          {/* CTA Buttons */}
          <ScrollReveal delay={500} direction="up" className="flex flex-wrap items-center gap-4 pt-2">
            <a href="#projects" className="btn-primary">
              View My Work <ArrowRight size={16} />
            </a>
            <a href="/resume.pdf" className="btn-ghost">
              <Download size={16} /> Download CV
            </a>
          </ScrollReveal>

          {/* Social Icons */}
          <ScrollReveal delay={600} direction="up" className="flex items-center gap-4 pt-4">
            {[
              { icon: Github, href: "https://github.com/Ti838", label: "GitHub" },
              { icon: Linkedin, href: "https://linkedin.com/in/timon-biswas-83493a328/", label: "LinkedIn" },
              { icon: Mail, href: "mailto:timonbiswas33@gmail.com", label: "Email" },
            ].map((social) => (
              <motion.a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="w-10 h-10 rounded-full border border-[var(--border)] flex items-center justify-center text-[var(--text-tertiary)] hover:text-[var(--accent)] hover:border-[var(--accent)] transition-all duration-200"
                aria-label={social.label}
              >
                <social.icon size={18} />
              </motion.a>
            ))}
          </ScrollReveal>
        </motion.div>

        {/* ── Right: Abstract Geometric Visual ────────────────────── */}
        <motion.div
          style={{ y: orbY }}
          className="flex-1 relative w-full max-w-md aspect-square hidden lg:flex items-center justify-center"
        >
          {/* Outer rotating ring */}
          <motion.div
            style={{ rotate: orbRotate }}
            className="absolute w-[380px] h-[380px] rounded-full border border-[var(--accent)]/20 animate-spin-slow"
          />
          
          {/* Middle reverse-rotating ring */}
          <div className="absolute w-[300px] h-[300px] rounded-full border border-[var(--accent)]/15 animate-reverse-spin" style={{ animationDuration: '25s' }} />
          
          {/* Inner ring */}
          <div className="absolute w-[220px] h-[220px] rounded-full border border-[var(--accent)]/10 animate-spin-slow" style={{ animationDuration: '30s' }} />

          {/* Amber glow center blob */}
          <div className="absolute w-32 h-32 bg-[var(--accent)]/10 rounded-full blur-2xl animate-glow-pulse" />

          {/* Floating dots */}
          {[
            { top: '15%', left: '10%', delay: '0s', size: 6 },
            { top: '25%', right: '15%', delay: '1s', size: 4 },
            { bottom: '20%', left: '20%', delay: '2s', size: 5 },
            { bottom: '30%', right: '10%', delay: '0.5s', size: 3 },
            { top: '50%', left: '5%', delay: '1.5s', size: 4 },
            { top: '10%', right: '35%', delay: '2.5s', size: 5 },
          ].map((dot, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-[var(--accent)] animate-float"
              style={{
                ...dot,
                width: dot.size,
                height: dot.size,
                opacity: 0.4 + Math.random() * 0.3,
                animationDelay: dot.delay,
                animationDuration: `${4 + i * 0.5}s`,
              }}
            />
          ))}

          {/* Center profile image (optional — if image exists) */}
          <div className="relative w-40 h-40 rounded-full overflow-hidden border-2 border-[var(--accent)]/30 z-10 group">
            <img
              src={imgSrc}
              alt={personalInfo?.name || "Profile"}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              onError={() => setImgSrc("/profile.jpg")}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-primary)]/50 to-transparent opacity-60" />
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <span className="font-mono text-[10px] text-[var(--text-tertiary)] uppercase tracking-[0.2em]">scroll</span>
        <ChevronDown size={16} className="text-[var(--accent)] animate-bounce-chevron" />
      </div>
    </section>
  );
}
