"use client";
import Link from "next/link";
import { FiGithub, FiLinkedin, FiMail, FiCode, FiMessageCircle, FiTwitter, FiGlobe, FiLink, FiHeart } from "react-icons/fi";
import { useAdmin } from "@/components/admin/AdminProvider";
import MagneticButton from "@/components/ui/MagneticButton";

const icons: Record<string, any> = {
  FiGithub, FiLinkedin, FiMail, FiCode, FiMessageCircle, FiTwitter, FiGlobe, FiLink
};

export default function Footer({ socialLinks = [], tagline }: { socialLinks?: any[]; tagline?: string }) {
  const { isAdmin } = useAdmin();
  
  return (
    <footer className="relative mt-24 border-t border-white/10 overflow-hidden bg-white/5 dark:bg-black/5 backdrop-blur-sm">
      <div className="max-w-6xl mx-auto px-5 py-20 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          {/* Brand & Tagline */}
          <div className="text-center md:text-left space-y-4">
            <Link href="/" className="group flex items-center gap-3 justify-center md:justify-start">
              <div className="w-12 h-12 rounded-2xl bg-accent-500 text-white flex items-center justify-center font-black text-2xl shadow-glow group-hover:rotate-12 transition-transform">
                T
              </div>
              <p className="font-display font-900 text-3xl tracking-tighter text-slate-900 dark:text-white uppercase">
                Timon<span className="text-accent-500">.</span>
              </p>
            </Link>
            <p className="text-sm font-black uppercase tracking-[0.3em] text-slate-400 max-w-xs">
              {tagline || "CSE Student · AI Enthusiast · Competitive Programmer"}
            </p>
          </div>

          {/* Socials */}
          <div className="flex flex-wrap items-center justify-center gap-4">
            {socialLinks.map(({ url, icon, label, id }) => {
              const Icon = icons[icon] || FiLink;
              return (
                <MagneticButton key={id || label}>
                  <a
                    href={url}
                    target={url.startsWith("mailto") ? undefined : "_blank"}
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="w-14 h-14 rounded-2xl glass border-white/20 flex items-center justify-center text-slate-500 hover:text-accent-500 hover:border-accent-500/50 transition-all shadow-xl group"
                  >
                    <Icon size={20} className="group-hover:scale-110 transition-transform" />
                  </a>
                </MagneticButton>
              );
            })}
          </div>

          {/* Copyright & Hidden Admin */}
          <div className="text-center md:text-right space-y-2">
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">
              © {new Date().getFullYear()} — Handcrafted by Timon
            </p>
            <div className="flex items-center justify-center md:justify-end gap-2 text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">
              Built with <FiHeart className="text-red-500 animate-pulse" /> & Next.js
            </div>
            {!isAdmin && (
              <Link href="/admin" className="block text-[10px] text-slate-300 dark:text-slate-800 hover:text-accent-500 transition-colors opacity-0 hover:opacity-100 uppercase tracking-widest mt-4">
                System Access
              </Link>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}
