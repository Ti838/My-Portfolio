import type { Metadata } from "next";
import { getExperiences } from "@/data/portfolio";
import { FiBriefcase, FiCode, FiMusic } from "react-icons/fi";
import EditableSection from "@/components/admin/EditableSection";
import ScrollReveal from "@/components/ui/ScrollReveal";
import GlowCard from "@/components/ui/GlowCard";

export const metadata: Metadata = { title: "Experience" };

const typeIcon: Record<string, React.ElementType> = {
  work: FiBriefcase,
  competition: FiCode,
  volunteer: FiMusic,
};

export default async function ExperiencePage() {
  const experiences = await getExperiences();
  return (
    <EditableSection eventKey="experience" label="Experience">
      <div className="pt-32 pb-24 min-h-screen relative overflow-hidden mesh-gradient">
        <div className="max-w-4xl mx-auto px-5">
          {/* Header */}
          <ScrollReveal direction="left" className="mb-20">
            <span className="tag-pill mb-4">The Journey</span>
            <h1 className="section-title">Experience</h1>
          </ScrollReveal>

          <div className="relative pl-12 lg:pl-20">
            {/* Animated Vertical line */}
            <div className="absolute left-[18px] lg:left-[26px] top-0 bottom-0 w-[2px] bg-gradient-to-b from-[var(--accent)] via-[var(--mesh-3)] to-transparent animate-draw-line" />

            <div className="space-y-16">
              {experiences.map((exp, i) => {
                const Icon = typeIcon[exp.type] ?? FiBriefcase;
                return (
                  <div key={exp.id} className="relative">
                    {/* Pulsing Dot */}
                    <ScrollReveal direction="none" delay={i * 200}>
                      <div className="absolute -left-12 lg:-left-20 w-10 lg:w-14 h-10 lg:h-14 rounded-full glass border-2 border-[var(--accent)] flex items-center justify-center text-[var(--accent)] z-10 shadow-[0_0_15px_var(--accent-glow)] animate-float-slow bg-[var(--surface)]">
                        <Icon size={exp.type === 'work' ? 24 : 20} />
                      </div>
                    </ScrollReveal>

                    <ScrollReveal direction="up" delay={i * 200 + 100}>
                      <GlowCard className="glass-card p-10 group">
                        <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
                          <div className="space-y-1">
                            <h2 className="font-mono font-bold text-3xl text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors tracking-tight">{exp.title}</h2>
                            <p className="text-[var(--accent)] font-mono font-bold uppercase tracking-widest text-xs">{exp.type}</p>
                          </div>
                          <span className="px-6 py-2 rounded-full glass border-[var(--border)] text-xs font-mono font-bold uppercase tracking-widest text-[var(--text-secondary)]">
                            {exp.duration}
                          </span>
                        </div>
                        
                        <p className="text-[var(--text-secondary)] leading-relaxed text-sm mb-8">
                          {exp.description}
                        </p>
                        
                        {exp.tags && (
                          <div className="flex flex-wrap gap-2">
                            {exp.tags.map((t: string) => (
                              <span key={t} className="skill-pill">
                                {t}
                              </span>
                            ))}
                          </div>
                        )}
                      </GlowCard>
                    </ScrollReveal>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </EditableSection>
  );
}
