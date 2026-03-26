import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { FiArrowRight, FiDownload, FiGithub, FiLinkedin, FiCode, FiStar, FiMonitor, FiAward, FiMic, FiMessageCircle, FiTwitter, FiGlobe, FiLink } from "react-icons/fi";
import { getPersonalInfo, getAchievements, getSkills, getProjects, getTechColor, getSocialLinks } from "@/data/portfolio";
import EditableSection from "@/components/admin/EditableSection";

export const metadata: Metadata = {
  title: "Timon Biswas — CSE Student & AI Enthusiast",
  description: "Personal portfolio of Timon Biswas — 2nd-year CSE student, ICPC 2024 Honorable Mention, AI & ML enthusiast from Bangladesh.",
};

async function getLiveStats() {
  try {
    const [cfUser, cfStatus, cfRatingRes, ghUser] = await Promise.all([
      fetch("https://codeforces.com/api/user.info?handles=Timon15", { next: { revalidate: 3600 } }).then(r => r.ok ? r.json() : null).catch(()=>null),
      fetch("https://codeforces.com/api/user.status?handle=Timon15", { next: { revalidate: 3600 } }).then(r => r.ok ? r.json() : null).catch(()=>null),
      fetch("https://codeforces.com/api/user.rating?handle=Timon15", { next: { revalidate: 3600 } }).then(r => r.ok ? r.json() : null).catch(()=>null),
      fetch("https://api.github.com/users/Ti838", { next: { revalidate: 3600 } }).then(r => r.ok ? r.json() : null).catch(()=>null)
    ]);

    const cfRating = cfUser?.result?.[0]?.rating || 863;
    let cfSolved = 0;
    
    if (cfStatus?.result) {
      const solved = new Set();
      cfStatus.result.forEach((sub: any) => {
        if (sub.verdict === 'OK') solved.add(`${sub.problem.contestId}-${sub.problem.index}`);
      });
      cfSolved = solved.size;
    }

    const cfContests = cfRatingRes?.result?.length || 0;
    const ghRepos = ghUser?.public_repos || 10;

    return { cfRating, cfSolved, cfContests, ghRepos };
  } catch (error) {
    return { cfRating: 863, cfSolved: 0, cfContests: 0, ghRepos: 10 };
  }
}

export default async function HomePage() {
  const [personalInfo, achievements, skillCategories, projects, liveStats, socialLinks] = await Promise.all([
    getPersonalInfo(),
    getAchievements(),
    getSkills(),
    getProjects(),
    getLiveStats(),
    getSocialLinks()
  ]);

  const cpProfiles = [
    { 
      label: "Codeforces", username: "Timon15", url: "https://codeforces.com/profile/Timon15", 
      color: "text-blue-500", bg: "bg-blue-50 dark:bg-blue-900/20",
      stats: personalInfo.stats?.codeforces_stats || `Rating: ${liveStats.cfRating} • Solved: ${liveStats.cfSolved} • Contests: ${liveStats.cfContests}`
    },
    { 
      label: "GitHub", username: "Ti838", url: "https://github.com/Ti838", 
      color: "text-slate-800 dark:text-white", bg: "bg-slate-100 dark:bg-slate-800",
      stats: personalInfo.stats?.github_stats || `${liveStats.ghRepos} Public Repositories`, badge: "PRO"
    },
    { 
      label: "Toph", username: "Timon15", url: "https://toph.co/u/Timon15", 
      color: "text-sky-500", bg: "bg-sky-50 dark:bg-sky-900/20",
      stats: personalInfo.stats?.toph_stats || "Active Profile"
    },
    { 
      label: "VJudge", username: "Timon15", url: "https://vjudge.net/user/Timon15", 
      color: "text-orange-500", bg: "bg-orange-50 dark:bg-orange-900/20",
      stats: personalInfo.stats?.vjudge_stats || "Active Profile"
    },
  ];

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────────────────────── */}
      <EditableSection eventKey="hero" label="Hero Section">
        <section className="relative pt-24 pb-16 lg:pt-36 lg:pb-20 overflow-hidden bg-white dark:bg-slate-900">
        {/* Dot grid bg */}
        <div className="absolute inset-0 dot-grid-bg opacity-60 dark:opacity-30 pointer-events-none" />
        {/* Blue glow */}
        <div className="absolute top-1/2 right-1/4 w-96 h-96 -translate-y-1/2 bg-accent-400/10 dark:bg-accent-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-6xl mx-auto px-5 w-full grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Text */}
          <div className="space-y-7 animate-fade-up">
            <span className="tag-pill">📍 {personalInfo.location || "Dhaka, Bangladesh"}</span>

            <h1 className="font-display text-5xl lg:text-6xl font-900 text-slate-900 dark:text-white leading-[1.1] tracking-tight">
              Hi, I&apos;m{" "}
              <span className="text-accent-500">{personalInfo.name.split(" ")[0]}</span>{" "}
              <br className="hidden sm:block" />
              {personalInfo.name.split(" ").slice(1).join(" ")}
            </h1>

            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-lg leading-relaxed">
              {personalInfo.tagline}
            </p>

            {/* CTA buttons */}
            <div className="flex flex-wrap gap-3 pt-2">
              <Link href="/contact" className="btn-primary">
                Let&apos;s Collaborate <FiArrowRight size={16} />
              </Link>
              <Link href="/projects" className="btn-outline">
                View Projects
              </Link>
              <a
                href="/admin"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-sm font-semibold hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
              >
                <FiDownload size={15} /> Resume
              </a>
            </div>

            {/* Socials row */}
            <div className="flex items-center gap-5 pt-2">
              {socialLinks.map((link: any) => {
                const Icon = {
                  FiGithub, FiLinkedin, FiCode, FiMessageCircle, FiTwitter, FiGlobe, FiMail: (props: any) => <span {...props}>@</span>
                }[link.icon as string] || FiLink;
                return (
                  <a 
                    key={link.id || link.label}
                    href={link.url} 
                    target={link.url.startsWith("mailto") ? undefined : "_blank"} 
                    rel="noopener noreferrer" 
                    aria-label={link.label}
                    className="text-slate-500 hover:text-accent-500 hover:scale-110 transition-all"
                  >
                    <Icon size={22} />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Photo + stats */}
          <div className="flex flex-col items-center gap-8 animate-fade-up" style={{ animationDelay: "0.15s" }}>
            {/* Profile image */}
            <div className="relative">
              <div className="absolute -inset-3 rounded-full bg-gradient-to-br from-accent-400/30 to-accent-600/10 blur-xl" />
              <div className="relative w-60 h-60 lg:w-72 lg:h-72 rounded-full overflow-hidden border-4 border-white dark:border-slate-800 shadow-xl">
                <Image
                  src={personalInfo.profileImage || "/images/profile.jpg"}
                  alt={personalInfo.name}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              {/* ICPC badge */}
              <a href={personalInfo.stats?.icpc_certificate_url || "#"} target={personalInfo.stats?.icpc_certificate_url ? "_blank" : "_self"} rel="noopener noreferrer" className="absolute -bottom-3 -right-3 bg-white dark:bg-slate-800 rounded-xl px-3 py-1.5 shadow-lg border border-slate-100 dark:border-slate-700 flex items-center gap-2 hover:scale-105 transition-transform cursor-pointer group">
                <span className="text-lg group-hover:rotate-12 transition-transform">🏆</span>
                <div>
                  <p className="text-[10px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">ICPC 2024</p>
                  <p className="text-xs font-bold text-slate-900 dark:text-white">Honorable Mention</p>
                </div>
              </a>
            </div>

            {/* Stats grid (CP Profiles) */}
            <div className="grid grid-cols-2 gap-3 w-full max-w-sm">
              {cpProfiles.map(({ label, username, url, color, bg, stats, badge }) => (
                <a 
                  key={label} 
                  href={url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className={`card-base p-4 flex flex-col items-center justify-center gap-1.5 hover:scale-105 transition-all text-center group cursor-pointer border hover:border-accent-200 dark:hover:border-accent-800 relative`}
                >
                  <div className="flex items-center gap-2">
                    <span className={`text-[10px] font-bold uppercase tracking-widest opacity-60`}>{label}</span>
                    {badge && (
                      <span className="flex items-center gap-1 border border-[#a855f7] text-[#a855f7] rounded-full px-1.5 py-[1px] text-[8px] font-bold tracking-wider relative overflow-hidden group-hover:shadow-[0_0_10px_rgba(168,85,247,0.4)] transition-all">
                        <FiStar size={8} /> {badge}
                      </span>
                    )}
                  </div>
                  <div className={`px-3 py-1 rounded-full ${bg}`}>
                    <span className={`text-sm font-bold ${color}`}>{username}</span>
                  </div>
                  {stats && (
                    <span className="text-[10px] font-semibold text-slate-500 dark:text-slate-400 mt-1">
                      {stats}
                    </span>
                  )}
                  <div className="absolute top-2 right-2 flex gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>
      </EditableSection>

      {/* ── Quick About ──────────────────────────────────────────────────────── */}
      <EditableSection eventKey="bio" label="Quick About">
        <section className="bg-slate-50 dark:bg-slate-800/40 py-16 lg:py-20 px-5">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
          {[
            { icon: <div className="p-3 bg-blue-50 dark:bg-blue-900/20 text-blue-500 rounded-2xl w-fit"><FiMonitor size={24} /></div>, title: "Developer", desc: "Building the Philomedis Medical App solo. Experienced in Android (Java), Dart, PHP, and Python. Always shifting ideas into real-world code." },
            { icon: <div className="p-3 bg-amber-50 dark:bg-amber-900/20 text-amber-500 rounded-2xl w-fit"><FiAward size={24} /></div>, title: "Competitive Programmer", desc: "ICPC Asia Dhaka 2024 Honorable Mention. Active on Codeforces & LeetCode." },
            { icon: <div className="p-3 bg-purple-50 dark:bg-purple-900/20 text-purple-500 rounded-2xl w-fit"><FiMic size={24} /></div>, title: "Vocalist", desc: "Performed at college events. Passionate about emotional vocal delivery and stage presence." },
          ].map(({ icon, title, desc }) => (
            <div key={title} className="card-base p-7 flex flex-col items-start hover:-translate-y-1 transition-transform">
              {icon}
              <h3 className="font-display font-700 text-lg text-slate-900 dark:text-white mt-4 mb-2">{title}</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>
      </EditableSection>

      {/* ── Featured Projects ─────────────────────────────────────────────────── */}
      <EditableSection eventKey="projects" label="Projects Section">
        <section id="projects" className="py-16 lg:py-20 px-5 bg-white dark:bg-slate-900">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-end justify-between mb-12">
            <div>
              <span className="tag-pill mb-3">Work</span>
              <h2 className="section-title">Featured Projects</h2>
            </div>
            <Link href="/projects" className="btn-outline text-sm py-2 px-5 hidden sm:flex">
              All Projects <FiArrowRight size={14} />
            </Link>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {projects.filter((p) => p.featured).map((p) => (
              <div key={p.id} className="card-base p-7 flex flex-col gap-4">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="font-display font-700 text-slate-900 dark:text-white text-lg">{p.title}</h3>
                  <span className={`tag-pill text-[10px] shrink-0 ${p.status === "in-progress" ? "bg-amber-50 text-amber-600" : "bg-green-50 text-green-600"}`}>
                    {p.status === "in-progress" ? "In Progress" : "Live"}
                  </span>
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{p.description}</p>
                <div className="flex flex-wrap gap-2 mt-auto">
                  {p.techStack.map((t: string) => (
                    <span
                      key={t}
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${getTechColor(t)}`}
                    >
                      {t}
                    </span>))}
                </div>
                <div className="flex gap-3 pt-1">
                  {p.githubUrl && (
                    <a href={p.githubUrl} target="_blank" rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-accent-500 transition-colors">
                      <FiGithub size={13} /> GitHub
                    </a>
                  )}
                  {p.liveUrl && (
                    <a href={p.liveUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-xs font-semibold text-accent-500 hover:text-accent-600 transition-colors">
                      <FiArrowRight size={13} /> Live Demo
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      </EditableSection>

      {/* ── Skills ──────────────────────────────────────────────────────────── */}
      <EditableSection eventKey="bio" label="Skills Section">
        <section id="skills" className="py-16 lg:py-20 px-5 bg-slate-50 dark:bg-slate-800/40">
          <div className="max-w-6xl mx-auto">
            <div className="mb-12">
              <span className="tag-pill mb-3">Expertise</span>
              <h2 className="section-title">Technical Skills</h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {skillCategories.map((cat) => (
                <div key={cat.category} className="card-base p-6">
                  <h3 className="font-display font-700 text-slate-900 dark:text-white mb-4">{cat.category}</h3>
                  <div className="space-y-3">
                    {cat.skills.map((s: { name: string, level: number }) => (
                      <div key={s.name}>
                        <div className="flex justify-between text-xs mb-1">
                          <span className="text-slate-600 dark:text-slate-400">{s.name}</span>
                          <span className="text-accent-500 font-bold">{s.level}%</span>
                        </div>
                        <div className="h-1.5 w-full bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                          <div className="h-full bg-accent-500 rounded-full" style={{ width: `${s.level}%` }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </EditableSection>

      {/* ── Experience ───────────────────────────────────────────────────────── */}
      <EditableSection eventKey="bio" label="Work Experience">
        <section id="experience" className="py-16 lg:py-20 px-5 bg-white dark:bg-slate-900">
          <div className="max-w-6xl mx-auto">
            <div className="mb-12">
              <span className="tag-pill mb-3">Story</span>
              <h2 className="section-title">Work & Experience</h2>
            </div>
            {/* Experience details would go here. Providing a robust layout. */}
            <div className="grid gap-8">
              <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
                <p className="text-slate-500 italic text-center">Customize your work history in the visual builder.</p>
              </div>
            </div>
          </div>
        </section>
      </EditableSection>

      {/* ── Achievements ─────────────────────────────────────────────────────── */}
      <EditableSection eventKey="achievements" label="Achievements">
        <section id="achievements" className="py-16 lg:py-20 px-5 bg-slate-50 dark:bg-slate-800/40">
          <div className="max-w-6xl mx-auto text-center">
            <h2 className="section-title mb-12">Academic & CP Achievements</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
              {achievements.map((a) => (
                <div key={a.id} className="card-base p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <FiAward className="text-accent-500" size={20} />
                    <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">{a.category}</span>
                  </div>
                  <h3 className="font-700 text-slate-900 dark:text-white mb-2 leading-tight">{a.title}</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-3 mb-3">{a.description}</p>
                  <p className="text-[10px] font-bold text-slate-400">{a.date}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </EditableSection>

      {/* ── CTA Banner ───────────────────────────────────────────────────────── */}
      <EditableSection eventKey="bio" label="Collaboration Banner">
        <section className="py-12 lg:py-16 px-5 bg-accent-500 dark:bg-accent-600">
          <div className="max-w-3xl mx-auto text-center text-white space-y-5">
            <h2 className="font-display font-900 text-3xl lg:text-4xl">Let&apos;s build something great together</h2>
            <p className="text-accent-100 text-lg">Open to collaborations, projects, and opportunities.</p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-white text-accent-600 font-700 rounded-full hover:bg-accent-50 transition-colors shadow-lg"
            >
              Get in Touch <FiArrowRight size={16} />
            </Link>
          </div>
        </section>
      </EditableSection>
    </>
  );
}
