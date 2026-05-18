// REFINED
"use client";
import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAdmin } from "@/components/admin/AdminProvider";
import { Menu, X } from "lucide-react";
import ThemeToggle from "@/components/ui/ThemeToggle";

const navLinks = [
  { href: "/", label: "Home", isAnchor: true, targetId: "hero" },
  { href: "/#about", label: "About", isAnchor: true, targetId: "about" },
  { href: "/#skills", label: "Skills", isAnchor: true, targetId: "skills" },
  { href: "/#projects", label: "Projects", isAnchor: true, targetId: "projects" },
  { href: "/#experience", label: "Experience", isAnchor: true, targetId: "experience" },
  { href: "/#education", label: "Education", isAnchor: true, targetId: "education" },
  { href: "/blog", label: "Blog", isAnchor: false },
  { href: "/tools", label: "Tools", isAnchor: false },
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
    const sections = navLinks.filter(l => l.isAnchor).map(l => document.getElementById(l.targetId!)).filter(Boolean) as HTMLElement[];
    const observer = new IntersectionObserver(
      (entries) => entries.forEach(entry => {
        if (entry.isIntersecting) {
          const matchedLink = navLinks.find(l => l.targetId === entry.target.id);
          if (matchedLink) setActiveSection(matchedLink.href);
        }
      }),
      { threshold: 0.3, rootMargin: "-80px 0px -40% 0px" }
    );
    sections.forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, [pathname]);

  const handleNavClick = useCallback((link: typeof navLinks[0]) => {
    setOpen(false);
    if (link.isAnchor && pathname === "/") {
      document.getElementById(link.targetId!)?.scrollIntoView({ behavior: "smooth" });
    }
  }, [pathname]);

  return (
    <>
      <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-700 ${scrolled ? 'py-4' : 'py-8'}`}>
        <div className="max-w-[1400px] mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="relative z-50 group flex items-center gap-3">
            <span className="font-display text-2xl font-bold tracking-tighter text-ethereal-text-1">
              Timon Biswas<span className="text-ethereal-accent">.</span>
            </span>
          </Link>

          {/* Center Nav - Floating Dock style when scrolled */}
          <nav className={`hidden md:flex items-center gap-1 p-1 transition-all duration-700 ${
            scrolled 
              ? 'bg-ethereal-surface/50 backdrop-blur-md border border-white/5 rounded-full px-2 py-1 shadow-2xl scale-95 translate-y-2' 
              : 'bg-transparent'
          }`}>
            {navLinks.map((link) => {
              const isActive = (pathname === "/" && activeSection === link.href) || 
                               (!link.isAnchor && pathname.startsWith(link.href) && link.href !== "/");
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={(e) => {
                    if (link.isAnchor && pathname === "/") {
                      e.preventDefault();
                      handleNavClick(link);
                    } else {
                      setOpen(false);
                    }
                  }}
                  className={`px-4 py-1.5 rounded-full text-[11px] font-sans uppercase tracking-[0.2em] transition-all duration-500 ${
                    isActive 
                      ? 'text-ethereal-text-1 bg-white/[0.05]' 
                      : 'text-ethereal-text-2 hover:text-ethereal-text-1'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-4 relative z-50">
            <ThemeToggle compact />

            {isAdmin && (
              <Link href="/admin/dashboard" className="hidden lg:block text-[10px] font-sans text-ethereal-accent uppercase tracking-widest hover:opacity-70 transition-opacity">
                Admin
              </Link>
            )}
            
            {/* Mobile Toggle */}
            <button
              onClick={() => setOpen(!open)}
              className="md:hidden w-10 h-10 flex items-center justify-center rounded-full bg-ethereal-surface/50 border border-white/10 text-ethereal-text-1"
            >
              {open ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 z-[45] md:hidden transition-all duration-700 ${open ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
        <div className="absolute inset-0 bg-ethereal-bg/95 backdrop-blur-2xl" />
        <nav className="relative h-full flex flex-col items-center justify-center gap-8 px-6">
          {navLinks.map((link, i) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={(e) => {
                if (link.isAnchor && pathname === "/") {
                  e.preventDefault();
                  handleNavClick(link);
                } else {
                  setOpen(false);
                }
              }}
              className={`text-4xl font-display font-bold tracking-tight text-ethereal-text-1 hover:text-ethereal-accent transition-all duration-500 ${
                open ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
              }`}
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </>
  );
}
