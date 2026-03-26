"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
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
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = typeof window !== 'undefined' ? window.location.pathname : ''; // Replaced usePathname with window.location.pathname

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
      className={`fixed left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/90 dark:bg-slate-900/90 backdrop-blur-md shadow-sm border-b border-slate-100 dark:border-slate-800"
          : "bg-transparent"
      }`}
    >
      <nav className="max-w-6xl mx-auto px-5 h-16 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/" className="flex items-center gap-2 group relative">
            <div className="relative w-8 h-8 rounded-lg overflow-hidden border border-slate-200 dark:border-slate-700 shadow-sm group-hover:scale-105 transition-transform">
              <Image src={logoImage || "/images/logo.png"} alt="Logo" fill className="object-cover" />
            </div>
            <span className="font-display font-900 text-xl tracking-tight text-slate-900 dark:text-white">
              Timon<span className="text-accent-500">.</span>
            </span>
            {isAdmin && (
              <button 
                onClick={(e) => {
                  e.preventDefault();
                  window.dispatchEvent(new CustomEvent("open-admin-editor", { detail: "hero" }));
                }}
                className="absolute -right-6 top-1/2 -translate-y-1/2 p-1 bg-accent-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-lg z-[60]"
              >
                <FiEdit3 size={10} />
              </button>
            )}
          </Link>
          <div className="hidden lg:flex items-center gap-1 ml-4 py-1 px-3 bg-slate-50 dark:bg-slate-800/50 rounded-full border border-slate-200/50 dark:border-slate-700/50">
            <ul className="flex items-center gap-1">
              {navLinks.map((l) => {
                const active = pathname === l.href;
                return (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                        active
                          ? "bg-accent-50 dark:bg-accent-900/30 text-accent-600 dark:text-accent-400"
                          : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800"
                      }`}
                    >
                      {l.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-2">
          {mounted && (
            <button
              onClick={() => {
                // Suppress transitions for one frame to prevent flicker
                document.documentElement.classList.add("no-transitions");
                setTheme(theme === "dark" ? "light" : "dark");
                requestAnimationFrame(() => {
                  requestAnimationFrame(() => {
                    document.documentElement.classList.remove("no-transitions");
                  });
                });
              }}
              aria-label="Toggle theme"
              className="w-9 h-9 rounded-lg flex items-center justify-center text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              {theme === "dark" ? <FiSun size={17} /> : <FiMoon size={17} />}
            </button>
          )}
          <Link href="/contact" className="hidden lg:flex btn-primary text-sm py-2 px-5">
            Hire Me
          </Link>
          {/* Mobile hamburger */}
          <button
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
            className="lg:hidden w-9 h-9 rounded-lg flex items-center justify-center text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            {open ? <FiX size={19} /> : <FiMenu size={19} />}
          </button>
        </div>
      </nav>

      {/* Mobile drawer */}
      {open && (
        <div className="lg:hidden bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800 px-5 pb-5 pt-2">
          <ul className="flex flex-col gap-1">
            {navLinks.map((l) => {
              const active = pathname === l.href;
              return (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className={`block px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                      active
                        ? "bg-accent-50 dark:bg-accent-900/30 text-accent-600 dark:text-accent-400"
                        : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                    }`}
                  >
                    {l.label}
                  </Link>
                </li>
              );
            })}
            <li className="pt-2">
              <Link href="/contact" className="btn-primary w-full justify-center text-sm py-2.5">
                Hire Me
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
