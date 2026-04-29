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
  
  // Advanced Parallax
  const imageY = useTransform(scrollY, [0, 1000], [0, 400]);
  const textY = useTransform(scrollY, [0, 1000], [0, -150]);
  const opacity = useTransform(scrollY, [0, 500], [1, 0]);
  const scale = useTransform(scrollY, [0, 1000], [1, 1.2]);

  return (
    <section className="relative min-h-[120vh] flex items-center justify-center overflow-hidden bg-[var(--background)]">
      {/* ── Large Cinematic Background Portrait ────────────────────────── */}
      <motion.div 
        style={{ y: imageY, scale, opacity }}
        className="absolute inset-0 z-0 flex items-center justify-center md:justify-end"
      >
        <div className="relative w-full h-full md:w-3/4 lg:w-2/3 h-screen md:h-[120%] opacity-40 dark:opacity-30">
          <Image
            src="/profile.jpg"
            alt="Cinematic Background"
            fill
            className="object-cover object-center md:object-right-top transition-all duration-1000"
            priority
          />
          {/* Sophisticated Masking */}
          <div className="absolute inset-0 bg-gradient-to-r from-[var(--background)] via-[var(--background)]/80 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--background)] via-transparent to-[var(--background)]/20" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[var(--background)]" />
        </div>
      </motion.div>

      {/* ── Content Layer ─────────────────────────────────────────────── */}
      <motion.div 
        style={{ y: textY }}
        className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 flex flex-col items-start pt-20"
      >
        <ScrollReveal direction="left">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-[1px] bg-[var(--accent)]" />
            <span className="font-mono text-xs uppercase tracking-[0.5em] text-[var(--accent)] font-black">
              Digital Architect
            </span>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={200} direction="left">
          <h1 className="font-display text-[15vw] md:text-[12vw] leading-[0.8] tracking-tighter text-[var(--text-primary)] mb-12 mix-blend-difference">
            {personalInfo?.name?.split(' ')[0] || "Timon"}<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--text-primary)] to-[var(--accent)] opacity-80">
              {personalInfo?.name?.split(' ').slice(1).join(' ') || "Biswas"}
            </span>
          </h1>
        </ScrollReveal>

        <ScrollReveal delay={400} direction="left">
          <div className="flex flex-col items-start gap-8">
            <div className="h-10 flex items-center font-mono text-xl md:text-3xl text-[var(--text-secondary)] tracking-tight">
              <TypeWriter 
                words={["Competitive Programmer", "Full Stack Developer", "AI Enthusiast"]} 
                typingSpeed={100}
              />
            </div>
            <p className="text-[var(--text-muted)] max-w-xl text-lg md:text-xl leading-relaxed border-l-2 border-[var(--border)] pl-8 italic">
              &quot;Transforming complex logic into seamless digital experiences. Mastering the intersection of AI and human creativity.&quot;
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={600} className="mt-16 flex flex-wrap items-center gap-8">
          <MagneticButton>
            <Link href="#contact" className="px-10 py-5 bg-[var(--text-primary)] text-[var(--background)] rounded-full font-bold text-sm uppercase tracking-widest hover:scale-105 transition-transform flex items-center gap-3">
              Initiate Project <FiArrowRight size={18} />
            </Link>
          </MagneticButton>
          
          <div className="flex items-center gap-8">
            <a href="https://github.com/Ti838" target="_blank" rel="noopener noreferrer" className="text-[var(--text-muted)] hover:text-[var(--accent)] transition-all hover:scale-125"><FiGithub size={24} /></a>
            <a href="https://linkedin.com/in/timon-biswas-83493a328/" target="_blank" rel="noopener noreferrer" className="text-[var(--text-muted)] hover:text-[var(--accent)] transition-all hover:scale-125"><FiLinkedin size={24} /></a>
            <a href="mailto:timonbiswas33@gmail.com" className="text-[var(--text-muted)] hover:text-[var(--accent)] transition-all hover:scale-125"><FiCode size={24} /></a>
          </div>
        </ScrollReveal>
      </motion.div>

      {/* Background elements */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[var(--accent)]/5 to-transparent pointer-events-none" />
      
      {/* Scroll Down Hint */}
      <div className="absolute bottom-12 right-12 flex flex-col items-center gap-4 group cursor-pointer">
        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-[var(--text-muted)] rotate-90 origin-right translate-y-8">Discover</span>
        <div className="w-[1px] h-24 bg-gradient-to-b from-[var(--border)] via-[var(--accent)] to-transparent group-hover:h-32 transition-all duration-700" />
      </div>
    </section>
  );
}
