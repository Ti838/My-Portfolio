"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { useAdmin } from "@/components/admin/AdminProvider";
import { FiSun, FiMoon, FiMenu, FiX, FiChevronDown } from "react-icons/fi";
import MagneticButton from "@/components/ui/MagneticButton";

const primaryLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/skills", label: "Skills" },
  { href: "/projects", label: "Work" },
];

const secondaryLinks = [
  { href: "/experience", label: "Experience" },
  { href: "/education", label: "Education" },
  { href: "/achievements", label: "Awards" },
  { href: "/blog", label: "Blog" },
  { href: "/tools", label: "Tools" },
];

export default function Navbar({ logoImage }: { logoImage?: string }) {
  const { theme, setTheme } = useTheme();
  const { isAdmin } = useAdmin();
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const moreRef = useRef<HTMLLIElement>(null);

  useEffect(() => {
    setMounted(true);
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    const handleClickOutside = (e: MouseEvent) => {
      if (moreRef.current && !moreRef.current.contains(e.target as Node)) setShowMore(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => { setOpen(false); setShowMore(false); }, [pathname]);

  const adminOffset = isAdmin ? 40 : 0;

  return (
    <header
      style={{ top: `${adminOffset + (scrolled ? 20 : 10)}px` }}
      className="fixed left-0 right-0 z-50 transition-all duration-700 px-5 flex justify-center"
    >
      <nav className={`relative flex items-center gap-6 px-3 py-2 transition-all duration-700 ${
        scrolled 
          ? "glass shadow-[0_20px_50px_rgba(0,0,0,0.15)] rounded-[2.5rem] border border-white/20 px-6 py-3" 
          : "bg-white/10 dark:bg-black/10 backdrop-blur-sm rounded-3xl border border-white/10"
      }`}>
        {/* Brand */}
        <Link href="/" className="flex items-center gap-3 group px-2">
          <div className="relative w-8 h-8 rounded-full overflow-hidden border border-white/30 shadow-glow group-hover:scale-110 group-hover:rotate-12 transition-all duration-500">
            <Image src={logoImage || "/images/logo.png"} alt="Logo" fill className="object-cover" />
          </div>
          <span className="hidden sm:block font-display font-900 text-xl tracking-tighter text-slate-900 dark:text-white uppercase">
            T<span className="text-accent-500">.</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <ul className="hidden lg:flex items-center gap-1">
          {primaryLinks.map((l) => {
            const active = pathname === l.href;
            return (
              <li key={l.href} className="relative">
                <Link
                  href={l.href}
                  className={`relative px-5 py-2.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] transition-all duration-500 flex items-center justify-center ${
                    active
                      ? "text-white"
                      : "text-slate-500 hover:text-slate-900 dark:hover:text-white"
                  }`}
                >
                  {active && (
                    <div className="absolute inset-0 bg-accent-500 rounded-full -z-10 shadow-lg shadow-accent-500/40 animate-scale-in" />
                  )}
                  {l.label}
                </Link>
              </li>
            );
          })}

          {/* More Dropdown */}
          <li className="relative" ref={moreRef}>
            <button
              onClick={() => setShowMore(!showMore)}
              className={`px-5 py-2.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] transition-all duration-500 flex items-center gap-1.5 ${
                showMore || secondaryLinks.some(s => s.href === pathname)
                  ? "text-accent-500"
                  : "text-slate-500 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              Explore <FiChevronDown className={`transition-transform duration-500 ${showMore ? "rotate-180" : ""}`} />
            </button>

            {showMore && (
              <div className="absolute top-full left-0 mt-4 w-48 glass rounded-2xl shadow-2xl border border-white/20 p-2 animate-in fade-in slide-in-from-top-4 duration-300">
                {secondaryLinks.map((l) => (
                  <Link
                    key={l.href}
                    href={l.href}
                    className={`block px-4 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                      pathname === l.href
                        ? "bg-accent-500/10 text-accent-500"
                        : "text-slate-500 hover:bg-white/50 dark:hover:bg-white/5 hover:text-accent-500"
                    }`}
                  >
                    {l.label}
                  </Link>
                ))}
              </div>
            )}
          </li>
        </ul>

        {/* Separator */}
        <div className="hidden lg:block w-[1px] h-6 bg-white/10" />

        {/* Actions */}
        <div className="flex items-center gap-2">
          {mounted && (
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="w-10 h-10 rounded-full flex items-center justify-center text-slate-500 hover:bg-white/20 dark:hover:bg-white/5 transition-all"
            >
              {theme === "dark" ? <FiSun size={16} /> : <FiMoon size={16} />}
            </button>
          )}
          
          <MagneticButton strength={0.2}>
            <Link href="/contact" className="hidden lg:flex btn-primary py-2.5 px-6 rounded-full text-[10px] uppercase tracking-[0.2em] font-black shadow-accent-500/20 whitespace-nowrap">
              Hire Me
            </Link>
          </MagneticButton>

          {/* Mobile hamburger */}
          <button
            onClick={() => setOpen(!open)}
            className="lg:hidden w-10 h-10 rounded-full flex items-center justify-center text-slate-600 dark:text-slate-300 hover:bg-white/20 transition-all border border-white/10"
          >
            {open ? <FiX size={20} /> : <FiMenu size={20} />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      {open && (
        <div className="lg:hidden fixed inset-0 z-[-1] bg-slate-900/60 backdrop-blur-2xl p-8 pt-28 animate-in fade-in duration-500">
          <ul className="space-y-4">
            {[...primaryLinks, ...secondaryLinks].map((l, i) => (
              <li key={l.href} className="animate-fade-up" style={{ animationDelay: `${i * 0.05}s` }}>
                <Link
                  href={l.href}
                  className={`block px-6 py-4 rounded-2xl text-lg font-900 uppercase tracking-tighter transition-all ${
                    pathname === l.href
                      ? "bg-accent-500 text-white shadow-glow"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  {l.label}
                </Link>
              </li>
            ))}
            <li className="pt-8">
              <Link href="/contact" className="btn-primary w-full justify-center py-5 rounded-2xl uppercase tracking-widest font-black text-xs">
                Start a Project
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
