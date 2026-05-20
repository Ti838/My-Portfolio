// REFINED
import Link from "next/link";
import Image from "next/image";

import { Code, Monitor, Award, Mic, Globe, ExternalLink, ArrowUpRight, Phone, Mail, GraduationCap } from "lucide-react";
import { FiGithub } from "react-icons/fi";
import { getPersonalInfo, getAchievements, getSkills, getProjects, getExperiences, getEducation } from "@/data/portfolio";
import EditableSection from "@/components/admin/EditableSection";
import ScrollReveal from "@/components/ui/ScrollReveal";
import AwardsList from "@/components/sections/AwardsList";
import Hero from "@/components/sections/Hero";
import ContactForm from "@/components/sections/ContactForm";
import StackedBeliefs from "@/components/sections/StackedBeliefs";
import InteractiveProjectMockups from "@/components/ui/InteractiveProjectMockups";

export default async function HomePage() {
  const personalInfo = await getPersonalInfo();

  const [achievements, skillCategories, projects, experiences, education] = await Promise.all([
    getAchievements(),
    getSkills(),
    getProjects(),
    getExperiences(),
    getEducation()
  ]);

  const icons: any = { Code, Monitor, Award, Mic, Tool: Monitor };
  const copy = personalInfo?.stats?.siteCopy || {};

  return (
    <>
      {/* ══════════════════════════════════════════════════════════════ */}
      {/* HERO SECTION */}
      {/* ══════════════════════════════════════════════════════════════ */}
      <EditableSection eventKey="hero" label="Hero Section">
        <Hero personalInfo={personalInfo} />
      </EditableSection>

      {/* ══════════════════════════════════════════════════════════════ */}
      {/* // 00. BELIEFS — Jackie Zhang-style stacked paper sheets */}
      {/* ══════════════════════════════════════════════════════════════ */}
      <StackedBeliefs />

      {/* ══════════════════════════════════════════════════════════════ */}
      {/* // 01. ABOUT ME */}
      {/* ══════════════════════════════════════════════════════════════ */}
      <EditableSection eventKey="bio" label="About Section">
        <section id="about" className="py-16 md:py-24 px-6 relative overflow-hidden">
          <div className="max-w-[1400px] mx-auto">
            <div className="grid lg:grid-cols-12 gap-16 items-center">
              {/* Left: Content */}
              <div className="lg:col-span-7 space-y-10">
                <ScrollReveal direction="left">
                  <div className="space-y-4">
                    <span className="section-label">{copy.aboutLabel || "01 // The Journey"}</span>
                    <h2 className="display-lg">{copy.aboutTitle || "Engineering with Purpose & Precision."}</h2>
                  </div>
                </ScrollReveal>

                <div className="grid sm:grid-cols-2 gap-10">
                  <ScrollReveal direction="up" delay={100}>
                    <p className="body-lg text-text-1 leading-relaxed">
                      {personalInfo?.bio}
                    </p>
                  </ScrollReveal>
                  <ScrollReveal direction="up" delay={200}>
                    <p className="body text-text-2 leading-relaxed">
                      {personalInfo?.bioExtended}
                    </p>
                  </ScrollReveal>
                </div>

                {/* Stats Bento Row */}
                <ScrollReveal direction="up" delay={300}>
                  <div className="grid grid-cols-3 gap-4 pt-6">
                    {[
                      { number: personalInfo?.stats?.projects || "14+", label: "Projects" },
                      { number: personalInfo?.stats?.certificates || "4+", label: "Certificates" },
                      { number: personalInfo?.stats?.icpc_rank || "ICPC", label: "Ranked" },
                    ].map((stat) => (
                      <div key={stat.label} className="card p-6 text-center group border-white/5 bg-white/[0.02]">
                        <p className="display-md text-accent group-hover:scale-110 transition-transform duration-500">{stat.number}</p>
                        <p className="label text-text-3 mt-2">{stat.label}</p>
                      </div>
                    ))}
                  </div>
                </ScrollReveal>

                <ScrollReveal direction="up" delay={400}>
                  <Link href="/about" className="btn-ghost group">
                    Full Background
                    <ArrowUpRight size={18} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </Link>
                </ScrollReveal>
              </div>

              {/* Right: Visual */}
              <div className="lg:col-span-5 relative">
                <ScrollReveal direction="right" delay={200}>
                  <div className="relative aspect-[4/5] rounded-[2rem] overflow-hidden group">
                    <Image
                      src={personalInfo?.profile_image || personalInfo?.profileImage || "/profile.jpg"}
                      alt={personalInfo?.name || "Profile"}
                      fill
                      className="object-cover grayscale hover:grayscale-0 transition-all duration-700 scale-110 group-hover:scale-100"
                      sizes="(max-width: 768px) 100vw, 50vw"
                      unoptimized
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-bg-primary via-transparent to-transparent opacity-60 pointer-events-none" />
                    
                    {/* Glass Frame Overlay */}
                    <div className="absolute inset-4 border border-white/10 rounded-[1.5rem] pointer-events-none" />
                  </div>

                  {/* Decorative Elements */}
                  <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-accent/20 rounded-full blur-3xl -z-10 animate-pulse-slow" />
                  <div className="absolute -top-6 -right-6 w-32 h-32 bg-accent-secondary/20 rounded-full blur-3xl -z-10 animate-pulse-slow" style={{ animationDelay: '1s' }} />
                </ScrollReveal>
              </div>
            </div>
          </div>
        </section>
      </EditableSection>

      {/* ══════════════════════════════════════════════════════════════ */}
      {/* // 02. SKILLS */}
      {/* ══════════════════════════════════════════════════════════════ */}
      <EditableSection eventKey="skills" label="Skills Section">
        <section id="skills" className="py-16 md:py-24 px-6 bg-white/[0.01]">
          <div className="max-w-[1400px] mx-auto">
            <ScrollReveal>
              <div className="flex flex-col items-center text-center space-y-4 mb-20">
                <span className="section-label">{copy.skillsLabel || "02 // The Stack"}</span>
                <h2 className="section-title">{copy.skillsTitle || "Technical Expertise"}</h2>
              </div>
            </ScrollReveal>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {skillCategories.map((cat: any, i: number) => {
                const Icon = icons[cat.icon as string] || Code;
                
                // Assign different grid spans for bento feel
                const gridSpans = [
                  "md:col-span-2 md:row-span-1",
                  "md:col-span-2 md:row-span-1",
                  "md:col-span-1 md:row-span-1",
                  "md:col-span-3 md:row-span-1",
                ];

                return (
                  <ScrollReveal key={cat.id || cat.category} delay={i * 100} direction="up" className={gridSpans[i % gridSpans.length]}>
                    <div className="card p-10 h-full group border-white/5 bg-white/[0.02] hover:bg-white/[0.04]">
                      <div className="flex items-center gap-4 mb-8">
                        <div className="w-12 h-12 rounded-2xl bg-accent-dim flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-white transition-all duration-500">
                          <Icon size={24} />
                        </div>
                        <div>
                          <h3 className="font-display font-semibold text-lg text-text-1 tracking-tight">{cat.category}</h3>
                          <p className="text-[10px] font-mono text-text-3 uppercase tracking-widest mt-0.5">{cat.skills.length} Technologies</p>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {cat.skills.map((skill: any) => (
                          <span key={skill.id || skill.name} className="skill-pill">
                            {skill.name}
                          </span>
                        ))}
                      </div>
                    </div>
                  </ScrollReveal>
                );
              })}
            </div>
          </div>
        </section>
      </EditableSection>

      {/* ══════════════════════════════════════════════════════════════ */}
      {/* // 03. PROJECTS */}
      {/* ══════════════════════════════════════════════════════════════ */}
      <EditableSection eventKey="projects" label="Projects Section">
        <section id="projects" className="py-16 md:py-24 px-6">
          <div className="max-w-[1400px] mx-auto">
            <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-8 mb-20">
              <ScrollReveal direction="left">
                <span className="section-label">{copy.projectsLabel || "03 // The Forge"}</span>
                <h2 className="section-title mt-4">{copy.projectsTitle || "Selected Creations"}</h2>
              </ScrollReveal>
              <ScrollReveal direction="right">
                <Link href="/projects" className="btn-ghost group">
                  View All Projects
                  <ArrowUpRight size={18} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </Link>
              </ScrollReveal>
            </div>

            {/* Featured Projects — Jackie Zhang overlapping scrapbook style */}
            <div className="relative z-10">
              <InteractiveProjectMockups projects={projects} />
            </div>

            {/* Non-featured Projects Grid */}
            {projects.filter((p: any) => !p.featured).length > 0 && (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-32">
                {projects.filter((p: any) => !p.featured).map((p: any, i: number) => (
                  <ScrollReveal key={p.id} delay={i * 80} direction="up">
                    <div className="card p-8 h-full flex flex-col group border-white/5 bg-white/[0.02]">
                      <h3 className="heading text-text-1 mb-3 group-hover:text-accent transition-colors">{p.title}</h3>
                      <p className="body text-sm mb-6 flex-grow leading-relaxed">{p.description}</p>
                      
                      <div className="flex flex-wrap gap-1.5 mb-6">
                        {(p.techStack || p.tags || []).map((t: string) => (
                          <span key={t} className="font-mono text-[9px] text-text-3 uppercase tracking-wider px-2 py-0.5 border border-white/5 rounded-full">
                            {t}
                          </span>
                        ))}
                      </div>

                      <div className="flex gap-4 pt-4 border-t border-white/5">
                        {p.githubUrl && (
                          <a href={p.githubUrl} target="_blank" rel="noopener noreferrer" className="text-text-3 hover:text-accent transition-colors">
                            <FiGithub size={18} />
                          </a>
                        )}
                        {p.liveUrl && (
                          <a href={p.liveUrl} target="_blank" rel="noopener noreferrer" className="text-text-3 hover:text-accent transition-colors">
                            <ExternalLink size={18} />
                          </a>
                        )}
                      </div>
                    </div>
                  </ScrollReveal>
                ))}
              </div>
            )}
          </div>
        </section>
      </EditableSection>

      {/* ══════════════════════════════════════════════════════════════ */}
      {/* // 04. EXPERIENCE */}
      {/* ══════════════════════════════════════════════════════════════ */}
      <EditableSection eventKey="experience" label="Experience Section">
        <section id="experience" className="py-16 md:py-24 px-6">
          <div className="max-w-[1400px] mx-auto">
            <ScrollReveal>
              <div className="flex flex-col items-center text-center space-y-4 mb-20">
                <span className="section-label">{copy.experienceLabel || "04 // The Tenure"}</span>
                <h2 className="section-title">{copy.experienceTitle || "Professional Path"}</h2>
              </div>
            </ScrollReveal>

            <div className="relative space-y-12 max-w-4xl mx-auto">
              {/* Timeline Connector */}
              <div className="absolute left-[20px] md:left-1/2 md:-translate-x-1/2 top-4 bottom-4 w-[1px] bg-border/50" />

              {experiences.map((exp: any, i: number) => (
                <ScrollReveal key={exp.id} delay={i * 100} direction={i % 2 === 0 ? "left" : "right"}>
                  <div className={`relative flex flex-col md:flex-row items-center gap-8 ${i % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                    {/* Content */}
                    <div className="flex-1 w-full md:w-auto">
                      <div className="card p-8 group border-white/5 bg-white/[0.02] hover:bg-white/[0.04]">
                        <div className="flex flex-col gap-2 mb-4">
                          <span className="font-mono text-[10px] text-accent uppercase tracking-widest">{exp.duration}</span>
                          <h3 className="heading text-text-1 text-lg group-hover:text-accent transition-colors">{exp.title}</h3>
                          <p className="text-[10px] font-mono text-text-3 uppercase tracking-widest">{exp.type}</p>
                        </div>
                        <p className="body text-sm text-text-2 leading-relaxed">{exp.description}</p>
                        
                        {exp.tags && (
                          <div className="flex flex-wrap gap-2 mt-6">
                            {exp.tags.map((tag: string) => (
                              <span key={tag} className="skill-pill bg-white/[0.03] border-white/5 text-[9px]">
                                {tag}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Timeline Point */}
                    <div className="absolute left-[20px] md:left-1/2 md:-translate-x-1/2 w-3 h-3 rounded-full bg-accent border-4 border-bg-primary shadow-[0_0_15px_rgba(var(--accent-rgb),0.5)] z-10" />

                    {/* Spacer */}
                    <div className="flex-1 hidden md:block" />
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      </EditableSection>

      {/* ══════════════════════════════════════════════════════════════ */}
      {/* // 05. EDUCATION */}
      {/* ══════════════════════════════════════════════════════════════ */}
      <EditableSection eventKey="education" label="Education Section">
        <section id="education" className="py-16 md:py-24 px-6 bg-white/[0.01]">
          <div className="max-w-[1400px] mx-auto">
            <ScrollReveal>
              <div className="flex flex-col items-center text-center space-y-4 mb-20">
                <span className="section-label">{copy.educationLabel || "05 // The Foundation"}</span>
                <h2 className="section-title">{copy.educationTitle || "Academic Background"}</h2>
              </div>
            </ScrollReveal>

            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {education.map((edu: any, i: number) => (
                <ScrollReveal key={edu.id} delay={i * 100} direction="up">
                  <div className="card p-10 h-full group border-white/5 bg-white/[0.02]">
                    <div className="flex items-start gap-6">
                      {edu.logoUrl ? (
                        <div className="w-16 h-16 rounded-2xl bg-white/[0.03] border border-white/5 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform relative overflow-hidden">
                          <Image src={edu.logoUrl} alt={edu.institution} fill className="object-contain p-3 grayscale group-hover:grayscale-0 transition-all" sizes="64px" />
                        </div>
                      ) : (
                        <div className="w-16 h-16 rounded-2xl bg-white/[0.03] flex items-center justify-center flex-shrink-0">
                          <GraduationCap size={32} className="text-text-3 opacity-20" />
                        </div>
                      )}
                      <div className="space-y-2">
                        <span className="font-mono text-[10px] text-accent uppercase tracking-widest">{edu.duration}</span>
                        <h3 className="heading text-text-1 text-lg">{edu.institution}</h3>
                        <p className="body text-sm text-text-2">{edu.degree}</p>
                        {edu.field && <p className="text-[10px] font-mono text-text-3 uppercase tracking-widest">{edu.field}</p>}
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      </EditableSection>

      {/* ══════════════════════════════════════════════════════════════ */}
      {/* ACHIEVEMENTS */}
      {/* ══════════════════════════════════════════════════════════════ */}
      <EditableSection eventKey="achievements" label="Achievements">
        <section id="achievements" className="py-16 md:py-24 px-6">
          <div className="max-w-[1400px] mx-auto">
            <ScrollReveal>
              <div className="flex flex-col items-center text-center space-y-4 mb-20">
                <span className="section-label">{copy.achievementsLabel || "06 // The Recognition"}</span>
                <h2 className="section-title">{copy.achievementsTitle || "Awards & Certificates"}</h2>
              </div>
            </ScrollReveal>
            <div className="max-w-5xl mx-auto">
              <AwardsList achievements={achievements} />
            </div>
          </div>
        </section>
      </EditableSection>

      {/* ══════════════════════════════════════════════════════════════ */}
      {/* // 09. CONTACT */}
      {/* ══════════════════════════════════════════════════════════════ */}
      <EditableSection eventKey="contact" label="Contact Section">
        <section id="contact" className="py-16 md:py-24 px-6 relative overflow-hidden">
          {/* Background Aura */}
          <div className="absolute inset-0 -z-10 overflow-hidden">
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-accent/5 rounded-full blur-[150px]" />
          </div>

          <div className="max-w-[1400px] mx-auto">
            <div className="grid lg:grid-cols-12 gap-20 items-center">
              {/* Left: Contact Info */}
              <div className="lg:col-span-5 space-y-12">
                <ScrollReveal direction="left">
                  <div className="space-y-6">
                    <span className="section-label">{copy.contactLabel || "09 // The Connection"}</span>
                    <h2 className="display-lg leading-tight">{copy.contactTitle || "Let's build the exceptional together."}</h2>
                    <p className="body-lg text-text-2 leading-relaxed max-w-md">
                      {copy.contactSummary || "Currently seeking new opportunities and architectural challenges. If you have a project in mind, let's start the conversation."}
                    </p>
                  </div>
                </ScrollReveal>

                <ScrollReveal direction="left" delay={200}>
                  <div className="space-y-6">
                    <a href={`mailto:${personalInfo?.email}`} className="group flex items-center gap-6 p-4 rounded-3xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] transition-all">
                      <div className="w-14 h-14 rounded-2xl bg-accent-dim flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-white transition-all duration-500">
                        <Mail size={24} />
                      </div>
                      <div>
                        <p className="font-mono text-[10px] text-text-3 uppercase tracking-widest">Email Me</p>
                        <p className="text-text-1 font-medium">{personalInfo?.email}</p>
                      </div>
                    </a>

                    <a href={`tel:${personalInfo?.phone}`} className="group flex items-center gap-6 p-4 rounded-3xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] transition-all">
                      <div className="w-14 h-14 rounded-2xl bg-accent-dim flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-white transition-all duration-500">
                        <Phone size={24} />
                      </div>
                      <div>
                        <p className="font-mono text-[10px] text-text-3 uppercase tracking-widest">Call Me</p>
                        <p className="text-text-1 font-medium">{personalInfo?.phone}</p>
                      </div>
                    </a>
                  </div>
                </ScrollReveal>
              </div>

              {/* Right: Contact Form Card */}
              <div className="lg:col-span-7">
                <ScrollReveal direction="right" delay={300}>
                  <div className="card p-10 md:p-16 border-white/10 bg-white/[0.03] shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-accent/50 to-transparent" />
                    <ContactForm />
                  </div>
                </ScrollReveal>
              </div>
            </div>
          </div>
        </section>
      </EditableSection>
    </>
  );
}
