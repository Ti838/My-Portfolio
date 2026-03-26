import Link from "next/link";
import { FiGithub, FiLinkedin, FiMail, FiCode, FiMessageCircle, FiTwitter, FiGlobe, FiLink } from "react-icons/fi";

const icons: Record<string, any> = {
  FiGithub, FiLinkedin, FiMail, FiCode, FiMessageCircle, FiTwitter, FiGlobe, FiLink
};

export default function Footer({ socialLinks = [] }: { socialLinks?: any[] }) {
  return (
    <footer className="border-t border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900">
      <div className="max-w-6xl mx-auto px-5 py-10 flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <p className="font-display font-bold text-slate-900 dark:text-white text-lg">
            Timon<span className="text-accent-500">.</span>
          </p>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            CSE Student · AI Enthusiast · Competitive Programmer
          </p>
        </div>
        <div className="flex items-center gap-3">
          {socialLinks.map(({ url, icon, label, id }) => {
            const Icon = icons[icon] || FiLink;
            return (
              <a
                key={id || label}
                href={url}
                target={url.startsWith("mailto") ? undefined : "_blank"}
                rel="noopener noreferrer"
                aria-label={label}
                className="w-9 h-9 rounded-lg flex items-center justify-center text-slate-500 dark:text-slate-400 hover:text-accent-500 dark:hover:text-accent-400 hover:bg-accent-50 dark:hover:bg-accent-900/20 transition-all font-bold group"
              >
                <Icon size={17} className="group-hover:scale-110 transition-transform" />
              </a>
            );
          })}
        </div>
        <p className="text-xs text-slate-400 dark:text-slate-600">
          © {new Date().getFullYear()} Timon Biswas. All rights reserved.
          <Link href="/admin/dashboard" className="ml-2 text-[10px] text-slate-300 dark:text-slate-700 hover:text-accent-500 transition-colors opacity-0 hover:opacity-100">Admin</Link>
        </p>
      </div>
    </footer>
  );
}
