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
      <div className="pt-32 pb-24 min-h-screen relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-5">
          {/* Header */}
          <ScrollReveal direction="left" className="mb-20">
            <span className="tag-pill mb-4">The Portfolio</span>
            <h1 className="section-title">Selected Works</h1>
            <p className="text-slate-600 dark:text-slate-400 mt-6 max-w-2xl text-lg font-medium leading-relaxed">
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
                      <h2 className="font-display font-900 text-3xl text-slate-900 dark:text-white group-hover:text-accent-500 transition-colors uppercase tracking-tighter">{p.title}</h2>
                    </div>
                    <span
                      className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border ${
                        p.status === "completed"
                          ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-500"
                          : p.status === "in-progress"
                          ? "bg-amber-500/10 border-amber-500/20 text-amber-500"
                          : "bg-slate-500/10 border-slate-500/20 text-slate-500"
                      }`}
                    >
                      {p.status === "in-progress" ? "🔧 In Progress" : p.status === "completed" ? "✅ Live" : "📋 Planned"}
                    </span>
                  </div>

                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed flex-1 text-lg">
                    {p.description}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {p.techStack.map((t: string) => (
                      <span key={t} className="skill-pill px-4 py-2 text-xs">
                        {t}
                      </span>
                    ))}
                  </div>

                  <div className="flex gap-6 pt-6 border-t border-white/10">
                    {p.githubUrl && (
                      <a href={p.githubUrl} target="_blank" rel="noopener noreferrer"
                        className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-slate-500 hover:text-accent-500 transition-colors">
                        <FiGithub size={16} /> Source
                      </a>
                    )}
                    {p.liveUrl && (
                      <a href={p.liveUrl} target="_blank" rel="noopener noreferrer"
                        className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-accent-500 hover:text-accent-600 transition-all hover:scale-105">
                        <FiExternalLink size={16} /> Launch App
                      </a>
                    )}
                  </div>
                </GlowCard>
              </ScrollReveal>
            ))}
          </div>

          {/* Custom Footer */}
          <ScrollReveal direction="up" delay={500} className="mt-20">
            <div className="p-12 rounded-[2.5rem] border-2 border-dashed border-white/10 bg-white/5 text-center group transition-all hover:border-accent-500/30">
              <div className="text-4xl mb-6 group-hover:scale-125 transition-transform duration-500">🚀</div>
              <h3 className="font-display font-900 text-3xl text-slate-900 dark:text-white uppercase tracking-tighter">The Journey Continues</h3>
              <p className="text-slate-500 dark:text-slate-400 mt-4 max-w-xl mx-auto text-lg">
                I&apos;m constantly brewing new ideas. Follow my <a href="https://github.com/Ti838" target="_blank" className="text-accent-500 underline underline-offset-4">GitHub</a> to see what&apos;s cooking in real-time.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </EditableSection>
  );
}
