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
    <footer className="relative border-t border-[var(--border)] bg-[var(--bg-secondary)]">
      <div className="max-w-[1200px] mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-1 group">
            <span className="font-display text-2xl font-bold">
              <span className="text-[var(--accent)]">T</span>
              <span className="text-[var(--text-primary)] group-hover:text-[var(--text-secondary)] transition-colors">imon</span>
            </span>
          </Link>

          {/* Nav Links */}
          <nav className="flex items-center gap-6">
            {navLinks.map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                className="text-sm text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors"
              >
                {link}
              </a>
            ))}
          </nav>

          {/* Social Icons */}
          <div className="flex items-center gap-3">
            {socialLinks.map((social: any) => {
              const Icon = iconMap[social.icon] || ExternalLink;
              return (
                <a
                  key={social.label}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full border border-[var(--border)] flex items-center justify-center text-[var(--text-tertiary)] hover:text-[var(--accent)] hover:border-[var(--accent)] transition-all duration-200"
                  aria-label={social.label}
                >
                  <Icon size={16} />
                </a>
              );
            })}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-8 pt-6 border-t border-[var(--border)] flex items-center justify-center gap-4">
          <p className="font-mono text-xs text-[var(--text-tertiary)] tracking-wider">
            © {new Date().getFullYear()} Timon Biswas. Crafted with precision.
          </p>
          {!isAdmin && (
            <Link
              href="/admin"
              className="font-mono text-[10px] text-[var(--text-tertiary)] hover:text-[var(--accent)] transition-colors tracking-wider opacity-0 hover:opacity-100"
            >
              [system]
            </Link>
          )}
        </div>
      </div>
    </footer>
  );
}
