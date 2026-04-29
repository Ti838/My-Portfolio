"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { useAdmin } from "@/components/admin/AdminProvider";
import { FiSun, FiMoon, FiMenu, FiX, FiChevronDown, FiEdit3 } from "react-icons/fi";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/skills", label: "Skills" },
  { href: "/projects", label: "Projects" },
  { href: "/experience", label: "Experience" },
  { href: "/education", label: "Education" },
  { href: "/achievements", label: "Achievements" },
  { href: "/blog", label: "Blog" },
  { href: "/tools", label: "Tools" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar({ logoImage }: { logoImage?: string }) {
  const { theme, setTheme } = useTheme();
  const { isAdmin } = useAdmin();
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    setMounted(true);
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  useEffect(() => { setOpen(false); }, [pathname]);

  const adminOffset = isAdmin ? 40 : 0;

  return (
    <header
      style={{ top: `${adminOffset}px` }}
      className={`fixed left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "glass shadow-lg border-b border-white/10"
          : "bg-transparent"
      }`}
    >
      <nav className="max-w-6xl mx-auto px-5 h-16 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/" className="flex items-center gap-2 group relative">
            <div className="relative w-9 h-9 rounded-xl overflow-hidden border border-white/20 shadow-md group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
              <Image src={logoImage || "/images/logo.png"} alt="Logo" fill className="object-cover" />
            </div>
            <span className="font-display font-900 text-2xl tracking-tighter text-slate-900 dark:text-white">
              Timon<span className="text-accent-500 animate-pulse">.</span>
            </span>
          </Link>
          <div className="hidden lg:flex items-center gap-1 ml-6 py-1.5 px-1.5 bg-white/50 dark:bg-slate-800/40 backdrop-blur-md rounded-full border border-white/20 shadow-inner">
            <ul className="flex items-center gap-1">
              {navLinks.map((l) => {
                const active = pathname === l.href;
                return (
                  <li key={l.href} className="relative">
                    <Link
                      href={l.href}
                      className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
                        active
                          ? "text-white"
                          : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                      }`}
                    >
                      {active && (
                        <div className="absolute inset-0 bg-accent-500 rounded-full -z-10 shadow-lg shadow-accent-500/20 animate-scale-in" />
                      )}
                      {l.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-3">
          {mounted && (
            <button
              onClick={() => {
                document.documentElement.classList.add("no-transitions");
                setTheme(theme === "dark" ? "light" : "dark");
                requestAnimationFrame(() => {
                  requestAnimationFrame(() => {
                    document.documentElement.classList.remove("no-transitions");
                  });
                });
              }}
              aria-label="Toggle theme"
              className="w-10 h-10 rounded-xl flex items-center justify-center text-slate-500 dark:text-slate-400 hover:bg-white/80 dark:hover:bg-slate-800 transition-all border border-transparent hover:border-white/20 hover:shadow-md"
            >
              {theme === "dark" ? <FiSun size={18} className="animate-spin-slow" /> : <FiMoon size={18} />}
            </button>
          )}
          <Link href="/contact" className="hidden lg:flex btn-primary text-xs py-2.5 px-6 uppercase tracking-widest font-black shadow-accent-500/30">
            Hire Me
          </Link>
          {/* Mobile hamburger */}
          <button
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
            className="lg:hidden w-10 h-10 rounded-xl flex items-center justify-center text-slate-600 dark:text-slate-300 hover:bg-white/80 dark:hover:bg-slate-800 transition-all border border-white/20"
          >
            {open ? <FiX size={20} /> : <FiMenu size={20} />}
          </button>
        </div>
      </nav>

      {/* Mobile drawer */}
      {open && (
        <div className="lg:hidden glass border-b border-white/10 px-5 pb-6 pt-2 animate-fade-in">
          <ul className="flex flex-col gap-2">
            {navLinks.map((l, i) => {
              const active = pathname === l.href;
              return (
                <li key={l.href} className="animate-fade-up" style={{ animationDelay: `${i * 0.05}s` }}>
                  <Link
                    href={l.href}
                    className={`block px-4 py-3 rounded-xl text-sm font-bold uppercase tracking-widest transition-all ${
                      active
                        ? "bg-accent-500 text-white shadow-lg shadow-accent-500/20"
                        : "text-slate-700 dark:text-slate-300 hover:bg-white/50 dark:hover:bg-slate-800"
                    }`}
                  >
                    {l.label}
                  </Link>
                </li>
              );
            })}
            <li className="pt-3 animate-fade-up" style={{ animationDelay: `${navLinks.length * 0.05}s` }}>
              <Link href="/contact" className="btn-primary w-full justify-center text-xs py-3.5 uppercase tracking-widest font-black">
                Hire Me
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
