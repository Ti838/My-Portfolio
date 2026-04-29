"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { useAdmin } from "@/components/admin/AdminProvider";
import { FiSun, FiMoon, FiMenu, FiX, FiArrowRight } from "react-icons/fi";
import MagneticButton from "@/components/ui/MagneticButton";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/skills", label: "Skills" },
  { href: "/projects", label: "Projects" },
  { href: "/experience", label: "Experience" },
  { href: "/education", label: "Education" },
  { href: "/achievements", label: "Awards" },
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
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!mounted) return null;

  return (
    <header 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        scrolled 
          ? "py-3 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl shadow-lg border-b border-white/10" 
          : "py-6 bg-transparent"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-5 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="relative group flex items-center gap-3">
          <div className="relative w-10 h-10 overflow-hidden rounded-xl bg-accent-500 flex items-center justify-center text-white shadow-glow group-hover:scale-110 transition-transform duration-500">
            {logoImage ? (
              <Image src={logoImage} alt="Logo" fill className="object-cover" />
            ) : (
              <span className="font-display font-black text-xl">T</span>
            )}
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-black uppercase tracking-tighter text-slate-900 dark:text-white leading-none">Timon</span>
            <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest leading-none mt-1">Biswas</span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-2">
          <ul className="flex items-center gap-1 bg-slate-100/50 dark:bg-slate-800/50 p-1.5 rounded-full border border-white/5 backdrop-blur-md">
            {navLinks.slice(0, 5).map((link) => {
              const active = pathname === link.href;
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${
                      active
                        ? "bg-white dark:bg-slate-700 text-accent-500 shadow-sm"
                        : "text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
            <li className="relative group">
               <button className="px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-widest text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white flex items-center gap-1">
                 More <FiChevronDown size={12} className="group-hover:rotate-180 transition-transform" />
               </button>
               <div className="absolute top-full right-0 mt-2 w-48 glass-card opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 p-2 translate-y-2 group-hover:translate-y-0">
                  {navLinks.slice(5).map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="block px-4 py-2 rounded-lg text-[10px] font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400 hover:bg-accent-500 hover:text-white transition-all"
                    >
                      {link.label}
                    </Link>
                  ))}
               </div>
            </li>
          </ul>

          <div className="h-6 w-[1px] bg-white/10 mx-4" />

          {/* Theme Toggle */}
          <MagneticButton strength={0.2}>
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="p-3 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-accent-500 transition-colors shadow-sm"
              aria-label="Toggle Theme"
            >
              {theme === "dark" ? <FiSun size={18} /> : <FiMoon size={18} />}
            </button>
          </MagneticButton>

          <MagneticButton>
            <Link href="/contact" className="btn-primary ml-4 py-3 px-8 text-[10px] uppercase tracking-widest font-black">
              Hire Me <FiArrowRight size={16} />
            </Link>
          </MagneticButton>
        </div>

        {/* Mobile Menu Trigger */}
        <div className="flex lg:hidden items-center gap-4">
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400"
          >
            {theme === "dark" ? <FiSun size={18} /> : <FiMoon size={18} />}
          </button>
          <button
            onClick={() => setOpen(!open)}
            className="p-2.5 rounded-xl bg-accent-500 text-white shadow-glow"
          >
            {open ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Nav Overlay */}
      {open && (
        <div className="lg:hidden fixed inset-0 top-[72px] bg-white dark:bg-slate-900 z-50 p-6 animate-fade-in">
          <ul className="flex flex-col gap-2">
            {navLinks.map((l, i) => {
              const active = pathname === l.href;
              return (
                <li key={l.href} className="animate-fade-up" style={{ animationDelay: `${i * 0.05}s` }}>
                  <Link
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className={`block px-6 py-4 rounded-2xl text-sm font-black uppercase tracking-widest transition-all ${
                      active
                        ? "bg-accent-500 text-white shadow-xl"
                        : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
                    }`}
                  >
                    {l.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </header>
  );
}

import { FiChevronDown } from "react-icons/fi";
