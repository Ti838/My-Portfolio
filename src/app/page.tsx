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
import Hero from "@/components/sections/Hero";

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
      {/* ── Hero — Parallax Background Layout ─────────────────────────── */}
      <EditableSection eventKey="hero" label="Hero Section">
        <Hero personalInfo={personalInfo} />
      </EditableSection>

      {/* ── Developer Pulse — Coding Identity ──────────────────────────── */}
      <EditableSection eventKey="stats" label="Developer Stats">
        <section className="py-24 px-6 relative overflow-hidden bg-[var(--surface-secondary)]/30">
          <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_center,var(--accent-muted)_0%,transparent_70%)] opacity-[0.03] pointer-events-none" />
          
          <div className="max-w-6xl mx-auto relative z-10">
            <ScrollReveal direction="up">
              <div className="flex flex-col items-center text-center mb-16">
                <span className="tag-pill mb-4 font-mono text-[10px] tracking-[0.2em] uppercase">verified metrics</span>
                <h2 className="text-4xl md:text-5xl font-display font-bold text-[var(--text-primary)] mb-4">Coding Identity</h2>
                <p className="text-[var(--text-muted)] max-w-xl text-sm">Real-time statistics and badges across major competitive programming and development platforms.</p>
              </div>
            </ScrollReveal>

            {/* Badges Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* GitHub Card - Featured */}
              <ScrollReveal direction="up" delay={100} className="md:col-span-2 lg:col-span-1">
                <GlowCard className="h-full group">
                  <div className="p-6 h-full flex flex-col justify-between">
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-2xl bg-slate-900 flex items-center justify-center text-white">
                          <FiGithub size={24} />
                        </div>
                        <div>
                          <h3 className="font-bold text-[var(--text-primary)]">GitHub</h3>
                          <p className="text-[10px] text-[var(--text-muted)] uppercase tracking-widest">Open Source</p>
                        </div>
                      </div>
                      <span className="text-[var(--accent)]"><FiArrowUpRight size={20} /></span>
                    </div>
                    
                    <div className="flex flex-col gap-4 mb-6">
                      <Image 
                        src={`https://github-readme-stats.vercel.app/api?username=${githubUser}&show_icons=true&theme=transparent&title_color=0070f3&text_color=888&icon_color=0070f3&hide_border=true`}
                        alt="GitHub Stats"
                        width={400}
                        height={150}
                        className="w-full opacity-80 group-hover:opacity-100 transition-opacity"
                        unoptimized
                      />
                      <div className="flex flex-wrap gap-2">
                        <img src={`https://img.shields.io/github/followers/${githubUser}?style=flat-square&logo=github&color=333`} alt="GitHub Followers" />
                        <img src={`https://img.shields.io/github/stars/${githubUser}?style=flat-square&logo=github&color=333`} alt="GitHub Stars" />
                      </div>
                    </div>
                  </div>
                </GlowCard>
              </ScrollReveal>

              {/* Codeforces Card */}
              <ScrollReveal direction="up" delay={200}>
                <GlowCard className="h-full group">
                  <div className="p-6 h-full flex flex-col justify-between">
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-500 font-bold">
                          CF
                        </div>
                        <div>
                          <h3 className="font-bold text-[var(--text-primary)]">Codeforces</h3>
                          <p className="text-[10px] text-[var(--text-muted)] uppercase tracking-widest">Competitive</p>
                        </div>
                      </div>
                      <span className="text-blue-500"><FiAward size={20} /></span>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-[var(--text-muted)]">Max Rating</span>
                        <span className="font-mono font-bold text-blue-500">{liveStats.cfRating}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-[var(--text-muted)]">Problems Solved</span>
                        <span className="font-mono font-bold text-[var(--text-primary)]">{liveStats.cfSolved}+</span>
                      </div>
                      <img 
                        src={`https://img.shields.io/badge/Codeforces-${codeforcesHandle}-blue?style=for-the-badge&logo=codeforces`} 
                        alt="Codeforces Badge"
                        className="w-full mt-4"
                      />
                    </div>
                  </div>
                </GlowCard>
              </ScrollReveal>

              {/* LeetCode Card */}
              <ScrollReveal direction="up" delay={300}>
                <GlowCard className="h-full group">
                  <div className="p-6 h-full flex flex-col justify-between">
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-2xl bg-amber-500/10 flex items-center justify-center text-amber-500">
                          <FiCode size={24} />
                        </div>
                        <div>
                          <h3 className="font-bold text-[var(--text-primary)]">LeetCode</h3>
                          <p className="text-[10px] text-[var(--text-muted)] uppercase tracking-widest">Algorithms</p>
                        </div>
                      </div>
                      <span className="text-amber-500"><FiMonitor size={20} /></span>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-[var(--text-muted)]">Solved</span>
                        <span className="font-mono font-bold text-amber-500">{liveStats.lcSolved}</span>
                      </div>
                      <img 
                        src={`https://img.shields.io/badge/LeetCode-${leetcodeUser}-orange?style=for-the-badge&logo=leetcode`} 
                        alt="LeetCode Badge"
                        className="w-full mt-4"
                      />
                    </div>
                  </div>
                </GlowCard>
              </ScrollReveal>

              {/* Toph & VJudge Badges */}
              <ScrollReveal direction="up" delay={400} className="md:col-span-2 lg:col-span-3">
                <div className="flex flex-wrap items-center justify-center gap-6 py-10 border-t border-[var(--border)] mt-8">
                  <div className="flex items-center gap-4 px-8 py-4 rounded-2xl bg-[var(--surface)] border border-[var(--border)] hover:border-[var(--accent)] transition-all group">
                    <span className="font-bold text-[var(--text-primary)]">Toph</span>
                    <img src={`https://img.shields.io/badge/Toph-${personalInfo.stats?.toph_handle || "Timon"}-green?style=for-the-badge`} alt="Toph Badge" className="h-6" />
                  </div>
                  <div className="flex items-center gap-4 px-8 py-4 rounded-2xl bg-[var(--surface)] border border-[var(--border)] hover:border-red-500 transition-all group">
                    <span className="font-bold text-[var(--text-primary)]">VJudge</span>
                    <img src={`https://img.shields.io/badge/VJudge-${personalInfo.stats?.vjudge_handle || "Timon"}-red?style=for-the-badge`} alt="VJudge Badge" className="h-6" />
                  </div>
                </div>
              </ScrollReveal>
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
