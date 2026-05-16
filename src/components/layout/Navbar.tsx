// REFINED
"use client";
import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAdmin } from "@/components/admin/AdminProvider";
import { Menu, X } from "lucide-react";
import ThemeToggle from "@/components/ui/ThemeToggle";

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

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (pathname !== "/") return;
    const sections = navLinks.map(l => document.getElementById(l.href.replace("#", ""))).filter(Boolean) as HTMLElement[];
    const observer = new IntersectionObserver(
      (entries) => entries.forEach(entry => entry.isIntersecting && setActiveSection(entry.target.id)),
      { threshold: 0.3, rootMargin: "-80px 0px -40% 0px" }
    );
    sections.forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, [pathname]);

  const handleNavClick = useCallback((href: string) => {
    setOpen(false);
    if (pathname === "/") {
      document.getElementById(href.replace("#", ""))?.scrollIntoView({ behavior: "smooth" });
    }
  }, [pathname]);

  return (
    <>
      <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-700 ${scrolled ? 'py-4' : 'py-8'}`}>
        <div className="max-w-[1400px] mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="relative z-50 group flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-black/30 p-1.5 shadow-[0_18px_40px_rgba(0,0,0,0.24)] backdrop-blur-xl">
              <img src={logoImage || "/images/logo.svg"} alt="Timon Biswas logo" className="h-full w-full rounded-xl object-contain" />
            </span>
            <span className="hidden font-display text-sm font-semibold uppercase tracking-[0.22em] text-text-1 sm:block">
              Timon<span className="text-accent">.</span>
            </span>
          </Link>

          {/* Center Nav - Floating Dock style when scrolled */}
          <nav className={`hidden md:flex items-center gap-1 p-1 transition-all duration-700 ${
            scrolled 
              ? 'glass border border-white/5 rounded-full px-2 py-1 shadow-2xl scale-95 translate-y-2' 
              : 'bg-transparent'
          }`}>
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.replace("#", "");
              return (
                <button
                  key={link.href}
                  onClick={() => handleNavClick(link.href)}
                  className={`px-4 py-1.5 rounded-full text-[11px] font-mono uppercase tracking-[0.2em] transition-all duration-500 ${
                    isActive 
                      ? 'text-accent bg-white/[0.05]' 
                      : 'text-text-2 hover:text-text-1'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-4 relative z-50">
            <ThemeToggle compact />

            {isAdmin && (
              <Link href="/admin/dashboard" className="hidden lg:block text-[10px] font-mono text-accent uppercase tracking-widest hover:opacity-70 transition-opacity">
                Admin
              </Link>
            )}
            
            {/* Mobile Toggle */}
            <button
              onClick={() => setOpen(!open)}
              className="md:hidden w-10 h-10 flex items-center justify-center rounded-full glass border border-white/10 text-text-1"
            >
              {open ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 z-[45] md:hidden transition-all duration-700 ${open ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
        <div className="absolute inset-0 bg-bg-primary/95 backdrop-blur-2xl" />
        <nav className="relative h-full flex flex-col items-center justify-center gap-8 px-6">
          {navLinks.map((link, i) => (
            <button
              key={link.href}
              onClick={() => handleNavClick(link.href)}
              className={`text-4xl font-display font-bold tracking-tight text-text-1 hover:text-accent transition-all duration-500 ${
                open ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
              }`}
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              {link.label}
            </button>
          ))}
        </nav>
      </div>
    </>
  );
}
