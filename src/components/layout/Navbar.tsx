// REFINED
"use client";
import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAdmin } from "@/components/admin/AdminProvider";
import { Menu, X, ChevronDown } from "lucide-react";

const navLinks = [
  { href: "#hero", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#projects", label: "Projects" },
  { href: "#experience", label: "Experience" },
  { href: "#education", label: "Education" },
  { href: "#blog", label: "Blog" },
  { href: "#contact", label: "Contact" },
];

export default function Navbar({ logoImage }: { logoImage?: string }) {
  const { isAdmin } = useAdmin();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");

  // Track scroll for navbar shrink
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Track active section via IntersectionObserver
  useEffect(() => {
    if (pathname !== "/") return;
    
    const sections = navLinks
      .map(l => l.href.replace("#", ""))
      .map(id => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.3, rootMargin: "-80px 0px -40% 0px" }
    );

    sections.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [pathname]);

  // Lock body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const handleNavClick = useCallback((href: string) => {
    setOpen(false);
    if (pathname === "/") {
      const el = document.getElementById(href.replace("#", ""));
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [pathname]);

  return (
    <>
      {/* Fixed Navbar */}
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
          scrolled
            ? "py-3 bg-[var(--bg-primary)]/90 backdrop-blur-md border-b border-[var(--border)] shadow-[0_1px_20px_rgba(0,0,0,0.5)]"
            : "py-6 bg-transparent border-b border-transparent"
        }`}
      >
        <div className="max-w-[1200px] mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-1 group">
            <span className="font-display text-2xl font-bold">
              <span className="text-[var(--accent)]">T</span>
              <span className="text-[var(--text-primary)] group-hover:text-[var(--text-secondary)] transition-colors">imon</span>
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => {
              const sectionId = link.href.replace("#", "");
              const isActive = activeSection === sectionId;
              
              return (
                <button
                  key={link.href}
                  onClick={() => handleNavClick(link.href)}
                  className={`relative font-sans text-sm tracking-wide transition-colors duration-200 bg-transparent border-none cursor-pointer ${
                    isActive
                      ? "text-[var(--accent)] font-medium"
                      : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                  }`}
                  style={{ fontVariant: "small-caps" }}
                >
                  {link.label}
                  {/* Active indicator dot */}
                  {isActive && (
                    <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[var(--accent)]" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Controls */}
          <div className="flex items-center gap-3">
            {isAdmin && (
              <Link
                href="/admin/dashboard"
                className="hidden md:flex items-center gap-2 text-xs font-mono text-[var(--accent)] hover:text-[var(--accent-hover)] transition-colors"
              >
                Dashboard
              </Link>
            )}

            {/* Mobile Hamburger */}
            <button
              onClick={() => setOpen(!open)}
              className="md:hidden w-10 h-10 rounded-xl border border-[var(--border)] bg-[var(--bg-secondary)] flex items-center justify-center text-[var(--text-secondary)] hover:text-[var(--accent)] hover:border-[var(--accent)] transition-all"
              aria-label="Toggle Menu"
            >
              {open ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Full-Screen Overlay Menu */}
      <div
        className={`fixed inset-0 z-40 transition-all duration-500 md:hidden ${
          open ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"
        }`}
      >
        <div
          className="absolute inset-0 bg-[var(--bg-primary)]/95 backdrop-blur-xl"
          onClick={() => setOpen(false)}
        />

        <nav className="relative z-10 w-full h-full flex flex-col items-center justify-center px-6 gap-2">
          {navLinks.map((link, i) => {
            const sectionId = link.href.replace("#", "");
            const isActive = activeSection === sectionId;

            return (
              <button
                key={link.href}
                onClick={() => handleNavClick(link.href)}
                style={{ transitionDelay: open ? `${i * 60}ms` : "0ms" }}
                className={`bg-transparent border-none cursor-pointer transition-all duration-500 ${
                  open ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
              >
                <span
                  className={`block font-display text-4xl font-bold tracking-tight transition-colors duration-200 ${
                    isActive
                      ? "text-[var(--accent)]"
                      : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                  }`}
                >
                  {link.label}
                </span>
              </button>
            );
          })}

          <div className="mt-8">
            <p className="font-mono text-xs text-[var(--text-tertiary)] tracking-wider">
              © {new Date().getFullYear()} timon.dev
            </p>
          </div>
        </nav>
      </div>
    </>
  );
}
