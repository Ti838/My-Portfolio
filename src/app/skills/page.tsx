import type { Metadata } from "next";
import { getSkills } from "@/data/portfolio";
import { FiCode, FiTool, FiAward, FiMusic } from "react-icons/fi";
import EditableSection from "@/components/admin/EditableSection";

export const metadata: Metadata = { title: "Skills" };

const iconMap: Record<string, React.ElementType> = {
  FiCode, FiTool, FiAward, FiMusic,
};

export default async function SkillsPage() {
  const skillCategories = await getSkills();
  return (
    <EditableSection eventKey="skills" label="Technical Stack">
      <div className="pt-24 pb-20 min-h-screen bg-white dark:bg-slate-900">
        <div className="max-w-6xl mx-auto px-5">
          {/* Header */}
          <div className="mb-14">
            <span className="tag-pill mb-3">What I know</span>
            <h1 className="section-title">Skills</h1>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {skillCategories.map((cat) => {
              const Icon = iconMap[cat.icon] ?? FiCode;
              return (
                <div key={cat.category} className="card-base p-7 space-y-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-accent-50 dark:bg-accent-900/30 flex items-center justify-center text-accent-500">
                      <Icon size={20} />
                    </div>
                    <h2 className="font-display font-700 text-slate-900 dark:text-white text-lg">{cat.category}</h2>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {cat.skills.map((skill: { name: string; level: number }) => (
                    <div key={skill.name} className="px-4 py-2 bg-slate-100 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 text-sm font-semibold text-slate-700 dark:text-slate-300">
                      {skill.name}
                    </div>
                  ))}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Currently learning banner */}
          <div className="mt-10 p-6 rounded-2xl bg-accent-50 dark:bg-accent-900/20 border border-accent-200 dark:border-accent-800">
            <p className="text-accent-700 dark:text-accent-300 font-medium">
              🚀 <strong>Currently learning:</strong> Python · Machine Learning · Android Development · AI concepts
            </p>
          </div>
        </div>
      </div>
    </EditableSection>
  );
}
