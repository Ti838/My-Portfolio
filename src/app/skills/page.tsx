import type { Metadata } from "next";
import { getSkills } from "@/data/portfolio";
import { FiCode, FiTool, FiAward, FiMusic } from "react-icons/fi";
import EditableSection from "@/components/admin/EditableSection";
import ScrollReveal from "@/components/ui/ScrollReveal";
import GlowCard from "@/components/ui/GlowCard";

export const metadata: Metadata = { title: "Skills" };

const iconMap: Record<string, React.ElementType> = {
  FiCode, FiTool, FiAward, FiMusic,
};

export default async function SkillsPage() {
  const skillCategories = await getSkills();
  return (
    <EditableSection eventKey="skills" label="Technical Stack">
      <div className="pt-32 pb-24 min-h-screen relative overflow-hidden mesh-gradient">
        <div className="max-w-6xl mx-auto px-5">
          {/* Header */}
          <ScrollReveal direction="left" className="mb-20">
            <span className="tag-pill mb-4">The Arsenal</span>
            <h1 className="section-title">Technical Skills</h1>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 gap-8">
            {skillCategories.map((cat, i) => {
              const Icon = iconMap[cat.icon] ?? FiCode;
              return (
                <ScrollReveal key={cat.category} delay={i * 100} direction="up">
                  <GlowCard className="glass-card p-10 space-y-8 h-full">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-[var(--surface-tertiary)] flex items-center justify-center text-[var(--accent)] shadow-sm">
                        <Icon size={24} />
                      </div>
                      <h2 className="font-mono font-bold text-2xl text-[var(--text-primary)] uppercase tracking-wider">{cat.category}</h2>
                    </div>

                    <div className="flex flex-wrap gap-3">
                      {cat.skills.map((skill: { name: string; level: number }) => (
                        <div key={skill.name} className="skill-pill">
                          {skill.name}
                        </div>
                      ))}
                    </div>
                  </GlowCard>
                </ScrollReveal>
              );
            })}
          </div>

          {/* Learning Section */}
          <ScrollReveal direction="up" delay={600} className="mt-16">
            <div className="glass-card p-8 bg-[var(--surface-secondary)] border-[var(--border)] relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-r from-[var(--accent-glow)] to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
              <p className="text-lg text-[var(--text-primary)] font-bold relative z-10">
                🚀 <span className="text-[var(--accent)] handwritten text-xl mr-2">Currently Master-Leveling:</span> 
                Python · Machine Learning · AI Architecture · Advanced Android
              </p>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </EditableSection>
  );
}
