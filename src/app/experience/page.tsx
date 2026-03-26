import type { Metadata } from "next";
import { getExperiences } from "@/data/portfolio";
import { FiBriefcase, FiCode, FiMusic } from "react-icons/fi";

import EditableSection from "@/components/admin/EditableSection";

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
      <div className="pt-24 pb-20 min-h-screen bg-white dark:bg-slate-900">
      <div className="max-w-4xl mx-auto px-5">
        <div className="mb-14">
          <span className="tag-pill mb-3">Journey</span>
          <h1 className="section-title">Experience</h1>
        </div>

        <div className="relative pl-12">
          {/* Vertical line */}
          <div className="timeline-line" />

          <div className="space-y-10">
            {experiences.map((exp, i) => {
              const Icon = typeIcon[exp.type] ?? FiBriefcase;
              return (
                <div key={exp.id} className="relative animate-fade-up" style={{ animationDelay: `${i * 0.1}s` }}>
                  {/* Dot */}
                  <div className="timeline-dot absolute -left-12">
                    <Icon size={15} />
                  </div>

                  <div className="card-base p-7 ml-3">
                    <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                      <h2 className="font-display font-700 text-slate-900 dark:text-white text-lg">{exp.title}</h2>
                      <span className="text-xs font-mono text-accent-500 bg-accent-50 dark:bg-accent-900/20 px-3 py-1 rounded-full whitespace-nowrap">
                        {exp.duration}
                      </span>
                    </div>
                    <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-4">{exp.description}</p>
                    {exp.tags && (
                      <div className="flex flex-wrap gap-2 mt-4">
                  {exp.tags.map((t: string) => (
                    <span key={t} className="text-[10px] font-semibold px-2 py-0.5 bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 rounded">
                      {t}
                    </span>
                  ))}
                </div>
                    )}
                  </div>
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
