// REFINED
"use client";
import Link from "next/link";
import { useAdmin } from "@/components/admin/AdminProvider";
import { Mail, ExternalLink, ArrowUpRight, Sparkles } from "lucide-react";
import { FiGithub as GithubIcon, FiLinkedin as LinkedinIcon } from "react-icons/fi";
import LyricTicker from "@/components/ui/LyricTicker";
import MagneticButton from "@/components/ui/MagneticButton";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const iconMap: Record<string, any> = {
  FiGithub: GithubIcon,
  FiLinkedin: LinkedinIcon,
  FiCode: ExternalLink,
  FiMessageCircle: Mail,
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
      <div className="max-w-[1400px] mx-auto px-6 pt-8 pb-12 border-t border-ethereal-border flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-8">
          {socialLinks.map((social: any) => (
              <a
              key={social.label}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="font-sans text-xs uppercase tracking-widest text-ethereal-text-2 hover:text-ethereal-text-1 transition-colors flex items-center gap-1.5"
            >
              {(() => {
                const Icon = iconMap[social.icon] 
                  || (social.label.toLowerCase().includes('github') ? GithubIcon : null)
                  || (social.label.toLowerCase().includes('linkedin') ? LinkedinIcon : null)
                  || (social.label.toLowerCase().includes('whatsapp') ? Mail : null)
                  || ExternalLink;
                
                return <Icon size={14} className="mr-1" />;
              })()}
              {social.label}
              <ArrowUpRight size={10} />
            </a>
          ))}
        </div>

        <div className="flex items-center gap-6">
          {isAdmin && (
            <Link
              href="/admin/dashboard"
              className="font-mono text-[10px] uppercase tracking-widest text-ethereal-accent hover:opacity-70 transition-opacity"
            >
              Admin ↗
            </Link>
          )}
          <Link href="/admin" className="font-mono text-[10px] text-ethereal-text-3 uppercase tracking-widest hover:text-ethereal-text-2 transition-colors">
            © {new Date().getFullYear()} Timon Biswas. Handcrafted.
          </Link>
        </div>
      </div>
    </footer>
  );
}
