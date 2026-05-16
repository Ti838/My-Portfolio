"use client";

import { Monitor, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const options = [
  { value: "light", label: "Light", icon: Sun },
  { value: "dark", label: "Dark", icon: Moon },
  { value: "system", label: "System", icon: Monitor },
];

export default function ThemeToggle({ compact = false }: { compact?: boolean }) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return <div className={compact ? "h-10 w-10 rounded-full glass" : "h-10 w-[124px] rounded-full glass"} />;
  }

  if (compact) {
    const currentIndex = Math.max(0, options.findIndex((option) => option.value === theme));
    const CurrentIcon = options[currentIndex]?.icon || Monitor;
    const nextTheme = options[(currentIndex + 1) % options.length]?.value || "system";

    return (
      <button
        type="button"
        onClick={() => setTheme(nextTheme)}
        aria-label="Change theme"
        title={`Theme: ${theme || "system"}`}
        className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-text-1 backdrop-blur-xl transition hover:border-cyan-300/30 hover:text-cyan-300"
      >
        <CurrentIcon size={17} />
      </button>
    );
  }

  return (
    <div className="inline-flex items-center gap-1 rounded-full border border-[var(--border)] bg-[var(--bg-elevated)] p-1">
      {options.map((option) => {
        const Icon = option.icon;
        const active = theme === option.value;
        return (
          <button
            key={option.value}
            type="button"
            onClick={() => setTheme(option.value)}
            aria-label={`Use ${option.label} theme`}
            title={`${option.label} theme`}
            className={`flex h-8 w-8 items-center justify-center rounded-full transition ${
              active ? "bg-[var(--accent)] text-white shadow-lg shadow-cyan-500/15" : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
            }`}
          >
            <Icon size={15} />
          </button>
        );
      })}
    </div>
  );
}
