import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { FiArrowRight, FiDownload, FiGithub, FiLinkedin, FiCode, FiStar, FiMonitor, FiAward, FiMic, FiMessageCircle, FiTwitter, FiGlobe, FiLink } from "react-icons/fi";
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
  const tophUser = personalInfo.stats?.toph_user || codeforcesHandle;
  const vjudgeUser = personalInfo.stats?.vjudge_user || codeforcesHandle;

  const [achievements, skillCategories, projects, liveStats, socialLinks] = await Promise.all([
    getAchievements(),
    getSkills(),
    getProjects(),
    getLiveStats({ codeforcesHandle, githubUser, leetcodeUser }),
    getSocialLinks()
  ]);

  const cpProfiles = [
    { 
      label: "Codeforces", username: codeforcesHandle, url: `https://codeforces.com/profile/${encodeURIComponent(codeforcesHandle)}`, 
      color: "text-blue-500", bg: "bg-blue-50 dark:bg-blue-900/20",
      stats: personalInfo.stats?.codeforces_stats || `Rating: ${liveStats.cfRating} • Solved: ${liveStats.cfSolved} • Contests: ${liveStats.cfContests}`
    },
    { 
      label: "LeetCode", username: leetcodeUser, url: `https://leetcode.com/u/${encodeURIComponent(leetcodeUser)}/`, 
      color: "text-amber-500", bg: "bg-amber-50 dark:bg-amber-900/20",
      stats: personalInfo.stats?.leetcode_stats || `Solved: ${liveStats.lcSolved}`
    },
    { 
      label: "GitHub", username: githubUser, url: `https://github.com/${encodeURIComponent(githubUser)}`, 
      color: "text-slate-800 dark:text-white", bg: "bg-slate-100 dark:bg-slate-800",
      stats: personalInfo.stats?.github_stats || `${liveStats.ghRepos} Public Repositories`, badge: "PRO"
    },
    { 
      label: "Toph", username: tophUser, url: `https://toph.co/u/${encodeURIComponent(tophUser)}`, 
      color: "text-sky-500", bg: "bg-sky-50 dark:bg-sky-900/20",
      stats: personalInfo.stats?.toph_stats || "Active Profile"
    },
    { 
      label: "VJudge", username: vjudgeUser, url: `https://vjudge.net/user/${encodeURIComponent(vjudgeUser)}`, 
      color: "text-orange-500", bg: "bg-orange-50 dark:bg-orange-900/20",
      stats: personalInfo.stats?.vjudge_stats || "Active Profile"
    },
  ];

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────────────────────── */}
      <EditableSection eventKey="hero" label="Hero Section">
        <section className="relative min-h-[90vh] flex items-center pt-32 pb-24 lg:pt-48 overflow-hidden">
        {/* Cinematic Background */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-accent-500/5 via-transparent to-transparent" />
          <div className="absolute top-1/4 -left-10 w-[500px] h-[500px] bg-accent-500/10 rounded-full blur-[120px] animate-pulse" />
          <div className="absolute bottom-1/4 -right-10 w-[400px] h-[400px] bg-purple-500/10 rounded-full blur-[100px] animate-float-slow" />
        </div>
        
        <div className="max-w-7xl mx-auto px-5 w-full relative z-10">
          <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-16 lg:gap-24 items-center">
            {/* Text Content */}
            <div className="space-y-10">
              <ScrollReveal direction="left" delay={100}>
                {personalInfo.stats?.location_public !== false && (
                  <div className="inline-flex items-center gap-3 py-2.5 px-5 rounded-full glass border-white/20 shadow-xl">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-accent-500"></span>
                    </span>
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">
                      Available for Projects Worldwide
                    </span>
                  </div>
                )}
              </ScrollReveal>

              <ScrollReveal direction="up" delay={200}>
                <h1 className="font-display text-7xl lg:text-9xl font-900 text-slate-900 dark:text-white leading-[0.85] tracking-tighter uppercase">
                  Hi, I&apos;m <br />
                  <span className="text-accent-500">Timon</span>{" "}
                  <span className="text-slate-200 dark:text-white/5">Biswas</span>
                </h1>
              </ScrollReveal>

              <ScrollReveal direction="up" delay={300}>
                <div className="flex flex-col gap-4">
                  <div className="text-2xl lg:text-3xl font-black text-slate-600 dark:text-slate-400 tracking-tight flex flex-wrap gap-x-3 uppercase">
                    I am a <TypeWriter 
                      words={["Creative Developer", "Competitive Programmer", "UI/UX Enthusiast", "Vocalist"]} 
                      className="text-accent-500 underline decoration-accent-500/30 underline-offset-8"
                    />
                  </div>
                  <p className="text-lg lg:text-xl text-slate-500 dark:text-slate-400 max-w-xl leading-relaxed font-medium">
                    {personalInfo.bio || "Merging technical logic with creative soul to build high-performance digital solutions."}
                  </p>
                </div>
              </ScrollReveal>

              {/* CTA buttons */}
              <ScrollReveal direction="up" delay={400} className="flex flex-wrap gap-6 pt-4">
                <MagneticButton>
                  <Link href="/contact" className="btn-primary py-5 px-12 text-[10px] uppercase tracking-[0.3em] font-black group">
                    Let&apos;s Build <FiArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
                  </Link>
                </MagneticButton>
                
                <MagneticButton>
                  <a
                    href="/admin/download"
                    className="glass-card px-10 py-5 text-[10px] font-black uppercase tracking-[0.3em] text-slate-600 dark:text-slate-300 border-white/20 hover:border-accent-500/50 transition-all flex items-center gap-3"
                  >
                    <FiDownload size={18} /> Resume
                  </a>
                </MagneticButton>
              </ScrollReveal>

              {/* Socials */}
              <ScrollReveal direction="up" delay={500} className="flex items-center gap-8 pt-10">
                {socialLinks.slice(0, 5).map((link: any, i: number) => {
                  const Icon = {
                    FiGithub, FiLinkedin, FiCode, FiMessageCircle, FiTwitter, FiGlobe, FiMail: (props: any) => <span {...props}>@</span>
                  }[link.icon as string] || FiLink;
                  return (
                    <MagneticButton key={link.id || link.label} strength={0.3}>
                      <a 
                        href={link.url} 
                        target={link.url.startsWith("mailto") ? undefined : "_blank"} 
                        rel="noopener noreferrer" 
                        aria-label={link.label}
                        className="text-slate-400 hover:text-accent-500 transition-all hover:scale-125"
                      >
                        <Icon size={22} />
                      </a>
                    </MagneticButton>
                  );
                })}
              </ScrollReveal>
            </div>

            {/* Profile Visuals */}
            <ScrollReveal direction="right" delay={300} className="relative hidden lg:block">
              <div className="relative group">
                {/* Abstract Visual Elements */}
                <div className="absolute -top-12 -left-12 w-64 h-64 border border-accent-500/20 rounded-full animate-spin-slow pointer-events-none" />
                <div className="absolute -bottom-12 -right-12 w-80 h-80 border border-white/10 rounded-full animate-reverse-spin pointer-events-none" />
                
                <div className="relative w-[500px] h-[550px] overflow-hidden rounded-[3rem] border border-white/20 shadow-2xl glass p-3">
                   <div className="relative w-full h-full overflow-hidden rounded-[2.5rem]">
                    <Image
                      src={personalInfo.profileImage || "/images/profile.jpg"}
                      alt={personalInfo.name}
                      fill
                      className="object-cover scale-105 group-hover:scale-100 transition-transform duration-[2s]"
                      priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                   </div>
                </div>
                
                {/* Floating Achievement */}
                <ScrollReveal direction="none" delay={1000} className="absolute -bottom-10 -left-10">
                  <MagneticButton strength={0.4}>
                    <GlowCard className="glass-card p-6 flex items-center gap-4 shadow-2xl border-white/20 hover:border-accent-500/50 transition-colors animate-float">
                      <div className="w-14 h-14 rounded-2xl bg-accent-500 flex items-center justify-center text-white text-3xl shadow-glow">
                        🏆
                      </div>
                      <div>
                        <p className="text-[10px] font-black text-accent-500 uppercase tracking-widest mb-1">ICPC 2024</p>
                        <p className="text-xs font-black text-slate-900 dark:text-white uppercase leading-none">Honorable Mention</p>
                      </div>
                    </GlowCard>
                  </MagneticButton>
                </ScrollReveal>

                {/* Status Badge */}
                <div className="absolute top-10 -right-6 glass-card px-6 py-4 border-white/20 rotate-6 group-hover:rotate-0 transition-transform duration-700 shadow-xl">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Current Rating</p>
                  <p className="text-2xl font-black text-accent-500 font-display uppercase leading-none">{liveStats.cfRating} <span className="text-xs text-slate-300">CF</span></p>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>
      </EditableSection>

      {/* ── Quick About ──────────────────────────────────────────────────────── */}
      <EditableSection eventKey="bio" label="Quick About">
        <section className="py-24 lg:py-32 px-5 relative overflow-hidden">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
          {[
            { icon: <FiMonitor size={28} />, title: "The Developer", desc: "Crafting digital experiences with precision. Currently focusing on Jerry AI & Philomedis Medical App while mastering full-stack ecosystems." },
            { icon: <FiCode size={28} />, title: "The Programmer", desc: "Fueled by logic and problem-solving. ICPC Honorable Mention and active solver on Codeforces & LeetCode." },
            { icon: <FiMic size={28} />, title: "The Artist", desc: "Passionate vocalist bringing soul to the stage. Merging creative expression with technical excellence." },
          ].map((item, i) => (
            <ScrollReveal key={item.title} delay={i * 150} direction="up">
              <GlowCard className="glass-card p-10 h-full flex flex-col items-center text-center group">
                <div className="mb-6 p-5 bg-accent-500/10 text-accent-500 rounded-2xl group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-glow">
                  {item.icon}
                </div>
                <h3 className="font-display font-900 text-xl text-slate-900 dark:text-white mb-4 uppercase tracking-tighter">{item.title}</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{item.desc}</p>
              </GlowCard>
            </ScrollReveal>
          ))}
        </div>
      </section>
      </EditableSection>

      {/* ── Featured Projects ─────────────────────────────────────────────────── */}
      <EditableSection eventKey="projects" label="Projects Section">
        <section id="projects" className="py-24 lg:py-32 px-5 relative overflow-hidden">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-16 gap-6">
            <ScrollReveal direction="left">
              <span className="tag-pill mb-4">Latest Works</span>
              <h2 className="section-title">Featured Projects</h2>
            </ScrollReveal>
            <ScrollReveal direction="right">
              <Link href="/projects" className="btn-outline text-xs uppercase tracking-widest font-black py-3 px-8 group">
                All Projects <FiArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </ScrollReveal>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {projects.filter((p) => p.featured).map((p, i) => (
              <ScrollReveal key={p.id} delay={i * 100} direction="up">
                <GlowCard className="glass-card p-8 h-full flex flex-col group">
                  <div className="flex items-start justify-between gap-4 mb-6">
                    <div className="space-y-1">
                      <h3 className="font-display font-900 text-slate-900 dark:text-white text-2xl group-hover:text-accent-500 transition-colors">{p.title}</h3>
                      <div className="flex gap-2">
                         {p.githubUrl && (
                          <a href={p.githubUrl} target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-accent-500 transition-colors">
                            <FiGithub size={16} />
                          </a>
                        )}
                        {p.liveUrl && (
                          <a href={p.liveUrl} target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-accent-500 transition-colors">
                            <FiGlobe size={16} />
                          </a>
                        )}
                      </div>
                    </div>
                    <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border ${p.status === "in-progress" ? "bg-amber-500/10 border-amber-500/20 text-amber-500" : "bg-emerald-500/10 border-emerald-500/20 text-emerald-500"}`}>
                      {p.status === "in-progress" ? "In Progress" : "Live"}
                    </span>
                  </div>
                  
                  <p className="text-slate-500 dark:text-slate-400 leading-relaxed mb-8 flex-grow">
                    {p.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mt-auto">
                    {p.techStack.map((t: string) => (
                      <span key={t} className="skill-pill">
                        {t}
                      </span>
                    ))}
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
        <section id="skills" className="py-24 lg:py-32 px-5 bg-slate-50/50 dark:bg-slate-800/20 relative">
          <div className="max-w-6xl mx-auto">
            <ScrollReveal className="mb-16">
              <span className="tag-pill mb-4">Mastery</span>
              <h2 className="section-title">Technical Stack</h2>
            </ScrollReveal>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {skillCategories.map((cat, i) => (
                <ScrollReveal key={cat.category} delay={i * 100} direction="up">
                  <div className="glass-card p-8 h-full">
                    <h3 className="font-display font-900 text-slate-900 dark:text-white mb-6 uppercase tracking-widest text-sm border-b border-white/10 pb-4">{cat.category}</h3>
                    <div className="flex flex-wrap gap-2">
                      {cat.skills.map((s: { name: string; level: number }) => (
                        <span key={s.name} className="skill-pill">
                          {s.name}
                        </span>
                      ))}
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      </EditableSection>

      {/* ── Experience ───────────────────────────────────────────────────────── */}
      <EditableSection eventKey="experience" label="Work Experience">
        <section id="experience" className="py-24 lg:py-32 px-5">
          <div className="max-w-6xl mx-auto">
            <ScrollReveal className="mb-16">
              <span className="tag-pill mb-4">Trajectory</span>
              <h2 className="section-title">Experience</h2>
            </ScrollReveal>
            <ScrollReveal direction="up" delay={200}>
              <div className="glass-card p-12 text-center border-dashed border-2">
                <p className="text-slate-400 italic">Experience details are coming soon. Visit the <Link href="/experience" className="text-accent-500 underline">Experience Page</Link> for more info.</p>
              </div>
            </ScrollReveal>
          </div>
        </section>
      </EditableSection>

      {/* ── Achievements ─────────────────────────────────────────────────────── */}
      <EditableSection eventKey="achievements" label="Achievements">
        <section id="achievements" className="py-24 lg:py-32 px-5 bg-slate-50/50 dark:bg-slate-800/20">
          <div className="max-w-6xl mx-auto text-center">
            <ScrollReveal className="mb-16">
              <h2 className="section-title">Achievements</h2>
            </ScrollReveal>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
              {achievements.slice(0, 4).map((a, i) => (
                <ScrollReveal key={a.id} delay={i * 100} direction="up">
                  <GlowCard className="glass-card p-8 h-full">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-10 h-10 rounded-full bg-accent-500/10 flex items-center justify-center text-accent-500">
                        <FiAward size={20} />
                      </div>
                      <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">{a.category}</span>
                    </div>
                    <h3 className="font-display font-900 text-slate-900 dark:text-white mb-4 leading-tight group-hover:text-accent-500 transition-colors">{a.title}</h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-3 mb-4">{a.description}</p>
                    <p className="text-[10px] font-black text-accent-500 uppercase tracking-widest">{a.date}</p>
                  </GlowCard>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      </EditableSection>

      {/* ── CTA Banner ───────────────────────────────────────────────────────── */}
      <EditableSection eventKey="cta" label="Collaboration Banner">
        <section className="py-24 lg:py-32 px-5 relative overflow-hidden">
          <div className="absolute inset-0 bg-accent-500 animate-gradient" />
          <div className="absolute top-0 left-0 w-full h-full bg-[url('/images/noise.png')] opacity-20 pointer-events-none" />
          <div className="max-w-3xl mx-auto text-center text-white relative z-10 space-y-8">
            <ScrollReveal>
              <h2 className="font-display font-900 text-4xl lg:text-6xl tracking-tight leading-none">Let&apos;s build something <br /> legendary together</h2>
            </ScrollReveal>
            <ScrollReveal delay={200}>
              <p className="text-accent-100 text-xl font-medium opacity-80">Open to collaborations, ambitious projects, and worldwide opportunities.</p>
            </ScrollReveal>
            <ScrollReveal delay={400}>
              <MagneticButton>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-3 px-12 py-5 bg-white text-accent-600 font-black uppercase tracking-widest text-xs rounded-full hover:scale-105 transition-all shadow-2xl hover:shadow-accent-500/50"
                >
                  Start a Conversation <FiArrowRight size={18} />
                </Link>
              </MagneticButton>
            </ScrollReveal>
          </div>
        </section>
      </EditableSection>
    </>
  );
}
