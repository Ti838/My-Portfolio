// REFINED
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { ArrowRight, Code, Download, Star, Monitor, Award, Mic, MessageCircle, Globe, ExternalLink, ArrowUpRight, Send, MapPin, Phone, Mail, Calendar, Briefcase, GraduationCap, ChevronRight } from "lucide-react";
import { FiGithub, FiLinkedin, FiCode, FiExternalLink } from "react-icons/fi";
import { getPersonalInfo, getAchievements, getSkills, getProjects, getExperiences, getEducation, getSocialLinks } from "@/data/portfolio";
import EditableSection from "@/components/admin/EditableSection";
import TypeWriter from "@/components/ui/TypeWriter";
import ScrollReveal from "@/components/ui/ScrollReveal";
import GlowCard from "@/components/ui/GlowCard";
import AwardsList from "@/components/sections/AwardsList";
import Hero from "@/components/sections/Hero";
import ContactForm from "@/components/sections/ContactForm";

export default async function HomePage() {
  const personalInfo = await getPersonalInfo();

  const [achievements, skillCategories, projects, experiences, education, socialLinks] = await Promise.all([
    getAchievements(),
    getSkills(),
    getProjects(),
    getExperiences(),
    getEducation(),
    getSocialLinks()
  ]);

  const icons: any = { Code, Monitor, Award, Mic, Tool: Monitor };

  return (
    <>
      {/* ══════════════════════════════════════════════════════════════ */}
      {/* HERO SECTION */}
      {/* ══════════════════════════════════════════════════════════════ */}
      <EditableSection eventKey="hero" label="Hero Section">
        <Hero personalInfo={personalInfo} />
      </EditableSection>

      {/* ══════════════════════════════════════════════════════════════ */}
      {/* // 01. ABOUT ME */}
      {/* ══════════════════════════════════════════════════════════════ */}
      <EditableSection eventKey="bio" label="About Section">
        <section id="about" className="py-28 md:py-36 px-6">
          <div className="max-w-[1200px] mx-auto">
            <ScrollReveal>
              <span className="section-label">// 01. about me</span>
            </ScrollReveal>

            <div className="grid md:grid-cols-2 gap-16 mt-16 items-center">
              {/* Left: Profile Photo */}
              <ScrollReveal direction="left" delay={100}>
                <div className="relative group">
                  <div className="relative w-full max-w-[400px] aspect-[4/5] rounded-2xl overflow-hidden border border-[var(--border)] group-hover:border-[var(--accent)] transition-all duration-500">
                    <img
                      src={personalInfo?.profileImage || "/profile.jpg"}
                      alt={personalInfo?.name || "Profile"}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-primary)]/60 to-transparent" />
                  </div>
                  {/* Amber glow on hover */}
                  <div className="absolute -inset-2 bg-[var(--accent)]/5 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />
                </div>
              </ScrollReveal>

              {/* Right: Text Content */}
              <div className="space-y-6">
                <ScrollReveal direction="right" delay={200}>
                  <h2 className="display-md">{personalInfo?.name || "Timon Biswas"}</h2>
                  <p className="text-[var(--accent)] font-mono text-sm mt-2">{personalInfo?.tagline}</p>
                </ScrollReveal>

                <ScrollReveal direction="right" delay={300}>
                  <p className="body-lg text-[var(--text-secondary)] leading-relaxed">
                    {personalInfo?.bio}
                  </p>
                </ScrollReveal>

                {personalInfo?.bioExtended && (
                  <ScrollReveal direction="right" delay={400}>
                    <p className="body text-[var(--text-secondary)] leading-relaxed">
                      {personalInfo.bioExtended}
                    </p>
                  </ScrollReveal>
                )}

                {/* Stats Row */}
                <ScrollReveal direction="up" delay={500}>
                  <div className="grid grid-cols-3 gap-6 pt-6 border-t border-[var(--border)]">
                    {[
                      { number: personalInfo?.stats?.projects || "14+", label: "Projects" },
                      { number: personalInfo?.stats?.certificates || "4+", label: "Certificates" },
                      { number: personalInfo?.stats?.icpc_rank || "ICPC", label: "Honorable" },
                    ].map((stat) => (
                      <div key={stat.label} className="text-center">
                        <p className="font-display text-3xl font-bold text-[var(--accent)]">{stat.number}</p>
                        <p className="label text-[var(--text-tertiary)] mt-1">{stat.label}</p>
                      </div>
                    ))}
                  </div>
                </ScrollReveal>

                <ScrollReveal direction="up" delay={600}>
                  <a href="/resume.pdf" className="btn-ghost inline-flex mt-4">
                    <Download size={16} /> Download Resume
                  </a>
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
        <section id="skills" className="py-28 md:py-36 px-6">
          <div className="max-w-[1200px] mx-auto">
            <ScrollReveal>
              <span className="section-label">// 02. skills</span>
              <h2 className="section-title mt-2">Tech Stack</h2>
            </ScrollReveal>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-16">
              {skillCategories.map((cat: any, i: number) => {
                const Icon = icons[cat.icon as string] || Code;

                return (
                  <ScrollReveal key={cat.id || cat.category} delay={i * 100} direction="up">
                    <div className="card card-glow p-8 h-full group">
                      <div className="flex items-center gap-3 mb-8">
                        <div className="w-10 h-10 rounded-xl bg-[var(--accent-dim)] flex items-center justify-center text-[var(--accent)] group-hover:bg-[var(--accent)] group-hover:text-[var(--bg-primary)] transition-all duration-300">
                          <Icon size={18} />
                        </div>
                        <h3 className="font-sans font-semibold text-sm text-[var(--text-primary)] uppercase tracking-widest">{cat.category}</h3>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {cat.skills.map((skill: any) => (
                          <span key={skill.id || skill.name} className="skill-pill text-xs">
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
        <section id="projects" className="py-28 md:py-36 px-6">
          <div className="max-w-[1200px] mx-auto">
            <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6">
              <ScrollReveal direction="left">
                <span className="section-label">// 03. projects</span>
                <h2 className="section-title mt-2">Selected Work</h2>
              </ScrollReveal>
              <ScrollReveal direction="right">
                <Link href="/projects" className="btn-ghost text-sm group">
                  View all <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </Link>
              </ScrollReveal>
            </div>

            {/* Featured Projects — Editorial Cards */}
            <div className="space-y-8 mt-16">
              {projects.filter((p: any) => p.featured).map((p: any, i: number) => (
                <ScrollReveal key={p.id} delay={i * 80} direction="up">
                  <div className={`card card-glow overflow-hidden ${i % 2 === 0 ? '' : ''}`}>
                    <div className="flex flex-col md:flex-row">
                      {/* Image side */}
                      {p.imageUrl && (
                        <div className={`md:w-[55%] relative overflow-hidden ${i % 2 !== 0 ? 'md:order-2' : ''}`}>
                          <img
                            src={p.imageUrl}
                            alt={p.title}
                            className="w-full h-full object-cover min-h-[250px] hover:scale-105 transition-transform duration-700"
                          />
                          <div className="absolute inset-0 bg-gradient-to-r from-[var(--bg-secondary)]/50 to-transparent" />
                        </div>
                      )}

                      {/* Content side */}
                      <div className={`flex-1 p-8 md:p-10 flex flex-col justify-center ${!p.imageUrl ? 'w-full' : ''}`}>
                        {p.featured && (
                          <span className="inline-flex items-center gap-1 w-fit px-3 py-1 rounded-full bg-[var(--accent-dim)] text-[var(--accent)] text-xs font-mono mb-4">
                            <Star size={10} /> Featured
                          </span>
                        )}
                        <h3 className="heading text-xl mb-3 group-hover:text-[var(--accent)] transition-colors">{p.title}</h3>
                        <p className="body text-sm mb-6">{p.description}</p>

                        {/* Tech tags */}
                        <div className="flex flex-wrap gap-2 mb-6">
                          {(p.techStack || p.tags || []).map((t: string) => (
                            <span key={t} className="font-mono text-[10px] text-[var(--text-tertiary)] uppercase tracking-wider px-3 py-1 border border-[var(--border)] rounded-full">
                              {t}
                            </span>
                          ))}
                        </div>

                        {/* Links */}
                        <div className="flex gap-4 mt-auto">
                          {p.githubUrl && (
                            <a href={p.githubUrl} target="_blank" rel="noopener noreferrer" className="font-mono text-xs text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors flex items-center gap-1.5">
                              <FiGithub size={14} /> Source
                            </a>
                          )}
                          {p.liveUrl && (
                            <a href={p.liveUrl} target="_blank" rel="noopener noreferrer" className="font-mono text-xs text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors flex items-center gap-1.5">
                              <Globe size={14} /> Live
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>

            {/* Non-featured projects grid */}
            {projects.filter((p: any) => !p.featured).length > 0 && (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
                {projects.filter((p: any) => !p.featured).map((p: any, i: number) => (
                  <ScrollReveal key={p.id} delay={i * 80} direction="up">
                    <div className="card card-glow p-6 h-full flex flex-col group">
                      <h3 className="heading text-base mb-2 group-hover:text-[var(--accent)] transition-colors">{p.title}</h3>
                      <p className="body text-sm mb-4 flex-grow">{p.description}</p>
                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {(p.techStack || p.tags || []).map((t: string) => (
                          <span key={t} className="font-mono text-[9px] text-[var(--text-tertiary)] uppercase tracking-wider px-2 py-0.5 border border-[var(--border)] rounded-full">
                            {t}
                          </span>
                        ))}
                      </div>
                      <div className="flex gap-3 pt-4 border-t border-[var(--border)]">
                        {p.githubUrl && (
                          <a href={p.githubUrl} target="_blank" rel="noopener noreferrer" className="text-[var(--text-tertiary)] hover:text-[var(--accent)] transition-colors">
                            <FiGithub size={16} />
                          </a>
                        )}
                        {p.liveUrl && (
                          <a href={p.liveUrl} target="_blank" rel="noopener noreferrer" className="text-[var(--text-tertiary)] hover:text-[var(--accent)] transition-colors">
                            <ExternalLink size={16} />
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
        <section id="experience" className="py-28 md:py-36 px-6">
          <div className="max-w-[1200px] mx-auto">
            <ScrollReveal>
              <span className="section-label">// 04. experience</span>
              <h2 className="section-title mt-2">Where I&apos;ve Worked</h2>
            </ScrollReveal>

            {/* Timeline */}
            <div className="relative mt-16 pl-12 md:pl-16 space-y-12">
              {/* Vertical amber line */}
              <div className="absolute left-[15px] md:left-[19px] top-0 bottom-0 w-[2px] bg-[var(--accent)]/20" />

              {experiences.map((exp: any, i: number) => (
                <ScrollReveal key={exp.id} delay={i * 100} direction="up">
                  <div className="relative">
                    {/* Timeline dot */}
                    <div className="absolute -left-[33px] md:-left-[37px] top-1 w-8 h-8 rounded-full bg-[var(--bg-primary)] border-2 border-[var(--accent)] flex items-center justify-center z-10">
                      <Briefcase size={12} className="text-[var(--accent)]" />
                    </div>

                    {/* Card */}
                    <div className="card p-6 md:p-8">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-3">
                        <h3 className="heading text-base">{exp.title}</h3>
                        <span className="label text-[var(--text-tertiary)] text-[10px]">{exp.duration}</span>
                      </div>

                      {exp.type && (
                        <span className="inline-block font-mono text-[10px] text-[var(--accent)] uppercase tracking-wider mb-3">
                          {exp.type}
                        </span>
                      )}

                      <p className="body text-sm">{exp.description}</p>

                      {exp.tags && exp.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-4">
                          {exp.tags.map((tag: string) => (
                            <span key={tag} className="skill-pill text-[10px]">{tag}</span>
                          ))}
                        </div>
                      )}
                    </div>
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
        <section id="education" className="py-28 md:py-36 px-6">
          <div className="max-w-[1200px] mx-auto">
            <ScrollReveal>
              <span className="section-label">// 05. education</span>
              <h2 className="section-title mt-2">Education</h2>
            </ScrollReveal>

            <div className="relative mt-16 pl-12 md:pl-16 space-y-12">
              {/* Vertical amber line */}
              <div className="absolute left-[15px] md:left-[19px] top-0 bottom-0 w-[2px] bg-[var(--accent)]/20" />

              {education.map((edu: any, i: number) => (
                <ScrollReveal key={edu.id} delay={i * 100} direction="up">
                  <div className="relative">
                    {/* Timeline dot */}
                    <div className="absolute -left-[33px] md:-left-[37px] top-1 w-8 h-8 rounded-full bg-[var(--bg-primary)] border-2 border-[var(--accent)] flex items-center justify-center z-10">
                      <GraduationCap size={12} className="text-[var(--accent)]" />
                    </div>

                    <div className="card p-6 md:p-8">
                      <div className="flex items-start gap-4">
                        {edu.logoUrl && (
                          <div className="w-12 h-12 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border)] flex items-center justify-center overflow-hidden flex-shrink-0">
                            <img src={edu.logoUrl} alt={edu.institution} className="w-8 h-8 object-contain" />
                          </div>
                        )}
                        <div className="flex-1">
                          <h3 className="heading text-base">{edu.institution}</h3>
                          <p className="text-[var(--text-secondary)] text-sm mt-1">{edu.degree}</p>
                          {edu.field && <p className="text-[var(--text-tertiary)] text-sm">{edu.field}</p>}
                          <span className="label text-[var(--text-tertiary)] text-[10px] mt-2 block">{edu.duration}</span>

                          {edu.details && edu.details.length > 0 && (
                            <div className="flex flex-wrap gap-2 mt-3">
                              {edu.details.map((d: string, idx: number) => (
                                <span key={idx} className="skill-pill text-[10px]">{d}</span>
                              ))}
                            </div>
                          )}
                        </div>
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
        <section id="achievements" className="py-28 md:py-36 px-6">
          <div className="max-w-[1200px] mx-auto">
            <ScrollReveal>
              <span className="section-label">// 06. achievements</span>
              <h2 className="section-title mt-2">Awards & Certificates</h2>
            </ScrollReveal>
            <div className="mt-16">
              <AwardsList achievements={achievements} />
            </div>
          </div>
        </section>
      </EditableSection>

      {/* ══════════════════════════════════════════════════════════════ */}
      {/* // 09. CONTACT */}
      {/* ══════════════════════════════════════════════════════════════ */}
      <EditableSection eventKey="contact" label="Contact Section">
        <section id="contact" className="py-28 md:py-36 px-6 mesh-gradient">
          <div className="max-w-[1200px] mx-auto">
            <div className="grid md:grid-cols-2 gap-16">
              {/* Left: Big heading + contact info */}
              <div className="space-y-8">
                <ScrollReveal direction="left">
                  <span className="section-label">// 09. contact</span>
                  <h2 className="font-display text-[clamp(3rem,6vw,5rem)] font-bold text-[var(--text-primary)] leading-[1.1] mt-4">
                    Let&apos;s Work<br />Together.
                  </h2>
                </ScrollReveal>

                <ScrollReveal direction="left" delay={200}>
                  <p className="body-lg text-[var(--text-secondary)]">
                    Open to collaborations, ambitious projects, and worldwide opportunities. Let&apos;s build something remarkable.
                  </p>
                </ScrollReveal>

                <ScrollReveal direction="left" delay={300}>
                  <div className="space-y-4 pt-4">
                    <a href={`mailto:${personalInfo?.email}`} className="flex items-center gap-4 text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors group">
                      <div className="w-10 h-10 rounded-xl bg-[var(--accent-dim)] flex items-center justify-center text-[var(--accent)] group-hover:bg-[var(--accent)] group-hover:text-[var(--bg-primary)] transition-all">
                        <Mail size={16} />
                      </div>
                      <span className="text-sm">{personalInfo?.email}</span>
                    </a>
                    <a href={`tel:${personalInfo?.phone}`} className="flex items-center gap-4 text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors group">
                      <div className="w-10 h-10 rounded-xl bg-[var(--accent-dim)] flex items-center justify-center text-[var(--accent)] group-hover:bg-[var(--accent)] group-hover:text-[var(--bg-primary)] transition-all">
                        <Phone size={16} />
                      </div>
                      <span className="text-sm">{personalInfo?.phone}</span>
                    </a>
                    <div className="flex items-center gap-4 text-[var(--text-secondary)]">
                      <div className="w-10 h-10 rounded-xl bg-[var(--accent-dim)] flex items-center justify-center text-[var(--accent)]">
                        <MapPin size={16} />
                      </div>
                      <span className="text-sm">{personalInfo?.location}</span>
                    </div>
                  </div>
                </ScrollReveal>
              </div>

              {/* Right: Contact Form */}
              <ScrollReveal direction="right" delay={200}>
                <ContactForm />
              </ScrollReveal>
            </div>
          </div>
        </section>
      </EditableSection>
    </>
  );
}
