import type { Metadata } from "next";
import { getProjects, getTechColor } from "@/data/portfolio";
import { FiGithub, FiExternalLink, FiStar } from "react-icons/fi";
import EditableSection from "@/components/admin/EditableSection";
import ScrollReveal from "@/components/ui/ScrollReveal";
import GlowCard from "@/components/ui/GlowCard";

export const metadata: Metadata = { title: "Projects" };

export default async function ProjectsPage() {
  const projects = await getProjects();
  return (
    <EditableSection eventKey="projects" label="Projects Portfolio">
      <div className="pt-32 pb-24 min-h-screen relative overflow-hidden mesh-gradient">
        <div className="max-w-6xl mx-auto px-5">
          {/* Header */}
          <ScrollReveal direction="left" className="mb-20">
            <span className="tag-pill mb-4">The Portfolio</span>
            <h1 className="section-title">Selected Works</h1>
            <p className="text-[var(--text-secondary)] mt-6 max-w-2xl text-lg leading-relaxed">
              A curated collection of digital products and open-source experiments where I push the boundaries of what&apos;s possible.
            </p>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 gap-10">
            {projects.map((p, i) => (
              <ScrollReveal key={p.id} delay={i * 100} direction="up">
                <GlowCard className="glass-card p-10 flex flex-col gap-8 group h-full">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-3">
                      {p.featured && (
                        <div className="w-8 h-8 rounded-full bg-amber-500/10 flex items-center justify-center text-amber-500 animate-pulse">
                          <FiStar size={16} fill="currentColor" />
                        </div>
                      )}
                      <h2 className="font-mono font-bold text-2xl text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors">{p.title}</h2>
                    </div>
                  </div>

                  <p className="text-[var(--text-secondary)] leading-relaxed flex-1 text-sm">
                    {p.description}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {p.techStack.map((t: string) => (
                      <span key={t} className="skill-pill">
                        {t}
                      </span>
                    ))}
                  </div>

                  <div className="flex gap-6 pt-6 border-t border-[var(--border)]">
                    {p.githubUrl && (
                      <a href={p.githubUrl} target="_blank" rel="noopener noreferrer"
                        className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors">
                        <FiGithub size={14} /> Source
                      </a>
                    )}
                    {p.liveUrl && (
                      <a href={p.liveUrl} target="_blank" rel="noopener noreferrer"
                        className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[var(--accent)] hover:scale-105 transition-transform">
                        <FiExternalLink size={14} /> Launch
                      </a>
                    )}
                  </div>
                </GlowCard>
              </ScrollReveal>
            ))}
          </div>

          {/* Custom Footer */}
          <ScrollReveal direction="up" delay={500} className="mt-20">
            <div className="p-12 rounded-[32px] border border-[var(--border)] bg-[var(--surface-secondary)] text-center group transition-all hover:border-[var(--accent)]">
              <div className="text-4xl mb-6 group-hover:scale-125 transition-transform duration-500 animate-float-slow">🚀</div>
              <h3 className="font-mono font-bold text-3xl text-[var(--text-primary)]">The Journey Continues</h3>
              <p className="text-[var(--text-secondary)] mt-4 max-w-xl mx-auto">
                I&apos;m constantly brewing new ideas. Follow my <a href="https://github.com/Ti838" target="_blank" className="text-[var(--accent)] underline underline-offset-4">GitHub</a> to see what&apos;s cooking in real-time.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </EditableSection>
  );
}
