// REFINED
"use client";
import Link from "next/link";
import { useAdmin } from "@/components/admin/AdminProvider";
import { Mail, ExternalLink, ArrowUpRight } from "lucide-react";
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
      {/* Main content */}
      <div className="max-w-[1400px] mx-auto px-6 pt-32 pb-16 flex flex-col items-center text-center">
        <p className="font-sans text-sm text-ethereal-text-3 uppercase tracking-[0.2em] mb-6">
          What I look for
        </p>
        <h2 className="font-display text-4xl md:text-6xl text-ethereal-text-1 max-w-2xl mb-16 leading-tight">
          Impactful work. Meaningful collaboration. A diverse team of talented folks.
        </h2>

        {/* Magnetic CTA */}
        <MagneticButton
          as="a"
          href="mailto:timonbiswas33@gmail.com"
          className="group block"
          strength={0.4}
        >
          <span className="font-display text-6xl md:text-9xl text-ethereal-text-1 hover:text-ethereal-accent transition-colors duration-500 italic block">
            let&apos;s chat!
          </span>
          <span className="font-sans text-sm text-ethereal-text-2 group-hover:text-ethereal-accent transition-colors duration-300 mt-2 block">
            timonbiswas33@gmail.com
          </span>
        </MagneticButton>
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
