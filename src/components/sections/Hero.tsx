// REFINED
"use client";

import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import ScrollReveal from "@/components/ui/ScrollReveal";

export default function Hero({ personalInfo }: { personalInfo: any }) {
  const { scrollY } = useScroll();
  const contentY = useTransform(scrollY, [0, 800], [0, -100]);
  const opacity = useTransform(scrollY, [0, 500], [1, 0]);

  const firstName = personalInfo?.name?.split(" ")?.[0] || "Timon";
  const lastName = personalInfo?.name?.split(" ")?.slice(1).join(" ") || "Biswas";
  const title = personalInfo?.tagline || "Software Engineer & Designer";

  return (
    <section id="hero" className="relative min-h-[90vh] flex items-center pt-20 overflow-hidden">
      <motion.div style={{ y: contentY, opacity }} className="relative z-10 w-full max-w-[1400px] mx-auto px-6">
        <div className="grid md:grid-cols-12 gap-12 md:gap-8 items-center">
          
          <div className="md:col-span-8 flex flex-col items-start">
            <ScrollReveal direction="up" delay={100}>
              <p className="font-sans text-sm md:text-base text-ethereal-text-2 uppercase tracking-[0.3em] mb-8">
                {title}
              </p>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={200}>
              <h1 className="font-display text-6xl md:text-8xl lg:text-[10rem] leading-[0.9] text-ethereal-text-1 tracking-tight mb-4">
                <span className="block">{firstName}</span>
                <span className="block italic text-ethereal-text-3">{lastName}.</span>
              </h1>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={300}>
              <p className="font-display text-3xl md:text-5xl lg:text-6xl text-ethereal-text-2 mt-8 max-w-3xl leading-[1.1]">
                Software should feel <span className="italic text-ethereal-text-1">natural</span>.
              </p>
            </ScrollReveal>
          </div>

          <div className="md:col-span-4 flex flex-col justify-end h-full mt-12 md:mt-0">
            <ScrollReveal direction="up" delay={400} className="md:ml-auto max-w-sm">
              <p className="font-sans text-sm text-ethereal-text-3 uppercase tracking-widest mb-6 border-b border-ethereal-border pb-4">
                Core Principles
              </p>
              <ul className="space-y-6">
                {[
                  "Tirelessly pursue clarity.",
                  "Design for moments.",
                  "Software should empower.",
                ].map((belief, i) => (
                  <li key={i} className="font-display text-2xl md:text-3xl text-ethereal-text-1">
                    {belief}
                  </li>
                ))}
              </ul>

              <div className="mt-12">
                <Link href="#projects" className="group inline-flex items-center gap-4 font-sans text-sm uppercase tracking-widest text-ethereal-text-2 hover:text-ethereal-text-1 transition-colors">
                  View Selected Work
                  <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform duration-300" />
                </Link>
              </div>
            </ScrollReveal>
          </div>

        </div>
      </motion.div>
    </section>
  );
}
