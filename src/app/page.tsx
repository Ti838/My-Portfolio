import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { FiArrowRight, FiDownload, FiGithub, FiLinkedin, FiCode, FiStar, FiMonitor, FiAward, FiMic, FiMessageCircle, FiTwitter, FiGlobe, FiLink, FiArrowUpRight } from "react-icons/fi";
import { getPersonalInfo, getAchievements, getSkills, getProjects, getTechColor, getSocialLinks } from "@/data/portfolio";
import EditableSection from "@/components/admin/EditableSection";
import TypeWriter from "@/components/ui/TypeWriter";
import ScrollReveal from "@/components/ui/ScrollReveal";
import GlowCard from "@/components/ui/GlowCard";
import AnimatedCounter from "@/components/ui/AnimatedCounter";
import MagneticButton from "@/components/ui/MagneticButton";

async function getLiveStats(params: { codeforcesHandle: string; githubUser: string; leetcodeUser: string }) {
  try {
    const cfHandle = params.codeforcesHandle;
    const ghUserName = params.githubUser;
    const lcUserName = params.leetcodeUser;

    const [cfUser, cfStatus, cfRatingRes, ghUser, lcUser] = await Promise.all([
      fetch(`https://codeforces.com/api/user.info?handles=${encodeURIComponent(cfHandle)}`, { next: { revalidate: 3600 } }).then(r => r.ok ? r.json() : null).catch(()=>null),
      fetch(`https://codeforces.com/api/user.status?handle=${encodeURIComponent(cfHandle)}`, { next: { revalidate: 3600 } }).then(r => r.ok ? r.json() : null).catch(()=>null),
      fetch(`https://codeforces.com/api/user.rating?handle=${encodeURIComponent(cfHandle)}`, { next: { revalidate: 3600 } }).then(r => r.ok ? r.json() : null).catch(()=>null),
      fetch(`https://api.github.com/users/${encodeURIComponent(ghUserName)}`, { next: { revalidate: 3600 } }).then(r => r.ok ? r.json() : null).catch(()=>null),
      fetch(`https://leetcode-stats-api.herokuapp.com/${encodeURIComponent(lcUserName)}`, { next: { revalidate: 3600 } }).then(r => r.ok ? r.json() : null).catch(()=>null)
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
    const lcSolved = lcUser?.totalSolved || 0;

    return { cfRating, cfSolved, cfContests, ghRepos, lcSolved };
  } catch (error) {
    return { cfRating: 863, cfSolved: 0, cfContests: 0, ghRepos: 10, lcSolved: 0 };
  }
}

export default async function HomePage() {
  const personalInfo = await getPersonalInfo();
  const codeforcesHandle = personalInfo.stats?.codeforces_handle || "Timon15";
  const githubUser = personalInfo.stats?.github_user || "Ti838";
  const leetcodeUser = personalInfo.stats?.leetcode_user || "zPb5WFxojz";

  const [achievements, skillCategories, projects, liveStats, socialLinks] = await Promise.all([
    getAchievements(),
    getSkills(),
    getProjects(),
    getLiveStats({ codeforcesHandle, githubUser, leetcodeUser }),
    getSocialLinks()
  ]);

  return (
    <>
      {/* ── Hero — PlantPot-inspired centered layout with mesh gradient ────── */}
      <EditableSection eventKey="hero" label="Hero Section">
        <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden mesh-gradient">
          {/* Floating orbs */}
          <div className="absolute top-1/3 left-1/4 w-72 h-72 bg-blue-400/10 rounded-full blur-[100px] animate-float-slow pointer-events-none" />
          <div className="absolute bottom-1/3 right-1/4 w-64 h-64 bg-indigo-400/10 rounded-full blur-[80px] animate-float pointer-events-none" />

          <div className="relative z-10 flex flex-col items-center text-center px-6 py-32 max-w-4xl mx-auto">
            {/* Profile Image — organic morph shape */}
            <ScrollReveal direction="none" delay={0}>
              <div className="relative group mb-12">
                <div className="absolute -inset-4 bg-gradient-to-tr from-blue-400/20 to-indigo-400/20 rounded-full blur-3xl opacity-50 group-hover:opacity-80 transition-opacity duration-1000" />
                <div className="relative w-40 h-40 lg:w-48 lg:h-48 animate-morph overflow-hidden shadow-2xl">
                  <Image
                    src={personalInfo.profileImage || "/images/profile.jpg"}
                    alt={personalInfo.name}
                    fill
                    className="object-cover scale-110 group-hover:scale-100 transition-transform duration-[2s]"
                    priority
                  />
                </div>
              </div>
            </ScrollReveal>

            {/* Handwritten greeting */}
            <ScrollReveal direction="up" delay={200}>
              <p className="font-display text-3xl lg:text-4xl text-[var(--accent)] mb-4">
                Hello, I&apos;m
              </p>
            </ScrollReveal>

            {/* Name */}
            <ScrollReveal direction="up" delay={300}>
              <h1 className="font-mono text-5xl lg:text-7xl xl:text-8xl font-bold text-[var(--text-primary)] leading-[1.1] tracking-tight mb-6">
                {personalInfo.name}
              </h1>
            </ScrollReveal>

            {/* Typewriter role */}
            <ScrollReveal direction="up" delay={400}>
              <div className="font-mono text-lg lg:text-xl text-[var(--text-muted)] mb-8">
                <TypeWriter
                  words={["Developer", "Competitive Programmer", "UI/UX Enthusiast", "Vocalist"]}
                  className="text-[var(--text-secondary)]"
                />
              </div>
            </ScrollReveal>

            {/* Bio */}
            <ScrollReveal direction="up" delay={500}>
              <p className="text-[var(--text-secondary)] text-lg max-w-xl leading-relaxed mb-12">
                {personalInfo.tagline}
              </p>
            </ScrollReveal>

            {/* CTA buttons */}
            <ScrollReveal direction="up" delay={600}>
              <div className="flex flex-wrap items-center justify-center gap-4">
                <MagneticButton>
                  <Link href="/contact" className="btn-primary">
                    Get in touch <FiArrowRight size={16} />
                  </Link>
                </MagneticButton>
                <MagneticButton>
                  <a href="/admin/download" className="btn-outline">
                    <FiDownload size={16} /> Resume
                  </a>
                </MagneticButton>
              </div>
            </ScrollReveal>

            {/* Social icons */}
            <ScrollReveal direction="up" delay={700} className="flex items-center gap-6 mt-12">
              {socialLinks.map((link: any) => {
                const Icon = {
                  FiGithub, FiLinkedin, FiCode, FiMessageCircle, FiTwitter, FiGlobe, FiMail: (props: any) => <span {...props}>@</span>
                }[link.icon as string] || FiLink;
                return (
                  <MagneticButton key={link.id || link.label} strength={0.2}>
                    <a
                      href={link.url}
                      target={link.url.startsWith("mailto") ? undefined : "_blank"}
                      rel="noopener noreferrer"
                      aria-label={link.label}
                      className="text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors"
                    >
                      <Icon size={20} />
                    </a>
                  </MagneticButton>
                );
              })}
            </ScrollReveal>
          </div>

          {/* Bottom copyright like PlantPot */}
          <div className="absolute bottom-8 left-0 right-0 text-center">
            <p className="font-mono text-[10px] text-[var(--text-muted)] tracking-widest">
              © {new Date().getFullYear()} timon.dev
            </p>
          </div>
        </section>
      </EditableSection>

      {/* ── Stats Strip ────────────────────────────────────────────────────── */}
      <EditableSection eventKey="stats" label="Stats">
        <section className="py-16 px-6 border-y border-[var(--border)]">
          <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { label: "CF Rating", value: liveStats.cfRating, suffix: "", color: "text-blue-500" },
              { label: "Problems Solved", value: liveStats.cfSolved + liveStats.lcSolved, suffix: "+", color: "text-emerald-500" },
              { label: "Repositories", value: liveStats.ghRepos, suffix: "", color: "text-violet-500" },
              { label: "Contests", value: liveStats.cfContests, suffix: "", color: "text-amber-500" },
            ].map((stat, i) => (
              <ScrollReveal key={stat.label} direction="up" delay={i * 100}>
                <div className="text-center space-y-2">
                  <AnimatedCounter
                    target={stat.value}
                    suffix={stat.suffix}
                    className={`text-4xl lg:text-5xl font-bold font-mono ${stat.color}`}
                  />
                  <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--text-muted)]">
                    {stat.label}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </section>
      </EditableSection>

      {/* ── Quick About ──────────────────────────────────────────────────── */}
      <EditableSection eventKey="bio" label="Quick About">
        <section className="py-32 px-6">
          <div className="max-w-5xl mx-auto">
            <ScrollReveal>
              <h2 className="section-title mb-4">What I do</h2>
            </ScrollReveal>
            <div className="grid md:grid-cols-3 gap-8 mt-16">
              {[
                { icon: <FiMonitor size={28} />, title: "Development", desc: "Crafting digital experiences with precision. Currently focusing on Jerry AI & Philomedis while mastering full-stack ecosystems." },
                { icon: <FiCode size={28} />, title: "Problem Solving", desc: "Fueled by logic. ICPC Honorable Mention and active solver on Codeforces & LeetCode." },
                { icon: <FiMic size={28} />, title: "Creative Arts", desc: "Passionate vocalist bringing soul to the stage. Merging creative expression with technical excellence." },
              ].map((item, i) => (
                <ScrollReveal key={item.title} delay={i * 150} direction="up">
                  <GlowCard className="glass-card p-10 h-full flex flex-col group">
                    <div className="mb-6 w-14 h-14 rounded-2xl bg-[var(--surface-secondary)] border border-[var(--border)] flex items-center justify-center text-[var(--accent)] group-hover:scale-110 transition-transform duration-500">
                      {item.icon}
                    </div>
                    <h3 className="font-mono font-bold text-lg text-[var(--text-primary)] mb-3">{item.title}</h3>
                    <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{item.desc}</p>
                  </GlowCard>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      </EditableSection>

      {/* ── Featured Projects ─────────────────────────────────────────────── */}
      <EditableSection eventKey="projects" label="Projects Section">
        <section id="projects" className="py-32 px-6 bg-[var(--surface-secondary)]">
          <div className="max-w-5xl mx-auto">
            <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-16 gap-6">
              <ScrollReveal direction="left">
                <span className="tag-pill mb-4">selected work</span>
                <h2 className="section-title">Projects</h2>
              </ScrollReveal>
              <ScrollReveal direction="right">
                <Link href="/projects" className="btn-outline text-xs group">
                  View all <FiArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </Link>
              </ScrollReveal>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {projects.filter((p) => p.featured).map((p, i) => (
                <ScrollReveal key={p.id} delay={i * 100} direction="up">
                  <GlowCard className="glass-card p-8 h-full flex flex-col group">
                    <div className="flex items-start justify-between gap-4 mb-6">
                      <h3 className="font-mono font-bold text-xl text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors">{p.title}</h3>
                      <span className={`shrink-0 px-3 py-1 rounded-full text-[10px] font-mono tracking-wider border ${p.status === "in-progress" ? "bg-amber-500/10 border-amber-500/20 text-amber-600 dark:text-amber-400" : "bg-emerald-500/10 border-emerald-500/20 text-emerald-600 dark:text-emerald-400"}`}>
                        {p.status === "in-progress" ? "wip" : "live"}
                      </span>
                    </div>
                    <p className="text-[var(--text-secondary)] leading-relaxed mb-8 flex-grow text-sm">{p.description}</p>
                    <div className="flex flex-wrap gap-2 mt-auto">
                      {p.techStack.map((t: string) => (
                        <span key={t} className="skill-pill text-[10px]">{t}</span>
                      ))}
                    </div>
                    <div className="flex gap-3 mt-6 pt-6 border-t border-[var(--border)]">
                      {p.githubUrl && (
                        <a href={p.githubUrl} target="_blank" rel="noopener noreferrer" className="font-mono text-xs text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors flex items-center gap-1">
                          <FiGithub size={14} /> source
                        </a>
                      )}
                      {p.liveUrl && (
                        <a href={p.liveUrl} target="_blank" rel="noopener noreferrer" className="font-mono text-xs text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors flex items-center gap-1">
                          <FiGlobe size={14} /> live
                        </a>
                      )}
                    </div>
                  </GlowCard>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      </EditableSection>

      {/* ── Skills ──────────────────────────────────────────────────────────── */}
      <EditableSection eventKey="skills" label="Skills Section">
        <section id="skills" className="py-32 px-6">
          <div className="max-w-5xl mx-auto">
            <ScrollReveal className="mb-16">
              <span className="tag-pill mb-4">mastery</span>
              <h2 className="section-title">Tech Stack</h2>
            </ScrollReveal>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {skillCategories.map((cat, i) => (
                <ScrollReveal key={cat.category} delay={i * 100} direction="up">
                  <div className="glass-card p-8 h-full">
                    <h3 className="font-mono font-bold text-sm text-[var(--text-primary)] mb-6 pb-4 border-b border-[var(--border)] uppercase tracking-wider">{cat.category}</h3>
                    <div className="flex flex-wrap gap-2">
                      {cat.skills.map((s: { name: string; level: number }) => (
                        <span key={s.name} className="skill-pill">{s.name}</span>
                      ))}
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      </EditableSection>

      {/* ── Achievements ─────────────────────────────────────────────────── */}
      <EditableSection eventKey="achievements" label="Achievements">
        <section id="achievements" className="py-32 px-6 bg-[var(--surface-secondary)]">
          <div className="max-w-5xl mx-auto">
            <ScrollReveal className="mb-16 text-center">
              <h2 className="section-title">Awards</h2>
            </ScrollReveal>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {achievements.slice(0, 4).map((a, i) => (
                <ScrollReveal key={a.id} delay={i * 100} direction="up">
                  <GlowCard className="glass-card p-8 h-full">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-10 h-10 rounded-full bg-[var(--surface-tertiary)] border border-[var(--border)] flex items-center justify-center text-[var(--accent)]">
                        <FiAward size={18} />
                      </div>
                      <span className="font-mono text-[10px] uppercase tracking-wider text-[var(--text-muted)]">{a.category}</span>
                    </div>
                    <h3 className="font-mono font-bold text-[var(--text-primary)] mb-3 leading-tight text-sm">{a.title}</h3>
                    <p className="text-xs text-[var(--text-secondary)] line-clamp-3 mb-4">{a.description}</p>
                    <p className="font-mono text-[10px] text-[var(--accent)] uppercase tracking-wider">{a.date}</p>
                  </GlowCard>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      </EditableSection>

      {/* ── CTA Banner ───────────────────────────────────────────────────── */}
      <EditableSection eventKey="cta" label="Collaboration Banner">
        <section className="py-32 px-6 mesh-gradient">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <ScrollReveal>
              <h2 className="font-display text-6xl lg:text-8xl text-[var(--text-primary)]">
                Let&apos;s work together
              </h2>
            </ScrollReveal>
            <ScrollReveal delay={200}>
              <p className="text-[var(--text-secondary)] text-lg max-w-md mx-auto">
                Open to collaborations, ambitious projects, and worldwide opportunities.
              </p>
            </ScrollReveal>
            <ScrollReveal delay={400}>
              <MagneticButton>
                <Link href="/contact" className="btn-primary">
                  Start a conversation <FiArrowRight size={16} />
                </Link>
              </MagneticButton>
            </ScrollReveal>
          </div>
        </section>
      </EditableSection>
    </>
  );
}
