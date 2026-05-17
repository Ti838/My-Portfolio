// REFINED
"use client";

import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import dynamic from "next/dynamic";
import Link from "next/link";
import { ArrowRight, Download, Mail } from "lucide-react";
import { FiGithub as Github, FiLinkedin as Linkedin } from "react-icons/fi";
import TypeWriter from "@/components/ui/TypeWriter";
import ScrollReveal from "@/components/ui/ScrollReveal";
import ErrorBoundary from "@/components/ui/ErrorBoundary";
import HeroFallback from "@/components/sections/HeroFallback";

const PortfolioScene3D = dynamic(() => import("@/components/sections/PortfolioScene3D"), {
  ssr: false,
  loading: () => (
    <div className="flex h-[620px] w-full items-center justify-center rounded-[2rem] border border-white/10 bg-black/20">
      <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-cyan-100">Loading 3D scene</span>
    </div>
  ),
});

export default function Hero({ personalInfo }: { personalInfo: any }) {
  const { scrollY } = useScroll();
  const contentY = useTransform(scrollY, [0, 650], [0, -50]);
  const contentOpacity = useTransform(scrollY, [0, 380], [1, 0.82]);

  const firstName = personalInfo?.name?.split(" ")?.[0] || "Timon";
  const lastName = personalInfo?.name?.split(" ")?.slice(1).join(" ") || "Biswas";
  const copy = personalInfo?.stats?.siteCopy || {};

  return (
    <section id="hero" className="relative min-h-screen overflow-hidden pt-28 md:pt-36">
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-x-0 top-0 h-[56vh] bg-[radial-gradient(circle_at_50%_0%,rgba(14,165,233,0.16),transparent_45%)]" />
        <div className="absolute left-1/2 top-24 h-[28rem] w-[28rem] -translate-x-1/2 rounded-full bg-cyan-400/10 blur-3xl" />
        <div className="absolute right-[-8%] top-[18%] h-[24rem] w-[24rem] rounded-full bg-emerald-400/8 blur-3xl" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:92px_92px] [mask-image:radial-gradient(circle_at_center,black,transparent_78%)] opacity-18" />
      </div>

      <div className="relative z-10 mx-auto max-w-[1400px] px-6 pb-20 md:pb-28">
        <div className="grid items-center gap-14 lg:grid-cols-12 lg:gap-12">
          <motion.div style={{ y: contentY, opacity: contentOpacity }} className="lg:col-span-6 space-y-8 text-center lg:text-left">
            <ScrollReveal direction="up">
              <div className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 shadow-[0_18px_45px_rgba(0,0,0,0.2)] backdrop-blur-xl">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-60 animate-ping" />
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-cyan-400" />
                </span>
                <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-text-2">{copy.heroEyebrow || "Clean 3D portfolio refresh"}</span>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={100} direction="up">
              <h1 className="display-xl max-w-4xl leading-[0.92] tracking-[-0.06em]">
                <span className="block text-text-1">{firstName}</span>
                <span className="block bg-accent-gradient bg-clip-text text-transparent">{lastName}</span>
              </h1>
            </ScrollReveal>

            <ScrollReveal delay={180} direction="up">
              <div className="min-h-10 flex items-center justify-center lg:justify-start">
                <span className="font-display text-xl md:text-2xl text-text-2 font-light">
                  <TypeWriter
                    words={["Competitive Programmer", "Full Stack Developer", "AI Enthusiast", "Problem Solver"]}
                    typingSpeed={80}
                  />
                </span>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={260} direction="up">
              <p className="max-w-2xl text-lg md:text-xl leading-relaxed text-text-2 mx-auto lg:mx-0">
                {copy.heroSummary || "A clean, professional portfolio built with stronger depth, sharper hierarchy, and a more polished 3D presence."}
              </p>
            </ScrollReveal>

            <ScrollReveal delay={340} direction="up" className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
              <Link href="#projects" className="btn-primary group">
                Explore Projects
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link href="/resume.pdf" className="btn-ghost group">
                Download CV
                <Download size={18} className="group-hover:translate-y-0.5 transition-transform" />
              </Link>
            </ScrollReveal>

            <ScrollReveal delay={420} direction="up">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 max-w-2xl mx-auto lg:mx-0">
                {[
                  { value: personalInfo?.stats?.projects || "14+", label: "Projects shipped" },
                  { value: personalInfo?.stats?.certificates || "4+", label: "Certificates earned" },
                  { value: personalInfo?.stats?.icpc_rank || "ICPC", label: "Competitive background" },
                ].map((item) => (
                  <div key={item.label} className="card p-5 text-left">
                    <div className="display-md text-accent">{item.value}</div>
                    <p className="mt-2 text-[10px] font-mono uppercase tracking-[0.22em] text-text-3">{item.label}</p>
                  </div>
                ))}
              </div>
            </ScrollReveal>

            <ScrollReveal delay={500} direction="up">
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-2">
                {[
                  { icon: Github, label: "GitHub", href: "https://github.com/Ti838" },
                  { icon: Linkedin, label: "LinkedIn", href: "https://linkedin.com/in/timon-biswas-83493a328/" },
                  { icon: Mail, label: "Email", href: `mailto:${personalInfo?.email}` },
                ].map((social) => (
                  <a key={social.label} href={social.href} target={social.label === "Email" ? undefined : "_blank"} rel={social.label === "Email" ? undefined : "noopener noreferrer"} className="btn-ghost gap-2 px-4 py-3 text-sm">
                    <social.icon size={16} />
                    {social.label}
                  </a>
                ))}
              </div>
            </ScrollReveal>
          </motion.div>

          <div className="lg:col-span-6">
            <ErrorBoundary fallback={<HeroFallback personalInfo={personalInfo} />}>
              <PortfolioScene3D personalInfo={personalInfo} />
            </ErrorBoundary>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="mt-20 flex flex-col items-center gap-3"
        >
          <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-text-3">scroll down</span>
          <div className="h-12 w-px bg-gradient-to-b from-cyan-300 via-cyan-300/60 to-transparent" />
        </motion.div>
      </div>
    </section>
  );
}
