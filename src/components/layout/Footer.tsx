"use client";
import Link from "next/link";
import { useAdmin } from "@/components/admin/AdminProvider";

export default function Footer({ socialLinks = [], tagline }: { socialLinks?: any[]; tagline?: string }) {
  const { isAdmin } = useAdmin();

  return (
    <footer className="relative py-12 px-6 sm:px-10">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="font-mono text-xs text-[var(--text-muted)] tracking-wider">
          © {new Date().getFullYear()} timon.dev
        </p>
        {!isAdmin && (
          <Link
            href="/admin"
            className="font-mono text-[10px] text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors opacity-0 hover:opacity-100 tracking-wider"
          >
            system
          </Link>
        )}
      </div>
    </footer>
  );
}
