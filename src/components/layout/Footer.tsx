// REFINED
"use client";
import Link from "next/link";
import { useAdmin } from "@/components/admin/AdminProvider";
import { Mail, ExternalLink, ArrowUpRight, Sparkles } from "lucide-react";
import { FiGithub as GithubIcon, FiLinkedin as LinkedinIcon } from "react-icons/fi";
import LyricTicker from "@/components/ui/LyricTicker";
import MagneticButton from "@/components/ui/MagneticButton";

const iconMap: Record<string, any> = {
  FiGithub: GithubIcon,
  FiLinkedin: LinkedinIcon,
  FiCode: ExternalLink,
  FiMessageCircle: Mail,
};

export default function Footer({ socialLinks = [], tagline }: { socialLinks?: any[]; tagline?: string }) {
  const { isAdmin } = useAdmin();

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
                  <div key={i} className="flex items-center gap-4 group">
                    <div className="w-6 h-6 rounded border-2 border-ethereal-accent flex items-center justify-center text-ethereal-accent group-hover:bg-ethereal-accent group-hover:text-white transition-colors cursor-pointer">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="w-4 h-4"><path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </div>
                    <span className="font-handwriting text-3xl text-gray-800 pt-1 line-through decoration-ethereal-accent/30 decoration-2">{item}</span>
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
            
            {/* Hand-drawn illustration placeholder area */}
            <div className="hidden md:flex flex-1 items-center justify-center relative">
              <div className="w-full h-full min-h-[300px] bg-ethereal-accent rounded-xl opacity-90 overflow-hidden relative rotate-3 shadow-xl">
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
              {iconMap[social.icon] ? (
                (() => {
                  const Icon = iconMap[social.icon];
                  return <Icon size={14} className="mr-1" />;
                })()
              ) : null}
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
