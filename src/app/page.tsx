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
import AwardsList from "@/components/sections/AwardsList";

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
      {/* ── Hero — PlantPot-inspired centered layout ────── */}
      <EditableSection eventKey="hero" label="Hero Section">
        <section className="relative min-h-[90vh] flex flex-col items-center justify-start overflow-hidden mesh-gradient pt-32 pb-20 px-6">
          {/* Floating orbs */}
          <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-blue-400/10 rounded-full blur-[100px] animate-float-slow pointer-events-none" />
          <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-indigo-400/10 rounded-full blur-[80px] animate-float pointer-events-none" />
 
          <div className="relative z-10 flex flex-col items-center text-center w-full max-w-4xl mx-auto">
            {/* Professional Profile Image — PlantPot style */}
            <ScrollReveal direction="up" delay={100}>
              <div className="relative w-44 h-44 md:w-52 md:h-52 mb-8 group">
                {/* Animated soft glow behind image */}
                <div className="absolute inset-0 bg-[var(--accent)]/20 blur-3xl rounded-full scale-110 group-hover:bg-[var(--accent)]/30 transition-all duration-700 pointer-events-none" />
                
                <div className="relative w-full h-full rounded-[48px] overflow-hidden border-2 border-[var(--border)] shadow-xl bg-[var(--surface-secondary)] group-hover:rounded-[32px] transition-all duration-700">
                  <Image
                    src="/profile.jpg"
                    alt={personalInfo.name}
                    fill
                    className="object-cover object-top group-hover:scale-105 transition-transform duration-700"
                    priority
                  />
                </div>
                
                {/* Decorative floating element */}
                <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-[var(--surface)] border border-[var(--border)] rounded-xl flex items-center justify-center shadow-lg animate-float text-[var(--accent)]">
                  <FiStar size={18} fill="currentColor" />
                </div>
              </div>
            </ScrollReveal>
 
            {/* Handwritten greeting */}
            <ScrollReveal direction="up" delay={200}>
              <p className="font-display text-2xl lg:text-3xl text-[var(--accent)] mb-2">
                Hello, I&apos;m
              </p>
            </ScrollReveal>
 
            {/* Name */}
            <ScrollReveal direction="up" delay={300}>
              <h1 className="font-mono text-4xl lg:text-6xl xl:text-7xl font-bold text-[var(--text-primary)] leading-[1.1] tracking-tight mb-4">
                {personalInfo.name}
              </h1>
            </ScrollReveal>
 
            {/* Typewriter role */}
            <ScrollReveal direction="up" delay={400}>
              <div className="font-mono text-base lg:text-lg text-[var(--text-muted)] mb-6">
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

      {/* ── Developer Pulse — Multi-platform stats ──────────────────────────── */}
      <EditableSection eventKey="stats" label="Developer Stats">
        <section className="py-24 px-6 relative overflow-hidden">
          {/* Subtle background glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[var(--accent)]/5 blur-[120px] rounded-full pointer-events-none" />
          
          <div className="max-w-6xl mx-auto relative z-10">
            <ScrollReveal direction="up">
              <div className="flex flex-col items-center text-center mb-16">
                <span className="tag-pill mb-4">live stats</span>
                <h2 className="text-3xl font-mono font-bold text-[var(--text-primary)]">Coding Identity</h2>
              </div>
            </ScrollReveal>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { 
                  label: "Codeforces", 
                  title: "CF Rating", 
                  value: liveStats.cfRating, 
                  icon: <FiCode className="text-blue-500" />,
                  detail: `${liveStats.cfContests} Contests Played`,
                  color: "from-blue-500/10 to-blue-500/5",
                  border: "border-blue-500/20"
                },
                { 
                  label: "LeetCode", 
                  title: "Solved", 
                  value: liveStats.lcSolved, 
                  icon: <FiStar className="text-amber-500" />,
                  detail: "Data Structures & Algorithms",
                  color: "from-amber-500/10 to-amber-500/5",
                  border: "border-amber-500/20"
                },
                { 
                  label: "GitHub", 
                  title: "Repositories", 
                  value: liveStats.ghRepos, 
                  icon: <FiGithub className="text-violet-500" />,
                  detail: "Open Source Projects",
                  color: "from-violet-500/10 to-violet-500/5",
                  border: "border-violet-500/20"
                },
                { 
                  label: "Overall", 
                  title: "Total Solved", 
                  value: liveStats.cfSolved + liveStats.lcSolved, 
                  icon: <FiAward className="text-emerald-500" />,
                  detail: "Across Platforms",
                  color: "from-emerald-500/10 to-emerald-500/5",
                  border: "border-emerald-500/20"
                }
              ].map((stat, i) => (
                <ScrollReveal key={stat.label} direction="up" delay={i * 100}>
                  <div className={`p-8 rounded-[32px] border ${stat.border} bg-gradient-to-br ${stat.color} backdrop-blur-sm h-full group hover:scale-[1.02] transition-all duration-500`}>
                    <div className="flex items-center justify-between mb-8">
                      <div className="p-3 rounded-2xl bg-[var(--surface)] shadow-sm text-xl">
                        {stat.icon}
                      </div>
                      <span className="font-mono text-[10px] uppercase tracking-widest text-[var(--text-muted)] group-hover:text-[var(--text-primary)] transition-colors">
                        {stat.label}
                      </span>
                    </div>
                    <div className="mb-2">
                      <AnimatedCounter
                        target={stat.value}
                        className="text-4xl font-bold font-mono text-[var(--text-primary)]"
                      />
                    </div>
                    <h3 className="font-mono text-xs font-bold text-[var(--text-secondary)] mb-4">{stat.title}</h3>
                    <p className="font-mono text-[10px] text-[var(--text-muted)] opacity-60">
                      {stat.detail}
                    </p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
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
            <AwardsList achievements={achievements} />
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
