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
  const navLinks = ["About", "Skills", "Projects", "Experience", "Contact"];

  return (
    <footer className="relative py-20 px-6 border-t border-white/5 overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-bg-elevated/30" />
      
      <div className="max-w-[1400px] mx-auto">
        <div className="grid md:grid-cols-12 gap-12 items-center">
          {/* Logo & Tagline */}
          <div className="md:col-span-5 space-y-6">
            <Link href="/" className="font-display text-3xl font-bold tracking-tighter text-text-1">
              T<span className="text-accent">.</span>B
            </Link>
            <p className="body text-text-3 max-w-xs leading-relaxed text-sm">
              Engineering high-performance digital experiences with precision and creative flair.
            </p>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-4 grid grid-cols-2 gap-8">
            <div className="space-y-4">
              <p className="font-mono text-[10px] text-accent uppercase tracking-widest">Navigation</p>
              <nav className="flex flex-col gap-2">
                {navLinks.map((link) => (
                  <a key={link} href={`#${link.toLowerCase()}`} className="text-sm text-text-2 hover:text-text-1 transition-colors">
                    {link}
                  </a>
                ))}
              </nav>
            </div>
            <div className="space-y-4">
              <p className="font-mono text-[10px] text-accent uppercase tracking-widest">Social</p>
              <nav className="flex flex-col gap-2">
                {socialLinks.map((social: any) => (
                  <a key={social.label} href={social.url} target="_blank" rel="noopener noreferrer" className="text-sm text-text-2 hover:text-text-1 transition-colors">
                    {social.label}
                  </a>
                ))}
              </nav>
            </div>
          </div>

          {/* Contact CTA */}
          <div className="md:col-span-3 space-y-4">
            <p className="font-mono text-[10px] text-accent uppercase tracking-widest">Inquiries</p>
            <a href="mailto:timonbiswas33@gmail.com" className="display-sm text-text-1 hover:text-accent transition-colors block underline underline-offset-8 decoration-accent/30">
              Get in touch
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-20 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="font-mono text-[10px] text-text-3 uppercase tracking-widest">
            © {new Date().getFullYear()} Timon Biswas — Built with Next.js & Supabase
          </p>
          
          <div className="flex items-center gap-6">
            {!isAdmin && (
              <Link href="/admin" className="font-mono text-[9px] text-text-3 hover:text-accent transition-colors uppercase tracking-[0.2em] opacity-30 hover:opacity-100">
                [Secure Login]
              </Link>
            )}
            <p className="font-mono text-[10px] text-text-3 uppercase tracking-widest italic opacity-50">
              Ethereal Craft v2.0
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
