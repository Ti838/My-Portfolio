// REFINED
"use client";
import Link from "next/link";
import { useAdmin } from "@/components/admin/AdminProvider";
import { Mail, ExternalLink } from "lucide-react";
import { FiGithub as GithubIcon, FiLinkedin as LinkedinIcon } from "react-icons/fi";

const iconMap: Record<string, any> = {
  FiGithub: GithubIcon,
  FiLinkedin: LinkedinIcon,
  FiCode: ExternalLink,
  FiMessageCircle: Mail,
};

export default function Footer({ socialLinks = [], tagline }: { socialLinks?: any[]; tagline?: string }) {
  const { isAdmin } = useAdmin();

  return (
    <footer className="relative bg-ethereal-bg border-t border-ethereal-border py-32 px-6 overflow-hidden">
      <div className="max-w-[1400px] mx-auto flex flex-col items-center text-center">
        <p className="font-sans text-sm text-ethereal-text-3 uppercase tracking-[0.2em] mb-4">What I look for</p>
        <h2 className="font-display text-4xl md:text-6xl text-ethereal-text-1 max-w-2xl mb-12 leading-tight">
          Impactful work. Meaningful work. A diverse team of talented folks.
        </h2>
        
        <a href="mailto:timonbiswas33@gmail.com" className="group flex flex-col items-center gap-2">
          <span className="font-display text-6xl md:text-9xl text-ethereal-text-1 hover:text-ethereal-accent transition-colors duration-500 italic">
            let's chat!
          </span>
          <span className="font-sans text-sm text-ethereal-text-2 group-hover:text-ethereal-accent transition-colors duration-300">
            timonbiswas33@gmail.com
          </span>
        </a>
      </div>

      <div className="max-w-[1400px] mx-auto mt-32 pt-8 border-t border-ethereal-border flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex gap-6">
          {socialLinks.map((social: any) => (
            <a key={social.label} href={social.url} target="_blank" rel="noopener noreferrer" className="font-sans text-xs uppercase tracking-widest text-ethereal-text-2 hover:text-ethereal-text-1 transition-colors">
              {social.label}
            </a>
          ))}
        </div>
        <p className="font-mono text-[10px] text-ethereal-text-3 uppercase tracking-widest">
          © {new Date().getFullYear()} Timon Biswas. Handcrafted.
        </p>
      </div>
    </footer>
  );
}
