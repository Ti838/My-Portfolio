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
      <div className="pt-32 pb-24 min-h-screen relative overflow-hidden">
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
                      <div className="w-12 h-12 rounded-2xl bg-accent-500/10 flex items-center justify-center text-accent-500 shadow-glow">
                        <Icon size={24} />
                      </div>
                      <h2 className="font-display font-900 text-2xl text-slate-900 dark:text-white uppercase tracking-tighter">{cat.category}</h2>
                    </div>

                    <div className="flex flex-wrap gap-3">
                      {cat.skills.map((skill: { name: string; level: number }) => (
                        <div key={skill.name} className="skill-pill py-3 px-5 text-sm font-black uppercase tracking-widest bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm border border-white/10 hover:border-accent-500/50 hover:bg-accent-500/5 transition-all">
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
            <div className="glass-card p-8 bg-accent-500/5 border-accent-500/20 relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-r from-accent-500/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
              <p className="text-lg text-slate-700 dark:text-slate-300 font-bold relative z-10">
                🚀 <span className="text-accent-500 uppercase tracking-widest text-xs mr-2">Currently Master-Leveling:</span> 
                Python · Machine Learning · AI Architecture · Advanced Android
              </p>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </EditableSection>
  );
}
