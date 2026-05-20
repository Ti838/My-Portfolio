// REFINED
"use client";
import Link from "next/link";
import { useAdmin } from "@/components/admin/AdminProvider";
import { Mail, ExternalLink, ArrowUpRight, Sparkles } from "lucide-react";
import { SiCodeforces } from "react-icons/si";
import { FaGithub, FaLinkedin, FaWhatsapp } from "react-icons/fa6";
import LyricTicker from "@/components/ui/LyricTicker";
import MagneticButton from "@/components/ui/MagneticButton";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const socialBrandConfig: Record<string, { icon: any; color: string; hoverBg: string; shadowColor: string; accentColor: string }> = {
  github: {
    icon: FaGithub,
    color: "group-hover:text-[#24292e] dark:group-hover:text-white",
    hoverBg: "hover:bg-neutral-800/10 dark:hover:bg-white/10 hover:border-neutral-500/30",
    shadowColor: "shadow-black/10 dark:shadow-white/5",
    accentColor: "rgba(255, 255, 255, 0.15)",
  },
  linkedin: {
    icon: FaLinkedin,
    color: "group-hover:text-[#0077b5]",
    hoverBg: "hover:bg-[#0077b5]/10 hover:border-[#0077b5]/30",
    shadowColor: "shadow-[#0077b5]/20",
    accentColor: "rgba(0, 119, 181, 0.15)",
  },
  codeforces: {
    icon: SiCodeforces,
    color: "group-hover:text-[#ff7400]",
    hoverBg: "hover:bg-[#ff7400]/10 hover:border-[#ff7400]/30",
    shadowColor: "shadow-[#ff7400]/20",
    accentColor: "rgba(255, 116, 0, 0.15)",
  },
  whatsapp: {
    icon: FaWhatsapp,
    color: "group-hover:text-[#25d366]",
    hoverBg: "hover:bg-[#25d366]/10 hover:border-[#25d366]/30",
    shadowColor: "shadow-[#25d366]/20",
    accentColor: "rgba(37, 211, 102, 0.15)",
  },
};

export default function Footer({ socialLinks = [], tagline }: { socialLinks?: any[]; tagline?: string }) {
  const { isAdmin } = useAdmin();
  const [checkedItems, setCheckedItems] = useState<Record<number, boolean>>({});
  const [activeMeme, setActiveMeme] = useState<number | null>(null);

  const playMemeSound = () => {
    try {
      const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
      const ctx = new AudioContext();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.type = "square"; // retro sound
      
      osc.frequency.setValueAtTime(440, ctx.currentTime);
      osc.frequency.setValueAtTime(554, ctx.currentTime + 0.1);
      osc.frequency.setValueAtTime(659, ctx.currentTime + 0.2);
      osc.frequency.setValueAtTime(880, ctx.currentTime + 0.3);
      
      gain.gain.setValueAtTime(0, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.1, ctx.currentTime + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.5);
      
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.5);
    } catch(e) {}
  };

  const handleCheck = (i: number) => {
    const isNowChecked = !checkedItems[i];
    setCheckedItems(prev => ({ ...prev, [i]: isNowChecked }));
    
    if (isNowChecked) {
      playMemeSound();
      setActiveMeme(i);
      setTimeout(() => setActiveMeme(null), 2500);
    }
  };

  const memes = [
    "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExMDJmODc3MzMwOTYzZDMxZjUzZjQwMjQ5Zjg0OGJiMzYzMzExMmEyMSZlcD12MV9pbnRlcm5hbF9naWZzX2dpZklkJmN0PWc/MDJ9CRV1424LbsL38f/giphy.gif",
    "https://media.giphy.com/media/13CoXDiaCcCoyk/giphy.gif",
    "https://media.giphy.com/media/JIX9t2j0ZTN9S/giphy.gif"
  ];

  return (
    <footer className="relative bg-ethereal-bg border-t border-ethereal-border overflow-hidden">
      {/* Main content - Notebook style */}
      <div className="max-w-[1000px] mx-auto px-6 pt-32 pb-16 flex justify-center">
        <div className="relative bg-[#FAF7F2] rounded-3xl p-8 md:p-12 shadow-2xl overflow-hidden w-full max-w-4xl border-2 border-ethereal-accent/20 rotate-[-1deg] transition-transform hover:rotate-0 duration-500">
          
          {/* Notebook lines */}
          <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ background: 'repeating-linear-gradient(transparent, transparent 31px, #D45B45 31px, #D45B45 32px)', marginTop: '80px' }} />
          
          <div className="relative z-10 flex flex-col md:flex-row gap-12">
            <div className="flex-1 space-y-8">
              <h2 className="font-display text-4xl md:text-5xl text-ethereal-accent font-bold">What I look for</h2>
              
              <div className="space-y-6">
                {[
                  "Impactful work",
                  "Meaningful collaboration",
                  "A diverse team of talented folks"
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-4 group cursor-pointer" onClick={() => handleCheck(i)}>
                    <div className={`w-6 h-6 rounded border-2 border-ethereal-accent flex items-center justify-center transition-colors ${checkedItems[i] ? 'bg-ethereal-accent text-white' : 'text-transparent group-hover:bg-ethereal-accent/20'}`}>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="w-4 h-4"><path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </div>
                    <span className={`font-handwriting text-3xl text-gray-800 pt-1 transition-all duration-300 ${checkedItems[i] ? 'line-through decoration-ethereal-accent/50 decoration-4 opacity-50' : ''}`}>
                      {item}
                    </span>
                  </div>
                ))}
              </div>

              <div className="pt-8">
                <MagneticButton
                  as="a"
                  href="mailto:timonbiswas33@gmail.com"
                  className="inline-block px-8 py-3 rounded-lg border-2 border-ethereal-accent text-ethereal-accent font-handwriting text-3xl font-bold hover:bg-ethereal-accent hover:text-white transition-colors duration-300 rotate-2 hover:rotate-0 shadow-lg"
                  strength={0.2}
                >
                  let&apos;s chat!
                </MagneticButton>
              </div>
            </div>
            
            {/* Hand-drawn illustration placeholder area with hidden memes */}
            <div className="hidden md:flex flex-1 items-center justify-center relative">
              <AnimatePresence>
                {activeMeme !== null && (
                  <motion.div
                    key="meme"
                    initial={{ scale: 0, rotate: -20, opacity: 0 }}
                    animate={{ scale: 1.1, rotate: -6, opacity: 1 }}
                    exit={{ scale: 0, rotate: 10, opacity: 0 }}
                    transition={{ type: "spring", stiffness: 180, damping: 15 }}
                    className="absolute z-20 w-[240px] h-[250px] bg-white p-3 pb-12 rounded-sm shadow-2xl pointer-events-none border border-stone-200"
                    style={{ transformOrigin: "center" }}
                  >
                    <div className="relative w-full h-full bg-stone-100 overflow-hidden rounded-sm">
                      <img 
                        src={memes[activeMeme % memes.length]} 
                        alt="meme" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    {/* Cute hand-drawn label */}
                    <div className="absolute bottom-2 left-0 right-0 text-center">
                      <span className="font-handwriting text-xl text-gray-700">Code mode: active 🐾</span>
                    </div>
                    {/* Tape on top */}
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-16 h-6 bg-yellow-100/60 backdrop-blur-sm shadow-sm" style={{ clipPath: "polygon(5% 0, 95% 2%, 100% 100%, 0 98%)" }} />
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="w-full h-full min-h-[300px] bg-ethereal-accent rounded-xl opacity-100 overflow-hidden relative rotate-3 shadow-2xl z-10">
                 <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stucco.png')] opacity-30 mix-blend-overlay"></div>
                 <div className="absolute inset-0 flex items-center justify-center flex-col text-white p-6 text-center border-4 border-white/20 m-4 rounded-lg border-dashed">
                   <Sparkles size={48} className="mb-4 opacity-80" />
                   <span className="font-handwriting text-3xl block">I write code like I write music...</span>
                   <span className="font-sans text-xs uppercase tracking-widest mt-4 opacity-70">Timon Biswas</span>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Lyric ticker — Jackie Zhang signature */}
      <LyricTicker />

      {/* Bottom bar */}
      <div className="max-w-[1200px] mx-auto px-6 pt-12 pb-16 flex flex-col items-center gap-10">
        
        {/* Social Links Cards Grid */}
        <div className="flex flex-wrap justify-center gap-4 md:gap-6 w-full relative z-10">
          {socialLinks.map((social: any) => {
            const key = social.label.toLowerCase();
            const config = socialBrandConfig[key] || {
              icon: ExternalLink,
              color: "group-hover:text-ethereal-accent",
              hoverBg: "hover:bg-ethereal-accent/10 hover:border-ethereal-accent/30",
              shadowColor: "shadow-ethereal-accent/10",
              accentColor: "rgba(212, 91, 69, 0.05)",
            };
            const BrandIcon = config.icon;

            return (
              <motion.a
                key={social.label}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -6, scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`flex items-center gap-3.5 px-6 py-4 rounded-2xl bg-white/[0.02] border border-white/5 backdrop-blur-md transition-all duration-300 shadow-md ${config.hoverBg} group`}
                style={{
                  boxShadow: `0 8px 30px -10px ${config.accentColor.replace('0.15', '0.08')}`
                }}
              >
                <BrandIcon size={18} className={`text-ethereal-text-3 transition-colors duration-300 ${config.color}`} />
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-ethereal-text-2 group-hover:text-ethereal-text-1 font-bold transition-colors">
                  {social.label}
                </span>
                <ArrowUpRight size={11} className="text-ethereal-text-3 opacity-30 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
              </motion.a>
            );
          })}
        </div>

        {/* Ambient Gradient Background Glow */}
        <div className="relative w-full border-t border-ethereal-border/30 pt-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="absolute inset-x-0 -top-24 h-48 bg-radial-gradient from-ethereal-accent/5 to-transparent blur-3xl pointer-events-none -z-10" />

          {/* Copyright & Handcrafted signature */}
          <Link href="/admin" className="font-mono text-[9px] text-ethereal-text-3 uppercase tracking-[0.15em] hover:text-ethereal-text-2 transition-colors">
            © {new Date().getFullYear()} Timon Biswas · Handcrafted with ❤️ in Bangladesh
          </Link>

          {/* Admin link */}
          <div className="flex items-center gap-4">
            {isAdmin && (
              <Link
                href="/admin/dashboard"
                className="font-mono text-[9px] uppercase tracking-[0.15em] text-ethereal-accent hover:opacity-75 transition-opacity bg-ethereal-accent/5 border border-ethereal-accent/20 px-4 py-2 rounded-full"
              >
                Admin Area ↗
              </Link>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}
