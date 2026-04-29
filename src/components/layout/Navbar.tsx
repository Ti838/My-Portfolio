"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { useAdmin } from "@/components/admin/AdminProvider";
import { FiSun, FiMoon, FiMenu, FiX, FiArrowUpRight } from "react-icons/fi";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/skills", label: "Skills" },
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

  useEffect(() => {
    setMounted(true);
  }, []);

  // Lock body scroll when menu is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  if (!mounted) return null;

  return (
    <>
      {/* Ultra-minimal fixed header — PlantPot style */}
      <header className="fixed top-0 left-0 w-full z-50 px-6 sm:px-10 py-6 flex items-center justify-between pointer-events-none">
        {/* Logo — small icon */}
        <Link
          href="/"
          className="pointer-events-auto relative w-11 h-11 rounded-2xl bg-[var(--text-primary)] flex items-center justify-center overflow-hidden shadow-lg hover:scale-110 transition-transform duration-500 group"
        >
          {logoImage ? (
            <Image src={logoImage} alt="Logo" fill className="object-cover" />
          ) : (
            <span className="font-display text-2xl text-[var(--surface)] group-hover:rotate-12 transition-transform">T</span>
          )}
        </Link>

        {/* Right controls */}
        <div className="flex items-center gap-3 pointer-events-auto">
          {/* Theme toggle */}
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="w-11 h-11 rounded-2xl border border-[var(--border)] bg-[var(--surface-secondary)] flex items-center justify-center text-[var(--text-secondary)] hover:text-[var(--accent)] hover:border-[var(--accent)] transition-all duration-300"
            aria-label="Toggle Theme"
          >
            {theme === "dark" ? <FiSun size={18} /> : <FiMoon size={18} />}
          </button>

          {/* Hamburger */}
          <button
            onClick={() => setOpen(!open)}
            className="w-11 h-11 rounded-2xl border border-[var(--border)] bg-[var(--surface-secondary)] flex items-center justify-center text-[var(--text-secondary)] hover:text-[var(--accent)] hover:border-[var(--accent)] transition-all duration-300"
            aria-label="Toggle Menu"
          >
            {open ? <FiX size={20} /> : <FiMenu size={20} />}
          </button>
        </div>
      </header>

      {/* Full-screen menu overlay */}
      <div
        className={`fixed inset-0 z-40 transition-all duration-700 ${
          open
            ? "opacity-100 visible"
            : "opacity-0 invisible pointer-events-none"
        }`}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-[var(--surface)] mesh-gradient"
          onClick={() => setOpen(false)}
        />

        {/* Menu content */}
        <nav className="relative z-10 w-full h-full flex flex-col items-center justify-center overflow-y-auto px-6 py-24">
          <div className="flex flex-col items-center gap-6 w-full max-w-md m-auto">
            {navLinks.map((link, i) => {
              const active = pathname === link.href;
              
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  style={{ transitionDelay: open ? `${i * 50}ms` : "0ms" }}
                  className={`group relative transition-all duration-700 ${
                    open ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
                  }`}
                >
                  <span className={`block font-display text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight text-center px-4 transition-all duration-300 ${
                    active 
                      ? "text-[var(--accent)]" 
                      : "text-[var(--text-secondary)] group-hover:text-[var(--text-primary)] group-hover:scale-105"
                  }`}>
                    {link.label}
                  </span>
                </Link>
              );
            })}
          </div>

          {/* Footer in menu */}
          <div className="mt-12 mb-4 text-center">
            <p className="font-mono text-xs text-[var(--text-muted)] tracking-wider">
              © {new Date().getFullYear()} timon.dev
            </p>
          </div>
        </nav>
      </div>
    </>
  );
}
